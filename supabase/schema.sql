-- Supabase SQL schema para Panini Mundial 2026

create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc', now())
);

create table if not exists albums (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  name text not null,
  description text,
  is_default boolean default false,
  created_at timestamp with time zone default timezone('utc', now())
);

create table if not exists stickers (
  id uuid primary key default uuid_generate_v4(),
  number integer not null,
  team text not null,
  category text not null,
  image_url text,
  created_at timestamp with time zone default timezone('utc', now()),
  unique(number, team, category)
);

create table if not exists user_stickers (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  album_id uuid references albums(id) on delete cascade,
  sticker_id uuid references stickers(id) on delete cascade,
  status text check (status in ('missing', 'owned', 'duplicate')) not null default 'missing',
  quantity integer not null default 0,
  created_at timestamp with time zone default timezone('utc', now()),
  updated_at timestamp with time zone default timezone('utc', now()),
  unique(user_id, album_id, sticker_id)
);

create table if not exists trades (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid references users(id) on delete cascade,
  receiver_id uuid references users(id) on delete cascade,
  sticker_id uuid references stickers(id) on delete cascade,
  quantity integer not null default 1,
  status text check (status in ('pending', 'accepted', 'declined')) not null default 'pending',
  message text,
  created_at timestamp with time zone default timezone('utc', now()),
  updated_at timestamp with time zone default timezone('utc', now())
);

create table if not exists album_settings (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  album_id uuid references albums(id) on delete cascade,
  preferred_language text default 'es',
  show_duplicates boolean default true,
  created_at timestamp with time zone default timezone('utc', now())
);
