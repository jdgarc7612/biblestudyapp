/**
 * Privacy Policy and Terms of Use, in plain language.
 *
 * Written Nov 20, 2026 to match what the app actually does today. This is not legal advice. Before a public launch, have someone qualified look it over,
 * and update it whenever the app starts collecting something new (subscriptions, analytics,
 * sharing answers publicly).
 *
 * CONTACT_EMAIL is temporary (Cornerstone & Ink) until the app has its own name and address.
 * Set LEGAL_DRAFT back to true to show the Draft badge while making big changes.
 */

export const LEGAL_DRAFT = false;
export const LEGAL_UPDATED = "November 23, 2026";
/** Temporary until the app has its own address. */
export const CONTACT_EMAIL = "cornerstoneandink@gmail.com";
/** Who runs Omeora. */
export const OPERATOR = "Josh Garcia";

export interface LegalSection {
  heading: string;
  /** Paragraphs. A line starting with "• " is shown as a bullet. */
  body: string[];
}

const contactLine = () =>
  CONTACT_EMAIL
    ? `Questions or requests? Email ${CONTACT_EMAIL}, or use Send feedback in Profile.`
    : "Questions or requests? Use Send feedback in Profile and we'll get back to you if you leave a way to reach you.";

export const PRIVACY: LegalSection[] = [
  {
    heading: "The short version",
    body: [
      "Omeora is a Bible study app. We collect as little as we can, we never sell your information, and there are no ads or third-party trackers. If you don't make an account, your study stays on your device.",
    ],
  },
  {
    heading: "If you use Omeora without an account",
    body: [
      "Your reading progress, notes, guided study answers, study journal entries, memory verses, streaks and Ask AI conversations are saved only on your device (or in your browser). We can't see them. Clearing the app's data or your browser's site data erases them.",
    ],
  },
  {
    heading: "If you make an account",
    body: [
      "We keep your email address (or the account details Apple or Google share when you sign in with them) so you can sign in.",
      "We keep a copy of your study so it follows you to any device:",
      "• your notes, guided study answers and study journal entries",
      "• your memory verses and review schedule",
      "• your reading and guided study progress, streaks, badges and tokens",
      "• your settings, such as your first name and preferred translation",
      "• your Ask AI answers and the questions that led to them, so you can find them again",
      "We also count how many free Ask AI questions you've used each day, to apply the daily limit.",
    ],
  },
  {
    heading: "How you use Omeora (during the test)",
    body: [
      "While Omeora is in its private test, we record which screens and features you use when you're signed in, such as opening a chapter, a Setting card or Go Deeper, asking AI, or finishing a memory review, with the time, the book and chapter, and your device type. We use it only to see what's helpful and improve the app.",
      "We never record the text of your notes, your Ask AI questions or answers, your guided study answers or your study journal this way. Only Josh can see this activity, and it's deleted with your account.",
    ],
  },
  {
    heading: "Ask AI",
    body: [
      "When you ask a question, we send it, the verse you're asking about (if any) and the last few messages of that conversation to Anthropic, the company that makes the Claude AI model, so it can write an answer. When you ask for a hint in a study, we send the passage and what you've written on that step. When you tap Reflect with AI, we send the passage and the answers you wrote for that study or plan day. Requests pass through our server, which doesn't keep a copy.",
      "Anthropic processes these requests under its commercial terms, which don't allow it to train its models on them. It may keep them for a limited time for safety and abuse monitoring. Please don't put private details about yourself or others in a question.",
    ],
  },
  {
    heading: "Feedback",
    body: [
      "When you send feedback, we keep your message, the screen you were on, your app version and device type, and, if you're signed in, a link to your account. If you're not signed in and add an email for a reply, we keep that too.",
    ],
  },
  {
    heading: "Who helps us run Omeora",
    body: [
      "• Supabase stores accounts, synced study, test activity and feedback.",
      "• Cloudflare runs our Ask AI server. It sees your IP address, which we use only to slow down floods of requests.",
      "• Anthropic writes Ask AI answers, study hints and reflections.",
      "• GitHub hosts the Omeora website.",
      "• Apple and Google, only if you choose to sign in with them.",
      "Each of them handles data under its own privacy policy. We don't share your information with anyone else, and we never sell it.",
    ],
  },
  {
    heading: "Deleting your data",
    body: [
      "You can delete your account anytime in Profile → Delete account. That permanently deletes your email, everything synced to your account, your recorded activity and any feedback linked to it, and clears it from that device. It can't be undone.",
    ],
  },
  {
    heading: "Children",
    body: [
      "Omeora isn't designed for children under 13, and we don't knowingly collect information from them. If you believe a child has made an account, contact us and we'll delete it.",
    ],
  },
  {
    heading: "Changes and contact",
    body: [
      "If we change what we collect, we'll update this page and the date at the top, and tell you in the app for anything significant.",
      contactLine(),
    ],
  },
];

export const TERMS: LegalSection[] = [
  {
    heading: "Welcome",
    body: [
      "These terms cover your use of Omeora, the Bible study app and website. By using Omeora you agree to them. If you don't agree, please don't use the app.",
    ],
  },
  {
    heading: "A study aid, not a replacement",
    body: [
      "Omeora is meant to help you read, study and understand the Bible. Scripture itself is the final word. Omeora isn't a substitute for your church, your pastor, or professional counsel for medical, legal, financial or mental health needs.",
    ],
  },
  {
    heading: "About Ask AI",
    body: [
      "Ask AI answers are written by an AI model. They aim to be faithful to Scripture, but they can be incomplete or wrong. Check what you read against the Bible, and talk to your pastor about anything that matters.",
      "Free accounts get a limited number of questions each day. We may change limits or features as Omeora grows.",
    ],
  },
  {
    heading: "Your account and your content",
    body: [
      "Keep your sign-in secure and use an email you control. You're responsible for what happens under your account.",
      "Your notes and answers belong to you. You let us store and sync them only so Omeora can show them back to you. Today everything you write is private to you.",
    ],
  },
  {
    heading: "Please don't",
    body: [
      "• misuse or try to break Omeora, its servers or its limits",
      "• use Ask AI to create anything harmful, hateful or unlawful",
      "• copy Omeora's own study content (book introductions, notes, plans) to sell or republish",
      "We may suspend accounts that do these things.",
    ],
  },
  {
    heading: "Bible text and sources",
    body: [
      "The Berean Standard Bible, World English Bible and King James Version are in the public domain. Original-language data comes from the Berean interlinear (public domain) and STEPBible lexicons (CC BY 4.0). Cross-references come from OpenBible.info (CC BY).",
    ],
  },
  {
    heading: "No guarantees",
    body: [
      "We work hard to keep Omeora accurate and available, but it's provided as it is, without warranties. As far as the law allows, we aren't liable for losses that come from using it. Keeping an account means your study is backed up, but please keep your own copy of anything you can't lose.",
    ],
  },
  {
    heading: "Changes and contact",
    body: [
      "We may update these terms. When we do, we'll change the date at the top, and tell you in the app for anything significant. Using Omeora after a change means you accept it. You can stop using Omeora and delete your account anytime.",
      contactLine(),
    ],
  },
];
