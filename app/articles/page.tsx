import type { Metadata } from "next";
import Link from "next/link";
import { getArticles } from "@/lib/data";
import ArticleGrid from "@/components/ArticleGrid";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "บทความและความรู้",
  description: "คู่มือ เคล็ดลับการเดินทาง การเตรียมตัว และความรู้อิสลามที่เป็นประโยชน์เรื่องอุมเราะห์และฮัจญ์",
  alternates: { canonical: "/articles" },
};

export default async function ArticlesPage() {
  const articles = await getArticles(true);
  return (
    <main>
      <section className="page-hero">
        <div className="hero-pattern" />
        <div className="wrap">
          <div className="breadcrumb"><Link href="/">หน้าหลัก</Link> / <span>บทความ</span></div>
          <h1>บทความและความรู้</h1>
          <p>คู่มือ เคล็ดลับการเดินทาง การเตรียมตัว และความรู้อิสลามที่เป็นประโยชน์</p>
        </div>
      </section>
      <section className="sec" style={{ paddingTop: 60 }}>
        <div className="wrap">
          <ArticleGrid articles={articles} />
        </div>
      </section>
    </main>
  );
}
