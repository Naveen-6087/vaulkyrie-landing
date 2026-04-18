"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "2-of-3", label: "Threshold Signing", suffix: "" },
  { value: "256", label: "Bit Security", suffix: "-bit" },
  { value: "0", label: "Onchain Secrets", suffix: "" },
  { value: "100", label: "Solana Compatible", suffix: "%" },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      itemsRef.current.forEach((item) => { if (item) item.style.opacity = "1"; });
      return;
    }

    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        gsap.to(item, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.03)_0%,transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              ref={(el) => { if (el) itemsRef.current[i] = el; }}
              className="text-center group opacity-0 translate-y-[30px]"
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-space-grotesk)] bg-gradient-to-b from-white via-white to-[#94a3b8] bg-clip-text text-transparent tracking-tight">
                {stat.value}
                {stat.suffix && <span className="text-teal">{stat.suffix}</span>}
              </div>
              <div className="mt-3 text-sm text-muted font-medium uppercase tracking-wider">
                {stat.label}
              </div>
              <div className="mt-4 mx-auto w-8 h-px bg-gradient-to-r from-transparent via-teal/40 to-transparent group-hover:via-teal/80 transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
