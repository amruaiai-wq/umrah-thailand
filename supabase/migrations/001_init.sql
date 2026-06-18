-- ============================================================
-- Umrah Thailand – Initial Schema
-- Run this in Supabase → SQL Editor
-- ============================================================

-- ── ARTICLES ──────────────────────────────────────────────
create table if not exists articles (
  id        bigint generated always as identity primary key,
  slug      text    not null unique,
  cat       text    not null default '',
  date      text    not null default '',
  title     text    not null default '',
  ex        text    not null default '',
  body      text             default '',
  img       text    not null default '',
  published boolean not null default true,
  created_at timestamptz not null default now()
);

-- ── SPONSORS ──────────────────────────────────────────────
create table if not exists sponsors (
  id     bigint generated always as identity primary key,
  n      text    not null default '',   -- name
  r      text    not null default '',   -- rating / license
  d      text    not null default '',   -- description
  i      text    not null default 'A',  -- logo letter
  url    text    not null default '#',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ── ROW LEVEL SECURITY ────────────────────────────────────
alter table articles enable row level security;
alter table sponsors  enable row level security;

-- Public: read published articles only
create policy "public read published articles"
  on articles for select
  using (published = true);

-- Public: read active sponsors only
create policy "public read active sponsors"
  on sponsors for select
  using (active = true);

-- Authenticated (admin): full access to articles
create policy "admin full access articles"
  on articles for all
  to authenticated
  using (true)
  with check (true);

-- Authenticated (admin): full access to sponsors
create policy "admin full access sponsors"
  on sponsors for all
  to authenticated
  using (true)
  with check (true);

-- ── SEED DATA ─────────────────────────────────────────────
insert into articles (slug, cat, date, title, ex, body, img, published) values
(
  'dua-during-tawaf',
  'คู่มืออุมเราะห์',
  '15 พ.ค. 2026',
  'ดุอาอ์สำคัญที่ควรท่องระหว่างการตะวาฟ',
  'รวมบทดุอาอ์และซิกรุลลอฮ์ที่แนะนำให้อ่านในแต่ละช่วงของการเวียนรอบกะอ์บะฮ์',
  'ระหว่างการตะวาฟ ไม่มีดุอาอ์เฉพาะที่บังคับสำหรับแต่ละรอบ ผู้แสวงบุญสามารถขอดุอาอ์และกล่าวซิกรุลลอฮ์ตามที่ปรารถนา',
  'linear-gradient(135deg,#12294C,#1B335A)',
  true
),
(
  'prepare-body-mind-hajj',
  'เตรียมตัวฮัจญ์',
  '10 พ.ค. 2026',
  'เตรียมร่างกายและจิตใจก่อนเดินทางไปฮัจญ์',
  'การเตรียมสุขภาพ การออกกำลังกาย และการเตรียมจิตใจให้พร้อม',
  'ฮัจญ์เป็นการเดินทางที่ต้องใช้ทั้งกำลังกายและกำลังใจ การเตรียมตัวล่วงหน้าจึงสำคัญมาก',
  'linear-gradient(135deg,#0E7C5A,#12294C)',
  true
),
(
  'umrah-packing-checklist',
  'เคล็ดลับการเดินทาง',
  '5 พ.ค. 2026',
  '10 สิ่งที่ต้องเตรียมในกระเป๋าเดินทางอุมเราะห์',
  'เช็กลิสต์ของใช้จำเป็น ตั้งแต่ผ้าอิหรอมจนถึงยาประจำตัว',
  '',
  'linear-gradient(135deg,#1B335A,#0a1426)',
  true
),
(
  'umrah-vs-hajj',
  'คู่มืออุมเราะห์',
  '28 เม.ย. 2026',
  'ความแตกต่างระหว่างอุมเราะห์และฮัจญ์',
  'อธิบายความหมาย ช่วงเวลา และขั้นตอนที่แตกต่างกันของทั้งสองพิธี',
  '',
  'linear-gradient(135deg,#12294C,#0E7C5A)',
  true
),
(
  'health-in-makkah-heat',
  'เคล็ดลับการเดินทาง',
  '20 เม.ย. 2026',
  'วิธีดูแลสุขภาพในอากาศร้อนที่นครมักกะฮ์',
  'คำแนะนำการดื่มน้ำ ป้องกันแดด และพักผ่อนให้พร้อมประกอบพิธี',
  'อากาศที่มักกะฮ์ร้อนจัด การดูแลสุขภาพจึงเป็นเรื่องสำคัญ',
  'linear-gradient(135deg,#0a1426,#1B335A)',
  true
),
(
  'types-of-hajj',
  'เตรียมตัวฮัจญ์',
  '12 เม.ย. 2026',
  'ทำความเข้าใจประเภทของฮัจญ์: ตะมัตตุอ์ กิรอน อิฟรอด',
  'อธิบายความแตกต่างของฮัจญ์ทั้ง 3 ประเภท และข้อควรรู้ของแต่ละแบบ',
  '',
  'linear-gradient(135deg,#1B335A,#12294C)',
  true
)
on conflict (slug) do nothing;

insert into sponsors (n, r, d, i, url, active) values
(
  'อัล-อามีน ทราเวล',
  '★ 4.9 · ใบอนุญาตเลขที่ 11/xxxxx',
  'แพ็กเกจอุมเราะห์ครบวงจร ที่พักใกล้ฮะรอม มุตเฏาวิฟดูแลตลอดทริป',
  'A', '#', true
),
(
  'นูร ฮัจญ์ แอนด์ อุมเราะห์',
  '★ 4.8 · สมาชิก ATTA',
  'กรุ๊ปเล็ก ดูแลใกล้ชิด มีโปรแกรมสำหรับครอบครัวและผู้สูงอายุ',
  'N', '#', true
),
(
  'บัยตุลลอฮ์ ทัวร์',
  '★ 4.9 · 15 ปีประสบการณ์',
  'เชี่ยวชาญแพ็กเกจรอมฎอน ที่พัก 5 ดาว เดินถึงมัสยิดฮะรอม',
  'B', '#', true
);
