import type { Metadata } from "next";
import Link from "next/link";
import { HIST_CATEGORIES } from "@/data/historySites";

export const metadata: Metadata = {
  title: "สถานที่ประวัติศาสตร์อิสลาม | Umrah Thailand",
  description: "สำรวจสถานที่ประวัติศาสตร์อิสลามในมักกะฮ์ มะดีนะฮ์ และยุทธการสำคัญในยุคท่านนบี ﷺ",
};

export default function PlanPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="hero-pattern" />
        <div className="wrap">
          <div className="breadcrumb">
            <Link href="/">หน้าหลัก</Link> / <span>สถานที่ประวัติศาสตร์</span>
          </div>
          <h1>สถานที่ประวัติศาสตร์อิสลาม</h1>
          <p style={{ color: "rgba(255,255,255,.72)", maxWidth: 580, lineHeight: 1.7 }}>
            เลือกหมวดหมู่ที่ต้องการเรียนรู้ — ตั้งแต่นครมักกะฮ์ มะดีนะฮ์ ไปจนถึงยุทธการสำคัญในยุคท่านนบี ﷺ
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="hist-cat-grid">
            {HIST_CATEGORIES.map((cat) => (
              <Link key={cat.slug} href={`/plan/${cat.slug}`} className="hist-cat-card">
                <div className="hist-cat-bg" style={{ background: cat.gradient }} />
                <div className="hist-cat-content">
                  <div className="hist-cat-icon">{cat.icon}</div>
                  <p className="hist-cat-ar">{cat.ar}</p>
                  <h2 className="hist-cat-label">{cat.labelFull}</h2>
                  <p className="hist-cat-desc">{cat.desc}</p>
                  <div className="hist-cat-footer">
                    <span className="hist-cat-count" style={{ color: cat.accent }}>
                      {cat.count} หัวข้อ
                    </span>
                    <span className="hist-cat-arrow" style={{ color: cat.accent }}>อ่านต่อ →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
