import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/data";

const BASE = "https://umrahthailand.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticles(true);

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/umrah`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/hajj`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/articles`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/about`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE}/contact`, changeFrequency: "yearly", priority: 0.5 },
  ];

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE}/articles/${a.slug.split("/").map(encodeURIComponent).join("/")}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...articlePages];
}
