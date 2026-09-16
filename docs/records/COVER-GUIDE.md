# Copertine / file, fonti e abbinamenti

## Cosa c'e' davvero nella consegna

**228 WebP full locali, con 228 miniature WebP**, associati a **235 voci** del catalogo. I file full derivano dai JPG forniti dall'utente mantenendo la risoluzione nativa (circa 600 px per questi allegati); le miniature sono ridotte entro 320 x 320 pixel senza taglio o ingrandimento. I JPG sorgente restano fuori dal payload pubblicato. Quando esistono piu' copie con lo stesso artista e titolo, condividono lo stesso artwork ma mantengono ID e dati separati.

`COVERS-IMPORT.json` registra nomi degli allegati, dimensioni, SHA-256 e tutti gli ID collegati; `COVER-INDEX.txt` e' l'indice leggibile aggiornato da build. Nessun titolo, artista o dato della copia viene corretto in base all'immagine. Gli abbinamenti che richiedevano normalizzazioni del nome file sono registrati nel report di importazione.

**Due casi storici restano da leggere come nel catalogo, non come correzioni:**
- `VIN-0158`: file `gazebo_gazebo.jpg`; l'immagine reca I Like Chopin, mentre il titolo nel CSV rimane Gazebo.
- `VIN-0386`: artista The Belle / titolo Stars, mantenuti come nel CSV anche se la grafica reca The Belle Stars.

Degli artwork remoti gia' documentati resta attivo soltanto **Trench**. Dookie e The Dark Side Of The Moon ora usano le immagini locali fornite dall'utente. `COVER-SOURCES.json` resta come documentazione storica delle fonti remote precedenti; una fonte non equivale a un'autorizzazione universale al riuso.

## Struttura

```text
assets/covers/
  full/VIN-0001.webp        versione web principale, non un master
  thumbs/VIN-0001.webp      miniatura opzionale
assets/data/record-covers.js  associazione codice -> file/URL
```

La cartella puo' restare incompleta: il sito e' progettato anche per quella
situazione. Nessun obbligo di completare centinaia di immagini per pubblicarlo.
Il codice della copia identifica la cover in modo stabile, anche dopo un riordino.
Per due copie puoi usare lo stesso file generico, ma i record restano distinti.

## Inserimento manuale (via piu' semplice)

1. Parti dalla tua immagine sorgente. Per le tue fotografie usa export gia' firmati.
2. Crea una WebP principale in `full` (fino a 1200 px, senza upscale) e facoltativamente una miniatura in `thumbs`.
3. In `record-covers.js` copia `templates/COPERTINA.txt` e compila ID, artista,
   titolo, local, thumb, source, match. Usa i nomi del TUO CSV per il controllo.
4. Esegui build e check. Non si modifica il CSV per aggiungere una cover.

`local` ha precedenza su `remote`. Se il file locale e' configurato ma assente,
il segnaposto resta e check segnala il percorso: niente correzioni silenziose.
Con `thumb:""` il sito usa la versione principale anche nelle card piccole.
Con `allowRemoteCovers:false` in records-config.js il sito non carica alcuna
copertina da host esterni. Inter e' un'impostazione separata in fonts.css.

## Preparazione opzionale da file locale

```sh
python -m pip install Pillow
python tools/prepare_cover.py "/percorso/cover.jpg" --id VIN-0434 --artist "Artista" --title "Titolo" --match copy
```

Lo strumento conserva le proporzioni, non fa upscale, converte un profilo ICC
quando presente, elimina gli EXIF nelle copie generate e crea WebP full + thumb senza modificare la sorgente.
Non toglie o aggiunge watermark. Rifiuta sovrascritture, salvo `--force`.
Stampa la voce pronta da copiare in record-covers.js. Non la inserisce di nascosto.

## Rendere locali i tre artwork documentati (opzionale)

Dopo aver valutato le fonti e le relative condizioni, puoi eseguire sul tuo computer:

```sh
python tools/download_covers.py --confirm-rights
```

Scarica soltanto i tre URL di COVER-SOURCES.json, con limite di 10 MB e timeout.
Non cerca altri album, non usa token e non riempie schede con metadati esterni.
Prepara i file nelle cartelle e produce `COVERS-LOCAL-READY.json`: copia le voci
in record-covers.js per attivarle, quindi rigenera il sito. Non sovrascrive la
configurazione manuale. L'opzione di conferma NON concede una licenza.

Il download remoto era rimasto incompleto nella v2.0 e non e' stato ripetuto nella v2.1;
la gestione errori lascia funzionanti il sito e i segnaposto.

## Convalida, non identificazione della stampa

Ogni voce cover puo' dichiarare `artist` e `title`: se importi un CSV che riusa
lo stesso ID per un altro album, quella cover non viene abbinata automaticamente.
Questa e' una protezione contro errori di mappa, non una verifica discografica.
Per una specifica edizione servono dati/foto della tua copia, non il solo titolo.
