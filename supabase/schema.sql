-- ============================================================
-- Umrah Thailand — Supabase Schema + Row Level Security
-- รันไฟล์นี้ใน Supabase Dashboard → SQL Editor → New query → Run
-- ============================================================

-- ---------- 1) ตาราง articles (บทความ) ----------
create table if not exists public.articles (
  id          bigint generated always as identity primary key,
  slug        text unique not null,
  cat         text not null,
  date        text not null,
  title       text not null,
  ex          text not null default '',
  body        text default '',
  img         text not null default 'linear-gradient(135deg,#12294C,#1B335A)',
  published   boolean not null default true,
  created_at  timestamptz not null default now()
);

-- ---------- 2) ตาราง sponsors (โฆษณา/ผู้สนับสนุน) ----------
create table if not exists public.sponsors (
  id          bigint generated always as identity primary key,
  n           text not null,           -- ชื่อบริษัท
  r           text not null default '',-- เรตติ้ง/ใบอนุญาต
  d           text not null default '',-- คำอธิบาย
  i           text not null default 'A',-- อักษรโลโก้
  url         text not null default '#',
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);

-- ============================================================
-- 3) เปิด Row Level Security
-- ============================================================
alter table public.articles enable row level security;
alter table public.sponsors enable row level security;

-- ---------- READ: ใครก็ได้อ่านเฉพาะที่เผยแพร่/แสดงอยู่ ----------
-- (anon = ผู้เข้าชมเว็บทั่วไป)
drop policy if exists "public read published articles" on public.articles;
create policy "public read published articles"
  on public.articles for select
  to anon, authenticated
  using ( published = true );

drop policy if exists "public read active sponsors" on public.sponsors;
create policy "public read active sponsors"
  on public.sponsors for select
  to anon, authenticated
  using ( active = true );

-- ---------- ADMIN: ผู้ที่ล็อกอินแล้วเท่านั้น อ่าน/เขียนได้ทั้งหมด ----------
-- หมายเหตุ: ใน Supabase ผู้ที่ signInWithPassword สำเร็จจะมี role = authenticated
-- ถ้าต้องการจำกัดเฉพาะบางคน ให้ใช้เงื่อนไข email ใน USING (ดูตัวอย่างด้านล่าง)

drop policy if exists "admin full articles" on public.articles;
create policy "admin full articles"
  on public.articles for all
  to authenticated
  using ( true )
  with check ( true );

drop policy if exists "admin full sponsors" on public.sponsors;
create policy "admin full sponsors"
  on public.sponsors for all
  to authenticated
  using ( true )
  with check ( true );

-- ===== ตัวเลือก: จำกัดสิทธิ์แอดมินเฉพาะอีเมลที่กำหนด =====
-- ถ้าต้องการให้เฉพาะอีเมลของคุณเป็นแอดมิน ให้ลบ 2 policy ด้านบน
-- (admin full ...) แล้วใช้แบบนี้แทน โดยแก้อีเมลให้เป็นของคุณ:
--
-- create policy "only me writes articles"
--   on public.articles for all
--   to authenticated
--   using ( auth.jwt() ->> 'email' = 'you@email.com' )
--   with check ( auth.jwt() ->> 'email' = 'you@email.com' );
--
-- (ทำแบบเดียวกันกับ sponsors)

