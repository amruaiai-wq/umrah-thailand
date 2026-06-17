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

export default function KaabaBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<Phase>("day");

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

    const rings = [
      { rx: 0.10, ry: 0.056, count: 24, speed: 0.28, size: 1.3, alpha: 0.70 },
      { rx: 0.16, ry: 0.088, count: 38, speed: 0.22, size: 1.6, alpha: 0.58 },
      { rx: 0.22, ry: 0.120, count: 54, speed: 0.17, size: 1.9, alpha: 0.46 },
      { rx: 0.28, ry: 0.150, count: 70, speed: 0.13, size: 1.4, alpha: 0.34 },
      { rx: 0.34, ry: 0.180, count: 88, speed: 0.10, size: 1.1, alpha: 0.22 },
    ];

    let t = 0;
    let raf: number;

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 1;
      const cx = canvas.width / 2;
      const cy = canvas.height * 0.50;

      rings.forEach(({ rx, ry, count, speed, size, alpha }) => {
        const a = canvas.width * rx;
        const b = canvas.height * ry;
        for (let i = 0; i < count; i++) {
          const angle = (i / count) * Math.PI * 2 + (t * speed * 0.001);
          const x = cx + a * Math.cos(angle);
          const y = cy + b * Math.sin(angle);
          const pulse = 0.45 + 0.55 * Math.abs(Math.sin(i * 1.4 + t * 0.009));
          const a2 = alpha * pulse;

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${a2})`;
          ctx.fill();

          if (i % 4 === 0) {
            const pa = angle - 0.055;
            const px = cx + a * Math.cos(pa);
            const py = cy + b * Math.sin(pa);
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(x, y);
            ctx.strokeStyle = `rgba(255,255,255,${a2 * 0.35})`;
            ctx.lineWidth = size * 0.7;
            ctx.stroke();
          }
        }
      });

      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  const isNight = phase === "night" || phase === "dawn";

  return (
    <div className="kaaba-bg-wrap">
      <Image
        src={isNight ? "/kaba/night.png" : "/kaba/day.png"}
        alt=""
        fill
        priority
        style={{ objectFit: "cover", objectPosition: "center 30%" }}
      />
      <div className="kaaba-overlay" style={{ background: overlayMap[phase] }} />
      <canvas ref={canvasRef} className="kaaba-canvas" />
    </div>
  );
}
