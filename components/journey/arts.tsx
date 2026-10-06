"use client";
import type { ReactNode } from "react";
import { Couple } from "./Pilgrims";
import { UI, type SceneId } from "./content";
import { useLang } from "./i18n";
import type { Builder } from "./Scene";

/* ──────────────────────────────────────────────────────────────
   Line-art scenes. Each is a 1000×1000 SVG; groups marked `.bg` are
   decorative backdrop and hide when a photo is supplied (SCENE_IMAGES).
   Builders animate on a 0–10 timeline driven by scroll.
   ────────────────────────────────────────────────────────────── */

function Svg({ children, align = "xMidYMid" }: { children: ReactNode; align?: string }) {
  return (
    <svg className="uj-svg" viewBox="0 0 1000 1000" preserveAspectRatio={`${align} meet`} aria-hidden="true">
      {children}
    </svg>
  );
}

// Small deterministic PRNG so server and client render the same dots.
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const range = (n: number) => Array.from({ length: n }, (_, i) => i);
// Trig results can differ in the last digit between server and browser; round to keep hydration stable.
const r1 = (n: number) => Math.round(n * 10) / 10;

/* ── HERO ─────────────────────────────────────────────────── */

const STARS = (() => {
  const r = rng(7);
  return range(70).map(() => ({ x: r() * 1000, y: r() * 560, s: 0.6 + r() * 1.8 }));
})();

export function HeroArt() {
  return (
    <Svg align="xMidYMax">
      <g className="stars">
        {STARS.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.s} className="star" style={{ animationDelay: `${(i % 9) * 0.4}s` }} />
        ))}
      </g>
      <path className="ln-t horizon" d="M60 905 L940 905" />
      <g className="hero-couple">
        <Couple x={500} y={905} s={1.3} />
      </g>
    </Svg>
  );
}

export const buildHero: Builder = (tl, q, root) => {
  tl.to(q(".uj-cue"), { opacity: 0, duration: 1 }, 0)
    .to(q(".uj-hero-title"), { y: -140, opacity: 0, duration: 4 }, 0.8)
    .to(q(".stars"), { opacity: 0, duration: 4 }, 3)
    .to(q(".dawn"), { opacity: 1, duration: 6 }, 3)
    .to(root, { "--pl-fill": "#F7F1E3", "--pl-line": "#0B2416", duration: 5 }, 4)
    .to(q(".hero-couple"), { x: 640, duration: 5 }, 5);
};

/* ── 1. HOME ──────────────────────────────────────────────── */

export function HomeArt() {
  return (
    <Svg>
      <g className="bg">
        <path className="ln fp" d="M120 560 L120 300 Q120 190 230 190 Q340 190 340 300 L340 560 Z" />
        <path className="ln-t" d="M230 196 L230 560 M120 390 L340 390" />
        <circle className="ln-t sun" cx="285" cy="280" r="30" />
        <path className="ln" d="M96 560 L364 560" />
        <path className="ln-t" d="M430 300 L620 300 M450 300 L450 330 M600 300 L600 330" />
        <path className="ln" d="M470 300 L470 250 Q490 225 510 250 L510 300 M540 300 L540 270 L580 270 L580 300" />
        <path className="ln fp" d="M40 904 L300 904 L330 868 L70 868 Z" />
        <path className="ln-t" d="M95 896 L285 896 L305 876 L115 876 Z M190 876 L190 896" />
      </g>
      <path className="ln" d="M30 820 L970 820" />

      <g className="case">
        <rect className="ln fp lid-open" x="560" y="470" width="300" height="190" rx="18" />
        <path className="ln-t lid-open" d="M580 500 L840 500" />
        <g className="item"><rect className="ln fill-ink" x="590" y="575" width="62" height="86" rx="6" /><circle className="ln-gold" cx="621" cy="612" r="16" /><path className="ln-gold" d="M605 612 L637 612 M621 596 Q609 612 621 628 Q633 612 621 596" /></g>
        <g className="item"><rect className="ln fill-white" x="668" y="600" width="112" height="62" rx="6" /><path className="ln-t" d="M668 622 L780 622 M668 642 L780 642" /></g>
        <g className="item"><rect className="ln fp" x="796" y="560" width="34" height="100" rx="10" /><rect className="ln fill-gold" x="802" y="548" width="22" height="16" rx="3" /></g>
        <g className="item"><path className="ln fp" d="M604 650 Q600 620 620 618 Q640 620 636 650 Z M644 650 Q640 620 660 618 Q680 620 676 650 Z" /></g>
        <rect className="ln fp" x="560" y="652" width="300" height="168" rx="18" />
        <path className="ln-t" d="M560 700 L860 700" />
        <path className="ln" d="M670 652 L670 630 Q710 614 750 630 L750 652" />
        <g className="lid-closed"><rect className="ln fp" x="556" y="626" width="308" height="40" rx="14" /><path className="ln" d="M670 626 L670 606 Q710 590 750 606 L750 626" /></g>
        <circle className="ln fp" cx="600" cy="828" r="10" />
        <circle className="ln fp" cx="820" cy="828" r="10" />
      </g>

      <g className="mover"><Couple x={300} y={820} s={1.35} /></g>
    </Svg>
  );
}

