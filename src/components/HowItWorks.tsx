"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Create Your Vault",
    subtitle: "Distributed Key Generation",
    description:
      "Choose your device topology (e.g. 2-of-3) and run FROST DKG. Each device stores one secret share — the full key never exists anywhere.",
    detail: "The group public key becomes your Solana wallet address.",
    accent: "#14b8a6",
  },
  {
    num: "02",
    title: "Define Policy",
    subtitle: "Private Risk Engine",
    description:
      "Set spending limits, time-locks, and escalation rules. Arcium evaluates your policy on encrypted data — your rules stay private.",
    detail: "Policy receipts determine the signing threshold per action.",
    accent: "#8b5cf6",
  },
  {
    num: "03",
    title: "Sign Transactions",
    subtitle: "Threshold Ceremony",
    description:
      "Build your transaction, receive a policy verdict, and run a threshold signing ceremony. Devices produce shares that aggregate into one valid signature.",
    detail: "Standard Ed25519 — indistinguishable from a normal wallet.",
    accent: "#00ffd5",
  },
  {
    num: "04",
    title: "Broadcast",
    subtitle: "Solana Native",
    description:
      "Submit the signed transaction to Solana like any other. Validators see a normal signature. No special infrastructure needed.",
    detail: "Compatible with every dApp, DEX, and protocol on Solana.",
    accent: "#2dd4bf",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const cards = sectionRef.current?.querySelectorAll("[data-step]") as NodeListOf<HTMLElement> | undefined;
    const dots = sectionRef.current?.querySelectorAll("[data-dot]") as NodeListOf<HTMLElement> | undefined;

    if (prefersReduced) {
      if (headingRef.current) headingRef.current.style.opacity = "1";
      cards?.forEach((c) => (c.style.opacity = "1"));
      dots?.forEach((d) => { d.style.opacity = "1"; d.style.transform = "scale(1)"; });
      if (lineRef.current) lineRef.current.style.transform = "scaleY(1)";
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

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top center",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "bottom 60%",
              scrub: 1,
            },
          }
        );
      }

      if (cards) {
        cards.forEach((card, i) => {
          gsap.to(card, {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        });
      }

      if (dots) {
        dots.forEach((dot) => {
          gsap.to(dot, {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: dot,
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
    <section ref={sectionRef} id="how-it-works" className="relative py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.03)_0%,transparent_50%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div ref={headingRef} className="text-center mb-24 opacity-0 translate-y-12">
          <span className="inline-block text-teal text-xs font-mono tracking-widest uppercase mb-4">
            How It Works
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Simple to use.
            <br />
            <span className="text-muted">Hard to break.</span>
          </h2>
        </div>

        {/* Steps with timeline */}
        <div className="relative">
          {/* Vertical connecting line (scroll-driven) */}
          <div className="absolute left-8 md:left-1/2 md:-translate-x-[0.5px] top-0 bottom-0 w-px hidden md:block">
            {/* Track (faint) */}
            <div className="absolute inset-0 bg-white/[0.04]" />
            {/* Fill (animated) */}
            <div
              ref={lineRef}
              className="absolute inset-0 bg-gradient-to-b from-teal via-purple to-neon"
              style={{ transformOrigin: "top center", transform: "scaleY(0)" }}
            />
          </div>

          <div className="flex flex-col gap-20 md:gap-28">
            {steps.map((step, i) => (
              <div
                key={step.num}
                data-step={i}
                className={`relative flex flex-col md:flex-row items-start gap-8 opacity-0 ${
                  i % 2 === 0 ? "-translate-x-[60px]" : "translate-x-[60px]"
                } ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
              >
                {/* Content card */}
                <div
                  className={`flex-1 ${i % 2 === 1 ? "md:text-right" : ""}`}
                >
                  <div className="group relative rounded-2xl border border-white/[0.06] bg-card/80 backdrop-blur-sm p-8 transition-all duration-500 hover:border-white/[0.15] hover:shadow-xl hover:shadow-black/20">
                    {/* Top accent */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${step.accent}50, transparent)`,
                      }}
                    />

                    {/* Step number */}
                    <span
                      className="text-7xl font-bold font-mono leading-none opacity-[0.06] absolute top-4 right-6 select-none"
                      aria-hidden="true"
                    >
                      {step.num}
                    </span>

                    <div className="relative">
                      <div
                        className={`flex items-center gap-3 mb-4 ${
                          i % 2 === 1 ? "md:flex-row-reverse" : ""
                        }`}
                      >
                        <div>
                          <h3 className="text-xl font-semibold">
                            {step.title}
                          </h3>
                          <span
                            className="text-xs font-mono uppercase tracking-widest"
                            style={{ color: `${step.accent}99` }}
                          >
                            {step.subtitle}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-muted leading-relaxed mb-4">
                        {step.description}
                      </p>

                      <div className="border-t border-white/[0.06] pt-4">
                        <p className="text-xs text-subtle font-mono flex items-center gap-2">
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: step.accent }}
                          />
                          {step.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex items-start justify-center w-8 pt-10">
                  <div
                    data-dot={i}
                    className="relative w-4 h-4 rounded-full border-2 shadow-lg"
                    style={{
                      borderColor: step.accent,
                      backgroundColor: `${step.accent}30`,
                      boxShadow: `0 0 20px ${step.accent}30`,
                    }}
                  >
                    <div
                      className="absolute inset-1 rounded-full"
                      style={{ backgroundColor: step.accent }}
                    />
                  </div>
                </div>

                {/* Spacer */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
