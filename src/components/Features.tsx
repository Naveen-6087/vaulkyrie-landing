"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eye, Shield, Workflow, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const featureCards = [
  {
    title: "Multi-device signing",
    description: "FROST spreads signing power across devices, so one screen never becomes one point of failure.",
    icon: Workflow,
    image: "/assets/key-m-of-n.jpeg",
    alt: "Vaulkyrie multi-device signing visual",
    accent: "#00ffd5",
    layoutClass: "lg:col-span-6 lg:row-span-2",
  },
  {
    title: "Umbra privacy",
    description: "Veil uses Umbra for shielded balances and private transfers without changing the wallet feel.",
    icon: Eye,
    image: "/assets/features.jpeg",
    alt: "Vaulkyrie Umbra privacy visual",
    accent: "#14b8a6",
    layoutClass: "lg:col-span-3 lg:row-span-1",
  },
  {
    title: "Future-proof control",
    description: "WOTS+ authority is reserved for recovery, rekey, and irreversible control flows.",
    icon: Shield,
    image: "/assets/qvault.jpeg",
    alt: "Vaulkyrie future-proof security visual",
    accent: "#dffef3",
    layoutClass: "lg:col-span-3 lg:row-span-1",
  },
  {
    title: "Solana-native surface",
    description: "Extension-ready UX, familiar transaction flow, and a clean path into existing apps.",
    icon: Zap,
    image: "/assets/browser-extension.jpeg",
    alt: "Vaulkyrie browser extension visual",
    accent: "#00ffd5",
    layoutClass: "lg:col-span-6 lg:row-span-1",
  },
] as const;

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current?.querySelectorAll("[data-feature-line]") ?? [], {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 84%",
        },
      });

      const cards = cardsRef.current;
      const fromStates = [
        { x: -140, y: 28, rotate: -4, opacity: 0 },
        { x: 110, y: -26, rotate: 4, opacity: 0 },
        { x: 140, y: 18, rotate: 5, opacity: 0 },
        { x: 0, y: 120, rotate: 2, opacity: 0 },
      ];

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          fromStates[index],
          {
            x: 0,
            y: 0,
            rotate: 0,
            opacity: 1,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
            },
          },
        );

        const media = card.querySelector("[data-feature-media]");
        if (media) {
          gsap.fromTo(
            media,
            { yPercent: -7, scale: 1.08 },
            {
              yPercent: 7,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            },
          );
        }
      });

      gsap.fromTo(
        stackRef.current,
        { y: 20 },
        {
          y: -18,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="highlights"
      className="relative overflow-hidden bg-bg-abyss py-28 lg:py-36"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-white/5" />
      <div className="pointer-events-none absolute left-1/2 top-32 h-[38rem] w-[68rem] -translate-x-1/2 bg-[radial-gradient(circle_at_center,rgba(0,255,213,0.08),transparent_62%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div ref={headingRef} className="mb-16 text-center lg:mb-12">
          <span className="technical-label mb-4 inline-block text-neon">Everything in one place</span>
          <h2 className="brand-display text-4xl font-bold sm:text-5xl lg:text-6xl">
            <span data-feature-line className="block">
              Core features.
            </span>
            <span data-feature-line className="block text-white/72">
              One wallet.
            </span>
          </h2>
        </div>

        <div ref={stackRef} className="relative">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[18rem]">
            {featureCards.map((card, index) => (
              <article
                key={card.title}
                ref={(element) => {
                  if (element) cardsRef.current[index] = element;
                }}
                className={`group relative min-h-[24rem] overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#06080d]/84 shadow-[0_20px_90px_rgba(0,0,0,0.3)] md:min-h-[20rem] lg:h-full lg:min-h-0 ${card.layoutClass}`}
              >
                <div className="absolute inset-0">
                  <div data-feature-media className="relative h-full w-full">
                    <Image src={card.image} alt={card.alt} fill className="object-cover opacity-84" sizes="(max-width: 1024px) 100vw, 50vw" />
                  </div>
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,2,4,0.08),rgba(2,2,4,0.74)_48%,rgba(2,2,4,0.96))]" />
                </div>

                <div className="relative z-10 flex h-full flex-col justify-end p-7 lg:p-8">
                  <div
                    className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border"
                    style={{
                      borderColor: `${card.accent}33`,
                      backgroundColor: `${card.accent}12`,
                    }}
                  >
                    <card.icon className="h-5 w-5" style={{ color: card.accent }} strokeWidth={1.6} />
                  </div>
                  <h3 className="mb-3 text-[1.7rem] font-black leading-tight text-white lg:text-[2.05rem]">
                    {card.title}
                  </h3>
                  <p className="max-w-[26rem] text-sm leading-relaxed text-text-secondary lg:text-base">
                    {card.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
