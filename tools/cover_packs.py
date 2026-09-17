#!/usr/bin/env python3
"""Crea/aggiorna i pacchetti ZIP delle cover di Plastic Pizzas.

Gli ZIP usano ZIP_STORED: WebP e' gia' compresso e il runtime del sito puo'
estrarre una singola immagine senza una libreria di decompressione.

Uso normale:
  python tools/cover_packs.py

Per aggiungere o sostituire cover, metti i WebP in:
  assets/covers/staging/full/VIN-0434.webp
  assets/covers/staging/thumbs/VIN-0434.webp
poi esegui questo script. I file di staging hanno priorita' sugli archivi esistenti.
Con --clear-staging vengono rimossi dopo una scrittura riuscita.

Durante la migrazione sono accettate anche le vecchie cartelle assets/covers/full
e assets/covers/thumbs; --clean-legacy le elimina dopo aver creato gli ZIP.
"""
from __future__ import annotations
import argparse
import re
import shutil
import tempfile
import zipfile
from collections import defaultdict
from pathlib import Path

PACK_SIZE = 50
PREFIX = "covers-"
KINDS = ("full", "thumbs")
NAME_RE = re.compile(r"VIN-(\d{4})\.webp$")


def number_of(name: str) -> int:
    match = NAME_RE.fullmatch(name)
    if not match:
        raise ValueError(f"Nome cover non valido: {name}")
    value = int(match.group(1))
    if value < 1:
        raise ValueError(f"ID cover non valido: {name}")
    return value


def pack_name(number: int) -> str:
    start = ((number - 1) // PACK_SIZE) * PACK_SIZE + 1
    end = start + PACK_SIZE - 1
    return f"{PREFIX}{start:04d}-{end:04d}.zip"



def entry_exists(root: Path, kind: str, name: str) -> bool:
    number = number_of(name)
    archive_path = root / "assets/covers/packs" / kind / pack_name(number)
    if not archive_path.exists():
        return False
    with zipfile.ZipFile(archive_path, "r") as archive:
        try:
            info = archive.getinfo(name)
        except KeyError:
            return False
        if info.compress_type != zipfile.ZIP_STORED:
            raise ValueError(f"{archive_path}: {name} non usa ZIP_STORED")
        return True

def read_existing(pack_dir: Path) -> dict[str, bytes]:
    files: dict[str, bytes] = {}
    if not pack_dir.exists():
        return files
    for archive_path in sorted(pack_dir.glob(f"{PREFIX}*.zip")):
        with zipfile.ZipFile(archive_path, "r") as archive:
            for info in archive.infolist():
                if info.is_dir():
                    continue
                number_of(info.filename)
                if info.compress_type != zipfile.ZIP_STORED:
                    raise ValueError(f"{archive_path}: {info.filename} non usa ZIP_STORED")
                files[info.filename] = archive.read(info)
    return files


def overlay_directory(files: dict[str, bytes], folder: Path) -> int:
    if not folder.exists():
        return 0
    count = 0
    for path in sorted(folder.glob("*.webp")):
        number_of(path.name)
        files[path.name] = path.read_bytes()
        count += 1
    return count


def write_kind(root: Path, kind: str) -> tuple[int, int]:
    pack_dir = root / "assets/covers/packs" / kind
    legacy_dir = root / "assets/covers" / kind
    staging_dir = root / "assets/covers/staging" / kind
    files = read_existing(pack_dir)
    overlay_directory(files, legacy_dir)
    overlay_directory(files, staging_dir)
    grouped: dict[str, dict[str, bytes]] = defaultdict(dict)
    for name, data in files.items():
        grouped[pack_name(number_of(name))][name] = data

    pack_dir.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="pigeon-cover-packs-") as temp_name:
        temp = Path(temp_name)
        for archive_name, entries in sorted(grouped.items()):
            target = temp / archive_name
            with zipfile.ZipFile(target, "w", compression=zipfile.ZIP_STORED, allowZip64=False) as archive:
                for name, data in sorted(entries.items()):
                    archive.writestr(name, data, compress_type=zipfile.ZIP_STORED)
        for old in pack_dir.glob(f"{PREFIX}*.zip"):
            old.unlink()
        for built in temp.glob("*.zip"):
            shutil.copy2(built, pack_dir / built.name)
    return len(files), len(grouped)


def build_packs(root: Path, clear_staging: bool = False, clean_legacy: bool = False) -> dict[str, tuple[int, int]]:
    summary = {kind: write_kind(root, kind) for kind in KINDS}
    if clear_staging:
        shutil.rmtree(root / "assets/covers/staging", ignore_errors=True)
    if clean_legacy:
        for kind in KINDS:
            shutil.rmtree(root / "assets/covers" / kind, ignore_errors=True)
    return summary


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--clear-staging", action="store_true", help="rimuove assets/covers/staging dopo il successo")
    parser.add_argument("--clean-legacy", action="store_true", help="rimuove le vecchie cartelle full/thumbs dopo il successo")
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    try:
        summary = build_packs(root, args.clear_staging, args.clean_legacy)
    except (OSError, ValueError, zipfile.BadZipFile) as exc:
        parser.exit(1, "Errore: " + str(exc) + "\n")
    for kind, (files, packs) in summary.items():
        print(f"{kind}: {files} WebP in {packs} pacchetti ZIP_STORED.")


if __name__ == "__main__":
    main()
