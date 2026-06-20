import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  HIST_CATEGORIES, getSites, getCategoryMeta, isBattle,
  type CategorySlug, type Site, type Battle,
} from "@/data/historySites";

export function generateStaticParams() {
  return HIST_CATEGORIES.map((c) => ({ category: c.slug }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const cat = HIST_CATEGORIES.find((c) => c.slug === params.category);
  if (!cat) return { title: "ไม่พบหมวดหมู่" };
  return {
    title: `${cat.labelFull} | สถานที่ประวัติศาสตร์อิสลาม`,
    description: cat.desc,
  };
}

function SitePreviewCard({ item, catSlug }: { item: Site | Battle; catSlug: string }) {
  if (isBattle(item)) {
    const b = item as Battle;
    return (
      <Link href={`/plan/${catSlug}/${b.slug}`} className="hist-preview-card battle-preview">
        <p className="hist-preview-ar">{b.ar}</p>
        <h3>{b.name}</h3>
        <p className="hist-preview-sub">{b.date}</p>
        <p className="hist-preview-excerpt">{b.sides}</p>
        <span className="hist-preview-more">อ่านรายละเอียด →</span>
      </Link>
    );
  }
  const s = item as Site;
  return (
    <Link href={`/plan/${catSlug}/${s.slug}`} className="hist-preview-card">
      <span className="hist-preview-tag" style={{ background: s.tagBg, color: s.tagColor }}>{s.tag}</span>
      <p className="hist-preview-ar">{s.ar}</p>
      <h3>{s.name}</h3>
      <p className="hist-preview-sub">{s.sub}</p>
      <p className="hist-preview-excerpt">{s.virtue.slice(0, 80)}...</p>
      <span className="hist-preview-more">อ่านรายละเอียด →</span>
    </Link>
  );
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const cat = getCategoryMeta(params.category as CategorySlug);
  if (!cat) notFound();

  const items = getSites(params.category as CategorySlug);

  return (
    <main>
      <section className="page-hero" style={{ background: cat.gradient }}>
        <div className="hero-pattern" />
        <div className="wrap">
          <div className="breadcrumb">
            <Link href="/">หน้าหลัก</Link> /
            <Link href="/plan">สถานที่ประวัติศาสตร์</Link> /
            <span>{cat.label}</span>
          </div>
          <p className="hist-hero-ar">{cat.ar}</p>
          <h1>{cat.labelFull}</h1>
          <p style={{ color: "rgba(255,255,255,.72)", maxWidth: 560, lineHeight: 1.7 }}>{cat.desc}</p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="hist-preview-grid">
            {items.map((item) => (
              <SitePreviewCard key={item.slug} item={item} catSlug={params.category} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
