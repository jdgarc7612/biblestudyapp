#!/usr/bin/env python3
"""
Build DeepWord's Bible text files from public-domain source files.

Usage (run from the repo root; uses only the Python standard library):

    python3 -I scripts/bible/build_bible_data.py SOURCE_DIR

SOURCE_DIR must contain these three files from the seven1m/open-bibles
repository (https://github.com/seven1m/open-bibles, eBible.org exports):

    eng-web.usfx.xml   World English Bible (USFX)
    eng-bsb.usfx.xml   Berean Standard Bible (USFX)
    eng-kjv.osis.xml   King James Version, 1769 text (OSIS)

Output (overwritten):
    data/bible/<translation>/<book-slug>.json   {"c": [[verse, ...], ...], "t": {"3": "psalm title"}}
    data/bible/books.json                       book list with chapter counts
    data/bible/verse-of-the-day.json            daily verses in every translation
    data/bible/loaders.ts                       lazy import map used by lib/bible.ts

See data/bible/SOURCES.md for licensing notes.
"""

import json
import os
import re
import sys
import xml.etree.ElementTree as ET

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from books import BOOKS  # noqa: E402

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
OUT_DIR = os.path.join(REPO_ROOT, "data", "bible")

TRANSLATIONS = [
    ("WEB", "eng-web.usfx.xml", "usfx"),
    ("BSB", "eng-bsb.usfx.xml", "usfx"),
    ("KJV", "eng-kjv.osis.xml", "osis"),
]

USFM_TO_SLUG = {b[1]: b[0] for b in BOOKS}
OSIS_TO_SLUG = {b[2]: b[0] for b in BOOKS}

# USFX elements whose content is never Scripture text (notes, headings, etc.).
USFX_SKIP = {"f", "x", "s", "h", "toc", "id", "ide", "cl", "rem", "fig", "vp", "cp", "ca", "va", "fe", "ef", "ex"}
# Paragraph styles that hold headings or cross-reference lines, not verse text.
USFX_SKIP_P = re.compile(r"^(mt\d?|mte\d?|ms\d?|mr|s\d?|sr|r|d|cl|is\d?|ip|ipi|im|imi|ili\d?|iot|io\d?|imt\d?|ie)$")


def local(tag):
    return tag.split("}", 1)[-1]


def clean(text):
    text = " ".join(text.split())
    # Tidy spacing artefacts left by stripped markup.
    text = re.sub(r"\s+([,.;:!?’”)])", r"\1", text)
    text = re.sub(r"([“‘(])\s+", r"\1", text)
    return text.strip()


class Collector:
    def __init__(self):
        self.books = {}  # slug -> {chapter: {verse: text}}
        self.titles = {}  # slug -> {chapter: title}
        self.book = None
        self.chapter = None
        self.verse = None
        self.buf = []

    def start_book(self, slug):
        self.end_verse()
        self.book = slug
        self.chapter = None
        if slug:
            self.books.setdefault(slug, {})

    def start_chapter(self, n):
        self.end_verse()
        self.chapter = n
        if self.book:
            self.books[self.book].setdefault(n, {})

    def start_verse(self, n):
        self.end_verse()
        if self.book and self.chapter:
            self.verse = n
            self.buf = []

    def end_verse(self):
        if self.verse is not None and self.book and self.chapter:
            chapter = self.books[self.book][self.chapter]
            text = clean("".join(self.buf))
            prev = chapter.get(self.verse)
            chapter[self.verse] = f"{prev} {text}".strip() if prev else text
        self.verse = None
        self.buf = []

    def add(self, text):
        if text and self.verse is not None:
            self.buf.append(text)

    def add_title(self, text):
        if self.book and self.chapter and text.strip():
            self.titles.setdefault(self.book, {})[self.chapter] = clean(text)


def text_without(elem, skip_tags):
    parts = []

    def rec(e):
        if local(e.tag) in skip_tags:
            parts.append(e.tail or "")
            return
        parts.append(e.text or "")
        for ch in e:
            rec(ch)
        parts.append(e.tail or "")

    parts.append(elem.text or "")
    for ch in elem:
        rec(ch)
    return "".join(parts)


def verse_number(raw):
    m = re.match(r"(\d+)", raw or "")
    return int(m.group(1)) if m else None


def parse_usfx(path):
    col = Collector()
    root = ET.parse(path).getroot()

    def walk(e):
        tag = local(e.tag)
        if tag == "book":
            col.start_book(USFM_TO_SLUG.get(e.get("id")))
            if col.book is None:
                return  # apocrypha / front matter
        elif tag == "c":
            col.start_chapter(int(e.get("id")))
            return
        elif tag == "v":
            col.start_verse(verse_number(e.get("id")))
            return
        elif tag == "ve":
            col.end_verse()
            return
        elif tag == "d" and not any(local(x.tag) == "v" for x in e.iter()):
            # Psalm superscription. (A <d> that holds a verse is treated as text.)
            col.end_verse()
            col.add_title(text_without(e, {"f", "x"}))
            return
        elif tag in USFX_SKIP:
            return
        elif tag == "p" and USFX_SKIP_P.match(e.get("sfm") or ""):
            return
        col.add(e.text)
        for ch in e:
            walk(ch)
            col.add(ch.tail)
        if tag == "book":
            col.end_verse()

    walk(root)
    col.end_verse()
    return col


