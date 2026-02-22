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
  issueCount: number;
  sourceApp: string;
  categories: CategoryData[];
}

export const TOAST_DATA: ToastData = {
  issueCount: 32,
  sourceApp: "ChatGPT",
  categories: [
    {
      id: "cleaned",
      name: "Cleaned",
      accentColor: "brand-accentCleaned",
      icon: "CheckCircle2",
      fixCount: 7,
      subtitle: "7 fixes applied",
      issues: [
        {
          type: "zero-width-space",
          label: "Zero-width spaces",
          count: 3,
        },
        {
          type: "non-breaking-space",
          label: "Non-breaking spaces",
          count: 4,
        },
      ],
    },
    {
      id: "formatting",
      name: "Formatting",
      accentColor: "brand-accentFormatting",
      icon: "AlertCircle",
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
          ],
        },
      ],
    },
    {
      id: "ai-content",
      name: "AI Content",
      accentColor: "brand-accentAi",
      icon: "Sparkles",
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
          ],
        },
        {
          type: "title-case-heading",
          label: "Title case heading",
          count: 1,
        },
      ],
    },
    {
      id: "document",
      name: "Document",
      accentColor: "brand-accentDocument",
      icon: "FileText",
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
          ],
        },
        {
          type: "numbered-list",
          label: "Numbered list",
          count: 3,
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
          ],
        },
        {
          type: "bullet-list",
          label: "Bullet list",
          count: 1,
        },
      ],
    },
  ],
};
