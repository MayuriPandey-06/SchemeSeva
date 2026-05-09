# Government Scheme Automation Platform

A complete citizen-friendly platform built with React, Tailwind CSS, Supabase, Node.js, Express, Tesseract.js, and Nodemailer.

## Project Structure

frontend/
- React UI, Tailwind styling, Supabase auth, OCR integration, responsive dashboard

backend/
- Express API, Supabase data layer, document upload, recommendation engine, notification email service

## Setup Instructions

1. Open two terminals.

2. Install frontend dependencies:

```bash
cd frontend
npm install
```

3. Install backend dependencies:

```bash
cd ../backend
npm install
```

4. Create env files from examples.

### Frontend env
FILE:
frontend/.env

ADD:
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
VITE_BACKEND_URL=http://localhost:5000/api

HOW TO GET:
1. Open Supabase Dashboard
2. Open Project Settings
3. Open API section
4. Copy Project URL and anon public key
5. Paste values here

### Backend env
FILE:
backend/.env

ADD:
SUPABASE_URL=your_supabase_url_here
SUPABASE_SERVICE_KEY=your_supabase_service_key_here
SMTP_HOST=your_smtp_host_here
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_smtp_user_here
SMTP_PASS=your_smtp_password_here
SMTP_FROM=notifications@yourdomain.com
FRONTEND_URL=http://localhost:4173

HOW TO GET:
1. Open Supabase Dashboard
2. Open Project Settings
3. Open API section
4. Copy Project URL and service role key
5. Paste values here
6. Configure SMTP credentials from your email provider

## Supabase Setup

1. Create a Supabase project.
2. Add storage bucket named `documents`.
3. Run SQL from `backend/db/schema.sql` in Supabase SQL Editor.
4. Ensure auth email sign-in is enabled.

## Run locally

```bash
cd backend
npm run dev
```

```bash
cd frontend
npm run dev
```

## Deployment

- Frontend: Vercel, point to `frontend` directory.
- Backend: Render, deploy from `backend` directory.

## Notes

- The backend uses Supabase service key and protected endpoints.
- Frontend auth and session persistence is handled through Supabase auth.
- Document uploads are stored in Supabase Storage.
- OCR uses Tesseract.js in the browser.
