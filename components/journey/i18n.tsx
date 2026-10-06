"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";

export type Lang = "th" | "en" | "ar";
export type L = Record<Lang, string>;

const LS_KEY = "ut_lang";
const LANGS: Lang[] = ["th", "en", "ar"];

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: "th", setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("th");

  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search).get("lang");
      const saved = (q ?? localStorage.getItem(LS_KEY)) as Lang | null;
      if (saved && LANGS.includes(saved)) setLangState(saved);
    } catch {}
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(LS_KEY, l); } catch {}
  }, []);

  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

const LOCALES: Record<Lang, string> = { th: "th-TH", en: "en-US", ar: "ar-SA-u-nu-latn" };

export function useLang() {
  const { lang, setLang } = useContext(Ctx);
  const t = useCallback((x: L) => x[lang], [lang]);
  const num = useCallback((n: number) => n.toLocaleString(LOCALES[lang]), [lang]);
  return { lang, setLang, t, num, dir: lang === "ar" ? ("rtl" as const) : ("ltr" as const) };
}

const OPTS: { k: Lang; short: string; name: string; sub: string }[] = [
  { k: "th", short: "TH", name: "ไทย", sub: "Thai" },
  { k: "en", short: "EN", name: "English", sub: "อังกฤษ" },
  { k: "ar", short: "AR", name: "العربية", sub: "Arabic" },
];

export function LangSwitch() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const cur = OPTS.find((o) => o.k === lang) ?? OPTS[0];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={root} className={`uj-lang${open ? " open" : ""}`} dir="ltr">
      <button
        type="button"
        className="uj-lang-btn"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Language: ${cur.name}`}
        onClick={() => setOpen(!open)}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="12" cy="12" r="9.5" />
          <path d="M2.5 12h19M12 2.5c2.6 2.8 3.9 6 3.9 9.5s-1.3 6.7-3.9 9.5c-2.6-2.8-3.9-6-3.9-9.5s1.3-6.7 3.9-9.5z" />
        </svg>
        <span>{cur.short}</span>
        <svg className="uj-lang-chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div className="uj-lang-menu" role="menu">
        {OPTS.map((o) => (
          <button
            key={o.k}
            type="button"
            role="menuitemradio"
            aria-checked={lang === o.k}
            tabIndex={open ? 0 : -1}
            className={lang === o.k ? "on" : ""}
            onClick={() => { setLang(o.k); setOpen(false); }}
          >
            <span className="uj-lang-code">{o.short}</span>
            <span className="uj-lang-name">
              <b lang={o.k}>{o.name}</b>
              <small>{o.sub}</small>
            </span>
            <svg className="uj-lang-tick" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}
