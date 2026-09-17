# Aggiornamento: Plastic Pizzas / cover in pacchetti ZIP

Le cover locali non sono piu' pubblicate come 456 file WebP separati: 228 full
e 228 miniature sono raccolte in **18 ZIP_STORED** (9 full + 9 thumbs), in blocchi
di 50 ID. Il browser scarica soltanto i pacchetti necessari e li riusa in memoria.
I percorsi `assets/covers/full/VIN-....webp` e `thumbs/...` restano identificatori
logici in `record-covers.js`, quindi la mappa delle cover non va riscritta.

Questa revisione conserva il movimento nativo e la landing compatta di **smooth4**.
La patch ZIP-covers include anche gli archivi con le immagini e gli strumenti per
rigenerarli; non richiede librerie JavaScript esterne.

## Dati di scatto Noale

Le 9 foto di Birbs of Noale hanno ora corpo, obiettivo, focale, ISO, diaframma e tempo compilati direttamente dagli EXIF dei JPG originali forniti. L’associazione usa i nomi `sourceFile`; l’audit dell’import è in `docs/NOALE-EXIF-IMPORT.json`.

## Dati di scatto Jesolo

Le 37 foto di Jesolo hanno ora corpo, obiettivo, focale, ISO, diaframma e tempo compilati direttamente dagli EXIF dei JPG originali forniti. L’audit dell’import è in `docs/JESOLO-EXIF-IMPORT.json`.

# pigeon.jfif / Fotografie + Plastic Pizzas / v2.1

Un unico sito, due archivi: le raccolte fotografiche approvate nella v1.3 e
**Plastic Pizzas**, il catalogo dei dischi ricostruito sulla stessa palette,
tipografia e navigazione. Nessun selettore di skin e nessun framework.

Il logo `p.` riporta alla Home. Il menu contiene **Raccolte, Plastic Pizzas e Chi sono**.
I rimandi nella Home, nel footer e nella sezione audio portano alla landing Plastic Pizzas.
La collezione completa ha una pagina separata, accessibile dalla parola collezione sotto le cover.
Le gallerie fotografiche usano righe dinamiche senza crop, griglia uniforme e il visualizzatore della v1.4.

**Per le tue fotografie: solo copie web con tag incorporato.** Nessun master FQ, RAW o immagine pulita
deve entrare nella cartella del sito, neppure se non appare nella galleria.

**Per provarlo: estrai l'intera cartella.** Le pagine fotografiche possono ancora
essere aperte direttamente; per vedere anche le cover ZIP di Plastic Pizzas usa
GitHub Pages oppure un piccolo server statico locale, per esempio
`python -m http.server`. Non serve un server applicativo o un database.
Non aprire l'HTML da dentro lo ZIP.

## Plastic Pizzas: partenza rapida

Apri **`dischi.html`** per la landing e **`collezione.html`** per il catalogo.
Su GitHub Pages funzionano direttamente; in locale servi la cartella via HTTP
(per esempio `python -m http.server`). Node non e' necessario per visitarle.

Ci sono tre viste: **Artisti, Copertine ed Elenco**. Ricerca e filtri si combinano.
Cliccando un artista si apre, con una breve animazione, un pannello sotto la sua
riga: il resto del catalogo rimane presente. I suoi album sono in ordine
**anno crescente, poi titolo**; gli anni mancanti restano in coda.

**Le lettere sono salti, non filtri.** In Artisti indicano il nome; in Copertine
ed Elenco indicano il **titolo dell'album**, mai il nome del suo artista.
Il salto seleziona la pagina corretta, scorre al primo elemento della lettera
e lo evidenzia brevemente. Le tre viste partono da **Ordine dello scaffale**;
Copertine ed Elenco possono poi essere riordinati dal selettore. Nelle viste
album, un salto A-Z imposta Titolo A-Z anche se prima avevi scelto un altro
ordinamento. Ricerca e filtri attivi non vengono cancellati.

**20 elementi per pagina all'avvio**, con scelta rapida **20 / 40 / Tutti** accanto a "Pagina A di N". In Artisti si contano gli artisti; i dischi dentro il pannello non consumano posti nella pagina. Le lettere restano semplici destinazioni: non vengono inserite celle vuote fra un'iniziale e la successiva. Le frecce del browser ripercorrono i cambi pagina; i filtri ripartono da pagina 1.

