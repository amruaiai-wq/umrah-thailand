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
            เพราะเราเชื่อว่า อุมเราะห์หนึ่ง เปลี่ยนชีวิตคุณได้
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
            <span className="eyebrow">ทำไมต้องที่นี่</span>
            <h2>ความรู้ที่ตรวจสอบหลักฐานได้</h2>
            <p>เราเน้นความถูกต้องของเนื้อหา อ้างอิงแหล่งที่มา และนำเสนอให้เข้าใจง่ายสำหรับทุกคน</p>
          </div>
          <div className="vm-grid" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
            <div className="vm-card fade-up">
              <div className="ic"><svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 13l4 4L19 7" /></svg></div>
              <h4>มีหลักฐานกำกับ</h4>
              <p>ทุกดุอาอ์และทุกขั้นตอนระบุที่มาจากอัลกุรอานและหะดีษ</p>
            </div>
            <div className="vm-card fade-up" style={{ transitionDelay: "100ms" }}>
              <div className="ic"><svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 5h18M3 12h18M3 19h12" /></svg></div>
              <h4>เป็นขั้นตอน</h4>
              <p>เรียงลำดับชัดเจน พร้อมระบุว่าข้อใดเป็นรุก่น วาญิบ หรือสุนนะฮ์</p>
            </div>
            <div className="vm-card fade-up" style={{ transitionDelay: "200ms" }}>
              <div className="ic"><svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3l9 4.5v9L12 21 3 16.5v-9z" /></svg></div>
              <h4>ดุอาอ์ครบ</h4>
              <p>ภาษาอาหรับ คำอ่านไทย และความหมาย พร้อมใช้ระหว่างประกอบพิธี</p>
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
