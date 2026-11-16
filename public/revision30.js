/* Scoped, idempotent follow-up to the existing enhancement registry. */
(()=>{'use strict';const R=window.ViceRev24;if(!R)return;
R.register('november-followup',(route,doc)=>{
 const menu=doc.querySelector('.nav-dropdown-explore'),last=menu?.querySelector('[data-nav="ufos"]');if(last&&menu.lastElementChild!==last)menu.append(last);
 if(route==='ufos'){
  const img=doc.querySelector('#ufo-online>figure>img');
  if(img&&!img.dataset.r30Fallback){img.dataset.r30Fallback='1';const fallback=()=>{img.src='/assets/archive/ufo-business-battle.webp';const caption=img.nextElementSibling;if(caption)caption.textContent='GTA Online · UFO Business Battle · GTABase';};img.addEventListener('error',fallback,{once:true});if(img.complete&&!img.naturalWidth)fallback();}
 }
 if(route==='radio'){
  const credit=doc.querySelector('.gtfm-creator-credit');
  if(credit&&R.locale()==='en'){const content='Featured playlist selected for ViceFolio. Other radio archives by <a href="https://youtube.com/@GTAVFM" target="_blank" rel="noopener noreferrer">GTA FM</a>.';if(credit.innerHTML!==content)credit.innerHTML=content;}
 }
 if(route==='fieldguide'){
  const heading=doc.querySelector('.cinematic-fieldguide .state-heading');
  if(heading&&!heading.querySelector('.r30-welcome')){const welcome=doc.createElement('span');welcome.className='r30-welcome';welcome.textContent=R.t({en:'WELCOME TO',es:'BIENVENIDO A','pt-br':'BEM-VINDO A',fr:'BIENVENUE EN',de:'WILLKOMMEN IN',it:'BENVENUTI IN',ru:'ДОБРО ПОЖАЛОВАТЬ'});heading.prepend(welcome);}
 }
 if(route==='world'&&R.locale()==='en'){
  const h=doc.querySelector('.map-heading h1');if(h&&!h.querySelector('.r30-map-art')){h.classList.add('r30-map-heading');h.dataset.titleMode='text';const img=doc.createElement('img');img.className='r30-map-art';img.src='/assets/revision30/map-title.svg';img.alt='State of Leonida map';h.replaceChildren(img);}
 }
 if(route==='money'){
  const hero=doc.querySelector('.r24-money-hero');if(hero&&!hero.dataset.r30Money){hero.dataset.r30Money='1';const risk=hero.querySelector('.r26-money-risk'),limit=hero.querySelector('.r26-money-limit'),actions=hero.querySelector('.r24-money-actions');if(risk&&actions)risk.append(actions);
   if(R.locale()==='en'){
    const intro=hero.querySelector('.r24-money-intro');if(intro)intro.textContent='Think through the whole job: leave yourself a way out, check who can buy the loot, and make a plan for the proceeds. Buyer access may depend on story progress.';
    if(limit){limit.querySelector('h2').textContent='Plan what you carry.';limit.querySelector('p').textContent='A $20,000 cash limit has been reported, but the final limit still needs in-game verification. Plan deposits between jobs and leave room for the next take; see the carry-limit guidance below.';}
    if(risk){risk.querySelector('h2').textContent='Pocket cash is at risk.';risk.querySelector('p').textContent='The getaway is part of the job. Get clear of the pursuit, decide where the proceeds should go, and plan a deposit before taking on another score. Keep the cash-safety checklist close.';}
   }
  }
 }
});
})();
