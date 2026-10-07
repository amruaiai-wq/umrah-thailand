import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา & ติดต่อ | Umrah Thailand",
  description: "Umrah Thailand เว็บไซต์ให้บริการอุมเราะห์ครบวงจรและให้ความรู้ที่เข้าใจง่าย ดำเนินงานโดยทีมงานมืออาชีพที่มีประสบการณ์มากกว่า 10 ปี",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="hero-pattern" />
        <div className="wrap">
          <div className="breadcrumb"><Link href="/">หน้าหลัก</Link> / <span>เกี่ยวกับเรา</span></div>
          <h1>Umrah Thailand</h1>
          <p>บริการอุมเราะห์ครบวงจรและแหล่งความรู้ที่เข้าใจง่าย สำหรับมุสลิมไทยทุกคน</p>
        </div>
      </section>

      {/* ABOUT */}
      <section className="sec">
        <div className="wrap about-intro">
          <div>
            <span className="eyebrow">เราคือใคร</span>
            <h2 style={{ fontSize: "2rem", margin: "14px 0 16px" }}>บริการอุมเราะห์ครบวงจร<br />ความรู้ที่เข้าใจง่าย</h2>
            <p style={{ color: "var(--muted)", marginBottom: 14, lineHeight: 1.85 }}>
              Umrah Thailand คือแพลตฟอร์มที่ให้บริการด้านการเดินทางอุมเราะห์แบบครบวงจร ตั้งแต่การวางแผน วีซ่า ที่พัก การเดินทาง ไปจนถึงการดูแลในซาอุดีอาระเบีย พร้อมแหล่งความรู้ที่เขียนขึ้นอย่างเข้าใจง่าย อ้างอิงจากอัลกุรอานและสุนนะฮ์ในทุกเนื้อหา
            </p>
            <p style={{ color: "var(--muted)", lineHeight: 1.85 }}>
              เราเชื่อว่าการเดินทางไปอุมเราะห์คือหนึ่งในช่วงเวลาสำคัญที่สุดในชีวิต และผู้แสวงบุญทุกคนสมควรได้รับการดูแลจากทีมงานที่ไว้วางใจได้ มีความรู้จริง และพร้อมช่วยเหลืออยู่เสมอ
            </p>
            <div className="vm-grid">
              <div className="vm-card">
                <div className="ic">
                  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <h4>ครบวงจร</h4>
                <p>วีซ่า ที่พัก บินภายใน รถรับส่ง ดูแลตลอดการเดินทาง</p>
              </div>
              <div className="vm-card">
                <div className="ic">
                  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
                  </svg>
                </div>
                <h4>ความรู้ที่เชื่อถือได้</h4>
                <p>เนื้อหาอิงหลักฐานจากอัลกุรอานและสุนนะฮ์ อ่านง่าย เข้าใจเร็ว</p>
              </div>
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

      {/* WHY CHOOSE US — short version */}
      <section className="sec sec-gray">
        <div className="wrap">
          <div className="sec-head fade-up">
            <span className="eyebrow">ทำไมต้องเรา</span>
            <h2>3 เหตุผลที่ไว้วางใจได้</h2>
          </div>
          <div className="about-why-grid">
            <div className="about-why-card">
              <div className="about-why-num">01</div>
              <div className="about-why-icon">
                <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
                </svg>
              </div>
              <h4>ทีมซัพพอร์ตในซาอุดีอาระเบีย</h4>
              <p>มีทีมงานประจำอยู่ที่ซาอุดีอาระเบีย หากเกิดปัญหาระหว่างการเดินทาง สามารถช่วยเหลือได้ทันทีในพื้นที่จริง</p>
            </div>
            <div className="about-why-card">
              <div className="about-why-num">02</div>
              <div className="about-why-icon">
                <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                </svg>
              </div>
              <h4>ประสบการณ์มากกว่า 10 ปี</h4>
              <p>ดำเนินงานโดยทีมงานมืออาชีพที่มีประสบการณ์ในธุรกิจอุมเราะห์มากกว่า 10 ปี มีผลงานที่จับต้องได้ ไม่ใช่แค่คำสัญญา</p>
            </div>
            <div className="about-why-card">
              <div className="about-why-num">03</div>
              <div className="about-why-icon">
                <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h4>เชื่อถือได้ มีตัวตน</h4>
              <p>ไม่เท มีที่อยู่จริง ออกใบเสร็จให้ทุกครั้งหลังมีการทำธุรกรรม เพื่อความโปร่งใสและให้คุณรู้สึกมั่นใจ</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="sec" id="contact">
        <div className="wrap">
          <div className="sec-head fade-up" style={{ marginBottom: 40 }}>
            <span className="eyebrow">ติดต่อเรา</span>
            <h2>สอบถาม หรือขอรับคำปรึกษาฟรี</h2>
            <p style={{ color: "var(--muted)" }}>ทีมงานยินดีตอบทุกข้อความภายใน 24 ชั่วโมง</p>
          </div>
          <div className="contact-grid contact-info" style={{ gap: 16, maxWidth: 880, margin: "0 auto" }}>
            <a className="info-card" href="https://line.me/R/ti/p/%40024xshvm" target="_blank" rel="noopener noreferrer">
              <div className="ic" style={{ color: "#06C755" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 10.3C24 4.9 18.6.6 12 .6S0 4.9 0 10.3c0 4.8 4.3 8.8 10 9.6.4.1.9.3 1.1.6.1.3.1.8 0 1.1l-.2 1c0 .3-.2 1.2 1 .6 1.3-.5 6.9-4.1 9.4-7C23.2 14.4 24 12.5 24 10.3z" /></svg>
              </div>
              <div><b>LINE</b><span>@024xshvm · กดเพื่อเพิ่มเพื่อนและทักแชท</span></div>
            </a>
            <a className="info-card" href="https://www.facebook.com/umrahthailand/" target="_blank" rel="noopener noreferrer">
              <div className="ic" style={{ color: "#0866FF" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.4 0 0 5 0 11.1c0 3.5 1.7 6.6 4.5 8.7V24l4.1-2.2c1.1.3 2.2.5 3.4.5 6.6 0 12-5 12-11.1S18.6 0 12 0zm1.2 15-3.1-3.3-6 3.3L10.7 8l3.1 3.3L19.8 8z" /></svg>
              </div>
              <div><b>Facebook Messenger</b><span>facebook.com/umrahthailand · ทักแชทเพจ</span></div>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
