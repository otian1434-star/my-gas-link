from __future__ import annotations

import argparse
import concurrent.futures
import hashlib
import json
import re
import sys
import time
from dataclasses import dataclass
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from typing import Any
from urllib.parse import parse_qs, urljoin, urlparse

import requests


BASE_URL = "https://lineagereal.com/account/"
ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data" / "game-db"
IMAGE_DIR = ROOT / "assets" / "game-db" / "images"

USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36"
)

COLLECTIONS = {
    "weapons": {
        "label": "武器列表",
        "source": "weapons.php",
        "detail_id": "item_id",
        "page": "pages/weapons-overview.html",
        "summary_fields": ["傷害", "類別", "材質", "重量"],
    },
    "armors": {
        "label": "防具列表",
        "source": "armors.php",
        "detail_id": "item_id",
        "page": "pages/armor-overview.html",
        "summary_fields": ["防禦", "類別", "材質", "重量"],
    },
    "items": {
        "label": "道具列表",
        "source": "etcitems.php",
        "detail_id": "item_id",
        "page": "pages/items-overview.html",
        "summary_fields": ["類別", "材質", "重量"],
    },
    "mobs": {
        "label": "怪物列表",
        "source": "mobs.php",
        "detail_id": "npcid",
        "page": "pages/mobs-overview.html",
        "summary_fields": ["等級", "防禦", "體力", "魔力", "經驗值"],
    },
}


def clean_text(value: str) -> str:
    return re.sub(r"\s+", " ", value or "").strip()


def strip_label(value: str) -> str:
    return clean_text(value).rstrip(":：")


def safe_filename(value: str) -> str:
    value = re.sub(r"[^0-9A-Za-z._-]+", "_", value)
    return value.strip("._") or hashlib.sha1(value.encode("utf-8")).hexdigest()[:12]


class TableParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.tables: list[list[list[dict[str, Any]]]] = []
        self._table: list[list[dict[str, Any]]] | None = None
        self._row: list[dict[str, Any]] | None = None
        self._cell: dict[str, Any] | None = None
        self._depth = 0

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr = {key: value or "" for key, value in attrs}
        if tag == "table":
            self._depth += 1
            if self._depth == 1:
                self._table = []
        elif tag == "tr" and self._table is not None:
            self._row = []
        elif tag in ("td", "th") and self._row is not None:
            self._cell = {
                "text": "",
                "header": tag == "th",
                "links": [],
                "images": [],
            }
        elif tag == "a" and self._cell is not None:
            href = attr.get("href", "")
            if href:
                self._cell["links"].append(href)
        elif tag == "img" and self._cell is not None:
            self._cell["images"].append(
                {
                    "src": attr.get("src", ""),
                    "alt": attr.get("alt", ""),
                    "title": attr.get("title", ""),
                }
            )

    def handle_data(self, data: str) -> None:
        if self._cell is not None:
            self._cell["text"] += data

    def handle_endtag(self, tag: str) -> None:
        if tag in ("td", "th") and self._cell is not None and self._row is not None:
            self._cell["text"] = clean_text(self._cell["text"])
            self._row.append(self._cell)
            self._cell = None
        elif tag == "tr" and self._row is not None and self._table is not None:
            if self._row:
                self._table.append(self._row)
            self._row = None
        elif tag == "table" and self._depth:
            if self._depth == 1 and self._table is not None:
                self.tables.append(self._table)
                self._table = None
            self._depth -= 1


@dataclass
class FetchResult:
    url: str
    ok: bool
    text: str = ""
    error: str = ""


def make_session() -> requests.Session:
    session = requests.Session()
    session.headers.update({"User-Agent": USER_AGENT})
    return session


def fetch_text(session: requests.Session, url: str, retries: int = 2) -> FetchResult:
    for attempt in range(retries + 1):
        try:
            response = session.get(url, timeout=25)
            response.raise_for_status()
            if not response.encoding:
                response.encoding = "utf-8"
            return FetchResult(url=url, ok=True, text=response.text)
        except Exception as exc:  # noqa: BLE001
            if attempt >= retries:
                return FetchResult(url=url, ok=False, error=str(exc))
            time.sleep(0.5 + attempt * 0.5)
    return FetchResult(url=url, ok=False, error="unknown fetch error")


def parse_tables(html: str) -> list[list[list[dict[str, Any]]]]:
    parser = TableParser()
    parser.feed(html)
    return parser.tables


def href_id(href: str, key: str) -> str:
    query = parse_qs(urlparse(href).query)
    return (query.get(key) or [""])[0]


