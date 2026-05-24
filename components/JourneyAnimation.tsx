"use client";
import { useEffect, useRef, useState } from "react";
import { JourneyStop } from "@/lib/types";
import { Pilgrim, MILESTONES } from "./JourneySvg";

interface Props {
  title: string;
  subtitle: string;
  stops: JourneyStop[];
  milestoneKeys: string[]; // keys into MILESTONES, one per stop
  sectionId: string;
}

export default function JourneyAnimation({ title, subtitle, stops, milestoneKeys, sectionId }: Props) {
  const [cur, setCur] = useState(0);
  const [walking, setWalking] = useState(false);
  const sceneRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const walkTimer = useRef<ReturnType<typeof setTimeout>>();

  // position the sliding track so milestone `cur` centers under the pilgrim
  const layout = (index: number) => {
    const scene = sceneRef.current;
    const path = pathRef.current;
    if (!scene || !path) return;
    const w = scene.clientWidth;
    Array.from(path.children).forEach((c) => {
      (c as HTMLElement).style.width = w + "px";
      (c as HTMLElement).style.flex = `0 0 ${w}px`;
    });
    path.style.transform = `translateX(${-index * w}px)`;
  };

  useEffect(() => {
    layout(cur);
    const onResize = () => layout(cur);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cur]);

  // walk cycle when step changes
  const goTo = (index: number) => {
    const n = Math.min(Math.max(index, 0), stops.length - 1);
    if (n === cur) return;
    setWalking(true);
    clearTimeout(walkTimer.current);
    walkTimer.current = setTimeout(() => setWalking(false), 1100);
    setCur(n);
  };

  // GSAP scroll-driven progression (desktop only)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(min-width:981px)").matches) return;
    let st: any;
    let killed = false;
    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      if (killed) return;
      const gsap = gsapMod.default || gsapMod;
      const ScrollTrigger = stMod.ScrollTrigger || stMod.default;
      gsap.registerPlugin(ScrollTrigger);
      st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=" + stops.length * 55 + "%",
        pin: sectionRef.current?.querySelector(".journey-stage"),
        pinSpacing: true,
        scrub: 1,
        onRefresh: () => layout(cur),
        onUpdate: (self: any) => {
          const idx = Math.min(stops.length - 1, Math.floor(self.progress * stops.length + 0.0001));
          setCur((prev) => {
            if (idx !== prev) {
              setWalking(true);
              clearTimeout(walkTimer.current);
              walkTimer.current = setTimeout(() => setWalking(false), 1100);
            }
            return idx;
          });
        },
      });
    })();
    return () => {
      killed = true;
      if (st) st.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stops.length]);

  const s = stops[cur];

  return (
    <section className="journey" id={sectionId} ref={sectionRef}>
      <div className="hero-pattern" />
      <div className="wrap">
        <div className="journey-head">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <div className="journey-stage">
          <div className={`scene ${walking ? "walking" : ""}`} ref={sceneRef}>
            <div className="ground" />
            <div className="path" ref={pathRef}>
              {milestoneKeys.map((k, i) => (
                <div className="milestone" key={i}>{MILESTONES[k]}</div>
              ))}
            </div>
            <Pilgrim />
          </div>
          <div className={`journey-info ${walking ? "walking" : ""}`}>
            <div className="journey-step-num">{s.num}</div>
            <h3>{s.t}</h3>
            <div className="arname">{s.ar}</div>
            <p>{s.d}</p>
            <div className="journey-progress">
              {stops.map((_, i) => (
                <div className={`dotp ${i <= cur ? "on" : ""}`} key={i} />
              ))}
            </div>
            <div className="journey-nav">
              <button className="jbtn" onClick={() => goTo(cur - 1)} disabled={cur === 0}>‹</button>
              <button className="jbtn" onClick={() => goTo(cur + 1)} disabled={cur === stops.length - 1}>›</button>
              <span className="jstep-label">{cur + 1} / {stops.length}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
