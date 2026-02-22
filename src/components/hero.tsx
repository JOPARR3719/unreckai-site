import { Download, Play } from "lucide-react";
import { InteractiveToast } from "@/components/toast/interactive-toast";

export function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-16"
    >
      <div className="max-w-7xl mx-auto px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-[64px] font-medium tracking-tight leading-[1.1]">
                <span className="text-brand-textPrimary">Paste Once.</span>
                <br />
                <span className="text-gradient">Works Everywhere.</span>
              </h1>
            </div>

            <p className="text-lg md:text-xl text-brand-textSecondary max-w-lg leading-relaxed">
              AI tools wreck your formatting. UnreckAI translates it back.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#pricing"
                className="flex items-center gap-2.5 bg-brand-accentCleaned text-brand-bg font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity text-[15px]"
              >
                <Download size={18} />
                Download for macOS
              </a>
              <a
                href="#visual-proof"
                className="flex items-center gap-2.5 border border-brand-borderSolid text-brand-textPrimary font-medium px-6 py-3 rounded-xl hover:border-brand-borderLight transition-colors text-[15px]"
              >
                <Play size={16} />
                See how it works
              </a>
            </div>

            <p className="text-sm text-brand-textTertiary">
              macOS 13 or later &middot; No account &middot; Nothing leaves your Mac
            </p>
          </div>

          {/* Right column: Interactive Toast */}
          <div className="flex justify-center lg:justify-end">
            <InteractiveToast />
          </div>
        </div>
      </div>
    </section>
  );
}
