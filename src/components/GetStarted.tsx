"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Github, Globe, Monitor, Smartphone, Terminal } from "lucide-react";
import { SecurePortalDiagram } from "./MinimalDiagrams";

gsap.registerPlugin(ScrollTrigger);

const platforms = [
  {
    icon: Monitor,
    title: "Browser Extension",
    description: "Keep Vaulkyrie close to the apps you already use.",
    status: "Coming Soon",
    accent: "#00ffd5",
  },
  {
    icon: Smartphone,
    title: "Mobile App",
    description: "Approve with the device that already lives in your hand.",
    status: "Coming Soon",
    accent: "#14b8a6",
  },
  {
    icon: Terminal,
    title: "CLI Tool",
    description: "For the builders and operators who want a direct path.",
    status: "Coming Soon",
    accent: "#dffef3",
  },
  {
    icon: Globe,
    title: "Web Dashboard",
    description: "Watch the wallet, the stronghold, and the moving parts in one place.",
    status: "Coming Soon",
    accent: "#00ffd5",
  },
] as const;

export default function GetStarted() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const calloutRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll("[data-platform]") as NodeListOf<HTMLElement> | undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
          },
        },
      );

      if (cards?.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 86%",
            },
          },
        );
      }

      if (portalRef.current) {
        const portalTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: portalRef.current,
            start: "top 82%",
          },
        });

        portalTimeline
          .from(portalRef.current.querySelector('[data-portal-piece="rings"]'), {
            opacity: 0,
            scale: 0.72,
            rotation: -22,
            duration: 0.55,
            transformOrigin: "50% 50%",
            ease: "power3.out",
          })
          .from(portalRef.current.querySelector('[data-portal-piece="axes"]'), {
            opacity: 0,
            scaleY: 0.7,
            duration: 0.35,
            transformOrigin: "50% 50%",
            ease: "power2.out",
          }, "-=0.28")
          .from(portalRef.current.querySelector('[data-portal-piece="core"]'), {
            opacity: 0,
            scale: 0.5,
            duration: 0.4,
            transformOrigin: "50% 50%",
            ease: "back.out(1.8)",
          }, "-=0.22");
      }

      gsap.fromTo(
        calloutRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: calloutRef.current,
            start: "top 88%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="get-started" className="relative overflow-hidden py-32">
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[560px] w-[900px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.04)_0%,transparent_62%)]" />

      <div ref={portalRef} className="absolute left-1/2 top-1/2 z-[1] h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 opacity-70">
        <SecurePortalDiagram className="h-full w-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div ref={headingRef} className="mb-16 text-center">
          <span className="technical-label mb-4 inline-block text-neon">Use it anywhere</span>
          <h2 className="brand-display text-4xl font-bold sm:text-5xl lg:text-6xl">
            Pick your surface.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-text-secondary">
            Browser, mobile, CLI, or dashboard. Same wallet. Same hold.
          </p>
        </div>

        <div ref={cardsRef} className="mb-20 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {platforms.map((platform, index) => (
            <article
              key={platform.title}
              data-platform={index}
              className="rounded-[1.8rem] border border-white/[0.06] bg-[#090b10]/78 p-7 backdrop-blur-xl"
            >
              <div
                className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border"
                style={{
                  backgroundColor: `${platform.accent}08`,
                  borderColor: `${platform.accent}22`,
                }}
              >
                <platform.icon className="h-6 w-6" style={{ color: platform.accent }} strokeWidth={1.5} />
              </div>

              <h3 className="mb-2 text-lg font-semibold text-white">{platform.title}</h3>
              <p className="mb-5 text-sm leading-relaxed text-text-secondary">{platform.description}</p>

              <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs text-[#64748b]">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400/80 shadow-[0_0_4px_rgba(251,191,36,0.4)]" />
                {platform.status}
              </span>
            </article>
          ))}
        </div>

        <div
          ref={calloutRef}
          className="rounded-[2rem] border border-white/[0.06] bg-[#080a0f]/84 p-8 backdrop-blur-xl lg:flex lg:items-center lg:justify-between lg:gap-8"
        >
          <div>
            <span className="technical-label text-neon">Built in the open</span>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary">
              The wallet, the docs, and the on-chain work are all moving in public. Follow the build and the releases as Vaulkyrie takes shape.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0">
            <a
              href="https://github.com/Naveen-6087/vaulkyrie"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-neon px-8 py-4 text-sm font-black uppercase tracking-[0.16em] text-black transition-all hover:bg-white"
            >
              <Github className="h-5 w-5" />
              View GitHub
            </a>
            <a
              href="https://github.com/Naveen-6087/vaulkyrie"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/[0.1] bg-white/[0.03] px-8 py-4 text-sm font-black uppercase tracking-[0.16em] text-white transition-all hover:border-neon/30 hover:text-neon"
            >
              Read Docs
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
