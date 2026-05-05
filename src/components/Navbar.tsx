"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight, Github } from "lucide-react";

// Custom X icon (formerly Twitter)
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 7.719L22.89 21.75h-6.656l-5.213-6.814-5.965 6.814H1.707l7.746-8.276L0.91 2.25h6.822l4.711 6.162 5.801-6.162h2.21z" />
  </svg>
);

const navLinks = [
  { href: "#vault-models", label: "Modes" },
  { href: "#highlights", label: "Highlights" },
  { href: "#quantum", label: "PQC" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const nextY = window.scrollY;
      const delta = nextY - lastY;

      setScrolled(nextY > 10);

      if (mobileOpen) {
        setHidden(false);
        lastY = nextY;
        return;
      }

      if (nextY < 40) {
        setHidden(false);
      } else if (delta > 6) {
        setHidden(true);
      } else if (delta < -6) {
        setHidden(false);
      }

      lastY = nextY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileOpen]);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-[100] px-4 pt-4 transition-transform duration-500 ${hidden ? "-translate-y-[130%]" : "translate-y-0"}`}
    >
      <div
        className={`mx-auto max-w-7xl rounded-full border transition-all duration-500 ${
          scrolled
            ? "border-neon/20 bg-[#040608]/88 shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
            : "border-white/[0.08] bg-[#040608]/68 backdrop-blur-xl"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-3 sm:px-6">
          <Link href="/" className="group relative flex items-center gap-4">
            <div className="relative flex h-11 w-11 items-center justify-center">
              <Image src="/assets/logo.png" alt="Vaulkyrie" width={34} height={34} className="object-contain" />
            </div>
            <span className="brand-wordmark text-[0.74rem] text-white transition-colors group-hover:text-neon sm:text-[0.82rem]">
              VAULKYRIE
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="technical-label text-text-secondary hover:text-neon transition-all duration-200 tracking-[0.26em]"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="h-4 w-px bg-white/10" />

            <div className="flex items-center gap-3">
              <a
                href="https://x.com/vaulkyrie_hq"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-text-secondary transition-colors hover:border-neon/30 hover:text-neon"
              >
                <XIcon className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/Naveen-6087/vaulkyrie"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-text-secondary transition-colors hover:border-neon/30 hover:text-neon"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/Naveen-6087/vaulkyrie"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-neon px-5 py-2.5 text-[0.68rem] font-black uppercase tracking-[0.18em] text-background transition-all hover:bg-white hover:shadow-[0_0_20px_rgba(0,255,213,0.4)]"
              >
                Open docs
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden rounded-full border border-white/10 bg-white/[0.03] p-2 text-text-secondary transition-colors hover:text-neon"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mx-auto mt-3 max-w-7xl rounded-[2rem] border border-white/10 bg-[#040608]/95 backdrop-blur-2xl animate-in fade-in slide-in-from-top-4 duration-300 md:hidden">
          <div className="px-6 py-10 flex flex-col gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-bold tracking-normal hover:text-neon transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-6 pt-4">
              <a href="https://x.com/vaulkyrie_hq" className="text-text-secondary hover:text-neon"><XIcon className="w-6 h-6" /></a>
              <a href="https://github.com/Naveen-6087/vaulkyrie" className="text-text-secondary hover:text-neon"><Github className="w-6 h-6" /></a>
            </div>
            <a
              href="https://github.com/Naveen-6087/vaulkyrie"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="w-full flex items-center justify-center gap-2 rounded-full bg-neon px-6 py-4 text-sm font-black text-background uppercase tracking-[0.18em]"
            >
              Open docs
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
