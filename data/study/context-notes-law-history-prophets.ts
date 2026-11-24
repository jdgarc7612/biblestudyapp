/**
 * Setting cards (see context-notes.ts for the guardrails), drafted by Claude for Josh's review, Nov 2026.
 * Every Strong's number is checked against the bundled interlinear (tests/context-notes.test.ts).
 */

import type { ContextNote } from "./context-notes";

export const CONTEXT_NOTES_LAW_HISTORY_PROPHETS: ContextNote[] = [
  {
    book: "exodus",
    chapter: 1,
    title: "Israel enslaved in Egypt",
    setting:
      "Genesis ended with Jacob's family welcomed into Goshen, the fertile eastern Nile Delta, under Joseph's protection. Generations later a new king sees these growing foreigners on Egypt's vulnerable northeastern border as a security risk. Egyptian kings used conscripted labor for royal building projects, and Israel is forced into it. The date is debated: many place these events in the 1400s BC, others in the 1200s under Ramesses II.",
    words: [
      { v: 13, s: 6531, note: "Perekh, \"ruthlessness\": A rare word for crushing, brutal harshness. Leviticus 25:43 later forbids Israel to rule over its own servants this way, because they remembered Egypt." },
    ],
  },
  {
    book: "exodus",
    chapter: 2,
    title: "The birth and flight of Moses",
    setting:
      "Pharaoh's order to drown every Hebrew baby boy is still in force. Moses' mother does put him in the Nile, but sealed in a basket of reeds and pitch, among the papyrus where Egyptian royal women may have bathed. Adopted into the palace, Moses probably received an Egyptian court education (Acts 7:22). After killing an Egyptian he flees east to Midian, desert country beyond Pharaoh's reach.",
    words: [
      { v: 3, s: 8392, note: "Tevah, \"basket\": This rare word is used elsewhere only for Noah's ark. A baby in a pitch sealed ark rides out the waters of death, a small echo of God preserving Noah through the flood." },
    ],
  },
  {
    book: "exodus",
    chapter: 4,
    title: "Moses' excuses and God's signs",
    setting:
      "Moses has lived in Midian for decades, and the men who wanted him dead have died (4:19). Egypt prized magic and visible proofs of divine power, and its kings wore a rearing cobra on the crown as a sign of royal and divine protection. God gives Moses signs suited to that world: a staff that becomes a snake, a diseased hand restored, and Nile water turned to blood. Then Moses heads back with his family.",
    words: [
      { v: 22, s: 1060, note: "Bekhor, \"firstborn\": God calls Israel His firstborn son, the heir with a place of honor in the family. This sets up the tenth plague: Pharaoh's firstborn for God's." },
    ],
  },
  {
    book: "exodus",
    chapter: 5,
    title: "Bricks without straw",
    setting:
      "Egyptian building relied on mud bricks made from Nile mud mixed with chopped straw, shaped in molds and dried in the sun. An Egyptian tomb painting from about the 1400s BC shows foreign laborers doing exactly this under overseers with rods. Israelite foremen answered for their crews' daily quotas. When Moses asks for a few days to worship in the wilderness, Pharaoh hears an excuse to stop working and makes the labor crushing.",
    words: [
      { v: 2, s: 3045, note: "Yada, \"know\": \"I do not know the LORD,\" says Pharaoh. The plagues answer him; again and again God acts so that Egypt \"will know that I am the LORD\" (7:5, 7:17)." },
    ],
  },
  {
    book: "exodus",
    chapter: 6,
    title: "God restates His name and His covenant",
    setting:
      "After Pharaoh's crackdown, Israel's foremen curse Moses and Moses complains to God. God answers not with a new strategy but by restating His name and His sworn covenant with Abraham, Isaac and Jacob. The family record in verses 14 to 27 pauses the story to place Moses and Aaron within the tribe of Levi, because in the ancient world ancestry established who a leader was, and it prepares for Aaron's priestly line.",
    words: [
      { v: 3, s: 7706, note: "Shaddai, \"Almighty\": El Shaddai was the name under which God made His covenant promises to the patriarchs (Genesis 17:1). Its origin is uncertain; many connect it with power or with mountains." },
    ],
  },
  {
    book: "exodus",
    chapter: 7,
    title: "The first plague: the Nile turned to blood",
    setting:
      "The Nile was Egypt's lifeline. Nearly all its farming, drinking water and fish depended on the river, and its yearly flood was celebrated as a gift of the gods, personified as the god Hapi. Pharaoh's court magicians were trained priests skilled in rituals and spells. Moses meets Pharaoh on the riverbank in the morning, and the first blow lands on the source of Egypt's life and pride.",
    words: [
      { v: 11, s: 2748, note: "Chartom, \"magician\": Probably borrowed from an Egyptian title for a priest skilled in sacred writings and spells. Their copies of the early signs only make Egypt's misery worse." },
    ],
  },
  {
    book: "exodus",
    chapter: 8,
    title: "Frogs, gnats and flies",
    setting:
      "Frogs swarmed along the Nile after its yearly flood and were linked with fertility; the Egyptian goddess Heqet was often shown with a frog's head. Gnats and flies were constant pests in a land of river mud and livestock. In this chapter the plagues begin to separate Goshen, where Israel lived, from the rest of Egypt, and Pharaoh starts to bargain: worship your God, but not far away.",
    words: [
      { v: 19, s: 676, note: "Etsba, \"finger\": The magicians admit defeat: \"This is the finger of God.\" Jesus echoes the phrase when He drives out demons \"by the finger of God\" (Luke 11:20)." },
    ],
  },
  {
    book: "exodus",
    chapter: 9,
    title: "Livestock, boils and hail",
    setting:
      "Egypt's wealth was counted in herds as well as grain, and several of its gods were pictured as cattle, such as the cow goddess Hathor and the sacred Apis bull. Boils strike even the magicians, who can no longer stand before Moses. Hail was rare in Egypt, and this storm arrives as the barley ripens and the flax blooms. For the first time God warns Egyptians to shelter their servants and animals, and some listen.",
    words: [
      { v: 16, s: 5975, note: "Amad, \"raise up\": God has let Pharaoh stand, or raised him up, to display His power and proclaim His name in all the earth. Paul quotes this verse in Romans 9:17." },
    ],
  },
  {
    book: "exodus",
    chapter: 10,
    title: "Locusts and darkness",
    setting:
      "A locust swarm could strip every green thing for miles, and ancient texts dread locusts like an invading army. Egypt's crops had already been battered by hail. Then comes darkness for three days. The sun god Ra was among Egypt's chief gods, and Pharaoh was called the son of Ra, so a darkness that could be felt struck at the heart of royal religion, while every Israelite home had light.",
    words: [
      { v: 2, s: 5953, note: "Alal, \"deal harshly\": The verb can mean to make a fool of someone. God tells Israel to retell to their children how He made a mockery of Egypt's power." },
    ],
  },
  {
    book: "exodus",
    chapter: 11,
    title: "The final plague announced",
    setting:
      "Nine plagues have fallen, and Pharaoh has just ordered Moses never to see his face again. Before leaving the palace, Moses announces the last blow: the death of every firstborn in Egypt, from Pharaoh's heir to the son of the slave girl at the hand mill, and even the firstborn of the cattle. In Egypt the king's eldest son was heir to a throne believed to be divinely ordained. Meanwhile ordinary Egyptians have come to respect Moses.",
    words: [
      { v: 6, s: 6818, note: "Tsa'aqah, \"cry\": A loud cry of anguish. Israel's own cry under slavery rose to God (3:7, 9); now a great cry fills Egypt." },
    ],
  },
  {
    book: "exodus",
    chapter: 13,
    title: "Firstborn, unleavened bread and the pillar",
    setting:
      "Israel has just left Egypt, and God at once gives two lasting practices: the yearly Feast of Unleavened Bread and the dedication of every firstborn. Both were meant to be explained to children. Instead of the short coastal road to Canaan, which ran past Egyptian forts and into Philistine country, God leads them south toward the wilderness and the sea, guided by a pillar of cloud by day and fire by night.",
    words: [
      { v: 21, s: 5982, note: "Ammud, \"pillar\": The same word later describes the pillars of the tabernacle and temple. God's presence stands among His people like a column they can see by day and by night." },
      { v: 18, s: 5488, note: "Suph, \"reeds\": Yam Suph, traditionally \"Red Sea,\" is literally \"Sea of Reeds.\" The name is also used for the Gulf of Aqaba (1 Kings 9:26), so the exact crossing point is debated." },
    ],
  },
  {
    book: "exodus",
    chapter: 14,
    title: "Crossing the sea",
    setting:
      "God turns Israel back to camp beside the sea so that Pharaoh will think they are lost and trapped. Pharaoh pursues with six hundred elite chariots, the most advanced weapon of the day, and with mountains, desert and water around them there seems to be no way out. Scholars have proposed several lakes and gulfs for the crossing point, but Israel remembered this night as the defining act of its salvation.",
    words: [
      { v: 13, s: 3444, note: "Yeshuah, \"salvation\": \"Stand firm and you will see the LORD's salvation.\" The name Jesus (Yeshua) comes from the same root and means \"the LORD saves.\"" },
    ],
  },
  {
    book: "exodus",
    chapter: 15,
    title: "The Song of the Sea",
    setting:
      "Standing on the far shore, Israel sings. Victory songs were common in the ancient world, usually praising a king and his army; here the only warrior is the LORD. Many scholars consider this poem among the oldest in the Bible because of its archaic Hebrew. Miriam leads the women with tambourines and dancing. Then, three days into the wilderness, at the bitter water of Marah, the people's joy turns to grumbling.",
    words: [
      { v: 2, s: 2176, note: "Zimrah, \"song\": \"The LORD is my strength and my song.\" God is not only the subject of the song; He has become the reason they sing. Isaiah 12:2 and Psalm 118:14 repeat the line." },
    ],
  },
  {
    book: "exodus",
    chapter: 16,
    title: "Manna and quail in the wilderness",
    setting:
      "A month after leaving Egypt (16:1), Israel is in the Desert of Sin, a dry region of the Sinai peninsula where a crowd this size could not live off the land. Egypt had meant slavery, but also bread and pots of meat. The people grumble, and God answers with quail in the evening and manna each morning. The daily rhythm, with double on the sixth day and none on the seventh, trains Israel to trust Him before Sinai.",
    words: [
      { v: 15, s: 4478, note: "Man, \"what?\": The name manna comes from the people's question, \"What is it?\" Jesus calls Himself the true bread from heaven, to which the manna pointed (John 6:31 to 35)." },
    ],
  },
  {
    book: "exodus",
    chapter: 17,
    title: "Water from the rock and war with Amalek",
    setting:
      "At Rephidim, near the mountains of Sinai, Israel again finds no water, and the complaint turns into a threat to stone Moses. Desert springs meant life or death, and fights over them were common. The Amalekites, a nomadic people descended from Esau (Genesis 36:12), then attack Israel on the march; Deuteronomy 25:18 says they struck the weary stragglers at the rear. Joshua appears here for the first time.",
    words: [
      { v: 7, s: 4532, note: "Massah, \"testing\": Massah means \"testing\" and Meribah means \"quarreling.\" The names became a byword for unbelief (Psalm 95:8; Hebrews 3:8)." },
    ],
  },
  {
    book: "exodus",
    chapter: 18,
    title: "Jethro's visit and the first judges",
    setting:
      "Jethro, Moses' father-in-law and a priest of Midian, brings Zipporah and her two sons to Moses near the mountain of God; Moses had sent them back to him earlier. Jethro hears the story of the exodus and praises the LORD. In the ancient Near East a leader also served as judge, so every dispute could land on his desk. Jethro sees Moses swamped from morning to evening and proposes a system of trustworthy officials.",
    words: [
      { v: 9, s: 2302, note: "Chadah, \"rejoice\": A rare word for glad delight. A foreign priest rejoices over what God did for Israel, an early taste of the nations being blessed through Abraham's family (Genesis 12:3)." },
    ],
  },
  {
    book: "exodus",
    chapter: 19,
    title: "Israel arrives at Mount Sinai",
    setting:
      "In the third month after leaving Egypt, Israel camps at the foot of Sinai, where God first met Moses in the burning bush (3:12). The traditional site is Jebel Musa in the southern Sinai peninsula, though scholars have proposed other locations. Before giving any laws, God reminds Israel what He has done and offers a covenant. The people must wash, keep a boundary around the mountain, and prepare for three days to meet Him.",
    words: [
      { v: 5, s: 5459, note: "Segullah, \"treasured possession\": A king's personal treasure, set apart from the rest of his wealth. Peter applies the idea to the church: \"a people for His possession\" (1 Peter 2:9)." },
      { v: 6, s: 3548, note: "Kohen, \"priest\": Israel is to be a kingdom of priests, standing between God and the nations as priests would stand between God and Israel." },
    ],
  },
  {
    book: "exodus",
    chapter: 21,
    title: "Laws for servants and for injuries",
    setting:
      "Chapters 21 to 23 are the \"Book of the Covenant,\" Israel's first collection of case law. Like other ancient codes, such as Hammurabi's from Babylon, it gives sample cases (\"if a man...\") for judges to apply. Most Hebrew servants were working off debt, not owned for life. Measured against its world, this law limits masters, protects the injured and values people above property, while still regulating practices God's fuller purposes would leave behind.",
    words: [
      { v: 24, s: 8478, note: "Tachat, \"for\": Literally \"in place of.\" The phrase sets a ceiling on punishment: an equal penalty, never more. Many scholars think courts often settled it with fair payment rather than literal injury." },
    ],
  },
  {
    book: "exodus",
    chapter: 22,
    title: "Restitution and care for the vulnerable",
    setting:
      "Israel's economy ran on farming and herding, so most of these cases involve oxen, sheep, fields and borrowed goods. Theft was answered with restitution, paying back double or more, rather than prison, which Israel did not use as a punishment. Then the tone shifts: God Himself takes up the cause of foreigners, widows, orphans and the poor, the people who had no land or family to protect them in that world.",
    words: [
      { v: 21, s: 1616, note: "Ger, \"foreign resident\": A foreigner living in Israel without land or clan. Israel's own years as foreigners in Egypt were to shape how they treated them." },
    ],
  },
  {
    book: "exodus",
    chapter: 23,
    title: "Justice, Sabbath rest and the yearly feasts",
    setting:
      "The Book of the Covenant ends with laws for courts, for the land's rest and for worship. Every seventh year the fields lay unplanted so the poor and wild animals could eat what grew. Three times a year Israel's men gathered for feasts tied to the farming calendar: Unleavened Bread in spring, Harvest (later called Pentecost) and Ingathering (Booths) in autumn. Then God promises an angel to lead them into Canaan and warns them against its gods.",
    words: [
      { v: 20, s: 4397, note: "Malak, \"angel\": The word means \"messenger,\" human or heavenly. This one carries God's own name (v. 21), and some Christians see in such passages a glimpse of the Son before His birth." },
    ],
  },
  {
    book: "exodus",
    chapter: 24,
    title: "The covenant is sealed with blood",
    setting:
      "At the foot of Sinai, Moses reads the covenant aloud and the people pledge to obey. Ancient treaties were often confirmed with sacrifice, and here blood is splashed on the altar, standing for God, and on the people, binding both sides in one bond. Then seventy elders climb the mountain, see the God of Israel and eat a covenant meal in His presence. Moses goes higher still, into the cloud, for forty days.",
    words: [
      { v: 8, s: 1818, note: "Dam, \"blood\": Blood stood for a life given up. Jesus echoes this verse at the Last Supper: \"This is My blood of the covenant\" (Matthew 26:28)." },
    ],
  },
  {
    book: "exodus",
    chapter: 25,
    title: "A sanctuary so God can live among them",
    setting:
      "Israel is camped in the desert, so God's house is a portable tent that can be packed and carried. Chapters 25 to 31 give its plans, starting with the innermost furniture and working outward. The details mattered because they answered the question hanging over Israel: can a holy God live among sinful people? Every measurement says yes, on His terms. John later writes that the Word \"dwelt\" (literally \"tabernacled\") among us (John 1:14).",
    words: [
      { v: 8, s: 7931, note: "Shakan, \"dwell\": To settle or live as a neighbor. The noun mishkan, \"tabernacle,\" comes from it: the tent is literally God's \"dwelling place.\"" },
    ],
  },
  {
    book: "exodus",
    chapter: 26,
    title: "The tabernacle curtains and the veil",
    setting:
      "The tabernacle was a wooden frame draped in layers: fine linen woven with cherubim on the inside, then goat hair, then rams' skins and durable leather on the outside. Plain from without, glorious within. A heavy veil divided the Holy Place from the Most Holy Place, where the ark stood, and only the high priest went behind it, once a year. At Jesus' death the temple veil tore from top to bottom (Matthew 27:51).",
    words: [
      { v: 33, s: 6532, note: "Poreket, \"veil\": A heavy curtain that separated. Hebrews 10:20 says Jesus opened \"a new and living way\" through the curtain, that is, through His flesh." },
    ],
  },
  {
    book: "exodus",
    chapter: 27,
    title: "The bronze altar and the courtyard",
    setting:
      "Anyone entering the courtyard met the altar first: a large square box of acacia wood plated with bronze, where animals were burned as offerings. The message was plain: no one approached God without a sacrifice. A linen fence about 150 by 75 feet (100 by 50 cubits) enclosed the court, with a single entrance on the east. Inside the tent, a lamp fed with olive oil burned through every night.",
    words: [
      { v: 1, s: 4196, note: "Mizbeach, \"altar\": From the verb zabach, \"to slaughter.\" Hebrews 13:10 says Christians \"have an altar\" too, the once for all sacrifice of Christ." },
    ],
  },
  {
    book: "exodus",
    chapter: 28,
    title: "Garments for the high priest",
    setting:
      "In the ancient world clothing announced office, much like a uniform or a judge's robe today. Aaron's garments marked him as Israel's representative before God. Twelve gemstones on his chest and two onyx stones on his shoulders carried the tribes' names into God's presence, and a gold plate on his turban read \"HOLY TO THE LORD.\" Hebrews calls Jesus the great high priest who carries His people before the Father (Hebrews 4:14).",
    words: [
      { v: 2, s: 8597, note: "Tipharah, \"splendor\": Beauty that brings honor. God wanted the priest's clothing to be beautiful, not merely practical, because it served His glory." },
    ],
  },
  {
    book: "exodus",
    chapter: 29,
    title: "Ordaining the priests",
    setting:
      "Aaron and his sons are set apart in a seven day ceremony: washed, dressed, anointed with oil and marked with blood. Even the men who would offer sacrifices for others needed atonement first. The chapter closes with the daily offering, a lamb every morning and evening, and with God's reason for all of it: \"I will dwell among the Israelites and be their God\" (v. 45). Jesus, unlike these priests, needed no sacrifice for Himself (Hebrews 7:27).",
    words: [
      { v: 9, s: 4390, note: "Male, \"ordain\": Literally \"fill the hand.\" The priest's hands were filled with portions of the offering (v. 24), a sign that God's service had been entrusted to him." },
    ],
  },
  {
    book: "exodus",
    chapter: 30,
    title: "Incense, ransom money and holy oil",
    setting:
      "The last furnishings are described: a small gold altar where incense burned before the veil every morning and evening, and a bronze basin where priests washed before serving. A census tax of half a shekel, the same for rich and poor, paid a \"ransom\" for each life and funded the tabernacle. The holy oil and incense had fixed recipes and could not be copied for private use, because they belonged to God's service alone.",
    words: [
      { v: 12, s: 3724, note: "Kopher, \"ransom\": A price paid to release a life. Jesus said He came \"to give His life as a ransom for many\" (Mark 10:45)." },
    ],
  },
  {
    book: "exodus",
    chapter: 31,
    title: "Bezalel and the sign of the Sabbath",
    setting:
      "Plans need builders. God names Bezalel of Judah and Oholiab of Dan and fills them with His Spirit for metalwork, gem cutting, woodcarving and design. Bezalel is the first person Scripture describes as filled with the Spirit of God, and the gift is for craftsmanship. The instructions end with the Sabbath, Israel's covenant sign, a reminder that even sacred work stops for rest. Then God hands Moses the two stone tablets.",
    words: [
      { v: 3, s: 7307, note: "Ruach, \"Spirit\": Breath, wind or spirit. Here God's Spirit gives skill to hands, a reminder that artistic and practical gifts come from Him too." },
    ],
  },
  {
    book: "exodus",
    chapter: 32,
    title: "The golden calf",
    setting:
      "While Moses is on the mountain receiving plans for God's dwelling, the people below grow restless after some forty days and demand gods they can see. The bull was a common symbol of strength and fertility in Egypt and Canaan, and Aaron probably meant the calf to represent the LORD, since he calls its festival \"a feast to the LORD.\" That was the problem: God had just forbidden images of Himself (20:4). The covenant is broken within weeks.",
    words: [
      { v: 25, s: 6544, note: "Para, \"run wild\": To let loose, like hair unbound. Aaron did not merely fail to stop the people; he let go of the reins." },
    ],
  },
  {
    book: "exodus",
    chapter: 33,
    title: "Will God still go with us?",
    setting:
      "After the golden calf, God says Israel may still take the land, but He will not go with them. To Moses that is no gift at all. He pitches a tent outside the camp, where God speaks with him \"as a man speaks to his friend.\" Moses pleads for God's presence to stay with Israel, then asks to see His glory. God agrees to pass by, but no one can see His face and live. John 1:18 says the Son has made the unseen God known.",
    words: [
      { v: 14, s: 6440, note: "Paneh, \"Presence\": Literally \"face\" (usually plural, panim). God's face going with them means His personal, favorable presence, not help from a distance." },
    ],
  },
  {
    book: "exodus",
    chapter: 34,
    title: "The covenant renewed and God's name proclaimed",
    setting:
      "Moses carves two new tablets to replace the ones he smashed, a sign that the broken covenant will be restored. On the mountain God passes by and proclaims His own name and character in words Israel would quote for centuries (Numbers 14:18; Psalm 103:8; Jonah 4:2). The covenant terms are restated with sharp warnings against Canaanite worship. Moses comes down with his face shining so brightly that he covers it with a veil.",
    words: [
      { v: 6, s: 750, note: "Arekh, \"slow\": Paired with the word for anger (literally \"nose\"), it pictures God as long of nostril, slow to flare up. His patience is part of His name." },
    ],
  },
  {
    book: "exodus",
    chapter: 35,
    title: "The people give and the work begins",
    setting:
      "After the golden calf, the people bring their gold again, this time for God's dwelling instead of an idol. Chapters 35 to 40 repeat the building plans almost word for word, now as finished work. To modern readers that seems tedious, but ancient writers used repetition to show that every instruction was carried out exactly. Everyone takes part: leaders, craftsmen and skilled women spinning yarn and goat hair, all giving freely.",
    words: [
      { v: 21, s: 5068, note: "Nadav, \"prompted\": To give freely, of one's own accord. No tax or pressure is involved; these gifts flow from stirred hearts." },
    ],
  },
  {
    book: "exodus",
    chapter: 36,
    title: "More than enough",
    setting:
      "Bezalel and the craftsmen start work, and gifts keep arriving every morning until the workers report that they have too much. Moses has to tell the people to stop giving, a rare moment in Scripture. The rest of the chapter describes the curtains, frames and veil being made exactly as God specified in chapter 26. The point is faithful obedience carried out by many hands, only months after the camp's great failure.",
    words: [
      { v: 5, s: 1767, note: "Day, \"enough\": Sufficiency, all that is needed. People who had complained about food and water now bring more than enough." },
    ],
  },
  {
    book: "exodus",
    chapter: 37,
    title: "Bezalel makes the ark and the holy furniture",
    setting:
      "Bezalel himself crafts the most sacred objects: the ark with its gold cover and cherubim, the table for the bread of the Presence, the lampstand and the incense altar. The ark was a chest about 45 inches long, made of acacia, one of the few trees that grows in the Sinai desert, and covered with gold inside and out. The text slows down here because these were the objects that stood closest to God's presence.",
    words: [
      { v: 1, s: 7848, note: "Shittah, \"acacia\": A thorny desert tree with dense, durable wood that resists decay, well suited to furniture carried for decades through the wilderness." },
    ],
  },
  {
    book: "exodus",
    chapter: 38,
    title: "The altar, the basin and the accounts",
    setting:
      "The bronze altar and courtyard are built, and the basin is cast from bronze mirrors given by women who served at the tent's entrance. Then comes an audited inventory: roughly a ton of gold, more than three tons of silver and still more bronze. Ancient temples kept such records, and publishing them showed the people's gifts had been handled honestly. The silver came from the half shekel paid by 603,550 men.",
    words: [
      { v: 8, s: 4759, note: "Marah, \"mirrors\": Polished bronze hand mirrors, valued personal items. Women gave them up to make the basin where priests washed before serving." },
    ],
  },
  {
    book: "exodus",
    chapter: 39,
    title: "The priestly garments completed",
    setting:
      "The craftsmen make Aaron's garments exactly as described in chapter 28, and the chapter repeats \"just as the LORD had commanded Moses\" again and again like a refrain. When everything is done, Moses inspects the work, sees that it matches the command, and blesses the workers. Many readers hear an echo of creation, where God saw all He had made, finished His work and blessed the seventh day (Genesis 1:31; 2:2 to 3).",
    words: [
      { v: 43, s: 1288, note: "Barakh, \"blessed\": To speak good over someone. Moses ends the project the way God ended creation, with a blessing." },
    ],
  },
  {
    book: "exodus",
    chapter: 40,
    title: "The glory fills the tabernacle",
    setting:
      "On the first day of the first month, almost a year after the exodus, Moses sets up the tabernacle and anoints its furniture and priests. Then the cloud that had led Israel out of Egypt settles on the tent, and God's glory fills it so completely that even Moses cannot enter. The book that opened with Israel slaving to build Pharaoh's cities ends with Israel's God living among them and leading every stage of their journey.",
    words: [
      { v: 34, s: 6051, note: "Anan, \"cloud\": The visible sign of God's presence, hiding His glory even as it revealed it. A cloud also overshadows Jesus at His transfiguration (Luke 9:34)." },
    ],
  },
  {
    book: "isaiah",
    chapter: 1,
    title: "A courtroom case against God's people",
    setting:
      "Isaiah son of Amoz prophesied in Jerusalem for about forty years, roughly 740 to 700 BC, under four kings of Judah. Chapter 1 works as an overture to the whole book and is framed like a lawsuit, with heaven and earth called as witnesses, as in Deuteronomy 32:1. It probably reflects a time after Assyrian armies had burned Judah's towns (verses 7 and 8), perhaps 701 BC, leaving Jerusalem standing alone.",
    words: [
      { v: 18, s: 3198, note: "Yakhach, \"reason together\": a legal word for arguing a case or settling a dispute in court. God is not inviting a debate between equals. He is the Judge offering terms of settlement to the guilty." },
      { v: 4, s: 6918, note: "Qadosh, \"Holy\": \"the Holy One of Israel\" is Isaiah's signature title for God, used about 25 times in the book and rarely elsewhere. It probably grew out of his vision in chapter 6." },
    ],
  },
  {
    book: "isaiah",
    chapter: 2,
    title: "The mountain of the LORD",
    setting:
      "A new heading in verse 1 opens a collection of Isaiah's early messages, probably from the prosperous years of Uzziah and Jotham, when Judah was rich and well armed (verse 7). Verses 2 to 4 appear almost word for word in Micah 4:1 to 3. Isaiah and Micah worked in the same years, and one may have quoted the other or both drew on a known oracle. The vision of world peace stands against a land full of idols and pride.",
    words: [
      { v: 2, s: 319, note: "Acharit, \"last days\": literally \"the afterward,\" the end of the days. It points to the time when God brings history to its goal, and the New Testament applies it to the age begun by Christ (Acts 2:17; Hebrews 1:2)." },
      { v: 4, s: 855, note: "Et, \"plowshare\": the iron blade of a plow. Iron was costly. Beating swords into farm tools means war is no longer worth the metal." },
    ],
  },
  {
    book: "isaiah",
    chapter: 3,
    title: "When a nation loses its leaders",
    setting:
      "Isaiah warns Jerusalem and Judah that God will take away every prop their society leans on: food, water, soldiers, judges, prophets, elders and skilled advisers. The result is chaos, with inexperienced rulers in charge and neighbors turning on one another. The warning came true in stages, through Assyrian invasion and finally the Babylonian exile of 586 BC. Verses 16 to 26 single out the wealthy women of Jerusalem.",
    words: [
      { v: 1, s: 4937, note: "Mishan, \"supply\": a support or staff to lean on. Isaiah uses it in both masculine and feminine forms (mishan and mishenah), a way of saying \"every last prop.\"" },
      { v: 14, s: 3754, note: "Kerem, \"vineyard\": Israel is God's vineyard (Isaiah 5:7). Its leaders were hired to tend it and instead stripped it bare." },
    ],
  },
  {
    book: "isaiah",
    chapter: 4,
    title: "The Branch and a cleansed remnant",
    setting:
      "A short chapter that turns from judgment to hope. Verse 1 completes the scene of chapter 3: so many men have died in war that women beg any man to take away their disgrace. Then \"in that day\" opens a future in which God has washed Jerusalem clean and shelters it as He sheltered Israel in the wilderness. Many scholars read chapters 2 to 4 as one unit that begins and ends with a renewed Zion.",
    words: [
      { v: 2, s: 6780, note: "Tsemach, \"Branch\": a sprout or new growth. Jeremiah 23:5 and Zechariah 3:8 later use it as a title for the coming King from David's line, and many read it as pointing to the Messiah here too." },
    ],
  },
  {
    book: "isaiah",
    chapter: 5,
    title: "The song of the vineyard",
    setting:
      "Isaiah begins like a singer at a harvest festival, performing a love song about a friend's vineyard. The audience would expect romance, but the song becomes an indictment. Planting a vineyard in Judah's hills took years of costly work: clearing stones, building a watchtower, cutting a winepress into rock. The chapter goes on to six woes against land grabbing, drunken feasting and bribed courts, and ends with a distant army, probably Assyria, summoned by God.",
    words: [
      { v: 7, s: 4941, note: "Mishpat, \"justice\": God looked for mishpat and found mispach (\"bloodshed\"); for tsedaqah (\"righteousness\") and heard tseaqah (\"a cry\"). The words sound alike, but the realities are opposites." },
    ],
  },
  {
    book: "isaiah",
    chapter: 6,
    title: "Isaiah sees the King",
    setting:
      "\"In the year King Uzziah died\" dates this vision to about 740 BC. Uzziah had reigned some fifty years and brought Judah wealth, but he died a leper after trying to burn incense in the temple himself (2 Chronicles 26). As an earthly king's long reign ends, Isaiah sees the true King enthroned. Many think this is Isaiah's call, placed after five chapters that show why his message was needed.",
    words: [
      { v: 2, s: 8314, note: "Saraph, \"seraphim\": from a verb meaning \"to burn,\" so probably \"burning ones.\" The same word names the fiery serpents of Numbers 21:6. These are the only seraphim named in the Bible." },
      { v: 5, s: 1820, note: "Damah, \"ruined\": to be cut off, silenced or undone. Seeing God's holiness, Isaiah knows his unclean lips leave him no standing before the King." },
    ],
  },
  {
    book: "isaiah",
    chapter: 7,
    title: "A sign for a frightened king",
    setting:
      "Around 734 BC, King Rezin of Aram (Damascus) and King Pekah of Israel marched on Jerusalem to force Judah into their alliance against Assyria. Young King Ahaz was terrified and was preparing to buy Assyria's help instead (2 Kings 16:5 to 9). Isaiah meets him at the city's water supply, which a king facing siege would be inspecting, and offers God's promise. Ahaz refuses to ask for a sign, so God gives one anyway.",
    words: [
      { v: 9, s: 539, note: "Aman, \"stand firm\": a wordplay, \"If you do not believe, you will not be established,\" using two forms of the same root. It is the root of \"amen.\" In Hebrew, faith and stability are the same idea." },
      { v: 14, s: 5959, note: "Almah, \"virgin\": a young woman of marriageable age, used of unmarried maidens such as Rebekah (Genesis 24:43). The Greek Old Testament translated it parthenos, \"virgin,\" and Matthew 1:23 quotes that reading for Jesus' birth." },
    ],
  },
  {
    book: "isaiah",
    chapter: 8,
    title: "Do not fear what they fear",
    setting:
      "The crisis of chapter 7 continues. Isaiah's second son is given a name like a headline to announce that Assyria will soon strip Damascus and Samaria. But the same Assyria that Ahaz is courting will flood Judah up to the neck. In a capital full of rumors and plots, Isaiah and a small circle of disciples are told to fear God alone, bind up His teaching and wait.",
    words: [
      { v: 1, s: 4122, note: "Maher-shalal-hash-baz, \"swift to plunder, quick to spoil\": the name of Isaiah's second son. It was written in public on a large tablet before witnesses (verse 2), so no one could later claim the prophecy was invented after the fact." },
      { v: 14, s: 68, note: "Even, \"stone\": the LORD is a sanctuary to those who fear Him and a stone that trips those who do not. Paul and Peter apply this verse to Christ (Romans 9:33; 1 Peter 2:8)." },
    ],
  },
  {
    book: "isaiah",
    chapter: 9,
    title: "A child born to us",
    setting:
      "Galilee in the far north, the tribal land of Zebulun and Naphtali, was the first part of Israel conquered and deported by Assyria, around 732 BC (2 Kings 15:29). Isaiah announces that the region first plunged into darkness will be first to see the light. The promise of a royal child is followed by a long poem with the refrain \"His hand is still upraised,\" describing judgments on the northern kingdom.",
    words: [
      { v: 6, s: 6382, note: "Pele, \"Wonderful\": a word Scripture almost always uses for God's own works, things beyond human power. Joined to \"Counselor,\" it describes a King whose plans are a wonder." },
      { v: 2, s: 6757, note: "Tsalmavet, \"shadow of death\": deep darkness, the same word as Psalm 23:4. Matthew 4:13 to 16 sees this light dawning when Jesus began His ministry in Galilee." },
    ],
  },
  {
    book: "isaiah",
    chapter: 10,
    title: "Assyria, the rod in God's hand",
    setting:
      "Assyria was the superpower of Isaiah's day, known for deporting whole populations and boasting in stone inscriptions of the cities it crushed. Verses 9 to 11 list real conquests: Calno, Carchemish, Hamath, Arpad, Samaria and Damascus. Isaiah declares that God is using this empire as a tool to discipline His people, and that He will judge it for its arrogance once that work is done.",
    words: [
      { v: 5, s: 7626, note: "Shevet, \"rod\": a club for punishment or a shepherd's staff. Assyria is only a stick in God's hand, not the One who swings it." },
      { v: 20, s: 7605, note: "Shear, \"remnant\": what is left over. It echoes the name of Isaiah's son Shear-jashub (7:3): a remnant will return to the Mighty God." },
    ],
  },
  {
    book: "isaiah",
    chapter: 11,
    title: "The shoot from Jesse's stump",
    setting:
      "After God fells the forest of Assyria at the end of chapter 10, Isaiah turns to a very different tree. Jesse was David's father, so his \"stump\" is David's royal line, cut down by judgment and disappointing kings like Ahaz. From it God will raise a new King filled with His Spirit, whose rule brings justice to the poor, peace even in creation, and a second exodus that gathers the scattered exiles home.",
    words: [
      { v: 1, s: 2415, note: "Choter, \"shoot\": a fresh twig sprouting from a stump. The new King will not rise from a flourishing dynasty but from what looks dead." },
      { v: 1, s: 5342, note: "Netser, \"Branch\": many think Matthew 2:23, \"He will be called a Nazarene,\" plays on this word, since Nazareth sounds like netser." },
    ],
  },
  {
    book: "isaiah",
    chapter: 12,
    title: "A song for that day",
    setting:
      "Chapter 12 closes the first major section of Isaiah (chapters 1 to 12) with a short hymn. It answers the promises of chapter 11 with praise. Verse 2 quotes the Song of Moses sung after the Red Sea crossing (Exodus 15:2), so future salvation is pictured as a new exodus. In verse 1 \"you\" is singular, one person giving thanks; from verse 4 the whole people join the song.",
    words: [
      { v: 2, s: 3444, note: "Yeshuah, \"salvation\": rescue or deliverance. It comes from the same root as the names Isaiah (\"the LORD saves\") and Jesus (Yeshua)." },
    ],
  },
  {
    book: "isaiah",
    chapter: 13,
    title: "The oracle against Babylon",
    setting:
      "Chapters 13 to 23 are oracles against the nations, showing that Israel's God rules every people. The series opens with Babylon, in Isaiah's day a restless province of Assyria, later the empire that destroyed Jerusalem in 586 BC. The Medes are named as its attackers (verse 17), and Babylon fell to the Medes and Persians in 539 BC. Some scholars date this oracle after Isaiah; many others see genuine prediction.",
    words: [
      { v: 1, s: 4853, note: "Massa, \"burden\": an oracle, literally something lifted or carried. It may mean a message lifted up by the voice, or a heavy word the prophet had to bear." },
      { v: 6, s: 7706, note: "Shadday, \"Almighty\": a wordplay with shod, \"destruction.\" Destruction will come from Shaddai, the name by which the patriarchs knew God." },
    ],
  },
  {
    book: "isaiah",
    chapter: 14,
    title: "The fall of the king of Babylon",
    setting:
      "Verses 4 to 21 are a taunt song Israel will sing when the tyrant king of Babylon falls. Dead kings rise from their thrones in Sheol to greet him with mockery. The chapter then announces Assyria's defeat in God's land (verses 24 to 27) and warns Philistia in an oracle dated to the year King Ahaz died, about 715 BC. Whether the song targets one king or the Babylonian throne as a whole is debated.",
    words: [
      { v: 12, s: 1966, note: "Helel, \"day star\": the shining one, probably the planet Venus rising before dawn. The Latin Vulgate rendered it lucifer, \"light bearer,\" which later became a name for Satan." },
      { v: 4, s: 4912, note: "Mashal, \"song of contempt\": a proverb or comparison, here a taunt that holds up the fallen king as an example." },
    ],
  },
  {
    book: "isaiah",
    chapter: 15,
    title: "A lament over Moab",
    setting:
      "Moab lay east of the Dead Sea, a kingdom descended from Lot (Genesis 19:37) and often at odds with Israel. Chapters 15 and 16 describe a sudden invasion, probably Assyrian, that destroys Moab's main towns in a single night and sends refugees fleeing south. The exact date is uncertain, and Jeremiah 48 reuses much of this poem a century later. Strikingly, the prophet weeps for a hostile nation.",
    words: [
      { v: 2, s: 7144, note: "Qorchah, \"shaved\": baldness. Shaving the head and cutting off the beard were mourning rites across the ancient Near East (Jeremiah 48:37)." },
      { v: 5, s: 3820, note: "Lev, \"heart\": the inner person. \"My heart cries out over Moab\" is grief, not gloating, over an old enemy." },
    ],
  },
  {
    book: "isaiah",
    chapter: 16,
    title: "Moab's refugees at Zion's door",
    setting:
      "The lament for Moab continues. Moabite refugees huddle at the fords of the Arnon, the river on Moab's northern border, and are urged to send tribute lambs to Jerusalem and ask David's house for shelter, as Moab's king once sent lambs to Israel's king (2 Kings 3:4). Moab's pride blocks the way (verse 6). A closing note sets a deadline: within three years the disaster will strike.",
    words: [
      { v: 5, s: 2617, note: "Chesed, \"loving devotion\": covenant loyalty and steadfast love, the word that sums up God's faithfulness to His promises. Here it is the very foundation on which a throne is built." },
      { v: 14, s: 7916, note: "Sakhir, \"hired worker\": a laborer who counts the days of his contract exactly. Three years \"as a hired worker counts\" means no more and no less." },
    ],
  },
  {
    book: "isaiah",
    chapter: 17,
    title: "Damascus and Ephraim fall together",
    setting:
      "This oracle targets Damascus, capital of Aram, together with its ally Ephraim, the northern kingdom of Israel. These were the two kings who threatened Ahaz in chapter 7, so it probably dates from about 734 BC. Assyria took Damascus in 732 BC and Samaria in 722 BC. Only a few gleanings would be left of Israel. The chapter ends with roaring nations driven off like chaff overnight.",
    words: [
      { v: 6, s: 5955, note: "Olelah, \"gleanings\": the few olives or grapes left on the branches after harvest for the poor (Deuteronomy 24:20). Israel's remnant will be that small." },
      { v: 10, s: 6697, note: "Tsur, \"Rock\": a title for God as an unshakable refuge, rooted in the Song of Moses (Deuteronomy 32:4). Israel forgot its Rock and planted other gardens." },
    ],
  },
  {
    book: "isaiah",
    chapter: 18,
    title: "Envoys from the land of Cush",
    setting:
      "Cush was the land south of Egypt along the upper Nile, roughly modern Sudan. In the late 700s BC a Cushite dynasty took control of Egypt and sent envoys in papyrus boats to rally smaller nations against Assyria. Judah was tempted to join. Isaiah sends the messengers home with a message: God will act in His own time, and one day Cush itself will bring gifts to Mount Zion.",
    words: [
      { v: 2, s: 1573, note: "Gome, \"papyrus\": a reed. Light boats of bundled papyrus were used on the Nile, ideal for fast messengers." },
      { v: 7, s: 7862, note: "Shay, \"gifts\": tribute brought to a king. The proud nation that sent envoys to make war will one day send gifts to the LORD." },
    ],
  },
  {
    book: "isaiah",
    chapter: 19,
    title: "Egypt struck and healed",
    setting:
      "Egypt had been the great power on Judah's southern border for centuries, and Judah's leaders were often tempted to lean on it against Assyria. Isaiah describes Egypt collapsing from within: civil war, a failing Nile, ruined fishing and linen industries, and foolish counselors in Zoan and Memphis. Then the oracle turns surprisingly hopeful, ending with Egypt and Assyria worshiping the LORD alongside Israel.",
    words: [
      { v: 25, s: 5971, note: "Am, \"My people\": a title God normally reserves for Israel. Here He gives it to Egypt, Israel's ancient oppressor." },
      { v: 20, s: 3467, note: "Yasha, \"savior\": one who rescues. As God once sent Moses to save Israel from Egypt, He will send a savior to Egypt itself." },
    ],
  },
  {
    book: "isaiah",
    chapter: 20,
    title: "Isaiah walks barefoot",
    setting:
      "In 711 BC Sargon II of Assyria sent his commander against Ashdod, a Philistine city that had revolted while counting on help from Egypt and Cush. Sargon's own inscriptions describe this campaign. For three years Isaiah walked through Jerusalem stripped and barefoot, dressed like a prisoner of war, to show Judah what would happen to the Egyptians and Cushites it hoped would rescue it.",
    words: [
      { v: 3, s: 6174, note: "Arom, \"naked\": often meaning stripped of outer clothing, down to a loincloth. It was how captives were marched away." },
      { v: 3, s: 4159, note: "Mophet, \"omen\": a sign or portent, a public warning acted out. Ezekiel would later be told he was such a sign (Ezekiel 12:6)." },
    ],
  },
  {
    book: "isaiah",
    chapter: 21,
    title: "Watchman, what is left of the night?",
    setting:
      "Three short, cryptic oracles. \"The Desert by the Sea\" is Babylon, on the marshy plain of southern Mesopotamia, attacked here by Elam and Media. Babylon revolted against Assyria several times in Isaiah's day and was sacked by Sennacherib in 689 BC; Cyrus took it in 539 BC, and scholars debate which fall is in view. Brief oracles follow on Dumah and on the Arabian tribes of Dedan and Kedar.",
    words: [
      { v: 11, s: 8104, note: "Shamar, \"watchman\": one who keeps watch through the night. A voice from Edom keeps asking how long the darkness will last." },
      { v: 9, s: 5307, note: "Naphal, \"fallen\": \"Fallen, fallen is Babylon!\" The repeated verb announces certainty, and Revelation 14:8 and 18:2 echo it about the final Babylon." },
    ],
  },
  {
    book: "isaiah",
    chapter: 22,
    title: "The Valley of Vision",
    setting:
      "Unusually, this oracle in the series on the nations targets Jerusalem itself, called the \"Valley of Vision,\" where God gave Isaiah his visions. The city celebrates on its rooftops, probably after the Assyrian army withdrew in 701 BC, while ignoring why the crisis came. Verses 15 to 25 turn to two palace officials: Shebna, who is carving himself a grand tomb, and Eliakim, who will replace him.",
    words: [
      { v: 22, s: 4668, note: "Maphteach, \"key\": the palace steward's key, probably large and carried on the shoulder as a badge of office. Whoever held it controlled who could enter the king's house." },
      { v: 13, s: 4279, note: "Machar, \"tomorrow\": \"Let us eat and drink, for tomorrow we die.\" Paul quotes this as the logic of a life without resurrection (1 Corinthians 15:32)." },
    ],
  },
  {
    book: "isaiah",
    chapter: 23,
    title: "The fall of proud Tyre",
    setting:
      "Tyre was the great Phoenician port on the coast of today's Lebanon, an island city whose merchant fleets sailed as far west as Tarshish. Its wealth and its harbor seemed untouchable. This oracle closes Isaiah's series against the nations: the LORD Himself has planned Tyre's humbling. Assyria attacked Phoenicia in Isaiah's day, Babylon besieged Tyre for years, and Alexander the Great finally took the island in 332 BC.",
    words: [
      { v: 9, s: 3289, note: "Yaats, \"planned\": to counsel or decide on a course of action. Tyre's fall is not an accident of trade cycles or war; it is God's settled purpose against pride." },
      { v: 1, s: 591, note: "Oniyyah, \"ships\": the \"ships of Tarshish\" were the large ocean-going vessels of the day, a byword for wealth and reach. Isaiah has them wail as they hear the news." },
    ],
  },
  {
    book: "isaiah",
    chapter: 24,
    title: "The whole earth under judgment",
    setting:
      "Chapters 24 to 27 are often called the \"Isaiah apocalypse\". After oracles against single nations, the view widens to the whole earth: priest and people, master and slave, buyer and seller all fall under the same judgment. Their date and setting are debated; many place them in Isaiah's own time, others later. Christians read them as a picture of final judgment, though they differ on how they fit an end-times timeline.",
    words: [
      { v: 5, s: 1285, note: "Berit, \"covenant\". The \"everlasting covenant\" here is probably God's covenant with Noah and all humanity (Genesis 9:16). The whole human race, not only Israel, has broken the moral order God set." },
      { v: 16, s: 7334, note: "Razi, \"wasting away\". The prophet hears distant songs of glory but cannot join them yet, because he sees how much treachery is still to be judged." },
    ],
  },
  {
    book: "isaiah",
    chapter: 25,
    title: "A feast on the mountain",
    setting:
      "Isaiah breaks from judgment into song. Ancient kings marked victories and coronations with lavish banquets for their nobles. Here the LORD of Hosts throws the feast on Mount Zion, and the guest list is \"all peoples\". The menu is the finest the ancient world knew: rich food and aged wine. Then comes the banquet's real business: God swallows up death itself. Moab, Israel's proud neighbor, stands for those who refuse to come.",
    words: [
      { v: 8, s: 1104, note: "Bala, \"swallow up\". In Canaanite myth Death (Mot) was a god with a huge throat who swallowed his victims. Here the swallower is swallowed. Paul quotes this line in 1 Corinthians 15:54." },
      { v: 6, s: 4960, note: "Mishteh, \"banquet\": a feast with drinking, from the verb \"to drink\". Jesus picks up this hope when He speaks of many coming from east and west to feast in the kingdom (Matthew 8:11)." },
    ],
  },
  {
    book: "isaiah",
    chapter: 26,
    title: "A song of the strong city",
    setting:
      "Chapter 26 is a song Judah will sing \"in that day\". Ancient cities lived or died by their walls and gates; here salvation itself is the wall. The song moves from confidence to honest frustration: God's people labored like a woman in childbirth and \"gave birth to wind\". Then comes one of the Old Testament's clearest hopes of resurrection: \"Your dead will live; their bodies will rise.\"",
    words: [
      { v: 3, s: 7965, note: "Shalom, \"peace\". The Hebrew says \"shalom shalom\", doubling the word for completeness, which English renders \"perfect peace\". It is wholeness, not just calm." },
      { v: 3, s: 3336, note: "Yetser, \"mind\": the inner shaping of thoughts and intentions (Genesis 6:5 uses it of evil imaginings). A mind that leans on God is kept by Him." },
    ],
  },
  {
    book: "isaiah",
    chapter: 27,
    title: "Leviathan slain and the vineyard renewed",
    setting:
      "Ancient Near Eastern myths told of gods battling sea monsters that stood for chaos. Texts from Ugarit describe Lotan as \"the fleeing serpent, the twisting serpent\", words very close to Isaiah 27:1. Isaiah borrows the familiar picture to say that the LORD will finally kill every power of chaos, likely including empires like Assyria and Egypt. Then he returns to his vineyard song of chapter 5, now with a happy ending.",
    words: [
      { v: 1, s: 3882, note: "Livyatan, \"Leviathan\": a coiling sea creature (Job 41, Psalm 74:14). Revelation 12:9 calls Satan \"that ancient serpent\", and many read this verse as God's final victory over evil." },
      { v: 13, s: 7782, note: "Shofar, \"ram's horn\": blown to gather people and announce great events. Jesus and Paul both speak of a great trumpet gathering God's people (Matthew 24:31, 1 Thessalonians 4:16)." },
    ],
  },
  {
    book: "isaiah",
    chapter: 28,
    title: "Woe to the drunkards of Ephraim",
    setting:
      "Isaiah first turns on Samaria, capital of the northern kingdom, a city crowning its hill like a party wreath and soon to fall to Assyria (722 BC). Then he turns to Jerusalem's leaders, who mocked his preaching as baby talk and trusted a secret treaty, probably with Egypt. Their \"covenant with death\" would not hold. Instead God lays a tested cornerstone in Zion for those who believe.",
    words: [
      { v: 16, s: 6438, note: "Pinnah, \"cornerstone\": the stone that sets the line for the whole building. Paul and Peter apply this verse to Jesus (Romans 9:33, 1 Peter 2:6)." },
      { v: 10, s: 6673, note: "Tsav, \"order\". \"Tsav latsav, tsav latsav, qav laqav\" sounds like nursery syllables; the leaders mock Isaiah's message as baby talk. God answers that He will speak through foreign, Assyrian tongues instead (v. 11)." },
    ],
  },
  {
    book: "isaiah",
    chapter: 29,
    title: "Woe to Ariel, the city of David",
    setting:
      "Ariel is a poetic name for Jerusalem, the city where David camped. The word may mean \"lion of God\" or \"altar hearth\" (Ezekiel 43:15), and either fits: the city will become like an altar where fire burns. Assyria would besiege Jerusalem in 701 BC, and God would rescue it suddenly. But Isaiah's sharper concern is a people who keep the festivals while their hearts are far from God.",
    words: [
      { v: 1, s: 740, note: "Ariel, possibly \"altar hearth\". Jerusalem, with its temple altar, will itself become a place of burning before God steps in to save it." },
      { v: 13, s: 3820, note: "Lev, \"heart\": in Hebrew the center of thinking, choosing and loving, not just feeling. Jesus quotes this verse against religious leaders in Mark 7:6 to 7." },
    ],
  },
  {
    book: "isaiah",
    chapter: 30,
    title: "Trusting Egypt's shadow",
    setting:
      "Around 705 to 701 BC, Judah's leaders sent envoys with donkeys and camels loaded with treasure through the dangerous Negev desert to buy Egypt's protection against Assyria. Isaiah calls it rebellion against God. Egypt was then ruled by Cushite pharaohs and looked strong, but Isaiah calls it \"Rahab Who Sits Still\", a monster that will do nothing. Yet the chapter ends with God longing to be gracious.",
    words: [
      { v: 7, s: 7293, note: "Rahab, \"arrogance\" or \"storm\": a mythical sea monster and a poetic name for Egypt (Psalm 87:4). It is not the same name as Rahab of Jericho, which is spelled differently in Hebrew." },
      { v: 15, s: 7729, note: "Shuvah, \"repentance\": from shuv, \"to turn back\". Salvation lay not in a new alliance but in turning back to God and resting in Him." },
    ],
  },
  {
    book: "isaiah",
    chapter: 31,
    title: "Horses are flesh, not spirit",
    setting:
      "Chapter 31 restates the warning of chapter 30 in sharper images. Egypt's chariot horses were the ancient equivalent of a superpower's air force, and Judah's leaders were tempted to buy their protection. Isaiah answers with two animal pictures of God: a lion that will not be scared off its prey by shouting shepherds, and birds hovering over their nest. Assyria, he says, will fall \"not by the sword of man\".",
    words: [
      { v: 3, s: 1320, note: "Basar, \"flesh\": human and animal life in its weakness and mortality. The contrast with ruach (\"spirit\") is not body versus soul but creature versus Creator." },
      { v: 5, s: 6452, note: "Pasach, \"pass over\": the same verb used of the LORD passing over Israel's homes in Egypt (Exodus 12:13). Jerusalem will be spared like the Passover households." },
    ],
  },
  {
    book: "isaiah",
    chapter: 32,
    title: "A king who reigns in righteousness",
    setting:
      "Isaiah pictures a coming king whose rule turns leaders into shelter for the people, a stark contrast with Judah's rulers in his day. Some read it first of Hezekiah's reforms, and many Christians see its fullness in the Messiah of Isaiah 9 and 11. In the middle, Isaiah turns to the complacent women of Jerusalem: within a year the harvest would fail. Then he looks ahead to the Spirit poured out from on high.",
    words: [
      { v: 1, s: 6664, note: "Tsedeq, \"righteousness\": what is right by God's standard, especially in how power treats the weak. Justice is not a policy of this king; it is the shape of his whole reign." },
      { v: 2, s: 4224, note: "Machave, \"shelter\" or \"hiding place\". Good leaders become what only God was called before: a place where the vulnerable can hide from the storm." },
    ],
  },
  {
    book: "isaiah",
    chapter: 33,
    title: "Who can dwell with the consuming fire?",
    setting:
      "Chapter 33 probably reflects the Assyrian crisis of 701 BC. Sennacherib took Judah's fortified cities, and Hezekiah paid him a huge tribute, yet the Assyrians still marched on Jerusalem (2 Kings 18:13 to 17). Isaiah calls him the traitor \"never betrayed\". The chapter reads like a temple liturgy: a prayer for help, God's answer, and a searching question about who may live in His presence.",
    words: [
      { v: 14, s: 784, note: "Esh, \"fire\". God is a \"consuming fire\" (Deuteronomy 4:24, Hebrews 12:29). The question is not who can escape God's holiness, but who can live close to it (v. 15)." },
      { v: 22, s: 2710, note: "Chaqaq, \"lawgiver\": literally one who engraves or decrees. Judge, lawgiver and king were separate roles in Israel; here all three belong to the LORD." },
    ],
  },
  {
    book: "isaiah",
    chapter: 34,
    title: "Judgment on Edom",
    setting:
      "Edom, south of the Dead Sea, descended from Esau, Jacob's brother. Its hostility to Israel ran deep, and when Babylon destroyed Jerusalem, Edom gloated and joined in (Obadiah 10 to 14, Psalm 137:7). Isaiah 34 uses Edom as a symbol of every nation set against God and paints its judgment in cosmic colors. The violent language is meant to shock. In the centuries that followed, Edom faded and others took its land.",
    words: [
      { v: 2, s: 2763, note: "Charam, \"devote to destruction\": to hand something wholly over to God, often by destroying it, as at Jericho (Joshua 6:17). It is God's verdict, not license for human cruelty." },
      { v: 11, s: 8414, note: "Tohu, \"chaos\": the \"formless\" of Genesis 1:2, paired here with bohu (\"void\") as there. Edom's judgment is creation run backward." },
    ],
  },
  {
    book: "isaiah",
    chapter: 35,
    title: "The desert will bloom",
    setting:
      "Right after Edom becomes a wasteland, Isaiah paints its opposite: a desert bursting into flower. Lebanon's cedars, Carmel's orchards and Sharon's fertile plain were the lushest places Israel knew, and their glory comes to the wilderness. The redeemed travel a highway home through the desert, anticipating chapter 40. Jesus pointed to its healings, blind eyes opened and lame legs leaping, as signs of who He is (Matthew 11:4 to 5).",
    words: [
      { v: 8, s: 4547, note: "Maslul, \"highway\": a raised, built-up road, not a footpath. God engineers the way home so that even the simple cannot lose it." },
      { v: 10, s: 6299, note: "Padah, \"ransomed\": set free by payment, as Israel was ransomed from Egypt (Deuteronomy 7:8). Jesus came to give His life as a ransom for many (Mark 10:45)." },
    ],
  },
  {
    book: "isaiah",
    chapter: 36,
    title: "The Assyrian commander's speech",
    setting:
      "In 701 BC Sennacherib of Assyria invaded Judah and captured its fortified cities, including Lachish; his palace reliefs of that siege are in the British Museum today. Chapters 36 to 39 closely parallel 2 Kings 18 to 20, and scholars debate which came first. Here the Rabshakeh, a senior Assyrian official, stands at the same aqueduct where Isaiah once met King Ahaz (7:3) and argues Jerusalem toward surrender.",
    words: [
      { v: 4, s: 7262, note: "Rabshakeh, \"chief officer\": a title, not a personal name, possibly \"chief cupbearer\". He speaks for the great king." },
      { v: 4, s: 986, note: "Bittachon, \"confidence\": a rare noun from batach, \"to trust\". The verb runs through the whole speech; Assyria's real attack is on Judah's trust." },
    ],
  },
  {
    book: "isaiah",
    chapter: 37,
    title: "Hezekiah spreads the letter before the LORD",
    setting:
      "With Jerusalem cut off, Hezekiah tears his clothes, goes to the temple and sends for Isaiah. Sennacherib's letter boasts of all the kings Assyria has crushed. Hezekiah answers with prayer, and Isaiah answers with a taunt song. Sennacherib's own annals boast that he shut Hezekiah up \"like a bird in a cage\" but never claim he took Jerusalem. Years later he was killed by his own sons, as verse 38 says.",
    words: [
      { v: 16, s: 3742, note: "Keruv, \"cherub\". The ark in the temple was flanked by golden cherubim and pictured as God's throne. Hezekiah prays to the true King enthroned there, above every Assyrian throne." },
      { v: 31, s: 6413, note: "Peletah, \"remnant\" or \"survivors\": those who escape. A small surviving Judah will take root and bear fruit again, a theme that runs through Isaiah." },
    ],
  },
  {
    book: "isaiah",
    chapter: 38,
    title: "Hezekiah's sickness and fifteen more years",
    setting:
      "This happened \"in those days\", probably before the Assyrian siege, since God also promises to defend the city (v. 6). Hezekiah, about 39, had no heir yet; Manasseh would be born within those fifteen years (2 Kings 21:1). Isaiah prescribes a fig poultice, a known ancient remedy, and God gives a sign of the shadow moving back on the stairway of Ahaz. Hezekiah's psalm records his thoughts facing death.",
    words: [
      { v: 1, s: 6680, note: "Tsavah, \"put in order\": literally \"give commands to your house\", that is, give final instructions and settle your affairs. It is the language of a deathbed will." },
      { v: 17, s: 7845, note: "Shachat, \"pit\": the grave and the realm of death. Hezekiah sees God's love pulling him back from its edge and casting his sins away." },
    ],
  },
  {
    book: "isaiah",
    chapter: 39,
    title: "Envoys from Babylon",
    setting:
      "Merodach-baladan was a Chaldean chieftain who twice seized the throne of Babylon and spent years rebelling against Assyria. His get-well gift to Hezekiah was probably also a recruiting visit for an anti-Assyrian alliance. Flattered, Hezekiah showed the envoys everything. Isaiah's reply is the first clear word that Babylon, not Assyria, would carry Judah away, more than a century before it happened in 586 BC.",
    words: [
      { v: 2, s: 5238, note: "Nekhot, \"treasure house\": the royal storehouse of valuables. Hezekiah opens it to men who would one day return to empty it." },
      { v: 8, s: 2896, note: "Tov, \"good\". Hezekiah calls God's word of judgment \"good\", perhaps humbly, but the text adds his relief that the disaster will come after his lifetime." },
    ],
  },
  {
    book: "isaiah",
    chapter: 41,
    title: "Fear not, I am with you",
    setting:
      "Isaiah 41 is set like a courtroom. God summons the coastlands and nations to trial and challenges their idols to predict the future. Meanwhile a conqueror is stirring \"from the east\", and the nations panic and nail their idols down so they will not topple. Most readers identify him with Cyrus of Persia, named in 44:28. To Israel, small and far from home, God speaks some of the tenderest words in Scripture.",
    words: [
      { v: 8, s: 157, note: "Ahav, \"friend\": literally \"the one who loves Me\". Only Abraham is called God's friend this way (2 Chronicles 20:7, James 2:23)." },
      { v: 14, s: 8438, note: "Tola, \"worm\": a picture of being small, weak and despised. Psalm 22:6 uses the same word (\"I am a worm and not a man\"), the psalm Jesus prayed on the cross." },
    ],
  },
  {
    book: "isaiah",
    chapter: 42,
    title: "Here is My Servant",
    setting:
      "Isaiah 42 opens the first of four \"Servant songs\" (42:1 to 9, 49:1 to 13, 50:4 to 11, 52:13 to 53:12). The servant is sometimes Israel (41:8), yet this Servant does what Israel could not: bring justice to the nations and be a covenant for the people. Jewish readers have long debated the Servant's identity. Matthew 12:18 to 21 quotes verses 1 to 4 of Jesus, and the Father's words at His baptism echo verse 1.",
    words: [
      { v: 1, s: 972, note: "Bachir, \"chosen one\". At the transfiguration the Father calls Jesus \"My Son, whom I have chosen\" (Luke 9:35), echoing this verse." },
      { v: 3, s: 7533, note: "Ratsats, \"bruised\" or \"crushed\". The same words, \"crushed reed\", described Egypt as a useless staff in 36:6. The Servant does not discard what is broken; He restores it." },
    ],
  },
  {
    book: "isaiah",
    chapter: 43,
    title: "You are Mine",
    setting:
      "Speaking to exiles who felt abandoned, God reminds them that He created, formed, redeemed and named them. He promises to bring their children back from every direction and to make a new exodus through the desert. In verse 14 He names Babylon: the Chaldeans who prided themselves on their ships would flee in them. The chapter also returns to the courtroom, where Israel is called as God's witness that He alone is God.",
    words: [
      { v: 1, s: 1350, note: "Gaal, \"redeem\": the work of the go'el, the close relative who bought back family land or a family member sold into debt (Leviticus 25:25, Ruth 4). God acts as Israel's next of kin." },
      { v: 10, s: 5707, note: "Ed, \"witness\": one who testifies in court to what they have seen. Jesus gives His followers the same role (Acts 1:8)." },
    ],
  },
  {
    book: "isaiah",
    chapter: 44,
    title: "The LORD who names Cyrus",
    setting:
      "Isaiah 44 sets God's promise to pour out His Spirit beside a biting satire of idol making. Then it names Cyrus, the Persian king who took Babylon in 539 BC and let exiled peoples go home (Ezra 1:1 to 4). Readers differ: many evangelicals see a prophecy given some 150 years ahead, and Josephus says Cyrus was shown it; many scholars think the words come from a prophet living in Cyrus's own time.",
    words: [
      { v: 28, s: 3566, note: "Koresh, \"Cyrus\": the founder of the Persian Empire. A pagan king is called God's shepherd, carrying out His plan without knowing Him (45:4)." },
      { v: 2, s: 3484, note: "Yeshurun, \"upright one\": an affectionate name for Israel (Deuteronomy 32:15, 33:5). God calls a failing people by the name of what He will make them." },
    ],
  },
  {
    book: "isaiah",
    chapter: 45,
    title: "Cyrus, the LORD's anointed",
    setting:
      "Chapters 40 to 55 speak to Judah's exiles in Babylon, where Persia's King Cyrus would conquer the city in 539 BC and let them go home (Ezra 1:1 to 4). Many scholars think a later prophet in Isaiah's tradition wrote these chapters; others hold that Isaiah foresaw it all, and the New Testament quotes them as Isaiah. Either way, God names a pagan king as the tool of His plan.",
    words: [
      { v: 1, s: 4899, note: "Mashiach, \"anointed\": The word behind Messiah. Used here of a pagan king set apart for one task, it shows God commissioning Cyrus for a job, not saving him." },
      { v: 18, s: 8414, note: "Tohu, \"empty\": The same word as \"formless\" in Genesis 1:2. God did not make the earth to be a void but a home for people." },
    ],
  },
  {
    book: "isaiah",
    chapter: 46,
    title: "Idols that must be carried",
    setting:
      "Bel (another name for Marduk) and Nebo, his son, were Babylon's chief gods. At the New Year festival their statues were carried in grand processions through the city. Isaiah pictures the opposite parade: as Babylon falls, the idols are loaded onto tired animals and hauled off as cargo. Israel's God is the reverse. He does not need carrying; He carries His people from birth to old age.",
    words: [
      { v: 4, s: 5445, note: "Saval, \"carry\": To bear a heavy load, like a porter. The same verb describes the Servant carrying our sorrows in Isaiah 53:4." },
    ],
  },
  {
    book: "isaiah",
    chapter: 47,
    title: "The proud queen dethroned",
    setting:
      "Babylon was the great power of its day, a center of learning, trade, and stargazing. Its priests kept detailed records of omens and the movements of the planets to predict the future. Isaiah taunts the city as a pampered royal lady forced off her throne into a slave's work. God had used Babylon to discipline Judah, but Babylon showed no mercy and boasted that it would last forever.",
    words: [
      { v: 7, s: 1404, note: "Geveret, \"queen\": Literally \"mistress\" or \"lady,\" the woman who rules a household. Babylon saw itself as the permanent lady of the nations." },
      { v: 13, s: 1895, note: "Havar, \"astrologer\": Literally \"those who divide the heavens,\" dividing the sky into zones to read omens." },
    ],
  },
  {
    book: "isaiah",
    chapter: 48,
    title: "Refined in the furnace",
    setting:
      "Isaiah now addresses stubborn Israel directly. They bore the LORD's name and swore by it but did not trust Him. God explains why He announced events long before they happened: so no one could credit an idol. Their exile is a furnace, not a final verdict, and the chapter ends with a ringing command to leave Babylon and tell the world that the LORD has redeemed His servant Jacob.",
    words: [
      { v: 10, s: 6884, note: "Tsaraph, \"refine\": The smelter's word for heating metal to burn off its impurities. God's discipline aims at purity, not destruction." },
      { v: 18, s: 7965, note: "Shalom, \"peace\": Wholeness and well being. Had Israel listened, it would have flowed steadily like a river." },
    ],
  },
  {
    book: "isaiah",
    chapter: 49,
    title: "A light for the nations",
    setting:
      "This is the second of the Servant Songs (49:1 to 6). The Servant speaks, called from the womb and named \"Israel,\" yet sent to restore Israel and to bring God's salvation to the ends of the earth. Paul and Barnabas quoted verse 6 as their own commission to preach to Gentiles (Acts 13:47). The rest of the chapter answers Zion's fear that God has forgotten her.",
    words: [
      { v: 6, s: 216, note: "Or, \"light\": Light means life, guidance and salvation. Simeon echoed this verse when he held the baby Jesus (Luke 2:32)." },
      { v: 16, s: 2710, note: "Chaqaq, \"inscribed\": To cut or engrave, as on stone. Zion is not written in ink that fades but carved into God's own hands." },
    ],
  },
  {
    book: "isaiah",
    chapter: 50,
    title: "The Servant who listens",
    setting:
      "The third Servant Song (50:4 to 9) is the Servant's own testimony. He learns from God each morning, and when He is beaten, His beard torn out and He is spat on, He does not turn back. Shaming a man by pulling his beard was a deep insult in the ancient Near East. The Gospels record the same kind of abuse at Jesus' trial (Mark 14:65).",
    words: [
      { v: 4, s: 3928, note: "Limmud, \"disciple\": One who is taught. The Servant speaks with a disciple's tongue because He first listens like one." },
      { v: 7, s: 2496, note: "Challamish, \"flint\": The hardest stone Israel knew. The Servant sets His face like flint, compare Luke 9:51." },
    ],
  },
  {
    book: "isaiah",
    chapter: 51,
    title: "Look to the rock",
    setting:
      "The exiles felt small and forgotten in Babylon. God tells them to remember Abraham and Sarah: one childless couple from whom He made a nation. The chapter then calls God's arm to wake up as it did at the Red Sea, and tells Jerusalem to wake up from the stupor of judgment. The cup of God's wrath she drank will be taken away and handed to those who crushed her.",
    words: [
      { v: 1, s: 6697, note: "Tsur, \"rock\": A cliff or quarry face. Israel was cut from Abraham and Sarah like stone from a quarry." },
      { v: 17, s: 3563, note: "Kos, \"cup\": A cup that a person must drink stands for an assigned destiny, often judgment. Compare Jesus' prayer in Mark 14:36." },
    ],
  },
  {
    book: "isaiah",
    chapter: 52,
    title: "Your God reigns",
    setting:
      "News in the ancient world traveled on foot. Watchmen on Jerusalem's walls scanned the hills for a runner, and his pace could tell them whether the news was good or bad. Isaiah pictures a messenger crossing the mountains with the best report of all: the exile is over and God is coming home to Zion. Verse 13 then begins the fourth Servant Song, which runs through chapter 53.",
    words: [
      { v: 7, s: 1319, note: "Basar, \"bring good news\": To announce good tidings. The Greek Old Testament used the word family that gives us \"gospel,\" and Paul quotes this verse in Romans 10:15." },
      { v: 15, s: 5137, note: "Nazah, \"sprinkle\": The priest's word for sprinkling blood or water to cleanse (Leviticus 16:14). The Servant will purify nations." },
    ],
  },
  {
    book: "isaiah",
    chapter: 54,
    title: "Sing, O barren woman",
    setting:
      "Right after the Servant's suffering comes a burst of joy. Zion is pictured as a childless wife and a widow, the two most vulnerable women in Israel's world. God calls her to enlarge her tent for children she never expected, and promises a covenant of peace like His oath to Noah. Paul quotes verse 1 in Galatians 4:27 about the family God builds through promise.",
    words: [
      { v: 5, s: 1166, note: "Baal, \"husband\": To be master and husband. Israel's true husband is not a Canaanite Baal but her Maker." },
      { v: 1, s: 6135, note: "Aqar, \"barren\": Childless, a source of deep shame in Israel. Sarah, Rebekah, Rachel and Hannah all bore this word before God intervened." },
    ],
  },
  {
    book: "isaiah",
    chapter: 55,
    title: "Come to the waters",
    setting:
      "Isaiah sounds like a street vendor in an ancient market calling out water, wine and milk, except these goods are free. The exiles in Babylon had spent their money and work on things that did not satisfy. God offers an everlasting covenant built on His loyal love to David, a call to seek Him while He may be found, and a promise that His word will not fail.",
    words: [
      { v: 1, s: 7666, note: "Shavar, \"buy\": To buy grain, the everyday food purchase. God invites the poor to shop with no money at all." },
      { v: 11, s: 7387, note: "Reqam, \"empty\": Empty handed, without result. God's word always returns carrying what He sent it to do." },
    ],
  },
  {
    book: "isaiah",
    chapter: 56,
    title: "A house of prayer for all",
    setting:
      "The Law kept some people at the edge of Israel's worship: foreigners and men who had been castrated (Deuteronomy 23:1 to 8). Eunuchs often served in royal courts, and some Judeans may have been made eunuchs in Babylon. God now promises that any foreigner or eunuch who keeps His covenant will have a place in His house. Jesus quoted verse 7 when He cleared the temple (Mark 11:17).",
    words: [
      { v: 7, s: 8605, note: "Tephillah, \"prayer\": The temple was meant to be a place where anyone could meet God in prayer, not a closed club." },
      { v: 5, s: 3027, note: "Yad, \"memorial\": Literally \"hand,\" a monument. Israel's Holocaust memorial, Yad Vashem, takes its name from this verse." },
    ],
  },
  {
    book: "isaiah",
    chapter: 57,
    title: "High, holy, and near",
    setting:
      "Verses 1 to 13 expose idol worship practiced in Judah in Isaiah's day and after: rites under green trees, offerings to the god Molech, which could include child sacrifice, and alliances with foreign powers. Into this God speaks one of Scripture's great promises. The One who lives in eternity also lives with the crushed and humble, and He offers peace to those far and near.",
    words: [
      { v: 15, s: 1793, note: "Dakka, \"contrite\": Crushed into dust. God's high throne has room for the one whose pride has been broken." },
    ],
  },
  {
    book: "isaiah",
    chapter: 58,
    title: "The fast God chooses",
    setting:
      "After the exile, fasting became a regular public ritual in Judah (Zechariah 7:3 to 5). People fasted, bowed and wore sackcloth, then complained that God did not notice. Isaiah exposes the problem: on fast days they still drove their workers hard and quarreled. God's chosen fast is justice, freeing the oppressed and sharing bread, and a Sabbath kept as delight rather than as business as usual.",
    words: [
      { v: 6, s: 6685, note: "Tsom, \"fast\": Going without food as a sign of humility. God redefines it as going without injustice." },
      { v: 13, s: 6027, note: "Oneg, \"delight\": Exquisite pleasure. The Sabbath is not a burden to be endured but a joy to be enjoyed." },
    ],
  },
  {
    book: "isaiah",
    chapter: 59,
    title: "The Redeemer comes to Zion",
    setting:
      "The people asked why God was not rescuing them. Isaiah answers bluntly: the problem is not God's hearing but their sin. The chapter moves from accusation to confession in the people's own voice, and then God Himself steps in, armed like a warrior, because no one else could intercede. Paul borrows the armor in Ephesians 6 and quotes verse 20 in Romans 11:26.",
    words: [
      { v: 2, s: 914, note: "Badal, \"separate\": To divide or set apart, the verb God used to divide light from darkness (Genesis 1:4). Sin builds a wall." },
      { v: 20, s: 1350, note: "Gaal, \"redeem\": The kinsman redeemer who buys back a relative's land or freedom (Leviticus 25:25, Ruth 4). God acts as Israel's next of kin." },
    ],
  },
  {
    book: "isaiah",
    chapter: 60,
    title: "Arise, shine",
    setting:
      "Isaiah paints restored Jerusalem as the shining center of the world. Nations bring their wealth by camel caravan from Sheba and by ship from Tarshish, the edges of the known world. For returning exiles, Jerusalem was rubble; the vision went far beyond what they saw. The book of Revelation borrows its images for the new Jerusalem, where God Himself is the light (Revelation 21:23 to 26).",
    words: [
      { v: 1, s: 215, note: "Or, \"shine\": To become light. Zion does not produce the light; she reflects the glory that has dawned on her." },
      { v: 19, s: 216, note: "Or, \"light\": God replaces sun and moon as the city's everlasting light, the picture behind Revelation 22:5." },
    ],
  },
  {
    book: "isaiah",
    chapter: 61,
    title: "Good news to the poor",
    setting:
      "An anointed speaker announces release for captives and the year of the LORD's favor, language drawn from the Jubilee, when every fifty years debts were canceled and land returned (Leviticus 25:10). In the synagogue at Nazareth Jesus read verses 1 and 2, stopped mid sentence before \"the day of vengeance,\" and said, \"Today this Scripture is fulfilled in your hearing\" (Luke 4:16 to 21).",
    words: [
      { v: 1, s: 4886, note: "Mashach, \"anoint\": To pour oil on someone to set them apart for a task. The noun form gives us Messiah, and Jesus claimed this anointing." },
      { v: 1, s: 1865, note: "Deror, \"liberty\": The Jubilee word for release of slaves (Leviticus 25:10), engraved on America's Liberty Bell." },
    ],
  },
  {
    book: "isaiah",
    chapter: 62,
    title: "A new name for Zion",
    setting:
      "In Israel's world a name described who you were. Ruined Jerusalem had been called Forsaken and Desolate. God promises new names: Hephzibah, \"My delight is in her,\" and Beulah, \"married.\" The prophet refuses to stop praying until it happens, and posts watchmen who remind God of His promises. The chapter ends with a road built for the returning people and the cry that salvation is coming.",
    words: [
      { v: 4, s: 2657, note: "Hephzibah, \"my delight is in her\": Also the name of a queen of Judah (2 Kings 21:1). God gives it to a city once called Forsaken." },
      { v: 4, s: 1166, note: "Baal, \"married\": Your land will be Beulah, a married land, no longer a deserted wife." },
    ],
  },
  {
    book: "isaiah",
    chapter: 63,
    title: "The warrior and the Father",
    setting:
      "Edom, south of the Dead Sea, was descended from Esau and was Israel's bitter neighbor. It cheered when Jerusalem fell (Psalm 137:7, Obadiah). Verses 1 to 6 picture God returning from Edom stained as if from a winepress, a symbol of His judgment on all His enemies. Then from verse 7 a long prayer of remembrance and lament begins that runs through chapter 64.",
    words: [
      { v: 10, s: 6087, note: "Atsav, \"grieve\": To hurt or pain. The Holy Spirit is grieved like a person, an idea Paul echoes in Ephesians 4:30." },
      { v: 16, s: 1, note: "Av, \"father\": Rare in the Old Testament for God. When ancestors fail, Israel appeals to God as Father." },
    ],
  },
  {
    book: "isaiah",
    chapter: 64,
    title: "Rend the heavens",
    setting:
      "This prayer continues from 63:7. The temple lies burned and Jerusalem is a wasteland, so the setting is the exile or just after, whether seen ahead by Isaiah or prayed by those who lived it. The people beg God to tear open the sky and come down as He did at Sinai, confess that their best deeds are stained, and cling to Him as clay clings to the potter.",
    words: [
      { v: 1, s: 7167, note: "Qara, \"rend\": To tear, as people tore their clothes in grief. At Jesus' baptism the heavens were torn open (Mark 1:10)." },
      { v: 8, s: 3335, note: "Yatsar, \"potter\": One who forms, the verb of God shaping Adam from dust (Genesis 2:7)." },
    ],
  },
  {
    book: "isaiah",
    chapter: 65,
    title: "New heavens and new earth",
    setting:
      "God answers the lament of chapters 63 and 64. He has been reaching out to a stubborn people who worship in gardens and eat unclean food, and He will keep a faithful remnant. Then comes a vision of new heavens and a new earth: long life, homes and harvests no one steals, and peace even among animals. Christians read it alongside 2 Peter 3:13 and Revelation 21.",
    words: [
      { v: 17, s: 1254, note: "Bara, \"create\": The verb of Genesis 1:1, used only with God as subject. The new creation is as much His work as the first." },
      { v: 25, s: 2061, note: "Zeev, \"wolf\": The wolf and lamb feeding together echo Isaiah 11:6 and picture a world where predators no longer harm." },
    ],
  },
  {
    book: "isaiah",
    chapter: 66,
    title: "Heaven is My throne",
    setting:
      "Isaiah's final chapter. Some returned exiles were eager to rebuild the temple (Haggai 1). God reminds them that heaven is His throne and earth His footstool; no building can contain Him. What He looks for is the humble person who trembles at His word. The book ends with nations gathered to worship, new heavens and new earth, and a sobering picture of judgment on the rebellious.",
    words: [
      { v: 2, s: 5223, note: "Nakheh, \"contrite\": Literally \"stricken\" or \"crippled.\" God looks for those who know they are broken." },
      { v: 13, s: 5162, note: "Nacham, \"comfort\": The word that opened the book's second half (40:1). God comforts like a mother." },
    ],
  },
  {
    book: "ruth",
    chapter: 2,
    title: "Gleaning in a stranger's field",
    setting:
      "Israel's law told farmers to leave the edges of their fields and any dropped stalks for the poor, the widow and the foreigner (Leviticus 19:9 to 10; Deuteronomy 24:19). Ruth was all three. The barley harvest ran from about April into May, hot and tiring work, and a woman alone among male laborers was exposed to real danger. Boaz is a wealthy relative of Naomi's late husband and a respected man in Bethlehem.",
    words: [
      { v: 3, s: 4745, note: "Miqreh, \"chance\" or \"happening\": Ruth \"happened\" to come to Boaz's field. The narrator is smiling: what looks like luck is God's quiet steering." },
      { v: 12, s: 3671, note: "Kanaph, \"wing\": Boaz blesses Ruth for taking refuge under God's wings. In chapter 3 she will ask him to spread his own kanaph over her." },
    ],
  },
  {
    book: "ruth",
    chapter: 3,
    title: "A bold request at the threshing floor",
    setting:
      "Naomi's plan rests on the role of the goel, the close male relative expected to rescue family members in trouble, buy back land they had lost, and keep a dead man's family line alive (Leviticus 25:25; Deuteronomy 25:5 to 6). A widow could not easily press that claim in public, so Naomi picks a private moment at the end of harvest, when the landowner slept beside his grain. Ruth goes to ask Boaz to take up that role.",
    words: [
      { v: 1, s: 4494, note: "Manoach, \"rest\" or \"resting place\": A settled home with a husband's protection. Naomi is working toward the rest she prayed Ruth would find back in 1:9." },
      { v: 9, s: 3671, note: "Kanaph, \"corner of a garment\" or \"wing\": To spread a garment over a woman was a way of taking her in marriage and protection (compare Ezekiel 16:8). Ruth asks Boaz to become the answer to his own prayer in 2:12." },
    ],
  },
  {
    book: "ruth",
    chapter: 4,
    title: "Redemption at the town gate",
    setting:
      "The town gate was ancient Israel's courthouse and public square, where elders sat as judges and witnesses. Boaz must first offer the nearer relative the right to buy back Elimelech's land, which came with the duty of giving Elimelech's line an heir through Ruth. Land was meant to stay in the family God had given it to (Leviticus 25:23 to 25), so redemption protected both property and name.",
    words: [
      { v: 1, s: 8179, note: "Shaar, \"gate\": More than a doorway. It was where elders sat, judged and witnessed agreements (Deuteronomy 21:19; Proverbs 31:23)." },
      { v: 6, s: 1353, note: "Geullah, \"redemption\" or \"right of redemption\": The legal right and duty to buy back what a relative had lost. The nearer kinsman gives it up; Boaz takes it on." },
    ],
  },
  {
    book: "jonah",
    chapter: 1,
    title: "Running from the presence of the LORD",
    setting:
      "Jonah son of Amittai was a prophet in northern Israel during the reign of Jeroboam II, roughly 790 to 750 BC (2 Kings 14:25). Assyria, with Nineveh as one of its great cities, was Israel's most feared enemy, known for brutal warfare. God sends Jonah east to Nineveh. Jonah instead boards a ship at Joppa heading west for Tarshish, often identified with a port in Spain, about as far as the known world went.",
    words: [
      { v: 3, s: 3381, note: "Yarad, \"go down\": Jonah goes down to Joppa, down into the ship, and down into its hold (v. 5). Running from God is pictured as a steady descent." },
      { v: 4, s: 2904, note: "Tul, \"hurl\": God hurls a wind at the sea; the sailors hurl the cargo, then Jonah himself (vv. 5, 12, 15). One verb tracks the whole crisis." },
    ],
  },
  {
    book: "jonah",
    chapter: 2,
    title: "A prayer from the depths",
    setting:
      "Jonah's prayer is a psalm of thanksgiving, prayed from inside the fish after God has already saved him from drowning. Nearly every line echoes the Psalms (compare Psalm 18:4 to 6; 42:7; 120:1), songs Israelites knew by heart and prayed in a crisis. In the ancient Near East the deep sea stood for chaos and death, the opposite of God's ordered world, so going under meant being as good as dead.",
    words: [
      { v: 2, s: 7585, note: "Sheol, \"the grave\" or \"the realm of the dead\": Jonah describes himself as already among the dead. The fish was not his tomb but God's rescue from one." },
      { v: 9, s: 3444, note: "Yeshuah, \"salvation\": The climax of the prayer. It shares its root with the name Yeshua, Jesus, because He will save His people (Matthew 1:21)." },
    ],
  },
  {
    book: "jonah",
    chapter: 3,
    title: "A violent city repents",
    setting:
      "Nineveh lay on the Tigris River, across from modern Mosul in Iraq. The \"three day journey\" (v. 3) may describe the size of the city with its surrounding districts, or the time a prophet needed to cover it. Assyrian records do not mention Jonah, so the exact occasion is unknown. Ancient Mesopotamians took omens and divine warnings very seriously. The change did not last: Nahum later announced Nineveh's fall, which came in 612 BC.",
    words: [
      { v: 4, s: 2015, note: "Haphakh, \"overturned\": The word used for Sodom's destruction (Genesis 19:25). It can also mean turned around, and that is what happened: Nineveh was overturned by repentance." },
      { v: 5, s: 539, note: "Aman, \"believed\": The root behind \"amen\". The Ninevites trusted God's word before they saw anything happen." },
    ],
  },
  {
    book: "daniel",
    chapter: 1,
    title: "Exiles in Babylon's palace",
    setting:
      "In 605 BC Nebuchadnezzar of Babylon defeated Egypt at Carchemish and took control of Judah, carrying off temple treasures and young men from noble families. This was the first of three waves of exile before Jerusalem fell in 586 BC. Babylon trained talented captives for royal service, giving them new names, a new language and food from the king's table, all designed to reshape their loyalty.",
    words: [
      { v: 8, s: 1351, note: "Gaal, \"defile\": Daniel resolves not to make himself unclean. He studies Babylon's learning and answers to a Babylonian name, but he draws the line at the king's table." },
      { v: 2, s: 5414, note: "Natan, \"gave\" or \"delivered\": The Lord gave Jehoiakim into Babylon's hand. The same verb returns in verses 9 and 17: God gave favor and God gave wisdom. Babylon is not really in charge." },
    ],
  },
  {
    book: "daniel",
    chapter: 2,
    title: "A king's dream of four kingdoms",
    setting:
      "Nebuchadnezzar ruled Babylon from 605 to 562 BC, so this dream comes early in his reign. Babylonian kings treated dreams as messages from the gods and kept experts trained in huge collections of omens to interpret them. Demanding the dream itself tested whether they really had access to the divine. At verse 4 the book switches from Hebrew to Aramaic, the international language of the day, and stays in Aramaic through chapter 7.",
    words: [
      { v: 18, s: 7328, note: "Raz, \"mystery\": A hidden thing only God can disclose. The New Testament uses mysterion the same way, for God's plan now revealed in Christ (Ephesians 3:3 to 6)." },
      { v: 44, s: 4437, note: "Malkhu, \"kingdom\": The chapter's key word. Human kingdoms rise and shatter, but the kingdom the God of heaven sets up will stand forever." },
    ],
  },
  {
    book: "daniel",
    chapter: 3,
    title: "The statue on the plain of Dura",
    setting:
      "Nebuchadnezzar sets up a gold statue, perhaps gold plated, about ninety feet tall on the plain of Dura near Babylon. It may have represented a god or the king himself; the text does not say. Gathering every official to bow at once was a loyalty ceremony binding the empire to the king and his gods. Large kilns for firing bricks were common in Babylon, and Jeremiah 29:22 mentions the king of Babylon burning men alive.",
    words: [
      { v: 1, s: 6755, note: "Tselem, \"image\" or \"statue\": The same word as Genesis 1:27, where people are made in God's image. The king demands worship for an image he made; the three refuse because they bear God's." },
      { v: 17, s: 7804, note: "Shezav, \"deliver\" or \"rescue\": The chapter's question. The king asks which god could rescue them (v. 15); by verse 28 he praises the God who did." },
    ],
  },
  {
    book: "daniel",
    chapter: 4,
    title: "The king who lost his mind",
    setting:
      "This chapter is written as a royal letter in Nebuchadnezzar's own voice, a style ancient kings used to publicize their deeds. Nebuchadnezzar rebuilt Babylon on a grand scale, and his surviving inscriptions boast of his building projects. The madness that strikes him, living like an animal, is not recorded in Babylonian sources. Some scholars link the story to the later king Nabonidus, who withdrew to the Arabian desert for about ten years.",
    words: [
      { v: 17, s: 5943, note: "Illay, \"the Most High\": The title for God that runs through this chapter. It answers the real question: who rules over human kingdoms?" },
      { v: 13, s: 5894, note: "Ir, \"watcher\": An angelic messenger, literally a wakeful one. Heaven is awake and paying attention to the affairs of earth." },
    ],
  },
  {
    book: "daniel",
    chapter: 5,
    title: "The writing on the wall",
    setting:
      "Belshazzar was the son of Nabonidus, Babylon's last king, and ruled in Babylon while his father stayed away for years. That is why he can offer Daniel only third place in the kingdom (v. 16). In October 539 BC the Persians under Cyrus took Babylon with little fighting. The Greek historians Herodotus and Xenophon say the city was holding a festival when it fell. Daniel was by then an old man.",
    words: [
      { v: 25, s: 4484, note: "Mene, \"numbered\": The words are weights or coins: a mina, a shekel, half a mina. Daniel reads them as verbs: numbered, weighed, divided." },
      { v: 23, s: 5396, note: "Nishma, \"breath\": Belshazzar praised gods of silver and gold, yet his very breath was in the hand of the true God." },
    ],
  },
  {
    book: "daniel",
    chapter: 6,
    title: "Daniel in the lions' den",
    setting:
      "The Persian Empire was run through satraps, governors over provinces, with supervisors to keep them honest. Daniel, probably in his eighties, is one of three supervisors. \"Darius the Mede\" is not yet known outside the Bible; he may be another name for Cyrus or for a governor of Babylon such as Gubaru. A Persian royal law could not be revoked (Esther 1:19), so the king was trapped by his own decree.",
    words: [
      { v: 10, s: 3551, note: "Kavah, \"window\": Daniel prays facing Jerusalem, as Solomon had asked exiles to do (1 Kings 8:46 to 49). With open windows, his prayers were no secret." },
      { v: 22, s: 4398, note: "Malakh, \"angel\" or \"messenger\": God sent His angel to shut the lions' mouths. Hebrews 11:33 remembers those who by faith \"shut the mouths of lions\"." },
    ],
  },
  {
    book: "daniel",
    chapter: 8,
    title: "The ram, the goat and the little horn",
    setting:
      "This vision comes in Belshazzar's third year, a few years after chapter 7, and the book returns to Hebrew. Daniel sees himself in Susa, later a Persian capital. The angel names the ram as Media and Persia and the goat as Greece (vv. 20 to 21). The great horn is widely taken as Alexander the Great, whose empire split four ways after his death in 323 BC. The little horn fits Antiochus IV, who outlawed Jewish worship around 167 BC.",
    words: [
      { v: 9, s: 6643, note: "Tsevi, \"beauty\" or \"the Beautiful Land\": A title for the land of Israel. The little horn's real target is God's people and their land." },
      { v: 14, s: 6944, note: "Qodesh, \"sanctuary\" or \"holy place\": After 2300 evenings and mornings the sanctuary would be set right. Many link this to the temple's rededication in 164 BC, still remembered at Hanukkah." },
    ],
  },
  {
    book: "daniel",
    chapter: 9,
    title: "Daniel's prayer and the seventy weeks",
    setting:
      "It is the first year after Babylon fell to Persia, about 539 BC. Reading Jeremiah's scroll, Daniel realizes the seventy years of exile Jeremiah foretold (Jeremiah 25:11; 29:10) are nearly complete. Instead of celebrating, he fasts and confesses the nation's sin, much as Ezra and Nehemiah later prayed (Ezra 9; Nehemiah 9). Gabriel's answer about \"seventy weeks\" is among the most debated passages in the Bible.",
    words: [
      { v: 4, s: 1285, note: "Berit, \"covenant\": Daniel appeals to the God who keeps His covenant. Israel broke it; God's faithfulness is the only ground for the prayer." },
      { v: 3, s: 8469, note: "Tachanun, \"plea for mercy\": A request for grace, not a claim of rights. Verse 18 says it plainly: not because of our righteousness, but because of Your great compassion." },
    ],
  },
  {
    book: "daniel",
    chapter: 10,
    title: "A heavenly messenger by the Tigris",
    setting:
      "The final vision (chapters 10 to 12) comes in the third year of Cyrus, about 536 BC. Some exiles had gone home to rebuild the temple, but local opposition had stalled the work (Ezra 4:4 to 5). Daniel, now an old man, had stayed in Babylon. After three weeks of mourning and fasting, he sees a dazzling figure by the Tigris and learns that unseen spiritual powers stand behind the nations.",
    words: [
      { v: 13, s: 8269, note: "Sar, \"prince\" or \"ruler\": Here it names spiritual powers linked to Persia and Greece, opposed by Michael, the prince who stands for Israel (v. 21)." },
      { v: 11, s: 2532, note: "Chemdah, \"treasured\" or \"precious\": Daniel is told twice that he is greatly treasured by God (vv. 11, 19). The vision begins with love, not fear." },
    ],
  },
  {
    book: "daniel",
    chapter: 11,
    title: "Kings of the North and South",
    setting:
      "This long prophecy traces wars between the \"king of the North\", the Seleucid rulers based in Syria, and the \"king of the South\", the Ptolemies of Egypt, after Alexander's empire split. Its details closely match events from about 320 to 164 BC, climaxing with Antiochus IV Epiphanes, who looted the temple and set up pagan worship there in 167 BC. Many readers see verses 36 to 45 moving beyond Antiochus toward a final enemy of God.",
    words: [
      { v: 21, s: 959, note: "Bazah, \"despise\": \"A despicable person\" introduces Antiochus IV. He called himself Epiphanes, \"god made manifest\"; critics punned it as Epimanes, \"madman\"." },
      { v: 32, s: 3045, note: "Yada, \"know\": \"The people who know their God\" stand firm. In Hebrew, knowing God means a relationship of trust, not just information." },
    ],
  },
  {
    book: "daniel",
    chapter: 12,
    title: "Awake from the dust",
    setting:
      "The final vision ends with a time of distress unlike any before, followed by rescue for everyone written in God's book. It contains the clearest Old Testament statement of bodily resurrection (v. 2). Jews who died for their faith under Antiochus IV held on to this hope (2 Maccabees 7). Christians differ on whether the chapter describes that crisis, the end of history, or one foreshadowing the other.",
    words: [
      { v: 2, s: 3463, note: "Yashen, \"sleep\": Death pictured as sleep, which implies waking. Jesus and Paul use the same picture (John 11:11; 1 Thessalonians 4:13 to 14)." },
      { v: 3, s: 2094, note: "Zahar, \"shine\": The wise will shine like the sky. Jesus echoes it: the righteous will shine like the sun (Matthew 13:43)." },
    ],
  },
  {
    book: "joshua",
    chapter: 2,
    title: "Rahab hides the spies at Jericho",
    setting:
      "Israel is camped at Shittim, east of the Jordan, across from Jericho, an old fortified city guarding the road up into the hill country. Spies lodging at a prostitute's house near the wall would draw less notice, since such houses often doubled as inns for travelers. Rahab, a Canaanite woman with no standing, has heard what Israel's God did at the Red Sea and in the wars east of the Jordan, and she makes her choice.",
    words: [
      { v: 18, s: 8615, note: "Tiqvah, \"cord\": The usual word for \"hope\" also means a cord or line. The scarlet cord in Rahab's window is literally a line of hope, the sign that her household will be spared." },
    ],
  },
  {
    book: "joshua",
    chapter: 3,
    title: "Crossing the Jordan on dry ground",
    setting:
      "The crossing happens at harvest time in spring, when the Jordan overflows its banks with snowmelt from Mount Hermon (v. 15). A swollen river was a natural barrier for an army. The ark of the covenant, the gold covered chest that marked God's throne among His people, goes first, carried by priests, with the people about a thousand yards behind. The God who parted the sea for Moses now leads the next generation through the river.",
    words: [
      { v: 13, s: 5067, note: "Ned, \"heap\": A heap or wall of water. The same rare word describes the sea standing up at the Exodus (Exodus 15:8), tying this crossing deliberately to that one." },
    ],
  },
  {
    book: "joshua",
    chapter: 4,
    title: "Twelve stones from the river",
    setting:
      "Israel had no printed Bibles and few written records most people could read. Memory was carried by objects, places, festivals and stories told at home. Stones taken from the riverbed and set up at Gilgal, Israel's first camp in the land, turn a miracle into a landmark. Parents are expected to explain it when children ask. Gilgal would become an important worship and gathering site in the years ahead.",
    words: [
      { v: 7, s: 2146, note: "Zikhron, \"memorial\": Something that makes you remember. In Scripture, remembering is not nostalgia but keeping God's past acts alive so they shape present trust and obedience." },
    ],
  },
  {
    book: "joshua",
    chapter: 5,
    title: "Circumcision, Passover and the Commander",
    setting:
      "Israel is now inside Canaan, camped at Gilgal within sight of Jericho. The generation born in the wilderness had never been circumcised, the sign of God's covenant with Abraham (Genesis 17). Before any battle, the men receive the covenant sign, the nation keeps Passover, and the manna that fed them for forty years stops. Then Joshua meets a mysterious armed figure who reveals that the real question is whose side Joshua is on.",
    words: [
      { v: 9, s: 1556, note: "Galal, \"roll away\": The verb sounds like the place name Gilgal. God has rolled away \"the reproach of Egypt\", the shame of a slave people who had wandered and not yet entered their promise." },
    ],
  },
  {
    book: "joshua",
    chapter: 6,
    title: "The walls of Jericho fall",
    setting:
      "Jericho is one of the oldest cities on earth, an oasis town by a strong spring near the Jordan. Its fall opens the way into the land. The strange procession of priests, rams' horns and the ark for seven days makes it a worship event as much as a battle. The city is put under herem, wholly given over to God, a practice of ancient warfare that this chapter applies to Jericho by God's specific command.",
    words: [
      { v: 17, s: 2764, note: "Cherem, \"devoted thing\": Something wholly handed over to God, either for His treasury or for destruction, and never to be taken for private use. It explains why Achan's theft in chapter 7 is so serious." },
    ],
  },
  {
    book: "joshua",
    chapter: 7,
    title: "Achan's sin and the defeat at Ai",
    setting:
      "After the triumph at Jericho, Israel loses to a small town called Ai, whose name means \"the ruin\". Ancient Israel thought of itself as one covenant body before God, so one man's hidden theft of devoted things affected the whole camp. The lot, a way of casting stones or marked objects to seek God's decision, narrows the guilt from tribe to clan to family to one man. The chapter is sober and hard to read.",
    words: [
      { v: 1, s: 4604, note: "Maal, \"unfaithfulness\": A breach of trust, used for betraying a covenant or a marriage. Achan's theft is treated not as petty stealing but as treachery against God Himself." },
    ],
  },
  {
    book: "joshua",
    chapter: 8,
    title: "Ai taken and the law read at Ebal",
    setting:
      "Ai falls through an ambush, and this time Israel may keep the plunder. Then the whole nation travels about twenty miles north to Shechem, between Mount Ebal and Mount Gerizim, as Moses had ordered (Deuteronomy 27). There Joshua builds an altar, writes the law on stones and reads its blessings and curses aloud. In the middle of a military campaign, Israel stops to renew its covenant with God.",
    words: [
      { v: 33, s: 1616, note: "Ger, \"foreigner\": A resident outsider living among Israel. Foreigners stand with the native born to hear the law, a reminder that God's covenant was never only for one bloodline." },
    ],
  },
  {
    book: "joshua",
    chapter: 9,
    title: "The Gibeonite deception",
    setting:
      "Gibeon was a league of four towns a few miles north of Jerusalem, larger than Ai. Knowing what happened to Jericho, its leaders pretend to have come from far away, since Moses' law allowed peace treaties with distant cities but not with the nearby Canaanite ones (Deuteronomy 20:10 to 18). An oath sworn in God's name was binding even when gained by trickery, and Israel keeps it.",
    words: [
      { v: 14, s: 7592, note: "Shaal, \"ask, seek\": Israel's leaders checked the moldy bread but did not ask the LORD. The failure is not a lack of evidence but a lack of prayer." },
    ],
  },
  {
    book: "joshua",
    chapter: 10,
    title: "The day the sun stood still",
    setting:
      "Five Amorite kings led by Adoni-zedek of Jerusalem attack Gibeon for making peace with Israel. Joshua marches all night from Gilgal and routs them in the pass of Beth-horon, a key route from the hill country down to the coastal plain. Ancient peoples prized the sun and moon as gods; here they obey Israel's God. The chapter quotes the Book of Jashar, a lost collection of Israel's war poetry.",
    words: [
      { v: 12, s: 1826, note: "Damam, \"be still\": Literally \"be silent\" or \"stop\". Christians differ on what happened in the sky; the text's point is that the LORD heard a man and fought for Israel (v. 14)." },
    ],
  },
  {
    book: "joshua",
    chapter: 11,
    title: "The northern kings defeated",
    setting:
      "The northern Canaanite cities, led by Jabin king of Hazor, gather a huge army with horses and chariots near the waters of Merom, north of the Sea of Galilee. Hazor was the largest city in Canaan, perhaps the leading power of the north. Chariots were the tanks of the ancient world, and Israel had none. The chapter compresses what verse 18 says was a long war into one summary of victory.",
    words: [
      { v: 6, s: 6131, note: "Aqar, \"hamstring\": To cut a horse's leg tendon so it cannot be used in battle. Israel was not to trust in war horses and chariots but in the LORD (Deuteronomy 17:16; Psalm 20:7)." },
    ],
  },
  {
    book: "joshua",
    chapter: 12,
    title: "The list of defeated kings",
    setting:
      "Ancient kings recorded their victories in lists carved on walls and stone, and this chapter reads like one. It names two kings Moses defeated east of the Jordan and thirty one kings Joshua defeated west of it. Many of these \"kings\" ruled a single walled town and its fields. For Israel the list was a record of God's faithfulness, each name a place where His promise had been kept.",
    words: [
      { v: 6, s: 3425, note: "Yerushshah, \"possession\": Something taken as an inheritance. The land is not simply captured; it is received from God, who had promised it to Abraham centuries earlier." },
    ],
  },
  {
    book: "joshua",
    chapter: 13,
    title: "Land still to be taken",
    setting:
      "Joshua is now old, and much territory remains outside Israel's control, especially the Philistine coast and the north. Even so, God tells him to divide the whole land among the tribes, counting on God to finish what He started. This chapter records the land Moses gave east of the Jordan to Reuben, Gad and half of Manasseh. The tribe of Levi receives no land at all, because their inheritance is the LORD.",
    words: [
      { v: 1, s: 7604, note: "Shaar, \"remain\": Much land \"remains\". The book is honest that the conquest was incomplete, which prepares the reader for the struggles of Judges." },
    ],
  },
  {
    book: "joshua",
    chapter: 14,
    title: "Caleb asks for his mountain",
    setting:
      "The division of land west of the Jordan begins at Gilgal, with the high priest Eleazar, Joshua and the tribal heads overseeing it. Before the lots are cast, Caleb steps forward. Forty five years earlier he was one of twelve spies, and with Joshua he alone urged Israel to trust God (Numbers 13 to 14). Moses promised him the land he had walked on. Now aged eighty five, he asks for Hebron, the hill country of the giants.",
    words: [
      { v: 8, s: 4390, note: "Male, \"fill, be loyal\": Literally \"I filled up after the LORD\". Caleb's loyalty was full, not partial; he followed God with his whole heart." },
    ],
  },
  {
    book: "joshua",
    chapter: 15,
    title: "Judah's inheritance",
    setting:
      "Judah receives the largest and southernmost territory, from the Dead Sea to the Mediterranean and down to the Negev desert. For ancient Israel, boundary lists like this functioned like a property deed. They told each tribe, clan and family where their ground was, and God's law protected those boundaries from being swallowed up (Deuteronomy 19:14). Jerusalem sits right on Judah's northern border, but its Jebusites are not driven out.",
    words: [
      { v: 1, s: 1486, note: "Goral, \"lot\": A marked stone or token cast to reach a decision. By using the lot, Israel let God, not the strongest tribe, decide who received what (Proverbs 16:33)." },
    ],
  },
  {
    book: "joshua",
    chapter: 16,
    title: "The inheritance of Ephraim",
    setting:
      "Joseph's two sons, Ephraim and Manasseh, each became a tribe, so Joseph's family receives a double share, just as Jacob blessed them (Genesis 48). Ephraim's land lies in the fertile central hill country, which later became the heart of the northern kingdom. The borders are traced by towns and landmarks a local reader would have known. The chapter ends with a quiet warning about Canaanites who were not driven out.",
    words: [
      { v: 10, s: 4522, note: "Mas, \"forced labor\": Ephraim chose to put the Canaanites of Gezer to work rather than drive them out. Profit won out over obedience, and the compromise would cost Israel later." },
    ],
  },
  {
    book: "joshua",
    chapter: 17,
    title: "Manasseh and the daughters of Zelophehad",
    setting:
      "Half of Manasseh already had land east of the Jordan; this chapter gives the other half its share in the north central hills. Zelophehad died with no sons, and in a world where land passed through men, his family line could have vanished. His five daughters had won their case before Moses (Numbers 27). Now they claim their land in person. The chapter also shows a tribe complaining that its share is too small.",
    words: [
      { v: 15, s: 1254, note: "Bara, \"clear\": The verb used for God creating in Genesis 1 here means to cut down or clear a forest. Joshua tells Joseph's tribes to make room by hard work." },
    ],
  },
  {
    book: "joshua",
    chapter: 18,
    title: "The tabernacle at Shiloh and the survey",
    setting:
      "The whole community gathers at Shiloh, in the hill country of Ephraim, and sets up the tabernacle, God's portable tent of meeting. Shiloh would remain Israel's worship center for generations, until the days of Eli and Samuel. Seven tribes have still not received their land. Joshua sends men to walk the country and write a description of it in seven parts, then casts lots before the LORD.",
    words: [
      { v: 3, s: 7503, note: "Raphah, \"put off\": To sink, slacken or let your hands drop. Israel's problem is not the enemy but delay; they are slow to take hold of a gift already given." },
    ],
  },
  {
    book: "joshua",
    chapter: 19,
    title: "The last six tribes and Joshua's town",
    setting:
      "This chapter finishes the land division with Simeon, Zebulun, Issachar, Asher, Naphtali and Dan, most of them in the north around Galilee. Simeon receives towns inside Judah's territory, which fits Jacob's words that Simeon would be scattered in Israel (Genesis 49:7). Dan cannot hold its land and later moves far north. Only after every tribe has its share does Joshua, the leader, receive his own small town.",
    words: [
      { v: 9, s: 5159, note: "Nachalah, \"inheritance\": Property passed down within a family, not simply bought or sold. Israel's land was a family trust from God, held for future generations." },
    ],
  },
  {
    book: "joshua",
    chapter: 20,
    title: "Cities of refuge",
    setting:
      "In ancient Israel there was no police force. When someone was killed, a close relative, the \"avenger of blood\", was expected to pursue justice. That could easily turn into feuds. God appointed six cities, three on each side of the Jordan, where a person who killed someone by accident could flee and receive a fair hearing before the town elders, safe from revenge until the case was decided.",
    words: [
      { v: 3, s: 4733, note: "Miqlat, \"refuge\": A place of asylum or intake. It comes from a root meaning to take in or receive. The city of refuge took in the guilty but not the deliberate murderer." },
    ],
  },
  {
    book: "joshua",
    chapter: 21,
    title: "Towns for the Levites",
    setting:
      "The tribe of Levi served at the tabernacle and taught God's law, so it received no territory of its own. Instead, the other tribes gave the Levites forty eight towns with pasturelands, spread throughout Israel (Numbers 35). This placed teachers of God's word in every region. The chapter closes the land division with a summary that every promise God made to Israel's fathers had been kept.",
    words: [
      { v: 45, s: 5307, note: "Naphal, \"fail\": Literally \"fall\". Not one of God's good words fell to the ground unfulfilled, an image of a promise that lands rather than dropping in the dust." },
    ],
  },
  {
    book: "joshua",
    chapter: 22,
    title: "The altar of witness by the Jordan",
    setting:
      "The fighting men of Reuben, Gad and half of Manasseh had kept their promise to help conquer Canaan before returning east of the Jordan. On the way home they build a large altar by the river. The western tribes fear it is a rival place of sacrifice, which Moses' law forbade (Deuteronomy 12), and prepare for civil war. Phinehas the priest leads a delegation to investigate first.",
    words: [
      { v: 34, s: 5707, note: "Ed, \"witness\": The eastern tribes name the altar Witness. It was not for sacrifice but a copy pointing to the true altar, so later generations would not cut them off from Israel's God." },
    ],
  },
  {
    book: "joshua",
    chapter: 23,
    title: "Joshua's farewell to the leaders",
    setting:
      "Years have passed and Joshua is very old. Like Moses before him (Deuteronomy 31 to 33), he gathers Israel's leaders for a farewell speech. Canaanite peoples still live among the tribes, along with their gods. The danger is no longer military defeat but slow assimilation through marriage alliances and worship. Joshua reminds them what God has done and warns them clearly about where compromise leads.",
    words: [
      { v: 8, s: 1692, note: "Davaq, \"hold fast\": To cling or stick, the same word used of a husband holding fast to his wife (Genesis 2:24). Joshua calls Israel to a close, faithful attachment to God." },
    ],
  },
  {
    book: "joshua",
    chapter: 24,
    title: "Choose this day whom you will serve",
    setting:
      "Joshua gathers all Israel at Shechem, where God first promised the land to Abraham (Genesis 12:6 to 7) and where Jacob buried his household idols (Genesis 35:4). The chapter follows the pattern of ancient treaties: the great king's name, his past kindness, his demands, witnesses, and a written record. Israel recommits itself to the LORD, and the book ends with three burials in the promised land.",
    words: [
      { v: 15, s: 977, note: "Bachar, \"choose\": God chose Israel first; now Israel must choose Him in return. Faith is not inherited automatically; each generation must decide whom it will serve." },
    ],
  },
  {
    book: "judges",
    chapter: 1,
    title: "Unfinished conquest after Joshua",
    setting:
      "Joshua has died, and Israel has no single leader. Each tribe must now take the land allotted to it, facing Canaanite city-states that held the fertile plains with chariots and walled towns. Judah starts strong, but the chapter turns into a list of what tribe after tribe left undone. Rather than drive the Canaanites out, many settle beside them or put them to forced labor, a compromise that shapes the rest of the book.",
    words: [
      { v: 19, s: 1270, note: "Barzel, \"iron\": Iron chariot fittings were advanced military technology. The verse sets \"The LORD was with Judah\" beside \"chariots of iron,\" leaving the reader to ask which one really decided the outcome." },
      { v: 28, s: 4522, note: "Mas, \"forced labor\": Israel grew strong enough to conquer but chose to profit instead. Putting Canaanites to work kept their gods in the land too." },
    ],
  },
  {
    book: "judges",
    chapter: 3,
    title: "Othniel, Ehud and Shamgar",
    setting:
      "The cycle from chapter 2 now plays out. First comes an invader called Cushan-rishathaim, probably from northern Mesopotamia. Then Eglon king of Moab, east of the Dead Sea, allies with Ammon and Amalek and occupies the City of Palms, likely the Jericho area. Subject peoples carried yearly tribute to their overlord in person, often at a formal audience. That ritual gives Ehud his chance to get close to the king.",
    words: [
      { v: 15, s: 334, note: "Itter, \"left-handed\": Literally \"restricted in his right hand.\" Ironically Ehud is from Benjamin, \"son of the right hand.\" A sword strapped to the right thigh would likely be missed by guards checking the usual side." },
      { v: 31, s: 4451, note: "Malmad, \"oxgoad\": A long pointed stick for driving oxen. Shamgar had a farm tool, not a soldier's weapon, and God still used him." },
    ],
  },
  {
    book: "judges",
    chapter: 4,
    title: "Deborah, Barak and Jael",
    setting:
      "In the north, Jabin king of Canaan rules from Hazor, the largest city in the region, and his commander Sisera has 900 iron chariots. For twenty years Israel is cruelly oppressed. Deborah, a prophetess, hears disputes under a palm tree in the hill country of Ephraim. She summons Barak from Naphtali to gather troops on Mount Tabor. The Kenites, a clan related to Moses' in-laws, were at peace with Jabin, which sets up the ending.",
    words: [
      { v: 4, s: 5031, note: "Neviah, \"prophetess\": Deborah is both prophet and judge, speaking God's word and settling cases. Israel's other prophetesses include Miriam and Huldah." },
      { v: 9, s: 8597, note: "Tipharah, \"honor\": Barak will go only if Deborah goes, so the glory of the victory will go to a woman. The reader soon learns it is not Deborah but Jael." },
    ],
  },
  {
    book: "judges",
    chapter: 5,
    title: "The Song of Deborah",
    setting:
      "This victory song is widely thought to be one of the oldest poems in the Hebrew Bible, its language older than the prose around it. Israel celebrated victories with songs, often led by women, as Miriam did at the Red Sea. The song retells chapter 4 as a poet would: God marching from Seir like a storm, a flooding river, tribes praised for coming and shamed for staying home, and Sisera's mother waiting at a window.",
    words: [
      { v: 7, s: 517, note: "Em, \"mother\": Deborah calls herself \"a mother in Israel.\" She leads not by seizing power but as one who rallies and protects a scattered family." },
      { v: 11, s: 6666, note: "Tsedaqah, \"righteous acts\": At the watering places people retell the LORD's saving acts of justice. The victory is recited as God's faithfulness, not Israel's skill." },
    ],
  },
  {
    book: "judges",
    chapter: 6,
    title: "Gideon called in a winepress",
    setting:
      "For seven years Midianites, Amalekites and other eastern peoples sweep in at harvest time on camels, which gave raiders speed and range. They strip the fields and livestock, and Israel hides in caves. Gideon threshes wheat inside a winepress, a pit out of sight, instead of on an open hilltop where the wind carries off the chaff. His own family's town keeps an altar to Baal and an Asherah pole.",
    words: [
      { v: 12, s: 1368, note: "Gibbor, \"mighty man\": The angel greets a frightened man hiding his grain as a \"mighty man of valor.\" God names him by what He will make of him." },
      { v: 32, s: 3378, note: "Yerubbaal, \"Jerubbaal\": It means \"Let Baal contend.\" Gideon's nickname turns the town's anger into a challenge: if Baal is a god, let him defend himself." },
    ],
  },
  {
    book: "judges",
    chapter: 7,
    title: "Three hundred men and empty jars",
    setting:
      "The Midianite army camps in the Valley of Jezreel, Israel's broad northern plain, near the hill of Moreh. Gideon's army gathers at the spring of Harod, a name that sounds like the Hebrew word for trembling. Night was divided into watches, and attacking at the start of the middle watch meant fresh sentries had just been posted. Clay jars hid the torches until they were smashed, so a small force could seem enormous.",
    words: [
      { v: 3, s: 2730, note: "Chared, \"trembling\": The fearful are sent home first, as the law allowed (Deuteronomy 20:8). 22,000 leave, more than two thirds of the army." },
      { v: 2, s: 6286, note: "Paar, \"boast\": God trims the army so Israel cannot glorify itself against Him. The smaller force protects them from pride." },
    ],
  },
  {
    book: "judges",
    chapter: 8,
    title: "Gideon's pursuit and his ephod",
    setting:
      "Gideon chases the Midianite kings east across the Jordan. Ephraim, a proud and powerful tribe, is offended at being left out, and the towns of Succoth and Penuel refuse his exhausted men bread, unwilling to back him before he has won. Israel then offers Gideon a hereditary throne. He refuses with pious words, yet takes gold, makes an ephod, marries many wives and names a son Abimelech, \"my father is king.\"",
    words: [
      { v: 23, s: 4910, note: "Mashal, \"rule\": Gideon's answer is right: the LORD is Israel's ruler. The rest of his life does not quite match his words." },
      { v: 27, s: 4170, note: "Moqesh, \"snare\": A trap used for birds. The ephod, perhaps meant as a memorial or a way to seek God, became an object of worship that caught Gideon's whole family." },
    ],
  },
  {
    book: "judges",
    chapter: 9,
    title: "Abimelech's bloody kingship",
    setting:
      "Abimelech, Gideon's son by a concubine from Shechem, appeals to his mother's clan. Shechem was an old Canaanite city with a temple to Baal-berith, \"lord of the covenant,\" and a mixed population. Funded from that temple, he hires reckless men and murders his seventy half brothers on one stone. Only Jotham escapes. From Mount Gerizim above the city he tells a fable, and the chapter shows his warning coming true.",
    words: [
      { v: 15, s: 329, note: "Atad, \"thornbush\": The bramble offers shade it cannot give and threatens fire. A worthless ruler who promises protection only consumes those who trust him." },
      { v: 56, s: 7725, note: "Shuv, \"repaid\": Literally \"returned.\" The evil Abimelech did comes back on his own head, and the narrator credits God with it." },
    ],
  },
  {
    book: "judges",
    chapter: 10,
    title: "Minor judges and a stubborn people",
    setting:
      "Tola and Jair each judge Israel for about two decades, brief notes that suggest quieter years. Then Israel serves seven sets of gods at once, from Baal and Ashtoreth to the gods of Moab, Ammon and Philistia. Ammon presses Gilead, east of the Jordan, for eighteen years and crosses the river to raid Judah, Benjamin and Ephraim. This time God answers their cry with a rebuke before He relents.",
    words: [
      { v: 16, s: 7114, note: "Qatsar, \"could not bear\": Literally \"His soul grew short.\" God's patience runs out not with Israel but with Israel's misery. Their suffering moves Him." },
      { v: 14, s: 2199, note: "Zaaq, \"cry out\": God throws Israel's cry back at them: cry to the gods you chose. It exposes prayer used only as an emergency exit." },
    ],
  },
  {
    book: "judges",
    chapter: 11,
    title: "Jephthah and his vow",
    setting:
      "Jephthah is the son of a prostitute, driven out by his half brothers so he cannot inherit. In the land of Tob he leads a band of outcasts, something like a raider chief. When Ammon attacks, the elders of Gilead who rejected him come begging. Before fighting he sends Ammon a careful argument from history about who owns the land. Then he makes a rash vow, and the cost falls on his only child, a daughter.",
    words: [
      { v: 30, s: 5088, note: "Neder, \"vow\": A vow was a binding promise to God, often made in a crisis. The law allowed costly vows but never required one like this, and it forbade human sacrifice (Deuteronomy 12:31)." },
      { v: 3, s: 7386, note: "Req, \"worthless men\": Literally \"empty men,\" people with nothing to lose. The outcast becomes a leader of outcasts." },
    ],
  },
  {
    book: "judges",
    chapter: 12,
    title: "Shibboleth and a civil war",
    setting:
      "Ephraim, the leading tribe of the central hills, again complains of being left out of a victory, this time with threats. Gilead, east of the Jordan, answers with war. The Jordan fords were the only crossings, so whoever held them controlled who went home. Tribes had regional accents, and the Gileadites used one to catch fleeing Ephraimites. The chapter closes with short notes on three judges: Ibzan, Elon and Abdon.",
    words: [
      { v: 6, s: 7641, note: "Shibbol, \"Shibboleth\": The word means an ear of grain or a flowing stream. Ephraimites said \"Sibboleth,\" and one sound decided who lived." },
    ],
  },
  {
    book: "judges",
    chapter: 13,
    title: "Samson's birth announced",
    setting:
      "The Philistines, a seafaring people who probably settled the southern coast around 1200 BC, ruled from five cities and seem to have controlled ironworking (1 Samuel 13:19). Now they dominate Israel, and no one even cries out. In the small Danite town of Zorah, the angel of the LORD appears to Manoah's wife, who is barren, and announces a son set apart from birth. Like Isaac, Samuel and John the Baptist, he comes as God's gift.",
    words: [
      { v: 5, s: 5139, note: "Nazir, \"Nazirite\": One \"separated\" to God: no wine, no haircut, no contact with the dead (Numbers 6). Usually a vow for a season; Samson's was for life." },
      { v: 18, s: 6383, note: "Pili, \"wonderful\": The angel's name is beyond understanding. A related word describes the promised child in Isaiah 9:6, \"Wonderful Counselor.\"" },
    ],
  },
  {
    book: "judges",
    chapter: 14,
    title: "Samson's wedding and riddle",
    setting:
      "Samson wants a Philistine woman from Timnah, a town in the borderland between the hill country and the coastal plain. Marriages were normally arranged by parents, so his demand breaks custom, and they object to a wife from the uncircumcised Philistines. The wedding feast lasted seven days, with thirty local companions. Riddle contests with wagers were party entertainment, but this one turns into extortion, threats and killing.",
    words: [
      { v: 12, s: 2420, note: "Chidah, \"riddle\": A puzzle or hidden saying. Samson's riddle depends on a secret only he knows, honey taken from a carcass, which made a person unclean (Leviticus 11:39)." },
      { v: 4, s: 8385, note: "Taanah, \"occasion\": God was looking for an opening against Philistine rule. Samson's selfish choices do not escape God's purposes, but they are not excused by them." },
    ],
  },
  {
    book: "judges",
    chapter: 15,
    title: "Foxes, fire and a jawbone",
    setting:
      "Samson returns at wheat harvest, in the dry early summer, to find his wife given to another man. He sets fire to the standing grain, vineyards and olive groves, the Philistines' food for a year. Revenge answers revenge, until his wife and her father are burned too. The men of Judah, who have accepted Philistine rule, hand Samson over bound. At Lehi he kills a thousand men with a fresh donkey's jawbone.",
    words: [
      { v: 15, s: 3895, note: "Lechi, \"jawbone\": The same word names the place, Lehi. A fresh bone was heavy and strong enough to strike with; a dried one would shatter." },
      { v: 19, s: 5875, note: "En-hakkore, \"spring of the caller\": Samson names the spring for his prayer. The strongman's first recorded prayer is a cry of thirst." },
    ],
  },
  {
    book: "judges",
    chapter: 16,
    title: "Delilah and the temple of Dagon",
    setting:
      "Samson goes to Gaza, the southernmost Philistine city, then falls for Delilah in the Valley of Sorek. Each of the five Philistine rulers offers her 1,100 pieces of silver, a huge sum. Dagon, a god widely worshiped in the region and probably linked with grain, gets the credit for Samson's capture. Philistine temples excavated by archaeologists had roofs held up by pillars set close together, which fits the final scene.",
    words: [
      { v: 20, s: 5493, note: "Sur, \"departed\": The LORD had turned away from him, and Samson did not even know it. The hair was the sign; the LORD was the strength." },
      { v: 28, s: 2142, note: "Zakhar, \"remember\": Blinded and mocked, Samson finally asks God to remember him. Hebrews 11:32 still counts him among those who acted in faith." },
    ],
  },
  {
    book: "judges",
    chapter: 17,
    title: "Micah's homemade shrine",
    setting:
      "Chapters 17 to 21 leave the judges behind and show what everyday life in Israel had become. In the hill country of Ephraim, a man named Micah steals and returns his mother's silver, and she has part of it made into an idol for the LORD. Household shrines with images were common in Canaanite homes. Micah adds an ephod, ordains his own son, then hires a wandering Levite, as if worship could be bought and owned.",
    words: [
      { v: 6, s: 3477, note: "Yashar, \"right\": The book's verdict in a phrase: everyone did what was right in his own eyes. God's law had said the opposite (Deuteronomy 12:8)." },
      { v: 5, s: 8655, note: "Teraphim, \"household idols\": Small figurines of family gods. Their place in an Israelite shrine shows how far worship had blended with the culture around it." },
    ],
  },
  {
    book: "judges",
    chapter: 18,
    title: "Dan takes Micah's priest and Laish",
    setting:
      "The tribe of Dan had never secured its allotted land near the coast, hemmed in by the Amorites (1:34). Its men scout for easier territory and find Laish in the far north, a quiet town near the springs of the Jordan, far from any ally. On the way they take Micah's idols and his Levite, offering him a bigger congregation. They destroy Laish, rename it Dan, and set up a rival shrine that lasted for generations.",
    words: [
      { v: 7, s: 982, note: "Batach, \"secure\": The word usually means trusting. Laish trusted its isolation; Dan trusted stolen gods. Both kinds of security fail." },
    ],
  },
  {
    book: "judges",
    chapter: 19,
    title: "The Levite's concubine at Gibeah",
    setting:
      "A Levite from Ephraim travels to Bethlehem to bring back his concubine, a secondary wife who had left him. Hospitality to travelers was a sacred duty, and strangers waited in the town square for an invitation. He passes Jebus, still a foreign city, and stops at Gibeah of Benjamin, expecting safety among Israelites. What follows deliberately echoes Sodom (Genesis 19), showing that Israel has become like Canaan.",
    words: [
      { v: 1, s: 6370, note: "Pilegesh, \"concubine\": A wife of lower status, often without a dowry, whose children might not inherit. Her lack of standing makes her the most exposed person in the story." },
      { v: 23, s: 5039, note: "Nevalah, \"outrage\": A deep moral folly that tears the fabric of the community. The old host names the evil, then offers to hand over women anyway." },
    ],
  },
  {
    book: "judges",
    chapter: 20,
    title: "Israel's war against Benjamin",
    setting:
      "For the only time in Judges, all Israel gathers as one, at Mizpah, 400,000 strong. In a tribal society each tribe was expected to deal with its own members, so Benjamin's refusal to hand over the men of Gibeah turns a crime into civil war. Israel inquires of God at Bethel, where the ark then was, served by Aaron's grandson Phinehas, which suggests these events took place early in the period of the judges.",
    words: [
      { v: 13, s: 1197, note: "Baar, \"purge\": Literally \"burn away.\" It is Deuteronomy's word for removing evil from Israel (Deuteronomy 13:5). Israel quotes the right law, yet nearly wipes out a whole tribe." },
      { v: 23, s: 1058, note: "Bakhah, \"wept\": Israel weeps before the LORD after defeat, and will weep again after victory. Winning against a brother brings no joy." },
    ],
  },
  {
    book: "judges",
    chapter: 21,
    title: "Wives for Benjamin",
    setting:
      "Only 600 Benjamite men survive the war, and Israel has sworn at Mizpah not to give them daughters in marriage. Grieving that a tribe might disappear, the leaders look for loopholes. They destroy Jabesh-gilead, which skipped the assembly, sparing 400 young women. Then they tell the remaining Benjamites to seize girls dancing at a yearly festival at Shiloh. The book ends with its verdict on the whole era.",
    words: [
      { v: 1, s: 7650, note: "Shava, \"swore\": Israel's oath at Mizpah, like Jephthah's vow, creates a crisis. The leaders keep the letter of their oath while others pay for it." },
      { v: 15, s: 6556, note: "Perets, \"breach\": A gap broken in a wall. Israel sees the hole in its tribes but tries to repair one wrong with others." },
    ],
  },
];
