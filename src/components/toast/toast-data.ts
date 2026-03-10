// Static fixture data for the interactive toast demo
// Mirrors real pipeline output from the demo-sample.txt fixture

export interface PreviewData {
  before: string;
  after: string;
}

export interface IssueGroupData {
  type: string;
  label: string;
  count: number;
  fixed?: boolean;
  previews?: PreviewData[];
}

export interface CategoryData {
  id: string;
  name: string;
  accentColor: string;
  icon: string;
  fixCount: number;
  subtitle: string;
  issues: IssueGroupData[];
}

export interface ToastData {
  sourceApp: string;
  categories: CategoryData[];
  originalText: string;
  cleanedText: string;
  summaryText: string;
}

export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "Deep Clean": "Invisible characters, whitespace normalization, and encoding fixes that silently break formatting across apps.",
  "Formatting": "Em dashes, smart quotes, and typographic artifacts that AI tools insert but most destinations don't handle well.",
  "AI Content": "Chatbot greetings, filler phrases, sycophantic openers, and AI writing patterns that make text feel generated.",
  "Structure": "Structure translation for headings, lists, code blocks, and tables so they render as native formatting.",
};

export const TOAST_DATA: ToastData = {
  sourceApp: "ChatGPT",
  originalText: "Great question! Here\u2019s a comprehensive guide to boosting your remote work productivity.\n\n## **Key Strategies for Success**\n\n1. **Time Blocking** \u2014 Dedicate specific\u200B hours to deep work. It\u2019s the most effective way to maintain focus.\n\n2. **Environment Design** \u2014 Create a dedicated workspace that\u2019s free from distractions.\n\n3. **Communication Tools** \u2014 Use platforms like Slack and Notion to stay connected.\n\nLet me know if you have any questions!",
  cleanedText: "Key Strategies for Success\n\n1. Time Blocking - Dedicate specific hours to deep work. It's the most effective way to maintain focus.\n\n2. Environment Design - Create a dedicated workspace that's free from distractions.\n\n3. Communication Tools - Use platforms like Slack and Notion to stay connected.",
  summaryText: "UnreckAI found 44 issues in this paste. Formatting corrections account for 50%, followed by Structure at 18%.",
  categories: [
    {
      id: "cleaned",
      name: "Deep Clean",
      accentColor: "brand-accentCleaned",
      icon: "Wand2",
      fixCount: 7,
      subtitle: "7 fixes applied",
      issues: [
        {
          type: "zero-width-space",
          label: "Zero-width spaces",
          count: 3,
          previews: [
            {
              before: "specific\u200B hours to deep",
              after: "specific hours to deep",
            },
            {
              before: "yesterday\u2019s\u200B progress",
              after: "yesterday's progress",
            },
            {
              before: "Document decisions\u200B in writing",
              after: "Document decisions in writing",
            },
          ],
        },
        {
          type: "non-breaking-space",
          label: "Non-breaking spaces",
          count: 4,
          previews: [
            {
              before: "the\u00A0most effective way",
              after: "the most effective way",
            },
            {
              before: "that\u2019s\u00A0free from distractions",
              after: "that's free from distractions",
            },
            {
              before: "for\u00A0many people",
              after: "for many people",
            },
            {
              before: "could\u00A0potentially be",
              after: "could potentially be",
            },
          ],
        },
      ],
    },
    {
      id: "formatting",
      name: "Formatting",
      accentColor: "brand-accentFormatting",
      icon: "Type",
      fixCount: 22,
      subtitle: "22 fixes applied",
      issues: [
        {
          type: "smart-apostrophe",
          label: "Smart apostrophes",
          count: 9,
          previews: [
            {
              before: "it\u2019s the most effective",
              after: "it's the most effective",
            },
            {
              before: "that\u2019s free from distractions",
              after: "that's free from distractions",
            },
            {
              before: "Yesterday\u2019s progress",
              after: "Yesterday's progress",
            },
            {
              before: "don\u2019t rely on memory",
              after: "don't rely on memory",
            },
            {
              before: "Here\u2019s a comprehensive guide",
              after: "Here's a comprehensive guide",
            },
            {
              before: "tomorrow\u2019s priorities",
              after: "tomorrow's priorities",
            },
            {
              before: "it\u2019s based on the idea",
              after: "it's based on the idea",
            },
            {
              before: "Here\u2019s a quick overview",
              after: "Here's a quick overview",
            },
            {
              before: "Newport\u2019s book \u201CDeep Work\u201D",
              after: "Newport's book \"Deep Work\"",
            },
          ],
        },
        {
          type: "smart-quote",
          label: "Smart quotes",
          count: 4,
          previews: [
            {
              before: "The \u201CPomodoro Technique\u201D works well",
              after: 'The "Pomodoro Technique" works well',
            },
            {
              before: "Cal Newport\u2019s book \u201CDeep Work\u201D",
              after: 'Cal Newport\'s book "Deep Work"',
            },
            {
              before: "\u201CDeep Work\u201D at calnewport.com",
              after: '"Deep Work" at calnewport.com',
            },
            {
              before: "workspace that\u2019s free from",
              after: "workspace that's free from",
            },
          ],
        },
        {
          type: "em-dash",
          label: "Em dashes removed",
          count: 9,
          previews: [
            {
              before: "Time Blocking \u2014 Dedicate specific hours",
              after: "Time Blocking Dedicate specific hours",
            },
            {
              before:
                "Environment Design \u2014 Create a dedicated",
              after: "Environment Design Create a dedicated",
            },
            {
              before:
                "Communication Tools \u2014 Use platforms like",
              after: "Communication Tools Use platforms like",
            },
            {
              before: "writing \u2014 don\u2019t rely on memory",
              after: "writing don't rely on memory",
            },
            {
              before: "many people \u2014 it\u2019s based on",
              after: "many people it's based on",
            },
            {
              before: "deep work \u2014 it\u2019s the most",
              after: "deep work it's the most",
            },
            {
              before: "Work Phase \u2014 Focus for 25",
              after: "Work Phase Focus for 25",
            },
            {
              before: "Break Phase \u2014 Take a 5\u201310",
              after: "Break Phase Take a 5-10",
            },
            {
              before: "Long Break \u2014 After 4 cycles",
              after: "Long Break After 4 cycles",
            },
          ],
        },
      ],
    },
    {
      id: "ai-content",
      name: "AI Content",
      accentColor: "brand-accentAi",
      icon: "RobotIcon",
      fixCount: 7,
      subtitle: "7 fixes applied",
      issues: [
        {
          type: "ai-filler",
          label: "AI filler phrase removed",
          count: 1,
          previews: [
            {
              before: "Great question!",
              after: "",
            },
          ],
        },
        {
          type: "ai-greeting",
          label: "AI greeting removed",
          count: 1,
          previews: [
            {
              before: "Let me know if you have any questions!",
              after: "",
            },
          ],
        },
        {
          type: "emoji-bullet",
          label: "Emoji bullets",
          count: 4,
          previews: [
            {
              before: "\uD83C\uDF05 Start with a morning review",
              after: "Start with a morning review",
            },
            {
              before: "\uD83D\uDCAA Tackle your hardest task",
              after: "Tackle your hardest task",
            },
            {
              before: "\uD83D\uDCDD Document decisions in writing",
              after: "Document decisions in writing",
            },
            {
              before: "\uD83C\uDFAF End each day by setting",
              after: "End each day by setting",
            },
          ],
        },
        {
          type: "title-case-heading",
          label: "Title case heading",
          count: 1,
          previews: [
            {
              before: "Key Strategies for Success",
              after: "Key strategies for success",
            },
          ],
        },
      ],
    },
    {
      id: "document",
      name: "Structure",
      accentColor: "brand-accentDocument",
      icon: "Layers",
      fixCount: 8,
      subtitle: "8 fixes applied",
      issues: [
        {
          type: "heading-translated",
          label: "Heading translated",
          count: 2,
          previews: [
            {
              before: "## **Key Strategies for Success**",
              after: "Key Strategies for Success",
            },
            {
              before: "## **Daily Routine Essentials**",
              after: "Daily Routine Essentials",
            },
          ],
        },
        {
          type: "numbered-list",
          label: "Numbered list",
          count: 3,
          previews: [
            {
              before: "1. **Time Blocking** \u2014 Dedicate...",
              after: "Time Blocking \u2014 Dedicate...",
            },
            {
              before: "2. **Environment Design** \u2014 Create...",
              after: "Environment Design \u2014 Create...",
            },
            {
              before: "3. **Communication Tools** \u2014 Use...",
              after: "Communication Tools \u2014 Use...",
            },
          ],
        },
        {
          type: "link-translated",
          label: "Link translated",
          count: 2,
          previews: [
            {
              before: "[Slack](https://slack.com)",
              after: "Slack (linked)",
            },
            {
              before: "[Notion](https://notion.so)",
              after: "Notion (linked)",
            },
          ],
        },
        {
          type: "bullet-list",
          label: "Bullet list",
          count: 1,
          previews: [
            {
              before: "- **Work Phase** \u2014 Focus for 25...",
              after: "Work Phase \u2014 Focus for 25...",
            },
          ],
        },
      ],
    },
  ],
};
