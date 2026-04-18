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
  Globe,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const platforms = [
  {
    icon: Monitor,
    title: "Browser Extension",
    description: "Seamless dApp interactions from your browser.",
    status: "Coming Soon",
    accent: "#14b8a6",
    image: "/assets/browser-extension.jpeg",
  },
  {
    icon: Smartphone,
    title: "Mobile App",
    description: "Approve on the go with biometric signing.",
    status: "Coming Soon",
    accent: "#00ffd5",
    image: "/assets/mobie-dispaly.jpeg",
  },
  {
    icon: Terminal,
    title: "CLI Tool",
    description: "Full control from the command line.",
    status: "Coming Soon",
    accent: "#2dd4bf",
    image: null,
  },
  {
    icon: Globe,
    title: "Web Dashboard",
    description: "Manage your vaults and policies in one place.",
    status: "Coming Soon",
    accent: "#14b8a6",
    image: null,
  },
];

const terminalLines = [
  { prompt: true, text: "git clone https://github.com/Naveen-6087/vaulkyrie.git" },
  { prompt: true, text: "cd vaulkyrie && cargo build --workspace" },
  { prompt: false, text: "   Compiling vaulkyrie-protocol v0.1.0" },
  { prompt: false, text: "   Compiling vaulkyrie-core v0.1.0" },
  { prompt: false, text: "" },
  { prompt: false, text: "✓ All tests passed", success: true },
];

function TypingTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
      className="rounded-2xl glass-card overflow-hidden max-w-3xl mx-auto"
    >
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-xs text-[#64748b] font-mono">vaulkyrie — terminal</span>
      </div>
      <div className="p-6 font-mono text-sm leading-8 min-h-[200px]">
        {terminalLines.slice(0, visibleLines).map((line, i) => (
          <div key={i} className="flex items-center gap-2">
            {line.prompt && <span className="text-teal select-none">$</span>}
            <span
              className={
                line.success
                  ? "text-green-400 font-semibold"
                  : line.prompt
                  ? "text-[#94a3b8]"
                  : "text-[#64748b]"
              }
            >
              {line.text}
            </span>
          </div>
        ))}
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
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = sectionRef.current?.querySelectorAll("[data-platform]") as NodeListOf<HTMLElement> | undefined;

    if (prefersReduced) {
      if (headingRef.current) headingRef.current.style.opacity = "1";
      cards?.forEach((c) => { c.style.opacity = "1"; c.style.transform = "none"; });
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

      if (cards) {
        cards.forEach((card, i) => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="get-started" className="relative py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.04)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div ref={headingRef} className="text-center mb-16 opacity-0 translate-y-12">
          <span className="inline-block text-teal text-xs font-mono tracking-widest uppercase mb-4">
            Get Started
          </span>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Available everywhere.
          </h2>
          <p className="mt-4 text-muted max-w-lg mx-auto">
            Choose your platform. Same vault, same security.
          </p>
        </div>

        {/* Platform cards with tilt effect */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20" style={{ perspective: "1200px" }}>
          {platforms.map((platform, i) => (
            <div
              key={platform.title}
              data-platform={i}
              className="group relative glass-card rounded-2xl p-7 text-center opacity-0 translate-y-[30px] scale-[0.95]"
              style={{ transformStyle: "preserve-3d", transform: `rotateX(8deg)` }}
            >
              {/* Icon */}
              <div
                className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
                style={{
                  backgroundColor: `${platform.accent}08`,
                  border: `1px solid ${platform.accent}15`,
                }}
              >
                <platform.icon className="w-6 h-6" style={{ color: platform.accent }} strokeWidth={1.5} />
              </div>

              <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold mb-2">
                {platform.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed mb-5">
                {platform.description}
              </p>

              <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] border border-white/[0.06] px-4 py-2 text-xs text-[#64748b]">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 shadow-[0_0_4px_rgba(251,191,36,0.4)]" />
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
            className="group inline-flex items-center gap-3 rounded-full bg-white/[0.04] border border-white/[0.08] px-10 py-4.5 text-base font-medium hover:bg-white/[0.08] hover:border-white/[0.16] transition-[background-color,border-color] duration-300"
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
