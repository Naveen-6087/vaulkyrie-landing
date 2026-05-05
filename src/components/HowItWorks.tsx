"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Plus, Send, Shield, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";

const PhotonRays = dynamic(() => import("./PhotonRays"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const workflow = [
  {
    num: "01",
    title: "Pair",
    description: "Choose the devices that will hold the wallet.",
    icon: Plus,
    tag: "SETUP",
  },
  {
    num: "02",
    title: "Choose",
    description: "Pick Shared, Veil, or Stronghold for the job.",
    icon: Shield,
    tag: "MODE",
  },
  {
    num: "03",
    title: "Approve",
    description: "The right devices agree on the move.",
    icon: Sparkles,
    tag: "APPROVAL",
  },
  {
    num: "04",
    title: "Send",
    description: "The wallet settles like a familiar Solana flow.",
    icon: Send,
    tag: "SEND",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current?.querySelectorAll("[data-line]") ?? [], {
        opacity: 0,
        y: 42,
        stagger: 0.12,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 84%",
        },
      });

      gsap.fromTo(".workflow-item", {
        opacity: 0,
        y: 56,
        rotateX: -10,
      }, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.12,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".workflow-container",
          start: "top 82%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="how-it-works" className="relative bg-bg-abyss py-24 lg:py-40">
      <div className="pointer-events-none absolute inset-0 opacity-75" aria-hidden="true">
        <PhotonRays rayCount={240} orbCount={28} brightness={1.4} speedBoost={1.25} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(2,2,4,0.06)_0%,rgba(2,2,4,0.84)_68%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div ref={headingRef} className="mb-20">
          <span className="technical-label mb-4 inline-block text-neon">How it works</span>
          <h2 className="brand-display text-4xl font-black uppercase lg:text-7xl">
            <span data-line className="block">
              Set up.
            </span>
            <br />
            <span data-line className="block">
              Approve. Send.
            </span>
          </h2>
        </div>

        <div className="workflow-container grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {workflow.map((item, index) => (
            <div key={item.num} className="workflow-item group relative rounded-[1.6rem] border border-white/[0.06] bg-[#080a0f]/75 p-6">
              <div className="mb-8 flex items-center gap-4">
                <div className="text-4xl font-black text-white/12 transition-colors duration-500 group-hover:text-neon">
                  {item.num}
                </div>
                <div className="h-px flex-1 bg-white/10 group-hover:bg-neon/28 transition-colors" />
              </div>

              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] group-hover:border-neon/36 group-hover:bg-neon/[0.06]">
                <item.icon className="h-5 w-5 text-white group-hover:text-neon" strokeWidth={1.5} />
              </div>

              <h3 className="mb-3 text-xl font-bold text-white">{item.title}</h3>
              <p className="mb-5 text-sm font-medium leading-relaxed text-text-secondary">{item.description}</p>
              <span className="technical-label inline-block rounded-full border border-white/10 px-3 py-1 text-text-muted group-hover:border-neon/30 group-hover:text-neon">
                {item.tag}
              </span>

              {index < workflow.length - 1 && (
                <div className="absolute -right-4 top-16 hidden h-px w-8 bg-white/6 lg:block" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-24 rounded-[2rem] border border-white/[0.06] bg-[#080a0f]/82 p-8 lg:flex lg:items-center lg:justify-between lg:gap-8">
          <div>
            <span className="technical-label text-neon">Want the build notes?</span>
            <p className="mt-3 max-w-2xl text-sm text-text-secondary">
              The repo stays open, and the docs follow the wallet, the programs, and the path to production.
            </p>
          </div>
          <a
            href="https://github.com/Naveen-6087/vaulkyrie"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-3 rounded-full bg-neon px-8 py-4 text-xs font-black uppercase tracking-[0.16em] text-black transition-all hover:bg-white lg:mt-0"
          >
            View the docs
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