**Presentazione delle copertine:** tre a scaletta, in movimento lineare continuo.
Parte da sola, percorre uno spazio in 4,5 secondi e non si ferma al ricambio.
Pausa/Riprendi conserva il frame. Il mouse sopra non la ferma; il focus da tastiera
si', per rendere utilizzabili i link. I bordi restano sfumati.
La variante a due righe non fa piu' parte del progetto.

Le prime tre miniature sono nell'HTML. Il motore prepara una quarta fuori campo
e una sola candidata successiva. Non scarica tutto il catalogo all'avvio.
Con rete lenta ricicla fuori campo una cover pronta, senza interrompere il moto.
Parametri in records-config.js; dettagli e verifiche in docs/records/PRESENTAZIONI.md.

**Cosa ascolto?** pesca da TUTTI i risultati filtrati, non soltanto dalla pagina
visibile. Non ripete immediatamente la stessa voce quando esistono alternative.
Non registra una cronologia di ascolti.

Ogni riga del CSV ha un ID `VIN-0001`, `VIN-0002`... **L'ID identifica una copia,
non la sua posizione.** Due edizioni dello stesso album restano due voci.
L'importazione iniziale conserva le 9 colonne originali, aggiungendo soltanto ID.
L'originale identico si trova in `docs/import/Dischi-originale.csv`.

Per aggiungere un disco: aggiungi una riga al CSV con un nuovo ID, compila solo
cio' che sai, poi esegui build. Non cambiare gli ID precedenti per riordinare.
Per cambiare una cover: usa `tools/prepare_cover.py`, oppure metti WebP gia' pronti in `assets/covers/staging/full` e `assets/covers/staging/thumbs`, quindi esegui `python tools/cover_packs.py --clear-staging`. I percorsi `assets/covers/full/...` e `thumbs/...` restano gli identificatori logici in `record-covers.js`, ma sul sito pubblicato le immagini sono dentro pacchetti ZIP da 50 ID.

**Copertine locali:** 228 WebP full a risoluzione nativa e 228 miniature WebP, raccolte in **18 ZIP** (9 full + 9 thumbs) e associate a **235 voci** del catalogo. Le copie duplicate dello stesso artista/titolo condividono lo stesso artwork locale ma restano schede distinte. I JPG ricevuti restano sorgenti esterne al payload del sito; non vengono pubblicati. Tra gli artwork remoti precedenti resta attivo soltanto **Trench**; Dookie e The Dark Side Of The Moon ora usano file locali. Nessuna copertina modifica titolo, anno, formato o note del CSV.

L'abbinamento Gazebo segue il nome dell'allegato `gazebo_gazebo.jpg`; l'immagine
reca "I Like Chopin", mentre il catalogo conserva "Gazebo". Anche "The Belle" /
"Stars" resta come nel CSV. Queste differenze sono annotate nella guida, non
corrette automaticamente. Tutte le cover restano illustrative dell'album,
non certificazioni della stampa o fotografie dichiarate della tua copia.

Documentazione dedicata:
- `docs/records/CATALOGO.md`: schema, filtri, aggiornamenti, importazione.
- `docs/records/RECORD-INDEX.txt`: tutti i codici, titoli, note e percorsi proposti.
- `docs/records/COVER-GUIDE.md`: copertine locali/remoto e strumenti opzionali.
- `docs/records/NAVIGATION-INDEX.txt`: prima voce e pagina di ogni lettera.
- `docs/records/COVER-INDEX.txt`: abbinamenti, file condivisi e nomi degli allegati.
- `Structure.txt`: mappa DISCHI-01...08 e file da modificare.

## 1. Da dove partire

| Voglio modificare... | File |
| --- | --- |
| Catalogo dei dischi: tutte le colonne e le copie | `data/Dischi.csv` |
| Testi, pagine, animazione e opzioni di Plastic Pizzas | `assets/data/records-config.js` |
| Abbinamenti cover e fonti | `assets/data/record-covers.js` |
| Layout specifico dei dischi | `assets/css/records.css` |
| Testi, biografia, setup, Instagram, email | `assets/data/site.js` |
| Titoli delle foto, ISO, tempi, file, descrizioni | `assets/data/photos.js` |
| Ordine delle foto, copertine, nuove raccolte, filtri | `assets/data/albums.js` |
| Colori, famiglie di font, spazi laterali | `assets/css/theme.css` |
| Caricamento esterno opzionale di Inter | `assets/css/fonts.css` |
| Nome dei font e logo riutilizzabile | `docs/FONT-E-LOGO.txt`, `assets/brand/` |
| Dimensioni, griglie, componenti e mobile | `assets/css/style.css` |
| Ordine e struttura delle sezioni | `assets/js/pages.js` |
| Header, footer e componenti condivisi | `assets/js/core.js` |

