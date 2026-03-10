"use client";

import { Lock } from "lucide-react";

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

interface ToastFooterProps {
  sourceApp: string;
}

export function ToastFooter({ sourceApp }: ToastFooterProps) {
  const logoEntry = SOURCE_LOGOS[sourceApp];

  return (
    <div className="pb-3.5 pt-0.5" style={{ paddingLeft: 10, paddingRight: 10 }}>
      {/* Source badge + Intelligence button */}
      <div className="flex items-center gap-2 py-2.5">
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
        <div
          className="flex items-center justify-center shrink-0"
          style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            background: "linear-gradient(135deg, rgba(59,232,176,0.08), rgba(155,143,255,0.08))",
            border: "1px solid color-mix(in srgb, #3be8b0 40%, #9B8FFF)",
          }}
        >
          <span
            className="text-[13px] bg-clip-text text-transparent leading-none"
            style={{
              backgroundImage: "linear-gradient(135deg, #3be8b0, #1aafd0, #9B8FFF)",
            }}
          >
            &#x2728;
          </span>
        </div>
      </div>

      {/* Undo all changes button */}
      <div
        className="rounded-lg p-px"
        style={{
          background: "linear-gradient(135deg, var(--color-brand-accentCleaned), var(--color-brand-accentFormatting))",
        }}
      >
        <button
          className="w-full py-2 rounded-[calc(0.5rem-1px)] font-semibold text-brand-textSecondary transition-colors hover:bg-white/[0.03]"
          style={{
            fontSize: "11.5px",
            backgroundColor: "var(--color-brand-neutralBtnBg)",
          }}
        >
          Undo all changes
        </button>
      </div>

      {/* Privacy line */}
      <div className="flex items-center justify-center gap-1.5 mt-3">
        <Lock size={10} className="text-brand-textTertiary" />
        <span
          className="text-xs font-medium text-brand-tagLabel"
          style={{ fontSize: 10 }}
        >
          On-device intelligence &middot; Private &amp; local
        </span>
      </div>
    </div>
  );
}
