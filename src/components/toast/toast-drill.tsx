"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CategoryData, IssueGroupData, PreviewData } from "./toast-data";
import type { ClickTarget } from "./interactive-toast";

const ACCENT_CSS: Record<string, string> = {
  "brand-accentCleaned": "var(--color-brand-accentCleaned)",
  "brand-accentFormatting": "var(--color-brand-accentFormatting)",
  "brand-accentAi": "var(--color-brand-accentAi)",
  "brand-accentDocument": "var(--color-brand-accentDocument)",
};

const GLOW_GRADIENT =
  "linear-gradient(135deg, var(--color-brand-accentCleaned), var(--color-brand-accentFormatting))";

const GLOW_GRADIENT_FADED =
  "linear-gradient(135deg, color-mix(in srgb, var(--color-brand-accentCleaned) 35%, transparent), color-mix(in srgb, var(--color-brand-accentFormatting) 35%, transparent))";

interface ToastDrillProps {
  category: CategoryData;
  compareType: string | null;
  previewIndex: number;
  onBack: () => void;
  onToggleCompare: (type: string) => void;
  onSetPreviewIndex: (index: number) => void;
  clickTarget?: ClickTarget;
}

export function ToastDrill({
  category,
  compareType,
  previewIndex,
  onBack,
  onToggleCompare,
  onSetPreviewIndex,
  clickTarget,
}: ToastDrillProps) {
  const accent = ACCENT_CSS[category.accentColor];

  const totalCount = category.issues.reduce((sum, i) => sum + i.count, 0);

  return (
    <div>
      {/* Drill header: back chevron + category name + count */}
      <div
        className="flex items-center gap-2 px-3 py-2.5"
        style={{ backgroundColor: "var(--color-brand-drillHeaderBg, rgba(0,0,0,0.15))" }}
      >
        <button
          onClick={onBack}
          className="shrink-0 flex items-center justify-center rounded-md transition-colors hover:bg-white/[0.05]"
          style={{
            width: 22,
            height: 22,
            backgroundColor: "var(--color-brand-cardBg)",
            border: "1px solid transparent",
            backgroundImage: `linear-gradient(var(--color-brand-cardBg), var(--color-brand-cardBg)), ${GLOW_GRADIENT}`,
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
            animation: clickTarget === "back" ? "toast-click-pulse 900ms ease-out" : undefined,
          }}
        >
          <ChevronLeft size={10} className="text-brand-textSecondary" />
        </button>

        <span
          className="font-semibold"
          style={{ fontSize: 12.5, color: `color-mix(in srgb, ${accent} 75%, var(--color-brand-textSecondary))` }}
        >
          {category.name}
        </span>

        <div className="flex-1" />

        <span
          className="font-bold"
          style={{ fontSize: 13, color: `color-mix(in srgb, ${accent} 65%, var(--color-brand-textSecondary))` }}
        >
          {totalCount}
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/[0.10]" />

      {/* Issue cards */}
      <div className="p-2 space-y-1.5">
        {category.issues.map((issue) => (
          <IssueCard
            key={issue.type}
            issue={issue}
            accent={accent}
            isComparing={compareType === issue.type}
            previewIndex={
              compareType === issue.type ? previewIndex : 0
            }
            onToggleCompare={() => onToggleCompare(issue.type)}
            onSetPreviewIndex={onSetPreviewIndex}
            isEmDash={issue.type === "em-dash"}
            clickTarget={clickTarget}
          />
        ))}
      </div>
    </div>
  );
}

// ---- IssueCard ----

interface IssueCardProps {
  issue: IssueGroupData;
  accent: string;
  isComparing: boolean;
  previewIndex: number;
  onToggleCompare: () => void;
  onSetPreviewIndex: (index: number) => void;
  isEmDash: boolean;
  clickTarget?: ClickTarget;
}

