"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ArrowRight, Github } from "lucide-react";
import dynamic from "next/dynamic";

const WaveBackground = dynamic(() => import("./WaveBackground"), { ssr: false });

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(headingRef.current, { y: 50, opacity: 0, duration: 1 })
        .from(subRef.current, { y: 25, opacity: 0, duration: 0.7 }, "-=0.5")
        .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(imageRef.current, { y: 40, opacity: 0, scale: 0.95, duration: 1 }, "-=0.6");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-24"
    >
      {/* Wave background */}
      <WaveBackground />

      {/* Soft ambient glow */}
      <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-teal/20 bg-teal/[0.06] px-5 py-2 mb-10 backdrop-blur-sm">
              <div className="relative w-2 h-2">
                <div className="absolute inset-0 rounded-full bg-teal animate-ping opacity-75" />
                <div className="relative w-2 h-2 rounded-full bg-teal" />
              </div>
              <span className="text-xs font-semibold text-teal tracking-widest uppercase">
                Built on Solana
              </span>
            </div>

            <h1
              ref={headingRef}
              className="font-[family-name:var(--font-space-grotesk)] text-5xl sm:text-6xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.05]"
            >
              The safest
              <br />
              <span className="bg-gradient-to-r from-teal via-teal-bright to-neon bg-clip-text text-transparent">
                Solana wallet.
              </span>
            </h1>

            <p
              ref={subRef}
              className="mt-8 text-lg sm:text-xl text-muted leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Your keys live on multiple devices. Even if one is lost
              or stolen, your funds stay completely safe.
            </p>

            <div
              ref={ctaRef}
              className="mt-12 flex flex-col sm:flex-row items-center gap-4 lg:justify-start justify-center"
            >
              <a
                href="#get-started"
                className="group relative flex items-center gap-2.5 rounded-full bg-gradient-to-r from-teal to-teal-bright px-8 py-4 text-sm font-bold text-black shadow-[0_0_30px_rgba(20,184,166,0.3)] hover:shadow-[0_0_50px_rgba(20,184,166,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
              >
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
              <a
                href="https://github.com/Naveen-6087/vaulkyrie"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 rounded-full border border-white/10 px-8 py-4 text-sm font-medium text-foreground hover:bg-white/[0.06] hover:border-white/20 backdrop-blur-sm transition-colors duration-200"
              >
                <Github className="w-4 h-4 text-muted group-hover:text-foreground transition-colors" />
                View Source
              </a>
            </div>
          </div>

          {/* Right: Product Image — transparent PNG, no border/shadow/overlay */}
          <div ref={imageRef} className="flex-1 max-w-xl w-full">
            <Image
              src="/assets/hero-device.png"
              alt="Vaulkyrie multi-device wallet"
              width={640}
              height={520}
              className="w-full h-auto object-contain"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#040406] via-[#040406]/50 to-transparent" />
    </section>
  );
}
