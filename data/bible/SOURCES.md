# Bible text: sources and licences

Omeora ships three complete English Bibles (66 books each). All three are in the
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
- Footnotes, cross-references and Strong's numbers are left out.
- Section headings come from the BSB (see below); the WEB and KJV source headings are not used.
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

## Section headings

Section headings aren't part of Scripture; each translation's editors write their own. Omeora
shows the **BSB's headings** (public domain, from the same `eng-bsb.usfx.xml` the BSB text is
built from) above the same verse in all three translations, so the reader looks the same
whichever one you pick. They live in `data/bible/headings/<book>.json` as
`{"<chapter>": [[verse, "Heading", level], ...]}` and load per book when a chapter opens.

```sh
python3 -I scripts/bible/build_headings.py /path/to/folder/with/eng-bsb.usfx.xml
```

- Levels: 1 is a section heading, 2 a sub-heading (and the Hebrew letters of Psalm 119), 0 the
  five books of the Psalms ("Book One" to "Book Five").
- The six speaker labels in the Song of Songs that fall in the middle of a verse ("The Bride",
  "The Friends") are left out, because moving them to the next verse would credit the wrong
  speaker.
- If a translation leaves the heading's verse empty (WEB Romans 16:25), the heading moves to the
  next verse, or is dropped at the end of the chapter.
- The parallel-passage lines under some BSB headings, such as "(John 1:1–5; Hebrews 11:1–3)", are
  not shown yet.

## Verse of the day

`scripts/bible/verse-of-the-day.txt` is a hand-picked list of well-loved passages. The build
turns it into `verse-of-the-day.json` with the text in all three translations, and the app
picks one per calendar day (`lib/verse-of-the-day.ts`).
