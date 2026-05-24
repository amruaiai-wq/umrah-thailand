import Link from "next/link";
import { getArticles, getSponsors } from "@/lib/data";
import { ArticleCard } from "@/components/ArticleGrid";
import SponsorGrid from "@/components/SponsorGrid";

export default async function HomePage() {
  const [articles, sponsors] = await Promise.all([getArticles(true), getSponsors(true)]);
  const latest = articles.slice(0, 3);

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="hero-pattern" />
        <div className="hero-glow" />
        <div className="wrap">
          <span className="eyebrow" style={{ display: "inline-flex" }}>بسم الله الرحمن الرحيم</span>
          <h1>
            เรียนรู้วิธีทำ<br />
            <em>อุมเราะห์ &amp; ฮัจญ์</em><br />
            อย่างถูกต้องตามสุนนะฮ์
          </h1>
          <p>
            ศูนย์รวมความรู้สำหรับมุสลิมไทย อธิบายทุกขั้นตอนพร้อมดุอาอ์ภาษาอาหรับ คำอ่าน
            ความหมาย และหลักฐานจากอัลกุรอานและสุนนะฮ์ — เข้าใจง่าย ใช้ได้จริง
          </p>
          <div className="guide-pick">
            <Link className="gp-card" href="/umrah">
              <div className="ic">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3a9 9 0 100 18 9 9 0 000-18z" /><path d="M12 7v5l3 2" /></svg>
              </div>
              <h3>วิธีทำอุมเราะห์</h3>
              <p>5 ขั้นตอนหลัก ทำได้ตลอดทั้งปี</p>
              <span className="go">ดูคู่มือ →</span>
            </Link>
            <Link className="gp-card" href="/hajj">
              <div className="ic">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18M5 21V9l7-5 7 5v12" /><path d="M9 21v-6h6v6" /></svg>
              </div>
              <h3>วิธีทำฮัจญ์</h3>
              <p>เฉพาะช่วงเดือนซุลฮิจญะฮ์เท่านั้น</p>
              <span className="go">ดูคู่มือ →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">ทำไมต้องที่นี่</span>
            <h2>ความรู้ที่ตรวจสอบหลักฐานได้</h2>
            <p>เราเน้นความถูกต้องของเนื้อหา อ้างอิงแหล่งที่มา และนำเสนอให้เข้าใจง่ายสำหรับทุกคน</p>
          </div>
          <div className="vm-grid" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
            <div className="vm-card"><div className="ic"><svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 13l4 4L19 7" /></svg></div><h4>มีหลักฐานกำกับ</h4><p>ทุกดุอาอ์และทุกขั้นตอนระบุที่มาจากอัลกุรอานและหะดีษ</p></div>
            <div className="vm-card"><div className="ic"><svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 5h18M3 12h18M3 19h12" /></svg></div><h4>เป็นขั้นตอน</h4><p>เรียงลำดับชัดเจน พร้อมระบุว่าข้อใดเป็นรุก่น วาญิบ หรือสุนนะฮ์</p></div>
            <div className="vm-card"><div className="ic"><svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3l9 4.5v9L12 21 3 16.5v-9z" /></svg></div><h4>ดุอาอ์ครบ</h4><p>ภาษาอาหรับ คำอ่านไทย และความหมาย พร้อมใช้ระหว่างประกอบพิธี</p></div>
          </div>
        </div>
      </section>

      {/* SPONSORS */}
      <section className="sec sponsors">
        <div className="wrap">
          <div className="sec-head">
            <span className="ad-label">ได้รับการสนับสนุน · Sponsored</span>
            <h2 style={{ marginTop: 14 }}>บริษัทผู้ให้บริการอุมเราะห์ที่แนะนำ</h2>
            <p>เปรียบเทียบผู้ให้บริการที่ได้รับใบอนุญาต เพื่อเลือกแพ็กเกจที่เหมาะกับคุณ</p>
          </div>
          <SponsorGrid sponsors={sponsors} />
          <div className="leaderboard">
            <span className="ad-label">พื้นที่โฆษณา · Ad Slot 970×250</span>
            <p style={{ marginTop: 8, fontSize: ".9rem" }}>พื้นที่สำหรับแบนเนอร์พันธมิตร / Google AdSense / สปอนเซอร์</p>
          </div>
        </div>
      </section>

      {/* LATEST ARTICLES */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow">อัปเดตล่าสุด</span><h2>บทความและความรู้</h2></div>
          <div className="blog-grid">
            {latest.map((a) => <ArticleCard key={a.id} a={a} />)}
          </div>
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <Link className="btn btn-outline" href="/articles">ดูบทความทั้งหมด →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
