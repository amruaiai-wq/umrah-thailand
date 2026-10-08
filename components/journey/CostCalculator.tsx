"use client";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { usePlannerPrices, type PlannerPrices } from "@/lib/usePlannerPrices";
import { useLang, type Lang, type L } from "./i18n";

/* ── copy ─────────────────────────────────────────────────── */

const C = {
  kicker: { th: "ออกแบบทริปเอง", en: "Build your own trip", ar: "صمّم رحلتك" },
  title: { th: "ออกแบบอุมเราะห์ของคุณเอง ทีละรายการ", en: "Build your own Umrah, line by line", ar: "صمّم عمرتك بنفسك، بندًا بندًا" },
  sub: {
    th: "ไม่ต้องจำใจซื้อแพ็กเกจสำเร็จรูป เลือกสายการบิน โรงแรม รถ ไกด์ อาหาร และซิยาเราะฮ์ได้เองทุกบรรทัด ราคาเปลี่ยนให้ดูทันที แล้วส่งแผนนี้ให้ทีมงานช่วยจัด",
    en: "No fixed package to settle for. Pick the airline, hotels, transport, guide, meals and ziyarah yourself — the price updates with every change — then send the plan to our team.",
    ar: "لا حاجة إلى باقة جاهزة. اختر الطيران والفنادق والنقل والمرشد والوجبات والزيارات بنفسك، ويتحدّث السعر مع كل تغيير، ثم أرسل الخطة إلى فريقنا.",
  },
  statLines: { th: "หมวดที่เลือกเองได้", en: "lines you choose", ar: "بنود تختارها" },
  statOpts: { th: "ตัวเลือกให้ผสมกัน", en: "options to mix", ar: "خيارًا للمزج" },
  statFee: { th: "ค่าวางแผนกับทีมงาน", en: "planning fee", ar: "رسوم التخطيط" },
  start: { th: "เริ่มจากแพ็กเกจ", en: "Start from a preset", ar: "ابدأ من باقة" },
  startHint: { th: "แล้วปรับทุกบรรทัดด้านล่างได้ตามใจ", en: "then change any line below", ar: "ثم عدّل أي بند بالأسفل" },
  edited: { th: "ปรับเอง", en: "edited", ar: "معدّل" },
  editedN: { th: "บรรทัดที่ปรับเอง", en: "lines edited", ar: "بنود معدّلة" },
  reset: { th: "คืนค่าแพ็กเกจ", en: "Reset to preset", ar: "إعادة الباقة" },
  pp: { th: "/ คน", en: "/ person", ar: "/ للشخص" },
  travelers: { th: "ผู้เดินทาง", en: "Travellers", ar: "المسافرون" },
  people: { th: "คน", en: "people", ar: "أشخاص" },
  nMakkah: { th: "คืนที่มักกะฮ์", en: "Nights in Makkah", ar: "ليالٍ في مكة" },
  nMadinah: { th: "คืนที่มะดีนะฮ์", en: "Nights in Madinah", ar: "ليالٍ في المدينة" },
  nights: { th: "คืน", en: "nights", ar: "ليالٍ" },
  flight: { th: "ตั๋วเครื่องบิน", en: "Flights", ar: "الطيران" },
  subFlight: { th: "ราคาต่อคน", en: "per person", ar: "للشخص" },
  hotel: { th: "โรงแรม", en: "Hotels", ar: "الفنادق" },
  subHotel: { th: "ต่อห้องต่อคืน · มักกะฮ์ / มะดีนะฮ์", en: "per room per night · Makkah / Madinah", ar: "للغرفة لليلة · مكة / المدينة" },
  transport: { th: "รถรับส่ง", en: "Transport", ar: "النقل" },
  subTransport: { th: "ต่อวัน ทั้งกลุ่ม", en: "per day, whole group", ar: "يوميًا للمجموعة" },
  guide: { th: "ไกด์", en: "Guide", ar: "المرشد" },
  subGuide: { th: "ทั้งทริป ทั้งกลุ่ม", en: "whole trip, whole group", ar: "للرحلة والمجموعة" },
  food: { th: "อาหาร", en: "Meals", ar: "الوجبات" },
  subFood: { th: "ต่อคนต่อวัน", en: "per person per day", ar: "للشخص يوميًا" },
  extras: { th: "ซิยาเราะฮ์และทัวร์เสริม", en: "Ziyarah & extra tours", ar: "الزيارات والجولات" },
  subExtras: { th: "เลือกได้หลายรายการ ทั้งกลุ่ม", en: "pick any, whole group", ar: "اختر ما تشاء للمجموعة" },
  visa: { th: "วีซ่าอุมเราะห์", en: "Umrah visa", ar: "تأشيرة العمرة" },
  subVisa: { th: "รวมให้อัตโนมัติ ต่อคน", en: "included automatically, per person", ar: "مضافة تلقائيًا للشخص" },
  none: { th: "ยังไม่ได้เลือก", en: "none selected", ar: "لم يُختر شيء" },
  receipt: { th: "ใบประเมินราคา", en: "Your estimate", ar: "تقدير رحلتك" },
  days: { th: "วัน", en: "days", ar: "أيام" },
  rooms: { th: "ห้อง", en: "rooms", ar: "غرف" },
  total: { th: "รวมโดยประมาณ", en: "Estimated total", ar: "الإجمالي التقديري" },
  perPerson: { th: "ตกคนละ", en: "Per person", ar: "للشخص الواحد" },
  line: { th: "ส่งแผนนี้ให้ทีมงานทาง LINE", en: "Send this plan to us on LINE", ar: "أرسل هذه الخطة عبر LINE" },
  note: {
    th: "เป็นราคาประมาณการ อาจเปลี่ยนแปลงตามช่วงเวลาเดินทางและความพร้อมของบริการ",
    en: "An estimate only — prices vary with travel dates and availability.",
    ar: "السعر تقديري وقد يتغيّر حسب موعد السفر وتوفّر الخدمات.",
  },
  plan: { th: "แผนอุมเราะห์ของฉัน", en: "My Umrah plan", ar: "خطة عمرتي" },
  copied: {
    th: "คัดลอกแผนแล้ว — เพิ่มเพื่อน LINE ของเรา แล้ววางข้อความในแชทได้เลย",
    en: "Plan copied — add us on LINE and paste it into the chat.",
    ar: "تم نسخ الخطة — أضفنا على LINE والصقها في المحادثة.",
  },
} satisfies Record<string, L>;

