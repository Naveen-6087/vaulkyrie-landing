"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Github, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#security", label: "Security" },
  { href: "#get-started", label: "Get Started" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "glass-strong py-3 shadow-lg shadow-black/20"
          : "bg-transparent py-5"
      )}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8">
            <Image
              src="/assets/logo.png"
              alt="Vaulkyrie"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <span className="text-lg font-semibold tracking-tight text-foreground group-hover:text-teal transition-colors">
            Vaulkyrie
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://github.com/Naveen-6087/vaulkyrie"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
          <a
            href="#get-started"
            className="flex items-center gap-2 rounded-full bg-teal/10 border border-teal/20 px-5 py-2 text-sm font-medium text-teal hover:bg-teal/20 hover:border-teal/40 transition-all duration-200"
          >
            Get Started
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-muted hover:text-foreground transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass-strong border-t border-white/[0.06] mt-3">
          <div className="px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-base text-muted hover:text-foreground transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
            <hr className="border-white/[0.06] my-2" />
            <a
              href="https://github.com/Naveen-6087/vaulkyrie"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-base text-muted hover:text-foreground transition-colors py-2"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <a
              href="#get-started"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full bg-teal/10 border border-teal/20 px-5 py-3 text-sm font-medium text-teal hover:bg-teal/20 transition-all"
            >
              Get Started
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
