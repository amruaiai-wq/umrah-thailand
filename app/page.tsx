import Link from "next/link";
import { getArticles, getSponsors } from "@/lib/data";
import { ArticleCard } from "@/components/ArticleGrid";
import SponsorGrid from "@/components/SponsorGrid";
import KaabaBackground from "@/components/KaabaBackground";
import ScrollReveal from "@/components/ScrollReveal";

const services = [
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="16" rx="2"/>
        <path d="M16 2v4M8 2v4M3 10h18"/>
      </svg>
    ),
    title: "รับทำวีซ่าอุมเราะห์",
    desc: "ดำเนินการวีซ่าอุมเราะห์ครบวงจร รวดเร็ว ถูกต้องตามขั้นตอนสถานทูต",
    tag: null,
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <path d="M9 22V12h6v10"/>
      </svg>
    ),
    title: "จองที่พักมักกะฮ์-มะดีนะฮ์",
    desc: "เลือกที่พักระยะใกล้มัสยิด หลากหลายระดับราคา เหมาะกับทุกงบประมาณ",
    tag: null,
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="1" y="3" width="15" height="13" rx="2"/>
        <path d="M16 8h4l3 5v3h-7V8z"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    title: "บริการรถบัส",
    desc: "รถบัสรับ-ส่งทุกเส้นทาง สนามบิน มักกะฮ์ มะดีนะฮ์ สะดวก ตรงเวลา",
    tag: null,
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    ),
    title: "ปรึกษาวางแผนอุมเราะห์",
    desc: "ทีมงานพร้อมให้คำปรึกษาและวางแผนการเดินทาง ไม่มีค่าใช้จ่ายใดๆ",
    tag: "ฟรี",
  },
];

