import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา",
  description: "Umrah Thailand คือศูนย์รวมความรู้เรื่องอุมเราะห์และฮัจญ์ ไม่ใช่บริษัททัวร์ — เผยแพร่ความรู้ที่ตรวจสอบหลักฐานได้",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="hero-pattern" />
        <div className="wrap">
          <div className="breadcrumb"><Link href="/">หน้าหลัก</Link> / <span>เกี่ยวกับเรา</span></div>
          <h1>เราคือศูนย์รวมความรู้ ไม่ใช่บริษัททัวร์</h1>
          <p>เป้าหมายของเราคือให้ความรู้ที่ถูกต้องเรื่องอุมเราะห์และฮัจญ์ และช่วยให้คุณเลือกผู้ให้บริการที่ไว้วางใจได้</p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap about-intro">
          <div>
            <span className="eyebrow">พันธกิจของเรา</span>
            <h2 style={{ fontSize: "2rem", margin: "14px 0 16px" }}>เผยแพร่ความรู้ที่ตรวจสอบได้</h2>
            <p style={{ color: "var(--muted)", marginBottom: 14 }}>
              เว็บไซต์นี้ก่อตั้งเพื่อเป็นแหล่งความรู้กลางเรื่องการประกอบพิธีอุมเราะห์และฮัจญ์สำหรับมุสลิมไทย โดยอ้างอิงหลักฐานจากอัลกุรอานและสุนนะฮ์ในทุกเนื้อหา
            </p>
            <p style={{ color: "var(--muted)" }}>
              เราไม่ได้ขายแพ็กเกจเอง แต่เปิดพื้นที่ให้บริษัทผู้ให้บริการที่ได้รับใบอนุญาตได้นำเสนอบริการอย่างโปร่งใส เพื่อให้ผู้อ่านมีข้อมูลประกอบการตัดสินใจ
            </p>
            <div className="vm-grid">
              <div className="vm-card"><div className="ic"><svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" /></svg></div><h4>ความถูกต้อง</h4><p>ทุกเนื้อหาผ่านการตรวจสอบและอ้างอิงแหล่งที่มา</p></div>
              <div className="vm-card"><div className="ic"><svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v10M7 12h10" /></svg></div><h4>เข้าถึงฟรี</h4><p>ความรู้ทั้งหมดเปิดให้อ่านฟรี ไม่มีค่าใช้จ่าย</p></div>
            </div>
          </div>
          <div className="about-visual">
            <div className="hero-pattern" />
            <svg width="200" height="220" viewBox="0 0 200 220" style={{ position: "relative", zIndex: 2 }}>
              <circle cx="100" cy="110" r="74" fill="none" stroke="#C9A24B" strokeWidth="1" opacity=".4" />
              <path d="M55 140 v-46 a45 36 0 0 1 90 0 v46 z" fill="#12294C" stroke="#C9A24B" strokeWidth="1.5" />
              <path d="M100 38 a28 28 0 0 1 0 56 a20 20 0 0 0 0 -56" fill="#C9A24B" />
              <rect x="55" y="140" width="90" height="36" fill="#0a1426" />
              <rect x="90" y="150" width="20" height="26" rx="10" fill="#C9A24B" />
            </svg>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="cta-band">
            <div className="hero-pattern" />
            <div style={{ position: "relative", zIndex: 2 }}>
              <h2>เป็นบริษัทอุมเราะห์? ลงโฆษณากับเรา</h2>
              <p>เข้าถึงผู้ที่กำลังวางแผนเดินทางไปอุมเราะห์และฮัจญ์โดยตรง ผ่านเว็บความรู้ที่ติดอันดับการค้นหา</p>
              <Link className="btn btn-gold" href="/contact">สอบถามการลงโฆษณา →</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
