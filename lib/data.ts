import { Article, Sponsor } from "@/lib/types";
import { seedArticles, seedSponsors } from "@/data/seed";

function sbConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  if (!url || !key || url.includes("your-project")) return null;
  return { url, key };
}

async function sbFetch<T>(path: string): Promise<T[] | null> {
  const cfg = sbConfig();
  if (!cfg) return null;
  try {
    const res = await fetch(`${cfg.url}/rest/v1/${path}`, {
      headers: { apikey: cfg.key, Authorization: `Bearer ${cfg.key}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as T[];
  } catch {
    return null;
  }
}

// --- Articles ---
export async function getArticles(onlyPublished = true): Promise<Article[]> {
  const now = new Date().toISOString();
  let path = "articles?order=id.desc";
  if (onlyPublished) {
    path += `&published=eq.true&or=(publish_at.is.null,publish_at.lte.${encodeURIComponent(now)})`;
  }
  const data = await sbFetch<Article>(path);
  if (data === null) {
    return onlyPublished
      ? seedArticles.filter((a) => a.published && (!a.publish_at || new Date(a.publish_at) <= new Date()))
      : seedArticles;
  }
  return data;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const data = await sbFetch<Article>(`articles?slug=eq.${encodeURIComponent(slug)}&limit=1`);
  if (data === null) return seedArticles.find((a) => a.slug === slug) ?? null;
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
