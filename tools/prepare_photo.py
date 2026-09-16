#!/usr/bin/env python3
"""Prepara una foto per il portfolio, senza cambiare l'originale.

OPZIONALE: richiede Pillow, non usato dal sito.
  python -m pip install Pillow
  python tools/prepare_photo.py /percorso/foto_wm.jpg --watermarked --album jesolo-2026 --id JES-012 --filter efa

Usa SOLO export web gia' firmati; non aggiunge e non verifica il tag.
Il flag --watermarked e' una conferma manuale, non un controllo automatico.
Non dare in ingresso RAW, TIFF o master senza firma.
Crea full/JES-012.webp e thumbs/JES-012.webp. Non ingrandisce immagini piccole.
Stampa una scheda da completare e copiare in assets/data/photos.js.
I parametri EXIF vengono proposti SOLO se presenti nel file d'ingresso.
Il file web non conserva EXIF/GPS. Un eventuale profilo ICC viene convertito in sRGB.
"""
from __future__ import annotations
import argparse
import io
import json
import re
import sys
from pathlib import Path
from fractions import Fraction


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('source', type=Path)
    parser.add_argument('--album', required=True, help='Slug della raccolta, es. jesolo-2026')
    parser.add_argument('--id', required=True, help='Codice stabile, es. JES-012')
    parser.add_argument('--filter', required=True, help='ID di un filtro presente in albums.js, es. efa')
    parser.add_argument('--width', type=int, default=2400, help='Lato lungo massimo del WebP full, default 2400')
    parser.add_argument('--output', type=Path, default=Path(__file__).resolve().parents[1] / 'assets/photos')
    parser.add_argument('--watermarked', action='store_true', help='Conferma che la sorgente e gia una copia web con tag incorporato')
    parser.add_argument('--force', action='store_true', help='Permetti la sostituzione dei due file esistenti')
    args = parser.parse_args()
    if not args.watermarked:
        parser.error('Usa un export gia firmato e confermalo con --watermarked. Lo script non aggiunge il tag.')
    if args.source.suffix.lower() not in ('.jpg', '.jpeg', '.png', '.webp'):
        parser.error('Sono ammessi solo export web JPG, PNG o WebP gia firmati, non RAW/TIFF/master.')
    if not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', args.album):
        parser.error('--album deve contenere solo lettere minuscole, numeri e trattini.')
    if not re.fullmatch(r'[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*', args.id):
        parser.error('--id deve contenere solo lettere, numeri e trattini.')
    if not 100 <= args.width <= 10000:
        parser.error('--width deve essere compreso tra 100 e 10000.')
    try:
        from PIL import Image, ImageOps, ImageCms
    except ImportError:
        print('Manca Pillow. Installa con: python -m pip install Pillow', file=sys.stderr)
        return 1
    full = args.output / args.album / 'full' / (args.id + '.webp')
    thumb = args.output / args.album / 'thumbs' / (args.id + '.webp')
    if not args.force and (full.exists() or thumb.exists()):
        print('File gia esistente. Scegli un altro codice o usa --force consapevolmente.', file=sys.stderr)
        return 1
    try:
        with Image.open(args.source) as original:
            tags = dict(original.getexif())
            try:
                tags.update(original.getexif().get_ifd(34665))
            except (KeyError, ValueError, TypeError):
                pass
            icc = original.info.get('icc_profile')
            image = ImageOps.exif_transpose(original).copy()
        original_size = image.size
        if image.mode in ('RGBA', 'LA') or (image.mode == 'P' and 'transparency' in image.info):
            rgba = image.convert('RGBA')
            matte = Image.new('RGBA', image.size, (244, 242, 237, 255))
            image = Image.alpha_composite(matte, rgba).convert('RGB')
        srgb = ImageCms.createProfile('sRGB')
        if icc:
            image = ImageCms.profileToProfile(image, ImageCms.ImageCmsProfile(io.BytesIO(icc)), srgb, outputMode='RGB')
        else:
            image = image.convert('RGB')
            print('Profilo ICC assente: input trattato come sRGB. Verifica in fase di export.', file=sys.stderr)
        profile = ImageCms.ImageCmsProfile(srgb).tobytes()
        # Nuova immagine: rimuove EXIF e metadati provenienti dalla sorgente.
        clean = Image.new('RGB', image.size)
        clean.paste(image)
        clean.thumbnail((args.width, args.width), Image.Resampling.LANCZOS)
        full.parent.mkdir(parents=True, exist_ok=True)
        thumb.parent.mkdir(parents=True, exist_ok=True)
        clean.save(full, 'WEBP', quality=90, method=6, icc_profile=profile)
        small = clean.copy()
        small.thumbnail((960, 960), Image.Resampling.LANCZOS)
        small.save(thumb, 'WEBP', quality=86, method=6, icc_profile=profile)
    except (OSError, ValueError, TypeError) as exc:
        print('Preparazione non riuscita: ' + str(exc), file=sys.stderr)
        return 1

    def value(tag: int) -> str:
        raw = tags.get(tag, '')
        return raw.decode(errors='replace').strip('\x00 ') if isinstance(raw, bytes) else str(raw).strip()

    def number(tag: int, prefix: str = '', suffix: str = '') -> str:
        try:
            return prefix + f'{float(tags[tag]):g}' + suffix if tag in tags else ''
        except (TypeError, ValueError, ZeroDivisionError):
            return ''

    shutter = ''
    if 33434 in tags:
        try:
            exposure = Fraction(float(tags[33434])).limit_denominator(100000)
            shutter = str(exposure) + ' s'
        except (TypeError, ValueError, ZeroDivisionError):
            pass
    record = dict(
        id=args.id, albumId=args.album, sourceFile=args.source.name,
        title='DA COMPILARE', subject='DA COMPILARE', filter=args.filter,
        alt='Descrivi quello che si vede nella fotografia.', note='',
        variant='wide', pairId='',
        file=f'assets/photos/{args.album}/full/{args.id}.webp',
        thumb=f'assets/photos/{args.album}/thumbs/{args.id}.webp',
        width=clean.width, height=clean.height, thumbWidth=small.width,
        capture=dict(camera=value(272), lens=value(42036), focalLength=number(37386, suffix=' mm'),
                     aperture=number(33437, prefix='f/'), shutter=shutter,
                     iso=value(34855), capturedAt=value(36867)),
        referenceExport=dict(width=original_size[0], height=original_size[1])
    )
    print(json.dumps(record, ensure_ascii=False, indent=2))
    print('\nFile creati. Completa titolo/alt/dati e aggiungi il codice in album.photoIds.', file=sys.stderr)
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
