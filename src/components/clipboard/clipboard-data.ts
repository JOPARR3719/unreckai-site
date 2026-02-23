// Static fixture data for the interactive clipboard popup demo
// Mirrors real macOS MenuBarView.swift data model

import { TOAST_DATA, type CategoryData } from "../toast/toast-data";

export interface ClipboardStats {
  pastesCleaned: number;
  issuesFixed: number;
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
  type: "picker" | "toggle";
  options?: SettingOption[];
  value: string | boolean;
}

export interface SettingsSection {
  id: "account" | "cleaning" | "behavior" | "changelog";
  title: string;
  subtitle: string;
  settings: SettingRow[];
  standalone?: boolean; // no drill-in, just a static card
}

// --- Demo data ---

export const CLIPBOARD_STATS: ClipboardStats = {
  pastesCleaned: 128,
  issuesFixed: 2405,
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
    title: "Cleaning Rules",
    subtitle: "How UnreckAI processes your clipboard",
    settings: [
      {
        label: "Em dashes",
        type: "picker",
        options: [
          { label: "Keep", value: "keep" },
          { label: "Remove", value: "remove" },
          { label: "Hyphen", value: "hyphen" },
        ],
        value: "remove",
      },
      {
        label: "Smart quotes",
        type: "picker",
        options: [
          { label: "Off", value: "off" },
          { label: "Code only", value: "code-only" },
          { label: "Always", value: "always" },
        ],
        value: "code-only",
      },
      {
        label: "Bold handling",
        type: "picker",
        options: [
          { label: "Conservative", value: "conservative" },
          { label: "Aggressive", value: "aggressive" },
        ],
        value: "conservative",
      },
      {
        label: "AI style detection",
        type: "picker",
        options: [
          { label: "Off", value: "off" },
          { label: "Standard", value: "standard" },
          { label: "Aggressive", value: "aggressive" },
        ],
        value: "standard",
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
    subtitle: "v0.9.0 \u2014 Feb 23, 2026",
    settings: [],
    standalone: true,
  },
];
