import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug, getArticles } from "@/lib/data";

export async function generateStaticParams() {
  const articles = await getArticles(false);
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const a = await getArticleBySlug(params.slug);
  if (!a) return { title: "ไม่พบบทความ" };
  return {
    title: a.title,
    description: a.ex,
    alternates: { canonical: `/articles/${a.slug}` },
    openGraph: { title: a.title, description: a.ex, type: "article" },
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const a = await getArticleBySlug(params.slug);
  if (!a) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.ex,
    inLanguage: "th",
    datePublished: a.date,
    articleSection: a.cat,
    author: { "@type": "Organization", name: "Umrah Thailand" },
    publisher: { "@type": "Organization", name: "Umrah Thailand" },
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="page-hero">
        <div className="hero-pattern" />
        <div className="wrap">
          <div className="breadcrumb">
            <Link href="/">หน้าหลัก</Link> / <Link href="/articles">บทความ</Link> / <span>{a.cat}</span>
          </div>
          <h1>{a.title}</h1>
          <div className="meta"><span>{a.cat}</span><span>{a.date}</span></div>
        </div>
      </section>
      <section className="sec" style={{ paddingTop: 60 }}>
        <div className="wrap narrow">
          <div
            className="art-img"
            style={{ background: a.img, height: 280, borderRadius: 18, marginBottom: 30 }}
          />
          <div className="article-body">
            <p className="lead">{a.ex}</p>
            {a.body && a.body.includes("<") ? (
              <div dangerouslySetInnerHTML={{ __html: a.body }} />
            ) : a.body ? (
              a.body.split("\n").filter(Boolean).map((para, i) => <p key={i}>{para}</p>)
            ) : (
              <p style={{ color: "var(--muted)" }}>เนื้อหาเต็มของบทความนี้กำลังจัดเตรียม</p>
            )}
          </div>
          <div style={{ marginTop: 40 }}>
            <Link className="btn btn-outline" href="/articles">← กลับสู่บทความทั้งหมด</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
