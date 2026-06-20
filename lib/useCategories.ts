"use client";
import { useEffect, useState } from "react";
import { CATEGORIES as DEFAULT } from "@/data/seed";

const LS_KEY = "ut_categories";

export function useCategories() {
  const [cats, setCats] = useState<string[]>(DEFAULT);

  useEffect(() => {
    try {
      const v = localStorage.getItem(LS_KEY);
      if (v) setCats(JSON.parse(v));
    } catch {}
  }, []);

  const persist = (list: string[]) => {
    setCats(list);
    try { localStorage.setItem(LS_KEY, JSON.stringify(list)); } catch {}
  };

  const add = (name: string) => {
    const t = name.trim();
    if (!t || cats.includes(t)) return false;
    persist([...cats, t]);
    return true;
  };

  const remove = (name: string) => persist(cats.filter((c) => c !== name));

  const reset = () => persist([...DEFAULT]);

  return { cats, add, remove, reset };
}
