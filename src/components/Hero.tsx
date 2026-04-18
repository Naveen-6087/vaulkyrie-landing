"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ArrowRight, Shield, Key, Fingerprint } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(headingRef.current, { y: 50, opacity: 0, duration: 0.9 })
        .from(subRef.current, { y: 30, opacity: 0, duration: 0.7 }, "-=0.5")
        .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(badgesRef.current, { y: 20, opacity: 0, duration: 0.6 }, "-=0.3")
        .from(imageRef.current, { y: 40, opacity: 0, scale: 0.95, duration: 1 }, "-=0.5");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-20"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial gradient spotlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.08)_0%,transparent_70%)]" />
        {/* Secondary glow */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.06)_0%,transparent_70%)]" />
        {/* Grid */}
        <div className="absolute inset-0 grid-pattern opacity-50" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/5 px-4 py-1.5 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse-glow" />
              <span className="text-xs font-medium text-teal tracking-wide uppercase">
                Built on Solana
              </span>
            </div>

            <h1
              ref={headingRef}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08]"
            >
              Your keys.
              <br />
              <span className="bg-gradient-to-r from-teal via-teal-bright to-neon bg-clip-text text-transparent text-glow">
                Your rules.
              </span>
              <br />
              No single point
              <br className="hidden sm:block" />
              of failure.
            </h1>

            <p
              ref={subRef}
              className="mt-6 text-lg sm:text-xl text-muted leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              Vaulkyrie is a self-custodial threshold wallet for Solana — 
              with private policy enforcement and quantum-safe admin authority.
            </p>

            <div ref={ctaRef} className="mt-10 flex flex-col sm:flex-row items-center gap-4 lg:justify-start justify-center">
              <a
                href="#get-started"
                className="group flex items-center gap-2.5 rounded-full bg-teal px-7 py-3.5 text-sm font-semibold text-black hover:bg-teal-bright transition-all duration-200 shadow-lg shadow-teal/20 hover:shadow-teal/30"
              >
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="https://github.com/Naveen-6087/vaulkyrie"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-full border border-white/10 px-7 py-3.5 text-sm font-medium text-foreground hover:bg-white/[0.04] hover:border-white/20 transition-all duration-200"
              >
                View on GitHub
              </a>
            </div>

            {/* Tech badges */}
            <div ref={badgesRef} className="mt-10 flex flex-wrap items-center gap-3 justify-center lg:justify-start">
              {[
                { icon: Key, label: "FROST Threshold" },
                { icon: Shield, label: "Arcium Policy" },
                { icon: Fingerprint, label: "Quantum-Safe" },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-xs text-subtle"
                >
                  <badge.icon className="w-3.5 h-3.5 text-teal/60" />
                  {badge.label}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Image */}
          <div ref={imageRef} className="flex-1 max-w-lg w-full">
            <div className="relative">
              {/* Glow behind image */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal/10 via-purple/5 to-transparent blur-2xl scale-105" />

              <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/40">
                <Image
                  src="/assets/vault.jpeg"
                  alt="Vaulkyrie threshold wallet interface"
                  width={600}
                  height={500}
                  className="w-full h-auto object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/60 via-transparent to-transparent" />
              </div>

              {/* Floating stat cards */}
              <div className="absolute -bottom-4 -left-4 glass rounded-xl px-4 py-3 shadow-xl shadow-black/30 animate-float">
                <div className="text-xs text-muted mb-0.5">Signing Threshold</div>
                <div className="text-sm font-bold text-teal">2-of-3 Devices</div>
              </div>

              <div className="absolute -top-4 -right-4 glass rounded-xl px-4 py-3 shadow-xl shadow-black/30 animate-float" style={{ animationDelay: "2s" }}>
                <div className="text-xs text-muted mb-0.5">Security Level</div>
                <div className="text-sm font-bold text-neon">Quantum-Safe</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050508] to-transparent" />
    </section>
  );
}
