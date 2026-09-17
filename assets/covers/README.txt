COPERTINE / archivio web locale a pacchetti ZIP

Sul sito pubblicato NON esistono piu' centinaia di WebP separati.
Le 228 cover full e le 228 miniature sono raccolte in pacchetti da 50 ID:

  packs/full/covers-0001-0050.zip
  packs/thumbs/covers-0001-0050.zip
  ... fino a covers-0401-0450.zip

Gli ZIP usano ZIP_STORED (nessuna ricompressione): WebP e' gia' compresso e il
browser puo' estrarre il singolo file richiesto con il loader locale del sito.
Miniature e full sono separate per evitare di scaricare immagini grandi nella griglia.

I percorsi in assets/data/record-covers.js restano LOGICI, per esempio:
  assets/covers/full/VIN-0001.webp
  assets/covers/thumbs/VIN-0001.webp
Il runtime li traduce automaticamente nel pacchetto corretto.

AGGIORNAMENTO
- via piu' semplice: tools/prepare_cover.py aggiorna direttamente i pacchetti;
- con WebP gia' pronti: mettili in assets/covers/staging/full e/o thumbs, poi:
    python tools/cover_packs.py --clear-staging

Le 228 immagini coprono 235 voci del catalogo: piu' copie dello stesso album
possono condividere lo stesso file, senza condividere i dati della copia.
I JPG originali restano sorgenti esterne al payload del sito.
