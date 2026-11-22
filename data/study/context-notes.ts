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

import { CONTEXT_NOTES_GOSPELS_ACTS } from "./context-notes-gospels-acts";
import { CONTEXT_NOTES_PAUL } from "./context-notes-paul";

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
  // ── Added Nov 20, 2026: one key chapter for each book not yet covered, plus Psalm 1,
  // Isaiah 40, Matthew 28, Luke 24 and John 14. Drafts for Josh's review. ──
  {
    book: "leviticus",
    chapter: 16,
    title: "The Day of Atonement",
    setting:
      "Once a year, on the Day of Atonement (Yom Kippur), Israel's high priest passed behind the curtain into the Most Holy Place with the blood of a sacrifice. Two goats carried the meaning: one died as a sin offering, and over the other the priest confessed the people's sins before it was led away into the wilderness. Sin was both paid for and removed. Hebrews 9 and 10 show Jesus as the High Priest who entered God's presence once for all with His own blood.",
    words: [
      { v: 8, s: 5799, note: "Azazel, \"scapegoat\". The meaning is debated: \"the goat that goes away\" or a name for the desolate wilderness. Either way, the picture is sin carried far off (Psalm 103:12)." },
      { v: 30, s: 3722, note: "Kaphar, \"make atonement\": to cover, to ransom, to wipe clean. It is the root of Kippur, the day's name." },
    ],
  },
  {
    book: "numbers",
    chapter: 6,
    title: "The blessing God told the priests to speak",
    setting:
      "Israel was still camped at Sinai, about to set out through the wilderness. After the Nazirite vow (verses 1 to 21), God gives Aaron the words to bless the people, and says that by them the priests \"put My name\" on Israel (verse 27). Silver amulets found in Jerusalem, from about 600 BC, carry these very lines, the oldest known fragments of biblical text. They have been spoken over God's people ever since.",
    words: [
      { v: 24, s: 8104, note: "Shamar, \"keep\": to guard, as a watchman guards a city or a shepherd his flock." },
      { v: 26, s: 7965, note: "Shalom, \"peace\". More than calm: wholeness, everything as God made it to be." },
    ],
  },
  {
    book: "deuteronomy",
    chapter: 6,
    title: "The Shema: love the Lord with everything",
    setting:
      "Deuteronomy is Moses' farewell preaching on the plains of Moab, as a new generation prepares to enter Canaan, a land of many gods. Verses 4 and 5 (the Shema, from its first word \"Hear\") became Israel's daily confession, and Jesus called them the greatest commandment (Mark 12:29 and 30). The chapter is about passing faith on: God's words on the heart, talked about at home, on the road, at bedtime and in the morning.",
    words: [
      { v: 4, s: 259, note: "Echad, \"one\". The LORD alone is God, against all the gods of the nations. The same word can describe a unity, as when man and wife become \"one flesh\" (Genesis 2:24)." },
      { v: 5, s: 3966, note: "Me'od, \"strength\", literally \"muchness\" or \"very\": love God with everything you have." },
    ],
  },
  {
    book: "joshua",
    chapter: 1,
    title: "Be strong and courageous",
    setting:
      "Moses is dead, and Joshua, his assistant for forty years, must lead Israel across the Jordan into a land of walled cities. Three times God tells him to be strong and courageous (verses 6, 7 and 9). The courage does not come from Joshua's ability but from God's promise, \"I will be with you\", and from keeping God's word close.",
    words: [
      { v: 8, s: 1897, note: "Hagah, \"meditate\": to murmur or mutter. Ancient readers read aloud, so meditating meant turning God's words over under your breath, day and night." },
      { v: 6, s: 2388, note: "Chazaq, \"be strong\": to grip, hold fast, be firm." },
    ],
  },
  {
    book: "judges",
    chapter: 2,
    title: "The cycle of the judges",
    setting:
      "After Joshua's generation dies, Israel forgets the LORD and serves the Baals of Canaan. Chapter 2 lays out a cycle the rest of the book repeats: Israel sins, enemies oppress them, they cry out, God raises up a deliverer, there is rest, and then they fall back further. The book ends with the refrain \"everyone did what was right in his own eyes\" (21:25), showing the need for a faithful King.",
    words: [
      { v: 16, s: 8199, note: "Shaphat, \"judges\". Not mainly courtroom judges, but leaders God raised up to rescue His people and set things right." },
    ],
  },
  {
    book: "ruth",
    chapter: 1,
    title: "Loyal love in a dark time",
    setting:
      "Ruth is set \"in the days when the judges ruled\", a time of chaos. Famine drives Naomi's family to Moab, Israel's old enemy, where her husband and sons die. Ruth, a Moabite widow, refuses to leave her. Her pledge (verses 16 and 17) is a confession of faith in Israel's God. This foreign woman will become the great-grandmother of King David, and appears in Jesus' family line (Matthew 1:5).",
    words: [
      { v: 8, s: 2617, note: "Chesed, \"loving devotion\": loyal, covenant love that goes beyond duty. It is the key word of the whole book." },
      { v: 16, s: 7725, note: "Shuv, \"turn\" or \"return\". It appears again and again in this chapter: Naomi returns home, and Ruth turns to the LORD." },
    ],
  },
  {
    book: "2samuel",
    chapter: 7,
    title: "God promises David a forever King",
    setting:
      "David is settled in Jerusalem and wants to build a house (a temple) for God. God turns it around: He will build David a house, a dynasty, and establish his throne forever. This covenant becomes the backbone of Israel's hope for the Messiah, the Son of David. The angel echoes it to Mary: \"He will reign over the house of Jacob forever\" (Luke 1:32 and 33).",
    words: [
      { v: 16, s: 1004, note: "Bayit, \"house\". The chapter plays on its meanings: a palace, a temple, and a royal family line." },
      { v: 16, s: 5769, note: "Olam, \"forever\": an age without end. No ordinary dynasty lasts forever; only Christ fulfills this." },
    ],
  },
  {
    book: "1kings",
    chapter: 18,
    title: "Elijah and the prophets of Baal",
    setting:
      "King Ahab and his foreign wife Jezebel had made Baal worship Israel's official religion. Baal was the Canaanite storm god, believed to send rain and lightning. So the three-year drought (verse 1) and the fire from heaven on Mount Carmel are a direct contest: who really rules the sky? The LORD answers by fire, and the people fall down crying, \"The LORD, He is God!\"",
    words: [
      { v: 21, s: 6452, note: "Pasach, \"waver\": to limp or hobble. The same verb describes Baal's prophets \"limping\" around their altar in verse 26." },
    ],
  },
  {
    book: "2kings",
    chapter: 5,
    title: "Naaman is healed",
    setting:
      "Naaman commands the army of Aram (Syria), Israel's enemy, and has a skin disease. A captured Israelite servant girl points him to God's prophet. Elisha does not even come out; he sends word to wash seven times in the muddy Jordan. Healing comes through humble obedience, not payment or ceremony. Jesus pointed to Naaman as God's grace reaching outsiders (Luke 4:27).",
    words: [
      { v: 14, s: 2891, note: "Taher, \"clean\": the word for ritual purity. Naaman is made whole and fit to worship." },
      { v: 14, s: 5288, note: "Na'ar, \"child\" or \"young boy\". The proud general ends up with skin like a little boy's, healed through a little girl's faith (verse 2)." },
    ],
  },
  {
    book: "1chronicles",
    chapter: 29,
    title: "David's last prayer",
    setting:
      "Chronicles was written after the exile, to remind a small, struggling people of God's promises to David and of true worship. Here the aging David gives his own treasure for the temple Solomon will build, and the people give gladly. His prayer is one of the Bible's great doxologies, and verse 11 echoes in the ending many Christians pray after the Lord's Prayer: \"for Yours is the kingdom and the power and the glory\".",
    words: [
      { v: 11, s: 1420, note: "Gedullah, \"greatness\". The first of five words David piles up to praise God's majesty." },
      { v: 14, s: 3027, note: "Yad, \"hand\": \"from Your own hand we have given You.\" Every gift to God was His first." },
    ],
  },
  {
    book: "2chronicles",
    chapter: 7,
    title: "If My people humble themselves",
    setting:
      "Solomon has finished the temple, and fire falls from heaven at its dedication. That night God answers Solomon's prayer. Verse 14 was spoken to Israel under the covenant, tied to their land and temple, but it shows a lasting pattern of how God meets His people when they return to Him: humility, prayer, seeking His face and turning from sin.",
    words: [
      { v: 14, s: 3665, note: "Kana, \"humble themselves\": to bow low, to be brought down." },
      { v: 14, s: 7725, note: "Shuv, \"turn\": the Old Testament's main word for repentance, a real change of direction." },
    ],
  },
  {
    book: "ezra",
    chapter: 7,
    title: "Ezra sets his heart on God's word",
    setting:
      "About sixty years after the temple was rebuilt, Ezra, a priest and scribe, leads a second group home from Babylon (around 458 BC) with the Persian king's blessing. Verse 10 sums up his life in three steps that are still a model for any student of Scripture: study it, live it, then teach it.",
    words: [
      { v: 10, s: 1875, note: "Darash, \"study\": to seek or inquire. The same word is used for seeking God Himself." },
      { v: 10, s: 3925, note: "Lamad, \"teach\". Ezra taught what he had first learned and practiced." },
    ],
  },
  {
    book: "nehemiah",
    chapter: 8,
    title: "The people hear the Law read",
    setting:
      "Jerusalem's walls are rebuilt (around 445 BC), and the people gather at the Water Gate. Ezra reads the Law from early morning until midday while Levites help everyone understand. The people weep as they hear how far they have fallen, but they are told this is a holy day: go and celebrate, because the joy of the LORD is their strength.",
    words: [
      { v: 8, s: 6567, note: "Parash, \"explaining it\": making it distinct and clear. It may include translating the Hebrew into Aramaic, the everyday language many now spoke." },
      { v: 10, s: 2304, note: "Chedvah, \"joy\". A rare word for gladness; their strength is the joy God gives." },
    ],
  },
  {
    book: "esther",
    chapter: 4,
    title: "For such a time as this",
    setting:
      "The story takes place in the Persian capital Susa under King Xerxes (Ahasuerus), in the 480s or 470s BC. Haman has arranged a decree to wipe out every Jew in the empire. Esther, the queen, has hidden that she is Jewish, and entering the king's presence uninvited could mean death. God is never named in Esther, yet His hand is behind every \"coincidence\".",
    words: [
      { v: 14, s: 2790, note: "Charash, \"remain silent\". Silence is not an option; Mordecai trusts deliverance will come regardless." },
      { v: 14, s: 6256, note: "Et, \"time\": a fitting moment or season. Esther's position is no accident." },
    ],
  },
  {
    book: "job",
    chapter: 38,
    title: "God answers Job from the storm",
    setting:
      "For 35 chapters Job and his friends have argued about why he suffers. The friends say he must have sinned; Job demands a hearing. Now the LORD speaks. He never explains the heavenly scene of chapters 1 and 2. Instead He shows Job the wonders of creation, which Job did not make and cannot run. Seeing God Himself is the answer Job needed (42:5).",
    words: [
      { v: 1, s: 5591, note: "Se'arah, \"whirlwind\": a storm. God often appears in storm and cloud, showing His power and nearness." },
      { v: 4, s: 3245, note: "Yasad, \"laid the foundations\": the language of a master builder setting a cornerstone." },
    ],
  },
  {
    book: "psalms",
    chapter: 1,
    title: "Two ways to live",
    setting:
      "Psalm 1 is the gateway to the whole book of Psalms. It sets two paths side by side: the person rooted in God's word, like a tree beside streams, and the wicked, blown away like chaff. Its opening word \"blessed\" is matched by the close of Psalm 2, framing all 150 psalms as the way to true happiness.",
    words: [
      { v: 1, s: 835, note: "Ashre, \"blessed\": happy, flourishing, how good life is for this person." },
      { v: 2, s: 1897, note: "Hagah, \"meditates\": to murmur over and over. Scripture read slowly, aloud, and returned to." },
    ],
  },
  {
    book: "proverbs",
    chapter: 3,
    title: "Trust in the Lord with all your heart",
    setting:
      "Proverbs collects wisdom mostly from King Solomon, written as a father teaching his son how to live well in God's world. Its starting point is \"the fear of the LORD\" (1:7). Chapter 3 shows what that looks like: trusting God rather than your own cleverness, honoring Him with your wealth, and accepting His discipline as a father's love.",
    words: [
      { v: 5, s: 982, note: "Batach, \"trust\": to rely on, to feel safe leaning your full weight on someone." },
      { v: 6, s: 3474, note: "Yashar, \"make straight\": to level or clear a road. God removes what blocks the way." },
    ],
  },
  {
    book: "ecclesiastes",
    chapter: 3,
    title: "A time for everything",
    setting:
      "Ecclesiastes is the reflection of \"the Teacher\", traditionally identified as Solomon, on life \"under the sun\", seen without God's perspective. The poem in verses 2 to 8 sets out 14 pairs of opposites that fill every life. We cannot control the seasons, but God has made everything beautiful in its time, and has put a longing for eternity in us that nothing temporary satisfies.",
    words: [
      { v: 1, s: 6256, note: "Et, \"time\": a fitting moment. The word appears 29 times in verses 1 to 8." },
      { v: 11, s: 5769, note: "Olam, \"eternity\": a sense of forever. Humans know there is more than the present, even when they cannot see it." },
    ],
  },
  {
    book: "songofsongs",
    chapter: 8,
    title: "Love strong as death",
    setting:
      "The Song is love poetry celebrating the love of a bride and groom, God's good gift of marriage. Chapter 8 reaches its high point: love that is as strong as death and cannot be bought. Jews and Christians have also long read the Song as a picture of God's love for His people, and of Christ and His church (Ephesians 5:25 to 32).",
    words: [
      { v: 6, s: 2368, note: "Chotam, \"seal\": a signet worn on the hand or on a cord at the chest, marking identity and ownership." },
      { v: 6, s: 7957, note: "Shalhevetyah, \"the fiercest blaze\". Its ending may be the short form of God's name, Yah: \"a flame of the LORD\"." },
    ],
  },
  {
    book: "isaiah",
    chapter: 40,
    title: "Comfort, comfort My people",
    setting:
      "Isaiah 40 turns from judgment to comfort. It speaks to God's people in exile in Babylon: their hard service is over and their sin is paid for. A voice cries out to prepare the LORD's way in the wilderness, a voice all four Gospels identify as John the Baptist. Against tired, discouraged people the chapter sets God's greatness: He measures the oceans in His hand, and gives strength to the weary.",
    words: [
      { v: 8, s: 1697, note: "Davar, \"word\": a spoken word, but also a thing done. What God says stands." },
      { v: 31, s: 6960, note: "Qavah, \"wait\": to wait with hope and expectation, not to sit idle." },
    ],
  },
  {
    book: "jeremiah",
    chapter: 31,
    title: "The new covenant",
    setting:
      "Jeremiah prophesied for about forty years as Judah slid toward its destruction by Babylon in 586 BC. Chapters 30 to 33 are a \"book of comfort\" in the middle of that ruin. Here God promises a new covenant: His law written on hearts, every one of His people knowing Him, and sins forgiven. Jesus took up these words at the Last Supper (Luke 22:20), and Hebrews 8 quotes them in full.",
    words: [
      { v: 31, s: 2319, note: "Chadash, \"new\": fresh, renewed. Not a different God, but a new way of belonging to Him." },
      { v: 33, s: 3820, note: "Lev, \"heart\": the center of thought, will and desire, not just feelings." },
    ],
  },
  {
    book: "lamentations",
    chapter: 3,
    title: "His mercies are new every morning",
    setting:
      "Lamentations mourns Jerusalem's fall to Babylon in 586 BC: the temple burned, the city starving, the people exiled. Its five poems are carefully built acrostics (each line or stanza starts with the next letter of the Hebrew alphabet). Chapter 3, the center of the book, is a triple acrostic, and at its very center the grief breaks open into hope.",
    words: [
      { v: 22, s: 2617, note: "Chesed, \"loving devotion\". Here it is plural: God's loyal loves, many and repeated." },
      { v: 23, s: 530, note: "Emunah, \"faithfulness\": firmness, reliability. God holds steady when everything else falls." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 37,
    title: "The valley of dry bones",
    setting:
      "Ezekiel was a priest taken to Babylon in 597 BC. After Jerusalem fell, the exiles said, \"Our bones are dried up and our hope has perished\" (verse 11). God shows Ezekiel a valley of bones and has him prophesy to them. The scene echoes Genesis 2:7, where God breathes life into Adam. Only God can bring the dead to life, a promise fulfilled at Pentecost and at the final resurrection.",
    words: [
      { v: 5, s: 7307, note: "Ruach: \"breath\", \"wind\" and \"Spirit\" in one word. The chapter uses all three meanings." },
      { v: 14, s: 7307, note: "Ruach again, now \"My Spirit\". The breath that gives life is God's own Spirit." },
    ],
  },
  {
    book: "daniel",
    chapter: 7,
    title: "One like a son of man",
    setting:
      "Daniel, an exile serving in Babylon, sees this vision in the first year of King Belshazzar (around 550 BC). This chapter is written in Aramaic, the language of the empire. Four beasts rise from the sea, traditionally understood as Babylon, Persia, Greece and Rome. Then the Ancient of Days gives an everlasting kingdom to \"one like a son of man\". \"Son of Man\" became Jesus' favorite name for Himself, and He claimed this verse at His trial (Mark 14:62).",
    words: [
      { v: 13, s: 1247, note: "Bar enash, \"son of man\": a human being. Yet He comes with the clouds of heaven, which in the Old Testament is how God Himself travels." },
      { v: 14, s: 7985, note: "Sholtan, \"dominion\": rule, authority. Unlike the beasts' empires, His will never pass away." },
    ],
  },
  {
    book: "hosea",
    chapter: 11,
    title: "God's love for His wayward son",
    setting:
      "Hosea prophesied to the northern kingdom of Israel in the 700s BC, before Assyria destroyed it. God had him marry an unfaithful wife as a living picture of Israel's unfaithfulness and God's faithful love. In chapter 11 God speaks like a parent remembering teaching His child to walk. Matthew sees verse 1 fulfilled in Jesus, God's true Son called out of Egypt (Matthew 2:15).",
    words: [
      { v: 1, s: 157, note: "Ahav, \"loved\". God's love came first, before Israel had done anything." },
      { v: 4, s: 160, note: "Ahavah, \"love\": \"ropes of love\". God leads by love, not by force." },
    ],
  },
  {
    book: "joel",
    chapter: 2,
    title: "Return to Me, and I will pour out My Spirit",
    setting:
      "A devastating locust plague becomes, in Joel's hands, a preview of the coming Day of the LORD. The call is to repent from the heart, not in outward show, because God is gracious and compassionate. Then comes a promise: God will pour out His Spirit on all kinds of people. Peter quoted it at Pentecost: \"This is what was spoken by the prophet Joel\" (Acts 2:16).",
    words: [
      { v: 13, s: 7167, note: "Qara, \"rend\": to tear. Mourners tore their clothes; God wants hearts torn open in true repentance." },
      { v: 28, s: 8210, note: "Shaphak, \"pour out\": to spill freely, like water from a jar. The Spirit given abundantly." },
    ],
  },
  {
    book: "amos",
    chapter: 5,
    title: "Let justice roll on like a river",
    setting:
      "Amos was a shepherd and fig farmer from Judah, sent north around 760 BC to Israel in a time of peace and wealth. The rich lived in luxury while the poor were crushed, and religious festivals were busy. God says He hates worship that comes with injustice. What He wants is right living that never runs dry.",
    words: [
      { v: 24, s: 4941, note: "Mishpat, \"justice\": fair judgment, treating people rightly, especially the weak." },
      { v: 24, s: 6666, note: "Tsedaqah, \"righteousness\": living in right relationship with God and others." },
    ],
  },
  {
    book: "obadiah",
    chapter: 1,
    title: "Edom's pride and the Day of the LORD",
    setting:
      "Obadiah is the shortest book in the Old Testament. Edom descended from Esau, Jacob's brother, yet when Jerusalem fell (probably to Babylon in 586 BC) Edom gloated, looted and handed over survivors. Its cities sat high in rocky mountains and felt untouchable. Obadiah announces that pride brings a fall, and that the kingdom will be the LORD's (verse 21).",
    words: [
      { v: 3, s: 2087, note: "Zadon, \"pride\": arrogance, presumption. It deceives the one who has it." },
      { v: 3, s: 5553, note: "Sela, \"rocks\": cliffs. It was also the name of an Edomite stronghold, perhaps near later Petra." },
    ],
  },
  {
    book: "jonah",
    chapter: 4,
    title: "God's compassion for Nineveh",
    setting:
      "Nineveh was the capital of Assyria, the cruelest empire of the day and Israel's enemy. When the city repented and God spared it, Jonah was furious. He quotes God's own description of Himself from Exodus 34:6 as a complaint. The book ends with God's question about His compassion for a city of people and animals, a question left for every reader to answer.",
    words: [
      { v: 2, s: 7349, note: "Rachum, \"compassionate\". Related to the word for a mother's womb: tender, protective love." },
      { v: 11, s: 2347, note: "Chus, \"care\": to pity, to look on with compassion. Jonah pitied a plant; God pities people." },
    ],
  },
  {
    book: "micah",
    chapter: 6,
    title: "What does the LORD require?",
    setting:
      "Micah, a country prophet from Judah and a contemporary of Isaiah (700s BC), pictures a courtroom: God brings His case against His people with the mountains as witnesses. The people ask what offering would satisfy Him: rams, oil, even a firstborn child? Verse 8 answers that God has already shown them. He wants their whole life, not a price.",
    words: [
      { v: 8, s: 2617, note: "Chesed, \"mercy\": loyal, covenant love. Not just doing kindness, but loving it." },
      { v: 8, s: 6800, note: "Tsana, \"humbly\": modestly, carefully. Walking with God attentively, not proudly." },
    ],
  },
  {
    book: "nahum",
    chapter: 1,
    title: "The LORD is good, a stronghold",
    setting:
      "About a century after Jonah, Nineveh had returned to its cruelty and had destroyed the northern kingdom of Israel. Nahum, whose name means \"comfort\", announces its fall, which came in 612 BC. For people crushed by Assyria, God's justice is good news. Verse 7 sits right in the middle: the same God who judges the wicked is a refuge for those who trust Him.",
    words: [
      { v: 7, s: 4581, note: "Ma'oz, \"stronghold\": a fortress or place of safety." },
      { v: 7, s: 3045, note: "Yada, \"cares for\", literally \"knows\": close, personal knowing, not mere awareness." },
    ],
  },
  {
    book: "habakkuk",
    chapter: 2,
    title: "The righteous will live by faith",
    setting:
      "Habakkuk lived in Judah shortly before Babylon's invasion (late 600s BC). He complained that God was letting injustice win, and was shocked to hear that God would use the even more wicked Babylonians to judge Judah. In chapter 2 he waits at his watchpost for God's answer: the proud will fall, and the righteous will live by faith. Paul builds on verse 4 in Romans 1:17 and Galatians 3:11.",
    words: [
      { v: 4, s: 530, note: "Emunah, \"faith\": faithfulness, steady trust. Faith in God shows itself in a life that holds on to Him." },
      { v: 14, s: 3519, note: "Kavod, \"glory\": literally \"weight\", the heaviness of God's greatness filling the earth." },
    ],
  },
  {
    book: "zephaniah",
    chapter: 3,
    title: "He will rejoice over you with singing",
    setting:
      "Zephaniah prophesied in the days of King Josiah (640 to 609 BC), likely before Josiah's reforms took hold. Most of the book warns of the Day of the LORD on Judah and the nations. But it ends with a remnant purified, and with one of the most tender pictures in Scripture: God Himself singing over His people with joy.",
    words: [
      { v: 17, s: 1368, note: "Gibbor, \"mighty\": a warrior, a hero. The mighty One is the One who sings." },
      { v: 17, s: 7440, note: "Rinnah, \"singing\": a ringing cry of joy." },
    ],
  },
  {
    book: "haggai",
    chapter: 1,
    title: "Consider your ways",
    setting:
      "In 538 BC the exiles returned from Babylon and began rebuilding the temple, but opposition stopped the work. By 520 BC they had built fine houses for themselves, while God's house still lay in ruins. Their harvests kept failing. Haggai calls them to look honestly at their priorities. They listened, and within 24 days the work began again.",
    words: [
      { v: 5, s: 7760, note: "Sum, \"consider\", literally \"set your heart on\": pay close attention." },
      { v: 13, s: 4397, note: "Mal'akh, \"messenger\". Haggai speaks only what God gave him, and the message is simple: \"I am with you.\"" },
    ],
  },
  {
    book: "zechariah",
    chapter: 9,
    title: "Your King comes, riding on a donkey",
    setting:
      "Zechariah prophesied alongside Haggai to the returned exiles from 520 BC, encouraging them to rebuild. Chapters 9 to 14 look further ahead. Verse 9 pictures Zion's King arriving, righteous and victorious yet humble, on a donkey rather than a war horse, bringing peace to the nations (verse 10). Jesus fulfilled it deliberately on Palm Sunday (Matthew 21:5).",
    words: [
      { v: 9, s: 6041, note: "Ani, \"humble\": lowly, even afflicted. This King comes in meekness." },
      { v: 9, s: 2543, note: "Chamor, \"donkey\". A war horse signaled conquest; a donkey signaled a king coming in peace." },
    ],
  },
  {
    book: "malachi",
    chapter: 3,
    title: "My messenger will prepare the way",
    setting:
      "Malachi is the last of the Old Testament prophets, in the mid-400s BC. The temple stood again, but priests were careless, marriages were breaking, tithes were withheld, and people asked, \"Where is the God of justice?\" (2:17). God answers: a messenger will prepare the way, and the Lord Himself will come to His temple. The Gospels identify the messenger as John the Baptist (Matthew 11:10), and the Lord who comes as Jesus.",
    words: [
      { v: 1, s: 4397, note: "Mal'akh, \"messenger\". Malachi's own name means \"My messenger\"." },
      { v: 1, s: 113, note: "Adon, \"the Lord\": a master, owner. The One who comes to the temple is the temple's owner." },
    ],
  },
  {
    book: "matthew",
    chapter: 28,
    title: "The Great Commission",
    setting:
      "On the third day after the crucifixion, the women find the tomb empty and meet the risen Jesus. Meanwhile the guards are paid to spread a lie. On a mountain in Galilee, Jesus gives His followers their mission. Matthew's Gospel began with \"Immanuel, God with us\" (1:23) and ends with His promise: \"I am with you always.\"",
    words: [
      { v: 18, s: 1849, note: "Exousia, \"authority\": the right and power to rule. The mission rests on His authority, not ours." },
      { v: 19, s: 3100, note: "Matheteuo, \"make disciples\": the main command. Going, baptizing and teaching all serve it." },
    ],
  },
  {
    book: "mark",
    chapter: 1,
    title: "The beginning of the gospel",
    setting:
      "Mark is probably the earliest Gospel, written in the 60s AD. Early church writers say Mark recorded the preaching of the apostle Peter, likely for believers in Rome. It moves fast, with \"immediately\" all through it. In one chapter Jesus is baptized, tempted, calls fishermen, casts out demons and heals the sick. Mark wants you to see who Jesus is by what He does.",
    words: [
      { v: 1, s: 2098, note: "Euangelion, \"gospel\": good news. The Romans used it for announcements of an emperor's birth or victory. Mark announces the true King." },
      { v: 15, s: 3340, note: "Metanoeo, \"repent\": to change your mind, and so your direction. It means turning around, not just feeling sorry." },
    ],
  },
  {
    book: "luke",
    chapter: 24,
    title: "The road to Emmaus",
    setting:
      "On resurrection Sunday, two disciples walk the seven miles from Jerusalem to Emmaus, heartbroken. A stranger joins them and walks them through the whole Old Testament, showing that the Messiah had to suffer and then enter His glory. They recognize Jesus when He breaks bread with them. The chapter teaches how to read the Bible: all of it points to Him.",
    words: [
      { v: 27, s: 1329, note: "Diermeneuo, \"explained\": to interpret fully, to translate. Jesus is the key that opens the Scriptures." },
      { v: 32, s: 1272, note: "Dianoigo, \"opened\": to open completely. Used of opened Scriptures here and opened eyes in verse 31." },
    ],
  },
  {
    book: "john",
    chapter: 14,
    title: "I am the way, the truth and the life",
    setting:
      "It is the night before the crucifixion, in the upper room. Jesus has washed His disciples' feet and told them He is leaving. They are troubled and confused. He promises that He goes to prepare a place for them, that He is the only way to the Father, and that the Father will send another Advocate, the Holy Spirit, to be with them forever.",
    words: [
      { v: 2, s: 3438, note: "Mone, \"rooms\": dwelling places, from the verb \"to remain\" or \"abide\". The same idea returns in verse 23: \"We will make Our home with him.\"" },
      { v: 16, s: 3875, note: "Parakletos, \"Advocate\": one called alongside to help, defend and comfort." },
    ],
  },
  {
    book: "2corinthians",
    chapter: 5,
    title: "A new creation, reconciled to God",
    setting:
      "Paul writes his most personal letter to a church in Corinth that had been swayed by rival teachers who mocked his weakness. Chapter 5 looks past suffering to the resurrection body, our \"building from God\". Then it describes the heart of the gospel: God reconciling the world to Himself in Christ, who was made sin for us so that we might become His righteousness (verse 21).",
    words: [
      { v: 17, s: 2937, note: "Ktisis, \"creation\". In Christ a person is not just improved but part of God's new creation." },
      { v: 20, s: 4243, note: "Presbeuo, \"we are ambassadors\": to speak officially for a king. Believers carry God's message of peace." },
    ],
  },
  {
    book: "1thessalonians",
    chapter: 4,
    title: "Hope for those who grieve",
    setting:
      "Paul planted the church in Thessalonica but was forced out after only weeks (Acts 17). These new believers were grieving Christians who had died, worried they had missed out on Christ's return. Paul assures them that the dead in Christ will rise first, and all believers will be together with the Lord. Christians differ on the timing of these events, but agree on the hope.",
    words: [
      { v: 13, s: 2837, note: "Koimao, \"sleep\": the early Christian word for death. Our word \"cemetery\" comes from it: a sleeping place." },
      { v: 17, s: 529, note: "Apantesis, \"meet\": the word for citizens going out to welcome a visiting king and escort him in." },
    ],
  },
  {
    book: "2thessalonians",
    chapter: 2,
    title: "Don't be shaken: the day of the Lord",
    setting:
      "Soon after Paul's first letter, someone told the Thessalonians that the day of the Lord had already come, perhaps even claiming a letter from Paul. Paul says certain things must happen first: a great rebellion and the revealing of \"the man of lawlessness\". Christians interpret the details differently. The point is clear: don't be alarmed, stand firm and hold to the apostles' teaching.",
    words: [
      { v: 1, s: 3952, note: "Parousia, \"coming\": arrival or presence, used of a royal visit. Christ's return in person." },
      { v: 15, s: 3862, note: "Paradosis, \"traditions\": what is handed down. Here, the apostles' own teaching, now kept for us in the New Testament." },
    ],
  },
  {
    book: "1timothy",
    chapter: 1,
    title: "Christ came to save sinners",
    setting:
      "Paul writes to Timothy, his young co-worker, whom he left in Ephesus to deal with false teachers fixated on myths and genealogies. Before giving instructions, Paul tells his own story: once a blasphemer and persecutor of the church, he was shown mercy as an example of Christ's patience to all who would believe.",
    words: [
      { v: 15, s: 4103, note: "Pistos, \"trustworthy\". \"This is a trustworthy saying\" marks five key truths in Paul's letters to Timothy and Titus." },
      { v: 15, s: 4413, note: "Protos, \"the worst\": first, foremost. Paul does not say \"was\" but \"am\"." },
    ],
  },
  {
    book: "2timothy",
    chapter: 3,
    title: "All Scripture is God-breathed",
    setting:
      "This is Paul's last letter, written from a Roman prison, where he expected execution (4:6). He warns Timothy that hard times will come, with people who look religious but deny God's power. Timothy's anchor is the Scripture he learned from childhood, taught by his mother Eunice and grandmother Lois (1:5).",
    words: [
      { v: 16, s: 2315, note: "Theopneustos, \"God-breathed\": breathed out by God. Scripture does not just inspire us; it comes from God." },
      { v: 16, s: 5624, note: "Ophelimos, \"useful\": profitable. Scripture equips us to teach, correct and train." },
    ],
  },
  {
    book: "titus",
    chapter: 2,
    title: "Grace that saves and trains",
    setting:
      "Paul left Titus on the island of Crete to set churches in order. Cretans had a reputation for dishonesty (1:12), and the gospel was being undermined by bad living. Chapter 2 gives instruction for older and younger men and women and for slaves, and then grounds it all in grace: the grace that saves us also teaches us how to live while we wait for Christ.",
    words: [
      { v: 11, s: 2014, note: "Epiphaino, \"has appeared\": to shine forth. Used of a god's appearing or a ruler's arrival." },
      { v: 13, s: 4990, note: "Soter, \"Savior\": a title the Romans gave to Caesar. Paul gives it to \"our great God and Savior Jesus Christ\"." },
    ],
  },
  {
    book: "philemon",
    chapter: 1,
    title: "No longer a slave, but a brother",
    setting:
      "Paul writes from prison to Philemon, a believer in Colossae whose house hosted a church. Philemon's slave Onesimus had run away, possibly having wronged or stolen from him, and then met Paul and became a Christian. Paul sends him back, not as property, but as a beloved brother, and offers to repay anything owed himself. The gospel reshapes even the hardest relationships.",
    words: [
      { v: 11, s: 890, note: "Achrestos, \"useless\". Paul is playing on Onesimus's name, which means \"useful\"." },
      { v: 11, s: 2173, note: "Euchrestos, \"useful\": now truly living up to his name." },
    ],
  },
  {
    book: "james",
    chapter: 2,
    title: "Faith that works",
    setting:
      "James, the brother of Jesus and leader of the Jerusalem church, writes to Jewish believers scattered abroad. He confronts favoritism toward the rich and a faith that is only talk. He is not contradicting Paul: Paul explains how we are declared right with God (by faith alone, not works), while James shows what real faith looks like (it acts).",
    words: [
      { v: 17, s: 3498, note: "Nekros, \"dead\": lifeless. Faith without action is not weak faith but no living faith at all." },
      { v: 21, s: 1344, note: "Dikaioo, \"justified\". Here James means shown to be righteous: Abraham's obedience proved his faith was real (verse 23)." },
    ],
  },
  {
    book: "1peter",
    chapter: 2,
    title: "Living stones and a royal priesthood",
    setting:
      "Peter writes to Christians scattered across what is now Turkey, calling them \"exiles\". They faced slander and rejection for their faith. He gives them their true identity, using titles God gave Israel at Mount Sinai (Exodus 19:6): a chosen people, a royal priesthood, a holy nation. Rejected by the world like Christ, they are precious to God.",
    words: [
      { v: 5, s: 3037, note: "Lithos, \"stones\". Jesus is the living cornerstone; believers are being built together into God's house." },
      { v: 9, s: 2406, note: "Hierateuma, \"priesthood\". Every believer can come near to God and offer spiritual sacrifices." },
    ],
  },
  {
    book: "2peter",
    chapter: 1,
    title: "Eyewitnesses and God-given Scripture",
    setting:
      "Peter writes knowing his death is near (verse 14), to warn against false teachers. He reminds readers that faith rests on facts: he was an eyewitness of Jesus' glory on the mount of transfiguration. And the prophetic Scriptures came not from human ideas but from God.",
    words: [
      { v: 4, s: 2844, note: "Koinonos, \"partakers\": sharers. Through His promises we share in God's own life and character." },
      { v: 21, s: 5342, note: "Phero, \"carried along\": the word used for a ship driven by the wind (Acts 27:15). God's Spirit moved the writers." },
    ],
  },
  {
    book: "1john",
    chapter: 4,
    title: "God is love",
    setting:
      "John, the aged apostle, writes to churches shaken after false teachers left them, people who denied that Jesus had truly come in the flesh (verse 2). He gives tests for true faith: right belief about Jesus, obedience and love. In this chapter he reaches the heart of it: God is love, shown most clearly in sending His Son as the atoning sacrifice for our sins (verse 10).",
    words: [
      { v: 8, s: 26, note: "Agape, \"love\": self-giving love that seeks the good of the other. God does not just love; He is love." },
      { v: 18, s: 5046, note: "Teleios, \"perfect\": complete, mature. As God's love grows full in us, fear of judgment loses its grip." },
    ],
  },
  {
    book: "2john",
    chapter: 1,
    title: "Walk in truth and love",
    setting:
      "This short letter, small enough to fit on one sheet of papyrus, comes from \"the elder\", traditionally the apostle John. It is addressed to \"the chosen lady and her children\", most likely a local church and its members. John urges them to keep loving one another and not to welcome teachers who deny that Jesus came in the flesh.",
    words: [
      { v: 1, s: 2959, note: "Kyria, \"lady\". Probably a loving way to address a church, though some think it means a particular woman." },
      { v: 6, s: 4043, note: "Peripateo, \"walk\": to live your daily life. Love is a way of walking, not a feeling." },
    ],
  },
  {
    book: "3john",
    chapter: 1,
    title: "Supporting those who carry the gospel",
    setting:
      "The elder writes to his friend Gaius, praising him for welcoming traveling missionaries who preached without taking money from unbelievers. He also warns about Diotrephes, a church leader who \"loves to be first\" and refuses to welcome them. The letter is a small window into how the early church spread the gospel through hospitality.",
    words: [
      { v: 4, s: 225, note: "Aletheia, \"truth\": not just correct facts, but reality as God reveals it, lived out." },
      { v: 4, s: 5479, note: "Chara, \"joy\". John's greatest joy is spiritual children who live what they believe." },
    ],
  },
  {
    book: "jude",
    chapter: 1,
    title: "Contend for the faith",
    setting:
      "Jude, the brother of James and of Jesus, meant to write about salvation but had to sound an alarm instead. False teachers had slipped into the churches, turning God's grace into an excuse for immorality. Jude calls believers to defend the faith, keep themselves in God's love, and show mercy. He ends with one of the Bible's best-loved doxologies.",
    words: [
      { v: 3, s: 1864, note: "Epagonizomai, \"contend earnestly\": an athletic word for straining in a contest." },
      { v: 3, s: 530, note: "Hapax, \"once for all\". The faith was delivered complete; nothing needs to be added." },
    ],
  },
  // ── New Testament, every chapter (Nov 22) ─────────────────────
  ...CONTEXT_NOTES_GOSPELS_ACTS,
  ...CONTEXT_NOTES_PAUL,
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
