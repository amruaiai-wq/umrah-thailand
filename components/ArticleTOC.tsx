"use client";
import { useEffect, useState } from "react";

interface Props {
  items: { id: string; text: string }[];
}

export default function ArticleTOC({ items }: Props) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      const found = [...items].reverse().find(({ id }) => {
        const el = document.getElementById(id);
        return el && el.getBoundingClientRect().top <= 130;
      });
      if (found) setActive(found.id);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [items]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <div className="toc-card">
      <button className="toc-title" onClick={() => setOpen((o) => !o)}>
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
          <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
        </svg>
        สารบัญ
        <svg
          className={`toc-chevron ${open ? "open" : ""}`}
          width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      <nav className={`toc-nav ${open ? "open" : ""}`}>
        {items.map(({ id, text }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`toc-item ${active === id ? "active" : ""}`}
            onClick={(e) => { e.preventDefault(); scrollTo(id); }}
          >
            {text}
          </a>
        ))}
      </nav>
    </div>
  );
}