I file dati sono JavaScript semplice, non JSON puro: i commenti sono ammessi.
Mantieni virgole, parentesi e virgolette. I testi sono testo semplice, non HTML.
Per un valore opzionale usa `""`, non la parola `null` dentro una stringa.

**Mappa delle posizioni:** `Structure.txt`.
**Indice aggiornabile di tutti gli scatti:** `docs/PHOTO-INDEX.txt`.
**Riconoscimento visivo dei codici:** `docs/PLAN-PHOTOS.jpg`.
**Nuovi scatti:** `docs/NOALE.txt` e `docs/PLAN-NOALE.jpg`.

> Le 9 immagini di Noale hanno una firma PROVVISORIA incorporata per questa
> prova. Non e' il tuo tag definitivo: sostituiscile con i tuoi export web
> firmati prima della pubblicazione. Originali non modificati e non inclusi.

## 2. Pagine incluse

- `index.html`: nome piu' piccolo, biografia e setup in chiaro, link discreto alle raccolte.
- `dischi.html`: landing Plastic Pizzas con copertine e metriche.
- `collezione.html`: catalogo completo, ricerca, viste, dettagli e statistiche.
- `raccolte.html`: copertine alternate sinistra/destra. Nessuna sezione per soggetto.
- `serie/jesolo.html`: raccolta Jesolo Air Show, 37 immagini.
- `serie/birbs-of-noale.html`: raccolta Birbs of Noale, 9 immagini.
- `serie/conegliano.html`: Photo Safari Conegliano, 7 immagini.
- `album.html?id=...`: modello universale per le nuove raccolte.
- `info.html`: breve biografia, setup e contatti. Nessuna fotografia.
- `404.html`: pagina di errore per la pubblicazione.

Le raccolte descritte sono tre, con 53 fotografie (37 + 9 + 7). I file Noale/Conegliano non erano inclusi nell'allegato originale; vedi LEGGIMI-PRIMA.txt. Non ci sono album finti, servizi professionali inventati,
recensioni o un modulo di contatto che finge di inviare email.

## 3. Modifica quotidiana e HTML statici

Il browser legge `assets/data/*.js`: cambia un testo, salva e aggiorna la pagina.
Non devi eseguire una compilazione a ogni modifica ai testi o ai dati fotografici.

**Per i dischi, la fonte modificabile e' `data/Dischi.csv`.** Sul sito HTTP il
browser prova a rileggerlo. Aprendo da file locale usa `assets/data/records.js`,
una copia generata: dopo una modifica al CSV, esegui `node tools/build.js`.
Le cover dentro ZIP richiedono invece HTTP: su GitHub Pages funzionano normalmente;
per provarle in locale avvia un piccolo server (per esempio `python -m http.server`).
In alternativa puoi aprire temporaneamente il CSV dal pannello a fondo catalogo;
quel caricamento non modifica i file del sito, e non viene inviato online.

Gli HTML consegnati contengono anche una copia statica dei contenuti: non sono
schermate vuote. Servono per lettura senza JavaScript e metadati della pagina.
Per riallineare questa copia **prima di pubblicare** esegui, dalla cartella del
progetto, con Node installato:

```sh
node tools/build.js
node tools/check.js
node tools/test.js
node tools/records-test.js
node tools/records-navigation-test.js
```

Non e' necessario `npm install`. Sono strumenti senza dipendenze.
`build.js` valida il CSV, rigenera la copia locale del catalogo, gli HTML e gli indici e, con l'URL
pubblico configurato, genera sitemap e canonical. Non cambia le fotografie.
Le vecchie pagine di album generate e poi rimosse dai dati vengono eliminate;
le immagini restano e vanno rimosse manualmente quando necessario.

**Non modificare direttamente gli HTML generati:** al caricamento i dati
aggiornati li sostituirebbero, e la successiva build li sovrascriverebbe.
Per la struttura modifica `pages.js`; per head/script comuni, `templates/page.html`.

## 4. Codici foto: cosa significano

`JES-001` identifica sempre lo stesso scatto, indipendentemente da dove appare.
Non e' il numero di posizione in galleria. L'ordine si cambia spostando i codici
in `album.photoIds`, senza rinominare i file.

