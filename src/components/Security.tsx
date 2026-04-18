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
  },
  {
    icon: ShieldCheck,
    title: "Replay-Safe Receipts",
    description:
      "Every policy receipt is bound to a specific action hash, nonce, and expiry window.",
  },
  {
    icon: Fingerprint,
    title: "One-Time Authority Keys",
    description:
      "WOTS+ signatures are used exactly once. Key reuse is structurally impossible.",
  },
  {
    icon: Clock,
    title: "Expiry-Gated Sessions",
    description:
      "Action sessions enforce time bounds and monotonic sequence numbers to prevent stale replays.",
  },
  {
    icon: Ban,
    title: "Zero Onchain Secrets",
    description:
      "No shares, transcripts, policy inputs, or private state are ever stored on-chain.",
  },
  {
    icon: ServerCrash,
    title: "No Single Point of Failure",
    description:
      "Loss of one device doesn't compromise the vault. Threshold recovery is built in.",
  },
];

export default function Security() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
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

      if (imageRef.current) {
        gsap.from(imageRef.current, {
          x: -40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          x: 30,
          opacity: 0,
          duration: 0.6,
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
    <section ref={sectionRef} id="security" className="relative py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div ref={headingRef} className="text-center mb-20">
          <span className="inline-block text-teal text-xs font-mono tracking-widest uppercase mb-4">
            Security
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Controlled by you.
            <br />
            <span className="text-muted">Secured by math.</span>
          </h2>
          <p className="mt-5 text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            Vaulkyrie eliminates every common attack vector — from key theft to
            policy manipulation to quantum threats.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div ref={imageRef}>
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/40">
              <Image
                src="/assets/shardkey.jpeg"
                alt="Threshold key shards visualization"
                width={600}
                height={500}
                className="w-full h-auto object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/70 via-transparent to-transparent" />

              {/* Stats overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex gap-4">
                <div className="glass rounded-lg px-4 py-3 flex-1 text-center">
                  <div className="text-xl font-bold text-teal">256-bit</div>
                  <div className="text-[10px] text-muted uppercase tracking-wider">Security</div>
                </div>
                <div className="glass rounded-lg px-4 py-3 flex-1 text-center">
                  <div className="text-xl font-bold text-neon">WOTS+</div>
                  <div className="text-[10px] text-muted uppercase tracking-wider">PQC Auth</div>
                </div>
                <div className="glass rounded-lg px-4 py-3 flex-1 text-center">
                  <div className="text-xl font-bold text-purple">Ed25519</div>
                  <div className="text-[10px] text-muted uppercase tracking-wider">Spend</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {securityFeatures.map((feature, i) => (
              <div
                key={feature.title}
                ref={(el) => { if (el) cardsRef.current[i] = el; }}
                className="group rounded-xl border border-white/[0.06] bg-card p-5 transition-all duration-300 hover:border-white/[0.12] hover:bg-elevated"
              >
                <feature.icon
                  className="w-5 h-5 text-teal/60 group-hover:text-teal transition-colors mb-3"
                  strokeWidth={1.5}
                />
                <h3 className="text-sm font-semibold mb-1.5">
                  {feature.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed">
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
