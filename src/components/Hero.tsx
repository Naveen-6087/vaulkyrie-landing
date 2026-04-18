"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ArrowRight, Shield, Key, Fingerprint, Github } from "lucide-react";
import dynamic from "next/dynamic";

const ParticleField = dynamic(() => import("./ParticleField"), { ssr: false });

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const glowOrbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(headingRef.current, { y: 60, opacity: 0, duration: 1.1 })
        .from(subRef.current, { y: 30, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.7 }, "-=0.5")
        .from(badgesRef.current, { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(
          imageRef.current,
          { y: 60, opacity: 0, scale: 0.9, duration: 1.2 },
          "-=0.8"
        );

      // Floating orb animation
      if (glowOrbRef.current) {
        gsap.to(glowOrbRef.current, {
          y: -20,
          x: 10,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-24"
    >
      {/* === Background Layer === */}
      <div className="absolute inset-0">
        {/* Particle canvas */}
        <ParticleField />

        {/* Large aurora glow orbs */}
        <div
          ref={glowOrbRef}
          className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.12)_0%,rgba(20,184,166,0.04)_30%,transparent_70%)] pointer-events-none"
        />
        <div className="absolute bottom-[-5%] right-[-10%] w-[600px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute top-[40%] left-[-5%] w-[400px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(0,255,213,0.04)_0%,transparent_70%)] pointer-events-none" />

        {/* Subtle grid */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-teal/20 bg-teal/[0.07] px-5 py-2 mb-10 backdrop-blur-sm">
              <div className="relative w-2 h-2">
                <div className="absolute inset-0 rounded-full bg-teal animate-ping opacity-75" />
                <div className="relative w-2 h-2 rounded-full bg-teal" />
              </div>
              <span className="text-xs font-semibold text-teal tracking-widest uppercase">
                Built on Solana
              </span>
            </div>

            <h1
              ref={headingRef}
              className="text-5xl sm:text-6xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.05]"
            >
              Your keys.
              <br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-teal via-teal-bright to-neon bg-clip-text text-transparent">
                  Your rules.
                </span>
                {/* Underline glow */}
                <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-teal/60 via-neon/40 to-transparent" />
              </span>
              <br />
              <span className="text-muted">No single point</span>
              <br className="hidden sm:block" />
              <span className="text-muted">of failure.</span>
            </h1>

            <p
              ref={subRef}
              className="mt-8 text-lg sm:text-xl text-muted leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Vaulkyrie is a self-custodial threshold wallet for Solana —
              with private policy enforcement and quantum-safe admin authority.
            </p>

            <div
              ref={ctaRef}
              className="mt-12 flex flex-col sm:flex-row items-center gap-4 lg:justify-start justify-center"
            >
              <a
                href="#get-started"
                className="group relative flex items-center gap-2.5 rounded-full bg-gradient-to-r from-teal to-teal-bright px-8 py-4 text-sm font-bold text-black transition-all duration-300 shadow-[0_0_30px_rgba(20,184,166,0.3)] hover:shadow-[0_0_50px_rgba(20,184,166,0.5)] hover:scale-[1.02] active:scale-[0.98]"
              >
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
              <a
                href="https://github.com/Naveen-6087/vaulkyrie"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 rounded-full border border-white/10 px-8 py-4 text-sm font-medium text-foreground hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
              >
                <Github className="w-4 h-4 text-muted group-hover:text-foreground transition-colors" />
                View on GitHub
              </a>
            </div>

            {/* Tech badges */}
            <div
              ref={badgesRef}
              className="mt-12 flex flex-wrap items-center gap-3 justify-center lg:justify-start"
            >
              {[
                {
                  icon: Key,
                  label: "FROST Threshold",
                  color: "text-teal",
                  border: "border-teal/10 hover:border-teal/30",
                },
                {
                  icon: Shield,
                  label: "Arcium Policy",
                  color: "text-purple",
                  border: "border-purple/10 hover:border-purple/30",
                },
                {
                  icon: Fingerprint,
                  label: "Quantum-Safe",
                  color: "text-neon",
                  border: "border-neon/10 hover:border-neon/30",
                },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className={`flex items-center gap-2 rounded-full ${badge.border} border bg-white/[0.02] px-4 py-2 text-xs text-muted backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.04] cursor-default`}
                >
                  <badge.icon className={`w-3.5 h-3.5 ${badge.color}`} />
                  {badge.label}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Image */}
          <div ref={imageRef} className="flex-1 max-w-xl w-full">
            <div className="relative">
              {/* Multi-layer glow behind image */}
              <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-teal/15 via-purple/5 to-neon/5 blur-3xl opacity-60" />
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-teal/10 to-transparent blur-2xl opacity-40" />

              {/* Image container with gradient border */}
              <div className="relative rounded-2xl overflow-hidden gradient-border shadow-2xl shadow-black/60">
                <Image
                  src="/assets/vault.jpeg"
                  alt="Vaulkyrie threshold wallet interface"
                  width={640}
                  height={520}
                  className="w-full h-auto object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Cinematic overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/80 via-[#050508]/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-teal/[0.03] to-transparent" />
              </div>

              {/* Floating stat cards */}
              <div className="absolute -bottom-5 -left-5 glass rounded-xl px-5 py-4 shadow-2xl shadow-black/50 animate-float border border-teal/10">
                <div className="text-[10px] text-muted uppercase tracking-widest mb-1">
                  Signing Threshold
                </div>
                <div className="text-base font-bold text-teal">
                  2-of-3 Devices
                </div>
              </div>

              <div
                className="absolute -top-5 -right-5 glass rounded-xl px-5 py-4 shadow-2xl shadow-black/50 animate-float border border-neon/10"
                style={{ animationDelay: "2s" }}
              >
                <div className="text-[10px] text-muted uppercase tracking-widest mb-1">
                  Security Level
                </div>
                <div className="text-base font-bold text-neon">
                  Quantum-Safe
                </div>
              </div>

              {/* Extra floating element */}
              <div
                className="absolute top-1/2 -left-8 glass rounded-lg px-3 py-2 shadow-xl shadow-black/40 animate-float border border-purple/10"
                style={{ animationDelay: "3.5s" }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.6)]" />
                  <span className="text-xs text-muted font-mono">
                    Ed25519 ✓
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050508] via-[#050508]/50 to-transparent" />
    </section>
  );
}
