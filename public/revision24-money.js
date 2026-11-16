/* Confirmed refinements 9, 10 and 13: money hero, persistent guidance and earning routes. */
(()=>{'use strict';
const R=window.ViceRev24;if(!R)return;
const copy={
 en:{guide:'THE MONEY GUIDE',keep:'Keep the take',half:'Getting paid is only half of it.',escape:'Escape',sell:'Sell the loot',deposit:'Deposit the cash',routes:'Explore earning routes',buyers:'Find buyers on the map',steps:'From the escape to the deposit',art:'Jason and Lucia carrying their take through a warehouse — official GTA VI artwork',tabs:'Money guide sections'},
 es:{guide:'GUÍA DEL DINERO',keep:'Conserva las ganancias',half:'Cobrar es solo la mitad.',escape:'Escapa',sell:'Vende el botín',deposit:'Deposita el efectivo',routes:'Explora las vías de ingresos',buyers:'Busca compradores en el mapa',steps:'De la huida al depósito',art:'Jason y Lucia llevan su botín por un almacén — ilustración oficial de GTA VI',tabs:'Secciones de la guía del dinero'},
 'pt-br':{guide:'GUIA DE DINHEIRO',keep:'Proteja os ganhos',half:'Receber é só metade do trabalho.',escape:'Fuja',sell:'Venda o saque',deposit:'Deposite o dinheiro',routes:'Explore as formas de ganhar',buyers:'Encontre compradores no mapa',steps:'Da fuga ao depósito',art:'Jason e Lucia carregam seu saque por um armazém — arte oficial de GTA VI',tabs:'Seções do guia de dinheiro'},
 de:{guide:'DER GELD-GUIDE',keep:'Sichere die Beute',half:'Bezahlt zu werden ist erst die Hälfte.',escape:'Entkomme',sell:'Verkaufe die Beute',deposit:'Zahle das Geld ein',routes:'Verdienstmöglichkeiten entdecken',buyers:'Käufer auf der Karte finden',steps:'Von der Flucht zur Einzahlung',art:'Jason und Lucia tragen ihre Beute durch eine Lagerhalle — offizielles GTA-VI-Motiv',tabs:'Abschnitte des Geld-Guides'},
 fr:{guide:'LE GUIDE DE L’ARGENT',keep:'Gardez les gains',half:'Être payé ne fait que la moitié du travail.',escape:'Échappez-vous',sell:'Vendez le butin',deposit:'Déposez l’argent',routes:'Explorez les sources de revenus',buyers:'Trouvez des acheteurs sur la carte',steps:'De la fuite au dépôt',art:'Jason et Lucia emportent leur butin dans un entrepôt — illustration officielle de GTA VI',tabs:'Sections du guide de l’argent'},
 it:{guide:'LA GUIDA AL DENARO',keep:'Tieniti i guadagni',half:'Essere pagati è solo metà del lavoro.',escape:'Scappa',sell:'Vendi il bottino',deposit:'Deposita i contanti',routes:'Esplora le fonti di guadagno',buyers:'Trova compratori sulla mappa',steps:'Dalla fuga al deposito',art:'Jason e Lucia trasportano il bottino in un magazzino — illustrazione ufficiale di GTA VI',tabs:'Sezioni della guida al denaro'},
 ru:{guide:'ДЕНЕЖНЫЙ ГАЙД',keep:'Сохрани добычу',half:'Получить деньги — лишь половина дела.',escape:'Уйди от погони',sell:'Продай добычу',deposit:'Внеси деньги на счёт',routes:'Изучи способы заработка',buyers:'Найди покупателей на карте',steps:'От побега до внесения денег',art:'Джейсон и Люсия несут добычу через склад — официальный арт GTA VI',tabs:'Разделы денежного гайда'}
};
function enhance(route,doc){
 if(route!=='money')return;
 const page=doc.querySelector('.money-story-page');if(!page)return;
 const c=copy[R.locale()]||copy.en;
 if(!page.dataset.r24Money){
  page.dataset.r24Money='true';
  const hero=page.querySelector('.cinematic-money'),lower=page.querySelector('.money-protect-scene'),cash=page.querySelector('.cash-safety'),nav=page.querySelector('.money-chapter-nav');
  if(hero){
   const image=hero.querySelector('.scene-image'),scene=hero.querySelector('.scene-copy'),intro=scene?.querySelector(':scope > p'),originalIntro=intro?.textContent||'',lowerBody=lower?.querySelector(':scope > div > p')?.textContent||window.VICE_MONEY_CONTENT?.cashSafety?.sellBody||'';
   hero.classList.add('r24-money-hero');hero.id='money-protection';
   if(image){image.src=lower?.querySelector(':scope > img')?.getAttribute('src')||'assets/hd/photo-46.webp';image.alt=c.art;image.setAttribute('width','3840');image.setAttribute('height','2160');image.style.removeProperty('object-position');}
   if(scene){
    const eyebrow=scene.querySelector('.eyebrow');if(eyebrow)eyebrow.textContent=c.guide;
    const h1=scene.querySelector('h1');if(h1){R.setTitle(h1,c.keep+' — '+c.half);h1.dataset.art='true';h1.dataset.noLocalize='';h1.classList.add('r24-money-heading');h1.innerHTML='<span class="r24-money-title-main">'+R.esc(c.keep)+'</span><span class="r24-money-title-second">— '+R.esc(c.half)+'</span>';}
    if(intro){intro.textContent=lowerBody;intro.classList.add('r24-money-intro');}
    const flow=doc.createElement('ol');flow.className='r24-money-flow';flow.setAttribute('aria-label',c.steps);flow.innerHTML=[c.escape,c.sell,c.deposit].map((label,i)=>'<li><span aria-hidden="true">0'+(i+1)+'</span><strong>'+R.esc(label)+'</strong></li>').join('');
    if(intro)intro.before(flow);else scene.append(flow);
    const foot=scene.querySelector('.scene-foot');if(foot){foot.querySelector(':scope > span')?.remove();foot.classList.add('r24-money-actions');}
    const explore=scene.querySelector('[data-scene-scroll="money-opportunities"]');if(explore){explore.classList.add('r24-money-explore');explore.innerHTML=R.esc(c.routes)+' <span aria-hidden="true">↓</span>';}
    const map=lower?.querySelector('a[href$="#world?scope=money-fences"]');if(map){map.classList.add('r24-money-map');map.innerHTML=R.esc(c.buyers)+' <span aria-hidden="true">↗</span>';(foot||scene).append(map);}
    const opening=page.querySelector('#money-opportunities .section-heading > div');if(opening){const heading=opening.querySelector('h2');R.setTitle(heading,c.routes+'.');const description=doc.createElement('p');description.className='r24-money-routes-intro';description.textContent=originalIntro;opening.append(description);}
   }
   lower?.remove();
  }
  // Move the live nodes so existing calculator state and handlers remain intact.
  if(cash&&nav){cash.removeAttribute('data-money-pane');cash.hidden=false;cash.after(nav);}
  if(nav){nav.setAttribute('aria-label',c.tabs);nav.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;const tabs=[...nav.querySelectorAll('[data-money-section]')],current=tabs.indexOf(event.target.closest('[data-money-section]'));if(current<0)return;event.preventDefault();const next=event.key==='Home'?0:event.key==='End'?tabs.length-1:(current+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;tabs[next].focus();tabs[next].click();});nav.addEventListener('click',()=>queueMicrotask(()=>{for(const tab of nav.querySelectorAll('[data-money-section]'))tab.tabIndex=tab.getAttribute('aria-selected')==='true'?0:-1;}));}
  page.querySelectorAll('.money-opportunity').forEach(card=>{const art=card.querySelector('.opportunity-image img')?.getAttribute('src');if(art)card.style.setProperty('--r24-opportunity-art','url("'+art.replace(/["\\]/g,'')+'")');const title=card.querySelector('.opportunity-title h3');const method=window.VICE_MONEY_CONTENT?.methods.find(m=>m.id===card.querySelector('[data-money-method]')?.dataset.moneyMethod);if(title)R.setTitle(title,method?.title||title.textContent);});
 }
 // Only change an attribute when needed; mutation passes keep the selected tab accessible.
 page.querySelectorAll('.money-chapter-nav [data-money-section]').forEach(tab=>{const n=tab.getAttribute('aria-selected')==='true'?0:-1;if(tab.tabIndex!==n)tab.tabIndex=n;});
}
R.register('money',enhance);
})();