export const buildHome: Builder = (tl, q) => {
  tl.from(q(".item"), { y: -480, opacity: 0, stagger: 1, duration: 1.4, ease: "power1.in" }, 0.4)
    .to(q(".lid-open"), { scaleY: 0, svgOrigin: "710 660", duration: 0.9 }, 6)
    .to(q(".item"), { opacity: 0, duration: 0.4 }, 6.4)
    .from(q(".lid-closed"), { opacity: 0, duration: 0.4 }, 6.6)
    .to(q(".mover"), { x: 260, duration: 3 }, 7)
    .to(q(".case"), { x: 260, duration: 3 }, 7);
};

/* ── 2. AIRPORT ───────────────────────────────────────────── */

function Plane({ className = "" }: { className?: string }) {
  return (
    <g className={className}>
      <path className="ln fp" d="M20 14 L0 -34 L24 -34 L64 12 Z" />
      <path className="ln fp" d="M0 30 Q0 14 30 12 L210 10 Q242 10 258 22 Q266 31 252 37 L30 44 Q0 44 0 30 Z" />
      <path className="ln fp" d="M108 30 L66 74 L92 74 L162 31 Z" />
      <ellipse className="ln fp" cx="104" cy="50" rx="18" ry="7" />
      <path className="ln-t" d="M60 22 L200 22" strokeDasharray="4 10" />
      <path className="ln" d="M228 16 L246 22" />
    </g>
  );
}

export function AirportArt() {
  return (
    <Svg>
      <g className="bg">
        <path className="ln" d="M0 270 Q500 120 1000 270" />
        <path className="ln-t" d="M0 305 Q500 165 1000 305" />
        {range(11).map((i) => (
          <path key={i} className="ln-t" d={`M${i * 100} ${r1(300 - Math.sin((i / 10) * Math.PI) * 125)} L${i * 100} 700`} />
        ))}
        <path className="ln-t" d="M0 500 L1000 500" />
        <path className="ln" d="M0 700 L1000 700" />
        <path className="ln-t" d="M0 650 L1000 650" />
        <g className="board">
          <rect className="ln fill-ink" x="630" y="330" width="300" height="128" rx="6" />
          <text className="mono" x="650" y="362">DEPARTURES</text>
          <text className="mono dim" x="650" y="396">JED  JEDDAH      ON TIME</text>
          <text className="mono dim" x="650" y="426">MED  MADINAH     BOARDING</text>
        </g>
        <rect className="ln fp" x="50" y="742" width="250" height="118" rx="4" />
        <text className="mono ink" x="78" y="800">CHECK-IN · ✈</text>
        <path className="ln-t" d="M50 772 L300 772" />
      </g>
      <g transform="translate(470 600) scale(.75)">
        <Plane className="plane" />
      </g>
      <path className="ln" d="M20 860 L980 860" />
      <g className="mover"><Couple x={180} y={860} s={1.25} /></g>
    </Svg>
  );
}

export const buildAirport: Builder = (tl, q) => {
  tl.to(q(".mover"), { x: 340, duration: 4.5 }, 0)
    .to(q(".plane"), { x: 640, y: -560, rotation: -14, scale: 0.55, transformOrigin: "50% 50%", duration: 5, ease: "power2.in" }, 4.5);
};

/* ── 3. MIQAT (on the plane) ──────────────────────────────── */

