"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePlannerPrices, type PlannerPrices } from "@/lib/usePlannerPrices";
import { useLang, type Lang, type L } from "./i18n";

/* ── copy ─────────────────────────────────────────────────── */

const C = {
  eyebrow: { th: "เครื่องมือวางแผน", en: "Planning tool", ar: "أداة التخطيط" },
  title: { th: "คำนวณค่าใช้จ่ายอุมเราะห์", en: "Umrah Cost Calculator", ar: "حاسبة تكاليف العمرة" },
  sub: {
    th: "เลือกระดับแพ็กเกจ จำนวนคน และจำนวนคืน ระบบประมาณราคาให้ทันที และปรับละเอียดได้ทุกรายการ",
    en: "Pick a package level, group size and nights — get an instant estimate, then fine-tune every line.",
    ar: "اختر مستوى الباقة وعدد الأشخاص والليالي لتحصل على تقدير فوري، ثم عدّل كل بند كما تشاء.",
  },
  tier: { th: "ระดับแพ็กเกจ", en: "Package level", ar: "مستوى الباقة" },
  custom: { th: "กำหนดเอง", en: "Custom", ar: "مخصّص" },
  from: { th: "ต่อคน", en: "per person", ar: "للشخص" },
  travelers: { th: "จำนวนผู้เดินทาง", en: "Travellers", ar: "عدد المسافرين" },
  people: { th: "คน", en: "people", ar: "أشخاص" },
  nMakkah: { th: "คืนที่มักกะฮ์", en: "Nights in Makkah", ar: "ليالٍ في مكة" },
  nMadinah: { th: "คืนที่มะดีนะฮ์", en: "Nights in Madinah", ar: "ليالٍ في المدينة" },
  nights: { th: "คืน", en: "nights", ar: "ليالٍ" },
  details: { th: "ปรับรายละเอียดเอง", en: "Customise the details", ar: "تخصيص التفاصيل" },
  airline: { th: "สายการบิน", en: "Airline", ar: "شركة الطيران" },
  hotel: { th: "โรงแรม", en: "Hotel", ar: "الفندق" },
  transport: { th: "รถรับส่ง (ต่อวัน)", en: "Transport (per day)", ar: "النقل (يوميًا)" },
  guide: { th: "ไกด์", en: "Guide", ar: "المرشد" },
  food: { th: "อาหาร", en: "Meals", ar: "الوجبات" },
  extras: { th: "ซิยาเราะฮ์และทัวร์เสริม", en: "Ziyarah & extra tours", ar: "الزيارات والجولات الإضافية" },
  visa: { th: "วีซ่า", en: "Visa", ar: "التأشيرة" },
  flight: { th: "ตั๋วเครื่องบิน", en: "Flights", ar: "الطيران" },
  total: { th: "รวมโดยประมาณ", en: "Estimated total", ar: "الإجمالي التقديري" },
  perPerson: { th: "ตกคนละ", en: "Per person", ar: "للشخص الواحد" },
  rooms: { th: "ห้องพัก (ห้องละ 2 คน)", en: "rooms (2 per room)", ar: "غرف (شخصان لكل غرفة)" },
  days: { th: "วัน", en: "days", ar: "أيام" },
  note: {
    th: "เป็นราคาประมาณการ อาจเปลี่ยนแปลงตามช่วงเวลาเดินทางและความพร้อมของบริการ",
    en: "An estimate only — prices vary with travel dates and availability.",
    ar: "السعر تقديري وقد يتغيّر حسب موعد السفر وتوفّر الخدمات.",
  },
  line: { th: "ส่งแผนนี้ให้ทีมงานทาง LINE", en: "Send this plan to us on LINE", ar: "أرسل هذه الخطة إلينا عبر LINE" },
  popular: { th: "ยอดนิยม", en: "Popular", ar: "الأكثر طلبًا" },
} satisfies Record<string, L>;

const ic = (d: string) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);
const TIER_ICONS = [
  ic("M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z"),
  ic("M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6M9 10h.01M15 10h.01"),
  ic("M2 8l4.5 4L12 4l5.5 8L22 8l-2 11H4z"),
];

