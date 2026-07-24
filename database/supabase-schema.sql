create extension if not exists "pgcrypto";

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  icon text,
  order_index integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.sections (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  slug text not null,
  title text not null,
  order_index integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (course_id, slug)
);

create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  section_id uuid not null references public.sections(id) on delete cascade,
  slug text not null,
  order_index integer not null default 0,
  difficulty text not null check (difficulty in ('beginner', 'intermediate', 'advanced')),
  estimated_time integer,
  tags text[] not null default '{}',
  canonical_path text not null,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (course_id, slug)
);

create table if not exists public.lesson_translations (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  language text not null check (language in ('vi', 'en')),
  title text not null,
  description text,
  learning_objectives jsonb not null default '[]'::jsonb,
  prerequisites jsonb not null default '[]'::jsonb,
  theory_blocks jsonb not null default '[]'::jsonb,
  visualization jsonb,
  code_examples jsonb not null default '[]'::jsonb,
  program_output jsonb,
  complexity jsonb,
  common_mistakes jsonb not null default '[]'::jsonb,
  exercises jsonb not null default '[]'::jsonb,
  quiz jsonb,
  summary jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (lesson_id, language)
);

create table if not exists public.user_profiles (
  id uuid primary key,
  display_name text,
  avatar_url text,
  preferred_language text not null default 'vi' check (preferred_language in ('vi', 'en')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.learning_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.user_profiles(id) on delete cascade,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  status text not null default 'started' check (status in ('started', 'completed')),
  last_heading_id text,
  progress_percent integer not null default 0 check (progress_percent >= 0 and progress_percent <= 100),
  last_opened_at timestamptz not null default now(),
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);

create table if not exists public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.user_profiles(id) on delete cascade,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);

create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.user_profiles(id) on delete cascade,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  content text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_sections_course_order
  on public.sections(course_id, order_index);

create index if not exists idx_lessons_course_section_order
  on public.lessons(course_id, section_id, order_index);

create index if not exists idx_lessons_tags
  on public.lessons using gin(tags);

create index if not exists idx_lesson_translations_language
  on public.lesson_translations(language);

create index if not exists idx_learning_progress_user
  on public.learning_progress(user_id, last_opened_at desc);

create index if not exists idx_bookmarks_user
  on public.bookmarks(user_id, created_at desc);

create index if not exists idx_notes_user_lesson
  on public.notes(user_id, lesson_id);
