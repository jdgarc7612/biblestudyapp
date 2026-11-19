/**
 * Guided studies: short multi-day reading plans, bundled with the app (no AI or network per day).
 * Each day is one passage (or a few whole chapters) plus two reflection questions.
 *
 * Drafted with Claude for Josh to review. The questions stay close to the text and leave the
 * answering to the reader; anything doctrinal follows the plain reading of the passage.
 */

export interface PlanReading {
  book: string;
  chapter: number;
  /** Leave out start/end for the whole chapter. */
  start?: number;
  end?: number;
}

export interface PlanDay {
  title: string;
  readings: PlanReading[];
  questions: string[];
}

export interface StudyPlan {
  id: string;
  title: string;
  /** Who it suits, shown as a small tag. */
  tag: string;
  summary: string;
  icon: "heart" | "flame" | "leaf" | "footsteps" | "sunny";
  days: PlanDay[];
}

const ch = (book: string, chapter: number): PlanReading => ({ book, chapter });
const vv = (book: string, chapter: number, start: number, end: number): PlanReading => ({ book, chapter, start, end });

export const STUDY_PLANS: StudyPlan[] = [
  {
    id: "meet-jesus-john",
    title: "Meet Jesus in John",
    tag: "Great first plan",
    summary:
      "Seven scenes from John's Gospel, written so that readers would believe Jesus is the Christ and have life in his name.",
    icon: "sunny",
    days: [
      {
        title: "The Word became flesh",
        readings: [vv("john", 1, 1, 18)],
        questions: [
          "John calls Jesus the Word, who was with God and was God. What does that tell you about who Jesus is?",
          "Verse 12 speaks of receiving him and becoming children of God. What does receiving Jesus look like?",
        ],
      },
      {
        title: "Born again",
        readings: [vv("john", 3, 1, 21)],
        questions: [
          "Nicodemus was a respected teacher, yet Jesus said he needed a new birth. Why can't religious effort alone give us new life?",
          "Put John 3:16 in your own words. Which part stands out to you today?",
        ],
      },
      {
        title: "Living water",
        readings: [vv("john", 4, 1, 42)],
        questions: [
          "Jesus crossed social lines to talk with this woman. What does that show about who he came for?",
          "What thirst in your own life do you try to satisfy apart from God?",
        ],
      },
      {
        title: "The bread of life",
        readings: [vv("john", 6, 25, 51)],
        questions: [
          "The crowd wanted another miracle, and Jesus offered himself. What do you tend to want from God more than God himself?",
          "What does it mean to come to Jesus and believe in him (v. 35)?",
        ],
      },
      {
        title: "The good shepherd",
        readings: [vv("john", 10, 1, 18)],
        questions: [
          "List what the good shepherd does for the sheep in this passage. Which one do you most need right now?",
          "Jesus lays down his life of his own accord (v. 18). Why does that matter?",
        ],
      },
      {
        title: "The resurrection and the life",
        readings: [vv("john", 11, 17, 44)],
        questions: [
          "Jesus wept even though he knew he would raise Lazarus. What does that tell you about how he sees your grief?",
          "Jesus asked Martha whether she believed him (v. 26). How would you answer?",
        ],
      },
      {
        title: "He is risen",
        readings: [ch("john", 20)],
        questions: [
          "Thomas moved from doubt to “My Lord and my God!” What helps you move from questions to trust?",
          "John says he wrote so that you may believe and have life (v. 31). Where are you in that journey?",
        ],
      },
    ],
  },
  {
    id: "first-steps",
    title: "First Steps of Faith",
    tag: "New to faith",
    summary:
      "The basics of following Jesus in one week: grace, who Jesus is, assurance, prayer, Scripture, church and the Holy Spirit.",
    icon: "footsteps",
    days: [
      {
        title: "Saved by grace",
        readings: [vv("ephesians", 2, 1, 10)],
        questions: [
          "What were we like before God made us alive (vv. 1-3)?",
          "Verses 8-9 say salvation is a gift, not something we earn. Why is that good news?",
        ],
      },
      {
        title: "Who Jesus is",
        readings: [vv("colossians", 1, 15, 23)],
        questions: [
          "List everything this passage says about Jesus.",
          "What has Jesus done to bring us back to God (vv. 20-22)?",
        ],
      },
      {
        title: "You can know",
        readings: [vv("1john", 5, 1, 13)],
        questions: [
          "John wrote so that believers may know they have eternal life (v. 13). What gives that confidence?",
          "How does this passage describe what it means to believe in Jesus?",
        ],
      },
      {
        title: "Learning to pray",
        readings: [vv("matthew", 6, 5, 15)],
        questions: [
          "What does Jesus warn against in prayer, and what does he invite instead?",
          "Pray through the Lord's Prayer slowly, one line at a time. Which line stood out?",
        ],
      },
      {
        title: "God's Word",
        readings: [vv("2timothy", 3, 14, 17)],
        questions: [
          "What does Paul say Scripture is able to do (vv. 15-17)?",
          "What small habit could help you read the Bible each day?",
        ],
      },
      {
        title: "Life together",
        readings: [vv("acts", 2, 36, 47)],
        questions: [
          "What did the first believers devote themselves to (v. 42)?",
          "Which of those practices would help you grow most right now?",
        ],
      },
      {
        title: "Walking by the Spirit",
        readings: [vv("galatians", 5, 16, 26)],
        questions: [
          "Compare the works of the flesh with the fruit of the Spirit. What stands out to you?",
          "Which fruit of the Spirit would you like to ask God to grow in you?",
        ],
      },
    ],
  },
  {
    id: "psalms-of-comfort",
    title: "Psalms of Comfort",
    tag: "For hard days",
    summary: "Seven psalms to pray when life feels heavy, each one pointing to God's care, presence and faithfulness.",
    icon: "leaf",
    days: [
      {
        title: "The Lord is my shepherd",
        readings: [ch("psalms", 23)],
        questions: [
          "Which line of this psalm do you most need to believe today?",
          "David says God is with him even in the darkest valley. Where do you need to know God is with you?",
        ],
      },
      {
        title: "Whom shall I fear?",
        readings: [ch("psalms", 27)],
        questions: [
          "What fears does David name, and what does he set against them?",
          "Verse 14 says to wait for the Lord. What does waiting on God look like for you right now?",
        ],
      },
      {
        title: "Taste and see",
        readings: [ch("psalms", 34)],
        questions: [
          "The Lord is near to the brokenhearted (v. 18). How does that change the way you bring your pain to God?",
          "Write down one way you have seen God's goodness this week.",
        ],
      },
      {
        title: "Be still",
        readings: [ch("psalms", 46)],
        questions: [
          "The psalm pictures the earth shaking, yet God is our refuge. What feels unsteady in your life?",
          "What does it mean to be still and know that he is God (v. 10)?",
        ],
      },
      {
        title: "Under his wings",
        readings: [ch("psalms", 91)],
        questions: [
          "Which picture of God's protection in this psalm speaks to you most?",
          "Believers still face hard things. How do you hold that together with the promises of this psalm?",
        ],
      },
      {
        title: "My help comes from the Lord",
        readings: [ch("psalms", 121)],
        questions: [
          "Where do you usually look first for help?",
          "God neither slumbers nor sleeps. What does it mean to you that he never stops watching over you?",
        ],
      },
      {
        title: "Fully known",
        readings: [ch("psalms", 139)],
        questions: [
          "How does it feel to be completely known by God?",
          "David ends by asking God to search his heart (vv. 23-24). Pray those verses for yourself today.",
        ],
      },
    ],
  },
  {
    id: "sermon-on-the-mount",
    title: "The Sermon on the Mount",
    tag: "Go deeper",
    summary: "Jesus' best-known teaching on life in God's kingdom, in five readings from Matthew 5 to 7.",
    icon: "flame",
    days: [
      {
        title: "The Beatitudes",
        readings: [vv("matthew", 5, 1, 16)],
        questions: [
          "Who does Jesus call blessed? How is that different from what the world calls blessed?",
          "What does it mean to be salt and light where you live?",
        ],
      },
      {
        title: "A deeper righteousness",
        readings: [vv("matthew", 5, 17, 48)],
        questions: [
          "Jesus says he came to fulfill the Law, not abolish it. What does that mean?",
          "Jesus moves from actions to the heart: anger, lust, love for enemies. Which one challenges you most?",
        ],
      },
      {
        title: "Devotion in secret",
        readings: [vv("matthew", 6, 1, 18)],
        questions: [
          "Why does Jesus care about the motives behind giving, praying and fasting?",
          "What would it look like to do something good this week that only God sees?",
        ],
      },
      {
        title: "Do not worry",
        readings: [vv("matthew", 6, 19, 34)],
        questions: [
          "Where is your treasure right now?",
          "What does seeking first God's kingdom (v. 33) look like when you are anxious?",
        ],
      },
      {
        title: "Building on the rock",
        readings: [ch("matthew", 7)],
        questions: [
          "What does Jesus teach about judging others (vv. 1-5)?",
          "The wise person hears Jesus' words and does them. What is one thing from this sermon you will put into practice?",
        ],
      },
    ],
  },
  {
    id: "romans-7-days",
    title: "Romans in 7 Days",
    tag: "Go deeper",
    summary:
      "Paul's fullest explanation of the gospel, a few chapters a day: sin, grace, faith, life in the Spirit, and how the good news shapes everyday life.",
    icon: "heart",
    days: [
      {
        title: "Everyone needs the gospel",
        readings: [ch("romans", 1), ch("romans", 2)],
        questions: [
          "Paul says he is not ashamed of the gospel (1:16). Why might someone be tempted to be ashamed of it?",
          "How does chapter 2 challenge people who think they are better than others?",
        ],
      },
      {
        title: "Made right by faith",
        readings: [ch("romans", 3), ch("romans", 4)],
        questions: [
          "All have sinned, and are justified freely by his grace (3:23-24). What does justified mean here?",
          "Why does Paul use Abraham as his example of faith?",
        ],
      },
      {
        title: "Peace with God, new life",
        readings: [ch("romans", 5), ch("romans", 6)],
        questions: [
          "List what we have because we are justified by faith (5:1-11).",
          "Paul asks whether we should keep sinning so that grace may increase. How does he answer, and why?",
        ],
      },
      {
        title: "Life in the Spirit",
        readings: [ch("romans", 7), ch("romans", 8)],
        questions: [
          "Where do you recognize the struggle Paul describes in chapter 7?",
          "Romans 8 begins with no condemnation and ends with nothing able to separate us from God's love. Which promise do you need most today?",
        ],
      },
      {
        title: "God keeps his promises",
        readings: [ch("romans", 9), ch("romans", 10), ch("romans", 11)],
        questions: [
          "These chapters are hard. What do they teach about God's mercy and his faithfulness to his promises?",
          "How does Paul's praise in 11:33-36 shape the way we handle hard questions?",
        ],
      },
      {
        title: "A living sacrifice",
        readings: [ch("romans", 12), ch("romans", 13)],
        questions: [
          "What would offering yourself as a living sacrifice (12:1) look like this week?",
          "Pick one command from chapter 12 to practice today. Which one, and how?",
        ],
      },
      {
        title: "Welcome one another",
        readings: [ch("romans", 14), ch("romans", 15), ch("romans", 16)],
        questions: [
          "How should Christians treat each other on disputed matters, according to chapter 14?",
          "Paul ends with a long list of names. What does that say about the church?",
        ],
      },
    ],
  },
];
