// Static fixture data for the interactive clipboard popup demo
// Mirrors real macOS MenuBarView.swift data model

import { TOAST_DATA, type CategoryData } from "../toast/toast-data";

export interface ClipboardStats {
  pastesCleaned: number;
  issuesFixed: number;
  avgPerPaste: number;
}

export interface ExclusionApp {
  name: string;
  icon: string; // lucide icon name or emoji
}

export interface ExclusionSection {
  id: "copy" | "paste";
  title: string;
  subtitle: string;
  apps: ExclusionApp[];
}

export interface SettingOption {
  label: string;
  value: string;
}

export interface SettingRow {
  label: string;
  type: "picker" | "toggle" | "link";
  options?: SettingOption[];
  value: string | boolean;
  icon?: string;      // lucide icon name
  subtitle?: string;  // description text below label
}

export interface SettingsSection {
  id: "account" | "cleaning" | "behavior" | "changelog" | "support";
  title: string;
  subtitle: string;
  settings: SettingRow[];
  standalone?: boolean; // no drill-in, just a static card
}

// --- Demo data ---

export const CLIPBOARD_STATS: ClipboardStats = {
  pastesCleaned: 128,
  issuesFixed: 2405,
  avgPerPaste: 19,
};

export const CLIPBOARD_CATEGORIES: CategoryData[] = TOAST_DATA.categories;

export const EXCLUSION_SECTIONS: ExclusionSection[] = [
  {
    id: "copy",
    title: "Copy Exclusions",
    subtitle: "Apps to skip when copying from",
    apps: [
      { name: "Terminal", icon: "terminal" },
      { name: "VS Code", icon: "code" },
      { name: "Xcode", icon: "hammer" },
      { name: "1Password", icon: "lock" },
    ],
  },
  {
    id: "paste",
    title: "Paste Exclusions",
    subtitle: "Apps to skip when pasting into",
    apps: [
      { name: "Terminal", icon: "terminal" },
      { name: "VS Code", icon: "code" },
      { name: "Xcode", icon: "hammer" },
    ],
  },
];

export const SETTINGS_SECTIONS: SettingsSection[] = [
  {
    id: "cleaning",
    title: "UnreckAI Rules",
    subtitle: "How UnreckAI processes your text",
    settings: [
      {
        label: "Em Dashes",
        icon: "minus-circle",
        subtitle: "Replace — dashes in AI text",
        type: "picker",
        options: [
          { label: "Hyphen", value: "hyphen" },
          { label: "Semi", value: "semi" },
          { label: "Comma", value: "comma" },
        ],
        value: "hyphen",
      },
      {
        label: "Smart Quotes",
        icon: "quote",
        subtitle: "Straighten curly quotes",
        type: "picker",
        options: [
          { label: "Off", value: "off" },
          { label: "Code only", value: "code-only" },
          { label: "Always", value: "always" },
        ],
        value: "code-only",
      },
      {
        label: "Code Context",
        icon: "code-2",
        subtitle: "How to handle code-like content",
        type: "picker",
        options: [
          { label: "Auto", value: "auto" },
          { label: "Never", value: "never" },
          { label: "Always", value: "always" },
        ],
        value: "auto",
      },
      {
        label: "AI Style Detection",
        icon: "text-search",
        subtitle: "Spot AI writing habits",
        type: "picker",
        options: [
          { label: "Off", value: "off" },
          { label: "Flag only", value: "flag" },
          { label: "Auto-fix", value: "autofix" },
        ],
        value: "flag",
      },
      {
        label: "PDF Repair",
        icon: "file-text",
        subtitle: "Fix broken lines from PDFs",
        type: "toggle",
        value: true,
      },
      {
        label: "AI Slop Removal",
        icon: "sparkles",
        subtitle: "Strip chatbot intros & closers",
        type: "toggle",
        value: true,
      },
    ],
  },
  {
    id: "behavior",
    title: "App Behavior",
    subtitle: "General app preferences",
    settings: [
      {
        label: "Timer duration",
        type: "picker",
        options: [
          { label: "10s", value: "10" },
          { label: "30s", value: "30" },
          { label: "\u221E", value: "permanent" },
        ],
        value: "30",
      },
      {
        label: "Show toasts",
        type: "toggle",
        value: true,
      },
      {
        label: "Launch at login",
        type: "toggle",
        value: true,
      },
      {
        label: "Theme",
        type: "picker",
        options: [
          { label: "System", value: "system" },
          { label: "Dark", value: "dark" },
          { label: "Light", value: "light" },
        ],
        value: "system",
      },
      {
        label: "Toast position",
        type: "picker",
        options: [
          { label: "Top R", value: "top-right" },
          { label: "Top L", value: "top-left" },
          { label: "Bot R", value: "bottom-right" },
        ],
        value: "top-right",
      },
      {
        label: "Share analytics",
        type: "toggle",
        value: true,
      },
    ],
  },
  {
    id: "account",
    title: "Account: Pro",
    subtitle: "All features unlocked",
    settings: [],
    standalone: true,
  },
  {
    id: "changelog",
    title: "Changelog",
    subtitle: "v1.1.0 \u00b7 Mar 10, 2026",
    settings: [],
    standalone: false,
  },
  {
    id: "support",
    title: "Support",
    subtitle: "Privacy and help",
    settings: [
      { label: "Privacy Policy", type: "link", value: "https://unreckai.com/privacy", icon: "shield" },
      { label: "Contact Support", type: "link", value: "mailto:support@unreckai.com", icon: "mail" },
    ],
    standalone: false,
  },
];
