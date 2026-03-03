import { Reveal } from "./reveal";
import { IPhoneFrame } from "./iphone-frame";
import { KeyboardPanelDemo } from "./keyboard-panel-demo";
import { InteractiveToast } from "./toast/interactive-toast";

export function PlatformShowcase() {
  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="glow-card">
          <div className="glow-card-inner dot-tr pt-5 sm:pt-7 md:pt-9 px-6 sm:px-10 md:px-12 pb-6 sm:pb-10 md:pb-12">
            <div className="space-y-8 sm:space-y-10">
              {/* Header */}
              <div className="space-y-4 text-center max-w-2xl mx-auto">
                <p className="text-xs font-semibold tracking-widest uppercase text-brand-accentCleaned">
                  Cross-Platform
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-brand-textPrimary">
                  One tool. Every device.
                </h2>
                <p className="text-brand-textSecondary text-base sm:text-lg leading-relaxed">
                  macOS menu bar. iOS keyboard. Same intelligence.
                </p>
              </div>

              {/* 2-column: Mac left, iPhone right */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Mac -- window chrome + toast */}
                <Reveal>
                  <div className="flex flex-col items-center">
                    <div
                      className="rounded-xl overflow-hidden w-full max-w-[420px]"
                      style={{
                        backgroundColor: "var(--color-brand-cardBg)",
                        border: "1px solid var(--color-brand-borderSolid)",
                        boxShadow: "0 20px 40px -12px rgba(0,0,0,0.4)",
                      }}
                    >
                      {/* Title bar */}
                      <div className="flex items-center gap-2 px-4 py-3 border-b border-brand-border">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                          <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                        </div>
                        <span className="text-[11px] text-brand-textTertiary ml-2">
                          UnreckAI
                        </span>
                      </div>
                      {/* Toast inside window */}
                      <div className="p-4 flex justify-center">
                        <div className="w-[360px] max-w-full">
                          <InteractiveToast />
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-brand-textSecondary mt-4 text-center">
                      macOS menu bar app
                    </p>
                  </div>
                </Reveal>

                {/* iPhone -- frame + keyboard panel */}
                <Reveal delay={150}>
                  <div className="flex flex-col items-center">
                    <IPhoneFrame>
                      <KeyboardPanelDemo />
                    </IPhoneFrame>
                    <p className="text-sm text-brand-textSecondary mt-4 text-center">
                      iOS keyboard extension
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
