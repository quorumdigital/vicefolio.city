/* Revision 24: map palette and catalog/character presentation. */
(()=>{
'use strict';
const R=window.ViceRev24;if(!R)return;
const titles={en:'State of Leonida map',es:'Mapa del estado de Leonida','pt-br':'Mapa do estado de Leonida',de:'Karte des Bundesstaats Leonida',fr:'Carte de l’État de Leonida',it:'Mappa dello stato di Leonida',ru:'Карта штата Леонида'};
const coverage={en:'Counts show places added to ViceFolio, not every location in the game. A zero means we’re still looking for a reliable match.',es:'Las cifras muestran los lugares añadidos a ViceFolio, no todos los del juego. Un cero significa que seguimos buscando una coincidencia fiable.','pt-br':'Os números mostram os locais incluídos no ViceFolio, não todos os do jogo. Zero significa que ainda buscamos uma identificação confiável.',de:'Die Zahlen zählen Orte in ViceFolio, nicht alle Orte im Spiel. Bei null suchen wir noch nach einer zuverlässigen Zuordnung.',fr:'Les chiffres comptent les lieux ajoutés à ViceFolio, pas tous ceux du jeu. Zéro signifie que nous cherchons encore une correspondance fiable.',it:'I numeri contano i luoghi aggiunti a ViceFolio, non tutti quelli del gioco. Uno zero indica che cerchiamo ancora una corrispondenza affidabile.',ru:'Числа показывают места, добавленные в ViceFolio, а не все места в игре. Ноль означает, что надёжное совпадение ещё ищется.'};
// Only the presentation color in each category tuple changes. Identifiers,
// category names, source records, saved places and storage keys remain intact.
const colors={'#79b8f3':'#7ebeea','#c77bb4':'#a0ced5','#f4a25f':'#edb97c','#c59af0':'#9facdf','#d092c1':'#6fc5d7','#f3b566':'#e6be7d','#d296c3':'#8fc7b6','#f5a688':'#e7ad89','#c5ccd6':'#bdcddb','#c475b0':'#b4c589','#ed7c91':'#e0aa80','#aaa8b9':'#a8becb','#ef8dd0':'#86c4df'};
function mapColors(){for(const meta of Object.values(window.MAP_CATEGORIES||{})){const next=colors[String(meta[2]).toLowerCase()];if(next)meta[2]=next;}}
mapColors();
const noteText=[
  "Erwartung anhand der Bauart: Auf Straßen ausgelegt; die Leistung auf unebenem Gelände wurde noch nicht vergleichend gemessen.",
  "Orientación según el diseño: Orientado a carretera; su rendimiento sobre terreno irregular aún no se ha medido.",
  "Hypothèse fondée sur le design : un modèle pensé pour la route ; ses performances comparées sur terrain accidenté n’ont pas été mesurées.",
  "Aspettativa basata sul design: concepita per la strada; le prestazioni comparative sui terreni sconnessi non sono state misurate.",
  "Expectativa pelo design: projeto voltado ao asfalto; o desempenho em terreno irregular ainda não foi comparado em testes.",
  "Ожидания по конструкции: модель для дорог; сравнительные показатели на пересечённой местности пока не измерены.",
  "Design-based expectation: Road-focused design; comparative rough-terrain performance is not measured.",
  "Published locations and edition access describe the available evidence. Repeatable spawns and exact story requirements will be checked after release.",
  "Veröffentlichte Fundorte und Editionszugang beschreiben die verfügbaren Belege. Wiederholbare Spawns und genaue Story-Voraussetzungen werden nach Release geprüft.",
  "Los lugares y las ediciones indicados reflejan la información publicada. Las apariciones repetibles y los requisitos de historia se comprobarán tras el lanzamiento.",
  "Les lieux publiés et l’accès selon l’édition présentent les preuves disponibles. La répétition des apparitions et les conditions précises de progression seront vérifiées après la sortie.",
  "I luoghi documentati e l’accesso per edizione descrivono le prove disponibili. Le comparse ripetibili e i requisiti esatti della storia saranno verificati dopo l’uscita.",
  "Os locais publicados e o acesso por edição descrevem as evidências disponíveis. Aparições repetíveis e os requisitos exatos da história serão verificados após o lançamento.",
  "Опубликованные места и условия доступа в разных изданиях отражают имеющиеся сведения. Повторяемые появления и точные требования к сюжету будут проверены после релиза."
];
const normalized=s=>String(s||'').replace(/\s+/g,' ').trim();
const removedNotes=new Set(noteText.map(normalized));
function text(el,value){if(el&&el.textContent!==value)el.textContent=value;}
function map(route,doc){
 mapColors();if(route!=='world')return;
 const room=doc.querySelector('#atlas-map-room');if(!room)return;
 room.classList.add('r24-map-room');
 const title=R.t(titles);
 R.setTitle(room.querySelector('.map-heading h1'),title);
 text(room.querySelector('.map-heading .eyebrow'),'ViceFolio / '+R.t({en:'Leonida',es:'Leonida','pt-br':'Leonida',de:'Leonida',fr:'Leonida',it:'Leonida',ru:'Леонида'}));
 text(room.querySelector('.map-coverage-note'),R.t(coverage));
 if(doc.title!==title+' — ViceFolio')doc.title=title+' — ViceFolio';
 // New and existing category icons, pin icons and the key retain one palette.
 room.querySelectorAll('.map-pin-shape,.map-category-icon,.map-result-glyph,.map-result-symbol').forEach(el=>{
  const pin=el.style.getPropertyValue('--pin-color');if(pin&&colors[pin.toLowerCase()])el.style.setProperty('--pin-color',colors[pin.toLowerCase()]);
  const value=el.getAttribute('style');if(!value)return;
  const next=value.replace(/#[\da-f]{6}\b/gi,c=>colors[c.toLowerCase()]||c);
  if(next!==value)el.setAttribute('style',next);
 });
}
function vehicleDetails(doc){
 const content=doc.querySelector('#dialog-content');if(!content)return;
 const gallery=content.querySelector('[data-item-gallery]');
 const entry=window.ATLAS?.catalog?.find(x=>x.id===gallery?.dataset.itemGallery);
 const body=content.querySelector('.detail-body');if(!body)return;
 body.classList.toggle('r24-vehicle-dossier',entry?.category==='vehicles');
 if(entry?.category!=='vehicles')return;
 body.querySelectorAll('.dossier-performance>p.evidence-note,.dossier-background>p.evidence-note').forEach(p=>{
  if(removedNotes.has(normalized(p.textContent)))p.remove();
 });
}
function catalog(route,doc){
 if(route==='items'){
  doc.querySelectorAll('#main .catalog-evidence,#main .catalog-compare-link').forEach(el=>el.remove());
  const tabLabels={weapons:'Weapons',gear:'Gear & apparel',services:'Shops & activities'};
  doc.querySelectorAll('#main [data-catalog-tab]').forEach(button=>R.setTitle(button,R.t(tabLabels[button.dataset.catalogTab]||button.textContent))); 
  const hero=doc.querySelector('.cinematic-items');
  if(hero){hero.classList.add('r24-equipment-hero');hero.querySelector('.scene-scroll')?.classList.add('r24-equipment-cta');}
 }
 if(route==='people')doc.querySelector('.cinematic-people')?.classList.add('r24-people-hero');
 vehicleDetails(doc);
}
R.register('catalog-map',(route,doc)=>{map(route,doc);catalog(route,doc);});
})();
