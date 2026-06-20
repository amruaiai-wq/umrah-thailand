export type Rule = "รุก่น" | "วาญิบ" | "สุนนะฮ์";

export interface Dua {
  label: string;
  ar: string;
  tr: string;
  mn: string;
}

export interface GuideStep {
  id: string;
  no: string;
  t: string;
  ar: string;
  rule: Rule;
  desc: string;
  tips?: string[];
  mistakes?: string[];
  duas: Dua[];
  evi: string;
  ad?: boolean;
}

export interface JourneyStop {
  num: string;
  t: string;
  ar: string;
  d: string;
  anchor?: string;
}

export interface Article {
  id: number;
  slug: string;
  cat: string;
  date: string;
  title: string;
  ex: string;
  body?: string;
  img: string;
  images?: string[];
  published: boolean;
  publishAt?: string; // ISO datetime — if set and in future, hidden from public
}

export interface Sponsor {
  id: number;
  n: string;
  r: string;
  d: string;
  i: string;
  url: string;
  active: boolean;
}
