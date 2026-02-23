"use client";

import { useState } from "react";
import { Check, Download } from "lucide-react";
import { Reveal } from "./reveal";

const tiers = [
  {
    name: "Free",
    monthlyPrice: 0,
    annualPrice: 0,
    description: "Essential translation for everyday pasting.",
    cta: "Download Free",
    ctaStyle: "ghost" as const,
    popular: false,
    features: [
      "Invisible character removal",
      "Whitespace normalization",
      "Encoding fixes (smart quotes, etc.)",
    ],
  },
  {
    name: "Pro",
    monthlyPrice: 4.99,
    annualPrice: 3.49,
    description: "Unlimited power for professionals.",
    cta: "Start Pro Trial",
    ctaStyle: "primary" as const,
    popular: true,
    features: [
      "Full format translation (HTML output)",
      "AI slop removal + style detection",
      "All 54 issue types detected & fixed",
    ],
  },
  {
    name: "Lifetime",
    monthlyPrice: 89,
    annualPrice: 89,
    description: "Pay once. Own the tool forever.",
    cta: "Get Lifetime",
    ctaStyle: "ghost" as const,
    popular: false,
    isLifetime: true,
    features: [
      "Everything in Pro, forever",
      "All future updates included",
      "Priority feature requests",
    ],
  },
];

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="space-y-8 sm:space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <p className="text-xs font-semibold tracking-widest uppercase text-brand-accentCleaned">
              Clear Pricing
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-brand-textPrimary">
              Own your workflow.
            </h2>
            <p className="text-brand-textSecondary text-base sm:text-lg leading-relaxed">
              Start free, upgrade when you need the full power of format translation.
            </p>
          </div>

          {/* Monthly / Annual toggle */}
          <div className="flex justify-center">
            <div className="inline-flex items-center bg-brand-cardBg rounded-full p-1 border border-brand-borderSolid">
              <button
                onClick={() => setAnnual(false)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  !annual
                    ? "bg-brand-itemBg text-brand-textPrimary shadow-sm"
                    : "text-brand-textSecondary hover:text-brand-textPrimary"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  annual
                    ? "bg-brand-itemBg text-brand-textPrimary shadow-sm"
                    : "text-brand-textSecondary hover:text-brand-textPrimary"
                }`}
              >
                Annual
                <span className="text-[11px] bg-brand-accentCleaned/15 text-brand-accentCleaned px-2 py-0.5 rounded-full font-semibold">
                  Save 30%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {tiers.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 100}>
              <div
                className={`relative rounded-2xl border p-8 space-y-6 h-full ${
                  tier.popular
                    ? "border-brand-accentCleaned/40 bg-brand-cardBg"
                    : "border-brand-borderSolid bg-brand-cardBg"
                }`}
              >
                {/* Popular badge */}
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="text-[11px] font-bold uppercase tracking-wider bg-brand-accentCleaned text-brand-bg px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Tier name & price */}
                <div>
                  <h3 className="text-brand-textPrimary font-semibold text-lg">
                    {tier.name}
                  </h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    {tier.isLifetime ? (
                      <>
                        <span className="text-4xl font-semibold text-brand-textPrimary">
                          ${tier.monthlyPrice}
                        </span>
                        <span className="text-brand-textSecondary text-sm">
                          one-time
                        </span>
                      </>
                    ) : tier.monthlyPrice === 0 ? (
                      <span className="text-4xl font-semibold text-brand-textPrimary">
                        $0
                      </span>
                    ) : (
                      <>
                        <span className="text-4xl font-semibold text-brand-textPrimary">
                          ${annual ? tier.annualPrice : tier.monthlyPrice}
                        </span>
                        <span className="text-brand-textSecondary text-sm">
                          /month
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-brand-textSecondary text-sm mt-2">
                    {tier.description}
                  </p>
                </div>

                {/* CTA button */}
                <button
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                    tier.ctaStyle === "primary"
                      ? "bg-white text-brand-bg hover:bg-white/90"
                      : "border border-brand-borderSolid text-brand-textPrimary hover:border-brand-borderLight"
                  }`}
                >
                  {tier.name === "Free" && <Download size={16} />}
                  {tier.cta}
                </button>

                {/* Features */}
                <div className="space-y-3 pt-4 border-t border-brand-border">
                  {tier.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3"
                    >
                      <Check
                        size={16}
                        className="text-brand-accentCleaned shrink-0 mt-0.5"
                      />
                      <span className="text-sm text-brand-textSecondary">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
