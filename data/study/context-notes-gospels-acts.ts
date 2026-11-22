/**
 * Setting cards (see context-notes.ts for the guardrails), drafted by Claude for Josh's review, Nov 2026.
 * Every Strong's number is checked against the bundled interlinear (tests/context-notes.test.ts).
 */

import type { ContextNote } from "./context-notes";

export const CONTEXT_NOTES_GOSPELS_ACTS: ContextNote[] = [
  {
    book: "matthew",
    chapter: 1,
    title: "The family line of the promised King",
    setting:
      "Matthew wrote mainly for Jewish readers, so he opens where they would want proof: a family tree. It traces Jesus from Abraham through King David, showing He is the heir of God's promises to both. Surprisingly, it names four women, including Gentiles and a woman with a scandalous past, hinting that this King comes for outsiders too. Then an angel tells Joseph the child is conceived by the Holy Spirit.",
    words: [
      { v: 1, s: 1078, note: "Genesis, \"genealogy\" or \"origin\". Matthew's first words echo the book of Genesis: a new beginning is starting." },
      { v: 23, s: 1694, note: "Emmanouel, \"God with us\". Matthew opens with God with us and closes with Jesus saying, \"I am with you always\" (28:20)." },
    ],
  },
  {
    book: "matthew",
    chapter: 2,
    title: "Wise men from the east",
    setting:
      "Herod the Great ruled Judea for Rome. He was a brilliant builder and a ruthless, paranoid king who killed his own sons when he feared rivals. The Magi were probably scholars from Persia or Babylon who studied the stars. Gentiles travel far to worship the true King while Jerusalem's king plots to kill Him. Like Moses, the child escapes a tyrant's massacre and comes up out of Egypt.",
    words: [
      { v: 1, s: 3097, note: "Magos, \"Magi\" or \"wise men\": a class of learned advisers in the east, known for studying the heavens. The text never says there were three." },
      { v: 2, s: 4352, note: "Proskuneo, \"worship\": to bow down before someone. The Magi come to do what Herod only pretends he wants to do (v. 8)." },
    ],
  },
  {
    book: "matthew",
    chapter: 3,
    title: "John prepares the way",
    setting:
      "For centuries Israel had heard no prophet. Then John appears in the wilderness dressed like Elijah, calling the nation to repent and be baptized in the Jordan, the river Israel crossed to enter the promised land. Jesus, who had no sin to confess, is baptized to stand with His people. As He comes up from the water, the Father speaks and the Spirit descends: Father, Son and Spirit all present at once.",
    words: [
      { v: 2, s: 932, note: "Basileia, \"kingdom\": God's reign breaking into the world. Matthew says \"kingdom of heaven\", a respectful Jewish way of saying the kingdom of God." },
      { v: 17, s: 27, note: "Agapetos, \"beloved\": dearly loved, often of an only child. The Father's words echo Psalm 2 and Isaiah 42." },
    ],
  },
  {
    book: "matthew",
    chapter: 4,
    title: "Tested in the wilderness, then calling fishermen",
    setting:
      "Israel was tested forty years in the wilderness and failed. Jesus is tested forty days and stands firm, answering each temptation with words from Deuteronomy, the book about Israel's wilderness years. Then He begins preaching in Galilee, a region of farmers and fishermen with many Gentile neighbors. He calls ordinary working men to follow Him, and they leave their nets and their father's boat.",
    words: [
      { v: 1, s: 3985, note: "Peirazo, \"to tempt\" or \"to test\". The same event was a test from God's side and a temptation from the devil's." },
      { v: 19, s: 231, note: "Halieus, \"fishermen\". Jesus takes the trade they knew and gives it a new purpose: gathering people into the kingdom." },
    ],
  },
  {
    book: "matthew",
    chapter: 8,
    title: "Authority over sickness, storms and demons",
    setting:
      "After the Sermon on the Mount shows Jesus' authority in His words, chapters 8 and 9 show it in His deeds. He touches a leper, whom the law called unclean and most people kept far away. He heals the servant of a Roman centurion, an officer of the occupying army, and praises his faith above Israel's. Then He calms a storm with a word, and even the wind and waves obey Him.",
    words: [
      { v: 3, s: 680, note: "Haptomai, \"touched\". Touching a leper would normally make a person unclean. Here cleanness flows the other way." },
      { v: 26, s: 3640, note: "Oligopistos, \"little faith\". It is Jesus' gentle rebuke to disciples who believe in Him but still panic." },
    ],
  },
  {
    book: "matthew",
    chapter: 9,
    title: "Jesus calls a tax collector",
    setting:
      "Tax collectors bought the right to collect taxes for Rome and kept whatever extra they could squeeze out. Jews saw them as traitors and thieves. Matthew, the author of this Gospel, was one of them. Jesus calls him from his booth and then eats with his friends, which shocked the religious leaders. Jesus answers that He came for the sick, not for those who think they are well.",
    words: [
      { v: 9, s: 5058, note: "Telonion, \"tax booth\": a toll office, likely on the busy road near Capernaum by the Sea of Galilee." },
      { v: 36, s: 4697, note: "Splanchnizomai, \"moved with compassion\": from the word for a person's inward parts. It is a gut-deep ache for people." },
    ],
  },
  {
    book: "matthew",
    chapter: 10,
    title: "The Twelve are sent out",
    setting:
      "Jesus chooses twelve men, matching the twelve tribes of Israel, a sign He is gathering a renewed people of God. He sends them first to the villages of Israel with His own message and power, traveling light and depending on the hospitality of others. He also warns them plainly: they will face opposition, courts and even family division. But the Father who counts the hairs on their heads will care for them.",
    words: [
      { v: 2, s: 652, note: "Apostolos, \"apostle\": one who is sent as an authorized messenger, carrying the authority of the one who sent him." },
      { v: 16, s: 185, note: "Akeraios, \"innocent\": literally unmixed, pure. Jesus wants His people shrewd but without hidden motives." },
    ],
  },
  {
    book: "matthew",
    chapter: 11,
    title: "John's question, and rest for the weary",
    setting:
      "John the Baptist is now in prison, and he sends to ask whether Jesus really is the One. Jesus points to what Isaiah promised: the blind see, the lame walk and the poor hear good news. He then rebukes towns that saw His miracles and did not repent. The chapter ends with one of His most tender invitations to people worn down by burdens, including the heavy rules of religious leaders.",
    words: [
      { v: 28, s: 373, note: "Anapauo, \"give rest\": to refresh, to let someone stop and breathe. It is a gift Jesus gives, not a reward earned." },
      { v: 29, s: 2218, note: "Zugos, \"yoke\": the wooden bar joining a pair of oxen. Rabbis spoke of taking the yoke of the law; Jesus offers His own, and it is kind." },
    ],
  },
  {
    book: "matthew",
    chapter: 12,
    title: "The Lord of the Sabbath",
    setting:
      "The Sabbath was a gift of rest, but by Jesus' day teachers had built detailed rules about what counted as work, even picking grain or healing. Jesus says He is Lord of the Sabbath and that mercy matters more. The Pharisees then claim His power comes from Satan. Jesus warns that hardening yourself against the Spirit's plain work is the most serious sin of all.",
    words: [
      { v: 8, s: 4521, note: "Sabbaton, \"Sabbath\": from the Hebrew shabbat, \"to cease\". God rested on the seventh day and gave His people rest." },
      { v: 31, s: 988, note: "Blasphemia, \"blasphemy\": slander, speaking against. Here it means calling the Spirit's work evil, a settled rejection of Christ." },
    ],
  },
  {
    book: "matthew",
    chapter: 13,
    title: "Parables of the kingdom",
    setting:
      "Jesus often taught in parables, short stories from farming, fishing and household life. They reveal the kingdom to those who are open and hide it from those who have already hardened their hearts. This chapter gathers seven of them: seed on different soils, weeds among wheat, a tiny mustard seed, yeast, hidden treasure, a costly pearl and a fishing net. Each shows the kingdom starting small and growing.",
    words: [
      { v: 3, s: 3850, note: "Parabole, \"parable\": literally something thrown alongside, an earthly picture placed beside a heavenly truth." },
      { v: 31, s: 4615, note: "Sinapi, \"mustard\". Its seed was proverbially tiny, yet it grows into a plant big enough for birds to nest in." },
    ],
  },
  {
    book: "matthew",
    chapter: 14,
    title: "Five thousand fed, and Jesus walks on the water",
    setting:
      "Herod Antipas, son of Herod the Great, has John the Baptist beheaded at a birthday banquet. Jesus withdraws to grieve, but the crowds follow, and He feeds over five thousand people with five loaves and two fish. That night He walks on the Sea of Galilee to His frightened disciples. In the Old Testament only God treads the waves (Job 9:8), and the disciples respond by worshiping Him.",
    words: [
      { v: 27, s: 2293, note: "Tharseo, \"take courage\". Jesus' cheer comes with His identity: \"It is I\", literally \"I am\"." },
      { v: 31, s: 1365, note: "Distazo, \"doubt\": to stand in two minds. Peter believed enough to step out, then looked at the wind." },
    ],
  },
  {
    book: "matthew",
    chapter: 15,
    title: "Clean hearts and a Gentile mother's faith",
    setting:
      "Pharisees from Jerusalem accuse Jesus' disciples of not washing their hands the ceremonial way. Jesus says what makes a person unclean comes from the heart, not the plate. Then He travels north to the region of Tyre and Sidon, Gentile territory, where a Canaanite mother begs Him to heal her daughter. Her humble, persistent faith is commended, a preview of the gospel going to the nations.",
    words: [
      { v: 2, s: 3862, note: "Paradosis, \"tradition\": teachings handed down. The elders' traditions had come to be treated as equal to God's word." },
      { v: 28, s: 3173, note: "Megas, \"great\". Jesus calls this Gentile woman's faith great, the same praise He gave the Roman centurion (8:10)." },
    ],
  },
  {
    book: "matthew",
    chapter: 16,
    title: "You are the Christ",
    setting:
      "Caesarea Philippi lay at the foot of Mount Hermon, a city of pagan shrines and a temple to Caesar. There Jesus asks who people say He is, and Peter answers, \"You are the Christ, the Son of the living God.\" Jesus promises to build His church. Protestants and Catholics read \"this rock\" differently: Peter himself, Peter's confession, or Christ. Then Jesus begins to speak openly of the cross.",
    words: [
      { v: 18, s: 4073, note: "Petra, \"rock\": a great mass of rock. It plays on Peter's name, Petros. Every reading agrees the church rests on Christ." },
      { v: 18, s: 1577, note: "Ekklesia, \"church\": an assembly of people called out. Jesus says \"My church\": it belongs to Him." },
    ],
  },
  {
    book: "matthew",
    chapter: 17,
    title: "The transfiguration",
    setting:
      "About a week after Peter's confession, Jesus takes Peter, James and John up a high mountain. His face shines like the sun, and Moses and Elijah, representing the Law and the Prophets, talk with Him. The Father's voice repeats what He said at Jesus' baptism and adds, \"Listen to Him!\" Coming down, Jesus heals a boy His disciples could not help, and speaks again of His coming death.",
    words: [
      { v: 2, s: 3339, note: "Metamorphoo, \"transfigured\": changed in form. Paul uses the same verb for believers being transformed (Romans 12:2)." },
      { v: 20, s: 4615, note: "Sinapi, \"mustard seed\". Even tiny faith is enough, because its power lies in the God it trusts." },
    ],
  },
  {
    book: "matthew",
    chapter: 18,
    title: "Humility, restoration and forgiveness",
    setting:
      "The disciples ask who is greatest. Jesus sets a child among them, someone with no status in that world, and says to become like this. The chapter is about life together in His community: welcoming the weak, going after the one who wanders, confronting sin gently, and forgiving without limit. The parable of the unforgiving servant shows why: we have been forgiven a debt we could never repay.",
    words: [
      { v: 22, s: 1441, note: "Hebdomekontakis, \"seventy times\" (seventy-seven or seventy times seven). Rabbis suggested forgiving three times; Jesus means without counting." },
      { v: 24, s: 5007, note: "Talanton, \"talent\": about twenty years of a laborer's wages. Ten thousand talents was an impossible, unpayable sum." },
    ],
  },
  {
    book: "matthew",
    chapter: 19,
    title: "Marriage, children and a rich young man",
    setting:
      "Jesus is heading toward Jerusalem. Pharisees test Him on divorce, a debated issue in which some rabbis allowed it for almost any reason. Jesus goes back to creation: God joins husband and wife. Christians differ somewhat on what exceptions He allows. Then He welcomes children, and a rich young man walks away sad because his wealth meant more to him than following Jesus.",
    words: [
      { v: 6, s: 4801, note: "Syzeugnymi, \"joined together\": literally yoked together. God Himself is the one who joins husband and wife." },
      { v: 24, s: 2574, note: "Kamelos, \"camel\": the largest animal in Palestine, through the smallest opening. Salvation is impossible for people, but not for God." },
    ],
  },
  {
    book: "matthew",
    chapter: 20,
    title: "Workers in the vineyard, and a ransom for many",
    setting:
      "During grape harvest, landowners hired day laborers in the marketplace, and a day's work earned one denarius. In Jesus' parable the owner pays the latecomers the same as those who worked all day. Grace is not wages. Then James and John ask for the best seats in the kingdom. Jesus says greatness means serving, and He came to give His life as a ransom.",
    words: [
      { v: 2, s: 1220, note: "Denarion, \"denarius\": a silver coin, the usual pay for a full day's labor." },
      { v: 28, s: 3083, note: "Lytron, \"ransom\": the price paid to free a slave or captive. Jesus pays it with His own life, in the place of many." },
    ],
  },
  {
    book: "matthew",
    chapter: 21,
    title: "The King rides into Jerusalem",
    setting:
      "Passover week has begun, and Jerusalem is crowded with pilgrims. Jesus rides in on a donkey, fulfilling Zechariah 9:9, a humble king coming in peace. Crowds spread cloaks and branches and shout words from Psalm 118. Then He drives the money changers and animal sellers out of the temple courts, where they had turned the court meant for Gentile prayer into a market.",
    words: [
      { v: 9, s: 5614, note: "Hosanna: from Hebrew meaning \"save, please!\" By Jesus' time it had become a shout of praise as well as a plea." },
      { v: 12, s: 2411, note: "Hieron, \"temple courts\": the whole temple complex. The selling likely filled the Court of the Gentiles." },
    ],
  },
  {
    book: "matthew",
    chapter: 22,
    title: "Questions meant to trap Jesus",
    setting:
      "In the temple courts, rival groups try to trap Jesus in public. Pharisees and Herod's supporters ask whether to pay taxes to Caesar, a question that could anger either the crowd or Rome. Sadducees, who denied the resurrection, pose a riddle about marriage in heaven. A lawyer asks for the greatest commandment. Jesus answers each, then asks a question no one can answer.",
    words: [
      { v: 20, s: 1504, note: "Eikon, \"image\" on the coin. Caesar's image was on the coin, but God's image is on you. Give yourself to God." },
      { v: 37, s: 25, note: "Agapao, \"love\". Jesus joins Deuteronomy 6:5 and Leviticus 19:18: love God with all you are and your neighbor as yourself." },
    ],
  },
  {
    book: "matthew",
    chapter: 23,
    title: "Woes to hypocrites, and a lament over Jerusalem",
    setting:
      "Jesus speaks His sharpest words to scribes and Pharisees, the respected religious teachers of the day. They teach Moses' law but load others with burdens, love titles and praise, and polish the outside while neglecting justice, mercy and faithfulness. Not every Pharisee was like this, but Jesus warns against religion as performance. He ends weeping over Jerusalem like a hen longing to gather her chicks.",
    words: [
      { v: 13, s: 5273, note: "Hypokrites, \"hypocrite\": originally a stage actor behind a mask. Their faith had become a role they played." },
      { v: 37, s: 3733, note: "Ornis, \"hen\". God's care for His people is pictured as a mother bird shielding her young with her wings." },
    ],
  },
  {
    book: "matthew",
    chapter: 24,
    title: "The temple's fall and the Son of Man's coming",
    setting:
      "Leaving the temple, the disciples admire its huge stones. Jesus says not one will be left on another, which happened when Rome destroyed it in AD 70. On the Mount of Olives they ask when, and what will signal His coming and the end. Christians read His answer differently: some see much of it fulfilled in AD 70, others see it as still future, many see both. All agree: be ready.",
    words: [
      { v: 3, s: 3952, note: "Parousia, \"coming\": arrival or presence, used of a king's official visit. In the New Testament it often means Christ's return." },
      { v: 42, s: 1127, note: "Gregoreo, \"keep watch\": stay awake, alert. The point is not calculating dates but being ready." },
    ],
  },
  {
    book: "matthew",
    chapter: 25,
    title: "Ready, faithful and merciful",
    setting:
      "Jesus' teaching on His return ends with three stories. Ten bridesmaids wait for a delayed groom, and five are ready. Three servants are trusted with their master's money, and two put it to work. Then the Son of Man sits on His throne and separates sheep from goats by how they treated His least brothers and sisters. Waiting well means staying ready, faithful and merciful.",
    words: [
      { v: 15, s: 5007, note: "Talanton, \"talent\": a huge sum of money, years of wages. Our word \"talent\" for a gift or ability comes from this parable." },
      { v: 40, s: 1646, note: "Elachistos, \"least\": the smallest, most overlooked. Jesus counts kindness to them as done to Himself." },
    ],
  },
  {
    book: "matthew",
    chapter: 26,
    title: "The Last Supper and Gethsemane",
    setting:
      "It is Passover, when Jews remembered God freeing them from Egypt by the blood of a lamb. A woman anoints Jesus with costly perfume, and Judas agrees to betray Him for thirty silver coins. At the meal Jesus gives the bread and cup new meaning: His body and His blood of the covenant. In Gethsemane, an olive grove, He prays in anguish, then is arrested.",
    words: [
      { v: 28, s: 1242, note: "Diatheke, \"covenant\": a binding agreement God makes. Jesus' blood begins the new covenant promised in Jeremiah 31." },
      { v: 36, s: 1068, note: "Gethsemane: Aramaic for \"oil press\". Here Jesus was pressed with sorrow as He chose the Father's will." },
    ],
  },
  {
    book: "matthew",
    chapter: 27,
    title: "Crucified as King of the Jews",
    setting:
      "The Jewish council could not carry out a death sentence, so they bring Jesus to Pontius Pilate, the Roman governor. Pilate finds no guilt but gives in to the crowd and releases Barabbas. Crucifixion was Rome's most shameful execution, reserved for slaves and rebels. As Jesus dies, the temple curtain tears from top to bottom, and a Roman centurion confesses that He was the Son of God.",
    words: [
      { v: 33, s: 1115, note: "Golgotha: Aramaic for \"skull\". It was probably a rocky rise outside the city walls, near a road where passersby would see." },
      { v: 51, s: 2665, note: "Katapetasma, \"curtain\": the veil before the Most Holy Place. Torn from top to bottom, from God's side, the way to God is open." },
    ],
  },
  {
    book: "mark",
    chapter: 2,
    title: "Forgiveness through the roof",
    setting:
      "Jesus is teaching in a packed house in Capernaum, probably with a flat roof of beams, branches and packed mud. Four friends dig through it to lower a paralyzed man to Him. Jesus first forgives his sins, which the scribes rightly say only God can do, then heals him to prove His authority. The chapter builds conflict: eating with sinners, not fasting, and picking grain on the Sabbath.",
    words: [
      { v: 5, s: 863, note: "Aphiemi, \"forgiven\": to send away, release. Jesus speaks as if the debt is His to cancel, because it is." },
      { v: 17, s: 2564, note: "Kaleo, \"call\": to summon or invite. Jesus' invitation goes to those who know they are not righteous." },
    ],
  },
  {
    book: "mark",
    chapter: 3,
    title: "The Twelve, and Jesus' true family",
    setting:
      "Opposition hardens: after Jesus heals on the Sabbath, Pharisees plot with Herod's supporters to kill Him. Crowds now come from as far as Idumea and Tyre. On a mountain He appoints twelve to be with Him and to be sent out. His own family thinks He has lost His mind, and scribes say He is in league with Satan. Jesus says His family is whoever does God's will.",
    words: [
      { v: 14, s: 4160, note: "Poieo, \"appointed\": literally \"made\". Jesus forms the Twelve the way God formed Israel, a new beginning." },
      { v: 27, s: 2478, note: "Ischyros, \"strong man\". Satan is strong, but Jesus is the stronger One who binds him and frees his captives." },
    ],
  },
  {
    book: "mark",
    chapter: 4,
    title: "Seeds, soils and a storm",
    setting:
      "Jesus teaches from a boat because the crowd fills the shore. His parables describe a kingdom that grows quietly, like seed in the ground, and starts tiny, like a mustard seed. Not everyone who hears will bear fruit. That evening a sudden storm, common on the Sea of Galilee because winds rush down the surrounding hills, nearly swamps the boat. Jesus stills it with a word.",
    words: [
      { v: 3, s: 191, note: "Akouo, \"listen!\": the chapter's key word. Hearing in the Bible means taking in and obeying, not just noticing sound." },
      { v: 39, s: 4623, note: "Siopao, \"be silent\": \"Hush!\" Jesus speaks to the storm as if rebuking a living thing, and it obeys." },
    ],
  },
  {
    book: "mark",
    chapter: 5,
    title: "Three people beyond help",
    setting:
      "Jesus crosses into the Gentile region of the Gerasenes and frees a man possessed by a legion of demons, who lived among tombs. Back across the lake, a synagogue leader begs Him to heal his dying daughter. On the way, a woman unclean for twelve years with bleeding touches His cloak and is healed. Then Jesus raises the girl. Each person was unclean or hopeless in that culture; Jesus restores them all.",
    words: [
      { v: 9, s: 3003, note: "Legion: a Roman army unit of about five thousand soldiers. The name means the man was overwhelmed by many demons." },
      { v: 41, s: 2891, note: "Koum, from Aramaic: \"Talitha koum\", \"little girl, get up\". Mark keeps the very words Jesus spoke." },
    ],
  },
  {
    book: "mark",
    chapter: 6,
    title: "A prophet without honor",
    setting:
      "In His hometown of Nazareth, people who knew Jesus as the local builder take offense at Him. Jesus sends out the Twelve, and Mark tells how Herod Antipas had John the Baptist beheaded. Then Jesus feeds five thousand men in a remote place, like a shepherd caring for sheep without a shepherd, and walks on the water. The disciples still do not understand, because their hearts were hardened.",
    words: [
      { v: 3, s: 5045, note: "Tekton, \"carpenter\" or \"builder\": a craftsman in wood or stone. Jesus worked with His hands before He preached." },
      { v: 34, s: 4166, note: "Poimen, \"shepherd\". Israel's leaders had failed as shepherds; Jesus is the Shepherd God promised (Ezekiel 34)." },
    ],
  },
  {
    book: "mark",
    chapter: 7,
    title: "What really defiles",
    setting:
      "Mark explains for non-Jewish readers that Pharisees washed hands, cups and pots in a careful ritual way. Jesus says their traditions had begun to cancel God's commands, and that evil comes from the heart, not from food. Mark adds that Jesus declared all foods clean. He then heals a Gentile woman's daughter and a deaf man in the Gentile Decapolis.",
    words: [
      { v: 11, s: 2878, note: "Korban: a Hebrew word for an offering dedicated to God. People used the vow to avoid supporting their aging parents." },
      { v: 34, s: 2188, note: "Ephphatha: Aramaic for \"be opened\". Jesus groans, looks to heaven and opens the deaf man's ears." },
    ],
  },
  {
    book: "mark",
    chapter: 8,
    title: "Who do you say I am?",
    setting:
      "This is the turning point of Mark. Jesus feeds four thousand in Gentile territory, then heals a blind man in two stages, a picture of the disciples who see only partly. At Caesarea Philippi Peter confesses that Jesus is the Christ. Immediately Jesus teaches that He must suffer, die and rise. Peter objects, and Jesus calls everyone to take up their cross and follow.",
    words: [
      { v: 29, s: 5547, note: "Christos, \"Christ\": the Anointed One, the Greek form of Messiah. Peter is right about the title but wrong about what it means." },
      { v: 34, s: 4716, note: "Stauros, \"cross\". Everyone knew it as a Roman execution device, so this was a shocking call to die to self." },
    ],
  },
  {
    book: "mark",
    chapter: 9,
    title: "Glory on the mountain, need in the valley",
    setting:
      "Jesus is transfigured before Peter, James and John, and the Father says, \"Listen to Him.\" At the foot of the mountain a father brings his son, tormented by an evil spirit, and cries, \"I believe; help my unbelief!\" Jesus heals the boy and again predicts His death. The disciples argue about who is greatest, and Jesus takes a child in His arms.",
    words: [
      { v: 24, s: 570, note: "Apistia, \"unbelief\": lack of faith. The father's honest prayer shows faith can be small and struggling and still be heard." },
      { v: 35, s: 1249, note: "Diakonos, \"servant\": one who waits on others. Greatness in Jesus' kingdom runs downward." },
    ],
  },
  {
    book: "mark",
    chapter: 10,
    title: "The last shall be first",
    setting:
      "On the road to Jerusalem, Jesus teaches on marriage, blesses little children and tells a rich man to sell everything and follow Him. He predicts His death a third time. James and John ask for places of honor, and Jesus says He came to serve and give His life as a ransom. At Jericho blind Bartimaeus calls Him Son of David, receives his sight and follows Him on the road.",
    words: [
      { v: 45, s: 3083, note: "Lytron, \"ransom\": the price that frees a captive. It is the clearest saying in Mark about why Jesus came." },
      { v: 47, s: 1138, note: "Dauid, \"David\". \"Son of David\" was a title for the Messiah. The blind man sees who Jesus is before many others do." },
    ],
  },
  {
    book: "mark",
    chapter: 11,
    title: "A King on a donkey, a fruitless fig tree",
    setting:
      "Jesus enters Jerusalem on a colt as crowds shout from Psalm 118. The next morning He curses a fig tree in leaf but with no fruit, then clears the temple of traders. The two scenes go together: Israel's worship looked healthy but bore no fruit. Mark frames the temple scene with the fig tree to make the point. Jesus then teaches about prayer and faith in God.",
    words: [
      { v: 17, s: 4335, note: "Proseuche, \"prayer\". Jesus quotes Isaiah 56:7: the temple was to be a house of prayer for all nations." },
      { v: 22, s: 4102, note: "Pistis, \"faith\". \"Have faith in God\": faith's power lies not in itself but in the God it trusts." },
    ],
  },
  {
    book: "mark",
    chapter: 12,
    title: "The vineyard, the cornerstone and a widow's coins",
    setting:
      "In the temple courts Jesus tells of tenants who kill the vineyard owner's son, echoing Isaiah 5, and the leaders know He means them. They try to trap Him with questions about taxes and the resurrection. A scribe asks the greatest commandment. Then Jesus watches people give and praises a poor widow who put in two tiny coins, all she had to live on.",
    words: [
      { v: 10, s: 1137, note: "Gonia, \"corner\": the cornerstone (Psalm 118:22). The rejected stone becomes the most important stone in the building." },
      { v: 42, s: 3016, note: "Lepton: the smallest copper coin, worth a tiny fraction of a day's wage. God measures the gift by the heart." },
    ],
  },
  {
    book: "mark",
    chapter: 13,
    title: "Stay awake",
    setting:
      "As they leave the temple, Jesus predicts its destruction, which Rome carried out in AD 70. On the Mount of Olives He warns of false messiahs, wars, persecution and great distress, then speaks of the Son of Man coming in glory. Faithful scholars differ on which parts refer to AD 70 and which to His return. His main command is clear: no one knows the day, so keep watch.",
    words: [
      { v: 26, s: 1391, note: "Doxa, \"glory\": the shining weight of God's presence. The Son of Man of Daniel 7 comes with it." },
      { v: 33, s: 69, note: "Agrypneo, \"be alert\": to stay awake, not sleep. Readiness is a way of living, not a date to calculate." },
    ],
  },
  {
    book: "mark",
    chapter: 14,
    title: "Anointed, betrayed and denied",
    setting:
      "Two days before Passover, a woman in Bethany pours costly perfume on Jesus' head, and He says she has prepared Him for burial. At the Passover meal He gives bread and cup as His body and blood. In Gethsemane He prays \"Abba, Father.\" He is arrested, a young man flees naked, and the council condemns Him. In the courtyard, Peter denies Him three times.",
    words: [
      { v: 3, s: 3464, note: "Myron, \"perfume\": a costly ointment, here pure nard from India, worth about a year's wages." },
      { v: 36, s: 5, note: "Abba: Aramaic for \"Father\", a warm family word. Jesus uses it in His darkest hour." },
    ],
  },
  {
    book: "mark",
    chapter: 15,
    title: "The King on a cross",
    setting:
      "Pilate, the Roman governor, hands Jesus over to be crucified after the crowd chooses Barabbas. Soldiers mock Him with a purple robe and a crown of thorns. Simon of Cyrene, from North Africa, carries the cross. Jesus cries out Psalm 22:1 and dies. The temple curtain tears, and a Roman centurion, of all people, says, \"Truly this man was the Son of God!\" Joseph of Arimathea buries Him.",
    words: [
      { v: 34, s: 1459, note: "Egkataleipo, \"forsaken\": abandoned. Jesus bears sin's separation, yet still calls Him \"My God\"." },
      { v: 39, s: 2760, note: "Kentyrion, \"centurion\": a Roman officer over about a hundred soldiers. The first person in Mark to confess Jesus as God's Son after His death is a Gentile." },
    ],
  },
  {
    book: "mark",
    chapter: 16,
    title: "He has risen",
    setting:
      "Early on Sunday, women come to anoint Jesus' body and find the stone rolled away and a young man in white who says, \"He has risen!\" The oldest manuscripts end at verse 8, with the women afraid. Most scholars think verses 9 to 20 were added later, drawing on the other Gospels; many Bibles bracket them. Either way, the empty tomb and the risen Lord are at the heart of the gospel.",
    words: [
      { v: 6, s: 1453, note: "Egeiro, \"risen\": raised up. The form is passive: God raised Him, as the apostles preached." },
      { v: 7, s: 4074, note: "Petros, \"Peter\". \"Tell His disciples and Peter\": the one who denied Him is named for restoration." },
    ],
  },
  {
    book: "luke",
    chapter: 1,
    title: "Two promised births",
    setting:
      "Luke, a doctor and Paul's travel companion, writes an orderly account for Theophilus after carefully checking eyewitnesses. He begins in the temple, where the angel Gabriel tells the old priest Zechariah that his barren wife Elizabeth will bear John. Then Gabriel visits Mary, a young woman engaged to Joseph in Nazareth, and announces she will conceive the Son of God by the Holy Spirit. Mary answers in faith and praise.",
    words: [
      { v: 3, s: 3877, note: "Parakoloutheo, \"carefully investigated\": to follow closely alongside. Luke presents his Gospel as checked history." },
      { v: 46, s: 3170, note: "Megalyno, \"magnifies\": to make great. Mary's song (the Magnificat) is soaked in Old Testament praise, like Hannah's in 1 Samuel 2." },
    ],
  },
  {
    book: "luke",
    chapter: 3,
    title: "John the Baptist, and Jesus' family line",
    setting:
      "Luke dates John's ministry precisely: the fifteenth year of Emperor Tiberius, around AD 28 or 29, naming the rulers of the day. John calls crowds, tax collectors and soldiers to show their repentance by honest, generous living. Jesus is baptized, and the Father speaks from heaven. Luke's genealogy then runs backward past Abraham all the way to Adam, showing Jesus came for all humanity.",
    words: [
      { v: 8, s: 2590, note: "Karpos, \"fruit\". Real repentance shows up in changed behavior: sharing, honesty, no extortion." },
      { v: 38, s: 76, note: "Adam. Luke traces Jesus to \"Adam, the son of God\". Jesus is the new Adam who succeeds in the test that follows." },
    ],
  },
  {
    book: "luke",
    chapter: 4,
    title: "Jesus announces His mission in Nazareth",
    setting:
      "After forty days of testing in the wilderness, Jesus returns to Galilee in the Spirit's power. In His hometown synagogue He reads Isaiah 61 about good news for the poor, freedom for captives and the year of the Lord's favor, then says, \"Today this Scripture is fulfilled.\" When He reminds them God once blessed Gentiles through Elijah and Elisha, the crowd tries to throw Him off a cliff.",
    words: [
      { v: 18, s: 5548, note: "Chrio, \"anointed\": the root of \"Christ\". Jesus says the Spirit has anointed Him for this mission." },
      { v: 18, s: 859, note: "Aphesis, \"freedom\": release, also the word for forgiveness. It recalls the Jubilee, when debts were cancelled and slaves set free." },
    ],
  },
  {
    book: "luke",
    chapter: 5,
    title: "Fishermen, a leper and a tax collector",
    setting:
      "Peter has fished all night with nothing. At Jesus' word he lets down the nets and catches so many fish the boats begin to sink. Peter falls at Jesus' knees, aware of his sin. Jesus calls him to catch people instead. He touches a leper, forgives and heals a paralyzed man let down through a roof, and calls Levi the tax collector, then eats with his sinful friends.",
    words: [
      { v: 8, s: 268, note: "Hamartolos, \"sinful\". Peter's first response to Jesus' power is not pride but a deep sense of unworthiness." },
      { v: 32, s: 3341, note: "Metanoia, \"repentance\": a change of mind that turns a life around. Jesus calls sinners to it." },
    ],
  },
  {
    book: "luke",
    chapter: 6,
    title: "The Sermon on the Plain",
    setting:
      "After a night of prayer, Jesus chooses twelve apostles. On a level place with a great crowd, He gives teaching much like Matthew's Sermon on the Mount, likely His regular teaching in a shorter form. Luke's version has four blessings and four woes, sharply contrasting the poor and the rich. Jesus calls His followers to love enemies, do good, lend expecting nothing and be merciful as the Father is.",
    words: [
      { v: 20, s: 4434, note: "Ptochos, \"poor\": the truly destitute, who had to beg. Luke often shows God's concern for the poor." },
      { v: 36, s: 3629, note: "Oiktirmon, \"merciful\": full of compassion. Mercy is the family likeness of God's children." },
    ],
  },
  {
    book: "luke",
    chapter: 7,
    title: "Faith in unexpected people",
    setting:
      "A Roman centurion who built a synagogue trusts Jesus to heal his servant with only a word. At Nain Jesus meets a funeral for a widow's only son, her one source of support, and raises him. John the Baptist sends questions from prison. At a Pharisee's dinner, a woman known as a sinner weeps over Jesus' feet. He forgives her and says those forgiven much love much.",
    words: [
      { v: 13, s: 4697, note: "Splanchnizomai, \"had compassion\". Jesus' heart goes out to the widow before she asks for anything." },
      { v: 47, s: 25, note: "Agapao, \"loved\". Her love does not earn forgiveness; it flows from the forgiveness she has received (v. 50)." },
    ],
  },
  {
    book: "luke",
    chapter: 8,
    title: "Hearing the word and seeing His power",
    setting:
      "Luke notes that women who had been healed traveled with Jesus and supported the ministry from their own means, unusual in that culture. Jesus tells the parable of the soils and says His true family hears and does God's word. Then He calms a storm, frees a man possessed by many demons, heals a woman bleeding for twelve years and raises Jairus's daughter.",
    words: [
      { v: 3, s: 1247, note: "Diakoneo, \"supported\": to serve, provide for. These women funded Jesus' ministry and later witnessed His death and empty tomb." },
      { v: 15, s: 5281, note: "Hypomone, \"perseverance\": patient endurance. The good soil bears fruit slowly, by holding on." },
    ],
  },
  {
    book: "luke",
    chapter: 9,
    title: "Who is this Jesus?",
    setting:
      "The question of Jesus' identity drives this chapter. Herod asks it; Jesus feeds five thousand; Peter confesses Him as God's Christ. Jesus predicts His death and calls disciples to take up their cross daily. On the mountain He is transfigured and talks with Moses and Elijah about His coming departure. Then He resolutely sets His face toward Jerusalem, where the cross awaits.",
    words: [
      { v: 31, s: 1841, note: "Exodos, \"departure\": literally \"exodus\". Jesus' death and resurrection will be a new exodus, freeing His people." },
      { v: 51, s: 4741, note: "Sterizo, \"set\" or \"resolutely\": to fix firmly. Jesus walks toward the cross with steady purpose." },
    ],
  },
  {
    book: "luke",
    chapter: 10,
    title: "The Good Samaritan, and Mary and Martha",
    setting:
      "Jesus sends seventy-two ahead of Him. A lawyer asks, \"Who is my neighbor?\" Jews and Samaritans despised each other over centuries of ethnic and religious conflict. In Jesus' story a priest and Levite pass by a beaten man, but a Samaritan stops and cares for him at cost. Then in Martha's home, Mary sits at Jesus' feet like a disciple, and Jesus says she chose the better part.",
    words: [
      { v: 29, s: 4139, note: "Plesion, \"neighbor\": one who is near. Jesus turns the question around: be a neighbor to whoever needs you." },
      { v: 42, s: 5532, note: "Chreia, \"needed\": a necessity. Only one thing is truly needed: listening to Jesus." },
    ],
  },
  {
    book: "luke",
    chapter: 11,
    title: "Teach us to pray",
    setting:
      "Jesus often withdrew to pray, and the disciples ask Him to teach them as John taught his disciples. He gives a short form of the Lord's Prayer and a story about a friend at midnight. In that culture, refusing hospitality brought shame on the whole village. If a grudging neighbor helps, how much more will the Father give the Holy Spirit. The chapter ends with sharp words to the Pharisees.",
    words: [
      { v: 2, s: 3962, note: "Pater, \"Father\". Jesus invites His followers to address God with the same family closeness He has." },
      { v: 8, s: 335, note: "Anaideia, \"boldness\": shameless persistence. The man asks boldly, and God welcomes bold prayer." },
    ],
  },
  {
    book: "luke",
    chapter: 12,
    title: "Rich toward God",
    setting:
      "A man asks Jesus to settle an inheritance dispute. Jesus warns against greed and tells of a rich farmer who builds bigger barns and dies that night. Life is not measured by possessions. He tells His followers not to worry: God feeds ravens, which the law called unclean, and clothes the lilies. Seek His kingdom, give generously and be ready like servants waiting for their master.",
    words: [
      { v: 15, s: 4124, note: "Pleonexia, \"greed\": the desire to have more. Paul calls it a form of idolatry (Colossians 3:5)." },
      { v: 32, s: 4168, note: "Poimnion, \"little flock\". Jesus calls His fearful followers by a tender name: the Father is glad to give them the kingdom." },
    ],
  },
  {
    book: "luke",
    chapter: 13,
    title: "Repent, and see the kingdom grow",
    setting:
      "People tell Jesus about Galileans killed by Pilate. Jesus asks whether they were worse sinners and says no: everyone must repent. He tells of a fig tree given one more year. On the Sabbath He heals a woman bent over for eighteen years, calling her a daughter of Abraham. When warned that Herod wants to kill Him, He keeps going to Jerusalem and laments over it.",
    words: [
      { v: 3, s: 3340, note: "Metanoeo, \"repent\": to turn around. Tragedy is not proof that its victims were worse than others; it is a call for all to turn to God." },
      { v: 24, s: 75, note: "Agonizomai, \"strive\": to struggle, as in an athletic contest. Entering the narrow door is urgent." },
    ],
  },
  {
    book: "luke",
    chapter: 14,
    title: "Who gets invited to the banquet?",
    setting:
      "At a Pharisee's Sabbath meal, Jesus watches guests compete for the best seats, since seating showed social rank. He tells them to take the lowest place and to invite the poor, crippled and blind who cannot repay. His parable of the great banquet shows invited guests making excuses while outsiders fill the house. Then He tells the crowds to count the cost of following Him.",
    words: [
      { v: 11, s: 5013, note: "Tapeinoo, \"humbles\": to make low. In God's kingdom honor is given, not grabbed." },
      { v: 28, s: 1160, note: "Dapane, \"cost\": an expense. Following Jesus is free grace, yet it costs everything we have." },
    ],
  },
  {
    book: "luke",
    chapter: 16,
    title: "Shrewd stewards and the rich man",
    setting:
      "Jesus tells of a dishonest manager who cuts his master's debtors' bills to secure friends before being fired. Jesus does not praise the dishonesty but the foresight: use money with eternity in view. The Pharisees, who loved money, sneer. Then He tells of a rich man and poor Lazarus, whose fortunes reverse after death. Christians debate how literally to take its details about the afterlife; its warning is plain.",
    words: [
      { v: 8, s: 5429, note: "Phronimos, \"shrewd\": wise, thinking ahead. Jesus wants His followers to think as carefully about eternity as others do about money." },
      { v: 13, s: 3126, note: "Mammonas, \"money\": wealth as a master that demands service. You cannot serve both God and money." },
    ],
  },
  {
    book: "luke",
    chapter: 17,
    title: "Faith, duty and thanks",
    setting:
      "Jesus warns against causing others to stumble and urges forgiving a repentant brother every time. The apostles ask for more faith, and He says even tiny faith is enough. On the border between Samaria and Galilee, ten lepers call to Him from a distance, as the law required. All ten are healed, but only one, a Samaritan, comes back to thank Him. Jesus then speaks about the coming of the kingdom.",
    words: [
      { v: 16, s: 2168, note: "Eucharisteo, \"thanked\": to give thanks. The same word later named the Lord's Supper, the Eucharist." },
      { v: 21, s: 1787, note: "Entos, \"in your midst\" or \"within you\". Most scholars think Jesus means the kingdom is already present among them in Himself." },
    ],
  },
  {
    book: "luke",
    chapter: 18,
    title: "Persistent prayer and humble trust",
    setting:
      "Jesus tells of a widow, one of the most powerless people of the time, who keeps pestering an unjust judge until he gives her justice. How much more will God answer His children. Then a Pharisee and a tax collector pray in the temple; the one who begs for mercy goes home justified. Jesus welcomes children, a rich ruler turns away, and a blind beggar near Jericho receives his sight.",
    words: [
      { v: 13, s: 2433, note: "Hilaskomai, \"have mercy\": be propitiated, be merciful through atonement. He asks God to deal with his sin the way the temple sacrifices promised." },
      { v: 14, s: 1344, note: "Dikaioo, \"justified\": declared right with God. Humility before God, not religious performance, is the way." },
    ],
  },
  {
    book: "luke",
    chapter: 19,
    title: "Zacchaeus, and the King comes to Jerusalem",
    setting:
      "Jericho was a wealthy trade city, and Zacchaeus was a chief tax collector, rich and despised. He climbs a sycamore tree to see Jesus, and Jesus invites Himself to his home. Zacchaeus repents and repays generously. Jesus says He came to seek and save the lost. He rides into Jerusalem to praise, then weeps over the city, foreseeing its destruction, and clears the temple.",
    words: [
      { v: 10, s: 622, note: "Apollymi, \"lost\": ruined, perishing. Jesus' mission is summed up in one sentence: to seek and to save the lost." },
      { v: 41, s: 2799, note: "Klaio, \"wept\": to weep aloud. The King grieves over the city that will reject Him." },
    ],
  },
  {
    book: "luke",
    chapter: 20,
    title: "By what authority?",
    setting:
      "In the temple courts during His last week, the chief priests, scribes and elders challenge Jesus' authority. He answers with a question about John's baptism, then tells the parable of the wicked tenants who kill the owner's son. Spies ask about taxes to Caesar, and Sadducees, who rejected the resurrection, try to stump Him. Jesus says God is the God of the living.",
    words: [
      { v: 2, s: 1849, note: "Exousia, \"authority\": the right to act. The leaders ask who gave Jesus this right; the answer is His Father." },
      { v: 38, s: 2198, note: "Zao, \"live\". To God, Abraham, Isaac and Jacob are alive, proof of the resurrection hope." },
    ],
  },
  {
    book: "luke",
    chapter: 21,
    title: "A widow's gift and the temple's end",
    setting:
      "Jesus praises a poor widow who gives two small coins. When people admire the temple's beautiful stones, He predicts its destruction and warns of wars, persecution and Jerusalem surrounded by armies, fulfilled in AD 70. He also speaks of signs in the heavens and the Son of Man coming in a cloud. Interpreters differ on how these parts fit together; His call to watch and pray is clear.",
    words: [
      { v: 19, s: 5281, note: "Hypomone, \"endurance\": steady perseverance under pressure. By standing firm, believers gain life." },
      { v: 28, s: 629, note: "Apolytrosis, \"redemption\": release by paying a price. For believers the end is not doom but deliverance." },
    ],
  },
  {
    book: "luke",
    chapter: 22,
    title: "The Last Supper and the arrest",
    setting:
      "The Passover meal remembered God rescuing Israel from Egypt. At it Jesus takes bread and the cup and speaks of His body given and the new covenant in His blood. The disciples then argue about who is greatest. Jesus warns Peter he will deny Him but prays for his faith. On the Mount of Olives He prays in such anguish His sweat falls like drops of blood.",
    words: [
      { v: 19, s: 364, note: "Anamnesis, \"remembrance\": calling to mind in a way that makes the past present. The supper keeps Jesus' sacrifice at the center." },
      { v: 44, s: 74, note: "Agonia, \"anguish\": intense struggle, the source of our word \"agony\". Jesus faces the cross fully aware of its cost." },
    ],
  },
  {
    book: "luke",
    chapter: 23,
    title: "Crucified between two criminals",
    setting:
      "Jesus is passed between Pilate, the Roman governor, and Herod Antipas, ruler of Galilee, both of whom find Him innocent. Pilate gives in to the crowd. On the way to the cross Jesus speaks to grieving women. Crucified between criminals, He prays for His executioners' forgiveness and promises a dying thief paradise. A centurion declares Him righteous, and Joseph of Arimathea buries Him.",
    words: [
      { v: 34, s: 863, note: "Aphiemi, \"forgive\". Jesus prays for the very people driving the nails." },
      { v: 43, s: 3857, note: "Paradeisos, \"paradise\": a Persian word for a walled garden. It recalls Eden: the thief will be with Jesus that very day." },
    ],
  },
  {
    book: "john",
    chapter: 2,
    title: "Water into wine",
    setting:
      "Weddings in Galilee could last a week, and running out of wine would shame the groom's family for years. At Cana, Jesus turns about 150 gallons of water, held in stone jars used for Jewish purification rites, into the best wine. John calls it the first of His signs, revealing His glory. Then in Jerusalem at Passover He clears the temple and speaks of the temple of His body.",
    words: [
      { v: 11, s: 4592, note: "Semeion, \"sign\": a miracle that points beyond itself. John's Gospel is built around signs that reveal who Jesus is." },
      { v: 19, s: 3485, note: "Naos, \"temple\": the sanctuary itself. Jesus' body is where God dwells, and it will be raised in three days." },
    ],
  },
  {
    book: "john",
    chapter: 5,
    title: "Healing at the pool, and the Son's authority",
    setting:
      "The pool of Bethesda, with five covered colonnades, has been excavated in Jerusalem near the Sheep Gate. Sick people waited there, hoping the stirred water would heal them. Jesus heals a man who had been disabled for thirty-eight years, on the Sabbath. When the leaders object, Jesus calls God His own Father and claims the Father's work of giving life and judging. They rightly hear Him making Himself equal with God.",
    words: [
      { v: 18, s: 2470, note: "Isos, \"equal\". The leaders understood Jesus' claim exactly; that is why they wanted to kill Him." },
      { v: 24, s: 2222, note: "Zoe, \"life\". Whoever hears and believes already has eternal life and has crossed from death to life." },
    ],
  },
  {
    book: "john",
    chapter: 7,
    title: "Rivers of living water",
    setting:
      "The Feast of Tabernacles was a joyful autumn festival when Jews lived in shelters, remembering the wilderness journey. Each day priests poured water from the pool of Siloam at the altar, praying for rain and recalling the water from the rock. On the last day Jesus stands and cries out that anyone thirsty should come to Him. Jerusalem is divided over whether He is the Christ.",
    words: [
      { v: 37, s: 1372, note: "Dipsao, \"thirsts\". Jesus offers what the festival only pictured: Himself, the source of living water." },
      { v: 39, s: 4151, note: "Pneuma, \"Spirit\". John explains the living water is the Holy Spirit, given after Jesus is glorified." },
    ],
  },
  {
    book: "john",
    chapter: 8,
    title: "The light of the world",
    setting:
      "The story of the woman caught in adultery (7:53 to 8:11) is missing from the earliest manuscripts, and most scholars think it was added later, though many believe it records a true event. During the Feast of Tabernacles, huge lamps lit the temple courts. There Jesus says, \"I am the light of the world.\" The debate sharpens until He says, \"Before Abraham was, I am.\"",
    words: [
      { v: 12, s: 5457, note: "Phos, \"light\". Jesus claims to be what God was for Israel in the wilderness pillar of fire." },
      { v: 58, s: 1510, note: "Eimi, \"I am\". Jesus uses God's own name from Exodus 3:14, and His hearers pick up stones." },
    ],
  },
  {
    book: "john",
    chapter: 9,
    title: "A man born blind sees",
    setting:
      "The disciples assume the man's blindness must be punishment for sin. Jesus says it happened so God's works could be displayed. He makes mud, puts it on the man's eyes and sends him to wash in the pool of Siloam. The Pharisees interrogate the man and his parents and throw him out of the synagogue. The man who was blind sees more and more clearly who Jesus is.",
    words: [
      { v: 7, s: 649, note: "Apostello, \"sent\": the root of \"apostle\". John notes Siloam means \"Sent\", pointing to Jesus, the One sent by the Father." },
      { v: 38, s: 4352, note: "Proskuneo, \"worshiped\". The man ends where the Gospel wants every reader to end: believing and worshiping Jesus." },
    ],
  },
  {
    book: "john",
    chapter: 12,
    title: "The hour has come",
    setting:
      "Six days before Passover, Mary of Bethany anoints Jesus' feet with costly perfume. The next day crowds wave palm branches, a symbol of Jewish national hope, as He rides into Jerusalem. When some Greeks ask to see Him, Jesus says His hour has come. Like a grain of wheat, He must die to bear much fruit. Lifted up on the cross, He will draw all people to Himself.",
    words: [
      { v: 24, s: 2848, note: "Kokkos, \"kernel\" or \"grain\". A seed must be buried to multiply. Jesus' death is the way to life for many." },
      { v: 32, s: 5312, note: "Hypsoo, \"lifted up\": raised high, exalted. In John it means both the cross and Jesus' glory." },
    ],
  },
  {
    book: "john",
    chapter: 13,
    title: "The Teacher washes feet",
    setting:
      "Washing guests' dusty feet was a job for the lowest servant. At the meal before Passover, Jesus, knowing the Father had put all things in His hands, takes a towel and washes His disciples' feet, even Judas's. Peter protests. Jesus calls it an example of humble love and gives a new commandment: love one another as I have loved you. Judas leaves into the night.",
    words: [
      { v: 1, s: 5056, note: "Telos, \"to the end\": to the uttermost. Jesus loved His own completely, all the way to the cross." },
      { v: 34, s: 2537, note: "Kainos, \"new\": fresh in quality. The command to love is old, but the measure is new: as Jesus loved." },
    ],
  },
  {
    book: "john",
    chapter: 15,
    title: "The vine and the branches",
    setting:
      "On the night before His death, Jesus pictures Himself as the true vine. In the Old Testament Israel was God's vine, often fruitless (Isaiah 5). Jesus is the faithful Israel, and His followers are branches who live by staying joined to Him. He calls them friends, not servants, and warns that the world that hated Him will hate them too. The Spirit will testify about Him.",
    words: [
      { v: 4, s: 3306, note: "Meno, \"remain\" or \"abide\": to stay, dwell, continue. It appears again and again in this chapter." },
      { v: 15, s: 5384, note: "Philos, \"friends\". Jesus shares His Father's heart with His followers and lays down His life for them." },
    ],
  },
  {
    book: "john",
    chapter: 16,
    title: "The Helper is coming",
    setting:
      "Jesus prepares His grieving disciples for His departure. He says it is better that He goes, because then He will send the Spirit, who will convict the world and guide them into all truth. Their sorrow will turn to joy, like a mother's after childbirth. He warns that they will face trouble in the world, but they can take heart: He has overcome the world.",
    words: [
      { v: 7, s: 3875, note: "Parakletos, \"Helper\" or \"Advocate\": one called alongside to help, like a defense counsel." },
      { v: 33, s: 3528, note: "Nikao, \"overcome\": to conquer, win the victory. Spoken the night before the cross, as if it were already done." },
    ],
  },
  {
    book: "john",
    chapter: 17,
    title: "Jesus prays for His people",
    setting:
      "This is the longest recorded prayer of Jesus, often called His High Priestly Prayer. Like the high priest who carried the tribes' names before God, Jesus prays for Himself, for His disciples and for all who will believe through their message. He asks that they be kept from the evil one, made holy by the truth, and be one as the Father and Son are one.",
    words: [
      { v: 3, s: 1097, note: "Ginosko, \"know\": a personal, relational knowing. Eternal life is knowing God and Jesus Christ whom He sent." },
      { v: 17, s: 37, note: "Hagiazo, \"sanctify\": set apart as holy. God's word is the truth that makes His people holy." },
    ],
  },
  {
    book: "john",
    chapter: 18,
    title: "Arrested, tried and denied",
    setting:
      "In a garden across the Kidron Valley, Judas leads soldiers and temple police to arrest Jesus. When Jesus says \"I am He\", they fall back. He is taken to Annas, the powerful former high priest, then to Caiaphas. Peter denies Him by a charcoal fire. At dawn Jesus stands before Pilate and says His kingdom is not of this world. Pilate asks, \"What is truth?\"",
    words: [
      { v: 6, s: 1510, note: "Eimi, \"I am\". Jesus' simple \"I am He\" echoes God's name, and armed men fall to the ground." },
      { v: 36, s: 932, note: "Basileia, \"kingdom\". Jesus' kingdom does not come from this world, but it truly rules over it." },
    ],
  },
  {
    book: "john",
    chapter: 19,
    title: "It is finished",
    setting:
      "Pilate has Jesus flogged, and soldiers mock Him as king. The crowd cries, \"We have no king but Caesar.\" Jesus carries His own cross to Golgotha, where a sign in Hebrew, Latin and Greek names Him King of the Jews. He entrusts His mother to the beloved disciple and dies. His death comes as Passover lambs were being prepared. Nicodemus and Joseph give Him a rich man's burial.",
    words: [
      { v: 30, s: 5055, note: "Teleo, \"it is finished\": completed, paid in full. The word appeared on receipts. Jesus' saving work is done." },
      { v: 36, s: 4937, note: "Syntribo, \"broken\". No bone of Jesus was broken, like the Passover lamb (Exodus 12:46)." },
    ],
  },
  {
    book: "john",
    chapter: 21,
    title: "Breakfast on the shore",
    setting:
      "Back in Galilee, Peter and others fish all night and catch nothing. At dawn the risen Jesus tells them to cast the net on the right side, and it fills with 153 large fish. He cooks them breakfast over a charcoal fire. By a charcoal fire Peter denied Him three times; now Jesus asks three times, \"Do you love Me?\" and recommissions him to care for His sheep.",
    words: [
      { v: 15, s: 25, note: "Agapao, \"love\". Jesus and Peter use two different verbs for love here, though many scholars think John uses them for variety." },
      { v: 17, s: 4263, note: "Probaton, \"sheep\". Jesus entrusts His flock to the man who failed Him. Restoration leads to service." },
    ],
  },
  {
    book: "acts",
    chapter: 1,
    title: "Waiting for the promised Spirit",
    setting:
      "Acts is Luke's second volume, continuing what Jesus began to do and teach. For forty days the risen Jesus appears to His apostles. They ask if He will now restore the kingdom to Israel; He says to wait for the Spirit and be His witnesses in Jerusalem, Judea, Samaria and to the ends of the earth. That verse outlines the whole book. He ascends, and they choose Matthias to replace Judas.",
    words: [
      { v: 8, s: 3144, note: "Martys, \"witness\": one who testifies to what they have seen. Later the word came to mean \"martyr\", since many died for their testimony." },
      { v: 14, s: 3661, note: "Homothymadon, \"with one accord\": with one mind and passion. The early church waited and prayed together." },
    ],
  },
  {
    book: "acts",
    chapter: 3,
    title: "A lame man walks at the Beautiful Gate",
    setting:
      "Jews prayed at the temple at set hours, and three in the afternoon was a time of prayer and sacrifice. At the temple gate Peter and John meet a man lame from birth, carried there daily to beg. Peter has no money but heals him in Jesus' name. As a crowd gathers in Solomon's Colonnade, Peter preaches that they killed the Author of life, whom God raised, and calls them to repent.",
    words: [
      { v: 15, s: 747, note: "Archegos, \"Author\": founder, pioneer, the one who leads the way. They killed the very source of life." },
      { v: 19, s: 1813, note: "Exaleipho, \"wiped out\" or \"blotted out\": erased, like writing washed off a papyrus. That is what God does with repented sin." },
    ],
  },
  {
    book: "acts",
    chapter: 4,
    title: "No other name",
    setting:
      "Peter and John are arrested and brought before the Sanhedrin, the same council that condemned Jesus. Filled with the Spirit, Peter says salvation is found in no one else. The leaders are amazed at their boldness, since these were ordinary men without formal rabbinic training, and they recognize they had been with Jesus. Released, the church prays for more boldness and shares possessions so none are in need.",
    words: [
      { v: 12, s: 4991, note: "Soteria, \"salvation\": rescue, deliverance, healing. There is no other name by which we must be saved." },
      { v: 13, s: 3954, note: "Parresia, \"boldness\": freedom of speech, confidence. It is a mark of the Spirit-filled church throughout Acts." },
    ],
  },
  {
    book: "acts",
    chapter: 5,
    title: "Lying to the Spirit, and obeying God",
    setting:
      "Ananias and Sapphira sell property but secretly keep part while pretending to give it all. Peter says they lied not to people but to God, the Holy Spirit, and both fall dead. Great fear seizes the church. The apostles keep healing, are jailed, freed by an angel, and arrested again. The respected teacher Gamaliel advises caution. Beaten, the apostles rejoice to suffer for Jesus' name.",
    words: [
      { v: 3, s: 5574, note: "Pseudomai, \"lie\". Verses 3 and 4 treat lying to the Holy Spirit as lying to God, a quiet witness to the Spirit's deity." },
      { v: 29, s: 3980, note: "Peitharcheo, \"obey\": to obey one in authority. When human rulers forbid what God commands, God comes first." },
    ],
  },
  {
    book: "acts",
    chapter: 6,
    title: "Seven servants and Stephen",
    setting:
      "The church included Greek-speaking Jews from across the empire and Aramaic-speaking Jews from Judea. When Greek-speaking widows are overlooked in the daily food distribution, the apostles have the church choose seven Spirit-filled men to serve, so they can devote themselves to prayer and the word. All seven have Greek names. One of them, Stephen, does great wonders and is seized on false charges against the temple and the law.",
    words: [
      { v: 1, s: 1248, note: "Diakonia, \"distribution\": service, ministry. Many see the office of deacon beginning here." },
      { v: 4, s: 4342, note: "Proskartereo, \"devote\": to persist in, give constant attention to. The apostles keep prayer and preaching at the center." },
    ],
  },
  {
    book: "acts",
    chapter: 7,
    title: "Stephen's speech and death",
    setting:
      "Stephen answers the Sanhedrin with a sweep of Israel's history: God met Abraham in Mesopotamia, was with Joseph in Egypt and spoke to Moses in the desert. God was never confined to one building. Again and again Israel rejected the deliverers God sent, and now they have killed the Righteous One. Enraged, they stone him. He sees Jesus standing at God's right hand and dies forgiving them. A young man named Saul approves.",
    words: [
      { v: 48, s: 5499, note: "Cheiropoietos, \"made by hands\": often used of idols. God, who made everything, does not live in what humans build." },
      { v: 59, s: 1941, note: "Epikaleo, \"called on\": appealed to. Stephen prays to Jesus as Jesus prayed to the Father." },
    ],
  },
  {
    book: "acts",
    chapter: 8,
    title: "The gospel reaches Samaria and Africa",
    setting:
      "Persecution scatters the believers, and Saul tries to destroy the church. Philip preaches in Samaria, whose people Jews had long despised, and many believe. When Peter and John come, the Samaritans receive the Spirit; Christians explain this delay in different ways. A sorcerer tries to buy the Spirit's power. Then Philip meets an Ethiopian court official reading Isaiah 53, tells him about Jesus and baptizes him.",
    words: [
      { v: 4, s: 2097, note: "Euangelizo, \"preached\": announced good news. Persecution meant to stop the church only spread the gospel." },
      { v: 27, s: 2135, note: "Eunouchos, \"eunuch\": often a court official. Isaiah 56 promised such outsiders a place among God's people." },
    ],
  },
  {
    book: "acts",
    chapter: 9,
    title: "Saul meets the risen Jesus",
    setting:
      "Saul, a zealous Pharisee, travels to Damascus with letters to arrest followers of the Way. A light flashes, and Jesus asks why he persecutes Him: to harm His people is to harm Him. Blind, Saul is led into the city. A disciple named Ananias, afraid but obedient, lays hands on him. Saul is baptized and starts preaching that Jesus is the Son of God. Peter heals Aeneas and raises Tabitha.",
    words: [
      { v: 2, s: 3598, note: "Hodos, \"the Way\": an early name for the faith. Jesus called Himself the way (John 14:6)." },
      { v: 15, s: 4632, note: "Skeuos, \"instrument\" or \"vessel\": a tool or container. God chose His fiercest enemy to carry His name to the nations." },
    ],
  },
  {
    book: "acts",
    chapter: 10,
    title: "Peter and the Roman centurion",
    setting:
      "Cornelius is a Roman officer in Caesarea who fears God, prays and gives to the poor. An angel tells him to send for Peter. Meanwhile Peter sees a vision of unclean animals and hears, \"Do not call anything impure that God has made clean.\" Devout Jews did not enter Gentile homes, but Peter goes. As he preaches, the Holy Spirit falls on the Gentiles listening, and they are baptized.",
    words: [
      { v: 15, s: 2840, note: "Koinoo, \"call impure\": to make common or unclean. God was removing the wall between Jew and Gentile." },
      { v: 34, s: 4381, note: "Prosopoleptes, \"shows favoritism\": one who judges by outward appearance. God welcomes people of every nation." },
    ],
  },
  {
    book: "acts",
    chapter: 11,
    title: "Christians in Antioch",
    setting:
      "Jewish believers in Jerusalem criticize Peter for eating with Gentiles, so he tells what happened, and they praise God. Meanwhile scattered believers reach Antioch in Syria, the third largest city in the empire, and some preach to Greeks. Many believe. Barnabas is sent, then fetches Saul from Tarsus, and they teach for a year. When famine is predicted, the Antioch church sends relief to Judea.",
    words: [
      { v: 23, s: 3870, note: "Parakaleo, \"encouraged\": to come alongside and urge on. Barnabas, whose name means \"son of encouragement\", lives up to it." },
      { v: 26, s: 5546, note: "Christianos, \"Christian\": a follower of Christ. The name was probably first given by outsiders, maybe as a label or a jibe." },
    ],
  },
  {
    book: "acts",
    chapter: 12,
    title: "Peter freed, Herod struck down",
    setting:
      "Herod Agrippa I, grandson of Herod the Great, kills James the brother of John and arrests Peter, planning a public trial after Passover. Peter sleeps chained between two soldiers while the church prays earnestly. An angel leads him out, and the believers at first cannot believe it is really him. Later Herod accepts praise as a god, and the Jewish historian Josephus also records his sudden, painful death.",
    words: [
      { v: 5, s: 1619, note: "Ektenos, \"earnestly\": stretched out, intense, without letting up. The same root describes Jesus' prayer in Gethsemane (Luke 22:44)." },
      { v: 24, s: 837, note: "Auxano, \"spread\": to grow. The tyrant dies, but the word of God keeps growing." },
    ],
  },
  {
    book: "acts",
    chapter: 13,
    title: "The first missionary journey",
    setting:
      "In Antioch the Spirit says to set apart Barnabas and Saul. Sent off with prayer, they sail to Cyprus, Barnabas's home island, where the Roman governor believes. From here Luke calls Saul by his Roman name, Paul. In Pisidian Antioch Paul preaches in the synagogue, tracing Israel's story to Jesus' resurrection. Many Gentiles rejoice, but some Jewish leaders stir up opposition and drive them out.",
    words: [
      { v: 2, s: 873, note: "Aphorizo, \"set apart\": to mark off for a purpose. Paul later says God set him apart even before birth (Galatians 1:15)." },
      { v: 39, s: 1344, note: "Dikaioo, \"justified\": declared right. Through Jesus, everyone who believes is justified, as the law of Moses could never do." },
    ],
  },
  {
    book: "acts",
    chapter: 14,
    title: "Mistaken for gods",
    setting:
      "Paul and Barnabas preach in the towns of Iconium, Lystra and Derbe in what is now Turkey. At Lystra Paul heals a man lame from birth, and the crowd, recalling a local legend of Zeus and Hermes visiting in disguise, tries to offer sacrifices to them. They tear their clothes and point to the living God. Soon after, Paul is stoned and left for dead, but he gets up and goes on.",
    words: [
      { v: 22, s: 2347, note: "Thlipsis, \"hardships\": pressure, affliction. Entering God's kingdom involves real suffering, and the apostles say so plainly." },
      { v: 23, s: 4245, note: "Presbyteros, \"elders\": older, mature leaders. Paul and Barnabas appoint them in each new church." },
    ],
  },
  {
    book: "acts",
    chapter: 15,
    title: "The Jerusalem council",
    setting:
      "Some believers from Judea teach that Gentiles must be circumcised and keep the law of Moses to be saved. The church in Jerusalem meets to decide. Peter says God saves Jews and Gentiles alike by grace through faith. James quotes Amos and proposes that Gentiles not be burdened, only asked to avoid certain practices that would offend Jewish believers. Scholars differ on exactly why those four rules were chosen.",
    words: [
      { v: 9, s: 2511, note: "Katharizo, \"purified\": made clean. God cleansed Gentile hearts by faith, not by circumcision." },
      { v: 11, s: 5485, note: "Charis, \"grace\": God's undeserved favor. Peter says even Jewish believers are saved this way." },
    ],
  },
  {
    book: "acts",
    chapter: 16,
    title: "The gospel crosses into Europe",
    setting:
      "On his second journey Paul takes Timothy along. The Spirit closes some doors, and a vision of a man from Macedonia calls them to Greece. At Philippi, a Roman colony, Lydia, a dealer in purple cloth, believes. Paul frees a slave girl from a spirit, and her owners have Paul and Silas beaten and jailed. At midnight they sing hymns, an earthquake opens the doors, and the jailer and his household believe.",
    words: [
      { v: 14, s: 1272, note: "Dianoigo, \"opened\": to open fully. The Lord opened Lydia's heart. Faith is God's gift." },
      { v: 31, s: 4100, note: "Pisteuo, \"believe\": to trust, rely on. The jailer asks how to be saved; the answer is simple trust in the Lord Jesus." },
    ],
  },
  {
    book: "acts",
    chapter: 17,
    title: "Paul in Athens",
    setting:
      "In Thessalonica the gospel causes uproar, and in Berea people check Paul's message against the Scriptures daily. In Athens, still the center of Greek philosophy, Paul is troubled by a city full of idols. At the Areopagus, a council of leading citizens, he speaks to Epicurean and Stoic thinkers, quotes their own poets and proclaims the unknown God who made everything and has raised Jesus from the dead.",
    words: [
      { v: 11, s: 350, note: "Anakrino, \"examined\": to investigate carefully. The Bereans tested even an apostle's teaching against Scripture." },
      { v: 23, s: 57, note: "Agnostos, \"unknown\". Paul starts with their altar to an unknown god and makes Him known." },
    ],
  },
  {
    book: "acts",
    chapter: 18,
    title: "A long stay in Corinth",
    setting:
      "Corinth was a busy port city known for wealth and immorality. Paul works there making tents with Aquila and Priscilla, Jews expelled from Rome by Emperor Claudius around AD 49. The Lord tells Paul in a vision not to fear, and he stays a year and a half. The Roman governor Gallio, whose term is dated by an inscription to about AD 51, refuses to hear charges against him, a key date for Paul's life.",
    words: [
      { v: 3, s: 4635, note: "Skenopoios, \"tentmaker\": one who makes tents, often of leather. Paul often supported himself so as not to burden the churches." },
      { v: 26, s: 199, note: "Akribos, \"more accurately\": precisely. Priscilla and Aquila quietly help Apollos understand the gospel more fully." },
    ],
  },
  {
    book: "acts",
    chapter: 19,
    title: "The word spreads from Ephesus",
    setting:
      "Ephesus was a major city in Asia with a famous temple of Artemis. Paul finds disciples who knew only John's baptism; after hearing of Jesus they receive the Spirit. Christians read this in different ways. Paul teaches daily for two years. Former magicians burn scrolls worth a fortune. Silversmiths who made shrines for Artemis, fearing for their trade, stir up a riot in the theater.",
    words: [
      { v: 10, s: 191, note: "Akouo, \"heard\". From Ephesus the gospel spread through the whole province, likely founding churches like Colossae." },
      { v: 19, s: 4238, note: "Prasso, \"practiced\": to do habitually. These were people who had made magic arts their way of life. Burning the scrolls showed a clean break with the old life." },
    ],
  },
  {
    book: "acts",
    chapter: 20,
    title: "Farewell to the Ephesian elders",
    setting:
      "Paul revisits churches in Greece. At Troas he talks past midnight, and a young man named Eutychus falls asleep, falls from a window and is raised. Hurrying to reach Jerusalem by Pentecost, Paul calls the Ephesian elders to Miletus. He reminds them how he served with tears, warns of wolves who will attack the flock, and commits them to God. They weep, knowing they will not see him again.",
    words: [
      { v: 28, s: 4168, note: "Poimnion, \"flock\". Elders are shepherds of a flock God bought with His own blood." },
      { v: 35, s: 3107, note: "Makarios, \"blessed\". Paul quotes a saying of Jesus found in none of the Gospels: it is more blessed to give than to receive." },
    ],
  },
  {
    book: "acts",
    chapter: 21,
    title: "Bound for Jerusalem",
    setting:
      "As Paul travels toward Jerusalem, believers and a prophet named Agabus warn him that chains await him there. Paul says he is ready to die for Jesus' name. In Jerusalem James and the elders tell him rumors say he teaches Jews to abandon Moses. Paul joins a purification rite at the temple, but some Jews from Asia accuse him of bringing a Gentile inside. A riot breaks out, and Roman soldiers seize him.",
    words: [
      { v: 13, s: 1210, note: "Deo, \"bound\": tied up, imprisoned. Paul accepts chains as part of following Jesus." },
      { v: 20, s: 2207, note: "Zelotes, \"zealous\": eager, devoted. Thousands of Jewish believers were still deeply devoted to the law." },
    ],
  },
  {
    book: "acts",
    chapter: 22,
    title: "Paul tells his story",
    setting:
      "Standing on the barracks steps, Paul quiets the crowd by speaking in Aramaic. He tells of his strict training under Gamaliel, his persecution of the Way, his meeting with Jesus on the Damascus road, and his call to the Gentiles. At the word \"Gentiles\" the crowd erupts. The commander orders him flogged, but Paul reveals he is a Roman citizen, and flogging an uncondemned citizen was illegal.",
    words: [
      { v: 3, s: 2207, note: "Zelotes, \"zealous\": burning with devotion. Paul understands his old enemies, because he once was one." },
      { v: 25, s: 4514, note: "Romaios, \"Roman\". Citizenship gave legal protections, and Paul uses them to keep preaching." },
    ],
  },
  {
    book: "acts",
    chapter: 23,
    title: "Before the council, and a plot foiled",
    setting:
      "Paul stands before the Sanhedrin. Knowing it is split between Pharisees, who believed in resurrection and angels, and Sadducees, who did not, he says he is on trial for the hope of the resurrection, and the council divides. That night the Lord tells him he will testify in Rome. More than forty men vow not to eat until they kill Paul, but his nephew hears of it, and the commander sends Paul to Caesarea under heavy guard.",
    words: [
      { v: 6, s: 386, note: "Anastasis, \"resurrection\": rising again. It was not a trick: Jesus' resurrection was the heart of Paul's message." },
      { v: 11, s: 2293, note: "Tharseo, \"take courage\". The risen Lord stands by Paul at night with a promise." },
    ],
  },
  {
    book: "acts",
    chapter: 24,
    title: "Paul before Felix",
    setting:
      "In Caesarea the high priest's lawyer accuses Paul before Felix, the Roman governor, calling him a troublemaker and ringleader of the Nazarene sect. Paul calmly answers that he worships the God of his ancestors and shares the hope of resurrection. Felix, who knew about the Way, hears him again with his wife Drusilla, but when Paul speaks of righteousness, self-control and judgment, Felix grows afraid and keeps him in prison two years.",
    words: [
      { v: 14, s: 139, note: "Hairesis, \"sect\": a party or school of thought. Paul says the Way is not a break from Israel's faith but its fulfillment." },
      { v: 25, s: 1466, note: "Enkrateia, \"self-control\": mastery over desires. A sore subject for a corrupt governor living with another man's wife." },
    ],
  },
  {
    book: "acts",
    chapter: 25,
    title: "I appeal to Caesar",
    setting:
      "Festus replaces Felix as governor. The Jewish leaders ask him to bring Paul to Jerusalem, planning an ambush. When Festus suggests a trial there, Paul uses his right as a Roman citizen to appeal to the emperor's court. Festus agrees. King Agrippa II, great-grandson of Herod the Great, and his sister Bernice arrive, and Festus, unsure what charge to send to Rome, asks Agrippa to hear Paul.",
    words: [
      { v: 11, s: 1941, note: "Epikaleomai, \"appeal\": to call upon. A citizen's appeal to Caesar moved the case to Rome, where Jesus said Paul would testify." },
      { v: 19, s: 2198, note: "Zao, \"alive\". Festus could not understand the dispute about a dead man named Jesus whom Paul said was alive." },
    ],
  },
  {
    book: "acts",
    chapter: 26,
    title: "Paul before King Agrippa",
    setting:
      "In a hall full of officials, Paul gives his most complete account of his conversion. Jesus called him to open the eyes of the Gentiles, to turn them from darkness to light and from Satan's power to God. Festus shouts that Paul is out of his mind. Paul appeals to Agrippa, who knew the Jewish Scriptures. Agrippa replies, \"In such a short time you would persuade me to be a Christian?\"",
    words: [
      { v: 18, s: 1994, note: "Epistrepho, \"turn\": to turn around. Conversion means turning from darkness to light and from Satan to God." },
      { v: 28, s: 3982, note: "Peitho, \"persuade\": to convince. Whether Agrippa was mocking or moved, Paul longs for him to believe." },
    ],
  },
  {
    book: "acts",
    chapter: 27,
    title: "Shipwreck on the way to Rome",
    setting:
      "Paul sails for Rome as a prisoner under a centurion named Julius. It is late in the sailing season, and the Mediterranean was dangerous after mid-September. Ignoring Paul's warning, they set out, and a violent storm drives the ship for two weeks. Paul tells them an angel promised all would survive. Luke's detailed, eyewitness account ends with the ship breaking up off Malta and all 276 people reaching shore.",
    words: [
      { v: 22, s: 2114, note: "Euthymeo, \"keep up courage\": be cheerful. A prisoner encourages the whole ship because he trusts God's word." },
      { v: 25, s: 4100, note: "Pisteuo, \"have faith\": trust. Paul believes it will happen just as God told him." },
    ],
  },
  {
    book: "acts",
    chapter: 28,
    title: "The gospel reaches Rome",
    setting:
      "On Malta the islanders welcome the survivors, and Paul shakes off a viper unharmed and heals many sick. Months later he reaches Rome, where believers walk miles out to meet him. Under house arrest with a soldier guard, he explains the kingdom to the Jewish leaders, then welcomes all who come for two years. Acts ends open: the gospel has reached the empire's capital, unhindered.",
    words: [
      { v: 15, s: 2294, note: "Tharsos, \"courage\". Seeing fellow believers, Paul thanks God and takes heart." },
      { v: 31, s: 209, note: "Akolytos, \"without hindrance\": unhindered. Luke's last word: the apostle is chained, but the gospel is free." },
    ],
  },
];
