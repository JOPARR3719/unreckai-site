"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { TOAST_DATA, type CategoryData, type PreviewData } from "../toast/toast-data";
import { CLIPBOARD_STATS } from "./clipboard-data";

const ACCENT_CSS: Record<string, string> = {
  "brand-accentCleaned": "var(--color-brand-accentCleaned)",
  "brand-accentFormatting": "var(--color-brand-accentFormatting)",
  "brand-accentAi": "var(--color-brand-accentAi)",
  "brand-accentDocument": "var(--color-brand-accentDocument)",
};

interface ClipboardContentProps {
  view: "overview" | "drill";
  drillCategoryId: string | null;
  compareType: string | null;
  previewIndex: number;
  onDrill: (categoryId: string) => void;
  onBack: () => void;
  onToggleCompare: (type: string) => void;
  onSetPreviewIndex: (index: number) => void;
}

export function ClipboardContent({
  view,
  drillCategoryId,
  compareType,
  previewIndex,
  onDrill,
  onBack,
  onToggleCompare,
  onSetPreviewIndex,
}: ClipboardContentProps) {
  const activeCat = TOAST_DATA.categories.find((c) => c.id === drillCategoryId);

  return (
    <div className="relative overflow-hidden">
      {/* Overview */}
      <div
        className="transition-all duration-300 ease-in-out"
        style={{
          transform: view === "overview" ? "translateX(0)" : "translateX(-100%)",
          opacity: view === "overview" ? 1 : 0,
          position: view === "overview" ? "relative" : "absolute",
          top: 0,
          left: 0,
          width: "100%",
          pointerEvents: view === "overview" ? "auto" : "none",
        }}
      >
        <Overview onDrill={onDrill} />
      </div>

      {/* Drill */}
      <div
        className="transition-all duration-300 ease-in-out"
        style={{
          transform: view === "drill" ? "translateX(0)" : "translateX(100%)",
          opacity: view === "drill" ? 1 : 0,
          position: view === "drill" ? "relative" : "absolute",
          top: 0,
          left: 0,
          width: "100%",
          pointerEvents: view === "drill" ? "auto" : "none",
        }}
      >
        {activeCat && (
          <DrillView
            category={activeCat}
            compareType={compareType}
            previewIndex={previewIndex}
            onBack={onBack}
            onToggleCompare={onToggleCompare}
            onSetPreviewIndex={onSetPreviewIndex}
          />
        )}
      </div>
    </div>
  );
}

// ---- Overview ----

