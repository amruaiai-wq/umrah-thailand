import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Article, Sponsor } from "@/lib/types";
import { seedArticles, seedSponsors } from "@/data/seed";

function getServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || url.includes("your-project")) return null;
  try {
    const cookieStore = cookies();
    return createServerClient(url, key, {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    });
  } catch {
    return null;
  }
}

// --- Articles ---
export async function getArticles(onlyPublished = true): Promise<Article[]> {
  const now = new Date();
  const sb = getServerClient();
  if (!sb) {
    const list = onlyPublished
      ? seedArticles.filter((a) => a.published && (!a.publishAt || new Date(a.publishAt) <= now))
      : seedArticles;
    return list;
  }
  let query = sb.from("articles").select("*").order("id", { ascending: false });
  if (onlyPublished) {
    query = query.eq("published", true);
    query = query.or(`publish_at.is.null,publish_at.lte.${now.toISOString()}`);
  }
  const { data, error } = await query;
  if (error || !data) return seedArticles.filter((a) => a.published && (!a.publishAt || new Date(a.publishAt) <= now));
  return data as Article[];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const sb = getServerClient();
  if (!sb) return seedArticles.find((a) => a.slug === slug) ?? null;
  const { data } = await sb.from("articles").select("*").eq("slug", slug).single();
  return (data as Article) ?? seedArticles.find((a) => a.slug === slug) ?? null;
}

// --- Sponsors ---
export async function getSponsors(onlyActive = true): Promise<Sponsor[]> {
  const sb = getServerClient();
  if (!sb) {
    return onlyActive ? seedSponsors.filter((s) => s.active) : seedSponsors;
  }
  let query = sb.from("sponsors").select("*").order("id", { ascending: true });
  if (onlyActive) query = query.eq("active", true);
  const { data, error } = await query;
  if (error || !data) return seedSponsors.filter((s) => s.active);
  return data as Sponsor[];
}
