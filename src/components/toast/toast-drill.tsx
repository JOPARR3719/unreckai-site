"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CategoryData, IssueGroupData, PreviewData } from "./toast-data";

const ACCENT_CSS: Record<string, string> = {
  "brand-accentCleaned": "var(--color-brand-accentCleaned)",
  "brand-accentFormatting": "var(--color-brand-accentFormatting)",
  "brand-accentAi": "var(--color-brand-accentAi)",
  "brand-accentDocument": "var(--color-brand-accentDocument)",
};

interface ToastDrillProps {
  category: CategoryData;
  compareType: string | null;
  previewIndex: number;
  onBack: () => void;
  onToggleCompare: (type: string) => void;
  onSetPreviewIndex: (index: number) => void;
}

export function ToastDrill({
  category,
  compareType,
  previewIndex,
  onBack,
  onToggleCompare,
  onSetPreviewIndex,
}: ToastDrillProps) {
  const accent = ACCENT_CSS[category.accentColor];

  return (
    <div className="px-3 py-1">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 mb-2 px-2 py-1.5 rounded-md transition-colors hover:bg-white/[0.03]"
        style={{
          border: "1px solid transparent",
          backgroundImage: `linear-gradient(var(--color-brand-bgSurface), var(--color-brand-bgSurface)), linear-gradient(135deg, var(--color-brand-accentCleaned), var(--color-brand-accentFormatting))`,
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
        }}
      >
        <ChevronLeft size={14} className="text-brand-tagLabel" />
        <span
          className="text-xs font-semibold"
          style={{ color: accent }}
        >
          {category.name}
        </span>
      </button>

      {/* Issue cards */}
      <div className="space-y-2">
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
}

function IssueCard({
  issue,
  accent,
  isComparing,
  previewIndex,
  onToggleCompare,
  onSetPreviewIndex,
  isEmDash,
}: IssueCardProps) {
  const hasPreviews = issue.previews && issue.previews.length > 0;
  const currentPreview = hasPreviews
    ? issue.previews![Math.min(previewIndex, issue.previews!.length - 1)]
    : null;
  const totalPreviews = issue.previews?.length ?? 0;

  return (
    <div
      className="rounded-lg px-3 py-2.5 transition-colors"
      style={{
        backgroundColor: "var(--color-brand-fixCardBg)",
        border: isComparing
          ? `1px solid ${accent}`
          : "1px solid rgba(0, 0, 0, 0.3)",
      }}
    >
      {/* Card header: label + count + compare */}
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
          onClick={onToggleCompare}
          className="shrink-0 px-2 py-0.5 rounded transition-colors"
          style={{
            fontSize: 10,
            fontWeight: 500,
            color: isComparing ? accent : "var(--color-brand-tagLabel)",
            border: isComparing
              ? `1px solid ${accent}`
              : undefined,
            backgroundImage: !isComparing
              ? `linear-gradient(var(--color-brand-fixCardBg), var(--color-brand-fixCardBg)), linear-gradient(135deg, var(--color-brand-accentCleaned), var(--color-brand-accentFormatting))`
              : undefined,
            backgroundOrigin: !isComparing ? "border-box" : undefined,
            backgroundClip: !isComparing
              ? "padding-box, border-box"
              : undefined,
            borderWidth: !isComparing ? 1 : undefined,
            borderStyle: !isComparing ? "solid" : undefined,
            borderColor: !isComparing ? "transparent" : undefined,
          }}
        >
          Compare
        </button>
      </div>

      {/* Compare content (shown when active) */}
      {isComparing && (
        <div className="mt-2.5">
          {hasPreviews && currentPreview ? (
            <>
              <PreviewBox
                preview={currentPreview}
                accent={accent}
                isEmDash={isEmDash}
              />

              {/* Paginator */}
              {totalPreviews > 1 && (
                <div className="flex items-center justify-center gap-2 mt-2">
                  <button
                    onClick={() =>
                      onSetPreviewIndex(Math.max(0, previewIndex - 1))
                    }
                    disabled={previewIndex === 0}
                    className="p-0.5 rounded transition-colors disabled:opacity-30"
                  >
                    <ChevronLeft
                      size={12}
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
                      size={12}
                      className="text-brand-tagLabel"
                    />
                  </button>
                </div>
              )}

              {/* Em dash replacement buttons */}
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
                        border:
                          "1px solid var(--color-brand-borderSolid)",
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
}

// ---- PreviewBox ----

interface PreviewBoxProps {
  preview: PreviewData;
  accent: string;
  isEmDash: boolean;
}

function PreviewBox({ preview, accent }: PreviewBoxProps) {
  return (
    <div className="space-y-1.5">
      {/* Before */}
      <div>
        <span
          className="font-bold uppercase"
          style={{
            fontSize: 9,
            letterSpacing: "0.05em",
            color: accent,
          }}
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
            color: accent,
          }}
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
            <span className="text-brand-textTertiary italic">
              (removed)
            </span>
          ) : (
            <DiffText
              before={preview.before}
              after={preview.after}
              type="after"
              accent={accent}
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
  // Use simple LCS-based approach to highlight differences
  // For the demo, we use a pragmatic approach: find common prefix/suffix, mark middle as changed
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