export const LineIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 10.3C24 4.9 18.6.6 12 .6S0 4.9 0 10.3c0 4.8 4.3 8.8 10 9.6.4.1.9.3 1.1.6.1.3.1.8 0 1.1l-.2 1c0 .3-.2 1.2 1 .6 1.3-.5 6.9-4.1 9.4-7C23.2 14.4 24 12.5 24 10.3zM7.7 13.2H5.3c-.3 0-.6-.3-.6-.6V7.8c0-.3.3-.6.6-.6s.6.3.6.6v4.1h1.8c.3 0 .6.3.6.6s-.3.7-.6.7zm2.5-.6c0 .3-.3.6-.6.6s-.6-.3-.6-.6V7.8c0-.3.3-.6.6-.6s.6.3.6.6v4.8zm5.7 0c0 .3-.2.5-.4.6h-.2c-.2 0-.4-.1-.5-.3l-2.4-3.3v2.9c0 .3-.3.6-.6.6s-.6-.3-.6-.6V7.8c0-.3.2-.5.4-.6h.2c.2 0 .4.1.5.3l2.5 3.3V7.8c0-.3.3-.6.6-.6s.6.3.6.6v4.8zm3.9-3c.3 0 .6.3.6.6s-.3.6-.6.6h-1.8v1.1h1.8c.3 0 .6.3.6.6s-.3.6-.6.6h-2.4c-.3 0-.6-.3-.6-.6V7.8c0-.3.3-.6.6-.6h2.4c.3 0 .6.3.6.6s-.3.6-.6.6h-1.8v1.2h1.8z" />
  </svg>
);

type TierId = "eco" | "std" | "pre";
const TIERS: { id: TierId; name: L; airline: number; hotel: number; guide: number; food: number; vip: boolean }[] = [
  { id: "eco", name: { th: "ประหยัด", en: "Economy", ar: "اقتصادي" }, airline: 0, hotel: 1, guide: 0, food: 0, vip: false },
  { id: "std", name: { th: "มาตรฐาน", en: "Standard", ar: "قياسي" }, airline: 3, hotel: 2, guide: 1, food: 1, vip: false },
  { id: "pre", name: { th: "พรีเมียม", en: "Premium", ar: "مميّز" }, airline: 5, hotel: 3, guide: 3, food: 3, vip: true },
];

// Option names in data/planner.ts are Thai (and admin-editable); translate the known ones.
const NAMES: Record<string, { en: string; ar: string }> = {
  "Budget (ประหยัด)": { en: "Budget airline", ar: "طيران اقتصادي" },
  "รถเก๋ง": { en: "Sedan", ar: "سيارة سيدان" },
  "รถตู้ธรรมดา": { en: "Standard van", ar: "فان عادي" },
  "รถตู้ VIP": { en: "VIP van", ar: "فان VIP" },
  "รถมินิบัส": { en: "Minibus", ar: "حافلة صغيرة" },
  "รถบัส": { en: "Coach", ar: "حافلة كبيرة" },
  "ไม่ต้องการ": { en: "None", ar: "بدون" },
  "เฉพาะมักกะฮ์": { en: "Makkah only", ar: "مكة فقط" },
  "เฉพาะมะดีนะฮ์": { en: "Madinah only", ar: "المدينة فقط" },
  "ฟูลทริป": { en: "Full trip", ar: "الرحلة كاملة" },
  "จัดหาเอง": { en: "Self-arranged", ar: "على حسابك" },
  "เฉพาะอาหารเช้า": { en: "Breakfast only", ar: "إفطار فقط" },
  "ฮาฟบอร์ด 2 มื้อ": { en: "Half board (2 meals)", ar: "وجبتان يوميًا" },
  "ฟูลบอร์ด 3 มื้อ": { en: "Full board (3 meals)", ar: "ثلاث وجبات يوميًا" },
  "Ziarah มักกะฮ์": { en: "Makkah Ziyarah", ar: "زيارة معالم مكة" },
  "Ziarah มะดีนะฮ์": { en: "Madinah Ziyarah", ar: "زيارة معالم المدينة" },
  "Ziarah ฏออิฟ": { en: "Taif Ziyarah", ar: "زيارة الطائف" },
  "Al-Ula Tour": { en: "AlUla tour", ar: "جولة العُلا" },
  "ทะเลแดง (Red Sea)": { en: "Red Sea", ar: "البحر الأحمر" },
  "Jeddah City Tour": { en: "Jeddah city tour", ar: "جولة في جدة" },
};

