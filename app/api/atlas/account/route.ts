import { getChatGPTUser, chatGPTSignInPath, chatGPTSignOutPath } from '../../../chatgpt-auth';
export const dynamic='force-dynamic';
export async function GET(request:Request){const user=await getChatGPTUser();const requested=new URL(request.url).searchParams.get('returnTo')||'/en/#account';return Response.json({user:user?{userId:user.userId,displayName:user.displayName}:null,signInUrl:chatGPTSignInPath(requested),signOutUrl:chatGPTSignOutPath(requested)},{headers:{'Cache-Control':'private, no-store','Vary':'Cookie'}});}
