import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "ติดต่อเรา",
  description: "สอบถามข้อมูล แนะนำเนื้อหา หรือสนใจลงโฆษณากับ Umrah Thailand",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="hero-pattern" />
        <div className="wrap">
          <div className="breadcrumb"><Link href="/">หน้าหลัก</Link> / <span>ติดต่อ</span></div>
          <h1>ติดต่อเรา</h1>
          <p>สอบถามข้อมูล แนะนำเนื้อหา หรือสนใจลงโฆษณา — ทีมงานยินดีตอบทุกข้อความ</p>
        </div>
      </section>
      <section className="sec" style={{ paddingTop: 60 }}>
        <div className="wrap contact-grid">
          <ContactForm />
          <div className="contact-info">
            <a className="info-card" href="mailto:hello@umrahthailand.com"><div className="ic"><svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg></div><div><b>อีเมล</b><span>hello@umrahthailand.com</span></div></a>
            <a className="info-card" href="https://wa.me/66800000000"><div className="ic"><svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.4A10 10 0 1012 2z" /><path d="M8 9c0 4 3 7 7 7" /></svg></div><div><b>WhatsApp / LINE</b><span>+66 80-000-0000</span></div></a>
            <a className="info-card" href="mailto:ads@umrahthailand.com"><div className="ic"><svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 11l18-8-8 18-2-8z" /></svg></div><div><b>ฝ่ายโฆษณา / พันธมิตร</b><span>ads@umrahthailand.com</span></div></a>
            <div className="map-embed">
              <iframe loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Bangkok&output=embed" />
            </div>
            <div className="socials">
              <a href="#" aria-label="Facebook"><svg width="20" height="20" fill="currentColor"><path d="M13 6h2V3h-2c-2.2 0-3 1.6-3 3v2H8v3h2v6h3v-6h2.2l.8-3H13V6z" /></svg></a>
              <a href="#" aria-label="TikTok"><svg width="20" height="20" fill="currentColor"><path d="M13 3v9.5a2.5 2.5 0 11-2-2.45V7.5a5 5 0 105 5V8a5.5 5.5 0 003 .9V5.8A3.3 3.3 0 0116 3h-3z" /></svg></a>
              <a href="#" aria-label="Instagram"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="14" height="14" rx="4" /><circle cx="10" cy="10" r="3.5" /><circle cx="14.5" cy="5.5" r="1" fill="currentColor" /></svg></a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
