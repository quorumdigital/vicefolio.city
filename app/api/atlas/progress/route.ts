import { env } from 'cloudflare:workers';
import { getViceFolioUser } from '../../../../lib/atlas/auth.mjs';
import { handleProgress } from '../../../../lib/atlas/progress.mjs';

export const dynamic = 'force-dynamic';

async function handle(request: Request) {
  try {
    const user = await getViceFolioUser(request, env.DB);
    if (user && request.headers.get('X-Vice-Account') !== user.userId) {
      return Response.json({ error: 'Your session changed. Reload this page to continue.' }, {
        status: 401,
        headers: { 'Cache-Control': 'private, no-store', Vary: 'Cookie' },
      });
    }
    return handleProgress(request, user, env.DB);
  } catch {
    return Response.json({ error: 'Account storage is temporarily unavailable.' }, {
      status: 503,
      headers: { 'Cache-Control': 'private, no-store', Vary: 'Cookie' },
    });
  }
}

export const GET = handle;
export const PUT = handle;
export const DELETE = handle;
