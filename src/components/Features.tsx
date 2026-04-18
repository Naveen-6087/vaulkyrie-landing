"use client";

import { useEffect, useRef, useCallback } from "react";
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
    accent: "#14b8a6",
  },
  {
    icon: Eye,
    title: "Private Policy Engine",
    description:
      "Define spending rules, risk thresholds, and escalation logic. Arcium MXE evaluates your policy on encrypted data — nobody else sees your rules.",
    accent: "#8b5cf6",
  },
  {
    icon: Shield,
    title: "Quantum-Safe Authority",
    description:
      "Admin operations are signed with WOTS+ one-time signatures backed by hash-based post-quantum cryptography. Future-proof your vault today.",
    accent: "#00ffd5",
  },
  {
    icon: Cpu,
    title: "Minimal Onchain Footprint",
    description:
      "Routine spending stays entirely offchain. The Solana program stores only coordination state — receipts, nonces, and authority hashes.",
    accent: "#14b8a6",
  },
  {
    icon: Lock,
    title: "Replay Protection",
    description:
      "Every policy receipt is action-bound, nonce-tracked, and expiry-gated. Action sessions enforce monotonic progress to prevent double-spend.",
    accent: "#2dd4bf",
  },
  {
    icon: Layers,
    title: "Solana Native",
    description:
      "Built on Pinocchio for lean on-chain execution. The aggregated threshold signature is indistinguishable from a normal Solana wallet signature.",
    accent: "#8b5cf6",
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      const glow = glowRef.current;
      if (!card || !glow) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      glow.style.background = `radial-gradient(300px circle at ${x}px ${y}px, ${feature.accent}15, transparent 60%)`;
    },
    [feature.accent]
  );

  const handleMouseLeave = useCallback(() => {
    if (glowRef.current) {
      glowRef.current.style.background = "transparent";
    }
  }, []);

  return (
    <div
      ref={cardRef}
      data-feature-card={index}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl border border-white/[0.06] bg-card/80 backdrop-blur-sm p-8 transition-[border-color,box-shadow,transform] duration-500 hover:border-white/[0.15] hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1 opacity-0 translate-y-[60px]"
    >
      {/* Mouse-following glow overlay */}
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-300"
        aria-hidden="true"
      />

      {/* Top gradient accent line */}
      <div
        className="absolute top-0 left-4 right-4 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${feature.accent}40, transparent)`,
        }}
      />

      {/* Icon */}
      <div className="relative mb-6">
        <div
          className="inline-flex items-center justify-center w-12 h-12 rounded-xl border transition-all duration-500 group-hover:scale-110"
          style={{
            borderColor: `${feature.accent}15`,
            backgroundColor: `${feature.accent}08`,
          }}
        >
          <feature.icon
            className="w-5 h-5 transition-colors duration-300"
            style={{ color: feature.accent }}
            strokeWidth={1.5}
          />
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-3 group-hover:text-foreground transition-colors">
        {feature.title}
      </h3>

      <p className="text-sm text-muted leading-relaxed">
        {feature.description}
      </p>

      {/* Bottom corner accent */}
      <div
        className="absolute bottom-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 100% 100%, ${feature.accent}08, transparent 70%)`,
        }}
      />
    </div>
  );
}

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const cards = sectionRef.current?.querySelectorAll(
      "[data-feature-card]"
    ) as NodeListOf<HTMLElement> | undefined;

    if (prefersReduced) {
      // Show everything immediately
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
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cards[0],
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="features" className="relative py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Background accents */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.03)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.03)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div ref={headingRef} className="text-center mb-20 opacity-0 translate-y-12">
          <span className="inline-block text-teal text-xs font-mono tracking-widest uppercase mb-4">
            Features
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Security without
            <br />
            <span className="text-muted">compromise.</span>
          </h2>
          <p className="mt-6 text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            Every layer is designed to eliminate single points of failure — from
            key generation to policy enforcement to admin authority.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
