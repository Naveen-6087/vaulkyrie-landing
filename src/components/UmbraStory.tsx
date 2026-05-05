"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    id: "lane",
    label: "Private lane",
    title: "Threshold custody stays separate.",
    body: "Umbra gets its own local signer and its own recovery phrase, so the quiet rail can move without dragging the threshold path with it.",
    kicker: "own signer / own recovery / quiet rail",
  },
  {
    id: "eta",
    label: "Shielded pool",
    title: "Balances can leave the public map.",
    body: "Public SPL balances can be shielded into encrypted Umbra accounts, so the amount no longer sits in the open ATA view.",
    kicker: "public ata / shielded pool / eta",
  },
  {
    id: "notes",
    label: "Private notes",
    title: "Notes move. The inbox claims.",
    body: "Receiver-claimable notes move through Umbra, then the inbox scans and claims them back into encrypted balance without exposing a straight path.",
    kicker: "utxo note / inbox scan / quiet claim",
  },
] as const;

type SlideKind = (typeof slides)[number]["id"];

function UmbraVisual({ kind, className = "" }: { kind: SlideKind; className?: string }) {
  const strokeMain = "rgba(0,255,213,0.82)";
  const strokeSoft = "rgba(255,255,255,0.22)";
  const strokeDim = "rgba(20,184,166,0.18)";

  return (
    <svg
      className={`h-full w-full ${className}`}
      viewBox="0 0 900 520"
      fill="none"
      role="img"
      aria-label={`Umbra ${kind} visual`}
    >
      {kind === "lane" ? (
        <>
          <g data-privacy-piece>
            <circle cx="132" cy="268" r="56" stroke="rgba(223,254,243,0.56)" strokeWidth="2.2" />
            {[
              [132, 214],
              [176, 292],
              [88, 292],
            ].map(([x, y]) => (
              <g key={`${x}-${y}`}>
                <circle cx={x} cy={y} r="18" stroke="rgba(255,255,255,0.16)" strokeWidth="1.8" />
                <circle cx={x} cy={y} r="6" fill="rgba(0,255,213,0.74)" />
              </g>
            ))}
            <path d="M132 214 132 268 88 292" stroke={strokeSoft} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M132 214 132 268 176 292" stroke={strokeMain} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <circle className="svg-node-pulse" cx="132" cy="268" r="14" fill="rgba(0,255,213,0.66)" />
            <path className="svg-dash-flow" d="M188 268H258" stroke={strokeMain} strokeWidth="2.4" strokeLinecap="round" />
          </g>

          <g data-privacy-piece>
            <path d="M314 176V360" stroke="rgba(255,255,255,0.08)" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M352 176V360" stroke="rgba(255,255,255,0.08)" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M296 268H372" stroke="rgba(255,255,255,0.12)" strokeWidth="2.4" strokeLinecap="round" />
            <circle cx="514" cy="268" r="112" stroke={strokeMain} strokeWidth="2.6" />
            <circle cx="514" cy="268" r="74" stroke="rgba(255,255,255,0.16)" strokeWidth="2.2" />
            <path d="M454 228C474 202 554 202 574 228" stroke={strokeSoft} strokeWidth="2.4" strokeLinecap="round" />
            <path d="M452 308C476 334 552 334 576 308" stroke={strokeMain} strokeWidth="2.4" strokeLinecap="round" />
            <path d="M386 268H402" stroke={strokeMain} strokeWidth="2.4" strokeLinecap="round" />
            <path d="M626 268H690" stroke={strokeMain} strokeWidth="2.4" strokeLinecap="round" />
            <circle className="svg-node-pulse" cx="514" cy="268" r="18" fill="rgba(0,255,213,0.7)" />
            <circle className="svg-orbit" cx="514" cy="268" r="158" stroke={strokeDim} strokeWidth="1.8" strokeDasharray="24 24" />
          </g>

          <g data-privacy-piece>
            <circle cx="776" cy="268" r="76" stroke={strokeMain} strokeWidth="2.4" />
            <path d="M730 224H820" stroke={strokeSoft} strokeWidth="2.4" strokeLinecap="round" />
            <path d="M722 268H828" stroke={strokeMain} strokeWidth="2.6" strokeLinecap="round" />
            <path d="M738 312H812" stroke={strokeSoft} strokeWidth="2.4" strokeLinecap="round" />
            <circle className="svg-orbit svg-orbit-reverse" cx="776" cy="268" r="150" stroke={strokeDim} strokeWidth="1.8" strokeDasharray="22 24" />
          </g>
        </>
      ) : null}

      {kind === "eta" ? (
        <>
          <g data-privacy-piece>
            <rect x="68" y="194" width="116" height="22" rx="11" stroke="rgba(255,255,255,0.22)" strokeWidth="2" />
            <rect x="48" y="254" width="156" height="26" rx="13" stroke="rgba(0,255,213,0.34)" strokeWidth="2.2" />
            <rect x="82" y="318" width="102" height="20" rx="10" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
            {[94, 124, 154].map((x) => (
              <circle key={x} cx={x} cy="267" r="7" fill="rgba(0,255,213,0.7)" />
            ))}
            <path className="svg-dash-flow" d="M212 268H280" stroke={strokeMain} strokeWidth="2.4" strokeLinecap="round" strokeDasharray="22 18" />
          </g>

          <g data-privacy-piece>
            <circle cx="470" cy="268" r="138" stroke={strokeMain} strokeWidth="2.8" />
            <circle cx="470" cy="268" r="98" stroke="rgba(255,255,255,0.16)" strokeWidth="2.2" />
            <circle className="svg-node-pulse" cx="470" cy="268" r="18" fill="rgba(0,255,213,0.68)" />
            <path d="M408 230C430 202 510 202 534 230" stroke={strokeSoft} strokeWidth="2.4" strokeLinecap="round" />
            <path d="M406 306C432 334 510 334 536 306" stroke={strokeMain} strokeWidth="2.4" strokeLinecap="round" />
            <path className="svg-dash-flow" d="M304 268H332" stroke={strokeMain} strokeWidth="2.4" strokeLinecap="round" strokeDasharray="22 18" />
            <path className="svg-dash-flow svg-dash-flow-delayed" d="M608 268H660" stroke={strokeMain} strokeWidth="2.4" strokeLinecap="round" strokeDasharray="22 18" />
          </g>

          <g data-privacy-piece>
            <rect x="714" y="212" width="128" height="28" rx="14" stroke={strokeSoft} strokeWidth="2.2" />
            <rect x="694" y="254" width="168" height="34" rx="17" stroke={strokeMain} strokeWidth="2.4" />
            <rect x="722" y="308" width="112" height="24" rx="12" stroke={strokeSoft} strokeWidth="2.2" />
            {[740, 776, 812].map((x) => (
              <circle key={x} cx={x} cy="271" r="8" fill="rgba(0,255,213,0.72)" />
            ))}
          </g>
        </>
      ) : null}

      {kind === "notes" ? (
        <>
          <g data-privacy-piece>
            <circle cx="116" cy="268" r="54" stroke="rgba(223,254,243,0.56)" strokeWidth="2.2" />
            <circle cx="116" cy="268" r="16" fill="rgba(0,255,213,0.66)" />
            <path className="svg-dash-flow" d="M170 268H244" stroke={strokeMain} strokeWidth="2.4" strokeLinecap="round" strokeDasharray="22 18" />
          </g>

          <g data-privacy-piece>
            {[
              [322, 178],
              [408, 228],
              [494, 268],
              [408, 308],
              [322, 358],
            ].map(([x, y], index) => (
              <g key={`${x}-${y}`}>
                <circle className={index === 2 ? "svg-node-pulse" : ""} cx={x} cy={y} r={index === 2 ? "14" : "9"} fill={index === 2 ? "rgba(0,255,213,0.72)" : "rgba(20,184,166,0.16)"} />
                <circle cx={x} cy={y} r={index === 2 ? "44" : "28"} stroke="rgba(0,255,213,0.14)" strokeWidth="1.4" />
              </g>
            ))}
            <path d="M322 178 408 228 494 268 408 308 322 358" stroke="rgba(255,255,255,0.22)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M322 178V358" stroke={strokeDim} strokeWidth="1.6" strokeLinecap="round" />
            <path className="svg-dash-flow" d="M244 268H286" stroke={strokeMain} strokeWidth="2.4" strokeLinecap="round" strokeDasharray="22 18" />
            <path className="svg-dash-flow svg-dash-flow-delayed" d="M534 268H612" stroke={strokeMain} strokeWidth="2.4" strokeLinecap="round" strokeDasharray="22 18" />
          </g>

          <g data-privacy-piece>
            <circle cx="770" cy="268" r="74" stroke={strokeMain} strokeWidth="2.4" />
            <path d="M724 220H816" stroke={strokeSoft} strokeWidth="2.4" strokeLinecap="round" />
            <path d="M718 268H822" stroke={strokeMain} strokeWidth="2.6" strokeLinecap="round" />
            <path d="M732 316H808" stroke={strokeSoft} strokeWidth="2.4" strokeLinecap="round" />
            <circle className="svg-orbit svg-orbit-reverse" cx="770" cy="268" r="146" stroke={strokeDim} strokeWidth="1.8" strokeDasharray="22 26" />
          </g>
        </>
      ) : null}
    </svg>
  );
}

