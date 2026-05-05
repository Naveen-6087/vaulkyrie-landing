"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lock, Shield, Users, Zap } from "lucide-react";
import dynamic from "next/dynamic";
import type { ThresholdModeId } from "./ThresholdSigning3D";

const ThresholdSigning3D = dynamic(() => import("./ThresholdSigning3D"), {
  ssr: false,
});

gsap.registerPlugin(ScrollTrigger);

const MODES: Array<{
  id: ThresholdModeId;
  title: string;
  description: string;
  badge: string;
  icon: typeof Zap;
}> = [
  {
    id: "fast",
    title: "Fast Vault",
    description: "This browser plus a Vaulkyrie server cosigner. Best for demos and single-device recovery.",
    badge: "Assisted",
    icon: Zap,
  },
  {
    id: "one-of-three",
    title: "1 of 3",
    description: "Any single device can sign. Best for personal use.",
    badge: "Low security",
    icon: Shield,
  },
  {
    id: "two-of-three",
    title: "2 of 3",
    description: "Two devices must agree. Recommended for most users.",
    badge: "Balanced",
    icon: Users,
  },
  {
    id: "three-of-three",
    title: "3 of 3",
    description: "All devices must sign. Maximum security, no redundancy.",
    badge: "Maximum security",
    icon: Lock,
  },
];

export default function ThresholdSigningSection() {
  const [active, setActive] = useState<ThresholdModeId>("two-of-three");
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(introRef.current, {
        opacity: 0,
        y: 28,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: introRef.current,
          start: "top 84%",
          once: true,
        },
      });

      gsap.from(visualRef.current, {
        opacity: 0,
        scale: 0.95,
        x: 24,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: visualRef.current,
          start: "top 84%",
          once: true,
        },
      });

      const cards = cardsRef.current?.querySelectorAll("[data-threshold-card]");
      if (cards?.length) {
        cards.forEach((card, index) => {
          gsap.from(card, {
            opacity: 0,
            x: 24,
            duration: 0.55,
            delay: index * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              once: true,
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="threshold-signing" className="relative overflow-hidden bg-bg-abyss py-28 lg:py-40">
      <div className="absolute inset-x-0 top-0 h-px bg-white/5" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div ref={introRef} className="max-w-3xl">
          <span className="technical-label text-neon">Threshold signing</span>
          <h2 className="mt-4 brand-display text-4xl font-black uppercase leading-[0.94] text-white lg:text-6xl">
            Pick the quorum.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary lg:text-lg">
            Vaulkyrie supports assisted fast signing and full multi-device threshold quorums. Change the mode and the signing geometry updates with it.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(340px,420px)_minmax(0,1.15fr)] lg:gap-14">
          <div ref={cardsRef} className="space-y-4">
            {MODES.map((mode) => {
              const Icon = mode.icon;
              const isActive = active === mode.id;

              return (
                <button
                  key={mode.id}
                  type="button"
                  data-threshold-card
                  onClick={() => setActive(mode.id)}
                  className={`w-full rounded-[1.6rem] border p-5 text-left transition-all duration-300 ${
                    isActive
                      ? "border-neon/40 bg-white/[0.04] shadow-[0_0_0_1px_rgba(0,255,213,0.08)]"
                      : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl border ${
                        isActive ? "border-neon/30 bg-neon/10 text-neon" : "border-white/[0.08] bg-white/[0.02] text-white/56"
                      }`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.6} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-lg font-black text-white">{mode.title}</h3>
                        <span className={`technical-label ${isActive ? "text-neon" : "text-white/32"}`}>{mode.badge}</span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{mode.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div
            ref={visualRef}
            className="relative h-[430px] overflow-visible bg-[radial-gradient(circle_at_50%_44%,rgba(0,255,213,0.1),transparent_36%),radial-gradient(circle_at_50%_68%,rgba(20,184,166,0.08),transparent_34%)] lg:h-[470px]"
          >
            <div className="absolute inset-x-[12%] top-[18%] h-44 rounded-full bg-neon/10 blur-[110px]" />
            <ThresholdSigning3D mode={active} />
          </div>
        </div>
      </div>
    </section>
  );
}
