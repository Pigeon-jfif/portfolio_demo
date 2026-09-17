/**
 * RECORDS-CONFIG.JS / PLASTIC PIZZAS
 * ================================================================
 * Qui si cambiano i TESTI e le scelte editoriali, non le schede dei dischi.
 * Il catalogo modificabile e' data/Dischi.csv. Le cover sono in record-covers.js.
 * I VIN-xxxx sono ID permanenti: non cambiarli per riordinare gli album.
 */
window.PIGEON_RECORDS_CONFIG = {
  titleFirst: 'Plastic',
  titleAccent: 'Pizzas.',
  eyebrow: 'Dischi / La collezione personale',
  intro: 'Musica da tenere tra le mani.',
  description: 'Il mio scaffale, un disco alla volta. Album, colonne sonore, raccolte e piccole scoperte: un archivio da sfogliare e, soprattutto, da ascoltare.',
  // Tre copertine a scaletta. Scorrimento lineare, senza soste fra gli album.
  featuredCount: 3,
  featuredLabel: 'Tre dal catalogo',
  featuredAnimationMs: 4500, // Tempo per percorrere uno spazio: piu' alto = piu' lento.
  featuredAutoplay: true,
  // Avvio automatico richiesto anche quando il sistema riduce il movimento.
  // Il pulsante Pausa resta sempre disponibile. true ripristina la preferenza OS.
  featuredRespectReducedMotion: false,
  featuredPauseOnHover: false,
  featuredLoadTimeoutMs: 4500,
  featuredCaptionBefore: 'Qualche disco di passaggio. Il resto \u00e8 nella ',
  featuredCaptionLink: 'collezione',
  featuredCaptionAfter: '.',
  collectionFile: 'collezione.html',
  // Tre immagini iniziali e una fuori campo; una sola candidata in preparazione.
  defaultView: 'artists', // artists | albums | list
  pageSize: 20,           // Valore iniziale: Artisti o titoli per pagina.
  pageSizes: [20, 40, 'all'], // Scelta rapida accanto alla paginazione.
  // Durata apertura/chiusura artista, in millisecondi.
  // Con Riduci movimento attivo l'animazione e' disattivata.
  artistAnimationMs: 260,
  csvFile: 'data/Dischi.csv',
  fetchCSV: true,         // HTTP: rilegge il CSV; file://: usa la snapshot inclusa.
  fetchTimeout: 6000,
  // Le WebP locali sono raccolte in pacchetti ZIP da 50 ID.
  // Il browser scarica solo i pacchetti necessari e li conserva in cache per la sessione.
  // Gli ZIP sono separati tra miniature e full per non scaricare immagini grandi nella griglia.
  coverArchives: {
    enabled: true,
    packSize: 50,
    prefix: 'covers-',
    fullDir: 'assets/covers/packs/full',
    thumbDir: 'assets/covers/packs/thumbs'
  },
  // false = solo cover locali. Le fonti esterne non certificano l'edizione.
  allowRemoteCovers: true,
  missingCoverLabel: 'Copertina da aggiungere',
  unknownLabel: 'Non indicato',
  closingFirst: 'I dischi si',
  closingAccent: 'ascoltano.',
  closingText: 'Questo catalogo racconta una collezione personale, non un negozio. Le informazioni sulle singole copie arrivano dal mio archivio.',
  showNumbers: true,
  showDataTools: true
};
