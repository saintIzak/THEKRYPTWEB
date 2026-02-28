-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create products table if it doesn't exist
create table if not exists public.products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  category text not null,
  price decimal(10,2) not null,
  image_url text, -- Primary image
  images text[] default array[]::text[], -- Additional images
  description text,
  rating decimal(3,2) default 0,
  in_stock boolean default true,
  is_tested boolean default false, -- "Tested in Theatre" status
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.products enable row level security;

-- Create policies
create policy "Public products are viewable by everyone"
  on public.products for select
  using (true);

create policy "Authenticated users can insert products" 
  on public.products for insert
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can update products"
  on public.products for update
  using (auth.role() = 'authenticated');

create policy "Authenticated users can delete products"
  on public.products for delete
  using (auth.role() = 'authenticated');

-- Create storage bucket for product images
insert into storage.buckets (id, name, public) 
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- Storage policies
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'product-images' );

create policy "Authenticated users can upload"
  on storage.objects for insert
  with check ( bucket_id = 'product-images' and auth.role() = 'authenticated' );

create policy "Authenticated users can update"
  on storage.objects for update
  using ( bucket_id = 'product-images' and auth.role() = 'authenticated' );

create policy "Authenticated users can delete"
  on storage.objects for delete
  using ( bucket_id = 'product-images' and auth.role() = 'authenticated' );
