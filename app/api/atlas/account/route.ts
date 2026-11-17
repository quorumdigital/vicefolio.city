import { env } from 'cloudflare:workers';
import { handleAccount } from '../../../../lib/atlas/auth.mjs';

export const dynamic = 'force-dynamic';

const handle = (request: Request) => handleAccount(request, env.DB);
export const GET = handle;
export const POST = handle;
export const DELETE = handle;
