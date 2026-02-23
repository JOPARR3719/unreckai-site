"use client";

import { useState, useEffect } from "react";
import { Moon, Download } from "lucide-react";
import { ScatterSymbol } from "./scatter-symbol";
import { NAV_LINKS } from "@/lib/constants";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-brand-bg/80 backdrop-blur-xl border-b border-brand-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <ScatterSymbol size={20} className="text-brand-textPrimary" />
          <span className="text-[15px] font-semibold text-brand-textPrimary">
            UnreckAI
          </span>
        </a>

        {/* Center: Nav Links */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-brand-textSecondary hover:text-brand-textPrimary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right: Theme + Download */}
        <div className="flex items-center gap-3">
          <button
            className="hidden sm:block p-2 rounded-lg text-brand-tagLabel hover:text-brand-textPrimary transition-colors"
            aria-label="Toggle theme"
          >
            <Moon size={18} />
          </button>
          <a
            href="#pricing"
            className="flex items-center gap-2 bg-brand-accentCleaned text-brand-bg text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Download
            <Download size={14} />
          </a>
        </div>
      </div>
    </nav>
  );
}
