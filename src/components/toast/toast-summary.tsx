"use client";

import { ChevronLeft, Check, Lock, Sparkles, Wand2, Type, Layers, Lightbulb } from "lucide-react";
import type { CategoryData } from "./toast-data";

const GLOW_GRADIENT =
  "linear-gradient(135deg, var(--color-brand-accentCleaned), var(--color-brand-accentFormatting))";

const ACCENT_CSS: Record<string, string> = {
  "brand-accentCleaned": "var(--color-brand-accentCleaned)",
  "brand-accentFormatting": "var(--color-brand-accentFormatting)",
  "brand-accentAi": "var(--color-brand-accentAi)",
  "brand-accentDocument": "var(--color-brand-accentDocument)",
};

const ICON_MAP: Record<string, React.ElementType> = {
  Wand2,
  Type,
  Lightbulb,
  Layers,
};

// Max issue types shown per category before "+N more"
const MAX_ISSUES_SHOWN = 1;

// ---- Free tier demo data ----

interface SummaryIssue {
  label: string;
  count: number;
  fixed: boolean;
}

interface SummaryCategoryData {
  id: string;
  name: string;
  accentColor: string;
  icon: string;
  fixedIssues: SummaryIssue[];
  detectedIssues: SummaryIssue[];
}

function buildSummaryCategories(categories: CategoryData[]): SummaryCategoryData[] {
  const FREE_FIXED_TYPES = new Set([
    "zero-width-space",
    "non-breaking-space",
    "ai-filler",
    "ai-greeting",
  ]);

  return categories.map((cat) => {
    const fixed: SummaryIssue[] = [];
    const detected: SummaryIssue[] = [];

    for (const issue of cat.issues) {
      const isFree = FREE_FIXED_TYPES.has(issue.type);
      const target = isFree ? fixed : detected;
      target.push({
        label: issue.label,
        count: issue.count,
        fixed: isFree,
      });
    }

    return {
      id: cat.id,
      name: cat.name,
      accentColor: cat.accentColor,
      icon: cat.icon,
      fixedIssues: fixed,
      detectedIssues: detected,
    };
  });
}

// ---- Component ----

interface ToastSummaryDrillProps {
  categories: CategoryData[];
  sourceApp: string;
  onBack: () => void;
}

