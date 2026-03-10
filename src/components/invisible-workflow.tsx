import { ShieldCheck, Fingerprint, Undo2 } from "lucide-react";
import { Reveal } from "./reveal";

const features = [
  {
    icon: ShieldCheck,
    color: "text-brand-accentCleaned",
    title: "Zero workflow friction",
    description:
      "Copy from any AI tool, paste anywhere. UnreckAI runs silently in the background. No extra steps, no popups, no context switching.",
  },
  {
    icon: Fingerprint,
    color: "text-brand-accentFormatting",
    title: "Removes AI footprints",
    description:
      'Strips AI chat openers, chatbot closers, invisible characters, and formatting artifacts that scream "AI wrote this."',
  },
  {
    icon: Undo2,
    color: "text-brand-accentAi",
    title: "One-click undo",
    description:
      "Changed your mind? Hit Undo to instantly restore your original text. Works on Mac and iOS. No data lost, ever.",
  },
];

export function InvisibleWorkflow() {
  return (
    <section id="features" className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="glow-card">
          <div className="glow-card-inner dot-tr pt-5 sm:pt-7 md:pt-9 px-6 sm:px-10 md:px-14 pb-6 sm:pb-10 md:pb-14">
            <div className="space-y-10 sm:space-y-12">
              {/* Header */}
              <div className="space-y-4 max-w-2xl">
                <p className="text-xs font-semibold tracking-widest uppercase text-brand-accentCleaned">
                  Invisible Workflow
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-brand-textPrimary">
                  Instant corrections. Every paste.
                </h2>
                <p className="text-brand-textSecondary text-base sm:text-lg leading-relaxed">
                  Copy once, paste clean. Formatting is fixed silently in the background. You never have to think about it.
                </p>
              </div>

              {/* Feature cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {features.map((feature, i) => (
                  <Reveal key={feature.title} delay={i * 100}>
                    <div className="bg-brand-itemBg rounded-xl border border-brand-borderSolid p-6 space-y-4 h-full transition-transform duration-300 hover:-translate-y-2 hover:scale-[1.02]">
                      <feature.icon className={`${feature.color}`} size={28} />
                      <h3 className="text-brand-textPrimary font-medium text-[15px]">
                        {feature.title}
                      </h3>
                      <p className="text-brand-textSecondary text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
