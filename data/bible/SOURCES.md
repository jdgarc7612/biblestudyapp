# Bible text: sources and licences

DeepWord ships three complete English Bibles (66 books each). All three are in the
public domain, so they can be bundled, displayed and quoted without permission or fees.

| Code | Translation | Licence | Source file |
|------|-------------|---------|-------------|
| BSB | Berean Standard Bible | Public domain (dedicated by its publishers on 30 April 2023) | `eng-bsb.usfx.xml` |
| WEB | World English Bible | Public domain | `eng-web.usfx.xml` |
| KJV | King James Version (1769 Oxford text) | Public domain in most of the world; in the UK the Crown holds perpetual rights to the KJV | `eng-kjv.osis.xml` |

The source files come from the [seven1m/open-bibles](https://github.com/seven1m/open-bibles)
repository, which republishes the eBible.org (https://ebible.org) exports of these translations.

The JSON files in this folder are generated. Don't edit them by hand; change the script and
rebuild instead:

```sh
python3 -I scripts/bible/build_bible_data.py /path/to/folder/with/the/three/source/files
```

The script uses only the Python standard library. It also checks that every book has the same
number of chapters in all three translations.

## What is kept and what is left out

- Verse text and psalm titles (for example "A Psalm of David.") are kept. Psalm titles are shown
  above the chapter, unnumbered, as most printed Bibles do.
- Footnotes, cross-references, section headings and Strong's numbers are left out.
- Words of Jesus are not marked in red.

## Verses that are empty on purpose

Modern translations follow the oldest manuscripts, which don't contain a handful of verses
found in the KJV. Those translations keep the verse numbers but leave the verse out (usually
with a footnote). In the data those verses are empty strings, and the reader skips them, so
numbering stays in step with every other Bible.

- **BSB (16):** Matthew 17:21, 18:11, 23:14; Mark 7:16, 9:44, 9:46, 11:26, 15:28;
  Luke 17:36, 23:17; John 5:4; Acts 8:37, 15:34, 24:7, 28:29; Romans 16:24.
- **WEB (5):** Luke 17:36; Acts 8:37, 15:34, 24:7; Romans 16:25. The WEB prints the closing
  doxology of Romans as 14:24–26 instead of 16:25–27, so the text is all there.
- **KJV:** none.

## Things a reader may notice

- The WEB uses the name **Yahweh** where most English Bibles print "the LORD".
- The BSB capitalises pronouns that refer to God ("He", "His").

## Verse of the day

`scripts/bible/verse-of-the-day.txt` is a hand-picked list of well-loved passages. The build
turns it into `verse-of-the-day.json` with the text in all three translations, and the app
picks one per calendar day (`lib/verse-of-the-day.ts`).
