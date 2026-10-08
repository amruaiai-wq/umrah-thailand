"use client";
import { useCallback, useEffect, useState } from "react";
import {
  AIRLINES, HOTEL_STARS, TRANSPORTS, GUIDES, FOOD_OPTIONS, EXTRAS, VISAS,
} from "@/data/planner";
import { getSupabaseBrowser, isSupabaseConfigured } from "@/lib/supabase-client";

export type PlannerPrices = {
  airlines: { name: string; price: number }[];
  hotelStars: { label: string; makkah: number; madinah: number }[];
  transports: { name: string; price: number }[];
  guides: { name: string; price: number }[];
  foodOptions: { name: string; pricePerDay: number }[];
  extras: { name: string; price: number }[];
  visas: { name: string; price: number }[];
};

const LS_KEY = "ut_planner_prices";

export function plannerDefaults(): PlannerPrices {
  return {
    airlines: AIRLINES.map((a) => ({ name: a.name, price: a.price })),
    hotelStars: HOTEL_STARS.map((h) => ({ label: h.label, makkah: h.makkah, madinah: h.madinah })),
    transports: TRANSPORTS.map((t) => ({ name: t.name, price: t.price })),
    guides: GUIDES.map((g) => ({ name: g.name, price: g.price })),
    foodOptions: FOOD_OPTIONS.map((f) => ({ name: f.name, pricePerDay: f.pricePerDay })),
    extras: EXTRAS.map((e) => ({ name: e.name, price: e.price })),
    visas: VISAS.map((v) => ({ name: v.name, price: v.price })),
  };
}

// Stored prices may predate options added to data/planner — fall back per section.
function withDefaults(v: (Partial<PlannerPrices> & { visaPrice?: number }) | null | undefined): PlannerPrices {
  const d = plannerDefaults();
  if (!v) return d;
  const pick = <K extends keyof PlannerPrices>(k: K) =>
    (Array.isArray(v[k]) && (v[k] as unknown[]).length ? v[k] : d[k]) as PlannerPrices[K];
  return {
    airlines: pick("airlines"),
    hotelStars: pick("hotelStars"),
    transports: pick("transports"),
    guides: pick("guides"),
    foodOptions: pick("foodOptions"),
    extras: pick("extras"),
    // Older saves had a single visaPrice: carry it over as the Umrah visa price.
    visas: Array.isArray(v.visas) && v.visas.length
      ? v.visas
      : d.visas.map((x, i) => (i === 0 && typeof v.visaPrice === "number" ? { ...x, price: v.visaPrice } : x)),
  };
}

function lsLoad(): PlannerPrices {
  try {
    const v = localStorage.getItem(LS_KEY);
    return withDefaults(v ? JSON.parse(v) : null);
  } catch {
    return plannerDefaults();
  }
}

export function usePlannerPrices() {
  const [prices, setPrices] = useState<PlannerPrices>(plannerDefaults);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      const sb = isSupabaseConfigured() ? getSupabaseBrowser() : null;
      if (sb) {
        const { data } = await sb.from("planner_prices").select("data").eq("id", 1).maybeSingle();
        // No row yet: show prices an admin saved locally before prices moved to Supabase
        if (alive) setPrices(data?.data ? withDefaults(data.data as Partial<PlannerPrices>) : lsLoad());
      } else if (alive) {
        setPrices(lsLoad());
      }
      if (alive) setLoaded(true);
    })();
    return () => { alive = false; };
  }, []);

  /** Returns an error message, or null on success. */
  const save = useCallback(async (next: PlannerPrices): Promise<string | null> => {
    const sb = isSupabaseConfigured() ? getSupabaseBrowser() : null;
    if (sb) {
      const { error } = await sb
        .from("planner_prices")
        .upsert({ id: 1, data: next, updated_at: new Date().toISOString() });
      if (error) return error.message;
    } else {
      try { localStorage.setItem(LS_KEY, JSON.stringify(next)); } catch {}
    }
    setPrices(next);
    return null;
  }, []);

  const reset = useCallback(async (): Promise<string | null> => {
    const sb = isSupabaseConfigured() ? getSupabaseBrowser() : null;
    if (sb) {
      const { error } = await sb.from("planner_prices").delete().eq("id", 1);
      if (error) return error.message;
    } else {
      try { localStorage.removeItem(LS_KEY); } catch {}
    }
    setPrices(plannerDefaults());
    return null;
  }, []);

  return { prices, loaded, save, reset };
}
