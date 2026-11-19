"""Build DeepWord's original-language data (Hebrew/Greek word insight).

Usage:
  python3 -I scripts/original/build_original_language.py BSB_TABLES.xlsx TBESH.txt TBESG.txt

Inputs (see data/original/SOURCES.md):
  - bsb_tables.xlsx: the Berean Standard Bible interlinear tables (public domain).
  - TBESH / TBESG: STEPBible brief lexicons (CC BY 4.0).

Outputs, in data/original/:
  - <book>.json  {"c": [[verse tokens]]}  token = [english, strongs, morph]
                 strongs 0 = no original word; morph indexes the morph table.
  - lexicon-hebrew.json / lexicon-greek.json  {"<strongs>": entry}
  - morph.json   ["Noun - masculine plural", ...]
  - loaders.ts
"""
import html, json, os, re, sys
from collections import Counter, defaultdict

import openpyxl

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = os.path.join(ROOT, "data", "original")
BOOKS = json.load(open(os.path.join(ROOT, "data", "bible", "books.json"), encoding="utf-8"))

NAME_FIX = {"Psalm": "Psalms", "Song of Solomon": "Song of Songs"}
by_name = {b["name"]: b for b in BOOKS}

REF_RE = re.compile(r"^(.+?) (\d+):(\d+)$")
TAG_RE = re.compile(r"<[^>]+>")
# Capitalised only because they start a sentence in the BSB.
COMMON = set("""in when now then but for so after while if as at on this these that those there
when what who how why where let all no not do do not and the a an""".split())


def clean_eng(s):
    s = str(s if s is not None else "").strip()
    if s in ("-", "", "vvv", ". . ."):
        return ""
    s = re.sub(r"\[\s*[’'”“]+\s*\]", "", s)  # stray quote marks the tables bracket
    s = s.replace("[", "").replace("]", "")  # BSB brackets words it supplies; show them plainly
    if re.search(r"\w", s):
        s = s.replace("...", " ")  # an elided-word marker inside a phrase
    s = re.sub(r"\s+", " ", s)
    s = re.sub(r" ([.,;:!?’”)\]])", r"\1", s)
    s = re.sub(r"([“‘(\[]) ", r"\1", s)
    return s.strip()


def merge_marks(toks):
    """The tables use "..." and "-" for words already covered by a neighbouring phrase.
    Fold their punctuation into the neighbour and drop them, so nothing odd is tappable."""
    out, pending = [], ""
    for t in toks:
        if re.search(r"[\w]", t[0]):
            t = [pending + t[0]] + t[1:]
            pending = ""
            out.append(t)
            continue
        rest = re.sub(r"\.\.\.|(?<!\w)-", "", t[0]).strip()
        if not rest:
            continue
        if re.fullmatch(r"[“‘(]+", rest):
            pending += rest
        elif out:
            out[-1][0] += (" " if rest.startswith("—") else "") + rest
        else:
            pending += rest
    return out


def senses(defn, limit=170):
    """Turn a BDB/Thayer outline into a short list of meanings."""
    if not defn:
        return ""
    parts = [TAG_RE.sub("", p).strip() for p in re.split(r"<BR\s*/?>", defn, flags=re.I)]
    if not any(re.match(r"^\d", p) for p in parts):
        # Strong's style prose (Greek): drop the derivation, keep the meaning.
        s = re.sub(r"^(From|Of|A primary|Probably|Apparently|Perhaps)[^;]*;\s*", "", TAG_RE.sub("", defn).strip())
        s = s[:1].upper() + s[1:]
        return s if len(s) <= limit else s[:limit].rsplit(" ", 1)[0] + "…"
    out = []
    for p in parts:
        m = re.match(r"^(\d+[a-z]?\d*[a-z]?)\)\s*(.+)$", p)
        if not m:
            continue
        if not m.group(1).startswith("1") and len(out) >= 2:
            break
        txt = m.group(2).strip(" ;,")
        if not txt or txt.startswith("-") or txt.startswith("("):
            continue
        for w in [t.strip() for t in txt.split(",")]:
            if w and w.lower() not in [o.lower() for o in out]:
                out.append(w)
        if len(", ".join(out)) > limit:
            break
    s = ", ".join(out)
    if len(s) > limit:
        s = s[:limit].rsplit(",", 1)[0]
    return s


