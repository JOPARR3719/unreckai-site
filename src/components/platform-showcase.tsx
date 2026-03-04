"use client";

import { useState } from "react";
import { Play } from "lucide-react";

const TOGGLE_ACTIVE_STYLE = {
  border: "1px solid transparent",
  backgroundImage:
    "linear-gradient(var(--color-brand-cardBg), var(--color-brand-cardBg)), linear-gradient(90deg, #3be8b0, #1aafd0, #9B8FFF)",
  backgroundOrigin: "border-box",
  backgroundClip: "padding-box, border-box",
} as const;

const macBullets: string[] = [
  "Translates AI formatting silently in the background.",
  "Smart notifications detail exact formatting adjustments.",
  "Restores original content instantly with one click.",
  "Configure granular processing rules from the menu.",
];

const iosBullets: string[] = [
  "Translates formatting natively inside any active app.",
  "Review categorized text transformations before applying.",
  "Resolve specific categories or clean everything instantly.",
  "On-device processing guarantees absolute data privacy.",
];

function GradientBullet({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div
        className="w-2 h-2 rounded-full shrink-0 mt-[7px]"
        style={{
          background: "#4DC8B2",
          opacity: 0.6,
        }}
      />
      <span className="text-[1.05rem]" style={{ color: "#C5CCD2" }}>{text}</span>
    </div>
  );
}

function VideoPlaceholder({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center border border-white/20"
        style={{
          background: "radial-gradient(circle, rgba(59,232,176,0.15) 0%, transparent 70%)",
        }}
      >
        <Play size={24} className="text-brand-textSecondary ml-1" />
      </div>
      <span className="text-xs text-brand-textTertiary">{label}</span>
    </div>
  );
}