Esempi reali della consegna:

- `JES-001`: Eurofighter fra motori, calore e nuvole.
- `JES-003`: Eurofighter ravvicinato, mantenuto come scatto autonomo.
- `JES-005` e `JES-006`: Frecce in formazione, totale e dettaglio centrale; sono la coppia confrontabile.
- `JES-011`: Passaggio II, copertina di Jesolo.
- `JES-012` ... `JES-040`: nuove selezioni Jesolo 2026 da Frecce, Eurofighter, F-35, C-27J e altri passaggi.
- `JES-002`, `JES-004` e `JES-010` non vengono riutilizzati: i vecchi scatti associati a quei codici non fanno parte della selezione attuale.
- `NOA-005`: Iridescenze, piccione in copertina di Noale.
- `NOA-001` ... `NOA-009`: i nove scatti di Noale. Codici non legati all'ordine.
- `CON-001` ... `CON-007`: sette scatti del Photo Safari di Conegliano; `CON-005` (Mani) e' la copertina orizzontale 3:2.

Nella scheda tecnica del visualizzatore il codice e' sempre presente.
`site.gallery.showCodes = true` lo mostra anche nelle didascalie delle gallerie.
La ricerca della raccolta trova anche i codici, senza doverli mostrare ovunque.

## 5. Aggiungere o aggiornare una foto

1. Prepara una copia per il web con il tag gia' incorporato nei pixel. Tieni master FQ/RAW e copie senza firma fuori dal progetto.
2. Per il flusso attuale copia/crea il file WebP in `assets/photos/NOME-ALBUM/full/CODICE.webp`. La cartella `large/` resta supportata per il materiale legacy, come Noale.
3. Crea una miniatura WebP in `thumbs/CODICE.webp` quando utile.
4. Duplica il modello `templates/FOTO.txt` in `assets/data/photos.js`.
5. Compila i campi, poi aggiungi l'ID a `photoIds` della sua raccolta in `albums.js`.
6. Controlla nel browser; prima di pubblicare esegui check e build.

`file` e `thumb` sono relativi alla radice del sito: **senza slash iniziale**.
Sono case-sensitive quando il sito e' pubblicato: `JES-001.webp` e `jes-001.webp`
non devono essere confusi. Non usare spazi o accenti nei nomi dei file.

`width` e `height` sono i pixel del file web pubblicato. `thumbWidth` e' la larghezza
vera della miniatura. Servono per proporzioni e immagini responsive.
Con `thumb: ""` e `thumbWidth: 0` il sito funziona usando soltanto il file principale.

### Preparazione assistita, opzionale

Lo script Python parte da un export web GIA' FIRMATO, ridimensiona senza
ingrandire, crea le due versioni, rimuove
EXIF/GPS dal file pubblico e stampa la scheda da completare. Usa Pillow:

```sh
python -m pip install Pillow
python tools/prepare_photo.py "/percorso/export_wm.jpg" --watermarked --album jesolo-2026 --id JES-012 --filter efa
```

Il flag `--watermarked` conferma che la sorgente e' gia' firmata: lo script
non riconosce, non aggiunge e non rimuove un watermark. Accetta soltanto
JPG, PNG o WebP, non RAW/TIFF. Controlla che il tag resti leggibile anche nella
miniatura ridotta.

Il lato lungo massimo predefinito e' 2560 px; puoi cambiarlo con `--width`.
Non sovrascrive file esistenti senza `--force`. Non modifica la sorgente.
Se presente, converte il profilo ICC in sRGB. Senza profilo assume sRGB e lo
segnala: prepara preferibilmente l'export sRGB nel tuo programma di editing.
I dati EXIF proposti vanno comunque verificati. Il catalogo non viene
modificato automaticamente: completi la scheda e scegli dove inserire la foto.

## 6. ISO, tempo, diaframma e dimensioni

In ogni foto trovi:

```js
"capture": {
  "camera": "Fujifilm X-T5",
  "lens": "",
  "focalLength": "",
  "aperture": "",
  "shutter": "",
  "iso": "",
  "capturedAt": ""
}
```

Formati possibili: `"200 mm"`, `"f/6.4"`, `"1/2000 s"`, `"800"`.
Sono **esempi di scrittura, non valori da applicare agli scatti esistenti**.
Il pulsante Info mostra automaticamente i campi compilati; quelli vuoti
non producono trattini o dati inventati.

