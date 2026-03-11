"use client";

import { BarChart3, EyeOff, Sliders } from "lucide-react";

export type ClipboardTabId = "clipboard" | "excluded" | "settings";

interface ClipboardTabsProps {
  activeTab: ClipboardTabId;
  onTabChange: (tab: ClipboardTabId) => void;
}

const TABS: { id: ClipboardTabId; label: string }[] = [
  { id: "clipboard", label: "Dashboard" },
  { id: "excluded", label: "Excluded" },
  { id: "settings", label: "Settings" },
];

export function ClipboardTabs({ activeTab, onTabChange }: ClipboardTabsProps) {
  // Calculate underline position based on active tab index
  const activeIndex = TABS.findIndex((t) => t.id === activeTab);

  return (
    <div className="px-4 border-b border-brand-border">
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
              {tab.id === "clipboard" && <BarChart3 size={13} />}
              {tab.id === "excluded" && <EyeOff size={13} />}
              {tab.id === "settings" && <Sliders size={13} />}
              {tab.label}
              {/* Gradient underline under active tab */}
              {isActive && (
                <span
                  className="absolute bottom-0 left-2 right-2 h-[1.5px] rounded-full"
                  style={{
                    background: "linear-gradient(90deg, var(--color-brand-accentCleaned), var(--color-brand-accentFormatting))",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
