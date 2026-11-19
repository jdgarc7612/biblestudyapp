# Cross-references: source and licence

The files in this folder come from OpenBible.info's **Bible Cross References**
(https://www.openbible.info/labs/cross-references/), licensed **CC BY**. They grew out of the
public-domain Treasury of Scripture Knowledge, with votes from readers on which links help most.
The study panel credits OpenBible.info under the list, as the licence asks.

The JSON is generated; don't edit it by hand. To rebuild (standard library only):

```sh
python3 -I scripts/crossrefs/build_cross_references.py /path/to/cross_references.txt
```

The build keeps links with at least 2 votes and the 12 strongest per verse (about 245,000 in all,
2.3 MB across 66 files). The app loads one book's file the first time a verse in it is studied.
