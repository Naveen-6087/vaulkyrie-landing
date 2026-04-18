"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Monitor,
  Smartphone,
  Terminal,
  Github,
  ArrowRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const platforms = [
  {
    icon: Monitor,
    title: "Browser Extension",
    description: "Chrome & Firefox extension for seamless dApp interactions.",
    status: "Coming Soon",
    accent: "#14b8a6",
  },
  {
    icon: Smartphone,
    title: "Mobile App",
    description: "iOS & Android app with biometric-gated signing ceremonies.",
    status: "Coming Soon",
    accent: "#8b5cf6",
  },
  {
    icon: Terminal,
    title: "CLI Tool",
    description: "Full-featured command line interface for power users.",
    status: "Coming Soon",
    accent: "#00ffd5",
  },
];

const terminalLines = [
  { prompt: true, text: "git clone https://github.com/Naveen-6087/vaulkyrie.git" },
  { prompt: true, text: "cd vaulkyrie" },
  { prompt: true, text: "cargo build --workspace" },
  { prompt: true, text: "cargo test --workspace" },
  { prompt: false, text: "   Compiling vaulkyrie-protocol v0.1.0" },
  { prompt: false, text: "   Compiling vaulkyrie-core v0.1.0" },
  { prompt: false, text: "   Compiling vaulkyrie-frost v0.1.0" },
  { prompt: false, text: "" },
  { prompt: false, text: "✓ All tests passed", success: true },
];

function TypingTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!terminalRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: terminalRef.current,
      start: "top 85%",
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        if (prefersReduced) {
          setVisibleLines(terminalLines.length);
          return;
        }

        terminalLines.forEach((_, i) => {
          setTimeout(() => setVisibleLines(i + 1), i * 300);
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <div
      ref={terminalRef}
      className="rounded-2xl border border-white/[0.06] bg-card/80 backdrop-blur-sm overflow-hidden max-w-3xl mx-auto shadow-2xl shadow-black/40"
    >
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-xs text-dim font-mono">
          vaulkyrie — terminal
        </span>
      </div>

      {/* Terminal body */}
      <div className="p-6 font-mono text-sm leading-8 min-h-[280px]">
        {terminalLines.slice(0, visibleLines).map((line, i) => (
          <div key={i} className="flex items-center gap-2">
            {line.prompt && <span className="text-teal select-none">$</span>}
            <span
              className={
                line.success
                  ? "text-green-400 font-semibold"
                  : line.prompt
                  ? "text-muted"
                  : "text-subtle"
              }
            >
              {line.text}
            </span>
          </div>
        ))}
        {/* Cursor blink */}
        {visibleLines < terminalLines.length && visibleLines > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-teal select-none">$</span>
            <span className="w-2 h-4 bg-teal/80 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}

export default function GetStarted() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const cards = sectionRef.current?.querySelectorAll("[data-platform]") as NodeListOf<HTMLElement> | undefined;

    if (prefersReduced) {
      if (headingRef.current) headingRef.current.style.opacity = "1";
      cards?.forEach((c) => (c.style.opacity = "1"));
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(headingRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      if (cards && cards.length > 0) {
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cards[0],
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="get-started" className="relative py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.05)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div ref={headingRef} className="text-center mb-16 opacity-0 translate-y-12">
          <span className="inline-block text-teal text-xs font-mono tracking-widest uppercase mb-4">
            Get Started
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Download Vaulkyrie.
          </h2>
          <p className="mt-6 text-lg text-muted max-w-xl mx-auto leading-relaxed">
            Available across platforms. Choose your interface.
          </p>
        </div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          {platforms.map((platform, i) => (
            <div
              key={platform.title}
              data-platform={i}
              className="group relative rounded-2xl border border-white/[0.06] bg-card/80 backdrop-blur-sm p-8 text-center transition-[border-color,box-shadow,transform] duration-500 hover:border-white/[0.15] hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1 opacity-0 translate-y-[50px]"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(300px circle at 50% 30%, ${platform.accent}10, transparent 60%)`,
                }}
              />

              <div
                className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl border mb-6 transition-all duration-500 group-hover:scale-110"
                style={{
                  borderColor: `${platform.accent}15`,
                  backgroundColor: `${platform.accent}08`,
                }}
              >
                <platform.icon
                  className="w-7 h-7"
                  style={{ color: platform.accent }}
                  strokeWidth={1.5}
                />
              </div>

              <h3 className="text-lg font-semibold mb-2 relative">
                {platform.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed mb-6 relative">
                {platform.description}
              </p>

              <span className="relative inline-flex items-center gap-2 rounded-full bg-white/[0.04] border border-white/[0.06] px-4 py-2 text-xs text-subtle">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400/80 shadow-[0_0_4px_rgba(251,191,36,0.4)]" />
                {platform.status}
              </span>
            </div>
          ))}
        </div>

        {/* Terminal */}
        <TypingTerminal />

        {/* GitHub CTA */}
        <div className="text-center mt-16">
          <a
            href="https://github.com/Naveen-6087/vaulkyrie"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full bg-white/[0.04] border border-white/[0.08] px-10 py-4.5 text-base font-medium text-foreground hover:bg-white/[0.08] hover:border-white/[0.16] transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30"
          >
            <Github className="w-5 h-5" />
            View on GitHub
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </div>
      </div>
    </section>
  );
}