I JPG condivisi in chat non contengono EXIF utili. Per JESOLO la fotocamera
e' indicata in base al setup confermato per quella sessione; lente, focale, ISO, tempo e diaframma del singolo
scatto restano vuoti. Non sono stati dedotti dalle impostazioni usate piu' spesso.

`referenceExport` e' un'altra cosa: conserva le dimensioni dell'export che
hai comunicato, se note. Non fa passare il JPG web per un master ad alta risoluzione.
Per esempio JES-001 ha un file web di 2048 x 877 px e un export di riferimento
di 7096 x 3042 px. Questa differenza e' visibile nella scheda tecnica.

Per Noale non sono stati comunicati data e parametri dei singoli scatti:
**tutti i campi capture sono vuoti**, compreso il corpo macchina. Il setup
mostrato in Home non viene automaticamente assegnato a ogni fotografia.
Anche `dateLabel`, `monthLabel` e `year` dell'album sono vuoti: non compare
una data inventata, ne' un trattino al suo posto.

## 7. Aggiungere una raccolta

Duplica `templates/ALBUM.txt` in `assets/data/albums.js`, compila le informazioni
e inserisci i codici delle sue foto. Lo stesso layout funzionera' con nuovi
soggetti, luoghi e date. L'ordine dell'array decide quello della pagina Raccolte.
L'alternanza e' automatica: 1a copertina a sinistra, 2a a destra, 3a a sinistra.
Su telefono ogni voce torna a foto sopra / testo sotto.
I filtri (`id` e `label`) rimangono dentro gli album: non richiedono piu' una
copertina separata o il vecchio campo `title`.

Con `page: ""` l'album funziona subito con `album.html?id=nuova-raccolta`.
Il modello generico richiede JavaScript e ha `noindex` nella copia statica.

Per una raccolta pubblica definitiva usa preferibilmente:

```js
"page": "serie/nuova-raccolta.html"
```

Esegui `node tools/build.js`: la pagina dedicata viene creata con titolo,
contenuto statico e metadati specifici. Non devi copiare HTML a mano.
`published: false` nasconde una raccolta dall'interfaccia; NON rende privati
le immagini, il codice sorgente o il repository.

## 8. Confrontare due tagli

Servono due schede foto, ciascuna con il suo file, nello stesso album:

```js
// Scheda A
"id": "JES-005", "variant": "wide", "pairId": "JES-006"
// Scheda B
"id": "JES-006", "variant": "crop", "pairId": "JES-005"
```

Il legame e' reciproco. Il pulsante Confronta compare solo sulle foto abbinate.
Le etichette sono "Inquadratura ampia" e "Crop", non "RAW" o "Originale":
anche la versione ampia puo' essere gia' elaborata.
Per rimuovere un confronto, svuota `pairId` su entrambe le schede.

## 9. Comandi e accessibilita'

Click sulla fotografia: visualizzatore. Frecce destra/sinistra: precedente e
successiva. `I`: informazioni. `C`: confronto. `Z`: dimensione nativa.
`Esc`: chiudi. `Tab` e `Shift+Tab`: navigazione dei controlli.
La navigazione segue il filtro e la ricerca attivi, non riapre tutte le foto.

Su touch sono supportati swipe orizzontali; in zoom il gesto resta allo
scorrimento dell'immagine. Il confronto diventa verticale sui telefoni.
Le fotografie mantengono le proporzioni: nessun ritaglio automatico del sito.

Il pulsante Link copia una destinazione alla raccolta con `#foto=CODICE`.
Da un file locale avvisa che il link sara' condivisibile dopo la pubblicazione.
Se gli appunti non sono disponibili, mostra un campo da copiare manualmente.

Il codice include link per saltare al contenuto, descrizioni alternative,
focus visibile, dialog modale, gestione del focus e riduzione delle animazioni.
Queste accortezze non equivalgono a una certificazione completa di accessibilita'.

## 10. Pubblicazione

Il sito non e' ancora online. Per GitHub Pages, carica i file del sito alla
radice del repository (con `index.html` alla radice, non dentro una cartella
aggiuntiva per errore). Conserva `.nojekyll`.
Nelle impostazioni del repository: **Settings > Pages > Deploy from a branch**;
scegli il branch che contiene il sito e la cartella **/(root)**.
Non serve un workflow personalizzato per questo progetto statico.

