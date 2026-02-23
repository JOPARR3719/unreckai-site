export function Footer() {
  return (
    <footer className="py-12 border-t border-brand-borderSolid">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-8">
        {/* Gradient privacy text */}
        <p className="text-center text-sm font-medium">
          <span className="text-gradient">
            Private &amp; local &middot; never leaves your Mac
          </span>
        </p>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-brand-textTertiary">
          <span>&copy; 2026 UnreckAI</span>
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
