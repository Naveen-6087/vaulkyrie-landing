"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ShieldCheck,
  KeyRound,
  Fingerprint,
  Clock,
  Ban,
  ServerCrash,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const securityFeatures = [
  {
    icon: KeyRound,
    title: "No Key Reconstruction",
    description: "Your full key never exists on any single device — ever.",
    accent: "#14b8a6",
  },
  {
    icon: ShieldCheck,
    title: "Tamper-Proof Receipts",
    description: "Every approval is tied to a specific action and expires automatically.",
    accent: "#00ffd5",
  },
  {
    icon: Fingerprint,
    title: "One-Time Admin Keys",
    description: "Admin signatures are used exactly once. Reuse is impossible by design.",
    accent: "#2dd4bf",
  },
  {
    icon: Clock,
    title: "Time-Bound Sessions",
    description: "All signing sessions have an expiry window. No stale approvals.",
    accent: "#14b8a6",
  },
  {
    icon: Ban,
    title: "Nothing Sensitive Onchain",
    description: "No keys, no shares, no policy details stored on the blockchain.",
    accent: "#00ffd5",
  },
  {
    icon: ServerCrash,
    title: "Lose a Device, Keep Your Funds",
    description: "Built-in recovery means one lost device never compromises the vault.",
    accent: "#2dd4bf",
  },
];

export default function Security() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = sectionRef.current?.querySelectorAll("[data-security-card]") as NodeListOf<HTMLElement> | undefined;

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

      // Horizontal scroll effect: cards slide sideways on vertical scroll
      if (scrollContainerRef.current && cards && cards.length > 0) {
        const totalScroll = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;

        gsap.to(scrollContainerRef.current, {
          scrollLeft: totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 30%",
            end: "bottom 70%",
            scrub: 1,
          },
        });

        // Stagger cards fading in
        cards.forEach((card, i) => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 0.8,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="security" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.03)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div ref={headingRef} className="text-center mb-16 opacity-0 translate-y-12">
          <span className="inline-block text-teal text-xs font-mono tracking-widest uppercase mb-4">
            Security
          </span>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Controlled by you.
            <br />
            <span className="text-muted">Protected by design.</span>
          </h2>
        </div>

        {/* Horizontal scrolling cards */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {securityFeatures.map((feature, i) => (
            <div
              key={feature.title}
              data-security-card={i}
              className="group relative glass-card rounded-2xl p-7 min-w-[300px] max-w-[320px] flex-shrink-0 opacity-0 translate-y-[30px]"
              style={{ perspective: "800px" }}
            >
              {/* Glass stack effect */}
              <div
                className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                style={{
                  background: `linear-gradient(135deg, ${feature.accent}08, transparent)`,
                  transform: "translateZ(-10px) scale(1.02)",
                }}
              />

              <feature.icon
                className="w-6 h-6 mb-5 transition-transform duration-500 group-hover:scale-110"
                style={{ color: feature.accent }}
                strokeWidth={1.5}
              />

              <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold mb-3">
                {feature.title}
              </h3>

              <p className="text-sm text-muted leading-relaxed">
                {feature.description}
              </p>

              {/* Bottom accent */}
              <div
                className="absolute bottom-0 left-4 right-4 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(90deg, transparent, ${feature.accent}30, transparent)`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Visual proof section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative rounded-2xl overflow-hidden gradient-border h-[300px]">
            <Image
              src="/assets/shardkey.jpeg"
              alt="Key shards visualization"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040406] via-[#040406]/50 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold">Your keys, split safely.</p>
              <p className="text-sm text-muted mt-1">No single device holds the full key.</p>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden gradient-border h-[300px]">
            <Image
              src="/assets/vault-device.jpeg"
              alt="Multi-device vault setup"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040406] via-[#040406]/50 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold">Multi-device security.</p>
              <p className="text-sm text-muted mt-1">Approve from any combination of your devices.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
