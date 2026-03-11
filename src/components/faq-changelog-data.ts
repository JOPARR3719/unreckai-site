// FAQ and changelog data for the support section

export type FAQItem = {
  question: string;
  answer: string;
};

export type FAQCategory = {
  title: string;
  icon: "lock" | "gear" | "card";
  color: string;
  items: FAQItem[];
};

export type ChangelogEntry = {
  version: string;
  date: string;
  isLatest: boolean;
  items: string[];
};

export const FAQ_CATEGORIES: FAQCategory[] = [
  {
    title: "Privacy & Security",
    icon: "lock",
    color: "text-brand-accentCleaned",
    items: [
      {
        question: "Does UnreckAI send my text to a server?",
        answer:
          "Never. Everything runs locally on your device. Your text is processed entirely on-device. No internet connection needed, no data ever leaves your machine.",
      },
      {
        question: "Is UnreckAI reading everything I type?",
        answer:
          "No. UnreckAI only activates when you copy text. It does not monitor keystrokes, screen content, or anything else.",
      },
      {
        question: "Can I control which apps it works with?",
        answer:
          "Yes. You can exclude specific apps from both copying and pasting in the Excluded Apps tab. Terminal, code editors, and password managers are excluded by default.",
      },
      {
        question: "Does Apple Intelligence send my text to Apple?",
        answer:
          "No. Apple Intelligence runs entirely on-device using Apple's local model. Your text never leaves your device — not to Apple, not to us, not to anyone.",
      },
    ],
  },
  {
    title: "How It Works",
    icon: "gear",
    color: "text-brand-accentFormatting",
    items: [
      {
        question: "Does it change my words or meaning?",
        answer:
          "Never. UnreckAI only fixes formatting: invisible characters, broken bullet points, and AI-generated filler text. Your actual words stay exactly as you wrote them.",
      },
      {
        question: "How do I undo a cleaned paste?",
        answer:
          "A small notification appears after every paste. Click 'Undo' to instantly restore your original text, exactly as it was before cleaning.",
      },
      {
        question: "What apps does it work with?",
        answer:
          "Any app that accepts pasting. Slack, Gmail, Notion, Google Docs, Apple Notes, and more. Your cleaned text automatically uses native formatting in each destination.",
      },
      {
        question: "What does Apple Intelligence do in UnreckAI?",
        answer:
          "It lets you refine pasted text using Apple's on-device AI. Choose Concise, Professional, or Friendly tone, and the output gets run back through UnreckAI's pipeline to strip any AI filler the model adds. Requires iOS 26 or macOS 26. Pro only.",
      },
    ],
  },
  {
    title: "Plans & Pricing",
    icon: "card",
    color: "text-[#8AB4F8]",
    items: [
      {
        question: "What is the difference between Free and Pro?",
        answer:
          "Free handles the invisible mess: hidden characters, broken spacing, encoding issues, and AI filler like 'Sure! Here is...'. Pro adds format translation, so your bullet points, headings, and tables paste as native formatting in Slack, Gmail, Notion, and more. Pro also includes Apple Intelligence refinement and AI writing style detection.",
      },
      {
        question: "Why should I choose Pro Annual?",
        answer:
          "Same full Pro experience, 30% less. Pro Annual is $4.99/month billed annually ($59.88/year) vs $6.99/month billed monthly. One license covers both your Mac and iOS devices.",
      },
      {
        question: "Do I need internet access?",
        answer:
          "No. Everything runs on-device. No servers, no cloud calls, no internet required. Works anywhere.",
      },
    ],
  },
];

export const CHANGELOG_ENTRIES: ChangelogEntry[] = [
  {
    version: "v1.1.0",
    date: "Mar 10, 2026",
    isLatest: true,
    items: [
      "Apple Intelligence integration: refine pasted text with on-device AI (Concise, Professional, Friendly).",
      "iOS keyboard: Paste & Clean button for one-tap text cleaning directly from the keyboard.",
      "Issue summary view with per-category breakdown and accent-colored detail cards.",
      "Chained AI slop removal now catches back-to-back openers and closers in a single pass.",
    ],
  },
  {
    version: "v1.0.0",
    date: "Mar 2, 2026",
    isLatest: false,
    items: [
      "iOS keyboard extension for cleaning pastes on iPhone and iPad.",
      "New platform showcase section with macOS and iOS side-by-side.",
      "Pricing simplified to Free, Pro Monthly, and Pro Annual.",
    ],
  },
  {
    version: "v0.9.0",
    date: "Feb 23, 2026",
    isLatest: false,
    items: [
      "Detects AI writing patterns like filler phrases and generic conclusions.",
      "New configurable cleaning modes: Standard and Aggressive.",
      "Security hardened with link URL sanitization.",
    ],
  },
  {
    version: "v0.8.0",
    date: "Feb 18, 2026",
    isLatest: false,
    items: [
      "Complete menu bar redesign with drill-in settings.",
      "App exclusions for both copy and paste directions.",
      "DM Sans font for sharper small-text readability.",
    ],
  },
  {
    version: "v0.7.0",
    date: "Feb 12, 2026",
    isLatest: false,
    items: [
      "Native bullet points render in Slack, Gmail, and Notion.",
      "Tables paste correctly across all destination apps.",
      "One-click undo restores your original text instantly.",
    ],
  },
];
