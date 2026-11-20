# Original-language data: sources and licences

Powers the study panel's Hebrew/Greek tab: tap a word in a verse to see the word behind it.

| What | Source | Licence |
|------|--------|---------|
| Word-by-word links from BSB English to Hebrew/Aramaic/Greek (Strong's numbers, parsing) and Strong's / BDB / Thayer's definitions | Berean Standard Bible interlinear tables (`bsb_tables.xlsx`, sheet `biblosinterlinear96`), from BereanBible.com | Public domain |
| Lemmas, transliterations, short glosses | STEPBible.org TBESH (Hebrew) and TBESG (Greek) brief lexicons, github.com/STEPBible/STEPBible-Data | CC BY 4.0 (credited in the app) |

The JSON files here are generated. Don't edit them by hand; rebuild instead:

```sh
python3 -I scripts/original/build_original_language.py bsb_tables.xlsx TBESH.txt TBESG.txt
```

Needs `openpyxl`. Output:

- `<book>.json`: per verse, the BSB's English phrase by phrase: `[english, strongs, morph]`.
- `lex-h0.json` … `lex-g5.json`: lexicon shards of 1,000 Strong's numbers each: lemma, transliteration,
  gloss, short meaning, number of uses, the BSB's most common renderings, and six sample verses
  where the word carries its usual sense.
- `morph.json`: the parsing descriptions the book files point to.

Everything loads on demand (one book, one shard) and runs on the device: no server, no AI cost.
About 8.6 MB of book files and 3.2 MB of lexicon, raw; much smaller compressed.
