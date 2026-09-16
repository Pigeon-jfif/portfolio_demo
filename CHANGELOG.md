## 2026-09-16 - R15 / Plastic Pizzas come sezione nascosta
- Rimossa `Dischi` dalla navigazione principale: restano Raccolte e Chi sono.
- Rimossi i collegamenti visibili a Plastic Pizzas dalla Home e dal footer.
- Il simbolo `©` nel footer diventa l'accesso discreto a `dischi.html`, senza variazioni visive; resta raggiungibile da tastiera con focus visibile.

## 2026-09-16 - R14 / dati di scatto Noale da EXIF
- Compilati i sei dati tecnici richiesti per tutte le 9 foto Birbs of Noale usando gli EXIF dei JPG originali forniti nello ZIP.
- Campi: corpo, obiettivo, lunghezza focale, ISO, diaframma e tempo di scatto.
- Associazione 9/9 tramite `sourceFile`; nessun dato tecnico dedotto o inventato.
- Aggiunto `docs/NOALE-EXIF-IMPORT.json` come audit dell’import.


## 2026-09-16 - R13 / dati di scatto Jesolo da EXIF
- Compilati i sei dati tecnici richiesti per tutte le 37 foto Jesolo usando gli EXIF dei JPG originali forniti nello ZIP.
- Campi: corpo, obiettivo, lunghezza focale, ISO, diaframma e tempo di scatto.
- Associazione effettuata tramite `sourceFile`; nessun dato tecnico dedotto o inventato.
- Aggiunto `docs/JESOLO-EXIF-IMPORT.json` come audit dell'import.
## 2026-09-16 - R12.1 / carosello: fix avvio e cache
- Gli asset della pagina Dischi hanno ora un version token (`?v=20260916-r12-1`) generato dal build: evita mix tra HTML nuovo e JS/CSS rimasti in cache.
- Il carosello non si ferma piu' al semplice passaggio del mouse; continua a fermarsi fuori viewport, con scheda disco aperta, pagina nascosta, focus tastiera e Riduci movimento.
- La visibilita' usa `isIntersecting` senza richiedere il 15% minimo della sezione.
- Una nuova cover viene inserita solo quando la thumb precaricata e' davvero pronta.

## R12 - Carosello Tre dal catalogo

- I tre dischi iniziali diventano un carosello continuo: ogni 2 secondi la cover a sinistra sfuma fuori, le altre scalano di una posizione e una nuova cover entra da destra.
- Il carosello usa solo album con una cover assegnata e precarica la prossima thumb prima della transizione.
- Cooldown di 10 nuove estrazioni per identita album: copie fisiche duplicate non aggirano il blocco.
- Auto-scroll sospeso quando il carosello esce dal viewport, quando una scheda disco e' aperta, su hover/focus, a pagina nascosta e con Riduci movimento.
- Testo editoriale aggiornato in "Lascia che scorrano o scorri il catalogo.".

## R11 - Mobile sequenza + default scaffale

- Su mobile le fotografie verticali in vista Sequenza occupano ora tutta la larghezza disponibile, senza il vecchio restringimento allineato a sinistra.
- Le viste Artisti, Copertine ed Elenco di Plastic Pizzas partono tutte da Ordine dello scaffale; i salti A-Z continuano a usare Titolo A-Z quando richiesto.
- In Plastic Pizzas la chiusura editoriale "I dischi si ascoltano." precede ora "Qualche numero.".

## R10 — Copertina Conegliano + coda Sequenza

- Photo Safari Conegliano usa `CON-005` (Mani), orizzontale 3:2, come copertina in Raccolte.
- Sequenza: una foto verticale non resta singola in fondo se esiste un'orizzontale con cui fare uno scambio locale.
- Tre verticali consecutive in coda possono essere impaginate insieme sulla stessa riga.
- Panoramiche ~21:9 sempre full-width; coppie e trittici restano senza crop.

## R9 — Photo Safari Conegliano + ordine setup audio

- Aggiunta la raccolta Photo Safari Conegliano con 7 fotografie.
- Sei titoli recuperano i nomi storici: Rete, Cancello, Torre, Mani, Semaforo, Albero.
- Albero (`CON-007`) e' la copertina della raccolta.
- Nuovi asset WebP full + thumb, senza upscale.
- Setup audio riordinato: giradischi, amplificatore, cuffie, casse.
- Nota di pubblicazione resa neutra rispetto alla presenza del watermark.

# Patch 16 settembre 2026 / galleria resiliente v1.5

- Griglia passata a cornici 3:2 invisibili: stesso sfondo della pagina, `object-fit: contain`, didascalie ancora allineate.
- Sequenza resa resiliente alle panoramiche: le ~21:9 vengono agganciate ai confini delle coppie invece di creare normali singole sopra e sotto.
- Foto normali sempre a coppie; se il totale e' dispari, l'unica spaiata resta alla fine della sequenza.
- Rimossa la forzatura dei trittici verticali e la rottura di riga ai cambi categoria.
- Casuale rinforzato con Fisher-Yates e guardia anti no-op: ogni click con almeno due foto visibili cambia davvero l'ordine.
- Regole applicate a tutte le raccolte; Noale chiude con l'unica eventuale foto singola.

