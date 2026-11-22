/** One point of historical, cultural or literary background. */
export interface DeepDiveContextItem {
  heading: string;
  body: string;
  /** Verse the point is anchored to. */
  v?: number;
  /** Strong's number of a word in verse `v` (Hebrew in the Old Testament, Greek in the New). */
  s?: number;
}

/** A doctrine or theme the chapter teaches. */
export interface DeepDiveTheologyItem {
  title: string;
  body: string;
}

/** A way to live the chapter out, with a question to reflect on. */
export interface DeepDiveApplicationItem {
  title: string;
  body: string;
  question: string;
}

/** The Go Deeper study for one chapter: Context, Theology and Application. */
export interface DeepDiveChapter {
  book: string;
  chapter: number;
  context: DeepDiveContextItem[];
  theology: DeepDiveTheologyItem[];
  application: DeepDiveApplicationItem[];
}
