"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Terminal } from "lucide-react";
import dynamic from "next/dynamic";

const WaveBackground = dynamic(() => import("./WaveBackground"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      const headingLines = headingRef.current?.querySelectorAll("[data-hero-line]");

      tl.from(headingLines ?? [], {
        y: 48,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
      })
        .from(subRef.current, { y: 20, opacity: 0, duration: 0.7 }, "-=0.72")
        .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.6 }, "-=0.58")
        .from(
          imageRef.current,
          {
            opacity: 0,
            scale: 0.94,
            y: 40,
            duration: 1.2,
            ease: "expo.out",
          },
          "-=0.82",
        );

      gsap.to(imageRef.current, {
        yPercent: 12,
        scale: 1.04,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(headingLines ?? [], {
        yPercent: -12,
        ease: "none",
        stagger: 0.04,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[92svh] flex-col items-center justify-center overflow-hidden pt-28 pb-20"
    >
      <WaveBackground />
      <div className="pointer-events-none absolute inset-x-0 top-[18%] h-[38rem] bg-[radial-gradient(circle_at_center,rgba(0,255,213,0.08),transparent_58%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(420px,540px)] lg:gap-20">
          <div className="max-w-2xl flex-1 text-center lg:text-left">
            <h1
              ref={headingRef}
              className="brand-display relative mb-6 text-4xl font-black leading-[0.94] text-white sm:text-6xl lg:text-[5.2rem]"
            >
              <span data-hero-line className="block text-white">
                Shared when needed.
              </span>
              <span data-hero-line className="mt-2 block text-white/84">
                Private when it matters.
              </span>
            </h1>

            <p
              ref={subRef}
              className="max-w-xl text-base font-medium leading-relaxed text-text-secondary sm:text-lg"
            >
              Threshold security for everyday use, with a post-quantum control path for recovery and high-risk wallet authority.
            </p>

            <div
              ref={ctaRef}
              className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
            >
              <a
                href="#vault-models"
                className="group flex w-full items-center justify-center gap-3 rounded-full bg-neon px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-black transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-95 sm:w-auto"
              >
                Explore modes
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#how-it-works"
                className="group flex w-full items-center justify-center gap-3 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] transition-all hover:border-neon/50 hover:bg-neon/5 active:scale-95 sm:w-auto"
              >
                <Terminal className="w-4 h-4 text-neon group-hover:animate-pulse" />
                See how it works
              </a>
            </div>
          </div>

          <div ref={imageRef} className="relative mx-auto w-full max-w-[34rem] will-change-transform">
            <Image
              src="/assets/hero-device.png"
              alt="Vaulkyrie wallet interface"
              width={700}
              height={600}
              className="h-auto w-full object-contain drop-shadow-[0_40px_100px_rgba(0,0,0,0.72)]"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
