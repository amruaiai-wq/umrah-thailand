"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scene from "./Scene";
import CostCalculator, { LineIcon } from "./CostCalculator";
import { ARTS, HeroArt, buildHero } from "./arts";
import { SCENES, SCENE_IMAGES, UI, WHY, type StoryDua, type StoryScene } from "./content";
import { useLang, type L } from "./i18n";

export default function UmrahStory() {
  return <Story />;
}

const CHAPTERS: { id: string; label: L }[] = [
  ...SCENES.map((s) => ({ id: s.id, label: s.rail })),
  { id: "calc", label: UI.railCalc },
  { id: "why", label: UI.railWhy },
];

function Story() {
  const { lang, dir } = useLang();
  const rootRef = useRef<HTMLDivElement>(null);

  // Text length changes with language, which changes every pinned section's height.
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [lang]);

  return (
    <div ref={rootRef} className="uj" dir={dir} lang={lang}>
      <ProgressBar rootRef={rootRef} />
      <Rail />

      <Hero />

      {SCENES.map((s) => {
        const { Art, build, hud } = ARTS[s.id];
        return (
          <Scene
            key={s.id}
            id={s.id}
            build={build}
            image={SCENE_IMAGES[s.id]}
            art={<Art />}
            overlay={hud && <Hud kind={hud} />}
          >
            <Card s={s} />
            {s.duas?.map((d, i) => <DuaCard key={i} d={d} />)}
          </Scene>
        );
      })}

      <section id="ch-calc" data-chapter="calc" className="uj-calc">
        <CostCalculator />
      </section>

      <section id="ch-why" data-chapter="why" className="uj-why">
        <WhyUs />
      </section>
    </div>
  );
}

/* ── hero ─────────────────────────────────────────────────── */

function Hero() {
  const { t } = useLang();
  return (
    <Scene
      id="hero"
      className="uj-hero"
      build={buildHero}
      art={<HeroArt />}
      overlay={
        <>
          <div className="dawn" aria-hidden="true" />
          <div className="uj-hero-title">
            <span className="uj-hero-eyebrow">Umrah Thailand · عمرة تايلاند</span>
            <h1 lang="en" dir="ltr">How to Perform <em>Umrah</em></h1>
            <p className="uj-hero-ar" lang="ar" dir="rtl">كيفية أداء العمرة</p>
            <p className="uj-hero-sub">{t(UI.heroSub)}</p>
          </div>
          <div className="uj-cue" aria-hidden="true">
            <span className="uj-mouse"><i /></span>
            {t(UI.scroll)}
          </div>
        </>
      }
    />
  );
}

/* ── cards ────────────────────────────────────────────────── */

function Card({ s }: { s: StoryScene }) {
  const { t } = useLang();
  return (
    <article className="uj-card">
      <div className="uj-kicker">
        <span>{t(s.kicker)}</span>
        {s.rule && <span className="uj-rule">{t(s.rule)}</span>}
      </div>
      <h2>{t(s.title)}</h2>
      <p className="uj-lead">{t(s.lead)}</p>

      {s.facts && (
        <dl className="uj-facts">
          {s.facts.map((f, i) => (
            <div key={i}><dt>{t(f.k)}</dt><dd>{t(f.v)}</dd></div>
          ))}
        </dl>
      )}

      {s.points.length > 0 && (
        <ul className="uj-points">
          {s.points.map((p, i) => <li key={i}>{t(p)}</li>)}
        </ul>
      )}

      {s.sites && (
        <ol className="uj-sites">
          {s.sites.map((site, i) => (
            <li key={i} className={site.city}>
              <span className="n">{i + 1}</span>
              <div>
                <b>{t(site.name)}</b>
                <span>{t(site.d)}</span>
              </div>
            </li>
          ))}
        </ol>
      )}

    </article>
  );
}

function DuaCard({ d }: { d: StoryDua }) {
  const { lang, t } = useLang();
  return (
    <article className="uj-card uj-dua">
      <span className="uj-dua-label">{t(d.label)}</span>
      <p className="uj-dua-ar" lang="ar" dir="rtl">{d.ar}</p>
      {lang !== "ar" && (
        <>
          <p className="uj-dua-tr"><small>{t(UI.translit)}</small>{d.tr[lang]}</p>
          <p className="uj-dua-mn"><small>{t(UI.meaning)}</small>{d.mn[lang]}</p>
        </>
      )}
    </article>
  );
}

function Hud({ kind }: { kind: "round" | "lap" }) {
  const { t } = useLang();
  return (
    <div className="uj-hud" aria-hidden="true">
      <span className="uj-hud-label">{t(kind === "round" ? UI.round : UI.lap)}</span>
      <span className="uj-hud-num"><b className="count">1</b><small>/7</small></span>
      <span className="uj-pips">{Array.from({ length: 7 }, (_, i) => <i key={i} className="pip" />)}</span>
    </div>
  );
}

/* ── navigation chrome ────────────────────────────────────── */

