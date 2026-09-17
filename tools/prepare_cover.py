#!/usr/bin/env python3
"""Prepara una COPERTINA locale per Plastic Pizzas (strumento opzionale).

Non identifica album o edizioni e non modifica il CSV o il file di partenza.
Richiede Pillow. Produce WebP full + miniatura, aggiorna i pacchetti ZIP e stampa una scheda JSON da copiare.
Uso: python tools/prepare_cover.py /percorso/cover.jpg --id VIN-0434 \
       --artist "Artista" --title "Titolo" --match copy
Le foto della propria copia devono arrivare gia' firmate, se lo si desidera.
Questo script non aggiunge o rimuove watermark.
"""
from __future__ import annotations
import argparse
import json
import re
from pathlib import Path

FULL_EDGE = 1200
THUMB_EDGE = 320
FULL_QUALITY = 84
THUMB_QUALITY = 82


def prepare(source: Path, root: Path, code: str, artist: str, title: str,
            match: str = "album", source_url: str = "", force: bool = False) -> dict:
    from PIL import Image, ImageOps, ImageCms
    if not re.fullmatch(r"[A-Za-z0-9_-]+", code):
        raise ValueError("ID non valido. Usa lettere, numeri, trattini o underscore.")
    filename = f"{code}.webp"
    targets = [root / "assets/covers/staging/full" / filename,
               root / "assets/covers/staging/thumbs" / filename]
    from cover_packs import entry_exists
    already_packed = entry_exists(root, "full", filename) or entry_exists(root, "thumbs", filename)
    if (already_packed or any(target.exists() for target in targets)) and not force:
        raise FileExistsError("Cover gia' presente nei pacchetti o nello staging. Usa --force solo per sostituirla intenzionalmente.")
    if source.resolve() in [target.resolve() for target in targets]:
        raise ValueError("La sorgente deve essere diversa dalla destinazione.")
    with Image.open(source) as raw:
        image = ImageOps.exif_transpose(raw)
        profile = image.info.get("icc_profile")
        if profile:
            import io
            try:
                image = ImageCms.profileToProfile(image, ImageCms.ImageCmsProfile(io.BytesIO(profile)),
                                                   ImageCms.createProfile("sRGB"), outputMode="RGB")
            except Exception as exc:
                raise ValueError("Profilo ICC non convertibile: esporta in sRGB dal tuo editor.") from exc
        else:
            image = image.convert("RGB")
        for target, edge, quality in [(targets[0], FULL_EDGE, FULL_QUALITY),
                                      (targets[1], THUMB_EDGE, THUMB_QUALITY)]:
            resized = image.copy()
            # Mantiene proporzioni; mai upscale o crop quadrato imposto.
            resized.thumbnail((edge, edge), Image.Resampling.LANCZOS)
            target.parent.mkdir(parents=True, exist_ok=True)
            temp = target.with_name(target.stem + '.tmp.webp')
            resized.save(temp, "WEBP", quality=quality, method=6, exif=b"")
            temp.replace(target)
    from cover_packs import build_packs
    build_packs(root, clear_staging=True)
    return {code:{"artist":artist,"title":title,"local":f"assets/covers/full/{filename}",
                  "thumb":f"assets/covers/thumbs/{filename}","remote":"",
                  "source":source_url,"match":match}}


def main() -> None:
    parser=argparse.ArgumentParser(description=__doc__,formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("source",type=Path)
    parser.add_argument("--id",required=True)
    parser.add_argument("--artist",required=True)
    parser.add_argument("--title",required=True)
    parser.add_argument("--match",choices=["album","copy"],default="album")
    parser.add_argument("--source-url",default="")
    parser.add_argument("--force",action="store_true")
    args=parser.parse_args()
    try:
        result=prepare(args.source,Path(__file__).resolve().parents[1],args.id,args.artist,args.title,args.match,args.source_url,args.force)
    except (OSError,ValueError,ImportError) as exc:
        parser.exit(1,"Errore: "+str(exc)+"\n")
    print("Copertine create e pacchetti ZIP aggiornati. Copia questa voce in assets/data/record-covers.js:")
    print(json.dumps(result,ensure_ascii=False,indent=2))
    print("La sorgente e il CSV non sono stati modificati. Nessun metadato e' stato dedotto.")

if __name__ == "__main__":
    main()