def parse_osis(path):
    col = Collector()
    root = ET.parse(path).getroot()

    def walk(e):
        tag = local(e.tag)
        if tag == "div" and e.get("type") == "book":
            col.start_book(OSIS_TO_SLUG.get(e.get("osisID")))
            if col.book is None:
                return
        elif tag == "chapter":
            if e.get("sID"):
                col.start_chapter(int(e.get("osisRef").split(".")[-1]))
            else:
                col.end_verse()
            return
        elif tag == "verse":
            if e.get("sID"):
                col.start_verse(int(e.get("osisID").split(" ")[0].split(".")[-1]))
            elif e.get("eID"):
                col.end_verse()
            return
        elif tag == "title":
            if e.get("type") == "psalm" and e.get("canonical") == "true":
                col.add_title(text_without(e, {"note"}))
            return
        elif tag in {"note", "header", "rdg"}:
            return
        col.add(e.text)
        for ch in e:
            walk(ch)
            col.add(ch.tail)

    walk(root)
    col.end_verse()
    return col


def to_book_json(chapters, titles):
    out = []
    for c in sorted(chapters):
        verses = chapters[c]
        n = max(verses) if verses else 0
        out.append([verses.get(v, "") for v in range(1, n + 1)])
    data = {"c": out}
    if titles:
        data["t"] = {str(k): v for k, v in sorted(titles.items())}
    return data


REF_RE = re.compile(r"^(.+?)\s+(\d+):(\d+)(?:-(\d+))?$")


def resolve_ref(ref):
    m = REF_RE.match(ref.strip())
    if not m:
        raise ValueError(f"Bad reference: {ref}")
    name, ch, v1, v2 = m.group(1), int(m.group(2)), int(m.group(3)), m.group(4)
    for slug, _u, _o, display, short in BOOKS:
        if name in (display, short):
            return slug, display, ch, v1, int(v2) if v2 else v1
    raise ValueError(f"Unknown book in reference: {ref}")


def main():
    if len(sys.argv) != 2:
        print(__doc__)
        sys.exit(1)
    src = sys.argv[1]
    parsed = {}
    for tid, filename, fmt in TRANSLATIONS:
        path = os.path.join(src, filename)
        col = parse_usfx(path) if fmt == "usfx" else parse_osis(path)
        missing = [b[0] for b in BOOKS if b[0] not in col.books]
        if missing:
            raise SystemExit(f"{tid}: missing books {missing}")
        parsed[tid] = col

    # Chapter counts must agree across translations.
    books_meta = []
    for idx, (slug, usfm, osis, name, short) in enumerate(BOOKS):
        counts = {tid: len(parsed[tid].books[slug]) for tid in parsed}
        if len(set(counts.values())) != 1:
            raise SystemExit(f"Chapter count mismatch for {slug}: {counts}")
        books_meta.append({
            "id": slug,
            "name": name,
            "short": short,
            "usfm": usfm,
            "testament": "OT" if idx < 39 else "NT",
            "chapters": counts["WEB"],
        })

    stats = {}
    for tid, col in parsed.items():
        out = os.path.join(OUT_DIR, tid.lower())
        os.makedirs(out, exist_ok=True)
        total = empty = 0
        for slug, *_ in BOOKS:
            data = to_book_json(col.books[slug], col.titles.get(slug, {}))
            for ch in data["c"]:
                total += len(ch)
                empty += sum(1 for v in ch if not v)
            with open(os.path.join(out, f"{slug}.json"), "w", encoding="utf-8") as fh:
                json.dump(data, fh, ensure_ascii=False, separators=(",", ":"))
        stats[tid] = (total, empty)

    with open(os.path.join(OUT_DIR, "books.json"), "w", encoding="utf-8") as fh:
        json.dump(books_meta, fh, ensure_ascii=False, indent=1)

    # Lazy loaders: one async chunk per book and translation, so the web app
    # only downloads the book being read.
    lines = [
        "// Generated by scripts/bible/build_bible_data.py. Do not edit by hand.",
        "/* eslint-disable */",
        'import type { BookText, TranslationId } from "../../lib/bible-types";',
        "",
        "type Loader = () => Promise<{ default: BookText }>;",
        "",
        "export const bookLoaders: Record<TranslationId, Record<string, Loader>> = {",
    ]
    for tid, _f, _fmt in TRANSLATIONS:
        lines.append(f"  {tid}: {{")
        for slug, *_ in BOOKS:
            lines.append(f'    "{slug}": () => import("./{tid.lower()}/{slug}.json") as unknown as Promise<{{ default: BookText }}>,')
        lines.append("  },")
    lines.append("};")
    with open(os.path.join(OUT_DIR, "loaders.ts"), "w", encoding="utf-8") as fh:
        fh.write("\n".join(lines) + "\n")

    # Verse of the day.
    refs_path = os.path.join(os.path.dirname(__file__), "verse-of-the-day.txt")
    votd = []
    with open(refs_path, encoding="utf-8") as fh:
        refs = [ln.strip() for ln in fh if ln.strip() and not ln.startswith("#")]
    for ref in refs:
        slug, display, ch, v1, v2 = resolve_ref(ref)
        entry = {"book": slug, "chapter": ch, "start": v1, "end": v2,
                 "reference": f"{'Psalm' if display == 'Psalms' else display} {ch}:{v1}" + (f"-{v2}" if v2 != v1 else ""), "text": {}}
        for tid, col in parsed.items():
            verses = [col.books[slug][ch].get(v, "") for v in range(v1, v2 + 1)]
            if not all(verses):
                raise SystemExit(f"{tid}: missing text for {ref}")
            entry["text"][tid] = " ".join(verses)
        votd.append(entry)
    with open(os.path.join(OUT_DIR, "verse-of-the-day.json"), "w", encoding="utf-8") as fh:
        json.dump(votd, fh, ensure_ascii=False, separators=(",", ":"))

    for tid, (total, empty) in stats.items():
        print(f"{tid}: {total} verse slots, {empty} without text")
    print(f"Verse of the day: {len(votd)} entries")


if __name__ == "__main__":
    main()
