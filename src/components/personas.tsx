import { Briefcase, Code2, MessageSquare, GraduationCap, Check } from "lucide-react";
import { Reveal } from "./reveal";

const personas = [
  {
    icon: Briefcase,
    title: "Product Managers",
    subtitle: "Clean PRDs directly into Notion.",
    features: [
      "Preserves native bulleting.",
      "Strips ChatGPT intros.",
    ],
  },
  {
    icon: Code2,
    title: "Engineers",
    subtitle: "Formatted docs into GitHub.",
    features: [
      "Protects code block syntax.",
      "Smart quote isolation.",
    ],
  },
  {
    icon: MessageSquare,
    title: "Consultants",
    subtitle: "Client-ready text in Slack.",
    features: [
      "Removes AI footprints.",
      "Guarantees data privacy.",
    ],
  },
  {
    icon: GraduationCap,
    title: "Students",
    subtitle: "Clean drafts into Google Docs.",
    features: [
      "Flawless rich-text transfer.",
      "Zero formatting glitches.",
    ],
  },
];

export function Personas() {
  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="glow-card">
          <div className="glow-card-inner pt-5 sm:pt-7 md:pt-9 px-6 sm:px-10 md:px-14 pb-6 sm:pb-10 md:pb-14">
            <div className="space-y-10 sm:space-y-12">
              {/* Header */}
              <div className="text-center space-y-4 max-w-2xl mx-auto">
                <p className="text-xs font-semibold tracking-widest uppercase text-brand-accentBlue">
                  Purpose-Built
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-brand-textPrimary">
                  Engineered for your role.
                </h2>
                <p className="text-brand-textSecondary text-base sm:text-lg leading-relaxed">
                  No matter your role, UnreckAI ensures every paste arrives clean, formatted, and professional.
                </p>
              </div>

              {/* Persona cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {personas.map((persona, i) => (
                  <Reveal key={persona.title} delay={i * 100}>
                  <div
                    className="bg-brand-itemBg rounded-xl border border-brand-borderSolid p-6 space-y-4 h-full"
                  >
                    <div className="p-2.5 rounded-lg bg-brand-cardBg w-fit">
                      <persona.icon
                        size={22}
                        className="text-brand-accentFormatting"
                      />
                    </div>
                    <div>
                      <h3 className="text-brand-textPrimary font-medium text-[15px]">
                        {persona.title}
                      </h3>
                      <p className="text-brand-textSecondary text-sm mt-1">
                        {persona.subtitle}
                      </p>
                    </div>
                    <div className="space-y-2 pt-2 border-t border-brand-border">
                      {persona.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-start gap-2"
                        >
                          <Check
                            size={14}
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
        </div>
      </div>
    </section>
  );
}
