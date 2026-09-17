/**
 * RECORDS-VIEW.JS / PAGINA E COMPONENTI DI PLASTIC PIZZAS
 * ================================================================
 * Solo HTML: le interazioni sono in records-app.js.
 * I codici DISCHI-01..08 compaiono anche in Structure.txt.
 * Riutilizziamo header, footer, palette, serif e icone del portfolio.
 */
(() => {
  'use strict';
  const P = window.Pigeon, M = window.PigeonRecordsModel;
  const R = P.records = {};
  const e = P.escape, icon = P.icon;
  R.config = window.PIGEON_RECORDS_CONFIG;
  R.covers = window.PIGEON_RECORD_COVERS || {};
  R.all = M.fromRows(window.PIGEON_RECORDS_DATA.rows);
  const C = R.config;
  R.number = n => new Intl.NumberFormat('it-IT').format(n);
  R.defaults = () => ({ q:'', artist:'', letter:'', format:'', decade:'', country:'', section:'', edition:'', order:'shelf', view:C.defaultView, page:1, perPage:String(C.pageSize), artistColumns:4 });
  R.pageSize = (records, state) => {
    const items = M.catalogItems(records, state), raw = state.perPage;
    if (raw === 'all') return Math.max(1, items.length);
    const size = Number(raw);
    return Number.isSafeInteger(size) && size > 0 ? size : C.pageSize;
  };
  R.safeURL = value => /^https:\/\//i.test(value || '') ? value : '';
  R.localURL = value => value && /^(?:assets\/covers\/)[a-zA-Z0-9_./-]+$/.test(value) && !value.split('/').includes('..') ? P.url(value) : '';
  // Un CSV importato puo' riusare un ID con un altro contenuto.
  // In quel caso non gli assegniamo accidentalmente la copertina precedente.
  R.coverMeta = r => {
    const cover = R.covers[r.id];
    if (!cover) return {};
    if (cover.artist && M.normalize(cover.artist) !== M.normalize(r.artist)) return {};
    if (cover.title && M.normalize(cover.title) !== M.normalize(r.title)) return {};
    return cover;
  };
  R.coverURL = r => {
    const cover = R.coverMeta(r);
    return R.localURL(cover.local) || (C.allowRemoteCovers ? R.safeURL(cover.remote) : '');
  };
  R.recordURL = id => P.url(C.collectionFile) + '#disco=' + encodeURIComponent(id);
  R.art = (r, { eager = false, small = false } = {}) => {
    const c = R.coverMeta(r);
    const source = small && R.localURL(c.thumb) ? R.localURL(c.thumb) : R.coverURL(r);
    // Il disegno e' SEMPRE un segnaposto dichiarato, non un artwork inventato.
    return `<span class="r-art${source ? ' r-art--source' : ''}" aria-hidden="true">
      <span class="r-placeholder"><span class="r-placeholder-code">${e(r.id)}</span><span class="r-placeholder-circle"></span><span class="r-placeholder-copy"><span>${e(r.artist)}</span><strong>${e(r.title)}</strong></span><span class="r-placeholder-label">${e(C.missingCoverLabel)}</span></span>
      ${source ? `<img data-r-cover data-cover-id="${e(r.id)}" src="${e(source)}" alt="" width="${c.width || 500}" height="${c.height || 500}" loading="${eager ? 'eager' : 'lazy'}" decoding="async" referrerpolicy="no-referrer">` : ''}
    </span>`;
  };
  R.card = (r, eager = false) => `<article class="r-record-card" data-r-item-id="${e(r.id)}">
    <a class="r-record-link" href="${R.recordURL(r.id)}" data-record-id="${e(r.id)}" aria-label="${e(r.artist + ' - ' + r.title + ', ' + (r.yearText || 'anno non indicato') + '. Apri la scheda.')}">
      ${R.art(r,{eager,small:true})}
      <span class="r-card-meta"><span>${e(r.yearText || '\u2014')} <span class="r-dot">/</span> ${e(r.format)}</span><span>${e(r.id)}</span></span>
      <h3>${e(r.title)}</h3><span class="r-card-artist">${e(r.artist)}</span>
      ${(r.notes || r.colors) ? `<span class="r-card-edition">${e([r.colors,r.notes].filter(Boolean).join(' \u00b7 '))}</span>` : ''}
    </a></article>`;
  R.artistPanelID = artist => 'artist-panel-' + artist.records[0].id;
  R.artistToggleID = artist => 'artist-toggle-' + artist.records[0].id;
  R.artistCard = (artist, opened = false) => {
    // Per la card artista preferiamo una cover locale: resta visibile offline.
    const sample = artist.records.find(r => R.localURL(R.coverMeta(r).local)) ||
      artist.records.find(r => R.coverURL(r)) || artist.records[0];
    return `<button type="button" class="r-artist-card${opened ? ' is-open' : ''}" id="${R.artistToggleID(artist)}" data-r-artist="${e(artist.key)}" aria-expanded="${opened}" aria-controls="${R.artistPanelID(artist)}" aria-label="${opened ? 'Chiudi' : 'Apri'} i dischi di ${e(artist.name)}">
      <span class="r-artist-indicator" aria-hidden="true">${icon('plus')}</span>
      <span class="r-artist-main"><span class="r-artist-name">${e(artist.name)}</span>${R.art(sample,{small:true})}</span>
      <span class="r-artist-bottom"><span>${artist.records.length} ${artist.records.length===1?'titolo':'titoli'}</span></span>
    </button>`;
  };
  R.listRow = r => `<a class="r-list-row" data-r-item-id="${e(r.id)}" href="${R.recordURL(r.id)}" data-record-id="${e(r.id)}">
    <span class="r-list-art">${R.art(r,{small:true})}</span>
    <span class="r-list-copy"><strong>${e(r.title)}</strong><span>${e(r.artist)}</span></span>
    <span class="r-list-year">${e(r.yearText || '\u2014')}</span>
    <span class="r-list-format">${e(r.format)}</span>
    <span class="r-list-country">${e(r.country || '\u2014')}</span>
    <span class="r-list-id">${e(r.id)} ${icon('ne')}</span>
  </a>`;
  // Un pannello per artista, subito sotto la riga della sua card. Il suo contenuto
  // viene creato solo all'apertura: le cover degli artisti chiusi non sono caricate.
  R.artistPanelBody = (artist, filtered = false) => `<div class="r-artist-panel-inner">
    <header class="r-artist-panel-head"><div><p class="eyebrow">Dallo scaffale / ${artist.records.length} ${artist.records.length === 1 ? 'titolo' : 'titoli'}</p>
      <h3>${e(artist.name)}</h3><p class="r-artist-panel-note">Dal primo all'ultimo, in ordine cronologico.${filtered ? ' Mostro i dischi che corrispondono ai filtri attivi.' : ''}</p></div>
      <button type="button" data-r-action="close-artist" aria-label="Chiudi i dischi di ${e(artist.name)}">${icon('close')}</button>
    </header><div class="r-records-grid r-records-grid--compact r-records-grid--artist">${artist.records.map((r,i)=>R.card(r,i<6)).join('')}</div></div>`;
  R.results = (records, state) => {
    if (!records.length) return `<div class="r-empty"><p class="serif">Nessun disco, per questa ricerca.</p><p>Prova un altro titolo o togli un filtro.</p><button class="arrow-link" type="button" data-r-action="reset">Azzera i filtri ${icon('back')}</button></div>`;
    const page = M.paginate(M.catalogItems(records, state), state.page, R.pageSize(records,state));
    if (state.view === 'artists') {
      const columns = state.artistColumns || 4, rows = [];
      const hasFilters = ['q','format','decade','country','section','edition'].some(key=>state[key]);
      let row = [];
      const flush = () => {
        if (!row.length) return;
        const artists = row.slice();
        const cards = artists.map(artist=>R.artistCard(artist,state.artist===artist.key)).join('');
        const panels = artists.map(artist=>{
          const open = state.artist === artist.key;
          return `<section class="r-artist-panel" id="${R.artistPanelID(artist)}" data-r-panel="${e(artist.key)}" aria-labelledby="${R.artistToggleID(artist)}" ${open?'':'hidden'}>${open?R.artistPanelBody(artist,hasFilters):''}</section>`;
        }).join('');
        rows.push(`<div class="r-artist-row">${cards}${panels}</div>`);
        row = [];
      };
      page.items.forEach(artist=>{
        row.push(artist);
        if (row.length === columns) flush();
      });
      flush();
      return `<div class="r-artists-grid">${rows.join('')}</div>`;
    }
    if (state.view === 'list') return `<div class="r-list"><div class="r-list-heading eyebrow"><span></span><span>Disco / Artista</span><span>Anno</span><span>Formato</span><span>Paese</span><span>Codice</span></div>${page.items.map(R.listRow).join('')}</div>`;
    return `<div class="r-records-grid r-records-grid--compact">${page.items.map((r,i)=>R.card(r,i<6)).join('')}</div>`;
  };
  // Paginazione riutilizzata sopra e sotto i risultati. Quella alta e' compatta.
  R.pagination = (records, state, compact = false) => {
    const page = M.paginate(M.catalogItems(records,state),state.page,R.pageSize(records,state));
    if (!page.total) return '';
    const unit = state.view === 'artists' ? 'artisti' : 'titoli';
    const button = (number, text, label, disabled = false, current = false) =>
      `<button type="button" data-r-page="${number}" aria-label="${e(label)}" ${disabled?'disabled':''} ${current?'aria-current="page"':''}>${text}</button>`;
    const previous = button(page.page-1,icon('left'),'Pagina precedente',page.page===1);
    const next = button(page.page+1,icon('right'),'Pagina successiva',page.page===page.pages);
    const label = `Pagina ${page.page} di ${page.pages}`;
    const sizes = (C.pageSizes || [C.pageSize]).map(value=>String(value));
    const sizeSelect = `<label class="r-page-size"><span>Per pagina</span><select data-r-page-size aria-label="Elementi per pagina">${sizes.map(value=>`<option value="${e(value)}" ${String(state.perPage)===value?'selected':''}>${value==='all'?'Tutti':e(value)}</option>`).join('')}</select></label>`;
    if (compact) return `<p class="r-page-range">${page.start+1}–${page.end} di ${R.number(page.total)} ${unit}</p><nav class="r-page-quick" aria-label="Cambio pagina rapido">${previous}<span>${label}</span>${sizeSelect}${next}</nav>`;
    if (page.pages === 1) return '';
    return `<nav class="r-pagination" aria-label="Pagine del catalogo">${previous}<div class="r-page-numbers">${M.pageNumbers(page.page,page.pages).map(n=>n===null?'<span aria-hidden="true">…</span>':button(n,n,`Pagina ${n}`,false,n===page.page)).join('')}</div>${next}</nav><p class="r-page-summary">${label} / ${R.number(page.total)} ${unit}</p>`;
  };
  R.metrics = () => {
    const s = M.stats(R.all);
    return [['Titoli in catalogo',s.records],['Artisti',s.artists],['Dischi fisici',s.discs],['Anni nel catalogo',s.yearMin===null?'\u2014':s.yearMin+'\u2013'+s.yearMax]].map(([label,value])=>`<div class="r-metric"><dt>${e(label)}</dt><dd>${typeof value==='number'?R.number(value):e(value)}</dd></div>`).join('');
  };
  const options = (entries, allLabel) => `<option value="">${e(allLabel)}</option>` + entries.map(([value,label])=>`<option value="${e(value)}">${e(label)}</option>`).join('');
  R.filterOptions = () => ({
    format: options([...new Set(R.all.map(r=>r.format).filter(Boolean))].sort(M.compare).map(v=>[v,v]),'Tutti i formati'),
    decade: options([...new Set(R.all.map(r=>r.decade))].sort((a,b)=>a==='unknown'?1:b==='unknown'?-1:Number(b)-Number(a)).map(v=>[v,v==='unknown'?'Anno non indicato':'Anni '+v]),'Tutti gli anni'),
    country: options([...new Set(R.all.map(r=>r.country).filter(Boolean))].sort(M.compare).map(v=>[v,v]).concat(R.all.some(r=>!r.country)?[['unknown','Paese non indicato']]:[]),'Tutti i paesi'),
    section: options(M.SECTIONS.filter(s=>R.all.some(r=>r.section===s.id)).map(s=>[s.id,s.label]),'Tutte le sezioni')
  });
  R.letters = (records, state) => {
    const list = M.filter(records,state), isArtist = state.view === 'artists';
    const available = new Set(list.map(r=>M.firstLetter(isArtist ? r.artist : r.title)));
    return [{value:'',label:'Inizio'},...['#',...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].map(letter=>({value:letter,label:letter}))].map(({value,label})=>
      `<button type="button" data-r-letter="${value}" ${(value?state.letter===value:!state.letter&&state.page===1&&!state.artist)?'aria-current="location"':''} ${value&&!available.has(value)?'disabled':''} aria-label="${value?'Vai al primo '+(isArtist?'artista':'titolo')+' con iniziale '+value:"Vai all'inizio del catalogo"}">${label}</button>`).join('');
  };
  R.numbers = () => {
    const s = M.stats(R.all);
    const bars = (entries, labelFn) => {
      const max = Math.max(1,...entries.map(([,n])=>n));
      return entries.map(([label,n])=>`<div class="r-stat-line"><span>${e(labelFn?labelFn(label):label)}</span><span class="r-stat-bar" aria-hidden="true"><i style="width:${n/max*100}%"></i></span><strong>${R.number(n)}</strong></div>`).join('');
    };
    return `<div class="r-numbers-grid"><section aria-labelledby="r-decades-title"><h3 id="r-decades-title">Gli anni.</h3>${bars(Object.entries(s.decades).sort((a,b)=>a[0]==='unknown'?1:b[0]==='unknown'?-1:Number(a[0])-Number(b[0])),v=>v==='unknown'?'Non indicato':v)}</section><section aria-labelledby="r-formats-title"><h3 id="r-formats-title">I formati.</h3>${bars(Object.entries(s.formats).sort((a,b)=>b[1]-a[1]))}</section></div><p class="r-method-note">Conteggi dell\u2019intero catalogo, non dei soli risultati filtrati. Ogni riga conta come una voce; copie ed edizioni rimangono distinte. Gli anni sono quelli del CSV, anche quando si riferiscono a una ristampa.${s.unknownYears?' '+s.unknownYears+' voci non hanno un anno numerico.':''}${s.unknownDiscs?' '+s.unknownDiscs+' voci non specificano il numero di dischi fisici.':''}</p>`;
  };

  // Il dettaglio usa esclusivamente la riga originale; "Non indicato" non e' un valore dedotto.
  R.detail = r => {
    const c = R.coverMeta(r);
    const fields = [['Formato',r.format],['Dischi fisici',r.discText],['Anno nel catalogo',r.yearText],['Etichetta',r.label],['Paese',r.country],['Colori speciali',r.colors]];
    const credit = R.safeURL(c.source);
    return `<div class="r-detail-layout">
      <div class="r-detail-art">${R.art(r,{eager:true})}
        <p class="r-cover-caption">${R.coverURL(r)?(c.match==='copy'?'Fotografia della copia.':'Copertina illustrativa dell\u2019album; non identifica la specifica stampa.'):'Copertina non ancora disponibile. I dati della copia sono completi rispetto al CSV.'}${credit?` <a href="${e(credit)}" target="_blank" rel="noopener noreferrer">Fonte dell\u2019immagine ${icon('ne')}</a>`:''}</p>
      </div>
      <div class="r-detail-copy"><p class="eyebrow">La copia / ${e(r.id)}</p><h2 id="record-title">${e(r.title)}</h2><p class="r-detail-artist">${e(r.artist)}</p>
        <dl class="r-detail-fields">${fields.map(([label,value])=>`<div><dt>${e(label)}</dt><dd${value?'':' class="r-unknown"'}>${e(value || C.unknownLabel)}</dd></div>`).join('')}</dl>
        ${r.notes?`<section class="r-detail-notes"><h3 class="eyebrow">Note aggiuntive</h3><p>${e(r.notes)}</p></section>`:''}
        <div class="r-detail-actions"><button class="r-dark-link" type="button" data-r-action="artist-from-detail" data-artist="${e(r.artistKey)}">Altri dischi dell\u2019artista ${icon('right')}</button><button type="button" class="r-dark-link" data-r-action="share">Copia link ${icon('link')}</button></div>
        <p class="r-detail-footnote">Dati trascritti dal catalogo personale. Nessuna verifica automatica della stampa.</p>
      </div>
    </div>`;
  };

  // La selezione iniziale e' stabile anche fra HTML statico e avvio JS.
  // Si leggono i metadati solo fino alle prime cover assegnate; nessuna
  // richiesta alle immagini del resto del catalogo per decidere l'avvio.
  R.failedCoverURLs = new Set();
  R.featuredKey = r => M.normalize(r.artist) + '\u001f' + M.normalize(r.title);
  R.featuredRecords = (count = C.featuredCount) => {
    const selected = [], seen = new Set();
    for (const r of R.all) {
      const source = R.coverURL(r), key = R.featuredKey(r);
      if (!source || R.failedCoverURLs.has(source) || seen.has(key)) continue;
      selected.push(r); seen.add(key);
      if (selected.length >= count) break;
    }
    return selected;
  };
  R.featuredCard = (r, slot = 0, number = slot + 1) => {
    const visible = slot >= 0 && slot < 3;
    return `<a class="r-featured-card" data-r-featured-card data-slot="${slot}" href="${R.recordURL(r.id)}" data-record-id="${e(r.id)}" aria-label="${e(r.artist+' - '+r.title)}"${visible?'':' aria-hidden="true" tabindex="-1"'}>${R.art(r,{eager:true,small:true})}<span class="r-featured-number" data-r-featured-number>${visible?String(number).padStart(2,'0'):''}</span></a>`;
  };
  R.featured = (sequence = R.featuredRecords()) => sequence.map((r, i) => R.featuredCard(r,i,i+1)).join('');
  R.presentation = () => `<aside class="r-featured" data-r-presentation="trio" aria-label="${e(C.featuredLabel)}">
    <div class="r-featured-heading"><p class="eyebrow">${e(C.featuredLabel)}</p><button type="button" class="r-motion-toggle" data-r-motion-toggle aria-pressed="false" aria-label="Metti in pausa le copertine">Pausa</button></div>
    <div class="r-featured-covers" data-r-motion-viewport><div class="r-featured-track" data-r-featured-track aria-live="off">${R.featured()}</div></div>
    <p class="r-featured-caption">${e(C.featuredCaptionBefore)}<a class="r-collection-word" href="${P.url(C.collectionFile)}">${e(C.featuredCaptionLink)}</a>${e(C.featuredCaptionAfter)}</p>
  </aside>`;
  R.randomButton = () => `<button class="r-random" type="button" data-r-action="random"><span class="r-random-disc" aria-hidden="true"></span><span>Cosa ascolto?<small>Un disco tra i risultati</small></span>${icon('ne')}</button>`;

  // Landing: nessun elenco dischi, filtri, dialog o statistiche estese.
  R.page = () => `<div class="wrap records-page records-landing">
    <header class="r-intro"><div class="r-intro-copy"><p class="eyebrow">${e(C.eyebrow)}</p><h1>${e(C.titleFirst)}<br><em>${e(C.titleAccent)}</em></h1><p class="r-intro-lead">${e(C.intro)}</p><p class="r-intro-text">${e(C.description)}</p></div>
      ${R.presentation()}
    </header>
    <dl class="r-metrics" id="records-metrics" aria-label="La collezione in breve">${R.metrics()}</dl>
    <noscript><style>.r-motion-toggle{display:none}.r-featured .r-art img{opacity:1}.r-featured-card .r-placeholder{visibility:hidden}</style></noscript>
  </div>`;

  // La collezione: filosofia accanto al titolo; statistiche alla fine.
  R.collectionPage = () => {
    const state = R.defaults(), records = M.filter(R.all,state), opts = R.filterOptions();
    return `<div class="wrap records-page records-collection">
      <header class="r-collection-intro">
        <div class="r-collection-title"><a class="breadcrumb" href="${P.url('dischi.html')}">${icon('back')} Plastic Pizzas</a><h1 id="collection-title">La<br><em>collezione.</em></h1>${R.randomButton()}</div>
        <aside class="r-collection-note" aria-labelledby="listening-title"><h2 id="listening-title">${e(C.closingFirst)}<br><em>${e(C.closingAccent)}</em></h2><p>${e(C.closingText)}</p><p class="r-source-note">Le copertine esterne sono riferimenti visivi dell\u2019album, non foto delle mie copie. Dove mancano, resta un segnaposto.</p></aside>
      </header>
      <!-- DISCHI-03 / Ricerca inline, filtri espliciti, niente overlay di ricerca -->
      <section class="r-catalog" id="catalogo" aria-labelledby="collection-title">
        <div class="r-controls"><label class="r-search">${icon('search')}<span class="sr-only">Cerca nel catalogo per artista, titolo, codice o dettaglio</span><input id="record-search" type="search" placeholder="Artista, titolo o un dettaglio\u2026" autocomplete="off" aria-controls="record-results"><kbd aria-hidden="true">/</kbd></label>
          <details class="r-filter-details"><summary>Filtri ${icon('plus')}<span id="record-filter-badge"></span></summary><div class="r-filters">
            <label>Formato<select data-r-filter="format">${opts.format}</select></label><label>Decennio<select data-r-filter="decade">${opts.decade}</select></label><label>Paese<select data-r-filter="country">${opts.country}</select></label><label>Sezione<select data-r-filter="section">${opts.section}</select></label>
            <label>Dettagli della copia<select data-r-filter="edition"><option value="">Tutte le copie</option><option value="notes">Con note aggiuntive</option><option value="colors">Campo colori compilato</option><option value="remaster">Remaster nelle note</option></select></label>
            <p class="r-filter-help">Formati e informazioni sono quelli del CSV. Nessun genere musicale assegnato automaticamente.</p>
          </div></details>
        </div>
        <div class="r-catalog-options"><p id="record-result-count" role="status" aria-live="polite">${R.number(M.artists(records).length)} artisti \u00b7 ${R.number(records.length)} titoli</p><div class="r-view-options"><label class="r-sort"><span class="sr-only">Ordina i dischi</span><select id="record-order"><option value="shelf">Ordine dello scaffale</option><option value="recent">Anno decrescente</option><option value="oldest">Anno crescente</option><option value="title">Titolo A\u2013Z</option></select></label><div class="r-view-switch" role="group" aria-label="Vista catalogo">${[['artists','Artisti'],['albums','Copertine'],['list','Elenco']].map(([v,label])=>`<button type="button" data-record-view="${v}" aria-pressed="${state.view===v}">${label}</button>`).join('')}</div></div></div>
        <!-- DISCHI-04 / A-Z: salto alla pagina e al primo artista o TITOLO -->
        <nav class="r-alphabet" id="record-alphabet" aria-label="Indice alfabetico del catalogo">${R.letters(R.all,state)}</nav>
        <p class="r-alphabet-note" id="record-alphabet-note">A–Z artisti / Le lettere spostano, non filtrano.</p>
        <div id="record-chips" class="r-chips" aria-label="Filtri attivi"></div>
        <!-- DISCHI-05 / Tre viste, tutte alimentate dagli stessi record -->
        <div class="r-pagebar" id="record-pagebar" tabindex="-1">${R.pagination(records,state,true)}</div>
        <p class="sr-only" id="record-navigation-status" role="status"></p>
        <div id="record-results">${R.results(records,state)}</div>
        <div class="r-pagination-area" id="record-pagination">${R.pagination(records,state)}</div>
      </section>
      ${C.showDataTools?`<details class="r-data-tools"><summary>Dati e aggiornamento del catalogo ${icon('plus')}</summary><div><p id="record-source-state">Catalogo incluso nel sito.</p><p>Il caricamento manuale resta soltanto in questa scheda del browser: non invia file e non modifica il sito pubblicato.</p><div class="r-data-actions"><label class="r-file-label">Apri un CSV locale<input id="record-csv-input" type="file" accept=".csv,text/csv"></label><a class="text-link" href="${P.url(C.csvFile)}" download>Scarica il CSV ${icon('right')}</a><button class="text-link" type="button" data-r-action="restore">Ripristina il catalogo incluso</button></div><p id="record-import-status" role="status"></p></div></details>`:''}
      <!-- DISCHI-08 / Alternativa realmente leggibile senza JavaScript -->
      <noscript><style>.r-catalog,.r-data-tools,.r-collection-title .r-random{display:none}.r-static{margin-block:40px}.r-static details{padding:16px 0;border-bottom:1px solid var(--line)}.r-static summary{cursor:pointer}.r-static dl{display:grid;grid-template-columns:1fr 1fr}</style><section class="r-static"><h2 class="section-title">Tutto il catalogo.</h2><p>JavaScript \u00e8 disattivato. Le ${R.all.length} schede restano consultabili qui; usa la ricerca del browser.</p>${M.sort(R.all).map(r=>`<details id="static-${e(r.id)}"><summary>${e(r.artist)} \u2014 ${e(r.title)} (${e(r.yearText||'anno non indicato')}) \u00b7 ${e(r.id)}</summary><dl>${M.HEADERS.map(key=>`<div><dt>${e(key)}</dt><dd>${e(r.raw[key]||C.unknownLabel)}</dd></div>`).join('')}</dl></details>`).join('')}</section></noscript>
      <!-- DISCHI-07 / Statistiche di tutto l'archivio: nessun dato esterno -->
      ${C.showNumbers?`<section class="r-numbers" id="numeri" aria-labelledby="records-numbers-title"><div class="section-heading"><div><p class="eyebrow">Dentro la collezione</p><h2 class="section-title" id="records-numbers-title">Qualche numero.</h2></div><p>Uno sguardo allo scaffale, non una classifica.</p></div><div id="record-numbers-content">${R.numbers()}</div></section>`:''}
    </div>`;
  };
  const originalRender = P.renderPage;
  P.renderPage = (page,options) => page==='records'?R.page():page==='record-collection'?R.collectionPage():originalRender(page,options);
})();
