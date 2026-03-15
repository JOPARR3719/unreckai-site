"use client";

import { useState, useEffect, useCallback } from "react";
import { Download, Menu, X } from "lucide-react";
import { ScatterSymbol } from "./scatter-symbol";
import { NAV_LINKS } from "@/lib/constants";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Close mobile menu on escape key
  useEffect(() => {
    if (!mobileOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [mobileOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "bg-brand-bg/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <a href="/" className="flex items-center gap-2.5">
          <ScatterSymbol size={20} className="text-brand-textPrimary" />
          <span className="text-[15px] font-semibold text-brand-textPrimary">
            UnreckAI
          </span>
        </a>

        {/* Center: Nav Links (desktop) */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-brand-tagLabel transition-all duration-200 hover:text-gradient-nav hover:-translate-y-px active:translate-y-px cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right: Download + Mobile hamburger */}
        <div className="flex items-center gap-3">
          <a
            href="#pricing"
            className="flex items-center gap-2 bg-brand-accentCleaned text-brand-bg text-sm font-semibold px-4 py-1.5 rounded-lg transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_12px_rgba(59,232,176,0.4)] hover:-translate-y-px active:translate-y-px active:brightness-95"
          >
            Download
            <Download size={14} />
          </a>

          {/* Hamburger (mobile only) */}
          <button
            className="lg:hidden p-1.5 rounded-md text-brand-tagLabel"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Gradient bottom border */}
      <div
        className="h-px w-full opacity-[0.08]"
        style={{ background: "var(--color-brand-borderLight)" }}
      />

      {/* Mobile menu dropdown */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 sm:px-8 py-4 space-y-1 bg-brand-bg/95 backdrop-blur-xl border-t border-brand-border">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={closeMobile}
              className="block py-3 text-sm text-brand-tagLabel transition-colors duration-200 hover:text-brand-textPrimary"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
