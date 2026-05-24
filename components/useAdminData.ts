"use client";
import { useCallback, useEffect, useState } from "react";
import { Article, Sponsor } from "@/lib/types";
import { seedArticles, seedSponsors } from "@/data/seed";
import { getSupabaseBrowser, isSupabaseConfigured } from "@/lib/supabase-client";

const LS_ARTICLES = "ut_articles";
const LS_SPONSORS = "ut_sponsors";

function lsLoad<T>(key: string, fallback: T[]): T[] {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : JSON.parse(JSON.stringify(fallback));
  } catch {
    return JSON.parse(JSON.stringify(fallback));
  }
}
function lsSave<T>(key: string, v: T[]) {
  try { localStorage.setItem(key, JSON.stringify(v)); } catch {}
}
function nextId<T extends { id: number }>(arr: T[]) {
  return arr.length ? Math.max(...arr.map((x) => x.id)) + 1 : 1;
}

export function useAdminData() {
  const supabase = getSupabaseBrowser();
  const cloud = isSupabaseConfigured() && !!supabase;
  const [articles, setArticles] = useState<Article[]>([]);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (cloud && supabase) {
      const [a, s] = await Promise.all([
        supabase.from("articles").select("*").order("id", { ascending: false }),
        supabase.from("sponsors").select("*").order("id", { ascending: true }),
      ]);
      setArticles((a.data as Article[]) || []);
      setSponsors((s.data as Sponsor[]) || []);
    } else {
      setArticles(lsLoad(LS_ARTICLES, seedArticles));
      setSponsors(lsLoad(LS_SPONSORS, seedSponsors));
    }
    setLoading(false);
  }, [cloud, supabase]);

  useEffect(() => { refresh(); }, [refresh]);

  // ----- Articles -----
  const saveArticle = async (a: Partial<Article>, id?: number) => {
    if (cloud && supabase) {
      if (id) await supabase.from("articles").update(a).eq("id", id);
      else await supabase.from("articles").insert([{ ...a, published: true }]);
    } else {
      const list = [...articles];
      if (id) {
        const idx = list.findIndex((x) => x.id === id);
        list[idx] = { ...list[idx], ...a } as Article;
      } else {
        list.unshift({ ...(a as Article), id: nextId(list), published: true });
      }
      lsSave(LS_ARTICLES, list);
    }
    await refresh();
  };
  const deleteArticle = async (id: number) => {
    if (cloud && supabase) await supabase.from("articles").delete().eq("id", id);
    else { const list = articles.filter((x) => x.id !== id); lsSave(LS_ARTICLES, list); }
    await refresh();
  };
  const toggleArticle = async (id: number) => {
    const a = articles.find((x) => x.id === id);
    if (!a) return;
    await saveArticle({ published: !a.published }, id);
  };

  // ----- Sponsors -----
  const saveSponsor = async (s: Partial<Sponsor>, id?: number) => {
    if (cloud && supabase) {
      if (id) await supabase.from("sponsors").update(s).eq("id", id);
      else await supabase.from("sponsors").insert([{ ...s, active: true }]);
    } else {
      const list = [...sponsors];
      if (id) {
        const idx = list.findIndex((x) => x.id === id);
        list[idx] = { ...list[idx], ...s } as Sponsor;
      } else {
        list.push({ ...(s as Sponsor), id: nextId(list), active: true });
      }
      lsSave(LS_SPONSORS, list);
    }
    await refresh();
  };
  const deleteSponsor = async (id: number) => {
    if (cloud && supabase) await supabase.from("sponsors").delete().eq("id", id);
    else { const list = sponsors.filter((x) => x.id !== id); lsSave(LS_SPONSORS, list); }
    await refresh();
  };
  const toggleSponsor = async (id: number) => {
    const s = sponsors.find((x) => x.id === id);
    if (!s) return;
    await saveSponsor({ active: !s.active }, id);
  };

  return {
    cloud, loading, articles, sponsors, refresh,
    saveArticle, deleteArticle, toggleArticle,
    saveSponsor, deleteSponsor, toggleSponsor,
  };
}
