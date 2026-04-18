"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Monitor,
  Smartphone,
  Terminal,
  Github,
  ArrowRight,
  Copy,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const platforms = [
  {
    icon: Monitor,
    title: "Browser Extension",
    description: "Chrome & Firefox extension for seamless dApp interactions.",
    status: "Coming Soon",
  },
  {
    icon: Smartphone,
    title: "Mobile App",
    description: "iOS & Android app with biometric-gated signing ceremonies.",
    status: "Coming Soon",
  },
  {
    icon: Terminal,
    title: "CLI Tool",
    description: "Full-featured command line interface for power users.",
    status: "Coming Soon",
  },
];

export default function GetStarted() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const termRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });

      if (termRef.current) {
        gsap.from(termRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: termRef.current,
            start: "top 90%",
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
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div ref={headingRef} className="text-center mb-16">
          <span className="inline-block text-teal text-xs font-mono tracking-widest uppercase mb-4">
            Get Started
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Download Vaulkyrie.
          </h2>
          <p className="mt-5 text-lg text-muted max-w-xl mx-auto leading-relaxed">
            Available across platforms. Choose your interface.
          </p>
        </div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {platforms.map((platform, i) => (
            <div
              key={platform.title}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              className="group relative rounded-2xl border border-white/[0.06] bg-card p-8 text-center transition-all duration-300 hover:border-white/[0.12] hover:bg-elevated"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-teal/5 border border-teal/10 mb-6 group-hover:bg-teal/10 group-hover:border-teal/20 transition-all">
                <platform.icon className="w-6 h-6 text-teal" strokeWidth={1.5} />
              </div>

              <h3 className="text-lg font-semibold mb-2">{platform.title}</h3>
              <p className="text-sm text-muted leading-relaxed mb-6">
                {platform.description}
              </p>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] px-4 py-1.5 text-xs text-subtle">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400/70" />
                {platform.status}
              </span>
            </div>
          ))}
        </div>

        {/* Terminal Card */}
        <div
          ref={termRef}
          className="rounded-2xl border border-white/[0.06] bg-card overflow-hidden max-w-3xl mx-auto"
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
            <div className="w-3 h-3 rounded-full bg-red-500/40" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
            <div className="w-3 h-3 rounded-full bg-green-500/40" />
            <span className="ml-3 text-xs text-dim font-mono">terminal</span>
          </div>

          {/* Terminal body */}
          <div className="p-6 font-mono text-sm leading-7">
            <div className="flex items-center gap-2">
              <span className="text-teal">$</span>
              <span className="text-muted">git clone https://github.com/Naveen-6087/vaulkyrie.git</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-teal">$</span>
              <span className="text-muted">cd vaulkyrie</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-teal">$</span>
              <span className="text-muted">cargo build --workspace</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-teal">$</span>
              <span className="text-muted">cargo test --workspace</span>
            </div>
            <div className="mt-3 text-xs text-subtle">
              <span className="text-green-400">✓</span> All tests passed
            </div>
          </div>
        </div>

        {/* GitHub CTA */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/Naveen-6087/vaulkyrie"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full bg-white/[0.04] border border-white/[0.08] px-8 py-4 text-base font-medium text-foreground hover:bg-white/[0.08] hover:border-white/[0.16] transition-all duration-200"
          >
            <Github className="w-5 h-5" />
            View on GitHub
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
