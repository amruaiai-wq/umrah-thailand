"use client";
import { useState } from "react";
import { GuideStep } from "@/lib/types";

const ruleClass: Record<string, string> = {
  "รุก่น": "rule-rukn",
  "วาญิบ": "rule-wajib",
  "สุนนะฮ์": "rule-sunnah",
};

function InlineAd() {
  return (
    <div className="inline-ad">
      <div className="sp-logo">A</div>
      <div className="ia-t">
        <span className="ad-label">โฆษณา</span>
        <h4>วางแผนเดินทางอุมเราะห์?</h4>
        <p>เปรียบเทียบแพ็กเกจจากบริษัทที่ได้รับใบอนุญาต</p>
      </div>
      <a className="btn btn-gold" style={{ fontSize: ".85rem", padding: "10px 20px" }} href="/#sponsors">
        ดูแพ็กเกจ →
      </a>
    </div>
  );
}

export default function GuideSteps({ steps, defaultOpen = 0 }: { steps: GuideStep[]; defaultOpen?: number }) {
  const [open, setOpen] = useState<Record<string, boolean>>(
    steps[defaultOpen] ? { [steps[defaultOpen].id]: true } : {}
  );
  const toggle = (id: string) => setOpen((o) => ({ ...o, [id]: !o[id] }));

  return (
    <div>
      {steps.map((s) => (
        <div className={`step-block ${open[s.id] ? "open" : ""}`} id={s.id} key={s.id}>
          <div className="step-bar" onClick={() => toggle(s.id)}>
            <div className="step-no">{s.no}</div>
            <div className="st-tt">
              <h3>{s.t}</h3>
              <span className="arname">{s.ar}</span>
            </div>
            <span className={`step-rule ${ruleClass[s.rule]}`}>{s.rule}</span>
            <span className="step-toggle">+</span>
          </div>
          <div className="step-body">
            <div className="step-inner">
              <p>{s.desc}</p>
              <div className="subh" style={{ color: "var(--emerald)" }}>ดุอาอ์ที่กล่าว</div>
              {s.duas.map((d, i) => (
                <div key={i}>
                  <div className="subh">{d.label}</div>
                  <div className="dua">
                    <div className="hero-pattern" />
                    <div className="ar-text">{d.ar}</div>
                    <div className="translit">คำอ่าน: {d.tr}</div>
                    <div className="mean">ความหมาย: {d.mn}</div>
                  </div>
                </div>
              ))}
              <div className="subh">หลักฐาน</div>
              <div className="evi" dangerouslySetInnerHTML={{ __html: s.evi }} />
              {s.ad && <InlineAd />}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
