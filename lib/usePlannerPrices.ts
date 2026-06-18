"use client";
import { useCallback, useEffect, useState } from "react";
import {
  AIRLINES, HOTEL_STARS, TRANSPORTS, GUIDES, FOOD_OPTIONS, EXTRAS, VISA_PRICE,
} from "@/data/planner";

export type PlannerPrices = {
  airlines: { name: string; price: number }[];
  hotelStars: { label: string; makkah: number; madinah: number }[];
  transports: { name: string; price: number }[];
  guides: { name: string; price: number }[];
  foodOptions: { name: string; pricePerDay: number }[];
  extras: { name: string; price: number }[];
  visaPrice: number;
};

const LS_KEY = "ut_planner_prices";

function defaults(): PlannerPrices {
  return {
    airlines: AIRLINES.map((a) => ({ name: a.name, price: a.price })),
    hotelStars: HOTEL_STARS.map((h) => ({ label: h.label, makkah: h.makkah, madinah: h.madinah })),
    transports: TRANSPORTS.map((t) => ({ name: t.name, price: t.price })),
    guides: GUIDES.map((g) => ({ name: g.name, price: g.price })),
    foodOptions: FOOD_OPTIONS.map((f) => ({ name: f.name, pricePerDay: f.pricePerDay })),
    extras: EXTRAS.map((e) => ({ name: e.name, price: e.price })),
    visaPrice: VISA_PRICE,
  };
}

function load(): PlannerPrices {
  try {
    const v = localStorage.getItem(LS_KEY);
    return v ? JSON.parse(v) : defaults();
  } catch {
    return defaults();
  }
}

export function usePlannerPrices() {
  const [prices, setPrices] = useState<PlannerPrices>(defaults);

  useEffect(() => { setPrices(load()); }, []);

  const save = useCallback((next: PlannerPrices) => {
    try { localStorage.setItem(LS_KEY, JSON.stringify(next)); } catch {}
    setPrices(next);
  }, []);

  const reset = useCallback(() => {
    try { localStorage.removeItem(LS_KEY); } catch {}
    setPrices(defaults());
  }, []);

  return { prices, save, reset };
}