# Patch 16 settembre 2026 / galleria dinamica + ordine foto

- Griglia fotografica con cornici 4:3 uniformi: immagini intere e centrate, didascalie allineate.
- Sequenza a pari altezza senza crop: larghezze calcolate dal rapporto d'aspetto delle foto.
- Panoramiche circa 21:9 su una riga intera; trittici verticali ancora supportati.
- Nuovo controllo Per categoria / Casuale accanto a Sequenza / Griglia, valido per tutte le raccolte.
- Ordine categoria raggruppato senza perdere l'ordine curatoriale interno; casuale rimescolabile.
- Jesolo: copertina raccolta impostata sulla foto 36, JES-009 "La curva".
- Viewer, filtri, ricerca, ID e file fotografici invariati.

# Patch 16 settembre 2026 / catalogo compatto + Jesolo 37

- Vista Copertine allineata ai pannelli artista: schede orizzontali, cover a sinistra e dati a destra, tre per riga su desktop.
- Rimossi i riempitivi vuoti ai cambi lettera: gli artisti scorrono senza buchi artificiali.
- Tile artista resa piu' visiva: artwork piu' grande e ancorato in basso a destra, allineato alla riga "N titoli".
- Apertura artista: lo scroll automatico, quando necessario, torna alla riga dell'artista.
- Jesolo ricostruita usando soltanto le 37 immagini della nuova zip; i vecchi scatti esclusi non fanno piu' parte dei dati attivi.
- Jesolo pubblicata come WebP: copia principale fino a 2400 px e thumb fino a 960 px, senza upscale degli originali.
- Nuova sequenza Jesolo: altri passaggi e C-27J, Eurofighter, F-35, poi Frecce; ultima immagine centrata quando resta dispari.
- Filtri Jesolo aggiornati a Frecce / Eurofighter / F-35 / Altro; copertina raccolta invariata su JES-011.

# Patch 16 settembre 2026 / artisti orizzontali + WebP

- Tile artista senza intervallo anni; cover di esempio leggermente piu' grande.
- Album dentro l'artista in schede orizzontali, tre per riga su desktop: cover a sinistra, dati a destra.
- Segnaposto delle cover mancanti alleggerito nel pannello artista: resta solo "Copertina da aggiungere".
- Apertura artista: se serve lo scroll automatico torna all'inizio della riga dell'artista, non all'inizio del pannello album.
- Le 228 cover principali passano da JPG a WebP alla risoluzione nativa; restano 228 thumb WebP.
- I JPG sorgente escono dal payload del sito e restano archivio esterno.

# Patch 16 settembre 2026 / cover + catalogo piu' compatto

- Importate 228 cover locali, collegate a 235 copie; duplicate album condividono il file.
- Dookie e The Dark Side Of The Moon passano a file locali; Trench resta remoto.
- Sfoglia il catalogo ancora direttamente Lo scaffale / La collezione.
- Tile artista senza numero progressivo e con cambio iniziale su riga nuova tramite celle vuote.
- Paginazione: 20 elementi iniziali, scelta 20 / 40 / Tutti accanto a Pagina A di N.
- Cover delle card album molto piu' piccole nella vista Copertine e nei pannelli artista.
- Build, check e test Node aggiornati e superati.

# v2.1 / Plastic Pizzas: navigazione e cover

- Tre dal catalogo: estrazione a ogni caricamento fra album con cover, senza doppioni.
- Pannelli artista animati sotto la riga: nessun filtro artista e nessun cambio vista.
- Lettere come destinazioni: artista nell'indice, titolo nelle viste album.
- Pagine numerate con salti A-Z, range, URL e navigazione da tastiera.
- 20 cover locali / 21 voci, due copie Breach con artwork condiviso.
- Dati delle 433 copie e 40 file fotografici invariati.
- Documentazione, indice cover e indice pagine A-Z aggiornati; test di regressione.

# v2.0 - 15 settembre 2026 / Plastic Pizzas integrato

- Aggiunta pagina Dischi allo stesso sito, header e footer condivisi.
- Ricostruito il catalogo senza importare codice o risorse delle vecchie skin.
- Conservate tutte le 433 righe / 498 dischi fisici; aggiunta colonna ID permanente.
- Originale CSV archiviato identico, nessuna correzione bibliografica automatica.
- Artisti / Copertine / Elenco, ricerca inline, filtri combinabili e alfabeto.
- Ordine scaffale cronologico crescente; copie/edizioni distinte, campi ignoti espliciti.
- Casuale fra i filtrati; dettaglio scuro con tastiera, focus, URL diretto e link.
- Snapshot locale + lettura HTTP CSV + import manuale temporaneo con validazione.
- 3 artwork remoti verificati a livello album, associati a 4 voci; nessuna cover locale.
- Cartelle, mappa cover, fonti, segnaposto, preparatore e downloader opzionali.
- Aggiunti test e documentazione. Confronti e file delle foto conservati.
- Home: solo breve riferimento e link dischi. Nessun nuovo setup audio.

