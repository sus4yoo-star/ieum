-- ============================================================
--  토닥 2층 — 힐러 지원 접수 (healer_applications)
--  Supabase SQL Editor에 한 번 실행.
--  Project → SQL Editor → New query → 붙여넣기 → Run.
-- ============================================================

create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
--  TABLE: healer_applications
--  힐러가 되고 싶은 사람이 남기는 지원서. 로그인 없이도 제출 가능.
-- ------------------------------------------------------------
create table if not exists public.healer_applications (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid references auth.users (id) on delete set null,
  name         text not null,
  age          int,
  gender       text check (gender is null or gender in ('female', 'male', 'other')),
  contact      text not null,          -- 카카오톡 ID / 이메일 / 전화
  intro        text,                   -- 한 줄 소개
  story        text,                   -- 어떤 마음을 나눌 수 있는지 / 왜 힐러가 되고 싶은지
  availability text,                   -- 가능한 시간대
  agreed       boolean not null default false,
  status       text not null default 'pending'
               check (status in ('pending', 'reviewing', 'approved', 'rejected')),
  created_at   timestamptz not null default now()
);

create index if not exists healer_applications_status_idx
  on public.healer_applications (status, created_at desc);

-- ------------------------------------------------------------
--  ROW LEVEL SECURITY
--  · 누구나(비로그인 포함) 지원서를 "제출"만 할 수 있음.
--  · 조회/수정/삭제 정책은 두지 않음 → anon 키로는 아무도 읽을 수 없음.
--    운영자는 Supabase 대시보드(service_role)로만 열람/심사.
-- ------------------------------------------------------------
alter table public.healer_applications enable row level security;

drop policy if exists "healer_apps_insert_any" on public.healer_applications;
create policy "healer_apps_insert_any"
  on public.healer_applications for insert
  with check (true);
