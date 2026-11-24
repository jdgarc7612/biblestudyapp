/**
 * Setting cards (see context-notes.ts for the guardrails), drafted by Claude for Josh's review, Nov 2026.
 * Every Strong's number is checked against the bundled interlinear (tests/context-notes.test.ts).
 */

import type { ContextNote } from "./context-notes";

export const CONTEXT_NOTES_LAW_KINGS_CHRONICLES: ContextNote[] = [
  {
    book: "leviticus",
    chapter: 1,
    title: "The burnt offering",
    setting:
      "Leviticus picks up where Exodus ends: the tabernacle is finished and God's glory fills it. So how can sinful people live near a holy God? Chapters 1 to 7 answer with five kinds of offering. The burnt offering comes first. A worshiper brought what he could afford, from a bull down to a pair of birds, and the whole animal was burned on the altar, expressing atonement and full surrender.",
    words: [
      { v: 3, s: 5930, note: "Olah, \"burnt offering\": Literally \"that which goes up,\" because the whole animal rose to God as smoke. Neither worshiper nor priest kept any of it." },
      { v: 4, s: 5564, note: "Samakh, \"lay (hand)\": To lean or press. The worshiper pressed his hand on the animal's head, marking it as standing in his place." },
    ],
  },
  {
    book: "leviticus",
    chapter: 2,
    title: "The grain offering",
    setting:
      "Not every offering involved blood. The grain offering was a gift of fine flour, oil and frankincense, sometimes baked into cakes. Israel's farmers brought the work of their own fields: a small portion went up in smoke, and the rest fed the priests, who owned no land. The word for this offering also meant tribute paid to a king, so bringing it honored the LORD as Israel's true ruler.",
    words: [
      { v: 3, s: 4503, note: "Minchah, \"offering\": A gift or tribute, used for presents to a superior (Genesis 32:13) and payments to a king. Here Israel's farmers honor their King." },
    ],
  },
  {
    book: "leviticus",
    chapter: 3,
    title: "The peace offering",
    setting:
      "The peace offering (or fellowship offering) was the one sacrifice the worshiper got to eat. The fat and certain organs were burned for the LORD, a portion went to the priest, and the family shared the rest in a meal. In a world where most people rarely ate meat, this was a feast. It celebrated a relationship already at peace with God, and was often given in thanks or to fulfill a vow.",
    words: [
      { v: 1, s: 8002, note: "Shelem, \"peace offering\": Related to shalom, wholeness and well being. It celebrated peace with God rather than trying to earn it." },
    ],
  },
  {
    book: "leviticus",
    chapter: 4,
    title: "The sin offering",
    setting:
      "Chapters 4 and 5 deal with sin offerings for wrongs done unintentionally: through carelessness, ignorance or weakness rather than open defiance. The animal scaled with responsibility: a bull for the anointed priest or the whole community, a male goat for a leader, a female goat or lamb for an ordinary person. The higher the role, the further the blood was carried into the sanctuary.",
    words: [
      { v: 2, s: 7684, note: "Shegagah, \"unintentionally\": From a verb meaning to stray or go astray. These are real sins done without deliberate defiance, and they still needed atonement." },
    ],
  },
  {
    book: "leviticus",
    chapter: 5,
    title: "Confession and the guilt offering",
    setting:
      "This chapter names sins people might hide, such as staying silent as a witness or breaking a careless oath, and requires confession. Then God makes room for the poor: two birds, or even a little flour, could take the place of a lamb. No one was too poor to be forgiven. The guilt offering follows, for misusing holy things, and the wrongdoer repaid the full value plus a fifth.",
    words: [
      { v: 6, s: 817, note: "Asham, \"guilt offering\": A word for guilt and for the payment that answers it. Isaiah 53:10 uses it of the Servant who makes His life an asham." },
    ],
  },
  {
    book: "leviticus",
    chapter: 6,
    title: "Fire that never goes out",
    setting:
      "English Bibles begin chapter 6 at what Hebrew Bibles count as 5:20, so verse numbers differ between translations. The first verses finish the guilt offering: cheating a neighbor is also unfaithfulness to the LORD. Then the focus turns to the priests, with instructions for handling each offering and for keeping the altar fire burning day and night as Israel camped in the wilderness.",
    words: [
      { v: 13, s: 8548, note: "Tamid, \"continually\": Regular, constant. The altar fire was never allowed to die, a sign that the way to God stayed open day and night." },
    ],
  },
  {
    book: "leviticus",
    chapter: 7,
    title: "Rules for the peace offering",
    setting:
      "This chapter finishes the priests' manual for the five offerings. It explains which portions belonged to the priests, whose tribe had no farmland, and describes three kinds of peace offering: thanksgiving, vow and freewill. The meat had to be eaten within a day or two, before it spoiled in the desert heat, and only by people who were ceremonially clean. Fat and blood belonged to God alone.",
    words: [
      { v: 12, s: 8426, note: "Todah, \"thanksgiving\": From the verb for praise and confession. The same word names thank offerings and songs of thanks in the Psalms (Psalm 107:22)." },
    ],
  },
  {
    book: "leviticus",
    chapter: 8,
    title: "Aaron and his sons ordained",
    setting:
      "Exodus 29 gave the instructions; here Moses carries them out before the whole community. Aaron and his sons were washed, dressed in priestly garments and anointed with oil, then stayed at the tent's entrance for seven days while sacrifices were offered for them. Blood on the right ear, thumb and big toe marked their whole lives, what they heard, did and where they walked, as set apart for God.",
    words: [
      { v: 10, s: 4886, note: "Mashach, \"anoint\": To smear with oil, setting someone apart for a task. The noun mashiach, \"anointed one,\" gives us the word Messiah." },
    ],
  },
  {
    book: "leviticus",
    chapter: 9,
    title: "Glory and fire on the eighth day",
    setting:
      "After seven days of ordination, Aaron offers his first sacrifices as high priest: for himself first, then for the people. This is the moment the whole system had been building toward since Sinai. When the offerings were complete, Aaron blessed the people, the glory of the LORD appeared to everyone, and fire came out from His presence to consume the sacrifice. God accepted the worship He had commanded.",
    words: [
      { v: 23, s: 3519, note: "Kavod, \"glory\": Literally \"weight\" or heaviness: the substance and splendor of God's presence made visible." },
    ],
  },
  {
    book: "leviticus",
    chapter: 10,
    title: "Nadab and Abihu",
    setting:
      "On the very day public worship began, Aaron's two eldest sons offered incense with fire God had not commanded, and fire from the LORD consumed them. The text does not explain every detail of their sin; some interpreters connect it with the warning about wine in verse 9. Aaron's family is told not to mourn publicly, and the chapter ends with Moses accepting Aaron's explanation over a sin offering.",
    words: [
      { v: 1, s: 2114, note: "Zur, \"strange\": The form zarah describes fire that was \"strange\" or \"unauthorized.\" Not necessarily pagan, simply not what God had asked for." },
    ],
  },
  {
    book: "leviticus",
    chapter: 11,
    title: "Clean and unclean animals",
    setting:
      "Chapters 11 to 15 deal with clean and unclean, the ritual status that decided who could come near the sanctuary. Unclean did not mean sinful or dirty: touching a carcass or giving birth made a person unclean with no wrongdoing involved. Scholars suggest several reasons for the food laws, such as health, avoiding pagan practice or symbolism, but the text's own reason is holiness: Israel was to be distinct.",
    words: [
      { v: 4, s: 2931, note: "Tame, \"unclean\": A ritual status, not moral filth. It barred a person or thing from the sanctuary until cleansing, often by washing and waiting until evening." },
    ],
  },
  {
    book: "leviticus",
    chapter: 12,
    title: "Purification after childbirth",
    setting:
      "Childbirth involved blood loss, and in Leviticus contact with blood and bodily fluids made a person ritually unclean for a time. That was no judgment on the mother or the baby; children are a gift from the LORD (Psalm 127:3). After a set time of recovery she brought a burnt offering and a sin offering, or two birds if she was poor. Mary did exactly this after Jesus was born (Luke 2:22, 24).",
    words: [
      { v: 2, s: 5079, note: "Niddah, \"impurity\": The usual term for menstrual impurity. Childbirth was treated in the same way: a temporary condition, not a sin." },
    ],
  },
  {
    book: "leviticus",
    chapter: 13,
    title: "Diagnosing skin disease",
    setting:
      "The Hebrew word often translated \"leprosy\" covers a range of skin conditions, and even mold on cloth. It is not the same as Hansen's disease, modern leprosy. The priest acted less like a doctor and more like a public health inspector: he examined, waited a week if unsure, and declared clean or unclean. A person with an active case lived outside the camp, cut off from worship and community.",
    words: [
      { v: 2, s: 6883, note: "Tsaraat, \"skin disease\": A broad term for scaly or spreading conditions of skin, cloth and walls. Its exact medical identity is uncertain." },
    ],
  },
  {
    book: "leviticus",
    chapter: 14,
    title: "Restored to the community",
    setting:
      "This chapter is the hopeful counterpart to chapter 13. The priest went outside the camp to examine someone who had recovered, then led a ceremony in stages: two birds outside the camp, washing and shaving, then a week later offerings at the tabernacle. Healing came first; the ritual restored the person to worship and community. The second half applies similar rules to mold in houses in the promised land.",
    words: [
      { v: 4, s: 6833, note: "Tsippor, \"bird\": A small bird such as a sparrow. One died over fresh water; the other, dipped in its blood, was set free." },
    ],
  },
  {
    book: "leviticus",
    chapter: 15,
    title: "Bodily discharges",
    setting:
      "This chapter deals plainly with normal and abnormal discharges from men and women, including semen and menstruation. Such conditions made a person ritually unclean for a time, meaning they stayed away from the sanctuary, not that they had sinned. Washing and waiting restored them, and a long illness ended with an offering. The rules applied to both sexes and guarded the holiness of God's dwelling in the camp.",
    words: [
      { v: 2, s: 2101, note: "Zov, \"discharge\": A flow from the body. The woman in Mark 5:25 with twelve years of bleeding lived under this law until Jesus healed her." },
    ],
  },
  {
    book: "leviticus",
    chapter: 17,
    title: "The life is in the blood",
    setting:
      "Chapters 17 to 26 are often called the Holiness Code. They begin with sacrifice and blood. Sacrificial animals were to be brought to the tabernacle, not slaughtered in the open fields, where some Israelites were offering sacrifices to goat idols. Blood was never to be eaten, because the life of a creature was in its blood, and God had given blood on the altar to make atonement.",
    words: [
      { v: 11, s: 5315, note: "Nephesh, \"life\": The breathing life of a creature, often translated \"soul.\" The blood carried that life, and so it belonged to God." },
      { v: 11, s: 1818, note: "Dam, \"blood\": Here blood stands for a life given up. Hebrews 9:22 echoes this verse: without the shedding of blood there is no forgiveness." },
    ],
  },
  {
    book: "leviticus",
    chapter: 18,
    title: "Not like Egypt or Canaan",
    setting:
      "Israel was leaving Egypt and heading for Canaan, and both cultures accepted practices God forbade. This chapter sets the boundaries of sexual life for Israel: no sex with close relatives, no adultery, no sex during menstruation, no sex between men, no bestiality, and no child sacrifice to Molech. God warns that the land itself had \"vomited out\" its inhabitants for these practices.",
    words: [
      { v: 3, s: 2708, note: "Chuqqah, \"customs\": A fixed rule or custom. Israel was to leave behind the customs of Egypt and Canaan and live by God's statutes." },
    ],
  },
  {
    book: "leviticus",
    chapter: 19,
    title: "Be holy, love your neighbor",
    setting:
      "This chapter is the heart of the Holiness Code. It places laws we might call religious, moral and ceremonial side by side, because for Israel all of life belonged to God. Farmers left the edges of fields for the poor, workers were paid the same day, and the deaf and blind were protected. Here is \"love your neighbor as yourself,\" which Jesus called the second greatest commandment (Matthew 22:39).",
    words: [
      { v: 2, s: 6918, note: "Qadosh, \"holy\": Set apart, distinct. Holiness here is not withdrawal from life but a whole way of living that reflects God's character." },
      { v: 9, s: 6285, note: "Peah, \"edges\": The edges of the field left unharvested for the poor and foreigners. Ruth gleaned under this law (Ruth 2)." },
    ],
  },
  {
    book: "leviticus",
    chapter: 20,
    title: "Penalties for breaking holiness",
    setting:
      "Chapter 20 repeats many laws from chapter 18 but adds the penalties. Child sacrifice to Molech, a god linked with offering children by fire, heads the list, along with consulting mediums and spiritists. Many penalties were death, showing how seriously Israel's covenant life was guarded. The chapter closes with God's reason: He had set Israel apart from the nations to be His own.",
    words: [
      { v: 2, s: 4432, note: "Molech, \"Molech\": A god linked with child sacrifice. Kings Ahaz and Manasseh later burned their sons (2 Kings 16:3; 21:6), and Jeremiah condemned it (Jeremiah 32:35)." },
    ],
  },
  {
    book: "leviticus",
    chapter: 21,
    title: "Holiness for the priests",
    setting:
      "Priests served closer to the sanctuary than anyone else, so stricter rules applied to them. They could mourn only close family, and their choice of wife was limited. The high priest could not approach a dead body even for his parents. A priest with a physical defect still ate the holy food but could not serve at the altar; the rule pictured wholeness at God's altar, not a person's worth.",
    words: [
      { v: 17, s: 3971, note: "Mum, \"defect\": A blemish or physical flaw. The same word is used of sacrificial animals, which also had to be whole." },
    ],
  },
  {
    book: "leviticus",
    chapter: 22,
    title: "Holy food and acceptable gifts",
    setting:
      "Priests and their households lived on the holy portions of Israel's offerings. This chapter sets out who could eat them: not an unclean priest, a guest or a hired worker, but a slave in the priest's household or a widowed daughter who had come home. It also requires that animals offered to God be without defect. Giving God damaged goods treated Him with contempt, a problem Malachi later confronted.",
    words: [
      { v: 20, s: 7522, note: "Ratson, \"acceptance\": Favor or goodwill. An animal with a defect would not be accepted on the worshiper's behalf." },
    ],
  },
  {
    book: "leviticus",
    chapter: 23,
    title: "The LORD's appointed feasts",
    setting:
      "Israel's calendar was built around worship. This chapter lists the weekly Sabbath and the yearly feasts: Passover and Unleavened Bread in spring, Firstfruits, the Feast of Weeks (Pentecost) fifty days later, then Trumpets, the Day of Atonement and Booths in the autumn. Most were tied to the farming year, so harvest and worship went together. Several became key moments in Jesus' life and the church's birth.",
    words: [
      { v: 2, s: 4150, note: "Moed, \"appointed feasts\": A set time or meeting. These were God's appointments with His people, fixed in the calendar." },
      { v: 2, s: 4744, note: "Miqra, \"assembly\": A sacred gathering, literally a \"calling together.\" On these days the whole community was summoned." },
    ],
  },
  {
    book: "leviticus",
    chapter: 24,
    title: "Lamp, bread and a blasphemer",
    setting:
      "Two short instructions about daily worship, oil for the lampstand and bread set before the LORD every Sabbath, lead into a rare story in Leviticus. During a fight, a man with an Israelite mother and an Egyptian father cursed God's name. Moses held him until the LORD gave a ruling. The judgment led to laws about injury, including \"eye for eye,\" applied equally to Israelites and foreigners.",
    words: [
      { v: 11, s: 7043, note: "Qalal, \"curse\": Its root meaning is \"to be light.\" To curse God's name was to treat as lightweight the One whose glory is literally \"weight.\"" },
    ],
  },
  {
    book: "leviticus",
    chapter: 25,
    title: "Sabbath year and Jubilee",
    setting:
      "Every seventh year the land rested, and every fiftieth year was the Jubilee. Land returned to its original family, and Israelites who had sold themselves into service went free. Because the land belonged to God, it could not be sold permanently, only leased until Jubilee. Whether Israel ever fully kept the Jubilee is uncertain, but the prophets and Jesus drew on its picture of release.",
    words: [
      { v: 10, s: 3104, note: "Yovel, \"Jubilee\": Probably from the word for a ram's horn trumpet, blown to announce the year." },
      { v: 10, s: 1865, note: "Deror, \"liberty\": Release, freedom. Isaiah 61:1 uses it, and Jesus read that passage to announce His ministry (Luke 4:18)." },
    ],
  },
  {
    book: "leviticus",
    chapter: 26,
    title: "Blessings and warnings",
    setting:
      "Like ancient treaties between kings and their subjects, Israel's covenant ends with blessings for faithfulness and curses for rebellion. Rain, harvest, peace and God's presence are promised first. Then come warnings in rising waves, ending in exile. Yet the chapter closes with hope: if Israel confesses its sin, God will remember His covenant with Abraham, Isaac and Jacob, even in a foreign land.",
    words: [
      { v: 12, s: 1980, note: "Halakh, \"walk\": God promises to walk among His people, the same verb used of Him walking in the garden in Genesis 3:8." },
      { v: 13, s: 6968, note: "Qomemiyut, \"uprightness\": Literally \"standing tall.\" God broke the yoke so Israel could walk with heads held high." },
    ],
  },
  {
    book: "leviticus",
    chapter: 27,
    title: "Vows and dedications",
    setting:
      "Leviticus ends with a practical appendix on vows. Israelites sometimes promised a person, animal, house or field to the LORD, often in gratitude or in a crisis. Since people were never sacrificed, this chapter sets a price to be paid to the sanctuary instead, based on age and sex, probably reflecting expected work value. It also covers buying back dedicated property and the tithe that belonged to the LORD.",
    words: [
      { v: 2, s: 6187, note: "Erekh, \"valuation\": An assessed value. Vows to God were serious, so their worth was set in silver rather than left vague." },
    ],
  },
  {
    book: "numbers",
    chapter: 1,
    title: "Counting Israel's fighting men",
    setting:
      "Numbers opens about thirteen months after the exodus, with Israel still camped at Sinai. Before the march toward Canaan, God orders a military census of men twenty and older, tribe by tribe, the way ancient armies were mustered. The Levites are left out because they guard the tabernacle. The huge total of 603,550 is debated: some read eleph as \"thousand,\" others as a clan or troop unit, which gives smaller numbers.",
    words: [
      { v: 3, s: 6635, note: "Tsava, \"army\": A mustered host, the word behind God's title \"LORD of hosts.\" Israel leaves Sinai organized not as a mob of runaway slaves but as God's army." },
      { v: 53, s: 4931, note: "Mishmeret, \"charge\": Guard duty or a watch. The Levites camp in a ring around the tabernacle on guard, so that God's wrath does not break out on careless people." },
    ],
  },
  {
    book: "numbers",
    chapter: 2,
    title: "The camp arranged around God's tent",
    setting:
      "Still at Sinai, Israel receives a fixed layout for camping and marching. Three tribes camp on each side of the tabernacle, with Judah on the east toward the sunrise, where the tent's entrance faced. Each group rallies under its own standard. Egyptian reliefs of Ramesses II's army show a similar rectangular camp with the king's tent at the center. In Israel's camp the King at the center is the LORD.",
    words: [
      { v: 2, s: 1714, note: "Degel, \"standard\": A banner marking a tribal division. Song of Songs 2:4 uses the same word: \"his banner over me is love.\"" },
    ],
  },
  {
    book: "numbers",
    chapter: 3,
    title: "The Levites in place of the firstborn",
    setting:
      "At the first Passover God spared Israel's firstborn sons while Egypt's died, and from then on every firstborn belonged to Him (Exodus 13). Now God takes the tribe of Levi in their place to serve at the tabernacle under Aaron's priestly family. Aaron's two older sons had already died for offering unauthorized fire (Leviticus 10). The 273 firstborn beyond the number of Levites are redeemed with silver.",
    words: [
      { v: 12, s: 6363, note: "Peter, \"firstborn\": Literally \"what opens the womb.\" Every first opening of the womb was claimed by God, a standing reminder that life is His gift." },
      { v: 49, s: 6306, note: "Pidyom, \"redemption\": The ransom price paid so that a life claimed by God is released. Five shekels bought back each extra firstborn son." },
    ],
  },
  {
    book: "numbers",
    chapter: 4,
    title: "Carrying the holy things",
    setting:
      "Chapter 3 listed the Levite clans; chapter 4 assigns their work whenever the cloud lifted and the tabernacle had to move. Only men aged thirty to fifty served. Aaron and his sons first wrapped the holy furniture in cloth and leather. Then the Kohathites carried it on their shoulders, while the Gershonites took the curtains and the Merarites the frames, posts and bases. Moving God's dwelling was skilled, careful work.",
    words: [
      { v: 20, s: 1104, note: "Bala, \"even for a moment\": Literally \"as a swallowing,\" perhaps the time it takes to gulp. Even a glance at the uncovered holy things was deadly for the Kohathites." },
    ],
  },
  {
    book: "numbers",
    chapter: 5,
    title: "Purity, restitution and the jealousy ordeal",
    setting:
      "God lived at the center of Israel's camp, so whatever defiled it had to be dealt with. The chapter moves from skin disease and contact with the dead, to wrongs done to a neighbor, to a husband's suspicion of adultery with no witnesses. Elsewhere in the ancient Near East such cases could be settled by ordeal, like throwing the accused into a river. Israel's rite carried no physical danger and left the verdict to God.",
    words: [
      { v: 7, s: 3034, note: "Yadah, \"confess\": The same verb usually means \"give thanks\" or \"praise.\" Confession is saying out loud what is true before God, whether about our sin or His goodness." },
    ],
  },
  {
    book: "numbers",
    chapter: 7,
    title: "Gifts from the twelve tribal leaders",
    setting:
      "This chapter steps back a month to the day the tabernacle was finished and anointed (Exodus 40:17). Over twelve days the leader of each tribe brought an identical set of gifts: a silver plate and bowl, a gold dish of incense, and animals for sacrifice. Ancient temple records often listed donations item by item, and here every tribe's offering is written out in full. Six carts went to the Levites for the heavy loads.",
    words: [
      { v: 10, s: 2598, note: "Chanukkah, \"dedication\": A setting apart for first use. The same word later named the Jewish Feast of Dedication, which Jesus attended in John 10:22." },
      { v: 89, s: 3727, note: "Kapporet, \"mercy seat\": The gold lid of the ark, related to the verb for atonement. From above it, between the cherubim, God's voice speaks to Moses." },
    ],
  },
  {
    book: "numbers",
    chapter: 8,
    title: "Lamps lit and Levites set apart",
    setting:
      "Before Israel leaves Sinai, two things are put in order at the tabernacle. Aaron sets up the seven lamps of the gold lampstand so they shine forward, lighting the Holy Place where the priests served. Then the Levites are cleansed, shaved and presented to God, with Israel's representatives laying hands on them. They become Israel's living offering, given to help the priests in place of the firstborn.",
    words: [
      { v: 4, s: 4501, note: "Menorah, \"lampstand\": Hammered from a single piece of gold and decorated with cups like almond blossoms (Exodus 25:31 to 36), it looked like a tree in flower, a picture of life in God's presence." },
    ],
  },
  {
    book: "numbers",
    chapter: 9,
    title: "Passover in the wilderness and the guiding cloud",
    setting:
      "A year after leaving Egypt, Israel keeps Passover at Sinai, the first anniversary of their rescue. Some men had become ritually unclean through contact with a dead body and could not take part, so they asked Moses what to do. God provides a second Passover one month later. The chapter then describes the cloud over the tabernacle, which glowed like fire at night and told Israel when to march and when to stay.",
    words: [
      { v: 15, s: 6051, note: "Anan, \"cloud\": The cloud of God's presence that led Israel from the Red Sea onward. At Jesus' transfiguration a bright cloud covered the disciples and the Father spoke from it (Matthew 17:5)." },
    ],
  },
  {
    book: "numbers",
    chapter: 10,
    title: "Silver trumpets and the first march",
    setting:
      "On the twentieth day of the second month of the second year, the cloud lifts and Israel leaves Sinai after nearly a year there. Two silver trumpets are made to gather the assembly, signal the march, sound the alarm in battle and mark the festivals. Moses asks Hobab, his Midianite relative by marriage who knew the desert, to guide them. The ark goes ahead to find them a place to rest.",
    words: [
      { v: 2, s: 2689, note: "Chatsotserah, \"trumpet\": A straight metal trumpet, unlike the curved ram's horn. Two such trumpets appear on the Arch of Titus among the treasures Rome carried off from the Jerusalem temple in AD 70." },
    ],
  },
  {
    book: "numbers",
    chapter: 11,
    title: "Complaining, quail and seventy elders",
    setting:
      "Only days after leaving Sinai the complaints begin. The mixed crowd of non Israelites who came out of Egypt with them (Exodus 12:38) stirs up a craving for Egypt's fish, cucumbers, leeks and onions, and the people grow sick of manna. Moses, crushed by the weight of leading them, asks God to let him die. God shares the Spirit on Moses with seventy elders and sends quail, along with judgment.",
    words: [
      { v: 23, s: 7114, note: "Qatser, \"too short\": An idiom for weakness, a hand that cannot reach. Isaiah 59:1 answers the question: the LORD's hand is not too short to save." },
    ],
  },
  {
    book: "numbers",
    chapter: 12,
    title: "Miriam and Aaron oppose Moses",
    setting:
      "Moses' sister Miriam, a prophet who led Israel's song at the sea (Exodus 15:20), and his brother Aaron speak against him. The stated complaint is his Cushite wife; Cush was the land south of Egypt, roughly modern Sudan. Whether she was Zipporah or a second wife is debated. The real issue surfaces quickly: has the LORD spoken only through Moses? God answers by defending Moses Himself.",
    words: [
      { v: 3, s: 6035, note: "Anav, \"humble\": Lowly, not grasping for status. Moses does not defend himself here; God does. Psalm 37:11 promises the humble will inherit the land, words Jesus echoes in Matthew 5:5." },
    ],
  },
  {
    book: "numbers",
    chapter: 13,
    title: "Twelve spies scout Canaan",
    setting:
      "From the wilderness of Paran near Kadesh, on Canaan's southern edge, Moses sends one leader from each tribe to scout the land for forty days. They range far to the north and bring back a cluster of grapes so heavy two men carry it on a pole. Canaan was a patchwork of walled city states, and Hebron was an old, strongly held town. Ten spies see giants; Caleb sees a gift.",
    words: [
      { v: 32, s: 1681, note: "Dibbah, \"bad report\": A damaging, slanderous report, the word Proverbs 10:18 uses for spreading slander. The ten spies did not just describe danger; they slandered God's gift." },
      { v: 30, s: 3201, note: "Yakhol, \"we can certainly\": Caleb doubles the verb, literally \"able, we are able.\" Same land, same facts, read through trust in God." },
    ],
  },
  {
    book: "numbers",
    chapter: 14,
    title: "Israel refuses the land",
    setting:
      "The spies' report sets off a night of weeping. The people talk of choosing a new leader and going back to Egypt, and they threaten to stone Joshua and Caleb. When God threatens to destroy them, Moses pleads on the basis of God's own character from Exodus 34. God forgives, but the adult generation will die in the desert over forty years, one year for each day the spies were gone.",
    words: [
      { v: 18, s: 750, note: "Arekh appayim, \"slow to anger\": Literally \"long of nostrils,\" an idiom for a slow burning temper. Moses holds God to His own words in Exodus 34:6." },
      { v: 24, s: 4390, note: "Male, \"wholeheartedly\": Literally Caleb \"filled after\" God, followed Him to the full. It is the verb used for filling a vessel to the brim." },
    ],
  },
  {
    book: "numbers",
    chapter: 15,
    title: "Offerings, defiant sin and blue tassels",
    setting:
      "After the disaster of chapter 14, God gives laws that begin, \"When you enter the land.\" The promise still stands for the next generation. The chapter covers grain and drink offerings, sins committed unintentionally, and sins committed defiantly. A man caught gathering wood on the Sabbath becomes a test case and is put to death, and Israel is told to wear tassels with a blue cord as a reminder of God's commands.",
    words: [
      { v: 38, s: 6734, note: "Tsitsit, \"tassels\": Twisted fringes tied at the corners of a garment. Observant Jews still wear them, and the woman who touched the edge of Jesus' cloak probably grasped one (Matthew 9:20)." },
    ],
  },
  {
    book: "numbers",
    chapter: 16,
    title: "Korah's rebellion",
    setting:
      "Korah, a Levite from the Kohathite clan that carried the holy things, joins Dathan and Abiram from Reuben, the tribe of Jacob's firstborn, along with 250 leaders. Korah wants the priesthood; the Reubenites resent Moses' leadership. They claim the whole community is holy, so why should Moses and Aaron rule over it? A test with incense censers ends in judgment, and Aaron stands between the living and the dead.",
    words: [
      { v: 3, s: 6918, note: "Qadosh, \"holy\": Korah's claim sounds true, since all Israel was called to be holy (Exodus 19:6). But he uses a true word to seize a role God had not given him." },
      { v: 30, s: 1278, note: "Beriah, \"something unprecedented\": Literally \"a creation,\" from bara, the verb of Genesis 1. Moses asks God to create something new to show who sent him." },
    ],
  },
  {
    book: "numbers",
    chapter: 17,
    title: "Aaron's staff buds",
    setting:
      "After Korah's revolt and the plague that followed, the people are terrified and still unsure whom God has chosen. God settles it with a test. Each tribal leader's name is written on his staff, a shepherd's rod and a sign of authority, and the twelve are left overnight in the tabernacle before the ark. By morning Aaron's dry stick has sprouted, blossomed and produced ripe almonds all at once.",
    words: [
      { v: 8, s: 8247, note: "Shaqed, \"almonds\": The almond tree blooms first each year, and its name sounds like the Hebrew for \"watching.\" God uses that wordplay in Jeremiah 1:11 to 12: He is watching over His word." },
    ],
  },
  {
    book: "numbers",
    chapter: 18,
    title: "Duties and support for priests and Levites",
    setting:
      "The people have just cried out that anyone who comes near the tabernacle will die (17:12 to 13). God answers by restating who guards His holy things: the priests serve inside, the Levites help outside, and so the people are protected. Since priests and Levites receive no tribal land, they live on Israel's tithes and holy offerings, and the Levites in turn give a tenth of what they receive.",
    words: [
      { v: 20, s: 2506, note: "Cheleq, \"portion\": A share of land or goods. Aaron receives no land because God Himself is his portion, words later prayed in Psalm 16:5 and 73:26." },
    ],
  },
  {
    book: "numbers",
    chapter: 19,
    title: "The red heifer and water for cleansing",
    setting:
      "Thousands had died in the plague after Korah's revolt, and in the desert contact with death was unavoidable. Touching a corpse made a person ritually unclean, unfit to come near God's dwelling. So God provides a remedy: a flawless red heifer burned outside the camp with cedar wood, hyssop and scarlet yarn, its ashes mixed with water and sprinkled on the unclean on the third and seventh days.",
    words: [
      { v: 2, s: 6510, note: "Parah, \"heifer\": A young cow, here red and never yoked. Hebrews 9:13 to 14 recalls \"the ashes of a heifer\" and says Christ's blood cleanses the conscience far more." },
      { v: 9, s: 5079, note: "Niddah, \"purification\": The word itself means impurity, so this is water for impurity, made to remove it. God provides the cure for the very defilement He forbids." },
    ],
  },
  {
    book: "numbers",
    chapter: 20,
    title: "Miriam dies and Moses strikes the rock",
    setting:
      "Probably close to forty years have passed, and a new generation is back at Kadesh. Miriam dies there. With no water, the people quarrel with Moses just as their parents had. God tells Moses to speak to the rock; instead he angrily strikes it twice, and God bars him and Aaron from entering Canaan. Edom refuses Israel passage, and Aaron dies on Mount Hor after his garments pass to his son Eleazar.",
    words: [
      { v: 12, s: 6942, note: "Qadash, \"show My holiness\": To treat as holy, to honor as set apart. Moses' angry words and blows made God look harsh and made Moses the hero, instead of honoring God before the people." },
    ],
  },
  {
    book: "numbers",
    chapter: 21,
    title: "The bronze serpent and first victories",
    setting:
      "Israel's detour around Edom is long and hot, and the people again despise the manna. Venomous snakes, common in the deserts south of the Dead Sea, bite many. God's remedy is strange: a bronze snake raised on a pole. Then come Israel's first victories east of the Jordan, over Sihon king of the Amorites and Og king of Bashan, remembered in Israel's songs for generations (Psalm 136:19 to 20).",
    words: [
      { v: 8, s: 8314, note: "Saraph, \"fiery serpent\": Probably named for the burning pain of the bite. The same word names the seraphim, the burning ones around God's throne in Isaiah 6:2." },
      { v: 9, s: 5178, note: "Nechoshet, \"bronze\": A copper alloy. A small copper snake was found at a shrine in the Timna copper mines in this region, though any link to Moses' serpent is unknown." },
    ],
  },
  {
    book: "numbers",
    chapter: 22,
    title: "Balak hires Balaam",
    setting:
      "Israel camps on the plains of Moab across the Jordan from Jericho, and King Balak of Moab panics. He sends for Balaam, a famous diviner from Pethor near the Euphrates, to curse them. A plaster inscription found at Deir Alla in Jordan, from roughly the 700s BC, mentions \"Balaam son of Beor\" as a seer of the gods, so his fame lasted for centuries. On the road, his donkey sees what Balaam cannot.",
    words: [
      { v: 22, s: 7854, note: "Satan, \"to oppose\": An adversary, one who stands in the way. Here the angel of the LORD Himself is Balaam's adversary, blocking a man bent on profit." },
      { v: 6, s: 779, note: "Arar, \"curse\": To bind under a curse, the opposite of blessing. Balak thought a curse could be bought; he had not reckoned with God's promise in Genesis 12:3." },
    ],
  },
  {
    book: "numbers",
    chapter: 23,
    title: "Balaam's first two oracles",
    setting:
      "Balak takes Balaam to high places where he can see part of Israel's camp. They build seven altars and offer bulls and rams, a common way of seeking omens from the gods, and Balaam goes off alone hoping for a sign. But God puts words in his mouth, and instead of a curse Balaam pronounces blessing. Balak keeps moving to new viewpoints, hoping a different angle will change the result.",
    words: [
      { v: 19, s: 3576, note: "Kazav, \"lie\": To lie or deceive, like a stream that dries up when you need it. Pagan gods could be bargained with; Israel's God does not go back on His word." },
      { v: 23, s: 5173, note: "Nachash, \"spell\": Omen reading and divination, Balaam's own trade. No sorcery can work against the people God has blessed." },
    ],
  },
  {
    book: "numbers",
    chapter: 24,
    title: "Balaam's vision of a star",
    setting:
      "Balaam no longer looks for omens. Looking out over Israel's camp, tribe by tribe, he is seized by the Spirit of God, and his third oracle pictures Israel's tents like gardens beside a river. Balak furiously dismisses him, but Balaam adds a vision of a far future ruler from Israel who will crush Moab and Edom. Then he goes home, though chapter 31 shows he was not done with Israel.",
    words: [
      { v: 17, s: 3556, note: "Kokhav, \"star\": In the ancient world a star could picture a king. Jewish readers saw a coming ruler here, and the magi followed a star to the newborn King (Matthew 2:2)." },
      { v: 17, s: 7626, note: "Shevet, \"scepter\": A ruler's staff, echoing Jacob's promise that \"the scepter will not depart from Judah\" (Genesis 49:10)." },
    ],
  },
  {
    book: "numbers",
    chapter: 25,
    title: "Baal of Peor and the zeal of Phinehas",
    setting:
      "While Balaam's blessings ring out on the hills, Israel falls in the valley below. Camped at Shittim, Israelite men are drawn into sexual immorality with Moabite women and then into worshiping their god, Baal of Peor, at sacrificial meals. Chapter 31 reveals this was Balaam's advice. A plague breaks out, and when an Israelite leader brazenly brings a Midianite woman to his tent, Aaron's grandson Phinehas kills them both.",
    words: [
      { v: 3, s: 6775, note: "Tsamad, \"joined\": To yoke or bind together, like animals in a harness. Israel yoked itself to Baal; Paul uses similar imagery when he warns against being unequally yoked (2 Corinthians 6:14)." },
      { v: 11, s: 7065, note: "Qana, \"zealous\": The same root as jealousy. Phinehas shared God's jealous love for His people, a love that will not share them with another god." },
    ],
  },
  {
    book: "numbers",
    chapter: 26,
    title: "The second census",
    setting:
      "The plague at Peor marks the end of the old generation. On the plains of Moab across from Jericho, almost forty years after the first census, Moses and Eleazar count the fighting men again, tribe by tribe. The total, 601,730, is nearly the same as before, though some tribes have grown and others, like Simeon, have shrunk sharply. This time the census is for dividing the land as an inheritance.",
    words: [
      { v: 55, s: 1486, note: "Goral, \"lot\": A marked stone or token cast to reach a decision. Using lots placed the final allotment in God's hands (Proverbs 16:33)." },
      { v: 65, s: 3498, note: "Yatar, \"was left\": To remain or be left over. Of all the men counted at Sinai, only Caleb and Joshua remain, exactly as God had said in 14:30." },
    ],
  },
  {
    book: "numbers",
    chapter: 27,
    title: "Zelophehad's daughters and Joshua's commission",
    setting:
      "In Israel's tribal world, land normally passed from father to son, keeping property within each clan. Zelophehad of Manasseh died in the wilderness with five daughters and no sons, so his name and share of the land would vanish. His daughters stand at the tabernacle entrance before Moses, the priest and the whole assembly and make their case. Then God shows Moses the land and appoints Joshua to succeed him.",
    words: [
      { v: 7, s: 3651, note: "Ken, \"correctly\": Simply \"right\" or \"so.\" God's verdict on the daughters' request is a plain yes: they speak right." },
      { v: 20, s: 1935, note: "Hod, \"authority\": Splendor or majesty. Moses publicly shares some of his honor with Joshua so the people will follow him." },
    ],
  },
  {
    book: "numbers",
    chapter: 28,
    title: "Daily, weekly and monthly offerings",
    setting:
      "As Israel prepares to enter Canaan under new leadership, God sets out the public calendar of offerings the priests are to present on the nation's behalf: every morning and evening, every Sabbath, at each new moon, and at Passover and the Feast of Weeks. These are community offerings, separate from the gifts individuals brought. Israel's life in the land is to be framed by regular, unbroken worship.",
    words: [
      { v: 3, s: 8548, note: "Tamid, \"regular\": Continual, never lapsing. The morning and evening lambs kept worship going every day, and later Jewish tradition simply called this offering \"the Tamid.\"" },
      { v: 26, s: 1061, note: "Bikkur, \"firstfruits\": The first and best of the harvest, given to God before the rest was enjoyed. Paul calls the risen Christ \"the firstfruits of those who have fallen asleep\" (1 Corinthians 15:20)." },
    ],
  },
  {
    book: "numbers",
    chapter: 29,
    title: "The feasts of the seventh month",
    setting:
      "The seventh month, in early autumn after the summer harvest, held Israel's most important festival days. It opened with a day of trumpet blasts, followed on the tenth by the Day of Atonement, a solemn fast. On the fifteenth began the week long Feast of Booths, with a great number of bulls offered, decreasing each day from thirteen to seven, and then an eighth day of closing assembly.",
    words: [
      { v: 1, s: 8643, note: "Teruah, \"sound the trumpets\": A loud blast or shout. The first day of the seventh month later became Rosh Hashanah, the Jewish New Year." },
    ],
  },
  {
    book: "numbers",
    chapter: 30,
    title: "Keeping vows",
    setting:
      "Vows were a common part of ancient worship: a person promised God a gift or an act of self denial, often in a time of need. This chapter insists that a man must keep his word. It also addresses women in a household where a father or husband carried legal and financial responsibility. He could cancel her vow on the day he heard of it, but if he stayed silent, it stood.",
    words: [
      { v: 2, s: 5088, note: "Neder, \"vow\": A promise made to God, often conditional: \"If You do this, I will do that.\" Ecclesiastes 5:4 to 5 warns that it is better not to vow than to vow and not pay." },
    ],
  },
  {
    book: "numbers",
    chapter: 31,
    title: "War against Midian",
    setting:
      "Midian, a desert people allied with Moab, had helped draw Israel into the immorality and idolatry at Peor on Balaam's advice. God commands Moses, as his last major act, to carry out judgment on them. Twelve thousand men go, a thousand from each tribe, with Phinehas and the holy trumpets. Balaam dies among the Midianite kings. The chapter then deals with purifying the soldiers and dividing the plunder.",
    words: [
      { v: 2, s: 5358, note: "Naqam, \"take vengeance\": In Scripture this usually means God's just punishment of wrong, not personal revenge. Israel acts as His instrument here, while Paul tells believers to leave vengeance to God (Romans 12:19)." },
    ],
  },
  {
    book: "numbers",
    chapter: 32,
    title: "Reuben and Gad settle east of the Jordan",
    setting:
      "After the victories over Sihon and Og, Israel controls rich grazing land east of the Jordan, in Gilead and the plateau north of Moab. The tribes of Reuben and Gad, who own large herds, ask to settle there rather than cross the river. Moses fears a repeat of the spies' failure at Kadesh. They agree to build pens and towns, then march ahead of their brothers until Canaan is won.",
    words: [
      { v: 23, s: 4672, note: "Matsa, \"will find you out\": To find, reach or catch up with. Moses pictures sin as a pursuer that will track them down if they break their word." },
      { v: 22, s: 5355, note: "Naqi, \"free\": Innocent, clear of obligation. Keeping their promise would leave them blameless before God and Israel." },
    ],
  },
  {
    book: "numbers",
    chapter: 33,
    title: "The stages of the journey",
    setting:
      "Moses records Israel's route from Egypt to the plains of Moab in forty two stages, from Rameses in the Nile Delta to the Jordan. Many of the place names cannot be located with certainty today, and scholars debate the exact route. The list moves quickly through forty years, pausing at key moments like the Red Sea crossing and Aaron's death on Mount Hor. It closes with commands for entering Canaan.",
    words: [
      { v: 2, s: 4161, note: "Motsa, \"starting points\": A going out or departure, from yatsa, the verb used in verse 1 for Israel coming out of Egypt. Every stage began as a fresh setting out." },
    ],
  },
  {
    book: "numbers",
    chapter: 34,
    title: "The borders of Canaan",
    setting:
      "God marks out the land Israel is to inherit west of the Jordan: from the wilderness of Zin and the Brook of Egypt in the south, to the Mediterranean in the west, Lebo Hamath in the north, and the Jordan and Dead Sea in the east. Many scholars note these boundaries resemble Egypt's province of Canaan in the late Bronze Age. Leaders from each tribe are named to oversee the division.",
    words: [
      { v: 2, s: 1367, note: "Gevulah, \"boundaries\": A border or limit. Land with borders could be named, held and passed down; God's promise was specific, not vague." },
    ],
  },
  {
    book: "numbers",
    chapter: 35,
    title: "Levite towns and cities of refuge",
    setting:
      "The Levites receive no tribal territory, so God gives them forty eight towns with pastureland scattered through all the tribes. Six of these become cities of refuge, three on each side of the Jordan. In ancient Israel the nearest relative had a duty to avenge a killing. The refuge cities kept someone who killed by accident safe from the avenger until a fair hearing could be held.",
    words: [
      { v: 6, s: 4733, note: "Miqlat, \"refuge\": A place of asylum. Hebrews 6:18 may echo the idea when it speaks of believers who \"have fled to take hold of the hope set before us.\"" },
      { v: 12, s: 1350, note: "Gaal, \"avenger\": The noun goel names the family protector who redeemed land, freed relatives from debt slavery, and avenged blood. Boaz is a goel in Ruth, and Job calls God his goel (Job 19:25)." },
    ],
  },
  {
    book: "numbers",
    chapter: 36,
    title: "The daughters of Zelophehad marry",
    setting:
      "Leaders of the clan of Zelophehad, in the tribe of Manasseh, raise a problem with the ruling in chapter 27. If his daughters marry men from other tribes, their land will pass to their husbands' tribes, and Manasseh's allotment will shrink for good. Moses rules that the daughters may marry anyone they choose within their father's tribe. The book closes with the daughters obeying, and Israel waiting on the plains of Moab.",
    words: [
      { v: 7, s: 1692, note: "Davaq, \"retain\": To cling or hold fast, the verb used for a husband holding fast to his wife in Genesis 2:24. Each tribe was to cling to its God given inheritance." },
    ],
  },
  {
    book: "deuteronomy",
    chapter: 1,
    title: "Moses looks back from the plains of Moab",
    setting:
      "Deuteronomy is Moses' farewell, a series of sermons preached east of the Jordan in the fortieth year after the Exodus (1:3). The generation that refused to enter Canaan at Kadesh has died in the wilderness, and their children now stand at the border. The trip from Horeb (Sinai) to Kadesh took eleven days (1:2); unbelief stretched it into forty years. Moses retells that history so the new generation will not repeat it.",
    words: [
      { v: 5, s: 874, note: "Ba'ar, \"explain\": To make plain or distinct, used of writing words clearly on stone (27:8). Moses does not just repeat the law; he expounds it, preaching it to a new generation." },
    ],
  },
  {
    book: "deuteronomy",
    chapter: 2,
    title: "Passing by Edom, Moab and Ammon",
    setting:
      "Israel's route to the Jordan ran through the kingdoms east of the Dead Sea, along the trade road later called the King's Highway. Edom descended from Esau, and Moab and Ammon from Lot, so these were Israel's relatives. God forbids Israel to take their land. Then Sihon, the Amorite king at Heshbon north of the Arnon gorge, refuses Israel passage and attacks, and his kingdom becomes Israel's first conquest.",
    words: [
      { v: 5, s: 3425, note: "Yerushah, \"possession\": The language of inheritance that is used of Israel's own land. God had given Edom its hill country as surely as He would give Canaan to Israel." },
    ],
  },
  {
    book: "deuteronomy",
    chapter: 3,
    title: "Og defeated and Moses denied",
    setting:
      "Og ruled Bashan, the fertile plateau east of the Sea of Galilee, famous for cattle and oak forests, with sixty fortified cities (3:4). His defeat gave Israel the land east of the Jordan, which Moses assigned to Reuben, Gad and half of Manasseh on condition that their soldiers cross over and fight alongside everyone else. The chapter ends with Moses pleading to enter Canaan and being refused.",
    words: [
      { v: 11, s: 6210, note: "Eres, \"bed\": Og's iron bed may have been a great couch or, as some think, a coffin of black basalt, the iron colored stone of Bashan. Either way it was a giant's monument, and Israel's God had overthrown its owner." },
    ],
  },
  {
    book: "deuteronomy",
    chapter: 4,
    title: "Remember what you saw at Horeb",
    setting:
      "Moses turns from history to its meaning. At Horeb (Sinai) Israel heard God's voice from the fire but saw no form. In a world where every nation worshipped through statues of gods, animals and stars, Israel was to have none. The chapter warns that idolatry will end in exile, yet promises that scattered Israel will find God if they seek Him with all their heart. It closes by setting apart three cities of refuge east of the Jordan.",
    words: [
      { v: 12, s: 8544, note: "Temunah, \"form\": A likeness or visible shape. Israel heard a voice but saw no form, so no image made by human hands could ever represent their God." },
      { v: 24, s: 7067, note: "Qanna, \"jealous\": Not petty envy but the exclusive, protective love of a husband for his wife. God will not share His people with idols." },
    ],
  },
  {
    book: "deuteronomy",
    chapter: 5,
    title: "The Ten Commandments for a new generation",
    setting:
      "Moses repeats the Ten Commandments first given at Sinai (Exodus 20) to the children of those who heard them. Ancient covenants were read again to each new generation, and Moses insists this one binds the living, not just their parents (5:3). The wording is nearly the same as Exodus, with one striking change: the Sabbath is now grounded in Israel's rescue from slavery in Egypt.",
    words: [
      { v: 15, s: 2142, note: "Zakhar, \"remember\": More than recalling a fact; it means acting on what you remember. Giving rest to servants, animals and foreigners was how Israel remembered it had once been a slave with no rest." },
    ],
  },
  {
    book: "deuteronomy",
    chapter: 7,
    title: "A holy people and the command to destroy",
    setting:
      "Moses names seven nations living in Canaan and commands Israel to devote them to destruction, make no treaties or marriages with them, and smash their altars and sacred poles. Canaanite religion included fertility rites and at times child sacrifice (12:31). The command applied to this land at this moment in history. Israel is reminded that God chose them out of love, not because they were great or good.",
    words: [
      { v: 6, s: 5459, note: "Segullah, \"treasured possession\": A king's private treasure, set apart from the rest of his wealth. Of all peoples, Israel was God's personal treasure. Peter applies the same idea to the church (1 Peter 2:9)." },
    ],
  },
  {
    book: "deuteronomy",
    chapter: 8,
    title: "Remember the wilderness when you are full",
    setting:
      "For forty years Israel ate manna, food that appeared each morning and spoiled if hoarded, except on the Sabbath. Canaan promised wheat, barley, vines, figs, olives, honey, and hills with iron and copper (vv. 8 and 9). Moses warns that prosperity is more dangerous than the desert, because full stomachs forget. He looks back on the wilderness as God's school, where hunger taught what bread could not.",
    words: [
      { v: 3, s: 4478, note: "Man, \"manna\": Its name comes from Israel's question \"What is it?\" (Exodus 16:15). Bread no one had ever seen taught them to live on God's word, the verse Jesus quoted when tempted (Matthew 4:4)." },
    ],
  },
  {
    book: "deuteronomy",
    chapter: 9,
    title: "Not because of your righteousness",
    setting:
      "Moses anticipates a dangerous thought: once Canaan is conquered, Israel may conclude that God rewarded their goodness. To kill that idea he retells the golden calf at Horeb (Exodus 32), when Israel broke the covenant while the tablets were still being given, and lists rebellions at Taberah, Massah, Kibroth-hattaavah and Kadesh. Israel survived only because Moses interceded for them for forty days and nights.",
    words: [
      { v: 26, s: 6299, note: "Padah, \"redeemed\": To ransom or buy back, especially from slavery. Moses' plea rests not on Israel's merit but on what God had already done: He paid to set them free, so they belong to Him." },
    ],
  },
  {
    book: "deuteronomy",
    chapter: 10,
    title: "New tablets and what God requires",
    setting:
      "After the golden calf, God renews the covenant. Moses carves two new stone tablets and places them in an ark of acacia wood, the chest that will travel with Israel. Brief notes record Aaron's death and the appointment of the Levites to carry the ark and serve. Then Moses asks what the LORD requires of Israel (v. 12) and answers with a summary that Micah 6:8 later echoes.",
    words: [
      { v: 16, s: 4135, note: "Mul, \"circumcise\": Israel's men carried the covenant sign in the body. Moses says the heart needs the same cutting away: remove the stubborn layer that keeps God's word out (30:6; Romans 2:29)." },
    ],
  },
  {
    book: "deuteronomy",
    chapter: 11,
    title: "A land that drinks the rain",
    setting:
      "Egypt's farms were watered by the Nile, channeled through ditches that farmers opened and closed with their feet (v. 10). Canaan had no great river. Its hill country depended on rain, which came in autumn and spring and could fail for years at a time. Living there meant depending on God season by season. The chapter closes by naming Mount Gerizim and Mount Ebal, where blessing and curse would be proclaimed.",
    words: [
      { v: 11, s: 4306, note: "Matar, \"rain\": Canaan \"drinks rain from heaven.\" Its farmers could not control their water, so every harvest was a visible sign of God's care, or of its withdrawal (v. 17)." },
    ],
  },
  {
    book: "deuteronomy",
    chapter: 12,
    title: "The place God will choose",
    setting:
      "Canaanite worship happened on hilltops, under green trees and at standing stones scattered across the land. Moses commands Israel to destroy those sites and bring sacrifices only to \"the place the LORD your God will choose\" (v. 5). That place was Shiloh for a time and later Jerusalem. Since one sanctuary would be far for many, Israel may now slaughter and eat meat at home, as long as the blood is poured out.",
    words: [
      { v: 5, s: 7931, note: "Shakhan, \"to dwell\": God chooses a place for His Name to dwell. The related noun mishkan means tabernacle, and John 1:14 says the Word \"dwelt\" among us, literally pitched His tent." },
    ],
  },
  {
    book: "deuteronomy",
    chapter: 13,
    title: "When a prophet or a loved one leads astray",
    setting:
      "Israel was surrounded by diviners and prophets of many gods. This chapter covers three threats: a prophet whose sign comes true but who calls Israel to other gods, a close relative or friend who secretly entices, and a whole town that turns to idols. Each is treated as treason against Israel's covenant King. The penalties were severe because the life of the covenant nation, not merely private belief, was at stake.",
    words: [
      { v: 3, s: 5254, note: "Nasah, \"test\": A false prophet's successful sign does not prove him true. God allows it to reveal whether His people love Him with all their heart and soul." },
    ],
  },
  {
    book: "deuteronomy",
    chapter: 14,
    title: "Clean food and the joyful tithe",
    setting:
      "Israel's neighbors gashed themselves and shaved their foreheads in rites for the dead. As God's children, Israel was not to. The chapter lists clean and unclean animals, setting Israel's daily diet apart from the nations, then describes a tithe of produce eaten as a feast before God. Every third year the tithe was stored in each town for the Levite, the foreigner, the fatherless and the widow.",
    words: [
      { v: 1, s: 1413, note: "Gadad, \"cut\": Gashing the body was a pagan mourning rite and a way of calling on gods (1 Kings 18:28). Israel's grief was to be shaped by belonging to the living God." },
    ],
  },
  {
    book: "deuteronomy",
    chapter: 15,
    title: "The year of release",
    setting:
      "Every seventh year Israel was to cancel debts between fellow Israelites. Most loans then were not for business but for survival after a failed harvest, and families who could not repay might lose land or sell their children into service. This chapter limits that slide: debts are released, and a Hebrew servant goes free after six years, sent off with generous gifts from the flock, threshing floor and winepress.",
    words: [
      { v: 1, s: 8059, note: "Shemittah, \"release\": A letting go, a remission of debts. Jewish practice still calls the sabbatical year the shmita. A related verb describes letting the land rest in Exodus 23:11." },
    ],
  },
  {
    book: "deuteronomy",
    chapter: 16,
    title: "Three feasts at the chosen place",
    setting:
      "Three times a year every Israelite man was to appear before God at the central sanctuary: Passover and Unleavened Bread in spring, the Feast of Weeks at the wheat harvest seven weeks later, and the Feast of Booths in autumn after the grape and olive harvest. Unlike in Exodus, the Passover lamb is now sacrificed at the chosen place, not at home. The chapter ends by appointing judges in every town.",
    words: [
      { v: 20, s: 6664, note: "Tsedeq, \"justice\": Literally \"justice, justice you shall pursue.\" The doubled word stresses that fair courts are not optional; they are how Israel would live and keep the land." },
    ],
  },
  {
    book: "deuteronomy",
    chapter: 17,
    title: "Courts, priests and a future king",
    setting:
      "Moses sets up the structures of a settled nation. Hard cases go from town judges to the priests and judge at the central sanctuary. He also anticipates that Israel will one day want \"a king like all the nations around\" them (v. 14), centuries before Saul. Ancient kings piled up horses for chariots, wives for alliances and gold for prestige. Israel's king was to do none of that, and to read God's law daily.",
    words: [
      { v: 18, s: 8451, note: "Torah, \"instruction\": Often translated \"law,\" it means teaching or direction. The king was to copy this torah by hand and read it all his life, so that he would not consider himself better than his brothers (v. 20)." },
    ],
  },
  {
    book: "deuteronomy",
    chapter: 18,
    title: "Prophets, not fortune tellers",
    setting:
      "The Levites had no land, so the people's offerings supported them. Then Moses takes up a pressing question in a land full of omens: how will Israel know God's will? Canaanite religion used divination, sorcery, omens, spells, mediums, consulting the dead and even child sacrifice. All are banned. Instead God will raise up a prophet like Moses from among their brothers and put His own words in that prophet's mouth.",
    words: [
      { v: 15, s: 5030, note: "Navi, \"prophet\": One who speaks for God. Israel came to expect a coming Prophet like Moses (John 1:21; 6:14), and Peter and Stephen declared that Jesus is that Prophet (Acts 3:22; 7:37)." },
    ],
  },
  {
    book: "deuteronomy",
    chapter: 19,
    title: "Cities of refuge and honest boundaries",
    setting:
      "Ancient Israel had no police force. When someone was killed, a close relative called the avenger of blood was responsible to pursue the killer. To protect those who killed by accident, Moses orders three cities of refuge west of the Jordan, with roads kept ready so that no one was too far from safety. The chapter also protects family property lines and punishes witnesses who lie in court.",
    words: [
      { v: 6, s: 1350, note: "Ga'al, \"avenger\": The participle go'el also means \"kinsman redeemer,\" the relative who buys back land or family members (Ruth 4). The go'el was a family protector who could avenge a death or rescue a relative." },
    ],
  },
  {
    book: "deuteronomy",
    chapter: 20,
    title: "Rules for going to war",
    setting:
      "Ancient armies often looted, burned crops and slaughtered at will. Israel's laws of war set limits. A priest reminded the soldiers that God fights for them, and officers sent home anyone with a new house, a new vineyard, a fiancee, or simply too much fear. Distant cities were first offered terms of peace. The total destruction ordered in verses 16 to 18 applied only to the cities of Canaan itself.",
    words: [
      { v: 8, s: 7390, note: "Rakh, \"fainthearted\": Soft or tender. Fear spreads through an army, so the frightened were sent home, a striking reminder that Israel's victories did not depend on numbers." },
    ],
  },
  {
    book: "deuteronomy",
    chapter: 21,
    title: "Unsolved murder, captives, heirs and the tree",
    setting:
      "This chapter gathers laws about life and death in family and community. If a body is found in open country and the killer is unknown, the nearest town's elders must publicly disown the guilt so innocent blood does not stain the land. Other laws protect a woman captured in war, the firstborn son of an unloved wife, and the community from a violent son. A hanged body must be buried the same day.",
    words: [
      { v: 23, s: 7045, note: "Qelalah, \"curse\": A body hung on a tree was displayed as one under God's curse. Paul says Christ became a curse for us by hanging on the tree (Galatians 3:13)." },
    ],
  },
  {
    book: "deuteronomy",
    chapter: 22,
    title: "Neighbors, rooftops and sexual integrity",
    setting:
      "These laws cover ordinary village life: returning a neighbor's stray ox, helping lift a fallen donkey, sparing a mother bird, and building a railing around a flat roof where families worked and slept. Then come laws on marriage and sexual sin. In that culture a bride's virginity touched her family's honor, and these laws protect women from false accusation and punish men who commit rape.",
    words: [
      { v: 8, s: 4624, note: "Ma'aqeh, \"railing\": A low wall around a flat roof. A homeowner was responsible for foreseeable danger to others, so that no bloodguilt would come on his house if someone fell." },
    ],
  },
  {
    book: "deuteronomy",
    chapter: 23,
    title: "Who may enter the assembly",
    setting:
      "The \"assembly of the LORD\" was Israel gathered for worship and covenant decisions. This chapter limits who could join it: men with certain injuries, those of forbidden unions, Ammonites and Moabites, while Edomites and Egyptians could join after three generations. Other laws keep the war camp clean, shelter escaped slaves, forbid charging interest to fellow Israelites and let a hungry neighbor eat from a field.",
    words: [
      { v: 3, s: 6951, note: "Qahal, \"assembly\": Israel gathered before God. The ancient Greek translation often rendered it ekklesia, the word the New Testament uses for the church." },
    ],
  },
  {
    book: "deuteronomy",
    chapter: 24,
    title: "Divorce, debts and the dignity of the poor",
    setting:
      "This chapter protects people at their most vulnerable. An Israelite husband could divorce his wife, but he had to give her a written certificate that freed her to remarry, and he could not take her back after she married another man. Other laws excuse newlyweds from war, protect a poor man's millstone and cloak, require wages to be paid the same day, and leave gleanings for the foreigner, orphan and widow.",
    words: [
      { v: 1, s: 3748, note: "Keritut, \"divorce\": From karat, \"to cut off.\" The written certificate made the separation legal and final, protecting a woman from being sent away with no proof that she was free." },
    ],
  },
  {
    book: "deuteronomy",
    chapter: 25,
    title: "Limited punishment, a brother's duty, honest weights",
    setting:
      "Moses continues with laws for everyday justice. A guilty man may be beaten, but no more than forty lashes, so that he is not degraded. If a man dies childless, his brother is to marry the widow so that the dead man's name and land continue, a custom called levirate marriage. Merchants must use honest weights. The chapter ends by remembering Amalek's attack on Israel's weary stragglers in the wilderness.",
    words: [
      { v: 5, s: 2992, note: "Yavam, \"to perform the duty of a brother-in-law\": This custom stands behind the story of Tamar (Genesis 38), the book of Ruth, and the Sadducees' question to Jesus about the resurrection (Matthew 22:24)." },
    ],
  },
  {
    book: "deuteronomy",
    chapter: 26,
    title: "Firstfruits and a confession of faith",
    setting:
      "Once settled in the land, each Israelite family was to bring the first of its harvest in a basket to the sanctuary and recite a short history of God's saving acts, from Jacob's wanderings to the Exodus and the gift of the land. Every third year a tithe confession followed. The chapter closes the long section of laws (chapters 12 to 26) with a mutual declaration: Israel owns the LORD as its God, and He owns Israel as His people.",
    words: [
      { v: 5, s: 6, note: "Avad, \"wandering\": The verb can mean \"perish\" or \"be lost.\" Jacob was a homeless, nearly perishing Aramean, and everything Israel now held came from God's grace." },
    ],
  },
  {
    book: "deuteronomy",
    chapter: 27,
    title: "Stones on Ebal and twelve curses",
    setting:
      "Moses commands a ceremony for when Israel crosses the Jordan. Large stones are to be coated with plaster and inscribed with the law, and an altar of uncut stones built on Mount Ebal. Then the tribes divide between Mount Gerizim and Mount Ebal, and the Levites pronounce twelve curses on hidden sins, each answered by the people's \"Amen.\" Joshua carries this out in Joshua 8:30 to 35.",
    words: [
      { v: 15, s: 543, note: "Amen, \"so be it\": The people did not merely listen; they put their own names, so to speak, to every curse. The word means firm or certain, and Jesus used it to open His most solemn sayings (\"Truly I tell you\")." },
    ],
  },
  {
    book: "deuteronomy",
    chapter: 28,
    title: "Blessings and curses",
    setting:
      "Ancient treaties between kings and their subject nations ended with lists of blessings for loyalty and curses for betrayal, usually with far more curses. Deuteronomy 28 follows that pattern: fourteen verses of blessing followed by fifty-four of curses, including disease, drought, defeat, siege, famine and finally exile. Later Israel read its history, especially the Assyrian and Babylonian exiles, in the light of this chapter.",
    words: [
      { v: 13, s: 2180, note: "Zanav, \"tail\": \"The LORD will make you the head and not the tail.\" The picture is of leading rather than trailing among the nations. The curses turn it around (v. 44)." },
    ],
  },
  {
    book: "deuteronomy",
    chapter: 29,
    title: "The covenant renewed in Moab",
    setting:
      "Forty years after Sinai, Moses leads the new generation in renewing the covenant on the plains of Moab. Everyone stands before God: leaders, elders, officers, men, women, children, foreigners in the camp, even woodcutters and water carriers. The oath also binds those \"not here today\" (v. 15), Israel's future generations. Moses warns against anyone who privately assumes he will be safe while going his own way.",
    words: [
      { v: 29, s: 5641, note: "Satar, \"hidden\": \"The secret things belong to the LORD our God, but the things revealed belong to us.\" God does not answer every question, but He has revealed enough for us to obey." },
    ],
  },
  {
    book: "deuteronomy",
    chapter: 30,
    title: "Return, and choose life",
    setting:
      "Moses looks beyond Israel's coming disobedience and exile to restoration. When the people, scattered among the nations, turn back to God, He will gather them, restore them and change their hearts. His commandment is not out of reach, up in heaven or across the sea; it is near, in their mouth and in their heart. Moses closes his sermons by calling heaven and earth as witnesses: life and death are set before them.",
    words: [
      { v: 2, s: 7725, note: "Shuv, \"return\": The Old Testament's great word for repentance: to turn around and come back. It appears again and again in this chapter, for Israel's turning and for God's." },
      { v: 19, s: 977, note: "Bachar, \"choose\": The same verb used of God choosing Israel (7:6). Now Israel must choose in return. Love that is chosen, not forced, is what God asks." },
    ],
  },
  {
    book: "deuteronomy",
    chapter: 31,
    title: "Joshua commissioned and the law written down",
    setting:
      "Moses is 120 years old and knows he will not cross the Jordan. He publicly hands leadership to Joshua, writes the law in a book, and gives it to the priests to keep beside the ark. Every seventh year, at the Feast of Booths, it is to be read aloud to the whole nation, children and foreigners included. God then warns Moses that Israel will turn away, and gives him a song to stand as a witness against them.",
    words: [
      { v: 6, s: 5800, note: "Azav, \"forsake\": \"He will never leave you nor forsake you.\" Spoken first to Israel and Joshua, this promise is applied in Hebrews 13:5 to every believer." },
    ],
  },
  {
    book: "deuteronomy",
    chapter: 32,
    title: "The Song of Moses",
    setting:
      "Moses' song is a poem shaped like a covenant lawsuit. Heaven and earth are called as witnesses, God's faithfulness is recounted, Israel's ingratitude is exposed, judgment is announced, and finally God promises to vindicate His people and judge their enemies. Israel was to memorize it (31:19), so that it would testify in later generations. At the chapter's end God sends Moses up Mount Nebo to view the land he will not enter.",
    words: [
      { v: 11, s: 5404, note: "Nesher, \"eagle\": A great eagle or vulture stirring its nest and hovering over its young as they learn to fly. God trained Israel in the wilderness the same way, never letting them fall." },
      { v: 15, s: 3484, note: "Yeshurun, \"Jeshurun\": A poetic name for Israel, probably from yashar, \"upright.\" The irony is sharp: the \"upright one\" grew fat and kicked against the God who made him." },
    ],
  },
  {
    book: "deuteronomy",
    chapter: 33,
    title: "Moses blesses the tribes",
    setting:
      "Like Jacob before his death (Genesis 49), Moses blesses the tribes of Israel one by one. The blessings are framed by a hymn to God who came from Sinai with His holy ones (vv. 2 to 5) and a closing praise of the God of Jeshurun (vv. 26 to 29). Simeon is not named, perhaps because its land later lay within Judah's (Joshua 19:1). Levi receives the Urim and Thummim, used by priests to seek God's decisions.",
    words: [
      { v: 27, s: 4585, note: "Me'onah, \"dwelling place\": A den or refuge, a home where one is safe. A related word opens Psalm 90, titled \"a prayer of Moses\": \"Lord, You have been our dwelling place in all generations.\"" },
    ],
  },
  {
    book: "deuteronomy",
    chapter: 34,
    title: "The death of Moses",
    setting:
      "Moses climbs Mount Nebo, opposite Jericho, and God shows him the whole land promised to Abraham, Isaac and Jacob. He dies there at 120, still strong, and God Himself buries him in a grave no one has found. Because the chapter records his death and says no prophet like him had arisen \"since that time,\" it was written after Moses, perhaps by Joshua or a later editor guided by God.",
    words: [
      { v: 10, s: 6440, note: "Paneh, \"face\": Moses knew God \"face to face,\" a phrase for unusually direct fellowship (Exodus 33:11; Numbers 12:8). No later prophet matched it until the Son, who is at the Father's side and has made Him known (John 1:18)." },
    ],
  },
  {
    book: "1kings",
    chapter: 1,
    title: "Solomon takes the throne",
    setting:
      "Around 970 BC, King David is old and frail after about forty years on the throne. Israel had no fixed rule that the eldest son inherits, so a weak king meant a dangerous gap. Adonijah, the oldest surviving son, wins over the army chief Joab and the priest Abiathar. Solomon is backed by Nathan the prophet, Zadok the priest and the royal guard. Riding the king's own mule to the Gihon spring was a public sign of David's choice.",
    words: [
      { v: 39, s: 4886, note: "Mashach, \"to anoint\": Pouring oil marked a king as set apart by God. The related noun mashiach, \"anointed one,\" gives us the word Messiah." },
    ],
  },
  {
    book: "1kings",
    chapter: 2,
    title: "David's charge and Solomon's purge",
    setting:
      "A dying king's last words carried legal and spiritual weight in Israel, like Jacob's blessings in Genesis 49. David charges Solomon to keep the Law of Moses, then names unfinished business: Joab, who murdered two commanders in peacetime, and Shimei, who cursed David during Absalom's revolt. A new king in the ancient world was expected to secure his throne against rivals, and this chapter shows how Solomon did it.",
    words: [
      { v: 6, s: 7585, note: "Sheol, \"the grave\": The Hebrew name for the realm of the dead. \"Do not let his gray head go down to Sheol in peace\" means Joab must not die of old age unpunished." },
    ],
  },
  {
    book: "1kings",
    chapter: 3,
    title: "Solomon asks for wisdom",
    setting:
      "Early in his reign Solomon marries Pharaoh's daughter, a sign of Israel's new standing, since Egyptian kings rarely gave daughters to foreign rulers. Before the temple existed, Israelites still sacrificed at local high places, and the great one was at Gibeon, about six miles northwest of Jerusalem. In the ancient world the king was the final court of appeal, so judging cases like the two mothers was part of his daily work.",
    words: [
      { v: 9, s: 8085, note: "Shama, \"to hear\": Solomon literally asks for a \"hearing heart\" (lev shomea). In Hebrew thought wisdom starts with listening, to God and to the people one serves." },
    ],
  },
  {
    book: "1kings",
    chapter: 4,
    title: "Solomon's kingdom at its height",
    setting:
      "This chapter reads like a page from the royal archives: officials, twelve supply districts, and the daily food bill of the palace. Each district fed the court for one month a year. Kingdoms across the ancient Near East kept such lists to show order and prosperity. Israel's influence now stretches toward the Euphrates, close to the land promised to Abraham in Genesis 15:18, and Solomon's wisdom becomes famous abroad.",
    words: [
      { v: 25, s: 983, note: "Betach, \"security\": Safety with nothing to fear. Each family sitting under its own vine and fig tree became a prophetic picture of God's coming peace (Micah 4:4)." },
    ],
  },
  {
    book: "1kings",
    chapter: 5,
    title: "Preparing to build the temple",
    setting:
      "Hiram ruled Tyre, a wealthy Phoenician port on the coast of modern Lebanon, and had been David's ally. Phoenicia had the cedar forests and the skilled builders Israel lacked. Logs were floated down the coast as rafts, and Solomon paid with yearly shipments of wheat and olive oil. He also drafted thousands of Israelites into rotating labor crews, a burden that would stir resentment in chapter 12.",
    words: [
      { v: 4, s: 5117, note: "Nuach, \"to rest\": Rest from enemies was the condition God set for a central place of worship (Deuteronomy 12:10). Peace now makes the temple possible." },
    ],
  },
  {
    book: "1kings",
    chapter: 6,
    title: "Building the house of the LORD",
    setting:
      "Verse 1 dates the work to the 480th year after the exodus, in Solomon's fourth year, probably around 966 BC. The temple followed the tabernacle's plan at double the length and width: a porch, a main hall and an inner room. At roughly 90 feet long it was modest beside Egypt's temples, but it was lined with cedar and overlaid with gold. Its carvings of cherubim, palms and flowers recalled the garden of Eden.",
    words: [
      { v: 19, s: 1687, note: "Devir, \"inner sanctuary\": The innermost room, a perfect cube of twenty cubits, where the ark rested. Older translations called it the \"oracle,\" since God spoke from above the ark." },
    ],
  },
  {
    book: "1kings",
    chapter: 7,
    title: "Solomon's palace and the temple furnishings",
    setting:
      "Solomon spends thirteen years on his palace complex, nearly twice the seven years spent on the temple (6:38). The chapter then returns to the temple's bronze work, cast by Hiram, a craftsman from Tyre whose mother was an Israelite widow. Bronze casting on this scale used clay molds in the Jordan valley (verse 46). The giant basin called the Sea and ten movable stands supplied water for the priests' washing.",
    words: [
      { v: 21, s: 3199, note: "Yakhin, \"Jachin\": The right pillar's name probably means \"He establishes.\" The left pillar, Boaz, likely means \"in Him is strength.\" Together they announce that God upholds this house." },
    ],
  },
  {
    book: "1kings",
    chapter: 8,
    title: "The temple is dedicated",
    setting:
      "The dedication takes place at the Feast of Tabernacles in the seventh month, Israel's autumn harvest festival, when crowds came to Jerusalem anyway. The ark is carried from the old City of David up to the new temple on the higher ground to the north. Solomon stands before the altar as Israel's representative and prays. His long prayer anticipates sin, defeat, drought, foreigners and even exile.",
    words: [
      { v: 11, s: 3519, note: "Kavod, \"glory\": The root means \"heavy.\" God's glory is the weight of His real presence, so heavy that the priests cannot stay at their posts." },
    ],
  },
  {
    book: "1kings",
    chapter: 9,
    title: "God's answer and Solomon's projects",
    setting:
      "God appears to Solomon a second time, as He had at Gibeon, now with a sober warning tied to the temple's future. The rest of the chapter covers Solomon's building and trade: fortified cities like Hazor, Megiddo and Gezer, a forced labor system, and a fleet sailing from Ezion Geber on the Red Sea gulf. Archaeologists have long debated which ruined gates and walls at those sites date to Solomon's time.",
    words: [
      { v: 3, s: 6942, note: "Qadash, \"to consecrate\": To set apart as holy, belonging to God. God Himself makes the temple holy by putting His Name there; Solomon's building alone could not." },
    ],
  },
  {
    book: "1kings",
    chapter: 10,
    title: "The queen of Sheba visits",
    setting:
      "Sheba was probably a kingdom in southwest Arabia, around modern Yemen, rich from the trade in frankincense and myrrh. Its camel caravans crossed well over a thousand miles of desert to reach Israel. Her visit may have mixed curiosity with business, since Solomon's ships and trade routes touched her markets. Royal courts of the time traded riddles and proverbs as tests of a ruler's wisdom.",
    words: [
      { v: 1, s: 2420, note: "Chidah, \"riddle\": Hard questions or riddles, the same word used for Samson's riddle in Judges 14. Wisdom was tested by puzzles, not just facts." },
    ],
  },
  {
    book: "1kings",
    chapter: 11,
    title: "Solomon's heart turns away",
    setting:
      "Kings in the ancient Near East sealed treaties by marrying princesses from allied nations, and each royal wife brought her own household and gods. Deuteronomy 17:17 had warned that a king must not multiply wives, or his heart would turn away. Solomon's 700 wives and 300 concubines show how far he had gone. Shrines to Chemosh of Moab and Molech of Ammon now stood on the hill east of Jerusalem.",
    words: [
      { v: 4, s: 8003, note: "Shalem, \"complete\": Whole and undivided, related to shalom. Solomon's heart was not wholly the LORD's, and a divided heart drifts." },
    ],
  },
  {
    book: "1kings",
    chapter: 12,
    title: "The kingdom splits in two",
    setting:
      "After Solomon's death, around 930 BC, his son Rehoboam goes to Shechem to be confirmed by the northern tribes. Shechem was an old covenant site where Joshua renewed Israel's covenant (Joshua 24). The north had long felt separate from Judah, and Solomon's taxes and forced labor deepened the grievance. Jeroboam, back from exile in Egypt, speaks for the people, and the ten northern tribes form their own kingdom.",
    words: [
      { v: 4, s: 5923, note: "Ol, \"yoke\": The wooden bar on an ox's neck, a common picture for forced labor and heavy taxes. Rehoboam threatens to make it heavier still." },
    ],
  },
  {
    book: "1kings",
    chapter: 13,
    title: "The man of God from Judah",
    setting:
      "Jeroboam had set up a rival altar at Bethel, on the southern edge of his kingdom, so northerners would not travel to Jerusalem. Bethel was where God met Jacob (Genesis 28), which gave it deep roots. A prophet from Judah arrives during Jeroboam's new festival to condemn the altar. Prophets in this era confronted kings directly, and both their words and their actions were meant as signs of God's word.",
    words: [
      { v: 2, s: 1116, note: "Bamah, \"high place\": A local shrine, often on a hill, with an altar and sometimes sacred poles or pillars. Kings keeps track of which rulers tolerated them." },
    ],
  },
  {
    book: "1kings",
    chapter: 14,
    title: "Judgment on Jeroboam and Rehoboam",
    setting:
      "Ahijah, the prophet who once promised Jeroboam the kingdom (11:29 to 39), is now old and blind at Shiloh, the site of Israel's earlier tabernacle. Jeroboam's wife comes in disguise to ask about their sick son. In Judah, Rehoboam's reign sees Pharaoh Shishak invade, whom most scholars identify with Sheshonq I. A wall relief at Karnak in Egypt lists towns from his campaign through the region.",
    words: [
      { v: 15, s: 842, note: "Asherah, \"Asherah\": A Canaanite mother goddess, and the wooden poles set up in her honor. Israel worshiped her alongside or instead of the LORD." },
    ],
  },
  {
    book: "1kings",
    chapter: 15,
    title: "Kings of Judah and Israel",
    setting:
      "Kings now shifts between two kingdoms: Judah in the south, ruled by David's line, and Israel in the north, with its changing dynasties. Each king is measured against David in Judah or against Jeroboam's sin in Israel. Judah and Israel fight a long border war. Asa of Judah even pays the Aramean king in Damascus to attack Israel from the north, pulling a foreign power into a family quarrel.",
    words: [
      { v: 13, s: 1377, note: "Gevirah, \"queen mother\": The king's mother held an official place at court. Asa removed his own grandmother from it because of her idol, putting God above family loyalty." },
    ],
  },
  {
    book: "1kings",
    chapter: 16,
    title: "Israel's revolving throne",
    setting:
      "Northern Israel had no single royal family. In this chapter Elah is assassinated, Zimri rules seven days and dies in a burning palace, and civil war follows. Omri finally brings stability and builds a new capital at Samaria, on a hill he bought (verse 24). He is known outside the Bible too: the Moabite Mesha Stele names him, and Assyrian records long called Israel the house of Omri. His son Ahab marries Jezebel of Sidon.",
    words: [
      { v: 2, s: 5057, note: "Nagid, \"leader\": A ruler appointed by God, the title once given to Saul and David. God reminds Baasha that his throne was a gift, not an achievement." },
    ],
  },
  {
    book: "1kings",
    chapter: 17,
    title: "Elijah, the ravens and the widow",
    setting:
      "Ahab and Jezebel promoted Baal, the Canaanite storm god believed to bring rain and dew. Elijah appears suddenly from Gilead, east of the Jordan, and announces a drought, striking at Baal's supposed power. God then sends him to Zarephath, a town near Sidon in Jezebel's home territory. Widows had no legal protection or income of their own, so a famine put this woman and her son close to death.",
    words: [
      { v: 1, s: 2919, note: "Tal, \"dew\": In a dry land, summer dew mattered for crops. Withholding even the dew showed that the LORD, not Baal, controlled the sky." },
    ],
  },
  {
    book: "1kings",
    chapter: 19,
    title: "Elijah at the broom tree and Horeb",
    setting:
      "Jezebel's death threat sends Elijah fleeing south to Beersheba, at the edge of Judah, then a day further into the desert. From there he travels to Horeb, another name for Mount Sinai, where God gave the law and showed His glory to Moses (Exodus 33). The forty days and nights echo Moses' time on the mountain. Elijah returns to the place where Israel's covenant began, worn out and alone.",
    words: [
      { v: 4, s: 7574, note: "Retem, \"broom\": A desert shrub with thin branches that gives only scant shade. Elijah collapses under it, as far as he can go." },
      { v: 12, s: 1827, note: "Demamah, \"silence\": Literally \"a sound of thin silence.\" God came not in the wind, quake or fire but in a hush that Elijah could hear." },
    ],
  },
  {
    book: "1kings",
    chapter: 20,
    title: "Ahab's wars with Aram",
    setting:
      "Aram, with its capital at Damascus in modern Syria, was Israel's strongest neighbor to the northeast. Ben Hadad leads thirty-two allied kings against Samaria. Ancient peoples assumed each god ruled a territory, so the Arameans think Israel's God controls only the hills. Assyrian records show Ahab and Damascus also fought as allies against Assyria at Qarqar in 853 BC, rivals one year and partners the next.",
    words: [
      { v: 23, s: 2022, note: "Har, \"mountain\": The Arameans call the LORD a god of the hills. God answers by giving victory on the plain, proving He rules everywhere." },
    ],
  },
  {
    book: "1kings",
    chapter: 21,
    title: "Naboth's vineyard",
    setting:
      "In Israel, family land was a sacred trust from God, not a commodity (Leviticus 25:23), meant to stay in the family for good. Naboth's vineyard bordered Ahab's palace in Jezreel. Ahab could not legally force a sale, but Jezebel, raised in Phoenicia where kings did as they pleased, used the courts. Two false witnesses, the legal minimum in Deuteronomy 17:6, sealed a death sentence for blasphemy.",
    words: [
      { v: 3, s: 5159, note: "Nachalah, \"inheritance\": Land received from God and passed down the generations. For Naboth, selling it would betray his fathers and the LORD who gave it." },
    ],
  },
  {
    book: "1kings",
    chapter: 22,
    title: "Micaiah and the death of Ahab",
    setting:
      "Ramoth Gilead was a fortified town east of the Jordan, disputed between Israel and Aram. Jehoshaphat of Judah has allied with Ahab, and his son married Ahab's daughter (2 Kings 8:18). Kings commonly consulted prophets before battle. Ahab's four hundred court prophets tell him what he wants to hear. Micaiah, the one independent voice, describes a vision of God's heavenly council.",
    words: [
      { v: 17, s: 6327, note: "Puts, \"to scatter\": Israel scattered like sheep without a shepherd. Jesus saw the crowds the same way (Matthew 9:36)." },
    ],
  },
  {
    book: "2kings",
    chapter: 1,
    title: "A king who asked the wrong god",
    setting:
      "Ahab has just died, probably around 853 BC, and his son Ahaziah rules the northern kingdom from Samaria. Moab, a vassal east of the Dead Sea, seizes the moment to break away. Injured in a fall, the new king sends to Ekron, a Philistine city near the coast, to consult its god Baal-zebub. For Israel's king to ask a foreign god whether he would live was a public denial that the LORD ruled Israel.",
    words: [
      { v: 3, s: 1875, note: "Darash, \"to seek\": The normal word for consulting a god or a prophet about the future. The LORD's question is pointed: Israel has a God who answers, so why go looking elsewhere?" },
      { v: 8, s: 8181, note: "Se'ar, \"hair\": Literally \"a lord of hair,\" which may describe a hairy man or a prophet's rough hair garment (compare Zechariah 13:4). Either way, the king knows at once who it is." },
    ],
  },
  {
    book: "2kings",
    chapter: 2,
    title: "Elijah taken up, Elisha takes the cloak",
    setting:
      "Elijah's ministry ends where Israel's life in the land began: at the Jordan near Jericho, where Joshua first led the tribes across. Groups called \"the sons of the prophets\" lived in communities at Bethel, Jericho, and Gilgal, learning under a master much like apprentices. Elisha has served Elijah for years since his call at the plow (1 Kings 19). Now leadership must pass, and everyone senses the day has come.",
    words: [
      { v: 1, s: 5591, note: "Sa'ar, \"tempest\": A violent storm wind, the word used when God answers Job \"out of the whirlwind\" (Job 38:1). Elijah is carried up by the storm of God's presence, with the chariot of fire passing between the two men." },
      { v: 8, s: 155, note: "Adderet, \"cloak\": A prophet's mantle, likely of hair. Elijah threw it over Elisha when he first called him (1 Kings 19:19); now Elisha picks it up and strikes the Jordan with it." },
    ],
  },
  {
    book: "2kings",
    chapter: 3,
    title: "Three kings and a dry valley",
    setting:
      "Moab, east of the Dead Sea, had paid Israel heavy tribute since the days of Omri. When Ahab died, King Mesha stopped paying. Joram of Israel, Jehoshaphat of Judah, and the king of Edom march around the south end of the Dead Sea to strike Moab from its less defended side. A stone monument found in 1868, the Mesha Stele, gives Mesha's own account of throwing off Israel's rule and names Omri.",
    words: [
      { v: 4, s: 5349, note: "Noqed, \"shepherd\": A sheep breeder on a large scale; the same word describes Amos (Amos 1:1). Mesha's yearly tribute of lambs and wool shows that Moab's wealth walked on four legs." },
      { v: 15, s: 5059, note: "Nagan, \"to play\": To play a stringed instrument. Music settles Elisha after his anger at Joram and readies him to hear God, much as David's harp once calmed Saul (1 Samuel 16:23)." },
    ],
  },
  {
    book: "2kings",
    chapter: 4,
    title: "Oil, a son, and death in the pot",
    setting:
      "Elisha's ministry reaches ordinary homes in the northern kingdom: a prophet's widow, a farming family in the Jezreel Valley, and hungry students during a famine. Debt slavery was common, and a creditor could take children as bond servants until a debt was worked off (compare Leviticus 25:39). Shunem sat beside a main road, and hospitality to travelers was a sacred duty. God's care here reaches kitchens and bedrooms.",
    words: [
      { v: 1, s: 5383, note: "Nashah, \"to lend\": Here the lender demanding repayment. The law allowed debt service but forbade harsh treatment of fellow Israelites; this creditor is ready to take a widow's two sons." },
      { v: 8, s: 1419, note: "Gadol, \"great\": A \"great woman,\" probably wealthy and well known. Her greatness shows in generosity: she builds a room for the prophet and asks nothing in return (v. 13)." },
    ],
  },
  {
    book: "2kings",
    chapter: 6,
    title: "An axe head, an army, and a siege",
    setting:
      "Aram (Syria), ruled from Damascus, raided Israel's borders again and again in this era. Israel's king in these stories is probably still Joram, son of Ahab, though the text leaves him unnamed. Dothan sat on a hill along a main road north of Samaria. When Ben-hadad's army later surrounded Samaria itself, food prices soared and the walled city slowly starved, just as the covenant curses had warned.",
    words: [
      { v: 17, s: 6491, note: "Paqach, \"to open\": Used of opening eyes. Elisha prays for his servant's eyes to be opened, then for the Arameans' eyes to be closed and opened again (v. 20). The chapter keeps asking who truly sees." },
      { v: 18, s: 5575, note: "Sanver, \"blindness\": A rare word, used also at Sodom (Genesis 19:11). It may mean a dazzled confusion rather than total blindness, since the soldiers still follow where Elisha leads them." },
    ],
  },
  {
    book: "2kings",
    chapter: 7,
    title: "Four outcasts with good news",
    setting:
      "Samaria is still under Aramean siege, and the famine of chapter 6 has become desperate. Men with skin disease had to live outside the camp or city (Leviticus 13:46), so the four at the gate are cut off from both the city's food and its walls. Elisha has promised that by tomorrow fine flour will sell cheaply at that very gate. The king's chief officer openly scoffs at the promise.",
    words: [
      { v: 9, s: 1309, note: "Besorah, \"good news\": News of victory or rescue. The Greek translation uses the same word family behind \"gospel.\" The lepers realize that good news kept to yourself turns into guilt." },
      { v: 2, s: 699, note: "Arubbah, \"window\": The officer sneers that God would need to open \"windows in heaven,\" the phrase used for the flood (Genesis 7:11). God needed no windows; He used a sound in the night." },
    ],
  },
  {
    book: "2kings",
    chapter: 8,
    title: "A restored field and a weeping prophet",
    setting:
      "The Shunammite from chapter 4 returns after seven years of famine spent in Philistine country. Land was a family's livelihood and inheritance, and an absent owner could lose it to the crown or to neighbors. Elisha travels to Damascus, Aram's capital, where Ben-hadad lies sick. In Judah, King Jehoram marries Ahab's daughter, binding David's line to Ahab's house and its Baal worship.",
    words: [
      { v: 13, s: 3611, note: "Kelev, \"dog\": A term of contempt, often used of oneself in mock humility. Hazael protests that a mere dog could never do such terrible things, and then does them." },
      { v: 19, s: 5216, note: "Ner, \"lamp\": A lamp kept burning in a house signaled that a family line continued. God had promised David a lamp in Jerusalem (1 Kings 11:36), and He keeps it lit even through Judah's worst kings." },
    ],
  },
  {
    book: "2kings",
    chapter: 9,
    title: "Jehu anointed to end Ahab's house",
    setting:
      "Around 841 BC, Joram of Israel lies wounded at Jezreel after fighting Aram at Ramoth Gilead, and his nephew Ahaziah of Judah has come to visit. Years earlier God had told Elijah to anoint Jehu (1 Kings 19:16) and had pronounced judgment on Ahab's house for the murder of Naboth (1 Kings 21). Now Elisha sends a young prophet to the army camp, and the long delayed judgment begins.",
    words: [
      { v: 6, s: 4886, note: "Mashach, \"to anoint\": To pour oil on someone as a sign that God has set them apart. This anointing is a commission for judgment, done behind closed doors, with the prophet told to run." },
      { v: 20, s: 7697, note: "Shiggaon, \"madness\": Jehu drives \"like a madman.\" The soldiers had just called the prophet a madman too (v. 11). The joke about Jehu's driving turns out to describe his whole reign." },
    ],
  },
  {
    book: "2kings",
    chapter: 10,
    title: "Jehu's purge of Ahab and Baal",
    setting:
      "Ahab's royal family is still large, with seventy descendants raised by guardians in Samaria. Jehu has killed two kings and Jezebel, but his grip on the throne is new. Ahab and Jezebel had made Baal worship official in Israel, with its own temple in Samaria. An Assyrian monument, the Black Obelisk of Shalmaneser III, probably shows Jehu or his envoy bowing and paying tribute around 841 BC.",
    words: [
      { v: 16, s: 7068, note: "Qin'ah, \"zeal\": Jealous passion, often used of God's own jealousy for His people. Jehu invites Jehonadab to \"see my zeal for the LORD,\" and zeal that asks to be watched deserves a closer look." },
      { v: 26, s: 4676, note: "Matstsevah, \"pillar\": A standing stone used in worship, here Baal's sacred pillar. Jehu smashes it and turns the temple into a latrine (v. 27), a deliberate act of contempt." },
    ],
  },
  {
    book: "2kings",
    chapter: 11,
    title: "Athaliah and the hidden king",
    setting:
      "Athaliah, daughter of Ahab and Jezebel, had married into Judah's royal house. When her son Ahaziah was killed by Jehu (chapter 9), she seized the throne in Jerusalem and tried to wipe out the rest of David's line, including her own grandsons. For six years she ruled, the only queen to reign alone in Judah. David's dynasty survived in one infant hidden in the temple.",
    words: [
      { v: 14, s: 7195, note: "Qesher, \"conspiracy\": Athaliah tears her clothes and cries \"Treason!\" Yet she had taken the throne by murder; the real conspiracy was her own." },
      { v: 17, s: 1285, note: "Berit, \"covenant\": Jehoiada makes a double covenant: between the LORD and the king and people, and between the king and people. Restoring the throne meant restoring loyalty to God first." },
    ],
  },
  {
    book: "2kings",
    chapter: 12,
    title: "Joash repairs the temple",
    setting:
      "Joash, the boy king rescued in chapter 11, reigns about forty years in Jerusalem, probably in the late ninth century BC. Under Athaliah the temple had been neglected and even stripped for Baal worship (2 Chronicles 24:7). The priests collected the offerings and were expected to fund the repairs from them. Years passed with nothing fixed, and the king finally had to change the system.",
    words: [
      { v: 5, s: 919, note: "Bedeq, \"breach\": A crack or damaged place in a building, from a root meaning to split open. The word comes up again and again in this chapter, keeping attention on the repairs that were not getting done." },
      { v: 15, s: 530, note: "Emunah, \"faithfulness\": The workmen dealt \"with integrity,\" so no one needed to audit them. The same word describes God's own faithfulness in Lamentations 3:23." },
    ],
  },
  {
    book: "2kings",
    chapter: 13,
    title: "Elisha's last word",
    setting:
      "Jehu's son Jehoahaz and grandson Jehoash rule Israel in the late ninth and early eighth centuries BC. Aram, under Hazael and then his son Ben-hadad, has reduced Israel's army to fifty horsemen, ten chariots, and ten thousand foot soldiers (v. 7). Assyrian attacks on Damascus may be the unnamed \"deliverer\" who eased the pressure (v. 5). Elisha, after some fifty years of ministry, lies dying.",
    words: [
      { v: 17, s: 8668, note: "Teshu'ah, \"deliverance\": The arrow shot toward Aram is \"the LORD's arrow of deliverance.\" The word comes from the same root as the names Joshua and Jesus." },
      { v: 14, s: 7393, note: "Rekhev, \"chariot\": Jehoash weeps, \"the chariots of Israel and its horsemen,\" the very cry Elisha raised as Elijah was taken (2:12). Both kings and prophets knew Israel's real strength was God's word through His prophets." },
    ],
  },
  {
    book: "2kings",
    chapter: 14,
    title: "Amaziah's pride and Jeroboam's reach",
    setting:
      "In the early eighth century BC, Amaziah of Judah defeats Edom in the Valley of Salt and then challenges Jehoash of Israel. The two kingdoms, divided for over a century, go to war, and Israel wins, breaking down part of Jerusalem's wall. Then Jeroboam II begins a long, prosperous reign in Israel, the era when Amos and Hosea would preach against injustice hiding behind wealth.",
    words: [
      { v: 10, s: 5375, note: "Nasa, \"to lift\": Jehoash says Amaziah's heart has \"lifted\" him, the Hebrew picture of pride. The thistle that demanded the cedar's daughter (v. 9) is a parable of a small king with a large ego." },
      { v: 6, s: 8451, note: "Torah, \"instruction\": Amaziah spares his father's assassins' children, following the Law of Moses (Deuteronomy 24:16). In an age of family blood feuds, that was striking restraint." },
    ],
  },
  {
    book: "2kings",
    chapter: 15,
    title: "Kings come and go quickly",
    setting:
      "This chapter races through about fifty years. Azariah (also called Uzziah) reigns long and well in Judah, while Israel falls into chaos after Jeroboam II: four of its next five kings are assassinated. Assyria rises under Tiglath-pileser III, also called Pul, who demands tribute and begins deporting northern Israelites. Isaiah saw his great vision \"in the year King Uzziah died\" (Isaiah 6:1).",
    words: [
      { v: 5, s: 2669, note: "Chophshut, \"freedom\": The \"separate house\" is literally a \"house of freedom,\" probably meaning release from royal duties. Second Chronicles 26 says the king was struck when he proudly burned incense in the temple." },
      { v: 3, s: 3477, note: "Yashar, \"upright\": Azariah did what was right, yet the high places were not removed (v. 4). A good reign can still leave old compromises standing." },
    ],
  },
  {
    book: "2kings",
    chapter: 16,
    title: "Ahaz copies an altar from Damascus",
    setting:
      "Around 735 BC, Rezin of Aram and Pekah of Israel attack Judah to force it into an alliance against Assyria. Isaiah urged King Ahaz to trust God and offered him a sign (Isaiah 7), but Ahaz sent silver and gold to Tiglath-pileser of Assyria instead. Assyria crushed Damascus, and Judah became Assyria's vassal. Ahaz went to Damascus to meet his new master and came home with ideas for worship.",
    words: [
      { v: 7, s: 5650, note: "Eved, \"servant\": \"I am your servant and your son\" is the language of a vassal. God had called David's heir His own son (Psalm 2:7); Ahaz hands that title to a foreign emperor." },
      { v: 8, s: 7810, note: "Shochad, \"bribe\": Translated \"gift\" here, but it is the ordinary Hebrew word for a bribe. The silver and gold came out of the temple to buy Assyria's protection." },
    ],
  },
  {
    book: "2kings",
    chapter: 17,
    title: "Samaria falls to Assyria",
    setting:
      "Hoshea, Israel's last king, stopped paying tribute to Assyria and looked to Egypt for help. Shalmaneser V besieged Samaria for three years, and the city fell around 722 BC; his successor Sargon II later claimed the victory in his own inscriptions. Assyria scattered Israelites across its empire and resettled the land with foreigners, a policy meant to erase national identity. The northern kingdom never returned.",
    words: [
      { v: 14, s: 6203, note: "Oreph, \"neck\": They \"stiffened their necks,\" the picture of an ox refusing the yoke. God used the same phrase of Israel at the golden calf (Exodus 32:9)." },
      { v: 15, s: 1892, note: "Hevel, \"vanity\": Literally \"breath\" or \"vapor,\" the key word of Ecclesiastes. They followed what was hevel and became hevel themselves: people become like what they worship." },
    ],
  },
  {
    book: "2kings",
    chapter: 18,
    title: "Hezekiah trusts the LORD",
    setting:
      "Hezekiah becomes king of Judah around the time Samaria falls (the exact chronology is debated). He reverses his father Ahaz's idolatry and rebels against Assyria. In 701 BC Sennacherib invades, capturing Judah's fortified cities, including Lachish, a siege later carved in stone reliefs in his palace at Nineveh. His field commander, the Rabshakeh, now stands outside Jerusalem's walls demanding surrender.",
    words: [
      { v: 4, s: 5175, note: "Nachash, \"serpent\": Moses' bronze serpent (Numbers 21:9) had become an object of incense worship, called Nehushtan. Hezekiah smashed a relic God had once used because people now worshiped it." },
      { v: 5, s: 982, note: "Batach, \"to trust\": The key word of these chapters. Hezekiah \"trusted in the LORD,\" and the Assyrian envoy mocks that trust again and again (vv. 19 to 22)." },
    ],
  },
  {
    book: "2kings",
    chapter: 19,
    title: "A letter spread before the LORD",
    setting:
      "Jerusalem is cut off, its countryside ravaged, and Sennacherib sends a letter repeating his threats. Hezekiah takes it into the temple and spreads it before the LORD, while Isaiah sends God's answer. Assyrian records boast of tribute from Hezekiah but never claim that Jerusalem fell. Sennacherib went home to Nineveh and, about twenty years later (681 BC), was murdered by his own sons, as verse 37 reports.",
    words: [
      { v: 16, s: 2778, note: "Charaph, \"to taunt\": To reproach or mock. Hezekiah's concern is not his own reputation but that Sennacherib has mocked \"the living God.\"" },
      { v: 31, s: 7068, note: "Qin'ah, \"zeal\": \"The zeal of the LORD of Hosts will accomplish this.\" The same words close the promise of the coming Son of David in Isaiah 9:7. Rescue flows from God's jealous love for His people." },
    ],
  },
  {
    book: "2kings",
    chapter: 20,
    title: "Hezekiah's illness and Babylon's envoys",
    setting:
      "Hezekiah's illness probably came before or during the Assyrian crisis, since God promises to deliver the city along with the added years (v. 6). Babylon was then a restless province of Assyria; its ruler Merodach-baladan rebelled more than once and looked for allies. His envoys likely came for more than get well wishes. The tunnel Hezekiah cut to bring water into the city still runs under Jerusalem today.",
    words: [
      { v: 9, s: 6738, note: "Tsel, \"shadow\": The shadow on \"the stairway of Ahaz,\" probably steps used to track the sun's movement, goes back ten steps. The text does not explain how, only that the LORD did it." },
      { v: 20, s: 8585, note: "Te'alah, \"conduit\": A water channel. Hezekiah's tunnel, about a third of a mile through solid rock, carried spring water inside the walls, protecting the city's supply from a besieging army." },
    ],
  },
  {
    book: "2kings",
    chapter: 21,
    title: "Manasseh, Judah's worst king",
    setting:
      "Manasseh reigns 55 years, probably from about 697 BC and including years beside his father, the longest reign of any king of Israel or Judah. Assyria was at the height of its power, and its records list Manasseh among loyal vassal kings. He rebuilt everything Hezekiah tore down, practiced sorcery, sacrificed his son, and filled Jerusalem with innocent blood. His son Amon continued the pattern for two years.",
    words: [
      { v: 16, s: 5355, note: "Naqi, \"innocent\": \"Innocent blood\" from one end of Jerusalem to the other. Later Jewish tradition says Manasseh had Isaiah killed, though the Bible itself does not say so." },
      { v: 9, s: 8582, note: "Ta'ah, \"to go astray\": Manasseh \"led them astray,\" a word used for wandering sheep or a staggering drunk. Judah ended up doing more evil than the nations God had driven out." },
    ],
  },
  {
    book: "2kings",
    chapter: 22,
    title: "The Book of the Law is found",
    setting:
      "Josiah became king at eight after his father Amon was assassinated. In his eighteenth year, around 622 BC, he ordered the temple repaired. Assyria's grip was weakening, giving Judah room to reform. During the work the high priest Hilkiah found \"the Book of the Law,\" which many scholars think was all or part of Deuteronomy. Its warnings for covenant breaking alarmed the king, and he sent to Huldah the prophetess.",
    words: [
      { v: 8, s: 5612, note: "Sepher, \"scroll\": A written document, here a scroll. Under Manasseh, God's written word had apparently been neglected so long that finding it was news." },
      { v: 11, s: 7167, note: "Qara, \"to tear\": Tearing one's clothes was a sign of grief and alarm. Josiah does not just admire the scroll; he lets it break his heart." },
    ],
  },
  {
    book: "2kings",
    chapter: 23,
    title: "Josiah's reform and Passover",
    setting:
      "Josiah leads the most thorough reform in Judah's history, purging idols from Jerusalem, the towns of Judah, and even the old northern shrine at Bethel. He celebrates a Passover unlike any since the days of the judges. Yet in 609 BC, as Assyria collapses, Josiah marches out to confront Pharaoh Necho at Megiddo and is killed. Egypt then controls Judah, deposing one of his sons and installing another.",
    words: [
      { v: 3, s: 1285, note: "Berit, \"covenant\": Josiah stands by the pillar and renews the covenant \"with all his heart and soul,\" and the people commit to it. The reform begins with a promise before any demolition." },
      { v: 21, s: 6453, note: "Pesach, \"Passover\": The feast remembering the rescue from Egypt. Josiah keeps it as written in the Book of the Covenant, a national return to the story of redemption." },
    ],
  },
  {
    book: "2kings",
    chapter: 24,
    title: "Babylon comes to Jerusalem",
    setting:
      "After Babylon defeated Egypt at Carchemish in 605 BC, Nebuchadnezzar became master of the region. Jehoiakim submitted, then rebelled. His son Jehoiachin reigned three months before surrendering in 597 BC; a Babylonian chronicle records the city's capture that year. The king, the royal family, officials, and craftsmen, including a young priest named Ezekiel, were taken to Babylon. Zedekiah was set on the throne.",
    words: [
      { v: 4, s: 5545, note: "Salach, \"to forgive\": \"The LORD was not willing to forgive.\" After generations of warning, the innocent blood shed under Manasseh had brought a judgment that would no longer be turned back." },
      { v: 3, s: 6440, note: "Paneh, \"face\": To be removed \"from His presence\" is literally to be sent from before His face. Exile meant leaving the land where God had placed His name." },
    ],
  },
  {
    book: "2kings",
    chapter: 25,
    title: "Jerusalem falls, a king is lifted up",
    setting:
      "Zedekiah, installed by Babylon, rebelled anyway, and Nebuchadnezzar besieged Jerusalem for about eighteen months. In 586 BC (some date it 587) the wall was breached, the temple burned, and most of the remaining people were deported. Gedaliah was appointed governor and soon assassinated. The book ends decades later in Babylon, around 561 BC, when a new king releases Jehoiachin from prison.",
    words: [
      { v: 9, s: 8313, note: "Saraph, \"to burn\": Nebuzaradan burned the house of the LORD, the royal palace, and every great house. Solomon's temple, standing for about four centuries, is gone." },
      { v: 28, s: 2896, note: "Tov, \"good\": The Babylonian king \"spoke kindly\" to Jehoiachin, literally spoke good things. After a long decline, the book ends with a small good word." },
    ],
  },
  {
    book: "1chronicles",
    chapter: 1,
    title: "From Adam to Israel",
    setting:
      "Chronicles was probably written around 400 BC for Jews back from exile in Babylon, rebuilding a small Judah under Persian rule. It opens with nine chapters of names, and the very first is Adam. That places tiny, battered Israel inside the story of all humanity. Chapter 1 condenses Genesis 1 to 36 into lists, moving from the whole human family to Abraham, and then to Isaac's two sons, Esau and Israel.",
    words: [
      { v: 19, s: 6385, note: "Palag, \"to divide\": Peleg means division, for in his days the earth was divided. Many link this to the scattering at Babel (Genesis 11), though the text does not say." },
      { v: 43, s: 4428, note: "Melekh, \"king\": Edom had kings long before Israel did. The Chronicler keeps that detail from Genesis 36 for readers who now had no king of their own." },
    ],
  },
  {
    book: "1chronicles",
    chapter: 2,
    title: "Judah's family line",
    setting:
      "The sons of Israel are listed, and then Judah's line comes first, not firstborn Reuben's, because Judah was the tribe of David and of most returned exiles. The list is honest: it names Er, whom the LORD put to death, Tamar, and Achar, who brought trouble on Israel. It also includes outsiders: a Canaanite wife, an Egyptian servant who married into the clan, and Kenites. Along the way it traces Jesse's family down to David, the seventh son.",
    words: [
      { v: 7, s: 5916, note: "Akhar, \"to bring trouble\": A wordplay. Achan of Joshua 7 is spelled Achar here, matching the verb, so his name becomes \"Troubler\"." },
      { v: 15, s: 7637, note: "Shevii, \"seventh\": 1 Samuel 16 suggests Jesse had eight sons; here David is seventh, perhaps because one died young. Either way, the youngest becomes king." },
    ],
  },
  {
    book: "1chronicles",
    chapter: 3,
    title: "The royal line of David",
    setting:
      "This chapter lists David's sons born in Hebron and Jerusalem, then traces the kings of Judah from Solomon to the exile. It keeps going past the fall of Jerusalem in 586 BC, through the captive king Jeconiah to Zerubbabel, who led returned exiles around 520 BC, and on for several generations. For readers with no king on the throne, the point was clear: David's line had not been cut off. Matthew 1:12 traces Jesus through these same names.",
    words: [
      { v: 5, s: 1340, note: "Bat-shua, \"Bathsheba\": A spelling variant of Bathsheba. Chronicles leaves out the story of David's sin, yet names her plainly as Solomon's mother." },
      { v: 17, s: 616, note: "Assir, \"captive\": Jeconiah was taken to Babylon in 597 BC. Jeremiah said no descendant of his would rule on David's throne (Jeremiah 22:30), yet God kept the family line alive." },
    ],
  },
  {
    book: "1chronicles",
    chapter: 4,
    title: "Jabez and the clans of Judah",
    setting:
      "The list returns to Judah's clans and then to Simeon, a small tribe that lived within Judah's territory. Tucked among the names are short notes: linen workers, potters in the king's service, herdsmen searching for pasture. The best known is Jabez, whose two verse story stands out in a long list. For returned exiles living on scattered farms, these notes showed that ordinary families and their prayers belonged in Israel's story.",
    words: [
      { v: 9, s: 6090, note: "Otsev, \"pain\": Jabez sounds like the Hebrew for pain, with letters reversed. His mother's grief marked his name, and in that world a name was thought to shape a life." },
      { v: 10, s: 7451, note: "Ra, \"harm\": Jabez asks to be kept from harm so that he will not suffer pain, a play on his name. He asks God to overrule the pain written into his beginning." },
    ],
  },
  {
    book: "1chronicles",
    chapter: 5,
    title: "The tribes east of the Jordan",
    setting:
      "Reuben, Gad and half of Manasseh settled east of the Jordan in rich grazing land (Numbers 32). Exposed on the frontier, they fought desert peoples like the Hagrites and won when they cried out to God. But they turned to local gods, and around 733 BC the Assyrian king Tiglath-pileser III, also called Pul, carried many into exile. The Chronicler wrote for readers who knew exile firsthand, so this pattern was a warning.",
    words: [
      { v: 1, s: 1062, note: "Bekhorah, \"birthright\": The firstborn's double share. Reuben lost it by sleeping with his father's concubine (Genesis 35:22), and it passed to Joseph's sons." },
      { v: 25, s: 4603, note: "Maal, \"to be unfaithful\": A key word in Chronicles for betraying God, like a breach of trust in marriage. It explains both this exile and Judah's (9:1)." },
    ],
  },
  {
    book: "1chronicles",
    chapter: 6,
    title: "The tribe of Levi",
    setting:
      "Levi, the priestly tribe, gets more space than any tribe but Judah, because the returned community was built around the temple. The chapter traces the high priests from Aaron down to Jehozadak, taken to Babylon in 586 BC, whose son Joshua served as high priest after the return. It lists the singers David appointed, Heman, Asaph and Ethan, whose names stand over many psalms, and the towns given to Levites across Israel.",
    words: [
      { v: 31, s: 7892, note: "Shir, \"song\": David put these Levites in charge of the music after the ark came to rest. In Chronicles, sung worship is organized and as essential as sacrifice." },
      { v: 49, s: 3722, note: "Kipper, \"to make atonement\": Aaron's sons worked in the Most Holy Place to make atonement for Israel, covering sin so a holy God could dwell among His people." },
    ],
  },
  {
    book: "1chronicles",
    chapter: 7,
    title: "The northern tribes remembered",
    setting:
      "This chapter gathers the northern tribes: Issachar, Benjamin, Naphtali, Manasseh, Ephraim and Asher. These tribes had been scattered by Assyria about three centuries before the Chronicler wrote, and Zebulun and Dan barely appear, if at all. Yet he insists on including them. For him \"all Israel\" still meant all twelve tribes, and the small community in Jerusalem was heir to the whole people of God, not just Judah.",
    words: [
      { v: 22, s: 56, note: "Aval, \"to mourn\": Ephraim mourned many days for sons killed in a cattle raid near Gath. The list pauses for a father's grief." },
      { v: 23, s: 1283, note: "Beriah, \"Beriah\": The name sounds like \"in tragedy\". Ephraim named a new son for the loss, yet his line went on, and from Ephraim came Joshua (v. 27)." },
    ],
  },
  {
    book: "1chronicles",
    chapter: 8,
    title: "Benjamin and the house of Saul",
    setting:
      "Benjamin gets a second, longer list here. After the kingdom split, Benjamin stood with Judah, and its people were part of the returned community (Ezra 1:5). The chapter traces Benjamite clans in Geba, Jerusalem and Gibeon, and ends with the family of Saul, Israel's first king, carried on for many generations. It sets the stage for chapter 10, where Saul's fall opens the Chronicler's account of David.",
    words: [
      { v: 33, s: 792, note: "Eshbaal, \"Esh-baal\": Saul's son, called Ish-bosheth in 2 Samuel. Baal can mean \"lord\", but scribes later swapped it for bosheth, \"shame\", to avoid honoring the god Baal." },
      { v: 40, s: 1368, note: "Gibbor, \"mighty man\": Benjamin was famous for warriors and archers (Judges 20:16). Ulam's sons are remembered as mighty men of valor." },
    ],
  },
  {
    book: "1chronicles",
    chapter: 9,
    title: "Back home in Jerusalem",
    setting:
      "The genealogies end where the first readers lived: back in Jerusalem after the exile. Verse 1 names the reason for the exile plainly, Judah's unfaithfulness, and then lists those who resettled the city: people of Judah, Benjamin, Ephraim and Manasseh, with priests, Levites and gatekeepers. Many of the names also appear in Nehemiah 11. After nine chapters, readers could find their own families in the story and see their temple duties as a continuation of David's.",
    words: [
      { v: 22, s: 530, note: "Emunah, \"positions of trust\": Literally faithfulness. Gatekeepers held their posts in trust, the opposite of the unfaithfulness that caused the exile." },
      { v: 33, s: 3915, note: "Laylah, \"night\": The musicians were on duty day and night. Praise in God's house was meant to be constant." },
    ],
  },
  {
    book: "1chronicles",
    chapter: 10,
    title: "The death of Saul",
    setting:
      "After nine chapters of names, the story begins with an ending: Saul's death on Mount Gilboa, fighting the Philistines, probably around 1010 BC. Chronicles skips Saul's whole reign and tells only this final battle, drawn from 1 Samuel 31. The Chronicler is not writing Saul's biography. He presents Saul as the king who did not seek the LORD, so that David, and every later king, can be measured against him.",
    words: [
      { v: 13, s: 178, note: "Ov, \"medium\": A spirit medium who claimed to contact the dead. Saul had banned them himself (1 Samuel 28:3), then went to one at Endor." },
      { v: 14, s: 1875, note: "Darash, \"to inquire\": To seek God, a key word in Chronicles. Saul asked a medium for guidance but did not truly seek the LORD." },
    ],
  },
  {
    book: "1chronicles",
    chapter: 11,
    title: "All Israel crowns David",
    setting:
      "Chronicles moves straight from Saul's death to David's coronation by all Israel at Hebron. It leaves out the years of civil war with Saul's house told in 2 Samuel 2 to 4, because the Chronicler wants to show a united people gathered around God's chosen king. David then captures Jerusalem, a Canaanite fortress, and the chapter lists his mighty men. Uriah the Hittite appears quietly near the end of the list (v. 41).",
    words: [
      { v: 3, s: 1285, note: "Berit, \"covenant\": David made a covenant with Israel's elders before the LORD. His kingship rested on mutual commitment under God, not on force alone." },
      { v: 19, s: 5315, note: "Nephesh, \"life\": David would not drink water his men fetched at the risk of their lives. He treated their lives as sacred and poured the water out to the LORD." },
    ],
  },
  {
    book: "1chronicles",
    chapter: 12,
    title: "Warriors rally to David",
    setting:
      "This chapter steps back to list those who joined David before he was king: warriors who came to him at Ziklag while he hid from Saul, and then men from every tribe who came to Hebron to crown him. The numbers are large; some scholars think the word for thousand can also mean a military unit, so views differ. The Chronicler's point is unity: all Israel, with one heart, gathering around the king God had chosen.",
    words: [
      { v: 18, s: 3847, note: "Lavash, \"came upon\": Literally the Spirit \"clothed\" Amasai. God's Spirit wrapped him like a garment and gave him words of loyalty to David." },
      { v: 32, s: 6256, note: "Et, \"times\": The men of Issachar understood the times and knew what Israel should do. Wisdom here means reading the moment rightly and acting on it." },
    ],
  },
  {
    book: "1chronicles",
    chapter: 13,
    title: "The ark and Uzzah",
    setting:
      "As king, David's first priority is to bring the ark of the covenant, the symbol of God's throne among His people, to Jerusalem. It had been neglected at Kiriath-jearim through Saul's reign. Chronicles places this before David's palace and battles to show his priorities. But David moves the ark on a new cart instead of having Levites carry it on poles as the Law required (Numbers 4:15), and the celebration ends in death.",
    words: [
      { v: 8, s: 7832, note: "Sachaq, \"celebrating\": Literally laughing or playing. The joy was real and loud, but joy could not stand in for obedience." },
      { v: 11, s: 6555, note: "Parats, \"to burst forth\": The LORD broke out against Uzzah. The same verb in v. 2 is translated \"far and wide\": David meant to spread the call, but God's holiness broke out instead." },
    ],
  },
  {
    book: "1chronicles",
    chapter: 14,
    title: "David's house is established",
    setting:
      "While the ark waits at Obed-edom's house, the Chronicler shows God blessing David: Hiram of Tyre sends cedar and craftsmen for a palace, David's family grows, and he defeats the Philistines twice. In 2 Samuel 5 these events come before the ark story; Chronicles places them here to show that God was establishing David, and that David, unlike Saul, now inquired of the LORD before every battle.",
    words: [
      { v: 2, s: 3559, note: "Kun, \"established\": David realized the LORD had established him as king for the sake of His people Israel. His throne existed to serve God's people." },
      { v: 15, s: 6807, note: "Tseadah, \"marching\": God told David to wait for the sound of marching in the treetops, the sign that God's own army was going ahead of him." },
    ],
  },
  {
    book: "1chronicles",
    chapter: 15,
    title: "The ark comes to Jerusalem",
    setting:
      "Three months after Uzzah's death, David tries again, this time by the book. He prepares a tent for the ark in Jerusalem, gathers the priests and Levites, and has them consecrate themselves and carry the ark on poles as Moses commanded. The Chronicler adds what 2 Samuel 6 leaves out: detailed lists of Levite singers and musicians. For his readers, the worship of their rebuilt temple traced straight back to this day.",
    words: [
      { v: 13, s: 4941, note: "Mishpat, \"proper order\": David admits the first disaster happened because \"we did not consult Him about the proper order\". How God is approached matters." },
      { v: 22, s: 995, note: "Bin, \"highly skilled\": Chenaniah led the music because he understood it. Skill was valued in worship, not enthusiasm alone." },
    ],
  },
  {
    book: "1chronicles",
    chapter: 16,
    title: "A song of thanks for the ark",
    setting:
      "With the ark settled in its tent in Jerusalem, David appoints Asaph and other Levites to lead regular praise before it. The song that follows (vv. 8 to 36) is woven from parts of Psalms 105, 96 and 106. Meanwhile the old tabernacle stayed at Gibeon, where priests kept up the daily sacrifices (v. 39). For the Chronicler's readers, who sang these psalms in their rebuilt temple, this chapter showed where their worship began.",
    words: [
      { v: 4, s: 2142, note: "Zakhar, \"to celebrate\": Literally to remember. The Levites' job was to call to mind what God had done, so His people would not forget." },
      { v: 34, s: 2617, note: "Chesed, \"loving devotion\": God's loyal covenant love. \"His loving devotion endures forever\" became the refrain of Israel's worship (2 Chronicles 5:13; Psalm 136)." },
    ],
  },
  {
    book: "1chronicles",
    chapter: 17,
    title: "God promises David a house",
    setting:
      "With the ark in Jerusalem and peace around him, David wants to build a permanent temple for God. Through the prophet Nathan, God turns the plan around: David will not build God a house; God will build David a house, a royal line, and establish his son's throne forever. This is Chronicles' version of 2 Samuel 7. For readers with no king, this promise was the root of their hope for a coming Son of David.",
    words: [
      { v: 13, s: 1, note: "Av, \"Father\": \"I will be his Father, and he will be My son.\" Hebrews 1:5 applies these words to Jesus, the Son greater than the angels." },
      { v: 14, s: 4438, note: "Malkhut, \"kingdom\": Chronicles says \"My house and My kingdom\", where 2 Samuel 7:16 says \"your house and your kingdom\". The throne finally belongs to God; the king rules on His behalf." },
    ],
  },
  {
    book: "1chronicles",
    chapter: 18,
    title: "David's victories",
    setting:
      "This chapter summarizes David's wars, probably over many years and not in strict order. He subdues the Philistines, Moab, the Aramean kingdoms of Zobah and Damascus, and Edom, and receives gold, silver and bronze as tribute. The Chronicler adds that Solomon later used this bronze for the temple (v. 8). David's wars are shown as clearing the way for peace and for the house of God his son would build.",
    words: [
      { v: 13, s: 3467, note: "Yasha, \"victorious\": Literally \"the LORD saved David\" wherever he went. The same root gives the names Joshua and Jesus." },
      { v: 14, s: 6666, note: "Tsedaqah, \"righteousness\": David administered justice and righteousness for all his people. Israel's ideal king protected the weak and ruled fairly." },
    ],
  },
  {
    book: "1chronicles",
    chapter: 19,
    title: "Kindness insulted",
    setting:
      "When Nahash king of Ammon dies, David sends envoys to comfort his son Hanun, remembering an old kindness. Ammon was a kingdom east of the Jordan, around modern Amman. Hanun's officials suspect spying, humiliate the envoys, and hire Aramean chariots for war. The account follows 2 Samuel 10, though some numbers differ, probably through copying over the centuries. It leads into the siege of Rabbah, Ammon's capital, in chapter 20.",
    words: [
      { v: 4, s: 1548, note: "Galach, \"shaved\": Shaving half of each man's beard, as 2 Samuel 10:4 specifies, shamed him publicly. A beard was a sign of manhood and dignity." },
      { v: 6, s: 887, note: "Baash, \"stench\": Literally they had made themselves stink to David. One insult turned a friendly neighbor into an enemy." },
    ],
  },
  {
    book: "1chronicles",
    chapter: 20,
    title: "Victory at Rabbah",
    setting:
      "This short chapter finishes the Ammonite war and adds three victories over giant Philistine warriors. In 2 Samuel, between this chapter's first two verses, comes David's adultery with Bathsheba and the murder of Uriah (2 Samuel 11 and 12). Chronicles leaves it out, not to hide it, since its readers knew Samuel well, but because its focus is David as founder of the temple and its worship. Psalm 51 kept David's confession in Israel's songbook.",
    words: [
      { v: 1, s: 3427, note: "Yashav, \"remained\": \"But David remained in Jerusalem.\" Readers who knew 2 Samuel 11:1 knew what happened while the king stayed home." },
      { v: 2, s: 5850, note: "Atarah, \"crown\": The Ammonite crown weighed about a talent, roughly 75 pounds (34 kg). It may have belonged to the idol Milcom, and was likely worn only briefly as a sign of victory." },
    ],
  },
  {
    book: "1chronicles",
    chapter: 21,
    title: "The census and the threshing floor",
    setting:
      "This chapter retells 2 Samuel 24 with one striking difference: there the LORD's anger incites David to count Israel; here Satan, or an adversary, does. The census brings a plague that stops at the threshing floor of Ornan the Jebusite (Araunah in Samuel), on the hill north of the old city. For the Chronicler the story matters most because it explains how God chose the site where the temple would stand (22:1).",
    words: [
      { v: 1, s: 7854, note: "Satan, \"Satan\": Here without \"the\", so some read it as the name Satan and others as \"an adversary\", perhaps a human enemy. 2 Samuel 24:1 says the LORD incited David." },
      { v: 24, s: 2600, note: "Chinnam, \"for nothing\": David refuses a free gift of land and animals. He will not offer the LORD burnt offerings that cost him nothing." },
    ],
  },
  {
    book: "1chronicles",
    chapter: 22,
    title: "David prepares for the temple",
    setting:
      "Barred from building the temple himself, David spends his last years preparing for it: stonecutters, iron and bronze, cedar from Tyre and Sidon, and vast amounts of gold and silver. Then he charges young Solomon to build. None of this appears in Samuel or Kings, where David's final days are full of court intrigue. The Chronicler presents David as the temple's true founder, the one who planned and provided so his son could build.",
    words: [
      { v: 8, s: 1818, note: "Dam, \"blood\": God tells David he may not build because he has shed much blood in war. Even wars God had blessed left him unsuited to build a house of rest and peace." },
      { v: 9, s: 7965, note: "Shalom, \"peace\": Solomon's name sounds like shalom. The son of peace would build the house where God's Name would dwell." },
    ],
  },
  {
    book: "1chronicles",
    chapter: 23,
    title: "The Levites organized",
    setting:
      "Now old, David makes Solomon king and organizes the Levites for temple service. With the ark no longer traveling, their old work of carrying the tabernacle is over, so David assigns new duties: assisting the priests, caring for the courts and chambers, preparing the bread and offerings, and standing every morning and evening to thank and praise the LORD. These arrangements still shaped temple life in the Chronicler's own day, centuries later.",
    words: [
      { v: 13, s: 914, note: "Badal, \"set apart\": Aaron and his sons were separated for the most holy work and to bless in God's name. Holiness begins with being set apart for God." },
      { v: 30, s: 1242, note: "Boqer, \"morning\": Levites stood every morning and evening to thank and praise the LORD, framing each day with worship." },
    ],
  },
  {
    book: "1chronicles",
    chapter: 24,
    title: "The priests' divisions",
    setting:
      "With the priests Zadok and Ahimelech, David divides Aaron's descendants into twenty four divisions, assigned by lot, so each family would serve at the temple in turn. Renewed after the exile, this system was still running about a thousand years later. Luke 1:5 to 9 says Zechariah, father of John the Baptist, belonged to \"the division of Abijah\", the eighth listed here, and was serving his turn in the temple when the angel Gabriel appeared.",
    words: [
      { v: 3, s: 2505, note: "Chalaq, \"divided\": David divided the priests by the duties of their service. The same verb is used for dividing an inheritance; each family received its share of holy work." },
      { v: 10, s: 8066, note: "Shemini, \"eighth\": Abijah's was the eighth division. Zechariah, father of John the Baptist, served in it (Luke 1:5)." },
    ],
  },
  {
    book: "1chronicles",
    chapter: 25,
    title: "Musicians who prophesied",
    setting:
      "David and his leaders set apart the families of Asaph, Heman and Jeduthun to lead the temple's music: 288 trained singers in twenty four groups. Strikingly, their music is called prophesying. These families stand behind many psalms: Asaph's name heads Psalms 50 and 73 to 83, and Heman's and Ethan's (perhaps Jeduthun) head Psalms 88 and 89. After the exile, Asaph's descendants were still among the temple singers (Ezra 2:41).",
    words: [
      { v: 3, s: 5012, note: "Nava, \"to prophesy\": Jeduthun \"prophesied with the harp\". Inspired songs could declare God's truth as surely as spoken prophecy." },
      { v: 8, s: 8527, note: "Talmid, \"pupil\": Lots were cast teacher and pupil alike. The word appears only here in the Old Testament; later Jewish writers used it for a disciple." },
    ],
  },
  {
    book: "1chronicles",
    chapter: 26,
    title: "Gatekeepers and treasurers",
    setting:
      "The last list of temple staff covers the gatekeepers, who guarded the entrances, storehouses and sacred treasures, and Levites who served outside Jerusalem as officials and judges. Obed-edom, who once sheltered the ark (13:14), is honored with a large family of gatekeepers. The treasuries held gifts dedicated by Samuel, Saul, Abner, Joab and David. The Chronicler's readers knew how much a rebuilt temple needed faithful guards (Nehemiah 7:1).",
    words: [
      { v: 20, s: 214, note: "Otsar, \"treasuries\": Levites guarded the treasuries of God's house and of dedicated gifts. Sacred money needed trustworthy hands." },
      { v: 29, s: 7860, note: "Shoter, \"officers\": Some Levites served outside the temple as officials and judges. Serving God included fair administration in ordinary towns." },
    ],
  },
  {
    book: "1chronicles",
    chapter: 27,
    title: "David's army and officials",
    setting:
      "The final list turns from temple to kingdom: twelve army divisions of 24,000 men, each serving one month a year, the leaders of the tribes, and the officials over David's storehouses, farms, vineyards, olive groves, herds and flocks. The picture is of an organized kingdom with a rotating citizen militia. The list ends with David's counselors, including Ahithophel, who later betrayed him, and Hushai, who stayed loyal.",
    words: [
      { v: 1, s: 4256, note: "Machaloqet, \"division\": Each army division served a monthly turn. The same word names the priestly divisions (24:1); kingdom and temple were organized alike." },
      { v: 33, s: 7453, note: "Rea, \"friend\": Hushai was \"the king's friend\", probably an official title for a trusted adviser. He proved loyal when Ahithophel betrayed David (2 Samuel 15 to 17)." },
    ],
  },
  {
    book: "1chronicles",
    chapter: 28,
    title: "David's charge to Israel",
    setting:
      "Near the end of his life, David gathers all Israel's leaders in Jerusalem: tribal heads, army commanders, officials and warriors. He tells them God chose Judah, then his family, then him, and now Solomon to sit \"on the throne of the kingdom of the LORD\". He explains again why he may not build the temple, hands Solomon detailed plans received from God, and charges both his son and the people to seek the LORD and finish the work.",
    words: [
      { v: 2, s: 1916, note: "Hadom, \"footstool\": The temple would be God's footstool. Israel pictured God enthroned in heaven with His feet resting on the ark below (Psalm 99:5)." },
      { v: 11, s: 8403, note: "Tavnit, \"plans\": The word used for the pattern of the tabernacle shown to Moses (Exodus 25:9). David's plans came from God, not royal taste." },
    ],
  },
  {
    book: "2chronicles",
    chapter: 1,
    title: "Solomon asks for wisdom",
    setting:
      "Chronicles was probably written after the exile, perhaps around 400 BC, for Jews rebuilding life in Judah with a small second temple and no king. Second Chronicles opens with Solomon around 970 BC. Before the temple exists, he leads all Israel to Gibeon, where Moses' old Tent of Meeting and bronze altar still stood, while the ark rested in a tent in Jerusalem. There God invites him to ask for anything.",
    words: [
      { v: 10, s: 2451, note: "Chokhmah, \"wisdom\": In the Old Testament this is practical skill for living and ruling well, not just knowing facts. Solomon wants it to judge God's people, not to impress them." },
      { v: 8, s: 2617, note: "Chesed, \"kindness\": God's loyal covenant love. Solomon builds his request on the chesed God already showed his father David." },
    ],
  },
  {
    book: "2chronicles",
    chapter: 2,
    title: "Preparing to build the temple",
    setting:
      "Solomon now gathers materials and workers for the temple. Tyre, the great Phoenician port on the coast north of Israel, controlled the cedar of Lebanon and the finest craftsmen of the day. Its king, called Huram here and Hiram in Kings, had been David's ally. Solomon's letter explains why the house matters: it is for incense, the bread of the Presence and sacrifices to the LORD, the God above all gods.",
    words: [
      { v: 6, s: 3557, note: "Kul, \"to sustain\": to hold or contain. Solomon admits that heaven itself cannot contain God, so the temple is a place to meet Him, not a box to hold Him." },
      { v: 4, s: 8034, note: "Shem, \"name\": The house is built for the Name of the LORD. His name stands for His revealed presence and character among His people." },
    ],
  },
  {
    book: "2chronicles",
    chapter: 3,
    title: "The temple on Mount Moriah",
    setting:
      "Building began in Solomon's fourth year, around 966 BC. Only Chronicles names the site as Mount Moriah, tying the temple to Ornan's threshing floor, where David's plague was stopped (1 Chronicles 21), and recalling the mountains of Moriah where Abraham offered Isaac (Genesis 22). The returned exiles were rebuilding on this same ground, so its history mattered deeply to them.",
    words: [
      { v: 14, s: 6532, note: "Poreket, \"curtain\": the heavy veil before the Most Holy Place. Only Chronicles mentions it for Solomon's temple; the Gospels say the temple veil tore when Jesus died (Matthew 27:51)." },
    ],
  },
  {
    book: "2chronicles",
    chapter: 4,
    title: "The temple furnishings",
    setting:
      "This chapter lists the temple's furnishings: a huge bronze altar, the cast bronze Sea resting on twelve oxen, ten basins, ten gold lampstands and ten tables. The bronze was cast in clay molds in the Jordan valley. For returned exiles with a far poorer temple, the list remembered what had been lost; the Babylonians later broke up this bronze and carried it away (2 Kings 25:13).",
    words: [
      { v: 2, s: 3220, note: "Yam, \"sea\": The giant basin was simply called the Sea. In the ancient world the sea often pictured chaos; here it stands still and tamed in God's house." },
      { v: 6, s: 7364, note: "Rachats, \"to wash\": The Sea was for the priests to wash in. No one served at God's altar without first being cleansed." },
    ],
  },
  {
    book: "2chronicles",
    chapter: 5,
    title: "The ark comes home",
    setting:
      "Around 959 BC, at the festival in the seventh month (the Festival of Shelters), Solomon brings the ark from the City of David up to the finished temple. Chronicles has been building toward this moment since David's plans in 1 Chronicles 22 to 29. Levites, priests and 120 trumpeters lead the worship. For readers after the exile, whose rebuilt temple had no ark, this scene showed what worship at its fullest looked like.",
    words: [
      { v: 13, s: 2617, note: "Chesed, \"kindness\": The refrain \"His loving devotion endures forever\" became the signature song of Chronicles and of the returned exiles (Ezra 3:11)." },
      { v: 14, s: 3519, note: "Kavod, \"glory\": literally weight or heaviness. God's glory fills the house so heavily that the priests cannot stand to serve." },
    ],
  },
  {
    book: "2chronicles",
    chapter: 6,
    title: "Solomon's prayer of dedication",
    setting:
      "Solomon stands on a bronze platform before the whole assembly, then kneels with his hands spread toward heaven. His prayer imagines Israel's future failures: defeat, drought, plague, foreigners seeking God and even exile. Each time he asks God to hear from heaven and forgive when they pray toward this house. For the first readers, back from exile, the prayer had already come true; they were living in its answer.",
    words: [
      { v: 21, s: 5545, note: "Salach, \"to forgive\": In the Old Testament only God is ever the subject of this verb. Solomon's whole prayer leans on it." },
      { v: 18, s: 3427, note: "Yashav, \"to dwell\": Will God really dwell with man on earth? Solomon cannot fully answer; John 1:14 says the Word became flesh and dwelt among us." },
    ],
  },
  {
    book: "2chronicles",
    chapter: 8,
    title: "Solomon's building and worship",
    setting:
      "After twenty years of building the temple and his palace, around 950 BC, Solomon turns to cities, storehouses and defense. He fortifies Beth-horon and builds as far north as Hamath and Tadmor. Chronicles also shows him ordering worship exactly as Moses commanded and as David arranged the priests, Levites and gatekeepers. For the returned exiles, getting temple worship right again was urgent business.",
    words: [
      { v: 11, s: 6944, note: "Qodesh, \"holiness\": Solomon moves Pharaoh's daughter out of David's palace because the places where the ark had been are holy. Holiness here reshapes a household." },
    ],
  },
  {
    book: "2chronicles",
    chapter: 9,
    title: "The queen of Sheba visits",
    setting:
      "Sheba was probably in southwest Arabia, modern Yemen, a kingdom grown rich on incense and spice caravans. Its queen travels well over a thousand miles to test Solomon. The chapter then surveys his wealth and fame up to his death around 931 BC. Chronicles leaves out his many wives and later idolatry (1 Kings 11); its readers knew that story, and the writer focuses on Solomon as temple builder.",
    words: [
      { v: 8, s: 3678, note: "Kisse, \"throne\": The queen says God set Solomon on \"His throne.\" In Chronicles, Israel's throne belongs to the LORD; the king only sits on it for Him." },
      { v: 4, s: 7307, note: "Ruach, \"spirit\": When she saw it all, there was no more spirit in her. Solomon's court left her breathless." },
    ],
  },
  {
    book: "2chronicles",
    chapter: 10,
    title: "The kingdom splits",
    setting:
      "Solomon dies around 931 BC, and his son Rehoboam goes to Shechem, the old northern meeting place, to be confirmed as king. The northern tribes, led by Jeroboam, ask for relief from Solomon's heavy labor and taxes. From here on, Chronicles tells the northern kingdom's story only where it touches Judah, because it traces God's promises through David's line and the Jerusalem temple.",
    words: [
      { v: 15, s: 5252, note: "Nesibbah, \"turn\": This turn of events was from God. Rehoboam's foolish choice was his own, yet God worked through it to fulfill Ahijah's word." },
      { v: 16, s: 2506, note: "Cheleq, \"portion\": What portion do we have in David? The northern tribes renounce their share in David's house, the very line God had promised to bless." },
    ],
  },
  {
    book: "2chronicles",
    chapter: 11,
    title: "Rehoboam secures Judah",
    setting:
      "Rehoboam now rules only Judah and Benjamin, from about 931 to 913 BC. In the north, Jeroboam has set up golden calves at Bethel and Dan (1 Kings 12:28 to 29) and pushed out the Levites. Chronicles adds what Kings leaves out: faithful priests, Levites and worshipers moved south to Jerusalem, so for a time Judah became the home of true worship for all Israel.",
    words: [
      { v: 16, s: 1245, note: "Baqash, \"to seek\": Those from every tribe who set their hearts to seek the LORD followed true worship to Jerusalem, even at the cost of leaving home." },
      { v: 17, s: 2388, note: "Chazaq, \"to strengthen\": These newcomers strengthened Judah's kingdom for three years. Faithful people, not just fortresses, made the nation strong." },
    ],
  },
  {
    book: "2chronicles",
    chapter: 12,
    title: "Shishak invades Judah",
    setting:
      "In Rehoboam's fifth year, around 925 BC, Pharaoh Shishak of Egypt invades. Shishak is usually identified with Shoshenq I, whose victory relief at the Karnak temple in Egypt lists towns in the land that he claimed to have taken. Chronicles explains the invasion from God's side: once Rehoboam felt secure, he and all Israel abandoned the law of the LORD.",
    words: [
      { v: 6, s: 3665, note: "Kana, \"be humble\": The leaders humbled themselves, and God relented from destroying them. The word recalls the promise of 7:14." },
      { v: 8, s: 5656, note: "Avodah, \"service\": God lets Judah serve Shishak so they will learn the difference between serving Him and serving earthly kingdoms." },
    ],
  },
  {
    book: "2chronicles",
    chapter: 13,
    title: "Abijah's stand at Zemaraim",
    setting:
      "Abijah, Rehoboam's son, reigns about three years (913 to 910 BC). Kings calls him Abijam and judges him harshly (1 Kings 15:3). Chronicles records one moment of his reign: a speech on Mount Zemaraim near the border, calling Jeroboam's army back to the LORD, David's line and the true priesthood. The army sizes are huge; the Hebrew word for thousand may sometimes mean a military unit.",
    words: [
      { v: 18, s: 8172, note: "Sha'an, \"to lean\": Judah prevailed because they leaned on the LORD, the God of their fathers. Chronicles keeps returning to this word for trust (14:11; 16:7 and 8)." },
    ],
  },
  {
    book: "2chronicles",
    chapter: 14,
    title: "Asa seeks the LORD",
    setting:
      "Asa, Abijah's son, reigns about 41 years (910 to 869 BC). His first decade is peaceful, and he uses it to tear down foreign altars, sacred pillars and Asherah poles and to call Judah to seek the LORD. Then Zerah the Cushite, probably a commander from Egypt or Nubia to the south, attacks with an enormous army. Chronicles uses Asa's early reign to show what relying on God looks like.",
    words: [
      { v: 11, s: 5826, note: "Azar, \"to help\": Asa prays that there is no one besides God to help the powerless against the mighty. The name Ebenezer, \"stone of help,\" comes from the same root." },
      { v: 6, s: 5117, note: "Nuach, \"to rest\": The LORD gave Asa rest. In Chronicles, peace is a gift that follows seeking God, not a prize for military skill." },
    ],
  },
  {
    book: "2chronicles",
    chapter: 15,
    title: "Asa's covenant renewal",
    setting:
      "After the victory over Zerah, the prophet Azariah son of Oded meets Asa with a short, sharp message. Asa answers with a covenant renewal in Jerusalem in his fifteenth year, around 895 BC. Many people from the northern tribes defect to Judah because they see that the LORD is with Asa. The chapter shows what national revival looked like under the old covenant, including its severe penalties.",
    words: [
      { v: 2, s: 4672, note: "Matsa, \"to find\": If you seek Him, He will be found by you. God is not hiding from those who honestly look for Him (Jeremiah 29:13)." },
      { v: 17, s: 8003, note: "Shalem, \"complete\": Asa's heart was fully devoted all his days, even though the high places in Israel were not removed." },
    ],
  },
  {
    book: "2chronicles",
    chapter: 16,
    title: "Asa's later years",
    setting:
      "Late in Asa's long reign, Baasha of Israel fortifies Ramah, a few miles north of Jerusalem, to block traffic into Judah. Asa pays Ben-hadad of Aram (Syria) with temple and palace treasure to attack Israel instead. Verse 1 dates this to Asa's thirty-sixth year, though by Kings' timeline Baasha had died earlier; many think the count runs from the kingdom's division.",
    words: [
      { v: 9, s: 7751, note: "Shut, \"to rove\": The eyes of the LORD roam over all the earth, actively searching for hearts fully devoted to Him." },
      { v: 9, s: 2388, note: "Chazaq, \"to strengthen\": God searches in order to show Himself strong for such people. The verb that made kings strong now describes God's own strength." },
    ],
  },
  {
    book: "2chronicles",
    chapter: 17,
    title: "Jehoshaphat teaches Judah",
    setting:
      "Jehoshaphat, Asa's son, reigns about 872 to 848 BC, possibly starting as co-regent during Asa's illness. He strengthens Judah against the northern kingdom, then does something unusual: in his third year he sends officials, Levites and priests through the towns of Judah with the Book of the Law to teach the people. Neighboring kingdoms grow afraid to attack, and Philistines and Arabs bring gifts.",
    words: [
      { v: 6, s: 1361, note: "Gavah, \"to exult\": This verb often means to be lifted up in pride. Here Jehoshaphat's heart was lifted up in the ways of the LORD: bold courage, not arrogance." },
      { v: 9, s: 3925, note: "Lamad, \"to learn: teach\": Teams of Levites taught the law town by town. Reform began with ordinary people learning God's word." },
    ],
  },
  {
    book: "2chronicles",
    chapter: 18,
    title: "Micaiah and the lying spirit",
    setting:
      "Jehoshaphat has allied with Ahab of Israel by marrying his son Jehoram to Ahab's daughter Athaliah (21:6). Around 853 BC, Ahab invites him to help retake Ramoth-gilead, a fortress city east of the Jordan held by Aram. Ahab's four hundred prophets promise victory. Jehoshaphat asks for a prophet of the LORD, and the lone voice of Micaiah son of Imlah tells a very different story.",
    words: [
      { v: 1, s: 2859, note: "Choten, \"relative\": Jehoshaphat made himself Ahab's relative by marriage. This alliance would later bring Athaliah's bloodshed into Judah (22:10)." },
      { v: 21, s: 8267, note: "Sheqer, \"deception\": A lying spirit in the prophets' mouths. Ahab had surrounded himself with comfortable falsehood, and God gave him over to it." },
    ],
  },
  {
    book: "2chronicles",
    chapter: 19,
    title: "Jehoshaphat appoints judges",
    setting:
      "Jehoshaphat ruled Judah in the ninth century BC. He has just come home from fighting beside Ahab of Israel at Ramoth-gilead, where Ahab died (ch. 18). A prophet rebukes the alliance, and the king answers by reforming the courts. Deuteronomy 16 and 17 required judges in every town and a higher court at the sanctuary. His name fits the work: Jehoshaphat means \"the LORD judges.\"",
    words: [
      { v: 6, s: 8199, note: "Shaphat, \"to judge\": The same root sits inside the king's own name. A Hebrew judge did more than hand down verdicts; he set wrongs right and defended the weak, as God does." },
      { v: 7, s: 4856, note: "Masso, \"partiality\": Literally a \"lifting\" of the face, showing favor to someone because of who they are. God does not lift faces, so His judges may not either." },
    ],
  },
  {
    book: "2chronicles",
    chapter: 20,
    title: "The battle belongs to God",
    setting:
      "A coalition of Moabites, Ammonites and Meunites from the region of Edom came around the Dead Sea and camped at En-gedi, a short march from Jerusalem. Judah had no time to prepare. Jehoshaphat called a nationwide fast and prayed in the temple courtyard, holding God to Solomon's dedication prayer (ch. 6 and 7). Then a Levite from the temple singers stood up with God's answer.",
    words: [
      { v: 20, s: 539, note: "Aman, \"to believe, be firm\": Jehoshaphat plays on the word: believe (ha'aminu) and you will be made firm (te'amenu). Isaiah uses the same pun with Ahaz (Isaiah 7:9)." },
      { v: 26, s: 1294, note: "Beracah, \"blessing\": The valley where Judah gathered after the battle was named for what they did there. A day that began in fear ended in a place called Blessing." },
    ],
  },
  {
    book: "2chronicles",
    chapter: 21,
    title: "Jehoram's evil reign",
    setting:
      "Jehoshaphat's son Jehoram married Athaliah, a daughter of Ahab, sealing the alliance his father had made with Israel. The marriage brought Baal worship into David's royal house. Jehoram secured his throne by killing his six brothers. Edom and the town of Libnah broke away, and raiders from Philistia and Arabia stripped the palace. Chronicles alone records a letter of judgment from the prophet Elijah.",
    words: [
      { v: 7, s: 5216, note: "Ner, \"lamp\": God had promised David a lamp in Jerusalem (1 Kings 11:36). Even with a murderous king on the throne, God keeps the light of David's line burning." },
      { v: 20, s: 2532, note: "Chemdah, \"desire\": He died \"to no one's regret,\" literally with no one's desire. The word usually means something treasured; no one treasured this king." },
    ],
  },
  {
    book: "2chronicles",
    chapter: 22,
    title: "Athaliah seizes the throne",
    setting:
      "Ahaziah reigned only a year, steered by his mother Athaliah and advisers from Ahab's family. He was killed in the north during Jehu's purge of Ahab's house (2 Kings 9). Athaliah then murdered the royal heirs and ruled Judah herself for six years, the only queen to do so. One baby escaped, hidden by his aunt in the temple, and with him the line of David survived.",
    words: [
      { v: 3, s: 3289, note: "Yaats, \"to counsel\": The word is used for royal advisers. Ahaziah's chief counselor in wickedness was his own mother." },
      { v: 11, s: 5641, note: "Satar, \"to hide\": Jehoshabeath hid the child. God's promise to David hung on one hidden baby, much as Israel's rescue once hung on the hidden infant Moses (Exodus 2)." },
    ],
  },
  {
    book: "2chronicles",
    chapter: 23,
    title: "Jehoiada crowns Joash",
    setting:
      "After six years of Athaliah's rule, the priest Jehoiada planned a careful coup. He gathered army commanders, Levites and family heads, set guards in shifts on a Sabbath, and armed them with King David's own spears kept in the temple. The seven-year-old Joash was brought out and crowned. The day ended with a covenant renewed and the temple of Baal torn down.",
    words: [
      { v: 11, s: 5715, note: "Edut, \"testimony\": Joash received the Testimony with his crown, probably a copy of God's covenant law. Deuteronomy 17:18-20 required every king to keep and read one." },
      { v: 16, s: 1285, note: "Berit, \"covenant\": Jehoiada renewed the covenant so the people would again be \"the LORD's people.\" Restoring the rightful king meant returning to the true God." },
    ],
  },
  {
    book: "2chronicles",
    chapter: 24,
    title: "Joash repairs the temple",
    setting:
      "Joash became king at seven and reigned forty years, probably in the late ninth century BC. While the priest Jehoiada lived, Joash followed God and restored the temple that Athaliah's sons had plundered for Baal. After Jehoiada died at a great age, Judah's officials drew the king back to idols. Jehoiada's own son Zechariah spoke against it and was stoned in the temple court.",
    words: [
      { v: 9, s: 4864, note: "Maset, \"tax, tribute\": The levy Moses set for the tabernacle (Exodus 30:12-16). Joash revived it with a chest at the temple gate, and people gave gladly until it was full." },
      { v: 20, s: 3847, note: "Lavash, \"to clothe\": The Spirit of God \"clothed\" Zechariah, wrapping around him like a garment. He spoke God's words knowing what it might cost." },
    ],
  },
  {
    book: "2chronicles",
    chapter: 25,
    title: "Amaziah's divided heart",
    setting:
      "Amaziah came to the throne after his father Joash was assassinated, probably early in the eighth century BC. He punished the killers but spared their children, obeying Deuteronomy 24:16. He hired Israelite soldiers, sent them home at a prophet's word, and defeated Edom. But he took Edom's gods home, picked a needless fight with Israel's king Jehoash, and lost Jerusalem's treasures.",
    words: [
      { v: 2, s: 3824, note: "Levav, \"heart\": Amaziah did right \"but not wholeheartedly,\" literally not with a whole heart. Chronicles uses the phrase to explain everything that follows." },
      { v: 9, s: 7235, note: "Ravah, \"to multiply\": The LORD is able to give \"much more\" than the hundred talents Amaziah would lose. Obedience that costs money is not a loss with God." },
    ],
  },
  {
    book: "2chronicles",
    chapter: 26,
    title: "Uzziah's strength and pride",
    setting:
      "Uzziah, called Azariah in Kings, reigned about fifty-two years in the eighth century BC, likely including years as co-regent. Judah prospered as it had not since Solomon: he rebuilt Elath on the Red Sea, beat the Philistines, dug cisterns and loved farming. Isaiah's call came \"in the year King Uzziah died\" (Isaiah 6:1), and Amos dates his message by an earthquake in his reign.",
    words: [
      { v: 15, s: 5826, note: "Azar, \"to help\": He was \"helped tremendously.\" Azar is the root of his other name, Azariah, \"the LORD has helped.\" His strength was a gift, which he forgot." },
      { v: 16, s: 1361, note: "Gavah, \"to be high\": His heart was lifted up. The pride that grew with his success led him to seize a priest's role God had not given him." },
    ],
  },
  {
    book: "2chronicles",
    chapter: 27,
    title: "Jotham orders his ways",
    setting:
      "Jotham ruled sixteen years in the mid eighth century BC, first as regent while his father Uzziah lived isolated with leprosy. He rebuilt the Upper Gate of the temple, worked on the wall at the Ophel hill, and fortified towns in the hill country. The Ammonites paid him tribute. His reign was also the time of Isaiah, Hosea and Micah, who saw how corrupt the people remained.",
    words: [
      { v: 6, s: 3559, note: "Kun, \"to establish\": Jotham \"ordered\" his ways before the LORD, making them firm and steady. His strength came from a settled pattern of life, not one dramatic act." },
    ],
  },
  {
    book: "2chronicles",
    chapter: 28,
    title: "Ahaz and the merciful captors",
    setting:
      "Ahaz reigned around 735 BC, when Aram and Israel attacked Judah, probably to force it into a coalition against Assyria (Isaiah 7). Judah suffered huge losses, and thousands were marched as captives to Samaria. Ahaz turned to Assyria for help, which cost him dearly, and to the gods of Damascus. He sacrificed his sons in the Valley of Hinnom and shut the doors of the temple.",
    words: [
      { v: 19, s: 4603, note: "Maal, \"to be unfaithful\": A word for breaking trust, used of adultery and of stealing what is holy. Chronicles uses it often, and Ahaz is its low point: \"most unfaithful.\"" },
      { v: 15, s: 3847, note: "Lavash, \"to clothe\": Northern leaders clothed, fed and anointed the captives and carried the weak on donkeys to Jericho. Many readers hear an echo in Jesus' parable of the Good Samaritan (Luke 10:30-37)." },
    ],
  },
  {
    book: "2chronicles",
    chapter: 29,
    title: "Hezekiah reopens the temple",
    setting:
      "Hezekiah came to the throne in the late eighth century BC (dates are debated), inheriting a temple his father Ahaz had shut. In the first month of his reign he opened its doors and set priests and Levites to cleanse it. Assyria had recently destroyed the northern kingdom, and Judah feared the same fate. Chronicles gives Hezekiah's reform more space than any king's since Solomon.",
    words: [
      { v: 5, s: 6942, note: "Qadash, \"to consecrate\": To set apart for God. Hezekiah asks the Levites to consecrate themselves first and then the house. Clean worshipers come before a clean building." },
      { v: 5, s: 5079, note: "Niddah, \"impurity\": A strong word for ritual uncleanness. The Levites spent sixteen days carrying it out of the temple and dumping it in the Kidron Valley." },
    ],
  },
  {
    book: "2chronicles",
    chapter: 30,
    title: "Hezekiah's great Passover",
    setting:
      "Passover had not been kept in large numbers as the law prescribed for a long time. Hezekiah sent couriers from Beersheba to Dan inviting Israel and Judah alike, including survivors of the northern kingdom that Assyria had recently crushed. Because priests and people were not ready in time, he used the law's provision for a Passover in the second month (Numbers 9:10-11). Many northerners mocked; some came.",
    words: [
      { v: 6, s: 7725, note: "Shuv, \"to return\": The letter plays on it: return to the LORD, and He will return to you; your captives will return to this land. Repentance is a homecoming." },
      { v: 9, s: 2587, note: "Channun, \"gracious\": Hezekiah quotes God's self-description from Exodus 34:6, gracious and compassionate. He invites people back on the strength of God's character." },
    ],
  },
  {
    book: "2chronicles",
    chapter: 31,
    title: "Gifts piled in heaps",
    setting:
      "After the Passover, worshipers went out and smashed idols and high places across Judah and Benjamin and into Ephraim and Manasseh. Hezekiah then reorganized the priests and Levites by divisions and restored the tithes that supported them. Gifts arrived from the grain harvest in the third month to the fruit harvest in the seventh, so many that storerooms were prepared in the temple.",
    words: [
      { v: 5, s: 4643, note: "Maaser, \"tithe\": A tenth of produce given to support the Levites, who had no land of their own (Numbers 18:21). It freed them to devote themselves to God's law." },
      { v: 5, s: 7225, note: "Reshit, \"first, beginning\": The firstfruits, the first of the crop given before the rest was gathered. Giving first declared that God owned all of it." },
    ],
  },
  {
    book: "2chronicles",
    chapter: 32,
    title: "Sennacherib and the angel",
    setting:
      "In 701 BC Sennacherib of Assyria swept through Judah, taking its fortified cities. His own records boast that he shut Hezekiah up in Jerusalem \"like a bird in a cage,\" but do not claim he took the city. Hezekiah blocked springs outside the walls and strengthened the defenses. A tunnel carrying water from the Gihon Spring, still walkable today, is widely linked with him.",
    words: [
      { v: 8, s: 2220, note: "Zeroa, \"arm\": \"With him is only an arm of flesh.\" The arm pictures strength. God's own outstretched arm had brought Israel out of Egypt (Deuteronomy 5:15)." },
      { v: 30, s: 5640, note: "Satam, \"to stop up\": Hezekiah stopped up the upper outlet of the Gihon and channeled the water inside the city. Trusting God did not rule out good engineering." },
    ],
  },
  {
    book: "2chronicles",
    chapter: 33,
    title: "Manasseh's evil and repentance",
    setting:
      "Manasseh reigned fifty-five years, longer than any king of Judah, in the seventh century BC when Assyria dominated the region. Assyrian records list him among the kings who paid tribute. He rebuilt pagan shrines, practiced sorcery and sacrificed his sons. Kings blames him for the exile (2 Kings 21; 24:3), but only Chronicles records his capture, prayer and return.",
    words: [
      { v: 12, s: 3665, note: "Kana, \"to humble oneself\": To bend low, be brought down. Chronicles uses it again and again for true repentance, and Manasseh did it \"earnestly.\"" },
      { v: 13, s: 6279, note: "Atar, \"to entreat\": God \"received his plea,\" letting Himself be entreated. The worst king in Judah's story found God willing to hear." },
    ],
  },
  {
    book: "2chronicles",
    chapter: 34,
    title: "Josiah finds the Book of the Law",
    setting:
      "Josiah became king at eight after his father Amon was assassinated, around 640 BC. As Assyria weakened, he began seeking God at about sixteen and purging idols at twenty, even in the old northern territory. In his eighteenth year, workers repairing the temple found the Book of the Law; many scholars think it was Deuteronomy or its core. Jeremiah and Zephaniah prophesied in his reign.",
    words: [
      { v: 14, s: 5612, note: "Sepher, \"scroll, document\": A written document, here a scroll rather than a bound book. Its words had been lost in plain sight inside God's own house." },
      { v: 3, s: 5288, note: "Naar, \"youth\": Josiah was \"still young\" when he began to seek God. The word can mean a boy or a young man; Jeremiah used it of himself at his call (Jeremiah 1:6)." },
    ],
  },
  {
    book: "2chronicles",
    chapter: 35,
    title: "Josiah's Passover and death",
    setting:
      "Josiah held a Passover greater than any since Samuel, giving thousands of animals from his own flocks. Years later, in 609 BC, Pharaoh Neco II marched north to support Assyria's last stand against Babylon at Carchemish on the Euphrates. Josiah blocked his path at Megiddo, a fortress guarding a key pass, and was killed by archers. Judah's independence effectively died with him.",
    words: [
      { v: 22, s: 2664, note: "Chaphas, \"to disguise\": Josiah disguised himself for battle, just as Ahab had before his death at Ramoth-gilead (18:29). Chronicles seems to draw the parallel on purpose." },
      { v: 25, s: 7015, note: "Qinah, \"lament, dirge\": A funeral song, often with a limping rhythm. Jeremiah composed laments for Josiah, and singers kept them for generations." },
    ],
  },
  {
    book: "2chronicles",
    chapter: 36,
    title: "Exile, and a decree to return",
    setting:
      "In about twenty-three years Judah had four kings: Jehoahaz, deposed by Egypt; Jehoiakim and Jehoiachin, both caught up in Babylon's advance; and Zedekiah, who broke his oath to Nebuchadnezzar. In 586 BC the Babylonians burned the temple and took survivors into exile. Around 538 BC, Cyrus of Persia, who had conquered Babylon, issued a decree inviting the Jews to return and rebuild.",
    words: [
      { v: 21, s: 7676, note: "Shabbat, \"Sabbath\": The land enjoyed its Sabbath rests. Israel had ignored the law's rest years (Leviticus 25:4), and Leviticus 26:34-35 warned the land would rest while they were gone." },
      { v: 23, s: 5927, note: "Alah, \"to go up\": \"Let him go up.\" In the Hebrew Bible's order, which ends with Chronicles, this is the last word: an open invitation home, waiting to be answered." },
    ],
  },
];