export function MiqatArt() {
  const { t } = useLang();
  return (
    <Svg>
      <defs>
        <clipPath id="uj-win"><rect x="500" y="200" width="380" height="520" rx="170" /></clipPath>
        <linearGradient id="uj-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E9EEF0" />
          <stop offset="1" stopColor="#F6E7CB" />
        </linearGradient>
      </defs>
      <g className="bg">
        <rect className="ln-t" x="420" y="120" width="540" height="680" rx="40" fill="none" />
      </g>
      <rect className="ln-b fp" x="470" y="170" width="440" height="580" rx="200" />
      <g clipPath="url(#uj-win)">
        <rect x="480" y="190" width="420" height="560" fill="url(#uj-sky)" />
        <circle className="glow" cx="800" cy="330" r="46" />
        <path className="ln-t" d="M480 640 Q560 610 640 640 T800 636 T960 640 L960 760 L480 760 Z" fill="#F1E2C2" />
        <g className="clouds">
          {[[520, 300], [700, 420], [900, 280], [1080, 470], [1250, 340], [1420, 430]].map(([x, y], i) => (
            <path key={i} className="ln-t cloud" d={`M${x} ${y} q20 -34 54 -16 q22 -30 56 -6 q34 -4 32 26 q20 18 -8 26 l-128 0 q-30 -10 -6 -30 Z`} />
          ))}
        </g>
        <g className="miqat-line">
          <path className="ln acc" d="M930 190 L930 760" strokeDasharray="14 12" />
          <rect className="fill-green" x="852" y="452" width="156" height="34" rx="17" />
          <text className="lbl light" x="930" y="475" textAnchor="middle">{t(UI.miqatLine)}</text>
        </g>
      </g>
      <rect className="ln" x="500" y="200" width="380" height="520" rx="170" fill="none" />
      <path className="ln-t" d="M530 260 Q690 190 850 260" />
      <circle className="flash" cx="260" cy="690" r="210" />
      <text className="ar-float" x="260" y="330" textAnchor="middle">لَبَّيْكَ اللَّهُمَّ عُمْرَةً</text>
      <path className="ln" d="M40 880 L460 880" />
      <g className="mover"><Couple x={260} y={880} s={1.3} outfit="both" /></g>
    </Svg>
  );
}

export const buildMiqat: Builder = (tl, q) => {
  tl.to(q(".clouds"), { x: -760, duration: 10 }, 0)
    .fromTo(q(".miqat-line"), { x: 60 }, { x: -560, duration: 4 }, 0.6)
    .fromTo(q(".flash"), { opacity: 0, scale: 0.4 }, { opacity: 0.85, scale: 1.15, svgOrigin: "260 690", duration: 0.9 }, 4.2)
    .to(q(".flash"), { opacity: 0, duration: 1.2 }, 5.1)
    .to(q(".o-travel"), { opacity: 0, duration: 0.6 }, 4.6)
    .to(q(".o-ihram"), { opacity: 1, duration: 0.6 }, 4.6)
    .fromTo(q(".ar-float"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.6 }, 5.6);
};

/* ── 4. ROAD TO MAKKAH ────────────────────────────────────── */

// Ridges start well left of the viewBox: on wide screens the art overflows its box.
function ridge(seed: number, width: number, base: number, amp: number, step: number) {
  const r = rng(seed);
  const x0 = -700;
  let d = `M${x0} ${base}`;
  for (let x = x0 + step; x <= width; x += step) d += ` L${x} ${base - amp * (0.35 + r() * 0.65)}`;
  return `${d} L${width} 900 L${x0} 900 Z`;
}
const FAR = ridge(3, 1800, 600, 120, 70);
const MID = ridge(11, 2200, 650, 170, 90);
const NEAR = ridge(29, 2700, 720, 140, 60);

export function RoadArt() {
  return (
    <Svg>
      <g className="bg">
        <circle className="glow" cx="760" cy="250" r="90" />
        <circle className="ln-t" cx="760" cy="250" r="62" />
      </g>
      <g className="far"><path className="ln-t fp" d={FAR} /></g>
      <g className="tower">
        <path className="ln fp" d="M470 640 L470 330 L530 330 L530 640 Z" />
        <circle className="ln fp" cx="500" cy="380" r="22" />
        <path className="ln" d="M478 330 L500 250 L522 330 M500 250 L500 205" />
        <path className="ln-gold" d="M492 205 a10 10 0 1 0 14 -12 a8 8 0 1 1 -14 12" />
      </g>
      <g className="mid"><path className="ln fp2" d={MID} /></g>
      <g className="near"><path className="ln fp" d={NEAR} /></g>
      <rect x="-700" y="790" width="2400" height="210" className="fp" />
      <path className="ln-b" d="M-700 790 L1700 790" />
      <g className="dashes">
        {range(46).map((i) => <path key={i} className="ln" d={`M${i * 80 - 640} 840 L${i * 80 - 600} 840`} />)}
      </g>
      <path className="ln" d="M-700 890 L1700 890" />

      <g className="sign">
        <path className="ln" d="M850 790 L850 640" />
        <rect className="fill-green" x="745" y="560" width="210" height="96" rx="8" />
        <text className="lbl light ar" x="850" y="596" textAnchor="middle">مكة المكرمة</text>
        <text className="lbl light" x="850" y="636" textAnchor="middle">MAKKAH <tspan className="km">80</tspan> km</text>
      </g>

      <g className="bus" transform="translate(190 640)">
        <g className="bounce">
          <path className="ln-b fp" d="M0 24 Q0 0 24 0 L330 0 Q362 0 372 40 L380 120 Q380 140 360 140 L20 140 Q0 140 0 120 Z" />
          {range(6).map((i) => <rect key={i} className="ln fill-sky" x={22 + i * 50} y="20" width="40" height="44" rx="6" />)}
          <path className="ln fill-sky" d="M330 20 L352 20 Q362 22 366 60 L330 64 Z" />
          <path className="ln-t" d="M0 88 L380 88" />
          <text className="lbl ink" x="40" y="118">UMRAH THAILAND</text>
        </g>
        <g className="wheel"><circle className="ln-b fp" cx="76" cy="146" r="26" /><path className="ln" d="M66 146 L86 146 M76 136 L76 156" /></g>
        <g className="wheel"><circle className="ln-b fp" cx="300" cy="146" r="26" /><path className="ln" d="M290 146 L310 146 M300 136 L300 156" /></g>
      </g>
    </Svg>
  );
}

