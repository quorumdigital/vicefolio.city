import { createHash, randomBytes, randomUUID, timingSafeEqual } from 'node:crypto';
const iterations = 100_000;
const lifetime = 30 * 24 * 60 * 60;
const cookieName = '__Host-vicefolio_session';
const hash = value => createHash('sha256').update(value).digest('hex');
const now = () => Math.floor(Date.now() / 1000);
const derivePassword = async (password, salt) => {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: Uint8Array.from(Buffer.from(salt, 'utf8')),
      iterations,
      hash: 'SHA-256'
    },
    key,
    256
  );
  return Buffer.from(bits);
};

function json(data, status = 200, headers = {}) {
  return Response.json(data, {
    status,
    headers: { 'Cache-Control': 'private, no-store', Vary: 'Cookie', ...headers },
  });
}

function sessionHash(request) {
  const match = (request.headers.get('Cookie') || '').split(';')
    .map(part => part.trim()).filter(part => part.startsWith(cookieName + '='));
  if (match.length !== 1) return null;
  const token = match[0].slice(cookieName.length + 1);
  return /^[\da-f]{64}$/.test(token) ? hash(token) : null;
}

export async function getViceFolioUser(request, db) {
  const tokenHash = sessionHash(request);
  if (!tokenHash || !db) return null;
  return await db.prepare(
    'SELECT u.id AS userId, u.email AS displayName FROM vicefolio_sessions s ' +
    'JOIN vicefolio_users u ON u.id = s.user_id WHERE s.token_hash = ? AND s.expires_at > ?',
  ).bind(tokenHash, now()).first() || null;
}

function cookie(token, age) {
  return `${cookieName}=${token}; Max-Age=${age}; Path=/; Secure; HttpOnly; SameSite=Lax`;
}

async function readCredentials(request) {
  const reader = request.body?.getReader();
  if (!reader) return null;
  const decoder = new TextDecoder('utf-8', { fatal: true });
  let bytes = 0;
  let text = '';
  try {
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 8192) {
        await reader.cancel();
        return null;
      }
      text += decoder.decode(value, { stream: true });
    }
    return JSON.parse(text + decoder.decode());
  } catch {
    await reader.cancel().catch(() => {});
    return null;
  }
}

async function allowAttempt(db, request, email, action) {
  const windowSeconds = 900;
  const seconds = now();
  const expiration = seconds + windowSeconds;
  const ip = request.headers.get('CF-Connecting-IP') || 'local';
  const ipKey = hash('ip:' + ip);
  const emailKey = hash('attempt:' + action + ':' + ip + ':' + email);
  const increment = (key, limit) => db.prepare(
    'INSERT INTO vicefolio_auth_limits (key, expires_at, attempts) VALUES (?, ?, 1) ' +
    'ON CONFLICT(key) DO UPDATE SET ' +
    'attempts = CASE WHEN expires_at <= ? THEN 1 ELSE attempts + 1 END, ' +
    'expires_at = CASE WHEN expires_at <= ? THEN excluded.expires_at ELSE expires_at END ' +
    'WHERE expires_at <= ? OR attempts < ? RETURNING attempts',
  ).bind(key, expiration, seconds, seconds, seconds, limit).first();

  if (!await increment(ipKey, 30) || !await increment(emailKey, 8)) return false;
  await db.prepare('DELETE FROM vicefolio_auth_limits WHERE key IN (' +
    'SELECT key FROM vicefolio_auth_limits WHERE expires_at <= ? LIMIT 50)').bind(seconds).run();
  return true;
}

export async function handleAccount(request, db) {
  try {
    if (request.method === 'GET') return json({ user: await getViceFolioUser(request, db) });
    if (request.headers.get('Origin') !== new URL(request.url).origin ||
        request.headers.get('X-Vice-Atlas') !== 'account') {
      return json({ error: 'Request origin rejected.' }, 403);
    }
    if (!db) return json({ error: 'Account storage is temporarily unavailable.' }, 503);
    if (request.method === 'DELETE') {
      const tokenHash = sessionHash(request);
      if (tokenHash) {
        const user = await getViceFolioUser(request, db);
        if (user && request.headers.get('X-Vice-Account') !== user.userId) {
          return json({ error: 'Your session changed. Reload this page to continue.' }, 409);
        }
        await db.prepare('DELETE FROM vicefolio_sessions WHERE token_hash = ?').bind(tokenHash).run();
      }
      return json({ user: null }, 200, { 'Set-Cookie': cookie('', 0) });
    }
    if (request.headers.get('Content-Type')?.split(';')[0].trim().toLowerCase() !== 'application/json') {
      return json({ error: 'JSON is required.' }, 415);
    }

    const body = await readCredentials(request);
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = body?.password;
    const action = body?.action;
    if ((action !== 'register' && action !== 'login') || email.length > 254 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(email) ||
        typeof password !== 'string' || !password || password.length > 1024) {
      return json({ error: 'Enter a valid email and password.' }, 400);
    }
    if (action === 'register' && [...password].length < 15) {
      return json({ error: 'Use at least 15 characters for your password.' }, 400);
    }
    if (!await allowAttempt(db, request, email, action)) {
      return json({ error: 'Too many attempts. Try again in 15 minutes.' }, 429, { 'Retry-After': '900' });
    }

    let userId;
    if (action === 'register') {
      userId = 'vf_' + randomUUID();
      const salt = randomBytes(16).toString('hex');
      const digest = await derivePassword(password, salt);
      const inserted = await db.prepare(
        'INSERT INTO vicefolio_users (id, email, password_hash) VALUES (?, ?, ?) ' +
        'ON CONFLICT(email) DO NOTHING RETURNING id',
      ).bind(userId, email, `pbkdf2-sha256$100000$${salt}$${digest.toString('hex')}`).first();
      if (!inserted) {
        return json({ error: 'Unable to create an account with these details. Try signing in.' }, 409);
      }
    } else {
      const row = await db.prepare('SELECT id, password_hash FROM vicefolio_users WHERE email = ?')
        .bind(email).first();
      const stored = /^pbkdf2-sha256\$600000\$([\da-f]{32})\$([\da-f]{64})$/.exec(row?.password_hash || '');
      const digest = await derivePassword(password, stored?.[1] || '0'.repeat(32));
      if (!timingSafeEqual(digest, Buffer.from(stored?.[2] || '0'.repeat(64), 'hex')) || !stored) {
        return json({ error: 'Email or password is incorrect.' }, 401);
      }
      userId = row.id;
    }

    const token = randomBytes(32).toString('hex');
    const oldHash = sessionHash(request);
    const seconds = now();
    await db.batch([
      db.prepare('DELETE FROM vicefolio_sessions WHERE token_hash = ?').bind(oldHash),
      db.prepare('DELETE FROM vicefolio_sessions WHERE token_hash IN (' +
        'SELECT token_hash FROM vicefolio_sessions WHERE expires_at <= ? LIMIT 50)').bind(seconds),
      db.prepare('INSERT INTO vicefolio_sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)')
        .bind(hash(token), userId, seconds + lifetime),
    ]);
    return json({ user: { userId, displayName: email } }, action === 'register' ? 201 : 200,
      { 'Set-Cookie': cookie(token, lifetime) });
  } catch (error) {
    console.error('ViceFolio account storage failed', error?.name, error?.message, error?.stack);
    return json({ error: 'Account storage is temporarily unavailable.' }, 503);
  }
}