function MacWindowChrome({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-xl border border-brand-borderSolid bg-brand-cardBg overflow-hidden flex flex-col ${className}`}
      style={{ boxShadow: "0 25px 60px -12px rgba(0,0,0,0.5)" }}
    >
      {/* Title bar */}
      <div className="flex items-center px-4 py-3 bg-brand-cardBg border-b border-brand-borderSolid shrink-0">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="flex-1 text-center text-xs font-medium text-brand-textTertiary -ml-[52px]">
          UnreckAI
        </span>
      </div>
      {/* Screen area — fills remaining height */}
      <div
        className="relative flex-1"
        style={{ background: "linear-gradient(135deg, #0d1117 0%, #161b22 100%)" }}
      >
        {children}
      </div>
    </div>
  );
}

function PlatformToggle({
  platform,
  setPlatform,
  className = "",
}: {
  platform: "macos" | "ios";
  setPlatform: (p: "macos" | "ios") => void;
  className?: string;
}) {
  return (
    <div className={`inline-flex items-center bg-brand-cardBg rounded-full p-1 border border-brand-borderSolid ${className}`}>
      <button
        onClick={() => setPlatform("macos")}
        className={`w-20 py-2 rounded-full text-sm font-medium transition-all text-center ${
          platform === "macos"
            ? "text-brand-textPrimary"
            : "text-brand-textSecondary hover:text-brand-textPrimary border border-transparent"
        }`}
        style={platform === "macos" ? TOGGLE_ACTIVE_STYLE : undefined}
      >
        macOS
      </button>
      <button
        onClick={() => setPlatform("ios")}
        className={`w-20 py-2 rounded-full text-sm font-medium transition-all text-center ${
          platform === "ios"
            ? "text-brand-textPrimary"
            : "text-brand-textSecondary hover:text-brand-textPrimary border border-transparent"
        }`}
        style={platform === "ios" ? TOGGLE_ACTIVE_STYLE : undefined}
      >
        iOS
      </button>
    </div>
  );
}

export function PlatformShowcase() {
  const [platform, setPlatform] = useState<"macos" | "ios">("macos");
  const isMac = platform === "macos";

  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="glow-card">
          <div className="glow-card-inner dot-bl pt-5 sm:pt-7 md:pt-9 px-6 sm:px-10 md:px-12 pb-4 sm:pb-6 md:pb-8">
            {/* True 2-column layout — header + copy in left column, device in right */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-8 lg:gap-12">
              {/* Left: header + toggle + copy — all in one column */}
              <div className="flex flex-col justify-center space-y-6">
                {/* Header */}
                <div className="space-y-3 -mt-5">
                  <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#44BCBC" }}>
                    Cross-Platform
                  </p>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-brand-textPrimary">
                    One tool. Every device.
                  </h2>
                  <p className="text-brand-textSecondary text-base leading-relaxed">
                    Native formatting translation across your entire Apple ecosystem.
                  </p>
                </div>

                <div className="h-4" />

                {/* Toggle */}
                <div className="flex justify-center lg:justify-start">
                  <PlatformToggle platform={platform} setPlatform={setPlatform} />
                </div>

                {/* Copy block — relative container, both rendered */}
                <div className="relative">
                  {/* macOS copy */}
                  <div
                    style={{
                      opacity: isMac ? 1 : 0,
                      transform: isMac ? "translateY(0)" : "translateY(12px)",
                      transition: "all 500ms ease-out",
                      position: isMac ? "relative" : "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      pointerEvents: isMac ? "auto" : "none",
                    }}
                  >
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-medium text-brand-textPrimary mb-2">
                          macOS Menu Bar
                        </h3>
                        <p className="text-base leading-relaxed" style={{ color: "#44BCBC" }}>
                          The invisible translation layer between AI and your Mac.
                        </p>
                      </div>
                      <div className="space-y-6">
                        {macBullets.map((b) => (
                          <GradientBullet key={b} text={b} />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* iOS copy */}
                  <div
                    style={{
                      opacity: isMac ? 0 : 1,
                      transform: isMac ? "translateY(12px)" : "translateY(0)",
                      transition: "all 500ms ease-out",
                      position: isMac ? "absolute" : "relative",
                      top: 0,
                      left: 0,
                      right: 0,
                      pointerEvents: isMac ? "none" : "auto",
                    }}
                  >
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-medium text-brand-textPrimary mb-2">
                          iOS Keyboard
                        </h3>
                        <p className="text-base leading-relaxed" style={{ color: "#44BCBC" }}>
                          Brings flawless formatting natively to every mobile app.
                        </p>
                      </div>
                      <div className="space-y-6">
                        {iosBullets.map((b) => (
                          <GradientBullet key={b} text={b} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: device visual */}
              <div className="flex justify-center lg:justify-end">
                {/* Mobile: normal flow, swap on toggle */}
                <div className="lg:hidden">
                  <div
                    style={{
                      opacity: isMac ? 1 : 0,
                      height: isMac ? "auto" : 0,
                      overflow: "hidden",
                      transition: "opacity 500ms ease-out",
                    }}
                  >
                    <div className="max-w-md mx-auto">
                      <MacWindowChrome>
                        <VideoPlaceholder label="macOS demo coming soon" />
                      </MacWindowChrome>
                    </div>
                  </div>
                  <div
                    style={{
                      opacity: isMac ? 0 : 1,
                      height: isMac ? 0 : "auto",
                      overflow: "hidden",
                      transition: "opacity 500ms ease-out",
                    }}
                  >
                    <div className="relative w-[240px] mx-auto">
                      <img src="/images/iphone-frame.png" alt="iPhone 17" className="w-full h-auto" />
                      <div
                        className="absolute inset-[4.5%] top-[3%] bottom-[3%] rounded-[28px] overflow-hidden"
                        style={{ background: "#0d1117" }}
                      >
                        <VideoPlaceholder label="iOS demo coming soon" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop: fixed-height container, both devices always rendered for crossfade */}
                <div className="hidden lg:block relative w-full overflow-visible" style={{ height: 600 }}>
                  {/* macOS device — CSS window chrome with video placeholder */}
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      opacity: isMac ? 1 : 0,
                      transform: isMac ? "scale(1)" : "scale(0.95)",
                      transition: "all 500ms ease-out",
                      pointerEvents: isMac ? "auto" : "none",
                    }}
                  >
                    <div className="w-full" style={{ height: 480, marginTop: 30 }}>
                      <MacWindowChrome className="h-full">
                        <VideoPlaceholder label="macOS demo coming soon" />
                      </MacWindowChrome>
                    </div>
                  </div>

                  {/* iOS device — iPhone frame with video placeholder, bottom-anchored */}
                  <div
                    className="absolute inset-0 flex items-start justify-center"
                    style={{
                      opacity: isMac ? 0 : 1,
                      transform: isMac ? "scale(0.95)" : "scale(1)",
                      transition: "all 500ms ease-out",
                      pointerEvents: isMac ? "none" : "auto",
                    }}
                  >
                    <div className="relative w-[280px]" style={{ marginTop: 15 }}>
                      <img src="/images/iphone-frame.png" alt="iPhone 17" className="w-full h-auto" />
                      <div
                        className="absolute inset-[4.5%] top-[3%] bottom-[3%] rounded-[32px] overflow-hidden"
                        style={{ background: "#0d1117" }}
                      >
                        <VideoPlaceholder label="iOS demo coming soon" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