function optName(name: string, lang: Lang) {
  if (lang === "th") return name.replace(/^Ziarah /, "ซิยาเราะฮ์");
  const stars = name.match(/^(\d)\s*ดาว$/);
  if (stars) return lang === "en" ? `${stars[1]}-star` : `${stars[1]} نجوم`;
  return NAMES[name]?.[lang] ?? name;
}

/* ── pricing ──────────────────────────────────────────────── */

interface Sel {
  airline: number; hotel: number; transport: number; guide: number; food: number; extras: number[];
}

function autoTransport(n: number, vip: boolean, count: number) {
  const i = n <= 3 ? 0 : n <= 7 ? (vip ? 2 : 1) : n <= 14 ? 3 : 4;
  return Math.min(i, count - 1);
}

function tierSel(tier: (typeof TIERS)[number], n: number, p: PlannerPrices): Sel {
  const clamp = (i: number, arr: unknown[]) => Math.min(i, arr.length - 1);
  return {
    airline: clamp(tier.airline, p.airlines),
    hotel: clamp(tier.hotel, p.hotelStars),
    transport: autoTransport(n, tier.vip, p.transports.length),
    guide: clamp(tier.guide, p.guides),
    food: clamp(tier.food, p.foodOptions),
    extras: [],
  };
}

function compute(p: PlannerPrices, sel: Sel, n: number, mk: number, md: number) {
  const days = mk + md;
  const rooms = Math.ceil(n / 2);
  const hotel = p.hotelStars[sel.hotel] ?? p.hotelStars[0];
  const parts = {
    flight: (p.airlines[sel.airline]?.price ?? 0) * n,
    visa: p.visaPrice * n,
    hotel: rooms * (hotel.makkah * mk + hotel.madinah * md),
    transport: (p.transports[sel.transport]?.price ?? 0) * days,
    guide: p.guides[sel.guide]?.price ?? 0,
    food: (p.foodOptions[sel.food]?.pricePerDay ?? 0) * days * n,
    extras: sel.extras.reduce((s, i) => s + (p.extras[i]?.price ?? 0), 0),
  };
  const raw = Object.values(parts).reduce((a, b) => a + b, 0);
  const perPerson = Math.ceil(raw / n / 100) * 100;
  return { parts, rooms, days, perPerson, total: perPerson * n };
}

const PART_KEYS = ["flight", "hotel", "visa", "transport", "food", "guide", "extras"] as const;
const PART_LABEL: Record<(typeof PART_KEYS)[number], L> = {
  flight: C.flight, hotel: C.hotel, visa: C.visa, transport: C.transport, food: C.food, guide: C.guide, extras: C.extras,
};

/* ── small UI pieces ──────────────────────────────────────── */

function useCountUp(target: number, ms = 650) {
  const [v, setV] = useState(target);
  const cur = useRef(target);
  useEffect(() => {
    const from = cur.current;
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const k = Math.min(1, (now - start) / ms);
      cur.current = from + (target - from) * (1 - Math.pow(1 - k, 3));
      setV(cur.current);
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return Math.round(v);
}

function Stepper({ label, value, min, max, unit, onChange }: {
  label: string; value: number; min: number; max: number; unit: string; onChange: (v: number) => void;
}) {
  return (
    <div className="uc-field">
      <span className="uc-label">{label}</span>
      <div className="uc-stepper">
        <button type="button" aria-label="−" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min}>−</button>
        <output>{value} <small>{unit}</small></output>
        <button type="button" aria-label="+" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max}>+</button>
      </div>
    </div>
  );
}