function ProgressBar({ rootRef }: { rootRef: React.RefObject<HTMLDivElement> }) {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const st = ScrollTrigger.create({
      trigger: root,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => { if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`; },
    });
    return () => st.kill();
  }, [rootRef]);
  return <div className="uj-progress" aria-hidden="true"><div ref={bar} /></div>;
}

function Rail() {
  const { t } = useLang();
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const els = CHAPTERS.map((c) => document.getElementById(`ch-${c.id}`)).filter(Boolean) as HTMLElement[];
    const hero = document.getElementById("ch-hero");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          if (e.target === hero) setActive(-1);
          else setActive(CHAPTERS.findIndex((c) => `ch-${c.id}` === e.target.id));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    if (hero) io.observe(hero);
    return () => io.disconnect();
  }, []);

  const go = (id: string) => {
    const el = document.getElementById(`ch-${id}`);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + 2, behavior: "smooth" });
  };

  return (
    <nav className={`uj-rail${active < 0 ? " off" : ""}`} aria-label="Chapters">
      {CHAPTERS.map((c, i) => (
        <button
          key={c.id}
          type="button"
          className={i === active ? "on" : i < active ? "done" : ""}
          aria-current={i === active ? "step" : undefined}
          onClick={() => go(c.id)}
        >
          <span>{t(c.label)}</span>
          <i />
        </button>
      ))}
    </nav>
  );
}

/* ── why us ───────────────────────────────────────────────── */

const WHY_ICONS = [
  // headset: on-the-ground support
  <><path d="M4 14v-2a8 8 0 0116 0v2" /><path d="M20 14v2a2 2 0 01-2 2h-1v-6h1a2 2 0 012 2zM4 14v2a2 2 0 002 2h1v-6H6a2 2 0 00-2 2z" /><path d="M17 18v.5a3.5 3.5 0 01-3.5 3.5H12" /></>,
  // medal: experience
  <><circle cx="12" cy="9" r="6" /><path d="M8.5 14 7 22l5-3 5 3-1.5-8" /><path d="M12 6.5l.9 1.8 2 .3-1.5 1.4.4 2-1.8-1-1.8 1 .4-2-1.5-1.4 2-.3z" /></>,
  // shield-check: accountable
  <><path d="M12 22s8-3.6 8-10V5.2L12 2 4 5.2V12c0 6.4 8 10 8 10z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>,
  // layers: all in one
  <><path d="M12 2.5 2.5 7.5 12 12.5l9.5-5z" /><path d="M2.5 12 12 17l9.5-5" /><path d="M2.5 16.5 12 21.5l9.5-5" /></>,
];

function WhyUs() {
  const { lang, t } = useLang();
  return (
    <div className="wrap">
      <p className="uj-ayah" lang="ar" dir="rtl">وَأَتِمُّوا الْحَجَّ وَالْعُمْرَةَ لِلَّهِ</p>
      {lang !== "ar" && (
        <p className="uj-ayah-tr">
          {lang === "th" ? "“และจงทำฮัจญ์และอุมเราะห์ให้สมบูรณ์เพื่ออัลลอฮ์” — อัลบะเกาะเราะฮ์ 2:196" : "“And complete the Hajj and Umrah for Allah.” — al-Baqarah 2:196"}
        </p>
      )}
      <header className="uc-head">
        <span className="uj-eyebrow">{t(WHY.eyebrow)}</span>
        <h2>{t(WHY.title)}</h2>
      </header>
      <div className="uw-grid">
        {WHY.items.map((it, i) => (
          <article key={i} className="uw-card">
            <span className="uw-num">0{i + 1}</span>
            <span className="uw-ic">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {WHY_ICONS[i]}
              </svg>
            </span>
            <h3>{t(it.t)}</h3>
            <p>{t(it.d)}</p>
          </article>
        ))}
      </div>
      <div className="uw-cta">
        <div className="uw-cta-copy">
          <span className="uw-live"><i />{t(WHY.online)}</span>
          <h3>{t(WHY.ctaTitle)}</h3>
          <p>{t(WHY.ctaSub)}</p>
        </div>
        <div className="uw-btns">
          <a className="uw-btn line" href="https://line.me/R/ti/p/@umrahthailand" target="_blank" rel="noopener noreferrer"><LineIcon /> LINE</a>
          <a className="uw-btn msg" href="https://www.facebook.com/umrahthailand/" target="_blank" rel="noopener noreferrer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.4 0 0 5 0 11.1c0 3.5 1.7 6.6 4.5 8.7V24l4.1-2.2c1.1.3 2.2.5 3.4.5 6.6 0 12-5 12-11.1S18.6 0 12 0zm1.2 15-3.1-3.3-6 3.3L10.7 8l3.1 3.3L19.8 8z" /></svg>
            Messenger
          </a>
          <Link className="uw-btn ghost" href="/contact">{t(WHY.contact)} <span aria-hidden="true">{lang === "ar" ? "←" : "→"}</span></Link>
        </div>
      </div>
    </div>
  );
}
