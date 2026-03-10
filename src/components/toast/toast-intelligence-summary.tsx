"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CategoryData } from "./toast-data";
import { CATEGORY_DESCRIPTIONS } from "./toast-data";

const GLOW_GRADIENT =
  "linear-gradient(135deg, var(--color-brand-accentCleaned), var(--color-brand-accentFormatting))";

const ACCENT_CSS: Record<string, string> = {
  "brand-accentCleaned": "var(--color-brand-accentCleaned)",
  "brand-accentFormatting": "var(--color-brand-accentFormatting)",
  "brand-accentAi": "var(--color-brand-accentAi)",
  "brand-accentDocument": "var(--color-brand-accentDocument)",
};

interface IntelligenceSummaryCardProps {
  summaryText: string;
  onClick: () => void;
}

export function IntelligenceSummaryCard({
  onClick,
}: IntelligenceSummaryCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2 rounded-lg text-left transition-colors hover:bg-white/[0.02]"
      style={{
        padding: "9px 12px",
        backgroundColor: "var(--color-brand-fixCardBg)",
        border: "0.5px solid var(--color-brand-border)",
      }}
    >
      <span
        className="text-[14px] leading-none bg-clip-text text-transparent"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #3be8b0, #1aafd0, #9B8FFF)",
        }}
      >
        &#x2728;
      </span>
      <span
        className="font-semibold text-brand-textPrimary"
        style={{ fontSize: "12.5px" }}
      >
        Intelligence Summary
      </span>
      <span className="flex-1" />
      <ChevronRight size={18} className="text-brand-tagLabel shrink-0" />
    </button>
  );
}

interface IntelligenceSummaryDrillProps {
  categories: CategoryData[];
  summaryText: string;
  onBack: () => void;
}

export function IntelligenceSummaryDrill({
  categories,
  summaryText,
  onBack,
}: IntelligenceSummaryDrillProps) {
  const sorted = [...categories].sort((a, b) => b.fixCount - a.fixCount);
  const totalCount = categories.reduce((sum, c) => sum + c.fixCount, 0);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div
        className="flex items-center gap-2 px-3 py-2.5"
        style={{ backgroundColor: "var(--color-brand-drillHeaderBg)" }}
      >
        <button
          onClick={onBack}
          className="flex items-center justify-center rounded-md transition-colors hover:bg-white/[0.05]"
          style={{
            width: 24,
            height: 24,
            backgroundColor: "var(--color-brand-cardBg)",
            border: `1px solid transparent`,
            backgroundImage: `linear-gradient(var(--color-brand-cardBg), var(--color-brand-cardBg)), ${GLOW_GRADIENT}`,
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
          }}
        >
          <ChevronLeft size={10} className="text-brand-textSecondary" />
        </button>
        <span
          className="text-[13px] leading-none bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #3be8b0, #1aafd0, #9B8FFF)",
          }}
        >
          &#x2728;
        </span>
        <span
          className="font-semibold text-brand-textPrimary"
          style={{ fontSize: 14 }}
        >
          Intelligence Summary
        </span>
      </div>

      <div
        className="h-px"
        style={{ backgroundColor: "var(--color-brand-panelDivider)" }}
      />

      {/* Summary card */}
      <div className="p-3">
        <div className="rounded-xl p-3.5">
          {/* Prose */}
          <p
            className="text-brand-textSecondary"
            style={{ fontSize: 12, lineHeight: 1.6 }}
          >
            {summaryText}
          </p>

          {/* Gradient divider */}
          <div
            className="my-3 h-px opacity-40"
            style={{
              background:
                "linear-gradient(to right, var(--color-brand-accentCleaned), var(--color-brand-accentDocument), var(--color-brand-accentFormatting))",
            }}
          />

          {/* Per-category sections */}
          <div className="flex flex-col gap-2.5">
            {sorted
              .filter((cat) => cat.fixCount > 0)
              .map((cat) => {
                const accent = ACCENT_CSS[cat.accentColor];
                const pct =
                  totalCount > 0
                    ? Math.round((cat.fixCount / totalCount) * 100)
                    : 0;
                const desc = CATEGORY_DESCRIPTIONS[cat.name] || "";

                return (
                  <div key={cat.id}>
                    <div
                      className="font-medium"
                      style={{ fontSize: 12, color: accent }}
                    >
                      {cat.name}: {cat.fixCount} issues - {pct}%
                    </div>
                    <div
                      className="text-brand-textSecondary mt-0.5"
                      style={{ fontSize: 11, lineHeight: 1.5 }}
                    >
                      {desc}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
