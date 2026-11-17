/* GTA FM's verified station playlists. Streaming stays with YouTube. */
(() => {
  'use strict';
  const channel = 'https://youtube.com/@GTAVFM';
  const playlists = [
    { id:'san-andreas', name:'San Andreas', list:'PL-vB0QZpsqn5YOxOaCIKCjoNxtgARzgFs' },
    { id:'gta-iv', name:'GTA IV', list:'PL-vB0QZpsqn5bf1UQIRvDIazlDCjVKPdP' },
    { id:'gta-v', name:'GTA V', list:'PL-vB0QZpsqn4TguQJ9MK0nvCAov-AHtFG' }
  ];
  const defaultPlaylist = {id:'vicefolio',name:'Vice City',list:'PLTeVTNvOhdv0'};
  playlists.unshift(defaultPlaylist);
  const featuredStations = [{"name":"Fever 105","video":"2KOTYup9mVA","genre":"funk","duration":""},{"name":"Flash FM","video":"B-8EORB783c","genre":"pop","duration":""},{"name":"Wildstyle FM","video":"hi9BzAU-8s4","genre":"radio","duration":""},{"name":"V-Rock","video":"gaLUKr_N03Q","genre":"rock","duration":""},{"name":"Espantoso","video":"gzU550dzlpY","genre":"radio","duration":""},{"name":"Emotion 98.3","video":"OBwApjyhDm0","genre":"ballads","duration":""},{"name":"Wave 103","video":"rMq7EngebO0","genre":"wave","duration":""},{"name":"K-Chat","video":"FMK-9lee2bs","genre":"radio","duration":""}];
  const defaultStation = {name:'Fever 105',video:'2KOTYup9mVA',duration:'',genre:'funk'};
  const storiesDefault = {name:'Flash FM',video:'039FXJYvJXw',duration:'1:04:50',genre:'pop'};
  const storiesStations = [
    storiesDefault,
    {name:'Paradise FM',video:'WkyCRene4e8',duration:'35:13',genre:'radio'},
    {name:'Fresh 105 FM',video:'9kYDI2o-L8U',duration:'27:06',genre:'radio'},
    {name:'Espantoso',video:'KWVmNS6hX4I',duration:'30:28',genre:'radio'},
    {name:'V-Rock',video:'DosHwbob6G4',duration:'59:45',genre:'rock'}
  ];
  const stations = [
    { name:'Flash FM', video:'oC1nc0UqXRc', duration:'', genre:'pop' },
    { name:'V-Rock', video:'Up2qr5K6zc4', duration:'1:09:25', genre:'rock' },
    { name:'Wave 103', video:'utK2tcVdDu0', duration:'57:59', genre:'wave' },
    { name:'Emotion 98.3', video:'1vU4BF5-kvQ', duration:'59:25', genre:'ballads' },
    { name:'Fever 105', video:'icbXPB5vqCs', duration:'1:03:19', genre:'funk' }
  ];
  const copy = {
    en:{radio:"Radio archive",intro:'Your favorite dial, back on air. Start with Flash FM, then explore GTA FM’s radio archives.',playlist:'Choose a game',station:'Selected station',archive:'Selected playlist',play:'Press play in the player to listen.',open:'Open playlist',channel:'Visit GTA FM',watch:'Watch on YouTube',fallback:'If the player is unavailable, listen directly on YouTube.',choose:'Vice City stations',credit:'Station recordings and playlists by GTA FM on YouTube.',pop:'80s pop',rock:'Hard rock',wave:'New wave',ballads:'Power ballads',funk:'Funk and soul',collection:'Radio stations from'},
    es:{radio:"Archivo de radio",intro:'Tu emisora favorita vuelve al aire. Empieza con Flash FM y explora el archivo de radio de GTA FM.',playlist:'Elige un juego',station:'Emisora seleccionada',archive:'Lista seleccionada',play:'Pulsa reproducir en el reproductor para escuchar.',open:'Abrir lista',channel:'Visitar GTA FM',watch:'Ver en YouTube',fallback:'Si el reproductor no está disponible, escucha directamente en YouTube.',choose:'Emisoras de Vice City',credit:'Grabaciones y listas de GTA FM en YouTube.',pop:'Pop de los 80',rock:'Hard rock',wave:'New wave',ballads:'Baladas rock',funk:'Funk y soul',collection:'Emisoras de'},
    'pt-br':{radio:"Arquivo de rádio",intro:'Sua rádio favorita está de volta. Comece pela Flash FM e explore o arquivo de rádio da GTA FM.',playlist:'Escolha um jogo',station:'Estação selecionada',archive:'Playlist selecionada',play:'Toque em reproduzir no player para ouvir.',open:'Abrir playlist',channel:'Visitar GTA FM',watch:'Assistir no YouTube',fallback:'Se o player estiver indisponível, ouça diretamente no YouTube.',choose:'Estações de Vice City',credit:'Gravações e playlists da GTA FM no YouTube.',pop:'Pop dos anos 80',rock:'Hard rock',wave:'New wave',ballads:'Baladas de rock',funk:'Funk e soul',collection:'Estações de rádio de'},
    de:{radio:"Radioarchiv",intro:'Dein Lieblingssender ist zurück. Beginne mit Flash FM und entdecke das Radioarchiv von GTA FM.',playlist:'Spiel auswählen',station:'Ausgewählter Sender',archive:'Ausgewählte Playlist',play:'Zum Hören im Player auf Wiedergabe drücken.',open:'Playlist öffnen',channel:'GTA FM besuchen',watch:'Auf YouTube ansehen',fallback:'Falls der Player nicht verfügbar ist, höre direkt auf YouTube.',choose:'Sender aus Vice City',credit:'Senderaufnahmen und Playlists von GTA FM auf YouTube.',pop:'80er-Pop',rock:'Hardrock',wave:'New Wave',ballads:'Rockballaden',funk:'Funk und Soul',collection:'Radiosender aus'},
    fr:{radio:"Archives radio",intro:'Votre station préférée reprend l’antenne. Commencez par Flash FM, puis explorez les archives de GTA FM.',playlist:'Choisir un jeu',station:'Station sélectionnée',archive:'Playlist sélectionnée',play:'Appuyez sur lecture dans le lecteur pour écouter.',open:'Ouvrir la playlist',channel:'Visiter GTA FM',watch:'Regarder sur YouTube',fallback:'Si le lecteur est indisponible, écoutez directement sur YouTube.',choose:'Stations de Vice City',credit:'Enregistrements et playlists de GTA FM sur YouTube.',pop:'Pop des années 80',rock:'Hard rock',wave:'New wave',ballads:'Ballades rock',funk:'Funk et soul',collection:'Stations de radio de'},
    it:{radio:"Archivio radio",intro:'La tua radio preferita torna in onda. Inizia da Flash FM, poi esplora l’archivio radio di GTA FM.',playlist:'Scegli un gioco',station:'Stazione selezionata',archive:'Playlist selezionata',play:'Premi riproduci nel lettore per ascoltare.',open:'Apri playlist',channel:'Visita GTA FM',watch:'Guarda su YouTube',fallback:'Se il lettore non è disponibile, ascolta direttamente su YouTube.',choose:'Stazioni di Vice City',credit:'Registrazioni e playlist di GTA FM su YouTube.',pop:'Pop anni 80',rock:'Hard rock',wave:'New wave',ballads:'Ballate rock',funk:'Funk e soul',collection:'Stazioni radio di'},
    ru:{radio:"Радиоархив",intro:'Любимая радиостанция снова в эфире. Начните с Flash FM и откройте радиоархив GTA FM.',playlist:'Выберите игру',station:'Выбранная станция',archive:'Выбранный плейлист',play:'Нажмите кнопку воспроизведения в плеере.',open:'Открыть плейлист',channel:'Открыть GTA FM',watch:'Смотреть на YouTube',fallback:'Если плеер недоступен, слушайте напрямую на YouTube.',choose:'Радиостанции Vice City',credit:'Записи радиостанций и плейлисты GTA FM на YouTube.',pop:'Поп-музыка 80-х',rock:'Хард-рок',wave:'Новая волна',ballads:'Рок-баллады',funk:'Фанк и соул',collection:'Радиостанции из'}
  };
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const text = () => copy[window.VICE_LOCALE] || copy.en;
  let apiPromise, active = null, serial = 0;
  const playlistURL = list => 'https://www.youtube.com/playlist?list=' + list;
  function embedURL(playlist, station) {
    const params = new URLSearchParams({list:playlist.list,autoplay:'1',loop:'1',enablejsapi:'1',playsinline:'1',rel:'0'});
    if (location.origin !== 'null') params.set('origin', location.origin);
    return 'https://www.youtube.com/embed/' + (station?.video || 'videoseries') + '?' + params;
  }
  function stationButtons(items, t) {
    return items.map((s,i)=>'<button type="button" class="gtfm-station" data-gtfm-station="'+i+'" aria-pressed="'+(i===0)+'"><span class="gtfm-station-number">0'+(i+1)+'</span><span><strong>'+esc(s.name)+'</strong><small>'+esc(t[s.genre])+'</small></span><span class="gtfm-duration">'+s.duration+'</span></button>').join('');
  }
  function html() {
    const t = text();
    return '<section class="gtfm-section" id="gta-fm" aria-labelledby="gtfm-heading" data-no-localize><div class="gtfm-intro"><div><h2 id="gtfm-heading">'+esc(t.radio)+'</h2><span class="eyebrow gtfm-source-name">GTA FM</span><p>'+esc(t.intro)+'</p></div><label class="gtfm-playlist-label">'+esc(t.playlist)+'<select data-gtfm-playlist>'+playlists.map(p=>'<option value="'+p.id+'"'+(p===defaultPlaylist?' selected':'')+'>'+esc(p.name)+'</option>').join('')+'</select></label></div><div class="gtfm-console"><div class="gtfm-player-column"><div class="gtfm-current radio-card"><div><span class="gtfm-current-label" data-gtfm-label>GTA Vice City Stories</span><h3 data-gtfm-title>Flash FM</h3><p data-gtfm-description>'+esc(t.pop)+' <span aria-hidden="true">·</span> 1:04:50</p></div><span class="gtfm-emblem" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span></div><div class="gtfm-screen" data-gtfm-screen></div><p class="gtfm-play-hint">'+esc(t.play)+'</p></div><aside class="gtfm-dial"><div class="gtfm-dial-heading">Vice City Stories</div><div class="gtfm-stations" data-gtfm-stations>'+stationButtons(storiesStations,t)+'</div><div class="gtfm-playlist-note" data-gtfm-playlist-note hidden>'+esc(t.collection)+' Vice City Stories</div><div class="gtfm-links"><a data-gtfm-open href="'+playlistURL(defaultPlaylist.list)+'" target="_blank" rel="noopener noreferrer">'+esc(t.open)+' ↗</a><a href="'+channel+'" target="_blank" rel="noopener noreferrer">'+esc(t.channel)+' ↗</a></div></aside></div><div class="gtfm-footer"><p class="gtfm-creator-credit">'+esc(t.credit).replace('GTA FM','<a href="'+channel+'" target="_blank" rel="noopener noreferrer"><strong>GTA FM · @GTAVFM ↗</strong></a>')+'</p><p>'+esc(t.fallback)+' <a data-gtfm-watch href="https://www.youtube.com/watch?v='+defaultStation.video+'&amp;list='+defaultPlaylist.list+'" target="_blank" rel="noopener noreferrer">'+esc(t.watch)+' ↗</a></p></div></section>';
  }
  function loadAPI() {
    if (window.YT?.Player) return Promise.resolve(window.YT);
    if (!apiPromise) apiPromise = new Promise(resolve => {
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => { try { previous?.(); } finally { resolve(window.YT); } };
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        script.async = true;
        script.onerror = () => resolve(null);
        document.head.append(script);
      }
    });
    return apiPromise;
  }
  function pauseNative() { document.querySelectorAll('audio,video').forEach(media => media.pause()); }
  function pauseYouTube() {
    if (!active) return;
    try { active.player?.pauseVideo?.(); } catch (_) {}
    active.iframe?.contentWindow?.postMessage(JSON.stringify({event:'command',func:'pauseVideo',args:[]}), 'https://www.youtube.com');
  }
  document.addEventListener('play', event => { if (/^(AUDIO|VIDEO)$/.test(event.target?.tagName)) pauseYouTube(); }, true);
  function init() {
    const section = document.querySelector('.gtfm-section');
    if (!section || section.dataset.ready) return;
    section.dataset.ready = 'true';
    active?.cleanup();
    const state = {section,player:null,iframe:null,generation:0,cleanup:null};
    active = state;
    const t = text();
    const observer = new MutationObserver(() => { if (!section.isConnected) state.cleanup(); });
    state.cleanup = () => {
      state.generation++;
      try { state.player?.destroy?.(); } catch (_) {}
      state.player = null;
      observer.disconnect();
      if (active === state) active = null;
    };
    observer.observe(document.body,{childList:true,subtree:true});
    function select(playlist, station) {
      pauseNative();
      const generation = ++state.generation;
      section.querySelector('.gtfm-play-hint').textContent = t.play;
      section.querySelector('.gtfm-play-hint').setAttribute('aria-live','polite');
      try { state.player?.destroy?.(); } catch (_) {}
      state.player = null;
      const title = station?.name || playlist.name;
      const available = playlist.id === 'vicefolio' ? featuredStations : playlist.id === 'vice-city' ? stations : playlist.id === 'vice-city-stories' ? storiesStations : [];
      const showStations = available.length > 0;
      state.available = available;
      state.playlist = playlist;
      section.querySelector('[data-gtfm-title]').textContent = title;
      section.querySelector('[data-gtfm-label]').textContent = station ? 'GTA '+playlist.name : t.archive;
      section.querySelector('[data-gtfm-description]').textContent = station ? t[station.genre]+(station.duration?' · '+station.duration:'') : t.collection+' '+playlist.name;
      section.querySelector('[data-gtfm-open]').href = playlistURL(playlist.list);
      section.querySelector('[data-gtfm-watch]').href = station ? 'https://www.youtube.com/watch?v='+station.video+'&list='+playlist.list : playlistURL(playlist.list);
      section.querySelector('[data-gtfm-stations]').hidden = !showStations;
      section.querySelector('[data-gtfm-stations]').innerHTML = stationButtons(available,t);
      section.querySelector('.gtfm-dial-heading').textContent = showStations ? playlist.name : t.archive;
      const note = section.querySelector('[data-gtfm-playlist-note]');
      note.hidden = showStations;
      note.textContent = t.collection+' '+playlist.name;
      section.querySelectorAll('[data-gtfm-station]').forEach(button => button.setAttribute('aria-pressed', String(available[Number(button.dataset.gtfmStation)]?.video === station?.video)));
      const iframe = document.createElement('iframe');
      iframe.id = 'gtfm-player-'+(++serial);
      iframe.title = title+' — GTA '+playlist.name+' / GTA FM / YouTube';
      iframe.loading = 'eager';
      iframe.src = embedURL(playlist,station);
      iframe.allow = 'autoplay; accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen; web-share';
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      section.querySelector('[data-gtfm-screen]').replaceChildren(iframe);
      state.iframe = iframe;
      loadAPI().then(YT => {
        if (!YT?.Player || !section.isConnected || generation !== state.generation) return;
        state.player = new YT.Player(iframe,{events:{
          onReady:event=>{event.target.setLoop(true);event.target.unMute();if(event.target.getVolume?.()===0)event.target.setVolume(70);event.target.playVideo();},
          onAutoplayBlocked:()=>{section.dataset.playback='blocked';section.querySelector('.gtfm-play-hint').textContent='Autoplay was blocked. Press Back to the ’80s to start the music.';},
          onStateChange:event=>{if(event.data===1){section.dataset.playback='playing';section.querySelector('.gtfm-play-hint').textContent='Now playing';pauseNative();}if(event.data===0){const p=event.target;const list=p.getPlaylist?.();if(!list?.length){p.seekTo(0,true);p.playVideo();}}},
          onError:()=>{if(section.isConnected && generation===state.generation)section.querySelector('.gtfm-play-hint').textContent=t.fallback;}
        }});
      });
    }
    section.querySelector('[data-gtfm-playlist]').addEventListener('change', event => {
      const playlist = playlists.find(p => p.id === event.target.value) || playlists[0];
      select(playlist, playlist.id === 'vicefolio' ? defaultStation : playlist.id === 'vice-city' ? stations[0] : playlist.id === 'vice-city-stories' ? storiesDefault : null);
    });
    section.addEventListener('click', event => {
      const button = event.target.closest('[data-gtfm-station]');
      if (button && section.contains(button)) {
        const index = Number(button.dataset.gtfmStation);
        select(state.playlist,state.available[index]);
        section.querySelector('[data-gtfm-station="'+index+'"]')?.focus({preventScroll:true});
      }
    });
    const fallback=document.createElement('div');
    fallback.className='r30-radio-fallback';
    fallback.innerHTML='<button type="button" class="r30-radio-start">▶ Back to the ’80s</button><small>No music? Hit play.</small>';
    (document.querySelector('.cinematic-radio')||section).append(fallback);
    fallback.querySelector('button').addEventListener('click',()=>{pauseNative();state.playRequested=true;if(state.player?.playVideo){state.player.setLoop(true);state.player.unMute();if(state.player.getVolume?.()===0)state.player.setVolume(70);state.player.playVideo();}else{for(const func of ['unMute','playVideo'])state.iframe?.contentWindow?.postMessage(JSON.stringify({event:'command',func,args:[]}), 'https://www.youtube.com');}});
    select(defaultPlaylist,defaultStation);
  }
  loadAPI();
  window.ViceRadioClassics = {html,init};
})();
