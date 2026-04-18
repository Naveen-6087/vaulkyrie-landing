"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, Scan, PenTool, Send } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    icon: Plus,
    title: "Create Your Vault",
    description: "Choose how many devices you need to approve transactions.",
    visual: "2 of 3",
    visualLabel: "devices required",
    accent: "#14b8a6",
  },
  {
    num: "02",
    icon: Scan,
    title: "Set Your Rules",
    description: "Define spending limits and approval policies — privately.",
    visual: "Private",
    visualLabel: "policy engine",
    accent: "#00ffd5",
  },
  {
    num: "03",
    icon: PenTool,
    title: "Sign Together",
    description: "Approve transactions from your devices. Fast and seamless.",
    visual: "< 2s",
    visualLabel: "signing time",
    accent: "#2dd4bf",
  },
  {
    num: "04",
    icon: Send,
    title: "Done",
    description: "Your transaction lands on Solana. No extra steps needed.",
    visual: "100%",
    visualLabel: "compatible",
    accent: "#14b8a6",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = sectionRef.current?.querySelectorAll("[data-step]") as NodeListOf<HTMLElement> | undefined;

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

      if (cards) {
        cards.forEach((card, i) => {
          // Each card scales up and fades in as you scroll
          gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: i * 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          });

          // Animate the visual number inside each card
          const visual = card.querySelector("[data-visual]");
          if (visual) {
            gsap.to(visual, {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              delay: 0.3 + i * 0.05,
              ease: "back.out(1.5)",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            });
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="how-it-works" className="relative py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.03)_0%,transparent_50%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div ref={headingRef} className="text-center mb-20 opacity-0 translate-y-12">
          <span className="inline-block text-teal text-xs font-mono tracking-widest uppercase mb-4">
            How It Works
          </span>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Simple to use.
            <br />
            <span className="text-muted">Hard to break.</span>
          </h2>
        </div>

        {/* Cards grid - no timeline, just clean cards */}
        <div ref={cardsContainerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <div
              key={step.num}
              data-step={i}
              className="group relative glass-card rounded-2xl p-7 flex flex-col items-center text-center opacity-0 translate-y-[30px] scale-[0.95]"
            >
              {/* Step number watermark */}
              <span
                className="absolute top-4 right-5 text-5xl font-bold font-mono opacity-[0.04] select-none"
                aria-hidden="true"
              >
                {step.num}
              </span>

              {/* Visual metric */}
              <div
                data-visual
                className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center mb-6 opacity-0 scale-[0.5]"
                style={{
                  background: `linear-gradient(135deg, ${step.accent}15, ${step.accent}05)`,
                  border: `1px solid ${step.accent}20`,
                }}
              >
                <span
                  className="text-xl font-bold font-[family-name:var(--font-space-grotesk)]"
                  style={{ color: step.accent }}
                >
                  {step.visual}
                </span>
                <span className="text-[9px] text-muted uppercase tracking-wider mt-0.5">
                  {step.visualLabel}
                </span>
              </div>

              {/* Icon */}
              <div
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                style={{
                  backgroundColor: `${step.accent}08`,
                  border: `1px solid ${step.accent}15`,
                }}
              >
                <step.icon className="w-5 h-5" style={{ color: step.accent }} strokeWidth={1.5} />
              </div>

              <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold mb-2">
                {step.title}
              </h3>

              <p className="text-sm text-muted leading-relaxed">
                {step.description}
              </p>

              {/* Connecting arrow (not on last card) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-30">
                  <div className="w-6 h-[1px] bg-gradient-to-r from-white/10 to-white/5" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
