#!/usr/bin/env python3
"""Scarica SOLO le tre copertine gia' documentate; nessun abbinamento automatico.

Opzionale: python tools/download_covers.py --confirm-rights
Richiede Pillow e accesso a Internet sul TUO computer. Nessuna chiave API.
L'opzione e' una presa visione, non una licenza concessa da questo script.
Non eseguito con successo in questa consegna: rete del container non disponibile.
"""
from __future__ import annotations
import argparse
import json
import tempfile
import urllib.request
from pathlib import Path
from prepare_cover import prepare


def main() -> None:
    parser=argparse.ArgumentParser(description=__doc__,formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--confirm-rights",action="store_true",help="Ho valutato fonte e condizioni di riuso.")
    parser.add_argument("--force",action="store_true",help="Sostituisci copertine locali esistenti.")
    args=parser.parse_args()
    if not args.confirm_rights:
        parser.exit(2,"Leggi docs/records/COVER-GUIDE.md e le fonti, poi usa --confirm-rights.\n")
    root=Path(__file__).resolve().parents[1]
    manifest=json.loads((root/'docs/records/COVER-SOURCES.json').read_text(encoding='utf-8'))
    merged={};failures=[]
    for item in manifest['sources']:
        try:
            if not item['image'].startswith('https://'):
                raise ValueError('Solo URL HTTPS.')
            request=urllib.request.Request(item['image'],headers={'User-Agent':'PigeonPersonalArchive/2.0 (manual cover import)'})
            with urllib.request.urlopen(request,timeout=25) as response:
                if not response.geturl().startswith('https://'):
                    raise ValueError('Redirect non HTTPS rifiutato.')
                if not response.headers.get('Content-Type','').startswith('image/'):
                    raise ValueError('Il server non ha restituito una immagine.')
                data=response.read(10*1024*1024+1)
            if len(data)>10*1024*1024:
                raise ValueError('Immagine oltre 10 MB.')
            with tempfile.TemporaryDirectory() as tmp:
                source=Path(tmp)/'source-image';source.write_bytes(data)
                for code in item['ids']:
                    merged.update(prepare(source,root,code,item['artist'],item['title'],'album',item['source'],args.force))
            print('OK '+item['artist']+' / '+item['title'])
        except Exception as exc:
            failures.append(item['title']+': '+str(exc))
            print('NON SCARICATA '+failures[-1])
    # Scriviamo un esempio separato: mai sovrascrivere la configurazione manuale.
    if merged:
        output=root/'docs/records/COVERS-LOCAL-READY.json'
        output.write_text(json.dumps(merged,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
        print('Copia le voci di docs/records/COVERS-LOCAL-READY.json in record-covers.js.')
        print('Poi esegui node tools/build.js. Il catalogo CSV resta invariato.')
    if failures:
        parser.exit(1,'Alcune copertine non sono state scaricate. I segnaposto continuano a funzionare.\n')

if __name__=='__main__':
    main()
