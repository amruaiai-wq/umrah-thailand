import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `คุณคือผู้เชี่ยวชาญด้านการเขียนคอนเทนต์ SEO สำหรับเว็บไซต์อุมเราะห์ไทย

หน้าที่ของคุณ: รับเนื้อหาดิบ (plain text) แล้วจัดรูปแบบ พร้อมสร้างคำโปรยและเลือกหมวดหมู่ให้อัตโนมัติ

==SYNTAX ที่ใช้สำหรับ formatted==
## หัวข้อหลัก        → H2 (ควรมี 3-5 หัวข้อ ตามเนื้อหา)
### หัวข้อรอง        → H3 (ใส่ใต้ H2 เมื่อมีหัวข้อย่อย)
> ข้อความสำคัญ      → Highlight box (ใส่ประมาณ 2-3 จุดต่อบทความ)
- รายการ            → Bullet list
[img]               → จุดใส่รูปภาพ (วางหลังทุก 2-3 ย่อหน้า)
ข้อความปกติ          → ย่อหน้าธรรมดา

==กฎ SEO==
1. หัวข้อ H2 แรก ต้องมีคีย์เวิร์ดหลักจากชื่อบทความ
2. แต่ละย่อหน้ามีความยาว 3-5 ประโยค อ่านง่าย
3. ใส่ > highlight สำหรับข้อมูลที่คนมักค้นหา
4. วาง [img] อย่างน้อย 2 จุดในบทความ
5. บทความควรมีบทนำ (ก่อน ## แรก) 1-2 ย่อหน้า
6. ลงท้ายด้วยย่อหน้าสรุปหรือ CTA สั้นๆ
7. คงเนื้อหาทุกอย่างจากต้นฉบับ ห้ามตัดข้อมูลออก

==Output==
ส่งคืน JSON เท่านั้น ไม่มีข้อความอื่น ไม่มี markdown code block:
{
  "formatted": "เนื้อหาที่จัดรูปแบบแล้วตาม syntax ด้านบน",
  "excerpt": "คำโปรยสั้น 1-2 ประโยค บอกสาระสำคัญของบทความ เพื่อแสดงในหน้ารายการ",
  "category": "ชื่อหมวดหมู่ที่เหมาะสมที่สุดจากรายการที่ให้มา"
}`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ยังไม่ได้ตั้งค่า ANTHROPIC_API_KEY ใน .env.local" },
      { status: 503 }
    );
  }

  let body: { title?: string; content?: string; categories?: string[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { title = "", content = "", categories = [] } = body;
  if (!content?.trim()) {
    return NextResponse.json({ error: "ไม่มีเนื้อหาที่จะจัดรูปแบบ" }, { status: 400 });
  }

  const catList = categories.length ? categories.join(", ") : "ทั่วไป";

  try {
    const client = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 8000,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `ชื่อบทความ: ${title || "(ไม่ระบุ)"}
หมวดหมู่ที่มีในระบบ: ${catList}

เนื้อหาดิบ:
${content}

จัดรูปแบบตาม syntax และส่งคืน JSON ตามที่กำหนด`,
        },
      ],
    });

    const raw = message.content[0].type === "text" ? message.content[0].text.trim() : "{}";
    // Strip ALL markdown code fences (handles ```json, ```\n, etc.)
    const cleaned = raw
      .replace(/^```[a-z]*\s*/i, "")
      .replace(/\s*```\s*$/i, "")
      .trim();
    try {
      const parsed = JSON.parse(cleaned);
      if (!parsed.formatted) throw new Error("no formatted field");
      let formatted = String(parsed.formatted);
      // Guard: AI sometimes wraps entire response inside formatted field again
      if (formatted.trim().startsWith("{")) {
        try {
          const inner = JSON.parse(formatted);
          if (typeof inner.formatted === "string") formatted = inner.formatted;
        } catch {}
      }
      return NextResponse.json({
        formatted,
        excerpt: String(parsed.excerpt ?? ""),
        category: String(parsed.category ?? ""),
      });
    } catch {
      // JSON.parse failed (likely truncated). Try regex extraction before giving up.
      const fmtMatch = cleaned.match(/"formatted"\s*:\s*"([\s\S]+?)(?:"\s*[,}]|"$)/);
      if (fmtMatch) {
        try {
          const extracted = JSON.parse(`"${fmtMatch[1]}"`);
          return NextResponse.json({ formatted: extracted, excerpt: "", category: "" });
        } catch {}
      }
      // Not JSON at all — treat as plain formatted content
      if (!cleaned.startsWith("{") && !cleaned.startsWith("[")) {
        return NextResponse.json({ formatted: cleaned, excerpt: "", category: "" });
      }
      return NextResponse.json({ error: "AI ส่งรูปแบบผิด กรุณาลองใหม่อีกครั้ง" }, { status: 500 });
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "AI error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