Quando conosci l'indirizzo pubblico, inseriscilo in `site.siteUrl`, includendo
l'eventuale nome del repository e lo slash finale, poi esegui build e ricarica
i file modificati. L'URL non e' stato inventato nella consegna.

Con `siteUrl` compilato, build genera canonical, URL social assoluti, sitemap
e percorsi assoluti per la pagina 404. Un `robots.txt` in una sottocartella
non sostituisce quello alla radice del dominio: valuta la sitemap a seconda
dell'hosting. L'anteprima social usa `assets/og-cover.jpg`; sostituiscila con
un'immagine dedicata quando desideri, mantenendo il riferimento in site.js.

Il sito puo' essere caricato anche su un altro hosting statico. Vanno trasferiti
insieme HTML e cartella assets, mantenendo i percorsi. README, docs, templates
e tools servono alla manutenzione e non sono necessari ai visitatori.

### Prima di mettere online

Rileggi la biografia e i titoli: sono proposte editoriali basate sulla chat,
non testi che hai gia' approvato parola per parola. Controlla i contatti.
Quando aggiorni le immagini, usa soltanto export web con tag incorporato,
aggiornando le dimensioni nelle schede. Non caricare i master e non aggiungere
link a una versione pulita. Anche le miniature devono derivare dal file firmato.
Controlla immagini, menu, tasti e link da un telefono reale dopo il caricamento.

## 11. Dati, privacy e fotografie

Il caricamento font esterno e' il CSS di Inter e i relativi font dal dominio
dell'autore, `rsms.me`. Puoi disattivarlo
rimuovendo la riga `@import` in `assets/css/fonts.css`: restano i fallback di
sistema. I font non sono inclusi nello ZIP.

La pagina Dischi puo' inoltre caricare i tre artwork esterni documentati.
Le richieste vanno ai rispettivi host di immagini; non sono file locali o contenuti
che il sito rende privati. Imposta `allowRemoteCovers:false` per usare solo file locali.
Le cover non sono dati bibliografici e non modificano il CSV.

Nessun analytics, pixel, embed social, cookie impostato dal codice o modulo
che raccoglie dati. Solo la preferenza della griglia puo' usare
sessionStorage locale; disabilitala con `gallery.rememberView = false`.
I link a Instagram sono collegamenti esterni, non contenuti incorporati.
Il servizio font, l'hosting e le destinazioni esterne hanno comportamenti propri: questa nota
non e' una valutazione legale del sito o un'esenzione da obblighi informativi.

Non viene bloccato il tasto destro: non sarebbe una protezione delle fotografie.
Il watermark e' incorporato nei JPG, non aggiunto dal browser. Per Noale
questa consegna include una firma temporanea realizzata su copie separate. I file
pubblicati sono accessibili e scaricabili: il tag non e' un controllo d'accesso.
Questo vale per qualunque hosting pubblico, non solo GitHub Pages. I master
restano fuori dal progetto. Non e' stato aggiunto un finto blocco anti-download.

## 12. Verifiche e manutenzione

`VERIFICHE.txt` descrive i test effettuati e i limiti dell'ambiente di prova.
`tools/check.js` verifica catalogo, file, ID, riferimenti e coppie; non misura
la nitidezza e non certifica i dati EXIF inseriti a mano.
`node tools/test.js` controlla il raggruppamento 2/3, ordine e completezza
delle sequenze e la navigazione essenziale. `node tools/records-test.js` verifica
il parser CSV e le regole dei dischi. Non richiedono pacchetti npm.
Il piano illustrato `docs/PLAN-PHOTOS.jpg` contiene le 46 foto attualmente pubblicate di questa
consegna; `docs/PLAN-NOALE.jpg` isola le 9 nuove. Le tavole sono fotografie
dello stato attuale, non si aggiornano con la build. L'indice testuale
`docs/PHOTO-INDEX.txt`, invece, si aggiorna a ogni build.

Documentazione tecnica consultata per pubblicazione e dialog:
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog

Le istruzioni di hosting possono cambiare: in caso di interfacce diverse,
fa riferimento alla documentazione ufficiale del servizio scelto.


## 13. Font e marchio

Il CSS della demo e della v1 usava **Georgia** per i titoli, con le parti in
corsivo nello stile italic. La scritta sans `pigeon` usava lo stack
Helvetica Neue / Helvetica / Arial. Il carattere realmente visualizzato
poteva quindi cambiare in base ai font presenti sul dispositivo.

