"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Send, ArrowUpRight } from "lucide-react";

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 7.719L22.89 21.75h-6.656l-5.213-6.814-5.965 6.814H1.707l7.746-8.276L0.91 2.25h6.822l4.711 6.162 5.801-6.162h2.21z" />
  </svg>
);

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Wallet Modes", href: "#vault-models" },
      { label: "Highlights", href: "#highlights" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "PQC Model", href: "#quantum" },
    ],
  },
  {
    title: "Build",
    links: [
      { label: "GitHub", href: "https://github.com/Naveen-6087/vaulkyrie" },
      { label: "Docs", href: "https://github.com/Naveen-6087/vaulkyrie" },
      { label: "Roadmap", href: "https://github.com/Naveen-6087/vaulkyrie" },
      { label: "Devnet", href: "https://github.com/Naveen-6087/vaulkyrie" },
    ],
  },
  {
      title: "Community",
      links: [
        { label: "X / Twitter", href: "https://x.com/vaulkyrie_hq" },
        { label: "GitHub", href: "https://github.com/Naveen-6087/vaulkyrie" },
        { label: "Telegram", href: "#" },
        { label: "Documentation", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-bg-abyss pt-24 pb-12">
      {/* Decorative vertical line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-neon/20 to-transparent" />
      
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-4 mb-8 group">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
                <Image src="/assets/logo.png" alt="Vaulkyrie" width={34} height={34} className="object-contain" />
              </div>
              <span className="brand-wordmark text-[0.74rem] text-white transition-colors group-hover:text-neon sm:text-[0.82rem]">
                VAULKYRIE
              </span>
            </Link>
            <p className="max-w-sm text-text-secondary leading-relaxed mb-8 font-medium">
              A Solana wallet for shared control, quiet movement, and a stronghold vault when the stakes are higher.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://x.com/vaulkyrie_hq" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-text-secondary transition-all hover:border-neon/30 hover:bg-neon/5 hover:text-white">
                <XIcon className="w-4 h-4" />
              </a>
              <a href="https://github.com/Naveen-6087/vaulkyrie" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-text-secondary transition-all hover:border-neon/30 hover:bg-neon/5 hover:text-white">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-text-secondary transition-all hover:border-neon/30 hover:bg-neon/5 hover:text-white">
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
              {footerLinks.map((section) => (
                <div key={section.title}>
                  <h4 className="technical-label text-neon mb-6 tracking-[0.3em]">{section.title}</h4>
                  <ul className="space-y-4">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link 
                          href={link.href} 
                          className="group flex items-center gap-1 text-sm font-medium uppercase tracking-[0.12em] text-text-secondary transition-colors hover:text-neon"
                        >
                          {link.label}
                          <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 technical-label text-text-muted tracking-widest">
              <span>&copy; 2026 VAULKYRIE PROTOCOL</span>
              <div className="w-1 h-1 rounded-full bg-neon/20" />
              <span>SHARED + PRIVATE + STRONGHOLD</span>
          </div>
          <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neon animate-pulse shadow-[0_0_10px_rgba(0,255,213,0.5)]" />
              <span className="technical-label text-neon tracking-widest">STRONGHOLD STANDING</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
