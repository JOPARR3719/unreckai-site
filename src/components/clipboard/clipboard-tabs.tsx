"use client";

import { EyeOff, Sliders } from "lucide-react";

export type ClipboardTabId = "clipboard" | "excluded" | "settings";

interface ClipboardTabsProps {
  activeTab: ClipboardTabId;
  onTabChange: (tab: ClipboardTabId) => void;
}

const TABS: { id: ClipboardTabId; label: string }[] = [
  { id: "clipboard", label: "Clipboard" },
  { id: "excluded", label: "Excluded" },
  { id: "settings", label: "Settings" },
];

function ClipboardIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="shrink-0">
      <rect x="2" y="3" width="9" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5 1.5h3a1 1 0 011 1V3H4V2.5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function ClipboardTabs({ activeTab, onTabChange }: ClipboardTabsProps) {
  // Calculate underline position based on active tab index
  const activeIndex = TABS.findIndex((t) => t.id === activeTab);

  return (
    <div className="relative px-4 border-b border-brand-border">
      <div className="flex">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium transition-colors relative ${
                isActive
                  ? "text-brand-textPrimary"
                  : "text-brand-textTertiary hover:text-brand-textSecondary"
              }`}
            >
              {tab.id === "clipboard" && <ClipboardIcon />}
              {tab.id === "excluded" && <EyeOff size={13} />}
              {tab.id === "settings" && <Sliders size={13} />}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Gradient underline — transitions between tabs */}
      <div
        className="absolute bottom-0 h-[2px] rounded-full transition-all duration-300 ease-in-out"
        style={{
          background: "linear-gradient(90deg, var(--color-brand-accentCleaned), var(--color-brand-accentFormatting))",
          // Each tab is roughly equal width; position based on index
          left: `calc(1rem + ${activeIndex} * 33.33%)`,
          width: "calc(33.33% - 0.5rem)",
          // Use transform for smoother animation
          transform: `translateX(${activeIndex * 0.25}rem)`,
        }}
      />
    </div>
  );
}
