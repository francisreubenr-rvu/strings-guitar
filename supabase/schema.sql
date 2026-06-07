-- ============================================================
-- Strings Guitar Learning Platform — Supabase Schema
-- Run this in your Supabase SQL editor (Dashboard > SQL Editor)
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- PROFILES
-- ============================================================
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  username text unique not null,
  display_name text,
  avatar_url text,
  skill_level text check (skill_level in ('beginner', 'intermediate', 'advanced')) default 'beginner',
  guitar_type text check (guitar_type in ('acoustic', 'classical', 'electric', 'unknown')) default 'unknown',
  is_premium boolean default false,
  onboarding_complete boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- CURRICULUM
-- ============================================================
create table public.curriculum_levels (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null, -- 'beginner' | 'intermediate' | 'advanced'
  name text not null,
  description text,
  order_index integer not null,
  created_at timestamptz default now()
);

create table public.chapters (
  id uuid default uuid_generate_v4() primary key,
  level_id uuid references public.curriculum_levels(id) on delete cascade,
  title text not null,
  description text,
  order_index integer not null,
  estimated_minutes integer default 30,
  thumbnail_url text,
  is_premium boolean default false,
  created_at timestamptz default now()
);

create table public.lessons (
  id uuid default uuid_generate_v4() primary key,
  chapter_id uuid references public.chapters(id) on delete cascade,
  title text not null,
  description text,
  order_index integer not null,
  type text check (type in ('theory', 'chord', 'scale', 'exercise', 'song', 'tuning')) not null,
  content jsonb not null default '{}',
  -- For chord/exercise lessons: what chord/notes should the webcam verify
  target_chord text,          -- e.g. 'Em', 'G', 'C'
  target_finger_positions jsonb, -- [{string: 1, fret: 2, finger: 1}, ...]
  target_notes text[],        -- for scale lessons
  accuracy_threshold integer default 80, -- % required to pass
  estimated_minutes integer default 10,
  is_premium boolean default false,
  created_at timestamptz default now()
);

alter table public.curriculum_levels enable row level security;
alter table public.chapters enable row level security;
alter table public.lessons enable row level security;

create policy "Curriculum levels are publicly readable"
  on public.curriculum_levels for select using (true);

create policy "Chapters are publicly readable"
  on public.chapters for select using (true);

create policy "Lessons are publicly readable"
  on public.lessons for select using (true);

-- ============================================================
-- USER PROGRESS
-- ============================================================
create table public.user_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  lesson_id uuid references public.lessons(id) on delete cascade,
  chapter_id uuid references public.chapters(id) on delete cascade,
  completed boolean default false,
  completed_at timestamptz,
  best_accuracy integer default 0, -- 0-100
  attempts integer default 0,
  time_spent_seconds integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (user_id, lesson_id)
);

alter table public.user_progress enable row level security;

create policy "Users can view their own progress"
  on public.user_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert their own progress"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own progress"
  on public.user_progress for update
  using (auth.uid() = user_id);

-- ============================================================
-- SONGS
-- ============================================================
create table public.songs (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  composer text not null,         -- for public domain: original composer
  era text,                       -- e.g. '19th century', 'Traditional'
  genre text,
  difficulty text check (difficulty in ('beginner', 'intermediate', 'advanced')) not null,
  key_signature text,             -- e.g. 'G major'
  time_signature text default '4/4',
  bpm integer,
  tabs jsonb not null default '[]',   -- array of tab lines
  chords text[] not null default '{}', -- chords used
  chord_chart jsonb default '[]',      -- [{beat, chord, position}]
  description text,
  is_premium boolean default false,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table public.weekly_songs (
  id uuid default uuid_generate_v4() primary key,
  song_id uuid references public.songs(id) on delete cascade,
  week_start date not null unique,  -- Monday of the week
  featured_note text,               -- editor note for why this song was picked
  created_at timestamptz default now()
);

alter table public.songs enable row level security;
alter table public.weekly_songs enable row level security;

create policy "Songs are publicly readable"
  on public.songs for select using (is_active = true);

create policy "Weekly songs are publicly readable"
  on public.weekly_songs for select using (true);

-- ============================================================
-- LEADERBOARD
-- ============================================================
create table public.leaderboard (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  week_start date not null,         -- Monday of the scoring week
  lessons_completed integer default 0,
  total_accuracy integer default 0, -- sum of accuracy scores
  avg_accuracy numeric(5,2) default 0,
  streak_days integer default 0,
  score integer default 0,          -- computed: lessons * avg_accuracy + streak bonus
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (user_id, week_start)
);

alter table public.leaderboard enable row level security;

create policy "Leaderboard is publicly readable"
  on public.leaderboard for select using (true);

create policy "Users can upsert their own leaderboard entry"
  on public.leaderboard for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own leaderboard entry"
  on public.leaderboard for update
  using (auth.uid() = user_id);

-- ============================================================
-- UTILITY: updated_at trigger
-- ============================================================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

create trigger set_progress_updated_at
  before update on public.user_progress
  for each row execute procedure public.set_updated_at();

create trigger set_leaderboard_updated_at
  before update on public.leaderboard
  for each row execute procedure public.set_updated_at();

-- ============================================================
-- INDEXES
-- ============================================================
create index idx_chapters_level_id on public.chapters(level_id, order_index);
create index idx_lessons_chapter_id on public.lessons(chapter_id, order_index);
create index idx_progress_user_id on public.user_progress(user_id);
create index idx_progress_lesson_id on public.user_progress(lesson_id);
create index idx_leaderboard_week on public.leaderboard(week_start, score desc);
create index idx_weekly_songs_week on public.weekly_songs(week_start desc);