def parse_list(kind: str, html: str) -> tuple[list[str], list[dict[str, Any]]]:
    config = COLLECTIONS[kind]
    tables = parse_tables(html)
    if not tables:
        raise RuntimeError(f"{kind} list has no table")

    table = tables[0]
    headers = [cell["text"] for cell in table[0]]
    records: list[dict[str, Any]] = []

    for row in table[1:]:
        cells = row[: len(headers)]
        if not cells:
            continue
        values = {headers[index]: cells[index]["text"] for index in range(min(len(headers), len(cells)))}
        link = (cells[0].get("links") or [""])[0]
        record_id = href_id(link, config["detail_id"]) or f"{kind}-{len(records) + 1}"
        records.append(
            {
                "id": record_id,
                "name": values.get("名稱", ""),
                "detailHref": link,
                "sourceUrl": urljoin(BASE_URL, link) if link else "",
                "fields": values,
                "attributes": {},
                "tables": [],
                "icon": "",
            }
        )

    return headers, records


def value_from_cell(cell: dict[str, Any]) -> str:
    text = clean_text(cell.get("text", ""))
    image_labels = [
        clean_text(image.get("title") or image.get("alt"))
        for image in cell.get("images", [])
        if clean_text(image.get("title") or image.get("alt")) and clean_text(image.get("alt")) != "圖片"
    ]
    if image_labels and not text:
        return "、".join(dict.fromkeys(image_labels))
    if image_labels:
        return clean_text(f"{text} {'、'.join(dict.fromkeys(image_labels))}")
    return text


def extract_attributes(first_table: list[list[dict[str, Any]]]) -> dict[str, str]:
    attrs: dict[str, str] = {}
    for row in first_table:
        cells = row
        index = 0
        while index < len(cells) - 1:
            label = strip_label(cells[index].get("text", ""))
            if label:
                value = value_from_cell(cells[index + 1])
                if value or label not in attrs:
                    attrs[label] = value
                index += 2
            else:
                index += 1
    return attrs


def first_image(first_table: list[list[dict[str, Any]]]) -> str:
    for row in first_table:
        for cell in row:
            for image in cell.get("images", []):
                src = image.get("src", "")
                alt = clean_text(image.get("alt", ""))
                if src and alt == "圖片":
                    return src
    return ""


def parse_detail_tables(tables: list[list[list[dict[str, Any]]]]) -> tuple[dict[str, str], str, list[dict[str, Any]]]:
    if not tables:
        return {}, "", []

    attrs = extract_attributes(tables[0])
    icon_src = first_image(tables[0])
    extra_tables: list[dict[str, Any]] = []

    for table in tables[1:]:
        if not table:
            continue
        title = ""
        header_index = 0
        if len(table[0]) == 1:
            title = table[0][0]["text"]
            header_index = 1
        headers = [cell["text"] for cell in table[header_index]] if len(table) > header_index else []
        rows = []
        for row in table[header_index + 1 :]:
            row_values = [value_from_cell(cell) for cell in row]
            if any(row_values):
                rows.append(row_values)
        extra_tables.append({"title": title or "詳細資料", "headers": headers, "rows": rows})

    return attrs, icon_src, extra_tables


def local_image_path(src: str) -> tuple[Path, str]:
    parsed_path = urlparse(src).path if re.match(r"^https?://", src) else src
    parts = [safe_filename(part) for part in parsed_path.split("/") if part and part != "image"]
    if not parts:
        digest = hashlib.sha1(src.encode("utf-8")).hexdigest()[:12]
        parts = [f"{digest}.png"]
    path = IMAGE_DIR.joinpath(*parts)
    return path, "/".join(["assets", "game-db", "images", *parts])


def download_image(session: requests.Session, src: str) -> str:
    if not src:
        return ""
    url = urljoin(BASE_URL, src)
    target, public_path = local_image_path(src)
    if target.exists() and target.stat().st_size > 0:
        return public_path

    target.parent.mkdir(parents=True, exist_ok=True)
    try:
        response = session.get(url, timeout=25)
        response.raise_for_status()
        target.write_bytes(response.content)
        return public_path
    except Exception:
        return ""


def merge_detail(record: dict[str, Any], detail_html: str, session: requests.Session) -> dict[str, Any]:
    tables = parse_tables(detail_html)
    attributes, icon_src, extra_tables = parse_detail_tables(tables)
    merged = dict(record)
    merged["attributes"] = attributes
    merged["tables"] = extra_tables
    if icon_src:
        merged["icon"] = download_image(session, icon_src)
    for key, value in attributes.items():
        if key and value and key not in merged["fields"]:
            merged["fields"][key] = value
    return merged


