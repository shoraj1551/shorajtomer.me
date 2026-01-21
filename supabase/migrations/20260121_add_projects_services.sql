-- Create projects table
create table if not exists projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  tagline text,
  description text,
  tech text[],
  status text check (status in ('Active Development', 'Beta', 'Live', 'Archived')),
  icon_name text,
  image_url text,
  demo_url text,
  github_url text,
  is_featured boolean default false,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create services table
create table if not exists services (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  icon_name text,
  features text[],
  price text, -- Optional pricing info
  is_active boolean default true,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table projects enable row level security;
alter table services enable row level security;

-- Public read access
create policy "Public projects are viewable by everyone." on projects for select using (true);
create policy "Public services are viewable by everyone." on services for select using (true);

-- Authenticated write access
create policy "Admins can insert projects." on projects for insert with check (auth.role() = 'authenticated');
create policy "Admins can update projects." on projects for update using (auth.role() = 'authenticated');
create policy "Admins can delete projects." on projects for delete using (auth.role() = 'authenticated');

create policy "Admins can insert services." on services for insert with check (auth.role() = 'authenticated');
create policy "Admins can update services." on services for update using (auth.role() = 'authenticated');
create policy "Admins can delete services." on services for delete using (auth.role() = 'authenticated');

-- Triggers for updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger handle_projects_updated_at
  before update on projects
  for each row
  execute procedure public.handle_updated_at();

create trigger handle_services_updated_at
  before update on services
  for each row
  execute procedure public.handle_updated_at();