Nella v2.1 (stesse famiglie della v1.3 e v2.0):

- Titoli: **Georgia Regular**; parti in evidenza: **Georgia Italic**.
- Suffisso `.jfif`: **Georgia Italic**, con variabile separata `--brand-serif`.
- `pigeon`, navigazione e testi: **Inter**, gratuito e open source con licenza
  SIL OFL 1.1, caricato dal foglio ufficiale dell'autore quando c'e' rete.
- Icona `p.`: lo stesso SVG della v1, con `p` in Georgia Bold e punto blu.

Georgia viene richiesto al sistema, non scaricato dal sito. Non e' un font
open source e non viene ridistribuito. Dove manca, il browser usa i fallback.
Lo ZIP non contiene font. Font stack, pesi, limiti e riferimenti ufficiali
sono documentati in `docs/FONT-E-LOGO.txt`.

Il logo e' disponibile in `assets/brand/pigeon-mark.svg` e nella variante
trasparente. Sono immagini vettoriali, non font. La piccola `p` nello SVG resta
un elemento di testo modificabile: l'aspetto dipende dalla presenza di Georgia
anche nel programma in cui lo apri. `assets/favicon.svg` e' il file usato dal
sito; cambiando quello, cambiano favicon e icona in alto a sinistra.

## 14. Passaggio al sito integrato v2.1

Usa la cartella nuova dopo aver conservato una copia separata della precedente.
Se avevi gia' inserito tue foto, riporta consapevolmente i dati e i file firmati:
non sovrascrivere `photos.js` e `albums.js` alla cieca.

Se invece sovrascrivi una vecchia cartella, elimina il precedente
`fotografie.html` e l'inutilizzata `assets/photos/profile/`. Il comando build
rimuove `fotografie.html` quando e' registrato fra i vecchi HTML generati;
non cancella mai fotografie personali automaticamente.

Il menu ora e': logo `p.` per la Home, `Raccolte`, `Dischi`, `Chi sono`.
Non contiene piu' il nome come secondo tasto Home, ne' Instagram.
Il nome in apertura della Home e il marchio nel viewer restano invariati.
Instagram rimane nel footer e nella sezione Contatti del Chi sono.
`home.showCollectionsLink = false` nasconde il richiamo finale alle raccolte.
Non cambia il collegamento Raccolte nella navigazione.
`home.showRecordsLink = false` fa lo stesso per il piccolo collegamento ai dischi.


## 15. Le modifiche rapide

**Nome in Home**: `assets/css/theme.css`.

```css
--home-mark-size: clamp(44px, 6.2vw, 92px);
--brand-tracking: .045em;
```

Il primo valore controlla la dimensione desktop del nome; sotto 780 px c'e'
un adattamento compatto nella sezione HOME di `style.css`. Il secondo e' la
spaziatura POSITIVA di `.jfif`, in Home e nel viewer. Le legature
sono disattivate solo sul suffisso. Il testo resta `pigeon.jfif`, senza spazi
fittizi che altererebbero il nome quando copiato.

**Biografia in Home**: `site.home.greeting` + `greetingAccent`, `intro` e `paragraphs`.
**Setup fotografico**: `site.photoGear`, usato sia in Home sia in Chi sono.
**Setup audio**: `site.audioGear`, usato sia in Home sia in Chi sono.
**Testi sopra i due setup in Home**: `photoSystemLabel/photoSystemNote` e
`audioSystemLabel/audioSystemNote`.
**Testi dei due settori in Chi sono**: campi `photo*` e `audio*` dentro `site.about`.
**Ordine/copertine delle raccolte**: `albums.js`, `coverId` e ordine dell'array.
**Noale**: `docs/NOALE.txt` spiega codici, firma provvisoria e sostituzione.

La **Sequenza** usa righe dinamiche a pari altezza: due fotografie con rapporti
diversi vengono scalate mantenendo le proporzioni, quindi nessuna viene tagliata.
Le panoramiche circa 21:9 occupano una riga intera e vengono agganciate al confine
di coppia piu' vicino, evitando foto normali spaiate nel mezzo; se il totale e'
dispari, l'unica spaiata resta in fondo. Il viewer conserva sempre l'immagine completa.
La **Griglia** usa cornici 3:2 uniformi e invisibili (stesso colore dello sfondo):
le fotografie vengono centrate senza crop, cosi' le didascalie iniziano tutte alla
stessa quota. Chi sono resta informativo e divide fotografia e audio in due settori
distinti. La nota sulle copie web delle fotografie vive invece in Raccolte, accanto
all'archivio fotografico. Il catalogo dei dischi resta in `dischi.html`.


