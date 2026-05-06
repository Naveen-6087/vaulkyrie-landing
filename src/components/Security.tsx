"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Ban, Clock, EyeOff, KeyRound, Lock, ShieldCheck, Zap } from "lucide-react";
import { VAULKYRIE_LINKS } from "@/lib/links";
import { SecurityArchitectureDiagram } from "./MinimalDiagrams";

gsap.registerPlugin(ScrollTrigger);

const securityFeatures = [
  { icon: KeyRound, title: "No single device", description: "The hold is never left to one point alone." },
  { icon: ShieldCheck, title: "Clear approval", description: "Every move matches the same intent." },
  { icon: Lock, title: "Fresh lock", description: "The stronghold tightens again after a move." },
  { icon: EyeOff, title: "Quiet route", description: "Private movement keeps the path calmer." },
  { icon: Clock, title: "Short open windows", description: "Approval sessions do not linger for long." },
  { icon: Ban, title: "Clean chain record", description: "What lands on-chain stays lean and familiar." },
];

const spendFlowSteps = [
  { step: "01", title: "Intent", description: "You choose the move." },
  { step: "02", title: "Circle", description: "The right devices join in." },
  { step: "03", title: "Sign", description: "The wallet closes it into one signature." },
  { step: "04", title: "Send", description: "The transaction lands on Solana." },
];

export default function Security() {
  const sectionRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-security-card]", {
        opacity: 0,
        y: 24,
        stagger: 0.07,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-security-grid]",
          start: "top 82%",
        },
      });

      gsap.from("[data-flow]", {
        opacity: 0,
        x: -18,
        stagger: 0.08,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-spend-flow]",
          start: "top 82%",
        },
      });

      if (mapRef.current) {
        const mapTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: mapRef.current,
            start: "top 82%",
          },
        });

        mapTimeline
          .from(mapRef.current.querySelector('[data-security-piece="rail"]'), {
            opacity: 0,
            scaleX: 0.7,
            duration: 0.35,
            transformOrigin: "50% 50%",
            ease: "power2.out",
          })
          .from(mapRef.current.querySelector('[data-security-piece="devices"]'), {
            opacity: 0,
            x: -70,
            duration: 0.45,
            ease: "power3.out",
          }, "-=0.15")
          .from(mapRef.current.querySelector('[data-security-piece="cores"]'), {
            opacity: 0,
            scale: 0.68,
            duration: 0.45,
            transformOrigin: "50% 50%",
            ease: "back.out(1.6)",
          }, "-=0.2")
          .from(mapRef.current.querySelector('[data-security-piece="flows"]'), {
            opacity: 0,
            y: 18,
            duration: 0.35,
            ease: "power2.out",
          }, "-=0.18")
          .from(mapRef.current.querySelector('[data-security-piece="cluster"]'), {
            opacity: 0,
            x: 80,
            scale: 0.88,
            duration: 0.45,
            transformOrigin: "50% 50%",
            ease: "power3.out",
          }, "-=0.18");
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="security" className="relative overflow-hidden bg-bg-abyss py-28 lg:py-44">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-14 max-w-3xl">
          <span className="technical-label mb-4 inline-block text-neon">Safety</span>
          <h2 className="brand-display text-4xl font-black sm:text-5xl lg:text-6xl">
            Built to hold.
          </h2>
        </div>

        <div data-security-grid className="mb-28 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {securityFeatures.map((feature) => (
            <div key={feature.title} data-security-card className="rounded-[1.6rem] border border-white/[0.06] bg-[#0c0d14]/45 p-6 transition-colors hover:border-neon/18">
              <feature.icon className="mb-5 h-6 w-6 text-neon" strokeWidth={1.5} />
              <h3 className="mb-2 text-lg font-black">{feature.title}</h3>
              <p className="text-sm text-text-secondary">{feature.description}</p>
            </div>
          ))}
        </div>

        <div data-spend-flow className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <span className="technical-label mb-4 inline-block text-neon">A clean send</span>
            <h2 className="mb-6 text-4xl font-black leading-tight lg:text-6xl">
              From tap
              <br />
              to chain.
            </h2>
            <div className="space-y-4">
              {spendFlowSteps.map((step) => (
                <div key={step.step} data-flow className="flex gap-4 border-l border-neon/25 pl-5">
                  <span className="font-mono text-sm text-neon">{step.step}</span>
                  <div>
                    <h3 className="text-lg font-black">{step.title}</h3>
                    <p className="text-sm text-text-secondary">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div ref={mapRef} data-project-map className="min-h-[360px] lg:col-span-8">
            <SecurityArchitectureDiagram />
          </div>
        </div>

        <div className="mt-24 rounded-[1.75rem] border border-neon/20 bg-neon/[0.04] p-6 md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <span className="technical-label text-neon">Need the technical side?</span>
            <p className="mt-2 max-w-2xl text-text-secondary">Open the docs for the wallet, the programs, and the build path behind Vaulkyrie.</p>
          </div>
          <a
            href={VAULKYRIE_LINKS.docs}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-neon px-5 py-3 text-sm font-black uppercase text-black transition-colors hover:bg-white md:mt-0"
          >
            Read the docs
            <Zap className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
