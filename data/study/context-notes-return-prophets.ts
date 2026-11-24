/**
 * Setting cards (see context-notes.ts for the guardrails), drafted by Claude for Josh's review, Nov 2026.
 * Every Strong's number is checked against the bundled interlinear (tests/context-notes.test.ts).
 */

import type { ContextNote } from "./context-notes";

export const CONTEXT_NOTES_RETURN_PROPHETS: ContextNote[] = [
  {
    book: "ezra",
    chapter: 1,
    title: "Cyrus lets the exiles go home",
    setting:
      "Cyrus of Persia took Babylon in 539 BC and soon reversed Babylon's policy of deportation, letting conquered peoples return home and rebuild their shrines. His own Cyrus Cylinder describes this policy, though it does not mention the Jews. For Judah's exiles it meant that Jeremiah's seventy years were ending. Ezra and Nehemiah were one book in the Hebrew Bible, and this decree opens it, about 538 BC.",
    words: [
      { v: 1, s: 5782, note: "Ur, \"stirred\": to rouse or wake up. God stirs the spirit of a pagan emperor, and in verse 5 the same verb stirs ordinary families to pack up and go." },
      { v: 4, s: 7604, note: "Shaar, \"survivor\": one who remains. The prophets promised a remnant would return (Isaiah 10:20 to 22), and this small group is that remnant." },
    ],
  },
  {
    book: "ezra",
    chapter: 2,
    title: "The families who came home",
    setting:
      "This list records the families who returned from Babylon with Zerubbabel and Jeshua, probably in the first wave after 538 BC and perhaps including later arrivals. After exile, family records mattered: they proved a family's claim to its land and a priest's right to serve. Nehemiah 7 repeats the list with small differences in the numbers, likely from copying or from a census taken at another time.",
    words: [
      { v: 63, s: 8660, note: "Tirshatha, \"governor\": a Persian title, perhaps meaning \"His Excellency\". Judah now lives under a foreign empire's officials, not its own king." },
      { v: 64, s: 6951, note: "Qahal, \"assembly\": the gathered people of God. The same word describes Israel at Sinai, and the Greek Old Testament often renders it ekklesia, the New Testament word for church." },
    ],
  },
  {
    book: "ezra",
    chapter: 3,
    title: "An altar first, then a foundation",
    setting:
      "The returned exiles found Jerusalem in ruins and hostile neighbors all around. In the seventh month, the season of the Feast of Booths, they rebuilt the altar before anything else so that daily sacrifice could resume. Months later, probably around 536 BC, they laid the temple's foundation. Older men who remembered Solomon's temple, destroyed about fifty years earlier, wept at how small this one looked (Haggai 2:3).",
    words: [
      { v: 11, s: 2617, note: "Chesed, \"loving devotion\": God's loyal covenant love. Their song, \"He is good; His loving devotion endures forever\", is the refrain of Psalm 136, sung at the ruins of a city God had judged." },
      { v: 12, s: 1058, note: "Bakhah, \"wept\": weeping aloud. Grief and joy rise together so loudly that no one can tell the two sounds apart." },
    ],
  },
  {
    book: "ezra",
    chapter: 4,
    title: "Opposition from the neighbors",
    setting:
      "Peoples settled in the north by Assyria (2 Kings 17) offered to help build, and were refused; opposition followed for years. This chapter gathers examples by theme, not date: verses 6 to 23 jump ahead to Xerxes and Artaxerxes and to the later rebuilding of the walls, then verse 24 returns to the temple under Darius. At verse 8 the text switches from Hebrew to Aramaic, the empire's official language.",
    words: [
      { v: 4, s: 7503, note: "Raphah, \"discourage\": literally to let the hands drop. The opposition aimed to make the builders' hands go slack." },
      { v: 1, s: 6862, note: "Tsar, \"enemies\": from a root meaning narrow or tight. An adversary is one who hems you in." },
    ],
  },
  {
    book: "ezra",
    chapter: 5,
    title: "Prophets restart the work",
    setting:
      "After about sixteen years with no progress, the prophets Haggai and Zechariah urged the people to build again in 520 BC, the second year of Darius I (Haggai 1:1 to 4). Tattenai, the Persian governor of the province Beyond the River, came to ask who had authorized this. A Babylonian tablet from 502 BC names a governor of that province called Tattannu, probably the same man. This section is in Aramaic.",
    words: [
      { v: 5, s: 5870, note: "Ayin, \"eye\": God's eye was on the elders. The work went on while the paperwork traveled to Persia, because God was watching over His people." },
      { v: 1, s: 5013, note: "Neva, \"prophesied\": the Aramaic word for speaking as a prophet. The building restarts with a word from God, not a permit from the king." },
    ],
  },
  {
    book: "ezra",
    chapter: 6,
    title: "The temple is finished",
    setting:
      "Darius had the royal archives searched, and Cyrus's memo turned up at Ecbatana, the Persian kings' summer capital. Darius confirmed it and ordered the costs paid from royal taxes. The temple was finished in the month of Adar in his sixth year, early 515 BC, roughly seventy years after Solomon's temple was burned. Others who turned from pagan ways to seek the LORD joined the Passover too (verse 21).",
    words: [
      { v: 14, s: 6744, note: "Tselach, \"prospered\": to go forward and succeed. The elders built while the prophets kept speaking." },
      { v: 16, s: 2597, note: "Chanukkah, \"dedication\": the Aramaic form of the word later used for the Jewish festival that recalls the temple's rededication in 164 BC." },
    ],
  },
  {
    book: "ezra",
    chapter: 8,
    title: "A dangerous journey without soldiers",
    setting:
      "Ezra's group set out from Babylon around 458 BC on a journey of roughly 900 miles, carrying a large treasure of silver and gold for the temple. Roads were dangerous and bandits were common. Ezra had told the king that God protects those who seek Him, so he was embarrassed to ask for a military escort. Instead the travelers fasted by the Ahava Canal, then carefully weighed and handed over every item.",
    words: [
      { v: 22, s: 954, note: "Bush, \"ashamed\": embarrassed. Ezra's public words about God put his own credibility on the line." },
      { v: 21, s: 6685, note: "Tsom, \"fast\": going without food to seek God. For Israel, fasting showed dependence; it was not a technique to earn a safe trip." },
    ],
  },
  {
    book: "ezra",
    chapter: 9,
    title: "Ezra's prayer over unfaithfulness",
    setting:
      "About four months after Ezra arrived, leaders reported that many men, including priests and officials, had married women from the surrounding peoples. The list in verse 1 echoes Deuteronomy 7:1 to 4, where the danger was turning to other gods, as Solomon did (1 Kings 11:1 to 8). The issue was idolatry, not ancestry: Rahab and Ruth were welcomed into Israel when they came to trust Israel's God.",
    words: [
      { v: 2, s: 2233, note: "Zera, \"seed\": offspring or descendants. \"Holy seed\" recalls Isaiah 6:13. Israel was set apart for God, and leaders were blending that identity into the worship around them." },
      { v: 8, s: 3489, note: "Yated, \"stake\": a tent peg. God has given the remnant a small, firm foothold in His holy place, and Ezra fears they are about to pull it up." },
    ],
  },
  {
    book: "ezra",
    chapter: 10,
    title: "A painful covenant decision",
    setting:
      "In the ninth month, the cold rainy season, the people gathered in the open square, trembling over the matter and the downpour. They agreed to send away foreign wives and their children, a decision that took three months to carry out and left real families broken. The chapter is honest that some objected (verse 15). Christians read it as a crisis in its own time, not a pattern for marriage today (1 Corinthians 7:12 to 14).",
    words: [
      { v: 11, s: 914, note: "Badal, \"separate\": to divide or set apart, the word used in Genesis 1 for separating light from darkness. Israel's holiness was meant to be visible." },
      { v: 3, s: 1285, note: "Berit, \"covenant\": a binding agreement before God. Shecaniah proposes that the people renew their commitment by covenant, not just by feeling sorry." },
    ],
  },
  {
    book: "nehemiah",
    chapter: 1,
    title: "A cupbearer hears bad news",
    setting:
      "Nehemiah served King Artaxerxes I at Susa, one of Persia's royal capitals. In the month of Kislev in the king's twentieth year, late 446 BC by the usual dating, his brother brought news from Jerusalem: nearly a century after the first return, the city's walls still lay broken and its people lived in disgrace. Without walls a city could not protect itself or be taken seriously by its neighbors.",
    words: [
      { v: 11, s: 4945, note: "Mashqeh, \"cupbearer\": the officer who served the king's wine and guarded it from poison. It was a post of great trust and daily access to the king." },
      { v: 4, s: 56, note: "Aval, \"mourned\": to grieve as for the dead. Nehemiah mourns for days for a city he may never have seen." },
    ],
  },
  {
    book: "nehemiah",
    chapter: 2,
    title: "Permission from the king",
    setting:
      "Four months after hearing the news, in the month of Nisan around 445 BC, Nehemiah's sadness showed in front of the king, which was risky in a royal court. Artaxerxes granted him leave, letters of safe passage and timber from the royal forest. In Jerusalem he met resistance from Sanballat, governor of Samaria, Tobiah, an official in Ammon, and Geshem the Arab, leaders who did not want a strong Judah.",
    words: [
      { v: 17, s: 2781, note: "Cherpah, \"disgrace\": reproach or public shame. A broken wall was a daily insult to the people and to the God they worshiped." },
      { v: 18, s: 2388, note: "Chazaq, \"set their hands\": to strengthen or make firm. The people respond to Nehemiah's report by strengthening their hands for good work." },
    ],
  },
  {
    book: "nehemiah",
    chapter: 3,
    title: "Everyone takes a section",
    setting:
      "The wall was rebuilt in about forty sections, starting at the Sheep Gate near the temple and moving around the city. Priests, goldsmiths, perfumers, merchants, district rulers and even one man's daughters each took a stretch, often the part beside their own homes. Only the nobles of Tekoa held back. Archaeologists have uncovered stretches of wall in Jerusalem that some link to Nehemiah's work, though the dating is debated.",
    words: [
      { v: 5, s: 6677, note: "Tsavvar, \"shoulders\": the neck. The nobles of Tekoa would not bend their necks to the work, an image of pride taken from oxen refusing the yoke." },
      { v: 1, s: 6942, note: "Qadash, \"dedicated\": to make holy or set apart. The high priest begins by consecrating his gate, treating the wall as God's work and not just civil engineering." },
    ],
  },
  {
    book: "nehemiah",
    chapter: 4,
    title: "Building with a sword at hand",
    setting:
      "As the wall reached half its height, Sanballat and Tobiah moved from mockery to threats of attack. Nehemiah's builders were tired, the rubble was endless, and Jews from nearby towns kept warning of danger. So he armed the people, set guards by families, and had half work while half stood watch. Builders carried a load in one hand and a weapon in the other, and no one changed clothes at night.",
    words: [
      { v: 6, s: 3820, note: "Lev, \"mind\": the heart, the center of will and thought. The wall rose because the people had a heart to work." },
      { v: 17, s: 7973, note: "Shelach, \"weapon\": a spear or javelin. Faith and vigilance go together in this chapter: they prayed and set a guard (verse 9)." },
    ],
  },
  {
    book: "nehemiah",
    chapter: 5,
    title: "Injustice inside the walls",
    setting:
      "While the wall was going up, a crisis broke out among the Jews themselves. Famine, Persian taxes and high interest forced poor families to mortgage fields and sell children into debt servitude to wealthier Jews. The Law forbade charging interest to a fellow Israelite in need (Exodus 22:25; Deuteronomy 23:19). Nehemiah, governor for twelve years, confronted the nobles and also refused the food allowance his office allowed him.",
    words: [
      { v: 1, s: 6818, note: "Tsaaqah, \"outcry\": a cry for help, the same word used for Israel's cry in Egypt (Exodus 3:7). Now Israel's poor cry against their own people." },
      { v: 7, s: 4855, note: "Mashsha, \"usury\": lending at interest, or taking pledges on a loan. The rich were profiting from the desperation of their own neighbors." },
    ],
  },
  {
    book: "nehemiah",
    chapter: 6,
    title: "Plots against Nehemiah",
    setting:
      "With the wall nearly finished, the opposition turned to Nehemiah himself. Sanballat invited him to a meeting in the plain of Ono, probably to harm him. An open letter accused him of planning rebellion and kingship, a dangerous charge in the Persian empire. A hired prophet urged him to hide inside the temple, where only priests could go. Even so, the wall was finished in fifty-two days, in early autumn 445 BC.",
    words: [
      { v: 3, s: 4399, note: "Melakhah, \"work\": the ordinary word for a job or craft. Nehemiah calls the wall a great work and refuses to come down from it." },
      { v: 15, s: 7999, note: "Shalem, \"completed\": finished or made whole. It is related to shalom, wholeness. Fifty-two days of labor made the city whole again." },
    ],
  },
  {
    book: "nehemiah",
    chapter: 7,
    title: "A city with too few people",
    setting:
      "With the walls up, Nehemiah set gatekeepers, singers and Levites in place and put his brother Hanani and the faithful Hananiah over Jerusalem. The gates stayed shut until the sun was high. But the city was large and nearly empty, and few houses had been rebuilt. To plan its repopulation Nehemiah found the old register of the first returnees, the same list found in Ezra 2.",
    words: [
      { v: 2, s: 571, note: "Emet, \"faithful\": reliable, true. Hananiah was chosen not for connections but because he was a man of integrity who feared God." },
      { v: 5, s: 3187, note: "Yachas, \"enrolled by genealogy\": recorded in a family register. The community's identity was tied to its history with God." },
    ],
  },
  {
    book: "nehemiah",
    chapter: 9,
    title: "A nation confesses its history",
    setting:
      "On the twenty-fourth of the seventh month, after the Feast of Booths, the people gathered in sackcloth to fast and confess. The Levites led a long prayer that retells Israel's story from creation through Abraham, the exodus, Sinai, the wilderness, the land, the judges and the prophets, to exile. It ends with a sobering truth: even back in their own land, they are still servants of a foreign king.",
    words: [
      { v: 17, s: 5547, note: "Selichah, \"forgiving\": forgiveness. The prayer calls God literally a God of forgivenesses, the plural stressing how often and how fully He forgives." },
      { v: 38, s: 548, note: "Amanah, \"binding agreement\": a firm, written commitment, related to the word amen. Confession leads to a sealed promise." },
    ],
  },
  {
    book: "nehemiah",
    chapter: 10,
    title: "The people sign a covenant",
    setting:
      "Leaders, priests and Levites set their seals on a written agreement, and the rest of the people joined them with an oath. The commitments were specific: no marriages with those who worshiped other gods, no trading on the Sabbath, letting the land rest and cancelling debts in the seventh year, and supporting the temple with offerings, firstfruits and tithes. It was a community deciding how to live out the Law together.",
    words: [
      { v: 29, s: 423, note: "Alah, \"oath\": a sworn commitment with a curse attached if it is broken. They bound themselves to the Law with real seriousness." },
      { v: 39, s: 5800, note: "Azav, \"neglect\": to leave or forsake. The covenant ends with a promise not to abandon the house of their God." },
    ],
  },
  {
    book: "nehemiah",
    chapter: 11,
    title: "Moving into the holy city",
    setting:
      "Jerusalem's walls stood, but the city needed people. The leaders lived there already, and the rest of the people cast lots so that one family in ten would move in. Living in Jerusalem meant leaving family land, farms and villages for a vulnerable city on the frontier of hostile neighbors. The chapter lists those who settled in Jerusalem and in the surrounding towns of Judah and Benjamin.",
    words: [
      { v: 1, s: 1486, note: "Goral, \"lots\": stones or marked objects cast to reach a decision. Israel used lots believing that God directs the outcome (Proverbs 16:33)." },
      { v: 2, s: 5068, note: "Nadav, \"volunteered\": to offer willingly. The same root names the freewill offerings of Ezra. These people offered themselves." },
    ],
  },
  {
    book: "nehemiah",
    chapter: 12,
    title: "Dedicating the wall with joy",
    setting:
      "The chapter lists priests and Levites from the first return under Zerubbabel down to later generations, then describes the wall's dedication. Nehemiah formed two large choirs that marched atop the wall in opposite directions, with Ezra leading one and Nehemiah following the other, until they met at the temple. The music and joy of Jerusalem could be heard far away. Offerings for priests and Levites were organized afresh.",
    words: [
      { v: 27, s: 2598, note: "Chanukkah, \"dedication\": the Hebrew word later given to the festival of the temple's rededication. Here a wall, not a temple, is dedicated to God." },
      { v: 43, s: 8057, note: "Simchah, \"joy\": gladness that shows. God gave them great joy, and even the women and children rejoiced." },
    ],
  },
  {
    book: "nehemiah",
    chapter: 13,
    title: "Nehemiah's return and reforms",
    setting:
      "Nehemiah had gone back to Artaxerxes in the king's thirty-second year, about 433 BC. When he returned to Jerusalem some time later, he found the high priest had given Tobiah a room in the temple, Levites had gone unpaid, merchants traded on the Sabbath, and men had married women from Ashdod, Ammon and Moab, and half their children could not speak Hebrew. The book ends with his blunt and sometimes harsh reforms.",
    words: [
      { v: 14, s: 2142, note: "Zakhar, \"remember\": not just recall but act on behalf of someone. Nehemiah prays \"remember\" four times in this chapter." },
      { v: 24, s: 3066, note: "Yehudit, \"language of Judah\": Hebrew. Children who could not speak it could not understand the Scriptures read in the assembly." },
    ],
  },
  {
    book: "esther",
    chapter: 1,
    title: "A Persian king's banquet",
    setting:
      "Ahasuerus is the Hebrew form of the name the Greeks called Xerxes, who ruled Persia from 486 to 465 BC. His empire stretched from India to Cush, the upper Nile. The great feast in his third year, about 483 BC, may have been tied to planning his invasion of Greece. Susa's palace has been excavated, and its scale fits the book's descriptions. Queen Vashti's refusal sets the whole story in motion.",
    words: [
      { v: 8, s: 1881, note: "Dat, \"law\" or \"decree\": a Persian loanword that appears again and again in Esther. The empire runs on laws, and the plot will turn on one that cannot be revoked." },
      { v: 5, s: 4960, note: "Mishteh, \"feast\": a drinking banquet. Esther is a book of feasts: about twenty times the word appears, and key turns happen at the table." },
    ],
  },
  {
    book: "esther",
    chapter: 2,
    title: "Esther taken into the palace",
    setting:
      "Years later the king's officials gathered young women from across the empire into the royal harem at Susa. Women in this position had little or no choice, and those not chosen as queen likely stayed in the harem for life. Esther, an orphan raised by her cousin Mordecai, was taken in about 479 BC and hid her Jewish identity. Mordecai, a descendant of Kish from the tribe of Benjamin, served at the king's gate.",
    words: [
      { v: 7, s: 539, note: "Aman, \"brought up\": to support, nourish or be faithful. Mordecai raised Esther as his own daughter. The same root gives us amen." },
      { v: 17, s: 2617, note: "Chesed, \"favor\": often God's loyal love. Here it describes the kindness Esther won from the king, a quiet hint of a care the book never names." },
    ],
  },
  {
    book: "esther",
    chapter: 3,
    title: "Haman's plot against the Jews",
    setting:
      "Haman, called the Agagite, recalls Agag, king of the Amalekites, Israel's ancient enemy (Exodus 17:14 to 16; 1 Samuel 15). Mordecai, like King Saul, descends from Kish, so an old conflict returns. When Mordecai refused to bow, Haman sought to destroy all the Jews in the empire. He cast lots to pick the date, and the decree went out on the eve of Passover, the feast of deliverance.",
    words: [
      { v: 7, s: 6332, note: "Pur, \"lot\": a Babylonian word for the die used in casting lots. Haman lets chance choose the day of slaughter; the festival of Purim takes its name from it." },
      { v: 8, s: 6340, note: "Pazar, \"scattered\": dispersed. Haman's description is true: the Jews were spread through every province, which made them seem vulnerable and easy to target." },
    ],
  },
  {
    book: "esther",
    chapter: 5,
    title: "Esther goes in to the king",
    setting:
      "On the third day of the fast, Esther put on her royal robes and stood in the inner court, risking death by approaching the king unsummoned. Persian kings were shielded by strict court protocol. The king extended his golden scepter and offered her up to half the kingdom, a courtly way of promising great generosity. Rather than speak at once, Esther invited him and Haman to a banquet, then a second one.",
    words: [
      { v: 2, s: 2580, note: "Chen, \"favor\": grace or acceptance. Esther obtains favor in the king's sight, as she had in chapter 2." },
      { v: 14, s: 6086, note: "Ets, \"gallows\": literally a tree or wooden pole. Haman's fifty cubit pole, about 75 feet high, was likely for impaling or displaying a body, a Persian punishment." },
    ],
  },
  {
    book: "esther",
    chapter: 6,
    title: "A sleepless night changes everything",
    setting:
      "The night after Esther's first banquet, the king could not sleep and had the royal chronicles read to him. Persian kings were known for recording and rewarding those who served them well. He learned that Mordecai had once saved his life and had never been honored. At that very moment Haman arrived to ask for Mordecai's death. This chapter is the hinge of the book, where every turn begins to reverse.",
    words: [
      { v: 1, s: 5074, note: "Nadad, \"escaped\": to flee or wander. Sleep fled from the king; nothing in the text says why, and the book lets the reader wonder." },
      { v: 13, s: 5307, note: "Naphal, \"fall\": Haman's wife and advisers predict that he will surely fall before Mordecai. The verb is repeated for emphasis." },
    ],
  },
  {
    book: "esther",
    chapter: 7,
    title: "Haman's downfall",
    setting:
      "At the second banquet Esther finally revealed that she was Jewish and that she and her people had been sold for destruction. She named Haman as the enemy. The furious king stepped out into the garden, and Haman threw himself on Esther's couch to beg for his life, which the king took as an assault on the queen. A servant pointed to the pole Haman had built for Mordecai, and Haman died on it.",
    words: [
      { v: 4, s: 4376, note: "Makhar, \"sold\": Haman had offered ten thousand talents of silver for the right to destroy the Jews (3:9). Esther names it for what it was." },
      { v: 10, s: 7918, note: "Shakhakh, \"subsided\": calmed down, used of water receding after the flood (Genesis 8:1). The king's rage cools only after justice falls on Haman." },
    ],
  },
  {
    book: "esther",
    chapter: 8,
    title: "A second decree",
    setting:
      "Haman was dead, but his decree still stood, because Persian law could not be revoked (compare Daniel 6:8). The king gave Mordecai his signet ring and let him write a second decree in the king's name. It allowed Jews in every province to gather and defend themselves against anyone who attacked them on the appointed day. Couriers on royal horses carried it across the empire's famous road system.",
    words: [
      { v: 17, s: 3054, note: "Yahad, \"became Jews\": a rare verb used only here in the Bible. Many people professed to be Jews or sided with them because fear of the Jews had fallen on them." },
      { v: 6, s: 3201, note: "Yakhol, \"bear\": to be able. Esther cannot stand by and watch the destruction of her people and family." },
    ],
  },
  {
    book: "esther",
    chapter: 9,
    title: "The day turned upside down",
    setting:
      "On the thirteenth of Adar, the day set for the Jews' destruction, they defended themselves against those who attacked them, aided by officials who feared Mordecai. The violence is recorded soberly: tens of thousands of enemies died. Three times the text notes that the Jews took no plunder, unlike Saul at the war with Amalek (1 Samuel 15). Mordecai and Esther then set the annual feast of Purim to remember the rescue.",
    words: [
      { v: 1, s: 2015, note: "Haphakh, \"overturned\": reversed. The day planned for the Jews' ruin was turned upside down. Reversal is the shape of the whole book." },
      { v: 10, s: 961, note: "Bizzah, \"plunder\": spoil taken in war. Refusing it showed the Jews fought for their lives, not for profit." },
    ],
  },
  {
    book: "esther",
    chapter: 10,
    title: "Mordecai's greatness",
    setting:
      "The book closes with a short note about the king's power and Mordecai's position as second in the empire, recorded in the official chronicles of the kings of Media and Persia. Those annals have not survived, and many details in Esther are not found in Greek sources. Some scholars read Esther as straightforward history, others as history told with literary shaping. Its picture of the Persian court fits what is known.",
    words: [
      { v: 3, s: 1875, note: "Darash, \"seeking\": to seek or inquire. Mordecai sought the good of his people, using power for others rather than himself." },
      { v: 3, s: 7965, note: "Shalom, \"peace\" or \"welfare\": wholeness. Mordecai spoke for the peace of all his descendants, a quiet ending for a book that began with a decree of death." },
    ],
  },
  {
    book: "songofsongs",
    chapter: 1,
    title: "A love song begins",
    setting:
      "The Hebrew title, \"Song of Songs,\" means the finest song. It is linked to Solomon (about 950 BC), who wrote over a thousand songs (1 Kings 4:32), though the heading can also mean \"for\" or \"about\" Solomon, and many scholars date the poems later. The book is a set of love poems sung by a young woman, her beloved, and a chorus called the daughters of Jerusalem. It opens with her longing for him.",
    words: [
      { v: 2, s: 1730, note: "Dod, \"love\": Plural here, dodim: caresses, the physical side of love. The Song speaks openly and gladly about married desire as God's good gift." },
      { v: 5, s: 7838, note: "Shachor, \"dark\": Her skin is tanned from working outdoors in her brothers' vineyards (v. 6). Pale skin marked a woman of leisure, yet she owns her looks without shame." },
    ],
  },
  {
    book: "songofsongs",
    chapter: 2,
    title: "The time of singing has come",
    setting:
      "Chapter 2 moves between a banquet hall and the countryside in spring. In Israel the winter rains end around March, and the hills fill with wildflowers, ripening figs and blossoming vines, a picture of love coming into full bloom. Three times the Song repeats a charge to the daughters of Jerusalem (2:7, 3:5, 8:4): do not stir up love before its time. The young woman herself gives this warning.",
    words: [
      { v: 4, s: 1714, note: "Degel, \"standard\": A military banner that marked a unit and rallied its soldiers. His love over her is public, plain for everyone to see." },
      { v: 7, s: 5782, note: "Ur, \"to rouse\": Do not awaken love until it pleases. Desire is powerful and good, and it is meant to wait for its right time." },
    ],
  },
  {
    book: "songofsongs",
    chapter: 3,
    title: "Searching and a royal wedding",
    setting:
      "The chapter has two scenes. First the young woman searches the city at night for the one she loves, a scene many read as a dream that voices the ache of separation. Then a cloud of dust rises from the wilderness: King Solomon's wedding procession, his carried couch guarded by sixty warriors. Ancient weddings were public festivals lasting days, and Solomon wears a crown his mother gave him for the occasion.",
    words: [
      { v: 1, s: 1245, note: "Baqash, \"to seek\": Repeated in verses 1 and 2. She seeks and does not find, and her longing drives the whole scene." },
      { v: 11, s: 2861, note: "Chatunnah, \"marriage\": Found only here in the Old Testament. It places the Song's love inside a wedding, celebrated with family and community." },
    ],
  },
  {
    book: "songofsongs",
    chapter: 4,
    title: "You are altogether beautiful",
    setting:
      "Here the groom praises his bride from head to toe in a kind of poem known from Arabic love songs as a wasf, a descriptive song of praise. The images come from Israel's land and life: goats streaming down Mount Gilead, newly washed sheep, the tower of David, gazelles, Lebanon's peaks. To ancient ears these spoke of beauty, worth and delight. Many read the chapter as the wedding night that follows chapter 3.",
    words: [
      { v: 7, s: 3971, note: "Mum, \"blemish\": The same word is used for flaws that disqualified a sacrifice. To her husband's loving eyes she has none." },
      { v: 12, s: 5274, note: "Naal, \"to lock\": A locked garden and a sealed spring were private, guarded places. The image honors her faithfulness and his privilege of exclusive welcome." },
    ],
  },
  {
    book: "songofsongs",
    chapter: 5,
    title: "My beloved and my friend",
    setting:
      "The chapter opens as the groom enters his garden, the poem's tasteful close to the wedding night, and a voice blesses the couple. Then comes a new scene, often read as a dream: he knocks at night, she hesitates, and when she opens he is gone. Watchmen mistreat her as she searches. Asked what makes him special, she answers with her own head to toe praise, the only such poem about a man in the Song.",
    words: [
      { v: 1, s: 3618, note: "Kallah, \"bride\": He calls her \"my sister, my bride,\" joining family closeness to marriage. The word appears six times in chapters 4 and 5." },
      { v: 16, s: 7453, note: "Rea, \"friend\": She ends her praise not with his looks but with friendship. In the Song, romance and companionship belong together." },
    ],
  },
  {
    book: "songofsongs",
    chapter: 6,
    title: "My beloved is mine",
    setting:
      "The daughters of Jerusalem ask where her beloved has gone, and she answers that he is in his garden: they belong to each other. He praises her again, comparing her to Tirzah, an early capital of the northern kingdom, and to Jerusalem. Kings of that world kept many queens and concubines, yet to him she alone is unique. The chapter ends as the chorus calls to her as \"the Shulammite.\"",
    words: [
      { v: 4, s: 366, note: "Ayom, \"terrible\": Awe inspiring, like an army with banners. Her beauty does not just please him; it overwhelms him." },
      { v: 9, s: 8535, note: "Tam, \"complete\": \"My perfect one,\" whole and unblemished. The same word describes blameless Job (Job 1:1)." },
    ],
  },
  {
    book: "songofsongs",
    chapter: 7,
    title: "I belong to my beloved",
    setting:
      "Chapter 7 opens with a third praise poem, this time moving upward from her feet, perhaps as she dances before wedding guests. The place names, Heshbon, Damascus, Carmel, span the whole land, as if all its beauty were gathered in her. Then she invites him out to the fields and vineyards in spring. The language is warm and frank, the delight of a married couple, set among the gardens and harvests of Israel.",
    words: [
      { v: 10, s: 8669, note: "Teshuqah, \"desire\": A rare word. In Genesis 3:16 desire comes under the strain of the curse; here his desire is freely for her, a picture of love restored." },
      { v: 13, s: 1736, note: "Duday, \"mandrake\": A plant believed in the ancient world to stir love and help conception (Genesis 30:14 to 16). Its fragrance fits her springtime invitation." },
    ],
  },
  {
    book: "lamentations",
    chapter: 1,
    title: "How lonely sits the city",
    setting:
      "Lamentations mourns Jerusalem's fall to Babylon in 586 BC, after a long siege that ended with the temple burned and the people led into exile. The book names no author; ancient tradition credits Jeremiah, who lived through the fall and wrote laments (2 Chronicles 35:25). Chapter 1 is an acrostic of 22 verses, each starting with the next letter of the Hebrew alphabet, as if grief were spoken from A to Z.",
    words: [
      { v: 1, s: 349, note: "Eikhah, \"how\": The book's Hebrew title. It is the cry that opened a funeral song, \"How!\", grief too deep for a full sentence." },
      { v: 2, s: 5162, note: "Nacham, \"to comfort\": \"No one to comfort her\" echoes five times in this chapter (vv. 2, 9, 16, 17, 21). The city's loneliness is the heart of its pain." },
    ],
  },
  {
    book: "lamentations",
    chapter: 2,
    title: "The Lord's anger on Zion",
    setting:
      "Chapter 2 is another 22 verse acrostic, and it looks straight at God's hand in the disaster. The temple, which many believed God would never let fall (Jeremiah 7:4), lies broken; walls, gates, king and priests are gone. Babylon's armies did the work, yet the poet sees the LORD behind it, keeping the covenant warnings of Deuteronomy 28. Children fainting in the streets bring the grief to its sharpest point.",
    words: [
      { v: 5, s: 1104, note: "Bala, \"to swallow up\": Used five times in this chapter. God has swallowed Israel's palaces and strongholds like a devouring beast." },
      { v: 19, s: 8210, note: "Shaphakh, \"to pour\": Pour out your heart like water before the Lord. Grief is not hidden from God but poured out in front of Him." },
    ],
  },
  {
    book: "lamentations",
    chapter: 4,
    title: "Gold grown dim",
    setting:
      "Chapter 4 is a shorter acrostic, two lines for each letter, and reads like a set of before and after pictures. Jerusalem's children were once worth their weight in gold; now they beg for bread. Nobles who wore purple lie on ash heaps. The siege dragged on for about a year and a half (2 Kings 25:1 to 3) while Judah waited in vain for Egypt's army to rescue it (Jeremiah 37:5 to 7).",
    words: [
      { v: 1, s: 6004, note: "Amam, \"to darken\": Gold that should never tarnish has grown dim. The image captures Zion's lost glory and her people's lost dignity." },
      { v: 20, s: 4899, note: "Mashiach, \"anointed\": Here King Zedekiah, \"the breath of our nostrils,\" caught as he fled (2 Kings 25:4 to 7). Israel's hope in a human king had failed." },
    ],
  },
  {
    book: "lamentations",
    chapter: 5,
    title: "Remember us, O LORD",
    setting:
      "The last chapter is a community prayer. It has 22 verses, like the alphabet, but it is not an acrostic. Survivors in a ruined, occupied land describe their life: buying their own water and firewood, working under foreign masters, women violated, elders silenced, young men forced to grind grain. The poem turns from describing to pleading, asking God to see, remember and restore.",
    words: [
      { v: 1, s: 2142, note: "Zakhar, \"to remember\": When God remembers in Scripture, He acts for His people, as He did for Noah (Genesis 8:1)." },
      { v: 21, s: 2318, note: "Chadash, \"to renew\": Renew our days as of old. They ask not for something novel but for the old relationship made fresh." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 1,
    title: "The throne chariot by the river",
    setting:
      "Ezekiel was a priest taken to Babylon in 597 BC with King Jehoiachin and about ten thousand of Jerusalem's leading people. Five years later, in 593 BC, he was among exiles living by the Kebar, probably an irrigation canal near the city of Nippur. Many think \"the thirtieth year\" is his age, when a priest would have begun serving at the temple he could no longer reach. Instead, God came to him in Babylon.",
    words: [
      { v: 28, s: 3519, note: "Kavod, \"glory\": From a root meaning \"heavy\" or \"weighty.\" God's glory is His felt, overwhelming presence. It fills the tabernacle in Exodus 40 and here appears far from Jerusalem, among exiles." },
      { v: 26, s: 1823, note: "Demut, \"likeness\": Ezekiel keeps saying \"the likeness of\" and \"the appearance of.\" He is careful never to claim he saw God directly, only something like Him." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 2,
    title: "Sent to a rebellious house",
    setting:
      "The exiles in Babylon still hoped they would be home soon and that Jerusalem could not fall. False prophets told them so. God sends Ezekiel to these same people, warning in advance that they will not listen. His job is faithfulness, not results: \"whether they listen or refuse,\" they will know a prophet has been among them. Ezekiel speaks to them for more than twenty years.",
    words: [
      { v: 1, s: 120, note: "Adam, \"man\" or \"mankind\": God calls Ezekiel ben adam, \"son of man,\" more than ninety times in the book. It stresses that he is a mere human before God's glory. Jesus later took \"Son of Man\" as His favorite title, drawing on Daniel 7:13." },
      { v: 3, s: 4775, note: "Marad, \"rebel\": The word for a vassal breaking faith with his overlord. Israel has not just slipped up; it has revolted against its covenant King." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 3,
    title: "The watchman's charge",
    setting:
      "Ezekiel sits stunned for seven days among the exiles at Tel Abib, a settlement by the Kebar canal. Then God gives him a role every ancient city knew: the watchman on the wall who scanned the horizon and blew the trumpet when danger approached. If he warned, the people were responsible for their response. If he stayed silent, their blood was on him. God repeats the charge in chapter 33.",
    words: [
      { v: 17, s: 6822, note: "Tsaphah, \"watch\": The watchman (tsopheh) is one who looks out and keeps watch. Ezekiel's task is not to save the city, but to see the danger and sound the warning." },
      { v: 17, s: 2094, note: "Zahar, \"warn\": Its basic sense is \"to shine\" or \"make clear.\" A true warning brings danger into the light so people can see it for themselves." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 4,
    title: "Acting out the siege",
    setting:
      "In about 593 BC Jerusalem still stood, and the exiles expected it to stand. God has Ezekiel act out its coming siege in public: a model city drawn on a clay brick, a long time lying on each side, and starvation rations of mixed grain baked over dung fuel. Prophets often used such sign acts, like Isaiah walking barefoot (Isaiah 20) or Jeremiah wearing a yoke (Jeremiah 27). Here Ezekiel becomes the message.",
    words: [
      { v: 4, s: 5771, note: "Avon, \"iniquity\": It can mean the sin, its guilt or its punishment. Ezekiel lying on his side \"bears\" Israel's avon, acting out the years of judgment their sin has earned." },
      { v: 12, s: 1561, note: "Gelel, \"dung\": Ezekiel is told to bake his bread over human dung, a sign that Israel will eat unclean food in exile. The priest protests, and God allows cow dung, a common fuel, instead." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 5,
    title: "The shaved head and the three thirds",
    setting:
      "Shaving was a sign of mourning, disgrace or defeat, and priests were forbidden to shave their heads in grief (Leviticus 21:5). Ezekiel, a priest, shaves his head and beard with a sword, then divides the hair into thirds for fire, sword and wind. The sign spells out what Babylon's siege of Jerusalem in 588 to 586 BC would bring: plague and famine, death in battle, and scattering among the nations.",
    words: [
      { v: 13, s: 7068, note: "Qinah, \"jealousy\" or \"zeal\": God's covenant jealousy, the anger of a faithful husband betrayed, not petty envy. It is love that refuses to share its beloved with idols." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 6,
    title: "Against the mountains of Israel",
    setting:
      "Ezekiel turns from Jerusalem to the countryside. On Israel's hills stood bamot, \"high places\": open air shrines with altars, incense stands and sacred poles, many dedicated to Canaanite gods like Baal and Asherah. King Josiah had torn many down around 622 BC (2 Kings 23), but they returned after his death. Ezekiel addresses the mountains themselves, the very land where the idols stood.",
    words: [
      { v: 4, s: 1544, note: "Gillul, \"idol\": Ezekiel's favorite word for idols, used nearly forty times. It probably plays on gel, \"dung,\" something like \"dung gods,\" a deliberate insult to what Israel worshiped." },
      { v: 7, s: 3045, note: "Yada, \"know\": \"You will know that I am the LORD\" appears over sixty times in Ezekiel. The goal of both judgment and restoration is that people truly know who God is." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 7,
    title: "The end has come",
    setting:
      "This chapter reads like a poem of alarm, its short phrases piling up like a trumpet blast. It was given in the years before 586 BC, when Judah's leaders were still trading, plotting alliances and assuming life would go on. Ezekiel announces that the end is not coming someday; it has arrived. Buying and selling, silver and gold, visions and counsel will all fail in the day of the LORD's wrath.",
    words: [
      { v: 2, s: 7093, note: "Qets, \"end\": Repeated five times in verses 2 to 6. Amos used the same word for Israel's northern kingdom (Amos 8:2); now it falls on Judah." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 8,
    title: "Idols in the temple courts",
    setting:
      "In September 592 BC, Judah's elders in exile were sitting in Ezekiel's house when he was carried in a vision to Jerusalem's temple. There he is shown four scenes, each worse than the last: an idol at the north gate, elders burning incense to animal images, women weeping for the god Tammuz and men bowing to the sun with their backs to the sanctuary. This is the worship of the city's leaders, not just the poor.",
    words: [
      { v: 3, s: 5566, note: "Semel, \"idol\" or \"image\": A carved statue, perhaps of the goddess Asherah, like the one King Manasseh once put in the temple (2 Chronicles 33:7). It stood where every worshiper would pass." },
      { v: 14, s: 8542, note: "Tammuz, a Mesopotamian god of shepherds and fertility (Sumerian Dumuzi). Women mourned his yearly death in summer, when crops withered. A month in the Jewish calendar still bears his name." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 9,
    title: "The mark on the forehead",
    setting:
      "The vision of chapter 8 continues inside the temple. Six executioners come from the north gate, the direction from which Babylon's armies would come, and a man dressed in linen, the clothing of priests, carries a scribe's writing kit at his side. Before judgment falls, he is sent through Jerusalem to mark everyone who grieves over its sins. Only then may judgment begin, in a vision meant to unsettle exiles who still trusted the temple to protect Jerusalem.",
    words: [
      { v: 4, s: 8420, note: "Tav, \"mark\": Also the name of the last letter of the Hebrew alphabet, which in Ezekiel's day was written like an X or a cross. Revelation 7:3 echoes this sealing of God's servants on their foreheads." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 10,
    title: "The glory moves to the door",
    setting:
      "Ezekiel, a priest, now sees the unthinkable. The same throne chariot he saw by the Kebar canal appears inside Jerusalem's temple, and he realizes the living creatures are cherubim, like the golden ones over the ark. The glory of the LORD rises from the Most Holy Place, pauses at the threshold and then moves to the east gate. God is preparing to leave the house built for His name.",
    words: [
      { v: 1, s: 3742, note: "Keruv, \"cherub\": Not the chubby babies of later art but awesome throne guardians. Cherubim guarded Eden (Genesis 3:24) and were woven into the temple curtains and carved over the ark." },
      { v: 18, s: 3318, note: "Yatsa, \"go out\" or \"depart\": A plain word for a terrible moment. The glory that came into Solomon's temple (1 Kings 8:10 to 11) now goes out of it." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 11,
    title: "A new heart and a departing glory",
    setting:
      "The vision of chapters 8 to 11 ends here. Jerusalem's remaining leaders boasted that they were the choice meat safe in the pot, while the exiles in Babylon were the scraps God had thrown away. They even claimed the land now belonged to them. God reverses it: the exiles are the ones He will gather and renew. Then His glory leaves the city and stops on the mountain to the east, the Mount of Olives.",
    words: [
      { v: 19, s: 3820, note: "Lev, \"heart\": In Hebrew the heart is the center of thinking, choosing and loving, not only feelings. God promises an undivided heart of flesh instead of a heart of stone (repeated in 36:26)." },
      { v: 16, s: 4720, note: "Miqdash, \"sanctuary\": Cut off from the temple, the exiles hear that God Himself will be their sanctuary \"for a little while.\" His presence goes into exile with them." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 12,
    title: "Packing for exile",
    setting:
      "By about 592 BC, King Zedekiah was ruling Jerusalem as Babylon's puppet and quietly planning revolt. Ezekiel packs an exile's bag in daylight, digs through a wall at dusk and leaves with his face covered. In 586 BC Zedekiah fled by night through a breach in the wall, was captured, had his eyes put out and was taken to Babylon, a city he would never see (2 Kings 25:4 to 7).",
    words: [
      { v: 6, s: 4159, note: "Mophet, \"sign\" or \"portent\": The word used for the wonders in Egypt. Now the prophet himself is the portent, a living picture of what is coming." },
      { v: 22, s: 4912, note: "Mashal, \"proverb\": A popular saying. People repeated, \"The days go by and every vision fails.\" God answers that the delay is over." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 13,
    title: "Prophets who whitewash walls",
    setting:
      "Alongside Ezekiel and Jeremiah, many prophets in Jerusalem and Babylon promised peace and a quick return home (Jeremiah 28 to 29). Ezekiel compares them to jackals among ruins and to workers who slap whitewash on a flimsy wall. He also confronts women who claimed to see visions, using magic bands and veils, a form of divination common in Mesopotamia, to sell people their fate for handfuls of barley.",
    words: [
      { v: 10, s: 7965, note: "Shalom, \"peace\": Not just the absence of war but wholeness and wellbeing. The false prophets promised shalom while sin went unaddressed; Jeremiah 6:14 says the same." },
      { v: 5, s: 6556, note: "Perets, \"breach\": A gap in a city wall. True prophets go up into the breach to repair it before the attack; the false ones never did." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 14,
    title: "Idols in the heart",
    setting:
      "Some of the exiles' elders come to Ezekiel to ask for a word from God, but God tells the prophet they have set up idols in their hearts. They want guidance without surrender. God then speaks of a land so corrupt that even Noah, Daniel and Job, three famous righteous men, could save only themselves. Jeremiah heard a similar word about Moses and Samuel (Jeremiah 15:1).",
    words: [
      { v: 3, s: 4383, note: "Mikhshol, \"stumbling block\": The same word as 7:19. Their idols are not only sins but obstacles they have deliberately placed in their own path." },
      { v: 14, s: 1840, note: "Daniyyel, \"Daniel\": Many think this is Ezekiel's contemporary, already famous in Babylon. Others note the Hebrew spelling and suggest Danel, a righteous ancient king in Canaanite stories. Views differ." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 15,
    title: "A useless vine",
    setting:
      "Israel often pictured itself as God's vine (Psalm 80:8 to 16; Isaiah 5). Grapevines were prized for their fruit, but their wood was crooked and soft, useless for building or even for a peg to hang things on. This short parable takes Israel's favorite self image and asks what a vine is good for when it bears no fruit. Burned at both ends with its middle charred, it is good for nothing.",
    words: [
      { v: 2, s: 6086, note: "Ets, \"wood\" or \"tree\": Ezekiel compares vine wood with the wood of forest trees. A vine has one purpose, fruit, and without it the wood is worth less than any other tree." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 16,
    title: "The foundling who became a queen",
    setting:
      "This long allegory tells Israel's history as the story of an abandoned baby girl. Exposing unwanted infants in open fields was a known practice in the ancient world. God rescues her, raises her and makes her His bride, but she trusts in foreign gods and political alliances instead. The imagery is frank because covenant betrayal is serious; it is about a nation, not a model for how men should treat women.",
    words: [
      { v: 6, s: 2421, note: "Chayah, \"live\": God's first word to the helpless infant lying in her blood is \"Live!\", said twice. Everything she later had began with that unearned word of life." },
      { v: 60, s: 1285, note: "Berit, \"covenant\": Despite her betrayal, God promises to remember His covenant and establish an everlasting one. The chapter ends not with her faithfulness but with His." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 17,
    title: "Two eagles and a cedar",
    setting:
      "In 597 BC Nebuchadnezzar, the first great eagle, took King Jehoiachin, the top of the cedar, to Babylon and set up Zedekiah under a binding oath. Zedekiah then turned to Egypt, the second eagle, for help in a revolt, breaking an oath sworn in God's name (2 Chronicles 36:13). Ezekiel tells it as a riddle, then explains it, then adds a surprising promise of a new shoot from David's line.",
    words: [
      { v: 2, s: 2420, note: "Chidah, \"riddle\": A puzzling saying meant to make hearers think. The same word describes the hard questions the queen of Sheba brought to Solomon (1 Kings 10:1)." },
      { v: 22, s: 7390, note: "Rakh, \"tender\": God Himself will plant a tender shoot on a high mountain. Isaiah 11:1 and 53:2 use similar images of a fragile shoot for the coming Messiah." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 18,
    title: "The soul who sins",
    setting:
      "The exiles had a saying: \"The fathers have eaten sour grapes, and the children's teeth are set on edge.\" They believed they were suffering only for their ancestors' sins, so nothing they did now mattered. Jeremiah quoted the same proverb (Jeremiah 31:29 to 30). Ezekiel answers with a case study of three generations to show that each person stands before God for their own choices.",
    words: [
      { v: 4, s: 5315, note: "Nephesh, \"soul\" or \"person\": Not a ghost inside a body but the whole living person. \"The soul who sins is the one who will die\" means each individual is accountable." },
      { v: 23, s: 2654, note: "Chaphets, \"take pleasure in\" or \"delight in\": God asks, \"Do I take any pleasure in the death of the wicked?\" His delight is in repentance and life." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 19,
    title: "A lament for Judah's princes",
    setting:
      "This is a qinah, a funeral song, sung for Judah's royal house while some of its kings were still alive. The lioness is probably the nation or the queen mother Hamutal. One cub, Jehoahaz, was taken to Egypt in 609 BC; the second is likely Jehoiachin, taken to Babylon in 597, though some think Zedekiah. The song moves to a vine, Judah, uprooted and burned. Its sad conclusion is that no strong branch is left to rule.",
    words: [
      { v: 1, s: 7015, note: "Qinah, \"lament\": A formal mourning poem, often with a limping rhythm of three beats followed by two. Singing it over living kings declared that the dynasty was as good as dead." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 20,
    title: "A history of rebellion",
    setting:
      "In August 591 BC, elders again came to ask Ezekiel for a word from God. Instead of an answer, God gives a survey of Israel's history: idolatry in Egypt, rebellion in the wilderness and in the land, and now the same in their generation. The pattern is repeated: Israel rebelled, God considered destroying them, and He held back for the sake of His name. The chapter ends with a promise of a new exodus.",
    words: [
      { v: 9, s: 8034, note: "Shem, \"name\": God's name is His revealed character and reputation. He acts \"for the sake of My name\" so it would not be profaned among the nations, which is the key refrain of the chapter." },
      { v: 37, s: 4562, note: "Masoret, \"bond\": The bond of the covenant. Shepherds counted sheep by making them pass under a rod (Leviticus 27:32); God will count His people one by one and bring them back into covenant." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 21,
    title: "The sword of the LORD",
    setting:
      "Around 589 BC Zedekiah rebelled against Babylon, probably counting on Ammon and Egypt. Ezekiel pictures Nebuchadnezzar at a fork in the road, deciding whether to attack Rabbah of Ammon or Jerusalem first. He consults omens the Babylonian way: shaking arrows, asking household idols and reading the liver of a sacrificed animal. The lot falls on Jerusalem. Behind a pagan king's ritual, God is directing the sword.",
    words: [
      { v: 9, s: 2719, note: "Cherev, \"sword\": The word rings through the chapter's sword song. It is polished, sharpened and handed to the slayer, and it is the LORD's own sword." },
      { v: 27, s: 4941, note: "Mishpat, \"judgment\" or \"justice\": The crown is overturned \"until He comes to whom it rightfully belongs.\" Many see an echo of Genesis 49:10 and a promise of the Messiah." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 22,
    title: "The city of bloodshed",
    setting:
      "Written shortly before Babylon's final siege, this chapter is God's indictment of Jerusalem. It lists violence, contempt for parents, oppression of foreigners, widows and orphans, bribery, sexual sin and Sabbath breaking. Then it names who is responsible: princes, priests, officials, prophets and ordinary people alike. Every level of society has failed, and God searches for anyone who will stand in the gap.",
    words: [
      { v: 30, s: 6556, note: "Perets, \"breach\" or \"gap\": A hole in a city's wall. God looked for one person to stand in it and plead for the land. Moses did this after the golden calf (Psalm 106:23)." },
      { v: 18, s: 5509, note: "Sig, \"dross\": The scum skimmed off when silver is refined. Israel, meant to be silver, has become waste metal fit only for the furnace." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 23,
    title: "Two sisters",
    setting:
      "Like chapter 16, this is a frank allegory of covenant unfaithfulness, here told as the story of two sisters. Oholah stands for Samaria, the northern kingdom, which turned to Assyria and fell in 722 BC. Oholibah stands for Jerusalem, which watched and did worse, courting Assyria, then Babylon, then Egypt. The imagery depicts political alliances and idolatry; it pictures a nation, not a pattern for treating women.",
    words: [
      { v: 4, s: 170, note: "Oholah, \"her tent\": Samaria made her own place of worship, rejecting God's chosen sanctuary." },
      { v: 4, s: 172, note: "Oholibah, \"My tent is in her\": Jerusalem had God's own temple, which made her betrayal even greater." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 24,
    title: "The pot and the prophet's grief",
    setting:
      "On January 15, 588 BC, Babylon began its final siege of Jerusalem (2 Kings 25:1). Hundreds of miles away, God tells Ezekiel to write the date down. That same day God tells him his wife, the delight of his eyes, will die, and he must not observe the usual public mourning customs. Her death becomes a sign: Jerusalem's temple, the people's delight, will fall, and their grief will be beyond rituals.",
    words: [
      { v: 16, s: 4261, note: "Machmad, \"delight\" or \"desire\": The same word is used of the temple in verse 21. Ezekiel's wife was not a symbol to him; she was the delight of his eyes." },
      { v: 17, s: 602, note: "Anaq, \"groan\": God tells Ezekiel to groan quietly. He forbids public rituals of mourning, not grief itself." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 25,
    title: "Gloating neighbors",
    setting:
      "Ezekiel spoke from exile in Babylon around 587 to 586 BC, as Jerusalem was falling. Chapters 25 to 32 turn to the nations around Judah. Ammon, Moab, Edom and Philistia were small neighbors with long histories of border wars against Israel. When Babylon crushed Jerusalem, they cheered, mocked and grabbed land. God answers each one: Judah's fall did not mean Judah's God had lost.",
    words: [
      { v: 3, s: 1889, note: "Heach, \"Aha!\": A sound of gloating glee. Ammon's whole crime is summed up in one smug syllable over a burning sanctuary." },
      { v: 17, s: 5360, note: "Neqamah, \"vengeance\": Philistia and Edom took revenge on their own terms. God says vengeance belongs to Him, echoing Deuteronomy 32:35." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 26,
    title: "The fall of proud Tyre",
    setting:
      "Tyre was the great Phoenician sea power, with an old mainland town and a fortified island city about half a mile offshore. Its ships carried goods across the Mediterranean. This oracle is dated to the year Jerusalem fell, about 586 BC, when Tyre saw a rival's ruin as a business opportunity. Nebuchadnezzar soon besieged Tyre, reportedly for thirteen years, and Alexander the Great later took the island in 332 BC.",
    words: [
      { v: 4, s: 6706, note: "Tsechiach, \"bare\": Scraped clean and exposed to the sun. Tyre's name means \"rock\", and God will leave it only bare rock." },
      { v: 21, s: 1091, note: "Ballahah, \"terror\": A word for sudden dread. It closes chapters 26, 27 and 28 like a refrain over Tyre's end." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 27,
    title: "A lament for the great ship",
    setting:
      "Ezekiel sings a funeral song, a qinah, for Tyre while it still stands. He pictures the city as a splendid merchant ship built from the best materials of the known world: cedar from Lebanon, oak from Bashan, linen from Egypt. A long list of trading partners, from Tarshish in the west to Arabia and Mesopotamia, shows how far Tyre's commerce reached. Then the ship sinks in the heart of the sea.",
    words: [
      { v: 3, s: 3308, note: "Yophi, \"beauty\": Tyre calls itself perfect in beauty. The same boast that later describes its king (28:12) is the root of its fall." },
      { v: 32, s: 7015, note: "Qinah, \"dirge\": A funeral lament with a limping rhythm, a long line answered by a short one, as if the voice breaks." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 28,
    title: "The king who said I am a god",
    setting:
      "The ruler of Tyre in Ezekiel's day was probably Ithobaal III. Ancient kings often claimed divine status or favor, and Tyre's wealth and island fortress made its king feel untouchable. Ezekiel answers with an oracle (vv. 1 to 10) and then a lament (vv. 11 to 19) full of Eden imagery: precious stones, a guardian cherub, the mountain of God. A short word against Sidon and a promise to gather Israel close the chapter.",
    words: [
      { v: 2, s: 410, note: "El, \"God\": The king says, \"I am a god.\" God replies twice that he is a man, adam, and not El." },
      { v: 12, s: 2856, note: "Chatam, \"to seal\": A seal was a signet ring, a precious mark of identity. The king was once a model of perfection, which made his fall the greater." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 29,
    title: "Pharaoh and the Nile",
    setting:
      "In 587 BC Jerusalem was under siege, and many in Judah hoped Egypt would rescue them. Pharaoh Hophra did send an army, but it pulled back (Jeremiah 37:5 to 8). Ezekiel calls Pharaoh a great creature lying in the Nile who claims to have made the river himself. A later word (vv. 17 to 21), dated around 571 BC, is the latest dated oracle in the book and links Egypt to Nebuchadnezzar's long siege of Tyre.",
    words: [
      { v: 3, s: 2975, note: "Yeor, \"Nile\": Borrowed from Egyptian for the great river. Egypt's life depended on it, and Pharaoh claims it as his own creation." },
      { v: 16, s: 4009, note: "Mivtach, \"confidence\": Egypt had been Judah's safety net. God says it will never again be a place to put trust." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 30,
    title: "The day of the LORD for Egypt",
    setting:
      "This chapter holds two oracles against Egypt. The first (vv. 1 to 19) is undated and names Egyptian cities from the Delta to Thebes in the south, along with allies such as Cush, Put and Lydia. The second (vv. 20 to 26) is dated to early 587 BC, soon after an Egyptian army tried to relieve besieged Jerusalem and was driven back. For the exiles, it was a hard message: Egypt would not save them.",
    words: [
      { v: 3, s: 3117, note: "Yom, \"day\": The Day of the LORD was a set phrase for God stepping into history to judge. Here it falls on Egypt, not only on Israel." },
      { v: 21, s: 2220, note: "Zeroa, \"arm\": The arm was a picture of power. Pharaohs liked to call themselves strong armed, and God says Pharaoh's arm is broken." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 31,
    title: "The great cedar falls",
    setting:
      "Dated to mid 587 BC, this oracle asks Pharaoh, \"Who are you like in your greatness?\" The answer is a parable about Assyria, the empire that had ruled the Near East for generations. Its capital Nineveh fell to Babylon and the Medes in 612 BC, only about 25 years earlier. Ezekiel pictures Assyria as a towering cedar of Lebanon, envied by the trees of Eden, then cut down. Egypt should take note.",
    words: [
      { v: 3, s: 730, note: "Erez, \"cedar\": The cedar of Lebanon was the ancient world's most prized timber, tall, fragrant and long lasting, a natural symbol of royal grandeur." },
      { v: 10, s: 1361, note: "Gavah, \"to exult\": To be high, and so to be proud. The tree's height turns into haughtiness, and that is why it is felled." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 32,
    title: "Pharaoh goes down to the pit",
    setting:
      "Two final oracles against Egypt are dated to early 585 BC, after Jerusalem had fallen. The first is a lament comparing Pharaoh to a lion and a creature thrashing in the waters. The second follows Egypt down to Sheol, the realm of the dead, where it finds Assyria, Elam, Meshech, Tubal, Edom and Sidon already lying with the uncircumcised and slain. Great empires end in the same grave.",
    words: [
      { v: 2, s: 3715, note: "Kephir, \"lion\": A young, strong lion. Pharaoh sees himself as a lion, but God sees a creature muddying the streams." },
      { v: 18, s: 953, note: "Bor, \"pit\": A cistern or dungeon, and a picture of the grave. The word recurs through the chapter as nation after nation goes down." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 33,
    title: "The watchman and the fall",
    setting:
      "This chapter is the hinge of Ezekiel. God renews Ezekiel's call as Israel's watchman (compare 3:16 to 21). Then, in early 585 BC, a survivor arrives in Babylon with the news the exiles dreaded: Jerusalem has fallen. The night before, God opened Ezekiel's mouth, ending a long period of restricted speech (24:27). From here the book turns from judgment toward hope, though the people still treat him like entertainment.",
    words: [
      { v: 7, s: 6822, note: "Tsaphah, \"to watch\": A lookout on the city wall who scans the horizon and sounds the trumpet. His job is to warn, not to guarantee anyone listens." },
      { v: 11, s: 2654, note: "Chaphets, \"to delight in\": God takes no pleasure in the death of the wicked. The word speaks of what God desires, not only what He decrees." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 34,
    title: "Bad shepherds and the Good Shepherd",
    setting:
      "In the ancient Near East, kings were often called shepherds of their people. Ezekiel turns the image against Israel's leaders, the kings and officials who fed themselves, ruled harshly and let the flock scatter into exile. God declares that He Himself will search for His sheep and set over them one shepherd, His servant David. David had been dead for four centuries, so this points to a coming king from his line.",
    words: [
      { v: 4, s: 6531, note: "Perekh, \"severity\": Crushing harshness. The same word describes Egypt's treatment of Israelite slaves (Exodus 1:13)." },
      { v: 25, s: 7965, note: "Shalom, \"peace\": More than an absence of war. A covenant of peace means safety, wholeness and flourishing under God's care." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 35,
    title: "Against Mount Seir",
    setting:
      "Mount Seir was the rugged highland south and east of the Dead Sea, the home of Edom. Edom descended from Esau, Jacob's twin, and the two peoples had clashed for centuries. When Babylon took Jerusalem, Edom helped hunt down fugitives and moved to claim Judah's land (Obadiah 10 to 14; Psalm 137:7). This oracle against Edom sets up chapter 36, where the mountains of Israel are promised new life.",
    words: [
      { v: 5, s: 342, note: "Evah, \"enmity\": Deep, settled hostility. Genesis 3:15 uses this word for the enmity between the serpent and the woman's offspring." },
      { v: 12, s: 5007, note: "Neatsah, \"contempt\": Scornful, insulting words. God says He heard every one Edom spoke over Israel's ruined hills." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 36,
    title: "A new heart and a new spirit",
    setting:
      "After the fall of Jerusalem, the land lay desolate and the exiles were scattered, mocked by neighbors who said this was the LORD's people, yet they had to leave His land. Ezekiel first speaks to the mountains of Israel, promising crops and people again. Then God explains why He will act: not because Israel deserves it, but for His holy name. The heart of the promise is inner renewal, close to Jeremiah's new covenant (Jeremiah 31:31 to 34).",
    words: [
      { v: 25, s: 2236, note: "Zaraq, \"to scatter\": To toss or sprinkle, the word for priests splashing water or blood in cleansing rites. God Himself will do the washing." },
      { v: 26, s: 3820, note: "Lev, \"heart\": In Hebrew the heart is the center of thinking, choosing and loving, not just feeling. God promises to replace it, not just repair it." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 38,
    title: "Gog of the land of Magog",
    setting:
      "Chapters 38 and 39 describe Gog, a ruler from the far north, leading a vast coalition against Israel after it has been regathered and is living in peace. Magog appears in Genesis 10:2 as a son of Japheth, and Meshech and Tubal were peoples of ancient Asia Minor. The text calls it the latter days. God draws Gog in and defeats him with earthquake, hail and fire. Christians read these chapters in several different ways.",
    words: [
      { v: 2, s: 7218, note: "Rosh, \"head\": Most translations read \"chief prince.\" A few read Rosh as a place name, but no ancient people by that name is clearly known." },
      { v: 11, s: 6519, note: "Perazah, \"village\": Open country towns with no walls. Israel is so secure under God that it needs no defenses, which makes it look like easy prey." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 39,
    title: "The fall of Gog",
    setting:
      "The Gog vision continues with Gog's defeat on the mountains of Israel. The scale is meant to stagger the reader: weapons burned as fuel for seven years, seven months to bury the dead, birds and beasts summoned to a feast. Whether read literally or symbolically, the point is total victory and total cleansing. The chapter ends with God restoring Israel, no longer hiding His face, and pouring out His Spirit.",
    words: [
      { v: 11, s: 1995, note: "Hamon, \"crowd\": A roaring multitude. Gog's burial valley is called Hamon Gog, \"Gog's horde\", a monument to a crowd that came to nothing." },
      { v: 29, s: 8210, note: "Shaphakh, \"to pour\": Ezekiel used this word for God pouring out wrath. Now He pours out His Spirit, as Joel 2:28 also promises." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 40,
    title: "A vision of a new temple",
    setting:
      "Dated to 573 BC, the twenty fifth year of exile and fourteen years after Solomon's temple was burned, this vision fills chapters 40 to 48. Ezekiel, a priest who could no longer serve at any altar, is taken in vision to a very high mountain in Israel. A man shining like bronze, holding a measuring line and rod, leads him through a vast temple complex, starting with its gates and courts. Christians read this vision in several ways.",
    words: [
      { v: 2, s: 4759, note: "Marah, \"vision\": The same phrase, \"visions of God\", opened the book (1:1). Ezekiel's ministry is framed by two great visions of God's presence." },
      { v: 4, s: 5046, note: "Nagad, \"to tell\": To report openly. Ezekiel is not shown this for private comfort; he must tell all of it to the house of Israel." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 41,
    title: "The inner sanctuary",
    setting:
      "The guide moves from the courts into the temple building itself. Its proportions closely follow Solomon's temple: a main hall forty cubits long and an inner room twenty cubits square (1 Kings 6:2, 20). Ezekiel, though a priest, stays outside while the guide alone enters the Most Holy Place. The walls are carved with cherubim and palm trees, images that recall the garden of Eden.",
    words: [
      { v: 4, s: 6944, note: "Qodesh, \"holiness\": Here doubled as \"holy of holies\", the Hebrew way of saying the holiest place of all, where God's presence was most intense." },
      { v: 18, s: 8561, note: "Timrah, \"palm\": Carved palm trees decorated Solomon's temple too. With cherubim, they made the sanctuary feel like a guarded garden." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 42,
    title: "Holy chambers and a great wall",
    setting:
      "The tour continues with rooms for the priests north and south of the temple, where they ate the holiest offerings and changed out of their sacred garments before going out to the people. Then the guide measures the outer boundary: a square of 500 cubits on each side, roughly 850 feet. For Ezekiel the priest, these details mattered. Israel had blurred the line between holy and common, and that had led to the exile.",
    words: [
      { v: 13, s: 3957, note: "Lishkah, \"chamber\": A side room or hall. Jeremiah met people in such temple rooms (Jeremiah 35:4). Here they serve holiness, not politics." },
      { v: 20, s: 914, note: "Badal, \"to separate\": The verb from Genesis 1, where God separates light from darkness. The wall keeps the same kind of order." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 43,
    title: "The glory returns",
    setting:
      "Years earlier, Ezekiel had watched God's glory leave the defiled temple and go east to the Mount of Olives (10:18 to 19; 11:23). Now he sees the glory return from the east and fill the new temple. God calls it the place of His throne. Then comes the altar, described in detail with seven days of consecration. The vision answers the exiles' fear that God had abandoned them for good.",
    words: [
      { v: 2, s: 3519, note: "Kavod, \"glory\": From a root meaning weight. God's glory is His heavy, real, visible presence, not a vague feeling." },
      { v: 7, s: 7931, note: "Shakhan, \"to dwell\": To settle and live among. The root behind mishkan, the tabernacle, and the later Jewish word Shekinah for God's presence." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 44,
    title: "The shut gate and faithful priests",
    setting:
      "The east gate stays shut because the LORD has entered through it. Only the prince may sit inside it to eat before the LORD. Then the vision turns to who may serve. Levites who had led Israel into idolatry are limited to lower duties, while the priests descended from Zadok, who stayed faithful, may come near. Rules for the priests' clothing, marriage, mourning and teaching follow.",
    words: [
      { v: 2, s: 5462, note: "Sagar, \"to shut\": Shut and kept shut. The gate becomes a monument: the place where God came back is not used as an ordinary doorway." },
      { v: 28, s: 5159, note: "Nachalah, \"inheritance\": Priests receive no land. God says, \"I am their inheritance\", echoing Numbers 18:20." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 45,
    title: "Holy land and honest scales",
    setting:
      "The vision now maps a sacred district across the middle of the land. A holy portion holds the sanctuary and the priests' homes, beside it are strips for the Levites and the city, and land on either side belongs to the prince. Israel's past kings had seized land and cheated their people, so God commands justice, honest weights and measures. The chapter ends with offerings for the new year, Passover and the Feast of Tabernacles.",
    words: [
      { v: 9, s: 7227, note: "Rav, \"many\": Here it is an exclamation: \"Enough!\" God has had more than enough of rulers who take what is not theirs." },
      { v: 10, s: 6664, note: "Tsedeq, \"righteousness\": The same word for God's righteousness describes an honest scale. Justice includes what happens at the market counter." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 46,
    title: "Worship in the new temple",
    setting:
      "This chapter gives the order of worship. On Sabbaths and New Moons, the inner east gate opens and the prince worships at its threshold while the people bow at the entrance. At the feasts, crowds enter through one gate and leave by the opposite one. A lamb is offered every morning. Rules protect family land, so the prince cannot grow rich by taking it. The tour ends in the kitchens where sacrifices are cooked.",
    words: [
      { v: 10, s: 8432, note: "Tavekh, \"midst\": The prince goes in and out in the midst of the people. He is not a remote king but a worshiper among worshipers." },
      { v: 18, s: 3238, note: "Yanah, \"to oppress\": To mistreat or exploit. The prince must not use his power to push families off their land, as Ahab did to Naboth." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 47,
    title: "The river from the temple",
    setting:
      "Ezekiel sees water trickling from under the temple threshold. It grows from ankle deep to a river too deep to cross and flows east down to the Dead Sea, the saltiest body of water in the region, where almost nothing can live. The water makes it fresh, fish swarm, and fruit trees line the banks. The chapter then sets the borders of the land and gives foreigners living in Israel an inheritance with the tribes.",
    words: [
      { v: 9, s: 5158, note: "Nachal, \"torrent\": A wadi or stream bed that fills with rushing water. In dry Judah, a river that keeps growing would be a miracle." },
      { v: 12, s: 8644, note: "Teruphah, \"healing\": The leaves are for healing. Revelation 22:2 takes up the image: leaves of the tree of life for the healing of the nations." },
    ],
  },
  {
    book: "ezekiel",
    chapter: 48,
    title: "The LORD is there",
    setting:
      "The book closes by dividing the land among the twelve tribes in parallel strips from north to south. The order differs from Joshua's: the sacred district sits in the center, with Judah just north and Benjamin just south. The city has twelve gates, three on each side, named after the tribes. Ezekiel began with God's glory leaving Jerusalem. He ends with the city's new name, a promise that God will never leave again.",
    words: [
      { v: 14, s: 7225, note: "Reshit, \"first\": The best and first portion of the land belongs to God, like firstfruits. It cannot be sold or traded." },
      { v: 35, s: 8033, note: "Sham, \"there\": The city's name is YHWH Shammah, \"The LORD is there.\" Its glory is not its walls or size but God's presence." },
    ],
  },
  {
    book: "hosea",
    chapter: 1,
    title: "A prophet's costly marriage",
    setting:
      "Hosea preached in the northern kingdom of Israel from about 755 BC until shortly before Assyria destroyed it in 722 BC. Under Jeroboam II the nation was prosperous but worshiped Baal alongside the LORD. God told Hosea to marry Gomer, whose unfaithfulness would picture Israel's. Many take this as a real marriage; others read it as a symbolic vision or enacted parable.",
    words: [
      { v: 2, s: 2183, note: "Zenunim, \"fornication\": \"A wife of whoredom\" may mean she was already promiscuous or that she would later prove unfaithful. Either way, her story mirrors Israel's." },
      { v: 9, s: 5971, note: "Am, \"people\": The third child's name, Lo-ammi, means \"not My people,\" reversing God's covenant words \"I will take you as My people\" (Exodus 6:7)." },
    ],
  },
  {
    book: "hosea",
    chapter: 2,
    title: "Unfaithful wife, faithful husband",
    setting:
      "Chapter 2 sounds like a courtroom: God brings charges against Israel as a husband against an unfaithful wife. Israel had credited Baal, the Canaanite storm god, with her grain, wine and oil. The harsh images of stripping and exposure picture a nation losing its harvests and land; they are not a pattern for how husbands treat wives. Then the tone turns: God will win her back in the wilderness.",
    words: [
      { v: 16, s: 1180, note: "Baali, \"my master\": Baal means master or lord, and Israel blurred the name of God with the idol's. God wants to be called Ishi, \"my husband.\"" },
      { v: 19, s: 781, note: "Aras, \"to betroth\": God promises a new betrothal and pays the bride price Himself: righteousness, justice, loyal love, compassion and faithfulness." },
    ],
  },
  {
    book: "hosea",
    chapter: 3,
    title: "Love bought back",
    setting:
      "Hosea's wife, most likely Gomer, has left him for another man and may have fallen into debt or slavery. God tells Hosea to love her again, and he buys her back for fifteen shekels of silver and some barley, a modest price perhaps near what a slave cost. He then asks her to wait a long season in faithfulness, a picture of Israel's coming exile without king or temple worship.",
    words: [
      { v: 2, s: 3739, note: "Karah, \"to trade\": He bought her back. Love here is costly: Hosea pays to restore a wife who betrayed him." },
      { v: 5, s: 6342, note: "Pachad, \"to dread\": In the last days Israel will \"come trembling\" to the LORD and His goodness, awed by grace rather than terrified by punishment." },
    ],
  },
  {
    book: "hosea",
    chapter: 4,
    title: "The LORD's case against Israel",
    setting:
      "From chapter 4 on, the book collects Hosea's messages from the northern kingdom's final decades. Priests at shrines like Bethel and Gilgal led worship mixed with Canaanite fertility rites. Hosea brings a covenant lawsuit: lying, murder, theft and adultery fill the land because the people do not know God. The priests, who should have taught God's law, are blamed most of all.",
    words: [
      { v: 1, s: 7379, note: "Riv, \"strife\": A legal case or lawsuit. God speaks like a prosecutor presenting charges for breach of covenant." },
      { v: 6, s: 1847, note: "Daat, \"knowledge\": Not just information but personal, covenant knowing of God. \"My people are destroyed for lack of knowledge.\"" },
    ],
  },
  {
    book: "hosea",
    chapter: 5,
    title: "Like a moth and a lion",
    setting:
      "This chapter probably reflects the war of about 734 to 732 BC, when Israel and Syria attacked Judah and Judah called on Assyria for help (2 Kings 16:5 to 9). Alarms sound in Benjamin's border towns of Gibeah and Ramah. Both kingdoms turned to Assyria instead of to God, and Hosea warns that no foreign king can heal what is wrong with them.",
    words: [
      { v: 13, s: 4205, note: "Mazor, \"wound\": An infected sore. Assyria's king could not cure Israel's real wound, which was spiritual." },
      { v: 15, s: 7836, note: "Shachar, \"to seek\": Related to the word for dawn. It means seeking early and eagerly, the way someone watches for sunrise." },
    ],
  },
  {
    book: "hosea",
    chapter: 6,
    title: "I desire loyal love",
    setting:
      "Chapter 6 opens with a song of repentance, probably sung by the people: \"Come, let us return to the LORD.\" But God answers that their love vanishes like morning mist. In Israel's dry summer, crops depended on the night dew, and Hosea uses that picture for both shallow devotion and God's faithful care. Jesus quoted verse 6 twice (Matthew 9:13; 12:7).",
    words: [
      { v: 4, s: 2919, note: "Tal, \"dew\": Dew kept crops alive through rainless months but vanished by mid morning. Israel's devotion was just as brief." },
      { v: 6, s: 2617, note: "Chesed, \"kindness\": Loyal, covenant love. God wanted steadfast loyalty, not rituals offered by people with divided hearts." },
    ],
  },
  {
    book: "hosea",
    chapter: 7,
    title: "A half baked nation",
    setting:
      "Between 753 and 732 BC four of Israel's kings were assassinated in quick succession: Zechariah, Shallum, Pekahiah and Pekah (2 Kings 15). Chapter 7 pictures the court plotters as an oven heated all night, ready to burst into flame. Meanwhile Israel's foreign policy flitted between Egypt and Assyria. Hosea sees a nation that has lost its bearings and does not even notice.",
    words: [
      { v: 8, s: 5692, note: "Uggah, \"bun\": A flat cake left unturned, burnt on one side and raw on the other. Israel is half committed and spoiled." },
      { v: 11, s: 3123, note: "Yonah, \"dove\": A silly dove, easily lured and senseless, flying to Egypt one moment and to Assyria the next." },
    ],
  },
  {
    book: "hosea",
    chapter: 8,
    title: "Sow the wind",
    setting:
      "An alarm opens the chapter: an enemy swoops like an eagle on the LORD's house, probably meaning the land of Israel. Assyria's armies were on the move. Israel had set up kings without consulting God, worshiped the golden calf Jeroboam I made for Bethel and Dan (1 Kings 12:28 to 30), and paid Assyria for protection. Hosea warns these choices would bring the very ruin they hoped to avoid.",
    words: [
      { v: 1, s: 7782, note: "Shophar, \"trumpet\": The ram's horn sounded to warn of attack. Hosea blows it over a nation that thought it was safe." },
      { v: 7, s: 5492, note: "Suphah, \"whirlwind\": They sow the wind and reap the whirlwind. Empty choices grow into storms far larger than their seed." },
    ],
  },
  {
    book: "hosea",
    chapter: 9,
    title: "No joy at the harvest",
    setting:
      "Israel's great autumn festival celebrated the harvest with joy, but Hosea interrupts it. The people credited Baal for their crops and treated threshing floors as places of fertility rites. Hosea warns they will return to an \"Egypt,\" exile in Assyria, where they cannot keep the LORD's feasts. He traces their sin back to Israel's early failures at Baal Peor (Numbers 25) and Gibeah (Judges 19).",
    words: [
      { v: 10, s: 6025, note: "Enav, \"grape\": Finding Israel was like finding grapes in the wilderness, an unexpected delight. God remembers His first joy over His people." },
      { v: 17, s: 5074, note: "Nadad, \"to wander\": The chapter ends with Israel as wanderers among the nations, the bitter fate of exile." },
    ],
  },
  {
    book: "hosea",
    chapter: 10,
    title: "Break up your fallow ground",
    setting:
      "Israel had grown rich, and as wealth increased, so did its altars and sacred pillars. The golden calf at Bethel, which Hosea mockingly calls Beth Aven, \"house of wickedness,\" would be carried off to Assyria as tribute. Hosea mentions Shalman's destruction of Beth Arbel, an atrocity his hearers knew well but which historians cannot clearly identify. In the middle of judgment he calls the people to plow new ground.",
    words: [
      { v: 1, s: 1238, note: "Baqaq, \"be luxuriant\": A spreading vine. Israel flourished, but its fruit went into altars for idols." },
      { v: 12, s: 5215, note: "Nir, \"fallow ground\": Unplowed land, hard and weedy. Hosea calls for breaking up hardened hearts so righteousness can grow." },
    ],
  },
  {
    book: "hosea",
    chapter: 12,
    title: "Jacob, the heel grabber",
    setting:
      "Hosea retells the story of Jacob, Israel's ancestor: he grabbed his brother's heel at birth, wrestled with God, wept and sought favor, and met God at Bethel (Genesis 25, 28, 32). The nation carried his name and his habit of scheming. Ephraim chases the wind, makes treaties with Assyria, sends olive oil to Egypt, and trusts dishonest gain. Judah is charged as well.",
    words: [
      { v: 3, s: 6117, note: "Aqav, \"to assail\": To grab by the heel, the root of Jacob's name. It came to mean to supplant or deceive (Genesis 27:36)." },
      { v: 3, s: 8280, note: "Sarah, \"to strive\": He wrestled with God. This verb lies behind the name Israel, \"he strives with God\" (Genesis 32:28)." },
    ],
  },
  {
    book: "hosea",
    chapter: 13,
    title: "Death, where is your sting?",
    setting:
      "Chapter 13 is among Hosea's last warnings before Samaria fell to Assyria in 722 BC after a three year siege (2 Kings 17:5 to 6). Ephraim had once been powerful among the tribes, but worship of Baal and the calf idols brought spiritual death. God describes Himself as a lion, leopard and bear against His people, yet He also speaks of ransoming them from death itself.",
    words: [
      { v: 2, s: 5401, note: "Nashaq, \"to kiss\": People kissed the calf idols as an act of worship (compare 1 Kings 19:18). Humans kissing calves shows how far worship had fallen." },
      { v: 14, s: 6299, note: "Padah, \"to ransom\": To set free by paying a price. God speaks of ransoming His people from the power of the grave." },
    ],
  },
  {
    book: "hosea",
    chapter: 14,
    title: "Return, O Israel",
    setting:
      "Hosea's book ends with an invitation. Assyria's destruction was close, yet God still gave the people words to pray: confess sin, renounce trust in Assyria, war horses and idols, and seek His mercy. God answers with promises of healing and growth, using the language of Israel's land. A final verse, like a wisdom saying, urges every reader to understand and walk in the LORD's ways.",
    words: [
      { v: 2, s: 6499, note: "Par, \"bullock\": Literally \"the bulls of our lips.\" Words of confession take the place of sacrificed bulls; Hebrews 13:15 speaks of a sacrifice of praise, \"the fruit of lips.\"" },
      { v: 4, s: 5071, note: "Nedavah, \"voluntariness\": I will love them freely, not because they earned it, the way a freewill offering is given unprompted." },
    ],
  },
  {
    book: "joel",
    chapter: 1,
    title: "When the locusts came",
    setting:
      "Joel names no king, so his date is uncertain. Suggestions run from the 800s BC to after the exile, around 500 to 400 BC. What is clear is the crisis: a massive locust swarm, followed by drought, has stripped Judah's fields, vines and fig trees. Locust plagues could ruin a farming nation for years; as late as 1915 one devastated the land around Jerusalem. Joel calls everyone, from elders to drunkards, to mourn and turn to God.",
    words: [
      { v: 4, s: 697, note: "Arbeh, \"locust\": The usual word for the swarming locust, the same one used for the eighth plague on Egypt (Exodus 10:4). Joel uses four locust words in a row, perhaps stages of growth, perhaps wave after wave of the same disaster." },
      { v: 15, s: 7701, note: "Shod, \"destruction\": A wordplay in Hebrew: shod comes from Shaddai, \"the Almighty.\" The disaster is not random; it carries the signature of the God who rules creation." },
    ],
  },
  {
    book: "joel",
    chapter: 3,
    title: "The valley where God gives His verdict",
    setting:
      "Joel looks past the locusts to the final Day of the LORD, when God settles accounts with the nations that scattered His people. Tyre, Sidon and Philistia are charged with looting the temple and selling Judeans as slaves to the Greeks, a trade attested across the ancient Mediterranean. The chapter ends with a Jerusalem made holy and a fountain flowing from God's house. (In Hebrew Bibles this is chapter 4.)",
    words: [
      { v: 2, s: 8199, note: "Shaphat, \"enter into judgment\": The name Jehoshaphat means \"the LORD judges.\" The valley is named for what happens there, so it may be a symbolic place rather than a spot on a map." },
      { v: 14, s: 2742, note: "Charuts, \"decision\": Literally something sharp, used for a threshing sledge (Isaiah 41:15). The decision here is not the crowd's choice but God's verdict, cutting through the nations like a harvest." },
    ],
  },
  {
    book: "amos",
    chapter: 1,
    title: "The lion roars over the nations",
    setting:
      "Amos came from Tekoa, a village about ten miles south of Jerusalem, but God sent him north to Israel during the reign of Jeroboam II (about 793 to 753 BC). Israel was strong and wealthy, and its neighbors were weak. Amos begins with oracles against those neighbors, which his audience would have cheered. Each one tightens the circle around Israel. A major earthquake two years later was remembered for centuries (Zechariah 14:5).",
    words: [
      { v: 1, s: 5349, note: "Noqed, \"sheepherder\": A rare word also used of Mesha king of Moab, a sheep breeder who paid tribute in lambs (2 Kings 3:4). Amos may have managed flocks rather than simply watching them. Either way, he was no professional prophet." },
      { v: 3, s: 6588, note: "Pesha, \"transgression\": More than a mistake; it means rebellion, like a vassal breaking faith with his king. Even nations without the Law of Moses are held accountable for cruelty against other people." },
    ],
  },
  {
    book: "amos",
    chapter: 2,
    title: "Judah, then Israel in the crosshairs",
    setting:
      "After condemning six neighbors, Amos turns to Judah and then to Israel itself, the real target of his message. Israel's crimes are not foreign wars but everyday injustice at home: debt, bribery, sexual exploitation and greed practiced by people who still went to worship. Loans were secured with cloaks and land, and the law said a poor man's cloak must be returned by sunset (Exodus 22:26 to 27).",
    words: [
      { v: 6, s: 34, note: "Evyon, \"needy\": Someone poor and vulnerable, with no buffer against hardship. Selling such people \"for a pair of sandals\" may mean enslaving them over a tiny debt." },
      { v: 12, s: 5139, note: "Nazir, \"Nazirite\": A person under a special vow of devotion that included avoiding wine (Numbers 6). Israel pressured even these living examples of devotion to give up their vows." },
    ],
  },
  {
    book: "amos",
    chapter: 3,
    title: "Chosen means accountable",
    setting:
      "Amos speaks at Bethel or Samaria to a people who believed their special relationship with God guaranteed safety. He uses a chain of everyday questions about lions, birds, traps and trumpets: every effect has a cause, and a prophet speaks because God has spoken. Samaria's elite lived in winter and summer houses decorated with carved ivory, and archaeologists have found many such ivory pieces there.",
    words: [
      { v: 2, s: 3045, note: "Yada, \"known\": More than awareness; it means a close, chosen relationship, the word used for a covenant bond. Because God knew Israel so intimately, Israel's sin was all the more serious." },
      { v: 7, s: 5475, note: "Sod, \"plan\": The private counsel of a ruler and his advisors. God lets His prophets into His council before He acts, so no one can say they were not warned." },
    ],
  },
  {
    book: "amos",
    chapter: 4,
    title: "Yet you did not return to Me",
    setting:
      "Bashan, east of the Sea of Galilee, was famous for rich pastures and well fed cattle. Amos turns this into a jab at the wealthy women of Samaria who pressed their husbands for luxury paid for by the poor. He then mocks Israel's busy worship at Bethel and Gilgal and lists the disasters God had already sent: famine, drought, crop blight, plague and war, each echoing the covenant warnings of Leviticus 26.",
    words: [
      { v: 1, s: 6510, note: "Parah, \"cows\": Literally heifers. The insult is pointed: well fed animals that only think of the next drink, unaware they are being fattened for slaughter." },
      { v: 12, s: 3559, note: "Kun, \"prepare\": To make ready, to set firmly in place. Israel had prepared sacrifices; now it must prepare for a meeting with God Himself." },
    ],
  },
  {
    book: "amos",
    chapter: 6,
    title: "At ease in Zion",
    setting:
      "Under Jeroboam II, Israel had recovered territory and enjoyed prosperity unseen since Solomon (2 Kings 14:25). The upper class lounged on ivory beds, ate the best meat, drank wine by the bowlful and composed songs, while the nation was rotting from within. Amos warns that these leaders of the \"foremost nation\" will be first in line for exile. Assyria conquered Samaria about forty years later, in 722 BC.",
    words: [
      { v: 1, s: 7600, note: "Shaanan, \"at ease\": Secure, untroubled, complacent. It can describe healthy peace, but here it means comfort that no longer notices danger or anyone else's pain." },
      { v: 7, s: 4797, note: "Mirzach, \"feasting\": The marzeach was a known ancient institution, a banqueting club of the wealthy, sometimes linked with religious or funeral feasts. Jeremiah 16:5 uses the same word for a house of mourning." },
    ],
  },
  {
    book: "amos",
    chapter: 7,
    title: "The plumb line and the priest",
    setting:
      "This chapter contains three of Amos's five visions, and the only story about Amos himself. He preached at Bethel, the royal shrine Jeroboam I had set up to rival Jerusalem (1 Kings 12:28 to 33). Amaziah, its priest, reports him to the king as a traitor and orders him home to Judah. Amos replies that he is no professional prophet, just a herdsman and fig farmer whom God took from his flock.",
    words: [
      { v: 7, s: 594, note: "Anakh, \"plumb line\": This rare word appears only in this passage. Most translations read it as a weight on a string for testing whether a wall is straight; some scholars think it means tin. Either way, Israel is being tested and found out of line." },
      { v: 14, s: 1103, note: "Balas, \"tender\": Sycamore figs had to be nicked or pinched to ripen. They grew in warm lowlands, not Tekoa's hills, so Amos probably worked seasonally away from home." },
    ],
  },
  {
    book: "amos",
    chapter: 8,
    title: "A basket of summer fruit",
    setting:
      "Amos's fourth vision uses a wordplay. Late summer fruit marked the end of the harvest year. Merchants in Israel kept the New Moon and Sabbath, but resented the lost trading time and cheated with false measures when the stores opened again. God warns that the end is coming, and that the judgment will include His silence: the people who ignored His word will one day search for it and not find it.",
    words: [
      { v: 2, s: 7093, note: "Qets, \"end\": It sounds almost like qayits, \"summer fruit,\" in the same verse. Amos sees ripe fruit; God says Israel is ripe for judgment." },
      { v: 11, s: 7458, note: "Raav, \"famine\": Usually hunger for bread. Here it is a deeper hunger: a time when people long for a word from God but no prophet speaks." },
    ],
  },
  {
    book: "amos",
    chapter: 9,
    title: "The fallen tent of David rebuilt",
    setting:
      "The final vision shows the Lord standing by the altar, likely at Bethel, ordering the shrine struck down. No one can hide from God, in Sheol, on Carmel or at the bottom of the sea. Yet the book ends with hope beyond judgment: David's fallen dynasty will be raised and God's people replanted in their land. Some scholars think this ending was added later; many others see it as Amos's own.",
    words: [
      { v: 11, s: 5521, note: "Sukkah, \"tent\": A booth or shelter, the same word used for the Feast of Booths. David's royal house would be reduced to a flimsy hut, yet God promises to raise it up again." },
      { v: 14, s: 7622, note: "Shevut, \"captivity\": Often rendered \"restore the fortunes.\" The phrase means a full reversal: what was lost to exile and ruin is given back." },
    ],
  },
  {
    book: "micah",
    chapter: 1,
    title: "The LORD comes down",
    setting:
      "Micah came from Moresheth, a farming town in the lowlands about 25 miles southwest of Jerusalem. He prophesied under Jotham, Ahaz and Hezekiah, roughly 740 to 690 BC, the same years as Isaiah. He saw Samaria fall to Assyria in 722 BC and warned that the same disaster would reach Jerusalem's gate. In 701 BC Sennacherib's army overran Judah's lowland towns, including Lachish, whose siege is carved on Assyrian palace reliefs.",
    words: [
      { v: 3, s: 1116, note: "Bamah, \"high place\": The heights of the earth, which God treads like a conqueror. It was also the word for hilltop shrines, and verse 5 asks pointedly whether Jerusalem itself has become Judah's high place." },
      { v: 10, s: 6083, note: "Aphar, \"dust\": Beth leaphrah means \"house of dust,\" so its people are told to roll in the dust. Verses 10 to 15 are full of such puns, each town's name turned into its fate." },
    ],
  },
  {
    book: "micah",
    chapter: 2,
    title: "Woe to those who plot on their beds",
    setting:
      "In Israel, land was not a commodity. Each family's plot was its share in God's land, meant to stay in the family for good (Leviticus 25:23). By Micah's day, powerful landowners were swallowing small farms through debt and legal pressure, as Ahab had seized Naboth's vineyard (1 Kings 21). When Micah protested, comfortable preachers told him to stop. The chapter closes with a surprising promise of a Shepherd King.",
    words: [
      { v: 2, s: 2530, note: "Chamad, \"covet\": The verb of the tenth commandment (Exodus 20:17). The sin starts as desire at night and becomes seizure by morning." },
      { v: 2, s: 5159, note: "Nachalah, \"inheritance\": A family's allotted portion, passed down the generations. To take it was to cut a family off from its place among God's people." },
    ],
  },
  {
    book: "micah",
    chapter: 3,
    title: "Leaders who devour the flock",
    setting:
      "Micah addresses Jerusalem's rulers, priests and prophets, the people responsible for justice and truth. Instead they sell verdicts, teach for pay and tailor their prophecies to whoever feeds them, all while assuming God's presence in the temple guarantees their safety. Micah's warning that Zion would be plowed like a field was remembered a century later, when elders quoted it to save Jeremiah's life (Jeremiah 26:18 to 19).",
    words: [
      { v: 11, s: 7810, note: "Shochad, \"bribe\": A gift given to bend a judgment. The law forbade it because it \"blinds the clear sighted\" (Exodus 23:8). Jerusalem's leaders had made it routine." },
      { v: 12, s: 2790, note: "Charash, \"plowed\": To cut furrows in a field. The proud city and its temple mount would become farmland and brush, the kind of country Micah himself came from." },
    ],
  },
  {
    book: "micah",
    chapter: 4,
    title: "Swords into plowshares",
    setting:
      "Right after warning that the temple mount will become a ruin, Micah describes it raised above every mountain, with nations streaming to it to learn God's ways. Verses 1 to 3 closely match Isaiah 2:2 to 4. The two prophets were contemporaries; one may have quoted the other, or both drew on a shared older oracle. Micah alone adds the image of every family safe under its own vine and fig tree.",
    words: [
      { v: 3, s: 855, note: "Et, \"plowshare\": The iron blade of a plow. Joel 3:10 reverses the image, calling nations to beat plowshares into swords for the final battle." },
      { v: 4, s: 8384, note: "Teenah, \"fig tree\": A picture of settled, peaceful life, used of Solomon's reign (1 Kings 4:25). Each family enjoys its own land and harvest with no one to make it afraid." },
    ],
  },
  {
    book: "micah",
    chapter: 5,
    title: "A ruler from little Bethlehem",
    setting:
      "Jerusalem faces siege and humiliation; even its ruler is struck on the cheek. Micah then turns to Bethlehem, David's hometown, an obscure village a few miles south. God will again raise a ruler from there, a shepherd whose rule reaches the ends of the earth. Centuries later, the scribes cited this verse to Herod when the Magi asked where the Messiah would be born (Matthew 2:5 to 6). In Hebrew Bibles verse 2 is 5:1.",
    words: [
      { v: 2, s: 6810, note: "Tsair, \"small\": Little, insignificant, the youngest. God starts again not in the capital but in a small clan town, as He once chose David, the youngest son." },
      { v: 2, s: 4163, note: "Motsaah, \"origins\": Literally \"goings out.\" Many Christians read \"from of old, from the days of eternity\" as pointing to Christ's eternal existence; others take it as the ancient roots of David's line." },
    ],
  },
  {
    book: "micah",
    chapter: 7,
    title: "Who is a God like You?",
    setting:
      "Micah ends in two voices. First a lament: society has rotted so far that judges take bribes, friends cannot be trusted and families turn on each other. Then the prophet speaks for the people, waiting for God, confessing sin and confident of rescue. The book closes with a hymn that plays on Micah's own name, which means \"Who is like the LORD?\" Jewish tradition reads verses 18 to 20 on the Day of Atonement.",
    words: [
      { v: 2, s: 2623, note: "Chasid, \"godly man\": Someone marked by chesed, loyal love toward God and others. Micah looks for one and cannot find him." },
      { v: 7, s: 6822, note: "Tsaphah, \"look\": The word for a watchman scanning from a tower. Micah keeps watch for God when everything around him has collapsed." },
    ],
  },
  {
    book: "nahum",
    chapter: 2,
    title: "The fall of Nineveh",
    setting:
      "Nineveh was the showpiece capital of Assyria, ringed by massive walls and fed by the Tigris and smaller rivers and canals. In 612 BC a coalition of Babylonians and Medes besieged and destroyed it. Some ancient sources say floodwater helped breach the defenses, which may lie behind verse 6. Nahum describes the attack as if watching it happen: red shields, flashing chariots, panic in the streets, looters stripping the treasury.",
    words: [
      { v: 6, s: 5104, note: "Nahar, \"river\": The river gates are flung open. The water that made Nineveh rich and secure becomes the way its defenses fail." },
      { v: 13, s: 2964, note: "Tereph, \"prey\": Assyrian kings pictured themselves as lion hunters and used lion imagery for their own power. God says the lion's stash of prey is finished." },
    ],
  },
  {
    book: "nahum",
    chapter: 3,
    title: "Woe to the city of blood",
    setting:
      "Assyrian kings boasted in their own inscriptions of burning cities, impaling and flaying captives, and deporting whole populations. Nahum answers that record. He points to Thebes, Egypt's great city on the Nile, which Assyria itself had sacked in 663 BC: if Thebes could fall, so can Nineveh. The book was likely written between that event and 612 BC, and it ends, like Jonah, with a question.",
    words: [
      { v: 1, s: 1945, note: "Hoy, \"woe\": A cry used at funerals. Nahum mourns over a city that is still standing, because its doom is already settled." },
      { v: 19, s: 7451, note: "Ra, \"cruelty\": Evil or harm. The last line asks who has not felt Assyria's constant evil. The whole region had been its victim." },
    ],
  },
  {
    book: "habakkuk",
    chapter: 1,
    title: "How long, O LORD?",
    setting:
      "Habakkuk probably prophesied in Judah in the late 600s BC, as Babylon rose to power. The Babylonians, called Chaldeans here, crushed Egypt at Carchemish in 605 BC and soon controlled Judah. At home, King Jehoiakim's reign was marked by injustice and violence (Jeremiah 22:13 to 17). Unlike most prophets, Habakkuk does not preach to the people. He argues with God, and the book records the conversation.",
    words: [
      { v: 2, s: 2555, note: "Chamas, \"violence\": Brutal wrongdoing, the word used for the earth before the flood (Genesis 6:11). Habakkuk shouts it like a cry for help." },
      { v: 4, s: 6313, note: "Pug, \"paralyzed\": Numb, gone cold. God's law is still on the books, but it has lost its grip on daily life." },
    ],
  },
  {
    book: "habakkuk",
    chapter: 3,
    title: "Though the fig tree does not bud",
    setting:
      "Chapter 3 is a psalm, with musical notes at its start and end and Selah in the middle, so it was likely sung in worship. Habakkuk remembers how God came from the southern wilderness at the exodus and conquest, with storm, earthquake and sun and moon standing still. He knows Babylon is coming and will strip Judah's fields, vines and flocks. He chooses to trust God anyway.",
    words: [
      { v: 2, s: 7355, note: "Racham, \"mercy\": Tender compassion, related to the word for womb. Habakkuk asks God to remember this even while He judges." },
      { v: 18, s: 5937, note: "Alaz, \"exult\": To rejoice openly. Habakkuk's joy is not in his circumstances but in the LORD, the God who saves." },
    ],
  },
  {
    book: "zephaniah",
    chapter: 1,
    title: "The great Day of the LORD is near",
    setting:
      "Zephaniah was a descendant of King Hezekiah (v. 1) and spoke during Josiah's reign (640 to 609 BC), probably before the reforms of 622 BC. Josiah's grandfather Manasseh had ruled for decades and filled Judah with Baal worship, star worship on rooftops and the cult of Milcom, an Ammonite god. Many still swore by the LORD while serving these gods. Amos had first warned that the Day of the LORD would be darkness, not light (Amos 5:18).",
    words: [
      { v: 12, s: 7087, note: "Qapha, \"settled\": Thickened, congealed, like wine left too long on its dregs. These people have grown sluggish and comfortable, sure God will never act." },
      { v: 18, s: 7068, note: "Qinah, \"jealousy\": God's burning zeal for His people's exclusive love. The fire of judgment is the fire of a wronged covenant partner." },
    ],
  },
  {
    book: "zephaniah",
    chapter: 2,
    title: "Seek the LORD, all you humble",
    setting:
      "After warning Judah, Zephaniah turns to the nations on every side: Philistine cities to the west, Moab and Ammon to the east, Cush (the Nubian kingdom south of Egypt) to the south, and Assyria to the north. Nineveh is still standing in this chapter, which suggests a date before its fall in 612 BC. Moab and Ammon, Israel's relatives through Lot, had long mocked and threatened God's people.",
    words: [
      { v: 3, s: 6035, note: "Anav, \"humble\": The lowly and poor who depend on God, not on power or wealth. These are the people Zephaniah calls to seek Him." },
      { v: 15, s: 983, note: "Betach, \"securely\": Carefree confidence. Nineveh felt untouchable, and that feeling was the clearest sign of its pride." },
    ],
  },
  {
    book: "haggai",
    chapter: 2,
    title: "The latter glory of this house",
    setting:
      "Haggai's second message came in the seventh month of 520 BC, during the Feast of Tabernacles, the feast at which Solomon had dedicated the first temple (1 Kings 8:2). Older people who remembered that temple, destroyed in 586 BC, saw the new foundations and wept (Ezra 3:12). Chapter 2 holds three dated messages. The rebuilt temple was finished about four years later, around 516 BC (Ezra 6:15).",
    words: [
      { v: 4, s: 2388, note: "Chazaq, \"be strong\": The command God gave Joshua before Canaan (Joshua 1:6 to 9). Here it is said three times, to the governor, the priest and the people." },
      { v: 23, s: 2368, note: "Chotam, \"signet ring\": A royal seal carrying a king's authority. God once pulled the ring off Zerubbabel's grandfather Jehoiachin (Jeremiah 22:24); now He puts it back on the family." },
    ],
  },
  {
    book: "zechariah",
    chapter: 1,
    title: "Return to Me",
    setting:
      "Zechariah, from a priestly family that returned from Babylon (Nehemiah 12:16), began preaching in 520 BC, two months after Haggai. The temple was still a ruin, and Jeremiah's seventy years of judgment seemed to be ending (Jeremiah 29:10). Three months later came a series of night visions full of symbols, each explained by an angel. Persia had just crushed revolts across its empire, so the world looked calm while Jerusalem lay broken.",
    words: [
      { v: 3, s: 7725, note: "Shuv, \"return\": The heart of the call. If the people turn back to God, He promises to turn back to them." },
      { v: 8, s: 1918, note: "Hadas, \"myrtle\": A low evergreen shrub. The heavenly rider stands among myrtles in a hollow, perhaps a picture of a lowly people God has not forgotten." },
    ],
  },
  {
    book: "zechariah",
    chapter: 2,
    title: "A city without walls",
    setting:
      "In the third night vision a man sets out to measure Jerusalem. In 520 BC its walls were still rubble, and they would not be rebuilt until Nehemiah, about 75 years later. Many Jews still lived comfortably in Babylon, \"the land of the north\", and had no plans to move to a poor, unprotected town. Zechariah urges them to come home, because God Himself promises to protect and fill the city.",
    words: [
      { v: 5, s: 2346, note: "Chomah, \"wall\": City walls meant safety in the ancient world. God promises to be a wall of fire around Jerusalem Himself." },
      { v: 8, s: 892, note: "Bavah, \"apple\": The pupil of the eye, the part you protect by instinct. To touch God's people is to poke Him in the eye." },
    ],
  },
  {
    book: "zechariah",
    chapter: 3,
    title: "Clean garments for the high priest",
    setting:
      "Joshua was the first high priest after the exile, and he represented the whole returned community before God. The scene is a heavenly courtroom: Joshua stands before the angel of the LORD, and \"the accuser\" stands at his right hand, where a prosecutor stood in ancient courts (compare Job 1 to 2). The priesthood had come back from an unclean land, and many wondered if God could accept them again.",
    words: [
      { v: 1, s: 7854, note: "Satan, \"accuser\": In Hebrew the word has the article, \"the satan\", the adversary who brings charges. God silences him before he speaks." },
      { v: 3, s: 6674, note: "Tso, \"filthy\": An unusually strong word, filth like excrement. Joshua's garments picture sin that disqualifies him from serving God." },
    ],
  },
  {
    book: "zechariah",
    chapter: 4,
    title: "Not by might, nor by power",
    setting:
      "Zerubbabel, governor of Judah and a descendant of David, had laid the temple's foundation, but money was short and local opponents had already stopped the work once (Ezra 4). In this vision Zechariah sees a golden lampstand like the temple's menorah, supplied with oil by two olive trees. The message is for Zerubbabel personally: the temple will be finished, not through resources or politics but by God's Spirit.",
    words: [
      { v: 6, s: 7307, note: "Ruach, \"Spirit\": Breath, wind, spirit. Like the oil that keeps the lamps burning without human hands, God's Spirit supplies the work." },
      { v: 10, s: 6996, note: "Qatan, \"small\": Some sneered at the modest new temple. God says not to despise the day of small things." },
    ],
  },
  {
    book: "zechariah",
    chapter: 5,
    title: "A flying scroll and a woman in a basket",
    setting:
      "Two visions show God removing sin from the land itself, not only judging it. A huge scroll, about 30 by 15 feet, flies over the land; it is the same size as the porch of Solomon's temple (1 Kings 6:3). Then an ephah, a basket used to measure grain in the market, carries a woman called Wickedness off to Shinar, the old name for Babylonia, where Babel's tower was built (Genesis 11:2).",
    words: [
      { v: 3, s: 423, note: "Alah, \"curse\": An oath with a curse attached, as in a covenant. Those who break God's covenant fall under the penalty it names." },
      { v: 8, s: 7564, note: "Rishah, \"Wickedness\": Evil personified as a woman, pushed into the basket and sealed with a lead lid. God packs sin up and sends it away." },
    ],
  },
  {
    book: "zechariah",
    chapter: 6,
    title: "A crown for the Branch",
    setting:
      "The eighth and last night vision shows four chariots going out to patrol the earth, like the horsemen of chapter 1. Then Zechariah performs a symbolic act. Exiles have arrived from Babylon with silver and gold, and he is to make a crown and place it on Joshua the high priest. In Israel, kings and priests were kept strictly separate (2 Chronicles 26:16 to 21); here one figure joins both roles.",
    words: [
      { v: 12, s: 6779, note: "Tsamach, \"branch out\": A wordplay on the title Branch: the man named Sprout will sprout up and build the temple of the LORD." },
      { v: 13, s: 3678, note: "Kisse, \"throne\": A royal seat. Strikingly, the priest sits on a throne, a picture of priest and king united in one person." },
    ],
  },
  {
    book: "zechariah",
    chapter: 7,
    title: "Fasting for whom?",
    setting:
      "Two years after the night visions, in late 518 BC, a delegation from Bethel asked whether they should keep fasting in the fifth month, mourning the burning of the temple (2 Kings 25:8 to 9). With a new temple going up, was the fast still needed? A fast in the seventh month probably remembered the murder of the governor Gedaliah (2 Kings 25:25). God answers with a question about their motives.",
    words: [
      { v: 5, s: 6684, note: "Tsum, \"fast\": To go without food as an act of mourning or repentance. God asks whether these fasts were ever really for Him." },
      { v: 10, s: 1616, note: "Ger, \"foreigner\": A resident outsider without land or family protection. God's law repeatedly names them with widows, orphans and the poor." },
    ],
  },
  {
    book: "zechariah",
    chapter: 8,
    title: "Old men and children in the streets",
    setting:
      "Chapter 8 continues God's answer to the Bethel delegation with ten short promises, each starting \"This is what the LORD of Hosts says.\" In Zechariah's day Jerusalem was thinly populated and still partly in ruins (compare Nehemiah 11:1 to 2). The four fasts in verse 19 marked stages of the city's fall to Babylon: the siege, the breach of the walls, the temple's burning, and Gedaliah's murder.",
    words: [
      { v: 3, s: 571, note: "Emet, \"truth\": Faithfulness, reliability. Jerusalem will be called the City of Truth because God's own faithfulness will shape it." },
      { v: 5, s: 7832, note: "Sachaq, \"playing\": To laugh and play. Children playing safely in the streets is God's picture of a restored city." },
    ],
  },
  {
    book: "zechariah",
    chapter: 10,
    title: "The LORD cares for His flock",
    setting:
      "Chapters 9 to 14 carry no dates and read differently from the night visions, so some scholars place them later in Zechariah's life or after it, while others hold he wrote them all. Chapter 10 speaks to a scattered people still drawn to household idols and fortune tellers. \"Egypt\" and \"Assyria\" stand for every land of exile, the old places of Israel's slavery and deportation.",
    words: [
      { v: 2, s: 8655, note: "Teraphim, \"idols\": Household god figurines, often consulted for guidance (compare Genesis 31:19; 1 Samuel 19:13). They gave only empty comfort." },
      { v: 8, s: 8319, note: "Sharaq, \"whistle\": A shepherd's call to a scattered flock. God needs only to whistle and His people will come home." },
    ],
  },
  {
    book: "zechariah",
    chapter: 11,
    title: "Thirty pieces of silver",
    setting:
      "This is one of the hardest chapters in the prophets to interpret. Zechariah acts out the role of a shepherd over a flock that its own leaders are exploiting and selling for slaughter. When he asks for his pay, they weigh out thirty pieces of silver, the price the law set for a slave gored by an ox (Exodus 21:32). God calls it sarcastically a \"magnificent price\" and has him throw it to the potter.",
    words: [
      { v: 12, s: 7939, note: "Sakhar, \"wages\": Payment for work. The amount told the shepherd exactly what the people thought he was worth." },
      { v: 13, s: 3335, note: "Yatsar, \"potter\": One who shapes clay. Matthew 27:3 to 10 sees this fulfilled when Judas's thirty silver coins bought a potter's field." },
    ],
  },
  {
    book: "zechariah",
    chapter: 12,
    title: "They will look on the One they pierced",
    setting:
      "Chapters 12 to 14 form the book's second oracle, and the phrase \"on that day\" appears again and again. Nations besiege Jerusalem, but God defends it, and then comes something unexpected: deep national mourning. The mourning at Hadad-rimmon in the plain of Megiddo (v. 11) probably recalls the grief for good King Josiah, killed in battle at Megiddo in 609 BC (2 Chronicles 35:22 to 25).",
    words: [
      { v: 3, s: 4614, note: "Ma'amasah, \"heavy stone\": A stone too heavy to lift. Those who try to move Jerusalem out of the way will strain themselves and be hurt." },
      { v: 10, s: 1856, note: "Daqar, \"pierced\": Thrust through, as with a spear or sword. John 19:37 quotes this line at the crucifixion." },
    ],
  },
  {
    book: "zechariah",
    chapter: 13,
    title: "Strike the Shepherd",
    setting:
      "Chapter 13 continues \"that day\". A fountain opens to wash away sin, idols are forgotten, and false prophets are so discredited that they deny being prophets at all. They will not even wear the hairy cloak that marked prophets like Elijah (2 Kings 1:8). Then the scene turns to God's own Shepherd, struck down so that the flock scatters, followed by a refining that leaves a people who call on God's name.",
    words: [
      { v: 1, s: 4726, note: "Maqor, \"fountain\": A spring that keeps flowing. Cleansing for sin and impurity will not be a one-time wash but an open source." },
      { v: 7, s: 5997, note: "Amit, \"Companion\": A close associate or fellow. Outside Zechariah it appears only in Leviticus, for one's neighbor. God calls the struck Shepherd the man who stands beside Him." },
    ],
  },
  {
    book: "zechariah",
    chapter: 14,
    title: "The LORD will be King over all the earth",
    setting:
      "Zechariah's final chapter is apocalyptic, full of vivid images of a last battle for Jerusalem, God standing on the Mount of Olives, a great earthquake, and living water flowing from the city. The earthquake under King Uzziah (v. 5) was remembered for centuries (Amos 1:1). Christians read this chapter in different ways: as literal future events, as a symbolic picture of God's final victory, or a mix of both.",
    words: [
      { v: 9, s: 259, note: "Echad, \"one\" or \"alone\": An echo of the Shema, \"the LORD is one\" (Deuteronomy 6:4). One day every rival claim to worship will be gone." },
      { v: 20, s: 4698, note: "Metsillah, \"bells\": Small bells on horses' harnesses. Words once engraved on the high priest's turban will be on ordinary horse gear." },
    ],
  },
  {
    book: "malachi",
    chapter: 1,
    title: "I have loved you, says the LORD",
    setting:
      "Malachi probably spoke in the mid 400s BC, around Nehemiah's time, when Judah was a small Persian province with its own governor (v. 8). The temple had been rebuilt for decades, but worship had grown tired. The book is a series of arguments: God makes a statement, the people answer \"How?\", and God replies. Edom, descended from Jacob's brother Esau, had by then been driven from its land, probably by Arab peoples.",
    words: [
      { v: 2, s: 157, note: "Ahav, \"loved\": God's opening word is love, before any rebuke. Everything that follows assumes it." },
      { v: 6, s: 959, note: "Bazah, \"despise\": To treat as worthless. The priests did not reject God outright; they just treated His altar as cheap." },
    ],
  },
  {
    book: "malachi",
    chapter: 2,
    title: "Do not break faith",
    setting:
      "Malachi rebukes the priests, descendants of Levi, who were meant to teach God's law faithfully (Numbers 25:12 to 13; Deuteronomy 33:10) but had become careless and partial. He then turns to marriage. Some men had married women who worshiped other gods (compare Nehemiah 13:23 to 27) and had divorced their Jewish wives to do it. In Israel, marriage was a covenant made before God, not only a private arrangement.",
    words: [
      { v: 10, s: 898, note: "Bagad, \"break faith\": To act treacherously, betray a trust. The word appears five times in verses 10 to 16." },
      { v: 14, s: 2278, note: "Chaveret, \"companion\": A partner joined to you. Malachi reminds husbands that the wife of their youth is their partner by covenant, not a disposable possession." },
    ],
  },
  {
    book: "malachi",
    chapter: 4,
    title: "The sun of righteousness will rise",
    setting:
      "In Christian Bibles these are the last words of the Old Testament; in Hebrew Bibles they are the end of Malachi 3, and the Jewish order of books ends with Chronicles. Malachi closes with two calls: remember the law of Moses, and watch for Elijah. Jewish tradition came to hold that prophecy then fell silent, and for roughly four centuries no new prophetic book was added before John the Baptist appeared.",
    words: [
      { v: 2, s: 3671, note: "Kanaph, \"wings\": Also the corner or edge of a garment. Ancient art often showed the sun as a winged disk; here its rays bring healing." },
      { v: 6, s: 7725, note: "Shuv, \"turn\": Elijah will turn hearts of parents and children toward each other. Restoring God's people starts at home." },
    ],
  },
];
