(()=>{'use strict';
const popupSelector='.nav-group,.language-menu,.release-mini-settings';
const drawings={vehicles:'<path d="m4 10 2-5h12l2 5M3 10h18v8H3zM5 18v3m14-3v3M6 14h2m8 0h2"/>',items:'<path d="m4 7 8-4 8 4v11l-8 4-8-4Zm0 0 8 4 8-4m-8 4v11m-4-17 8 4"/>',people:'<circle cx="9" cy="8" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3m1-15a3 3 0 0 1 0 6m2 3c2 0 3 2 3 4v2"/>',fieldguide:'<path d="m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2Zm6-2v16m6-14v16"/>',radio:'<rect x="3" y="7" width="18" height="14" rx="2"/><path d="m6 7 12-5M6 11h12M6 15h5m-5 3h5"/><circle cx="17" cy="16" r="2"/>',music:'<path d="M9 18V5l11-2v13M9 9l11-2"/><ellipse cx="6" cy="18" rx="3" ry="2.5"/><ellipse cx="17" cy="16" rx="3" ry="2.5"/>',gallery:'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8" cy="8" r="1"/><path d="m3 17 6-6 4 4 3-3 5 5"/>',ufos:'<path d="M7.2 9.4c.5-2 2.2-3.1 4.8-3.1s4.3 1.1 4.8 3.1M2.3 11.5c0-1.6 4.3-2.9 9.7-2.9s9.7 1.3 9.7 2.9-4.3 2.9-9.7 2.9-9.7-1.3-9.7-2.9Zm.8 1.6c1.9 3 5 4.6 8.9 4.6s7-1.6 8.9-4.6M9 17.3v1h6v-1"/>',community:'<path d="M21 11a8 8 0 0 1-8 8H6l-4 3V11a9.5 9.5 0 0 1 19 0Z"/><path d="M7 10h10M7 14h6"/>'};
const popups=()=>[...document.querySelectorAll(popupSelector)];
const panelFor=popup=>popup.querySelector(':scope>.nav-dropdown,:scope>.language-options,:scope>label');
function place(popup){if(!popup.open)return;const panel=panelFor(popup);if(!panel)return;const width=document.documentElement.clientWidth,height=window.innerHeight;popup.classList.remove('menu-opens-up');panel.style.setProperty('--menu-shift','0px');panel.style.removeProperty('--menu-maxheight');let rect=panel.getBoundingClientRect();const anchor=popup.querySelector(':scope>summary').getBoundingClientRect(),below=height-rect.top-12;if(below<Math.min(panel.scrollHeight,220)&&anchor.top>below){popup.classList.add('menu-opens-up');rect=panel.getBoundingClientRect();panel.style.setProperty('--menu-maxheight',Math.max(80,anchor.top-22)+'px');}else panel.style.setProperty('--menu-maxheight',Math.max(80,below)+'px');const shift=rect.left<12?12-rect.left:rect.right>width-12?width-12-rect.right:0;panel.style.setProperty('--menu-shift',shift+'px');}
// Keep every close path (including legacy .open=false callers) in one lifecycle.
const nativeOpen=Object.getOwnPropertyDescriptor(HTMLDetailsElement.prototype,'open');
const managed=new WeakSet(),closing=new Map();
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
function cancelClose(popup){
 const state=closing.get(popup);if(!state)return;
 clearTimeout(state.timer);state.panel.removeEventListener('animationend',state.onEnd);
 state.panel.inert=state.wasInert;state.panel.style.removeProperty('--menu-close-opacity');state.panel.style.removeProperty('--menu-close-transform');
 closing.delete(popup);popup.classList.remove('menu-is-closing');
}
function manage(popup){
 if(managed.has(popup))return;managed.add(popup);
 // Scope this bridge to our dropdown instances; other details retain native behavior.
 Object.defineProperty(popup,'open',{configurable:true,get(){return nativeOpen.get.call(this);},set(value){if(value){cancelClose(this);nativeOpen.set.call(this,true);}else close(this);}});
}
function close(popup,restore=false){
 manage(popup);if(restore)popup.querySelector(':scope>summary')?.focus({preventScroll:true});
 if(!popup.open){cancelClose(popup);return;}if(closing.has(popup))return;
 const panel=panelFor(popup);
 if(reducedMotion.matches||!panel){cancelClose(popup);nativeOpen.set.call(popup,false);return;}
 const style=getComputedStyle(panel),state={panel,wasInert:panel.inert,timer:0,onEnd:null};
 panel.style.setProperty('--menu-close-opacity',style.opacity);panel.style.setProperty('--menu-close-transform',style.transform==='none'?'translateY(0)':style.transform);
 const finish=()=>{if(closing.get(popup)!==state)return;cancelClose(popup);nativeOpen.set.call(popup,false);};
 state.onEnd=event=>{if(event.target===panel&&event.animationName==='r25MenuLeave')finish();};
 closing.set(popup,state);panel.inert=true;panel.addEventListener('animationend',state.onEnd);popup.classList.add('menu-is-closing');
 state.timer=setTimeout(finish,180);
}
function openMenu(popup){manage(popup);cancelClose(popup);popup.open=true;popups().forEach(other=>{if(other!==popup&&other.open)close(other);});place(popup);}
// Native summary clicks also represent Enter/Space activation and mobile taps.
document.addEventListener('click',event=>{
 const summary=event.target.closest?.('summary'),popup=summary?.parentElement;
 if(!popup?.matches(popupSelector)||summary!==popup.querySelector(':scope>summary'))return;
 event.preventDefault();manage(popup);if(popup.open&&!closing.has(popup))close(popup);else openMenu(popup);
},true);
reducedMotion.addEventListener('change',event=>{if(!event.matches)return;[...closing.keys()].forEach(popup=>{cancelClose(popup);nativeOpen.set.call(popup,false);});});
function decorate(){popups().forEach(manage);document.querySelectorAll('.nav-dropdown>[data-nav]').forEach(link=>{if(link.querySelector('.menu-link-icon'))return;const drawing=drawings[link.dataset.nav];if(!drawing)return;const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('aria-hidden','true');svg.setAttribute('focusable','false');svg.classList.add('menu-link-icon');svg.innerHTML=drawing;link.prepend(svg);});popups().filter(popup=>popup.open).forEach(place);}
document.addEventListener('toggle',event=>{const popup=event.target;if(!popup.matches?.(popupSelector)||!popup.open)return;popups().forEach(other=>{if(other!==popup&&other.open)close(other);});place(popup);},true);
document.addEventListener('pointerdown',event=>{const summary=event.target.closest?.('summary');if(summary?.parentElement?.matches(popupSelector))return;popups().filter(popup=>popup.open&&!popup.contains(event.target)).forEach(popup=>close(popup));});
document.addEventListener('keydown',event=>{if(event.key!=='Escape')return;const opened=popups().filter(popup=>popup.open);if(!opened.length)return;opened.forEach(popup=>close(popup,popup.contains(document.activeElement)));});
window.addEventListener('hashchange',()=>popups().filter(popup=>popup.open).forEach(popup=>close(popup)));
let frame=0;function refresh(){if(frame)return;frame=requestAnimationFrame(()=>{frame=0;decorate();});}
window.addEventListener('resize',refresh,{passive:true});
window.visualViewport?.addEventListener('resize',refresh,{passive:true});
document.addEventListener('scroll',event=>{if(event.target===document||event.target===document.documentElement)refresh();},true);
new MutationObserver(records=>{if(records.some(record=>[...record.addedNodes].some(node=>node.nodeType===1)))refresh();}).observe(document.body,{childList:true,subtree:true});
decorate();
})();
