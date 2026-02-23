"use client";

import { Lock } from "lucide-react";

export function ClipboardFooter() {
  return (
    <div className="flex items-center justify-center gap-1.5 px-4 pb-3 pt-1">
      <Lock size={10} className="text-brand-textTertiary" />
      <span
        className="text-[10px] font-medium"
        style={{
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
  );
}
