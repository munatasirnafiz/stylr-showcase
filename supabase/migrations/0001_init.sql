-- Stylr.store — accounts, favorites, inquiries, delivery addresses.
-- Paste this whole file into the Supabase Dashboard SQL editor (SQL Editor -> New query) and run it once.

-- profiles: one row per auth user, auto-created on signup.
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  avatar_url text,
  preferred_contact_method text not null default 'whatsapp'
    check (preferred_contact_method in ('whatsapp', 'call', 'sms')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$ language plpgsql security definer set search_path = public;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

-- shared enum for product category, matching the Sanity document _type values.
create type public.product_category as enum ('watch', 'perfume', 'sunglasses', 'optical');

-- favorites: a user's saved products (Sanity _id + category, no DB foreign key since
-- product catalog data lives in Sanity, not Postgres).
create table public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id text not null,
  product_type public.product_category not null,
  created_at timestamptz not null default now(),
  unique (user_id, product_id)
);

alter table public.favorites enable row level security;

create policy "favorites_select_own" on public.favorites
  for select using (auth.uid() = user_id);
create policy "favorites_insert_own" on public.favorites
  for insert with check (auth.uid() = user_id);
create policy "favorites_delete_own" on public.favorites
  for delete using (auth.uid() = user_id);

create index favorites_user_id_idx on public.favorites(user_id);

-- inquiries: a log of WhatsApp inquiries made while logged in. Status is updated
-- manually by staff via the Supabase table editor — no admin UI in scope.
create type public.inquiry_status as enum ('submitted', 'contacted', 'reserved', 'fulfilled', 'cancelled');

create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id text,
  product_type public.product_category,
  product_name text not null,
  channel text not null check (channel in ('watches', 'perfumes', 'eyewear')),
  status public.inquiry_status not null default 'submitted',
  note text,
  created_at timestamptz not null default now()
);

alter table public.inquiries enable row level security;

create policy "inquiries_select_own" on public.inquiries
  for select using (auth.uid() = user_id);
create policy "inquiries_insert_own" on public.inquiries
  for insert with check (auth.uid() = user_id);

create index inquiries_user_id_idx on public.inquiries(user_id);

-- delivery_addresses: saved delivery details for private Dhaka/Bangladesh-wide delivery.
create table public.delivery_addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  label text not null default 'Home',
  recipient_name text not null,
  phone text not null,
  area text,
  address_line1 text not null,
  address_line2 text,
  city text not null default 'Dhaka',
  notes text,
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.delivery_addresses enable row level security;

create policy "delivery_addresses_select_own" on public.delivery_addresses
  for select using (auth.uid() = user_id);
create policy "delivery_addresses_insert_own" on public.delivery_addresses
  for insert with check (auth.uid() = user_id);
create policy "delivery_addresses_update_own" on public.delivery_addresses
  for update using (auth.uid() = user_id);
create policy "delivery_addresses_delete_own" on public.delivery_addresses
  for delete using (auth.uid() = user_id);

create index delivery_addresses_user_id_idx on public.delivery_addresses(user_id);

create trigger trg_delivery_addresses_updated_at
  before update on public.delivery_addresses
  for each row execute procedure public.set_updated_at();

-- Optional: avatar uploads. First create a public bucket named "avatars" via
-- Storage -> New bucket in the Supabase Dashboard, then run the policies below.
--
-- create policy "avatar_upload_own_folder" on storage.objects for insert
--   with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
-- create policy "avatar_update_own_folder" on storage.objects for update
--   using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
-- create policy "avatar_read_public" on storage.objects for select using (bucket_id = 'avatars');
