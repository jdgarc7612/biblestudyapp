/**
 * Passage context notes: the historical and cultural setting of well-loved chapters, plus a
 * word or two from the Hebrew or Greek worth noticing. Shown on the Read tab above the chapter
 * and in the study panel's Context tab.
 *
 * Drafted by Claude for Josh's review (Nov 2026). Scripture is the final standard; notes follow
 * the plain reading of the text and historic Christian (Apostles' Creed) orthodoxy, and say
 * "probably" or "likely" where history isn't certain. Edit freely; each entry is plain text.
 * Word notes use Strong's numbers that were checked against the bundled interlinear.
 */

export interface WordToNotice {
  /** Verse the word appears in. */
  v: number;
  /** Strong's number (Hebrew in the Old Testament, Greek in the New). */
  s: number;
  note: string;
}

export interface ContextNote {
  book: string;
  chapter: number;
  /** Optional verse range; the whole chapter when left out. */
  start?: number;
  end?: number;
  title: string;
  setting: string;
  words: WordToNotice[];
}

export const CONTEXT_NOTES: ContextNote[] = [
  // ── Old Testament ──────────────────────────────────────────────
  {
    book: "genesis",
    chapter: 1,
    title: "Creation, told to a people surrounded by idols",
    setting:
      "Genesis was first given to Israel, fresh out of Egypt and headed for Canaan, where the sun, moon, sea and storm were all worshiped as gods. Genesis 1 quietly overturns that world: the sun and moon are lamps God hangs in the sky, the great sea creatures are His creatures, and humans are not slaves made to feed the gods but royal image-bearers made to rule under Him. The orderly rhythm of days and the refrain \"it was good\" show a Creator who is sovereign, unhurried and good.",
    words: [
      { v: 1, s: 1254, note: "Bara, \"created\". When it means \"create\", this verb always has God as its subject. People make things; only God creates in this sense." },
      { v: 26, s: 6754, note: "Tselem, \"image\". Ancient kings set up statues of themselves to mark the lands they ruled. God places living images of Himself across the earth: every person." },
    ],
  },
  {
    book: "genesis",
    chapter: 3,
    title: "The fall, and the first promise of a Rescuer",
    setting:
      "The garden was a sanctuary where God walked with the people He made. The serpent's question (\"Did God really say?\") attacks God's word and His goodness. The result is shame, hiding, blame and exile. Yet before God pronounces judgment, He comes looking for Adam, clothes him and his wife, and promises that the woman's offspring will crush the serpent. Christians have long called verse 15 the \"first gospel\", the first announcement of Christ.",
    words: [
      { v: 15, s: 2233, note: "Zera, \"seed\" or \"offspring\". It can mean one descendant or many. The promise narrows through Abraham and David until Paul says the Seed is Christ (Galatians 3:16)." },
    ],
  },
  {
    book: "genesis",
    chapter: 12,
    title: "God calls Abram out of Ur",
    setting:
      "Abram lived around 2000 BC in Mesopotamia, in a family that served other gods (Joshua 24:2). God calls him to leave land, clan and inheritance, the three things that gave an ancient person identity and security, and go to a land he had not seen. Into a world scattered at Babel, God speaks a sevenfold promise: a nation, a name, a blessing, and through Abram blessing for all the families of the earth. That promise runs through the whole Bible to Christ.",
    words: [
      { v: 2, s: 1288, note: "Barak, \"bless\". The word appears five times in verses 2 and 3. Where Genesis 3 to 11 kept repeating curse, God now answers with blessing." },
    ],
  },
  {
    book: "genesis",
    chapter: 22,
    title: "Abraham offers Isaac on Mount Moriah",
    setting:
      "Child sacrifice was practised by some of Israel's neighbours, so God's command would have been terrible but not unheard of. What is unheard of is the ending: God stops the knife and provides a ram in Isaac's place. Abraham had already said, \"God Himself will provide the lamb\" (v. 8), and Hebrews 11:19 says he trusted God could raise Isaac from the dead. Moriah is later the site of the temple (2 Chronicles 3:1), near where God would not spare His own Son.",
    words: [
      { v: 2, s: 3173, note: "Yachid, \"only\". The same idea stands behind \"one and only Son\" in John 3:16, which many hear as an echo of this chapter." },
      { v: 14, s: 7200, note: "Ra'ah, literally \"to see\". \"The LORD will provide\" is \"the LORD will see\": God sees the need ahead of time and sees to it." },
    ],
  },
  {
    book: "exodus",
    chapter: 3,
    title: "The burning bush and the name of God",
    setting:
      "Moses had fled Egypt forty years earlier and was now an aging shepherd in the Sinai wilderness. Israel had been enslaved in Egypt for generations. Into that silence God appears in fire that does not consume the bush, says He has seen His people's misery, and sends Moses back. When Moses asks God's name, he receives the name Israel would treasure above all others, the name that tells them God is who He is, unchanging and present.",
    words: [
      { v: 14, s: 1961, note: "Hayah, \"to be\". \"I AM WHO I AM\" is built from this verb. Jesus' \"before Abraham was born, I am\" (John 8:58) draws on this moment." },
      { v: 15, s: 3068, note: "YHWH, the personal name of God, printed \"LORD\" in small capitals in most English Bibles. It appears about 6,800 times." },
    ],
  },
  {
    book: "exodus",
    chapter: 12,
    title: "The first Passover",
    setting:
      "Nine plagues had shown the gods of Egypt powerless, and Pharaoh still refused. The tenth plague fell on every household, and the only shelter was the blood of a spotless lamb on the doorframe. Israel was to eat the meal dressed for travel, and to repeat it every year so their children would ask what it meant. Jesus chose Passover to give the Lord's Supper, and Paul writes, \"Christ, our Passover lamb, has been sacrificed\" (1 Corinthians 5:7).",
    words: [
      { v: 13, s: 6452, note: "Pasach, \"pass over\". The word gives the feast its name (pesach). It carries the sense of passing by and sparing, even shielding." },
    ],
  },
  {
    book: "exodus",
    chapter: 20,
    title: "The Ten Commandments",
    setting:
      "Israel is camped at Mount Sinai, about three months after leaving Egypt. The commandments are framed like an ancient covenant between a great king and a people he has rescued: it opens with who God is and what He has done (\"who brought you out of the land of Egypt\"), and only then says how His people are to live. Obedience is a response to grace already given, not a way of earning it.",
    words: [
      { v: 7, s: 7723, note: "Shav, \"in vain\", meaning empty, worthless or false. The command reaches beyond swearing to any use of God's name that treats it as hollow." },
    ],
  },
  {
    book: "1samuel",
    chapter: 17,
    title: "David and Goliath",
    setting:
      "The Philistines held the coastal plain and pressed into Israel's hill country. The armies faced each other across the Valley of Elah, and champion combat, letting one fighter decide a battle, was an accepted custom. Saul, the tallest man in Israel, should have gone out. Instead a shepherd boy goes, armed with a sling (a deadly weapon in skilled hands) and with zeal for God's name. The point of the story is less David's courage than God's power.",
    words: [
      { v: 47, s: 4421, note: "Milchamah, \"battle\". \"The battle is the LORD's\" is the heart of the chapter: Israel's victory never rested on size or weapons." },
    ],
  },
  {
    book: "psalms",
    chapter: 23,
    title: "The LORD is my shepherd",
    setting:
      "David wrote as a man who had been a shepherd. In Judea's dry hills, green pasture and quiet water are found only because a shepherd leads the flock there, and the rod and staff protected and guided the sheep. Ancient kings were often called shepherds of their people, so David, a king himself, is saying who his King is. The psalm ends at a host's table and in the house of the LORD.",
    words: [
      { v: 6, s: 7291, note: "Radaph, usually \"pursue\" or \"chase\", often of enemies. Here God's goodness and loving devotion chase David down all his days." },
      { v: 6, s: 2617, note: "Chesed, God's covenant love: loyal, faithful kindness. The BSB usually renders it \"loving devotion\"; older Bibles say \"mercy\" or \"lovingkindness\"." },
    ],
  },
  {
    book: "psalms",
    chapter: 46,
    title: "God is our refuge",
    setting:
      "This psalm belongs to the songs of Zion, celebrating God's presence in Jerusalem. Many think it fits the night in 701 BC when the Assyrian army surrounded the city and God struck it down (2 Kings 19). The images move from a world coming apart, mountains falling into the sea, to a quiet river flowing through God's city. Martin Luther based \"A Mighty Fortress Is Our God\" on it.",
    words: [
      { v: 10, s: 7503, note: "Raphah, \"be still\": let go, stop striving, drop your hands. It is spoken to the warring nations as much as to the worried believer." },
    ],
  },
  {
    book: "psalms",
    chapter: 51,
    title: "David's prayer after his sin with Bathsheba",
    setting:
      "The title places this psalm after the prophet Nathan confronted David about his adultery with Bathsheba and the murder of her husband Uriah (2 Samuel 11 and 12). David was king, and no court in Israel would have tried him. He makes no excuses and appeals only to God's mercy. Notice that he asks not just for forgiveness but for a new heart, something only God can create.",
    words: [
      { v: 10, s: 1254, note: "Bara, the same verb as Genesis 1:1. David asks God to do a work of new creation in him, not repair what is there." },
      { v: 1, s: 4229, note: "Machah, \"blot out\": to wipe away, as writing is wiped from a scroll. David asks for his record to be erased, not just covered." },
    ],
  },
  {
    book: "psalms",
    chapter: 121,
    title: "A song for the road to Jerusalem",
    setting:
      "Psalms 120 to 134 are \"songs of ascents\", most likely sung by pilgrims walking up to Jerusalem for the yearly feasts. The road climbed through hills where shrines to other gods stood and robbers waited. The pilgrim looks at those hills and asks where help will come from, and answers: from the LORD who made the hills. The psalm promises a guard who never sleeps.",
    words: [
      { v: 4, s: 8104, note: "Shamar, \"keep\", \"guard\" or \"watch over\". It comes six times in eight verses, rendered here as \"Protector\" and \"watches over\"." },
    ],
  },
  {
    book: "psalms",
    chapter: 139,
    title: "Known completely, and loved",
    setting:
      "A psalm of David. Its first half marvels that God knows every thought and is present everywhere, even in darkness and the grave. Its second half turns to the womb, where God formed David before anyone saw him. The ending can surprise modern readers: David asks God to judge the wicked, then asks God to search his own heart. The psalm teaches God's full knowledge of us and the worth of every human life from its very beginning.",
    words: [
      { v: 13, s: 5526, note: "Sakak, \"knit together\" or \"weave\". The same root is used for covering or sheltering. God's making of a child is pictured as careful handwork." },
    ],
  },
  {
    book: "isaiah",
    chapter: 53,
    start: 1,
    end: 12,
    title: "The suffering Servant",
    setting:
      "Isaiah prophesied in Jerusalem about 740 to 680 BC. This song (52:13 to 53:12) describes a Servant of the LORD who is despised, suffers in the place of others, dies, and then is exalted and sees his offspring. Jewish readers have debated who the Servant is. The New Testament answers plainly: Jesus (Acts 8:32 to 35, 1 Peter 2:24). It was written about seven centuries before the cross.",
    words: [
      { v: 5, s: 2490, note: "Chalal, \"pierced\". The word means wounded through, often fatally. Read beside John 19:34 and Zechariah 12:10." },
      { v: 11, s: 6663, note: "Tsadaq, \"justify\": to declare righteous. The Servant bears iniquities so that many are counted righteous, the heart of Paul's gospel in Romans." },
    ],
  },
  // ── Gospels ────────────────────────────────────────────────────
  {
    book: "matthew",
    chapter: 5,
    title: "The Sermon on the Mount begins",
    setting:
      "Jesus teaches on a hillside in Galilee, likely near Capernaum, early in His ministry. Galilee was ruled by Herod Antipas under Rome, and many hoped for a Messiah who would throw Rome out. Jesus sits, as rabbis did to teach, and describes a different kingdom, blessing the poor in spirit and the mourners. As Moses received the law on a mountain, Jesus speaks from one, and claims authority to say what the law truly means: \"But I tell you.\"",
    words: [
      { v: 3, s: 3107, note: "Makarios, \"blessed\". Not a feeling of happiness but a state of being favoured by God, often surprising, as here." },
      { v: 48, s: 5046, note: "Teleios, \"perfect\": complete, whole, mature. Jesus calls His people to a love as whole as the Father's, including enemies." },
    ],
  },
  {
    book: "matthew",
    chapter: 6,
    title: "Secret devotion and the Lord's Prayer",
    setting:
      "Giving, prayer and fasting were the three pillars of Jewish devotion, and all three could be done for show. Some trumpeted their gifts or prayed long prayers on street corners. Jesus does not cancel these practices; He moves them out of public view and in front of \"your Father, who sees in secret\". He then teaches His disciples to pray, and turns to money and worry, which compete with God for the heart.",
    words: [
      { v: 12, s: 3783, note: "Opheilema, \"debts\". Jesus' everyday language for sin was a debt owed. Luke's version says \"sins\" for our side and keeps \"indebted\" for others." },
      { v: 34, s: 3309, note: "Merimnao, \"worry\", to be pulled in different directions. The same word is used of Martha (Luke 10:41)." },
    ],
  },
  {
    book: "matthew",
    chapter: 7,
    title: "Two ways, two foundations",
    setting:
      "The sermon ends with choices: the narrow and wide gates, good and bad fruit, and two builders. In Galilee, winter rain can turn a dry wadi into a flash flood in minutes, so a house on sand in a dry riverbed looked fine until the storm came. The crowd was amazed because Jesus taught as one who had authority, not quoting earlier teachers as the scribes did.",
    words: [
      { v: 24, s: 5429, note: "Phronimos, \"wise\": practical, sensible wisdom. In Jesus' teaching the wise person is the one who hears and does." },
    ],
  },
  {
    book: "luke",
    chapter: 2,
    title: "The birth of Jesus in Bethlehem",
    setting:
      "Caesar Augustus ruled the Roman world and was hailed in inscriptions as a \"savior\" who brought peace and \"good news\". Luke sets Jesus' birth inside Augustus's census and then has angels use those very words for a baby in a manger. The news comes first to shepherds, workers of low standing, near Bethlehem, the town of David. A feeding trough is the first sign that this King has come humbly.",
    words: [
      { v: 10, s: 2097, note: "Euangelizo, \"bring good news\", the verb behind \"gospel\" and \"evangelism\". Imperial announcements used it; the angel claims it for Christ." },
      { v: 11, s: 4990, note: "Soter, \"Savior\". A title Roman emperors claimed for themselves, given here to Jesus." },
    ],
  },
  {
    book: "luke",
    chapter: 15,
    title: "Lost and found",
    setting:
      "Tax collectors and \"sinners\" crowd around Jesus, and the Pharisees grumble that He eats with them. Sharing a table meant acceptance. Jesus answers with three stories: a lost sheep, a lost coin and a lost son. A son asking for his inheritance early was like wishing his father dead, and running was undignified for an older man. The father runs anyway. The story ends with the older brother outside, so it is aimed at the grumblers too.",
    words: [
      { v: 20, s: 4697, note: "Splanchnizomai, \"filled with compassion\", from the word for the inner organs: a gut-deep love. In the Gospels it describes only Jesus, or characters in His parables who show God's kind of mercy." },
    ],
  },
  {
    book: "john",
    chapter: 1,
    title: "The Word who became flesh",
    setting:
      "John wrote late in the first century, probably from Ephesus, to readers both Jewish and Greek. He opens with \"In the beginning\", the first words of Genesis. Jews knew God created by His word; Greek thinkers spoke of the Logos as the reason behind the world. John says this Word is a person, was with God and was God, and became a human being. The second half of the chapter shows the first disciples meeting Him.",
    words: [
      { v: 1, s: 3056, note: "Logos, \"Word\": a spoken word, message or reason. John uses a term both his Jewish and Greek readers knew, then fills it with Jesus." },
      { v: 14, s: 4637, note: "Skenoo, \"made His dwelling\", literally \"pitched His tent\". It recalls the tabernacle, where God's glory lived among Israel." },
    ],
  },
  {
    book: "john",
    chapter: 3,
    title: "Nicodemus comes at night",
    setting:
      "Nicodemus was a Pharisee and a member of the Sanhedrin, Jerusalem's ruling council, a respected teacher of Israel. He comes at night, perhaps to avoid being seen. Jesus tells him that even he must be born again. The bronze serpent (v. 14) recalls Numbers 21, when Israelites dying of snakebite looked to a raised serpent and lived. Nicodemus appears again later, defending Jesus (7:50) and helping bury Him (19:39).",
    words: [
      { v: 3, s: 509, note: "Anothen means both \"again\" and \"from above\". Nicodemus hears only \"again\"; Jesus means a new birth that comes from God." },
      { v: 16, s: 3439, note: "Monogenes, \"one and only\": unique, one of a kind. It marks the Son as unlike any other." },
    ],
  },
  {
    book: "john",
    chapter: 4,
    title: "The woman at the well",
    setting:
      "Jews and Samaritans had been divided for centuries over race and worship; the Samaritans worshiped on Mount Gerizim, not in Jerusalem. Most Jews travelling north went around Samaria. Jesus goes through, sits at Jacob's well at noon, and speaks to a Samaritan woman alone, something a rabbi would normally never do. Her coming at midday, when no one else drew water, may hint that she was avoided. She becomes the first to bring her town to Him.",
    words: [
      { v: 10, s: 2198, note: "Zao, \"living\". \"Living water\" was everyday language for flowing spring water. Jesus uses it for the life the Spirit gives (7:38 to 39)." },
    ],
  },
  {
    book: "john",
    chapter: 6,
    start: 22,
    end: 71,
    title: "The bread of life",
    setting:
      "The day after Jesus fed five thousand, the crowd follows Him to Capernaum wanting more bread. It is near Passover (6:4), when Israel remembered the manna God gave in the wilderness. The crowd asks for a sign like the manna; Jesus says He is the true bread from heaven. Many disciples leave over this teaching, and Peter answers, \"Lord, to whom would we go? You have the words of eternal life.\"",
    words: [
      { v: 35, s: 740, note: "Artos, \"bread\", the basic food of every meal. \"I am the bread of life\" is the first of seven \"I am\" sayings in John." },
    ],
  },
  {
    book: "john",
    chapter: 10,
    title: "The good shepherd",
    setting:
      "Jesus speaks in Jerusalem near the Feast of Dedication (Hanukkah, 10:22). Israel's leaders had often been called shepherds, and the prophets condemned the bad ones (Ezekiel 34) while promising that God Himself would shepherd His people. Sheep were kept in a walled pen at night, and some shepherds slept across the entrance as the door. Jesus says He is both the door and the shepherd who lays down His life.",
    words: [
      { v: 11, s: 2570, note: "Kalos, \"good\": not only morally good but beautiful, noble, the real thing as opposed to the hired hand." },
    ],
  },
  {
    book: "john",
    chapter: 11,
    title: "Lazarus raised from the dead",
    setting:
      "Bethany was a village about two miles from Jerusalem, home to Mary, Martha and Lazarus. A Jewish tradition held that the soul lingered near the body for three days, so by the fourth day death was final beyond doubt. Mourners filled the house. Jesus weeps at the tomb, then calls Lazarus out. This miracle leads the council to plot His death, so the raising of Lazarus leads straight to the cross.",
    words: [
      { v: 25, s: 386, note: "Anastasis, \"resurrection\". Martha believed in a resurrection at the last day; Jesus says it is a person, standing in front of her." },
      { v: 33, s: 1690, note: "Embrimaomai, \"deeply moved\". The word can carry indignation, a snort of anger. Jesus is not only sad but angry at death itself." },
    ],
  },
  {
    book: "john",
    chapter: 20,
    title: "The empty tomb",
    setting:
      "It is the first day of the week, and Jesus has been buried in a rock-cut tomb sealed with a heavy stone. Mary Magdalene is the first to see the risen Lord, at a time when a woman's testimony carried little weight in court. No one inventing the story would have written it this way. The chapter moves from the empty tomb, to Mary, to the disciples, to doubting Thomas, whose confession is the high point of the Gospel.",
    words: [
      { v: 28, s: 2962, note: "Kyrios, \"Lord\". In the Greek Old Testament it stands for God's name YHWH. Thomas calls Jesus \"my Lord and my God\", and Jesus accepts it." },
    ],
  },
  // ── Acts and letters ───────────────────────────────────────────
  {
    book: "acts",
    chapter: 2,
    title: "Pentecost",
    setting:
      "Pentecost was the harvest feast fifty days after Passover, and Jerusalem was full of Jewish pilgrims from across the Roman world. In Jewish tradition it was also linked with the giving of the law at Sinai. The Spirit comes with wind and fire, the disciples speak in the visitors' own languages, and Peter preaches the risen Christ. About three thousand believe, and the first church begins to live as a family.",
    words: [
      { v: 38, s: 3340, note: "Metanoeo, \"repent\": a change of mind that turns the whole life around, not only feeling sorry." },
      { v: 42, s: 2842, note: "Koinonia, \"fellowship\": sharing life in common. It covers worship together, shared meals and shared goods." },
    ],
  },
  {
    book: "romans",
    chapter: 1,
    title: "The gospel and a world that turned from God",
    setting:
      "Paul wrote to the church in Rome around AD 57, from Corinth, before he had ever visited. The church was a mix of Jewish and Gentile believers in the capital of an empire full of temples and idols. Paul introduces himself and his gospel, then explains why everyone needs it: people have exchanged the glory of God for images, and God has given them over to what they chose.",
    words: [
      { v: 16, s: 2098, note: "Euangelion, \"gospel\": good news, the kind announced when a king won a victory or an heir was born." },
      { v: 17, s: 1343, note: "Dikaiosyne, \"righteousness\". Paul means the right standing God gives to those who believe, as well as God's own justice." },
    ],
  },
  {
    book: "romans",
    chapter: 3,
    title: "Justified as a gift",
    setting:
      "Paul has shown that Gentiles and Jews alike stand guilty before God. Now he reaches the center of the letter: a righteousness from God, apart from the law, received through faith in Jesus. He draws on three pictures his readers knew well: the law court (justified), the slave market (redemption) and the temple (atoning sacrifice).",
    words: [
      { v: 24, s: 1344, note: "Dikaioo, \"justify\": a legal verdict, to declare righteous. It is a declaration about the believer's standing, given freely by grace." },
      { v: 25, s: 2435, note: "Hilasterion, \"atoning sacrifice\" (older Bibles, \"propitiation\"). In the Greek Old Testament it names the mercy seat on the ark, where blood was sprinkled on the Day of Atonement." },
    ],
  },
  {
    book: "romans",
    chapter: 5,
    title: "Peace with God",
    setting:
      "Having shown that we are justified by faith, Paul turns to what follows: peace with God, access to His grace, and hope that does not disappoint, even in suffering. Then he steps back to the widest view of history: Adam brought sin and death to all, and Christ, the new head of humanity, brings righteousness and life. God's love is shown in that Christ died for us while we were still sinners.",
    words: [
      { v: 1, s: 1515, note: "Eirene, \"peace\". Paul means first a settled relationship, the end of hostility with God, and from it peace of heart." },
      { v: 8, s: 4921, note: "Synistemi, \"proves\" or \"demonstrates\". The tense is present: the cross keeps on showing God's love." },
    ],
  },
  {
    book: "romans",
    chapter: 8,
    title: "Life in the Spirit",
    setting:
      "After the struggle with sin in chapter 7, Paul breaks out into one of the Bible's great chapters. Adoption was common in the Roman world: an adopted son, often an adult, received a new name, his debts were cancelled, and he became a full heir. Paul uses that picture for the believer, who now calls God \"Abba\". The chapter ends with nothing in all creation able to separate us from God's love in Christ.",
    words: [
      { v: 1, s: 2631, note: "Katakrima, \"condemnation\": the sentence handed down, and the penalty that follows. For those in Christ there is none." },
      { v: 15, s: 5, note: "Abba, Aramaic for \"Father\", the word Jesus Himself used in prayer (Mark 14:36). Paul keeps it untranslated." },
    ],
  },
  {
    book: "romans",
    chapter: 12,
    title: "A living sacrifice",
    setting:
      "Romans turns here from what God has done (chapters 1 to 11) to how His people should live, and \"therefore\" ties the two together. Paul's readers knew temples where animals were offered and killed every day. He calls them to offer themselves, alive, and to let God change their minds rather than be squeezed into the pattern of the age. The rest of the chapter is about life in the church and love for enemies.",
    words: [
      { v: 1, s: 2378, note: "Thysia, \"sacrifice\", the usual word for a temple offering. Paul's twist is \"living\": an offering that keeps on giving itself." },
      { v: 2, s: 3339, note: "Metamorphoo, \"be transformed\", the word used for Jesus' transfiguration. It is passive: God does the transforming." },
    ],
  },
  {
    book: "1corinthians",
    chapter: 13,
    title: "The way of love",
    setting:
      "Corinth was a wealthy, proud port city, and the church there prized impressive spiritual gifts, especially speaking in tongues, and was split into factions. Chapters 12 to 14 deal with gifts in worship. Chapter 13 is not a wedding reading first of all; it is a correction to a gifted but loveless church. Corinth was known for its bronze mirrors, which gave a dim image, hence \"we see but a dim reflection\".",
    words: [
      { v: 4, s: 26, note: "Agape, \"love\". Christians made this rarer Greek word their own for the self-giving love God shows in Christ." },
      { v: 12, s: 135, note: "Ainigma, \"dim reflection\", literally a riddle (our \"enigma\"). Now we know truly but partly; then fully." },
    ],
  },
  {
    book: "1corinthians",
    chapter: 15,
    title: "The resurrection",
    setting:
      "Some in Corinth, shaped by Greek thought that saw the body as worthless, said there is no resurrection of the dead. Paul answers with the gospel he received, an early creed (vv. 3 to 5), and lists eyewitnesses, most still alive some twenty years after the events, who could be asked. If Christ is not raised, faith is futile. But He has been raised, and His resurrection is the pledge of ours.",
    words: [
      { v: 20, s: 536, note: "Aparche, \"firstfruits\": the first sheaf of harvest, offered to God as a pledge of the whole crop. Christ's resurrection guarantees the harvest to come." },
    ],
  },
  {
    book: "galatians",
    chapter: 5,
    title: "Freedom and the fruit of the Spirit",
    setting:
      "Teachers had come to the Galatian churches insisting that Gentile believers be circumcised and keep the law of Moses to be fully accepted. Paul answers that this would trade freedom in Christ for slavery. But freedom is not permission to indulge the flesh. The answer to both legalism and license is to walk by the Spirit, who produces a character the law could never create.",
    words: [
      { v: 22, s: 2590, note: "Karpos, \"fruit\", singular. The nine qualities are one harvest grown by the Spirit, not separate achievements." },
      { v: 16, s: 4043, note: "Peripateo, \"walk\": a common Jewish picture for how one lives, step by step." },
    ],
  },
  {
    book: "ephesians",
    chapter: 2,
    title: "Saved by grace, brought near",
    setting:
      "Paul wrote this letter from prison, probably in Rome around AD 60, to churches in and around Ephesus. In the Jerusalem temple a stone barrier kept Gentiles out of the inner courts, with signs warning of death to any who passed. Paul says Christ has torn down that dividing wall: Jews and Gentiles are now one new people and one temple where God lives by His Spirit.",
    words: [
      { v: 8, s: 5485, note: "Charis, \"grace\": favor freely given. In the ancient world it could describe a patron's gift; God gives without any claim on our side." },
      { v: 10, s: 4161, note: "Poiema, \"workmanship\", the source of our word \"poem\": something carefully made. Good works are the result of salvation, not its cause." },
    ],
  },
  {
    book: "philippians",
    chapter: 2,
    title: "The mind of Christ",
    setting:
      "Paul writes from prison to a church he loved, in Philippi, a Roman colony proud of status and honor. Some there were quarrelling. Paul's answer is Jesus: verses 6 to 11 may be an early Christian hymn. In a culture that climbed for honor, Christ stepped down, from equality with God to the death of a slave on a cross, and God has exalted Him.",
    words: [
      { v: 6, s: 3444, note: "Morphe, \"form\": the outward expression of what something truly is. Christ was truly God and took the form of a servant." },
      { v: 7, s: 2758, note: "Kenoo, \"emptied\". He did not stop being God; He set aside His rights and glory by taking on humanity (\"taking the form of a servant\")." },
    ],
  },
  {
    book: "colossians",
    chapter: 1,
    title: "Christ above all",
    setting:
      "Colossae was a small town in the Lycus valley (modern Turkey). False teaching there mixed Jewish rules, angel worship and claims of secret knowledge, suggesting Christ was not enough. Paul answers with one of the New Testament's highest descriptions of Jesus: the visible image of the invisible God, the One through whom and for whom all things were made, and the One who reconciled all things by His blood.",
    words: [
      { v: 15, s: 4416, note: "Prototokos, \"firstborn\". In Scripture it often means first in rank and heir (Psalm 89:27), not first created. Verse 16 says all things were made through Him." },
      { v: 15, s: 1504, note: "Eikon, \"image\" (our \"icon\"). Christ is the exact visible likeness of God, echoing Genesis 1:26." },
    ],
  },
  {
    book: "hebrews",
    chapter: 11,
    title: "The hall of faith",
    setting:
      "Hebrews was written to Jewish Christians who had suffered loss and were tempted to turn back from Christ to the old ways. Chapter 11 lists Old Testament believers who trusted God without seeing the promise fulfilled, many of them through suffering. The point comes in 12:1 and 2: they are a cloud of witnesses, so run with endurance, looking to Jesus.",
    words: [
      { v: 1, s: 5287, note: "Hypostasis, \"assurance\": a firm foundation, and in business papers a title deed. Faith holds the deed to what God has promised." },
    ],
  },
  {
    book: "revelation",
    chapter: 21,
    title: "All things new",
    setting:
      "John received Revelation in exile on the island of Patmos, probably in the AD 90s, when churches in Asia faced pressure to honor Caesar. The book ends not with souls escaping the world but with a new heaven and a new earth, and the holy city coming down. Everything lost in Genesis 3 is restored: God dwells with His people, and death, mourning and pain are gone.",
    words: [
      { v: 3, s: 4633, note: "Skene, \"dwelling place\", literally \"tent\", the word for the tabernacle. What began when the Word \"pitched His tent\" among us (John 1:14) is complete." },
      { v: 5, s: 2537, note: "Kainos, \"new\": new in kind and quality, not merely recent. God renews His creation rather than discarding it." },
    ],
  },
];

/** The note shown above a chapter, if any (the first note that starts in that chapter). */
export function contextNoteForChapter(bookId: string, chapter: number) {
  return CONTEXT_NOTES.find((n) => n.book === bookId && n.chapter === chapter) ?? null;
}

/** The note covering a verse range, if any. */
export function contextNoteFor(bookId: string, chapter: number, start: number, end = start) {
  return (
    CONTEXT_NOTES.find(
      (n) =>
        n.book === bookId &&
        n.chapter === chapter &&
        (n.start ?? 1) <= end &&
        (n.end ?? 999) >= start
    ) ?? null
  );
}