export const buildRoad: Builder = (tl, q) => {
  const km = q(".km")[0];
  const d = { v: 80 };
  tl.to(q(".far"), { x: -300, duration: 10 }, 0)
    .to(q(".mid"), { x: -700, duration: 10 }, 0)
    .to(q(".near"), { x: -1100, duration: 10 }, 0)
    .to(q(".dashes"), { x: -1040, duration: 10 }, 0)
    .to(q(".wheel"), { rotation: 1440, transformOrigin: "50% 50%", duration: 10 }, 0)
    .to(d, { v: 0, duration: 9, onUpdate: () => { if (km) km.textContent = String(Math.round(d.v)); } }, 0)
    .fromTo(q(".tower"), { y: 300 }, { y: 0, duration: 4 }, 6);
};

/* ── 5. AL-MASJID AL-HARAM ────────────────────────────────── */

function Minaret({ x, h }: { x: number; h: number }) {
  const top = 820 - h;
  return (
    <g>
      <path className="ln fp" d={`M${x - 14} 820 L${x - 14} ${top} L${x + 14} ${top} L${x + 14} 820 Z`} />
      <path className="ln" d={`M${x - 22} ${top + h * 0.35} L${x + 22} ${top + h * 0.35} M${x - 20} ${top + 4} L${x + 20} ${top + 4}`} />
      <path className="ln fp" d={`M${x - 12} ${top} L${x} ${top - 60} L${x + 12} ${top} Z`} />
      <path className="ln-gold" d={`M${x - 6} ${top - 74} a8 8 0 1 0 11 -9 a6 6 0 1 1 -11 9`} />
    </g>
  );
}

export function HaramArt() {
  return (
    <Svg>
      <g className="zoom">
        <g className="bg">
          <path className="ln fp" d="M455 560 L455 130 L545 130 L545 560 Z" />
          <circle className="ln fp" cx="500" cy="200" r="32" />
          <path className="ln" d="M500 200 L500 180 M500 200 L514 208" />
          <path className="ln fp" d="M465 130 L500 60 L535 130 Z" />
          <path className="ln" d="M500 60 L500 26" />
          <Minaret x={140} h={560} />
          <Minaret x={860} h={560} />
          <Minaret x={300} h={440} />
          <Minaret x={700} h={440} />
        </g>
        <rect className="ln fp" x="70" y="600" width="860" height="220" />
        {range(10).map((i) => {
          const x = 76 + i * 85;
          if (i === 4 || i === 5) return null;
          return <path key={i} className="ln-t" d={`M${x + 8} 820 L${x + 8} 690 Q${x + 42} 640 ${x + 76} 690 L${x + 76} 820`} />;
        })}
        <path className="ln-b fill-glow" d="M430 820 L430 640 Q500 540 570 640 L570 820 Z" />
        <path className="ln-t" d="M446 820 L446 650 Q500 568 554 650 L554 820" />
        <path className="ln" d="M40 820 L960 820" />
      </g>

      <g className="inner">
        <rect x="0" y="0" width="1000" height="1000" className="fp" />
        <g className="rays">
          {range(18).map((i) => {
            const a = (i / 18) * Math.PI * 2;
            return <path key={i} className="ln-t ray" d={`M${r1(500 + Math.cos(a) * 200)} ${r1(560 + Math.sin(a) * 200)} L${r1(500 + Math.cos(a) * 470)} ${r1(560 + Math.sin(a) * 470)}`} />;
          })}
        </g>
        <ellipse className="glow" cx="500" cy="560" rx="260" ry="200" />
        <g className="kaaba-front">
          <rect className="ln fill-ink" x="370" y="400" width="260" height="320" />
          <rect className="fill-gold" x="370" y="460" width="260" height="30" />
          <path className="ln-gold" d="M380 475 L620 475" strokeDasharray="10 8" />
          <rect className="ln-gold" x="540" y="560" width="58" height="130" />
          <path className="ln" d="M330 720 L670 720" />
        </g>
        <path className="ln" d="M40 900 L960 900" />
        <g className="mover"><Couple x={260} y={900} s={1.05} outfit="ihram" /></g>
      </g>
    </Svg>
  );
}