export default function UmbraStory() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<Record<SlideKind, HTMLElement | null>>({
    lane: null,
    eta: null,
    notes: null,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const nextIndex = progress < 0.34 ? 0 : progress < 0.68 ? 1 : 2;

            if (nextIndex !== activeIndexRef.current) {
              activeIndexRef.current = nextIndex;
              setActiveIndex(nextIndex);
            }
          },
        },
      });

      tl.fromTo(trackRef.current, { xPercent: 0 }, { xPercent: -66.666, duration: 1 }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    slides.forEach((slide, index) => {
      const node = slideRefs.current[slide.id];
      if (!node) return;

      const copy = node.querySelector("[data-privacy-copy]");
      const visual = node.querySelector("[data-privacy-visual]");
      const pieces = node.querySelectorAll("[data-privacy-piece]");

      if (index === activeIndex) {
        gsap.fromTo(
          [copy, visual],
          { autoAlpha: 0.7, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.34, ease: "power2.out", overwrite: true },
        );
        gsap.fromTo(
          pieces,
          { opacity: 0, y: 16, filter: "blur(6px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.42, stagger: 0.05, ease: "power2.out", overwrite: true },
        );
        return;
      }

      gsap.to([copy, visual], {
        autoAlpha: 0.58,
        y: 0,
        duration: 0.22,
        ease: "power2.out",
        overwrite: true,
      });
    });
  }, [activeIndex]);

  return (
    <section ref={sectionRef} id="privacy" className="relative min-h-[360vh] bg-bg-abyss">
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        <div ref={trackRef} className="flex h-full w-[300vw] will-change-transform">
          {slides.map((slide) => (
            <article
              key={slide.id}
              ref={(node) => {
                slideRefs.current[slide.id] = node;
              }}
              data-privacy-slide
              className="relative h-full w-screen shrink-0 px-5 py-16 sm:px-8 sm:py-20 lg:px-[6vw] lg:py-[10vh]"
            >
              <div className="mx-auto flex h-full max-w-[1320px] flex-col gap-10 lg:relative lg:block">
                <div
                  data-privacy-copy
                  className="max-w-[18rem] sm:max-w-[22rem] lg:absolute lg:left-0 lg:top-[9vh] lg:w-[min(38rem,36vw)] lg:max-w-none"
                >
                  <span className="technical-label text-neon">{slide.label}</span>
                  <h2 className="mt-3 brand-display text-[2.35rem] font-black uppercase leading-[0.92] text-white sm:text-[2.85rem] lg:max-w-[30rem] lg:text-[3.35rem]">
                    {slide.title}
                  </h2>
                  <p className="mt-4 max-w-[28rem] text-sm leading-relaxed text-text-secondary sm:text-base lg:text-[0.98rem]">
                    {slide.body}
                  </p>
                  <p className="mt-5 text-[0.68rem] uppercase tracking-[0.18em] text-white/42 sm:text-xs">
                    {slide.kicker}
                  </p>
                </div>

                <div
                  data-privacy-visual
                  className="mt-auto w-full lg:absolute lg:bottom-[8vh] lg:right-0 lg:w-[min(42rem,44vw)]"
                >
                  <UmbraVisual kind={slide.id} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
