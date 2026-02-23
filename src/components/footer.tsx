import { ScatterSymbol } from "./scatter-symbol";

export function Footer() {
  return (
    <footer className="py-8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-6">
        {/* Gradient privacy text */}
        <p className="text-center text-sm font-medium">
          <span className="text-gradient">
            Private &amp; local <span className="inline-block text-brand-accentCleaned">&bull;</span> Never leaves your Mac <span className="inline-block text-brand-accentFormatting">&bull;</span> macOS
          </span>
        </p>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-brand-textTertiary">
          <div className="flex items-center gap-1.5">
            <span>&copy; 2026</span>
            <ScatterSymbol size={12} className="text-brand-textTertiary" />
            <span>UnreckAI</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-brand-textSecondary transition-colors">
              Privacy
            </a>
            <span>&middot;</span>
            <a href="#" className="hover:text-brand-textSecondary transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
