pigeon.jfif / R15 - Plastic Pizzas nascosta
=============================================

Patch incrementale sullo stato R14.
Sovrascrivi i file mantenendo la struttura delle cartelle.
Non c'e' nulla da eliminare.

Modifiche:
- "Dischi" rimosso dalla navigazione principale.
- rimosso il link "Esplora i dischi" dalla Home.
- rimosso il link visibile "Plastic Pizzas" dai footer interni.
- il simbolo © in "© 2026 pigeon.jfif" apre dischi.html.
- il link segreto non cambia aspetto e usa il cursore normale; da tastiera mantiene un focus visibile.

Nota:
- dischi.html resta raggiungibile direttamente conoscendone l'URL; la modifica nasconde l'accesso nella navigazione del sito, non protegge la pagina con autenticazione.

Verifiche:
- 53 foto / 3 raccolte / 433 dischi
- node tools/check.js: 0 errori
- test galleria/topnav: OK
- test navigazione catalogo: 12/12 gruppi OK
