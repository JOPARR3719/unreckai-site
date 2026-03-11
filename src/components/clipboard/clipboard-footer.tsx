"use client";

import { Lock } from "lucide-react";

export function ClipboardFooter() {
  return (
    <div className="flex items-center justify-center gap-1.5 px-4 pb-4 pt-2" style={{ opacity: 0.5 }}>
      <Lock size={10} className="text-brand-textPrimary" />
      <span className="text-[10px] font-medium text-brand-textPrimary">
        On-device intelligence &middot; Private &amp; local
      </span>
    </div>
  );
}
