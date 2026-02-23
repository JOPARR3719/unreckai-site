"use client";

import { Lock } from "lucide-react";

interface ToastFooterProps {
  sourceApp: string;
}

export function ToastFooter({ sourceApp }: ToastFooterProps) {
  return (
    <div className="px-4 pb-3.5 pt-1">
      {/* Source badge */}
      <div className="flex items-center gap-2 py-2.5">
        <span className="text-xs text-brand-tagLabel">Source</span>
        <span
          className="text-xs text-brand-tagLabel px-2.5 py-0.5 rounded-full"
          style={{
            border: "0.3px solid rgba(0, 0, 0, 0.5)",
            backgroundColor: "rgba(255, 255, 255, 0.04)",
          }}
        >
          {sourceApp}
        </span>
      </div>

      {/* Undo all changes button */}
      <button
        className="w-full py-2 rounded-lg font-semibold text-brand-textSecondary transition-colors hover:bg-white/[0.03]"
        style={{
          fontSize: "11.5px",
          backgroundColor: "var(--color-brand-neutralBtnBg)",
          backgroundImage: `linear-gradient(var(--color-brand-neutralBtnBg), var(--color-brand-neutralBtnBg)), linear-gradient(135deg, var(--color-brand-accentCleaned), var(--color-brand-accentFormatting))`,
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
          border: "1px solid transparent",
        }}
      >
        Undo all changes
      </button>

      {/* Privacy line */}
      <div className="flex items-center justify-center gap-1.5 mt-3">
        <Lock size={10} className="text-brand-textTertiary" />
        <span
          className="text-xs font-medium bg-clip-text"
          style={{
            fontSize: 10,
            background:
              "linear-gradient(135deg, var(--color-brand-accentCleaned), var(--color-brand-accentFormatting))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Private &amp; local &middot; Never leaves your Mac
        </span>
      </div>
    </div>
  );
}
