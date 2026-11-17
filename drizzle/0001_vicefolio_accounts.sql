CREATE TABLE IF NOT EXISTS vicefolio_users (
    id TEXT PRIMARY KEY NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS vicefolio_sessions (
    token_hash TEXT PRIMARY KEY NOT NULL,
    user_id TEXT NOT NULL REFERENCES vicefolio_users(id) ON DELETE CASCADE,
    expires_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS vicefolio_sessions_expiry ON vicefolio_sessions(expires_at);
CREATE TABLE IF NOT EXISTS vicefolio_auth_limits (
    key TEXT PRIMARY KEY NOT NULL,
    expires_at INTEGER NOT NULL,
    attempts INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS vicefolio_auth_limits_expiry ON vicefolio_auth_limits(expires_at);
