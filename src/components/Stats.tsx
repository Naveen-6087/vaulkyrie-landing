"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "M-OF-N", label: "distributed signing" },
  { value: "UMBRA", label: "private transfers" },
  { value: "WOTS+", label: "recovery path" },
  { value: "READY", label: "solana apps" },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        gsap.fromTo(item, 
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: i * 0.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: item,
              start: "top 95%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
      <section ref={sectionRef} className="relative overflow-hidden border-y border-white/5 bg-bg-abyss py-18 lg:py-24">
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-4 divide-x-0 md:divide-x divide-white/5">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              ref={(el) => { if (el) itemsRef.current[i] = el; }}
              className="text-center group"
            >
              <div className="brand-display mb-3 text-3xl font-black uppercase text-white sm:text-4xl lg:text-5xl">
                {stat.value}
              </div>
              <div className="technical-label tracking-[0.22em] text-neon/40 transition-colors group-hover:text-neon">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