export const buildHaram: Builder = (tl, q) => {
  tl.to(q(".zoom"), { scale: 2.8, svgOrigin: "500 700", duration: 5, ease: "power1.in" }, 0)
    .to(q(".zoom"), { opacity: 0, duration: 0.8 }, 4.4)
    .fromTo(q(".inner"), { opacity: 0 }, { opacity: 1, duration: 1.2 }, 4.5)
    .from(q(".kaaba-front"), { scale: 0.7, y: 40, svgOrigin: "500 720", duration: 2.5 }, 4.8)
    .to(q(".rays"), { rotation: 40, svgOrigin: "500 560", duration: 5 }, 5)
    .fromTo(q(".mover"), { x: -220, opacity: 0 }, { x: 0, opacity: 1, duration: 2.6 }, 6)
    .to(q(".rida-r"), { opacity: 0, duration: 0.6 }, 9);
};

/* ── 6. TAWAF (top-down) ──────────────────────────────────── */

const CROWD = (() => {
  const r = rng(42);
  return [0, 1, 2].map((g) =>
    range(34).map(() => {
      const rad = 210 + g * 80 + r() * 70;
      const a = r() * Math.PI * 2;
      return { x: r1(500 + Math.cos(a) * rad), y: r1(500 + Math.sin(a) * rad) };
    }),
  );
})();

export function TawafArt() {
  const { t } = useLang();
  return (
    <Svg>
      <g className="bg">
        {[470, 400, 330, 260, 190].map((r) => <circle key={r} className="ln-t" cx="500" cy="500" r={r} fill="none" />)}
        {range(24).map((i) => {
          const a = (i / 24) * Math.PI * 2;
          return <path key={i} className="ln-t faint" d={`M${r1(500 + Math.cos(a) * 180)} ${r1(500 + Math.sin(a) * 180)} L${r1(500 + Math.cos(a) * 470)} ${r1(500 + Math.sin(a) * 470)}`} />;
        })}
      </g>
      {CROWD.map((g, gi) => (
        <g key={gi} className={`crowd crowd-${gi}`}>
          {g.map((p, i) => <circle key={i} className="dot" cx={p.x} cy={p.y} r="6" />)}
        </g>
      ))}
      <path className="ln acc" d="M620 500 L975 500" />
      <path className="ln fp" d="M500 394 A76 76 0 0 0 394 500" />
      <polygon className="ln fill-ink" points="606,500 500,606 394,500 500,394" />
      <polygon className="ln-gold" points="586,500 500,586 414,500 500,414" fill="none" />
      <circle className="ln fp" cx="582" cy="418" r="11" />
      <circle className="fill-gold" cx="606" cy="500" r="8" />
      <text className="lbl ink" x="640" y="478">{t(UI.blackStone)}</text>
      <path
        className="trail"
        pathLength={1}
        d="M800 500 A300 300 0 1 0 200 500 A300 300 0 1 0 800 500"
      />
      <g className="me" transform="translate(800 500)">
        <circle className="halo" r="26" />
        <circle className="ln fill-white" cx="-7" cy="0" r="10" />
        <circle className="ln fp" cx="10" cy="4" r="9" />
      </g>
    </Svg>
  );
}

export const buildTawaf: Builder = (tl, q) => {
  const me = q(".me")[0];
  const trail = q(".trail")[0] as SVGPathElement | undefined;
  const count = q(".count")[0];
  const pips = q(".pip");
  const s = { a: 0 };
  tl.to(s, {
    a: 7,
    duration: 10,
    onUpdate: () => {
      const done = Math.min(7, Math.floor(s.a));
      const frac = s.a >= 7 ? 1 : s.a - done;
      const ang = -s.a * Math.PI * 2;
      me?.setAttribute("transform", `translate(${r1(500 + Math.cos(ang) * 300)} ${r1(500 + Math.sin(ang) * 300)})`);
      if (trail) trail.style.strokeDashoffset = String(1 - frac);
      if (count) count.textContent = String(Math.min(7, done + 1));
      pips.forEach((p, i) => p.classList.toggle("on", i < done));
    },
  }, 0);
};

