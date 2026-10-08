-- ============================================================
-- ราคาเครื่องคำนวณค่าใช้จ่าย (หน้าแรก) ให้แอดมินแก้ได้จาก /admin
-- เก็บเป็นแถวเดียว (id = 1) ข้อมูลเป็น jsonb ตามรูปแบบ PlannerPrices
-- ============================================================

create table if not exists public.planner_prices (
  id         int primary key default 1 check (id = 1),
  data       jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.planner_prices enable row level security;

-- ทุกคนอ่านได้ (เครื่องคำนวณบนหน้าแรก)
drop policy if exists "public read planner prices" on public.planner_prices;
create policy "public read planner prices"
  on public.planner_prices for select
  to anon, authenticated
  using (true);

-- แอดมินที่ล็อกอินแล้วเท่านั้นที่แก้ได้
drop policy if exists "admin write planner prices" on public.planner_prices;
create policy "admin write planner prices"
  on public.planner_prices for all
  to authenticated
  using (true)
  with check (true);
