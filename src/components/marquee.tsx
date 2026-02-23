import { AI_TOOLS, DEST_APPS } from "@/lib/constants";

function MarqueeStrip({
  items,
  direction,
}: {
  items: { name: string; color: string }[];
  direction: "left" | "right";
}) {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden">
      <div
        className={`flex gap-4 w-max ${
          direction === "left"
            ? "animate-marquee-left"
            : "animate-marquee-right"
        }`}
      >
        {doubled.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-brand-borderSolid bg-brand-cardBg whitespace-nowrap"
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-brand-textSecondary">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Marquee() {
  return (
    <section className="py-16 sm:py-24 space-y-8 sm:space-y-12">
      <div className="space-y-6">
        <p className="text-center text-xs font-semibold tracking-widest uppercase text-brand-textTertiary">
          Works with every tool
        </p>
        <MarqueeStrip items={AI_TOOLS} direction="left" />
      </div>

      <div className="space-y-6">
        <p className="text-center text-xs font-semibold tracking-widest uppercase text-brand-textTertiary">
          Paste into any app
        </p>
        <MarqueeStrip items={DEST_APPS} direction="right" />
      </div>
    </section>
  );
}
