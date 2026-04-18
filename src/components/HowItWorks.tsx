"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Create Your Vault",
    subtitle: "Distributed Key Generation",
    description:
      "Choose your device topology (e.g. 2-of-3) and run FROST DKG. Each device stores one secret share — the full key never exists anywhere.",
    detail: "The group public key becomes your Solana wallet address.",
  },
  {
    num: "02",
    title: "Define Policy",
    subtitle: "Private Risk Engine",
    description:
      "Set spending limits, time-locks, and escalation rules. Arcium evaluates your policy on encrypted data — your rules stay private.",
    detail: "Policy receipts determine the signing threshold per action.",
  },
  {
    num: "03",
    title: "Sign Transactions",
    subtitle: "Threshold Ceremony",
    description:
      "Build your transaction, receive a policy verdict, and run a threshold signing ceremony. Devices produce shares that aggregate into one valid signature.",
    detail: "Standard Ed25519 — indistinguishable from a normal wallet.",
  },
  {
    num: "04",
    title: "Broadcast",
    subtitle: "Solana Native",
    description:
      "Submit the signed transaction to Solana like any other. Validators see a normal signature. No special infrastructure needed.",
    detail: "Compatible with every dApp, DEX, and protocol on Solana.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

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

      // Animate the connecting line
      if (lineRef.current) {
        gsap.from(lineRef.current, {
          scaleY: 0,
          transformOrigin: "top center",
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      stepsRef.current.forEach((step, i) => {
        if (!step) return;
        gsap.from(step, {
          x: i % 2 === 0 ? -40 : 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="how-it-works" className="relative py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.04)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div ref={headingRef} className="text-center mb-20">
          <span className="inline-block text-teal text-xs font-mono tracking-widest uppercase mb-4">
            How It Works
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Simple to use.
            <br />
            <span className="text-muted">Hard to break.</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical connecting line */}
          <div
            ref={lineRef}
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-teal/30 via-purple/20 to-transparent hidden md:block"
            style={{ transform: "translateX(-50%)" }}
          />

          <div className="flex flex-col gap-16 md:gap-20">
            {steps.map((step, i) => (
              <div
                key={step.num}
                ref={(el) => { if (el) stepsRef.current[i] = el; }}
                className={`flex flex-col md:flex-row items-start gap-8 ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${i % 2 === 1 ? "md:text-right" : ""}`}>
                  <div className="group rounded-2xl border border-white/[0.06] bg-card p-8 transition-all duration-300 hover:border-white/[0.12] hover:bg-elevated">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl font-bold text-teal/20 font-mono">
                        {step.num}
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold">{step.title}</h3>
                        <span className="text-xs text-teal/60 font-mono uppercase tracking-wider">
                          {step.subtitle}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted leading-relaxed mb-4">
                      {step.description}
                    </p>
                    <p className="text-xs text-subtle font-mono border-t border-white/[0.06] pt-4">
                      {step.detail}
                    </p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex items-start justify-center w-8 pt-8">
                  <div className="w-3 h-3 rounded-full bg-teal/40 border-2 border-teal/60 shadow-lg shadow-teal/20" />
                </div>

                {/* Spacer */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom arrow */}
        <div className="flex justify-center mt-16">
          <div className="flex flex-col items-center gap-2 text-subtle">
            <ArrowDown className="w-4 h-4 animate-bounce" />
            <span className="text-xs font-mono uppercase tracking-wider">
              All on Solana
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
