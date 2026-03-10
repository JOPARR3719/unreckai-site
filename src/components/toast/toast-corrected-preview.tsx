"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, PenLine } from "lucide-react";

const GLOW_GRADIENT =
  "linear-gradient(135deg, var(--color-brand-accentCleaned), var(--color-brand-accentFormatting))";

interface CorrectedPreviewCardProps {
  fixedCount: number;
  onClick: () => void;
}

export function CorrectedPreviewCard({
  fixedCount,
  onClick,
}: CorrectedPreviewCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2.5 rounded-lg transition-colors hover:bg-white/[0.03] text-left"
      style={{
        padding: "9px 12px",
        border: "1px solid transparent",
        backgroundImage: `linear-gradient(135deg, color-mix(in srgb, var(--color-brand-accentCleaned) 14%, var(--color-brand-cardBg)), color-mix(in srgb, var(--color-brand-accentFormatting) 14%, var(--color-brand-cardBg))), ${GLOW_GRADIENT}`,
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
      }}
    >
      <PenLine size={14} strokeWidth={2.2} className="text-brand-textPrimary shrink-0" />
      <span
        className="font-semibold text-brand-textPrimary flex-1"
        style={{ fontSize: "12.5px" }}
      >
        Corrected Preview
      </span>
      <span
        className="text-xs px-2 py-0.5 rounded-full shrink-0"
        style={{
          fontSize: 11,
          color: "var(--color-brand-tagLabel)",
          border: "0.5px solid var(--color-brand-borderLight)",
          backgroundColor: "var(--color-brand-fixCardBg)",
        }}
      >
        {fixedCount} issues found
      </span>
      <ChevronRight size={18} className="text-brand-tagLabel shrink-0" />
    </button>
  );
}

// ─── LCS Diff Algorithm (ported from iOS ExpandedTextPreviewView) ────────────

interface DiffSegment {
  text: string;
  type: "unchanged" | "removed" | "added";
}

function tokenize(text: string): string[] {
  const tokens: string[] = [];
  let current = "";
  let inWhitespace = false;
  for (const char of text) {
    const charIsSpace = /\s/.test(char);
    if (charIsSpace !== inWhitespace && current.length > 0) {
      tokens.push(current);
      current = "";
    }
    current += char;
    inWhitespace = charIsSpace;
  }
  if (current.length > 0) tokens.push(current);
  return tokens;
}

function longestCommonSubsequence(a: string[], b: string[]): string[] {
  const m = a.length;
  const n = b.length;
  if (m === 0 || n === 0) return [];
  if (m > 2000 || n > 2000) return [];

  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array(n + 1).fill(0)
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const lcs: string[] = [];
  let i = m,
    j = n;
  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      lcs.push(a[i - 1]);
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }
  return lcs.reverse();
}

function computeDiff(original: string, cleaned: string): DiffSegment[] {
  const origTokens = tokenize(original);
  const cleanTokens = tokenize(cleaned);
  const lcs = longestCommonSubsequence(origTokens, cleanTokens);

  const segments: DiffSegment[] = [];
  let oi = 0,
    ci = 0,
    li = 0;

  while (oi < origTokens.length || ci < cleanTokens.length) {
    if (
      oi < origTokens.length &&
      ci < cleanTokens.length &&
      li < lcs.length &&
      origTokens[oi] === lcs[li] &&
      cleanTokens[ci] === lcs[li]
    ) {
      segments.push({ text: origTokens[oi], type: "unchanged" });
      oi++;
      ci++;
      li++;
    } else if (
      oi < origTokens.length &&
      (li >= lcs.length || origTokens[oi] !== lcs[li])
    ) {
      segments.push({ text: origTokens[oi], type: "removed" });
      oi++;
    } else if (
      ci < cleanTokens.length &&
      (li >= lcs.length || cleanTokens[ci] !== lcs[li])
    ) {
      segments.push({ text: cleanTokens[ci], type: "added" });
      ci++;
    } else {
      break;
    }
  }

  return segments;
}

