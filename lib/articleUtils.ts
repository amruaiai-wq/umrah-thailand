export function slugifyTh(text: string) {
  return (
    text
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w฀-๿-]/g, "")
      .toLowerCase() || "s"
  );
}

export function parseTOC(body: string): { id: string; text: string }[] {
  return body
    .split("\n")
    .filter((l) => l.startsWith("## "))
    .map((l) => {
      const text = l.slice(3).trim();
      return { text, id: slugifyTh(text) };
    });
}

export function readingMins(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}
