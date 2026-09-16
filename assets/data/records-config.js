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
  // Nuova estrazione a ogni caricamento. Solo album con cover assegnata,
  // senza duplicare lo stesso artista + titolo (anche se possiedi piu' copie).
  // Filtri, pagine e apertura degli artisti NON cambiano queste proposte.
  featuredCount: 3,
  featuredLabel: 'Tre dal catalogo',
  defaultView: 'artists', // artists | albums | list
  pageSize: 20,           // Valore iniziale: Artisti o titoli per pagina.
  pageSizes: [20, 40, 'all'], // Scelta rapida accanto alla paginazione.
  // Durata apertura/chiusura artista, in millisecondi.
  // Con Riduci movimento attivo l'animazione e' disattivata.
  artistAnimationMs: 260,
  csvFile: 'data/Dischi.csv',
  fetchCSV: true,         // HTTP: rilegge il CSV; file://: usa la snapshot inclusa.
  fetchTimeout: 6000,
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
