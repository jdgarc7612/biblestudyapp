/**
 * Setting cards (see context-notes.ts for the guardrails), drafted by Claude for Josh's review, Nov 2026.
 * Every Strong's number is checked against the bundled interlinear (tests/context-notes.test.ts).
 */

import type { ContextNote } from "./context-notes";

export const CONTEXT_NOTES_PAUL: ContextNote[] = [
  {
    book: "romans",
    chapter: 2,
    title: "No one escapes by being good",
    setting:
      "After describing the sins of the pagan world in chapter 1, Paul turns to a reader nodding along, likely a moral Jew who trusts in having God's law. Paul says passing judgment on others while doing the same things only stores up wrath. God judges impartially, by the truth, and having the law or circumcision does not help those who break it. What God wants is a heart changed by the Spirit.",
    words: [
      { v: 4, s: 5544, note: "Chrestotes, \"kindness\": goodness that is generous and gentle. God's kindness is meant to lead us to repentance, not to make us comfortable." },
      { v: 29, s: 4061, note: "Peritome, \"circumcision\": the sign of God's covenant with Abraham. Paul says the true sign is a circumcised heart." },
    ],
  },
  {
    book: "romans",
    chapter: 4,
    title: "Abraham, justified by faith",
    setting:
      "Jewish teachers honored Abraham as the father of their nation and a model of faithful obedience. Paul argues from Genesis 15:6 that Abraham was counted righteous by believing God's promise, before he was circumcised and centuries before the law. So he is the father of all who believe, Jews and Gentiles alike. Like Abraham, Christians trust the God who gives life to the dead.",
    words: [
      { v: 3, s: 3049, note: "Logizomai, \"credited\": counted, put to someone's account. It is a bookkeeping word, used eleven times in this chapter." },
      { v: 18, s: 1680, note: "Elpis, \"hope\": confident expectation. Abraham hoped against hope, trusting what God promised over what he could see." },
    ],
  },
  {
    book: "romans",
    chapter: 6,
    title: "Dead to sin, alive to God",
    setting:
      "If grace covers all sin, why not keep sinning? Paul answers: by no means. In baptism believers are joined to Christ's death and resurrection, so the old self has died with Him and they now walk in new life. Slavery was everywhere in the Roman world, and Paul uses it as his picture: we were slaves of sin, now we serve righteousness. Sin pays death; God gives eternal life.",
    words: [
      { v: 4, s: 4916, note: "Synthapto, \"buried with\": to be buried together. Baptism pictures sharing in Christ's burial and rising." },
      { v: 23, s: 3800, note: "Opsonion, \"wages\": a soldier's ration pay. Sin pays exactly what it promises; eternal life is a free gift." },
    ],
  },
  {
    book: "romans",
    chapter: 7,
    title: "The law and the struggle with sin",
    setting:
      "Paul writes to people who know the law, many of them Jewish believers. He says the law is holy and good, but it cannot give life: it shows sin for what it is and even provokes it. Then he describes a painful inner struggle: \"I do not do the good I want.\" Faithful scholars debate whether this \"I\" is Paul as a believer, before conversion, or Israel under the law. The answer is Christ.",
    words: [
      { v: 7, s: 3551, note: "Nomos, \"law\": usually the law of Moses. Paul defends it as holy while showing it cannot save." },
      { v: 24, s: 5005, note: "Talaiporos, \"wretched\": miserable, worn out by hardship. The cry of despair leads straight into thanks to God through Jesus." },
    ],
  },
  {
    book: "romans",
    chapter: 9,
    title: "God's purpose and Israel's unbelief",
    setting:
      "Most of Paul's own people had not believed in their Messiah, and it grieved him deeply. Had God's word failed? Paul answers no: not all descended from Israel are true Israel, and God's choosing has always depended on His mercy, not human effort. This chapter is central in long debates between Calvinists and Arminians about election. Both agree God is just and saving is His work.",
    words: [
      { v: 11, s: 1589, note: "Ekloge, \"election\" or \"choice\". God's purpose works by His choosing, not by what we have done." },
      { v: 16, s: 1653, note: "Eleeo, \"have mercy\". Paul's point throughout is that salvation rests on God's mercy alone." },
    ],
  },
  {
    book: "romans",
    chapter: 10,
    title: "Everyone who calls on the Lord",
    setting:
      "Israel was zealous for God but tried to establish its own righteousness instead of receiving God's. Paul quotes Moses to say the message of faith is near, in your mouth and heart: confess that Jesus is Lord and believe God raised Him. \"Jesus is Lord\" was the first Christian creed, and in Rome, \"Caesar is lord\" was the loyalty oath. Paul then asks how anyone will hear unless someone is sent.",
    words: [
      { v: 9, s: 3670, note: "Homologeo, \"confess\": to say the same thing, to agree openly. It means public allegiance to Jesus as Lord." },
      { v: 17, s: 189, note: "Akoe, \"hearing\" or \"message\". Faith comes from hearing the word about Christ, so it must be preached." },
    ],
  },
  {
    book: "romans",
    chapter: 11,
    title: "The olive tree and God's mercy",
    setting:
      "Has God rejected Israel? No: a remnant believes, Paul among them. He pictures Israel as an olive tree, a common symbol of God's people. Some branches were broken off for unbelief, and Gentiles were grafted in by faith, so they must not boast. God can graft Israel back in. Interpreters differ on what \"all Israel will be saved\" means. Paul ends in awe at God's wisdom.",
    words: [
      { v: 17, s: 1461, note: "Enkentrizo, \"grafted in\". Gentile believers are wild branches given a share in Israel's rich root." },
      { v: 33, s: 899, note: "Bathos, \"depth\". After eleven chapters of doctrine, Paul runs out of explanation and breaks into praise." },
    ],
  },
  {
    book: "romans",
    chapter: 13,
    title: "Living under authority and in love",
    setting:
      "Paul writes to Christians in the capital of the empire under Emperor Nero, early in his reign. He tells them to respect governing authorities as God's servants for order and to pay their taxes. Christians have long discussed how this fits with obeying God rather than people when the two clash. Paul then sums up the law in love, and urges them to wake up and live as people of the coming day.",
    words: [
      { v: 1, s: 5293, note: "Hypotasso, \"submit\": to place yourself under, in an ordered arrangement. Respect for authority flows from trust in God's rule." },
      { v: 10, s: 4138, note: "Pleroma, \"fulfillment\": the full measure. Love does what all the commandments were aiming at." },
    ],
  },
  {
    book: "romans",
    chapter: 14,
    title: "Welcoming one another",
    setting:
      "The Roman church mixed Jewish and Gentile believers who disagreed about food laws and holy days. Some ate only vegetables, likely to avoid meat offered to idols or not kosher. Others ate anything. Paul calls the cautious \"weak\" and the free \"strong\", but tells both to stop judging each other, since each serves the same Lord. The strong should give up their freedom rather than cause a brother to stumble.",
    words: [
      { v: 1, s: 4355, note: "Proslambano, \"accept\" or \"welcome\": to receive into your company. Paul says to welcome each other as Christ welcomed us (15:7)." },
      { v: 13, s: 4625, note: "Skandalon, \"stumbling block\": a trap or snare. Love limits liberty for another's sake." },
    ],
  },
  {
    book: "romans",
    chapter: 15,
    title: "One voice, and Paul's travel plans",
    setting:
      "Paul calls the strong to bear with the weak, following Christ, who did not please Himself. He strings together Old Testament verses showing God always meant Gentiles to praise Him alongside Israel. Then he shares his plans: he has preached from Jerusalem to Illyricum, will carry a gift from Gentile churches to poor believers in Jerusalem, and hopes to visit Rome on the way to Spain.",
    words: [
      { v: 13, s: 1680, note: "Elpis, \"hope\": confident expectation. Paul prays the God of hope will fill them so they overflow with it." },
      { v: 26, s: 2842, note: "Koinonia, \"contribution\": fellowship, sharing. The collection was a gift and a sign of unity between Gentile and Jewish believers." },
    ],
  },
  {
    book: "romans",
    chapter: 16,
    title: "Greetings to a church family",
    setting:
      "Paul greets more than twenty-five people by name. They include women and men, Jews and Gentiles, likely slaves and freedmen, meeting in several house churches across Rome. Phoebe, a deacon of the church at Cenchreae, likely carried the letter. Priscilla and Aquila had risked their lives for him. Paul warns against those who cause divisions and ends with praise to the only wise God.",
    words: [
      { v: 1, s: 1249, note: "Diakonos, \"servant\" or \"deacon\". Scholars discuss whether Phoebe held an office; all agree Paul honors her ministry." },
      { v: 3, s: 4904, note: "Synergos, \"fellow worker\": a co-laborer. Paul saw the gospel as shared work with many partners." },
    ],
  },
  {
    book: "1corinthians",
    chapter: 1,
    title: "A divided church and the message of the cross",
    setting:
      "Corinth was a wealthy, boastful port city, rebuilt as a Roman colony. Paul founded the church there around AD 50 and writes a few years later from Ephesus. The believers were splitting into fan clubs around Paul, Apollos and Peter. Paul says Christ is not divided. Greeks prized clever speech and Jews wanted signs, but God saves through the message of a crucified Messiah, which looks like foolishness.",
    words: [
      { v: 10, s: 4978, note: "Schisma, \"divisions\": a tear or split, like a rip in cloth. The church was being torn by loyalty to leaders." },
      { v: 18, s: 3472, note: "Moria, \"foolishness\": the root of \"moron\". To the world a crucified Savior sounded absurd; it is God's power." },
    ],
  },
  {
    book: "1corinthians",
    chapter: 2,
    title: "Wisdom from the Spirit",
    setting:
      "Paul reminds the Corinthians that he did not come with polished speeches, as traveling orators did to win fees and fame. He came in weakness, preaching Christ crucified, so their faith would rest on God's power. Yet there is a true wisdom, hidden from the rulers of this age, which God reveals by His Spirit. Only the Spirit knows the thoughts of God, and believers have the mind of Christ.",
    words: [
      { v: 4, s: 585, note: "Apodeixis, \"demonstration\": a proof, an orator's technical term. The Spirit's power, not rhetoric, proved Paul's message." },
      { v: 14, s: 5591, note: "Psychikos, \"natural\" or \"unspiritual\": a person without the Spirit. Such a person cannot welcome the things of God." },
    ],
  },
  {
    book: "1corinthians",
    chapter: 3,
    title: "God's field, God's building, God's temple",
    setting:
      "The Corinthians thought themselves spiritual, but their jealousy and quarrels showed they were still immature. Paul says leaders are only servants: he planted, Apollos watered, God gave the growth. The church is God's building, and Christ is its only foundation. Each worker's work will be tested by fire. Then Paul says the church together is God's temple, where His Spirit lives, so anyone who destroys it faces God.",
    words: [
      { v: 1, s: 3516, note: "Nepios, \"infants\": little children not ready for solid food. Their pride in wisdom proved how young they still were." },
      { v: 16, s: 3485, note: "Naos, \"temple\": the sanctuary where God dwells. Here \"you\" is plural: the church together is God's dwelling." },
    ],
  },
  {
    book: "1corinthians",
    chapter: 4,
    title: "Servants and fools for Christ",
    setting:
      "The Corinthians were judging and ranking their leaders. Paul says apostles are servants and stewards, answerable to God, who alone will judge the heart. Then he turns to sharp irony: the Corinthians act as if they already reign as kings, while the apostles are like condemned prisoners paraded at the end of a Roman victory march. He writes as a father, sending Timothy and urging them to imitate him.",
    words: [
      { v: 1, s: 3623, note: "Oikonomos, \"steward\": a household manager, often a slave, entrusted with the master's goods. Faithfulness is what matters." },
      { v: 9, s: 2302, note: "Theatron, \"spectacle\": a theater show. The apostles are like condemned men put on display in the arena." },
    ],
  },
  {
    book: "1corinthians",
    chapter: 5,
    title: "Sin the church ignored",
    setting:
      "A man in the church was living with his father's wife, a sin even pagan Romans condemned. The Corinthians were proud of their tolerance. Paul tells them to remove him from their fellowship, hoping it will lead to his salvation. He uses a Passover picture: as Jews cleared every bit of yeast from their homes before the feast, the church must clear out sin, because Christ our Passover lamb has been sacrificed.",
    words: [
      { v: 6, s: 2219, note: "Zyme, \"yeast\" or \"leaven\". A little works through the whole batch of dough, as unchecked sin spreads in a church." },
      { v: 7, s: 3957, note: "Pascha, \"Passover\": the feast remembering Israel's rescue by the lamb's blood. Christ is the true Lamb." },
    ],
  },
  {
    book: "1corinthians",
    chapter: 6,
    title: "Lawsuits and bodies that belong to God",
    setting:
      "Corinthian believers were suing each other in pagan courts, airing church quarrels before unbelieving judges. Paul says it would be better to be wronged. Some were also visiting prostitutes and saying \"everything is permissible\", since the body did not matter. Paul answers that the body is for the Lord, will be raised, and is a temple of the Holy Spirit. They were bought at a price.",
    words: [
      { v: 11, s: 628, note: "Apolouo, \"washed\": thoroughly cleansed. \"Such were some of you\": the gospel changes people with real pasts." },
      { v: 20, s: 59, note: "Agorazo, \"bought\": purchased in the marketplace, as slaves were. Christ paid for us; we belong to Him." },
    ],
  },
  {
    book: "1corinthians",
    chapter: 7,
    title: "Marriage, singleness and calling",
    setting:
      "Paul answers questions the Corinthians had written to him. Some, perhaps reacting against immorality, thought married couples should abstain. Paul affirms marriage and its physical intimacy, gives guidance on divorce, and commends singleness as a gift that frees a person to serve the Lord. Readers differ on how some parts apply today. He also says to serve God faithfully in whatever situation you were called.",
    words: [
      { v: 7, s: 5486, note: "Charisma, \"gift\". Both marriage and singleness are gifts of God's grace, given differently." },
      { v: 35, s: 563, note: "Aperispastos, \"undivided\": without distraction, not pulled in different directions. Paul wants hearts free to serve the Lord." },
    ],
  },
  {
    book: "1corinthians",
    chapter: 8,
    title: "Knowledge, love and food offered to idols",
    setting:
      "In Corinth most meat sold in the market had been offered to an idol first, and social and trade gatherings often took place in temple dining rooms. Some believers knew idols are nothing and ate freely. Others, fresh from idolatry, were troubled. Paul agrees there is only one God and one Lord, but says knowledge puffs up while love builds up. Do not let your freedom wound a weaker believer.",
    words: [
      { v: 1, s: 3618, note: "Oikodomeo, \"builds up\": to build a house. Love strengthens others; knowledge alone can make us proud." },
      { v: 6, s: 2962, note: "Kyrios, \"Lord\". Paul takes the Shema, Israel's confession of one God, and includes Jesus Christ within it." },
    ],
  },
  {
    book: "1corinthians",
    chapter: 9,
    title: "Giving up rights for the gospel",
    setting:
      "Paul gives himself as an example of setting aside freedom. As an apostle he had a right to be paid, but he worked with his hands so no one could say he preached for money. He becomes all things to all people to win some. Corinth hosted the Isthmian Games, second only to the Olympics, so he uses athletes as his picture: they train hard for a wreath that withers.",
    words: [
      { v: 22, s: 4982, note: "Sozo, \"save\". Paul adapts his ways, never his message, so that more people will be saved." },
      { v: 25, s: 4735, note: "Stephanos, \"crown\": the victor's wreath. At the Isthmian Games it was made of pine or wilted celery." },
    ],
  },
  {
    book: "1corinthians",
    chapter: 10,
    title: "Warnings from Israel's wilderness",
    setting:
      "Israel was rescued from Egypt, fed with manna and given water from the rock, yet many fell into idolatry and died in the wilderness. Paul says these things were written as warnings for us. Some Corinthians thought they could share pagan temple feasts and the Lord's table. Paul says you cannot do both. Yet God is faithful and always provides a way out of temptation. Do everything for God's glory.",
    words: [
      { v: 13, s: 3986, note: "Peirasmos, \"temptation\" or \"testing\". God limits the test and provides a way through." },
      { v: 16, s: 2842, note: "Koinonia, \"participation\": sharing, communion. At the Lord's table believers share in Christ's body and blood." },
    ],
  },
  {
    book: "1corinthians",
    chapter: 11,
    title: "Worship and the Lord's Supper",
    setting:
      "Paul addresses two problems in Corinthian worship. First, head coverings in prayer, tied to customs about honor and shame between men and women; Christians read how this applies today in different ways. Second, the Lord's Supper was eaten as part of a shared meal, and the wealthy ate first while poorer members, likely slaves who came late, went hungry. Paul hands on Jesus' own words at the Supper.",
    words: [
      { v: 23, s: 3880, note: "Paralambano, \"received\": the term for passing on a sacred tradition. Paul's account of the Supper is among the earliest written records about Jesus." },
      { v: 26, s: 2605, note: "Katangello, \"proclaim\". Every time the church eats and drinks, it preaches Christ's death until He comes." },
    ],
  },
  {
    book: "1corinthians",
    chapter: 12,
    title: "One body, many gifts",
    setting:
      "The Corinthians prized dramatic gifts, especially speaking in tongues, and some felt superior while others felt they did not belong. Paul says every gift comes from the same Spirit for the common good. He uses a picture ancient writers also used for society: the body. Every part is needed, even the weak and unseen. Christians differ on whether some gifts continue today; all agree the Spirit gives every believer a part.",
    words: [
      { v: 7, s: 5321, note: "Phanerosis, \"manifestation\": a making visible. Each gift shows the Spirit at work for others' good." },
      { v: 13, s: 4983, note: "Soma, \"body\". By one Spirit all believers, Jew or Greek, slave or free, were made one body." },
    ],
  },
  {
    book: "1corinthians",
    chapter: 14,
    title: "Gifts that build up the church",
    setting:
      "Paul continues on spiritual gifts, comparing tongues with prophecy. Tongues spoken without interpretation do not help the church, because no one understands. Prophecy, speaking God's message in an understandable way, builds others up. Worship should be orderly, since God is a God of peace. Verses 34 and 35, about women keeping silent, are read quite differently by faithful Christians. Paul's aim is clear: everything for building up.",
    words: [
      { v: 3, s: 3619, note: "Oikodome, \"strengthening\": building up, like a house. It is Paul's test for every gift in worship." },
      { v: 33, s: 181, note: "Akatastasia, \"disorder\": confusion, unrest. God's character shapes how His people worship." },
    ],
  },
  {
    book: "1corinthians",
    chapter: 16,
    title: "The collection and final words",
    setting:
      "Paul gives instructions for the collection for poor believers in Jerusalem, set aside on the first day of each week, likely the day Christians gathered. He shares his travel plans and commends Timothy and Apollos. He tells them to stand firm and do everything in love. He signs with his own hand and adds an Aramaic prayer from the earliest church: Marana tha, \"Come, Lord!\"",
    words: [
      { v: 13, s: 1127, note: "Gregoreo, \"be on guard\": stay awake, alert. Paul's closing commands are military: watch, stand, be strong." },
      { v: 22, s: 3134, note: "Marana tha: Aramaic for \"Come, our Lord!\" Early believers prayed in Jesus' own language for His return." },
    ],
  },
  {
    book: "2corinthians",
    chapter: 1,
    title: "The God of all comfort",
    setting:
      "Between 1 and 2 Corinthians, Paul made a painful visit to Corinth and wrote a severe letter. Some there now questioned his honesty because he changed his travel plans. He opens by praising the God who comforts us in all our troubles, after a crisis in Asia so severe he despaired of life. He explains he stayed away to spare them, and that God's promises are all \"Yes\" in Christ.",
    words: [
      { v: 3, s: 3874, note: "Paraklesis, \"comfort\": encouragement from someone called alongside. God comforts us so we can comfort others." },
      { v: 22, s: 728, note: "Arrabon, \"pledge\" or \"deposit\": a down payment guaranteeing the rest. The Spirit is God's first installment of what is to come." },
    ],
  },
  {
    book: "2corinthians",
    chapter: 2,
    title: "Forgiveness and the aroma of Christ",
    setting:
      "Paul's severe letter had led the church to discipline a man who wronged him, perhaps publicly opposing him. Now Paul urges them to forgive and comfort the man so he is not overwhelmed, and so Satan cannot take advantage. Then he pictures a Roman triumph, a victory parade where incense filled the streets: God leads His people in Christ's triumphal procession, spreading the fragrance of knowing Him everywhere.",
    words: [
      { v: 14, s: 2358, note: "Thriambeuo, \"lead in triumph\": the Roman general's victory parade. Paul sees himself as a captive gladly displaying his Conqueror." },
      { v: 15, s: 2175, note: "Euodia, \"aroma\": a sweet smell, used of sacrifices pleasing to God. Believers carry the fragrance of Christ." },
    ],
  },
  {
    book: "2corinthians",
    chapter: 3,
    title: "Glory of the new covenant",
    setting:
      "Rival teachers came to Corinth carrying letters of recommendation and stressing the law of Moses. Paul says the Corinthians themselves are his letter, written by the Spirit on hearts. He contrasts the old covenant, written on stone and fading in glory like the light on Moses' face, with the new covenant of the Spirit, whose glory lasts. Believers see the Lord's glory and are transformed into His image.",
    words: [
      { v: 6, s: 2537, note: "Kainos, \"new\": new in kind. The new covenant promised in Jeremiah 31 is now here in Christ." },
      { v: 18, s: 3339, note: "Metamorphoo, \"transformed\": the word used for Jesus' transfiguration. Believers are being changed, little by little, into His likeness." },
    ],
  },
  {
    book: "2corinthians",
    chapter: 4,
    title: "Treasure in jars of clay",
    setting:
      "Paul faced criticism that he was unimpressive and suffered too much to be a real apostle. He answers that the gospel's light shines from God, not from the messenger. The treasure is kept in clay jars, cheap pottery used every day, so the power is plainly God's. He is pressed but not crushed, struck down but not destroyed. Outwardly wasting away, inwardly being renewed, he fixes his eyes on the unseen.",
    words: [
      { v: 7, s: 3749, note: "Ostrakinos, \"clay\": made of earthenware, fragile and ordinary. God puts His glory in weak people on purpose." },
      { v: 17, s: 922, note: "Baros, \"weight\": heaviness. Present troubles are light next to the eternal weight of glory they are producing." },
    ],
  },
  {
    book: "2corinthians",
    chapter: 6,
    title: "Now is the day of salvation",
    setting:
      "Paul urges the Corinthians not to receive God's grace in vain, because now is the day of salvation. He lists what his ministry has cost: beatings, prisons, riots, sleepless nights, hunger, yet always rejoicing. He opens his heart and asks them to open theirs. Then he warns them not to be bound together with unbelievers in ways that compromise their faith, likely including the city's idol worship.",
    words: [
      { v: 2, s: 2144, note: "Euprosdektos, \"favorable\": welcome, acceptable. Paul quotes Isaiah 49:8: the time God promised is now." },
      { v: 14, s: 2086, note: "Heterozygeo, \"yoked together\" with a different kind. The law forbade yoking an ox and a donkey together (Deuteronomy 22:10)." },
    ],
  },
  {
    book: "2corinthians",
    chapter: 7,
    title: "Godly sorrow",
    setting:
      "Paul had been anxious, waiting in Macedonia for news of how the church received his severe letter. Titus finally arrived with good news: they had repented and longed to see Paul. Paul rejoices. He distinguishes godly sorrow, which leads to repentance and salvation without regret, from worldly sorrow, which leads only to death. Earlier in the chapter he calls them to cleanse themselves out of reverence for God.",
    words: [
      { v: 6, s: 3870, note: "Parakaleo, \"comforts\": to encourage, come alongside. God comforted Paul through Titus's arrival." },
      { v: 10, s: 3077, note: "Lype, \"sorrow\": grief, pain. The same sorrow can lead toward God or away from Him." },
    ],
  },
  {
    book: "2corinthians",
    chapter: 8,
    title: "The grace of giving",
    setting:
      "Paul is collecting money from Gentile churches for poor believers in Jerusalem. He points to the Macedonian churches, poor and persecuted, who begged for the privilege of giving. The Corinthians had started a year earlier but stalled. Paul does not command; he points to Christ, who was rich yet became poor for our sakes. He also explains how the money will be handled honestly by trusted men.",
    words: [
      { v: 7, s: 5485, note: "Charis, \"grace\": the chapter's key word. Generous giving is itself a gift of God's grace." },
      { v: 9, s: 4433, note: "Ptocheuo, \"became poor\": to become a beggar. The Son left heaven's riches so we could share them." },
    ],
  },
  {
    book: "2corinthians",
    chapter: 9,
    title: "God loves a cheerful giver",
    setting:
      "Paul continues about the collection. He has boasted about the Corinthians' eagerness and does not want them embarrassed if Macedonians come along and find them unprepared. He uses a farming picture: whoever sows generously will reap generously. Giving should be from the heart, not under pressure. God supplies seed and bread, and generosity overflows into thanks to God and unity between churches.",
    words: [
      { v: 7, s: 2431, note: "Hilaros, \"cheerful\": glad, gracious. Our word \"hilarious\" comes from it, though here it means a ready, joyful heart." },
      { v: 15, s: 1431, note: "Dorea, \"gift\": a free present. Paul ends with God's indescribable gift, His Son." },
    ],
  },
  {
    book: "2corinthians",
    chapter: 10,
    title: "Weapons not of this world",
    setting:
      "The final chapters change tone sharply; some scholars think they were a separate letter. Paul confronts rivals in Corinth who called him bold in letters but weak in person and judged him by worldly standards. He says his weapons are not worldly but have divine power to tear down strongholds and take every thought captive to Christ. He will boast only in the Lord.",
    words: [
      { v: 4, s: 3794, note: "Ochyroma, \"stronghold\": a fortress. Proud arguments against God are like walled cities the gospel can overthrow." },
      { v: 5, s: 163, note: "Aichmalotizo, \"take captive\": to capture in war. Every thought is brought under Christ's command." },
    ],
  },
  {
    book: "2corinthians",
    chapter: 11,
    title: "Paul's foolish boasting",
    setting:
      "Paul calls his rivals \"super-apostles\": eloquent, paid and boastful, preaching another Jesus. He fears the church is being led astray as Eve was. Reluctantly, playing the fool, he boasts, but not in achievements. He lists his sufferings: shipwrecks, beatings, lashes, a stoning, dangers everywhere, and daily concern for the churches. He ends with an embarrassing escape from Damascus in a basket.",
    words: [
      { v: 2, s: 2205, note: "Zelos, \"jealousy\": burning zeal. Paul feels a godly jealousy, like a father protecting his daughter's engagement." },
      { v: 30, s: 769, note: "Astheneia, \"weakness\". Paul boasts in what shows his weakness, because that is where Christ's power shows." },
    ],
  },
  {
    book: "2corinthians",
    chapter: 12,
    title: "Power in weakness",
    setting:
      "Paul tells of a vision fourteen years earlier, when he was caught up into paradise, though he speaks of it as if about another man. To keep him from pride, he was given a thorn in the flesh. No one knows what it was: perhaps an illness, poor eyesight or persecution. He pleaded three times for its removal. The Lord answered, \"My grace is sufficient for you, for My power is perfected in weakness.\"",
    words: [
      { v: 7, s: 4647, note: "Skolops, \"thorn\": a sharp stake. Whatever it was, it hurt and humbled him." },
      { v: 9, s: 714, note: "Arkeo, \"sufficient\": enough. Grace did not remove the thorn; it proved enough to carry it." },
    ],
  },
  {
    book: "2corinthians",
    chapter: 13,
    title: "Examine yourselves",
    setting:
      "Paul plans a third visit to Corinth and warns that he will not spare those who keep sinning. Some demanded proof that Christ spoke through him. Paul turns the question around: examine yourselves to see whether you are in the faith. He prays they will be restored. The letter closes with one of the clearest blessings naming the Father, Son and Holy Spirit together.",
    words: [
      { v: 5, s: 3985, note: "Peirazo, \"examine\": to test. The Corinthians were busy testing Paul; he urges them to test themselves." },
      { v: 14, s: 2842, note: "Koinonia, \"fellowship\": sharing, communion. The Spirit draws believers into shared life with God and each other." },
    ],
  },
  {
    book: "galatians",
    chapter: 1,
    title: "No other gospel",
    setting:
      "Paul planted churches in the Roman province of Galatia, in what is now central Turkey. After he left, teachers arrived saying Gentile believers must be circumcised and keep the law of Moses to be fully accepted. Paul skips his usual thanksgiving and writes in alarm: there is no other gospel. He received his message from Jesus Christ by revelation, not from any human, as his own dramatic conversion shows.",
    words: [
      { v: 6, s: 3346, note: "Metatithemi, \"deserting\": to change sides, like a soldier going over to the enemy. Turning from grace is turning from God." },
      { v: 8, s: 331, note: "Anathema, \"accursed\": devoted to destruction. Paul includes himself and angels: the message matters more than the messenger." },
    ],
  },
  {
    book: "galatians",
    chapter: 2,
    title: "Justified by faith, not by works of the law",
    setting:
      "Paul tells how the Jerusalem apostles accepted his gospel and did not require Titus, a Greek, to be circumcised. Later in Antioch Peter stopped eating with Gentile believers out of fear of a strict Jewish group, and Paul opposed him publicly. Table fellowship was the test: are Gentiles full family? Paul says we are justified by faith in Christ, not by works of the law. \"I have been crucified with Christ.\"",
    words: [
      { v: 16, s: 1344, note: "Dikaioo, \"justified\": declared right with God. It appears three times in this one verse." },
      { v: 20, s: 4957, note: "Systauroo, \"crucified with\": to be crucified together. In Christ the old self died, and Christ now lives in the believer." },
    ],
  },
  {
    book: "galatians",
    chapter: 3,
    title: "Children of Abraham through faith",
    setting:
      "Paul asks the Galatians whether they received the Spirit by keeping the law or by believing. He goes back to Abraham, who believed God and was counted righteous, and to God's promise that all nations would be blessed through him. The law, given 430 years later, could not cancel that promise. It acted like a guardian until Christ came. Now all who belong to Christ are Abraham's offspring.",
    words: [
      { v: 13, s: 1805, note: "Exagorazo, \"redeemed\": bought out of the marketplace. Christ freed us from the law's curse by becoming a curse for us." },
      { v: 24, s: 3807, note: "Paidagogos, \"guardian\": a slave who escorted a child to school and kept him in line, until the child came of age." },
    ],
  },
  {
    book: "galatians",
    chapter: 4,
    title: "Sons, not slaves",
    setting:
      "In the Roman world, a young heir was under guardians until the date his father set. Paul says God's people were like that until the time had fully come, when God sent His Son, born of a woman, born under the law, to redeem them and adopt them as sons. The Spirit cries \"Abba, Father\" in their hearts. Paul pleads with the Galatians and uses Hagar and Sarah as a picture of slavery and freedom.",
    words: [
      { v: 4, s: 4138, note: "Pleroma, \"fullness\": completion. God sent His Son at exactly the right moment in history." },
      { v: 5, s: 5206, note: "Huiothesia, \"adoption\": the legal act of placing someone as a son with full rights of inheritance." },
    ],
  },
  {
    book: "galatians",
    chapter: 6,
    title: "Bear one another's burdens",
    setting:
      "Paul gives practical counsel: restore a fellow believer who falls, gently; carry each other's heavy loads; share good things with those who teach; do not grow weary of doing good. You reap what you sow. He takes the pen to write the ending in large letters with his own hand, a personal signature against forgery. He will boast only in the cross. What counts is a new creation.",
    words: [
      { v: 2, s: 922, note: "Baros, \"burdens\": heavy weights. Helping carry them fulfills the law of Christ, His command to love." },
      { v: 15, s: 2937, note: "Ktisis, \"creation\". In Christ God is making a new world, and each believer is part of it." },
    ],
  },
  {
    book: "ephesians",
    chapter: 1,
    title: "Every spiritual blessing in Christ",
    setting:
      "Ephesus was a major city in Asia, home to the great temple of Artemis and a center of magic. Paul writes from prison, probably in Rome around AD 60, perhaps as a circular letter for several churches. Verses 3 to 14 are one long sentence in Greek, overflowing with praise: the Father chose and adopted us, the Son redeemed us by His blood, the Spirit seals us. Then Paul prays they will know God's power.",
    words: [
      { v: 4, s: 1586, note: "Eklegomai, \"chose\": to pick out for oneself. Paul praises God's choosing; Christians discuss how it relates to human choice." },
      { v: 13, s: 4972, note: "Sphragizo, \"sealed\": marked with a seal showing ownership and protection. The Spirit is God's mark on His people." },
    ],
  },
  {
    book: "ephesians",
    chapter: 3,
    title: "The mystery revealed",
    setting:
      "Paul calls himself a prisoner for the sake of the Gentiles. He explains a mystery, something hidden in past ages but now revealed: Gentiles are fellow heirs with Israel, members of the same body, sharing the promise in Christ. Through the church God displays His wisdom even to heavenly powers. Paul kneels and prays they will grasp how wide, long, high and deep Christ's love is.",
    words: [
      { v: 6, s: 4789, note: "Synkleronomos, \"fellow heirs\": co-inheritors. Gentile believers share equally in the inheritance once promised to Israel." },
      { v: 19, s: 1097, note: "Ginosko, \"know\": to know by experience. Paul prays they will know a love that goes beyond knowledge." },
    ],
  },
  {
    book: "ephesians",
    chapter: 4,
    title: "One body, growing up together",
    setting:
      "Having explained what God has done in chapters 1 to 3, Paul turns to how to live in response. He urges unity: one body, one Spirit, one hope, one Lord, one faith, one baptism, one God. The risen Christ gives leaders to equip all His people for ministry until the church matures. Then Paul calls them to take off the old way of life like dirty clothes and put on the new.",
    words: [
      { v: 1, s: 516, note: "Axios, \"worthy\": with equal weight, like a balanced scale. A life that matches the calling God has given." },
      { v: 12, s: 2677, note: "Katartismos, \"equipping\": preparing, mending. The same root is used for mending nets. Leaders equip believers to serve." },
    ],
  },
  {
    book: "ephesians",
    chapter: 5,
    title: "Walk in love and light",
    setting:
      "Paul calls believers to imitate God as dearly loved children. In a city known for sexual immorality and drunken religious festivals, he says to walk as children of light and be filled with the Spirit instead of wine. Then he turns to marriage. Wives are to submit to their husbands and husbands to love their wives as Christ loved the church. Christians differ on how this applies; all see marriage as a picture of Christ.",
    words: [
      { v: 18, s: 4137, note: "Pleroo, \"be filled\": keep on being filled. The Spirit, not wine, should shape your life." },
      { v: 32, s: 3466, note: "Mysterion, \"mystery\": a truth once hidden, now revealed. Marriage points to Christ's union with His church." },
    ],
  },
  {
    book: "ephesians",
    chapter: 6,
    title: "The armor of God",
    setting:
      "Paul gives instructions for households: children and parents, slaves and masters. Slavery was woven into Roman society, and Paul does not endorse it but reminds masters they too have a Master in heaven. Then he says our real battle is against spiritual forces of evil. Likely chained to a Roman soldier as he wrote, he describes God's armor piece by piece: truth, righteousness, the gospel, faith, salvation and God's word.",
    words: [
      { v: 11, s: 3833, note: "Panoplia, \"full armor\": the complete equipment of a heavy-armed soldier. It is God's armor, given to His people." },
      { v: 17, s: 3162, note: "Machaira, \"sword\": the short sword used in close combat. The Spirit's sword is the word of God." },
    ],
  },
  {
    book: "philippians",
    chapter: 1,
    title: "Joy in chains",
    setting:
      "Philippi was a Roman colony in Macedonia, proud of its Roman citizenship. Its church, which began with Lydia and a jailer (Acts 16), had supported Paul generously. He writes from prison, likely in Rome, and the letter is full of joy. His chains have advanced the gospel, since the whole palace guard knows why he is there. For him, to live is Christ and to die is gain.",
    words: [
      { v: 6, s: 2041, note: "Ergon, \"work\". God began a good work in them and will finish it. Their salvation rests on His faithfulness." },
      { v: 27, s: 4176, note: "Politeuomai, \"conduct yourselves\": to live as a citizen. They were proud Roman citizens, but their true citizenship is heaven's." },
    ],
  },
  {
    book: "philippians",
    chapter: 3,
    title: "Knowing Christ",
    setting:
      "Paul warns against teachers who insist on circumcision. If anyone could boast in religious credentials, he could: circumcised on the eighth day, a Hebrew of Hebrews, a Pharisee, blameless under the law. But he counts all of it as loss compared with knowing Christ and having a righteousness that comes from God through faith. He presses on like a runner toward the finish. Our citizenship is in heaven.",
    words: [
      { v: 8, s: 4657, note: "Skybalon, \"rubbish\" or \"dung\": refuse thrown to the dogs. Paul uses a deliberately strong word for his old credentials." },
      { v: 14, s: 4649, note: "Skopos, \"goal\": the mark a runner fixes his eyes on. Paul strains forward toward Christ." },
    ],
  },
  {
    book: "philippians",
    chapter: 4,
    title: "Rejoice, and do not be anxious",
    setting:
      "Paul urges two women in the church, Euodia and Syntyche, to agree in the Lord. Then he gives a string of commands: rejoice always, let your gentleness be known, do not be anxious but pray about everything. God's peace will guard their hearts. He thanks them for their gift, brought by Epaphroditus, and says he has learned to be content in any situation through Christ who strengthens him.",
    words: [
      { v: 7, s: 5432, note: "Phroureo, \"guard\": to keep watch like a military garrison. Philippi had Roman soldiers stationed there; God's peace stands guard." },
      { v: 11, s: 842, note: "Autarkes, \"content\": self-sufficient, a Stoic ideal. For Paul it means Christ-sufficient." },
    ],
  },
  {
    book: "colossians",
    chapter: 2,
    title: "Complete in Christ",
    setting:
      "Colossae was a small town in the Lycus Valley, in what is now Turkey. Its church was started by Epaphras, not Paul. Some there were adding to the gospel: special knowledge, Jewish food and festival rules, harsh treatment of the body and worship of angels. Paul says all the fullness of God dwells bodily in Christ, and believers have everything in Him. At the cross He cancelled their debt and disarmed the powers.",
    words: [
      { v: 9, s: 2320, note: "Theotes, \"Deity\": the very nature of God. All of it lives in Christ in bodily form." },
      { v: 14, s: 5498, note: "Cheirographon, \"record of debt\": a handwritten IOU. God nailed ours to the cross, paid in full." },
    ],
  },
  {
    book: "colossians",
    chapter: 3,
    title: "Set your minds on things above",
    setting:
      "Since believers have been raised with Christ, Paul says to seek things above, where Christ is. Put to death the old sins and take off the old self like clothing. Put on compassion, kindness, humility, gentleness and patience, and above all love. In Christ there is no Greek or Jew, slave or free. Paul gives household instructions and reminds slaves that they serve the Lord Christ.",
    words: [
      { v: 3, s: 2928, note: "Krypto, \"hidden\": concealed and kept safe. Your life is hidden with Christ in God, secure until He appears." },
      { v: 15, s: 1018, note: "Brabeuo, \"rule\": to act as umpire. Let Christ's peace be the referee in your hearts." },
    ],
  },
  {
    book: "colossians",
    chapter: 4,
    title: "Prayer, wise words and faithful friends",
    setting:
      "Paul asks the Colossians to devote themselves to prayer and to pray that God opens a door for the gospel while he is in chains. He tells them to act wisely toward outsiders and let their speech be gracious, seasoned with salt. Then he sends greetings from a team of coworkers: Tychicus, Onesimus, Mark, Luke the doctor, Demas and Epaphras, who wrestles in prayer for them.",
    words: [
      { v: 5, s: 1805, note: "Exagorazo, \"making the most\": buying up. Seize every opportunity, as a merchant buys up goods." },
      { v: 6, s: 217, note: "Halas, \"salt\": it gave flavor and preserved food. Gracious speech is attractive and wholesome." },
    ],
  },
  {
    book: "1thessalonians",
    chapter: 1,
    title: "A church that became an example",
    setting:
      "Thessalonica was the capital of Macedonia, on the main Roman highway. Paul planted the church in only a few weeks before being run out of town (Acts 17), around AD 50. This is probably one of his earliest letters. He thanks God that they welcomed the message with joy despite suffering, turned from idols to serve the living and true God, and now wait for His Son from heaven.",
    words: [
      { v: 3, s: 2873, note: "Kopos, \"labor\": hard, wearying work. Their love was not just a feeling; it showed in exhausting service." },
      { v: 9, s: 1994, note: "Epistrepho, \"turned\": to turn around. Conversion means turning toward God and away from idols." },
    ],
  },
  {
    book: "1thessalonians",
    chapter: 2,
    title: "Gentle as a nursing mother",
    setting:
      "Critics in Thessalonica were saying Paul was just another traveling teacher out for money and fame, who fled when trouble came. Paul answers by reminding them how he lived among them. He worked night and day so as not to burden them, was gentle like a nursing mother and encouraging like a father. They received the message as the word of God. He longed to see them again.",
    words: [
      { v: 7, s: 5162, note: "Trophos, \"nursing mother\": one who feeds and cares for children. Paul's leadership was tender, not domineering." },
      { v: 13, s: 1754, note: "Energeo, \"at work\": active, effective. God's word keeps working in those who believe it." },
    ],
  },
  {
    book: "1thessalonians",
    chapter: 3,
    title: "Timothy's good news",
    setting:
      "Paul worried that persecution might have shaken the young church, so he sent Timothy back to strengthen them. Timothy has now returned with good news: they are standing firm in faith and love, and they long to see Paul. Paul is overjoyed and says, \"Now we really live.\" He prays that God will make their love increase and strengthen their hearts to be blameless when Jesus comes.",
    words: [
      { v: 3, s: 4525, note: "Saino, \"unsettled\" or \"shaken\": a word for a dog wagging its tail, hence swayed or fawned over. Trouble should not move them." },
      { v: 13, s: 4741, note: "Sterizo, \"strengthen\": to make firm. Paul prays their hearts will stand firm until Christ returns." },
    ],
  },
  {
    book: "1thessalonians",
    chapter: 5,
    title: "Children of the day",
    setting:
      "The believers wondered when the Lord would return. Paul says the day of the Lord will come like a thief in the night, unexpected. But they are children of the light, so they should be awake and sober, wearing faith, love and hope as armor. Then Paul gives quick commands for church life: respect leaders, encourage the weak, rejoice always, pray continually, give thanks in everything and test everything.",
    words: [
      { v: 2, s: 2812, note: "Kleptes, \"thief\": one who comes without warning. The point is readiness, not calculating a date." },
      { v: 17, s: 89, note: "Adialeiptos, \"without ceasing\": unceasingly, like a persistent cough. Prayer becomes a constant attitude of dependence." },
    ],
  },
  {
    book: "2thessalonians",
    chapter: 1,
    title: "Endurance in persecution",
    setting:
      "Paul writes again, likely a few months after 1 Thessalonians, because persecution in Thessalonica has continued. He is proud of their growing faith and love and their endurance. He reassures them that God is just: those who afflict them will be repaid, and believers will receive rest when the Lord Jesus is revealed from heaven. He prays that God will count them worthy of His calling.",
    words: [
      { v: 4, s: 5281, note: "Hypomone, \"perseverance\": patient endurance under pressure. Paul boasts about it in other churches." },
      { v: 7, s: 602, note: "Apokalypsis, \"revealed\": an unveiling. Jesus is now hidden from sight, but one day He will be fully shown." },
    ],
  },
  {
    book: "2thessalonians",
    chapter: 3,
    title: "Pray, and do not grow weary",
    setting:
      "Paul asks for prayer that the message will spread quickly and that he will be delivered from evil people. Then he addresses believers who had stopped working, perhaps expecting the Lord's immediate return, and were living off others. Paul reminds them that he worked with his own hands while there and gives a simple rule: anyone unwilling to work should not eat. Do not grow weary in doing good.",
    words: [
      { v: 3, s: 4103, note: "Pistos, \"faithful\". People may fail, but the Lord is faithful and will strengthen and protect." },
      { v: 11, s: 4020, note: "Periergazomai, \"busybodies\": busy about others' work but not their own. A play on words in Greek." },
    ],
  },
  {
    book: "1timothy",
    chapter: 2,
    title: "Prayer for all people",
    setting:
      "Paul left Timothy in Ephesus to deal with false teachers. He urges prayer for everyone, including kings and rulers, because God wants all people to be saved and there is one mediator between God and people, the man Christ Jesus. He then addresses men and women in worship. Verses 11 to 15 about women teaching are read in different ways among faithful Christians and deserve careful study.",
    words: [
      { v: 5, s: 3316, note: "Mesites, \"mediator\": a go-between who brings two parties together. Only Jesus, God and man, can stand between God and us." },
      { v: 6, s: 487, note: "Antilytron, \"ransom\": a price paid in place of another. Jesus gave Himself for all." },
    ],
  },
  {
    book: "1timothy",
    chapter: 3,
    title: "Leaders of good character",
    setting:
      "Paul lists qualifications for overseers, also called elders, and for deacons. Most of the list is not about skill but character: self-controlled, hospitable, gentle, not a lover of money, managing their household well and respected by outsiders. Churches differ on some details, such as whether women may serve as deacons. Paul ends with a short hymn about Christ, the mystery of godliness.",
    words: [
      { v: 1, s: 1984, note: "Episkope, \"overseer\": a supervisor, the root of \"bishop\". In the New Testament it is used alongside \"elder\" for the same role." },
      { v: 16, s: 2150, note: "Eusebeia, \"godliness\": reverent devotion that shapes daily life. Its mystery is Christ Himself." },
    ],
  },
  {
    book: "1timothy",
    chapter: 4,
    title: "Train yourself for godliness",
    setting:
      "The Spirit warns that some will abandon the faith, following teachers who forbid marriage and certain foods. Paul says everything God created is good when received with thanks. He urges Timothy, still young by ancient standards, perhaps in his thirties, not to let anyone look down on him, but to set an example and give attention to Scripture reading, preaching and teaching. Godliness has value for this life and the next.",
    words: [
      { v: 7, s: 1128, note: "Gymnazo, \"train\": to exercise, the root of \"gymnasium\". Greek cities prized physical training; Paul says train for godliness." },
      { v: 12, s: 5179, note: "Typos, \"example\": a pattern stamped out by a mold. Timothy's life should leave a clear impression for others to follow." },
    ],
  },
  {
    book: "1timothy",
    chapter: 5,
    title: "Caring for widows and elders",
    setting:
      "Paul gives practical instructions for the church in Ephesus. Treat older men as fathers and younger women as sisters. With no social safety net, widows were vulnerable, so the church cared for those with no family, while families should care for their own. Elders who lead well deserve honor and pay. Accusations against elders need witnesses. Timothy should not rush to appoint leaders.",
    words: [
      { v: 3, s: 5091, note: "Timao, \"honor\": to value, including with material support. Honoring widows meant providing for them." },
      { v: 17, s: 1362, note: "Diplous, \"double\": twice the measure. Honor for faithful leaders likely includes fair pay (verse 18)." },
    ],
  },
  {
    book: "1timothy",
    chapter: 6,
    title: "Godliness with contentment",
    setting:
      "Some false teachers in Ephesus saw religion as a way to make money. Paul says godliness with contentment is great gain, since we brought nothing into the world and can take nothing out. The love of money is a root of all kinds of evil. He tells Timothy to flee these things and fight the good fight of faith, and tells the rich to be rich in good deeds and generous.",
    words: [
      { v: 6, s: 841, note: "Autarkeia, \"contentment\": having enough. Contentment comes from God's sufficiency, not more things." },
      { v: 10, s: 5365, note: "Philargyria, \"love of money\": literally fondness for silver. Money itself is not evil; loving it is." },
    ],
  },
  {
    book: "2timothy",
    chapter: 1,
    title: "Do not be ashamed",
    setting:
      "This is probably Paul's last letter, written from a Roman prison, perhaps a cold dungeon, around AD 67, shortly before his execution under Nero. Many had abandoned him. He writes to Timothy, his dear son in the faith, recalling the sincere faith of his grandmother Lois and mother Eunice. He urges him to fan into flame God's gift and not be ashamed of the gospel or of Paul's chains.",
    words: [
      { v: 6, s: 329, note: "Anazopyreo, \"fan into flame\": to stir up embers into a blaze. The gift needs tending." },
      { v: 12, s: 3866, note: "Paratheke, \"what I have entrusted\": a deposit left in safekeeping. Paul trusts God to guard what he has given Him." },
    ],
  },
  {
    book: "2timothy",
    chapter: 2,
    title: "A good soldier of Christ Jesus",
    setting:
      "Paul urges Timothy to pass the faith on to reliable people who can teach others, four generations of believers in one verse. He uses three pictures: a soldier focused on his commander, an athlete who keeps the rules, a farmer who works hard. False teachers were saying the resurrection had already happened. Paul tells Timothy to handle God's word rightly and to correct opponents gently.",
    words: [
      { v: 3, s: 4777, note: "Synkakopatheo, \"share in suffering\": to endure hardship alongside. Paul invites Timothy to suffer with him." },
      { v: 15, s: 3718, note: "Orthotomeo, \"correctly handles\": to cut straight, like a road or a furrow. Teach the word accurately." },
    ],
  },
  {
    book: "2timothy",
    chapter: 4,
    title: "I have finished the race",
    setting:
      "Paul gives Timothy a solemn charge to preach the word in season and out of season, because people will turn to teachers who tell them what they want to hear. Then he looks at his own death: he is being poured out like a drink offering. He has fought the good fight and kept the faith. Alone except for Luke, he asks Timothy to come quickly and bring Mark and his cloak.",
    words: [
      { v: 6, s: 4689, note: "Spendo, \"poured out\": like wine poured beside an altar as an offering. Paul sees his death as worship." },
      { v: 7, s: 73, note: "Agon, \"fight\" or \"race\": an athletic contest. Paul has competed to the finish." },
    ],
  },
  {
    book: "titus",
    chapter: 1,
    title: "Elders for Crete",
    setting:
      "Paul left Titus, a Gentile coworker, on the island of Crete to set the young churches in order. Cretans had a bad reputation in the ancient world, and Paul even quotes one of their own poets calling them liars. Titus is to appoint elders in every town, men of proven character who hold firmly to sound teaching, because false teachers were upsetting whole households for profit.",
    words: [
      { v: 5, s: 2525, note: "Kathistemi, \"appoint\": to set in place. Titus was to put leadership in order in each town." },
      { v: 9, s: 5198, note: "Hygiaino, \"sound\": healthy, the root of \"hygiene\". True teaching produces spiritual health." },
    ],
  },
  {
    book: "titus",
    chapter: 3,
    title: "Saved by His mercy",
    setting:
      "Paul reminds the believers on Crete to be subject to rulers, ready for good works, gentle and courteous to all. They too were once foolish and enslaved to passions. But when God's kindness appeared, He saved them, not because of their righteous deeds, but by His mercy through the washing of new birth and renewal by the Spirit. Paul ends with personal requests for coworkers.",
    words: [
      { v: 5, s: 3824, note: "Paliggenesia, \"regeneration\": new birth, a new beginning. God makes people new from the inside." },
      { v: 7, s: 2818, note: "Kleronomos, \"heirs\": those who will inherit. Justified by grace, believers will share in eternal life." },
    ],
  },
];
