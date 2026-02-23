"use client";

import { useState, useEffect } from "react";
import { Download } from "lucide-react";
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
          ? "bg-brand-bg/80 backdrop-blur-xl"
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
              className="text-sm text-brand-tagLabel transition-all duration-200 hover:text-gradient-nav hover:-translate-y-px active:translate-y-px cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right: Download */}
        <div className="flex items-center gap-3">
          <a
            href="#pricing"
            className="flex items-center gap-2 bg-brand-accentCleaned text-brand-bg text-sm font-semibold px-4 py-1.5 rounded-lg transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_12px_rgba(59,232,176,0.4)] hover:-translate-y-px active:translate-y-px active:brightness-95"
          >
            Download
            <Download size={14} />
          </a>
        </div>
      </div>
      {/* Gradient bottom border — always visible */}
      <div
        className="h-[0.2px] w-full opacity-60"
        style={{ background: "linear-gradient(90deg, var(--color-brand-accentCleaned), var(--color-brand-accentDocument), var(--color-brand-accentFormatting))" }}
      />
    </nav>
  );
}
