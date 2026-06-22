"use client";
import { slugifyTh } from "@/lib/articleUtils";

type Block =
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string; id: string }
  | { type: "p"; text: string }
  | { type: "highlight"; text: string }
  | { type: "img"; index: number }
  | { type: "list"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] };

function parseTableLine(line: string): string[] {
  return line.split("|").map((c) => c.trim()).filter((_, i, a) => i > 0 && i < a.length - 1);
}

function isTableSeparator(line: string): boolean {
  return /^\|[\s|:-]+\|$/.test(line.trim());
}

function parseBody(body: string): Block[] {
  const lines = body.split("\n");
  const blocks: Block[] = [];
  let listItems: string[] = [];
  let imgCount = 0;
  let tableLines: string[] = [];

  const flushList = () => {
    if (listItems.length) {
      blocks.push({ type: "list", items: [...listItems] });
      listItems = [];
    }
  };

  const flushTable = () => {
    if (tableLines.length >= 2) {
      const headers = parseTableLine(tableLines[0]);
      const rows = tableLines.slice(2).map(parseTableLine).filter((r) => r.length > 0);
      if (headers.length) blocks.push({ type: "table", headers, rows });
    }
    tableLines = [];
  };

  for (const raw of lines) {
    const line = raw.trimEnd();

    // Table lines
    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      flushList();
      tableLines.push(line);
      continue;
    } else if (tableLines.length) {
      flushTable();
    }

    if (!line.trim()) { flushList(); continue; }

    if (line.startsWith("## ")) {
      flushList();
      const text = line.slice(3).trim();
      blocks.push({ type: "h2", text, id: slugifyTh(text) });
    } else if (line.startsWith("### ")) {
      flushList();
      const text = line.slice(4).trim();
      blocks.push({ type: "h3", text, id: slugifyTh(text) });
    } else if (line.startsWith("> ")) {
      flushList();
      blocks.push({ type: "highlight", text: line.slice(2).trim() });
    } else if (line.trim() === "[img]") {
      flushList();
      blocks.push({ type: "img", index: imgCount++ });
    } else if (line.startsWith("- ") || line.startsWith("• ")) {
      listItems.push(line.replace(/^[-•]\s/, "").trim());
    } else {
      flushList();
      blocks.push({ type: "p", text: line.trim() });
    }
  }
  flushList();
  flushTable();
  return blocks;
}

function unwrapBody(body: string): string {
  const trimmed = body.trim();
  if (!trimmed.startsWith("{")) return body;
  try {
    const parsed = JSON.parse(trimmed);
    if (typeof parsed.formatted === "string") return parsed.formatted;
  } catch {}
  return body;
}

export default function ArticleRenderer({
  body,
  images = [],
}: {
  body: string;
  images?: string[];
}) {
  const raw = parseBody(unwrapBody(body));
  const hasMarkers = raw.some((b) => b.type === "img");

  // Auto-inject images every 3 paragraphs if no [img] markers
  let blocks: Block[] = raw;
  if (!hasMarkers && images.length > 0) {
    const injected: Block[] = [];
    let pCount = 0;
    let imgIdx = 0;
    for (const b of raw) {
      injected.push(b);
      if (b.type === "p") {
        pCount++;
        if (pCount % 3 === 0 && imgIdx < images.length) {
          injected.push({ type: "img", index: imgIdx++ });
        }
      }
    }
    blocks = injected;
  }

  return (
    <div className="art-body">
      {blocks.map((b, i) => {
        if (b.type === "h2")
          return (
            <h2 key={i} id={b.id}>
              {b.text}
            </h2>
          );
        if (b.type === "h3")
          return (
            <h3 key={i} id={b.id}>
              {b.text}
            </h3>
          );
        if (b.type === "p") return <p key={i}>{b.text}</p>;
        if (b.type === "highlight")
          return (
            <div key={i} className="art-highlight">
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
              <p>{b.text}</p>
            </div>
          );
        if (b.type === "list")
          return (
            <ul key={i} className="art-list">
              {b.items.map((it, j) => (
                <li key={j}>{it}</li>
              ))}
            </ul>
          );
        if (b.type === "table")
          return (
            <div key={i} className="art-table-wrap">
              <table className="art-table">
                <thead>
                  <tr>{b.headers.map((h, j) => <th key={j}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {b.rows.map((row, j) => (
                    <tr key={j}>{row.map((cell, k) => <td key={k}>{cell}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        if (b.type === "img") {
          const src = images[b.index];
          if (!src) return null;
          return (
            <figure key={i} className="art-figure">
              <img src={src} alt="" className="art-img-body" loading="lazy" />
            </figure>
          );
        }
        return null;
      })}
    </div>
  );
}