const LINE_ID = "%40024xshvm";
// oaMessage (chat with the plan pre-filled) only works inside the LINE app on phones;
// desktop browsers get bounced to line.me's home page.
const isPhone = () => typeof navigator !== "undefined" && /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

export const LineIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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

/* ── count-up ─────────────────────────────────────────────── */

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

type PartKey = "flight" | "hotel" | "transport" | "guide" | "food" | "extras" | "visa";

/* ── small UI pieces ──────────────────────────────────────── */

function Stepper({ label, value, min, max, unit, onChange }: {
  label: string; value: number; min: number; max: number; unit: string; onChange: (v: number) => void;
}) {
  return (
    <div className="ul-basic">
      <span className="ul-label">{label}</span>
      <div className="ul-stepper">
        <button type="button" aria-label={`${label} −`} onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min}>−</button>
        <output aria-live="polite"><b>{value}</b> {unit}</output>
        <button type="button" aria-label={`${label} +`} onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max}>+</button>
      </div>
    </div>
  );
}

function Row({ no, label, sub, edited, editedLabel, amount, children }: {
  no: number; label: string; sub: string; edited?: boolean; editedLabel: string; amount: string; children: ReactNode;
}) {
  return (
    <li className={`ul-row${edited ? " is-edited" : ""}`}>
      <span className="ul-no">{String(no).padStart(2, "0")}</span>
      <div className="ul-head">
        <h3>{label}</h3>
        <p>{sub}</p>
        {edited && <span className="ul-flag">{editedLabel}</span>}
      </div>
      <div className="ul-opts">{children}</div>
      {/* re-keyed so the value flashes when it changes */}
      <output className="ul-amt" key={amount}>{amount}</output>
    </li>
  );
}

