# Plastic Pizzas: tre copertine continue e due pagine

## Pagine

`dischi.html` e' la landing: titolo, intro, presentazione e quattro metriche.
`collezione.html` contiene il catalogo. Titolo e Cosa ascolto? sono a sinistra;
la nota I dischi si ascoltano. e' affiancata a destra. Su mobile si impilano.
Dopo il catalogo e gli strumenti CSV, Qualche numero chiude il contenuto.

Il menu pubblico e tutti i rimandi generali puntano alla landing. Le schede e
la singola parola collezione puntano alla nuova pagina del catalogo.
`records-landing.js` conserva i vecchi URL con filtri, #disco, #catalogo e #numeri.
Nessuna scheda viene caricata nella landing. Il CSV resta unico.

## Movimento

`records-motion.js` usa quattro animazioni native Web Animations API,
sincronizzate sulla stessa timeline. Uno spazio richiede 4500 ms; ogni nodo
compie un anello di quattro spazi. Il ritorno avviene interamente fuori campo,
senza riavviare le altre animazioni. Non ci sono scritture JS dei transform a
ogni frame, soste o easing ai cambi.

Le quattro ancore rimangono nel DOM. Cambiano solo i loro figli gia'
decodificati, quando la cover e' completamente oltre un bordo. Se la prossima
immagine non e' pronta, quella precedente continua il giro: nessuna attesa.
Un timer ritardato non sostituisce mai un'immagine gia' rientrata in vista.
Le coordinate conservano i subpixel; il resize aggiorna la geometria senza
azzerare la fase. Due gradienti statici sopra le cover sostituiscono la maschera.

La landing usa uno spazio flessibile fra header e footer, senza il vecchio
margine di 105 pixel. Sulle altezze da portatile compatta i margini; su telefoni
e zoom elevato conserva lo scorrimento naturale. Nessun contenuto e' nascosto.
La parola collezione e' colorata e cliccabile ma senza sottolinea o effetto
hover. Resta un indicatore di focus per la tastiera. Il copyright e' testo.

Autoplay attivo, anche con prefers-reduced-motion, secondo la richiesta.
La scelta e' esplicita in featuredRespectReducedMotion:false; impostandola a
true si puo' ripristinare il comportamento OS. Il pulsante Pausa resta visibile.
La pausa manuale e il focus da tastiera conservano esattamente la posizione.
La sola presenza del mouse non ferma il movimento. Pagina nascosta o fuori
schermo sospendono il ciclo per non consumare frame inutili.

## Caricamento

Le tre prime miniature sono gia' nell'HTML. Si valida la quarta fuori campo;
poi si prepara una sola candidata aggiuntiva mentre il carosello si muove.
All'avvio normale sono cinque miniature in totale, non l'intero catalogo.
I metadati sono letti in memoria: scorrerli non scarica le relative immagini.

Artista e titolo identificano l'album per evitare ripetizioni dovute a copie
duplicate. A giro concluso si ricomincia, evitando gli elementi in campo quando
esistono alternative. Con pochissime cover sono possibili ripetizioni, ma non
spazi vuoti. Se il caricamento successivo ritarda, una cover gia' decodificata
viene riciclata fuori campo: l'animazione non attende la rete.

## Test

`tools/records-test.js`: 15 gruppi sul catalogo.
`tools/records-navigation-test.js`: 10 gruppi su navigazione e viste.
`tools/records-routes-test.js`: 18 combinazioni di vecchi URL, locali e pubblici.
`tools/test.js`: geometria delle gallerie, menu e rimandi comuni.
`tools/tests/records-motion-browser-test.py`: verifiche in Chromium con immagini
locali fornite come Blob, eseguendo il CSS e il JavaScript di produzione.

Il test browser non naviga realmente via file:// o HTTP: l'ambiente di verifica
blocca la navigazione diretta. Il piccolo harness fornisce gli asset e il CSV in
memoria. Verifica invece il motore, il DOM, i controlli, i layout responsive,
il catalogo, il riciclo e gli errori di immagine.
La suite dedicata `records-smooth-browser-test.py` verifica le animazioni
native e l'impaginazione compatta; i gruppi legacy possono essere eseguiti
separatamente con motion, preferences, small, network e catalog. La compatibilita' dei percorsi
viene controllata anche separatamente con i test URL e sugli HTML generati.
Il report effettivo, con l'esito di ogni controllo, e' PRESENTATION-TESTS.json.

## Media e pacchetto

La pulizia e' gia' applicata. Non serve Node per eseguirla sulla consegna.
239 varianti rimosse; 20.402.097 byte in meno rispetto allo ZIP originale.
534 asset identici byte per byte. Tre vecchi JPG Jesolo conservati in full.
Nessun file ancora usato e' stato ricompresso. Nessuno scatto e' stato rimosso
dai dati o dalle raccolte.

Nell'input mancano 18 file Noale e 14 file Conegliano (full piu' miniature).
Questa mancanza e' precedente alla pulizia. La consegna conserva i riferimenti;
per completare quelle due raccolte occorre ricopiare le due cartelle dalla copia
dell'utente, come spiegato in LEGGIMI-PRIMA.txt. Non sono state scaricate o
sostituite fotografie con immagini diverse.

Il check completo segnala ancora quei 32 file assenti. La rigenerazione HTML e'
stata fatta con l'opzione esplicita --allow-missing-photos, che ammette soltanto
queste mancanze e non silenzia altri errori. Senza questa opzione, build resta
rigorosamente bloccato finche' le fotografie non vengono aggiunte.
