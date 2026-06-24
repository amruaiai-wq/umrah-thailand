import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/data";
import ArticleRenderer from "@/components/ArticleRenderer";
import { parseTOC, readingMins } from "@/lib/articleUtils";
import ArticleTOC from "@/components/ArticleTOC";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const a = await getArticleBySlug(params.slug);
  if (!a) return { title: "ไม่พบบทความ" };
  return {
    title: a.title,
    description: a.ex,
    alternates: { canonical: `/articles/${a.slug}` },
    openGraph: {
      title: a.title,
      description: a.ex,
      type: "article",
      images: a.images?.[0] ? [{ url: a.images[0] }] : [],
    },
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const a = await getArticleBySlug(params.slug);
  if (!a) notFound();

  const toc = a.body ? parseTOC(a.body) : [];
  const mins = a.body ? readingMins(a.body) : 3;
  const coverImg = a.images?.[0];
  // body images: all if no cover distinction, or skip first if it's used as hero
  const bodyImages = a.images ?? [];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.ex,
    inLanguage: "th",
    datePublished: a.date,
    articleSection: a.cat,
    ...(coverImg ? { image: coverImg } : {}),
    author: { "@type": "Organization", name: "Umrah Thailand" },
    publisher: { "@type": "Organization", name: "Umrah Thailand" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "หน้าหลัก", item: "/" },
      { "@type": "ListItem", position: 2, name: "บทความ", item: "/articles" },
      { "@type": "ListItem", position: 3, name: a.title },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* HERO */}
      <section className="page-hero art-hero">
        <div className="hero-pattern" />
        {coverImg ? (
          <div className="art-cover" style={{ backgroundImage: `url(${coverImg})` }} />
        ) : (
          <div className="art-cover" style={{ background: a.img }} />
        )}
        <div className="art-hero-overlay" />
        <div className="wrap art-hero-content">
          <nav className="breadcrumb" aria-label="breadcrumb">
            <Link href="/">หน้าหลัก</Link>
            <span>/</span>
            <Link href="/articles">บทความ</Link>
            <span>/</span>
            <span>{a.cat}</span>
          </nav>
          <div className="art-meta-row">
            <span className="art-cat-badge">{a.cat}</span>
            <span className="art-meta-item">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="16" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
              </svg>
              {a.date}
            </span>
            <span className="art-meta-item">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
              </svg>
              อ่าน {mins} นาที
            </span>
          </div>
          <h1>{a.title}</h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="sec art-sec">
        <div className="wrap">
          <div className={`art-layout ${toc.length === 0 ? "no-sidebar" : ""}`}>

            {/* Main */}
            <article className="art-content">
              <p className="lead">{a.ex}</p>

              {a.body ? (
                <ArticleRenderer body={a.body} images={bodyImages} />
              ) : (
                <p style={{ color: "var(--muted)", fontStyle: "italic" }}>เนื้อหาเต็มกำลังจัดเตรียม</p>
              )}

              {a.ref_url && (
                <div className="art-ref">
                  <span className="art-ref-label">แหล่งอ้างอิง</span>
                  <a href={a.ref_url} target="_blank" rel="noopener noreferrer" className="art-ref-link">
                    {a.ref_url}
                  </a>
                </div>
              )}

              <div className="art-back">
                <Link className="btn btn-outline" href="/articles">← กลับสู่บทความทั้งหมด</Link>
              </div>
            </article>

            {/* Sidebar */}
            {toc.length > 0 && (
              <aside className="art-sidebar">
                <div className="art-sidebar-inner">
                  <ArticleTOC items={toc} />
                  <div className="art-sidebar-cta">
                    <div className="sidebar-cta-icon">
                      <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                      </svg>
                    </div>
                    <p>สนใจทำอุมเราะห์? ทีมงานพร้อมให้คำปรึกษาฟรี</p>
                    <Link className="btn btn-emerald" href="/contact" style={{ justifyContent: "center" }}>
                      ปรึกษาฟรี →
                    </Link>
                  </div>
                </div>
              </aside>
            )}

          </div>
        </div>
      </section>
    </main>
  );
}
