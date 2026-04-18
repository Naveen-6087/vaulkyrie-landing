"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Eye, Key, Cpu, Lock, Layers } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Key,
    title: "Threshold Signing",
    description:
      "Distribute key shares across devices with FROST DKG. No single device ever holds the full key — yet the final signature is a standard Ed25519.",
    color: "text-teal",
    glow: "from-teal/10",
  },
  {
    icon: Eye,
    title: "Private Policy Engine",
    description:
      "Define spending rules, risk thresholds, and escalation logic. Arcium MXE evaluates your policy on encrypted data — nobody else sees your rules.",
    color: "text-purple",
    glow: "from-purple/10",
  },
  {
    icon: Shield,
    title: "Quantum-Safe Authority",
    description:
      "Admin operations are signed with WOTS+ one-time signatures backed by hash-based post-quantum cryptography. Future-proof your vault today.",
    color: "text-blue",
    glow: "from-blue/10",
  },
  {
    icon: Cpu,
    title: "Minimal Onchain Footprint",
    description:
      "Routine spending stays entirely offchain. The Solana program stores only coordination state — receipts, nonces, and authority hashes.",
    color: "text-neon",
    glow: "from-neon/10",
  },
  {
    icon: Lock,
    title: "Replay Protection",
    description:
      "Every policy receipt is action-bound, nonce-tracked, and expiry-gated. Action sessions enforce monotonic progress to prevent double-spend.",
    color: "text-teal-bright",
    glow: "from-teal-bright/10",
  },
  {
    icon: Layers,
    title: "Solana Native",
    description:
      "Built on Pinocchio for lean on-chain execution. The aggregated threshold signature is indistinguishable from a normal Solana wallet signature.",
    color: "text-purple",
    glow: "from-purple/10",
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

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
          y: 50,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="features" className="relative py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div ref={headingRef} className="text-center mb-20">
          <span className="inline-block text-teal text-xs font-mono tracking-widest uppercase mb-4">
            Features
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Security without
            <br />
            <span className="text-muted">compromise.</span>
          </h2>
          <p className="mt-5 text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            Every layer is designed to eliminate single points of failure — from
            key generation to policy enforcement to admin authority.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              className="group relative rounded-2xl border border-white/[0.06] bg-card p-7 transition-all duration-300 hover:border-white/[0.12] hover:bg-elevated"
            >
              {/* Top gradient accent */}
              <div
                className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${feature.glow} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className={`${feature.color} mb-5`}>
                <feature.icon className="w-6 h-6" strokeWidth={1.5} />
              </div>

              <h3 className="text-lg font-semibold mb-3 group-hover:text-foreground transition-colors">
                {feature.title}
              </h3>

              <p className="text-sm text-muted leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
