/**
 * Book introductions shown in the Reader's study panel.
 *
 * Drafted by Claude for Josh's review (Nov 2026). Written from a conservative evangelical view:
 * Scripture is the final authority, and traditional authorship is given where the church has
 * long held it, with honest wording where the book itself doesn't name its author.
 * Edit freely; each entry is plain text.
 */

export interface BookIntro {
  /** One line: what the book is about. */
  theme: string;
  /** Two or three sentences of overview. */
  summary: string;
  author: string;
  written: string;
  audience: string;
  themes: string[];
  /** A verse that captures the book: [chapter, verse]. */
  keyVerse: [number, number];
}

export const BOOK_INTROS: Record<string, BookIntro> = {
  genesis: {
    theme: "The beginning of everything, and of God's promise to bless the world.",
    summary:
      "Genesis tells of creation, humanity's fall into sin, the flood and Babel, then narrows to Abraham's family. God promises Abraham a people, a land and blessing for every nation, and keeps that promise through Isaac, Jacob and Joseph despite their failures.",
    author: "Moses, by long Jewish and Christian tradition",
    written: "About 1440–1400 BC",
    audience: "Israel in the wilderness, learning who God is and where they came from",
    themes: ["Creation", "Sin and its spread", "God's covenant promises"],
    keyVerse: [12, 3],
  },
  exodus: {
    theme: "God rescues His people and comes to live among them.",
    summary:
      "God hears Israel's cry in Egypt, raises up Moses and brings them out through the plagues and the Red Sea. At Sinai He gives His law and covenant, and the book ends with His glory filling the tabernacle.",
    author: "Moses",
    written: "About 1440–1400 BC",
    audience: "The people God had just redeemed from slavery",
    themes: ["Redemption", "The Passover", "God's presence"],
    keyVerse: [6, 7],
  },
  leviticus: {
    theme: "How a sinful people can live near a holy God.",
    summary:
      "Leviticus sets out the sacrifices, priesthood and laws of clean and unclean that let Israel worship with God dwelling among them. The Day of Atonement (chapter 16) and the call to be holy point ahead to Christ's once-for-all sacrifice.",
    author: "Moses",
    written: "About 1440–1400 BC",
    audience: "Israel's priests and people at Sinai",
    themes: ["Holiness", "Sacrifice and atonement", "Worship"],
    keyVerse: [19, 2],
  },
  numbers: {
    theme: "Forty years in the wilderness: unbelief, judgment and God's faithfulness.",
    summary:
      "Israel is counted and organised for the march to Canaan, but refuses to enter the land at Kadesh. That generation dies in the wilderness, and God prepares their children to go in, still keeping His promises.",
    author: "Moses",
    written: "About 1440–1400 BC",
    audience: "The new generation about to enter Canaan",
    themes: ["Unbelief and its cost", "God's patience", "Guidance"],
    keyVerse: [14, 18],
  },
  deuteronomy: {
    theme: "Moses' last sermons: love the Lord and keep His covenant.",
    summary:
      "On the plains of Moab, Moses retells Israel's story and restates the law for a new generation. He calls them to love God with all their heart and to choose life, then hands leadership to Joshua and dies.",
    author: "Moses (the account of his death was likely added by Joshua or another)",
    written: "About 1400 BC",
    audience: "Israel on the edge of the promised land",
    themes: ["Covenant renewal", "Love and obedience", "Remembering God's works"],
    keyVerse: [6, 5],
  },
  joshua: {
    theme: "God gives His people the land He promised.",
    summary:
      "Under Joshua, Israel crosses the Jordan, takes Jericho and settles Canaan. The land is divided among the tribes, and Joshua's farewell calls them to serve the Lord alone.",
    author: "Largely Joshua, by tradition, with later additions",
    written: "About 1400–1370 BC",
    audience: "Israel settling the land",
    themes: ["God's faithfulness to His word", "Courage", "Wholehearted loyalty"],
    keyVerse: [1, 9],
  },
  judges: {
    theme: "A downward cycle of sin, and God's mercy in raising deliverers.",
    summary:
      "After Joshua, Israel repeatedly turns to idols, falls to oppressors, cries out and is rescued by judges such as Deborah, Gideon and Samson. Each cycle gets worse, and the book ends in chaos because there was no king in Israel.",
    author: "Unknown; Jewish tradition names Samuel",
    written: "About 1050–1000 BC",
    audience: "Israel in the early monarchy",
    themes: ["The cycle of sin", "God's mercy", "The need for a true king"],
    keyVerse: [21, 25],
  },
  ruth: {
    theme: "Loyal love in dark days, and the family line of David.",
    summary:
      "A Moabite widow, Ruth, clings to her mother-in-law Naomi and to Israel's God. Boaz acts as their kinsman-redeemer and marries her, and their son becomes the grandfather of King David.",
    author: "Unknown; Jewish tradition names Samuel",
    written: "During or after David's reign, about 1000 BC",
    audience: "Israel under the monarchy",
    themes: ["Loyal love (hesed)", "Redemption", "God's hidden providence"],
    keyVerse: [1, 16],
  },
  "1samuel": {
    theme: "Israel gets a king: Saul's fall and David's rise.",
    summary:
      "Samuel serves as prophet and judge until Israel demands a king. Saul starts well but disobeys, and God chooses David, a man after His own heart, who waits through years of persecution.",
    author: "Unknown; possibly drawing on records by Samuel, Nathan and Gad",
    written: "After Solomon's reign, about 930 BC or later",
    audience: "The kingdom of Israel",
    themes: ["God looks on the heart", "Obedience over sacrifice", "Kingship"],
    keyVerse: [16, 7],
  },
  "2samuel": {
    theme: "David's reign, God's covenant with him, and the cost of his sin.",
    summary:
      "David becomes king over all Israel and God promises him an everlasting dynasty (chapter 7), fulfilled in Jesus. His sin with Bathsheba brings lasting trouble in his family and kingdom.",
    author: "Unknown, drawing on court records",
    written: "About 930 BC or later",
    audience: "The kingdom of Israel",
    themes: ["The Davidic covenant", "Sin and repentance", "God's grace"],
    keyVerse: [7, 16],
  },
  "1kings": {
    theme: "Solomon's glory, then a divided kingdom drifting from God.",
    summary:
      "Solomon builds the temple and rules with great wisdom, but his heart turns to other gods. The kingdom splits into Israel and Judah, and prophets like Elijah confront kings who lead the people into idolatry.",
    author: "Unknown; Jewish tradition names Jeremiah",
    written: "About 560–540 BC, during the exile",
    audience: "Exiles asking why the kingdom fell",
    themes: ["Faithfulness and idolatry", "The temple", "The word of the prophets"],
    keyVerse: [18, 21],
  },
  "2kings": {
    theme: "The fall of Israel and Judah, just as the prophets warned.",
    summary:
      "Elisha carries on Elijah's ministry while most kings do evil. Assyria takes Israel in 722 BC, and despite reforms under Hezekiah and Josiah, Babylon destroys Jerusalem in 586 BC; the book ends with a glimmer of hope for David's line.",
    author: "Unknown; Jewish tradition names Jeremiah",
    written: "About 560–540 BC",
    audience: "Exiles in Babylon",
    themes: ["Judgment for unfaithfulness", "God's patience", "Hope for David's line"],
    keyVerse: [17, 13],
  },
  "1chronicles": {
    theme: "Israel's story retold around David, worship and God's promises.",
    summary:
      "Long genealogies link the returning exiles to Adam, Abraham and David. The book then focuses on David's reign, the ark and his preparations for the temple, reminding the people that God's covenant still stands.",
    author: "Unknown; Jewish tradition names Ezra",
    written: "About 450–400 BC",
    audience: "Jews back in the land after the exile",
    themes: ["God's covenant with David", "Worship", "Continuity of God's people"],
    keyVerse: [17, 14],
  },
  "2chronicles": {
    theme: "Judah's kings measured by their faithfulness to God and His temple.",
    summary:
      "From Solomon's temple to the exile, Judah's history shows that seeking God brings blessing and forsaking Him brings ruin. It ends with Cyrus allowing the exiles to return and rebuild.",
    author: "Unknown; Jewish tradition names Ezra",
    written: "About 450–400 BC",
    audience: "The restored community in Judah",
    themes: ["Seeking God", "Repentance and revival", "The temple"],
    keyVerse: [7, 14],
  },
  ezra: {
    theme: "Back from exile: rebuilding the temple and the people.",
    summary:
      "The first exiles return under Zerubbabel and rebuild the temple despite opposition. Decades later Ezra the scribe arrives to teach God's law and calls the people to repentance.",
    author: "Ezra, by tradition",
    written: "About 440 BC",
    audience: "The returned exiles",
    themes: ["Restoration", "God's word", "Repentance"],
    keyVerse: [7, 10],
  },
  nehemiah: {
    theme: "Rebuilding Jerusalem's walls and renewing the covenant.",
    summary:
      "Nehemiah leaves the Persian court to rebuild Jerusalem's walls in 52 days through prayer and hard work. Ezra reads the law, the people renew their covenant, and Nehemiah fights to keep them faithful.",
    author: "Nehemiah (with Ezra, by tradition)",
    written: "About 430 BC",
    audience: "The community in Jerusalem",
    themes: ["Prayerful leadership", "Perseverance", "Covenant renewal"],
    keyVerse: [8, 10],
  },
  esther: {
    theme: "God's unseen hand protecting His people.",
    summary:
      "A Jewish orphan becomes queen of Persia just as Haman plots to destroy the Jews. Esther risks her life to plead for her people, and their rescue is still celebrated at Purim. God is never named, yet His providence runs through every turn.",
    author: "Unknown",
    written: "About 460–350 BC",
    audience: "Jews living in the Persian empire",
    themes: ["Providence", "Courage", "Deliverance"],
    keyVerse: [4, 14],
  },
  job: {
    theme: "Where is God when the righteous suffer?",
    summary:
      "Job, a blameless man, loses everything. His friends insist he must have sinned; Job protests and demands an answer. God answers from the whirlwind not with an explanation but with Himself, and Job bows in trust.",
    author: "Unknown",
    written: "Uncertain; set in the time of the patriarchs",
    audience: "God's people wrestling with suffering",
    themes: ["Suffering", "God's sovereignty and wisdom", "Faith without answers"],
    keyVerse: [19, 25],
  },
  psalms: {
    theme: "Israel's prayer book: praise, lament, trust and hope in God.",
    summary:
      "One hundred fifty songs and prayers cover every human emotion before God. Many are by David, and several look ahead to the Messiah, the King who would suffer and reign. Jesus prayed the Psalms and the New Testament quotes them often.",
    author: "David (about half), Asaph, the sons of Korah, Moses, Solomon and others",
    written: "About 1400–450 BC",
    audience: "God's people in worship",
    themes: ["Praise", "Lament and trust", "The coming King"],
    keyVerse: [23, 1],
  },
  proverbs: {
    theme: "Wisdom for everyday life, beginning with the fear of the Lord.",
    summary:
      "Short sayings and longer poems teach how to live well with words, work, money, friendship and family. True wisdom starts with reverence for God, and Proverbs pictures it as a person calling out in the streets.",
    author: "Mainly Solomon, with Agur, Lemuel and other wise men",
    written: "About 950–700 BC",
    audience: "Young people, and anyone wanting to live wisely",
    themes: ["The fear of the Lord", "Wisdom and folly", "Character"],
    keyVerse: [1, 7],
  },
  ecclesiastes: {
    theme: "Life under the sun is fleeting; fear God and keep His commands.",
    summary:
      "The Teacher tests pleasure, work, wisdom and wealth and finds each one a vapour that can't satisfy. His honest search ends by pointing to God as the only lasting meaning.",
    author: "The Teacher, traditionally Solomon",
    written: "About 935 BC, by tradition",
    audience: "Anyone searching for meaning",
    themes: ["The emptiness of life without God", "Enjoying God's gifts", "Judgment"],
    keyVerse: [12, 13],
  },
  songofsongs: {
    theme: "The goodness of love and marriage as God made it.",
    summary:
      "A collection of love poems between a bride and her beloved celebrates faithful, joyful love. Many Christians have also read it as a picture of the love between Christ and His church.",
    author: "Solomon, by tradition",
    written: "About 960 BC, by tradition",
    audience: "Israel, and couples in every age",
    themes: ["Love", "Faithfulness", "Delight"],
    keyVerse: [8, 7],
  },
  isaiah: {
    theme: "The Holy One of Israel judges and saves, through His Servant.",
    summary:
      "Isaiah warns Judah of judgment for their sin, then comforts them with promises of return and a new creation. His Servant Songs, especially chapter 53, foretell the Messiah who would suffer for our sins.",
    author: "Isaiah son of Amoz",
    written: "About 740–680 BC",
    audience: "Judah and Jerusalem",
    themes: ["God's holiness", "Judgment and comfort", "The suffering Servant"],
    keyVerse: [53, 5],
  },
  jeremiah: {
    theme: "A weeping prophet's warning, and the promise of a new covenant.",
    summary:
      "For forty years Jeremiah calls Judah to repent before Babylon comes. He is rejected and persecuted, and he sees Jerusalem fall, yet God gives him the promise of a new covenant written on the heart (chapter 31).",
    author: "Jeremiah, with his scribe Baruch",
    written: "About 627–580 BC",
    audience: "Judah before and after Jerusalem's fall",
    themes: ["Repentance", "Judgment", "The new covenant"],
    keyVerse: [31, 33],
  },
  lamentations: {
    theme: "Grief over fallen Jerusalem, and hope in God's mercies.",
    summary:
      "Five poems mourn the destruction of Jerusalem in 586 BC. At the very centre of the sorrow stands a confession of hope: the Lord's mercies are new every morning.",
    author: "Jeremiah, by tradition",
    written: "Soon after 586 BC",
    audience: "Survivors of Jerusalem's fall",
    themes: ["Grief", "Sin's consequences", "God's faithfulness"],
    keyVerse: [3, 22],
  },
  ezekiel: {
    theme: "God's glory leaves the temple, and will return.",
    summary:
      "A priest in exile in Babylon sees visions of God's glory departing Jerusalem because of its sin. After the city falls, Ezekiel proclaims hope: a new heart, dry bones brought to life, and God dwelling with His people again.",
    author: "Ezekiel",
    written: "About 593–570 BC",
    audience: "Exiles in Babylon",
    themes: ["God's glory", "Personal responsibility", "Restoration and new life"],
    keyVerse: [36, 26],
  },
  daniel: {
    theme: "God rules over the kingdoms of the world.",
    summary:
      "Daniel and his friends stay faithful in Babylon's court, through the fiery furnace and the lions' den. His visions show empires rising and falling until God's everlasting kingdom comes through one like a son of man.",
    author: "Daniel",
    written: "About 530 BC",
    audience: "Jews in exile",
    themes: ["God's sovereignty", "Faithfulness under pressure", "The coming kingdom"],
    keyVerse: [2, 44],
  },
  hosea: {
    theme: "God's relentless love for an unfaithful people.",
    summary:
      "God tells Hosea to marry Gomer, who is unfaithful to him, as a living picture of Israel's idolatry. Hosea's costly love for her shows God's love that pursues and restores.",
    author: "Hosea",
    written: "About 755–715 BC",
    audience: "The northern kingdom of Israel",
    themes: ["Covenant love", "Spiritual unfaithfulness", "Return and restoration"],
    keyVerse: [6, 6],
  },
  joel: {
    theme: "The day of the Lord, and the promise of the Spirit.",
    summary:
      "A devastating locust plague becomes a warning of the coming day of the Lord. Joel calls the people to return to God with all their heart and promises the outpouring of the Spirit, fulfilled at Pentecost.",
    author: "Joel",
    written: "Uncertain; possibly about 835 BC or after the exile",
    audience: "Judah",
    themes: ["The day of the Lord", "Repentance", "The Spirit poured out"],
    keyVerse: [2, 28],
  },
  amos: {
    theme: "Let justice roll down like waters.",
    summary:
      "A shepherd from Judah confronts prosperous Israel for oppressing the poor while keeping up religious show. God's judgment is coming, yet the book ends with the promise of David's fallen tent being restored.",
    author: "Amos",
    written: "About 760–750 BC",
    audience: "The northern kingdom of Israel",
    themes: ["Justice", "Empty religion", "Judgment and restoration"],
    keyVerse: [5, 24],
  },
  obadiah: {
    theme: "Edom's pride will fall; the kingdom will be the Lord's.",
    summary:
      "The shortest Old Testament book announces judgment on Edom for gloating over Jerusalem's ruin. It ends with God's people restored and His kingdom established.",
    author: "Obadiah",
    written: "Probably soon after 586 BC",
    audience: "Judah",
    themes: ["Pride", "God's justice", "God's kingdom"],
    keyVerse: [1, 15],
  },
  jonah: {
    theme: "God's mercy reaches even Israel's enemies.",
    summary:
      "Jonah runs from God's call to preach to Nineveh, is swallowed by a great fish and is spared. When Nineveh repents and God relents, Jonah is angry, and the book ends with God's question about His compassion. Jesus pointed to Jonah as a sign of His resurrection.",
    author: "Unknown; traditionally Jonah",
    written: "About 780–750 BC",
    audience: "Israel",
    themes: ["God's compassion", "Obedience", "Mission to the nations"],
    keyVerse: [4, 11],
  },
  micah: {
    theme: "Do justice, love mercy, walk humbly, and look for the ruler from Bethlehem.",
    summary:
      "Micah condemns corrupt leaders and empty worship in Israel and Judah. He also foretells a ruler born in Bethlehem who will shepherd God's people, fulfilled in Jesus.",
    author: "Micah",
    written: "About 735–700 BC",
    audience: "Judah and Israel",
    themes: ["Justice", "Judgment and hope", "The coming ruler"],
    keyVerse: [6, 8],
  },
  nahum: {
    theme: "The Lord is slow to anger, but He will judge Nineveh.",
    summary:
      "About a century after Jonah, Nineveh has returned to cruelty. Nahum announces its fall, which brings comfort to the people Assyria had oppressed.",
    author: "Nahum",
    written: "About 660–630 BC",
    audience: "Judah",
    themes: ["God's justice", "Comfort for the oppressed", "God as refuge"],
    keyVerse: [1, 7],
  },
  habakkuk: {
    theme: "Wrestling with God, and learning to live by faith.",
    summary:
      "Habakkuk asks why God allows evil, and is shocked to hear He will use Babylon to judge Judah. God answers that the righteous will live by faith, and the prophet ends in a song of joy even with nothing in the fields.",
    author: "Habakkuk",
    written: "About 610–600 BC",
    audience: "Judah",
    themes: ["Faith", "God's justice", "Joy in hardship"],
    keyVerse: [2, 4],
  },
  zephaniah: {
    theme: "The great day of the Lord, and the God who rejoices over His people.",
    summary:
      "Zephaniah warns of a coming day of judgment on Judah and the nations. He ends with a tender picture of a humble remnant and God singing over them.",
    author: "Zephaniah, a descendant of King Hezekiah",
    written: "About 640–620 BC",
    audience: "Judah in Josiah's day",
    themes: ["The day of the Lord", "Humility", "God's joy over His people"],
    keyVerse: [3, 17],
  },
  haggai: {
    theme: "Put God's house first.",
    summary:
      "The returned exiles have stopped rebuilding the temple to build their own houses. Haggai calls them to consider their ways, and they start work again with God's promise: I am with you.",
    author: "Haggai",
    written: "520 BC",
    audience: "The returned exiles in Jerusalem",
    themes: ["Priorities", "God's presence", "Future glory"],
    keyVerse: [1, 5],
  },
  zechariah: {
    theme: "Return to me, and see your King coming.",
    summary:
      "Night visions encourage the people rebuilding the temple. The later chapters look ahead to a humble king on a donkey, a pierced one mourned by Jerusalem, and the Lord reigning over all the earth.",
    author: "Zechariah",
    written: "About 520–480 BC",
    audience: "The returned exiles",
    themes: ["Repentance", "The coming King", "God's final victory"],
    keyVerse: [9, 9],
  },
  malachi: {
    theme: "A final call to faithful worship before 400 years of silence.",
    summary:
      "God's people have grown careless in worship, marriage and giving. Malachi calls them back and promises a messenger who will prepare the way, fulfilled in John the Baptist.",
    author: "Malachi",
    written: "About 450–430 BC",
    audience: "The restored community in Judah",
    themes: ["Wholehearted worship", "God's unchanging love", "The coming messenger"],
    keyVerse: [3, 1],
  },
  matthew: {
    theme: "Jesus is the promised King who fulfils the Scriptures.",
    summary:
      "Written with Jewish readers in mind, Matthew shows again and again how Jesus fulfils the Old Testament. It gathers His teaching in five great sermons, including the Sermon on the Mount, and ends with the Great Commission.",
    author: "Matthew (Levi), the tax collector and apostle",
    written: "About AD 50–70",
    audience: "Jewish Christians",
    themes: ["Fulfilment", "The kingdom of heaven", "Discipleship"],
    keyVerse: [28, 19],
  },
  mark: {
    theme: "Jesus, the Son of God, came to serve and give His life.",
    summary:
      "The shortest Gospel moves fast, showing Jesus' power over sickness, demons and nature. Its second half turns to the cross, where the Son of Man gives His life as a ransom for many.",
    author: "John Mark, drawing on Peter's preaching",
    written: "About AD 55–65",
    audience: "Gentile Christians, likely in Rome",
    themes: ["Jesus' authority", "Servanthood", "The cross"],
    keyVerse: [10, 45],
  },
  luke: {
    theme: "Jesus came to seek and to save the lost.",
    summary:
      "A careful, orderly account by a physician, Luke highlights Jesus' compassion for outsiders, the poor and women. It includes much found nowhere else, like the good Samaritan and the prodigal son.",
    author: "Luke, the physician and Paul's companion",
    written: "About AD 60–62",
    audience: "Theophilus and Gentile readers",
    themes: ["Salvation for all", "Prayer and the Spirit", "Compassion"],
    keyVerse: [19, 10],
  },
  john: {
    theme: "Believe that Jesus is the Christ, the Son of God, and have life.",
    summary:
      "John opens by declaring that the Word who was God became flesh. Through seven signs and seven “I am” sayings, he shows who Jesus is, so that readers may believe and have eternal life.",
    author: "John the apostle, “the disciple whom Jesus loved”",
    written: "About AD 85–95",
    audience: "Believers and seekers across the wider church",
    themes: ["Jesus' deity", "Belief and eternal life", "Love"],
    keyVerse: [20, 31],
  },
  acts: {
    theme: "The Spirit carries the gospel from Jerusalem to the ends of the earth.",
    summary:
      "Luke's second volume begins with Jesus' ascension and the Spirit's coming at Pentecost. The church grows through Peter's preaching and Paul's missionary journeys, reaching Rome itself.",
    author: "Luke",
    written: "About AD 62",
    audience: "Theophilus and the early church",
    themes: ["The Holy Spirit", "Witness", "The growing church"],
    keyVerse: [1, 8],
  },
  romans: {
    theme: "The gospel: God's righteousness given to all who believe.",
    summary:
      "Paul's fullest explanation of the gospel shows that all have sinned, and that God justifies sinners by grace through faith in Christ. It goes on to life in the Spirit, God's plan for Israel and the shape of a transformed life.",
    author: "Paul",
    written: "About AD 57, from Corinth",
    audience: "The church in Rome, Jews and Gentiles",
    themes: ["Justification by faith", "Life in the Spirit", "God's faithfulness"],
    keyVerse: [1, 16],
  },
  "1corinthians": {
    theme: "Christ crucified for a divided, messy church.",
    summary:
      "Paul writes to a gifted but proud church troubled by divisions, immorality, lawsuits and confusion about worship. He points them to the cross, to love (chapter 13) and to the resurrection (chapter 15).",
    author: "Paul",
    written: "About AD 55, from Ephesus",
    audience: "The church in Corinth",
    themes: ["Unity", "Love", "The resurrection"],
    keyVerse: [15, 3],
  },
  "2corinthians": {
    theme: "God's power made perfect in weakness.",
    summary:
      "Paul's most personal letter defends his ministry against critics. He shows that true ministry looks like the cross: treasure in jars of clay, comfort in affliction and strength in weakness.",
    author: "Paul",
    written: "About AD 56, from Macedonia",
    audience: "The church in Corinth",
    themes: ["Strength in weakness", "Reconciliation", "Generosity"],
    keyVerse: [12, 9],
  },
  galatians: {
    theme: "Freedom in Christ: saved by grace, not by the law.",
    summary:
      "Some were teaching Gentile believers that they must be circumcised and keep the law to be right with God. Paul answers that we are justified by faith in Christ alone and live by the Spirit in freedom.",
    author: "Paul",
    written: "About AD 48–55",
    audience: "Churches in Galatia",
    themes: ["Justification by faith", "Freedom", "Life in the Spirit"],
    keyVerse: [2, 20],
  },
  ephesians: {
    theme: "Every spiritual blessing in Christ, and a life worthy of the calling.",
    summary:
      "The first half celebrates what God has done: chosen, redeemed and made alive in Christ by grace, Jew and Gentile one body. The second half shows how to live it out in the church, the home and spiritual battle.",
    author: "Paul",
    written: "About AD 60–62, from prison in Rome",
    audience: "The church in Ephesus and nearby churches",
    themes: ["Grace", "The church", "Walking in love"],
    keyVerse: [2, 8],
  },
  philippians: {
    theme: "Joy in Christ, whatever the circumstances.",
    summary:
      "Written from prison, this warm thank-you letter overflows with joy. Paul holds up Christ's humility (chapter 2) as the pattern for unity and counts everything loss compared to knowing Him.",
    author: "Paul",
    written: "About AD 61–62, from prison in Rome",
    audience: "The church in Philippi",
    themes: ["Joy", "Humility", "Contentment"],
    keyVerse: [4, 4],
  },
  colossians: {
    theme: "Christ is supreme and sufficient.",
    summary:
      "Against teaching that added rules and spiritual experiences to Christ, Paul shows that all the fullness of God dwells in Him. Believers are complete in Christ and are called to set their minds on things above.",
    author: "Paul",
    written: "About AD 60–62, from prison in Rome",
    audience: "The church in Colossae",
    themes: ["Christ's supremacy", "Union with Christ", "New life"],
    keyVerse: [1, 15],
  },
  "1thessalonians": {
    theme: "Encouragement for a young church waiting for Christ's return.",
    summary:
      "Paul praises a new church for its faith under persecution and encourages them to grow in holiness. He comforts them about believers who have died: the Lord Himself will come again and raise them.",
    author: "Paul",
    written: "About AD 50–51, from Corinth",
    audience: "The church in Thessalonica",
    themes: ["Christ's return", "Holiness", "Hope"],
    keyVerse: [4, 16],
  },
  "2thessalonians": {
    theme: "Stand firm until the Lord comes.",
    summary:
      "Some thought the day of the Lord had already come. Paul corrects them, explains what must happen first and urges them to keep working faithfully rather than sit idle.",
    author: "Paul",
    written: "About AD 51–52, from Corinth",
    audience: "The church in Thessalonica",
    themes: ["Christ's return", "Perseverance", "Faithful work"],
    keyVerse: [2, 15],
  },
  "1timothy": {
    theme: "How to conduct oneself in God's household.",
    summary:
      "Paul instructs his son in the faith, Timothy, leading the church in Ephesus. He covers sound teaching, prayer, qualifications for leaders and godliness with contentment.",
    author: "Paul",
    written: "About AD 62–64",
    audience: "Timothy, in Ephesus",
    themes: ["Sound doctrine", "Church leadership", "Godliness"],
    keyVerse: [3, 15],
  },
  "2timothy": {
    theme: "Paul's last words: guard the gospel and preach the word.",
    summary:
      "Facing execution, Paul urges Timothy not to be ashamed of the gospel, to endure hardship and to hold to the Scriptures, which are breathed out by God. He has finished the race and kept the faith.",
    author: "Paul",
    written: "About AD 66–67, from prison in Rome",
    audience: "Timothy",
    themes: ["Faithfulness", "Scripture", "Endurance"],
    keyVerse: [3, 16],
  },
  titus: {
    theme: "Sound teaching that produces good works.",
    summary:
      "Paul leaves Titus to set the churches of Crete in order. He explains what leaders should be like and how God's grace trains believers to live godly lives as they wait for Christ.",
    author: "Paul",
    written: "About AD 63–65",
    audience: "Titus, in Crete",
    themes: ["Grace", "Good works", "Leadership"],
    keyVerse: [2, 11],
  },
  philemon: {
    theme: "The gospel reconciles a master and a runaway slave.",
    summary:
      "Paul sends Onesimus, a runaway slave who has become a Christian, back to his master Philemon. He asks Philemon to welcome him as a brother, a picture of how Christ changes every relationship.",
    author: "Paul",
    written: "About AD 60–62, from prison in Rome",
    audience: "Philemon and the church in his home",
    themes: ["Forgiveness", "Reconciliation", "Brotherhood in Christ"],
    keyVerse: [1, 16],
  },
  hebrews: {
    theme: "Jesus is better: the final Word, the great High Priest, the perfect sacrifice.",
    summary:
      "Writing to believers tempted to drift back, the author shows that Jesus is greater than angels, Moses and the old priesthood. His once-for-all sacrifice opens the way to God, so hold fast and run with endurance.",
    author: "Unknown; Paul, Barnabas, Apollos and others have been suggested",
    written: "Before AD 70",
    audience: "Jewish Christians under pressure",
    themes: ["Christ's supremacy", "His priesthood and sacrifice", "Persevering faith"],
    keyVerse: [4, 14],
  },
  james: {
    theme: "Faith that works.",
    summary:
      "James gives practical wisdom on trials, the tongue, favouritism, wealth and prayer. True saving faith always shows itself in a changed life.",
    author: "James, the brother of Jesus and leader of the Jerusalem church",
    written: "About AD 45–50",
    audience: "Jewish Christians scattered abroad",
    themes: ["Living faith", "Trials", "Wisdom"],
    keyVerse: [2, 17],
  },
  "1peter": {
    theme: "Living hope for God's people suffering as exiles.",
    summary:
      "Peter writes to believers facing hostility for their faith. Born again to a living hope, they are to live holy lives, follow Christ's example in suffering and trust God's faithful care.",
    author: "Peter the apostle",
    written: "About AD 62–64",
    audience: "Christians across Asia Minor",
    themes: ["Hope", "Suffering", "Holiness"],
    keyVerse: [1, 3],
  },
  "2peter": {
    theme: "Grow in grace and beware of false teachers.",
    summary:
      "In his last letter, Peter urges believers to grow in godly character, trust the Scriptures and reject false teachers. The Lord is not slow; He is patient, and His day will come.",
    author: "Peter the apostle",
    written: "About AD 65–68",
    audience: "The same believers as 1 Peter",
    themes: ["Spiritual growth", "Scripture's authority", "Christ's return"],
    keyVerse: [3, 18],
  },
  "1john": {
    theme: "Assurance: walk in the light, love one another, believe in the Son.",
    summary:
      "John writes so believers may know they have eternal life. True believers confess that Jesus came in the flesh, obey God and love one another, because God is love.",
    author: "John the apostle",
    written: "About AD 85–95",
    audience: "Churches in Asia Minor",
    themes: ["Assurance", "Love", "Truth about Jesus"],
    keyVerse: [5, 13],
  },
  "2john": {
    theme: "Walk in truth and love.",
    summary:
      "A short letter urges a church to keep loving one another and not to welcome teachers who deny that Jesus Christ came in the flesh.",
    author: "John the apostle (“the elder”)",
    written: "About AD 85–95",
    audience: "“The elect lady and her children,” likely a church",
    themes: ["Truth", "Love", "Discernment"],
    keyVerse: [1, 6],
  },
  "3john": {
    theme: "Support those who serve the truth.",
    summary:
      "John commends Gaius for his hospitality to travelling missionaries and rebukes Diotrephes, who loves to be first.",
    author: "John the apostle (“the elder”)",
    written: "About AD 85–95",
    audience: "Gaius",
    themes: ["Hospitality", "Faithfulness", "Humble leadership"],
    keyVerse: [1, 4],
  },
  jude: {
    theme: "Contend for the faith.",
    summary:
      "Jude warns against ungodly people who have slipped into the church and twisted grace into an excuse for sin. He calls believers to build themselves up and ends with a beloved doxology.",
    author: "Jude, brother of James and of Jesus",
    written: "About AD 65–80",
    audience: "Believers generally",
    themes: ["Defending the faith", "False teaching", "God's keeping power"],
    keyVerse: [1, 24],
  },
  revelation: {
    theme: "Jesus wins: the Lamb who was slain reigns forever.",
    summary:
      "John receives visions of the risen Christ, messages to seven churches and the unfolding of God's judgment on evil. It ends with a new heaven and new earth, where God dwells with His people and wipes away every tear.",
    author: "John the apostle",
    written: "About AD 95, on Patmos",
    audience: "Seven churches in Asia Minor, and the church in every age",
    themes: ["Christ's victory", "Faithful endurance", "New creation"],
    keyVerse: [21, 4],
  },
};

export function getBookIntro(bookId: string): BookIntro | undefined {
  return BOOK_INTROS[bookId];
}