export default async function HomePage() {
  const [articles, sponsors] = await Promise.all([getArticles(true), getSponsors(true)]);
  const latest = articles.slice(0, 3);

  return (
    <main>
      <ScrollReveal />

      {/* HERO */}
      <section className="hero">
        <KaabaBackground />
        <div className="wrap hero-content">
          <p className="hero-eyebrow anim-hero anim-d0">Umrah Thailand</p>
          <h1>
            <span className="anim-hero anim-d1">เราช่วยให้คุณทำ</span>
            <br />
            <em className="anim-hero anim-d2">อุมเราะห์ได้ง่ายขึ้น</em>
          </h1>
          <p className="hero-sub anim-hero anim-d3">
            รวมทุกอย่างเกี่ยวกับอุมเราะห์ไว้ที่เดียว
          </p>
          <p className="hero-quote anim-hero anim-d4">
            เพราะเราเชื่อว่า{" "}
            <span className="hero-highlight">&ldquo;อุมเราะห์หนึ่งครั้ง&rdquo;</span>
            {" "}เปลี่ยนชีวิตคุณได้
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head fade-up">
            <span className="eyebrow">บริการของเรา</span>
            <h2>ครบทุกอย่าง ตั้งแต่ต้นจนถึงปลายทาง</h2>
            <p>ทีมงานดูแลคุณทุกขั้นตอน ตั้งแต่วางแผนจนกลับบ้านอย่างปลอดภัย</p>
          </div>
          <div className="svc-grid">
            {services.map((s, i) => (
              <Link href="/contact" key={i} className="svc-card fade-up" style={{ transitionDelay: `${i * 80}ms` }}>
                {s.tag && <span className="svc-tag">{s.tag}</span>}
                <div className="svc-icon">{s.icon}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
                <span className="svc-more">ติดต่อเรา →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="sec sec-gray">
        <div className="wrap">
          <div className="sec-head fade-up">
            <span className="eyebrow">ทำไมต้อง Umrah Thailand</span>
            <h2>เชื่อถือได้ ไม่ทิ้ง ทำงานมืออาชีพ</h2>
            <p>เราดูแลคุณตั้งแต่วันแรกที่ติดต่อ จนกลับถึงบ้านอย่างปลอดภัย</p>
          </div>
          <div className="why-grid">
            <div className="why-card fade-up">
              <span className="why-num">01</span>
              <div className="why-icon">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
                </svg>
              </div>
              <h4>ทีมซัพพอร์ตในซาอุดีฯ</h4>
              <p>มีทีมงานประจำอยู่ที่ซาอุดีอาระเบีย หากเกิดปัญหาระหว่างการเดินทาง สามารถช่วยเหลือได้ทันทีในพื้นที่จริง ไม่ต้องรอติดต่อจากไทย</p>
            </div>
            <div className="why-card fade-up" style={{ transitionDelay: "100ms" }}>
              <span className="why-num">02</span>
              <div className="why-icon">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                </svg>
              </div>
              <h4>ประสบการณ์มากกว่า 10 ปี</h4>
              <p>ดำเนินงานโดยทีมงานมืออาชีพที่มีประสบการณ์ในธุรกิจอุมเราะห์มากกว่า 10 ปี มีผลงานที่จับต้องได้ ไม่ใช่แค่คำสัญญา</p>
            </div>
            <div className="why-card fade-up" style={{ transitionDelay: "200ms" }}>
              <span className="why-num">03</span>
              <div className="why-icon">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h4>เชื่อถือได้ มีตัวตน</h4>
              <p>ไม่เท มีที่อยู่จริง ออกใบเสร็จให้ทุกครั้งหลังมีการทำธุรกรรม เพื่อความโปร่งใสและให้คุณรู้สึกมั่นใจ</p>
            </div>
          </div>
        </div>
      </section>

      {/* CALCULATOR CTA */}
      <section className="sec">
        <div className="wrap">
          <div className="calc-cta-band fade-up">
            <div className="calc-cta-left">
              <span className="eyebrow" style={{ color: "#fff" }}>เครื่องมือวางแผน</span>
              <h2 className="calc-cta-title">รู้ราคาก่อนตัดสินใจ</h2>
              <p className="calc-cta-sub">เลือกตั๋ว โรงแรม รถ ไกด์ และกิจกรรม — ระบบคำนวณราคาประมาณการให้ทันที ไม่มีค่าใช้จ่าย</p>
              <div className="calc-cta-features">
                <span>✈ ตั๋วเครื่องบิน</span>
                <span>🏨 โรงแรม 3–5 ดาว</span>
                <span>🪪 วีซ่า</span>
                <span>🚌 รถรับส่ง</span>
                <span>🧭 ไกด์</span>
                <span>🍽 อาหาร</span>
              </div>
              <Link className="btn btn-gold" href="/planner" style={{ marginTop: 24, alignSelf: "flex-start" }}>
                เริ่มคำนวณฟรี →
              </Link>
            </div>
            <div className="calc-cta-preview">
              <div className="calc-preview-card">
                <div className="calc-preview-row">
                  <span>จำนวนคน</span><strong>2 คน</strong>
                </div>
                <div className="calc-preview-row">
                  <span>✈ ตั๋วบิน</span><strong>~40,000 ฿</strong>
                </div>
                <div className="calc-preview-row">
                  <span>🏨 โรงแรม 8 คืน</span><strong>~24,000 ฿</strong>
                </div>
                <div className="calc-preview-row">
                  <span>🪪 วีซ่า</span><strong>~8,000 ฿</strong>
                </div>
                <div className="calc-preview-divider" />
                <div className="calc-preview-total">
                  <span>รวมโดยประมาณ</span>
                  <strong>~90,000 ฿</strong>
                </div>
                <p className="calc-preview-note">ปรับได้ตามความต้องการ →</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPONSORS */}
      <section className="sec sponsors">
        <div className="wrap">
          <div className="sec-head fade-up">
            <span className="ad-label">ได้รับการสนับสนุน · Sponsored</span>
            <h2 style={{ marginTop: 14 }}>บริษัทผู้ให้บริการอุมเราะห์ที่แนะนำ</h2>
            <p>เปรียบเทียบผู้ให้บริการที่ได้รับใบอนุญาต เพื่อเลือกแพ็กเกจที่เหมาะกับคุณ</p>
          </div>
          <SponsorGrid sponsors={sponsors} />
        </div>
      </section>

      {/* LATEST ARTICLES */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head fade-up">
            <span className="eyebrow">อัปเดตล่าสุด</span>
            <h2>บทความและความรู้</h2>
          </div>
          <div className="blog-grid fade-up" style={{ transitionDelay: "100ms" }}>
            {latest.map((a) => <ArticleCard key={a.id} a={a} />)}
          </div>
          <div className="fade-up" style={{ textAlign: "center", marginTop: 36, transitionDelay: "200ms" }}>
            <Link className="btn btn-outline" href="/articles">ดูบทความทั้งหมด →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