function Opt({ on, name, price, multi, onClick }: {
  on: boolean; name: string; price?: string; multi?: boolean; onClick: () => void;
}) {
  return (
    <button
      type="button"
      role={multi ? "checkbox" : "radio"}
      aria-checked={on}
      className={`ul-opt${on ? " on" : ""}`}
      onClick={onClick}
    >
      <span>{name}</span>
      {price && <small>{price}</small>}
    </button>
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

  const baht = (v: number) => `${num(v)} ฿`;
  const tierDef = TIERS.find((x) => x.id === tier)!;
  const preset = tierSel(tierDef, n, prices);
  const sel: Sel = { ...preset, ...over };
  const res = compute(prices, sel, n, mk, md);

  // A line counts as edited only when it actually differs from the preset.
  const isEdited = (k: keyof Sel) =>
    k in over && JSON.stringify([...[sel[k]].flat()].sort()) !== JSON.stringify([...[preset[k]].flat()].sort());
  const editedCount = (["airline", "hotel", "transport", "guide", "food", "extras"] as const).filter(isEdited).length;

  const tierPrices = useMemo(
    () => TIERS.map((x) => compute(prices, tierSel(x, n, prices), n, mk, md).perPerson),
    [prices, n, mk, md],
  );
  const optionCount =
    prices.airlines.length + prices.hotelStars.length + prices.transports.length +
    prices.guides.length + prices.foodOptions.length + prices.extras.length;

  const total = useCountUp(res.total);
  const pp = useCountUp(res.perPerson);

  const pickTier = (id: TierId) => { setTier(id); setOver({}); };
  const set = <K extends keyof Sel>(k: K, v: Sel[K]) => setOver((o) => ({ ...o, [k]: v }));
  const toggleExtra = (i: number) =>
    set("extras", sel.extras.includes(i) ? sel.extras.filter((x) => x !== i) : [...sel.extras, i]);

  const name = {
    airline: optName(prices.airlines[sel.airline]?.name ?? "", lang),
    hotel: optName(prices.hotelStars[sel.hotel]?.label ?? "", lang),
    transport: optName(prices.transports[sel.transport]?.name ?? "", lang),
    guide: optName(prices.guides[sel.guide]?.name ?? "", lang),
    food: optName(prices.foodOptions[sel.food]?.name ?? "", lang),
    extras: sel.extras.map((i) => optName(prices.extras[i]?.name ?? "", lang)).join(", "),
  };

  const receipt: { k: PartKey; label: L; detail: string }[] = [
    { k: "flight", label: C.flight, detail: name.airline },
    { k: "hotel", label: C.hotel, detail: name.hotel },
    { k: "visa", label: C.visa, detail: `× ${n}` },
    { k: "transport", label: C.transport, detail: name.transport },
    { k: "guide", label: C.guide, detail: name.guide },
    { k: "food", label: C.food, detail: name.food },
    { k: "extras", label: C.extras, detail: name.extras || t(C.none) },
  ];

  const lineText = [
    `【${t(C.plan)}】`,
    `${t(C.start)}: ${t(tierDef.name)}${editedCount ? ` (+${editedCount} ${t(C.editedN)})` : ""}`,
    `${t(C.travelers)}: ${n} ${t(C.people)} · ${t(C.nMakkah)} ${mk} · ${t(C.nMadinah)} ${md}`,
    ...receipt.filter((r) => res.parts[r.k] > 0).map((r) => `${t(r.label)}: ${r.detail} — ${baht(res.parts[r.k])}`),
    `${t(C.total)}: ${baht(res.total)} (${t(C.perPerson)} ${baht(res.perPerson)})`,
  ].join("\n");

  const [copied, setCopied] = useState(false);
  const sendToLine = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    try { await navigator.clipboard.writeText(lineText); } catch {}
    if (isPhone()) return; // follow the oaMessage link
    e.preventDefault();
    window.open(`https://line.me/R/ti/p/${LINE_ID}`, "_blank", "noopener,noreferrer");
    setCopied(true);
  };

  return (
    <div className="wrap ul">
      <header className="ul-intro">
        <div className="ul-intro-main">
          <span className="ul-kicker">{t(C.kicker)}</span>
          <h2>{t(C.title)}</h2>
        </div>
        <div className="ul-intro-side">
          <p>{t(C.sub)}</p>
          <dl className="ul-stats">
            <div><dt>6</dt><dd>{t(C.statLines)}</dd></div>
            <div><dt>{optionCount}</dt><dd>{t(C.statOpts)}</dd></div>
            <div><dt>0 ฿</dt><dd>{t(C.statFee)}</dd></div>
          </dl>
        </div>
      </header>

      <div className="ul-grid">
        <div className="ul-sheet">
          <div className="ul-presets">
            <div className="ul-presets-label">
              <span className="ul-label">{t(C.start)}</span>
              <span className="ul-hint">{t(C.startHint)}</span>
            </div>
            <div className="ul-tabs" role="radiogroup" aria-label={t(C.start)}>
              {TIERS.map((x, i) => {
                const on = tier === x.id;
                return (
                  <button key={x.id} type="button" role="radio" aria-checked={on} className={`ul-tab${on ? " on" : ""}`} onClick={() => pickTier(x.id)}>
                    <b>{t(x.name)}</b>
                    <span>{baht(tierPrices[i])} {t(C.pp)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="ul-basics">
            <Stepper label={t(C.travelers)} value={n} min={1} max={20} unit={t(C.people)} onChange={setN} />
            <Stepper label={t(C.nMakkah)} value={mk} min={1} max={20} unit={t(C.nights)} onChange={setMk} />
            <Stepper label={t(C.nMadinah)} value={md} min={0} max={15} unit={t(C.nights)} onChange={setMd} />
          </div>

          <ol className="ul-rows">
            <Row no={1} label={t(C.flight)} sub={t(C.subFlight)} edited={isEdited("airline")} editedLabel={t(C.edited)} amount={baht(res.parts.flight)}>
              {prices.airlines.map((a, i) => (
                <Opt key={i} on={sel.airline === i} name={optName(a.name, lang)} price={baht(a.price)} onClick={() => set("airline", i)} />
              ))}
            </Row>
            <Row no={2} label={t(C.hotel)} sub={t(C.subHotel)} edited={isEdited("hotel")} editedLabel={t(C.edited)} amount={baht(res.parts.hotel)}>
              {prices.hotelStars.map((h, i) => (
                <Opt key={i} on={sel.hotel === i} name={optName(h.label, lang)} price={`${num(h.makkah)} / ${num(h.madinah)}`} onClick={() => set("hotel", i)} />
              ))}
            </Row>
            <Row no={3} label={t(C.transport)} sub={t(C.subTransport)} edited={isEdited("transport")} editedLabel={t(C.edited)} amount={baht(res.parts.transport)}>
              {prices.transports.map((x, i) => (
                <Opt key={i} on={sel.transport === i} name={optName(x.name, lang)} price={baht(x.price)} onClick={() => set("transport", i)} />
              ))}
            </Row>
            <Row no={4} label={t(C.guide)} sub={t(C.subGuide)} edited={isEdited("guide")} editedLabel={t(C.edited)} amount={baht(res.parts.guide)}>
              {prices.guides.map((x, i) => (
                <Opt key={i} on={sel.guide === i} name={optName(x.name, lang)} price={x.price ? baht(x.price) : undefined} onClick={() => set("guide", i)} />
              ))}
            </Row>
            <Row no={5} label={t(C.food)} sub={t(C.subFood)} edited={isEdited("food")} editedLabel={t(C.edited)} amount={baht(res.parts.food)}>
              {prices.foodOptions.map((x, i) => (
                <Opt key={i} on={sel.food === i} name={optName(x.name, lang)} price={x.pricePerDay ? baht(x.pricePerDay) : undefined} onClick={() => set("food", i)} />
              ))}
            </Row>
            <Row no={6} label={t(C.extras)} sub={t(C.subExtras)} edited={isEdited("extras")} editedLabel={t(C.edited)} amount={baht(res.parts.extras)}>
              {prices.extras.map((x, i) => (
                <Opt key={i} multi on={sel.extras.includes(i)} name={optName(x.name, lang)} price={baht(x.price)} onClick={() => toggleExtra(i)} />
              ))}
            </Row>
            <li className="ul-row is-fixed">
              <span className="ul-no">07</span>
              <div className="ul-head">
                <h3>{t(C.visa)}</h3>
                <p>{t(C.subVisa)}</p>
              </div>
              <div className="ul-opts"><span className="ul-fixed">{baht(prices.visaPrice)} × {n}</span></div>
              <output className="ul-amt" key={res.parts.visa}>{baht(res.parts.visa)}</output>
            </li>
          </ol>
        </div>

        <aside className="ul-receipt" aria-live="polite">
          <div className="ul-receipt-head">
            <span className="ul-label">{t(C.receipt)}</span>
            <span className="ul-meta">{n} {t(C.people)} · {res.days} {t(C.days)} · {res.rooms} {t(C.rooms)}</span>
          </div>
          <p className="ul-basis">
            {t(tierDef.name)}
            {editedCount > 0 && (
              <>
                <span className="ul-basis-n"> + {editedCount} {t(C.editedN)}</span>
                <button type="button" className="ul-reset" onClick={() => setOver({})}>{t(C.reset)}</button>
              </>
            )}
          </p>
          <ul className="ul-lines">
            {receipt.filter((r) => res.parts[r.k] > 0).map((r) => (
              <li key={r.k}>
                <span className="ul-line-k">{t(r.label)}<small>{r.detail}</small></span>
                <span className="ul-dots" aria-hidden="true" />
                <b>{baht(res.parts[r.k])}</b>
              </li>
            ))}
          </ul>
          <div className="ul-total">
            <span className="ul-label">{t(C.total)}</span>
            <strong>{num(total)}<span> ฿</span></strong>
            <span className="ul-pp">{t(C.perPerson)} <b>{baht(pp)}</b></span>
          </div>
          <a
            className="ul-cta"
            href={`https://line.me/R/oaMessage/${LINE_ID}/?${encodeURIComponent(lineText)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={sendToLine}
          >
            <LineIcon />
            {t(C.line)}
          </a>
          {copied && <p className="ul-copied" role="status">{t(C.copied)}</p>}
          <p className="ul-note">{t(C.note)}</p>
        </aside>
      </div>
    </div>
  );
}
