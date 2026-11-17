/* X-Files: evidence-first editorial presentation. The approved hero is owned by revision-18. */
(function(){
'use strict';
let observer=null, controller=null, media=null;
function content({A,head,ufoCard,sourceLinks,esc,icon}){const lead=A.mysteries.find(x=>x.id==='vi-breakwater-watch');return '<div class="wrap">'+head('UFOs / ALIENS / SERIES HISTORY','THE X-FILES.','Strange skies, hidden craft and the stories behind them. Follow the evidence across GTA’s UFO history.')+'<section class="ufo-watch"><img src="assets/hd/photo-80.webp" alt="Cal Hampton in official GTA VI imagery"><div><div class="eyebrow">GTA VI / EVIDENCE WATCH</div><h2>Conspiracy country.</h2><p>Cal Hampton monitors Coast Guard communications and sees suspicious patterns around him. His conspiratorial outlook is part of his character; any connection to aliens remains a fan theory.</p><p>GTA VI UFO encounters and repeatable sighting routes are still awaiting confirmation. Earlier games’ 03:00 triggers and completion requirements apply only to those games.</p>'+(lead?'<aside class="ufo-latest"><div class="eyebrow">'+esc(window.localizeText('Latest GTA VI lead'))+'</div><a href="#ufos?case='+lead.id+'">'+esc(lead.name)+' →</a><p>'+esc(lead.description)+'</p></aside>':'')+sourceLinks(A.ufoSources.slice(2,4))+'</div></section>'+window.ViceFieldNotes.watch()+'<section class="section"><div class="section-head"><div><div class="eyebrow">THE SIGHTING ARCHIVE</div><h2>Choose your investigation.</h2></div><span class="small-note">'+A.mysteries.length+' files · game-specific evidence</span></div><div class="ufo-tabs" role="group" aria-label="Filter X-Files by game">'+['All files',...new Set(A.mysteries.map(x=>x.game))].map((g,i)=>'<button class="ufo-tab '+(!i?'active':'')+'" data-ufo-filter="'+g+'" aria-pressed="'+(!i)+'">'+g+'</button>').join('')+'</div><div class="ufo-grid">'+A.mysteries.map(ufoCard).join('')+'</div></section><section class="ufo-history"><img src="assets/ufo-mural.jpg" alt="The Mount Chiliad cable-car-station mural in GTA V"><div><div class="eyebrow">LORE / PROPS / ENCOUNTERS</div><h2>A recurring theme.<br>Different kinds of evidence.</h2><p>UFO stories run through GTA’s history, but references and encounters are different. The distant lights in GTA III, Vice City and GTA IV are generally identified as aircraft effects. San Andreas’ mounted saucer and alien dialogue helped build the myth; GTA V has craft you can actually find. A flying-saucer encounter is not established for every GTA release.</p><p>For a new GTA VI sighting, record the unedited footage, game version, map location, in-game time, weather, character and progression. A repeatable result is more useful than an isolated light in a trailer.</p>'+sourceLinks([{name:'Grand Theft Wiki — the San Andreas UFO myth',url:'https://www.grandtheftwiki.com/Aliens_in_GTA_San_Andreas'},{name:'GTA Series Videos — GTA V UFO walkthrough',url:'https://www.youtube.com/watch?v=HsS06Ub3Mkc'}])+'</div></section><p class="small-note" data-no-localize>'+esc(window.localizeText('Archive screenshots: Rockstar Games. Image sources are linked in each file.'))+' '+esc(window.localizeText('Older-game images are labeled; they are not GTA VI sightings.'))+' '+esc(window.localizeText('Reviewed'))+' '+esc(A.updated)+'.</p></div>'}
function html(context){
 const {esc}=context;
 const tr=s=>esc(window.localizeText?window.localizeText(s):s);
 let output=content(context);
 const start=output.indexOf('<section class="section">');
 const end=output.indexOf('<section class="ufo-history">',start);
 const archive=output.slice(start,end);
 output=output.slice(0,start)+output.slice(end);
 const heroEnd=output.indexOf('<section class="ufo-watch">');
 const index='<nav class="xf-index" aria-label="'+tr('THE X-FILES.')+'"><span class="xf-index-mark" aria-hidden="true">'+context.icon('ufo')+'</span><button data-scene-scroll="xf-evidence"><span aria-hidden="true">01</span>'+tr('GTA VI / EVIDENCE WATCH')+'</button><button data-scene-scroll="ufo-files"><span aria-hidden="true">02</span>'+tr('THE SIGHTING ARCHIVE')+'</button><button data-scene-scroll="xf-history"><span aria-hidden="true">03</span>'+tr('LORE / PROPS / ENCOUNTERS')+'</button></nav>';
 output=output.slice(0,heroEnd)+index+output.slice(heroEnd);
 const watchEnd=output.indexOf('<section class="mystery-watch"');
 output=output.slice(0,watchEnd)+archive+output.slice(watchEnd);
 output=output.replace('<div class="wrap">','<div class="wrap xfiles-page">')
 .replace('<section class="section">','<section class="section xf-archive" id="ufo-files">')
 .replace('<section class="ufo-watch"><img src="assets/hd/photo-80.webp" alt="Cal Hampton in official GTA VI imagery"><div>','<section class="ufo-watch xf-reveal" id="xf-evidence"><figure class="xf-cal-scene"><img src="assets/hd/photo-80.webp" alt="Cal Hampton in official GTA VI imagery" loading="lazy"><figcaption>GTA VI / EVIDENCE WATCH</figcaption></figure><div class="xf-cal-copy">')
 .replace('<section class="ufo-history"><img src="assets/ufo-mural.jpg" alt="The Mount Chiliad cable-car-station mural in GTA V"><div>','<section class="ufo-history xf-reveal" id="xf-history"><figure class="xf-mural"><img src="assets/ufo-mural.jpg" alt="The Mount Chiliad cable-car-station mural in GTA V" loading="lazy"><figcaption>GTA V / MOUNT CHILIAD</figcaption></figure><div class="xf-history-copy">');
 let number=0;
 output=output.replaceAll('class="ufo-card"',()=> 'class="ufo-card xf-reveal" data-file-number="'+String(++number).padStart(2,'0')+'"');
 return output;
}
function destroy(){
 observer?.disconnect(); observer=null;
 controller?.abort(); controller=null;
 document.querySelectorAll('.xfiles-page .xf-enter').forEach(el=>el.classList.remove('xf-enter'));
 media=null;
}
function init(){
 destroy();
 const page=document.querySelector('.xfiles-page'); if(!page)return;
 controller=new AbortController();
 media=window.matchMedia('(prefers-reduced-motion: reduce)');
 const revealAll=()=>{observer?.disconnect();page.querySelectorAll('.xf-enter').forEach(el=>el.classList.remove('xf-enter'));};
 if(!media.matches&&'IntersectionObserver' in window){
  observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('xf-enter');observer?.unobserve(entry.target);}}),{rootMargin:'0px 0px -24px 0px',threshold:0.04});
  page.querySelectorAll('.xf-reveal,.mystery-watch>header,.mystery-note,.mystery-legacy').forEach(el=>{el.classList.add('xf-enter');observer.observe(el);});
 }
 media.addEventListener('change',()=>{if(media?.matches)revealAll();},{signal:controller.signal});
 page.addEventListener('click',event=>{
  if(!event.target.closest('[data-ufo-filter]'))return;
  // Filtering can expose a case beyond the observer's previous layout; never leave evidence hidden.
  revealAll();
  const list=page.querySelector('.ufo-grid');
  if(!media?.matches&&list?.animate)list.animate([{opacity:.6,transform:'translateY(7px)'},{opacity:1,transform:'none'}],{duration:260,easing:'ease-out'});
 },{signal:controller.signal});
}
window.ViceXFiles={html,init,destroy};
})();
