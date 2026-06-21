import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `คุณคือผู้เชี่ยวชาญด้านการเขียนคอนเทนต์ SEO สำหรับเว็บไซต์อุมเราะห์ไทย

หน้าที่ของคุณ: รับเนื้อหาดิบ (plain text) แล้วจัดรูปแบบให้ครบตาม syntax ของเว็บ และ SEO-friendly

==SYNTAX ที่ใช้==
## หัวข้อหลัก        → H2 (ควรมี 3-5 หัวข้อ ตามเนื้อหา)
### หัวข้อรอง        → H3 (ใส่ใต้ H2 เมื่อมีหัวข้อย่อย)
> ข้อความสำคัญ      → Highlight box (ใส่ประมาณ 2-3 จุดต่อบทความ เพื่อเน้นข้อมูลสำคัญ)
- รายการ            → Bullet list (ใช้เมื่อมีข้อมูลที่เหมาะเป็นรายการ)
[img]               → จุดใส่รูปภาพ (วางหลังทุก 2-3 ย่อหน้า)
ข้อความปกติ          → ย่อหน้าธรรมดา

==กฎ SEO==
1. หัวข้อ H2 แรก ต้องมีคีย์เวิร์ดหลักจากชื่อบทความ
2. แต่ละย่อหน้ามีความยาว 3-5 ประโยค อ่านง่าย ไม่ยาวเกินไป
3. ใส่ > highlight สำหรับข้อมูลที่คนมักค้นหา หรือข้อเท็จจริงสำคัญ
4. วาง [img] อย่างน้อย 2 จุดในบทความ เพื่อให้รูปภาพกระจายทั่วบทความ
5. บทความควรมีบทนำ (ก่อน ## แรก) 1-2 ย่อหน้า
6. ลงท้ายด้วยย่อหน้าสรุปหรือ CTA สั้นๆ

==สิ่งที่ต้องทำ==
- คงเนื้อหาทุกอย่างจากต้นฉบับ ห้ามตัดข้อมูลออก
- เพิ่มโครงสร้างหัวข้อที่สมเหตุสมผล
- เพิ่ม highlight สำหรับข้อมูลที่น่าสนใจ
- วาง [img] ในตำแหน่งที่เหมาะสม
- เขียนเป็นภาษาไทยเท่านั้น

==Output==
ส่งคืนเฉพาะเนื้อหาที่จัดรูปแบบแล้ว ไม่ต้องมีคำอธิบายหรือ markup พิเศษใดๆ นอกจาก syntax ที่กำหนด`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ยังไม่ได้ตั้งค่า ANTHROPIC_API_KEY ใน .env.local" },
      { status: 503 }
    );
  }

  let body: { title?: string; content?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { title = "", content = "" } = body;
  if (!content?.trim()) {
    return NextResponse.json({ error: "ไม่มีเนื้อหาที่จะจัดรูปแบบ" }, { status: 400 });
  }

  try {
    const client = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `ชื่อบทความ: ${title || "(ไม่ระบุ)"}

เนื้อหาดิบ:
${content}

กรุณาจัดรูปแบบตาม syntax ที่กำหนด`,
        },
      ],
    });

    const result = message.content[0].type === "text" ? message.content[0].text : "";
    return NextResponse.json({ formatted: result });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "AI error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
