"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Laptop, Smartphone, Tablet } from "lucide-react";
import dynamic from "next/dynamic";

const DevicePairing3D = dynamic(() => import("./DevicePairing3D"), {
  ssr: false,
});

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Smartphone,
    number: "01",
    title: "Pair devices",
    description: "Bring phone, laptop, and desktop into one FROST signing circle.",
    accent: "#00ffd5",
  },
  {
    icon: Laptop,
    number: "02",
    title: "Spread the hold",
    description: "Distributed shares keep full control off any single screen.",
    accent: "#14b8a6",
  },
  {
    icon: Tablet,
    number: "03",
    title: "Approve together",
    description: "Only the right quorum joins when a move should go through.",
    accent: "#dffef3",
  },
];

export default function DevicePairingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 28,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(visualRef.current, {
        opacity: 0,
        x: -40,
        scale: 0.94,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: visualRef.current,
          start: "top 82%",
          once: true,
        },
      });

      const stepCards = stepsRef.current?.querySelectorAll("[data-step]");
      if (stepCards && stepCards.length > 0) {
        stepCards.forEach((card, index) => {
          gsap.from(card, {
            opacity: 0,
            x: 16,
            duration: 0.75,
            delay: index * 0.1,
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
    <section ref={sectionRef} id="pairing" className="relative z-20 overflow-hidden bg-bg-abyss py-28 lg:py-44">
      <div className="absolute left-0 right-0 top-0 h-px bg-white/5" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <div ref={visualRef} className="relative h-[400px] sm:h-[500px]">
            <DevicePairing3D />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,213,0.05)_0%,transparent_70%)]" />
          </div>

          <div className="relative">
            <div ref={headingRef} className="mb-12">
              <span className="technical-label mb-4 inline-block text-neon">Shared hold</span>

              <h2 className="brand-display mb-6 text-4xl font-bold leading-[1.02] text-white lg:text-6xl">
                Your key
                <br />
                lives everywhere.
              </h2>

              <p className="max-w-md text-lg font-medium leading-relaxed text-text-secondary">
                FROST DKG spreads signing power across your devices, so one lost screen never becomes one lost wallet.
              </p>
            </div>

            <div ref={stepsRef} className="space-y-4">
              {steps.map((step) => (
                <div
                  key={step.number}
                  data-step
                  className="group flex items-center gap-6 rounded-[1.6rem] border border-white/[0.06] bg-[#0c0d14]/40 p-6 transition-all duration-300 hover:border-white/[0.1] hover:bg-[#0c0d14]/76"
                >
                  <div
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border text-sm font-bold font-mono"
                    style={{
                      backgroundColor: `${step.accent}10`,
                      color: step.accent,
                      borderColor: `${step.accent}22`,
                    }}
                  >
                    {step.number}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="mb-1 text-base font-bold text-white">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-text-secondary">{step.description}</p>
                  </div>

                  <step.icon className="h-5 w-5 flex-shrink-0" style={{ color: step.accent }} strokeWidth={1.5} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
