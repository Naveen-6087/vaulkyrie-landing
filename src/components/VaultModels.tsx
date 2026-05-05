"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WalletModeDiagram } from "./MinimalDiagrams";

gsap.registerPlugin(ScrollTrigger);

const models = [
  {
    id: "shared",
    title: "Shared",
    line: "Routine spend stays on the FROST lane.",
    detail: "m-of-n approval across the devices already holding the wallet.",
    accent: "#00ffd5",
  },
  {
    id: "veiled",
    title: "Veil",
    line: "Private movement stays on the Umbra lane.",
    detail: "shield, move, and claim without pulling the whole wallet into a new flow.",
    accent: "#14b8a6",
  },
  {
    id: "sealed",
    title: "Stronghold",
    line: "Recovery and authority wake the slower PQC lane.",
    detail: "wots+, xmss cadence, and pinocchio state only when the stakes change.",
    accent: "#dffef3",
  },
] as const;

type WalletModeId = (typeof models)[number]["id"];

export default function VaultModels() {
  const [active, setActive] = useState<WalletModeId>(models[0].id);
  const [sharedContentReady, setSharedContentReady] = useState(false);
  const activeRef = useRef<WalletModeId>(models[0].id);
  const sharedContentReadyRef = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const maskFrameRef = useRef<SVGSVGElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const hasAnimatedPanelsRef = useRef(false);
  const panelsRef = useRef<Record<WalletModeId, HTMLDivElement | null>>({
    shared: null,
    veiled: null,
    sealed: null,
  });

  const activeModel = models.find((model) => model.id === active) ?? models[0];
  const showOverlayDots = active === "shared" && !sharedContentReady;

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    sharedContentReadyRef.current = sharedContentReady;
  }, [sharedContentReady]);

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
            const desktop = window.innerWidth >= 1024;
            const nextSharedContentReady = self.progress > (desktop ? 0.11 : 0.09);
            const modeProgress = gsap.utils.clamp(
              0,
              1,
              (self.progress - (desktop ? 0.18 : 0.15)) / (desktop ? 0.68 : 0.72),
            );
            const nextMode =
              modeProgress < (desktop ? 0.58 : 0.44)
                ? "shared"
                : modeProgress < (desktop ? 0.84 : 0.78)
                  ? "veiled"
                  : "sealed";

            if (nextMode !== activeRef.current) {
              activeRef.current = nextMode;
              setActive(nextMode);
            }

            if (nextSharedContentReady !== sharedContentReadyRef.current) {
              sharedContentReadyRef.current = nextSharedContentReady;
              setSharedContentReady(nextSharedContentReady);
            }
          },
        },
      });

      tl.fromTo(
        maskFrameRef.current,
        { clipPath: "inset(0 48% 0 48% round 2rem)" },
        { clipPath: "inset(0 0% 0 0% round 0rem)", duration: 0.16 },
        0,
      )
        .fromTo(
          introRef.current,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.16, ease: "power2.out" },
          0.06,
        )
        .fromTo(
          stageRef.current,
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 0.18, ease: "power2.out" },
          0.08,
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!visualRef.current) return;

    gsap.fromTo(
      visualRef.current,
      { opacity: 0, scale: 0.95, filter: "blur(10px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.24, ease: "power2.out" },
    );
  }, [active]);

  useEffect(() => {
    if (!hasAnimatedPanelsRef.current) {
      hasAnimatedPanelsRef.current = true;
      return;
    }

    const panels = Object.entries(panelsRef.current) as Array<[WalletModeId, HTMLDivElement | null]>;
    panels.forEach(([id, panel]) => {
      if (!panel) return;

      const shouldShow = id === active && (id !== "shared" || sharedContentReady);

      if (shouldShow) {
        gsap.fromTo(
          panel,
          { autoAlpha: 0, y: 20, filter: "blur(10px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.26, ease: "power2.out", overwrite: true },
        );
        return;
      }

      gsap.to(panel, {
        autoAlpha: 0,
        y: -18,
        filter: "blur(8px)",
        duration: 0.2,
        ease: "power2.out",
        overwrite: true,
      });
    });
  }, [active, sharedContentReady]);

  return (
    <section ref={sectionRef} id="vault-models" className="relative min-h-[340vh] bg-bg-abyss">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_42%,rgba(0,255,213,0.08),transparent_34%),radial-gradient(circle_at_24%_68%,rgba(20,184,166,0.08),transparent_38%)]" />

        <div
          ref={stageRef}
          className="absolute inset-0 opacity-0"
        >
          <div className="absolute left-[60%] top-[49%] aspect-[12/7] w-[66vw] max-w-[350px] -translate-x-1/2 -translate-y-1/2 sm:w-[60vw] sm:max-w-[440px] lg:left-[61.5%] lg:w-[45vw] lg:max-w-[820px]">
            <div ref={visualRef} key={activeModel.id} className="h-full w-full">
              <WalletModeDiagram mode={activeModel.id} accent={activeModel.accent} showFrame={false} />
            </div>
          </div>
        </div>

          <div className="absolute inset-0 z-20 will-change-transform">
            <div
              className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${showOverlayDots ? "opacity-100" : "opacity-0"}`}
              aria-hidden="true"
            >
              <div className="absolute inset-0 opacity-56 [background-image:radial-gradient(circle,rgba(223,254,243,0.22)_1.15px,transparent_1.65px)] [background-size:22px_22px]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,213,0.05),transparent_54%)]" />
            </div>

            <svg ref={maskFrameRef} className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <mask id="vault-model-mask">
                <rect width="100" height="100" fill="white" />
                <rect x="28" y="9.5" width="64" height="79" rx="32" fill="black" />
              </mask>
            </defs>
            <rect width="100" height="100" fill="rgba(5,7,12,0.92)" mask="url(#vault-model-mask)" />
            <rect x="28" y="9.5" width="64" height="79" rx="32" fill="none" stroke="rgba(223,254,243,0.2)" strokeWidth="0.32" />
          </svg>

          <div className="relative grid h-full grid-rows-[auto_1fr] px-5 py-6 sm:px-8 sm:py-8 lg:grid-cols-[minmax(290px,390px)_1fr] lg:grid-rows-1 lg:px-[4vw] lg:py-[8vh]">
            <div className="relative z-10 flex h-full max-w-[30rem] flex-col">
              <div ref={introRef} className="max-w-[22rem]">
                <span className="technical-label mb-4 inline-block text-neon">Control paths</span>
                <h2 className="brand-display text-4xl font-black uppercase leading-[0.92] sm:text-5xl lg:text-[4.8rem]">
                  Pick the
                  <br />
                  path.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary sm:text-base">
                  The sheet closes in first. Once it settles, the active path takes the window.
                </p>
              </div>

              <div className="mt-8 overflow-hidden border-y border-white/[0.08] py-5 sm:mt-10 sm:py-6">
                <div className="relative h-[13rem] overflow-hidden sm:h-[14rem] lg:h-[17rem]">
                  {models.map((model) => (
                    <div
                      key={model.id}
                      ref={(node) => {
                        panelsRef.current[model.id] = node;
                      }}
                      className="absolute inset-0 flex h-[13rem] flex-col justify-center gap-3 sm:h-[14rem] lg:h-[17rem] lg:gap-4"
                      style={{
                        opacity: model.id === active && (model.id !== "shared" || sharedContentReady) ? 1 : 0,
                        visibility: model.id === active && (model.id !== "shared" || sharedContentReady) ? "visible" : "hidden",
                      }}
                    >
                      <div className="technical-label text-neon">{model.title}</div>
                      <p className="max-w-[23rem] text-[1.85rem] font-black leading-tight text-white sm:text-[2.05rem] lg:text-[2.45rem]">
                        {model.line}
                      </p>
                      <p className="max-w-[23rem] text-[0.72rem] uppercase tracking-[0.14em] text-white/58 sm:text-[0.76rem] lg:text-[0.8rem]">
                        {model.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto flex items-center gap-3 pt-6">
                {models.map((model) => (
                  <span
                    key={model.id}
                    className={`h-[2px] rounded-full transition-all duration-300 ${active === model.id ? "w-16 bg-neon" : "w-8 bg-white/14"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
