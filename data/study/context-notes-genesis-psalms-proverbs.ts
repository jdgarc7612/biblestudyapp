/**
 * Setting cards (see context-notes.ts for the guardrails), drafted by Claude for Josh's review, Nov 2026.
 * Every Strong's number is checked against the bundled interlinear (tests/context-notes.test.ts).
 */

import type { ContextNote } from "./context-notes";

export const CONTEXT_NOTES_GENESIS_PSALMS_PROVERBS: ContextNote[] = [
  {
    book: "genesis",
    chapter: 2,
    title: "The garden, the first man and the first marriage",
    setting:
      "Genesis 2 zooms in from the cosmos to a garden. God is now called \"the LORD God\", pairing His personal covenant name (Yahweh, later revealed to Moses) with His title as Creator. Eden is pictured like a sanctuary: a river flows out of it, gold and precious stones are there, and God walks in it. Israel would recognize those details in the tabernacle and temple. Here God sets the pattern for work, rest and marriage.",
    words: [
      { v: 15, s: 5647, note: "Avad, \"serve\" or \"work\". Paired with shamar (\"keep, guard\"), it is the language later used for priests serving in the tabernacle (Numbers 3:7 to 8). Adam's gardening is a kind of worship." },
      { v: 18, s: 5828, note: "Ezer, \"helper\". Not a word for a junior assistant: it is most often used of God Himself as Israel's help (Psalm 121:1 to 2). The woman is a strong ally who corresponds to the man." },
    ],
  },
  {
    book: "genesis",
    chapter: 4,
    title: "Cain and Abel: sin crouching at the door",
    setting:
      "Outside Eden, the first family farms the ground and tends flocks, the two basic livelihoods of the ancient world. Both brothers bring an offering, but God looks with favor on Abel's and not Cain's; Hebrews 11:4 says the difference was faith. In one generation sin has moved from a stolen fruit to murder. The chapter then traces Cain's line, which builds a city and invents music and metalwork, while violence grows.",
    words: [
      { v: 7, s: 7257, note: "Ravats, \"crouch\" or \"lie in wait\". It pictures an animal crouched at a doorway, ready to pounce. Some scholars link it to an Akkadian word for a demon lurking at the threshold. Sin is a predator to be mastered." },
    ],
  },
  {
    book: "genesis",
    chapter: 5,
    title: "From Adam to Noah: the long shadow of death",
    setting:
      "Ancient peoples kept genealogies to show where they came from and who had a right to what. Genesis 5 links Adam to Noah in ten generations with a steady refrain: he lived, he had children, \"and then he died.\" The great ages have puzzled readers; the Sumerian King List gives its kings before the flood far longer reigns, and Christians differ on how to read the numbers. Against that drumbeat of death stands Enoch, who did not die.",
    words: [
      { v: 24, s: 1980, note: "Halakh, \"walk\". \"Enoch walked with God\" uses a form meaning to walk about, to live everyday life in someone's company. Only Enoch and Noah (6:9) are described this way." },
      { v: 29, s: 5162, note: "Nacham, \"comfort\". Lamech names his son Noah (which sounds like \"rest\") hoping he will bring relief from the cursed ground. The hope reaches ahead to a greater rest." },
    ],
  },
  {
    book: "genesis",
    chapter: 6,
    title: "A grieving God and a world full of violence",
    setting:
      "Mesopotamian flood stories such as Atrahasis and Gilgamesh were already old when Genesis was written down. In them the gods send a flood because humans are too noisy, then go hungry when the sacrifices stop. Genesis tells a different story: the one God judges real evil, is grieved in His heart, and personally saves a family. Who the \"sons of God\" and the Nephilim were is debated: fallen angels, Seth's line, or ancient tyrant kings.",
    words: [
      { v: 6, s: 6087, note: "Atsav, \"grieved\" or \"pained\". The same root describes the painful toil and childbearing of 3:16 to 17. Human sin does not leave God unmoved; it wounds Him." },
      { v: 14, s: 8392, note: "Tevah, \"ark\". Used elsewhere only for the basket that carried baby Moses on the Nile (Exodus 2:3). Both times God saves His chosen one in a sealed box on deadly water." },
    ],
  },
  {
    book: "genesis",
    chapter: 7,
    title: "The flood: creation undone",
    setting:
      "The flood is told as creation running backward. In Genesis 1 God separated the waters above from the waters below; now the \"fountains of the great deep\" burst and the \"floodgates of the heavens\" open. Exact dates frame the story like a ship's log. Christians differ on whether the flood covered the whole globe or the whole known world of the time, but agree on its point: God judges sin and saves by His own provision.",
    words: [
      { v: 11, s: 8415, note: "Tehom, \"the deep\". The same word names the dark waters of 1:2 before God brought order. The flood is a return to the world before creation." },
      { v: 16, s: 5462, note: "Sagar, \"shut\". \"The LORD shut him in.\" Noah does not close the door of his own rescue. God does." },
    ],
  },
  {
    book: "genesis",
    chapter: 8,
    title: "God remembers Noah",
    setting:
      "The turning point of the flood comes in one line: \"God remembered Noah.\" A wind blows over the waters, as the Spirit hovered over the waters in Genesis 1, and dry land appears again, a new creation. The ark rests in the mountains of Ararat, the ancient kingdom of Urartu in today's eastern Turkey and Armenia. Noah's first act on dry ground is worship, and God answers with a promise to keep the seasons turning as long as the earth endures.",
    words: [
      { v: 1, s: 2142, note: "Zakhar, \"remember\". In Hebrew this is not recalling something forgotten. It means acting for someone you are committed to, as God \"remembered\" His covenant with Israel in Egypt (Exodus 2:24)." },
      { v: 21, s: 5207, note: "Nichoach, \"soothing\" or \"pleasing\" aroma. It became the standard phrase for sacrifices God accepts (Leviticus 1:9), and Paul uses it of Christ's self giving (Ephesians 5:2)." },
    ],
  },
  {
    book: "genesis",
    chapter: 9,
    title: "The covenant with Noah and the rainbow",
    setting:
      "After the flood God repeats the creation blessing (\"be fruitful and multiply\") to a fresh start for humanity, now allowing meat but not blood, and requiring a life for a life because people bear God's image. Then He spells out the covenant promised in 6:18, binding Himself to every living creature. The chapter closes on a sober note: Noah's drunkenness, and a curse on Canaan that was later shamefully misused to defend slavery.",
    words: [
      { v: 13, s: 7198, note: "Qeshet, \"bow\". The ordinary word for a war bow. Many readers see God hanging up His weapon in the sky, pointed away from the earth, as a sign that this kind of judgment is over." },
    ],
  },
  {
    book: "genesis",
    chapter: 10,
    title: "The Table of Nations",
    setting:
      "Genesis 10 maps the known world of the ancient Near East through Noah's sons: Japheth's line mostly to the north and west (Anatolia and the Aegean), Ham's to the south (Egypt, Cush, Canaan), and Shem's to the east (Arabia and Mesopotamia). It lists about seventy peoples. Ancient readers would have known many of the names as nations, cities and regions. The point: every nation, even Israel's enemies, comes from one family under one God.",
    words: [
      { v: 5, s: 1471, note: "Goy, \"nation\". Later the usual word for the Gentile nations. Genesis counts them before Israel even exists, because God's promise to Abram will reach \"all the families of the earth\" (12:3)." },
      { v: 9, s: 1368, note: "Gibbor, \"mighty one\". Nimrod is a \"mighty hunter\" and empire builder who founds Babel and Nineveh. It is the same word used for the \"mighty men\" of 6:4." },
    ],
  },
  {
    book: "genesis",
    chapter: 11,
    title: "The tower of Babel",
    setting:
      "Babel stands on the plain of Shinar in southern Mesopotamia, where stone was scarce and builders used baked brick and tar. Mesopotamian cities were crowned with ziggurats, stepped temple towers thought to link earth and heaven. The builders want to \"make a name\" for themselves and avoid being scattered, resisting God's call to fill the earth. God scatters them, and the chapter ends by tracing Shem's line to Abram and his barren wife Sarai.",
    words: [
      { v: 9, s: 1101, note: "Balal, \"confuse\" or \"mix\". A wordplay: in Babylonian the city's name meant \"gate of god\", but Genesis hears in it balal, \"confusion\"." },
      { v: 4, s: 8034, note: "Shem, \"name\". The builders try to make a name for themselves. In the next chapter God promises Abram, \"I will make your name great\" (12:2)." },
    ],
  },
  {
    book: "genesis",
    chapter: 13,
    title: "Abram and Lot part ways",
    setting:
      "Back from Egypt, Abram and his nephew Lot are both rich in flocks and herds, the main wealth of seminomadic herders. In the dry hill country of Canaan, pasture and water were limited, and quarrels between herdsmen were common. Abram, the elder, gives Lot first choice. Lot picks the well watered Jordan plain near Sodom. Abram stays in the hills, and God renews the promise: all the land he can see, and offspring like the dust of the earth.",
    words: [
      { v: 10, s: 3603, note: "Kikkar, \"plain\", literally a \"circle\" or round area. It names the region around the Jordan, which looked like Eden and Egypt to Lot, though its cities were already wicked (v. 13)." },
      { v: 8, s: 251, note: "Ach, \"brother\". Lot was Abram's nephew, but Hebrew calls close kin \"brothers\". Abram's appeal puts family peace above profit." },
    ],
  },
  {
    book: "genesis",
    chapter: 14,
    title: "Abram rescues Lot and meets Melchizedek",
    setting:
      "Four kings from the east, including Elam and Shinar in Mesopotamia, invade the Jordan valley to crush five rebel city states. The kings have not been firmly identified outside the Bible, but such raiding alliances fit the era. Abram, with 318 trained men, routs them and rescues Lot. Then a mysterious figure appears: Melchizedek, king of Salem (probably Jerusalem) and priest of God Most High. Psalm 110 and Hebrews 7 see in him a picture of Christ.",
    words: [
      { v: 18, s: 4442, note: "Malki-tsedeq, \"my king is righteousness\". Salem means \"peace\". Hebrews 7:2 draws out both: he is king of righteousness and king of peace." },
      { v: 19, s: 5945, note: "Elyon, \"Most High\". A title for the supreme God. Abram identifies God Most High with the LORD (v. 22), the one Creator of heaven and earth." },
    ],
  },
  {
    book: "genesis",
    chapter: 15,
    title: "God cuts a covenant with Abram",
    setting:
      "Abram is old and childless, and in that world his heir would be a household servant, Eliezer of Damascus; ancient texts show such arrangements. God promises a son of his own and offspring like the stars. Then God makes a covenant the ancient way: animals are cut in two and the parties walk between the pieces, saying in effect, \"May this happen to me if I break my word\" (Jeremiah 34:18). But only God, as a smoking firepot and flaming torch, passes through.",
    words: [
      { v: 6, s: 539, note: "Aman, \"believe\". It means to lean your weight on something firm; \"amen\" comes from the same root. Paul builds his teaching on justification by faith on this verse (Romans 4:3)." },
      { v: 18, s: 3772, note: "Karat, \"cut\". Hebrew does not \"make\" a covenant; it \"cuts\" one. The ritual in this chapter shows why." },
    ],
  },
  {
    book: "genesis",
    chapter: 16,
    title: "Hagar and the God who sees",
    setting:
      "Ten years after the promise, Sarai is still childless. Ancient law codes and marriage contracts show that a barren wife could give her slave to her husband and count the child as her own. Sarai and Abram follow that custom instead of waiting on God, and the household fractures. Hagar, an Egyptian slave with no say in the matter, is mistreated and flees into the desert. There the angel of the LORD finds her, his first appearance in Scripture.",
    words: [
      { v: 13, s: 7210, note: "Roi, \"seeing\". Hagar names God El Roi, \"the God who sees me.\" The only person in the Old Testament to give God a name is a foreign slave woman." },
      { v: 11, s: 8085, note: "Shama, \"hear\". Ishmael means \"God hears.\" Every time the boy's name was spoken, it reminded Hagar that God had heard her misery." },
    ],
  },
  {
    book: "genesis",
    chapter: 17,
    title: "New names and the sign of circumcision",
    setting:
      "Thirteen years pass in silence after Ishmael's birth. When Abram is 99, God appears as El Shaddai, renames Abram and Sarai, and gives circumcision as the covenant sign for every male in the household. Other peoples, such as Egyptians, practised circumcision, often at puberty or before marriage. In Israel it was done on the eighth day, marking a baby as belonging to God's covenant people before he could do anything at all.",
    words: [
      { v: 1, s: 7706, note: "Shaddai, \"Almighty\". Its origin is debated; some link it to a word for mountain. It is the name by which God made Himself known to the patriarchs (Exodus 6:3)." },
      { v: 5, s: 1995, note: "Hamon, \"multitude\". Abraham sounds like av hamon, \"father of a multitude.\" He received the name while he had one son, and not yet the son of promise." },
    ],
  },
  {
    book: "genesis",
    chapter: 18,
    title: "Visitors at Mamre",
    setting:
      "In the heat of the day, Abraham sees three strangers near his tent at Mamre and runs to serve them. Desert hospitality was a sacred duty: guests were fed lavishly and protected, even at cost to the host. One of the visitors is the LORD Himself. He promises that Sarah will have a son within a year, then reveals His plan for Sodom. Abraham's bold, respectful bargaining is the first great prayer of intercession in the Bible.",
    words: [
      { v: 14, s: 6381, note: "Pala, \"too hard\" or \"too wonderful\". The root is often used for God's miracles. Luke 1:37 echoes the question when the angel tells Mary that nothing is impossible with God." },
      { v: 25, s: 8199, note: "Shaphat, \"judge\". Abraham appeals to God as \"the Judge of all the earth.\" He is not doubting God's justice but staking everything on it." },
    ],
  },
  {
    book: "genesis",
    chapter: 19,
    title: "The fall of Sodom",
    setting:
      "Sodom was one of the cities of the Jordan plain, probably near the southern end of the Dead Sea, a region still crusted with salt and tar. Lot sits \"in the gateway\", where elders did business and judged cases, so he had become a leading citizen. The men of the city demand to abuse his guests, violating the most basic rule of hospitality. Ezekiel 16:49 adds that Sodom was also proud, overfed and careless toward the poor.",
    words: [
      { v: 1, s: 8179, note: "Shaar, \"gate\". The city gate was the town hall and courtroom. Lot sitting there shows how deeply he had settled into Sodom." },
      { v: 16, s: 2551, note: "Chemlah, \"compassion\" or \"mercy\". Lot hesitates even as judgment falls, so the angels take him by the hand. He is rescued by God's mercy, not by his own readiness." },
    ],
  },
  {
    book: "genesis",
    chapter: 20,
    title: "Abraham, Abimelech and a repeated lie",
    setting:
      "Abraham moves to Gerar in the western Negev and repeats the half truth he told in Egypt: \"She is my sister.\" Sarah really was his half sister (v. 12), but the point was to hide the marriage. Abimelech (a name or title used by Gerar's kings) takes Sarah, but God stops him in a dream. Just before Isaac's birth, the promised line is put at risk by the father of faith himself, and God protects it anyway.",
    words: [
      { v: 7, s: 5030, note: "Navi, \"prophet\". The first time the word appears in the Bible. Here a prophet is one who intercedes with God for others, which Abraham then does (v. 17)." },
    ],
  },
  {
    book: "genesis",
    chapter: 21,
    title: "Isaac is born and Hagar is sent away",
    setting:
      "Twenty five years after the first promise, Sarah gives birth to Isaac. Children were often weaned around age two or three, and the weaning feast celebrated a child surviving infancy. At that feast the tension between Sarah and Hagar boils over, and Hagar and Ishmael are sent into the wilderness of Beersheba, where God meets them again. The chapter ends with a treaty over a well, since water rights could make or break a herding family.",
    words: [
      { v: 6, s: 6712, note: "Tsechoq, \"laughter\". Isaac's name means \"he laughs.\" Sarah's laughter of disbelief (18:12) has become laughter of joy." },
      { v: 33, s: 5769, note: "Olam, \"everlasting\". Abraham calls on El Olam, \"the Eternal God\", after planting a tamarisk, a slow growing tree that would shade generations after him." },
    ],
  },
  {
    book: "genesis",
    chapter: 23,
    title: "Sarah's death and the cave of Machpelah",
    setting:
      "Sarah dies at Hebron aged 127, and Abraham, after decades in Canaan, owns no ground to bury her in. He negotiates with the Hittites of Hebron at the city gate, the public place where property deals were witnessed. The polite back and forth is typical Near Eastern bargaining: \"I give it to you\" opens the haggling. Abraham pays 400 shekels of silver, a steep price, and the first piece of the Promised Land legally becomes his.",
    words: [
      { v: 4, s: 1616, note: "Ger, \"foreigner\" or \"resident alien\". Abraham calls himself a foreigner and outsider among them. Hebrews 11:13 picks this up: the patriarchs lived as strangers, looking for a better country." },
    ],
  },
  {
    book: "genesis",
    chapter: 24,
    title: "A bride for Isaac",
    setting:
      "Abraham is old, and Isaac must not marry a Canaanite, so Abraham sends his senior servant to his relatives in Aram Naharaim in upper Mesopotamia, a journey of several hundred miles. Marriages were arranged between families, with gifts and a bride price. A meeting at a well is a classic Bible scene (compare Jacob and Rachel, Moses and Zipporah). This is the longest chapter in Genesis, and its focus is God's quiet guidance.",
    words: [
      { v: 27, s: 2617, note: "Chesed, \"steadfast love\" or \"loyal kindness\". It is love that keeps its commitments. The servant praises God for not abandoning His chesed and faithfulness to Abraham." },
    ],
  },
  {
    book: "genesis",
    chapter: 25,
    title: "Abraham dies and the twins are born",
    setting:
      "Abraham dies at 175 and is buried by Isaac and Ishmael together. Before Isaac's story begins, the chapter lists Abraham's other sons and Ishmael's twelve princes, showing that God kept His word to them too. Then Rebekah, barren for twenty years, conceives twins who struggle in the womb. In the ancient world the firstborn son received a double share and leadership of the family. That is the birthright Esau sells for a bowl of stew.",
    words: [
      { v: 31, s: 1062, note: "Bekhorah, \"birthright\". It meant the firstborn's double portion and family headship, and in this family it also carried the covenant promise. Esau trades it for one meal." },
      { v: 26, s: 6119, note: "Aqev, \"heel\". Jacob grabs Esau's heel, and his name sounds like \"heel grabber\", one who trips up or supplants (27:36)." },
    ],
  },
  {
    book: "genesis",
    chapter: 26,
    title: "Isaac, the wells and the oath at Beersheba",
    setting:
      "Isaac lives as a herdsman in the dry Negev and near Gerar on the coastal plain, where survival depends on water. In this land a dug well was a claim to the ground around it, so stopping one up was an act of hostility, and naming one marked ownership. Isaac does not fight for every well. He keeps moving and digging, while God repeats to him the promise first given to Abraham: land, offspring and blessing for the nations.",
    words: [
      { v: 22, s: 7337, note: "Rachav, \"make room\": The name Rehoboth comes from this verb. After two quarrels, Isaac reads open space as a gift from the LORD, not a prize he seized." },
    ],
  },
  {
    book: "genesis",
    chapter: 27,
    title: "Jacob takes Esau's blessing by deception",
    setting:
      "In the ancient world a father's deathbed blessing worked like a spoken will: it passed on leadership of the clan, the larger inheritance and the family's future. Once spoken before God it could not be taken back. Isaac plans to bless Esau in private, though God had told Rebekah the older would serve the younger (25:23). Every member of the family pursues their own agenda, and the chapter shows what that costs them.",
    words: [
      { v: 36, s: 6117, note: "Aqav, \"cheat\": The verb behind the name Jacob means to grab the heel or trip someone from behind. Esau turns the name into an accusation: his brother has lived up to it." },
    ],
  },
  {
    book: "genesis",
    chapter: 28,
    title: "Jacob's dream of the stairway at Bethel",
    setting:
      "Jacob is running for his life, heading some 500 miles north to Haran with a death threat behind him and almost nothing in his hands. He sleeps in the open near the town of Luz with a stone under his head. Mesopotamian temple towers (ziggurats) had stairways meant to link earth with heaven, built by human effort. In Jacob's dream God sets up the connection Himself, comes to meet a fugitive, and renews Abraham's promise to him.",
    words: [
      { v: 12, s: 5551, note: "Sullam, \"stairway\": It appears only here in the Old Testament. Many scholars connect it with a ramp or staircase like those on ziggurats, which fits angels \"going up and down.\"" },
    ],
  },
  {
    book: "genesis",
    chapter: 29,
    title: "Jacob meets Rachel and marries Leah",
    setting:
      "Jacob arrives in Haran, Laban's home region in upper Mesopotamia, with no gifts for a bride price. Instead he offers seven years of labor, costly but understandable. Weddings involved a feast and a veiled bride brought to the groom at night, which explains how Laban's switch could work. The man who deceived his blind father is now deceived in the dark. The chapter's quiet center is Leah, the unwanted wife whose sons' names tell her story.",
    words: [
      { v: 31, s: 8130, note: "Sane, \"unloved\": Literally \"hated\", but in family law it often means loved less or ranked second (compare Deuteronomy 21:15). The LORD sees the one ranked second." },
      { v: 35, s: 3034, note: "Yadah, \"praise\": Leah's fourth son Judah is named for this verb. Judah, not Joseph, becomes the royal tribe of David and of Jesus." },
    ],
  },
  {
    book: "genesis",
    chapter: 30,
    title: "Rivalry, mandrakes and Jacob's flocks",
    setting:
      "Childlessness in the ancient Near East meant shame and an insecure old age, and law codes of the time allowed a barren wife to give her servant to her husband and count the children as her own. Rachel and Leah turn this custom into a contest. Mandrakes were prized as a fertility charm. Jacob, still working for Laban, then uses breeding methods of his own. Yet the chapter keeps insisting that God is the one who opens wombs and grows flocks.",
    words: [
      { v: 14, s: 1736, note: "Duday, \"mandrakes\": The word sounds like dod, \"love\", and the plant's fragrant fruit was widely thought to help conception. Rachel gets the mandrakes, but Leah gets the son." },
    ],
  },
  {
    book: "genesis",
    chapter: 31,
    title: "Jacob leaves Laban, and Rachel takes the idols",
    setting:
      "After twenty years of work, Jacob's wages have been changed again and again, and Laban's sons resent his wealth. Herding contracts of the time let a shepherd off for animals lost to wild beasts, yet Jacob says he paid for those losses himself. When God tells him to go home, he slips away during sheep shearing, a busy season. Laban chases him for seven days, and the two finally make a formal treaty, piling up stones as witnesses to a boundary.",
    words: [
      { v: 19, s: 8655, note: "Teraphim, \"household idols\": Small images of family gods, possibly also tied to family property or inheritance. Rachel steals them, then hides them by sitting on them, which says a lot about their power." },
      { v: 49, s: 4709, note: "Mizpah, \"watchtower\": Often quoted as a tender farewell, Laban's words are really a warning: may the LORD watch you, since I no longer can." },
    ],
  },
  {
    book: "genesis",
    chapter: 32,
    title: "Jacob wrestles with God at the Jabbok",
    setting:
      "Twenty years after fleeing, Jacob heads home and learns that Esau is coming with 400 men, which sounds like an army. He splits his household into two camps, prays, and sends wave after wave of livestock ahead as gifts, a common way to seek a powerful man's favor. Alone at night by the Jabbok, a steep gorge east of the Jordan, he is seized by a mysterious man. By dawn Jacob is limping, renamed and blessed.",
    words: [
      { v: 28, s: 3478, note: "Yisrael, \"Israel\": Usually explained as \"he strives with God\" or \"God strives.\" A whole nation will carry the name of a man who would not let go." },
      { v: 30, s: 6439, note: "Peniel, \"face of God\": Jacob names the place for what happened there. He saw God face to face, and his life was spared." },
    ],
  },
  {
    book: "genesis",
    chapter: 33,
    title: "Jacob and Esau meet again",
    setting:
      "Jacob approaches Esau bowing to the ground seven times, the gesture vassals used before a great king in ancient letters such as those found at Amarna in Egypt. He arranges his family by rank, with Rachel and Joseph safest at the back. Esau, however, runs to embrace him. After the reunion Jacob does not follow Esau south to Seir. He settles near Shechem and buys a plot of land there, his family's first purchase in Canaan since Abraham bought a grave.",
    words: [
      { v: 11, s: 1293, note: "Berakah, \"gift\": The word is literally \"blessing.\" Twenty years after stealing his brother's blessing, Jacob presses a blessing back into Esau's hands." },
    ],
  },
  {
    book: "genesis",
    chapter: 34,
    title: "The violation of Dinah at Shechem",
    setting:
      "Jacob has settled near Shechem, a Canaanite city in the central hills ruled by Hamor. When Hamor's son seizes and violates Jacob's daughter Dinah, he then asks to marry her and offers any bride price. Jacob's sons demand that every man in the city be circumcised, turning the sign of God's covenant into a trap. Simeon and Levi then kill the men while they are still in pain. God is never mentioned in this dark chapter.",
    words: [
      { v: 7, s: 5039, note: "Nevalah, \"outrage\": A word for a shocking violation of basic moral decency. Scripture uses it again for sexual violence in 2 Samuel 13:12." },
    ],
  },
  {
    book: "genesis",
    chapter: 35,
    title: "Back to Bethel, and the road of loss",
    setting:
      "After the violence at Shechem, God sends Jacob back to Bethel, where He first met him as a fugitive some twenty years earlier. Before going, Jacob's household hands over its foreign gods and earrings, probably amulets tied to other gods, and buries them under an oak. God renews the promise and the name Israel. Then the road brings loss after loss: Rebekah's nurse Deborah, Rachel in childbirth near Bethlehem, and Isaac, buried by both his sons.",
    words: [
      { v: 18, s: 1126, note: "Ben-oni, \"son of my sorrow\": Rachel's dying name for her son. Jacob renames him Benjamin, \"son of the right hand\", turning a name of grief into a name of strength and honor." },
    ],
  },
  {
    book: "genesis",
    chapter: 36,
    title: "Esau's family becomes the nation of Edom",
    setting:
      "Before Genesis follows Jacob's sons, it closes Esau's story with a list of his descendants, chiefs and kings. Esau's people settled in Seir, the rugged highlands southeast of the Dead Sea, and became the nation of Edom. Edom organized early, with kings long before Israel had any. Israel and Edom would remain neighbors and rivals for centuries, so this list reminded Israel that their quarrelsome cousins were family too.",
    words: [
      { v: 1, s: 123, note: "Edom, \"red\": Esau's nickname from the red stew he traded his birthright for (25:30). The name also fits the reddish sandstone of the Seir highlands." },
    ],
  },
  {
    book: "genesis",
    chapter: 37,
    title: "Joseph the dreamer is sold by his brothers",
    setting:
      "Jacob now lives near Hebron, and his sons graze the flocks far north near Shechem and Dothan, close to a main trade road down to Egypt. Caravans carried spices, balm and resin south along such routes, and sometimes slaves. Twenty shekels of silver fits the known price of a young slave in this period. Jacob's open favoritism, Joseph's dreams and the brothers' hatred set in motion a story God will use to save many lives.",
    words: [
      { v: 3, s: 3801, note: "Ketonet, \"robe\": A long tunic. The added word passim is uncertain, perhaps \"long-sleeved\" or \"reaching to the ankles\": clothing for someone who did not do manual labor, rather than \"many colors.\"" },
      { v: 35, s: 7585, note: "Sheol, \"grave\": The realm of the dead. Jacob expects to go down to the grave still mourning; the rest of Genesis will surprise him." },
    ],
  },
  {
    book: "genesis",
    chapter: 38,
    title: "Judah and Tamar",
    setting:
      "Judah leaves his brothers and settles among Canaanites near Adullam, in the hills west of Bethlehem. The chapter turns on the custom of levirate marriage: if a man died childless, his brother married the widow so the dead man's name and inheritance would continue. Israel's law later formalized it (Deuteronomy 25:5-10). When Judah withholds his youngest son, Tamar, a widow with no rights or future, takes a desperate and dangerous step to claim what she is owed.",
    words: [
      { v: 8, s: 2992, note: "Yavam, \"brother-in-law duty\": The verb for a brother-in-law's duty to raise children for his dead brother. Onan takes the privileges of the marriage while refusing its purpose." },
      { v: 26, s: 6663, note: "Tsadaq, \"be righteous\": Judah admits, \"She is more righteous than I.\" It is a rare moment when a son of Jacob openly confesses wrong, and the turning point of his life." },
    ],
  },
  {
    book: "genesis",
    chapter: 39,
    title: "Joseph in Potiphar's house and in prison",
    setting:
      "Joseph, a teenager sold into slavery, is bought by Potiphar, a high Egyptian official. Wealthy Egyptian households were run by stewards, and an Egyptian papyrus from about this era lists dozens of household servants with Semitic names. Joseph rises to run the house, is falsely accused, and lands in the king's prison. Through it all runs one refrain: the LORD was with him. God's covenant name appears here more than anywhere else in Joseph's story.",
    words: [
      { v: 21, s: 2617, note: "Chesed, \"kindness\": God's loyal, covenant love. Joseph is in a foreign prison, far from the promised land, and the LORD's covenant love has followed him there." },
      { v: 1, s: 5631, note: "Saris, \"officer\": Later it often means \"eunuch\", but here it is a court title for a high official. Potiphar was married, so most read it simply as \"officer.\"" },
    ],
  },
  {
    book: "genesis",
    chapter: 40,
    title: "Dreams in Pharaoh's prison",
    setting:
      "Joseph is held with two of Pharaoh's officials, the chief cupbearer and the chief baker. Both were trusted posts close to the king: a cupbearer served the king's wine and could become a confidant, and food and drink were obvious routes for poisoning a ruler. Egyptians took dreams seriously, and dream interpretation manuals survive from ancient Egypt. Cut off from professional interpreters in prison, the officials are troubled, and Joseph points them to God.",
    words: [
      { v: 8, s: 6622, note: "Patar, \"interpret\": Joseph's reply, \"Don't interpretations belong to God?\", takes the skill out of the hands of Egypt's experts and gives the credit to the God of Israel." },
      { v: 13, s: 5375, note: "Nasa, \"lift up\": Pharaoh will \"lift up the head\" of both men. For the cupbearer it means restoration; for the baker, in verse 19, it means execution." },
    ],
  },
  {
    book: "genesis",
    chapter: 41,
    title: "Joseph interprets Pharaoh's dreams",
    setting:
      "Egypt's whole economy depended on the Nile's yearly flood. A low flood meant failed harvests, and a later Egyptian inscription even describes a seven-year famine. So Pharaoh's dreams of starving cows rising from the Nile strike at the heart of his kingdom's security, and his experts are stumped. Joseph, now thirty, is shaved, dressed in Egyptian fashion and brought from prison. In a single day he becomes the second most powerful man in Egypt.",
    words: [
      { v: 8, s: 2748, note: "Chartom, \"magician\": A word borrowed from Egyptian for a priest who read sacred texts and interpreted signs. Egypt's best religious experts cannot read what Israel's God has sent." },
      { v: 38, s: 7307, note: "Ruach, \"Spirit\": A pagan king recognizes that the Spirit of God is in Joseph. It is one of the first times Scripture describes a person this way." },
    ],
  },
  {
    book: "genesis",
    chapter: 42,
    title: "Joseph's brothers come to Egypt for grain",
    setting:
      "The famine reaches Canaan, and Egypt, with its Nile-watered fields and Joseph's full storehouses, is the place to buy grain. Egyptian records mention border officials letting herders from the east in to keep their flocks alive. About twenty years have passed. Joseph, dressed as an Egyptian official and speaking through an interpreter, recognizes his brothers, but they do not recognize him. He accuses them of spying, a plausible charge on Egypt's exposed northeastern frontier.",
    words: [
      { v: 6, s: 7812, note: "Shachah, \"bow down\": The brothers bow with their faces to the ground, exactly what Joseph's dream of the sheaves had pictured (37:7)." },
      { v: 21, s: 818, note: "Ashem, \"guilty\": \"Surely we are being punished because of our brother\" is literally \"we are guilty.\" Under pressure, twenty years of silence break with a confession." },
    ],
  },
  {
    book: "genesis",
    chapter: 43,
    title: "The brothers return with Benjamin",
    setting:
      "The grain runs out, and Jacob must choose between starvation and risking Benjamin, Rachel's last son. Judah steps forward and personally guarantees the boy's safety. The brothers bring Egypt's ruler the best products of Canaan, balm, honey, spices, pistachios and almonds, along with double the silver. In Joseph's house, Egyptian custom keeps foreigners at a separate table, and the brothers are astonished to find themselves seated in exact birth order.",
    words: [
      { v: 9, s: 6148, note: "Arav, \"guarantee\": To stand as surety, pledging yourself for another's debt. Judah, who once sold a brother for silver, now offers himself as security for one. Hebrews 7:22 calls Jesus the guarantee of a better covenant." },
    ],
  },
  {
    book: "genesis",
    chapter: 44,
    title: "The silver cup and Judah's plea",
    setting:
      "Joseph sets one last test. His silver cup, the kind used in Egypt for divination by watching patterns in liquid, is planted in Benjamin's sack. If the brothers leave Benjamin behind as a slave, they will show they have not changed since they sold Joseph. Instead they tear their clothes and return together. Judah, speaking for all of them, gives one of the longest speeches in Genesis and offers to become a slave in Benjamin's place.",
    words: [
      { v: 5, s: 5172, note: "Nachash, \"divination\": Reading omens, here probably by watching oil or water in a cup. Joseph is playing the part of an Egyptian lord; the text never says he actually practiced it." },
      { v: 33, s: 8478, note: "Tachat, \"in place of\": \"Please let your servant stay here as my lord's slave in place of the boy.\" A simple preposition carries the heart of substitution." },
    ],
  },
  {
    book: "genesis",
    chapter: 45,
    title: "\"I am Joseph\": the brothers forgiven",
    setting:
      "Joseph can hold back no longer. He sends out his Egyptian attendants, weeps so loudly that Pharaoh's household hears, and reveals himself to brothers who are terrified. Five years of famine still lie ahead. Pharaoh invites the whole family to settle in Goshen, the fertile grazing land of the eastern Nile Delta, and sends Egyptian wagons to bring old Jacob down from Canaan, along with the best of Egypt's goods.",
    words: [
      { v: 5, s: 4241, note: "Michyah, \"preserving life\": \"It was to save lives that God sent me before you.\" Joseph reads twenty years of pain through God's purpose without pretending his brothers did nothing wrong." },
      { v: 7, s: 7611, note: "She'erit, \"remnant\": An early use of a word that runs through the prophets: the survivors God preserves through disaster so His promise can continue." },
    ],
  },
  {
    book: "genesis",
    chapter: 46,
    title: "Jacob's family moves to Egypt",
    setting:
      "Jacob, about 130 years old, leaves Canaan with his whole household. At Beersheba, the southern edge of the land where Abraham and Isaac had worshiped, he stops to offer sacrifices, and God speaks to him for the last time in Genesis. Leaving the promised land was a serious step; God had once told Isaac not to go down to Egypt (26:2). The chapter lists the family by name, then ends with Joseph settling them in Goshen, apart from Egyptian society.",
    words: [
      { v: 3, s: 3381, note: "Yarad, \"go down\": \"Do not be afraid to go down to Egypt.\" The same God who once told Isaac to stay now gives Jacob permission, and a promise to go with him." },
      { v: 27, s: 7657, note: "Shivim, \"seventy\": A number of fullness. Seventy go down to Egypt, echoing the seventy nations traditionally counted in Genesis 10. Acts 7:14 gives seventy-five, following the Greek Old Testament's count." },
    ],
  },
  {
    book: "genesis",
    chapter: 47,
    title: "Jacob before Pharaoh, and Egypt's famine policy",
    setting:
      "Joseph presents his father and five of his brothers to Pharaoh, and they ask to graze their flocks in Goshen. Then the chapter follows Joseph's famine administration: as people run out of money, he takes their livestock, then their land, in exchange for grain, and sets a lasting tax of one fifth of the harvest. Egyptian records show the crown and the temples holding vast estates. Readers have long debated whether Joseph's policy was wise mercy or harsh centralization.",
    words: [
      { v: 9, s: 4033, note: "Magur, \"travels\": Literally \"sojourning\", living somewhere as a temporary resident. Jacob sums up 130 years as a journey through land not his own; Hebrews 11:13 says the patriarchs confessed they were strangers and exiles on the earth." },
    ],
  },
  {
    book: "genesis",
    chapter: 48,
    title: "Jacob adopts and blesses Joseph's sons",
    setting:
      "Jacob is dying, and Joseph brings his two sons, Manasseh and Ephraim, to their grandfather. Jacob formally adopts them as his own, so Joseph's family will receive a double share among the tribes, the portion usually given to a firstborn. Blessings were given with the right hand on the head of the elder. Jacob, nearly blind like his father before him, crosses his arms and deliberately puts the younger first, as has happened in every generation of this family.",
    words: [
      { v: 16, s: 1350, note: "Ga'al, \"redeem\": The first use of this verb in the Bible. A redeemer was a relative who rescued family from debt or danger, and Jacob says God's angel has redeemed him from all harm." },
    ],
  },
  {
    book: "genesis",
    chapter: 49,
    title: "Jacob's last words over his twelve sons",
    setting:
      "On his deathbed Jacob gathers his sons and speaks a poem over each one, part blessing, part rebuke, part prophecy of \"what will happen to you in the days to come.\" A father's final words carried great weight in the ancient world, much like a will. The tribes' later history echoes these lines: Reuben loses the lead, Simeon and Levi are scattered, and Judah rises to rule. It is one of the oldest and hardest poems in the Bible to translate.",
    words: [
      { v: 10, s: 7626, note: "Shevet, \"scepter\": A ruler's staff. Judah will hold royal authority, fulfilled in David's dynasty and, Christians believe, finally in Jesus, \"the Lion of the tribe of Judah\" (Revelation 5:5)." },
      { v: 10, s: 7886, note: "Shiloh, \"whose it is\": One of the Bible's most debated words. It may be a name, \"the one to whom it belongs,\" or \"tribute to him.\" Ancient Jewish and Christian interpreters alike read it as a promise of the Messiah." },
    ],
  },
  {
    book: "genesis",
    chapter: 50,
    title: "Jacob's burial and Joseph's forgiveness",
    setting:
      "Egyptians embalmed the bodies of important people, and Egypt mourns Jacob for seventy days, a period ancient writers also connect with Egyptian embalming and royal mourning. A great Egyptian procession then escorts his body to Canaan, to the cave Abraham bought at Machpelah. Back in Egypt, the brothers fear that Joseph's kindness was only for their father's sake. Genesis ends with Joseph's coffin in Egypt, waiting for God's promised return.",
    words: [
      { v: 20, s: 2803, note: "Chashav, \"intend\": \"What you intended against me for evil, God intended for good.\" The same verb describes both plans, woven into one event, and God's plan is the one that stands." },
      { v: 2, s: 2590, note: "Chanat, \"embalm\": The Egyptian art of preserving the body. Only Jacob and Joseph are embalmed in the Bible, a sign of how deeply this family had been drawn into Egyptian life." },
    ],
  },
  {
    book: "psalms",
    chapter: 2,
    title: "The LORD's anointed King",
    setting:
      "Psalm 2 is a royal psalm, probably sung when a new king from David's line was crowned in Jerusalem. Subject nations often revolted when a new king took the throne, hoping he was weak. The psalm answers with God's own decree: He has installed His king on Zion. The New Testament applies this psalm to Jesus more than almost any other (Acts 4:25; Acts 13:33; Hebrews 1:5).",
    words: [
      { v: 2, s: 4899, note: "Mashiach, \"anointed\": the king anointed with oil to rule for God. It gives us the word \"Messiah\"; its Greek equivalent is \"Christ\"." },
      { v: 12, s: 5401, note: "Nashaq, \"kiss\": subjects kissed a king's hand or feet as a pledge of loyalty. The rebels are told to stop resisting and submit to the Son." },
    ],
  },
  {
    book: "psalms",
    chapter: 3,
    title: "Fleeing from Absalom",
    setting:
      "The title links this psalm to the day David fled Jerusalem, barefoot and weeping, because his son Absalom had seized the throne (2 Samuel 15 and 16). His counselors had defected, and Shimei cursed him on the road, saying the LORD was repaying him for the blood of Saul's house (2 Samuel 16:8). Psalm 3 is the first lament in the Psalter and has long been read as a morning prayer, after a night David was not sure he would survive.",
    words: [
      { v: 3, s: 4043, note: "Magen, \"shield\": the small round shield a soldier held close to his body. David pictures God not as distant help but as armor wrapped around him." },
      { v: 3, s: 7311, note: "Rum, \"lifts\": to raise up. David left Jerusalem with his head covered in grief (2 Samuel 15:30); God is the One who lifts the bowed head of the shamed." },
    ],
  },
  {
    book: "psalms",
    chapter: 4,
    title: "An evening prayer of trust",
    setting:
      "Psalm 4 is often read as an evening prayer, a companion to the morning prayer of Psalm 3. David addresses men of rank who are dragging his honor into shame and chasing lies and false gods. Some scholars think a drought or poor harvest lies behind it, since many were asking who could show them any good (v. 6). David ends by lying down to sleep in peace while the questions remain.",
    words: [
      { v: 1, s: 7337, note: "Rachav, \"relieved\": literally \"made room\" or \"enlarged\". In Hebrew, distress is a tight, narrow place; God gives space to breathe." },
      { v: 8, s: 983, note: "Betach, \"safety\": security, freedom from worry. It is related to batach, \"trust\". Safety is where trust lies down." },
    ],
  },
  {
    book: "psalms",
    chapter: 5,
    title: "A morning plea for guidance",
    setting:
      "David prays at daybreak, perhaps near the hour of the morning sacrifice, when priests laid wood and offerings in order on the altar. He speaks as a worshiper who expects to enter God's house (v. 7) and contrasts himself with liars and flatterers whose words destroy. Paul quotes verse 9 in Romans 3:13 to show that sin has corrupted human speech everywhere.",
    words: [
      { v: 3, s: 6186, note: "Arakh, \"lay my plea\": to set in order, the verb for arranging wood and sacrifice on the altar (Leviticus 1:7). David arranges his prayer like an offering." },
      { v: 3, s: 6822, note: "Tsaphah, \"wait in expectation\": the watchman's word, scanning the horizon from the city wall. David prays, then keeps looking for God's answer." },
    ],
  },
  {
    book: "psalms",
    chapter: 6,
    title: "A cry for mercy in sorrow",
    setting:
      "Psalm 6 is the first of seven \"penitential psalms\" (6, 32, 38, 51, 102, 130, 143) the church has long prayed in seasons of repentance. David's body and soul are both in anguish, perhaps from illness, and he fears God's discipline has turned to anger. He weeps through the night, then suddenly declares that the LORD has heard. Jesus echoes verse 8 in Matthew 7:23.",
    words: [
      { v: 2, s: 926, note: "Bahal, \"in agony\": terrified, shaken to the core. It describes David's bones (v. 2) and soul (v. 3), then his enemies (v. 10). By the end, the terror has changed sides." },
      { v: 5, s: 7585, note: "Sheol, the grave or the realm of the dead. Israel had only glimpses of life beyond death. To David it looked like silence, a place where no one praises God." },
    ],
  },
  {
    book: "psalms",
    chapter: 7,
    title: "Falsely accused, appealing to the Judge",
    setting:
      "The title names \"Cush, a Benjamite\", a man otherwise unknown, probably from Saul's tribe and court, who slandered David while Saul hunted him. David swears he is innocent of this charge and asks God to convene court. Psalm 7 is a courtroom prayer. It is not a claim to be sinless but to be innocent in this case, before a Judge who sees what no witness can.",
    words: [
      { v: 9, s: 974, note: "Bachan, \"searches\": to test or assay, as metal is tested for purity. God examines evidence no human court can reach." },
      { v: 9, s: 3629, note: "Kilyah, \"minds\": literally \"kidneys\", which Hebrew treated as the seat of hidden motives and feelings. God tests both heart and gut." },
    ],
  },
  {
    book: "psalms",
    chapter: 8,
    title: "God's majesty and human dignity",
    setting:
      "Psalm 8 is a hymn of creation, probably prayed under a night sky, since David sees the moon and stars but no sun (v. 3). It echoes Genesis 1, where humans are made to rule over animals, birds and fish. David marvels that the God whose name fills the earth pays attention to small humans at all. Hebrews 2:6 to 9 reads it of Jesus, the true Man now crowned with glory.",
    words: [
      { v: 1, s: 117, note: "Addir, \"majestic\": mighty and glorious, used of kings and of great waters. The psalm opens and closes with it, setting human dignity inside God's greater glory." },
      { v: 4, s: 6485, note: "Paqad, \"care for\": to visit, attend to, look after. God does not merely notice humans; He comes to tend them." },
    ],
  },
  {
    book: "psalms",
    chapter: 9,
    title: "The Judge who remembers the afflicted",
    setting:
      "Psalms 9 and 10 were probably once a single poem. Together they form a broken alphabet acrostic, and the Greek Old Testament prints them as one psalm. Psalm 9 thanks God for past victories over hostile nations and trusts Him to judge the world fairly. Its heart is with the poor and oppressed, whom the powerful forget but God never does (v. 18).",
    words: [
      { v: 9, s: 4869, note: "Misgav, \"stronghold\": a high, secure place out of reach, like a fortress on a cliff. The oppressed are lifted where attackers cannot follow." },
      { v: 18, s: 8615, note: "Tiqvah, \"hope\". The word can also mean a cord; Rahab's scarlet cord in Joshua 2:18 is a tiqvah. Hope is a rope that holds." },
    ],
  },
  {
    book: "psalms",
    chapter: 10,
    title: "Why do You stand far off?",
    setting:
      "Psalm 10 continues the acrostic begun in Psalm 9 and has no title of its own. It paints a predator in the villages: a powerful man who lies in ambush for the helpless, certain that God neither sees nor cares. The psalm voices the question oppressed people ask in every age, then answers it: God does see, and He hears the desire of the humble. Paul quotes verse 7 in Romans 3:14.",
    words: [
      { v: 1, s: 7350, note: "Rachoq, \"far off\": distant. The psalmist feels God standing at a distance, like a bystander watching a crime." },
      { v: 8, s: 2489, note: "Chelekah, \"helpless\": a rare word found only in this psalm (vv. 8, 10, 14). It describes the hapless person with no one to defend them." },
    ],
  },
  {
    book: "psalms",
    chapter: 11,
    title: "When the foundations shake",
    setting:
      "Worried friends urge David to flee to the mountains like a bird, because the wicked have their bows drawn and the foundations of society are crumbling. The setting may be his years at Saul's court, when spears were literally thrown at him (1 Samuel 18 to 20), though the title gives no occasion. David refuses to run, because the LORD still sits on His throne and sees everything.",
    words: [
      { v: 3, s: 8356, note: "Shathah, \"foundations\": the base supports of a building, here the moral and legal order that holds a society up. When justice collapses, what can the righteous do?" },
      { v: 1, s: 2620, note: "Chasah, \"take refuge\": to run for shelter. David has already found his hiding place in God, so he has no need of the mountains." },
    ],
  },
  {
    book: "psalms",
    chapter: 12,
    title: "When honest people vanish",
    setting:
      "Psalm 12 is a lament from a time when faithful people seemed to have disappeared and everyone spoke with flattering lips. Its occasion is unknown, but it fits any age of spin and propaganda. In the middle, God Himself speaks (v. 5), promising to rise for the oppressed. His pure words are then set against human lies, like refined silver beside cheap talk.",
    words: [
      { v: 2, s: 3820, note: "Lev, \"heart\". \"A double heart\" is literally \"a heart and a heart\": one heart for what is said, another for what is meant." },
      { v: 6, s: 6884, note: "Tsaraph, \"refined\": smelted and purified. God's words are like silver that has passed through the furnace seven times, with no impurity left." },
    ],
  },
  {
    book: "psalms",
    chapter: 13,
    title: "How long, O LORD?",
    setting:
      "Psalm 13 is one of the shortest laments in the Psalter and a model of the form: complaint (vv. 1 and 2), request (vv. 3 and 4), then trust and praise (vv. 5 and 6). David asks \"how long?\" four times. The occasion is unknown, which has let believers in every kind of long trial pray it as their own. It moves from feeling forgotten to singing, though nothing outward has changed yet.",
    words: [
      { v: 1, s: 7911, note: "Shakach, \"forget\". David knows God cannot truly forget, but it feels that way. Faith is allowed to say honestly how things feel." },
      { v: 6, s: 1580, note: "Gamal, \"been good\": to deal fully with someone; the same verb is used for weaning a child. God's goodness is the complete care of a parent who finishes what He starts." },
    ],
  },
  {
    book: "psalms",
    chapter: 14,
    title: "The fool says there is no God",
    setting:
      "Psalm 14 appears again, almost word for word, as Psalm 53, which uses \"God\" where this one says \"LORD\". In Hebrew thought the \"fool\" is not unintelligent but morally foolish: someone who lives as if God does not matter. The psalm views humanity from heaven and finds corruption everywhere. Paul uses verses 1 to 3 in Romans 3:10 to 12 to show that all have sinned.",
    words: [
      { v: 1, s: 5036, note: "Naval, \"fool\": a person who is morally senseless and closed to God. Nabal, whose name means fool, is the type in 1 Samuel 25." },
      { v: 3, s: 444, note: "Alach, \"become corrupt\": a rare word for going sour, like milk that has turned. Humanity has spoiled." },
    ],
  },
  {
    book: "psalms",
    chapter: 15,
    title: "Who may dwell with God?",
    setting:
      "Psalm 15 is an \"entrance liturgy\". Worshipers arriving at the sanctuary asked who may enter, and a priest or Levite answered with a portrait of the person who belongs in God's presence (compare Psalm 24 and Isaiah 33:14 to 16). The answer is surprising: not ritual but character. Honest speech, kept promises and refusing to exploit others with money all belong to worship.",
    words: [
      { v: 1, s: 1481, note: "Gur, \"abide\": to live as a guest or resident foreigner. To dwell in God's tent is to be welcomed as His guest, under His protection." },
      { v: 2, s: 8549, note: "Tamim, \"integrity\": whole, complete, without blemish, the word used for sacrificial animals. The worshiper is to be all of a piece." },
    ],
  },
  {
    book: "psalms",
    chapter: 16,
    title: "The LORD is my portion",
    setting:
      "Psalm 16 is a song of trust from someone who has turned away from the gods of the land and found everything in the LORD. Its land words (portion, lines, inheritance) recall how Canaan was divided among Israel's tribes, while the priestly Levites got no land because the LORD was their portion (Numbers 18:20). Peter and Paul preached verses 8 to 11 as a prophecy of Jesus' resurrection.",
    words: [
      { v: 6, s: 2256, note: "Chevel, \"lines\": the measuring cords used to mark out each family's plot of land. David's plot has fallen in pleasant places." },
      { v: 5, s: 4490, note: "Manah, \"portion\": a share or allotted part, like a serving at a meal. David's share in life is God Himself." },
    ],
  },
  {
    book: "psalms",
    chapter: 17,
    title: "Hide me in the shadow of Your wings",
    setting:
      "David prays as a man surrounded by enemies who track him like a lion stalking prey (vv. 11 and 12), probably during the years Saul hunted him in the wilderness. Like Psalm 7, it appeals to God as Judge, on the basis of a clear conscience in this matter. It ends by looking past this life: the wicked have their portion now, but David will see God's face.",
    words: [
      { v: 8, s: 380, note: "Ishon, \"apple\": literally \"little man\", the tiny reflection of yourself you see in someone's pupil. The pupil is what every person instinctively protects." },
      { v: 8, s: 6738, note: "Tsel, \"shadow\": shade and protection. \"The shadow of Your wings\" may picture a mother bird, or the cherubim's wings spread over the ark." },
    ],
  },
  {
    book: "psalms",
    chapter: 18,
    title: "David's victory song",
    setting:
      "The title says David sang this \"on the day the LORD had delivered him from the hand of all his enemies and from the hand of Saul.\" A nearly identical version appears in 2 Samuel 22, near the end of David's life. It is a king's thanksgiving: David heaps up names for God (rock, fortress, shield, horn) and describes God's rescue as an earthquake and thunderstorm, like Sinai.",
    words: [
      { v: 1, s: 7355, note: "Racham, \"love\": a rare form of a verb normally used for God's tender compassion. Only here does it describe a person loving God: a deep, almost physical affection." },
      { v: 2, s: 7161, note: "Qeren, \"horn\": the horn of a wild ox, a symbol of strength and victory. \"The horn of my salvation\" means God is David's power to win." },
    ],
  },
  {
    book: "psalms",
    chapter: 19,
    title: "The heavens and the word declare",
    setting:
      "Psalm 19 sets two of God's \"books\" side by side: creation, which speaks without words to every nation (vv. 1 to 6), and the written law, which revives and makes wise (vv. 7 to 11). Israel's neighbors worshiped the sun; here it is only a creature running its course. The psalm closes with a personal prayer for cleansing, and its last verse is still prayed before many sermons.",
    words: [
      { v: 1, s: 5608, note: "Saphar, \"declare\": to recount or tell the story. The sky is a storyteller, retelling God's glory every day." },
      { v: 4, s: 6957, note: "Qav, \"voice\": literally a measuring line or cord. Creation's \"line\" goes out to all the earth; Paul quotes this verse in Romans 10:18." },
    ],
  },
  {
    book: "psalms",
    chapter: 20,
    title: "A prayer before battle",
    setting:
      "Psalm 20 is a prayer Israel offered for its king before he went to war, probably at the sanctuary, where offerings were made before battle (1 Samuel 13:9 to 12). The congregation prays (vv. 1 to 5), a single voice declares confidence (v. 6), and all join in the famous line about chariots and horses. Psalm 21 is its companion, giving thanks after the victory.",
    words: [
      { v: 1, s: 7682, note: "Sagav, \"protect\": to set someone high and out of reach. Fortresses stood on heights; God's name lifts the king above danger." },
      { v: 5, s: 1713, note: "Dagal, \"raise a banner\": to set up a battle flag. Armies marched under banners; Israel's banner is God's name (Exodus 17:15)." },
    ],
  },
  {
    book: "psalms",
    chapter: 21,
    title: "Thanksgiving for the king's victory",
    setting:
      "Psalm 21 answers Psalm 20. There the people prayed for their king before battle; here they thank God for granting his request (compare 20:4 with 21:2). The first half celebrates what God has given the king: life, a crown, glory and joy. The second half looks ahead to his future victories. Jewish and Christian readers alike have heard in it the reign of the Messiah.",
    words: [
      { v: 3, s: 5850, note: "Atarah, \"crown\": a royal diadem or wreath. God Himself set it on the king's head; his authority is a gift, not an achievement." },
      { v: 6, s: 1293, note: "Berakah, \"blessings\". The king is not only blessed but made a blessing, a source of good for others, echoing God's promise to Abraham (Genesis 12:2)." },
    ],
  },
  {
    book: "psalms",
    chapter: 22,
    title: "My God, why have You forsaken me?",
    setting:
      "Psalm 22 is David's lament from a place of mockery, encirclement and physical collapse, followed by a sudden turn to praise that spreads to all nations and future generations. Jesus prayed its opening line from the cross (Matthew 27:46), and the Gospels record details of the crucifixion that echo it: the mocking, the thirst, the dividing of garments by lot. No known event in David's life fits it fully.",
    words: [
      { v: 1, s: 5800, note: "Azav, \"forsaken\": left, abandoned. It is the cry of a covenant bond that feels broken, yet spoken to \"my God\" even in the feeling of being left." },
      { v: 3, s: 8416, note: "Tehillah, \"praises\". God is \"enthroned on the praises of Israel\": His people's worship is pictured as the throne He sits on." },
    ],
  },
  {
    book: "psalms",
    chapter: 24,
    title: "Lift up your heads, O gates",
    setting:
      "Psalm 24 is a processional hymn, probably sung as the ark of the covenant was carried up into Jerusalem. Many link it to the day David brought the ark into the city with music and dancing (2 Samuel 6). Worshipers ask who may climb the hill (vv. 3 to 6), then call on the ancient gates to open for the King of glory (vv. 7 to 10). The church has long sung it to celebrate Christ's ascension.",
    words: [
      { v: 7, s: 5375, note: "Nasa, \"lift up\": the gates are told to raise their heads, as if even the old city gateways were too low for this King to pass under." },
      { v: 3, s: 5927, note: "Alah, \"ascend\": to go up. Pilgrims always \"went up\" to Jerusalem, climbing to the hill where God's presence dwelt." },
    ],
  },
  {
    book: "psalms",
    chapter: 25,
    title: "Teach me Your paths",
    setting:
      "Psalm 25 is an alphabet acrostic: each verse begins with the next letter of the Hebrew alphabet, a device that helped worshipers memorize it. David prays as a man aware of past sins, surrounded by enemies, lonely and afflicted. Three themes weave through his requests: guidance, forgiveness and waiting. The final verse widens the prayer from one man to the whole nation of Israel.",
    words: [
      { v: 3, s: 6960, note: "Qavah, \"wait for\": to wait with eager expectation, leaning forward. It is related to words for a cord pulled tight." },
      { v: 14, s: 5475, note: "Sod, \"confides\": the circle of close friends where plans and secrets are shared. God shares His counsel with those who fear Him (Amos 3:7)." },
    ],
  },
  {
    book: "psalms",
    chapter: 26,
    title: "Vindicate me, LORD",
    setting:
      "Psalm 26 is the prayer of a worshiper who fears being lumped in with the wicked and asks God to examine him. It may have been prayed at the sanctuary gate, like Psalms 15 and 24, before entering to worship: David washes his hands, walks around the altar and stands in the assembly. It is not a boast of sinlessness but a plea not to be swept away with sinners (v. 9).",
    words: [
      { v: 1, s: 8537, note: "Tom, \"integrity\": completeness, wholeness of heart. Not perfection, but a life that is not divided against itself." },
      { v: 6, s: 7364, note: "Rachats, \"wash\": to bathe or rinse. Priests washed before approaching the altar (Exodus 30:19 to 21); David uses the act as a sign of innocence." },
    ],
  },
  {
    book: "psalms",
    chapter: 27,
    title: "The LORD is my light",
    setting:
      "Psalm 27 holds two moods side by side. Verses 1 to 6 are bold confidence: an army may camp around David, but he will not fear. Verses 7 to 14 turn to anxious pleading: do not hide Your face, do not forsake me. Some scholars think two psalms were joined; others see one person moving between faith and fear, as real people do. Its single longing is to dwell in God's house.",
    words: [
      { v: 4, s: 5278, note: "Noam, \"beauty\": pleasantness, delight, loveliness. David longs to gaze on how delightful God is, not only to be protected by Him." },
      { v: 4, s: 1239, note: "Baqar, \"seek\": to inquire or consider carefully, a word also used for examining something closely (Leviticus 27:33). David wants time to ponder God." },
    ],
  },
  {
    book: "psalms",
    chapter: 28,
    title: "Do not be deaf to me",
    setting:
      "David cries out as one who fears being treated like the wicked, people who speak peace to their neighbors while plotting harm. He lifts his hands toward the Most Holy Place, the inner room of the sanctuary where the ark stood. Midway the prayer turns to thanks, as if the answer has already come, and it ends with a prayer for the whole nation: shepherd them and carry them forever.",
    words: [
      { v: 2, s: 1687, note: "Devir, \"sanctuary\": the innermost room, the Most Holy Place. Lifting hands toward it meant praying toward God's throne on earth (1 Kings 8:29 and 30)." },
      { v: 1, s: 2790, note: "Charash, \"deaf\": silent, unresponsive. If God stays silent, David will be like those going down to the pit." },
    ],
  },
  {
    book: "psalms",
    chapter: 29,
    title: "The voice of the LORD in the storm",
    setting:
      "Psalm 29 follows a thunderstorm rolling in from the Mediterranean, crashing over the cedars of Lebanon and moving south to the wilderness of Kadesh. Canaanite poems praised Baal as the storm god who thunders from the clouds, and many scholars think this psalm deliberately claims that imagery for the LORD alone. It begins with worship in heaven and ends with peace for God's people.",
    words: [
      { v: 3, s: 6963, note: "Qol, \"voice\": also \"sound\" or \"thunder\". It sounds seven times in the psalm, like seven claps of thunder." },
      { v: 10, s: 3999, note: "Mabbul, \"flood\": used elsewhere only of Noah's flood (Genesis 6 to 11). The LORD sits enthroned over the flood as King forever." },
    ],
  },
  {
    book: "psalms",
    chapter: 30,
    title: "Mourning turned into dancing",
    setting:
      "The title calls Psalm 30 a song \"for the dedication of the temple\", literally \"of the house\". Which house is unclear: David's palace, the site chosen for the temple, or the temple itself. Later Jewish practice sang it at Hanukkah, the feast of the temple's rededication. The psalm itself is personal thanksgiving: David grew self-assured, fell into a crisis near death, perhaps illness, cried out and was healed.",
    words: [
      { v: 1, s: 1802, note: "Dalah, \"lifted me up\": to draw up, like a bucket drawn from a well. David was hauled up out of the pit." },
      { v: 5, s: 3885, note: "Lun, \"stay\": to lodge for the night, like a traveler. Weeping comes as an overnight guest; joy arrives in the morning." },
    ],
  },
  {
    book: "psalms",
    chapter: 31,
    title: "My times are in Your hands",
    setting:
      "A lament of David that swings between panic and trust several times before it settles. The occasion is unknown. Some connect the \"city under siege\" in verse 21 with Keilah, where Saul nearly trapped David (1 Samuel 23), but that is a guess. The prophet Jeremiah later borrowed its phrase \"terror on every side\", and Jesus prayed verse 5 with His last breath on the cross (Luke 23:46).",
    words: [
      { v: 5, s: 6485, note: "Paqad, \"commit\": to entrust something to another's keeping, like a deposit left with someone you trust. David hands over his very life for safekeeping." },
      { v: 13, s: 4032, note: "Magor, \"terror\". The phrase \"terror on every side\" (magor missabib) became a refrain in Jeremiah (Jeremiah 6:25; 20:3, 10), shorthand for being hemmed in by fear." },
    ],
  },
  {
    book: "psalms",
    chapter: 32,
    title: "The relief of being forgiven",
    setting:
      "A psalm of David and a maskil, a word that probably means a song meant to teach or give insight. Many readers link it with David's sin with Bathsheba, like Psalm 51, though the psalm does not say. The church counted it among the seven penitential psalms. Paul quotes verses 1 and 2 in Romans 4:6 to 8 as proof that God credits righteousness to people apart from their works.",
    words: [
      { v: 1, s: 5375, note: "Nasa, \"forgiven\": literally lifted up and carried away. Sin is pictured as a load God takes off the sinner's back." },
      { v: 1, s: 3680, note: "Kasah, \"covered\": hidden from view. In verse 5 David stops covering his sin, and only then does God cover it." },
    ],
  },
  {
    book: "psalms",
    chapter: 33,
    title: "A new song to the Creator",
    setting:
      "Psalm 33 has no title, which is rare in this first book of the Psalms. It may continue Psalm 32, whose last line it picks up: \"rejoice, O righteous ones\". It is a hymn for gathered worship with lyre and ten stringed harp. It praises God as the Creator who made all things by His word and as the King who overrules the plans of nations. Its point is clear: no army or warhorse can save, only the LORD.",
    words: [
      { v: 6, s: 7307, note: "Ruach, \"breath\": also wind or spirit. The heavens are made by God's word and breath, echoing the Spirit hovering over the waters in Genesis 1:2." },
      { v: 3, s: 2319, note: "Chadash, \"new\". A new song answers a fresh act of God. Revelation 5:9 closes the Bible with a new song to the Lamb." },
    ],
  },
  {
    book: "psalms",
    chapter: 34,
    title: "Taste and see that the LORD is good",
    setting:
      "The title points to 1 Samuel 21:10 to 15. Fleeing Saul, David ran to the Philistine city of Gath, panicked, and faked madness, drooling on his beard until the king threw him out. Abimelech was probably a royal title for King Achish. Out of that low moment came a teaching psalm written as an acrostic, each verse starting with the next Hebrew letter. Peter quotes it twice when encouraging suffering Christians.",
    words: [
      { v: 8, s: 2938, note: "Taam, \"taste\". The title uses a related word when David \"changed his sense\" (taam) to act insane. He who lost his judgment before a king now says: taste the LORD for yourself." },
      { v: 7, s: 2583, note: "Chanah, \"encamps\": to pitch camp like an army. God's angel is not passing by but bivouacked around His people." },
    ],
  },
  {
    book: "psalms",
    chapter: 35,
    title: "Plead my case, LORD",
    setting:
      "A psalm of David that mixes the courtroom and the battlefield. David faces false witnesses and people he once prayed and fasted for when they were sick. He asks God to act as both his lawyer and his warrior. It is one of the imprecatory psalms, which call for judgment on enemies. Jesus applies its line \"they hated me without cause\" to Himself in John 15:25, a line also found in Psalm 69:4.",
    words: [
      { v: 1, s: 7378, note: "Riv, \"contend\": to bring a lawsuit or plead a case. David asks God to take his side in court." },
      { v: 1, s: 3898, note: "Lacham, \"fight\": the ordinary word for battle. In one verse God becomes both David's defense attorney and his soldier." },
    ],
  },
  {
    book: "psalms",
    chapter: 36,
    title: "The fountain of life",
    setting:
      "A psalm of David, \"the servant of the LORD\", a title also given to Moses and Joshua. It sets two portraits side by side: a man who has talked himself out of fearing God, and the LORD whose loyal love reaches the skies. The middle verses picture worshippers feasting in God's house and drinking from His river. Paul quotes verse 1 in Romans 3:18 to sum up humanity's problem: no fear of God.",
    words: [
      { v: 8, s: 5730, note: "Eden, \"delights\": the same word as the garden of Eden. God's house is pictured as Eden restored, with a river flowing through it." },
      { v: 9, s: 4726, note: "Maqor, \"fountain\": a spring of living, flowing water. Jeremiah 2:13 calls the LORD \"the fountain of living water\" whom Israel abandoned." },
    ],
  },
  {
    book: "psalms",
    chapter: 37,
    title: "Don't fret over the wicked",
    setting:
      "A wisdom psalm in the voice of an older David (\"I once was young and now am old\", v. 25). It is an acrostic, each stanza starting with the next Hebrew letter, and reads like a father's advice rather than a prayer. Its question is ancient and modern: why do cheaters seem to win? The phrase \"inherit the land\" comes five times, tying the answer to God's promise to Abraham. Jesus quotes verse 11 in Matthew 5:5.",
    words: [
      { v: 1, s: 2734, note: "Charah, \"fret\": literally to burn or get hot. Don't let the success of evil people set you on fire inside." },
      { v: 11, s: 6035, note: "Anav, \"meek\": humble, often poor and pushed down, people who do not grab for themselves. Jesus says they will inherit the earth." },
    ],
  },
  {
    book: "psalms",
    chapter: 38,
    title: "Sick, guilty and alone",
    setting:
      "A psalm of David \"for remembrance\", a phrase that may link it with the memorial offering (Leviticus 2:2) or simply mean bringing a need before God. It is one of the church's seven penitential psalms. David is seriously ill, sees it as God's discipline for his sin, and finds friends keeping their distance. Scripture elsewhere warns against assuming every illness is punishment (John 9:2 to 3), but here David believes his is.",
    words: [
      { v: 4, s: 4853, note: "Massa, \"burden\": a load carried on the back. David's guilt is too heavy to carry." },
      { v: 5, s: 200, note: "Ivvelet, \"folly\": moral foolishness, the kind Proverbs warns about. David does not call his sin a slip but plain foolishness." },
    ],
  },
  {
    book: "psalms",
    chapter: 39,
    title: "Life is a breath",
    setting:
      "A psalm of David for Jeduthun, one of the temple musicians he appointed (1 Chronicles 16:41). David tries to stay silent around the wicked but the pressure builds until he speaks to God. The psalm is one of the bleakest in the Bible and ends without a resolution, as Psalm 88 does. Its theme of life as a fleeting breath anticipates the book of Ecclesiastes.",
    words: [
      { v: 5, s: 1892, note: "Hevel, \"breath\" or \"vapor\": the key word of Ecclesiastes (\"meaningless\" or \"vanity\"). Life is real but brief, like breath on a cold day." },
      { v: 12, s: 1616, note: "Ger, \"foreigner\": a resident alien with no land of his own, dependent on a host. David says he lives as God's guest." },
    ],
  },
  {
    book: "psalms",
    chapter: 40,
    title: "Out of the pit, a new song",
    setting:
      "A psalm of David that begins with thanks for rescue and ends with a fresh cry for help. Verses 13 to 17 reappear almost word for word as Psalm 70. The \"pit\" pictures a muddy cistern, like the one Jeremiah was later dropped into (Jeremiah 38:6). Hebrews 10:5 to 7 quotes verses 6 to 8 as the words of Christ coming into the world to do God's will.",
    words: [
      { v: 2, s: 953, note: "Bor, \"pit\": a cistern cut into rock to hold rainwater. Empty ones became prisons, and the word also stands for the grave." },
      { v: 6, s: 3738, note: "Karah, \"opened\": literally dug. God has dug out David's ears, making him able to hear and obey. The Greek Old Testament reads \"a body You prepared\", the wording Hebrews 10:5 quotes." },
    ],
  },
  {
    book: "psalms",
    chapter: 41,
    title: "Betrayed by a friend at the table",
    setting:
      "A psalm of David and the last psalm of Book One of the Psalter, which closes with a doxology in verse 13. David lies sick while enemies wait for him to die and visitors leave to spread gossip. Worst of all, a close friend has turned on him. Some connect this with Absalom's revolt, when David's counselor Ahithophel defected (2 Samuel 15 to 17), but the psalm does not say. Jesus quotes verse 9 about Judas (John 13:18).",
    words: [
      { v: 1, s: 7919, note: "Sakhal, \"cares for\": to consider wisely, to pay thoughtful attention. Caring for the poor means thinking about their situation, not just tossing a coin." },
      { v: 9, s: 6119, note: "Aqev, \"heel\": lifting the heel pictures a kick, or a horse rearing back. It is a sudden betrayal by someone close enough to strike." },
    ],
  },
  {
    book: "psalms",
    chapter: 42,
    title: "As the deer pants for water",
    setting:
      "The first psalm of Book Two and the first of the psalms of the sons of Korah, a family of Levite singers serving at the temple (1 Chronicles 6:31 to 38). The writer is far north near the Jordan's sources and Mount Hermon, cut off from worship in Jerusalem. Psalms 42 and 43 share a refrain and were probably one poem originally. It is the cry of someone who remembers worship but cannot get there.",
    words: [
      { v: 1, s: 6165, note: "Arag, \"pants\": a rare verb for the cry or longing of a thirsty animal (Joel 1:20). The soul's thirst for God is physical and desperate." },
      { v: 5, s: 7817, note: "Shachach, \"downcast\": bowed down, sunk low. The refrain asks the soul why it is bent over." },
    ],
  },
  {
    book: "psalms",
    chapter: 43,
    title: "Send out Your light and truth",
    setting:
      "Psalm 43 has no title and repeats the refrain of Psalm 42 (\"Why are you downcast, O my soul?\"). Most scholars think the two were originally one poem, and some Hebrew manuscripts join them. Here the exiled worshipper turns from lament to request: he asks God to vindicate him against deceitful people and to lead him back to the temple. It ends with the refrain a third time.",
    words: [
      { v: 3, s: 5148, note: "Nachah, \"lead\": to guide along a road, as God led Israel through the wilderness (Exodus 13:21). Light and truth become the guides home." },
      { v: 2, s: 2186, note: "Zanach, \"rejected\": to cast off, to spurn as worthless. The worshipper feels thrown aside, yet keeps speaking to God." },
    ],
  },
  {
    book: "psalms",
    chapter: 44,
    title: "Why, when we were faithful?",
    setting:
      "A communal lament of the sons of Korah after a military disaster. It begins by recalling how God gave Israel the land, then describes a crushing defeat, then insists the nation had not been unfaithful. That claim of innocence is unusual in the Psalms. The occasion is unknown; scholars suggest several periods. Paul quotes verse 22 in Romans 8:36 to describe Christians suffering for Christ's sake.",
    words: [
      { v: 22, s: 2878, note: "Tivchah, \"slaughter\": the butchering of animals for food. God's people feel like sheep led to the butcher, not the battle." },
      { v: 23, s: 5782, note: "Ur, \"wake up\": to rouse from sleep. Israel's God never sleeps (Psalm 121:4), but this prayer dares to talk as if He were." },
    ],
  },
  {
    book: "psalms",
    chapter: 45,
    title: "A wedding song for the king",
    setting:
      "A love song of the sons of Korah composed for a royal wedding, probably of a Davidic king to a foreign princess (Tyre is mentioned). The exact king is unknown. The poet praises the groom's beauty and justice, then urges the bride to leave her old home. Verse 6 addresses the king as \"God\", and Hebrews 1:8 to 9 applies verses 6 and 7 to Christ, the Son whose throne lasts forever.",
    words: [
      { v: 1, s: 4106, note: "Mahir, \"skillful\": quick, expert. The poet's tongue moves like the pen of a practiced scribe." },
      { v: 7, s: 4886, note: "Mashach, \"anointed\": to pour oil on, the root of \"Messiah\". The king is set apart with the oil of joy." },
    ],
  },
  {
    book: "psalms",
    chapter: 47,
    title: "God is King of all the earth",
    setting:
      "A psalm of the sons of Korah, one of the enthronement psalms (with 93 and 95 to 99) that celebrate the LORD as King. It was probably sung in a festival procession, perhaps as the ark went up to the temple with shouting and ram's horns, as when David brought it to Jerusalem (2 Samuel 6:15). Strikingly, it invites all nations to clap and shout. Christians have long read it on Ascension Day.",
    words: [
      { v: 5, s: 5927, note: "Alah, \"ascended\": to go up, the verb for climbing to the temple. God goes up to His throne amid shouts of joy." },
      { v: 5, s: 7782, note: "Shophar, \"horn\": the ram's horn blown at coronations (1 Kings 1:34) and festivals. Its blast announced a king." },
    ],
  },
  {
    book: "psalms",
    chapter: 48,
    title: "The city of the great King",
    setting:
      "A song of Zion by the sons of Korah, praising Jerusalem as God's city. It recalls kings who gathered to attack and fled in panic. The event may be the Assyrian retreat of 701 BC or Jehoshaphat's victory (2 Chronicles 20), but the psalm does not say. Worshippers are told to walk around the city and count its towers so they can tell the next generation. Jesus calls Jerusalem \"the city of the great King\" (Matthew 5:35).",
    words: [
      { v: 2, s: 6828, note: "Tsaphon, \"Zaphon\": the sacred mountain where Canaanites believed Baal lived. The psalm claims Zion, not Zaphon, is where the true God reigns." },
      { v: 14, s: 5090, note: "Nahag, \"guide\": to drive or lead a flock. God shepherds His people all the way to death and through it." },
    ],
  },
  {
    book: "psalms",
    chapter: 49,
    title: "You can't take it with you",
    setting:
      "A wisdom psalm of the sons of Korah, addressed to everyone, rich and poor alike. Set to the harp as a riddle, it tackles why the wealthy seem secure. The answer: death levels everyone, and no one can buy their way out. Verse 15 is one of the clearer Old Testament hopes of life beyond death, as God takes the believer to Himself.",
    words: [
      { v: 7, s: 3724, note: "Kopher, \"ransom\": the price paid to free a life (Exodus 21:30). No amount of money buys back a soul from death." },
      { v: 15, s: 3947, note: "Laqach, \"take\": the verb used when God took Enoch (Genesis 5:24) and Elijah (2 Kings 2:3). God will take the faithful to Himself." },
    ],
  },
  {
    book: "psalms",
    chapter: 50,
    title: "God takes His people to court",
    setting:
      "A psalm of Asaph, one of David's chief musicians (1 Chronicles 16:5). It is staged like a covenant lawsuit: God summons heaven and earth as witnesses (compare Deuteronomy 32:1; Isaiah 1:2) and calls His own people to account. He does not condemn their sacrifices but their thinking that He needs them. Then He turns on those who recite His laws while living in theft, adultery and slander.",
    words: [
      { v: 5, s: 3772, note: "Karat, \"made\" a covenant: literally to cut, recalling animals cut in two at covenant making (Genesis 15:10)." },
      { v: 14, s: 8426, note: "Todah, \"thank offering\": a sacrifice offered in gratitude for God's help (Leviticus 7:12). God wants grateful hearts more than animals." },
    ],
  },
  {
    book: "psalms",
    chapter: 52,
    title: "A tongue like a razor",
    setting:
      "The title ties this psalm to 1 Samuel 21 and 22. Doeg the Edomite, Saul's chief herdsman, saw the priest Ahimelech help David at Nob and reported it to Saul. When Saul's guards refused to kill the priests, Doeg did it himself, killing 85 of them and the town's families. David addresses this \"mighty man\" who boasted in evil and contrasts him with someone rooted in God's house like an olive tree.",
    words: [
      { v: 2, s: 8593, note: "Taar, \"razor\": a sharp blade, also a scribe's knife. Doeg's words cut quickly and deeply." },
      { v: 8, s: 2132, note: "Zayit, \"olive tree\": a tree that can live for centuries and keep bearing fruit. David pictures himself planted in God's house, the opposite of being uprooted (v. 5)." },
    ],
  },
  {
    book: "psalms",
    chapter: 53,
    title: "The fool and his denial",
    setting:
      "Psalm 53 is almost the same as Psalm 14, but it uses Elohim (\"God\") instead of the LORD's personal name, as most psalms in this part of the book do. Verse 5 also differs, describing God scattering the bones of a besieging army, so it may have been adapted for a later victory. Paul quotes its words in Romans 3:10 to 12 to show that all people, Jew and Gentile, are under sin.",
    words: [
      { v: 1, s: 5036, note: "Naval, \"fool\": not someone low in intelligence but someone morally senseless, like Nabal in 1 Samuel 25, whose name means fool. His denial of God is practical: he lives as though God does not matter." },
      { v: 6, s: 7622, note: "Shevut, \"captive\" or \"fortunes\": God restoring His people means turning their situation completely around." },
    ],
  },
  {
    book: "psalms",
    chapter: 54,
    title: "When your own people betray you",
    setting:
      "The title points to 1 Samuel 23:19 and 26:1. The people of Ziph, a town in the hill country of Judah, twice told Saul where David was hiding in their wilderness. They were fellow members of David's own tribe, yet they sided with the king hunting him. This short psalm moves quickly from a cry for help to confidence and thanks.",
    words: [
      { v: 4, s: 5826, note: "Azar, \"helper\": the verb behind ezer, the word used of God as Israel's help and of the woman as a helper in Genesis 2:18. It carries no sense of inferiority; God Himself is the helper." },
      { v: 6, s: 5071, note: "Nedavah, \"freely\": a freewill offering, given beyond what the law required (Leviticus 7:16). David's thanks will be voluntary, not forced." },
    ],
  },
  {
    book: "psalms",
    chapter: 55,
    title: "Wings like a dove",
    setting:
      "A psalm of David about betrayal by a close friend, someone he once walked with to God's house. Violence fills the city, and the enemy is inside. Some connect it with Absalom's rebellion and the defection of David's trusted counselor Ahithophel (2 Samuel 15 to 17), though the psalm does not name anyone. Peter echoes its invitation to cast your burden on the LORD (1 Peter 5:7).",
    words: [
      { v: 6, s: 3123, note: "Yonah, \"dove\": a bird that flees to rocky clefts and wilderness cliffs. David longs to fly away from the pressure." },
      { v: 22, s: 3053, note: "Yehav, \"burden\": a rare word meaning what has been given to you, your lot or load. Whatever life has handed you can be handed to God." },
    ],
  },
  {
    book: "psalms",
    chapter: 56,
    title: "Tears in God's bottle",
    setting:
      "A miktam of David, a title of uncertain meaning, perhaps an inscription or a carefully crafted poem. It looks back to the time the Philistines seized David at Gath (1 Samuel 21:10 to 15), the same episode behind Psalm 34. Hunted by Saul and trapped among enemies, David repeats a refrain of trust twice: \"In God I trust; I will not be afraid.\" The tune name, \"A Dove on Distant Oaks\", fits a man far from home.",
    words: [
      { v: 8, s: 4997, note: "Nod, \"bottle\": a leather skin for water or wine. God keeps David's tears like something precious." },
      { v: 8, s: 5112, note: "Nod, \"wanderings\": the same sound as the word for bottle. God has counted every restless step David has taken as a fugitive." },
    ],
  },
  {
    book: "psalms",
    chapter: 57,
    title: "Shelter in the cave",
    setting:
      "The title places this psalm when David hid from Saul in a cave, either at Adullam (1 Samuel 22:1) or En Gedi, where he spared Saul's life (1 Samuel 24). The tune \"Do Not Destroy\" may echo David's words refusing to kill Saul (1 Samuel 26:9), though that is uncertain. The psalm moves from hiding to singing, and verses 7 to 11 reappear in Psalm 108.",
    words: [
      { v: 2, s: 1584, note: "Gamar, \"fulfills\": to complete or bring to an end. God finishes what He has started for David, even in a cave." },
      { v: 8, s: 7837, note: "Shachar, \"dawn\". David will wake the dawn with music rather than wait for the sun to wake him." },
    ],
  },
  {
    book: "psalms",
    chapter: 58,
    title: "Is there a God who judges?",
    setting:
      "A miktam of David set to the tune \"Do Not Destroy\". It confronts rulers who twist justice, then calls on God to break their power in startling, even graphic, images. It is one of the imprecatory psalms. Christians differ on how to pray such words, but all agree the psalm voices a cry that injustice will not have the last word. It ends with people confessing that God judges the earth.",
    words: [
      { v: 11, s: 8199, note: "Shaphat, \"judges\": to govern and set things right, not only to pass sentence. The earth has a Judge who will put wrongs right." },
      { v: 10, s: 5359, note: "Naqam, \"avenged\": vengeance that belongs to God as the rightful Judge (Deuteronomy 32:35). The righteous do not take it; they see it." },
    ],
  },
  {
    book: "psalms",
    chapter: 59,
    title: "Watched in the night",
    setting:
      "The title points to 1 Samuel 19:11 to 17. Saul sent men to watch David's house and kill him in the morning. David's wife Michal, Saul's daughter, let him down through a window and put an idol in his bed to buy time. The psalm pictures enemies prowling the city like dogs at night, and ends with a song in the morning.",
    words: [
      { v: 6, s: 3611, note: "Kelev, \"dogs\": in Israel mostly wild scavengers roaming in packs, not pets. Calling enemies dogs was a strong insult." },
      { v: 9, s: 8104, note: "Shamar, \"keep watch\": the same verb as Saul's men watching David's house in the title. David answers their watch with his own: he watches for God." },
    ],
  },
  {
    book: "psalms",
    chapter: 60,
    title: "Shaken, then sent out",
    setting:
      "The title links this psalm to David's wars with the Arameans and Edom (2 Samuel 8; 1 Chronicles 18). The numbers there differ (18,000 rather than 12,000) and credit David or Abishai, which may reflect separate counts of one campaign. The psalm laments a defeat that apparently came during those wars, recalls God's promise to own the land, and asks for help. Verses 5 to 12 reappear in Psalm 108.",
    words: [
      { v: 4, s: 5251, note: "Nes, \"banner\": a standard raised on a pole to rally troops. God's banner gives His people a place to gather." },
      { v: 8, s: 5275, note: "Naal, \"sandal\": throwing a sandal over land claimed ownership (compare Ruth 4:7). God claims Edom as His." },
    ],
  },
  {
    book: "psalms",
    chapter: 61,
    title: "A prayer from the ends of the earth",
    setting:
      "A psalm of David, probably prayed while he was far from Jerusalem, perhaps when Absalom's revolt drove him across the Jordan (2 Samuel 15 to 17). \"The ends of the earth\" can mean great distance or the feeling of standing at the edge of life. Verses 6 and 7 pray for the king, so Israel kept singing it as a prayer for David's line, and later readers heard in it the hope of a King whose reign never ends.",
    words: [
      { v: 2, s: 6697, note: "Tsur, \"rock\": a high crag of stone that served as a natural fortress. David asks to be led to a rock he cannot climb by himself." },
      { v: 4, s: 5643, note: "Seter, \"shelter\" or \"hiding place\": a covered, secret spot. Under God's wings David is out of his enemies' sight." },
    ],
  },
  {
    book: "psalms",
    chapter: 62,
    title: "Waiting quietly for God alone",
    setting:
      "A psalm of David, written \"according to Jeduthun\", one of the Levite musicians David appointed to lead worship (1 Chronicles 16:41). David faces people who bless him to his face and curse him in private while they plot to topple him from his high position. Many link it to the conspiracy behind Absalom's revolt. His answer is not a counter-plot but a settled stillness before God.",
    words: [
      { v: 1, s: 1747, note: "Dumiyyah, \"rest\" or \"silence\". Literally \"toward God alone my soul is silence\": a soul that has stopped arguing and simply waits." },
      { v: 9, s: 1892, note: "Hevel, \"vapor\" or \"breath\", the key word of Ecclesiastes. Put on God's scale, rich and poor alike weigh less than a breath." },
    ],
  },
  {
    book: "psalms",
    chapter: 63,
    title: "Thirsty in the wilderness of Judah",
    setting:
      "The title places David in the Wilderness of Judah, the barren hills between Jerusalem and the Dead Sea, where he hid from Saul and later fled from Absalom (2 Samuel 15:23). Verse 11 calls him \"the king\", which fits the flight from Absalom. Water there is scarce and the heat is fierce. Early Christians sang this psalm at morning prayer, and many still pray it at the start of the day.",
    words: [
      { v: 1, s: 7836, note: "Shachar, \"earnestly seek\". It sounds like the word for dawn, and many hear in it \"I seek You at daybreak\": eagerly, and first." },
      { v: 8, s: 1692, note: "Davaq, \"cling\", the verb of Genesis 2:24 where a husband holds fast to his wife. David's soul sticks close to God, and God's hand holds him." },
    ],
  },
  {
    book: "psalms",
    chapter: 64,
    title: "When words become weapons",
    setting:
      "A psalm of David about a hidden conspiracy. His enemies meet in secret, sharpen their tongues like swords and shoot words like arrows from ambush. In a royal court a whispered accusation could ruin or kill a man, and David knew that from Saul's court and from rebels in his own. The psalm does not answer slander with slander. It hands the case to God, whose arrows fly just as suddenly.",
    words: [
      { v: 3, s: 8150, note: "Shanan, \"sharpen\": to whet a blade. The slanderers prepare their words as carefully as a soldier sharpens a sword." },
      { v: 7, s: 6597, note: "Pitom, \"suddenly\", the same word used for the attackers' shots in verse 4. What they did to the innocent, God does to them." },
    ],
  },
  {
    book: "psalms",
    chapter: 65,
    title: "A harvest song for the God of all the earth",
    setting:
      "A psalm of David that reads like a harvest song, probably sung at the temple when Israel came to keep vows and give thanks after the rains. Farmers in Israel depended on the autumn and spring rains, and a dry year meant hunger. The psalm moves outward from forgiveness in Zion, to God's rule over mountains, seas and nations, and finally to fields soaked with rain and hills dressed in grain.",
    words: [
      { v: 9, s: 6388, note: "Peleg, \"stream\" or \"channel\". Canaan's people credited the storm god Baal with rain; this psalm says the streams are God's." },
      { v: 11, s: 5849, note: "Atar, \"crown\": to surround with a wreath. God rings the whole year with His goodness, from planting to harvest." },
    ],
  },
  {
    book: "psalms",
    chapter: 66,
    title: "Come and see what God has done",
    setting:
      "An anonymous psalm of praise that starts with all the earth, narrows to Israel's story and ends with one worshiper. Verse 6 recalls the crossings of the Red Sea and the Jordan. Verses 10 to 12 look back on a time of national testing, perhaps an invasion or siege, though no one knows which. Then a single voice arrives at the temple with offerings, ready to keep the vows made in distress.",
    words: [
      { v: 10, s: 6884, note: "Tsaraph, \"refine\": to smelt metal in a furnace so the waste separates out. Israel's hard years are pictured as silver in the fire." },
      { v: 16, s: 5608, note: "Saphar, \"declare\": to count or recount, to tell the story in order. The worshiper turns his own rescue into testimony." },
    ],
  },
  {
    book: "psalms",
    chapter: 67,
    title: "Blessed so the nations will know",
    setting:
      "A short song for the whole congregation, possibly sung at a harvest festival, since verse 6 says the earth has yielded its harvest. Its opening line borrows the priestly blessing of Numbers 6:24 to 26, which Aaron's sons spoke over Israel. But the psalm turns that blessing outward. Israel asks to be blessed so that every nation will come to know God's ways and praise Him.",
    words: [
      { v: 1, s: 215, note: "Or, \"shine\": to give light. A shining face meant favor and delight, the opposite of a face turned away in anger." },
      { v: 4, s: 4334, note: "Mishor, \"justly\": literally level ground, a plain. God rules the nations on straight and even terms, with no rigged scales." },
    ],
  },
  {
    book: "psalms",
    chapter: 68,
    title: "God marches from Sinai to Zion",
    setting:
      "A psalm of David, often linked to the day the ark was carried up to Jerusalem (2 Samuel 6). It is a victory march: God sets out from Sinai, leads His people through the wilderness, scatters kings and climbs Zion with captives in His train. Its Hebrew is among the hardest in the Psalms, full of rare words and sudden shifts. Verse 1 echoes Moses' cry whenever the ark set out (Numbers 10:35).",
    words: [
      { v: 4, s: 7392, note: "Rakhav, \"ride\". Canaan's storm god Baal was praised as the rider on the clouds. The psalm gives that title to the LORD alone." },
      { v: 5, s: 1781, note: "Dayyan, \"defender\" or \"judge\": one who pleads a case in court. The mighty God of the march is also the advocate of widows." },
    ],
  },
  {
    book: "psalms",
    chapter: 69,
    title: "Drowning and despised for God's sake",
    setting:
      "A psalm of David, prayed by someone sinking under hatred he did not earn. His zeal for God has cost him his family's respect and made him the joke of the town gate and the drinking songs. The New Testament quotes this psalm more than almost any other and applies it to Jesus: His zeal for the temple, His enemies' baseless hatred and the sour wine offered to Him at the cross.",
    words: [
      { v: 9, s: 7068, note: "Qinah, \"zeal\" or \"jealousy\": burning, protective passion. The disciples remembered this verse when Jesus cleared the temple (John 2:17)." },
      { v: 21, s: 2558, note: "Chomets, \"vinegar\": sour wine, the cheap drink of laborers and soldiers. At the cross Jesus was offered exactly this (John 19:28 to 30)." },
    ],
  },
  {
    book: "psalms",
    chapter: 70,
    title: "An emergency prayer",
    setting:
      "A psalm of David that is nearly identical to the last five verses of Psalm 40. Someone, perhaps David himself, lifted that ending out and reused it as a short, urgent prayer. The title \"to bring remembrance\" may connect it with the memorial portion of an offering, when worshipers asked God to remember them (Leviticus 2:2). It is the prayer of someone who has no time for long speeches.",
    words: [
      { v: 1, s: 2363, note: "Chush, \"hurry\": make haste, rush. The word frames the psalm, \"hurry to help me\" in verse 1 and \"hurry to me\" in verse 5." },
      { v: 5, s: 309, note: "Achar, \"delay\": to linger or be late. The psalm ends not with calm but with an honest plea: do not be late." },
    ],
  },
  {
    book: "psalms",
    chapter: 71,
    title: "A prayer for old age",
    setting:
      "A psalm with no title, prayed by an older believer and possibly written by David in his last years. It opens with lines borrowed from Psalm 31. The speaker has trusted God since birth, now faces enemies who say God has abandoned him, and asks not to be cast aside when his strength fails. His great wish is to live long enough to tell the next generation what God has done.",
    words: [
      { v: 18, s: 7872, note: "Sevah, \"gray hair\" or old age. In Israel gray hair was a crown of honor (Proverbs 16:31), not something to hide." },
      { v: 6, s: 5564, note: "Samakh, \"lean on\": to rest your weight on something, as a priest laid his hand on an offering. The psalmist has leaned on God since before he could stand." },
    ],
  },
  {
    book: "psalms",
    chapter: 72,
    title: "A prayer for the king's justice",
    setting:
      "Titled \"of Solomon\", this psalm is a prayer for Israel's king, perhaps from Solomon's coronation or from David praying for his son (compare 1 Kings 3:9). It paints the ideal king: just to the poor, ruling from sea to sea, honored by distant nations. No king of Israel fully matched it. Verses 18 and 19 are the doxology that closes Book Two of the Psalms, and verse 20 marks the end of David's collection.",
    words: [
      { v: 6, s: 1488, note: "Gez, \"freshly cut grass\": a mown field. A good king refreshes his people like rain falling on a field after the first cutting." },
      { v: 14, s: 3365, note: "Yaqar, \"precious\": costly, rare, highly valued. The lives of the poor are worth something to this king." },
    ],
  },
  {
    book: "psalms",
    chapter: 73,
    title: "When the wicked seem to win",
    setting:
      "The first of eleven psalms of Asaph (73 to 83) that open Book Three. Asaph was a Levite worship leader in David's day, and his name was carried on by a guild of temple singers after him. This is a wisdom psalm. It honestly confesses envy of the prosperous wicked, then tells how one visit to God's sanctuary changed the way the writer saw everything.",
    words: [
      { v: 17, s: 319, note: "Acharit, \"end\": the final outcome, how things turn out. In the sanctuary Asaph stopped judging the story from the middle." },
      { v: 26, s: 2506, note: "Cheleq, \"portion\": a share of land. The priests received no land in Israel because the LORD Himself was their portion (Numbers 18:20)." },
    ],
  },
  {
    book: "psalms",
    chapter: 74,
    title: "Lament over a burned temple",
    setting:
      "A community lament from the singers of Asaph's line. It describes enemy soldiers hacking at the temple's carved woodwork with axes and burning the sanctuary to the ground. Most scholars connect it with the Babylonian destruction of Jerusalem in 586 BC (2 Kings 25:9), though some suggest other attacks. Israel has no prophet and no sign, and no one knows how long God's silence will last.",
    words: [
      { v: 4, s: 4150, note: "Moed, \"meeting place\": the appointed place where God met His people, the word behind \"tent of meeting.\" The enemy now roars in the spot where Israel heard God." },
      { v: 9, s: 226, note: "Ot, \"sign\": a visible token of God's presence or word. The enemies raise their own signs while God's signs have gone silent." },
    ],
  },
  {
    book: "psalms",
    chapter: 75,
    title: "God chooses the time to judge",
    setting:
      "A psalm of Asaph that answers the cry of Psalm 74. There Israel asked how long God would stay silent. Here God Himself speaks: \"When I choose a time, I will judge fairly.\" The tune name \"Do Not Destroy\" also heads Psalms 57 to 59. The psalm's warnings are aimed at the proud, people who think power and promotion come from their own hands.",
    words: [
      { v: 4, s: 7161, note: "Qeren, \"horn\": an animal's horn, a picture of strength and status. To lift your horn is to strut and boast." },
      { v: 8, s: 3563, note: "Kos, \"cup\". In the prophets the cup of God's wrath pictures judgment (Jeremiah 25:15). Jesus prayed that this cup might pass from Him (Matthew 26:39)." },
    ],
  },
  {
    book: "psalms",
    chapter: 76,
    title: "The God who broke the weapons",
    setting:
      "A psalm of Asaph celebrating a victory near Jerusalem, here called Salem, its ancient name (Genesis 14:18). The Greek translation's title links it to the Assyrians, and many think of 701 BC, when Sennacherib's army surrounded Jerusalem and was struck down in one night (2 Kings 19:35). Whatever the battle, the soldiers sleep their last sleep without lifting a hand. The victory belongs to God alone.",
    words: [
      { v: 2, s: 5520, note: "Sokh, \"tent\" or \"lair\": a shelter of branches, also used of a lion's den (Jeremiah 25:38). God dwells in Zion like a lion in its lair." },
      { v: 3, s: 7565, note: "Resheph, \"flaming arrows\": literally flashes or sparks. Resheph was also the name of a Canaanite god of plague and war, and some hear a jab at him here." },
    ],
  },
  {
    book: "psalms",
    chapter: 77,
    title: "Remembering in the dark",
    setting:
      "A psalm of Asaph, written \"according to Jeduthun\", a Levite worship leader. It is a lament with no stated occasion, though it may come from a time of national disaster. The writer cannot sleep and refuses to be comforted. Halfway through he turns from replaying his pain to remembering God's deeds, above all the exodus, when God led His people through the sea like a flock.",
    words: [
      { v: 11, s: 2142, note: "Zakhar, \"remember\": not only recalling facts but deliberately bringing them to mind. In verse 3 remembering made him groan. In verse 11 he chooses what to remember." },
      { v: 19, s: 6119, note: "Aqev, \"footprints\": heel marks or tracks. God walked through the sea, but His prints vanished behind Him. He was present without being seen." },
    ],
  },
  {
    book: "psalms",
    chapter: 78,
    title: "Don't forget what God has done",
    setting:
      "The second longest psalm, a teaching psalm of Asaph that retells Israel's history from Egypt to King David. It was written to be passed from parents to children so that each generation would learn from its ancestors' failures. It singles out the northern tribe of Ephraim, whose sanctuary at Shiloh was lost (1 Samuel 4), and ends with God choosing Judah, Mount Zion and David the shepherd.",
    words: [
      { v: 2, s: 4912, note: "Mashal, \"parable\": a saying built on comparison, a proverb. Matthew 13:35 quotes this verse to explain why Jesus taught in parables." },
      { v: 72, s: 8537, note: "Tom, \"integrity\": wholeness, a heart that is not divided. David shepherded Israel with a whole heart and skillful hands." },
    ],
  },
  {
    book: "psalms",
    chapter: 79,
    title: "Jerusalem in ruins",
    setting:
      "A psalm of Asaph mourning the fall of Jerusalem. The temple is defiled, the city is rubble and the dead lie unburied. Most scholars connect it with the Babylonian destruction of 586 BC, and the singers of Asaph's line kept it for the survivors. It is a companion to Psalm 74, and Jeremiah 10:25 repeats verses 6 and 7 almost word for word.",
    words: [
      { v: 2, s: 2623, note: "Chasid, \"saint\": a faithful one, someone who answers God's covenant love (chesed) with loyalty. The unburied dead are God's own loyal people." },
      { v: 11, s: 616, note: "Assir, \"captive\": a prisoner. The groaning of those taken away to Babylon is the prayer this psalm asks God to hear." },
    ],
  },
  {
    book: "psalms",
    chapter: 80,
    title: "Restore us, Shepherd of Israel",
    setting:
      "A psalm of Asaph that prays for the northern tribes of Ephraim, Benjamin and Manasseh. Many scholars place it in the years when Assyria crushed the northern kingdom, ending with Samaria's fall in 722 BC (2 Kings 17). Its refrain comes three times and grows each time: \"Restore us, O God\", then \"O God of Hosts\", then \"O LORD God of Hosts\". Israel is pictured as a vine God brought out of Egypt.",
    words: [
      { v: 8, s: 1612, note: "Gephen, \"vine\". Isaiah 5 also pictures Israel as God's vine. Jesus said, \"I am the true vine\" (John 15:1)." },
      { v: 13, s: 2386, note: "Chazir, \"boar\": a wild pig, an unclean animal to Israel. Foreign armies are pictured as wild boars tearing up God's vineyard." },
    ],
  },
  {
    book: "psalms",
    chapter: 81,
    title: "A festival call to listen",
    setting:
      "A psalm of Asaph written for one of Israel's festivals, most likely the Feast of Tabernacles in the seventh month, which opened with trumpet blasts at the new moon and began at the full moon (Leviticus 23:24, 34). It starts with music and celebration. Then God Himself speaks, recalling the exodus and pleading with His people to listen. Jewish tradition still sings it at the New Year.",
    words: [
      { v: 3, s: 7782, note: "Shophar, \"ram's horn\": a curved horn blown to gather the people, announce feasts and sound alarms. It is still blown in synagogues at the Jewish New Year." },
      { v: 6, s: 1731, note: "Dud, \"basket\": a basket or pot for carrying loads. Egyptian tomb paintings show laborers hauling clay for bricks this way. God lifted that load off Israel's shoulders." },
    ],
  },
  {
    book: "psalms",
    chapter: 82,
    title: "God judges the judges",
    setting:
      "A psalm of Asaph set in a heavenly courtroom. God stands in \"the divine assembly\" and condemns the \"gods\" for judging unjustly and ignoring the poor. Christians differ on who these \"gods\" are: human judges and rulers who stand in God's place, spiritual powers over the nations, or both. Jesus quoted verse 6 in a debate about His claim to be the Son of God (John 10:34 to 36).",
    words: [
      { v: 3, s: 1800, note: "Dal, \"weak\": poor, thin, low. A court's first duty is to the people with the least power." },
      { v: 5, s: 4144, note: "Mosad, \"foundation\". When justice fails, the foundations of the earth shake, because God built His world on righteousness." },
    ],
  },
  {
    book: "psalms",
    chapter: 83,
    title: "When the nations conspire",
    setting:
      "The last psalm of Asaph. Ten peoples around Israel form an alliance to wipe its name from memory. No event in the historical books matches this exact list, so it may describe a coalition we no longer know about, or gather Israel's old enemies into one picture. The psalm asks God to repeat His victories from the days of the judges: Gideon over Midian and Deborah and Barak over Sisera (Judges 4 to 8).",
    words: [
      { v: 1, s: 1824, note: "Demi, \"silence\" or rest. The psalm opens with three ways of saying the same thing: God, do not stay quiet." },
      { v: 3, s: 6845, note: "Tsaphan, \"cherish\": to hide or treasure, as you store something valuable out of sight. The enemies plot against the people God keeps hidden like treasure." },
    ],
  },
  {
    book: "psalms",
    chapter: 84,
    title: "Longing for God's house",
    setting:
      "A psalm of the sons of Korah, a family of Levites who served as temple singers and gatekeepers (1 Chronicles 9:19). It is a pilgrim song for worshipers traveling to Jerusalem for the great festivals. The writer envies the birds nesting near the altar and the people who serve in God's house every day. Along the road, dry valleys become springs as the pilgrims draw closer to Zion.",
    words: [
      { v: 6, s: 1056, note: "Bakah (Baca), a valley name that may mean \"weeping\" or refer to balsam trees that grow in dry ground. Either way it was a hard stretch of road, and God's travelers turn it into springs." },
      { v: 10, s: 5605, note: "Saphaph, \"be a doorkeeper\": literally to stand at the threshold. The Korahites really were gatekeepers, so this was humble, real work." },
    ],
  },
  {
    book: "psalms",
    chapter: 85,
    title: "Revive us again",
    setting:
      "A psalm of the sons of Korah, probably from the years after the return from exile in Babylon. Verses 1 to 3 thank God for bringing His people home and forgiving them. Yet life back in the land was hard, with poor harvests and ruined cities (Haggai 1:6). So the psalm moves from thanks for past restoration to a plea for restoration again, then listens for God's answer.",
    words: [
      { v: 10, s: 6298, note: "Pagash, \"meet\": to come face to face, sometimes unexpectedly. Loyal love and faithfulness meet like old friends on a road." },
      { v: 10, s: 5401, note: "Nashaq, \"kiss\": the greeting of family and friends. Righteousness and peace, so often at odds, embrace." },
    ],
  },
  {
    book: "psalms",
    chapter: 86,
    title: "A servant's prayer in trouble",
    setting:
      "The only psalm \"of David\" in Book Three. It is woven from phrases found in other psalms and in Exodus, like a believer praying in the words he knows best. At its heart is God's own description of Himself to Moses at Sinai (Exodus 34:6): compassionate, gracious, slow to anger, abounding in loving devotion and faithfulness. The occasion is unknown, but arrogant and ruthless men are seeking David's life.",
    words: [
      { v: 11, s: 3161, note: "Yachad, \"undivided\": literally \"unite my heart.\" David asks God to gather his scattered loyalties into one." },
      { v: 16, s: 519, note: "Amah, \"maidservant\". \"The son of Your maidservant\" means someone born into the household, a servant from birth." },
    ],
  },
  {
    book: "psalms",
    chapter: 87,
    title: "Born in Zion",
    setting:
      "A short and puzzling psalm of the sons of Korah. It celebrates Jerusalem as the city God loves, then names Israel's old enemies, Egypt (called \"Rahab\"), Babylon, Philistia, Tyre and Cush, and says each will be counted as born in Zion. Scholars are unsure when it was written. Its vision is unmistakable: foreigners enrolled as full citizens of God's city.",
    words: [
      { v: 4, s: 7293, note: "Rahav, \"Rahab\": a poetic name for Egypt meaning \"proud\" or \"arrogant\", not the woman of Jericho. Israel's first oppressor is listed among God's children." },
      { v: 6, s: 3789, note: "Katav, \"register\": to write or enroll. God Himself writes the nations into the city's citizen roll." },
    ],
  },
  {
    book: "psalms",
    chapter: 88,
    title: "The darkest psalm",
    setting:
      "A teaching psalm of Heman the Ezrahite, a famous wise man (1 Kings 4:31) and possibly the Levite singer of David's time (1 Chronicles 15:19), though these may be two different men. Almost every lament in the Psalms turns toward hope before it ends. This one does not. It closes on the word \"darkness.\" Its place in Scripture tells sufferers that God has room for prayers that end without resolution.",
    words: [
      { v: 5, s: 2670, note: "Chophshi, \"forsaken\": usually \"free\", the word for a released slave. Here it is bitter: set free among the dead, released from life itself." },
      { v: 18, s: 4285, note: "Machshakh, \"darkness\": a dark place. In Hebrew the psalm's last word is darkness, which the psalmist calls his closest companion." },
    ],
  },
  {
    book: "psalms",
    chapter: 89,
    title: "Has God broken His promise to David?",
    setting:
      "A teaching psalm of Ethan the Ezrahite, a wise man of Solomon's day (1 Kings 4:31). It spends 37 verses celebrating God's covenant with David (2 Samuel 7), then turns sharply: the king is defeated and his crown lies in the dust. Scholars debate the occasion. Some point to an early invasion of Judah, many to the end of David's dynasty at the exile. Verse 52 closes Book Three of the Psalms.",
    words: [
      { v: 3, s: 1285, note: "Berit, \"covenant\": a binding agreement sealed by oath. God's covenant with David promised an everlasting throne." },
      { v: 37, s: 5707, note: "Ed, \"witness\". The moon is called a faithful witness in the sky: every night it testifies that God's oath still stands." },
    ],
  },
  {
    book: "psalms",
    chapter: 90,
    title: "Teach us to number our days",
    setting:
      "The only psalm credited to Moses, which would make it perhaps the oldest in the book. It opens Book Four of the Psalms right after the crisis of Psalm 89, reaching back before David to Moses and before Moses to creation. Its reflections fit the wilderness years, when a whole generation died under God's judgment (Numbers 14:29 to 35). It sets God's eternity beside our brief, fragile lives.",
    words: [
      { v: 1, s: 4583, note: "Maon, \"dwelling place\": a home or den. For a people who wandered forty years with no house, God Himself was home." },
      { v: 17, s: 5278, note: "Noam, \"favor\": beauty, pleasantness, delight. The same word is the LORD's \"beauty\" in Psalm 27:4." },
    ],
  },
  {
    book: "psalms",
    chapter: 91,
    title: "Shelter under the Almighty",
    setting:
      "Psalm 91 has no title, but Jewish tradition linked it to Moses because it follows his prayer in Psalm 90. It is a psalm of trust that shifts between voices: a believer's confession (v. 2), a teacher's assurance spoken to \"you\", and finally God Himself (vv. 14 to 16). The dangers it names, plague, night terrors, arrows and wild beasts, were the everyday fears of farmers, travelers and soldiers in the ancient world.",
    words: [
      { v: 1, s: 5643, note: "Seter, \"shelter\" or \"secret place\": a hidden, covered spot. The one who dwells there lives where danger cannot see in." },
      { v: 4, s: 3671, note: "Kanaph, \"wing\": a mother bird covering her young. Ruth 2:12 uses the same word for taking refuge under God's wings." },
    ],
  },
  {
    book: "psalms",
    chapter: 92,
    title: "A song for the Sabbath",
    setting:
      "This is the only psalm whose title assigns it to a particular day, the Sabbath. Later Jewish sources record that the Levites sang a set psalm each day at the temple, and Psalm 92 was the Sabbath song. It fits the day: rest becomes time to remember God's works, to praise His love morning and night, and to settle the nagging question of why the wicked seem to prosper.",
    words: [
      { v: 12, s: 8558, note: "Tamar, \"palm tree\": the date palm bears fruit for decades and thrives in desert heat. Palms were carved on the temple walls (1 Kings 6:29)." },
      { v: 14, s: 5107, note: "Nuv, \"bear fruit\": to sprout and produce. The righteous are still fruitful in old age, when strength fades." },
    ],
  },
  {
    book: "psalms",
    chapter: 93,
    title: "The LORD reigns above the flood",
    setting:
      "Psalm 93 opens a group of royal psalms (93 and 95 to 99) that celebrate the LORD as King. In the ancient Near East the sea stood for chaos, and Canaanite myths told of the storm god Baal defeating Yam, the Sea, to win his throne. Israel's poets used that language to make a sharp point: the LORD never had to win a throne. His was established long ago, and the roaring waters rise beneath Him.",
    words: [
      { v: 1, s: 4427, note: "Malakh, \"reign\" or \"be king\". The cry \"The LORD reigns\" can also be read \"The LORD has become King,\" the shout heard at a coronation." },
      { v: 3, s: 5104, note: "Nahar, \"river\" or \"flood\". Repeated three times, the rising waters echo waves pounding the shore." },
    ],
  },
  {
    book: "psalms",
    chapter: 94,
    title: "The Judge of the earth",
    setting:
      "This lament protests injustice, probably inside Israel itself. Those crushing \"Your people\" (v. 5) seem to be corrupt leaders who use courts and laws (\"by decree,\" v. 20) to harm the widow, the foreigner and the orphan, the very groups God's Law protected (Deuteronomy 24:17). The psalmist appeals over the crooked judges to the Judge of all the earth.",
    words: [
      { v: 1, s: 5360, note: "Neqamah, \"vengeance\": not personal spite but a ruler setting wrong right. Scripture reserves it for God (Deuteronomy 32:35)." },
      { v: 19, s: 8312, note: "Saraph, \"anxiety\" or \"disquieting thoughts\". The word is related to \"branches,\" picturing worries that split and multiply." },
    ],
  },
  {
    book: "psalms",
    chapter: 95,
    title: "Come, let us worship",
    setting:
      "For centuries Psalm 95 has opened morning worship; church tradition calls it the Venite, from its first Latin word, \"Come.\" It moves from joyful invitation to sober warning. The closing verses recall Massah and Meribah, where Israel, freshly freed from Egypt, quarreled over water and tested God (Exodus 17; Numbers 20). That whole generation died in the wilderness.",
    words: [
      { v: 6, s: 1288, note: "Barakh, \"kneel\", from the same root as \"bless\". Blessing and bending the knee were closely linked." },
      { v: 11, s: 4496, note: "Menuchah, \"rest\": the settled place where a journey ends. For Israel it meant the land; Hebrews 4 points to a deeper rest in God." },
    ],
  },
  {
    book: "psalms",
    chapter: 96,
    title: "A new song for all the earth",
    setting:
      "Much of this psalm also appears in 1 Chronicles 16:23 to 33, sung when David brought the ark of the covenant into Jerusalem. It is a missionary psalm: the call to sing goes out to \"all the earth\" and \"the families of the nations,\" not only Israel. In a world where every nation had its own gods, the psalm dares to call those gods nothing.",
    words: [
      { v: 5, s: 457, note: "Elil, \"idol\", literally \"nothing\" or \"worthless thing\". It sounds like Elohim, \"God\": the gods of the nations are no-gods." },
      { v: 2, s: 1319, note: "Basar, \"proclaim good news\". The Greek translation used euangelizo, the verb behind our word \"gospel\"." },
    ],
  },
  {
    book: "psalms",
    chapter: 97,
    title: "Clouds, fire and a righteous throne",
    setting:
      "Another royal psalm that begins \"The LORD reigns.\" Its picture of God's arrival borrows from Mount Sinai: clouds, thick darkness, fire, lightning and trembling mountains (Exodus 19:16 to 18). The call to rejoice reaches the \"distant shores,\" the farthest coastlands Israel knew. The psalm ends by turning to God's people with a charge to hate evil and rejoice in the LORD.",
    words: [
      { v: 2, s: 6205, note: "Araphel, \"thick darkness\": the dense cloud where God was on Sinai (Exodus 20:21). God is near but not fully seen." },
      { v: 11, s: 2232, note: "Zara, \"sow\". Literally \"light is sown for the righteous,\" scattered like seed that will spring up in time." },
    ],
  },
  {
    book: "psalms",
    chapter: 98,
    title: "Joy to the world",
    setting:
      "Psalm 98 is close kin to Psalm 96 and echoes Isaiah's promise that \"all the ends of the earth will see the salvation of our God\" (Isaiah 52:10). The orchestra grows as the psalm goes: voices, lyres, trumpets, the ram's horn, then the sea, the rivers and the mountains. Isaac Watts paraphrased it in 1719 as \"Joy to the World,\" a hymn about Christ coming as King and Judge.",
    words: [
      { v: 1, s: 2220, note: "Zeroa, \"arm\": strength in action. God's holy arm won the victory without human help, as at the Red Sea (Exodus 15:16)." },
      { v: 8, s: 4222, note: "Maach, \"clap\". The rivers clap their hands like a crowd greeting a king on his way into the city." },
    ],
  },
  {
    book: "psalms",
    chapter: 99,
    title: "Holy is the King",
    setting:
      "This is the last of the royal psalms that open \"The LORD reigns.\" Its refrain, \"He is holy,\" rings three times (vv. 3, 5, 9), like the seraphim's \"Holy, holy, holy\" in Isaiah 6:3. God is enthroned above the cherubim, the golden figures on the lid of the ark of the covenant in the Most Holy Place. Moses, Aaron and Samuel are named as leaders who called on Him and were answered.",
    words: [
      { v: 1, s: 3742, note: "Keruv, \"cherub\": a winged guardian. Two golden cherubim on the ark formed God's throne on earth (Exodus 25:22)." },
      { v: 5, s: 1916, note: "Hadom, \"footstool\". The ark was called God's footstool (1 Chronicles 28:2): heaven is His throne, and His feet rest among His people." },
    ],
  },
  {
    book: "psalms",
    chapter: 100,
    title: "Enter His gates with thanksgiving",
    setting:
      "Its title calls it a psalm \"of thanksgiving,\" likely sung as worshipers came to the temple with a thank offering (Leviticus 7:12). In five verses it moves from the whole earth's shout to the gates and courts of God's house. William Kethe's paraphrase, \"All People That on Earth Do Dwell\" (about 1561), gave its name to the tune Old Hundredth, still sung with the Doxology.",
    words: [
      { v: 4, s: 8426, note: "Todah, \"thanksgiving\": both a song of thanks and the thank offering itself. In Israel thanks was public and often came with a gift." },
      { v: 3, s: 6629, note: "Tson, \"sheep\" or \"flock\". The King of all the earth speaks of His people as a flock He personally tends." },
    ],
  },
  {
    book: "psalms",
    chapter: 101,
    title: "A king's vow of integrity",
    setting:
      "A royal pledge, credited to David: the king vows to rule with integrity, starting in his own home and court. He promises to keep slanderers, the arrogant and liars out of his palace and to favor the faithful. Many think a king spoke these words at his coronation or a yearly renewal. The question \"When will You come to me?\" (v. 2) may echo David's longing to bring the ark to Jerusalem (2 Samuel 6:9).",
    words: [
      { v: 2, s: 8537, note: "Tom, \"integrity\": wholeness, being the same person in private as in public. David pledges it \"in my house,\" away from public view." },
      { v: 3, s: 1100, note: "Belial, \"worthless thing\": something without value. In the New Testament Belial became a name for Satan (2 Corinthians 6:15)." },
    ],
  },
  {
    book: "psalms",
    chapter: 102,
    title: "The prayer of the afflicted",
    setting:
      "The title is unique: \"A prayer of one who is afflicted, when he grows faint.\" It names no author, so anyone in distress can pray it. The sufferer's own pain, fever, sleeplessness and loneliness, is woven together with grief over Zion lying in rubble, which suggests the exile after Babylon destroyed Jerusalem in 586 BC. Church tradition counts it among the seven penitential psalms.",
    words: [
      { v: 6, s: 6893, note: "Qaat, a desert bird, perhaps an owl or pelican; its exact identity is uncertain. It was an unclean bird of desolate places (Leviticus 11:18)." },
      { v: 7, s: 909, note: "Badad, \"alone\" or \"solitary\": a lone bird on a rooftop, awake while everyone else sleeps." },
    ],
  },
  {
    book: "psalms",
    chapter: 103,
    title: "Bless the LORD, O my soul",
    setting:
      "A psalm of David that asks for nothing; it only blesses. It begins and ends with David speaking to his own soul, then widens to all Israel, the angels and all creation. At its center is the description God gave of Himself to Moses after the golden calf: \"compassionate and gracious, slow to anger, abounding in loving devotion\" (Exodus 34:6), quoted in verse 8.",
    words: [
      { v: 2, s: 1576, note: "Gemul, \"benefits\" or \"dealings\": what God has done toward you. David orders his soul to forget none of them." },
      { v: 14, s: 3336, note: "Yetser, \"frame\" or \"form\", from the potter's verb in Genesis 2:7. God remembers what we are made of: dust." },
    ],
  },
  {
    book: "psalms",
    chapter: 104,
    title: "The Creator's world",
    setting:
      "A creation hymn that walks through the world much in the order of Genesis 1: light, sky, waters, land, plants, sun and moon, sea creatures. Scholars have noted likenesses to an Egyptian hymn to the sun disk, Aten, from the 1300s BC. But where Egypt praised the sun, this psalm makes the sun a servant that knows when to set. It ends with the first \"Hallelujah\" in the Psalms.",
    words: [
      { v: 26, s: 3882, note: "Livyatan, \"Leviathan\": a sea monster that frightened ancient peoples (Job 41). Here it is simply God's creature, made to play in the sea." },
      { v: 30, s: 7307, note: "Ruach, \"Spirit\" or \"breath\". When God sends His Spirit, creatures come to life and the face of the ground is renewed." },
    ],
  },
  {
    book: "psalms",
    chapter: 105,
    title: "God keeps His covenant",
    setting:
      "This psalm retells Israel's story from Abraham to the land of Canaan, highlighting God's faithfulness to His promise. Its first fifteen verses also appear in 1 Chronicles 16:8 to 22, sung when David brought the ark to Jerusalem. It is the bright twin of Psalm 106: this one tells what God did, the next confesses what Israel did. Israel's sins are left out entirely here.",
    words: [
      { v: 8, s: 1285, note: "Berit, \"covenant\": a binding commitment sealed by oath. God remembers it \"for a thousand generations.\"" },
      { v: 15, s: 4899, note: "Mashiach, \"anointed\". Here it refers to the patriarchs, set apart by God though they were never literally anointed with oil." },
    ],
  },
  {
    book: "psalms",
    chapter: 106,
    title: "We have sinned like our fathers",
    setting:
      "A national confession that retells Israel's history as a record of failure: grumbling in the desert, the golden calf, worshiping Baal of Peor, adopting Canaanite religion and even sacrificing children. It was likely prayed in exile or soon after, since it pleads, \"gather us from among the nations\" (v. 47). Verse 48 closes Book IV of the Psalter with a doxology.",
    words: [
      { v: 20, s: 8403, note: "Tavnit, \"image\" or \"pattern\". Israel traded God's glory for the image of a grass-eating ox. Paul echoes this in Romans 1:23." },
      { v: 30, s: 6419, note: "Palal, \"intervene\". Phinehas stepped in to stop a plague (Numbers 25:7 to 8). The same verb usually means \"to pray\"." },
    ],
  },
  {
    book: "psalms",
    chapter: 107,
    title: "Let the redeemed say so",
    setting:
      "Psalm 107 opens Book V of the Psalter and answers the exiles' plea at the end of Psalm 106: God has gathered His people from east and west. Four scenes follow, wanderers lost in the desert, prisoners in chains, fools sick from their own sin and sailors in a storm, each with the same refrain: they cried to the LORD and He saved them. Every listener could find themselves in one of the four.",
    words: [
      { v: 2, s: 1350, note: "Gaal, \"redeem\": to buy back, as a family's kinsman redeemer would (Ruth 4). God acts as next of kin to His people." },
      { v: 30, s: 4231, note: "Machoz, \"harbor\" or \"haven\", a word found only here in the Bible. God brings storm-tossed sailors to the port they longed for." },
    ],
  },
  {
    book: "psalms",
    chapter: 108,
    title: "Praise first, then the battle",
    setting:
      "Psalm 108 is stitched together from two earlier psalms of David: verses 1 to 5 come from Psalm 57:7 to 11, and verses 6 to 13 from Psalm 60:5 to 12. Psalm 57 came out of David's flight from Saul, and Psalm 60 out of a military crisis. Joined here, praise comes first and the plea for victory second. Israel likely reused older prayers like this in new times of need.",
    words: [
      { v: 1, s: 3559, note: "Kun, \"steadfast\": fixed, firmly set. David's heart is settled before the battle is won." },
      { v: 9, s: 5518, note: "Sir, \"washbasin\": a pot for washing feet. God calls proud Moab His washbasin, a lowly household tool." },
    ],
  },
  {
    book: "psalms",
    chapter: 109,
    title: "Repaid hatred for love",
    setting:
      "A psalm of David and the harshest of the imprecatory psalms, those that call down judgment on enemies. David has been repaid with hatred and false accusation for his love. Christians read it in different ways: some see honest anguish handed to God rather than taken out on people; others note that verses 6 to 19 may quote the curses his enemies spoke against him. Peter applied verse 8 to Judas (Acts 1:20).",
    words: [
      { v: 4, s: 7853, note: "Satan, \"accuse\" as an adversary in court. The same root gives the title \"the accuser\" in Job 1 and Zechariah 3." },
      { v: 31, s: 34, note: "Evyon, \"needy\": the poor who depend on others to survive. The accuser stands at a man's right hand (v. 6), but God stands at the right hand of the needy." },
    ],
  },
  {
    book: "psalms",
    chapter: 110,
    title: "The King who is also a Priest",
    setting:
      "Jesus used this psalm to show the Messiah is more than David's son: if David calls him \"my Lord,\" how can he be only his descendant? (Matthew 22:41 to 46). It is the psalm the New Testament quotes or alludes to most. God seats a king at His right hand and swears that this king will also be a priest forever in the order of Melchizedek, the priest king of Salem (Genesis 14:18 to 20).",
    words: [
      { v: 1, s: 113, note: "Adon, \"lord\" or \"master\". \"The LORD (Yahweh) said to my Lord (Adon)\": King David speaks of someone greater than himself." },
      { v: 4, s: 4442, note: "Malki-tsedeq, \"Melchizedek\", meaning \"king of righteousness\". Hebrews 7 explains why Jesus is a priest in his order rather than Aaron's." },
    ],
  },
  {
    book: "psalms",
    chapter: 111,
    title: "Great are the works of the LORD",
    setting:
      "Psalms 111 and 112 are twin acrostics: each line begins with the next letter of the Hebrew alphabet, 22 lines in all. Psalm 111 praises God's works and character; Psalm 112 describes a person who comes to resemble that God. The psalm is sung in the gathered assembly (v. 1) and ends with the famous line that the fear of the LORD is the beginning of wisdom, also found in Proverbs 9:10.",
    words: [
      { v: 4, s: 2143, note: "Zekher, \"remembrance\": God made His wonders to be remembered, likely through feasts such as Passover that retold them each year." },
      { v: 9, s: 6304, note: "Pedut, \"redemption\": release by paying a price. Zechariah praised God for bringing redemption to His people in Jesus (Luke 1:68)." },
    ],
  },
  {
    book: "psalms",
    chapter: 112,
    title: "The person who fears the LORD",
    setting:
      "The twin of Psalm 111, another 22 line acrostic. Where 111 says God's righteousness \"endures forever\" (111:3), 112 says the same of the person who fears Him (112:3, 9). The blessed person mirrors God's character: gracious, compassionate, generous and just. Paul quotes verse 9 when urging the Corinthians to give generously (2 Corinthians 9:9).",
    words: [
      { v: 7, s: 8052, note: "Shemuah, \"news\" or \"report\". The righteous need not dread bad news; their heart is steady before the message arrives." },
      { v: 9, s: 6340, note: "Pazar, \"scatter\": to distribute freely, like a farmer sowing seed. The generous person gives widely, not grudgingly." },
    ],
  },
  {
    book: "psalms",
    chapter: 113,
    title: "High above, stooping low",
    setting:
      "Psalm 113 begins the \"Egyptian Hallel\" (Psalms 113 to 118), sung at Passover and other feasts. By Jesus' time, 113 and 114 were sung before the Passover meal and 115 to 118 after it. So the hymn Jesus and His disciples sang before going out to the Mount of Olives was likely from this group (Matthew 26:30). It praises a God enthroned on high who bends down to lift the poor.",
    words: [
      { v: 7, s: 830, note: "Ashpot, \"ash heap\" or \"dump\": the town garbage pile where outcasts begged. God lifts the needy from there to sit with princes." },
      { v: 6, s: 8213, note: "Shaphel, \"humble oneself\" or \"stoop low\". God must bend down even to look at the heavens." },
    ],
  },
  {
    book: "psalms",
    chapter: 114,
    title: "When Israel came out of Egypt",
    setting:
      "A short, vivid poem about the exodus, also part of the Hallel sung at Passover. It compresses forty years into eight verses: the Red Sea runs away, the Jordan turns back, mountains skip like rams. The poet treats nature as startled by God's arrival. In Hebrew, God is not even named until verse 7, as if the poet holds Him back for effect and then reveals who caused all the trembling.",
    words: [
      { v: 2, s: 6944, note: "Qodesh, \"sanctuary\" or \"holiness\". Judah itself became God's holy place; His dwelling was a people before it was a building." },
      { v: 8, s: 2496, note: "Challamish, \"flint\": the hardest rock. God turned it into a spring of water (Deuteronomy 8:15)." },
    ],
  },
  {
    book: "psalms",
    chapter: 115,
    title: "Not to us, but to Your name",
    setting:
      "Part of the Hallel sung at Passover, Psalm 115 answers the nations' taunt, \"Where is their God?\" (v. 2). Israel's God had no statue, which puzzled neighbors whose temples held carved images. The psalm turns the mockery around with sharp satire of idols that have mouths but cannot speak. Its threefold call to trust, to Israel, to the priests of Aaron's house and to all who fear the LORD, may have been sung by alternating groups.",
    words: [
      { v: 4, s: 6091, note: "Atsav, \"idol\": a shaped or fashioned image. The word sounds close to Hebrew words for pain and grief, fitting for gods that only bring sorrow." },
      { v: 1, s: 3519, note: "Kavod, \"glory\", from a root meaning \"heavy\": weight and importance. \"Not to us\" refuses to claim weight that belongs to God." },
    ],
  },
  {
    book: "psalms",
    chapter: 116,
    title: "The cup of salvation",
    setting:
      "A personal song of thanks from someone who nearly died: \"the ropes of death entangled me\" (v. 3). Rescued, the singer comes to the temple courts in Jerusalem to keep vows and lift \"the cup of salvation\" in front of the people. As part of the Hallel, it was sung after the Passover meal, so Jesus very likely sang these words on the night before He died.",
    words: [
      { v: 13, s: 3563, note: "Kos, \"cup\": probably a drink offering poured out in thanks, or the cup raised at a thanksgiving meal. Passover itself was marked by cups of wine." },
      { v: 3, s: 4712, note: "Metsar, \"anguish\" or \"distress\": a narrow, tight place. The grip of the grave was closing in on him." },
    ],
  },
  {
    book: "psalms",
    chapter: 117,
    title: "Praise Him, all nations",
    setting:
      "The shortest psalm and the shortest chapter in the Bible, only two verses long. Yet it reaches the farthest: it calls every nation and people to praise Israel's God. Paul quotes verse 1 in Romans 15:11 to show that God always intended the Gentiles to share in His mercy. It belongs to the Hallel sung at Passover and other feasts, a short burst of praise between longer songs.",
    words: [
      { v: 2, s: 1396, note: "Gavar, \"be great\" or \"prevail\": God's love has overpowered us, like a stronger force winning out." },
      { v: 1, s: 523, note: "Ummah, \"people\" or \"tribe\", a rare word. Paired with \"nations,\" it sweeps in every group of humanity." },
    ],
  },
  {
    book: "psalms",
    chapter: 118,
    title: "The stone the builders rejected",
    setting:
      "The last song of the Egyptian Hallel, and probably the last psalm Jesus sang before His arrest (Matthew 26:30). It pictures a festival procession: a leader rescued from his enemies arrives at the temple gates, asks to enter, and the crowd answers with blessing. When Jesus rode into Jerusalem, the crowds shouted its words: \"Hosanna\" and \"Blessed is He who comes in the name of the LORD\" (vv. 25 to 26).",
    words: [
      { v: 25, s: 4994, note: "Na, \"please\" or \"we beseech You\". Hoshiah na, \"save us, please,\" became the shout \"Hosanna\" (Matthew 21:9)." },
      { v: 22, s: 7218, note: "Rosh, \"head\". The rejected stone became the \"head of the corner,\" the key stone of the building. Jesus applied it to Himself (Matthew 21:42)." },
    ],
  },
  {
    book: "psalms",
    chapter: 119,
    title: "A love song for God's word",
    setting:
      "The longest chapter in the Bible: 176 verses in 22 stanzas, one for each letter of the Hebrew alphabet, with all eight lines of each stanza starting with that letter. Nearly every verse names God's word with one of about eight terms: law, testimonies, precepts, statutes, commandments, judgments, word and promise. It is a love song to God's revealed will, written by someone afflicted, mocked and waiting for rescue.",
    words: [
      { v: 105, s: 5216, note: "Ner, \"lamp\": a small clay oil lamp that lit a few steps at a time, not the whole road." },
      { v: 11, s: 6845, note: "Tsaphan, \"hide\" or \"treasure\": to store something valuable out of sight. God's word is stored in the heart like treasure." },
    ],
  },
  {
    book: "psalms",
    chapter: 120,
    title: "Living among liars",
    setting:
      "The first of fifteen songs of ascents (Psalms 120 to 134), most likely sung by pilgrims traveling up to Jerusalem for the great feasts. It begins far from Jerusalem, with someone living among liars and warmongers. Meshech was a people far to the north near the Black Sea, and Kedar a desert tribe to the east; together the names may simply mean \"among hostile strangers.\" The journey to God starts with longing to leave.",
    words: [
      { v: 5, s: 4902, note: "Meshech, a distant northern people (Ezekiel 38:2). Paired with Kedar in the east, it pictures life far from God's people." },
      { v: 7, s: 7965, note: "Shalom, \"peace\": wholeness and right relationships. The psalmist wants peace; his neighbors want war." },
    ],
  },
  {
    book: "psalms",
    chapter: 122,
    title: "Standing in Jerusalem's gates",
    setting:
      "A song of ascents with David's name in its title. Pilgrims walked up to Jerusalem for the three yearly feasts (Deuteronomy 16:16), and this psalm captures the moment they arrive inside the gates. Jerusalem was where the tribes met to worship and where the king's court gave final rulings. The pilgrim ends by praying for the city's peace, a fitting prayer for a city whose name sounds like shalom.",
    words: [
      { v: 6, s: 7965, note: "Shalom, \"peace\": More than the absence of war. It means wholeness and things being as they should be, and it echoes the sound of the name Yerushalayim." },
      { v: 3, s: 2266, note: "Chavar, \"joined\" or \"united\": The word for things bound tightly together. The compact city on its ridge pictured a people knit into one." },
    ],
  },
  {
    book: "psalms",
    chapter: 123,
    title: "Eyes on the Master's hand",
    setting:
      "A short song of ascents in which the community asks for mercy. It does not name its occasion. The contempt it describes fits the years after the exile, when returnees rebuilding Jerusalem were mocked by powerful neighbors (Nehemiah 2:19; 4:1 to 4), though it could come from any season of humiliation. The central picture is a household servant watching the master's hand for direction, provision and protection.",
    words: [
      { v: 3, s: 2603, note: "Chanan, \"be gracious\" or \"have mercy\": The plea for undeserved favor, asked twice in one breath. The people ask for kindness, not a reward they have earned." },
      { v: 4, s: 7600, note: "Shaanan, \"at ease\": The arrogant are literally the comfortable ones, secure enough to sneer at people who are struggling." },
    ],
  },
  {
    book: "psalms",
    chapter: 124,
    title: "If the LORD had not been on our side",
    setting:
      "A song of ascents with David's name in its title. A leader calls the whole congregation to say it together: \"let Israel now declare.\" The specific escape it remembers is not named. Its pictures come from everyday danger in Israel: dry streambeds that turn to deadly floods after a storm, a wild animal's teeth, and a bird caught in a hunter's net. The point is that Israel survived only because God stepped in.",
    words: [
      { v: 4, s: 7857, note: "Shataph, \"engulf\" or \"sweep away\": A word for a flood that overflows and carries everything with it. It pictures a crisis with no human escape." },
      { v: 7, s: 4422, note: "Malat, \"escape\" or \"slip away\": It means to get free as if through a gap. The bird did not break the net; the net was torn." },
    ],
  },
  {
    book: "psalms",
    chapter: 125,
    title: "As the mountains surround Jerusalem",
    setting:
      "A song of ascents. Pilgrims coming to Jerusalem saw the city sitting in a ring of higher hills, with the Mount of Olives to the east. The psalm turns that view into a promise: God surrounds His people the same way. The mention of a wicked scepter over the land suggests a time of foreign rule, perhaps after the exile, though the date is uncertain. Such rule, the psalm insists, will not last.",
    words: [
      { v: 2, s: 5439, note: "Saviv, \"around\" or \"surrounding\": Used twice, of the hills and of the LORD. It pictures protection on every side, not just a wall in front." },
      { v: 3, s: 1486, note: "Goral, \"lot\": The land was divided among the tribes by casting lots (Joshua 14:2). It was God's gift, not the property of whoever ruled it." },
    ],
  },
  {
    book: "psalms",
    chapter: 126,
    title: "Like those who dream",
    setting:
      "A song of ascents remembering a restoration so great it felt like a dream. It most likely looks back to the return from exile in Babylon after 538 BC (Ezra 1). Yet the second half prays for restoration again. The returnees faced poverty, poor harvests and hostile neighbors (Haggai 1:6), so the joy of coming home sat beside the hard work of rebuilding. The psalm holds both.",
    words: [
      { v: 1, s: 7725, note: "Shuv, \"restore\" or \"turn back\": The basic Hebrew word for return and repentance. God turns His people's fortunes around." },
      { v: 1, s: 2492, note: "Chalam, \"dream\": The rescue was so sudden and so good that it felt unreal." },
    ],
  },
  {
    book: "psalms",
    chapter: 127,
    title: "Unless the LORD builds the house",
    setting:
      "A song of ascents with Solomon's name in its title, fitting for the king who built the temple. In Hebrew, \"house\" can mean a building, a household or a royal family line (2 Samuel 7:11 to 13). Ancient cities posted watchmen on the walls through the night. The psalm moves from building, guarding and working to the gift of children, and says all of it depends on God, not on endless effort.",
    words: [
      { v: 1, s: 1004, note: "Bayit, \"house\": A building, a family and a dynasty all at once. The psalm speaks to all three." },
      { v: 2, s: 3039, note: "Yedid, \"beloved\": The same root as Jedidiah, \"beloved of the LORD\", the name God gave Solomon at birth (2 Samuel 12:25)." },
    ],
  },
  {
    book: "psalms",
    chapter: 128,
    title: "Blessing at the family table",
    setting:
      "A song of ascents describing the good life of someone who fears the LORD, in the language of a farming village: eating your own harvest, a fruitful vine, olive shoots around the table. In Israel's covenant curses, enemies ate what you planted (Deuteronomy 28:33). Here the worker enjoys it. The psalm ends with a blessing from Zion, probably spoken over worshipers at the temple, and widens to all Israel.",
    words: [
      { v: 1, s: 3373, note: "Yare, \"fear\": Reverent awe that shapes how a person lives. It is not terror but taking God seriously in every room of life." },
      { v: 3, s: 2132, note: "Zayit, \"olive\": Olive trees live for centuries and send up new shoots around the old trunk, a picture of a family growing around its roots." },
    ],
  },
  {
    book: "psalms",
    chapter: 129,
    title: "Plowed but not destroyed",
    setting:
      "A song of ascents in which Israel looks back on a long history of oppression \"from my youth\", reaching back to slavery in Egypt. The plowing image likely pictures backs scarred by whips or a people trampled by conquerors. Yet the enemies never won. The psalm ends by asking that those who hate Zion wither like grass sprouting on a flat clay roof. Christians read such prayers in different ways.",
    words: [
      { v: 3, s: 2790, note: "Charash, \"plow\": To cut furrows in the ground. Israel's suffering is described as being dug into, deeply and repeatedly." },
      { v: 4, s: 5688, note: "Avot, \"cords\": The ropes that bound an ox to the plow. God does not just stop the plowmen; He cuts the harness." },
    ],
  },
  {
    book: "psalms",
    chapter: 130,
    title: "Out of the depths",
    setting:
      "A song of ascents and one of the seven psalms the church has long called the penitential psalms (6, 32, 38, 51, 102, 130, 143). The depths are deep waters, a biblical picture of overwhelming trouble and guilt. The singer moves from crying out, to confessing that no one could stand if God kept score, to waiting for Him like a watchman waits for dawn. Martin Luther turned this psalm into a beloved hymn.",
    words: [
      { v: 1, s: 4615, note: "Maamaq, \"depths\": Deep places, used of the depths of the sea. The prayer starts from as low as a person can go." },
      { v: 4, s: 5547, note: "Selichah, \"forgiveness\": A word used in the Old Testament only for God's forgiving. Pardon of this kind belongs to Him alone." },
    ],
  },
  {
    book: "psalms",
    chapter: 131,
    title: "Like a weaned child",
    setting:
      "A three verse song of ascents with David's name in its title. In ancient Israel, children were often weaned around age two or three (compare Hannah and Samuel in 1 Samuel 1:22 to 24). A nursing baby cries for milk. A weaned child can rest on a mother's lap content just to be there. The psalm pictures a soul that has stopped demanding and grasping, and it closes by calling all Israel to that same hope.",
    words: [
      { v: 2, s: 1580, note: "Gamal, \"weaned\": A child who has finished nursing. The word pictures a settled trust that no longer needs constant feeding." },
      { v: 2, s: 1826, note: "Damam, \"be quiet\" or \"be still\": The silence of someone who has stopped protesting. It is quiet by choice, not by force." },
    ],
  },
  {
    book: "psalms",
    chapter: 132,
    title: "A dwelling for the Mighty One",
    setting:
      "The longest song of ascents. It recalls David's zeal to bring the ark of the covenant to Jerusalem (2 Samuel 6), after it had sat for years at Kiriath jearim (1 Samuel 7:2), and God's oath to keep a son of David on the throne (2 Samuel 7). Verses 8 to 10 match Solomon's prayer at the temple's dedication (2 Chronicles 6:41 to 42). It may have been sung in processions celebrating the ark and the king.",
    words: [
      { v: 11, s: 7650, note: "Shava, \"swear an oath\": David swore to God in verse 2, and God swore to David here. The psalm rests on the second oath." },
      { v: 10, s: 4899, note: "Mashiach, \"anointed one\": The king anointed with oil. The word becomes \"Messiah\", the hope of a coming son of David." },
    ],
  },
  {
    book: "psalms",
    chapter: 133,
    title: "When brothers live in unity",
    setting:
      "A short song of ascents with David's name in its title. At the great feasts, Israelites from every tribe camped together in and around Jerusalem, so this psalm about family harmony fit the pilgrimage well. It uses two images: the fragrant oil poured over Aaron's head when he was made high priest (Leviticus 8:12), and the heavy dew of Mount Hermon in the far north. Both picture blessing flowing down.",
    words: [
      { v: 1, s: 5273, note: "Naim, \"pleasant\": Lovely or delightful, the word used of sweet music. Unity is not only right; it is beautiful." },
      { v: 3, s: 2919, note: "Tal, \"dew\": In a land with no summer rain, dew watered the crops for months. It was a common picture of quiet, life giving blessing." },
    ],
  },
  {
    book: "psalms",
    chapter: 134,
    title: "Blessing on the night shift",
    setting:
      "The last of the fifteen songs of ascents, and a fitting close to the pilgrimage. It is probably an exchange of blessing at the temple. Worshipers call on the priests and Levites who kept watch in the temple through the night (1 Chronicles 9:33) to bless the LORD. In verse 3 the priests answer by blessing the people, much as Aaron's blessing did (Numbers 6:24 to 26). Praise goes up, and blessing comes down.",
    words: [
      { v: 1, s: 3915, note: "Laylah, \"night\": Temple service did not stop when the crowds went home. Worship continued through the dark hours." },
      { v: 2, s: 6944, note: "Qodesh, \"holiness\" or \"sanctuary\": The holy place set apart for God. Hands are lifted toward the place where He chose to meet His people." },
    ],
  },
  {
    book: "psalms",
    chapter: 135,
    title: "Praise the God who acts",
    setting:
      "A temple hymn that opens and closes with \"Hallelujah\", calling priests, Levites and all Israel to praise. Much of it is woven from other Scripture: the treasured possession of Exodus 19:5, the idol satire of Psalm 115, and Moses' song in Deuteronomy 32:36. It rehearses God's rule over weather, the plagues in Egypt and the defeat of the kings Sihon and Og east of the Jordan (Numbers 21:21 to 35).",
    words: [
      { v: 4, s: 5459, note: "Segullah, \"treasured possession\": A king's private treasure, set apart from everything else he owned. God chose Israel as His own." },
      { v: 15, s: 6091, note: "Atsav, \"idol\": From a root linked to shaping and also to pain and grief. Idols are worked by human hands and bring sorrow." },
    ],
  },
  {
    book: "psalms",
    chapter: 136,
    title: "His loving devotion endures forever",
    setting:
      "A litany of thanks with a refrain repeated 26 times. A leader likely sang the first half of each verse, and the congregation answered, \"His loving devotion endures forever\" (compare 2 Chronicles 7:3 and Ezra 3:11). Jewish tradition calls it the Great Hallel. It walks through creation, the exodus, the wilderness, the gift of the land and God's daily care, as if Israel's whole story were one long reason to give thanks.",
    words: [
      { v: 1, s: 2617, note: "Chesed, \"loving devotion\": God's loyal, covenant love. It is love that has bound itself by promise and keeps its word." },
      { v: 23, s: 8216, note: "Shephel, \"low estate\": A low place, a humbled condition. God remembered His people when they had nothing to offer." },
    ],
  },
  {
    book: "psalms",
    chapter: 137,
    title: "By the rivers of Babylon",
    setting:
      "Written by exiles in Babylon after Jerusalem fell in 586 BC. Babylon sat on the Euphrates and a web of canals. Their captors mocked them by asking for the happy songs of Zion. The psalm ends with one of the hardest lines in the Bible, a raw cry for Babylon to suffer what it did to Jerusalem. It is the voice of people who watched their city burn and their children die, and Christians read it in different ways.",
    words: [
      { v: 5, s: 7911, note: "Shakach, \"forget\": The exiles fear forgetting more than suffering. To forget Jerusalem would be to forget God's promises." },
      { v: 2, s: 3658, note: "Kinnor, \"lyre\" or \"harp\": The stringed instrument David played. Hung on the trees, it pictures worship that has fallen silent." },
    ],
  },
  {
    book: "psalms",
    chapter: 138,
    title: "Thanks for a prayer answered",
    setting:
      "A psalm of David giving thanks after God answered his cry for help. It opens a final group of eight psalms with David's name (138 to 145). David sings \"before the gods\", which may mean in defiance of pagan gods or before rulers or heavenly beings; readers differ. He bows toward God's holy temple, as Daniel later prayed facing Jerusalem (Daniel 6:10), and looks ahead to the day when kings of the earth will praise the LORD.",
    words: [
      { v: 3, s: 7292, note: "Rahav, \"embolden\": To make bold or confident. God's answer changed David from the inside before it changed his circumstances." },
      { v: 8, s: 1584, note: "Gamar, \"fulfill\" or \"complete\": To bring to an end what was started. God finishes His purpose for those He has called." },
    ],
  },
  {
    book: "psalms",
    chapter: 140,
    title: "Rescue from violent men",
    setting:
      "A psalm of David asking for rescue from violent schemers and slanderers. It does not name its occasion, but it fits the years when David was hunted by Saul or betrayed during Absalom's revolt. Its pictures come from hunting: hidden snares, nets and traps laid along a path. Its enemies' tongues are as deadly as snakes. Paul quotes verse 3 in Romans 3:13 to describe the sin of all humanity.",
    words: [
      { v: 3, s: 5919, note: "Akhshuv, \"viper\": A word found only here in the Old Testament. It pictures speech that kills with a quick, hidden strike." },
      { v: 12, s: 1779, note: "Din, \"justice\" or \"cause\": A legal case. God takes up the court case of the poor when no one else will." },
    ],
  },
  {
    book: "psalms",
    chapter: 141,
    title: "Let my prayer rise like incense",
    setting:
      "A psalm of David, prayed in the evening. At the tabernacle, priests burned incense every morning and evening (Exodus 30:7 to 8) and presented an evening offering. David asks that his prayer rise to God like that fragrant smoke. He asks God to guard his mouth, keep his heart from the company of evildoers and help him welcome correction. Many churches have long sung it at evening prayer.",
    words: [
      { v: 2, s: 7004, note: "Qetoret, \"incense\": The fragrant smoke offered to God in the holy place. Prayer is pictured as worship that rises to Him." },
      { v: 3, s: 8108, note: "Shomrah, \"guard\" or \"watch\": A word found only here. David asks for a sentry posted at the door of his lips." },
    ],
  },
  {
    book: "psalms",
    chapter: 142,
    title: "A prayer from the cave",
    setting:
      "The title places this prayer \"when he was in the cave\", either the cave of Adullam where David hid from Saul (1 Samuel 22:1) or the cave near En Gedi where he spared Saul's life (1 Samuel 24). Either way, David was a hunted fugitive, cut off from home and court. He looks to his right, where a defender should stand, and finds no one. The psalm moves from total isolation to hope that the righteous will gather around him again.",
    words: [
      { v: 5, s: 2506, note: "Cheleq, \"portion\": A share of land or inheritance. Driven from his home, David says God Himself is his share." },
      { v: 2, s: 8210, note: "Shaphakh, \"pour out\": To empty a container completely. David holds nothing back from God." },
    ],
  },
  {
    book: "psalms",
    chapter: 143,
    title: "No one is righteous before You",
    setting:
      "A psalm of David and the last of the seven penitential psalms. The early Greek translation adds that David prayed it when his son was pursuing him, linking it to Absalom's revolt (2 Samuel 15), though the Hebrew title does not say so. David is crushed and in darkness, yet he does not plead his own goodness. Verse 2 shapes Paul's teaching that no one is justified by works of the law (Romans 3:20; Galatians 2:16).",
    words: [
      { v: 2, s: 6663, note: "Tsadaq, \"be righteous\": To be in the right before a judge. No one alive can claim that standing before God on their own." },
      { v: 6, s: 5889, note: "Ayeph, \"weary\" or \"parched\": Dry, exhausted ground longing for rain. David's soul is thirsty for God Himself." },
    ],
  },
  {
    book: "psalms",
    chapter: 144,
    title: "Trained for battle, longing for peace",
    setting:
      "A royal psalm of David that blends thanks for victory with a plea for rescue. Much of it borrows from earlier psalms: Psalm 18 for the Rock and the storm of God's coming, and Psalm 8 for the question \"what is man?\" It closes with a vision of a kingdom at peace: strong children, full barns, healthy herds and streets without cries of grief. Ancient Israel's kings fought, but they prayed for a peace only God could give.",
    words: [
      { v: 4, s: 1892, note: "Hevel, \"breath\" or \"vapor\": The key word of Ecclesiastes. Human life is as brief as a breath on a cold morning." },
      { v: 9, s: 2319, note: "Chadash, \"new\": A new song for a new act of rescue. Fresh mercies call for fresh praise." },
    ],
  },
  {
    book: "psalms",
    chapter: 145,
    title: "Every day I will bless You",
    setting:
      "A psalm of David, and the only psalm titled \"a praise\" (tehillah), the word that gives the Hebrew book of Psalms its name. It is an acrostic: each verse begins with the next letter of the Hebrew alphabet. Most Hebrew copies lack the line for the letter nun, but a Dead Sea Scroll and the Greek translation preserve it, and this version includes it in verse 13. Jewish worship has long recited this psalm daily.",
    words: [
      { v: 8, s: 2587, note: "Channun, \"gracious\": Showing favor no one earned. Verse 8 echoes God's own self description in Exodus 34:6." },
      { v: 14, s: 5564, note: "Samakh, \"uphold\" or \"support\": To lean on or brace up. God catches those who are falling." },
    ],
  },
  {
    book: "psalms",
    chapter: 146,
    title: "Don't put your trust in princes",
    setting:
      "The first of five Hallelujah psalms (146 to 150) that close the book of Psalms, each beginning and ending with \"Praise the LORD.\" This one contrasts powerful rulers, who die and whose plans die with them, with the God who made everything and keeps faith forever. Its list of the people God cares for, the oppressed, hungry, prisoners, blind, foreigners, orphans and widows, echoes the heart of Israel's law (Deuteronomy 10:18).",
    words: [
      { v: 3, s: 5081, note: "Nadiv, \"prince\" or \"noble\": Literally a generous or willing one, a person of rank. Even the best leaders cannot save." },
      { v: 4, s: 6250, note: "Eshtonah, \"plans\" or \"thoughts\": A word found only here. A ruler's grand schemes die the day he does." },
    ],
  },
  {
    book: "psalms",
    chapter: 147,
    title: "He heals the brokenhearted",
    setting:
      "A Hallelujah psalm most likely written after the return from exile, when Jerusalem's walls were being rebuilt and scattered Israelites were coming home (compare Nehemiah 12:27 to 43). The early Greek translation divides it into two psalms. It moves back and forth between God's vast power, counting the stars and sending snow, and His tender care for wounded people and hungry baby ravens.",
    words: [
      { v: 3, s: 2280, note: "Chavash, \"bind up\": To wrap a wound with a bandage. The same verb appears in Isaiah 61:1, a passage Jesus read about Himself." },
      { v: 4, s: 4557, note: "Mispar, \"number\": God counts what no one can count. The same word in verse 5 says His understanding has no number." },
    ],
  },
  {
    book: "psalms",
    chapter: 148,
    title: "Let all creation praise Him",
    setting:
      "A Hallelujah psalm that calls a cosmic choir to praise God, starting in the highest heavens with angels, sun, moon and stars, then moving down to sea creatures, weather, mountains, trees, animals and finally every kind of person. Israel's neighbors worshiped the sun, moon and sea monsters. This psalm summons all of them as fellow worshipers of the God who made them, much in the order of Genesis 1.",
    words: [
      { v: 5, s: 1254, note: "Bara, \"create\": The verb of Genesis 1:1, used only with God as subject. Everything praises Him because He made it." },
      { v: 8, s: 5591, note: "Saar, \"storm wind\" or \"tempest\": The wind that terrifies sailors (Jonah 1:4). Here even storms are servants doing what God says." },
    ],
  },
  {
    book: "psalms",
    chapter: 149,
    title: "Praise and a two edged sword",
    setting:
      "A Hallelujah psalm that calls God's faithful people to praise Him with dancing and music, then takes a hard turn: high praises in their mouths and swords in their hands to carry out judgment on the nations. It reflects Israel's life as a nation in an age of war. It has sometimes been misused to justify religious violence. Christians read its sword in light of the New Testament, where judgment belongs to Christ.",
    words: [
      { v: 4, s: 6286, note: "Paar, \"adorn\" or \"beautify\": To crown with honor. God dresses humble people in His salvation like festive clothing." },
      { v: 6, s: 7318, note: "Romam, \"high praises\": Exalting, lifting high. Praise is the first weapon in the hands of God's people." },
    ],
  },
  {
    book: "psalms",
    chapter: 150,
    title: "Let everything that has breath praise",
    setting:
      "The final psalm, closing both the fifth book of Psalms and the whole collection. Each of the five books ends with praise (Psalm 41:13; 72:19; 89:52; 106:48), and this entire psalm is one. It answers where to praise (sanctuary and heavens), why (His mighty acts and greatness), how (with every instrument of the temple) and who (everything that breathes). The book that began with lament and struggle ends in pure praise.",
    words: [
      { v: 6, s: 5397, note: "Neshamah, \"breath\": The breath of life God breathed into Adam (Genesis 2:7). Whoever has breath has a reason to praise." },
      { v: 3, s: 7782, note: "Shophar, \"ram's horn\": The horn blown to announce feasts, battles and the year of jubilee. Praise is a public announcement." },
    ],
  },
  {
    book: "proverbs",
    chapter: 1,
    title: "The fear of the LORD is the beginning",
    setting:
      "Proverbs opens with a preface (vv. 1 to 7) naming its purpose: to make the simple wise. Chapters 1 to 9 are talks from a father to a son, the way wisdom was passed on in Israel's homes and royal court. Egypt and other nations had wisdom books too, but Israel's starts with the fear of the LORD. Here the son hears two voices: a gang promising easy money, and Wisdom herself calling in the streets.",
    words: [
      { v: 7, s: 3374, note: "Yirah, \"fear\": reverent awe before God that shapes how you live, not cowering terror. It is the starting point, not a stage you outgrow." },
      { v: 4, s: 6612, note: "Peti, \"simple\": from a root meaning \"open.\" The simple are not stupid, just open to every influence, with no settled direction yet." },
    ],
  },
  {
    book: "proverbs",
    chapter: 2,
    title: "Searching for wisdom like silver",
    setting:
      "The father explains how wisdom is found, in one long \"if... then\" sentence that runs through most of the chapter. If you dig for it like silver, then you will understand the fear of the LORD. Mining was hard, dark work (Job 28 describes it), and Israel had little silver of its own. The payoff is protection from two dangers: violent, crooked men and the woman who abandons her marriage covenant.",
    words: [
      { v: 4, s: 2664, note: "Chaphas, \"search out\": to dig and hunt carefully for something hidden. Wisdom is God's gift (v. 6), but the casual never find it." },
      { v: 17, s: 1285, note: "Berit, \"covenant\": the same word used for God's covenants with Israel. Marriage vows were made before God, so breaking them breaks faith with Him too (Malachi 2:14)." },
    ],
  },
  {
    book: "proverbs",
    chapter: 4,
    title: "Guard your heart",
    setting:
      "The father shows that wisdom was handed down to him: \"When I was a son to my father\" (v. 3). If Solomon is speaking, that father is David, and the son is hearing three generations of teaching. The chapter keeps returning to two paths, one growing brighter like sunrise and one dark and stumbling. Its center is the call to guard the heart, which in Israel meant the mind and will, not just feelings.",
    words: [
      { v: 23, s: 5341, note: "Natsar, \"guard\": to keep watch like a sentry over a city or vineyard. The heart needs posted guards because everything else flows out of it." },
      { v: 7, s: 7069, note: "Qanah, \"acquire\": to buy or obtain at a price. \"Whatever it costs, get understanding\": wisdom is worth spending everything on." },
    ],
  },
  {
    book: "proverbs",
    chapter: 5,
    title: "Drink water from your own well",
    setting:
      "The father returns to the adulterous woman of chapter 2, this time at length. In a dry land, a private cistern or well was precious property: dug or cut from rock, guarded, and never shared with strangers. Verses 15 to 20 use that picture for married love, treating sex as a good gift to be enjoyed within marriage. The warning is sober because the father knows how much one choice can cost.",
    words: [
      { v: 15, s: 953, note: "Bor, \"cistern\": a pit cut to catch and hold rainwater. Your marriage is your own water supply, worth guarding and enjoying." },
      { v: 19, s: 7686, note: "Shagah, \"be captivated\": to stagger as if drunk. The same verb in verses 20 and 23 means \"go astray.\" You will be intoxicated by something; the question is what." },
    ],
  },
  {
    book: "proverbs",
    chapter: 6,
    title: "Debts, ants and what God hates",
    setting:
      "Chapter 6 pauses the warnings about adultery for a set of short lessons. Putting up security meant pledging to cover someone else's debt, often with a public handshake; if they failed, your land or even your freedom could be taken. Next comes the ant, a lesson from nature like those Solomon was known for (1 Kings 4:33). The list of things the LORD hates uses an ancient counting pattern, \"six, even seven.\"",
    words: [
      { v: 1, s: 6148, note: "Arav, \"put up security\": to pledge yourself as guarantee for another. Wisdom does not forbid generosity, but it warns against promising what you cannot cover." },
      { v: 6, s: 5244, note: "Nemalah, \"ant\": the ant stores food in summer with no boss checking. The lesson is diligence that needs no supervisor." },
    ],
  },
  {
    book: "proverbs",
    chapter: 7,
    title: "The young man at the window",
    setting:
      "The father tells a story he watched from behind his window lattice, the wooden screen that let air into a home while keeping it private. At dusk a young man drifts toward the corner of a married woman whose husband is away. Her line about peace offerings means she has fresh meat from a sacrifice, which had to be eaten within a day or two (Leviticus 7:16), so she is inviting him to a feast.",
    words: [
      { v: 14, s: 8002, note: "Shelem, \"peace offering\": a sacrifice shared as a meal with God and others. She dresses her plan in religious language, which makes it more dangerous, not less." },
      { v: 7, s: 2638, note: "Chaser, \"lacking\": literally \"lacking heart,\" with no settled inner judgment. He is not hardened yet, just empty enough to be led." },
    ],
  },
  {
    book: "proverbs",
    chapter: 8,
    title: "Wisdom was there at creation",
    setting:
      "Wisdom is pictured as a woman calling at the city gates, where trade, court cases and public life happened. Then she tells of being with God before the world began, beside Him as He set the sky and sea in place. This is poetry personifying an attribute of God. Many Christians have read it as pointing to Christ, whom Paul calls the wisdom of God (1 Corinthians 1:24), though how far to press that is debated.",
    words: [
      { v: 30, s: 525, note: "Amon, \"craftsman\": possibly \"master builder,\" or, with different vowels, \"little child\" delighting at His side. Both readings fit the joy of verses 30 and 31." },
      { v: 22, s: 7069, note: "Qanah, \"possessed\" or \"brought forth\": the word can mean acquire or create. In the 300s some used it to argue Christ was created; the church answered that the Son is eternal and this is poetry about wisdom." },
    ],
  },
  {
    book: "proverbs",
    chapter: 9,
    title: "Two invitations to dinner",
    setting:
      "Chapters 1 to 9 end with two women hosting rival banquets. Wisdom has built a house with seven pillars, slaughtered meat and mixed wine, a costly feast in a land where most people rarely ate meat. Folly sits at her door offering stolen water and bread eaten in secret. Both call out the same words to the simple (vv. 4 and 16). Every reader has to choose whose table to sit at.",
    words: [
      { v: 1, s: 5982, note: "Ammud, \"pillar\": seven pillars suggests a large, complete, well built house. Seven often signals fullness in Scripture." },
      { v: 17, s: 1589, note: "Ganav, \"steal\": Folly's pitch is that forbidden things taste sweeter. Verse 18 tells what she leaves out: her guests are in the depths of Sheol." },
    ],
  },
  {
    book: "proverbs",
    chapter: 10,
    title: "The proverbs of Solomon begin",
    setting:
      "The book now shifts from long speeches to Solomon's main collection (10:1 to 22:16), about 375 two line sayings. The letters of Solomon's name in Hebrew add up to 375, which may be deliberate. Most sayings in chapters 10 to 15 work by contrast: the second line begins with \"but.\" Many readers take proverbs as observations of how God's world usually works, packed small to be memorized, rather than guarantees.",
    words: [
      { v: 1, s: 4912, note: "Mashal, \"proverb\": from a root meaning \"to be like.\" A proverb works by comparison, setting two things side by side so you see one through the other." },
      { v: 12, s: 3680, note: "Kasah, \"cover\": love does not expose every wrong. Peter quotes this line in 1 Peter 4:8." },
    ],
  },
  {
    book: "proverbs",
    chapter: 11,
    title: "Honest scales and generous hands",
    setting:
      "For most of Israel's history there were no coins. Buyers and sellers weighed silver on a balance against stones carried in a bag, and a cheat could keep two sets, heavy for buying and light for selling. Archaeologists have found inscribed shekel weights from Judah. The law demanded honest weights (Leviticus 19:35 to 36), and this chapter calls a false balance something the LORD detests.",
    words: [
      { v: 1, s: 68, note: "Even, \"weight\": literally \"stone.\" An accurate weight is a \"whole\" stone, from the same root as shalom." },
      { v: 25, s: 1293, note: "Berakhah, \"generous\": literally \"a soul of blessing.\" The generous person's life itself becomes a blessing to others." },
    ],
  },
  {
    book: "proverbs",
    chapter: 12,
    title: "Words that wound and words that heal",
    setting:
      "Chapter 12 reflects village life: fields to plow, animals to feed, neighbors to deal with, and a wife who can make or break a household. Many sayings are about speech, because in a small community words spoken in court, at the gate or in gossip could ruin a person. The contrast between righteous and wicked shows up in ordinary things: work, words and how you treat a farm animal.",
    words: [
      { v: 10, s: 3045, note: "Yada, \"regards\": literally \"knows the life of\" his animal. Righteousness reaches all the way to creatures who cannot speak for themselves." },
      { v: 18, s: 981, note: "Batah, \"speak rashly\": to blurt out without thinking, used of rash vows (Leviticus 5:4). Careless words cut like sword thrusts." },
    ],
  },
  {
    book: "proverbs",
    chapter: 13,
    title: "Hope deferred",
    setting:
      "These sayings assume a family where children were taught at home and inherited land kept a household alive for generations. Wealth, discipline and the company you keep are major themes. Verse 24 on the rod reflects ancient household discipline. Christians apply it in different ways today, but its heart is a parent's love that refuses to leave a child uncorrected, set against the neglect of a parent who does not care.",
    words: [
      { v: 12, s: 8431, note: "Tocheleth, \"hope\": expectation that waits. Delay can make the heart sick, and Scripture lets that be said honestly." },
      { v: 12, s: 8378, note: "Taavah, \"desire\": longing. When it is fulfilled, it is a \"tree of life,\" an echo of Eden (Genesis 2:9)." },
    ],
  },
  {
    book: "proverbs",
    chapter: 14,
    title: "The way that seems right",
    setting:
      "Chapter 14 sets wise and foolish side by side in the home, the market, the royal court and the heart. Two sayings stand out. One warns that a path can feel right and still end in death (v. 12, repeated in 16:25). The other ties how you treat the poor to how you treat God (v. 31). In Israel, where widows, orphans and day laborers had little protection, that was a bold claim about worship.",
    words: [
      { v: 12, s: 3477, note: "Yashar, \"right\": straight or upright. The danger is not a road that looks crooked but one that looks straight." },
      { v: 31, s: 2778, note: "Charaph, \"taunt\": to insult or mock. Oppressing a poor person insults the God who made him." },
    ],
  },
  {
    book: "proverbs",
    chapter: 15,
    title: "A gentle answer",
    setting:
      "This chapter is full of contrasts about speech, home life and the LORD who sees everything. It assumes a world where people lived close together, often in small houses sharing walls, so tempers, meals and quarrels were hard to hide. Several sayings compare simple meals with rich feasts: a dish of vegetables, in a culture where meat was a luxury, beats a fattened ox served with hatred.",
    words: [
      { v: 1, s: 7390, note: "Rakh, \"gentle\": soft or tender, the same word used of young children. A soft answer is not weak; it lowers the heat." },
      { v: 23, s: 6256, note: "Et, \"timely\": the right time, as in Ecclesiastes 3. A true word said at the wrong moment can still do harm." },
    ],
  },
  {
    book: "proverbs",
    chapter: 16,
    title: "We plan, the LORD directs",
    setting:
      "At the center of Solomon's collection, chapter 16 gathers sayings about God's rule over human plans, then about kings (vv. 10 to 15). Israel's king was meant to judge justly under God, not rule above Him. The chapter ends with casting lots, marked stones or sticks thrown to make decisions; Israel used them to divide land. Even what looks like chance answers to the LORD.",
    words: [
      { v: 3, s: 1556, note: "Galal, \"commit\": literally \"roll.\" Picture rolling a heavy load off your shoulders onto someone stronger." },
      { v: 33, s: 1486, note: "Goral, \"lot\": the stone or token used to decide. Israel's land was divided by lot (Joshua 18 and 19), trusting God with the outcome." },
    ],
  },
  {
    book: "proverbs",
    chapter: 17,
    title: "Better a dry crust with peace",
    setting:
      "Many sayings here are about households and friendships under strain: quarrels, bribes, foolish sons and loyal friends. The opening picture is a house \"full of feasting,\" literally full of sacrifices. Families ate the meat of their peace offerings in big festive meals, so even a religious feast could be ruined by fighting. The chapter also condemns twisted justice, a real danger when local elders judged cases at the gate.",
    words: [
      { v: 1, s: 2077, note: "Zevach, \"feasting\": literally \"sacrifices.\" A home full of religious meals and strife is worse than dry bread and quiet." },
      { v: 3, s: 974, note: "Bachan, \"tester\": to examine, as metal is tested for purity. Fire tests silver and gold; the LORD tests hearts." },
    ],
  },
  {
    book: "proverbs",
    chapter: 18,
    title: "A strong tower",
    setting:
      "Ancient cities often had a fortified tower, the last refuge when walls were breached, where people ran with whatever they could carry (Judges 9:51). This chapter sets that tower, the name of the LORD, beside the rich man's wealth, which only feels like a high wall. Many sayings are about speech in disputes, since cases were argued in public, and the first speaker often sounded right until questioned.",
    words: [
      { v: 10, s: 4026, note: "Migdal, \"tower\": a fortified stronghold. God's name, His revealed character (Exodus 34:6 to 7), is where the righteous run for safety." },
      { v: 21, s: 3027, note: "Yad, \"power\": literally \"hand.\" Death and life are in the tongue's hand; words carry real force." },
    ],
  },
  {
    book: "proverbs",
    chapter: 19,
    title: "A loan to the LORD",
    setting:
      "Chapter 19 keeps returning to the poor, family life and the limits of human plans. In Israel the poor were often one bad harvest away from selling their land or themselves into service, and the law commanded lending to them without interest (Leviticus 25:35 to 37). Several sayings admit that a quarrelsome home or a foolish son brings deep grief, while a prudent wife is a gift from the LORD.",
    words: [
      { v: 17, s: 3867, note: "Lavah, \"loan\": to lend. Kindness to the poor is treated as a loan to God Himself, and He repays." },
      { v: 11, s: 5674, note: "Avar, \"overlook\": literally \"pass over.\" It is a person's glory to let an offense go by without retaliating." },
    ],
  },
  {
    book: "proverbs",
    chapter: 20,
    title: "The lamp of the LORD",
    setting:
      "This chapter gathers sayings on wine, kings, business and the hidden heart. Wine was everyday drink in Israel, and Scripture celebrates it (Psalm 104:15) while warning hard against drunkenness. Kings appear often, since the king was Israel's highest judge, sifting the wicked like a farmer winnowing grain (v. 26). Several sayings admit we cannot fully understand our own steps or make our own hearts clean.",
    words: [
      { v: 1, s: 1993, note: "Hamah, \"brawler\": to roar or be in uproar. Strong drink turns a person loud and quarrelsome." },
      { v: 27, s: 5216, note: "Ner, \"lamp\": the small clay oil lamp of every home. God uses the human spirit like a lamp searching the dark rooms within." },
    ],
  },
  {
    book: "proverbs",
    chapter: 21,
    title: "The king's heart in God's hand",
    setting:
      "Farmers in the ancient Near East cut channels to carry water from springs or rivers to their fields, and whoever controlled the channels decided where the water went. The opening saying uses that picture for God's rule over kings. The chapter weighs worship against conduct, as the prophets did (Micah 6:6 to 8), and pictures horses readied for battle, the best military power of the day.",
    words: [
      { v: 1, s: 6388, note: "Peleg, \"waterway\": an irrigation channel. God steers even powerful rulers as easily as a farmer turns water." },
      { v: 31, s: 8668, note: "Teshuah, \"victory\": also deliverance or salvation. Prepare the horse, but the outcome is God's." },
    ],
  },
  {
    book: "proverbs",
    chapter: 22,
    title: "A good name and the words of the wise",
    setting:
      "Solomon's main collection ends at 22:16, and a new section begins: \"the words of the wise\" (22:17 to 24:22). Its sayings closely resemble an Egyptian text, the Instruction of Amenemope, which many scholars think Israel's teachers knew and adapted under God's guidance. Boundary stones (v. 28) marked family land given by lot in Joshua's day; moving one was theft that could ruin a family.",
    words: [
      { v: 6, s: 2596, note: "Chanakh, \"train up\": to dedicate or start, used of dedicating a house or the temple. It is the root of the word Hanukkah." },
      { v: 28, s: 1366, note: "Gevul, \"boundary\": the marker of a family's inheritance. Deuteronomy 19:14 forbids moving it." },
    ],
  },
  {
    book: "proverbs",
    chapter: 23,
    title: "Do not wear yourself out to get rich",
    setting:
      "The words of the wise continue with counsel for young men entering public life: how to act at a ruler's table, how to treat wealth, how to handle drink. Dining with powerful people in the ancient world tested self control, and a careless word could cost a career. The longest passage (vv. 29 to 35) is a vivid portrait of drunkenness, written with almost comic realism and real sorrow.",
    words: [
      { v: 11, s: 1350, note: "Gaal, \"Redeemer\": the go'el was a close relative bound to rescue family in trouble, buying back land or a person (Ruth 4). Here God Himself is the orphan's Redeemer." },
      { v: 2, s: 7915, note: "Sakkin, \"knife\": put a knife to your throat. At a powerful person's table, restrain your appetite before it gives you away." },
    ],
  },
  {
    book: "proverbs",
    chapter: 24,
    title: "Rescue those being led away",
    setting:
      "The words of the wise end at verse 22, then a short appendix follows: \"These also are sayings of the wise\" (vv. 23 to 34). The chapter calls for courage to protect the unjustly condemned, warns against gloating when an enemy falls, and ends with a firsthand story. A teacher walks past a lazy man's vineyard and finds it overrun with thorns, its stone wall collapsed, a scene every farmer knew.",
    words: [
      { v: 12, s: 8505, note: "Takhan, \"weigh\": to measure. God weighs hearts, so \"we did not know\" is not an excuse He accepts." },
      { v: 31, s: 7063, note: "Qimmashon, \"thorns\": weeds that take over untended ground. Neglect, not dramatic sin, ruined this field." },
    ],
  },
  {
    book: "proverbs",
    chapter: 25,
    title: "Copied by Hezekiah's men",
    setting:
      "A new collection begins: proverbs of Solomon copied by the men of King Hezekiah of Judah, around 700 BC, more than two centuries after Solomon. Hezekiah led a revival (2 Chronicles 29 to 31), and his scribes gathered and preserved older wisdom. Chapters 25 to 27 lean on vivid pictures from nature and daily life: snow in summer, rain clouds, gold jewelry, a broken tooth, a city with its walls down.",
    words: [
      { v: 1, s: 6275, note: "Ataq, \"copied\": to move or transfer, here from one source into another. Scripture was preserved through faithful, ordinary scribal work." },
      { v: 2, s: 5641, note: "Satar, \"conceal\": to hide. God's glory includes mysteries beyond us; a king's glory is to search matters out." },
    ],
  },
  {
    book: "proverbs",
    chapter: 26,
    title: "Fools, sluggards and gossips",
    setting:
      "The Hezekiah collection continues with three portraits: the fool (vv. 1 to 12), the sluggard (vv. 13 to 16) and the troublemaker who stirs up strife with words (vv. 17 to 28). Verses 4 and 5 sit side by side and seem to contradict: do not answer a fool, then answer a fool. The editors placed them together on purpose. Proverbs take wisdom to apply, because you must know which situation you are in.",
    words: [
      { v: 20, s: 7279, note: "Ragan, \"gossip\": to whisper or murmur. Fire needs wood; a quarrel needs someone feeding it with talk." },
    ],
  },
  {
    book: "proverbs",
    chapter: 27,
    title: "Iron sharpens iron",
    setting:
      "Most of Israel lived by farming and herding, and this chapter ends with a short poem (vv. 23 to 27) urging a herdsman to know his flocks, because riches do not last but lambs and goats keep giving clothing, food and milk. Before that come sayings on friendship, neighbors, boasting and praise. In a world with no safety net, a loyal friend or nearby neighbor could mean survival.",
    words: [
      { v: 17, s: 2300, note: "Chadad, \"sharpens\": to make sharp. Friends shape each other by friction, not flattery." },
      { v: 6, s: 539, note: "Aman, \"faithful\": trustworthy, related to \"amen.\" A friend's wounds can be trusted because they come from loyalty." },
    ],
  },
  {
    book: "proverbs",
    chapter: 28,
    title: "Bold as a lion",
    setting:
      "The Hezekiah collection turns toward justice, rulers and the law. Many sayings contrast the honest poor with the crooked rich, and wise rulers with oppressive ones. Torah, God's instruction, appears more often here than anywhere else in Proverbs, tying wisdom directly to the covenant. The chapter also holds one of the Old Testament's clearest words on confessing sin, echoing Psalm 32.",
    words: [
      { v: 13, s: 7355, note: "Racham, \"find mercy\": compassion, from the same root as \"womb.\" God's mercy to the one who confesses is tender, like a mother's." },
      { v: 1, s: 3715, note: "Kephir, \"lion\": a young, strong lion. A clear conscience gives courage; guilt makes you run when no one is chasing." },
    ],
  },
  {
    book: "proverbs",
    chapter: 29,
    title: "Where there is no vision",
    setting:
      "The last chapter of the Hezekiah collection focuses on leaders, discipline and the health of a nation, noting again and again what happens when the righteous or the wicked rule. Verse 18 is often quoted about leadership vision, but in Hebrew it refers to prophetic revelation from God. When God's word is ignored or scarce, as in Eli's day (1 Samuel 3:1), a people comes apart.",
    words: [
      { v: 18, s: 2377, note: "Chazon, \"vision\": a prophet's revelation, not a strategic plan. Without God's word, a people loses its restraint." },
      { v: 18, s: 6544, note: "Para, \"cast off restraint\": to let loose. It describes Israel running wild at the golden calf (Exodus 32:25)." },
    ],
  },
  {
    book: "proverbs",
    chapter: 30,
    title: "The words of Agur",
    setting:
      "This chapter is credited to Agur son of Jakeh, who is otherwise unknown. \"Oracle\" may also be a place name, Massa, an Arabian tribe descended from Ishmael (Genesis 25:14), which would make Agur a non Israelite who feared God. He begins in humility, confessing what he does not know. Most of the chapter uses numerical sayings, \"three things, even four,\" that build to a final example.",
    words: [
      { v: 1, s: 4853, note: "Massa, \"burden\" or \"oracle\": a weighty message, often used of prophecy. Some read it here as the name of Agur's people." },
      { v: 5, s: 6884, note: "Tsaraph, \"flawless\": refined, like metal tested in fire. God's words have been through the fire and hold true." },
    ],
  },
  {
    book: "proverbs",
    chapter: 31,
    title: "A woman of valor",
    setting:
      "The last chapter has two parts. First, King Lemuel, otherwise unknown, records what his mother taught him: avoid excess, and use power to defend the voiceless. In ancient courts the queen mother often had real influence. Then comes an acrostic poem (vv. 10 to 31), each verse starting with the next letter of the Hebrew alphabet, praising a capable wife. Many Jewish families still sing it on the Sabbath.",
    words: [
      { v: 10, s: 2428, note: "Chayil, \"noble character\": strength, valor, ability, often used of warriors. Ruth is called a woman of chayil (Ruth 3:11)." },
      { v: 8, s: 483, note: "Illem, \"mute\": unable to speak. A king's power exists to speak up for those who have no voice." },
    ],
  },
];