def import_collection(kind: str, with_details: bool, max_workers: int, limit: int) -> dict[str, Any]:
    session = make_session()
    config = COLLECTIONS[kind]
    list_url = urljoin(BASE_URL, config["source"])
    result = fetch_text(session, list_url)
    if not result.ok:
        raise RuntimeError(f"Failed to fetch {kind}: {result.error}")

    headers, records = parse_list(kind, result.text)
    if limit:
        records = records[:limit]

    if with_details:
        total = len(records)

        def work(record: dict[str, Any]) -> dict[str, Any]:
            if not record["sourceUrl"]:
                return record
            local_session = make_session()
            detail = fetch_text(local_session, record["sourceUrl"], retries=1)
            if not detail.ok:
                next_record = dict(record)
                next_record["detailError"] = detail.error
                return next_record
            return merge_detail(record, detail.text, local_session)

        completed = 0
        next_records: list[dict[str, Any]] = []
        with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as pool:
            futures = [pool.submit(work, record) for record in records]
            for future in concurrent.futures.as_completed(futures):
                next_records.append(future.result())
                completed += 1
                if completed % 100 == 0 or completed == total:
                    print(f"{kind}: details {completed}/{total}", flush=True)
        order = {record["id"]: index for index, record in enumerate(records)}
        records = sorted(next_records, key=lambda item: order.get(item["id"], 999999))

    return {
        "kind": kind,
        "label": config["label"],
        "sourceUrl": list_url,
        "page": config["page"],
        "headers": headers,
        "summaryFields": config["summary_fields"],
        "items": records,
    }


def build_search_index(collections: dict[str, dict[str, Any]]) -> dict[str, Any]:
    records = []
    for kind, collection in collections.items():
        page = collection["page"]
        for item in collection["items"]:
            fields = item.get("fields", {})
            attrs = item.get("attributes", {})
            content = " ".join(
                str(value)
                for value in [
                    item.get("name"),
                    *fields.values(),
                    *attrs.values(),
                ]
                if value
            )
            records.append(
                {
                    "type": "game-db",
                    "kind": kind,
                    "category": collection["label"],
                    "title": item.get("name", ""),
                    "url": f"{page}?q={item.get('name', '')}",
                    "description": " · ".join(
                        str(fields.get(field, "")) for field in collection["summaryFields"] if fields.get(field, "")
                    ),
                    "content": content,
                }
            )
    return {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "records": records,
    }


def public_collection(data: dict[str, Any]) -> dict[str, Any]:
    public_data = dict(data)
    public_data.pop("sourceUrl", None)
    public_items = []
    for item in public_data.get("items", []):
        public_item = dict(item)
        public_item.pop("sourceUrl", None)
        public_item.pop("detailHref", None)
        public_item.pop("detailError", None)
        public_items.append(public_item)
    public_data["items"] = public_items
    return public_data


def main() -> int:
    parser = argparse.ArgumentParser(description="Import authorized LineageReal database into local曜舞資料庫")
    parser.add_argument("--details", action="store_true", help="Download each detail page and main image")
    parser.add_argument("--workers", type=int, default=8)
    parser.add_argument("--limit", type=int, default=0, help="Limit each collection for testing")
    parser.add_argument("--collections", nargs="*", default=list(COLLECTIONS.keys()))
    args = parser.parse_args()

    DATA_DIR.mkdir(parents=True, exist_ok=True)
    IMAGE_DIR.mkdir(parents=True, exist_ok=True)

    collections: dict[str, dict[str, Any]] = {}
    for kind in args.collections:
        if kind not in COLLECTIONS:
            raise RuntimeError(f"Unknown collection: {kind}")
        print(f"Importing {kind}...", flush=True)
        data = import_collection(kind, args.details, args.workers, args.limit)
        data["generatedAt"] = datetime.now(timezone.utc).isoformat()
        public_data = public_collection(data)
        collections[kind] = public_data
        (DATA_DIR / f"{kind}.json").write_text(
            json.dumps(public_data, ensure_ascii=False, separators=(",", ":")),
            encoding="utf-8",
        )
        print(f"{kind}: wrote {len(data['items'])} records", flush=True)

    manifest = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "total": sum(len(data["items"]) for data in collections.values()),
        "collections": {
            kind: {
                "label": data["label"],
                "page": data["page"],
                "count": len(data["items"]),
                "summaryFields": data["summaryFields"],
            }
            for kind, data in collections.items()
        },
    }
    (DATA_DIR / "manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, separators=(",", ":")),
        encoding="utf-8",
    )
    (DATA_DIR / "search-index.json").write_text(
        json.dumps(build_search_index(collections), ensure_ascii=False, separators=(",", ":")),
        encoding="utf-8",
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
