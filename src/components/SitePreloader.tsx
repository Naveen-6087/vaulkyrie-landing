"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

export default function SitePreloader() {
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<HTMLDivElement[]>([]);
  const dotsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    const core = coreRef.current;
    if (!root || !core) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(core, { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.9, ease: "power3.out" });
      gsap.to(ringsRef.current, {
        rotate: (index) => (index % 2 === 0 ? 360 : -360),
        duration: (index) => 7 + index * 2,
        ease: "none",
        repeat: -1,
        transformOrigin: "50% 50%",
      });
      gsap.to(dotsRef.current, {
        y: (index) => (index % 2 === 0 ? -8 : 8),
        opacity: 1,
        scale: 1.1,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        stagger: 0.12,
        ease: "sine.inOut",
      });
    }, root);

    let done = false;
    const finish = async () => {
      if (done) return;
      done = true;
      await document.fonts?.ready;
      gsap.to(root, {
        opacity: 0,
        yPercent: -4,
        duration: 0.65,
        ease: "power3.inOut",
        onComplete: () => setVisible(false),
      });
    };

    if (document.readyState === "complete") {
      const timeout = window.setTimeout(finish, 650);
      return () => {
        window.clearTimeout(timeout);
        ctx.revert();
      };
    }

    window.addEventListener("load", finish, { once: true });
    const fallback = window.setTimeout(finish, 2400);
    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(fallback);
      ctx.revert();
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#020204]"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="relative h-[18rem] w-[18rem]">
        {[0, 1, 2].map((ring) => (
          <div
            key={ring}
            ref={(element) => {
              if (element) ringsRef.current[ring] = element;
            }}
            data-orbit={ring}
            className={`absolute rounded-full border ${
              ring === 0
                ? "inset-0 border-white/10"
                : ring === 1
                  ? "inset-5 border-teal/35"
                  : "inset-11 border-neon/45"
            }`}
          />
        ))}

        {[0, 1, 2, 3, 4, 5].map((dot) => (
          <div
            key={dot}
            ref={(element) => {
              if (element) dotsRef.current[dot] = element;
            }}
            className="absolute h-2.5 w-2.5 rounded-full bg-neon opacity-40 shadow-[0_0_18px_rgba(0,255,213,0.65)]"
            style={{
              left: `${50 + Math.cos((Math.PI * 2 * dot) / 6) * 38}%`,
              top: `${50 + Math.sin((Math.PI * 2 * dot) / 6) * 38}%`,
            }}
          />
        ))}

        <div ref={coreRef} className="absolute inset-[4.25rem] flex items-center justify-center rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-xl">
          <div className="absolute inset-3 rounded-full border border-neon/20" />
          <div className="absolute inset-7 rounded-full border border-teal/20" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-[#05070b] shadow-[0_0_45px_rgba(0,255,213,0.12)]">
            <Image src="/assets/logo.png" alt="Vaulkyrie" width={42} height={42} className="object-contain" priority />
          </div>
        </div>
      </div>
    </div>
  );
}