function Slider({ label, value, min, max, unit, onChange }: {
  label: string; value: number; min: number; max: number; unit: string; onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="uc-field">
      <span className="uc-label">{label} <b>{value} {unit}</b></span>
      <input
        type="range" min={min} max={max} value={value}
        style={{ ["--pct" as string]: `${pct}%` }}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}

function Chips({ label, options, value, onPick }: {
  label: string; options: { name: string; sub?: string }[]; value: number; onPick: (i: number) => void;
}) {
  return (
    <div className="uc-field">
      <span className="uc-label">{label}</span>
      <div className="uc-chips">
        {options.map((o, i) => (
          <button key={i} type="button" className={i === value ? "on" : ""} aria-pressed={i === value} onClick={() => onPick(i)}>
            {o.name}{o.sub && <small>{o.sub}</small>}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── main ─────────────────────────────────────────────────── */

export default function CostCalculator() {
  const { prices } = usePlannerPrices();
  const { lang, t, num } = useLang();
  const [n, setN] = useState(2);
  const [mk, setMk] = useState(5);
  const [md, setMd] = useState(3);
  const [tier, setTier] = useState<TierId>("std");
  const [over, setOver] = useState<Partial<Sel>>({});
  const [open, setOpen] = useState(false);

  const baht = (v: number) => `${num(v)} ฿`;
  const tierDef = TIERS.find((x) => x.id === tier)!;
  const sel: Sel = { ...tierSel(tierDef, n, prices), ...over };
  const isCustom = Object.keys(over).length > 0;
  const res = compute(prices, sel, n, mk, md);

  const tierPrices = useMemo(
    () => TIERS.map((x) => compute(prices, tierSel(x, n, prices), n, mk, md).perPerson),
    [prices, n, mk, md],
  );

  const total = useCountUp(res.total);
  const pp = useCountUp(res.perPerson);
  const sum = Object.values(res.parts).reduce((a, b) => a + b, 0) || 1;

  const pickTier = (id: TierId) => { setTier(id); setOver({}); };
  const set = <K extends keyof Sel>(k: K, v: Sel[K]) => setOver((o) => ({ ...o, [k]: v }));
  const toggleExtra = (i: number) =>
    set("extras", sel.extras.includes(i) ? sel.extras.filter((x) => x !== i) : [...sel.extras, i]);

  const hotel = prices.hotelStars[sel.hotel];
  const lineText = [
    `【${t(C.title)}】`,
    `${t(C.tier)}: ${isCustom ? t(C.custom) : t(tierDef.name)}`,
    `${t(C.travelers)}: ${n} ${t(C.people)}`,
    `${t(C.nMakkah)}: ${mk} · ${t(C.nMadinah)}: ${md}`,
    `${t(C.airline)}: ${optName(prices.airlines[sel.airline]?.name ?? "", lang)}`,
    `${t(C.hotel)}: ${optName(hotel?.label ?? "", lang)}`,
    `${t(C.transport)}: ${optName(prices.transports[sel.transport]?.name ?? "", lang)}`,
    `${t(C.guide)}: ${optName(prices.guides[sel.guide]?.name ?? "", lang)}`,
    `${t(C.food)}: ${optName(prices.foodOptions[sel.food]?.name ?? "", lang)}`,
    sel.extras.length ? `${t(C.extras)}: ${sel.extras.map((i) => optName(prices.extras[i]?.name ?? "", lang)).join(", ")}` : "",
    `${t(C.total)}: ${baht(res.total)} (${t(C.perPerson)} ${baht(res.perPerson)})`,
  ].filter(Boolean).join("\n");

  return (
    <div className="wrap uc">
      <header className="uc-head">
        <span className="uj-eyebrow">{t(C.eyebrow)}</span>
        <h2>{t(C.title)}</h2>
        <p>{t(C.sub)}</p>
      </header>

      <div className="uc-grid">
        <div className="uc-form">
          <div className="uc-field">
            <span className="uc-label">{t(C.tier)}</span>
            <div className="uc-tiers">
              {TIERS.map((x, i) => {
                const on = !isCustom && tier === x.id;
                const ts = tierSel(x, n, prices);
                return (
                  <button key={x.id} type="button" className={`uc-tier${on ? " on" : ""}`} aria-pressed={on} onClick={() => pickTier(x.id)}>
                    {x.id === "std" && <span className="uc-pop">{t(C.popular)}</span>}
                    <span className="uc-tier-top">
                      <span className="uc-tier-ic" aria-hidden="true">{TIER_ICONS[i]}</span>
                      <span className="uc-check" aria-hidden="true">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                      </span>
                    </span>
                    <b>{t(x.name)}</b>
                    <span>{optName(prices.hotelStars[ts.hotel]?.label ?? "", lang)} · {optName(prices.airlines[ts.airline]?.name ?? "", lang)}</span>
                    <em>{baht(tierPrices[i])} <small>/ {t(C.from)}</small></em>
                  </button>
                );
              })}
            </div>
          </div>

          <Stepper label={t(C.travelers)} value={n} min={1} max={20} unit={t(C.people)} onChange={setN} />
          <div className="uc-two">
            <Slider label={t(C.nMakkah)} value={mk} min={1} max={20} unit={t(C.nights)} onChange={setMk} />
            <Slider label={t(C.nMadinah)} value={md} min={0} max={15} unit={t(C.nights)} onChange={setMd} />
          </div>

          <button type="button" className={`uc-toggle${open ? " open" : ""}`} aria-expanded={open} onClick={() => setOpen(!open)}>
            {t(C.details)} {isCustom && <span className="uc-badge">{t(C.custom)}</span>}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M6 9l6 6 6-6" /></svg>
          </button>

          {open && (
            <div className="uc-details">
              <Chips label={t(C.airline)} value={sel.airline} onPick={(i) => set("airline", i)}
                options={prices.airlines.map((a) => ({ name: optName(a.name, lang), sub: baht(a.price) }))} />
              <Chips label={t(C.hotel)} value={sel.hotel} onPick={(i) => set("hotel", i)}
                options={prices.hotelStars.map((h) => ({ name: optName(h.label, lang), sub: `${baht(h.makkah)} / ${baht(h.madinah)}` }))} />
              <Chips label={t(C.transport)} value={sel.transport} onPick={(i) => set("transport", i)}
                options={prices.transports.map((x) => ({ name: optName(x.name, lang), sub: baht(x.price) }))} />
              <Chips label={t(C.guide)} value={sel.guide} onPick={(i) => set("guide", i)}
                options={prices.guides.map((x) => ({ name: optName(x.name, lang), sub: x.price ? baht(x.price) : undefined }))} />
              <Chips label={t(C.food)} value={sel.food} onPick={(i) => set("food", i)}
                options={prices.foodOptions.map((x) => ({ name: optName(x.name, lang), sub: x.pricePerDay ? `${baht(x.pricePerDay)}/${t(C.days)}` : undefined }))} />
              <div className="uc-field">
                <span className="uc-label">{t(C.extras)}</span>
                <div className="uc-chips">
                  {prices.extras.map((x, i) => {
                    const on = sel.extras.includes(i);
                    return (
                      <button key={i} type="button" className={on ? "on" : ""} aria-pressed={on} onClick={() => toggleExtra(i)}>
                        {on ? "✓ " : "+ "}{optName(x.name, lang)}<small>{baht(x.price)}</small>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        <aside className="uc-result" aria-live="polite">
          <span className="uc-label">{t(C.total)}</span>
          <div className="uc-total">{num(total)} <span>฿</span></div>
          <div className="uc-pp">{t(C.perPerson)} <b>{baht(pp)}</b></div>

          <div className="uc-bar" role="img" aria-label={t(C.total)}>
            {PART_KEYS.filter((k) => res.parts[k] > 0).map((k) => (
              <span key={k} className={`seg seg-${k}`} style={{ width: `${(res.parts[k] / sum) * 100}%` }} />
            ))}
          </div>
          <ul className="uc-legend">
            {PART_KEYS.filter((k) => res.parts[k] > 0).map((k) => (
              <li key={k}>
                <i className={`seg-${k}`} />
                <span>{t(PART_LABEL[k])}</span>
                <b>{baht(res.parts[k])}</b>
              </li>
            ))}
          </ul>
          <p className="uc-meta">
            {res.rooms} {t(C.rooms)} · {res.days} {t(C.days)}
          </p>

          <a
            className="uc-cta"
            href={`https://line.me/R/oaMessage/@umrahthailand/?${encodeURIComponent(lineText)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LineIcon />
            {t(C.line)}
          </a>
          <p className="uc-note">{t(C.note)}</p>
        </aside>
      </div>
    </div>
  );
}