## 16. Come funzionano le righe degli album

**Vista Sequenza** (predefinita): sopra 700 px le righe vengono costruite dal
rapporto d'aspetto delle fotografie. Nelle coppie, la larghezza di ogni elemento e'
proporzionale al suo aspect ratio: una 4:3, una 3:2 e una 16:9 non vengono mai
croppate e, quando sono affiancate, arrivano alla stessa altezza. Una panoramica con
rapporto circa 21:9 (`width / height >= 2.05`) occupa da sola tutta la riga, ma non
spezza piu' ingenuamente la sequenza: viene spostata al confine di coppia piu' vicino.
Le normali vengono quindi impacchettate a due e, se sono dispari, l'unica spaiata
rimane sempre l'ultima riga.

Fino a 700 px la Sequenza passa a una fotografia per riga. Il pulsante **Griglia**
mantiene tre colonne su desktop e due su tablet/telefono; ogni tile contiene una
cornice 3:2 identica, dello stesso colore della pagina, e usa `object-fit: contain`: la
cornice allinea didascalie e categorie ma visivamente scompare nello sfondo.

Accanto a Sequenza / Griglia c'e' il controllo **Per categoria / Casuale**.
Per categoria raggruppa i soggetti usando l'ordine della prima categoria incontrata
in `album.photoIds`, mantenendo l'ordine curatoriale dentro ciascun gruppo. Il layout
puo' pero' chiudere una coppia attraverso un cambio categoria: l'ordine resta
raggruppato, ma non si crea una riga vuota o singola solo per segnare lo stacco.
Casuale rimescola le fotografie attualmente disponibili a ogni click; filtri e ricerca
continuano a valere.

La copertina di una raccolta resta indipendente dall'ordine della galleria e si sceglie
con `coverId` in `assets/data/albums.js`. Jesolo usa `JES-009`, **La curva**, che e'
la fotografia numero 36 nella sequenza curatoriale attuale.

**Dove si modifica:** `P.galleryRows`, `P.orderPhotos` e `P.galleryHTML` in
`assets/js/pages.js` contengono le regole; `style.css`, sezione `SEQUENZA / v1.5`,
gestisce pari altezza, panoramiche e cornici della Griglia. Nel normale uso basta
cambiare l'ordine degli ID in `assets/data/albums.js`.

Il vecchio campo `photo.layout` non serve piu' ed e' stato tolto dalle schede
e dal modello FOTO. Un eventuale campo residuo in una tua scheda importata
viene ignorato: non e' necessario modificarlo per far funzionare il sito.
`variant: "wide"`, invece, **va conservato**: identifica il taglio ampio nei
confronti e non ha nulla a che vedere con la larghezza nella galleria.


## 17. Ritocchi v2.1: i tre controlli principali

```js
// assets/data/records-config.js
featuredCount: 3,         // tre slot visibili, solo album con cover
featuredIntervalMs: 2000, // un nuovo ingresso ogni 2 secondi
featuredTransitionMs: 680,// durata dello scorrimento/sfumatura
featuredCooldown: 10,     // minimo 10 nuove estrazioni prima del ritorno
pageSize: 20,             // valore iniziale
pageSizes: [20, 40, 'all'], // scelte nel catalogo
artistAnimationMs: 260,   // apertura/chiusura; Riduci movimento la disabilita
```

L'ordine dentro un artista non dipende dall'ordine selezionato per la vista album.
Una nuova cover valida entra automaticamente nel pool del carosello: non esiste
`featuredIds`, non devi aggiornare una seconda lista.
Per aumentare le copertine basta aggiungere il file e il relativo abbinamento.
La pagina fotografica e le venti fotografie non sono state modificate.


## Photo Safari Conegliano

La raccolta `conegliano-photo-safari` usa 7 copie WebP ottimizzate, con full fino a 2400 px e thumb fino a 960 px. I file sorgente ricevuti non mostrano una firma incorporata; il catalogo li marca con `webSignature: "none"`.


### Cache degli asset del catalogo
Il build aggiunge un token di versione agli asset CSS/JS della pagina Dischi. Questo evita che una pubblicazione nuova usi script di una versione precedente rimasti nella cache del browser.
