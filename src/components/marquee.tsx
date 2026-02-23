import { AI_TOOLS, DEST_APPS } from "@/lib/constants";

function MarqueeStrip({
  items,
  direction,
}: {
  items: { name: string; color: string; icon?: string; mono?: boolean }[];
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
            {item.icon ? (
              <img
                src={item.icon}
                alt={item.name}
                className={`w-4 h-4 shrink-0 object-contain ${item.mono ? "brightness-0 invert" : ""}`}
              />
            ) : (
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
            )}
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
    <section className="py-10 sm:py-14 space-y-8 sm:space-y-12">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-6">
        <p className="text-center text-sm font-semibold tracking-widest uppercase text-brand-textSecondary">
          Works with every tool
        </p>
        <MarqueeStrip items={AI_TOOLS} direction="left" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-6">
        <p className="text-center text-sm font-semibold tracking-widest uppercase text-brand-textSecondary">
          Paste into any app
        </p>
        <MarqueeStrip items={DEST_APPS} direction="right" />
      </div>
    </section>
  );
}
