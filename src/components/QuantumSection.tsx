"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import QuantumComputerDiagram from "./QuantumComputerDiagram";

gsap.registerPlugin(ScrollTrigger);

const qcPieces = [
  '[data-qc-piece="halo"]',
  '[data-qc-piece="crown"]',
  '[data-qc-piece="harness-left"]',
  '[data-qc-piece="harness-right"]',
  '[data-qc-piece="hangers"]',
  '[data-qc-piece="rings"]',
  '[data-qc-piece="core"]',
  '[data-qc-piece="satellites"]',
  '[data-qc-piece="floor"]',
] as const;

const pqcSteps = [
  {
    tag: "SPEND",
    title: "FROST handles spend",
    description: "Routine transfers still leave as standard Ed25519 signatures on Solana.",
  },
  {
    tag: "WOTS+",
    title: "Recovery opens the slower lane",
    description: "Stronghold only wakes when recovery or authority rotation needs the one-time path.",
  },
  {
    tag: "XMSS",
    title: "Next-key progression stays forward-only",
    description: "Each high-risk action commits the next authority hash instead of reusing the same control key.",
  },
  {
    tag: "PINO",
    title: "Pinocchio keeps only the state that matters",
    description: "Onchain state stays minimal while the deeper control lane moves off the routine spend path.",
  },
] as const;

export default function QuantumSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const steps = stepsRef.current?.querySelectorAll("[data-quantum-step]") as NodeListOf<HTMLElement> | undefined;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        stageRef.current,
        { opacity: 0.42 },
        { opacity: 1, duration: 0.08 },
        0,
      )
        .fromTo(
          bgRef.current,
          { yPercent: 10, scale: 1.08 },
          { yPercent: -2, scale: 1, duration: 0.48 },
          0,
        )
        .fromTo(qcPieces[0], { opacity: 0, scale: 0.72 }, { opacity: 1, scale: 1, duration: 0.08 }, 0.04)
        .fromTo(qcPieces[1], { opacity: 0, y: -100, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 0.08 }, 0.08)
        .fromTo(qcPieces[2], { opacity: 0, x: -150 }, { opacity: 1, x: 0, duration: 0.08 }, 0.14)
        .fromTo(qcPieces[3], { opacity: 0, x: 150 }, { opacity: 1, x: 0, duration: 0.08 }, 0.14)
        .fromTo(qcPieces[4], { opacity: 0, y: -60 }, { opacity: 1, y: 0, duration: 0.06 }, 0.2)
        .fromTo(qcPieces[5], { opacity: 0, y: 48, scale: 0.84 }, { opacity: 1, y: 0, scale: 1, duration: 0.1 }, 0.25)
        .fromTo(qcPieces[6], { opacity: 0, y: 54, scale: 0.7 }, { opacity: 1, y: 0, scale: 1, duration: 0.08 }, 0.31)
        .fromTo(qcPieces[7], { opacity: 0, scale: 0.82 }, { opacity: 1, scale: 1, duration: 0.06 }, 0.36)
        .fromTo(qcPieces[8], { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.06 }, 0.4)
        .fromTo(
          overlayRef.current,
          { yPercent: 112 },
          { yPercent: 0, duration: 0.2 },
          0.6,
        )
        .fromTo(
          introRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.12, ease: "power2.out" },
          0.76,
        )
        .fromTo(
          steps ?? [],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.04, duration: 0.1, ease: "power2.out" },
          0.8,
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="quantum" className="relative min-h-[390vh] bg-bg-abyss">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(0,255,213,0.14),transparent_34%),radial-gradient(circle_at_50%_74%,rgba(20,184,166,0.08),transparent_44%)]" />

        <div ref={stageRef} className="absolute inset-0">
          <div ref={bgRef} className="absolute inset-0 flex items-center justify-center">
            <QuantumComputerDiagram
              disableScrollReveal
              className="w-[150vw] max-w-[1280px] -translate-y-[5%] scale-[1.28] sm:w-[132vw] sm:scale-[1.1] lg:w-[92vw] lg:scale-[1]"
            />
          </div>
        </div>

        <div ref={overlayRef} className="absolute inset-0 z-20">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <mask id="quantum-hole-mask">
                <rect width="100" height="100" fill="white" />
                <circle cx="50" cy="46.5" r="47" fill="black" />
              </mask>
            </defs>
            <rect width="100" height="100" fill="rgba(5,7,12,0.92)" mask="url(#quantum-hole-mask)" />
            <circle cx="50" cy="46.5" r="47" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.28" />
          </svg>

          <div className="relative grid h-full grid-rows-[auto_1fr_auto] px-5 py-6 sm:px-8 sm:py-8 lg:grid-cols-[minmax(240px,320px)_1fr_minmax(290px,360px)] lg:grid-rows-1 lg:px-[4vw] lg:py-[10vh]">
            <div
              ref={introRef}
              className="relative z-10 mt-4 max-w-[15rem] self-start sm:mt-6 sm:max-w-[18rem] lg:mt-[12vh] lg:max-w-[19rem]"
            >
              <span className="technical-label text-neon">Stronghold</span>
              <h2 className="mt-4 brand-display text-4xl font-black uppercase leading-[0.92] text-white sm:text-5xl lg:text-[4.6rem]">
                PQC where
                <br />
                it fits.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary sm:text-base">
                Daily spend stays native. Stronghold only rises for recovery, rekey, and irreversible wallet authority.
              </p>
            </div>

            <ol
              ref={stepsRef}
              className="relative z-10 mt-auto space-y-3 self-end pb-2 sm:space-y-4 lg:col-start-3 lg:row-start-1 lg:mb-[10vh] lg:w-[min(24rem,100%)] lg:space-y-5 lg:pb-0"
            >
              {pqcSteps.map((step) => (
                <li
                  key={step.title}
                  data-quantum-step
                  className="border-b border-white/[0.08] pb-3 last:border-b-0 lg:pb-5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-base font-black text-white sm:text-lg">{step.title}</h3>
                    <span className="technical-label text-neon/70">{step.tag}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
