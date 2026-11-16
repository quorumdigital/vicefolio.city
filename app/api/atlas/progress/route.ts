import { env } from 'cloudflare:workers';
import { getChatGPTUser } from '../../../chatgpt-auth';
import { handleProgress } from '../../../../lib/atlas/progress.mjs';
export const dynamic='force-dynamic';
const handle=async(request:Request)=>handleProgress(request,await getChatGPTUser(),env.DB);
export const GET=handle;export const PUT=handle;export const DELETE=handle;
