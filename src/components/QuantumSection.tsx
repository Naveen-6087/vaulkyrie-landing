"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Atom, Lock } from "lucide-react";
import dynamic from "next/dynamic";

const QuantumVault3D = dynamic(() => import("./QuantumVault3D"), { ssr: false });
const PhotonRays = dynamic(() => import("./PhotonRays"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const quantumFeatures = [
  {
    icon: Shield,
    title: "Post-Quantum Admin",
    description: "Future computers can't forge your admin keys.",
    accent: "#14b8a6",
  },
  {
    icon: Atom,
    title: "One-Time Signatures",
    description: "Every admin action uses a fresh key, then discards it.",
    accent: "#00ffd5",
  },
  {
    icon: Lock,
    title: "Forward Secure",
    description: "Past transactions stay safe even if encryption breaks.",
    accent: "#2dd4bf",
  },
];

export default function QuantumSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const vaultContainerRef = useRef<HTMLDivElement>(null);
  const featureCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      if (cardRef.current) {
        cardRef.current.style.width = "100%";
        cardRef.current.style.height = "100vh";
        cardRef.current.style.borderRadius = "0";
      }
      if (headingRef.current) headingRef.current.style.opacity = "1";
      if (featureCardsRef.current) featureCardsRef.current.style.opacity = "1";
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=180%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Card expands to fullscreen
      tl.to(cardRef.current, {
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
        duration: 1,
        ease: "power2.inOut",
      });

      // Heading fades in
      tl.to(
        headingRef.current,
        { opacity: 1, y: 0, duration: 0.4 },
        "-=0.3",
      );

      // Vault appears (centered)
      tl.to(
        vaultContainerRef.current,
        { opacity: 1, scale: 1, duration: 0.5 },
        "-=0.2",
      );

      // Feature cards fade in on top
      tl.to(
        featureCardsRef.current,
        { opacity: 1, y: 0, duration: 0.4 },
        "-=0.3",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="quantum"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <PhotonRays />

      <div
        ref={cardRef}
        className="relative glass-card rounded-3xl overflow-hidden flex items-center justify-center"
        style={{ width: "340px", height: "240px" }}
      >
        <div className="absolute inset-0 bg-[#040406]/60" />

        {/* Content: vault centered, cards overlaid on top */}
        <div className="relative z-10 flex flex-col items-center h-full w-full">
          {/* Heading */}
          <div
            ref={headingRef}
            className="pt-8 sm:pt-12 px-6 text-center opacity-0 translate-y-8"
          >
            <span className="inline-block text-teal text-xs font-mono tracking-widest uppercase mb-3">
              Future-Proof
            </span>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight">
              Quantum-proof
              <span className="bg-gradient-to-r from-teal via-teal-bright to-neon bg-clip-text text-transparent ml-3">
                by design.
              </span>
            </h2>
          </div>

          {/* Centered vault with overlaid feature cards */}
          <div className="flex-1 relative w-full flex items-center justify-center">
            {/* 3D Vault — centered, takes up the main area */}
            <div
              ref={vaultContainerRef}
              className="w-full max-w-[640px] h-[340px] sm:h-[420px] lg:h-[480px] opacity-0"
              style={{ transform: "scale(0.8)" }}
            >
              <QuantumVault3D />
            </div>

            {/* Feature cards overlaid at the bottom of the vault */}
            <div
              ref={featureCardsRef}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 sm:gap-4 opacity-0 translate-y-8 w-full max-w-[700px] px-4"
            >
              {quantumFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="flex-1 rounded-xl border border-white/[0.08] bg-[#040406]/70 backdrop-blur-md p-3 sm:p-4 hover:border-white/[0.15] transition-[border-color] duration-300"
                >
                  <feature.icon
                    className="w-5 h-5 mb-2"
                    style={{ color: feature.accent }}
                    strokeWidth={1.5}
                  />
                  <h3 className="font-[family-name:var(--font-space-grotesk)] text-xs sm:text-sm font-semibold mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-muted leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