-- ============================================================
-- 4) ใส่ข้อมูลเริ่มต้น (seed)
-- ============================================================
insert into public.articles (slug, cat, date, title, ex, body, img, published) values
('dua-during-tawaf','คู่มืออุมเราะห์','15 พ.ค. 2026','ดุอาอ์สำคัญที่ควรท่องระหว่างการตะวาฟ','รวมบทดุอาอ์และซิกรุลลอฮ์ที่แนะนำให้อ่านในแต่ละช่วงของการเวียนรอบกะอ์บะฮ์','ระหว่างการตะวาฟ ไม่มีดุอาอ์เฉพาะที่บังคับสำหรับแต่ละรอบ ผู้แสวงบุญสามารถขอดุอาอ์และกล่าวซิกรุลลอฮ์ตามที่ปรารถนา','linear-gradient(135deg,#12294C,#1B335A)',true),
('prepare-body-mind-hajj','เตรียมตัวฮัจญ์','10 พ.ค. 2026','เตรียมร่างกายและจิตใจก่อนเดินทางไปฮัจญ์','การเตรียมสุขภาพ การออกกำลังกาย และการเตรียมจิตใจให้พร้อม','ฮัจญ์เป็นการเดินทางที่ต้องใช้ทั้งกำลังกายและกำลังใจ การเตรียมตัวล่วงหน้าจึงสำคัญมาก','linear-gradient(135deg,#0E7C5A,#12294C)',true),
('umrah-packing-checklist','เคล็ดลับการเดินทาง','5 พ.ค. 2026','10 สิ่งที่ต้องเตรียมในกระเป๋าเดินทางอุมเราะห์','เช็กลิสต์ของใช้จำเป็น ตั้งแต่ผ้าอิหรอมจนถึงยาประจำตัว','การจัดกระเป๋าที่ดีช่วยให้การเดินทางราบรื่น','linear-gradient(135deg,#1B335A,#0a1426)',true),
('umrah-vs-hajj','คู่มืออุมเราะห์','28 เม.ย. 2026','ความแตกต่างระหว่างอุมเราะห์และฮัจญ์','อธิบายความหมาย ช่วงเวลา และขั้นตอนที่แตกต่างกันของทั้งสองพิธี','หลายคนสับสนระหว่างอุมเราะห์และฮัจญ์ บทความนี้จะอธิบายความแตกต่างให้ชัดเจน','linear-gradient(135deg,#12294C,#0E7C5A)',true),
('health-in-makkah-heat','เคล็ดลับการเดินทาง','20 เม.ย. 2026','วิธีดูแลสุขภาพในอากาศร้อนที่นครมักกะฮ์','คำแนะนำการดื่มน้ำ ป้องกันแดด และพักผ่อนให้พร้อมประกอบพิธี','อากาศที่มักกะฮ์ร้อนจัด การดูแลสุขภาพจึงเป็นเรื่องสำคัญ','linear-gradient(135deg,#0a1426,#1B335A)',true),
('types-of-hajj','เตรียมตัวฮัจญ์','12 เม.ย. 2026','ทำความเข้าใจประเภทของฮัจญ์: ตะมัตตุอ์ กิรอน อิฟรอด','อธิบายความแตกต่างของฮัจญ์ทั้ง 3 ประเภท และข้อควรรู้ของแต่ละแบบ','ฮัจญ์มี 3 ประเภทหลัก แต่ละแบบมีวิธีปฏิบัติและเงื่อนไขต่างกัน','linear-gradient(135deg,#1B335A,#12294C)',true)
on conflict (slug) do nothing;

insert into public.sponsors (n, r, d, i, url, active) values
('อัล-อามีน ทราเวล','★ 4.9 · ใบอนุญาตเลขที่ 11/xxxxx','แพ็กเกจอุมเราะห์ครบวงจร ที่พักใกล้ฮะรอม มุตเฏาวิฟดูแลตลอดทริป','A','#',true),
('นูร ฮัจญ์ แอนด์ อุมเราะห์','★ 4.8 · สมาชิก ATTA','กรุ๊ปเล็ก ดูแลใกล้ชิด มีโปรแกรมสำหรับครอบครัวและผู้สูงอายุ','N','#',true),
('บัยตุลลอฮ์ ทัวร์','★ 4.9 · 15 ปีประสบการณ์','เชี่ยวชาญแพ็กเกจรอมฎอน ที่พัก 5 ดาว เดินถึงมัสยิดฮะรอม','B','#',true)
on conflict do nothing;

-- ============================================================
-- 5) สร้างผู้ใช้แอดมิน
-- ============================================================
-- ไปที่ Supabase Dashboard → Authentication → Users → Add user
-- กรอกอีเมล + รหัสผ่าน (ยืนยันอัตโนมัติ)
-- แล้วใช้อีเมล/รหัสนั้นล็อกอินที่หน้า /admin
-- ============================================================
