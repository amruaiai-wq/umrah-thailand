# Umrah Thailand 🕋

เว็บไซต์ความรู้การทำ **อุมเราะห์และฮัจญ์** ภาษาไทย — เน้น SEO ติดหน้าแรก Google
สร้างด้วย **Next.js 14 (App Router) + TypeScript + Supabase**

โมเดลรายได้: ขายพื้นที่โฆษณาให้บริษัทอุมเราะห์ที่ได้รับใบอนุญาต (ไม่ขายแพ็กเกจเอง)

---

## ✨ ฟีเจอร์

- **แยก route ต่อหน้า** (`/umrah`, `/hajj`, `/articles/[slug]` …) — ดีต่อ SEO แต่ละหน้าติดอันดับเองได้
- **คู่มือทีละขั้นตอน** พร้อมดุอาอ์ (อาหรับ + คำอ่าน + ความหมาย) และหลักฐาน
- **แอนิเมชันเดินทาง** ผู้แสวงบุญเดินผ่านสถานที่สำคัญ (เลื่อนหรือกดปุ่ม) — แยกของอุมเราะห์/ฮัจญ์
- **JSON-LD Schema** (`HowTo`, `Article`, `WebSite`) ฝังทุกหน้าเพื่อ Rich Results
- **Metadata + canonical** ครบทุกหน้า
- **ระบบหลังบ้าน** (`/admin`) จัดการบทความและโฆษณา — ผูกกับ Supabase Auth + RLS
- ทำงานได้ทันทีแม้ยังไม่ตั้งค่า Supabase (โหมดทดลองใช้ seed + localStorage)

---

## 🚀 เริ่มต้นใช้งาน

ต้องมี **Node.js 18.17+**

```bash
npm install
npm run dev
```

เปิด http://localhost:3000

> ยังไม่ต้องตั้งค่า Supabase ก็รันได้ — เว็บจะใช้ข้อมูลตัวอย่าง (seed)
> หน้า `/admin` เข้าด้วยรหัสทดลอง: `admin1234` (ข้อมูลเก็บใน localStorage ของเบราว์เซอร์)

---

## 🗄️ ตั้งค่า Supabase (สำหรับใช้งานจริง)

1. สร้างโปรเจกต์ที่ https://supabase.com
2. ไปที่ **SQL Editor** → วางเนื้อหาไฟล์ [`supabase/schema.sql`](./supabase/schema.sql) → **Run**
   (สร้างตาราง `articles`, `sponsors`, เปิด RLS, ใส่ข้อมูลเริ่มต้น)
3. คัดลอก URL และ anon key จาก **Project Settings → API**
4. สร้างไฟล์ `.env.local` (ดูตัวอย่างจาก `.env.local.example`):

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhb...
   ```

5. สร้างผู้ใช้แอดมิน: **Authentication → Users → Add user** (กรอกอีเมล + รหัสผ่าน)
6. รันใหม่ → หน้า `/admin` จะเปลี่ยนเป็นล็อกอินด้วยอีเมล/รหัสจริง และข้อมูลถูกบันทึกบน Supabase (เห็นเหมือนกันทุกคน)

### ความปลอดภัย (RLS)
- ผู้เข้าชมทั่วไป (anon) **อ่านได้เฉพาะ** บทความที่ `published = true` และโฆษณาที่ `active = true`
- การ **เพิ่ม/แก้/ลบ** ทำได้เฉพาะผู้ที่ล็อกอินแล้ว (authenticated)
- อยากจำกัดเฉพาะอีเมลคุณคนเดียว ดูคอมเมนต์ตัวเลือกในไฟล์ `schema.sql`

---

## ☁️ Deploy ขึ้น Vercel

1. push โค้ดขึ้น GitHub
2. ที่ https://vercel.com → **New Project** → เลือก repo
3. ใส่ Environment Variables 2 ตัว (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
4. Deploy — เสร็จแล้วต่อโดเมน `umrahthailand.com` ได้ที่ **Settings → Domains**

> หลัง deploy: ตั้งค่า `metadataBase` ให้ตรงโดเมนจริงใน `app/layout.tsx` และส่ง sitemap ใน Google Search Console เพื่อช่วยจัดอันดับ

---

## 📁 โครงสร้างโปรเจกต์

```
app/
  layout.tsx           # ฟอนต์, metadata กลาง, WebSite schema, Navbar/Footer
  page.tsx             # หน้าแรก
  umrah/ hajj/         # คู่มือ (animation + steps + HowTo schema)
  articles/            # รายการ + [slug] รายละเอียด
  about/ contact/      # เกี่ยวกับเรา / ติดต่อ
  admin/               # ระบบหลังบ้าน (login + CRUD)
  globals.css          # ดีไซน์ระบบทั้งหมด
components/             # Navbar, Footer, Journey*, GuideSteps, *Grid, ฯลฯ
data/                  # seed.ts (บทความ/โฆษณา), guides.ts (ขั้นตอน+ดุอาอ์)
lib/                   # types, supabase clients, data fetchers
supabase/schema.sql    # SQL สร้างตาราง + RLS + seed
```

---

## ⚠️ หมายเหตุเรื่องเนื้อหาศาสนา

เนื้อหาเรียบเรียงเพื่อการศึกษาตามทัศนะนักวิชาการส่วนใหญ่ ก่อนเผยแพร่ ควรตรวจทาน 2 จุด:
1. **คำอ่านภาษาไทยของอาหรับ** — มีหลายแบบแผน
2. **การจำแนกรุก่น/วาญิบ/สุนนะฮ์** — ต่างกันตามมัซฮับ

ดุอาอ์อ้างอิงแหล่งที่เชื่อถือได้ (อัลกุรอาน 2:158, 2:201, 22:29, 2:198; บุคอรี/มุสลิม; หะดีษญาบิร)

---

© 2026 Umrah Thailand · เพื่อการศึกษา
