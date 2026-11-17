/* Consistent title roles. Fixed outlined artwork keeps the licensed font out of the site. */
(() => {
  'use strict';
  const extraWords = {"capo":"assets/lettering/words/title-capo.svg","model":"assets/lettering/words/title-model.svg","unnamed":"assets/lettering/words/title-unnamed.svg","mac-pattern":"assets/lettering/words/title-mac-pattern.svg","smg":"assets/lettering/words/title-smg.svg","m249-style":"assets/lettering/words/title-m249-style.svg","machine":"assets/lettering/words/title-machine.svg","ak-style":"assets/lettering/words/title-ak-style.svg","double-barrel":"assets/lettering/words/title-double-barrel.svg","grenade":"assets/lettering/words/title-grenade.svg","launcher":"assets/lettering/words/title-launcher.svg","molotov":"assets/lettering/words/title-molotov.svg","cocktail":"assets/lettering/words/title-cocktail.svg","share":"assets/lettering/words/title-share.svg","join":"assets/lettering/words/title-join.svg","shape":"assets/lettering/words/title-shape.svg","carry":"assets/lettering/words/title-carry.svg","pocket":"assets/lettering/words/title-pocket.svg","bank":"assets/lettering/words/title-bank.svg","small-store":"assets/lettering/words/title-small-store.svg","payday":"assets/lettering/words/title-payday.svg","check-cashing":"assets/lettering/words/title-check-cashing.svg","high-end":"assets/lettering/words/title-high-end.svg","pawn":"assets/lettering/words/title-pawn.svg","armored":"assets/lettering/words/title-armored.svg","regional":"assets/lettering/words/title-regional.svg","switch":"assets/lettering/words/title-switch.svg","partners":"assets/lettering/words/title-partners.svg","jobs":"assets/lettering/words/title-jobs.svg","album":"assets/lettering/words/title-album.svg","flying":"assets/lettering/words/title-flying.svg","saucers":"assets/lettering/words/title-saucers.svg","skunk":"assets/lettering/words/title-skunk.svg","ape":"assets/lettering/words/title-ape.svg","forest":"assets/lettering/words/title-forest.svg","figure":"assets/lettering/words/title-figure.svg","farm":"assets/lettering/words/title-farm.svg","monster":"assets/lettering/words/title-monster.svg","man":"assets/lettering/words/title-man.svg","sea":"assets/lettering/words/title-sea.svg","creatures":"assets/lettering/words/title-creatures.svg","ghosts":"assets/lettering/words/title-ghosts.svg","vampires":"assets/lettering/words/title-vampires.svg","bermuda":"assets/lettering/words/title-bermuda.svg","triangle":"assets/lettering/words/title-triangle.svg","space":"assets/lettering/words/title-space.svg","tradition":"assets/lettering/words/title-tradition.svg","volantes":"assets/lettering/words/title-ufo-0e759eba79f9.svg","criaturas":"assets/lettering/words/title-ufo-aefe383efa02.svg","fantasmas":"assets/lettering/words/title-ufo-b9b59a41cb0b.svg","vampiros":"assets/lettering/words/title-ufo-f0f80b3ce82e.svg","triángulo":"assets/lettering/words/title-ufo-560148aebe04.svg","bermudas":"assets/lettering/words/title-ufo-efba4317739c.svg","espacial":"assets/lettering/words/title-ufo-b0bc4f45119b.svg","tradición":"assets/lettering/words/title-ufo-53f002065cb0.svg","voadores":"assets/lettering/words/title-ufo-e3cd2cd9d2bc.svg","marinhas":"assets/lettering/words/title-ufo-2e23c6955288.svg","triângulo":"assets/lettering/words/title-ufo-a6e99968a934.svg","tradição":"assets/lettering/words/title-ufo-54ad35630716.svg","fliegende":"assets/lettering/words/title-ufo-07dfc2c8d63c.svg","untertassen":"assets/lettering/words/title-ufo-1b9552b8eab8.svg","seeungeheuer":"assets/lettering/words/title-ufo-ef503965f91a.svg","geister":"assets/lettering/words/title-ufo-95e4be93aedd.svg","vampire":"assets/lettering/words/title-ufo-d30d77bc8442.svg","bermudadreieck":"assets/lettering/words/title-ufo-dcf7702bfffb.svg","mysterientradition":"assets/lettering/words/title-ufo-c2b4e63c3531.svg","soucoupes":"assets/lettering/words/title-ufo-70c70e38d347.svg","monstres":"assets/lettering/words/title-ufo-63780aaed652.svg","marins":"assets/lettering/words/title-ufo-85adf0dc1094.svg","fantômes":"assets/lettering/words/title-ufo-b6556b96b1d4.svg","bermudes":"assets/lettering/words/title-ufo-f55fb81ec95b.svg","spatiale":"assets/lettering/words/title-ufo-20178371015f.svg","chez":"assets/lettering/words/title-ufo-53cba4ca74de.svg","volanti":"assets/lettering/words/title-ufo-8b81a000b5f3.svg","mostri":"assets/lettering/words/title-ufo-aeec1c76abef.svg","marini":"assets/lettering/words/title-ufo-4dbaaa7ca737.svg","fantasmi":"assets/lettering/words/title-ufo-14160a50ba45.svg","vampiri":"assets/lettering/words/title-ufo-48097e303097.svg","triangolo":"assets/lettering/words/title-ufo-e3bab892ac29.svg","spaziale":"assets/lettering/words/title-ufo-93f531a7cde4.svg","tradizione":"assets/lettering/words/title-ufo-472d1ee35d31.svg","corre":"assets/lettering/words/title-locale-08a23a269874.svg","peligro":"assets/lettering/words/title-locale-798148b671da.svg","cabeza":"assets/lettering/words/title-locale-ba03ef3ed310.svg","mejora":"assets/lettering/words/title-locale-a53d6ae45b67.svg","resistencia":"assets/lettering/words/title-locale-d8148f1fa626.svg","intención":"assets/lettering/words/title-locale-f775acf1af06.svg","equípate":"assets/lettering/words/title-locale-af519337a3a6.svg","compañeros":"assets/lettering/words/title-locale-0b7c7c67d854.svg","manera":"assets/lettering/words/title-locale-7cb9271de2bd.svg","golpes":"assets/lettering/words/title-locale-d5845d179ef7.svg","salvaje":"assets/lettering/words/title-locale-e451fbca603d.svg","modelo":"assets/lettering/words/title-locale-dab9c1872e02.svg","mac":"assets/lettering/words/title-locale-347ead6348e9.svg","ametralladora":"assets/lettering/words/title-locale-07496cb23f6e.svg","ligera":"assets/lettering/words/title-locale-9e6961108247.svg","m249":"assets/lettering/words/title-locale-6f17a26a9281.svg","ak":"assets/lettering/words/title-locale-0474aee45985.svg","exposición":"assets/lettering/words/title-locale-3282a9f5b2cb.svg","cañones":"assets/lettering/words/title-locale-409975f79e11.svg","lanzagranadas":"assets/lettering/words/title-locale-701d1ea5c001.svg","cóctel":"assets/lettering/words/title-locale-dbc3d388a593.svg","álbum":"assets/lettering/words/title-locale-64ce6b1417f3.svg","banda":"assets/lettering/words/title-locale-6e98a3cfd0a4.svg","bolso":"assets/lettering/words/title-locale-5bbccf89aed5.svg","risco":"assets/lettering/words/title-locale-0ad6c3c2c5a3.svg","desenvolva":"assets/lettering/words/title-locale-74a60af326b9.svg","saúde":"assets/lettering/words/title-locale-c66c104478d3.svg","fôlego":"assets/lettering/words/title-locale-c3acbb825880.svg","troque":"assets/lettering/words/title-locale-2576d6720100.svg","parceiros":"assets/lettering/words/title-locale-f9fe01ac5116.svg","jeito":"assets/lettering/words/title-locale-e6c0bec37f3d.svg","selvagem":"assets/lettering/words/title-locale-caff67c96b1d.svg","metralhadora":"assets/lettering/words/title-locale-cb76f3b4f499.svg","exposição":"assets/lettering/words/title-locale-a4e6c6e3293e.svg","espingarda":"assets/lettering/words/title-locale-55a69d724d4e.svg","cano":"assets/lettering/words/title-locale-e3155502a595.svg","duplo":"assets/lettering/words/title-locale-0ae76bc455e4.svg","lança-granadas":"assets/lettering/words/title-locale-721ecda293ed.svg","coquetel":"assets/lettering/words/title-locale-e45d191886f8.svg","gefährdet":"assets/lettering/words/title-locale-4f07de306b3a.svg","zahl":"assets/lettering/words/title-locale-b33de0d2f03c.svg","spiele":"assets/lettering/words/title-locale-6c64b8a39a0a.svg","baue":"assets/lettering/words/title-locale-f43da8b165db.svg","wechsle":"assets/lettering/words/title-locale-370656bca8cb.svg","rüste":"assets/lettering/words/title-locale-c3e152821dc1.svg","großen":"assets/lettering/words/title-locale-dd768d4635c2.svg","wildnis":"assets/lettering/words/title-locale-cc9c891ee526.svg","verstehen":"assets/lettering/words/title-locale-08197a884924.svg","speicher":"assets/lettering/words/title-locale-567adb7b124e.svg","capo-pistole":"assets/lettering/words/title-locale-41086e9774aa.svg","modell":"assets/lettering/words/title-locale-8d390b02441a.svg","unbenannt":"assets/lettering/words/title-locale-c605c60832f1.svg","mac-artige":"assets/lettering/words/title-locale-7e43d6066282.svg","m249-artiges":"assets/lettering/words/title-locale-90554bb82411.svg","leichtes":"assets/lettering/words/title-locale-ece9e03b2814.svg","mg":"assets/lettering/words/title-locale-191be3715bae.svg","ausgestelltes":"assets/lettering/words/title-locale-300513b523e1.svg","ak-artiges":"assets/lettering/words/title-locale-6b8457ca3d51.svg","doppelläufige":"assets/lettering/words/title-locale-69d91ef0f933.svg","granatwerfer":"assets/lettering/words/title-locale-e1a9321830c0.svg","molotowcocktail":"assets/lettering/words/title-locale-23748298ab1c.svg","danger":"assets/lettering/words/title-locale-222b3e11200d.svg","dépose":"assets/lettering/words/title-locale-be40b15fe0ed.svg","développez":"assets/lettering/words/title-locale-2b40073ce389.svg","changez":"assets/lettering/words/title-locale-e3ad83fe89af.svg","escient":"assets/lettering/words/title-locale-27ccae3f8749.svg","équipez-vous":"assets/lettering/words/title-locale-20af77054bd9.svg","partenaires":"assets/lettering/words/title-locale-04f79fc09f68.svg","façon":"assets/lettering/words/title-locale-9d5746b45c7e.svg","coups":"assets/lettering/words/title-locale-ba73a95b1941.svg","sauvage":"assets/lettering/words/title-locale-190629f67a2a.svg","mitrailleuse":"assets/lettering/words/title-locale-3a2cec4a8009.svg","légère":"assets/lettering/words/title-locale-3903f07e1772.svg","exposé":"assets/lettering/words/title-locale-0c852eee1eef.svg","canon":"assets/lettering/words/title-locale-3f7db446b5ac.svg","lance-grenades":"assets/lettering/words/title-locale-6407feb11781.svg","l’album":"assets/lettering/words/title-locale-34ed7ab7adc6.svg","contante":"assets/lettering/words/title-locale-b0313be72f02.svg","rischio":"assets/lettering/words/title-locale-c1c00c87df3d.svg","criterio":"assets/lettering/words/title-locale-8ac02c17145e.svg","sviluppa":"assets/lettering/words/title-locale-1a4a5d2f93a9.svg","complici":"assets/lettering/words/title-locale-94a34f7a6ab0.svg","l’altro":"assets/lettering/words/title-locale-c166db087005.svg","selvaggia":"assets/lettering/words/title-locale-9f515963d123.svg","modello":"assets/lettering/words/title-locale-6bec3945e2c5.svg","mitraglietta":"assets/lettering/words/title-locale-00b6c1b8eafe.svg","mitragliatrice":"assets/lettering/words/title-locale-999d087ba4c6.svg","leggera":"assets/lettering/words/title-locale-31f404bc703e.svg","esposizione":"assets/lettering/words/title-locale-725c4dc44ec8.svg","doppietta":"assets/lettering/words/title-locale-79b73c4084b2.svg","lanciagranate":"assets/lettering/words/title-locale-5e0152596a80.svg","ideas":"assets/lettering/words/title-locale-125baf5d44b0.svg","trocar":"assets/lettering/words/title-locale-b38aca7dfaea.svg","ideias":"assets/lettering/words/title-locale-7f856d44fb41.svg","austauschen":"assets/lettering/words/title-locale-d72b0dcbd238.svg","échanger":"assets/lettering/words/title-locale-4b24971c1786.svg","confrontarsi":"assets/lettering/words/title-locale-dc1f5570ce08.svg"};
  const extraSizes = {"capo":[237,100],"model":[296,100],"unnamed":[425,100],"mac-pattern":[632,100],"smg":[209,100],"m249-style":[559,100],"machine":[396,100],"ak-style":[414,100],"double-barrel":[670,100],"grenade":[384,100],"launcher":[439,100],"molotov":[427,100],"cocktail":[425,100],"share":[282,100],"join":[209,100],"shape":[281,100],"carry":[293,100],"pocket":[341,100],"bank":[238,100],"small-store":[600,100],"payday":[347,100],"check-cashing":[682,100],"high-end":[399,100],"pawn":[272,100],"armored":[425,100],"regional":[410,100],"switch":[362,100],"partners":[456,100],"jobs":[237,100],"album":[309,100],"flying":[297,100],"saucers":[396,100],"skunk":[294,100],"ape":[168,100],"forest":[333,100],"figure":[301,100],"farm":[257,100],"monster":[428,100],"man":[210,100],"sea":[168,100],"creatures":[501,100],"ghosts":[355,100],"vampires":[453,100],"bermuda":[425,100],"triangle":[414,100],"space":[281,100],"tradition":[473,100],"volantes":[443,100],"criaturas":[497,100],"fantasmas":[545,100],"vampiros":[466,100],"triángulo":[483,100],"bermudas":[482,100],"espacial":[409,100],"tradición":[469,100],"voadores":[454,100],"marinhas":[466,100],"triângulo":[483,100],"tradição":[440,100],"fliegende":[432,100],"untertassen":[618,100],"seeungeheuer":[630,100],"geister":[359,100],"vampire":[397,100],"bermudadreieck":[769,100],"mysterientradition":[962,100],"soucoupes":[508,100],"monstres":[485,100],"marins":[352,100],"fantômes":[475,100],"bermudes":[469,100],"spatiale":[412,100],"chez":[225,100],"volanti":[370,100],"mostri":[355,100],"marini":[324,100],"fantasmi":[460,100],"vampiri":[381,100],"triangolo":[483,100],"spaziale":[408,100],"tradizione":[513,100],"corre":[282,100],"peligro":[352,100],"cabeza":[338,100],"mejora":[367,100],"resistencia":[558,100],"intención":[457,100],"equípate":[415,100],"compañeros":[594,100],"manera":[368,100],"golpes":[323,100],"salvaje":[382,100],"modelo":[353,100],"mac":[209,100],"ametralladora":[740,100],"ligera":[296,100],"m249":[269,100],"ak":[124,100],"exposición":[507,100],"cañones":[396,100],"lanzagranadas":[734,100],"cóctel":[327,100],"álbum":[309,100],"banda":[295,100],"bolso":[280,100],"risco":[266,100],"desenvolva":[542,100],"saúde":[282,100],"fôlego":[314,100],"troque":[343,100],"parceiros":[480,100],"jeito":[257,100],"selvagem":[455,100],"metralhadora":[698,100],"exposição":[479,100],"espingarda":[537,100],"cano":[238,100],"duplo":[279,100],"lança-granadas":[766,100],"coquetel":[429,100],"gefährdet":[491,100],"zahl":[223,100],"spiele":[283,100],"baue":[226,100],"wechsle":[404,100],"rüste":[286,100],"großen":[396,100],"wildnis":[373,100],"verstehen":[490,100],"speicher":[411,100],"capo-pistole":[612,100],"modell":[338,100],"unbenannt":[514,100],"mac-artige":[545,100],"m249-artiges":[661,100],"leichtes":[401,100],"mg":[153,100],"ausgestelltes":[689,100],"ak-artiges":[515,100],"doppelläufige":[655,100],"granatwerfer":[697,100],"molotowcocktail":[875,100],"danger":[339,100],"dépose":[325,100],"développez":[525,100],"changez":[395,100],"escient":[358,100],"équipez-vous":[613,100],"partenaires":[585,100],"façon":[285,100],"coups":[293,100],"sauvage":[397,100],"mitrailleuse":[614,100],"légère":[299,100],"exposé":[324,100],"canon":[295,100],"lance-grenades":[728,100],"l’album":[378,100],"contante":[460,100],"rischio":[352,100],"criterio":[400,100],"sviluppa":[422,100],"complici":[421,100],"l’altro":[352,100],"selvaggia":[468,100],"modello":[395,100],"mitraglietta":[648,100],"mitragliatrice":[730,100],"leggera":[369,100],"esposizione":[552,100],"doppietta":[486,100],"lanciagranate":[698,100],"ideas":[254,100],"trocar":[355,100],"ideias":[282,100],"austauschen":[627,100],"échanger":[440,100],"confrontarsi":[658,100]};
  Object.assign(window.HEADING_WORDS || (window.HEADING_WORDS = {}), extraWords);
  Object.assign(window.HEADING_SIZES || (window.HEADING_SIZES = {}), extraSizes);

  const targets = 'h1,h2,h3,h4,.guide-title,.region-explorer>summary,.quick-link strong:not(.game-label),.finish-copy>strong';
  const protectedScenes = '.r24-title,.state-heading,.cash-safety h2,.cash-limit-note h3,.money-protect-scene h2,#gtfm-heading,.hero,.xfiles-opening,.xfiles-hero,.music-player,.site-music-player,#music-player';
  const compactTitles = '.vehicle-group-heading,.weapon-group-heading,.map-selection,.map-topline,.credit-group,.credit-attribution,.map-detail-body';
  const cardTitles = '.card,.region-caption,.ufo-card,.opportunity-title,.guide-card-heading,.coverage-card,.reference-banner,.music-card,.radio-card,.mystery-note,.mystery-legacy,.field-note-story';
  let applying = false;

  function roleFor(el) {
    if (el.matches('.guide-title,.finish-copy>strong')) return 'card';
    if (el.closest(compactTitles)) return 'compact';
    if (el.matches('#dialog-title') || el.matches('dialog h2,.artwork-viewer h2,.photo-label h2')) return 'dialog';
    if (el.tagName === 'H1') return 'page';
    if (el.matches('.quick-link strong,.region-explorer>summary')) return 'card';
    if (el.closest(cardTitles) && /H[23]/.test(el.tagName)) return 'card';
    if (el.tagName === 'H2') return 'section';
    return 'subsection';
  }

  function textFor(el) {
    const label = el.querySelector(':scope > .sr-only');
    if (label) return label.textContent.replace(/\s+/g, ' ').trim();
    const clone = el.cloneNode(true);
    clone.querySelectorAll('br').forEach(br => br.replaceWith(' '));
    clone.querySelectorAll('svg,[aria-hidden="true"]').forEach(node => node.remove());
    return clone.textContent.replace(/\s+/g, ' ').trim();
  }

  function tokensFor(text) {
    return text.toLowerCase().split(/\s+/).map(word => {
      if (/^[-–—·]$/.test(word)) return { separator: word };
      if (window.HEADING_WORDS[word]) return { word };
      // Terminal punctuation must not silently change an entire title's font.
      const base = word.replace(/^["“‘]+|[.,:;!?"”’]+$/g, '');
      if (base && window.HEADING_WORDS[base]) return { word: base };
      return null;
    });
  }

  function setText(el, text) {
    if (el.dataset.wordArt || el.querySelector(':scope > .title-words')) el.textContent = text;
    delete el.dataset.wordArt;
    el.classList.remove('game-title');
    el.dataset.titleMode = 'text';
  }

  function setArtwork(el, text, tokens) {
    if (el.dataset.titleMode === 'art' && el.dataset.titleText === text && el.querySelector(':scope > .title-words')) return;
    const label = document.createElement('span');
    label.className = 'sr-only';
    label.textContent = text;
    const line = document.createElement('span');
    line.className = 'title-words';
    line.setAttribute('aria-hidden', 'true');
    tokens.forEach(token => {
      if (token.separator) {
        const dash = document.createElement('span');
        dash.className = 'title-separator';
        dash.textContent = token.separator;
        line.append(dash);
      } else {
        const img = document.createElement('img');
        const size = window.HEADING_SIZES[token.word];
        img.src = window.HEADING_WORDS[token.word];
        img.alt = '';
        img.width = size[0];
        img.height = size[1];
        img.decoding = 'async';
        line.append(img);
      }
    });
    el.replaceChildren(label, line);
    el.classList.add('game-title');
    el.dataset.wordArt = 'true';
    el.dataset.titleMode = 'art';
    el.dataset.titleText = text;
  }

  function apply() {
    if (applying) return;
    applying = true;
    try {
      window.localizePage?.();
      const russian = window.VICE_LOCALE === 'ru' || document.documentElement.lang === 'ru';
      const entries = [...document.querySelectorAll(targets)]
        .filter(el => !el.closest(protectedScenes))
        .map(el => ({ el, role: roleFor(el), text: textFor(el) }))
        .filter(entry => entry.text);
      // Use one fallback for an entire peer role, never a random font on one card.
      const fallback = new Set();
      for (const entry of entries) {
        if (['compact', 'subsection'].includes(entry.role)) continue;
        if (entry.el.querySelector('.heading-art')) continue;
        entry.tokens = tokensFor(entry.text);
        if (entry.tokens.some(token => !token)) fallback.add(entry.role);
      }
      for (const { el, role, text, tokens } of entries) {
        el.classList.add('atlas-title');
        el.dataset.titleRole = role;
        if (el.querySelector('.heading-art')) continue;
        if (el.querySelector('button,a,input,select')) continue;
        if (russian || role !== 'page' || fallback.has(role)) setText(el, text);
        else setArtwork(el, text, tokens);
      }
      window.ViceTitles.lastAudit = {
        locale: window.VICE_LOCALE || 'en',
        count: entries.length,
        fallbackRoles: [...fallback],
        missing: entries.filter(e => e.tokens?.some(t => !t)).map(e => ({ role: e.role, text: e.text }))
      };
    } finally { applying = false; }
  }

  window.ViceTitles = { apply, lastAudit: null };
  // app.js's existing observer resolves this global on every route/dialog update.
  window.applyHeadingArt = apply;
  apply();
})();
