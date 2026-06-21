import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";

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
          <div className="contact-grid">
            <ContactForm />
            <div className="contact-info">
              <a className="info-card" href="mailto:hello@umrahthailand.com">
                <div className="ic"><svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg></div>
                <div><b>อีเมล</b><span>hello@umrahthailand.com</span></div>
              </a>
              <a className="info-card" href="https://wa.me/66800000000">
                <div className="ic"><svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.4A10 10 0 1012 2z" /><path d="M8 9c0 4 3 7 7 7" /></svg></div>
                <div><b>WhatsApp / LINE</b><span>+66 80-000-0000</span></div>
              </a>
              <a className="info-card" href="mailto:ads@umrahthailand.com">
                <div className="ic"><svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 11l18-8-8 18-2-8z" /></svg></div>
                <div><b>ฝ่ายโฆษณา / พันธมิตร</b><span>ads@umrahthailand.com</span></div>
              </a>
              <div className="socials">
                <a href="#" aria-label="Facebook"><svg width="20" height="20" fill="currentColor"><path d="M13 6h2V3h-2c-2.2 0-3 1.6-3 3v2H8v3h2v6h3v-6h2.2l.8-3H13V6z" /></svg></a>
                <a href="#" aria-label="TikTok"><svg width="20" height="20" fill="currentColor"><path d="M13 3v9.5a2.5 2.5 0 11-2-2.45V7.5a5 5 0 105 5V8a5.5 5.5 0 003 .9V5.8A3.3 3.3 0 0116 3h-3z" /></svg></a>
                <a href="#" aria-label="Instagram"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="14" height="14" rx="4" /><circle cx="10" cy="10" r="3.5" /><circle cx="14.5" cy="5.5" r="1" fill="currentColor" /></svg></a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
