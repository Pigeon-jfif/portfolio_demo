/**
 * RECORDS-APP.JS / INTERAZIONI DEL CATALOGO
 * ================================================================
 * 01 Stato e URL | 02 Pagine, A-Z e artisti | 03 Scheda disco | 04 CSV | 05 Eventi.
 * Ricerca/filtri selezionano; pagina/lettera/artista aperto servono a navigare.
 * Nessuna richiesta a servizi musicali: solo il CSV dello stesso sito.
 * I file scelti a mano NON sono inviati a un server o salvati nel repository.
 */
(() => {
  'use strict';
  if (document.body.dataset.page !== 'record-collection') return;
  const P = window.Pigeon, R = P.records, M = window.PigeonRecordsModel, C = R.config;
  const $ = id => document.getElementById(id);
  const originalRows = window.PIGEON_RECORDS_DATA.rows;
  let state, searchTimer, lastRandom = '', importVersion = 0;
  let dialogReturnFocus = null;
  let httpController = null;
  let activeId = '', dialogIds = [], modalPushed = false, syncClose = false;
  // Solo questi campi restringono il catalogo. artist e letter NON sono filtri.
  const FILTERS = ['q','format','decade','country','section','edition'];
  const VIEWS = ['artists','albums','list'], ORDERS = ['shelf','recent','oldest','title'];
  const PARAMS = [...FILTERS,'artist','letter','order','view','page','perPage'];
  state = readState();
  const search = $('record-search');
  const results = $('record-results');
  const dialog = document.createElement('dialog');
  dialog.className = 'r-dialog'; dialog.id = 'record-dialog';
  dialog.setAttribute('aria-labelledby','record-title');
  dialog.innerHTML = `<div class="r-dialog-toolbar"><p class="r-dialog-brand">Plastic <em>Pizzas.</em></p><div class="r-dialog-nav"><button type="button" data-r-action="previous" aria-label="Disco precedente">${P.icon('left')}</button><span class="r-dialog-counter" id="record-dialog-count"></span><button type="button" data-r-action="next" aria-label="Disco successivo">${P.icon('next')}</button><button type="button" data-r-action="close-record" aria-label="Chiudi la scheda" autofocus>${P.icon('close')}</button></div></div><div id="record-detail"></div><div id="record-share-feedback" class="r-share-feedback" role="status"></div>`;
  document.body.append(dialog);

  // 01 / STATO. Un URL puo' ricordare una pagina, un salto A-Z e un artista aperto.
  // Nessun cookie. I tre suggerimenti restano in memoria solo fino al refresh.
  function artistColumns() {
    return innerWidth <= 780 ? 2 : innerWidth <= 1120 ? 3 : 4;
  }
  function readState() {
    const next = R.defaults(), params = new URLSearchParams(location.search);
    PARAMS.forEach(key => { if (params.has(key)) next[key] = params.get(key).slice(0,500); });
    if (!VIEWS.includes(next.view)) next.view = C.defaultView;
    if (!params.has('order') || !ORDERS.includes(next.order)) next.order = 'shelf';
    if (next.letter && !/^[A-Z#]$/.test(next.letter)) next.letter = '';
    if (next.section && !M.SECTIONS.some(s=>s.id===next.section)) next.section = '';
    if (!['','notes','colors','remaster'].includes(next.edition)) next.edition = '';
    const allowedPageSizes=(C.pageSizes || [C.pageSize]).map(value=>String(value));
    if (!allowedPageSizes.includes(String(next.perPage))) next.perPage=String(C.pageSize);
    next.page = Number.isSafeInteger(Number(next.page)) && Number(next.page)>0 ? Number(next.page) : 1;
    next.artist = M.normalize(next.artist);
    next.artistColumns = artistColumns();
    return next;
  }
  function writeURL(push = false) {
    try {
      const url = new URL(location.href);
      PARAMS.forEach(key => {
        const value = state[key];
        const defaultOrder = 'shelf';
        const isDefault = !value || (key==='page'&&value===1) ||
          (key==='view'&&value===C.defaultView) || (key==='order'&&value===defaultOrder) ||
          (key==='perPage'&&String(value)===String(C.pageSize));
        if (isDefault) url.searchParams.delete(key); else url.searchParams.set(key,value);
      });
      if (url.href !== location.href) history[push?'pushState':'replaceState'](history.state,'',url);
    } catch (_) { /* file:// o browser limitato: il catalogo resta utilizzabile. */ }
  }
  function filtered() { return M.filter(R.all,state); }
  function currentPage() { const list=filtered(); return M.paginate(M.catalogItems(list,state),state.page,R.pageSize(list,state)); }
  function resetNavigation() { state.page=1; state.artist=''; state.letter=''; }
  function reset() { state=R.defaults(); state.artistColumns=artistColumns(); syncControls(); render(); }
  function syncControls() {
    search.value=state.q;
    document.querySelectorAll('[data-r-filter]').forEach(el=>{el.value=state[el.dataset.rFilter];});
    $('record-order').value=state.order;
    if (['format','decade','country','section','edition'].some(key=>state[key])) document.querySelector('.r-filter-details').open=true;
  }
  function refreshOptions() {
    const opts=R.filterOptions();
    ['format','decade','country','section'].forEach(key=>{document.querySelector(`[data-r-filter="${key}"]`).innerHTML=opts[key];});
  }
  function chipLabel(key) {
    if (key==='q') return 'Ricerca: '+state.q;
    if (key==='decade') return state.decade==='unknown'?'Anno non indicato':'Anni '+state.decade;
    if (key==='country'&&state.country==='unknown') return 'Paese non indicato';
    if (key==='section') return M.SECTIONS.find(s=>s.id===state.section)?.label || state.section;
    if (key==='edition') return {notes:'Con note',colors:'Campo colori compilato',remaster:'Remaster nelle note'}[state.edition];
    return state[key];
  }
  // I vecchi URL artist/letter restano validi ma ora indicano DOVE aprire/saltare.
  function resolveRoute() {
    if (state.artist) {
      state.view='artists';
      const list=filtered(), groups=M.artists(list), index=groups.findIndex(a=>a.key===state.artist), size=R.pageSize(list,state);
      if (index>=0) state.page=Math.floor(index/size)+1;
      else state.artist='';
    } else if (state.letter) {
      const list=filtered(), target=M.alphabetTarget(list,state.view,state.letter,R.pageSize(list,state));
      if (target) {state.page=target.page; if(state.view!=='artists')state.order='title';}
      else state.letter='';
    }
    state.page=currentPage().page;
  }

  // 02 / RISULTATI. Le pagine sostituiscono il contenuto: nessun "carica altro".
  // Non ricreiamo ricerca, filtri e suggerimenti quando cambia una pagina.
  function render(updateURL = true) {
    const list=filtered(), page=currentPage();
    state.page=page.page;
    if (state.view!=='artists' || !page.items.some(item=>item.key===state.artist)) state.artist='';
    results.innerHTML=R.results(list,state);
    $('record-result-count').textContent=(state.view==='artists'?R.number(M.artists(list).length)+' artisti \u00b7 ':'')+R.number(list.length)+' '+(list.length===1?'titolo':'titoli');
    refreshAlphabet();
    $('record-alphabet-note').textContent=(state.view==='artists'?'A\u2013Z artisti':'A\u2013Z titoli')+' / Le lettere spostano, non filtrano.';
    $('record-alphabet').setAttribute('aria-label',state.view==='artists'?'Vai al primo artista per lettera':'Vai al primo titolo per lettera');
    $('record-pagebar').innerHTML=R.pagination(list,state,true);
    $('record-pagination').innerHTML=R.pagination(list,state);
    document.querySelectorAll('[data-record-view]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.recordView===state.view)));
    $('record-order').disabled=state.view==='artists';
    $('record-order').value=state.order;
    $('record-order').title=state.view==='artists'?'Artisti A-Z; i dischi dentro un artista sono in ordine cronologico.':'Ordina le schede disco. A-Z salta sempre per titolo.';
    document.querySelectorAll('[data-r-action="random"]').forEach(button=>{button.disabled=!list.length;});
    $('record-filter-badge').textContent=['format','decade','country','section','edition'].filter(key=>state[key]).length || '';
    const chips=FILTERS.filter(key=>state[key]);
    $('record-chips').innerHTML=chips.map(key=>`<button type="button" data-r-clear="${key}" aria-label="Rimuovi filtro ${P.escape(chipLabel(key))}">${P.escape(chipLabel(key))} ${P.icon('close')}</button>`).join('')+(chips.length?`<button class="r-reset-chip" type="button" data-r-action="reset">Azzera tutto</button>`:'');
    markExistingCovers(results);
    if (updateURL) writeURL();
  }
  function scrollToElement(element, focus = true) {
    if (!element) return;
    const motion=matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth';
    if (focus) {
      const focusable=element.matches('a,button')?element:element.querySelector('a,button');
      (focusable || element).focus({preventScroll:true});
    }
    const offset=$('record-alphabet').offsetHeight+22;
    window.scrollTo({top:Math.max(0,scrollY+element.getBoundingClientRect().top-offset),behavior:motion});
  }
  function refreshAlphabet() {
    const nav=$('record-alphabet'), left=nav.scrollLeft;
    nav.innerHTML=R.letters(R.all,state);
    nav.scrollLeft=left;
    if (state.letter) {
      const button=[...nav.querySelectorAll('[data-r-letter]')].find(el=>el.dataset.rLetter===state.letter);
      if(button)nav.scrollLeft=Math.max(0,button.offsetLeft-nav.clientWidth/2+button.offsetWidth/2);
    }
  }
  function markDestination(element) {
    if (!element) return;
    document.querySelectorAll('.r-jump-target').forEach(el=>el.classList.remove('r-jump-target'));
    element.classList.add('r-jump-target');
    setTimeout(()=>element.classList.remove('r-jump-target'),1500);
  }
  function goToPage(number) {
    const list=filtered(), page=M.paginate(M.catalogItems(list,state),number,R.pageSize(list,state));
    if (page.page===state.page) return;
    state.page=page.page; state.artist=''; state.letter='';
    render(false); writeURL(true);
    $('record-navigation-status').textContent=`Pagina ${state.page} di ${page.pages}.`;
    scrollToElement($('record-pagebar'),false);
    $('record-pagebar').focus({preventScroll:true});
  }
  function changePageSize(value) {
    const allowed=(C.pageSizes || [C.pageSize]).map(item=>String(item));
    if (!allowed.includes(String(value)) || String(value)===String(state.perPage)) return;
    const before=currentPage(), oldStart=before.start;
    state.perPage=String(value); state.artist=''; state.letter='';
    const list=filtered(), size=R.pageSize(list,state);
    state.page=state.perPage==='all'?1:Math.floor(oldStart/size)+1;
    render(false); writeURL(true);
    $('record-navigation-status').textContent=`${state.perPage==='all'?'Tutti gli elementi':state.perPage+' elementi per pagina'}. Pagina ${state.page} di ${currentPage().pages}.`;
    scrollToElement($('record-pagebar'),false);
  }

  function jumpToLetter(letter, updateHistory = true) {
    const list=filtered(), target=M.alphabetTarget(list,state.view,letter,R.pageSize(list,state));
    if (!target) return;
    // A-Z dei titoli, NON dell'artista, nelle viste Copertine ed Elenco.
    if (state.view!=='artists') state.order='title';
    state.page=target.page; state.letter=letter; state.artist='';
    syncControls(); render(false); if(updateHistory)writeURL(true);
    const node=state.view==='artists'
      ? [...results.querySelectorAll('[data-r-artist]')].find(el=>el.dataset.rArtist===target.item.key)
      : [...results.querySelectorAll('[data-r-item-id]')].find(el=>el.dataset.rItemId===target.item.id);
    const name=state.view==='artists'?target.item.name:target.item.title;
    $('record-navigation-status').textContent=`${name}. Pagina ${state.page} di ${currentPage().pages}.`;
    markDestination(node); scrollToElement(node);
  }

  // 02b / ARTISTI. Si apre una regione sotto la riga, NON un filtro.
  // Un pannello alla volta. Il pulsante e' azionabile anche con Enter/Spazio;
  // aria-expanded, aria-controls, hidden e inert seguono sempre lo stato reale.
  function animatePanel(panel, open) {
    if (!panel) return;
    const from=panel.hidden?0:panel.getBoundingClientRect().height;
    if (panel.pigeonAnimation) panel.pigeonAnimation.cancel();
    const ticket=(panel.pigeonTicket || 0)+1; panel.pigeonTicket=ticket;
    panel.hidden=false; panel.inert=!open;
    const to=open?panel.scrollHeight:0;
    const finish=()=>{
      if (panel.pigeonTicket!==ticket) return;
      panel.hidden=!open; panel.style.overflow=''; panel.pigeonAnimation=null;
      if (!open) panel.replaceChildren();
      if (open && panel.isConnected && panel.dataset.rPanel===state.artist &&
          panel.getBoundingClientRect().bottom>innerHeight) {
        const row=panel.closest('.r-artist-row');
        // Aspettiamo due frame: evita che l'ancoraggio automatico del browser o
        // la chiusura del pannello precedente ci portino all'inizio degli album.
        requestAnimationFrame(()=>requestAnimationFrame(()=>{
          if (panel.isConnected && panel.dataset.rPanel===state.artist) scrollToElement(row || panel,false);
        }));
      }
    };
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !panel.animate || !C.artistAnimationMs) {finish();return;}
    panel.style.overflow='hidden';
    panel.pigeonAnimation=panel.animate({height:[from+'px',to+'px'],opacity:open?[0,1]:[1,0]},
      {duration:C.artistAnimationMs,easing:'cubic-bezier(.22,.61,.36,1)'});
    panel.pigeonAnimation.finished.then(finish).catch(()=>{}); // annullata da un altro clic
  }
  function selectArtist(key, { forceOpen = false, push = false } = {}) {
    let groups=M.artists(filtered()), index=groups.findIndex(a=>a.key===key), clearedFilters=false;
    // Una proposta iniziale puo' appartenere a un artista escluso dai filtri.
    // Il comando esplicito dalla scheda deve poterlo mostrare comunque.
    if (index<0 && forceOpen) {
      clearedFilters=true;
      FILTERS.forEach(filter=>{state[filter]='';});
      groups=M.artists(filtered()); index=groups.findIndex(a=>a.key===key);
      syncControls();
    }
    if (index<0) return;
    const group=groups[index], size=R.pageSize(filtered(),state), targetPage=Math.floor(index/size)+1;
    if (state.view!=='artists' || state.page!==targetPage || clearedFilters) {
      state.view='artists'; state.order='shelf'; state.page=targetPage; state.artist='';
      state.letter=''; render(false);
    }
    const open=forceOpen || state.artist!==key;
    state.artist=open?key:''; state.letter='';
    results.querySelectorAll('[data-r-artist]').forEach(button=>{
      const expanded=button.dataset.rArtist===state.artist;
      button.classList.toggle('is-open',expanded);
      button.setAttribute('aria-expanded',String(expanded));
      const name=groups.find(a=>a.key===button.dataset.rArtist)?.name || '';
      button.setAttribute('aria-label',`${expanded?'Chiudi':'Apri'} i dischi di ${name}`);
    });
    results.querySelectorAll('[data-r-panel]').forEach(panel=>{
      const expanded=panel.dataset.rPanel===state.artist;
      if (expanded) {
        if (!panel.firstElementChild) panel.innerHTML=R.artistPanelBody(group,FILTERS.some(key=>state[key]));
        animatePanel(panel,true); markExistingCovers(panel);
      } else if (!panel.hidden) animatePanel(panel,false);
    });
    refreshAlphabet();
    $('record-navigation-status').textContent=open?`${group.name}: ${group.records.length} titoli, pannello aperto.`:'Pannello artista chiuso.';
    writeURL(push);
  }
  function closeArtist() {
    const key=state.artist;
    if (!key) return;
    selectArtist(key);
    [...results.querySelectorAll('[data-r-artist]')].find(el=>el.dataset.rArtist===key)?.focus({preventScroll:true});
  }

  // 03 / Dialog nativo: X, sfondo ed Escape chiudono; clic sui dati NON chiude.
  // Le frecce scorrono il contesto di apertura: artista, tre proposte, oppure
  // tutti i risultati filtrati, anche nelle altre pagine.
  function paintDetail() {
    const record = R.all.find(r=>r.id===activeId);
    if(!record) return;
    $('record-detail').innerHTML = R.detail(record);
    const index = dialogIds.indexOf(activeId);
    $('record-dialog-count').textContent = `${index+1} / ${dialogIds.length}`;
    dialog.querySelector('[data-r-action="previous"]').disabled=index<=0;
    dialog.querySelector('[data-r-action="next"]').disabled=index>=dialogIds.length-1;
    $('record-share-feedback').replaceChildren();
    dialog.scrollTop=0;
  }
  function setRecordHash(id, push=false) {
    try {
      const url=new URL(location.href);
      url.hash = id?'disco='+encodeURIComponent(id):'';
      if(push) { history.pushState({...history.state,pigeonRecord:true},'',url); modalPushed=true; }
      else history.replaceState(history.state,'',url);
    } catch (_) { modalPushed=false; }
  }
  function openRecord(id, contextIds, updateURL=true) {
    if(!R.all.some(r=>r.id===id)) return;
    if(!dialog.open) {
      dialogReturnFocus=document.activeElement;
      dialogIds=[...new Set(contextIds || filtered().map(r=>r.id))].filter(code=>R.all.some(r=>r.id===code));
      if(!dialogIds.includes(id)) dialogIds=R.all.map(r=>r.id);
    }
    activeId=id; paintDetail();
    if(updateURL) setRecordHash(id,!dialog.open);
    if(!dialog.open) { dialog.showModal(); document.body.classList.add('modal-open'); }
  }
  function closeRecord(updateHistory=true) {
    if(!dialog.open) return;
    syncClose=true; dialog.close(); syncClose=false;
    document.body.classList.remove('modal-open'); activeId='';
    if(dialogReturnFocus?.isConnected)dialogReturnFocus.focus({preventScroll:true});
    if(updateHistory) {
      if(modalPushed) { modalPushed=false; history.back(); }
      else setRecordHash('');
    }
  }
  function changeRecord(delta) {
    const id=dialogIds[dialogIds.indexOf(activeId)+delta];
    if(id) openRecord(id,dialogIds,true);
  }
  function fromHash() {
    const hash=new URLSearchParams(location.hash.replace(/^#/,'')), id=hash.get('disco');
    if(id && R.all.some(r=>r.id===id)) openRecord(id,filtered().map(r=>r.id),false);
    else if(dialog.open) closeRecord(false);
    else if(id) {
      $('record-import-status')?.replaceChildren(document.createTextNode('Il codice '+id+' non si trova nel catalogo caricato.'));
    }
  }
  async function share() {
    const feedback=$('record-share-feedback');
    if(location.protocol==='file:') {feedback.textContent='Il link si potr\u00e0 condividere quando il sito sar\u00e0 online. Codice: '+activeId;return;}
    let url;
    try { url = new URL(P.url(C.collectionFile),location.href); url.hash='disco='+activeId; }
    catch (_) { feedback.textContent='Codice della scheda: '+activeId; return; }
    try {
      if(!navigator.clipboard?.writeText) throw new Error('Appunti non disponibili');
      await navigator.clipboard.writeText(url.href);feedback.textContent='Link copiato.';
    } catch (_) {
      feedback.textContent='Copia questo link:';
      const input=document.createElement('input');input.readOnly=true;input.value=url.href;input.setAttribute('aria-label','Link alla scheda disco');
      feedback.append(input);input.focus();input.select();
    }
  }
  dialog.addEventListener('cancel',event=>{event.preventDefault();closeRecord();});
  dialog.addEventListener('click',event=>{
    if(event.target!==dialog) return;
    const bounds=dialog.getBoundingClientRect();
    if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)closeRecord();
  });
  dialog.addEventListener('close',()=>{
    document.body.classList.remove('modal-open');
    if(!syncClose && activeId) {activeId='';setRecordHash('');modalPushed=false;}
  });

  // 04 / CSV: validazione PRIMA di sostituire i dati che stanno funzionando.
  function setCatalog(rows, source, shouldReset=false) {
    const next=M.fromRows(rows); // throws: manteniamo il vecchio catalogo.
    R.all=next;
    if(shouldReset) {state=R.defaults();state.artistColumns=artistColumns();}
    resolveRoute();refreshOptions();syncControls();render(false);
    if($('records-metrics'))$('records-metrics').innerHTML=R.metrics();
    if($('record-numbers-content'))$('record-numbers-content').innerHTML=R.numbers();
    if($('record-source-state'))$('record-source-state').textContent=source;
    // Lo stesso CSV non rimescola il carosello; dati davvero diversi aggiornano
    // il pool mantenendo, quando possibile, le cover gia' visibili.
    if(dialog.open) {if(next.some(r=>r.id===activeId))paintDetail();else closeRecord(false);}
    if(shouldReset){writeURL();setRecordHash('');}else fromHash();
  }
  async function loadSiteCSV() {
    if(location.protocol==='file:' || !C.fetchCSV) {
      if($('record-source-state'))$('record-source-state').textContent='Snapshot inclusa. Per rileggerne una nuova, apri il CSV qui oppure esegui tools/build.js dopo la modifica.';
      return;
    }
    const version=importVersion;
    httpController=new AbortController();
    const timer=setTimeout(()=>httpController?.abort(),C.fetchTimeout);
    try {
      const response=await fetch(P.url(C.csvFile),{cache:'no-cache',signal:httpController.signal});
      if(!response.ok)throw new Error('HTTP '+response.status);
      const rows=M.parseCSV(await response.text());
      if(version===importVersion)setCatalog(rows,'CSV del sito: '+C.csvFile);
    } catch (error) {
      if(version===importVersion && $('record-source-state'))$('record-source-state').textContent='CSV non riletto: uso la snapshot inclusa. '+(error.name==='AbortError'?'Tempo di attesa scaduto.':error.message);
    } finally {clearTimeout(timer);httpController=null;}
  }
  $('record-csv-input')?.addEventListener('change',async event=>{
    const file=event.target.files?.[0];if(!file)return;
    importVersion++;httpController?.abort();
    try {
      if(file.size>10*1024*1024)throw new Error('CSV troppo grande (massimo 10 MB).');
      const rows=M.parseCSV(await file.text());
      setCatalog(rows,'CSV locale: '+file.name+' (solo questa sessione)',true);
      $('record-import-status').textContent=R.all.length+' voci caricate. Nessun file inviato online.';
    } catch(error) {$('record-import-status').textContent='Importazione annullata: '+error.message+' Il catalogo precedente resta disponibile.';}
    event.target.value='';
  });

  // 05 / EVENTI. Delegazione: i pulsanti continuano a funzionare dopo un cambio pagina.
  document.addEventListener('click',event=>{
    const link=event.target.closest('[data-record-id]');
    if (link && !event.ctrlKey && !event.metaKey && !event.shiftKey && event.button===0) {
      event.preventDefault();
      const panel=link.closest('[data-r-panel]');
      const context=panel?M.artists(filtered()).find(a=>a.key===panel.dataset.rPanel)?.records:null;
      openRecord(link.dataset.recordId,context?.map(r=>r.id)); return;
    }
    const artist=event.target.closest('[data-r-artist]');
    if (artist) {selectArtist(artist.dataset.rArtist);return;}
    const letter=event.target.closest('[data-r-letter]');
    if (letter && !letter.disabled) {jumpToLetter(letter.dataset.rLetter);return;}
    const page=event.target.closest('[data-r-page]');
    if (page && !page.disabled) {goToPage(Number(page.dataset.rPage));return;}
    const view=event.target.closest('[data-record-view]');
    if (view) {
      if (view.dataset.recordView===state.view) return;
      state.view=view.dataset.recordView;state.order='shelf';
      resetNavigation();syncControls();render(false);writeURL(true);return;
    }
    const clear=event.target.closest('[data-r-clear]');
    if (clear) {state[clear.dataset.rClear]='';resetNavigation();syncControls();render();search.focus({preventScroll:true});return;}
    const button=event.target.closest('[data-r-action]'); if(!button)return;
    switch(button.dataset.rAction) {
      case 'reset': reset();search.focus({preventScroll:true});break;
      case 'close-artist': closeArtist();break;
      case 'random': {const record=M.random(filtered(),lastRandom);if(record){lastRandom=record.id;openRecord(record.id);}break;}
      case 'previous': changeRecord(-1);break;
      case 'next': changeRecord(1);break;
      case 'close-record': closeRecord();break;
      case 'share': share();break;
      case 'artist-from-detail': {
        const key=button.dataset.artist;modalPushed=false;closeRecord(false);setRecordHash('');
        selectArtist(key,{forceOpen:true});
        const card=[...results.querySelectorAll('[data-r-artist]')].find(el=>el.dataset.rArtist===key);
        scrollToElement(card);break;
      }
      case 'restore': importVersion++;httpController?.abort();setCatalog(originalRows,'Snapshot inclusa ripristinata.',true);$('record-import-status').textContent='Catalogo incluso ripristinato.';break;
    }
  });
  document.addEventListener('change',event=>{
    const picker=event.target.closest?.('[data-r-page-size]');
    if (picker) changePageSize(picker.value);
  });
  document.querySelectorAll('[data-r-filter]').forEach(select=>select.addEventListener('change',()=>{
    clearTimeout(searchTimer);state[select.dataset.rFilter]=select.value;resetNavigation();render();
  }));
  $('record-order').addEventListener('change',event=>{state.order=event.target.value;resetNavigation();render();});
  search.addEventListener('input',()=>{
    clearTimeout(searchTimer);state.q=search.value;resetNavigation();searchTimer=setTimeout(render,120);
  });
  document.addEventListener('keydown',event=>{
    const editing=event.target.matches('input,textarea,select,[contenteditable="true"]');
    if(dialog.open) {
      if(event.key==='Tab') {
        const stops=[...dialog.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),[tabindex="0"]')].filter(el=>el.getClientRects().length>0);
        const first=stops[0],last=stops[stops.length-1];
        if(first&&(!dialog.contains(document.activeElement)||(event.shiftKey&&document.activeElement===first)||(!event.shiftKey&&document.activeElement===last))) {
          event.preventDefault();(event.shiftKey?last:first).focus();
        }
      }
      if(!editing&&event.key==='ArrowLeft'){event.preventDefault();changeRecord(-1);}
      if(!editing&&event.key==='ArrowRight'){event.preventDefault();changeRecord(1);}
    } else if(event.key==='/'&&!editing) {event.preventDefault();search.focus();}
    else if(event.key==='Escape'&&!editing&&state.artist) {event.preventDefault();closeArtist();}
  });
  // Il back del browser ripristina la pagina. La sola chiusura del dialog non
  // ricrea il catalogo: conserva il focus sulla card che lo aveva aperto.
  window.addEventListener('popstate',()=>{
    modalPushed=false;
    const next=readState();
    const changed=PARAMS.some(key=>String(next[key])!==String(state[key]));
    if(changed){state=next;resolveRoute();syncControls();render(false);}
    fromHash();
  });
  window.addEventListener('hashchange',fromHash);
  let resizeTimer;
  window.addEventListener('resize',()=>{
    clearTimeout(resizeTimer);
    resizeTimer=setTimeout(()=>{
      const columns=artistColumns();
      if(columns===state.artistColumns)return;
      state.artistColumns=columns;
      if(state.view==='artists')render(false);
    },100);
  });

  // 06 / Immagini del catalogo. La presentazione vive solo nella landing.
  function markCover(image,ok) {
    if(!image.matches?.('[data-r-cover]'))return;
    image.closest('.r-art')?.classList.toggle('r-art--loaded',ok);
    image.closest('.r-art')?.classList.toggle('r-art--failed',!ok);

  }
  function markExistingCovers(scope=document) {
    scope.querySelectorAll('[data-r-cover]').forEach(image=>{if(image.complete)markCover(image,image.naturalWidth>0);});
  }
  document.addEventListener('load',event=>markCover(event.target,true),true);
  document.addEventListener('error',event=>markCover(event.target,false),true);

  // 07 / AVVIO: link diretto, dati locali, poi eventuale CSV HTTP aggiornato.
  resolveRoute();syncControls();render(false);fromHash();loadSiteCSV();
  markExistingCovers();
  // Un link A-Z condiviso arriva anche al primo elemento della pagina corretta.
  if(state.letter&&!location.hash)requestAnimationFrame(()=>jumpToLetter(state.letter,false));
})();