function IssueCard({
  issue,
  accent,
  isComparing,
  previewIndex,
  onToggleCompare,
  onSetPreviewIndex,
  isEmDash,
  clickTarget,
}: IssueCardProps) {
  const hasPreviews = issue.previews && issue.previews.length > 0;
  const currentPreview = hasPreviews
    ? issue.previews![Math.min(previewIndex, issue.previews!.length - 1)]
    : null;
  const totalPreviews = issue.previews?.length ?? 0;

  return (
    <div
      className="rounded-lg"
      style={{
        padding: "9px 11px",
        backgroundColor: "var(--color-brand-fixCardBg)",
        border: isComparing
          ? `1px solid color-mix(in srgb, ${accent} 40%, transparent)`
          : "1px solid rgba(0, 0, 0, 0.3)",
        transition: "border-color 400ms ease",
      }}
    >
      {/* Card header: label + count + compare */}
      <div className="flex items-center gap-2">
        <span
          className="text-brand-textSecondary flex-1"
          style={{ fontSize: 12 }}
        >
          {issue.label}
        </span>

        {issue.count > 1 && (
          <span
            className="font-bold px-1.5 py-0.5 rounded shrink-0"
            style={{
              fontSize: 11,
              color: `color-mix(in srgb, ${accent} 70%, var(--color-brand-textSecondary))`,
              backgroundColor: `color-mix(in srgb, ${accent} 8%, transparent)`,
            }}
          >
            {issue.count}
          </span>
        )}

        <button
          onClick={onToggleCompare}
          className="shrink-0 rounded"
          style={{
            fontSize: 10,
            fontWeight: 500,
            padding: "0 9px",
            height: 22,
            display: "flex",
            alignItems: "center",
            transition: "all 400ms ease",
            color: isComparing
              ? `color-mix(in srgb, ${accent} 80%, white)`
              : "var(--color-brand-textSecondary)",
            border: isComparing
              ? `1px solid color-mix(in srgb, ${accent} 45%, transparent)`
              : undefined,
            backgroundColor: isComparing
              ? `color-mix(in srgb, ${accent} 8%, transparent)`
              : "var(--color-brand-cardBg)",
            backgroundImage: !isComparing
              ? `linear-gradient(var(--color-brand-cardBg), var(--color-brand-cardBg)), ${GLOW_GRADIENT}`
              : undefined,
            backgroundOrigin: !isComparing ? "border-box" : undefined,
            backgroundClip: !isComparing
              ? "padding-box, border-box"
              : undefined,
            borderWidth: !isComparing ? 1 : undefined,
            borderStyle: !isComparing ? "solid" : undefined,
            borderColor: !isComparing ? "transparent" : undefined,
            animation: isEmDash && clickTarget === "compare-em-dash" ? "toast-click-pulse 900ms ease-out" : undefined,
          }}
        >
          Compare
        </button>
      </div>

      {/* Compare content — smooth height via grid-rows */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: isComparing ? "1fr" : "0fr",
          transition: "grid-template-rows 500ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div className="pt-2">
            {hasPreviews && currentPreview ? (
              <>
                <PreviewBox
                  preview={currentPreview}
                  accent={accent}
                  isEmDash={isEmDash}
                />

                {/* Paginator */}
                {totalPreviews > 1 && (
                  <div className="flex items-center justify-center gap-3 mt-1.5">
                    <button
                      onClick={() =>
                        onSetPreviewIndex(Math.max(0, previewIndex - 1))
                      }
                      disabled={previewIndex === 0}
                      className="p-0.5 rounded transition-colors disabled:opacity-30"
                    >
                      <ChevronLeft
                        size={10}
                        className="text-brand-tagLabel"
                      />
                    </button>
                    <span
                      className="text-brand-textSecondary tabular-nums"
                      style={{ fontSize: 11 }}
                    >
                      {previewIndex + 1} of {totalPreviews}
                    </span>
                    <button
                      onClick={() =>
                        onSetPreviewIndex(
                          Math.min(totalPreviews - 1, previewIndex + 1)
                        )
                      }
                      disabled={previewIndex === totalPreviews - 1}
                      className="p-0.5 rounded transition-colors disabled:opacity-30"
                    >
                      <ChevronRight
                        size={10}
                        className="text-brand-tagLabel"
                      />
                    </button>
                  </div>
                )}

                {/* Em dash replacement buttons */}
                {isEmDash && (
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span
                      className="text-brand-textTertiary"
                      style={{ fontSize: 10 }}
                    >
                      Or replace:
                    </span>
                    {[
                      { label: "- hyphen", value: "-" },
                      { label: "; semi", value: ";" },
                      { label: ", comma", value: "," },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        className="text-brand-textSecondary rounded transition-colors hover:bg-white/[0.05]"
                        style={{
                          fontSize: 10,
                          fontWeight: 500,
                          padding: "0 8px",
                          height: 22,
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: "var(--color-brand-cardBg)",
                          border:
                            "0.5px solid color-mix(in srgb, var(--color-brand-accentFormatting) 40%, transparent)",
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <p
                className="text-brand-textTertiary"
                style={{ fontSize: 11 }}
              >
                {issue.fixed === false ? "AI pattern detected" : "Applied automatically"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- PreviewBox ----

interface PreviewBoxProps {
  preview: PreviewData;
  accent: string;
  isEmDash: boolean;
}

function PreviewBox({ preview, accent }: PreviewBoxProps) {
  const isRemoved = preview.after === "";

  return (
    <div className="space-y-1">
      {/* Before */}
      <div>
        <span
          className="font-bold uppercase"
          style={{
            fontSize: 9,
            letterSpacing: "0.05em",
            color: `color-mix(in srgb, ${accent} 70%, var(--color-brand-textSecondary))`,
          }}
        >
          Before
        </span>
        <div
          className="mt-0.5 px-2.5 py-1.5 rounded-md text-brand-textSecondary"
          style={{
            fontSize: 12,
            backgroundColor: "var(--color-brand-bgSurface)",
            backgroundImage: `linear-gradient(var(--color-brand-bgSurface), var(--color-brand-bgSurface)), ${GLOW_GRADIENT_FADED}`,
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
            border: "1px solid transparent",
          }}
        >
          <DiffText
            before={preview.before}
            after={preview.after}
            type="before"
            accent={accent}
          />
        </div>
      </div>

      {/* After */}
      <div>
        <span
          className="font-bold uppercase"
          style={{
            fontSize: 9,
            letterSpacing: "0.05em",
            color: "color-mix(in srgb, var(--color-brand-accentCleaned) 70%, var(--color-brand-textSecondary))",
          }}
        >
          After
        </span>
        <div
          className="mt-0.5 px-2.5 py-1.5 rounded-md text-brand-textSecondary"
          style={{
            fontSize: 12,
            backgroundColor: "var(--color-brand-bgSurface)",
            backgroundImage: `linear-gradient(var(--color-brand-bgSurface), var(--color-brand-bgSurface)), ${GLOW_GRADIENT_FADED}`,
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
            border: "1px solid transparent",
          }}
        >
          {isRemoved ? (
            <span className="text-brand-accentCleaned">
              Removed entirely
            </span>
          ) : (
            <DiffText
              before={preview.before}
              after={preview.after}
              type="after"
              accent="var(--color-brand-accentCleaned)"
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ---- DiffText: highlight changed characters ----

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

  // Simple char-level diff: find spans that differ
  const segments = computeDiffSegments(source, target);

  return (
    <span>
      {segments.map((seg, i) =>
        seg.changed ? (
          <span
            key={i}
            style={{
              backgroundColor: `color-mix(in srgb, ${accent} 25%, transparent)`,
              borderRadius: 2,
            }}
          >
            {seg.text}
          </span>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      )}
    </span>
  );
}

interface DiffSegment {
  text: string;
  changed: boolean;
}

function computeDiffSegments(
  source: string,
  target: string
): DiffSegment[] {
  if (source === target) {
    return [{ text: source, changed: false }];
  }
  if (target === "") {
    return [{ text: source, changed: true }];
  }
  if (source === "") {
    return [];
  }

  // Find common prefix
  let prefixLen = 0;
  while (
    prefixLen < source.length &&
    prefixLen < target.length &&
    source[prefixLen] === target[prefixLen]
  ) {
    prefixLen++;
  }

  // Find common suffix (not overlapping prefix)
  let suffixLen = 0;
  while (
    suffixLen < source.length - prefixLen &&
    suffixLen < target.length - prefixLen &&
    source[source.length - 1 - suffixLen] ===
      target[target.length - 1 - suffixLen]
  ) {
    suffixLen++;
  }

  const segments: DiffSegment[] = [];

  if (prefixLen > 0) {
    segments.push({ text: source.substring(0, prefixLen), changed: false });
  }

  const middleStart = prefixLen;
  const middleEnd = source.length - suffixLen;
  if (middleEnd > middleStart) {
    segments.push({
      text: source.substring(middleStart, middleEnd),
      changed: true,
    });
  }

  if (suffixLen > 0) {
    segments.push({
      text: source.substring(source.length - suffixLen),
      changed: false,
    });
  }

  return segments;
}
