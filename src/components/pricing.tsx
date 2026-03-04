import { Check, Download } from "lucide-react";
import { Reveal } from "./reveal";

type Feature = {
  text: string;
  included: boolean;
  section?: string;
};

const tiers = [
  {
    name: "Free",
    price: 0,
    period: "",
    subtitle: "",
    description: "Basic AI slop removal for everyday pasting.",
    cta: "Download Free",
    ctaStyle: "ghost" as const,
    popular: false,
    features: [
      { text: "Invisible character removal", included: true },
      { text: "Whitespace normalization", included: true },
      { text: "Encoding fixes (smart quotes, etc.)", included: true },
      { text: "AI intro & ending removal", included: true },
      { text: "Clean plain text output", included: true },
    ] as Feature[],
  },
  {
    name: "Pro Annual",
    price: 4.99,
    period: "/month",
    subtitle: "billed annually",
    description: "Full formatting intelligence, 30% less.",
    cta: "Get Best Value",
    ctaStyle: "primary" as const,
    popular: true,
    badge: "Best Value — Save 30%",
    features: [
      { text: "Everything in Free, plus:", included: true, section: "free" },
      { text: "Format translation (native HTML)", included: true },
      { text: "Em dash, quote & bold handling", included: true },
      { text: "AI writing style detection", included: true },
      { text: "Apple Intelligence (Summaries & Tone)", included: true },
      { text: "One license for Mac & iOS", included: true },
    ] as Feature[],
  },
  {
    name: "Pro Monthly",
    price: 6.99,
    period: "/month",
    subtitle: "",
    description: "Full formatting intelligence, billed monthly.",
    cta: "Start Pro Trial",
    ctaStyle: "ghost" as const,
    popular: false,
    features: [
      { text: "Everything in Free, plus:", included: true, section: "free" },
      { text: "Format translation (native HTML)", included: true },
      { text: "Em dash, quote & bold handling", included: true },
      { text: "AI writing style detection", included: true },
      { text: "Apple Intelligence (Summaries & Tone)", included: true },
      { text: "One license for Mac & iOS", included: true },
    ] as Feature[],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="glow-card">
        <div className="glow-card-inner dot-bl pt-5 sm:pt-7 md:pt-9 px-6 sm:px-10 md:px-12 pb-6 sm:pb-10 md:pb-12">
        <div className="space-y-8 sm:space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <p className="text-xs font-semibold tracking-widest uppercase text-brand-accentFormatting">
              Clear Pricing
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-brand-textPrimary">
              Scale your productivity.
            </h2>
            <p className="text-brand-textSecondary text-base sm:text-lg leading-relaxed">
              Start free. Upgrade when AI formatting fights back.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto items-center">
            {tiers.map((tier, i) => {
              const cardContent = (
                <>
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span
                        className="text-[11px] font-bold uppercase tracking-wider text-brand-bg px-3 py-1 rounded-full whitespace-nowrap"
                        style={{ background: "linear-gradient(90deg, #3be8b0, #1aafd0, #9B8FFF)" }}
                      >
                        {tier.badge}
                      </span>
                    </div>
                  )}

                  <div>
                    <h3 className="text-brand-textPrimary font-semibold text-lg">
                      {tier.name}
                    </h3>
                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="text-4xl font-semibold text-brand-textPrimary">
                        ${tier.price === 0 ? "0" : tier.price}
                      </span>
                      {tier.period && (
                        <span className="text-brand-textSecondary text-sm">
                          {tier.period}
                        </span>
                      )}
                    </div>
                    {tier.subtitle && (
                      <p className="text-brand-textTertiary text-xs mt-1">
                        {tier.subtitle}
                      </p>
                    )}
                    <p className="text-brand-textSecondary text-sm mt-2">
                      {tier.description}
                    </p>
                  </div>

                  <button
                    className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-1 hover:scale-[1.02] active:translate-y-0 active:scale-100 ${
                      tier.ctaStyle === "primary"
                        ? "bg-brand-cardBg text-brand-textPrimary glow-border-active hover:text-white hover:shadow-[0_0_16px_rgba(59,232,176,0.2)]"
                        : "border border-brand-borderSolid text-brand-textPrimary hover:border-brand-borderLight hover:shadow-[0_0_12px_rgba(255,255,255,0.05)]"
                    }`}
                  >
                    {tier.name === "Free" && <Download size={16} />}
                    {tier.cta}
                  </button>

                  <div className="space-y-3 pt-4 border-t border-brand-border">
                    {tier.features.map((feature) => (
                      <div
                        key={feature.text}
                        className="flex items-start gap-3"
                      >
                        {feature.section ? (
                          <span className="text-sm text-brand-accentCleaned font-medium">
                            {feature.text}
                          </span>
                        ) : (
                          <>
                            <Check
                              size={16}
                              className="text-brand-accentCleaned shrink-0 mt-0.5"
                            />
                            <span className="text-sm text-brand-textSecondary">
                              {feature.text}
                            </span>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              );

              return (
                <Reveal key={tier.name} delay={i * 100}>
                  {tier.popular ? (
                    <div
                      className="rounded-2xl p-[1.5px] transition-transform duration-300 hover:-translate-y-2"
                      style={{
                        background: "linear-gradient(135deg, rgba(59, 232, 176, 0.5), rgba(155, 143, 255, 0.5))",
                        transform: "scale(1.04)",
                        filter: "drop-shadow(0 8px 32px rgba(59, 232, 176, 0.15)) drop-shadow(0 4px 16px rgba(155, 143, 255, 0.1))",
                      }}
                    >
                      <div className="relative rounded-2xl bg-brand-cardBg p-8 space-y-6 h-full">
                        {cardContent}
                      </div>
                    </div>
                  ) : (
                    <div className="relative rounded-2xl border border-brand-borderSolid bg-brand-cardBg p-8 space-y-6 h-full transition-transform duration-300 hover:-translate-y-2 hover:scale-[1.02]">
                      {cardContent}
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>

          <p className="text-center text-brand-textTertiary text-sm">
            One subscription. Works on all your macOS and iOS devices.
          </p>
        </div>
        </div>
        </div>
      </div>
    </section>
  );
}
