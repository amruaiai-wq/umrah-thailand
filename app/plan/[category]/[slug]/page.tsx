import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  HIST_CATEGORIES, getSites, findItem, getCategoryMeta, isBattle,
  type CategorySlug, type Site, type Battle,
} from "@/data/historySites";

export function generateStaticParams() {
  return HIST_CATEGORIES.flatMap((cat) =>
    getSites(cat.slug).map((item) => ({ category: cat.slug, slug: item.slug }))
  );
}

export function generateMetadata({ params }: { params: { category: string; slug: string } }): Metadata {
  const item = findItem(params.category as CategorySlug, params.slug);
  if (!item) return { title: "ไม่พบหัวข้อ" };
  const cat = getCategoryMeta(params.category as CategorySlug);
  return {
    title: `${item.name} | ${cat.labelFull}`,
    description: isBattle(item) ? item.lesson.slice(0, 160) : item.virtue.slice(0, 160),
  };
}

function SiteDetail({ site, catSlug }: { site: Site; catSlug: string }) {
  const cat = getCategoryMeta(catSlug as CategorySlug);
  return (
    <main>
      <section className="page-hero" style={{ background: cat.gradient }}>
        <div className="hero-pattern" />
        <div className="wrap">
          <div className="breadcrumb">
            <Link href="/">หน้าหลัก</Link> /
            <Link href="/plan">สถานที่ประวัติศาสตร์</Link> /
            <Link href={`/plan/${catSlug}`}>{cat.label}</Link> /
            <span>{site.name}</span>
          </div>
          <p className="hist-hero-ar">{site.ar}</p>
          <h1>{site.name}</h1>
          <p style={{ color: "rgba(255,255,255,.7)", fontSize: "1.05rem" }}>{site.sub}</p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap narrow">
          <span className="hist-detail-tag" style={{ background: site.tagBg, color: site.tagColor }}>
            {site.tag}
          </span>

          {/* Primary virtue */}
          <div className="hist-detail-virtue">
            <div className="hist-detail-virtue-icon">
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div>
              <span className="hist-detail-label">ความประเสริฐ</span>
              <blockquote className="hist-detail-quote">&ldquo;{site.virtue}&rdquo;</blockquote>
              <span className="hist-detail-ref">{site.virtueRef}</span>
            </div>
          </div>

          {/* Additional virtues */}
          {site.virtues && site.virtues.length > 0 && (
            <div className="hist-detail-section">
              <h2 className="hist-detail-heading">หะดีษและอ้างอิง</h2>
              <div className="hist-detail-virtues-list">
                {site.virtues.map((v, i) => (
                  <div key={i} className="hist-detail-virtue-item">
                    <blockquote className="hist-detail-quote-sm">&ldquo;{v.text}&rdquo;</blockquote>
                    <span className="hist-detail-ref">{v.ref}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quran verse */}
          {site.quranVerse && (
            <div className="hist-detail-virtue">
              <div className="hist-detail-virtue-icon">
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
                </svg>
              </div>
              <div>
                <span className="hist-detail-label">อัลกุรอาน</span>
                <blockquote className="hist-detail-quote">&ldquo;{site.quranVerse.text}&rdquo;</blockquote>
                <span className="hist-detail-ref">{site.quranVerse.ref}</span>
              </div>
            </div>
          )}

          {/* Key facts */}
          {site.keyFacts && site.keyFacts.length > 0 && (
            <div className="hist-detail-section">
              <h2 className="hist-detail-heading">ข้อมูลสำคัญ</h2>
              <div className="hist-detail-facts">
                {site.keyFacts.map((f, i) => (
                  <div key={i} className="hist-detail-fact">
                    <span className="hist-detail-fact-label">{f.label}</span>
                    <span>{f.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* History */}
          <div className="hist-detail-section">
            <h2 className="hist-detail-heading">ประวัติและเหตุการณ์สำคัญ</h2>
            <p className="hist-detail-body">{site.history}</p>
            {site.historyDetails && site.historyDetails.map((para, i) => (
              <p key={i} className="hist-detail-body">{para}</p>
            ))}
          </div>

          {/* Visit tips */}
          {site.visitTips && site.visitTips.length > 0 && (
            <div className="hist-detail-section">
              <h2 className="hist-detail-heading">คำแนะนำสำหรับผู้แสวงบุญ</h2>
              <ul className="hist-detail-tips">
                {site.visitTips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="hist-detail-back">
            <Link className="btn btn-outline" href={`/plan/${catSlug}`}>← กลับ{cat.label}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function BattleDetail({ battle, catSlug }: { battle: Battle; catSlug: string }) {
  const cat = getCategoryMeta(catSlug as CategorySlug);
  return (
    <main>
      <section className="page-hero" style={{ background: cat.gradient }}>
        <div className="hero-pattern" />
        <div className="wrap">
          <div className="breadcrumb">
            <Link href="/">หน้าหลัก</Link> /
            <Link href="/plan">สถานที่ประวัติศาสตร์</Link> /
            <Link href={`/plan/${catSlug}`}>{cat.label}</Link> /
            <span>{battle.name}</span>
          </div>
          <p className="hist-hero-ar">{battle.ar}</p>
          <h1>{battle.name}</h1>
          <p style={{ color: "rgba(255,255,255,.7)" }}>{battle.date}</p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap narrow">
          {/* Core facts */}
          <div className="hist-detail-facts">
            <div className="hist-detail-fact">
              <span className="hist-detail-fact-label">สถานที่</span>
              <span>{battle.location}</span>
            </div>
            <div className="hist-detail-fact">
              <span className="hist-detail-fact-label">กำลังรบ</span>
              <span>{battle.sides}</span>
            </div>
            <div className="hist-detail-fact">
              <span className="hist-detail-fact-label">ผลการรบ</span>
              <span>{battle.result}</span>
            </div>
          </div>

          {/* Background */}
          {battle.background && (
            <div className="hist-detail-section">
              <h2 className="hist-detail-heading">ภูมิหลังและเหตุที่เกิด</h2>
              <p className="hist-detail-body">{battle.background}</p>
            </div>
          )}

          {/* Key figures */}
          {battle.keyFigures && battle.keyFigures.length > 0 && (
            <div className="hist-detail-section">
              <h2 className="hist-detail-heading">บุคคลสำคัญ</h2>
              <div className="hist-detail-figures">
                {battle.keyFigures.map((f, i) => (
                  <div key={i} className="hist-detail-figure">
                    <span className="hist-detail-figure-name">{f.name}</span>
                    <span className="hist-detail-figure-role">{f.role}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timeline */}
          {battle.timeline && battle.timeline.length > 0 && (
            <div className="hist-detail-section">
              <h2 className="hist-detail-heading">ลำดับเหตุการณ์</h2>
              <ol className="hist-detail-timeline">
                {battle.timeline.map((t, i) => (
                  <li key={i} className="hist-detail-timeline-item">
                    <span className="hist-detail-timeline-time">{t.time}</span>
                    <span className="hist-detail-timeline-event">{t.event}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Lesson */}
          <div className="hist-detail-section">
            <h2 className="hist-detail-heading">บทเรียนและความสำคัญ</h2>
            <p className="hist-detail-body">{battle.lesson}</p>
          </div>

          {/* Detailed lessons */}
          {battle.lessons && battle.lessons.length > 0 && (
            <div className="hist-detail-section">
              <h2 className="hist-detail-heading">บทเรียนเชิงลึก</h2>
              <div className="hist-detail-lessons">
                {battle.lessons.map((l, i) => (
                  <div key={i} className="hist-detail-lesson">
                    <h3 className="hist-detail-lesson-title">{l.title}</h3>
                    <p className="hist-detail-lesson-desc">{l.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Aftermath */}
          {battle.aftermath && (
            <div className="hist-detail-section">
              <h2 className="hist-detail-heading">ผลพวงหลังยุทธการ</h2>
              <p className="hist-detail-body">{battle.aftermath}</p>
            </div>
          )}

          {/* Primary Quran */}
          {battle.quran && (
            <div className="hist-detail-virtue">
              <div className="hist-detail-virtue-icon">
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
                </svg>
              </div>
              <div>
                <span className="hist-detail-label">อัลกุรอาน</span>
                <blockquote className="hist-detail-quote">&ldquo;{battle.quran}&rdquo;</blockquote>
              </div>
            </div>
          )}

          {/* Additional Quran verses */}
          {battle.quranVerses && battle.quranVerses.length > 0 && (
            <div className="hist-detail-section">
              <h2 className="hist-detail-heading">อายะฮ์ที่เกี่ยวข้อง</h2>
              <div className="hist-detail-virtues-list">
                {battle.quranVerses.map((v, i) => (
                  <div key={i} className="hist-detail-virtue-item">
                    <blockquote className="hist-detail-quote-sm">&ldquo;{v.text}&rdquo;</blockquote>
                    <span className="hist-detail-ref">{v.ref}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hadiths */}
          {battle.hadiths && battle.hadiths.length > 0 && (
            <div className="hist-detail-section">
              <h2 className="hist-detail-heading">หะดีษที่เกี่ยวข้อง</h2>
              <div className="hist-detail-virtues-list">
                {battle.hadiths.map((h, i) => (
                  <div key={i} className="hist-detail-virtue-item">
                    <blockquote className="hist-detail-quote-sm">&ldquo;{h.text}&rdquo;</blockquote>
                    <span className="hist-detail-ref">{h.ref}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="hist-detail-back">
            <Link className="btn btn-outline" href={`/plan/${catSlug}`}>← กลับ{cat.label}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function DetailPage({ params }: { params: { category: string; slug: string } }) {
  const item = findItem(params.category as CategorySlug, params.slug);
  if (!item) notFound();

  if (isBattle(item)) {
    return <BattleDetail battle={item} catSlug={params.category} />;
  }
  return <SiteDetail site={item} catSlug={params.category} />;
}