def read_step(path, prefix):
    lex = {}
    for line in open(path, encoding="utf-8-sig"):
        cols = line.rstrip("\n").split("\t")
        if len(cols) < 7 or not re.match(rf"^{prefix}\d{{4}}", cols[0]):
            continue
        num = int(re.match(rf"^{prefix}(\d+)", cols[0]).group(1))
        d = cols[1].split("=")[0].strip()
        # Prefer the plain entry (H0430) over disambiguated ones (H0430G).
        plain = re.fullmatch(rf"{prefix}\d{{4}}", d) is not None
        if num in lex and not plain:
            continue
        if num in lex and lex[num]["plain"]:
            continue
        lex[num] = {"plain": plain, "l": cols[3].strip(), "t": cols[4].strip().replace(".", "·"), "g": cols[6].strip(), "m": cols[5].strip()}
    return lex


def main(xlsx, tbesh, tbesg):
    heb = read_step(tbesh, "H")
    grk = read_step(tbesg, "G")

    wb = openpyxl.load_workbook(xlsx, read_only=True)
    ws = wb["biblosinterlinear96"]
    rows = ws.iter_rows(values_only=True)
    next(rows); next(rows)

    morph_ix = {}
    books = defaultdict(lambda: defaultdict(lambda: defaultdict(list)))  # book -> ch -> vs -> tokens
    rendered = defaultdict(Counter)  # (lang, strongs) -> english renderings
    refs = defaultdict(list)
    count = Counter()
    defs = {}
    cur = None
    for r in rows:
        bsb_sort, lang, vs, word, translit, morph_full, strongs, verse, eng, defn = (
            r[2], r[3], r[4], r[5], r[7], r[9], r[10], r[11], r[14], r[16])
        if verse:
            m = REF_RE.match(verse.strip())
            name = NAME_FIX.get(m.group(1), m.group(1))
            cur = (by_name[name], int(m.group(2)), int(m.group(3)))
        if bsb_sort is None or cur is None:
            continue
        book, ch, v = cur
        grk_lang = lang == "Greek"
        key = ("G" if grk_lang else "H", int(strongs)) if isinstance(strongs, (int, float)) else None
        text = clean_eng(eng)
        mi = 0
        if key and morph_full:
            mi = morph_ix.setdefault(morph_full.strip(), len(morph_ix) + 1)
        if key:
            count[key] += 1
            if defn and key not in defs:
                defs[key] = senses(defn)
            w = ""
            if text:
                w = re.sub(r"[^\w’' -]", "", text).strip()
                w = re.sub(r"^((the|a|an|and|of|in|his|her|your|my|our|their|its|to|for|but|that|with|by|from|on|so|then|is|was|are|were|will|be|has|have|not|i|you|he|she|it|we|they|am|when|now|then|as|after|if|o|according to) )+", "", w, flags=re.I)
                if w:
                    # Lowercase unless it's a name or a title for God ("Jesus", "LORD").
                    if not (w[:1].isupper() and w.lower() not in COMMON):
                        w = w.lower()
                    rendered[key][w] += 1
            ref = f'{book["id"]}.{ch}.{v}'
            if not refs[key] or refs[key][-1][0] != ref:
                refs[key].append((ref, w))
        if not text:
            continue  # untranslated words (e.g. the Greek article) have nothing to tap
        books[book["id"]][ch][v].append([text, key[1] if key else 0, mi, int(bsb_sort)])

    os.makedirs(OUT, exist_ok=True)
    total = 0
    for b in BOOKS:
        chs = books[b["id"]]
        c = []
        for ch in range(1, b["chapters"] + 1):
            vs = chs.get(ch, {})
            n = max(vs.keys(), default=0)
            row = []
            for v in range(1, n + 1):
                toks = merge_marks(sorted(vs.get(v, []), key=lambda t: t[3]))
                row.append([[t[0], t[1], t[2]] if t[2] else ([t[0], t[1]] if t[1] else [t[0]]) for t in toks])
            c.append(row)
        s = json.dumps({"c": c}, ensure_ascii=False, separators=(",", ":"))
        open(os.path.join(OUT, f'{b["id"]}.json'), "w", encoding="utf-8").write(s)
        total += len(s.encode())

    morph = [""] * (len(morph_ix) + 1)
    for k, i in morph_ix.items():
        morph[i] = k
    json.dump(morph, open(os.path.join(OUT, "morph.json"), "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))

    order = {b["id"]: i for i, b in enumerate(BOOKS)}
    lex_files = []
    for lang, step, fname in (("H", heb, "lexicon-hebrew.json"), ("G", grk, "lexicon-greek.json")):
        out = {}
        for (lg, num), n in count.items():
            if lg != lang:
                continue
            e = step.get(num, {})
            top = [[w, c] for w, c in rendered[(lg, num)].most_common(5) if w]
            # Sample other places: verses where the word carries its usual sense (one of its
            # top two renderings, which keeps rare homonyms out), spread evenly across books.
            usual = {w for w, _ in top[:2]}
            cands = [r for r, w in refs[(lg, num)] if w in usual] or [r for r, _ in refs[(lg, num)]]
            first_by_book = {}
            for r in cands:
                first_by_book.setdefault(r.split(".")[0], r)
            bks = list(first_by_book.values())
            if len(bks) >= 6:
                sample = [bks[round(i * (len(bks) - 1) / 5)] for i in range(6)]
            else:
                sample = bks + [r for r in cands if r not in bks][: 6 - len(bks)]
            sample.sort(key=lambda r: (order[r.split(".")[0]], int(r.split(".")[1]), int(r.split(".")[2])))
            flags = {}
            if e.get("m", "").startswith("N:"):
                flags["p"] = 1  # a proper name (person or place)
            if e.get("m", "").startswith("A:"):
                flags["a"] = 1  # Aramaic
            out[str(num)] = {**flags,
                "l": e.get("l", ""), "t": e.get("t", ""), "g": e.get("g", ""),
                "d": defs.get((lg, num), ""), "n": n, "r": top, "x": sample,
            }
        shards = defaultdict(dict)
        for k, v in out.items():
            shards[int(k) // 1000][k] = v
        for i, sh in shards.items():
            name = f"lex-{lang.lower()}{i}"
            lex_files.append(name)
            txt = json.dumps(sh, ensure_ascii=False, separators=(",", ":"))
            open(os.path.join(OUT, name + ".json"), "w", encoding="utf-8").write(txt)
        print(lang, len(out), "entries")

    lines = ["// Generated by scripts/original/build_original_language.py. Do not edit by hand.",
             "/* eslint-disable */",
             "export type OriginalToken = [string, number?, number?];",
             "export type OriginalBook = { c: OriginalToken[][][] };",
             "type Loader = () => Promise<{ default: OriginalBook }>;",
             "", "export const originalLoaders: Record<string, Loader> = {"]
    for b in BOOKS:
        lines.append(f'  "{b["id"]}": () => import("./{b["id"]}.json") as unknown as Promise<{{ default: OriginalBook }}>,')
    lines.append("};")
    lines += ["", "export type LexiconEntry = { p?: 1; a?: 1; l: string; t: string; g: string; d: string; n: number; r: [string, number][]; x: string[] };",
              "type LexLoader = () => Promise<{ default: Record<string, LexiconEntry> }>;",
              "", "/** Lexicon shards, keyed like \"h7\" (Hebrew 7000-7999) or \"g3\". */",
              "export const lexiconLoaders: Record<string, LexLoader> = {"]
    for name in sorted(lex_files):
        lines.append(f'  "{name[4:]}": () => import("./{name}.json") as unknown as ReturnType<LexLoader>,')
    lines += ["};", "", "export const loadMorph = () => import(\"./morph.json\") as unknown as Promise<{ default: string[] }>;"]
    open(os.path.join(OUT, "loaders.ts"), "w").write("\n".join(lines) + "\n")
    print("books", total // 1024, "KB; morph", len(morph))


if __name__ == "__main__":
    main(*sys.argv[1:4])
