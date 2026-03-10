"use client";

import { Lock, Trophy } from "lucide-react";


const SOURCE_LOGOS: Record<string, { src: string; invert?: boolean }> = {
  ChatGPT: { src: "/images/openai.svg", invert: true },
  Claude: { src: "/images/claude-color.svg" },
  Gemini: { src: "/images/gemini-color.svg" },
  Grok: { src: "/images/grok.svg", invert: true },
  Copilot: { src: "/images/copilot-color.svg" },
  Perplexity: { src: "/images/perplexity-color.svg" },
  DeepSeek: { src: "/images/deepseek-color.svg" },
  Notion: { src: "/images/notion.svg", invert: true },
  "Apple Notes": { src: "/images/apple-notes.svg", invert: true },
};

const GLOW_GRADIENT =
  "linear-gradient(135deg, var(--color-brand-accentCleaned), var(--color-brand-accentFormatting))";


interface ToastFooterProps {
  sourceApp: string;
  detailsOpen: boolean;
  onIntelligenceClick?: () => void;
}

export function ToastFooter({ sourceApp, detailsOpen, onIntelligenceClick }: ToastFooterProps) {
  const logoEntry = SOURCE_LOGOS[sourceApp];

  return (
    <div className="pb-3 pt-0.5" style={{ paddingLeft: 10, paddingRight: 10 }}>
      {/* Source badge + Intelligence button (collapsed only) */}
      {!detailsOpen && (
        <div className="flex items-center gap-2 py-2">
          <span className="text-xs text-brand-tagLabel">Source</span>
          <span
            className="flex items-center gap-1.5 text-xs text-brand-tagLabel px-2.5 py-0.5 rounded-full"
            style={{
              border: "0.3px solid rgba(0, 0, 0, 0.5)",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
            }}
          >
            {logoEntry && (
              <img
                src={logoEntry.src}
                alt={sourceApp}
                className={`w-3 h-3${logoEntry.invert ? " brightness-0 invert" : ""}`}
              />
            )}
            {sourceApp}
          </span>
          <div className="flex-1" />
          {/* Apple Intelligence button */}
          <button
            onClick={onIntelligenceClick}
            className="flex items-center justify-center shrink-0 transition-opacity hover:opacity-80"
            style={{
              width: 28,
              height: 28,
              borderRadius: 7,
              background:
                "linear-gradient(135deg, rgba(59,232,176,0.08), rgba(155,143,255,0.08))",
              border:
                "1px solid color-mix(in srgb, #3be8b0 40%, #9B8FFF)",
            }}
          >
            <span
              className="text-[13px] bg-clip-text text-transparent leading-none"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #3be8b0, #1aafd0, #9B8FFF)",
              }}
            >
              &#x2728;
            </span>
          </button>
        </div>
      )}

      {/* Accept + Undo All buttons */}
      <div className="flex gap-2.5 mt-3">
        {/* Accept — gradient fill */}
        <button
          className="flex-1 flex items-center justify-center gap-1.5 rounded-lg transition-opacity hover:opacity-90"
          style={{
            height: 32,
            background:
              "linear-gradient(135deg, #3be8b0, #1aafd0, #9B8FFF)",
            color: "#0F1318",
            fontWeight: 600,
            fontSize: 13,
          }}
        >
          <Trophy size={14} strokeWidth={2} className="text-[#0F1318]" />
          Accept
        </button>

        {/* Undo All — outline */}
        <div
          className="flex-1 rounded-lg p-px"
          style={{ background: GLOW_GRADIENT }}
        >
          <button
            className="w-full h-full flex items-center justify-center gap-1 rounded-[calc(0.5rem-1px)] text-brand-textSecondary transition-colors hover:bg-white/[0.03]"
            style={{
              height: 30,
              backgroundColor: "var(--color-brand-neutralBtnBg)",
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            <svg
              width={12}
              height={12}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 14 4 9l5-5" />
              <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" />
            </svg>
            Undo All
          </button>
        </div>
      </div>

      {/* Privacy line */}
      <div className="flex items-center justify-center gap-1.5 mt-2.5" style={{ opacity: 0.5 }}>
        <Lock size={10} className="text-brand-textPrimary" />
        <span
          className="text-xs font-medium text-brand-textPrimary"
          style={{ fontSize: 10 }}
        >
          On-device intelligence &middot; Private &amp; local
        </span>
      </div>
    </div>
  );
}
