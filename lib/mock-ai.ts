export interface VerseContext {
  reference: string;
  text: string;
}

interface TopicBucket {
  keywords: string[];
  reference: string;
  reflection: string;
}

const TOPIC_BUCKETS: TopicBucket[] = [
  {
    keywords: ["anxious", "anxiety", "worry", "worried", "fear", "afraid", "stress"],
    reference: "Philippians 4:6-7",
    reflection:
      "Scripture doesn't ask you to pretend anxiety isn't real — it invites you to bring it directly to God rather than carry it alone. Paul writes from prison, not from a place of ease, when he says not to be anxious about anything but to present every request to God with thanksgiving. The promise isn't that the circumstance disappears, but that a peace \"which transcends all understanding\" stands guard over your heart and mind.",
  },
  {
    keywords: ["identity", "who am i", "purpose", "worth", "worthy", "value", "enough"],
    reference: "2 Corinthians 5:17",
    reflection:
      "A lot of the pressure around identity comes from trying to earn a sense of worth. Scripture frames it differently: if anyone is in Christ, they're a new creation — the old has gone, the new has come. Your identity isn't a performance review, it's a declared reality. That's worth sitting with, especially on days it doesn't feel true yet.",
  },
  {
    keywords: ["forgive", "forgiveness", "guilt", "shame", "regret", "sorry"],
    reference: "Ephesians 4:32",
    reflection:
      "Forgiveness in Scripture flows in both directions — receiving it and extending it. \"Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.\" That ordering matters: the forgiveness you've received is the model, not a debt you have to repay first. If guilt is what brought you here, that's worth naming honestly rather than carrying quietly.",
  },
  {
    keywords: ["salvation", "saved", "eternal life", "heaven", "born again", "gospel"],
    reference: "John 3:16",
    reflection:
      "This is about as close to the center of the whole Bible as you can get: \"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.\" It's framed as love first, then gift — not a transaction to work toward, but something offered.",
  },
  {
    keywords: ["hope", "hopeless", "despair", "discouraged", "give up"],
    reference: "Romans 15:13",
    reflection:
      "Paul calls God \"the God of hope\" and prays that believers would overflow with hope — not by willpower, but \"by the power of the Holy Spirit.\" That's an important distinction if you're running low: hope here isn't something you have to manufacture on your own.",
  },
  {
    keywords: ["gratitude", "thankful", "thanks", "grateful", "blessing"],
    reference: "1 Thessalonians 5:18",
    reflection:
      "\"Give thanks in all circumstances\" is a striking instruction — not thanks *for* every circumstance, but *in* them. Gratitude here isn't about forcing positivity; it's a posture that keeps you oriented toward God even when the circumstance itself is hard.",
  },
  {
    keywords: ["love", "loved", "loving"],
    reference: "1 Corinthians 13:4-7",
    reflection:
      "Paul's description of love is famous partly because it's so unsentimental: patient, kind, not envious or boastful, keeps no record of wrongs. It's less a feeling and more a description of how someone acts over time — a useful lens whether you're thinking about God's love or your own relationships.",
  },
  {
    keywords: ["pray", "prayer", "praying"],
    reference: "Matthew 6:9-13",
    reflection:
      "When the disciples asked Jesus how to pray, he didn't give them a formula so much as a shape — adoration, submission, provision, forgiveness, protection. It's worth praying slowly through the Lord's Prayer sometime, phrase by phrase, rather than reciting it quickly.",
  },
];

function findBucket(question: string): TopicBucket | undefined {
  const lower = question.toLowerCase();
  return TOPIC_BUCKETS.find((bucket) => bucket.keywords.some((kw) => lower.includes(kw)));
}

export function generateMockAnswer(question: string, context?: VerseContext): string {
  const bucket = findBucket(question);

  if (bucket) {
    const grounding = context
      ? `\n\nSince you're looking at ${context.reference}, it's worth reading these side by side — both point in the same direction.`
      : "";
    return `${bucket.reflection}\n\nA good place to sit with this: **${bucket.reference}**.${grounding}`;
  }

  if (context) {
    return generateVerseInsight(context);
  }

  return "That's a good question to bring to Scripture rather than away from it. Could you say a bit more about what's behind it — a specific passage, a situation you're working through, or a topic you'd like to explore? The more context you give me, the more grounded an answer I can offer.";
}

export function generateVerseInsight(context: VerseContext): string {
  return `**${context.reference}** — "${context.text}"\n\nThis verse rewards slow reading. Try sitting with just a phrase or two of it today rather than rushing to the next one — notice what it says about God's character, and what it might be asking of you in response.\n\nFeel free to ask me anything more specific about this verse — its context in the surrounding passage, how it connects to other parts of Scripture, or how it might apply to what you're facing right now.`;
}

export function generateInsightRequestPrompt(reference: string): string {
  return `What insights can you share about ${reference}?`;
}