/* ── 7. MAQAM IBRAHIM & ZAMZAM ────────────────────────────── */

export function MaqamArt() {
  return (
    <Svg>
      <g className="bg">
        <path className="ln-t" d="M0 560 L1000 560" />
        {range(11).map((i) => <path key={i} className="ln-t faint" d={`M500 400 L${i * 100} 1000`} />)}
        <path className="ln fill-ink" d="M0 110 L250 150 L250 560 L0 560 Z" />
        <path className="fill-gold" d="M0 190 L250 222 L250 250 L0 218 Z" />
      </g>
      <g className="maqam">
        <ellipse className="glow" cx="600" cy="520" rx="150" ry="170" />
        <rect className="ln fp" x="530" y="610" width="140" height="40" rx="4" />
        <path className="ln fill-glow" d="M548 610 L548 470 Q600 388 652 470 L652 610 Z" />
        <path className="ln-t" d="M574 610 L574 450 M600 610 L600 420 M626 610 L626 450 M548 520 L652 520 M548 570 L652 570" />
        <path className="ln fp" d="M588 400 L600 352 L612 400 Z" />
      </g>
      <g className="zamzam">
        <path className="ln fp" d="M790 560 L790 600 L850 600 L850 560" />
        <path className="ln" d="M770 560 L870 560" />
        <g className="drops">
          {[0, 1, 2].map((i) => <path key={i} className="drop fill-sky ln" d="M820 620 q-8 12 0 18 q8 -6 0 -18 Z" />)}
        </g>
        <ellipse className="ripple ln" cx="820" cy="760" rx="34" ry="8" fill="none" />
        <path className="ln fp" d="M780 740 L860 740 L850 800 L790 800 Z" />
      </g>
      <path className="ln" d="M40 900 L960 900" />
      <g className="mover"><Couple x={300} y={900} s={1.1} outfit="ihram" /></g>
    </Svg>
  );
}

export const buildMaqam: Builder = (tl, q) => {
  tl.from(q(".maqam"), { y: 60, opacity: 0, duration: 2 }, 0)
    .fromTo(q(".mover"), { x: -160, opacity: 0 }, { x: 0, opacity: 1, duration: 2.5 }, 0.5)
    .from(q(".zamzam"), { opacity: 0, y: 40, duration: 1.5 }, 4.5)
    .fromTo(q(".drop"), { y: 0, opacity: 0 }, { y: 120, opacity: 1, duration: 0.8, stagger: 0.27, repeat: 4 }, 5.5)
    .fromTo(q(".ripple"), { scale: 0.3, opacity: 0.9 }, { scale: 1.5, opacity: 0, svgOrigin: "820 760", duration: 0.8, repeat: 4 }, 5.9);
};

/* ── 8. SA'I ──────────────────────────────────────────────── */

export function SaiArt() {
  const { t } = useLang();
  return (
    <Svg>
      <g className="bg">
        <path className="ln" d="M20 220 L980 220" />
        {range(12).map((i) => (
          <path key={i} className="ln-t" d={`M${20 + i * 80} 300 Q${60 + i * 80} 236 ${100 + i * 80} 300`} />
        ))}
        {range(13).map((i) => <path key={i} className="ln-t faint" d={`M${20 + i * 80} 300 L${20 + i * 80} 800`} />)}
      </g>
      <rect className="green-beam" x="430" y="220" width="140" height="580" />
      <rect className="fill-green" x="430" y="222" width="140" height="14" rx="7" />
      <text className="lbl green" x="500" y="268" textAnchor="middle">{t(UI.greenZone)}</text>
      <path className="ln fp2" d="M30 800 Q50 690 130 676 Q210 690 236 800 Z" />
      <path className="ln-t" d="M80 760 L120 720 M150 770 L190 730" />
      <path className="ln fp2" d="M764 800 Q790 690 870 676 Q950 690 970 800 Z" />
      <path className="ln-t" d="M810 760 L850 720 M880 770 L920 730" />
      <path className="ln-b" d="M20 800 L980 800" />
      <text className="lbl ink big" x="133" y="852" textAnchor="middle">{t(UI.safa)}</text>
      <text className="lbl ink big" x="867" y="852" textAnchor="middle">{t(UI.marwah)}</text>
      <g className="mover" transform="translate(230 0)">
        <g className="flip"><Couple x={0} y={800} s={0.95} outfit="ihram" /></g>
      </g>
    </Svg>
  );
}

