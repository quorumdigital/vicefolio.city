/* Radio refinements #26–32. Playback remains owned by radio-classics.js. */
(() => {
  'use strict';
  const A = window.ViceRev24;
  if (!A) return;
  const copy = {
    en: { archive: 'Radio Archive', intro: 'Your favorite dial, back on air. A collection of radio stations from past GTA games.', lead: 'The soundtrack doesn’t stop when you step out.', body: 'In the car or on foot, Jason and Lucia can keep listening through phone-connected headphones and earbuds. On-demand podcasts join the dial, with individual shows and episodes still being revealed.', caption: 'Jason and Lucia in a convertible · Rockstar Games', by: 'By', radio: 'Radio' },
    es: { archive: 'Archivo de radio', intro: 'Tu emisora favorita vuelve al aire. Una colección de emisoras de los anteriores juegos de GTA.', lead: 'La música no termina al salir del coche.', body: 'En el coche o a pie, Jason y Lucia pueden seguir escuchando con auriculares conectados al teléfono. Los pódcasts a la carta se suman a la radio; los programas y episodios aún se siguen presentando.', caption: 'Jason y Lucia en un descapotable · Rockstar Games', by: 'Por', radio: 'Radio' },
    'pt-br': { archive: 'Arquivo de rádio', intro: 'Sua rádio favorita está de volta. Uma coleção de estações dos jogos anteriores de GTA.', lead: 'A trilha sonora continua quando você sai do carro.', body: 'No carro ou a pé, Jason e Lucia podem continuar ouvindo com fones conectados ao celular. Podcasts sob demanda se juntam ao rádio, com programas e episódios ainda sendo revelados.', caption: 'Jason e Lucia em um conversível · Rockstar Games', by: 'Por', radio: 'Rádio' },
    de: { archive: 'Radioarchiv', intro: 'Dein Lieblingssender ist wieder auf Sendung. Eine Sammlung von Radiosendern aus früheren GTA-Spielen.', lead: 'Der Soundtrack läuft weiter, wenn du aussteigst.', body: 'Im Auto oder zu Fuß: Jason und Lucia können über Kopfhörer am Smartphone weiterhören. Podcasts auf Abruf ergänzen das Radio; einzelne Sendungen und Folgen werden noch vorgestellt.', caption: 'Jason und Lucia in einem Cabrio · Rockstar Games', by: 'Von', radio: 'Radio' },
    fr: { archive: 'Archives radio', intro: 'Votre station préférée reprend l’antenne. Une collection de stations issues des précédents GTA.', lead: 'La musique continue une fois sorti de la voiture.', body: 'En voiture ou à pied, Jason et Lucia peuvent continuer à écouter avec un casque ou des écouteurs reliés à leur téléphone. Des podcasts à la demande complètent la radio ; les émissions et épisodes se dévoilent encore.', caption: 'Jason et Lucia dans une décapotable · Rockstar Games', by: 'Par', radio: 'Radio' },
    it: { archive: 'Archivio radio', intro: 'La tua radio preferita torna in onda. Una raccolta di stazioni dei precedenti giochi di GTA.', lead: 'La colonna sonora continua anche fuori dall’auto.', body: 'In auto o a piedi, Jason e Lucia possono continuare ad ascoltare con cuffie e auricolari collegati al telefono. Alla radio si aggiungono podcast on demand; programmi ed episodi si stanno ancora svelando.', caption: 'Jason e Lucia in una decappottabile · Rockstar Games', by: 'Di', radio: 'Radio' },
    ru: { archive: 'Радиоархив', intro: 'Любимая станция снова в эфире. Коллекция радиостанций из прошлых игр GTA.', lead: 'Саундтрек не смолкает, когда выходишь из машины.', body: 'В машине или пешком Джейсон и Лусия могут продолжать слушать музыку через наушники, подключённые к телефону. К радио добавятся подкасты по запросу; отдельные программы и выпуски ещё раскрываются.', caption: 'Джейсон и Лусия в кабриолете · Rockstar Games', by: 'От', radio: 'Радио' }
  };
  const text = key => A.t(Object.fromEntries(Object.entries(copy).map(([lang, values]) => [lang, values[key]])));
  const escape = A.esc;

  function archiveHeading(heading) {
    if (!heading) return;
    const label = text('archive');
    const locale = A.locale();
    if (heading.dataset.r24RadioTitle === locale) return;
    A.setTitle(heading, label);
    heading.dataset.r24RadioTitle = locale;
    if (locale === 'de') {
      heading.innerHTML = '<span class="sr-only">' + escape(label) + '</span><span class="r24-radio-lettering" aria-hidden="true"><img src="assets/revision24-radio/radioarchiv.svg" alt="" width="581" height="100"></span>';
      return;
    }
    const words = label.toLocaleLowerCase().split(/\s+/);
    const artwork = words.every(word => window.HEADING_WORDS?.[word]);
    if (!artwork) return;
    heading.innerHTML = '<span class="sr-only">' + escape(label) + '</span><span class="r24-radio-lettering" aria-hidden="true">' + words.map(word => {
      const size = window.HEADING_SIZES?.[word];
      return '<img src="' + escape(window.HEADING_WORDS[word]) + '" alt=""' + (size ? ' width="' + size[0] + '" height="' + size[1] + '"' : '') + '>';
    }).join('') + '</span>';
  }

  function listeningPanel(panel) {
    if (!panel || panel.dataset.r24Listening === A.locale()) return;
    panel.dataset.r24Listening = A.locale();
    panel.setAttribute('data-no-localize', '');
    const title = window.VICE_RADIO_DATA?.listening?.title || 'Take the dial with you';
    panel.innerHTML = '<figure class="r24-radio-listening-art"><img src="assets/hd/photo-41.webp" alt="' + escape(text('caption').split(' · ')[0]) + '" width="1920" height="1080" loading="lazy"><figcaption>' + escape(text('caption')) + '</figcaption></figure><div class="r24-radio-listening-copy"><h2 class="r24-title">' + escape(title) + '</h2><p class="r24-radio-listening-lead">' + escape(text('lead')) + '</p><p>' + escape(text('body')) + '</p></div>';
  }

  function cleanArchive(section) {
    archiveHeading(section.querySelector('#gtfm-heading'));
    const intro = section.querySelector('.gtfm-intro>div>p');
    if (intro && intro.textContent !== text('intro')) intro.textContent = text('intro');
    if (!section.dataset.r24RadioClean) {
      section.dataset.r24RadioClean = 'true';
      // These hooks are queried by the existing playback controller. Keep them
      // inert and hidden; removing them would break game/station changes.
      const hooks = document.createElement('span');
      hooks.className = 'r24-radio-controller-hooks';
      hooks.hidden = true;
      hooks.setAttribute('aria-hidden', 'true');
      for (const selector of ['[data-gtfm-open]', '[data-gtfm-watch]']) {
        const link = section.querySelector(selector);
        if (link) { link.textContent = ''; link.tabIndex = -1; hooks.append(link); }
      }
      section.querySelector('.gtfm-links')?.remove();
      let footer = section.querySelector('.gtfm-footer');
      if (!footer) { footer = document.createElement('div'); footer.className = 'gtfm-footer'; section.append(footer); }
      footer.replaceChildren(hooks);
      const credit = document.createElement('p');
      credit.className = 'r24-radio-credit';
      footer.append(credit);
    }
    const credit = section.querySelector('.r24-radio-credit');
    const creditHTML = escape(text('by')) + ' <a href="https://youtube.com/@GTAVFM" target="_blank" rel="noopener noreferrer">@GTAVFM</a>';
    if (credit && credit.innerHTML !== creditHTML) credit.innerHTML = creditHTML;
    // The native player owns its interface. Only our own redundant hint is hidden,
    // including when the original controller replaces it after an embed error.
    const hint = section.querySelector('.gtfm-play-hint');
    if (hint) hint.hidden = true;
    // The legacy radio key is shared by the heading and neutral station genre.
    // Repair only that display label; selection and playlist data stay intact.
    section.querySelectorAll('.gtfm-station small').forEach(small => {
      if (/^(undefined|null)$/.test(small.textContent.trim()) || small.textContent.trim().toLocaleLowerCase() === text('archive').toLocaleLowerCase()) { small.setAttribute('data-no-localize', ''); small.textContent = text('radio'); }
    });
    const description = section.querySelector('[data-gtfm-description]');
    if (description) {
      const value = description.textContent;
      const archiveLabel = text('archive');
      const hasArchiveGenre = value.toLocaleLowerCase().startsWith(archiveLabel.toLocaleLowerCase() + ' ·');
      if (value.startsWith('undefined') || hasArchiveGenre) {
        description.setAttribute('data-no-localize', '');
        description.textContent = text('radio') + value.slice(hasArchiveGenre ? archiveLabel.length : 9);
      }
    }
  }

  A.register('radio', (route, doc) => {
    if (route !== 'radio') return;
    const page = doc.querySelector('.radio-page');
    if (!page) return;
    page.classList.add('r24-radio-page');
    page.querySelectorAll('.radio-history').forEach(node => node.remove());
    page.querySelectorAll(':scope>.quiet-credit').forEach(node => node.remove());
    listeningPanel(page.querySelector('.radio-on-foot'));
    const archive = page.querySelector('.gtfm-section');
    if (archive) cleanArchive(archive);
  });
})();
