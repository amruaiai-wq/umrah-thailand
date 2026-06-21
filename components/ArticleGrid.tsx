"use client";
import { useState } from "react";
import Link from "next/link";
import { Article } from "@/lib/types";
import { useCategories } from "@/lib/useCategories";

export function ArticleCard({ a }: { a: Article }) {
  const cover = a.images?.[0];
  return (
    <Link className="art" href={`/articles/${a.slug}`}>
      <div
        className="art-img"
        style={
          cover
            ? { backgroundImage: `url(${cover})`, backgroundSize: "cover", backgroundPosition: "center" }
            : { background: a.img }
        }
      >
        <span className="art-cat">{a.cat}</span>
      </div>
      <div className="art-body">
        <span className="date">{a.date}</span>
        <h3>{a.title}</h3>
        <p>{a.ex}</p>
        <span className="art-more">อ่านต่อ →</span>
      </div>
    </Link>
  );
}

export default function ArticleGrid({ articles }: { articles: Article[] }) {
  const { cats: CATEGORIES } = useCategories();
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");

  const filtered = articles.filter(
    (a) =>
      (cat === "all" || a.cat === cat) &&
      (a.title.toLowerCase().includes(q.toLowerCase()) ||
        a.ex.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <>
      <div className="blog-tools">
        <div className="search-box">
          <svg width="18" height="18" fill="none" stroke="#69707E" strokeWidth="2">
            <circle cx="8" cy="8" r="6" /><path d="M13 13l4 4" />
          </svg>
          <input
            type="text"
            placeholder="ค้นหาบทความ..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <div className="cats">
          <span className={`cat ${cat === "all" ? "active" : ""}`} onClick={() => setCat("all")}>ทั้งหมด</span>
          {CATEGORIES.map((c) => (
            <span key={c} className={`cat ${cat === c ? "active" : ""}`} onClick={() => setCat(c)}>{c}</span>
          ))}
        </div>
      </div>
      <div className="blog-grid">
        {filtered.length ? (
          filtered.map((a) => <ArticleCard key={a.id} a={a} />)
        ) : (
          <p style={{ color: "#69707E" }}>ไม่พบบทความ</p>
        )}
      </div>
    </>
  );
}