// ─── Drill Component ─────────────────────────────────────────────────────────

interface CorrectedPreviewDrillProps {
  originalText: string;
  cleanedText: string;
  onBack: () => void;
}

export function CorrectedPreviewDrill({
  originalText,
  cleanedText,
  onBack,
}: CorrectedPreviewDrillProps) {
  const [showingDiff, setShowingDiff] = useState(false);
  const diffSegments = showingDiff ? computeDiff(originalText, cleanedText) : [];

  return (
    <div className="flex flex-col">
      {/* Header bar (44px) */}
      <div
        className="flex items-center gap-2 px-4"
        style={{
          height: 44,
          backgroundColor: "var(--color-brand-drillHeaderBg)",
        }}
      >
        <span
          className="font-semibold text-brand-textPrimary"
          style={{ fontSize: 13 }}
        >
          Corrected Preview
        </span>

        <div className="flex-1" />

        {/* View Changes / Hide Changes capsule toggle */}
        <button
          onClick={() => setShowingDiff(!showingDiff)}
          className="font-semibold shrink-0 transition-colors"
          style={{
            fontSize: 12,
            paddingLeft: 12,
            paddingRight: 12,
            paddingTop: 6,
            paddingBottom: 6,
            borderRadius: 9999,
            color: showingDiff
              ? "var(--color-brand-accentCleaned)"
              : "var(--color-brand-tagLabel)",
            backgroundColor: showingDiff
              ? "color-mix(in srgb, var(--color-brand-accentCleaned) 10%, transparent)"
              : "var(--color-brand-fixCardBg)",
            border: showingDiff
              ? "0.5px solid color-mix(in srgb, var(--color-brand-accentCleaned) 30%, transparent)"
              : "0.5px solid color-mix(in srgb, var(--color-brand-borderLight) 50%, transparent)",
          }}
        >
          {showingDiff ? "Hide Changes" : "View Changes"}
        </button>

        {/* Done button */}
        <button
          onClick={onBack}
          className="font-semibold shrink-0"
          style={{
            fontSize: 13,
            paddingLeft: 4,
            paddingRight: 4,
            background: GLOW_GRADIENT,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Done
        </button>
      </div>

      <div
        className="h-px"
        style={{ backgroundColor: "var(--color-brand-panelDivider)" }}
      />

      {/* Content: single text card with gradient border */}
      <div className="px-3 pt-3 pb-2">
        <div
          className="rounded-[10px] px-3.5 py-2.5 overflow-y-auto"
          style={{
            backgroundColor: "var(--color-brand-bgSurface)",
            maxHeight: 240,
          }}
        >
          {showingDiff ? (
            <div
              className="whitespace-pre-wrap"
              style={{ fontSize: 14, lineHeight: 1.6 }}
            >
              {diffSegments.map((seg, i) => {
                if (seg.type === "removed") {
                  return (
                    <span
                      key={i}
                      style={{
                        color: "var(--color-brand-accentAi)",
                        backgroundColor:
                          "color-mix(in srgb, var(--color-brand-accentAi) 15%, transparent)",
                        textDecoration: "line-through",
                      }}
                    >
                      {seg.text}
                    </span>
                  );
                }
                if (seg.type === "added") {
                  return (
                    <span
                      key={i}
                      style={{
                        color: "var(--color-brand-accentCleaned)",
                        backgroundColor:
                          "color-mix(in srgb, var(--color-brand-accentCleaned) 15%, transparent)",
                      }}
                    >
                      {seg.text}
                    </span>
                  );
                }
                return (
                  <span
                    key={i}
                    style={{ color: "var(--color-brand-textPrimary)" }}
                  >
                    {seg.text}
                  </span>
                );
              })}
            </div>
          ) : (
            <div
              className="whitespace-pre-wrap"
              style={{
                fontSize: 14,
                lineHeight: 1.6,
                color: "var(--color-brand-textPrimary)",
              }}
            >
              {cleanedText}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
