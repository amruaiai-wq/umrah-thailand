"use client";
import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Builds a scene's scroll timeline on a 0–10 time scale (10 = end of the scene). */
export type Builder = (tl: gsap.core.Timeline, q: (sel: string) => Element[], root: HTMLElement) => void;

interface Props {
  id: string;
  build?: Builder;
  art: ReactNode;
  image?: string;
  overlay?: ReactNode; // HTML layered over the art inside the pinned stage (HUDs, hero title)
  className?: string;
  children?: ReactNode; // cards that scroll past the pinned stage
}

export default function Scene({ id, build, art, image, overlay, className = "", children }: Props) {
  const ref = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const root = ref.current;
    if (!root || !build) return;
    const q = gsap.utils.selector(root);
    let idle: ReturnType<typeof setTimeout> | undefined;
    const mm = gsap.matchMedia();

    mm.add(
      { motion: "(prefers-reduced-motion: no-preference)", reduce: "(prefers-reduced-motion: reduce)" },
      (ctx) => {
        const motion = !!ctx.conditions?.motion;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          paused: !motion,
          scrollTrigger: motion
            ? {
                trigger: root,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.6,
                onUpdate: () => {
                  root.classList.add("is-moving");
                  clearTimeout(idle);
                  idle = setTimeout(() => root.classList.remove("is-moving"), 180);
                },
              }
            : undefined,
        });
        build(tl, q, root);
        tl.set({}, {}, 10); // pad every timeline to the full scene length
        if (!motion) tl.progress(1);
      },
    );

    return () => {
      clearTimeout(idle);
      mm.revert();
    };
  }, [build]);

  return (
    <section ref={ref} id={`ch-${id}`} data-chapter={id} className={`uj-scene uj-${id} ${className}`}>
      <div className="uj-stage">
        {image && <img className="uj-bgimg" src={image} alt="" loading="lazy" decoding="async" />}
        <div className={`uj-art${image ? " has-img" : ""}`} dir="ltr">{art}</div>
        {overlay}
      </div>
      <div className="uj-track">{children}</div>
    </section>
  );
}
