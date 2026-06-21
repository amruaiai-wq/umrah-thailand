import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? null;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? null;

  const hasUrl = !!url && !url.includes("your-project");
  const hasKey = !!key;

  if (!hasUrl || !hasKey) {
    return NextResponse.json({
      ok: false,
      reason: "Supabase env vars missing on server",
      hasUrl,
      hasKey,
    });
  }

  const headers = { apikey: key, Authorization: `Bearer ${key}` };

  try {
    // 1. List articles
    const listRes = await fetch(`${url}/rest/v1/articles?published=eq.true&order=id.desc&limit=5`, { headers, cache: "no-store" });
    const listData = await listRes.json();
    const articles = Array.isArray(listData) ? listData : [];

    // 2. Try slug lookup for first article
    let slugTest: Record<string, unknown> = { skipped: "no articles" };
    if (articles[0]?.slug) {
      const slug = articles[0].slug as string;
      const slugRes = await fetch(`${url}/rest/v1/articles?slug=eq.${encodeURIComponent(slug)}&limit=1`, { headers, cache: "no-store" });
      const slugData = await slugRes.json();
      slugTest = { status: slugRes.status, slug, found: Array.isArray(slugData) ? slugData.length : 0, raw: slugData };
    }

    return NextResponse.json({
      ok: true,
      count: articles.length,
      sample: articles.map((a: Record<string, unknown>) => ({ id: a.id, slug: a.slug, title: a.title, published: a.published })),
      slugLookup: slugTest,
    });
  } catch (e) {
    return NextResponse.json({ ok: false, reason: String(e) });
  }
}
