"use client";
import { useState, useMemo, type ReactNode } from "react";
import { usePlannerPrices } from "@/lib/usePlannerPrices";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="pl-row">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="pl-section">
      <h3 className="pl-section-title">{title}</h3>
      {children}
    </div>
  );
}

function OptionCard({
  label, sub, selected, onClick,
}: { label: string; sub?: string; selected: boolean; onClick: () => void }) {
  return (
    <button type="button" className={`pl-opt${selected ? " selected" : ""}`} onClick={onClick}>
      <span className="pl-opt-label">{label}</span>
      {sub && <span className="pl-opt-sub">{sub}</span>}
    </button>
  );
}

function Stepper({
  label, value, min, max, onChange,
}: { label: string; value: number; min: number; max: number; onChange: (v: number) => void }) {
  return (
    <div className="pl-stepper">
      <span className="pl-stepper-label">{label}</span>
      <div className="pl-stepper-ctrl">
        <button type="button" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min}>−</button>
        <span>{value}</span>
        <button type="button" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max}>+</button>
      </div>
    </div>
  );
}

function fmt(n: number) {
  return n.toLocaleString("th-TH") + " ฿";
}

export default function UmrahPlanner() {
  const { prices } = usePlannerPrices();

  const [travelers, setTravelers] = useState(2);
  const [makkahNights, setMakkahNights] = useState(5);
  const [madinahNights, setMadinahNights] = useState(3);
  const [airlineIdx, setAirlineIdx] = useState(0);
  const [hotelIdx, setHotelIdx] = useState(1);
  const [transportIdx, setTransportIdx] = useState(1);
  const [guideIdx, setGuideIdx] = useState(0);
  const [foodIdx, setFoodIdx] = useState(0);
  const [selectedExtras, setSelectedExtras] = useState<Set<number>>(new Set());

  function toggleExtra(i: number) {
    setSelectedExtras((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  const calc = useMemo(() => {
    const days = makkahNights + madinahNights;
    const rooms = Math.ceil(travelers / 2);
    const hotel = prices.hotelStars[hotelIdx] ?? prices.hotelStars[0];
    const hotelTotal = rooms * (hotel.makkah * makkahNights + hotel.madinah * madinahNights);
    const flightPrice = prices.airlines[airlineIdx]?.price ?? 0;
    const transportTotal = (prices.transports[transportIdx]?.price ?? 0) * days;
    const guideTotal = prices.guides[guideIdx]?.price ?? 0;
    const foodPerDay = prices.foodOptions[foodIdx]?.pricePerDay ?? 0;
    const foodTotal = foodPerDay * days * travelers;
    const extrasTotal = [...selectedExtras].reduce((sum, i) => sum + (prices.extras[i]?.price ?? 0), 0);

    const rawPerPerson =
      flightPrice +
      prices.visaPrice +
      hotelTotal / travelers +
      transportTotal / travelers +
      guideTotal / travelers +
      foodPerDay * days +
      extrasTotal / travelers;

    const perPerson = Math.ceil(rawPerPerson / 100) * 100;
    const total = perPerson * travelers;

    return {
      days, rooms,
      flightTotalGroup: flightPrice * travelers,
      visaTotal: prices.visaPrice * travelers,
      hotelTotal,
      transportTotal,
      guideTotal,
      foodTotal,
      extrasTotal,
      perPerson,
      total,
    };
  }, [travelers, makkahNights, madinahNights, airlineIdx, hotelIdx, transportIdx, guideIdx, foodIdx, selectedExtras, prices]);

  return (
    <div className="planner-layout">
      {/* ── LEFT: FORM ── */}
      <div className="planner-form">

        <Section title="นักเดินทาง & คืนพัก">
          <Stepper label="จำนวนคน" value={travelers} min={1} max={20} onChange={setTravelers} />
          <Stepper label="คืนในมักกะฮ์" value={makkahNights} min={1} max={30} onChange={setMakkahNights} />
          <Stepper label="คืนในมะดีนะฮ์" value={madinahNights} min={0} max={30} onChange={setMadinahNights} />
          <p className="pl-hint">รวม {calc.days} คืน · ห้องพัก {calc.rooms} ห้อง ({travelers} คน)</p>
        </Section>

        <Section title="ตั๋วเครื่องบิน">
          <div className="pl-opts">
            {prices.airlines.map((a, i) => (
              <OptionCard key={i} label={a.name} sub={fmt(a.price) + "/คน"} selected={airlineIdx === i} onClick={() => setAirlineIdx(i)} />
            ))}
          </div>
        </Section>

        <Section title="ระดับโรงแรม">
          <div className="pl-opts">
            {prices.hotelStars.map((h, i) => (
              <OptionCard key={i} label={h.label} sub={`มักกะฮ์ ${fmt(h.makkah)} · มะดีนะฮ์ ${fmt(h.madinah)}`} selected={hotelIdx === i} onClick={() => setHotelIdx(i)} />
            ))}
          </div>
          <p className="pl-hint">ราคาต่อห้องต่อคืน · {calc.rooms} ห้อง × {calc.days} คืน</p>
        </Section>

        <Section title="การเดินทางภายใน">
          <div className="pl-opts">
            {prices.transports.map((t, i) => (
              <OptionCard key={i} label={t.name} sub={fmt(t.price) + "/วัน (กลุ่ม)"} selected={transportIdx === i} onClick={() => setTransportIdx(i)} />
            ))}
          </div>
        </Section>

        <Section title="ไกด์นำทาง">
          <div className="pl-opts">
            {prices.guides.map((g, i) => (
              <OptionCard key={i} label={g.name} sub={g.price === 0 ? "ไม่มีค่าใช้จ่าย" : fmt(g.price) + " (ทริป)"} selected={guideIdx === i} onClick={() => setGuideIdx(i)} />
            ))}
          </div>
        </Section>

        <Section title="อาหาร">
          <div className="pl-opts">
            {prices.foodOptions.map((f, i) => (
              <OptionCard key={i} label={f.name} sub={f.pricePerDay === 0 ? "จัดหาเอง" : fmt(f.pricePerDay) + "/คน/วัน"} selected={foodIdx === i} onClick={() => setFoodIdx(i)} />
            ))}
          </div>
        </Section>

        <Section title="กิจกรรมเสริม (เลือกได้หลายอย่าง)">
          <div className="pl-opts">
            {prices.extras.map((e, i) => (
              <OptionCard key={i} label={e.name} sub={fmt(e.price) + " (กลุ่ม)"} selected={selectedExtras.has(i)} onClick={() => toggleExtra(i)} />
            ))}
          </div>
        </Section>

      </div>

      {/* ── RIGHT: SUMMARY ── */}
      <div className="planner-summary-wrap">
        <div className="planner-summary">
          <div className="pl-sum-head">
            <span className="pl-sum-eyebrow">ประมาณการค่าใช้จ่าย</span>
            <div className="pl-sum-total">
              <span className="pl-sum-total-label">ราคารวม {travelers} คน</span>
              <span className="pl-sum-total-value">{fmt(calc.total)}</span>
            </div>
            <div className="pl-sum-per">
              <span>เฉลี่ยต่อคน</span>
              <strong>{fmt(calc.perPerson)}</strong>
            </div>
          </div>

          <div className="pl-sum-body">
            <p className="pl-sum-cat">รายการ</p>
            <Row label={`✈ ตั๋ว (${prices.airlines[airlineIdx]?.name})`} value={fmt(calc.flightTotalGroup)} />
            <Row label={`🪪 วีซ่า × ${travelers}`} value={fmt(calc.visaTotal)} />
            <Row label={`🏨 โรงแรม (${prices.hotelStars[hotelIdx]?.label})`} value={fmt(calc.hotelTotal)} />
            <Row label={`🚌 รถ (${prices.transports[transportIdx]?.name})`} value={fmt(calc.transportTotal)} />
            {calc.guideTotal > 0 && (
              <Row label={`🧭 ไกด์ (${prices.guides[guideIdx]?.name})`} value={fmt(calc.guideTotal)} />
            )}
            {calc.foodTotal > 0 && (
              <Row label={`🍽 อาหาร (${prices.foodOptions[foodIdx]?.name})`} value={fmt(calc.foodTotal)} />
            )}
            {[...selectedExtras].map((i) => (
              <Row key={i} label={`⭐ ${prices.extras[i]?.name}`} value={fmt(prices.extras[i]?.price ?? 0)} />
            ))}
          </div>

          <div className="pl-sum-footer">
            <p className="pl-disclaimer">* ราคาเป็นการประมาณการเท่านั้น อาจแตกต่างตามฤดูกาลและผู้ให้บริการ</p>
            <a href="/contact" className="btn btn-orange" style={{ width: "100%", justifyContent: "center", marginTop: 16 }}>
              ปรึกษาทีมงานฟรี →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