function Overview({ onDrill }: { onDrill: (id: string) => void }) {
  return (
    <div className="space-y-4 px-4 pb-3">
      {/* Stats card */}
      <div
        className="rounded-xl p-[1px]"
        style={{
          background:
            "linear-gradient(135deg, var(--color-brand-accentCleaned), var(--color-brand-accentFormatting))",
        }}
      >
        <div className="rounded-[calc(0.75rem-1px)] bg-brand-cardBg p-5">
          <div className="grid grid-cols-2 divide-x divide-brand-border">
            <div className="text-center pr-4">
              <p className="text-[26px] font-semibold text-brand-textPrimary leading-tight">
                {CLIPBOARD_STATS.pastesCleaned}
              </p>
              <p className="text-xs text-brand-accentCleaned mt-1">
                pastes cleaned
              </p>
            </div>
            <div className="text-center pl-4">
              <p className="text-[26px] font-semibold text-brand-textPrimary leading-tight">
                {CLIPBOARD_STATS.issuesFixed}
              </p>
              <p
                className="text-xs mt-1"
                style={{ color: "var(--color-brand-accentDocument)" }}
              >
                issues fixed
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Last paste card */}
      <div
        className="rounded-xl p-[1px]"
        style={{
          background:
            "linear-gradient(135deg, var(--color-brand-accentCleaned), var(--color-brand-accentFormatting))",
        }}
      >
        <div className="rounded-[calc(0.75rem-1px)] bg-brand-cardBg p-5 space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-brand-textPrimary">
              Last paste
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-brand-textSecondary">Source</span>
              <span className="flex items-center gap-1.5 text-xs text-brand-textPrimary px-2.5 py-1 rounded-full border border-brand-borderSolid bg-brand-itemBg">
                <img
                  src="/images/openai.svg"
                  alt="ChatGPT"
                  className="w-3 h-3 brightness-0 invert"
                />
                {TOAST_DATA.sourceApp}
              </span>
            </div>
          </div>

          {/* Category rows */}
          <div className="space-y-0">
            {TOAST_DATA.categories.map((cat, i) => {
              const color = ACCENT_CSS[cat.accentColor];
              return (
                <button
                  key={cat.id}
                  onClick={() => onDrill(cat.id)}
                  className={`flex items-center justify-between py-3 w-full group transition-colors hover:bg-white/[0.02] rounded-lg px-1 -mx-1 ${
                    i < TOAST_DATA.categories.length - 1
                      ? "border-b border-brand-border"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-[3px] h-[18px] rounded-full"
                      style={{
                        backgroundColor: color,
                        boxShadow: `0 0 6px ${color}`,
                      }}
                    />
                    <span className="text-sm text-brand-textPrimary font-medium">
                      {cat.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold" style={{ color }}>
                      {cat.fixCount}
                    </span>
                    <ChevronRight
                      size={14}
                      className="text-brand-textTertiary group-hover:text-brand-textSecondary transition-colors"
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- Drill View ----

interface DrillViewProps {
  category: CategoryData;
  compareType: string | null;
  previewIndex: number;
  onBack: () => void;
  onToggleCompare: (type: string) => void;
  onSetPreviewIndex: (index: number) => void;
}

function DrillView({
  category,
  compareType,
  previewIndex,
  onBack,
  onToggleCompare,
  onSetPreviewIndex,
}: DrillViewProps) {
  const accent = ACCENT_CSS[category.accentColor];

  return (
    <div className="px-4 pb-3">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 mb-3 px-2 py-1.5 rounded-md transition-colors hover:bg-white/[0.03]"
        style={{
          border: "1px solid transparent",
          backgroundImage: `linear-gradient(var(--color-brand-bgSurface), var(--color-brand-bgSurface)), linear-gradient(135deg, var(--color-brand-accentCleaned), var(--color-brand-accentFormatting))`,
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
        }}
      >
        <ChevronLeft size={14} className="text-brand-tagLabel" />
        <span className="text-xs font-semibold" style={{ color: accent }}>
          {category.name}
        </span>
        <span
          className="text-[10px] font-bold px-1.5 py-0.5 rounded ml-1"
          style={{
            backgroundColor: `color-mix(in srgb, ${accent} 12%, transparent)`,
            color: accent,
          }}
        >
          {category.fixCount}
        </span>
      </button>

      {/* Issue cards */}
      <div className="space-y-2">
        {category.issues.map((issue) => {
          const isComparing = compareType === issue.type;
          const hasPreviews = issue.previews && issue.previews.length > 0;
          const currentPreview = hasPreviews
            ? issue.previews![Math.min(previewIndex, issue.previews!.length - 1)]
            : null;
          const totalPreviews = issue.previews?.length ?? 0;
          const isEmDash = issue.type === "em-dash";

          return (
            <div
              key={issue.type}
              className="rounded-lg px-3 py-2.5 transition-colors"
              style={{
                backgroundColor: "var(--color-brand-fixCardBg)",
                border: isComparing
                  ? `1px solid ${accent}`
                  : "1px solid rgba(0, 0, 0, 0.3)",
              }}
            >
              {/* Card header */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-brand-textSecondary flex-1">
                  {issue.label}
                </span>
                {issue.count > 1 && (
                  <span
                    className="text-xs font-bold px-1.5 py-0.5 rounded shrink-0"
                    style={{
                      fontSize: 11,
                      color: accent,
                      backgroundColor: `color-mix(in srgb, ${accent} 12%, transparent)`,
                    }}
                  >
                    {issue.count}
                  </span>
                )}
                <button
                  onClick={() => onToggleCompare(issue.type)}
                  className="shrink-0 px-2 py-0.5 rounded transition-colors"
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    color: isComparing ? accent : "var(--color-brand-tagLabel)",
                    border: isComparing ? `1px solid ${accent}` : undefined,
                    backgroundImage: !isComparing
                      ? `linear-gradient(var(--color-brand-fixCardBg), var(--color-brand-fixCardBg)), linear-gradient(135deg, var(--color-brand-accentCleaned), var(--color-brand-accentFormatting))`
                      : undefined,
                    backgroundOrigin: !isComparing ? "border-box" : undefined,
                    backgroundClip: !isComparing ? "padding-box, border-box" : undefined,
                    borderWidth: !isComparing ? 1 : undefined,
                    borderStyle: !isComparing ? "solid" : undefined,
                    borderColor: !isComparing ? "transparent" : undefined,
                  }}
                >
                  Compare
                </button>
              </div>

              {/* Compare content */}
              {isComparing && (
                <div className="mt-2.5">
                  {hasPreviews && currentPreview ? (
                    <>
                      <PreviewBox preview={currentPreview} accent={accent} />

                      {totalPreviews > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-2">
                          <button
                            onClick={() => onSetPreviewIndex(Math.max(0, previewIndex - 1))}
                            disabled={previewIndex === 0}
                            className="p-0.5 rounded transition-colors disabled:opacity-30"
                          >
                            <ChevronLeft size={12} className="text-brand-tagLabel" />
                          </button>
                          <span className="text-brand-textSecondary tabular-nums" style={{ fontSize: 11 }}>
                            {previewIndex + 1} of {totalPreviews}
                          </span>
                          <button
                            onClick={() => onSetPreviewIndex(Math.min(totalPreviews - 1, previewIndex + 1))}
                            disabled={previewIndex === totalPreviews - 1}
                            className="p-0.5 rounded transition-colors disabled:opacity-30"
                          >
                            <ChevronRight size={12} className="text-brand-tagLabel" />
                          </button>
                        </div>
                      )}

                      {isEmDash && (
                        <div className="flex gap-1.5 mt-2">
                          {[
                            { label: "- hyphen", value: "-" },
                            { label: "; semi", value: ";" },
                            { label: ", comma", value: "," },
                          ].map((opt) => (
                            <button
                              key={opt.value}
                              className="text-brand-tagLabel px-2 py-0.5 rounded transition-colors hover:bg-white/[0.05]"
                              style={{
                                fontSize: 10,
                                border: "1px solid var(--color-brand-borderSolid)",
                              }}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-xs text-brand-textTertiary italic">
                      Applied automatically
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---- Preview Box ----

function PreviewBox({ preview, accent }: { preview: PreviewData; accent: string }) {
  return (
    <div className="space-y-1.5">
      {/* Before */}
      <div>
        <span
          className="font-bold uppercase"
          style={{ fontSize: 9, letterSpacing: "0.05em", color: accent }}
        >
          Before
        </span>
        <div
          className="mt-1 px-2.5 py-1.5 rounded-md text-xs text-brand-textSecondary"
          style={{
            backgroundColor: "var(--color-brand-bgSurface)",
            backgroundImage: `linear-gradient(var(--color-brand-bgSurface), var(--color-brand-bgSurface)), linear-gradient(135deg, var(--color-brand-accentCleaned), var(--color-brand-accentFormatting))`,
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
            border: "1px solid transparent",
          }}
        >
          <DiffText before={preview.before} after={preview.after} type="before" accent={accent} />
        </div>
      </div>
      {/* After */}
      <div>
        <span
          className="font-bold uppercase"
          style={{ fontSize: 9, letterSpacing: "0.05em", color: accent }}
        >
          After
        </span>
        <div
          className="mt-1 px-2.5 py-1.5 rounded-md text-xs text-brand-textSecondary"
          style={{
            backgroundColor: "var(--color-brand-bgSurface)",
            backgroundImage: `linear-gradient(var(--color-brand-bgSurface), var(--color-brand-bgSurface)), linear-gradient(135deg, var(--color-brand-accentCleaned), var(--color-brand-accentFormatting))`,
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
            border: "1px solid transparent",
          }}
        >
          {preview.after === "" ? (
            <span className="text-brand-textTertiary italic">(removed)</span>
          ) : (
            <DiffText before={preview.before} after={preview.after} type="after" accent={accent} />
          )}
        </div>
      </div>
    </div>
  );
}

// ---- DiffText ----

function DiffText({
  before,
  after,
  type,
  accent,
}: {
  before: string;
  after: string;
  type: "before" | "after";
  accent: string;
}) {
  const source = type === "before" ? before : after;
  const target = type === "before" ? after : before;

  if (source === target) return <span>{source}</span>;
  if (target === "") return <span style={{ backgroundColor: `color-mix(in srgb, ${accent} 25%, transparent)`, borderRadius: 2 }}>{source}</span>;
  if (source === "") return null;

  let prefixLen = 0;
  while (prefixLen < source.length && prefixLen < target.length && source[prefixLen] === target[prefixLen]) prefixLen++;

  let suffixLen = 0;
  while (suffixLen < source.length - prefixLen && suffixLen < target.length - prefixLen && source[source.length - 1 - suffixLen] === target[target.length - 1 - suffixLen]) suffixLen++;

  const segments: { text: string; changed: boolean }[] = [];
  if (prefixLen > 0) segments.push({ text: source.substring(0, prefixLen), changed: false });
  const middleEnd = source.length - suffixLen;
  if (middleEnd > prefixLen) segments.push({ text: source.substring(prefixLen, middleEnd), changed: true });
  if (suffixLen > 0) segments.push({ text: source.substring(source.length - suffixLen), changed: false });

  return (
    <span>
      {segments.map((seg, i) =>
        seg.changed ? (
          <span key={i} style={{ backgroundColor: `color-mix(in srgb, ${accent} 25%, transparent)`, borderRadius: 2 }}>{seg.text}</span>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      )}
    </span>
  );
}
