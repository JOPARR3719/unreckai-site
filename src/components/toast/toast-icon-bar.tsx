"use client";

import { Wand2, Type, Layers, Lightbulb } from "lucide-react";
import type { CategoryData } from "./toast-data";

const ICON_MAP: Record<string, React.ElementType> = {
  Wand2,
  Type,
  Lightbulb,
  Layers,
};

const ACCENT_CSS: Record<string, string> = {
  "brand-accentCleaned": "var(--color-brand-accentCleaned)",
  "brand-accentFormatting": "var(--color-brand-accentFormatting)",
  "brand-accentAi": "var(--color-brand-accentAi)",
  "brand-accentDocument": "var(--color-brand-accentDocument)",
};

interface ToastIconBarProps {
  categories: CategoryData[];
  activeCategory: string | null;
  onCategoryClick: (category: CategoryData) => void;
  onIntelligenceClick: () => void;
}

export function ToastIconBar({
  categories,
  activeCategory,
  onCategoryClick,
  onIntelligenceClick,
}: ToastIconBarProps) {
  return (
    <div className="flex items-center justify-center gap-6 px-3 pt-3.5 pb-3">
      {categories.map((cat) => {
        const Icon = ICON_MAP[cat.icon];
        const accent = ACCENT_CSS[cat.accentColor];
        const isActive = activeCategory === cat.id;
        const hasIssues = cat.fixCount > 0;

        return (
          <button
            key={cat.id}
            onClick={() => onCategoryClick(cat)}
            className="shrink-0 flex items-center justify-center transition-all duration-200"
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              backgroundColor: "var(--color-brand-fixCardBg)",
              border: `${isActive ? 1 : 0.5}px solid ${
                isActive
                  ? `color-mix(in srgb, ${accent} 60%, transparent)`
                  : hasIssues
                  ? `color-mix(in srgb, ${accent} 40%, transparent)`
                  : "var(--color-brand-border)"
              }`,
              boxShadow: isActive
                ? `0 0 12px color-mix(in srgb, ${accent} 35%, transparent)`
                : hasIssues
                ? `0 0 8px color-mix(in srgb, ${accent} 15%, transparent)`
                : "none",
              color: hasIssues ? accent : "var(--color-brand-textTertiary)",
            }}
          >
            {Icon && (
              <Icon
                size={18}
                strokeWidth={1.8}
              />
            )}
          </button>
        );
      })}

      {/* Intelligence icon */}
      <button
        onClick={onIntelligenceClick}
        className="shrink-0 flex items-center justify-center transition-all duration-200"
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          backgroundColor: "var(--color-brand-fixCardBg)",
          border: "0.5px solid transparent",
          background: "linear-gradient(var(--color-brand-fixCardBg), var(--color-brand-fixCardBg)) padding-box, linear-gradient(135deg, rgba(59,232,176,0.45), rgba(155,143,255,0.45)) border-box",
          borderColor: "transparent",
          boxShadow: "0 0 12px rgba(59,232,176,0.12), 0 0 12px rgba(155,143,255,0.10)",
        }}
      >
        <span
          className="text-[18px] leading-none bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #3be8b0, #1aafd0, #9B8FFF)",
          }}
        >
          &#x2728;
        </span>
      </button>
    </div>
  );
}