export const buildSai: Builder = (tl, q, root) => {
  const mover = q(".mover")[0];
  const flip = q(".flip")[0];
  const count = q(".count")[0];
  const pips = q(".pip");
  const s = { p: 0 };
  tl.to(s, {
    p: 7,
    duration: 10,
    onUpdate: () => {
      const lap = Math.min(6, Math.floor(s.p));
      const f = s.p >= 7 ? 1 : s.p - lap;
      const right = lap % 2 === 0;
      const x = right ? 230 + 540 * f : 770 - 540 * f;
      mover?.setAttribute("transform", `translate(${x} 0)`);
      flip?.setAttribute("transform", right ? "" : "scale(-1 1)");
      if (count) count.textContent = String(lap + 1);
      pips.forEach((p, i) => p.classList.toggle("on", i < Math.floor(s.p)));
      root.classList.toggle("jog", x > 440 && x < 560);
    },
  }, 0);
};

/* ── 9. TAHALLUL ──────────────────────────────────────────── */

export function HalqArt() {
  const { t } = useLang();
  return (
    <Svg>
      <g className="bg">
        <circle className="glow" cx="500" cy="600" r="380" />
        {STARS.slice(0, 30).map((s, i) => <circle key={i} className="star dark" cx={s.x} cy={s.y * 0.7} r={s.s} />)}
      </g>
      <g className="rays">
        {range(24).map((i) => {
          const a = (i / 24) * Math.PI * 2;
          return <path key={i} className="ln-gold ray" d={`M${r1(500 + Math.cos(a) * 170)} ${r1(600 + Math.sin(a) * 170)} L${r1(500 + Math.cos(a) * (300 + (i % 2) * 90))} ${r1(600 + Math.sin(a) * (300 + (i % 2) * 90))}`} />;
        })}
      </g>
      <g>
        <rect className="ln fill-ink" x="420" y="520" width="160" height="200" />
        <rect className="fill-gold" x="420" y="560" width="160" height="18" />
      </g>
      <g className="scissors">
        <g className="blade-a"><path className="ln fp" d="M700 330 L860 300 L700 318 Z" /><circle className="ln fp" cx="672" cy="350" r="20" /></g>
        <g className="blade-b"><path className="ln fp" d="M700 330 L860 360 L700 342 Z" /><circle className="ln fp" cx="672" cy="310" r="20" /></g>
        <circle className="fill-gold" cx="700" cy="330" r="5" />
      </g>
      <g className="hairs">
        {[0, 1, 2, 3].map((i) => <path key={i} className="hair ln" d={`M${820 + i * 12} 380 q8 16 -2 30 q-8 14 2 26`} />)}
      </g>
      <text className="ar-float done" x="500" y="230" textAnchor="middle">تقبّل الله منا ومنكم</text>
      <text className="lbl ink done big" x="500" y="300" textAnchor="middle">{t(UI.complete)}</text>
      <path className="ln" d="M40 880 L960 880" />
      <g className="mover"><Couple x={240} y={880} s={1.15} outfit="ihram" /></g>
    </Svg>
  );
}

export const buildHalq: Builder = (tl, q) => {
  tl.fromTo(q(".blade-a"), { rotation: 0 }, { rotation: -16, svgOrigin: "700 330", duration: 0.45, repeat: 5, yoyo: true }, 0.4)
    .fromTo(q(".blade-b"), { rotation: 0 }, { rotation: 16, svgOrigin: "700 330", duration: 0.45, repeat: 5, yoyo: true }, 0.4)
    .fromTo(q(".hair"), { y: 0, opacity: 1 }, { y: 200, opacity: 0, stagger: 0.45, duration: 1.4 }, 0.8)
    .to(q(".scissors"), { opacity: 0, duration: 0.6 }, 4)
    .fromTo(q(".rays"), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, svgOrigin: "500 600", duration: 2 }, 4.4)
    .to(q(".rays"), { rotation: 30, svgOrigin: "500 600", duration: 5.5 }, 4.5)
    .fromTo(q(".done"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.4, stagger: 0.5 }, 5.2)
    .to(q(".o-ihram"), { opacity: 0, duration: 0.6 }, 7.4)
    .to(q(".o-travel"), { opacity: 1, duration: 0.6 }, 7.4);
};

/* ── 10. ZIYARAH ──────────────────────────────────────────── */

