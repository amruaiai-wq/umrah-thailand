"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Phase = "night" | "dawn" | "day" | "sunset";

function getMeccaPhase(): Phase {
  const now = new Date();
  const h = (now.getUTCHours() + 3) % 24 + now.getUTCMinutes() / 60;
  if (h >= 5 && h < 6.5) return "dawn";
  if (h >= 6.5 && h < 17.5) return "day";
  if (h >= 17.5 && h < 19.5) return "sunset";
  return "night";
}

const overlayMap: Record<Phase, string> = {
  night:  "rgba(2,6,20,0.58)",
  dawn:   "rgba(50,15,70,0.48)",
  day:    "rgba(5,10,28,0.38)",
  sunset: "rgba(110,35,0,0.46)",
};

// Fewer particles, same visual effect
const RINGS = [
  { rx: 0.10, ry: 0.056, count: 14, speed: 0.28, size: 1.4, alpha: 0.55 },
  { rx: 0.16, ry: 0.088, count: 22, speed: 0.22, size: 1.7, alpha: 0.45 },
  { rx: 0.22, ry: 0.120, count: 30, speed: 0.17, size: 2.0, alpha: 0.36 },
  { rx: 0.28, ry: 0.150, count: 38, speed: 0.13, size: 1.5, alpha: 0.26 },
  { rx: 0.34, ry: 0.180, count: 44, speed: 0.10, size: 1.1, alpha: 0.18 },
];

export default function KaabaBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<Phase>("day");
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => { setPhase(getMeccaPhase()); }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    let t = 0;
    let raf: number;
    let lastFrame = 0;

    function draw(ts: number) {
      if (!canvas || !ctx) return;

      // ~30fps cap — avoids burning CPU at 60fps for a slow animation
      if (ts - lastFrame < 34) { raf = requestAnimationFrame(draw); return; }
      lastFrame = ts;

      // Pause animation when tab is hidden
      if (document.hidden) { raf = requestAnimationFrame(draw); return; }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 1;

      const cx = canvas.width / 2;
      const cy = canvas.height * 0.50;
      const isMobile = canvas.width < 640;

      ctx.fillStyle = "#ffffff";

      // Batch all particles per ring into a single fill() call
      RINGS.forEach(({ rx, ry, count, speed, size, alpha }) => {
        const n = isMobile ? Math.ceil(count * 0.55) : count;
        const a = canvas.width * rx;
        const b = canvas.height * ry;

        ctx.globalAlpha = alpha;
        ctx.beginPath();
        for (let i = 0; i < n; i++) {
          const angle = (i / n) * Math.PI * 2 + t * speed * 0.001;
          const x = cx + a * Math.cos(angle);
          const y = cy + b * Math.sin(angle);
          ctx.moveTo(x + size, y);
          ctx.arc(x, y, size, 0, Math.PI * 2);
        }
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  const isNight = phase === "night" || phase === "dawn";

  return (
    <div className="kaaba-bg-wrap">
      {/* Placeholder shown while image loads */}
      <div className="kaaba-placeholder" style={{ opacity: imgLoaded ? 0 : 1 }} />
      <Image
        src={isNight ? "/kaba/night.png" : "/kaba/day.png"}
        alt=""
        fill
        priority
        quality={75}
        sizes="100vw"
        onLoad={() => setImgLoaded(true)}
        style={{
          objectFit: "cover",
          objectPosition: "center 30%",
          opacity: imgLoaded ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      />
      <div className="kaaba-overlay" style={{ background: overlayMap[phase] }} />
      <canvas ref={canvasRef} className="kaaba-canvas" />
    </div>
  );
}
