import { Download, Play } from "lucide-react";
import { InteractiveToast } from "@/components/toast/interactive-toast";

export function Hero() {
  return (
    <section
      id="hero"
      className="pt-28 sm:pt-36 pb-10 sm:pb-14"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full">
        <div className="glow-card">
        <div className="glow-card-inner pt-5 sm:pt-7 md:pt-9 px-6 sm:px-10 md:px-12 pb-6 sm:pb-10 md:pb-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left column */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-medium tracking-tight leading-[1.1]">
                <span className="text-brand-textPrimary">Paste Once.</span>
                <br />
                <span className="text-gradient">Works Everywhere.</span>
              </h1>
            </div>

            <p className="text-base sm:text-lg md:text-xl text-brand-textSecondary max-w-lg leading-relaxed mx-auto lg:mx-0">
              AI tools wreck your formatting. UnreckAI translates it back.
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
              <a
                href="#pricing"
                className="flex items-center gap-2.5 bg-brand-accentCleaned text-brand-bg font-semibold px-5 sm:px-6 py-3 rounded-xl hover:opacity-90 transition-opacity text-sm sm:text-[15px]"
              >
                <Download size={18} />
                Download for macOS
              </a>
              <a
                href="#visual-proof"
                className="flex items-center gap-2.5 border border-brand-borderSolid text-brand-textPrimary font-medium px-5 sm:px-6 py-3 rounded-xl hover:border-brand-borderLight transition-colors text-sm sm:text-[15px]"
              >
                <Play size={16} />
                See how it works
              </a>
            </div>

            <p className="text-xs sm:text-sm text-brand-textTertiary">
              Private &amp; local <span className="text-brand-accentCleaned text-base mx-1">&bull;</span> Never leaves your Mac <span className="text-brand-accentFormatting text-base mx-1">&bull;</span> macOS
            </p>
          </div>

          {/* Right column: Interactive Toast */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-[360px] max-w-full">
              <InteractiveToast />
              <div className="flex items-center justify-center gap-2 mt-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accentCleaned animate-gentle-pulse" />
                <span className="text-xs text-brand-textTertiary">
                  Interactive: click to explore
                </span>
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
