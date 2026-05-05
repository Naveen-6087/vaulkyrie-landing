"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function QuantumComputerDiagram({
  className = "",
  disableScrollReveal = false,
}: {
  className?: string;
  disableScrollReveal?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !containerRef.current || disableScrollReveal) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 86%",
          end: "bottom 42%",
          scrub: 1,
        },
      });

      tl.fromTo(
        '[data-qc-piece="halo"]',
        { opacity: 0, scale: 0.7, rotation: -18, transformOrigin: "50% 50%" },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.18, ease: "power2.out" },
      )
        .fromTo(
          '[data-qc-piece="crown"]',
          { opacity: 0, y: -120, scale: 0.78, transformOrigin: "50% 50%" },
          { opacity: 1, y: 0, scale: 1, duration: 0.18, ease: "power2.out" },
          0.06,
        )
        .fromTo(
          '[data-qc-piece="harness-left"]',
          { opacity: 0, x: -180, y: -60 },
          { opacity: 1, x: 0, y: 0, duration: 0.18, ease: "power2.out" },
          0.12,
        )
        .fromTo(
          '[data-qc-piece="harness-right"]',
          { opacity: 0, x: 180, y: -60 },
          { opacity: 1, x: 0, y: 0, duration: 0.18, ease: "power2.out" },
          0.12,
        )
        .fromTo(
          '[data-qc-piece="hangers"]',
          { opacity: 0, y: -70 },
          { opacity: 1, y: 0, duration: 0.14, ease: "power2.out" },
          0.18,
        )
        .fromTo(
          '[data-qc-piece="rings"]',
          { opacity: 0, scale: 0.8, y: 60, transformOrigin: "50% 50%" },
          { opacity: 1, scale: 1, y: 0, duration: 0.24, ease: "power2.out" },
          0.22,
        )
        .fromTo(
          '[data-qc-strut]',
          { opacity: 0, scaleY: 0, transformOrigin: "50% 0%", transformBox: "fill-box" },
          { opacity: 1, scaleY: 1, duration: 0.1, stagger: 0.018, ease: "power2.out" },
          0.25,
        )
        .fromTo(
          '[data-qc-piece="core"]',
          { opacity: 0, scale: 0.6, y: 80, transformOrigin: "50% 50%" },
          { opacity: 1, scale: 1, y: 0, duration: 0.18, ease: "back.out(1.5)" },
          0.28,
        )
        .fromTo(
          '[data-qc-piece="satellites"]',
          { opacity: 0, scale: 0.72, rotation: 16, transformOrigin: "50% 50%" },
          { opacity: 1, scale: 1, rotation: 0, duration: 0.16, ease: "power2.out" },
          0.32,
        )
        .fromTo(
          '[data-qc-piece="floor"]',
          { opacity: 0, y: 80 },
          { opacity: 1, y: 0, duration: 0.16, ease: "power2.out" },
          0.36,
        );
    }, containerRef);

    return () => ctx.revert();
  }, [disableScrollReveal]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <svg
        className="h-full w-full"
        viewBox="0 0 1600 1200"
        fill="none"
        role="img"
        aria-label="Large quantum computer illustration"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="qc-main" x1="420" y1="120" x2="1200" y2="980" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" stopOpacity="0.44" />
            <stop offset="0.28" stopColor="#14b8a6" stopOpacity="0.56" />
            <stop offset="0.7" stopColor="#00ffd5" stopOpacity="0.78" />
            <stop offset="1" stopColor="#14b8a6" stopOpacity="0.34" />
          </linearGradient>
          <radialGradient id="qc-glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(800 620) rotate(90) scale(420 520)">
            <stop stopColor="#00ffd5" stopOpacity="0.16" />
            <stop offset="1" stopColor="#00ffd5" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="1600" height="1200" fill="url(#qc-glow)" />

        <g data-qc-piece="halo">
          <ellipse cx="800" cy="600" rx="480" ry="360" stroke="rgba(255,255,255,0.08)" strokeWidth="2.4" />
          <ellipse cx="800" cy="600" rx="410" ry="302" stroke="rgba(0,255,213,0.18)" strokeWidth="2" />
          <ellipse cx="800" cy="600" rx="338" ry="248" stroke="rgba(20,184,166,0.22)" strokeWidth="1.8" />
        </g>

        <g data-qc-piece="crown">
          <circle cx="800" cy="126" r="78" stroke="url(#qc-main)" strokeWidth="4" />
          <circle cx="800" cy="126" r="46" stroke="rgba(255,255,255,0.32)" strokeWidth="2.4" />
          <circle className="svg-node-pulse" cx="800" cy="126" r="10" fill="#00ffd5" />
          <ellipse cx="800" cy="194" rx="126" ry="34" stroke="rgba(255,255,255,0.22)" strokeWidth="2.6" />
          <ellipse cx="800" cy="224" rx="160" ry="42" stroke="rgba(0,255,213,0.22)" strokeWidth="2.2" />
          <ellipse cx="800" cy="260" rx="212" ry="54" stroke="rgba(20,184,166,0.24)" strokeWidth="2" />
        </g>

        <g data-qc-piece="harness-left">
          <path d="M644 176C570 188 520 210 470 250C430 282 394 334 352 426" stroke="rgba(255,255,255,0.28)" strokeWidth="3" strokeLinecap="round" />
          <path d="M632 214C560 228 500 264 454 314C408 364 380 420 350 486" stroke="rgba(0,255,213,0.36)" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M620 252C554 272 500 304 452 356C414 398 388 446 360 538" stroke="rgba(20,184,166,0.34)" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M608 286C548 310 502 342 466 388C432 432 410 474 388 602" stroke="rgba(255,255,255,0.22)" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="352" cy="426" r="22" stroke="rgba(0,255,213,0.34)" strokeWidth="2.2" />
          <circle cx="350" cy="486" r="16" stroke="rgba(255,255,255,0.18)" strokeWidth="1.8" />
          <circle className="svg-node-pulse" cx="360" cy="538" r="8" fill="#00ffd5" />
        </g>

        <g data-qc-piece="harness-right">
          <path d="M956 176C1030 188 1080 210 1130 250C1170 282 1206 334 1248 426" stroke="rgba(255,255,255,0.28)" strokeWidth="3" strokeLinecap="round" />
          <path d="M968 214C1040 228 1100 264 1146 314C1192 364 1220 420 1250 486" stroke="rgba(0,255,213,0.36)" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M980 252C1046 272 1100 304 1148 356C1186 398 1212 446 1240 538" stroke="rgba(20,184,166,0.34)" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M992 286C1052 310 1098 342 1134 388C1168 432 1190 474 1212 602" stroke="rgba(255,255,255,0.22)" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="1248" cy="426" r="22" stroke="rgba(0,255,213,0.34)" strokeWidth="2.2" />
          <circle cx="1250" cy="486" r="16" stroke="rgba(255,255,255,0.18)" strokeWidth="1.8" />
          <circle className="svg-node-pulse" cx="1240" cy="538" r="8" fill="#00ffd5" />
        </g>

        <g data-qc-piece="hangers">
          {[
            [690, 224, 332],
            [724, 230, 360],
            [756, 236, 386],
            [800, 244, 408],
            [844, 236, 386],
            [876, 230, 360],
            [910, 224, 332],
          ].map(([x, fromY, toY], index) => (
            <path
              key={x}
              d={`M${x} ${fromY}V${toY}`}
              stroke={index % 2 === 0 ? "rgba(255,255,255,0.34)" : "rgba(0,255,213,0.4)"}
              strokeWidth={index === 3 ? "3.2" : "2.2"}
              strokeLinecap="round"
            />
          ))}
          <path d="M640 292H960" stroke="rgba(255,255,255,0.14)" strokeWidth="2" />
        </g>

        <g data-qc-piece="rings">
          <ellipse cx="800" cy="354" rx="176" ry="54" stroke="url(#qc-main)" strokeWidth="3.2" />
          <ellipse cx="800" cy="440" rx="244" ry="66" stroke="rgba(255,255,255,0.28)" strokeWidth="2.8" />
          <ellipse cx="800" cy="544" rx="310" ry="82" stroke="rgba(0,255,213,0.3)" strokeWidth="2.8" />
          <ellipse cx="800" cy="668" rx="256" ry="72" stroke="rgba(20,184,166,0.28)" strokeWidth="2.6" />
          <ellipse cx="800" cy="806" rx="174" ry="54" stroke="rgba(255,255,255,0.22)" strokeWidth="2.4" />

          <ellipse cx="800" cy="354" rx="132" ry="34" stroke="rgba(255,255,255,0.2)" strokeWidth="1.8" />
          <ellipse cx="800" cy="440" rx="196" ry="48" stroke="rgba(0,255,213,0.22)" strokeWidth="1.8" />
          <ellipse cx="800" cy="544" rx="252" ry="58" stroke="rgba(255,255,255,0.16)" strokeWidth="1.8" />
          <ellipse cx="800" cy="668" rx="196" ry="50" stroke="rgba(0,255,213,0.18)" strokeWidth="1.8" />
          <ellipse cx="800" cy="806" rx="126" ry="36" stroke="rgba(255,255,255,0.14)" strokeWidth="1.8" />

          {[
            [354, 176],
            [440, 244],
            [544, 310],
            [668, 256],
            [806, 174],
          ].map(([y, rx], index) => (
            <path
              key={y}
              className={index % 2 === 0 ? "svg-dash-flow" : "svg-dash-flow svg-dash-flow-delayed"}
              d={`M${800 - rx} ${y}H${800 + rx}`}
              stroke="rgba(0,255,213,0.72)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ))}

          <g data-qc-piece="struts">
            {[
              [650, 366, 650, 448],
              [690, 354, 690, 432],
              [728, 350, 728, 424],
              [768, 346, 768, 418],
              [800, 344, 800, 416],
              [832, 346, 832, 418],
              [872, 350, 872, 424],
              [910, 354, 910, 432],
              [950, 366, 950, 448],
              [604, 468, 604, 544],
              [648, 456, 648, 536],
              [696, 448, 696, 528],
              [748, 444, 748, 520],
              [800, 442, 800, 516],
              [852, 444, 852, 520],
              [904, 448, 904, 528],
              [952, 456, 952, 536],
              [996, 468, 996, 544],
              [676, 586, 676, 664],
              [724, 578, 724, 664],
              [772, 574, 772, 668],
              [820, 574, 820, 668],
              [868, 578, 868, 664],
              [916, 586, 916, 664],
              [724, 724, 724, 806],
              [768, 716, 768, 808],
              [800, 714, 800, 814],
              [832, 716, 832, 808],
              [876, 724, 876, 806],
            ].map(([x1, y1, x2, y2], index) => (
              <line
                key={`strut-${index}`}
                data-qc-strut
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={index % 3 === 0 ? "rgba(255,255,255,0.34)" : "rgba(0,255,213,0.46)"}
                strokeWidth={index % 5 === 0 ? "3" : "2.4"}
                strokeLinecap="round"
                style={{ transformBox: "fill-box", transformOrigin: "top center" }}
              />
            ))}
          </g>
        </g>

        <g data-qc-piece="core">
          <circle cx="800" cy="618" r="86" stroke="rgba(255,255,255,0.24)" strokeWidth="2.8" />
          <circle cx="800" cy="618" r="58" stroke="rgba(0,255,213,0.48)" strokeWidth="2.4" />
          <circle cx="800" cy="618" r="26" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
          <circle className="svg-node-pulse" cx="800" cy="618" r="10" fill="#00ffd5" />

          <circle cx="800" cy="736" r="20" stroke="rgba(0,255,213,0.28)" strokeWidth="2" />
          <circle className="svg-node-pulse" cx="800" cy="736" r="6" fill="#14b8a6" />
        </g>

        <g data-qc-piece="satellites">
          <g>
            <circle cx="584" cy="844" r="44" stroke="rgba(255,255,255,0.16)" strokeWidth="2.2" />
            <circle cx="584" cy="844" r="68" stroke="rgba(0,255,213,0.12)" strokeWidth="1.8" />
            <circle className="svg-node-pulse" cx="584" cy="844" r="8" fill="#00ffd5" />
            <path d="M628 844H690" stroke="rgba(0,255,213,0.56)" strokeWidth="2" strokeLinecap="round" />
          </g>
          <g>
            <circle cx="1016" cy="844" r="44" stroke="rgba(255,255,255,0.16)" strokeWidth="2.2" />
            <circle cx="1016" cy="844" r="68" stroke="rgba(20,184,166,0.12)" strokeWidth="1.8" />
            <circle className="svg-node-pulse" cx="1016" cy="844" r="8" fill="#00ffd5" />
            <path d="M910 844H972" stroke="rgba(0,255,213,0.56)" strokeWidth="2" strokeLinecap="round" />
          </g>
          <g>
            <circle cx="800" cy="930" r="56" stroke="rgba(255,255,255,0.16)" strokeWidth="2.2" />
            <circle cx="800" cy="930" r="84" stroke="rgba(0,255,213,0.1)" strokeWidth="1.8" />
            <circle className="svg-node-pulse" cx="800" cy="930" r="9" fill="#00ffd5" />
          </g>
        </g>

        <g data-qc-piece="floor">
          <path d="M332 1030H1268" stroke="rgba(255,255,255,0.08)" strokeWidth="2.2" />
          <path d="M392 1084H1208" stroke="rgba(255,255,255,0.05)" strokeWidth="1.8" />
          <path d="M744 930H856" stroke="rgba(0,255,213,0.74)" strokeWidth="2" strokeLinecap="round" className="svg-dash-flow" />
          <path d="M640 1030 730 930" stroke="rgba(20,184,166,0.22)" strokeWidth="2" />
          <path d="M960 1030 870 930" stroke="rgba(20,184,166,0.22)" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}
