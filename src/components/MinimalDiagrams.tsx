import { cn } from "@/lib/utils";

type WalletMode = "shared" | "veiled" | "sealed";
type FeatureGlyphKind = "shared" | "quiet" | "stronghold" | "apps" | "devices" | "chain";

type SvgProps = {
  className?: string;
  accent?: string;
};

export function FeatureGlyph({ kind, className, accent = "#00ffd5" }: SvgProps & { kind: FeatureGlyphKind }) {
  return (
    <svg
      className={cn("h-full w-full", className)}
      viewBox="0 0 220 140"
      fill="none"
      aria-hidden="true"
    >
      <path d="M18 104H202" stroke="rgba(255,255,255,0.08)" strokeWidth="1.2" />

      {kind === "shared" && (
        <>
          <circle cx="48" cy="54" r="14" stroke={accent} strokeOpacity="0.46" strokeWidth="1.5" />
          <circle cx="104" cy="44" r="12" stroke={accent} strokeOpacity="0.46" strokeWidth="1.5" />
          <circle cx="78" cy="90" r="12" stroke={accent} strokeOpacity="0.46" strokeWidth="1.5" />
          <circle className="svg-node-pulse" cx="156" cy="72" r="10" fill={accent} />
          <path className="svg-dash-flow" d="M62 58 146 70" stroke={accent} strokeOpacity="0.72" strokeWidth="1.5" strokeLinecap="round" />
          <path className="svg-dash-flow svg-dash-flow-delayed" d="M114 50 146 66" stroke={accent} strokeOpacity="0.72" strokeWidth="1.5" strokeLinecap="round" />
          <path className="svg-dash-flow" d="M90 82 146 74" stroke={accent} strokeOpacity="0.72" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="176" cy="72" r="20" stroke={accent} strokeOpacity="0.2" strokeWidth="1.4" />
        </>
      )}

      {kind === "quiet" && (
        <>
          <path d="M30 70H76" stroke={accent} strokeOpacity="0.52" strokeWidth="1.5" strokeLinecap="round" />
          <circle className="svg-node-pulse" cx="92" cy="70" r="8" fill={accent} />
          <circle cx="122" cy="70" r="26" stroke={accent} strokeOpacity="0.34" strokeWidth="1.5" />
          <circle className="svg-orbit" cx="122" cy="70" r="42" stroke={accent} strokeOpacity="0.3" strokeWidth="1.3" />
          <path d="M148 70H178" stroke={accent} strokeOpacity="0.52" strokeWidth="1.5" strokeLinecap="round" />
          {[0, 1, 2, 3, 4, 5].map((dot) => (
            <circle
              key={dot}
              cx={182 + (dot % 3) * 10}
              cy={58 + Math.floor(dot / 3) * 12}
              r="3.5"
              fill={dot === 2 ? "#ffffff" : accent}
              fillOpacity={dot === 2 ? 0.95 : 0.7}
            />
          ))}
        </>
      )}

      {kind === "stronghold" && (
        <>
          <rect x="40" y="34" width="122" height="72" rx="18" stroke={accent} strokeOpacity="0.18" strokeWidth="1.4" />
          <rect x="58" y="48" width="88" height="44" rx="14" stroke={accent} strokeOpacity="0.72" strokeWidth="1.6" />
          <rect x="52" y="76" width="100" height="32" rx="12" stroke={accent} strokeOpacity="0.4" strokeWidth="1.3" />
          <rect x="72" y="60" width="60" height="28" rx="10" fill="rgba(0,255,213,0.06)" stroke={accent} strokeOpacity="0.82" strokeWidth="1.4" />
          <circle className="svg-node-pulse" cx="102" cy="74" r="6" fill={accent} />
          <path d="M162 70H196" stroke={accent} strokeOpacity="0.52" strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}

      {kind === "apps" && (
        <>
          <rect x="34" y="30" width="92" height="64" rx="12" stroke={accent} strokeOpacity="0.62" strokeWidth="1.5" />
          <path d="M34 46H126" stroke={accent} strokeOpacity="0.3" strokeWidth="1.4" />
          <path d="M52 62H84" stroke={accent} strokeOpacity="0.42" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M52 76H98" stroke={accent} strokeOpacity="0.2" strokeWidth="1.5" strokeLinecap="round" />
          <path className="svg-dash-flow" d="M126 62 162 62 178 48" stroke={accent} strokeOpacity="0.72" strokeWidth="1.5" strokeLinecap="round" />
          <path className="svg-dash-flow svg-dash-flow-delayed" d="M126 74 162 74 178 92" stroke={accent} strokeOpacity="0.72" strokeWidth="1.5" strokeLinecap="round" />
          <circle className="svg-node-pulse" cx="186" cy="48" r="8" fill={accent} />
          <circle cx="186" cy="92" r="8" stroke={accent} strokeOpacity="0.52" strokeWidth="1.5" />
        </>
      )}

      {kind === "devices" && (
        <>
          <rect x="32" y="48" width="38" height="54" rx="10" stroke={accent} strokeOpacity="0.62" strokeWidth="1.5" />
          <rect x="92" y="38" width="54" height="38" rx="10" stroke={accent} strokeOpacity="0.62" strokeWidth="1.5" />
          <rect x="164" y="44" width="28" height="44" rx="10" stroke={accent} strokeOpacity="0.62" strokeWidth="1.5" />
          <circle className="svg-node-pulse" cx="112" cy="94" r="9" fill={accent} />
          <path className="svg-dash-flow" d="M70 76H103" stroke={accent} strokeOpacity="0.72" strokeWidth="1.5" strokeLinecap="round" />
          <path className="svg-dash-flow svg-dash-flow-delayed" d="M139 72 139 84 121 90" stroke={accent} strokeOpacity="0.72" strokeWidth="1.5" strokeLinecap="round" />
          <path className="svg-dash-flow" d="M164 66 132 88" stroke={accent} strokeOpacity="0.72" strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}

      {kind === "chain" && (
        <>
          <path d="M32 70H188" stroke={accent} strokeOpacity="0.24" strokeWidth="1.4" />
          {[58, 110, 162].map((x, index) => (
            <g key={x}>
              <circle cx={x} cy="70" r={index === 1 ? 9 : 7} fill={index === 1 ? accent : "rgba(0,255,213,0.18)"} />
              <circle cx={x} cy="70" r={index === 1 ? 22 : 18} stroke={accent} strokeOpacity={index === 1 ? 0.28 : 0.14} strokeWidth="1.2" />
            </g>
          ))}
          <path className="svg-dash-flow" d="M65 70H103" stroke={accent} strokeOpacity="0.72" strokeWidth="1.5" strokeLinecap="round" />
          <path className="svg-dash-flow svg-dash-flow-delayed" d="M117 70H155" stroke={accent} strokeOpacity="0.72" strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

export function WalletModeDiagram({
  mode,
  className,
  accent = "#00ffd5",
  showFrame = true,
}: SvgProps & { mode: WalletMode; showFrame?: boolean }) {
  return (
    <svg
      className={cn("h-full w-full", className)}
      viewBox="0 0 720 420"
      fill="none"
      role="img"
      aria-label={`${mode} mode diagram`}
    >
      {showFrame && (
        <>
          <rect x="36" y="26" width="648" height="368" rx="28" stroke="rgba(255,255,255,0.08)" strokeWidth="1.2" />
          <path d="M70 210H650" stroke="rgba(255,255,255,0.07)" strokeWidth="1.2" />
        </>
      )}

      {mode === "shared" && (
        <>
          {[118, 210, 302].map((y, index) => (
            <g key={y}>
              <circle cx="142" cy={y} r="36" stroke={accent} strokeOpacity="0.28" strokeWidth="1.8" />
              <circle className="svg-orbit" cx="142" cy={y} r="22" stroke={accent} strokeOpacity="0.22" strokeWidth="1.4" />
              <circle cx="142" cy={y} r="7" fill={accent} fillOpacity="0.9" />
              <path
                className={index === 1 ? "svg-dash-flow svg-dash-flow-delayed" : "svg-dash-flow"}
                d={`M178 ${y}H302`}
                stroke={accent}
                strokeOpacity="0.72"
                strokeWidth="1.9"
                strokeLinecap="round"
              />
            </g>
          ))}
          <circle cx="366" cy="210" r="66" stroke={accent} strokeOpacity="0.34" strokeWidth="2.1" />
          <circle cx="366" cy="210" r="38" stroke="rgba(255,255,255,0.28)" strokeWidth="1.8" />
          <circle className="svg-node-pulse" cx="366" cy="210" r="13" fill={accent} />
          <circle className="svg-orbit" cx="366" cy="210" r="102" stroke={accent} strokeOpacity="0.22" strokeWidth="1.5" />
          <path className="svg-dash-flow" d="M432 210H544" stroke={accent} strokeOpacity="0.72" strokeWidth="2" strokeLinecap="round" />
          <circle cx="590" cy="210" r="46" stroke={accent} strokeOpacity="0.32" strokeWidth="1.8" />
          <circle cx="590" cy="210" r="20" stroke="rgba(255,255,255,0.22)" strokeWidth="1.4" />
          {[
            [558, 160],
            [624, 168],
            [646, 210],
            [624, 252],
            [558, 260],
          ].map(([x, y], index) => (
            <circle
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              r={index === 2 ? "9" : "6"}
              fill={index === 2 ? accent : "rgba(20,184,166,0.2)"}
              fillOpacity={index === 2 ? 0.84 : 1}
            />
          ))}
        </>
      )}

      {mode === "veiled" && (
        <>
          <circle cx="126" cy="210" r="40" stroke={accent} strokeOpacity="0.3" strokeWidth="1.8" />
          <circle cx="126" cy="210" r="12" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.4" />
          <circle className="svg-node-pulse" cx="126" cy="210" r="8" fill={accent} />
          <path className="svg-dash-flow" d="M166 210H246" stroke={accent} strokeOpacity="0.72" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="360" cy="210" r="82" stroke={accent} strokeOpacity="0.28" strokeWidth="2" />
          <circle className="svg-orbit" cx="360" cy="210" r="118" stroke={accent} strokeOpacity="0.2" strokeWidth="1.6" />
          <circle className="svg-orbit svg-orbit-reverse" cx="360" cy="210" r="52" stroke="rgba(255,255,255,0.18)" strokeWidth="1.4" />
          <path d="M312 178C336 148 384 148 408 178" stroke="rgba(255,255,255,0.3)" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M312 242C336 272 384 272 408 242" stroke={accent} strokeOpacity="0.46" strokeWidth="2.2" strokeLinecap="round" />
          <circle className="svg-node-pulse" cx="360" cy="210" r="13" fill={accent} />
          <path className="svg-dash-flow svg-dash-flow-delayed" d="M442 210H520" stroke={accent} strokeOpacity="0.72" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="592" cy="210" r="44" stroke={accent} strokeOpacity="0.3" strokeWidth="1.8" />
          <circle cx="592" cy="210" r="14" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
          {[
            [548, 176],
            [566, 144],
            [620, 144],
            [638, 176],
            [638, 244],
            [620, 276],
            [566, 276],
            [548, 244],
          ].map(([x, y], index) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="5" fill={index === 2 ? "#ffffff" : accent} fillOpacity={index === 2 ? 0.9 : 0.72} />
          ))}
        </>
      )}

      {mode === "sealed" && (
        <>
          {[
            [146, 150],
            [146, 270],
            [228, 210],
          ].map(([x, y], index) => (
            <g key={`${x}-${y}`}>
              <circle cx={x} cy={y} r="28" stroke={accent} strokeOpacity="0.22" strokeWidth="1.6" />
              <circle className="svg-node-pulse" cx={x} cy={y} r={index === 2 ? "8" : "6"} fill={accent} />
              <path
                className={index === 1 ? "svg-dash-flow svg-dash-flow-delayed" : "svg-dash-flow"}
                d={`M${x + 28} ${y}H300`}
                stroke={accent}
                strokeOpacity="0.64"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </g>
          ))}
          <circle cx="372" cy="210" r="84" stroke={accent} strokeOpacity="0.28" strokeWidth="2" />
          <circle cx="372" cy="210" r="58" stroke="rgba(255,255,255,0.24)" strokeWidth="1.8" />
          <circle className="svg-orbit" cx="372" cy="210" r="124" stroke={accent} strokeOpacity="0.18" strokeWidth="1.6" />
          <circle className="svg-node-pulse" cx="372" cy="210" r="12" fill={accent} />
          <path d="M338 176C354 158 390 158 406 176" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" />
          <path d="M338 244C354 262 390 262 406 244" stroke={accent} strokeOpacity="0.44" strokeWidth="2" strokeLinecap="round" />
          <path className="svg-dash-flow" d="M456 210H548" stroke={accent} strokeOpacity="0.72" strokeWidth="1.9" strokeLinecap="round" />
          <circle cx="600" cy="210" r="50" stroke={accent} strokeOpacity="0.28" strokeWidth="1.8" />
          <circle className="svg-orbit svg-orbit-reverse" cx="600" cy="210" r="82" stroke={accent} strokeOpacity="0.18" strokeWidth="1.5" />
          {[
            [600, 136],
            [664, 176],
            [664, 244],
            [600, 284],
            [536, 244],
            [536, 176],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="6" fill="rgba(20,184,166,0.22)" />
          ))}
          <circle className="svg-node-pulse" cx="600" cy="210" r="9" fill={accent} />
        </>
      )}
    </svg>
  );
}

export function SecurityArchitectureDiagram({ className }: SvgProps) {
  return (
    <svg
      className={cn("h-full w-full", className)}
      viewBox="0 0 920 520"
      fill="none"
      aria-label="Vaulkyrie safety diagram"
      role="img"
    >
      <g data-security-piece="rail">
        <path d="M40 260H880" stroke="rgba(0,255,213,0.18)" strokeWidth="1.4" />
        <path d="M40 260H450" stroke="rgba(255,255,255,0.08)" strokeWidth="1.1" />
        <path d="M470 260H880" stroke="rgba(255,255,255,0.08)" strokeWidth="1.1" />
      </g>

      <g data-security-piece="devices">
        <rect x="110" y="168" width="76" height="52" rx="14" stroke="rgba(0,255,213,0.34)" strokeWidth="1.5" />
        <rect x="110" y="300" width="76" height="52" rx="14" stroke="rgba(0,255,213,0.34)" strokeWidth="1.5" />
        <circle className="svg-node-pulse" cx="148" cy="194" r="5" fill="#00ffd5" />
        <circle className="svg-node-pulse" cx="148" cy="326" r="5" fill="#00ffd5" style={{ animationDelay: "0.25s" }} />
      </g>

      <g data-security-piece="cores">
        <circle cx="312" cy="260" r="94" stroke="rgba(0,255,213,0.28)" strokeWidth="1.5" />
        <circle cx="412" cy="260" r="56" stroke="rgba(0,255,213,0.28)" strokeWidth="1.5" />
        <circle className="svg-node-pulse" cx="312" cy="260" r="10" fill="#00ffd5" />
        <circle className="svg-node-pulse" cx="412" cy="260" r="10" fill="#00ffd5" style={{ animationDelay: "0.2s" }} />
      </g>

      <g data-security-piece="flows">
        <path d="M210 260H278" stroke="#00ffd5" strokeOpacity="0.72" strokeWidth="1.6" strokeLinecap="round" />
        <path className="svg-dash-flow" d="M322 260H402" stroke="#00ffd5" strokeOpacity="0.72" strokeWidth="1.6" strokeLinecap="round" />
        <path className="svg-dash-flow svg-dash-flow-delayed" d="M422 260H596" stroke="#00ffd5" strokeOpacity="0.72" strokeWidth="1.6" strokeLinecap="round" />
        <path className="svg-dash-flow" d="M422 260 590 338" stroke="#00ffd5" strokeOpacity="0.42" strokeWidth="1.4" strokeLinecap="round" />
      </g>

      <g data-security-piece="cluster">
        {Array.from({ length: 18 }).map((_, index) => {
          const angle = (Math.PI * 2 * index) / 18;
          const x = 706 + Math.cos(angle) * 54;
          const y = 260 + Math.sin(angle) * 54;
          return <circle key={index} cx={x} cy={y} r="5" fill={index === 0 ? "#ffffff" : "#00ffd5"} fillOpacity={index === 0 ? 0.94 : 0.72} />;
        })}
        <circle cx="706" cy="260" r="14" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" />
        <path d="M644 260H652" stroke="#00ffd5" strokeOpacity="0.62" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M650 338H672" stroke="#00ffd5" strokeOpacity="0.42" strokeWidth="1.4" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function SecurePortalDiagram({ className }: SvgProps) {
  return (
    <svg
      className={cn("pointer-events-none", className)}
      viewBox="0 0 640 640"
      fill="none"
      aria-hidden="true"
    >
      <g data-portal-piece="rings">
        <circle cx="320" cy="320" r="228" stroke="rgba(0,255,213,0.12)" strokeWidth="1.4" />
        <circle cx="320" cy="320" r="178" stroke="rgba(0,255,213,0.18)" strokeWidth="1.4" />
        <circle className="svg-orbit" cx="320" cy="320" r="132" stroke="rgba(0,255,213,0.48)" strokeWidth="1.4" />
      <circle className="svg-orbit svg-orbit-reverse" cx="320" cy="320" r="96" stroke="rgba(223,254,243,0.42)" strokeWidth="1.4" />
      </g>
      <g data-portal-piece="core">
        <circle cx="320" cy="320" r="62" stroke="rgba(255,255,255,0.16)" strokeWidth="1.4" />
        <circle className="svg-node-pulse" cx="320" cy="320" r="12" fill="#00ffd5" />
      </g>
      <g data-portal-piece="axes">
        <path d="M320 92V182" stroke="rgba(0,255,213,0.2)" strokeWidth="1.2" />
        <path d="M320 458V548" stroke="rgba(0,255,213,0.2)" strokeWidth="1.2" />
        <path d="M92 320H182" stroke="rgba(0,255,213,0.2)" strokeWidth="1.2" />
        <path d="M458 320H548" stroke="rgba(0,255,213,0.2)" strokeWidth="1.2" />
      </g>
    </svg>
  );
}
