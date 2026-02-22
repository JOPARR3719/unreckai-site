import { CheckCircle2, Fingerprint, Undo2 } from "lucide-react";

const features = [
  {
    icon: CheckCircle2,
    color: "text-brand-accentCleaned",
    title: "Zero workflow friction",
    description:
      "Copy from any AI tool, paste anywhere. UnreckAI runs silently in the background — no extra steps, no popups, no context switching.",
  },
  {
    icon: Fingerprint,
    color: "text-brand-accentFormatting",
    title: "Removes AI footprints",
    description:
      'Strips sycophantic openers, chatbot closers, invisible characters, and formatting artifacts that scream "AI wrote this."',
  },
  {
    icon: Undo2,
    color: "text-brand-tagLabel",
    title: "One-click undo",
    description:
      "Changed your mind? Hit Undo in the toast notification to instantly restore your original clipboard. No data lost, ever.",
  },
];

export function InvisibleWorkflow() {
  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-8">
        <div className="glow-card">
          <div className="glow-card-inner p-10 md:p-14">
            <div className="space-y-12">
              {/* Header */}
              <div className="space-y-4 max-w-2xl">
                <p className="text-xs font-semibold tracking-widest uppercase text-brand-accentCleaned">
                  Invisible Workflow
                </p>
                <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-brand-textPrimary">
                  Instant corrections. Every paste.
                </h2>
                <p className="text-brand-textSecondary text-lg leading-relaxed">
                  UnreckAI watches your clipboard and automatically translates AI formatting into clean, native output. You never have to think about it.
                </p>
              </div>

              {/* Feature cards */}
              <div className="grid md:grid-cols-3 gap-6">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="bg-brand-itemBg rounded-xl border border-brand-borderSolid p-6 space-y-4"
                  >
                    <feature.icon className={`${feature.color}`} size={24} />
                    <h3 className="text-brand-textPrimary font-medium text-[15px]">
                      {feature.title}
                    </h3>
                    <p className="text-brand-textSecondary text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
