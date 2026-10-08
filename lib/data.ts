import { Article, Sponsor } from "@/lib/types";
import { seedArticles, seedSponsors } from "@/data/seed";

function sbConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  if (!url || !key || url.includes("your-project")) return null;
  return { url, key };
}

async function sbFetch<T>(path: string, label?: string): Promise<T[] | null> {
  const cfg = sbConfig();
  if (!cfg) return null;
  try {
    const url = `${cfg.url}/rest/v1/${path}`;
    const res = await fetch(url, {
      headers: { apikey: cfg.key, Authorization: `Bearer ${cfg.key}` },
      cache: "no-store",
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(`[sbFetch] ${label ?? path} → ${res.status}: ${body}`);
      return null;
    }
    return (await res.json()) as T[];
  } catch (e) {
    console.error(`[sbFetch] ${label ?? path} threw:`, e);
    return null;
  }
}

// --- Articles ---
export async function getArticles(onlyPublished = true): Promise<Article[]> {
  // Keep SQL simple — filter publish_at in JS to avoid PostgREST or() issues
  let path = "articles?order=id.desc";
  if (onlyPublished) path += "&published=eq.true";
  const data = await sbFetch<Article>(path);
  if (data === null) {
    return onlyPublished
      ? seedArticles.filter((a) => a.published && (!a.publish_at || new Date(a.publish_at) <= new Date()))
      : seedArticles;
  }
  if (onlyPublished) {
    const now = new Date();
    return data.filter((a) => !a.publish_at || new Date(a.publish_at) <= now);
  }
  return data;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  // params.slug from Next.js may arrive URL-encoded; decode first to avoid double-encoding
  const decoded = decodeURIComponent(slug);
  const data = await sbFetch<Article>(
    `articles?slug=eq.${encodeURIComponent(decoded)}&limit=1`,
    `slug-lookup:${decoded}`
  );
  if (data === null) return seedArticles.find((a) => a.slug === decoded) ?? null;
  return data[0] ?? null;
}

// --- Sponsors ---
export async function getSponsors(onlyActive = true): Promise<Sponsor[]> {
  let path = "sponsors?order=id.asc";
  if (onlyActive) path += "&active=eq.true";
  const data = await sbFetch<Sponsor>(path);
  if (data === null) {
    return onlyActive ? seedSponsors.filter((s) => s.active) : seedSponsors;
  }
  return data;
}
