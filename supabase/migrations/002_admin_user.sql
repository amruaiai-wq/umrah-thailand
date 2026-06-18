-- ============================================================
-- สร้าง Admin User สำหรับหน้า /admin
-- แก้ email และ password ก่อน แล้วรันใน Supabase → SQL Editor
-- ============================================================

insert into auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) values (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',

  -- *** แก้ตรงนี้ ***
  'admin@yourdomain.com',                    -- อีเมลแอดมิน
  crypt('yourStrongPassword123!', gen_salt('bf')),  -- รหัสผ่าน

  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(),
  now(),
  '', '', '', ''
)
on conflict (email) do nothing;

-- ตรวจสอบว่าสร้างสำเร็จ
select id, email, created_at from auth.users order by created_at desc limit 5;