export function ToastSummaryDrill({
  categories,
  sourceApp,
  onBack,
}: ToastSummaryDrillProps) {
  const summaryCategories = buildSummaryCategories(categories);

  const totalFixed = summaryCategories.reduce(
    (sum, c) => sum + c.fixedIssues.reduce((s, i) => s + i.count, 0),
    0
  );
  const totalDetected = summaryCategories.reduce(
    (sum, c) => sum + c.detectedIssues.reduce((s, i) => s + i.count, 0),
    0
  );

  // Sort: fixed (unlocked) categories first, then detected-only, preserving original data order within each group
  const withIssues = summaryCategories
    .filter((c) => c.fixedIssues.length > 0 || c.detectedIssues.length > 0)
    .sort((a, b) => {
      const aHasFixed = a.fixedIssues.length > 0;
      const bHasFixed = b.fixedIssues.length > 0;
      if (aHasFixed !== bHasFixed) return aHasFixed ? -1 : 1;
      return 0; // preserve original category order within each group
    });

  const cleanCategories = summaryCategories.filter(
    (c) => c.fixedIssues.length === 0 && c.detectedIssues.length === 0
  );

  // Build prose (NO em dashes - we remove AI slop, we don't generate it)
  let prose = `Cleaned ${totalFixed} issues from ${sourceApp}.`;
  if (totalDetected > 0) {
    prose += ` Detected ${totalDetected} more.`;
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ backgroundColor: "var(--color-brand-drillHeaderBg)" }}
      >
        <button
          onClick={onBack}
          className="flex items-center justify-center rounded-md transition-colors hover:bg-white/[0.05]"
          style={{
            width: 22,
            height: 22,
            backgroundColor: "var(--color-brand-cardBg)",
            border: "1px solid transparent",
            backgroundImage: `linear-gradient(var(--color-brand-cardBg), var(--color-brand-cardBg)), ${GLOW_GRADIENT}`,
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
          }}
        >
          <ChevronLeft size={10} className="text-brand-textSecondary" />
        </button>
        <svg width={0} height={0} style={{ position: "absolute" }}>
          <defs>
            <linearGradient id="summary-sparkle-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3be8b0" />
              <stop offset="50%" stopColor="#1aafd0" />
              <stop offset="100%" stopColor="#9B8FFF" />
            </linearGradient>
          </defs>
        </svg>
        <Sparkles size={13} stroke="url(#summary-sparkle-grad)" strokeWidth={2.2} />
        <span
          className="font-semibold text-brand-textPrimary"
          style={{ fontSize: 14 }}
        >
          Summary
        </span>
      </div>

      <div
        className="h-px"
        style={{ backgroundColor: "var(--color-brand-panelDivider)" }}
      />

      {/* Content */}
      <div className="px-2.5 pt-2 pb-2.5 space-y-1.5">
        {/* Prose */}
        <p
          className="text-brand-textSecondary px-0.5"
          style={{ fontSize: 11.5, lineHeight: 1.5 }}
        >
          {prose}
        </p>

        {/* Gradient divider */}
        <div
          className="h-px opacity-40"
          style={{
            background:
              "linear-gradient(to right, var(--color-brand-accentCleaned), var(--color-brand-accentDocument), var(--color-brand-accentFormatting))",
          }}
        />

        {/* Categories with issues */}
        {withIssues.map((cat) => (
          <CategorySection key={cat.id} category={cat} />
        ))}

        {/* Clean categories */}
        {cleanCategories.length > 0 && (
          <div className="flex flex-col">
            {cleanCategories.map((cat) => {
              const Icon = ICON_MAP[cat.icon];
              return (
                <div
                  key={cat.id}
                  className="flex items-center gap-1.5 px-2 py-1"
                >
                  {Icon && (
                    <Icon
                      size={11}
                      strokeWidth={2}
                      style={{ color: "var(--color-brand-textTertiary)" }}
                    />
                  )}
                  <span
                    className="text-brand-textTertiary flex-1"
                    style={{ fontSize: 10.5 }}
                  >
                    {cat.name}
                  </span>
                  <span
                    className="text-brand-textTertiary"
                    style={{ fontSize: 10.5 }}
                  >
                    clean
                  </span>
                  <Check
                    size={9}
                    strokeWidth={2.5}
                    style={{ color: "var(--color-brand-accentCleaned)", opacity: 0.5 }}
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* Go Pro CTA */}
        {totalDetected > 0 && (
          <button
            className="w-full flex items-center justify-center gap-2 rounded-lg transition-opacity hover:opacity-90"
            style={{
              height: 28,
              backgroundColor: "var(--color-brand-cardBg)",
              border: "1px solid transparent",
              backgroundImage: `linear-gradient(var(--color-brand-cardBg), var(--color-brand-cardBg)), ${GLOW_GRADIENT}`,
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
            }}
          >
            <span
              className="font-semibold bg-clip-text text-transparent"
              style={{
                fontSize: 11,
                backgroundImage:
                  "linear-gradient(135deg, #3be8b0, #1aafd0, #9B8FFF)",
              }}
            >
              Unlock all fixes
            </span>
            <span
              className="bg-clip-text text-transparent"
              style={{
                fontSize: 11,
                backgroundImage:
                  "linear-gradient(135deg, #3be8b0, #1aafd0, #9B8FFF)",
              }}
            >
              →
            </span>
            <span
              className="font-semibold bg-clip-text text-transparent"
              style={{
                fontSize: 11,
                backgroundImage:
                  "linear-gradient(135deg, #3be8b0, #1aafd0, #9B8FFF)",
              }}
            >
              Go Pro
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

// ---- Category Section (compact) ----

function CategorySection({ category }: { category: SummaryCategoryData }) {
  const accent = ACCENT_CSS[category.accentColor];
  const Icon = ICON_MAP[category.icon];
  const totalFixed = category.fixedIssues.reduce((s, i) => s + i.count, 0);
  const totalDetected = category.detectedIssues.reduce((s, i) => s + i.count, 0);

  // Build status label
  let statusLabel: React.ReactNode;
  if (totalFixed > 0 && totalDetected > 0) {
    statusLabel = (
      <span style={{ fontSize: 10.5 }}>
        <span style={{ color: "var(--color-brand-accentCleaned)" }}>
          {totalFixed} fixed
        </span>
        <span className="text-brand-textTertiary"> · </span>
        <span className="text-brand-tagLabel">
          {totalDetected} detected
        </span>
      </span>
    );
  } else if (totalFixed > 0) {
    statusLabel = (
      <span style={{ fontSize: 10.5, color: "var(--color-brand-accentCleaned)" }}>
        {totalFixed} fixed
      </span>
    );
  } else {
    statusLabel = (
      <span style={{ fontSize: 10.5 }} className="text-brand-tagLabel">
        {totalDetected} detected
      </span>
    );
  }

  return (
    <div
      className="rounded-md"
      style={{
        backgroundColor: "var(--color-brand-fixCardBg)",
        border: "0.5px solid var(--color-brand-border)",
      }}
    >
      {/* Category header */}
      <div className="flex items-center gap-1.5 px-2.5 py-1.5">
        {Icon && (
          <Icon size={12} strokeWidth={2} style={{ color: accent }} />
        )}
        <span
          className="font-semibold flex-1"
          style={{ fontSize: 11.5, color: accent }}
        >
          {category.name}
        </span>
        {statusLabel}
      </div>

      {/* Fixed issues (max 2 shown) */}
      {category.fixedIssues.length > 0 && (
        <div className="px-2.5 pb-1">
          {category.fixedIssues.slice(0, MAX_ISSUES_SHOWN).map((issue) => (
            <div
              key={issue.label}
              className="flex items-center gap-1.5 py-px"
              style={{ paddingLeft: 18 }}
            >
              <span
                className="text-brand-textSecondary flex-1"
                style={{ fontSize: 10.5 }}
              >
                {issue.count}x {issue.label}
              </span>
              <Check
                size={9}
                strokeWidth={2.5}
                style={{ color: "var(--color-brand-accentCleaned)" }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Detected (Pro-locked) issues */}
      {category.detectedIssues.length > 0 && (
        <div
          className="mx-2 mb-2 rounded"
          style={{
            backgroundColor: `color-mix(in srgb, ${accent} 4%, transparent)`,
            border: `0.5px solid color-mix(in srgb, ${accent} 15%, transparent)`,
          }}
        >
          {category.detectedIssues.slice(0, MAX_ISSUES_SHOWN).map((issue, idx) => (
            <div
              key={issue.label}
              className="flex items-center gap-1.5 px-2 py-[3px]"
              style={{
                borderTop:
                  idx > 0
                    ? `0.5px solid color-mix(in srgb, ${accent} 8%, transparent)`
                    : undefined,
              }}
            >
              <span
                className="flex-1"
                style={{
                  fontSize: 10.5,
                  color: `color-mix(in srgb, ${accent} 50%, var(--color-brand-textSecondary))`,
                }}
              >
                {issue.count}x {issue.label}
              </span>
              <Lock
                size={8}
                strokeWidth={2}
                className="text-brand-tagLabel"
                style={{ opacity: 0.6 }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
