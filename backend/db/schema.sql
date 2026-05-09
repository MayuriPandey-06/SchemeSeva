create extension if not exists "pgcrypto";

-- Users table, authentication is managed by Supabase Auth, but app-specific user metadata is stored here.
create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  role text not null default 'citizen',
  created_at timestamp with time zone default now()
);

create table if not exists profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  full_name text,
  dob date,
  gender text,
  address text,
  state text,
  district text,
  phone text,
  occupation text,
  annual_income numeric,
  caste_category text,
  disability_status text,
  education_level text,
  farmer_status text,
  id_number text,
  updated_at timestamp with time zone default now(),
  unique(user_id)
);

create table if not exists family_members (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  name text not null,
  age int,
  relation text,
  occupation text,
  education text,
  income numeric,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone
);

create table if not exists schemes (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  eligibility_rules jsonb,
  required_documents jsonb,
  deadline date,
  benefits text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone
);

create table if not exists applications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  scheme_id uuid references schemes(id) on delete set null,
  status text not null default 'Submitted',
  submitted_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  comments text,
  form_data jsonb
);

create table if not exists documents (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  type text not null,
  file_path text,
  bucket text,
  uploaded_at timestamp with time zone default now(),
  status text default 'uploaded',
  unique(user_id, type)
);

create table if not exists notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  title text,
  message text,
  category text,
  is_read boolean default false,
  created_at timestamp with time zone default now(),
  metadata jsonb
);

-- seed sample schemes
insert into schemes (name, description, eligibility_rules, required_documents, deadline, benefits)
values
('PM Kisan', 'Monthly financial assistance for farmers.', '{"occupations": ["Farmer","Agriculture Worker"], "states": ["Uttar Pradesh","Bihar","Maharashtra","Karnataka"], "min_income": 200000, "farmer_required": true}'::jsonb, '["Aadhaar","Bank Passbook","Farmer ID"]'::jsonb, (current_date + interval '90 days')::date, '₹6000 per year'),
('Scholarship Scheme', 'Scholarship support for students with low income.', '{"education_levels": ["High School","Graduate"], "max_age": 25, "min_income": 250000, "occupations": ["Student"]}'::jsonb, '["Aadhaar","Income Certificate","Education Certificate"]'::jsonb, (current_date + interval '120 days')::date, 'Up to ₹25,000 per year'),
('Senior Citizen Pension', 'Monthly pension support for citizens above 60 years.', '{"min_age": 60, "max_income": 300000, "states": ["Maharashtra", "Karnataka"]}'::jsonb, '["Aadhaar","Income Certificate","Bank Passbook"]'::jsonb, (current_date + interval '180 days')::date, '₹2000 per month'),
('Ujjwala Yojana', 'Free LPG connections to women from BPL households.', '{"gender": "Female", "min_income": 150000, "education_levels": ["High School", "Other"]}'::jsonb, '["Aadhaar","Ration Card","BPL Certificate"]'::jsonb, (current_date + interval '60 days')::date, 'Free LPG connection and first refill'),
('Skill India Training', 'Free vocational training for unemployed youth.', '{"max_age": 35, "occupations": ["Unemployed"], "education_levels": ["High School"]}'::jsonb, '["Aadhaar","Education Certificate"]'::jsonb, null, 'Free training and certification'),
('Jan Arogya Yojana', 'Health insurance cover for secondary and tertiary care hospitalization.', '{"min_income": 250000, "caste_categories": ["SC", "ST", "OBC"], "states": ["Madhya Pradesh", "Rajasthan"]}'::jsonb, '["Aadhaar","Ration Card"]'::jsonb, null, '₹5 Lakhs per family per year'),
('PMEGP Loan', 'Credit linked subsidy program for setting up new micro-enterprises.', '{"max_age": 60, "occupations": ["Entrepreneur"], "education_levels": ["Graduate"]}'::jsonb, '["Aadhaar","Project Report","PAN"]'::jsonb, null, 'Subsidy up to 35% on project cost'),
('National Health Mission', 'Ensuring universal access to equitable, affordable and quality health care services.', '{"min_age": 0, "max_age": 100, "states": ["Delhi", "Gujarat"]}'::jsonb, '["Aadhaar"]'::jsonb, null, 'Free primary and secondary health services'),
('PM Garib Kalyan Yojana', 'Food security program providing free food grains to eligible households.', '{"min_income": 120000, "occupations": ["Farmer", "Unemployed"]}'::jsonb, '["Aadhaar","Ration Card"]'::jsonb, (current_date + interval '30 days')::date, '5kg food grains per person per month');
