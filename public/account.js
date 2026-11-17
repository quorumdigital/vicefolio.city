'use strict';
window.ViceAccount=(()=>{
 const keys={saved:'vice-atlas-saved',notes:'vice-atlas-notes',map:'vice-atlas-map-progress',draft:'vice-atlas-report-draft'},enabledKey='vice-atlas-sync-enabled',ownerKey='vice-atlas-active-account',guestKey='vice-atlas-guest-progress';
 const t=x=>window.localizeText?window.localizeText(x):x,esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const empty=()=>({saved:[],notes:{},map:{saved:[],found:[],notes:{}},draft:{}}),read=(k,f)=>{try{return JSON.parse(localStorage.getItem(k))??f}catch{return f}},put=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}},del=k=>{try{localStorage.removeItem(k)}catch{}};
 let user=null,enabled=false,ready=false,busy=false,loading=false,dirty=false,revision=0,base=empty(),stamp=null,message='',timer=null,authMode='login',authPending=false;
 const cacheKey=()=>user?'vice-atlas-account-cache-'+user.userId:null;
 const snapshot=()=>({saved:read(keys.saved,[]),notes:read(keys.notes,{}),map:read(keys.map,{saved:[],found:[],notes:{}}),draft:read(keys.draft,{})});
 function normalize(v){if(!v||typeof v!=='object')throw Error('Invalid backup');const ok=k=>typeof k==='string'&&/^[a-zA-Z0-9:_-]{1,100}$/.test(k)&&!['__proto__','constructor','prototype'].includes(k);const ids=(a,max=5000)=>{if(!Array.isArray(a)||a.length>max||a.some(x=>!ok(x)))throw Error('Invalid IDs');return [...new Set(a)]};const notes=o=>{if(!o||typeof o!=='object'||Array.isArray(o)||Object.keys(o).length>500)throw Error('Invalid notes');const r={};for(const[k,x]of Object.entries(o)){if(!ok(k)||typeof x!=='string'||x.length>4000)throw Error('Invalid note');if(x)r[k]=x;}return r;};const draft={};for(const k of ['title','category','platform','location','steps','evidence','confidence'])if(v.draft?.[k]!==undefined){if(typeof v.draft[k]!=='string'||v.draft[k].length>6000)throw Error('Invalid draft');draft[k]=v.draft[k];}return {saved:ids(v.saved,1000),notes:notes(v.notes),map:{saved:ids(v.map?.saved),found:ids(v.map?.found),notes:notes(v.map?.notes)},draft};}
 function write(v){for(const[k,key]of Object.entries(keys))put(key,v[k]);window.dispatchEvent(new CustomEvent('vice-atlas-progress-hydrated'));}
 function equal(a,b){return JSON.stringify(a)===JSON.stringify(b)}
 function merge(before,local,remote){const sets=(a,b,c)=>{const s=new Set(c),aa=new Set(a),bb=new Set(b);for(const x of aa)if(!bb.has(x))s.delete(x);for(const x of bb)if(!aa.has(x))s.add(x);return [...s]};const fields=(a={},b={},c={})=>{const out={...c};for(const k of new Set([...Object.keys(a),...Object.keys(b)]))if(a[k]!==b[k]){if(b[k]===undefined||b[k]==='')delete out[k];else out[k]=b[k];}return out;};return {saved:sets(before.saved,local.saved,remote.saved),notes:fields(before.notes,local.notes,remote.notes),map:{saved:sets(before.map.saved,local.map.saved,remote.map.saved),found:sets(before.map.found,local.map.found,remote.map.found),notes:fields(before.map.notes,local.map.notes,remote.map.notes)},draft:fields(before.draft,local.draft,remote.draft)};}
 function remember(){if(enabled&&user&&read(ownerKey,null)===user.userId)put(cacheKey(),{base,local:snapshot(),revision,stamp});}
 function saveScope(){return t(message||(enabled?(busy||dirty?'Syncing…':'Saved to your account'):'Saved on this browser'));}
 function announce(keepForm=false){document.querySelectorAll('[data-auth-only]').forEach(x=>x.hidden=!enabled);document.querySelectorAll('[data-account-link-label]').forEach(x=>{const label=t(enabled?'Account':'Sign in');if(x.textContent!==label)x.textContent=label;});document.querySelectorAll('.account-link').forEach(x=>x.setAttribute('aria-label',t(enabled?'Account':'Sign in')));document.querySelectorAll('.account-status-dot').forEach(x=>x.hidden=!enabled);document.querySelectorAll('[data-save-scope]').forEach(x=>{const value=saveScope();if(x.textContent!==value)x.textContent=value;});document.querySelectorAll('[data-account-status]').forEach(x=>x.textContent=t(message||(busy?'Syncing…':enabled?'Saved to your account':'Saved on this browser')));const panel=document.querySelector('#account-content');if(panel){const form=panel.querySelector('[data-account-form]');if(form&&(keepForm||(!user&&(authPending||form.contains(document.activeElement))))){const feedback=panel.querySelector('.account-feedback');if(feedback)feedback.textContent=t(message);else if(message){const note=document.createElement('p');note.className='account-feedback';note.setAttribute('role','status');note.textContent=t(message);form.after(note);}}else panel.innerHTML=content();}window.localizePage?.();}
 function changed(key){if(!Object.values(keys).includes(key))return;if(enabled){dirty=true;remember();clearTimeout(timer);timer=setTimeout(sync,500)}announce();}
 async function request(method,body){const response=await fetch('/api/atlas/progress',{method,credentials:'same-origin',headers:{'Content-Type':'application/json','X-Vice-Atlas':'progress','X-Vice-Account':user?.userId||''},body:body?JSON.stringify(body):undefined});const data=await response.json();return {response,data};}
 async function refresh(){if(!enabled||loading||busy)return;loading=true;try{const {response,data}=await request('GET');if(!response.ok)throw Error(response.status===401?'Your session expired. Sign in again to sync.':'Account sync is unavailable. Your changes are still saved on this browser.');const local=snapshot(),merged=merge(base,local,data.progress);base=data.progress;revision=data.revision;stamp=data.updatedAt;dirty=!equal(merged,base);if(!equal(local,merged))write(merged);message='';remember();}catch(e){message=e.message}finally{loading=false;announce();if(dirty)setTimeout(sync,0)}}
 async function sync(){if(!enabled||busy||loading||!dirty)return;busy=true;announce();try{for(let attempt=0;attempt<3;attempt++){const sent=normalize(snapshot());const {response,data}=await request('PUT',{revision,progress:sent});if(response.status===409&&data.progress){const merged=merge(base,snapshot(),data.progress);base=data.progress;revision=data.revision;write(merged);remember();continue;}if(!response.ok)throw Error(response.status===401?'Your session expired. Sign in again to sync.':'Could not sync yet. Retry when your connection returns.');base=sent;revision=data.revision;stamp=data.updatedAt;dirty=!equal(snapshot(),sent);message='';remember();break;}}catch(e){message=e.message;remember()}finally{busy=false;announce();if(dirty&&!message){clearTimeout(timer);timer=setTimeout(sync,700)}}}
 function detach() {
  const owner=read(ownerKey,null);
  if(owner){
   const key='vice-atlas-account-cache-'+owner;
   put(key,{...read(key,{}),local:snapshot()});
   write(read(guestKey,empty()));
   del(ownerKey);
  }
  enabled=false;dirty=false;base=empty();revision=0;stamp=null;clearTimeout(timer);
 }
 async function activate(nextUser,includeGuest=false) {
  const owner=read(ownerKey,null);
  if(owner&&owner!==nextUser.userId)detach();
  user=nextUser;
  const cache=read(cacheKey(),null);
  if(!read(ownerKey,null)){
   const guest=snapshot();
   put(guestKey,guest);
   const local=cache?.local||empty();
   write(includeGuest?merge(empty(),guest,local):local);
  }
  base=cache?.base||empty();revision=cache?.revision||0;stamp=cache?.stamp||null;
  enabled=true;put(enabledKey,user.userId);put(ownerKey,user.userId);
  await refresh();
 }
 async function accountRequest(method,body) {
  const response=await fetch('/api/atlas/account',{
   method,credentials:'same-origin',cache:'no-store',
   headers:{'Content-Type':'application/json','X-Vice-Atlas':'account','X-Vice-Account':user?.userId||''},
   body:body===undefined?undefined:JSON.stringify(body)
  });
  const data=await response.json();
  if(!response.ok)throw Error(data.error||'Account storage is temporarily unavailable.');
  return data;
 }
 async function init() {
  try{
   ({user}=await accountRequest('GET'));
   if(user&&read(enabledKey,null)===user.userId)await activate(user);
   else detach();
  }catch{message='Account storage is temporarily unavailable.'}
  finally{ready=true;announce();}
 }
 function connectionForm() {
  if(!ready)return '<p role="status">'+t('Checking account…')+'</p>';
  if(user)return '<div class="account-actions"><button class="button primary" data-account-resume>'+t('Enable cloud sync')+'</button><button class="text-link" data-account-signout>'+t('Sign out')+'</button></div>';
  const registering=authMode==='register';
  const submit=t(registering?'Create a ViceFolio':'Sign in');
  return '<form class="account-form" method="post" action="/api/atlas/account" data-account-form>'+
   '<label>'+t('Email')+'<input name="email" type="email" autocomplete="username" maxlength="254" required></label>'+
   '<label>'+t('Password')+'<input name="password" type="password" autocomplete="'+(registering?'new-password':'current-password')+'" maxlength="1024" required'+(registering?' minlength="15" aria-describedby="account-password-hint"':'')+'></label>'+
   (registering?'<small id="account-password-hint">'+t('Use at least 15 characters.')+'</small>':'')+
   '<label class="account-include-guest"><input type="checkbox" name="includeGuest"> '+t('Add this browser’s guest progress')+'</label>'+
   '<div class="account-actions"><button class="button primary" type="submit">'+submit+'</button>'+
   '<button class="text-link" type="button" data-account-toggle>'+t(registering?'Already have an account? Sign in':'Create a ViceFolio')+'</button></div></form>';
 }
 document.addEventListener('submit',async event=>{
  const form=event.target.closest('[data-account-form]');
  if(!form)return;
  event.preventDefault();
  if(authPending)return;
  const details=new FormData(form);
  const button=form.querySelector('[type="submit"]');
  button.disabled=true;
  authPending=true;
  try{
   const {user:nextUser}=await accountRequest('POST',{action:authMode,email:details.get('email'),password:details.get('password')});
   form.reset();
   message='';
   await activate(nextUser,details.has('includeGuest'));
  }catch(error){
   message=error.message;
   announce(true);
  }finally{
   authPending=false;
   button.disabled=false;
   if(user)announce();
  }
 });
 function statusPanel(){return '<div class="atlas-save-status"><span class="save-status-orb"></span><span data-account-status>'+saveScope()+'</span><a href="#account">'+t(enabled?'Manage your progress':'Sign in to sync')+' →</a></div>';}
 function content(){const s=snapshot(),noteCount=Object.values(s.notes).filter(Boolean).length+Object.values(s.map.notes||{}).filter(Boolean).length;return '<div class="account-grid"><section class="account-card account-connect-card"><div class="eyebrow">'+t(enabled?'Your account':'Guest mode')+'</div><h2>'+t('Your ViceFolio, wherever you go.')+'</h2><p>'+t('Your saved entries, found places and notes stay with your account across devices.')+'</p>'+(enabled?'<div class="account-person"><span class="account-avatar">'+esc((user?.displayName||'V').slice(0,1).toUpperCase())+'</span><div><strong>'+esc(user?.displayName)+'</strong><small data-account-status>'+t(message||(busy?'Syncing…':'Saved to your account'))+'</small></div></div><div class="account-actions"><button class="button" data-account-sync>'+t('Sync now')+'</button><button class="text-link" data-account-signout>'+t('Sign out')+'</button></div>':connectionForm()+'<p class="account-note">'+t('Your discoveries are saved on this browser. Sign in to keep them across devices.')+'</p>')+(message?'<p class="account-feedback" role="status">'+esc(t(message))+'</p>':'')+(stamp&&enabled?'<small class="account-updated">'+t('Last synced')+' · '+new Date(stamp).toLocaleString(window.VICE_LOCALE==='pt-br'?'pt-BR':window.VICE_LOCALE)+'</small>':'')+'</section><section class="account-card account-backup-card"><div class="eyebrow">'+t('Manage your progress')+'</div><div class="account-stats">'+[[s.saved.length,'Saved entries'],[s.map.found.length,'Found locations'],[noteCount,'Personal notes']].map(([n,l])=>'<div><strong>'+n+'</strong><span>'+t(l)+'</span></div>').join('')+'</div><h2>'+t('Save a backup file')+'</h2><p>'+t(enabled?'Keep an extra copy of your discoveries. Your account saves stay available when you sign in on another device.':'Browsing history alone does not remove saves. Clearing site data or using another browser does.')+'</p><div class="account-actions"><button class="button" data-account-export>'+t('Export a backup')+'</button><label class="button import-backup">'+t('Import a backup')+'<input type="file" accept="application/json,.json" id="account-import"></label></div><a class="text-link" href="#saved">'+t('Open your collection')+' →</a></section></div><details class="account-privacy"><summary>'+t('Privacy & saved progress')+'</summary><p>'+t('We store your saved item IDs, found markers, notes and report draft under your account. Your email identifies your account. ViceFolio stores a salted password hash.')+'</p>'+(enabled?'<button class="text-button account-delete" data-account-delete>'+t('Delete cloud saves')+'</button>':'')+'</details>';}
 function html(){return '<div class="wrap account-page"><div class="page-head"><div class="eyebrow">'+t('YOUR ACCOUNT')+'</div><h1>'+t('VICEFOLIO.')+'</h1><p>'+t('Choose how to keep your discoveries.')+'</p></div><div id="account-content">'+content()+'</div></div>';}
 async function exportBackup(){if(enabled)await refresh();const a=document.createElement('a'),url=URL.createObjectURL(new Blob([JSON.stringify({format:'vice-atlas-progress',version:1,exportedAt:new Date().toISOString(),progress:snapshot()},null,2)],{type:'application/json'}));a.href=url;a.download='vice-atlas-backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
 document.addEventListener('click',async event=>{const b=event.target.closest('[data-account-toggle],[data-account-resume],[data-account-signout],[data-account-sync],[data-account-export],[data-account-delete]');if(!b)return;if(b.hasAttribute('data-account-toggle')){
  if(authPending)return;
  authMode=authMode==='login'?'register':'login';
  message='';
  document.querySelector('#account-content').innerHTML=content();
  document.querySelector('.account-form input')?.focus();
  return;
 }
 if(b.hasAttribute('data-account-resume')){
  if(authPending)return;
  authPending=true;message='';
  try{await activate(user,true);}finally{authPending=false;}
  return;
 }
 if(b.hasAttribute('data-account-signout')){
  if(authPending||busy||loading)return;
  authPending=true;b.disabled=true;
  try{await accountRequest('DELETE');remember();detach();del(enabledKey);user=null;authMode='login';message='';}
  catch(error){message=error.message;}
  finally{authPending=false;announce();}
  return;
 }
 if(b.hasAttribute('data-account-export'))return exportBackup();if(b.hasAttribute('data-account-sync')){await refresh();return sync();}if(b.hasAttribute('data-account-delete')&&confirm(t('Remove your saved account progress? This cannot be undone. Your browser backup will remain.'))){try{const {response}=await request('DELETE',{revision});if(!response.ok)throw Error();remember();enabled=false;dirty=false;del(enabledKey);del(ownerKey);put(guestKey,snapshot());message='Cloud saves deleted.';stamp=null;del(cacheKey());announce();}catch{message='Could not sync yet. Retry when your connection returns.';announce();}}});
 document.addEventListener('change',async event=>{if(event.target.id!=='account-import')return;try{const file=event.target.files?.[0];if(!file||file.size>800000)throw Error();const raw=JSON.parse(await file.text());const incoming=normalize(raw.progress||{saved:(raw.saved||[]).map(x=>typeof x==='string'?x:x.id),notes:raw.personalNotes||{},map:raw.mapProgress||{saved:[],found:[],notes:{}},draft:{}});write(merge(empty(),incoming,snapshot()));message='Backup imported.';changed(keys.saved);announce();}catch{message='This backup could not be read.';announce();}});
 window.addEventListener('online',()=>{if(enabled)refresh()});document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&enabled)refresh()});window.addEventListener('storage',e=>{if(e.key===ownerKey){if(read(ownerKey,null)!==(enabled?user?.userId:null))window.location.reload();return;}if(Object.values(keys).includes(e.key||'')){window.dispatchEvent(new CustomEvent('vice-atlas-progress-hydrated'));if(enabled){dirty=true;remember();clearTimeout(timer);timer=setTimeout(sync,500)}}});
 document.addEventListener('DOMContentLoaded',init,{once:true});
 return {html,changed,saveScope,statusPanel,isConnected:()=>enabled,refresh,sync,exportBackup,getState:()=>({enabled,ready,busy,dirty,revision,message}),merge};
})();
