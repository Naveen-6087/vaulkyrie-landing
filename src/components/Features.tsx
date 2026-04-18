"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Lock, Smartphone, Eye, Layers, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const bentoItems = [
  {
    id: "threshold",
    icon: Lock,
    title: "Multi-Device Signing",
    description: "Your key is split across devices. No single device can sign alone.",
    accent: "#14b8a6",
    size: "large",
    image: "/assets/key-m-of-n.jpeg",
  },
  {
    id: "private-policy",
    icon: Eye,
    title: "Private Policy Engine",
    description: "Set your own spending rules. Evaluated on encrypted data.",
    accent: "#00ffd5",
    size: "small",
    image: "/assets/browser-extension.jpeg",
  },
  {
    id: "quantum",
    icon: Shield,
    title: "Future-Proof Security",
    description: "Admin operations use quantum-resistant signatures.",
    accent: "#2dd4bf",
    size: "small",
    image: "/assets/qvault.jpeg",
  },
  {
    id: "solana",
    icon: Zap,
    title: "Solana Native",
    description: "Works with every dApp, DEX, and protocol on Solana.",
    accent: "#14b8a6",
    size: "medium",
    image: "/assets/features.jpeg",
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Multi-Platform",
    description: "Browser, mobile, and CLI — sign from anywhere.",
    accent: "#00ffd5",
    size: "small",
    image: "/assets/mobie-dispaly.jpeg",
  },
  {
    id: "minimal",
    icon: Layers,
    title: "Minimal Footprint",
    description: "Spending stays offchain. Only coordination state goes on-chain.",
    accent: "#2dd4bf",
    size: "medium",
  },
];

function BentoCard({
  item,
  index,
}: {
  item: (typeof bentoItems)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      const glow = glowRef.current;
      if (!card || !glow) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      glow.style.background = `radial-gradient(350px circle at ${x}px ${y}px, ${item.accent}12, transparent 60%)`;

      // Subtle tilt effect
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
    },
    [item.accent]
  );

  const handleMouseLeave = useCallback(() => {
    if (glowRef.current) glowRef.current.style.background = "transparent";
    if (cardRef.current) cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
  }, []);

  const isLarge = item.size === "large";
  const isMedium = item.size === "medium";

  return (
    <div
      ref={cardRef}
      data-bento={index}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative glass-card rounded-2xl overflow-hidden transition-transform duration-300 ease-out opacity-0 translate-y-[40px] ${
        isLarge
          ? "md:col-span-2 md:row-span-2 min-h-[360px]"
          : isMedium
          ? "md:col-span-2 min-h-[200px]"
          : "min-h-[200px]"
      }`}
    >
      {/* Mouse glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-2xl pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Image background for cards with images */}
      {item.image && (
        <div className="absolute inset-0">
          <Image
            src={item.image}
            alt=""
            fill
            className="object-cover opacity-50 group-hover:opacity-65 transition-opacity duration-700"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d14] via-[#0c0d14]/40 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className={`relative z-20 flex flex-col justify-end h-full ${isLarge ? "p-10" : "p-7"}`}>
        <div
          className={`inline-flex items-center justify-center rounded-xl border mb-4 transition-transform duration-500 group-hover:scale-110 ${isLarge ? "w-14 h-14" : "w-11 h-11"}`}
          style={{
            borderColor: `${item.accent}15`,
            backgroundColor: `${item.accent}08`,
          }}
        >
          <item.icon
            className={isLarge ? "w-6 h-6" : "w-5 h-5"}
            style={{ color: item.accent }}
            strokeWidth={1.5}
          />
        </div>

        <h3
          className={`font-[family-name:var(--font-space-grotesk)] font-semibold mb-2 ${
            isLarge ? "text-2xl" : "text-lg"
          }`}
        >
          {item.title}
        </h3>

        <p className={`text-muted leading-relaxed ${isLarge ? "text-base max-w-md" : "text-sm"}`}>
          {item.description}
        </p>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `linear-gradient(90deg, transparent, ${item.accent}40, transparent)`,
          }}
        />
      </div>
    </div>
  );
}

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = sectionRef.current?.querySelectorAll("[data-bento]") as NodeListOf<HTMLElement> | undefined;

    if (prefersReduced) {
      if (headingRef.current) headingRef.current.style.opacity = "1";
      cards?.forEach((c) => { c.style.opacity = "1"; c.style.transform = "none"; });
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

      if (cards && cards.length > 0) {
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cards[0],
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="features" className="relative py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.03)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div ref={headingRef} className="text-center mb-16 opacity-0 translate-y-12">
          <span className="inline-block text-teal text-xs font-mono tracking-widest uppercase mb-4">
            Everything in one place
          </span>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Best features.
            <br />
            <span className="text-muted">One vault.</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Row 1: Large (2x2) + 2 small stacked */}
          <BentoCard item={bentoItems[0]} index={0} />
          <BentoCard item={bentoItems[1]} index={1} />
          <BentoCard item={bentoItems[2]} index={2} />

          {/* Row 2: Medium (2-wide) + Medium (2-wide) */}
          <BentoCard item={bentoItems[3]} index={3} />
          <BentoCard item={bentoItems[4]} index={4} />
          <BentoCard item={bentoItems[5]} index={5} />
        </div>
      </div>
    </section>
  );
}
