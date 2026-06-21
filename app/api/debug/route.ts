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

  // Try raw fetch to Supabase REST API (bypasses SSR cookie logic)
  try {
    const res = await fetch(`${url}/rest/v1/articles?published=eq.true&order=id.desc&limit=5`, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
      cache: "no-store",
    });
    const data = await res.json();
    return NextResponse.json({
      ok: true,
      status: res.status,
      count: Array.isArray(data) ? data.length : 0,
      sample: Array.isArray(data) ? data.map((a: Record<string, unknown>) => ({ id: a.id, title: a.title, published: a.published })) : data,
    });
  } catch (e) {
    return NextResponse.json({ ok: false, reason: String(e) });
  }
}
