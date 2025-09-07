# nubo_is

Next.js 15 App Router project with Supabase Auth and Onboarding Flows.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

3. Add your Supabase credentials to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the database schema:
```sql
-- Execute supabase-schema.sql in your Supabase SQL editor
```

5. Start the development server:
```bash
npm run dev
```

## Features

- Supabase Authentication (email/password)
- Dashboard with Onboarding Flows management
- Server Actions for database operations
- Audit logging
- TypeScript support
- Tailwind CSS styling

## Database Schema

- `onboarding_flows`: id, employee_email, status, created_at
- `audit_logs`: id, action, created_at