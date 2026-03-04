import { Download } from "lucide-react";
import { InteractiveToast } from "@/components/toast/interactive-toast";

export function Hero() {
  return (
    <section
      id="hero"
      className="pt-28 sm:pt-36 pb-10 sm:pb-14"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full">
        <div className="glow-card">
        <div className="glow-card-inner dot-bl pt-5 sm:pt-7 md:pt-9 px-6 sm:px-10 md:px-12 pb-6 sm:pb-10 md:pb-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left column — vertically centered within the fixed-height right column */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left lg:self-center">
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

            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center lg:justify-start">
              <a
                href="#pricing"
                className="group relative rounded-full transition-all duration-300 hover:-translate-y-1 active:translate-y-0 p-[1px]"
                style={{ background: "linear-gradient(135deg, #3be8b0, #1aafd0, #9B8FFF)" }}
              >
                <span className="flex items-center gap-2 bg-[#1a2230] rounded-full px-5 py-2.5 text-sm font-medium text-brand-tagLabel group-hover:text-brand-textPrimary transition-colors">
                  Download for <span className="text-white">macOS</span>
                  <Download size={15} />
                </span>
              </a>
              <a
                href="#pricing"
                className="group relative rounded-full transition-all duration-300 hover:-translate-y-1 active:translate-y-0 p-[1px]"
                style={{ background: "linear-gradient(135deg, #3be8b0, #1aafd0, #9B8FFF)" }}
              >
                <span className="flex items-center gap-2 bg-[#1a2230] rounded-full px-5 py-2.5 text-sm font-medium text-brand-tagLabel group-hover:text-brand-textPrimary transition-colors">
                  Download for <span className="text-white">iOS</span>
                  <Download size={15} />
                </span>
              </a>
            </div>

            <p
              className="text-xs sm:text-sm font-medium bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(90deg, #3be8b0, #1aafd0, #9B8FFF)",
                opacity: 0.55,
              }}
            >
              Local Intelligence. Total Privacy. One app for Mac &amp; iOS.
            </p>
          </div>

          {/* Right column: Interactive Toast — fixed min-height so the hero card
              never bounces when the toast expands/collapses */}
          <div className="flex justify-center items-center" style={{ minHeight: 580 }}>
            <div className="w-[360px] max-w-full">
              <InteractiveToast />
            </div>
          </div>
        </div>
        </div>
        </div>
      </div>
    </section>
  );
}
