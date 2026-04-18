"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ShieldCheck,
  KeyRound,
  Fingerprint,
  Clock,
  Ban,
  ServerCrash,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const securityFeatures = [
  {
    icon: KeyRound,
    title: "No Key Reconstruction",
    description:
      "The full private key is never assembled on any single device — not during signing, not ever.",
    accent: "#14b8a6",
  },
  {
    icon: ShieldCheck,
    title: "Replay-Safe Receipts",
    description:
      "Every policy receipt is bound to a specific action hash, nonce, and expiry window.",
    accent: "#8b5cf6",
  },
  {
    icon: Fingerprint,
    title: "One-Time Authority Keys",
    description:
      "WOTS+ signatures are used exactly once. Key reuse is structurally impossible.",
    accent: "#00ffd5",
  },
  {
    icon: Clock,
    title: "Expiry-Gated Sessions",
    description:
      "Action sessions enforce time bounds and monotonic sequence numbers to prevent stale replays.",
    accent: "#2dd4bf",
  },
  {
    icon: Ban,
    title: "Zero Onchain Secrets",
    description:
      "No shares, transcripts, policy inputs, or private state are ever stored on-chain.",
    accent: "#14b8a6",
  },
  {
    icon: ServerCrash,
    title: "No Single Point of Failure",
    description:
      "Loss of one device doesn't compromise the vault. Threshold recovery is built in.",
    accent: "#8b5cf6",
  },
];

export default function Security() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const cards = sectionRef.current?.querySelectorAll("[data-security-card]") as NodeListOf<HTMLElement> | undefined;

    if (prefersReduced) {
      if (headingRef.current) headingRef.current.style.opacity = "1";
      if (imageRef.current) imageRef.current.style.opacity = "1";
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

      if (imageRef.current) {
        gsap.to(imageRef.current, {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      if (cards && cards.length > 0) {
        gsap.to(cards, {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
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
    <section ref={sectionRef} id="security" className="relative py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Background */}
      <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.03)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div ref={headingRef} className="text-center mb-20 opacity-0 translate-y-12">
          <span className="inline-block text-teal text-xs font-mono tracking-widest uppercase mb-4">
            Security
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Controlled by you.
            <br />
            <span className="text-muted">Secured by math.</span>
          </h2>
          <p className="mt-6 text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            Vaulkyrie eliminates every common attack vector — from key theft to
            policy manipulation to quantum threats.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Image with parallax effect */}
          <div ref={imageRef} className="lg:sticky lg:top-32 opacity-0 -translate-x-[60px]">
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/60 gradient-border">
              <Image
                src="/assets/shardkey.jpeg"
                alt="Threshold key shards visualization"
                width={640}
                height={520}
                className="w-full h-auto object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/80 via-[#050508]/20 to-transparent" />

              {/* Stats overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex gap-3">
                {[
                  { value: "256-bit", label: "Security", color: "#14b8a6" },
                  { value: "WOTS+", label: "PQC Auth", color: "#00ffd5" },
                  { value: "Ed25519", label: "Spend", color: "#8b5cf6" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="glass rounded-lg px-4 py-3 flex-1 text-center border border-white/[0.06]"
                  >
                    <div
                      className="text-lg font-bold"
                      style={{ color: stat.color }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-[10px] text-muted uppercase tracking-widest mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {securityFeatures.map((feature, i) => (
              <div
                key={feature.title}
                data-security-card={i}
                className="group relative rounded-xl border border-white/[0.06] bg-card/80 backdrop-blur-sm p-6 transition-[border-color,box-shadow] duration-500 hover:border-white/[0.15] hover:shadow-lg hover:shadow-black/20 opacity-0 translate-x-[40px]"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(200px circle at 50% 0%, ${feature.accent}08, transparent 60%)`,
                  }}
                />

                <feature.icon
                  className="w-5 h-5 mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{ color: `${feature.accent}99` }}
                  strokeWidth={1.5}
                />
                <h3 className="text-sm font-semibold mb-2 relative">
                  {feature.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed relative">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