---

# v1.3 - 15 settembre 2026 / chiusura del primo ciclo

- Topnav ridotta a logo p. (Home), Raccolte e Chi sono.
- Rimossi il secondo tasto Home pigeon.jfif e Instagram dalla sola topnav.
- Instagram nei Contatti/footer e nome in Home/viewer conservati.
- Sequenza album: due foto per riga dal principio, senza immagini a tutta riga.
- Trittici automatici per tre verticali consecutive a inizio riga su desktop.
- Tablet a due colonne; telefono a una. Griglia compatta conservata.
- Noale: tre ritratti riuniti nella terza riga tramite ordine degli ID.
- Ordine Jesolo invariato. Nessun file fotografico ricompresso o ritoccato.
- Eliminato il campo layout non piu' necessario; variant wide/crop conservato.
- Aggiornati template, preparatore, indice posizioni, commenti e documenti.
- Aggiunto tools/test.js senza dipendenze per le regole 2/3 e la navigazione.
- Home, Chi sono, palette, font, logo e copertine alternate invariati.

---

# v1.2 - 15 settembre 2026

- Nome in Home piu' piccolo, .jfif spaziato positivamente e senza legature.
- Biografia e attrezzatura direttamente leggibili in Home, non card-link.
- Setup condiviso fra Home e Chi sono. Chi sono conserva testi e struttura.
- Raccolte: copertine piu' contenute, alternate automaticamente su desktop.
- Rimossa la sezione Parti dal soggetto; filtri dentro ogni album conservati.
- Aggiunta Birbs of Noale con tutte le 9 foto; totale 20 foto e 2 raccolte.
- Nuovi codici NOA-001..009, copie web con firma provvisoria documentata.
- Ritratti verticali contenuti in Sequenza, senza ritagli automatici.
- Date di album vuote omesse; nessun EXIF inventato per i nuovi scatti.
- Aggiornati manuale, mappa, indici, tavole, template e validazione.
- Le 11 foto Jesolo e relative miniature non sono state modificate.
- Logo p. invariato. Nessuna pagina Fotografie, nessuna sezione vinili.

---

# v1.1 / Home personale, una sola porta alle fotografie

- Home senza fotografie, album in evidenza o riferimenti a generi specifici.
- Grande pigeon.jfif, una presentazione breve e il solo sistema Fujifilm.
- Link Raccolte in fondo piccolo e disattivabile; footer Home compatto.
- Favicon originale p. nell'header; il nome pigeon.jfif sostituisce Home nel menu.
- Pagina Fotografie rimossa: indice, navigazione e dati passano solo da Raccolte.
- Chi sono solo testuale: biografia breve, setup, nota sulle copie web e contatti.
- Georgia Italic esplicito e indipendente per .jfif. Titoli ancora Georgia.
- Inter libero per pigeon e testi; caricamento ufficiale esterno disattivabile.
- Logo SVG riutilizzabile, documentazione font, anteprima social senza fotografie.
- Regola copie web con tag incorporato esplicitata in documenti e strumenti.
- Il preparatore richiede --watermarked, senza pretendere di riconoscere il tag.
- Commenti, template, indice posizioni, build e controlli aggiornati.
- Tolte regole CSS e opzioni relative alle sezioni eliminate.
- Tutte le 11 fotografie, le miniature, gli ID, i confronti e l'ordine dell'album
  restano quelli della v1. Nessun ricampionamento aggiuntivo delle fotografie.

---

# v1.0 / Dalla demo al sito strutturato

## Conservato

Palette carta/inchiostro/blu, font di sistema, wordmark pigeon.jfif con suffisso
in corsivo, EFA in apertura, immagini a proporzioni intere, atmosfera editoriale,
visualizzatore scuro, doppia vista della galleria e confronti dei ritagli.

## Aggiunto

Home con presentazione e setup, pagina Fotografie separata, pagina Chi sono piu'
completa, catalogo multi-album, codici stabili degli scatti, schede tecniche con
campi opzionali, ricerca per codice/titolo/soggetto, zoom nativo, link alla foto,
HTML con contenuti statici, pagina 404, strumenti di controllo e generazione,
preparatore opzionale delle immagini, modelli e documentazione delle posizioni.

## Materiale disponibile

11 JPG della chat, non master FQ. Originali ricevuti conservati byte per byte
nelle copie large rinominate; miniature WebP generate a parte. Nessun altro
scatto, ritratto personale o parametro tecnico per foto e' stato inventato.
