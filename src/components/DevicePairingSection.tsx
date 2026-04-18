"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Smartphone, Laptop, Tablet } from "lucide-react";
import dynamic from "next/dynamic";

const DevicePairing3D = dynamic(() => import("./DevicePairing3D"), {
  ssr: false,
});

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Smartphone,
    number: "01",
    title: "Add Devices",
    description: "Pair your phone, laptop, and tablet as vault signers.",
    accent: "#14b8a6",
  },
  {
    icon: Laptop,
    number: "02",
    title: "Generate Shares",
    description: "Each device creates a piece of your key. No one holds the full key.",
    accent: "#00ffd5",
  },
  {
    icon: Tablet,
    number: "03",
    title: "Sign Together",
    description: "Approve transactions from any 2 of 3 devices. Fast, private, and secure.",
    accent: "#2dd4bf",
  },
];

export default function DevicePairingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      if (headingRef.current) headingRef.current.style.opacity = "1";
      if (stepsRef.current) stepsRef.current.style.opacity = "1";
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      const stepCards = stepsRef.current?.querySelectorAll("[data-step]");
      if (stepCards && stepCards.length > 0) {
        gsap.to(stepCards, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pairing"
      className="relative py-32 overflow-hidden"
    >
      {/* Subtle divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: 3D animation */}
          <div className="relative h-[420px] sm:h-[500px]">
            <DevicePairing3D />

            {/* Ambient glow behind animation */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.06)_0%,transparent_70%)] pointer-events-none" />
          </div>

          {/* Right: Content */}
          <div>
            <div
              ref={headingRef}
              className="mb-10 opacity-0 translate-y-8"
            >
              <span className="inline-block text-teal text-xs font-mono tracking-widest uppercase mb-4">
                Distributed Keys
              </span>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                Your key lives
                <br />
                <span className="bg-gradient-to-r from-teal via-teal-bright to-neon bg-clip-text text-transparent">
                  everywhere.
                </span>
              </h2>
              <p className="mt-4 text-muted max-w-md text-sm sm:text-base leading-relaxed">
                Pair your devices to create a distributed vault.
                Each device holds a share — no single device
                holds your full key.
              </p>
            </div>

            <div ref={stepsRef} className="space-y-5">
              {steps.map((step) => (
                <div
                  key={step.number}
                  data-step
                  className="group relative glass-card rounded-xl p-5 flex items-start gap-5 opacity-0 translate-y-6 hover:border-white/[0.12] transition-[border-color] duration-300"
                >
                  {/* Step number */}
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold font-mono"
                    style={{
                      backgroundColor: `${step.accent}10`,
                      color: step.accent,
                      border: `1px solid ${step.accent}20`,
                    }}
                  >
                    {step.number}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-[family-name:var(--font-space-grotesk)] text-sm font-semibold mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs text-muted leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <step.icon
                    className="w-5 h-5 flex-shrink-0 mt-0.5 opacity-40 group-hover:opacity-70 transition-opacity duration-300"
                    style={{ color: step.accent }}
                    strokeWidth={1.5}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
