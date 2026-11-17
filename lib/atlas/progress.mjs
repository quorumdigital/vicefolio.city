export const EMPTY = () => ({saved:[],notes:{},map:{saved:[],found:[],notes:{}},draft:{}});
const json=(data,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'private, no-store','Vary':'Cookie'}});
const safeKey=k=>typeof k==='string'&&/^[a-zA-Z0-9:_-]{1,100}$/.test(k)&&!['__proto__','constructor','prototype'].includes(k);
export function validateProgress(value){
 if(!value||typeof value!=='object'||Array.isArray(value))throw Error('Invalid progress');
 const list=(v,max=5000)=>{if(!Array.isArray(v)||v.length>max||v.some(x=>!safeKey(x)))throw Error('Invalid saved IDs');return [...new Set(v)];};
 const notes=v=>{if(!v||typeof v!=='object'||Array.isArray(v)||Object.keys(v).length>500)throw Error('Invalid notes');const out={};for(const[k,t]of Object.entries(v)){if(!safeKey(k)||typeof t!=='string'||t.length>4000)throw Error('Invalid note');if(t)out[k]=t;}return out;};
 const draft={};for(const k of ['title','category','platform','location','steps','evidence','confidence']){const v=value.draft?.[k];if(v!==undefined){if(typeof v!=='string'||v.length>6000)throw Error('Invalid draft');draft[k]=v;}}
 const out={saved:list(value.saved,1000),notes:notes(value.notes),map:{saved:list(value.map?.saved),found:list(value.map?.found),notes:notes(value.map?.notes)},draft};if(new TextEncoder().encode(JSON.stringify(out)).length>750000)throw Error('Progress exceeds account limit');return out;
}
export async function handleProgress(request,user,db){
 if(!user?.userId)return json({error:'Sign in required'},401);
 if(!db)return json({error:'Account storage is temporarily unavailable.'},503);
 const method=request.method;
 if(!['GET','PUT','DELETE'].includes(method))return json({error:'Method not allowed'},405);
 if(method!=='GET'&&(request.headers.get('Origin')!==new URL(request.url).origin||request.headers.get('X-Vice-Atlas')!=='progress'))return json({error:'Request origin rejected'},403);
 try{
  const row=await db.prepare('SELECT payload, revision, updated_at FROM atlas_progress WHERE user_id = ?').bind(user.userId).first();
  const current={progress:row?JSON.parse(row.payload):EMPTY(),revision:row?.revision||0,updatedAt:row?.updated_at||null};
  if(method==='GET')return json(current);
  if(!request.headers.get('Content-Type')?.startsWith('application/json'))return json({error:'JSON required'},415);
  if(Number(request.headers.get('Content-Length')||0)>800000)return json({error:'Progress is too large'},413);
  const bodyText=await request.text();if(new TextEncoder().encode(bodyText).length>800000)return json({error:'Progress is too large'},413);
  let body;try{body=JSON.parse(bodyText);}catch{return json({error:'Invalid JSON'},400);}
  if(!body||typeof body!=='object'||!Number.isSafeInteger(body.revision)||body.revision<0)return json({error:'Invalid revision'},400);
  if(body.revision!==current.revision)return json({...current,error:'Progress changed on another device'},409);
  if(method==='DELETE'){
   if(row){const removed=await db.prepare('DELETE FROM atlas_progress WHERE user_id = ? AND revision = ? RETURNING user_id').bind(user.userId,body.revision).first();if(!removed)return json({error:'Progress changed on another device'},409);}
   return json({progress:EMPTY(),revision:0,updatedAt:null});
  }
  let progress;try{progress=validateProgress(body.progress);}catch(e){return json({error:e.message},400);}
  const stamp=new Date().toISOString(),payload=JSON.stringify(progress);
  const updated=row?await db.prepare('UPDATE atlas_progress SET payload = ?, revision = revision + 1, updated_at = ? WHERE user_id = ? AND revision = ? RETURNING revision, updated_at').bind(payload,stamp,user.userId,body.revision).first():await db.prepare('INSERT INTO atlas_progress (user_id, payload, revision, updated_at) VALUES (?, ?, 1, ?) ON CONFLICT(user_id) DO NOTHING RETURNING revision, updated_at').bind(user.userId,payload,stamp).first();
  if(!updated){const latest=await db.prepare('SELECT payload, revision, updated_at FROM atlas_progress WHERE user_id = ?').bind(user.userId).first();return json({error:'Progress changed on another device',progress:latest?JSON.parse(latest.payload):EMPTY(),revision:latest?.revision||0,updatedAt:latest?.updated_at||null},409);}
  return json({revision:updated.revision,updatedAt:updated.updated_at});
 }catch(error){console.error('Atlas progress storage failed',error?.name||'Error');return json({error:'Account storage is temporarily unavailable.'},503);}
}