const ROUTE = "M430 770 C 360 610, 560 450, 590 270";
const PINS: { x: number; y: number; mk: boolean }[] = [
  { x: 320, y: 700, mk: true }, { x: 350, y: 860, mk: true }, { x: 560, y: 840, mk: true },
  { x: 700, y: 300, mk: false }, { x: 690, y: 170, mk: false }, { x: 500, y: 160, mk: false }, { x: 470, y: 300, mk: false },
];

export function ZiyarahArt() {
  const { t } = useLang();
  return (
    <Svg>
      <g className="bg">
        <path className="ln-t" d="M150 0 Q190 200 230 330 Q280 480 300 620 Q330 790 380 1000" />
        <path className="ln-t faint" d="M120 0 Q160 200 200 330 Q250 480 270 620 Q300 790 350 1000" />
        {STARS.slice(0, 40).map((s, i) => <circle key={i} className="star dark" cx={420 + (s.x % 560)} cy={60 + s.y * 1.5} r={s.s * 0.8} />)}
      </g>
      <path className="ln-t" d={ROUTE} strokeDasharray="6 12" />
      <path className="route-draw" pathLength={1} d={ROUTE} />
      <g className="train"><rect className="ln fill-white" x="-26" y="-12" width="52" height="24" rx="12" /><path className="ln-t" d="M-14 -2 L14 -2" /></g>
      <text className="lbl ink" x="600" y="560">{t(UI.train)}</text>

      <g>
        <circle className="glow" cx="430" cy="770" r="60" />
        <rect className="ln fill-ink" x="414" y="754" width="32" height="32" />
        <rect className="fill-gold" x="414" y="762" width="32" height="5" />
        <text className="lbl ink big" x="470" y="790">{t(UI.makkah)}</text>
      </g>
      <g>
        <circle className="glow" cx="590" cy="270" r="60" />
        <path className="ln fill-green" d="M566 280 Q566 244 590 236 Q614 244 614 280 Z" />
        <path className="ln" d="M560 280 L620 280 M630 280 L630 220 M626 220 L634 220" />
        <text className="lbl ink big" x="530" y="330" textAnchor="end">{t(UI.madinah)}</text>
      </g>

      {PINS.map((p, i) => (
        <g key={i} className={`pin ${p.mk ? "mk" : "md"}`} transform={`translate(${p.x} ${p.y})`}>
          <g className="pin-in">
            <path className={`ln ${p.mk ? "fill-gold" : "fill-green"}`} d="M0 0 C-18 -20 -18 -44 0 -44 C18 -44 18 -20 0 0 Z" />
            <text className={`pin-n ${p.mk ? "" : "light"}`} x="0" y="-22" textAnchor="middle">{i + 1}</text>
          </g>
        </g>
      ))}
    </Svg>
  );
}

export const buildZiyarah: Builder = (tl, q) => {
  const path = q(".route-draw")[0] as SVGPathElement | undefined;
  const train = q(".train")[0];
  const len = path?.getTotalLength() ?? 0;
  const s = { t: 0 };
  const place = () => {
    if (!path || !train) return;
    const p = path.getPointAtLength(s.t * len);
    train.setAttribute("transform", `translate(${p.x} ${p.y})`);
  };
  place();
  tl.from(q(".pin.mk .pin-in"), { scale: 0, opacity: 0, transformOrigin: "50% 100%", stagger: 0.4, duration: 0.6 }, 0.3)
    .fromTo(path ?? {}, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 5 }, 2)
    .to(s, { t: 1, duration: 5, onUpdate: place }, 2)
    .from(q(".pin.md .pin-in"), { scale: 0, opacity: 0, transformOrigin: "50% 100%", stagger: 0.4, duration: 0.6 }, 7);
};

/* ── registry ─────────────────────────────────────────────── */

export const ARTS: Record<SceneId, { Art: () => JSX.Element; build: Builder; hud?: "round" | "lap" }> = {
  home: { Art: HomeArt, build: buildHome },
  airport: { Art: AirportArt, build: buildAirport },
  miqat: { Art: MiqatArt, build: buildMiqat },
  road: { Art: RoadArt, build: buildRoad },
  haram: { Art: HaramArt, build: buildHaram },
  tawaf: { Art: TawafArt, build: buildTawaf, hud: "round" },
  maqam: { Art: MaqamArt, build: buildMaqam },
  sai: { Art: SaiArt, build: buildSai, hud: "lap" },
  halq: { Art: HalqArt, build: buildHalq },
  ziyarah: { Art: ZiyarahArt, build: buildZiyarah },
};
