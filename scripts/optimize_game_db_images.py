from __future__ import annotations

import json
import shutil
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data" / "game-db"
IMAGE_DIR = ROOT / "assets" / "game-db" / "images"
THUMB_DIR = ROOT / "assets" / "game-db" / "thumbs"
MAX_SIZE = (160, 160)


def thumb_path(icon: str) -> tuple[Path, str]:
    rel = icon.replace("\\", "/").split("assets/game-db/images/", 1)[-1]
    source_rel = Path(rel)
    target = THUMB_DIR / source_rel.with_suffix(".webp")
    public_path = "assets/game-db/thumbs/" + str(source_rel.with_suffix(".webp")).replace("\\", "/")
    return target, public_path


def convert_image(source: Path, target: Path) -> None:
    if target.exists() and target.stat().st_size > 0:
        return
    target.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as image:
        try:
            image.seek(0)
        except EOFError:
            pass
        frame = image.convert("RGBA")
        frame.thumbnail(MAX_SIZE, Image.Resampling.LANCZOS)
        frame.save(target, "WEBP", quality=82, method=6)


def optimize_collection(path: Path) -> tuple[int, int]:
    data = json.loads(path.read_text(encoding="utf-8"))
    converted = 0
    missing = 0

    for item in data.get("items", []):
        icon = item.get("icon", "")
        if not icon:
            continue
        source = ROOT / icon
        target, public_path = thumb_path(icon)
        if source.exists():
            convert_image(source, target)
            item["icon"] = public_path
            converted += 1
        else:
            missing += 1

    path.write_text(json.dumps(data, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    return converted, missing


def main() -> int:
    THUMB_DIR.mkdir(parents=True, exist_ok=True)
    totals = []
    for name in ["weapons.json", "armors.json", "items.json", "mobs.json"]:
        path = DATA_DIR / name
        converted, missing = optimize_collection(path)
        totals.append((name, converted, missing))
        print(f"{name}: optimized {converted}, missing {missing}")

    if IMAGE_DIR.exists():
        shutil.rmtree(IMAGE_DIR)
        print(f"removed original image directory: {IMAGE_DIR}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
