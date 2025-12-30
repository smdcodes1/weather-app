# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# weather-app
YOUR POSTGRESQL DATABASE PASSWORD: vbiIQUI1xFWPEJfg
const sqlQuery= `
-- 1. create the profiles table
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  full_name text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
-- 2. enable row level security
alter table public.profiles
enable row level security;
-- 3. create policies
create policy "Users can view own profile"
on public.profiles
for select
using (auth.uid() = id);
create policy "Users can update own profile"
on public.profiles
for update
using (auth.uid() = id);
create policy "Users can insert own profile"
on public.profiles
for insert
with check (auth.uid() = id);
-- 4. create function for auto-profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();
`;
