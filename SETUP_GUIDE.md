# 🚀 Government Scheme Automation Platform - Quick Setup Guide

## ✅ Current Status
- ✨ Backend running on `http://localhost:5000/api`
- ✨ Frontend running on `http://localhost:4173`
- ✨ All dependencies installed

---

## 📋 What You Need (3 Simple Steps)

### STEP 1: Create Supabase Project
1. Go to https://supabase.com
2. Click "New Project"
3. Choose a name (e.g., "Gov-Scheme-Platform")
4. Set a strong database password
5. Select your region
6. Click "Create new project"
7. Wait 2-3 minutes for it to initialize

---

### STEP 2: Get Your Credentials from Supabase

#### Get SUPABASE_URL:
1. In Supabase dashboard, go to **Settings > API** (left sidebar)
2. Copy the **Project URL** (looks like: `https://xxxxx.supabase.co`)
3. Save it

#### Get SUPABASE_ANON_KEY (Frontend):
1. In **Settings > API**, scroll to **Project API keys**
2. Copy the **anon public** key
3. Save it

#### Get SUPABASE_SERVICE_KEY (Backend):
1. In **Settings > API**, find the **service_role** key (marked "secret")
2. Copy it
3. Save it

---

### STEP 3: Setup Your Email (Nodemailer)

For email notifications, use Gmail:

1. Go to https://myaccount.google.com
2. Go to **Security** tab
3. Enable **2-Step Verification** (if not already enabled)
4. Click **App passwords** (appears only after 2FA is on)
5. Select "Mail" and "Windows Computer"
6. Copy the 16-character password
7. Save it

---

## 🔧 Adding Credentials to .env Files

### Frontend .env
**FILE:** `frontend/.env`

**FIND THESE LINES:**
```
VITE_SUPABASE_URL=https://your-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...YOUR_ANON_KEY_HERE
VITE_BACKEND_URL=http://localhost:5000/api
```

**REPLACE WITH:**
- Line 1: Paste your `SUPABASE_URL` (from Step 2)
- Line 2: Paste your `SUPABASE_ANON_KEY` (from Step 2)
- Line 3: Keep as is (localhost for development)

**EXAMPLE:**
```
VITE_SUPABASE_URL=https://abcdef123456.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZjEyMzQ1NiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjI0NzU1NjAwLCJleHAiOjE5MzE5MzE2MDB9.ZZkT7W9ZZkT7W9ZZkT7W9ZZ
VITE_BACKEND_URL=http://localhost:5000/api
```

---

### Backend .env
**FILE:** `backend/.env`

**FIND THESE LINES:**
```
SUPABASE_URL=https://your-project-url.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...YOUR_SERVICE_KEY_HERE
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password-here
SMTP_FROM=notifications@yourdomain.com
FRONTEND_URL=http://localhost:4173
PORT=5000
```

**REPLACE WITH:**
- Line 1: Paste your `SUPABASE_URL` (same as frontend)
- Line 2: Paste your `SUPABASE_SERVICE_KEY` (from Step 2)
- Line 5: Set to `true` if using Gmail
- Line 6: Your Gmail address (e.g., `myemail@gmail.com`)
- Line 7: Paste the 16-character Google App Password (from Step 3)
- Line 8: Can keep or customize
- Line 9-10: Keep as is

**EXAMPLE:**
```
SUPABASE_URL=https://abcdef123456.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZjEyMzQ1NiIsInJvbGUiOiJzZXJ2aWNlX3JvbGUiLCJpYXQiOjE2MjQ3NTU2MzAsImV4cCI6MTkzMTkzMTYzMH0.Zz
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=mayuri@gmail.com
SMTP_PASS=qwer tyui asdfghjk
SMTP_FROM=mayuri@gmail.com
FRONTEND_URL=http://localhost:4173
PORT=5000
```

---

## 🗄️ Setup Supabase Database

1. In Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **New Query**
3. Copy the entire contents of: `backend/db/schema.sql`
4. Paste into the SQL Editor
5. Click **Run**
6. Wait for success message ✅

This creates all tables and sample schemes automatically.

---

## 🔌 After Adding Credentials

1. Save both `.env` files
2. **Restart the backend:**
   - Stop backend (Ctrl+C in backend terminal)
   - Run: `npm start` in backend folder
   - Wait for: "Backend running on port 5000"

3. **Refresh the frontend:**
   - Go to http://localhost:4173
   - You may see blank page
   - Hard refresh: Ctrl+F5 (or Cmd+Shift+R on Mac)

---

## 🎯 Test Everything

1. Go to http://localhost:4173
2. Click **"Create account"**
3. Use any email + password
4. Verify email (check inbox or spam)
5. Login
6. Go to **Profile** page
7. Fill in citizen details
8. Click **Save Profile**
9. Go to **Schemes** - should see 3 sample schemes

---

## ✅ When It Works
- Login/Signup pages load
- Dashboard shows eligible schemes
- Profile forms save data
- Family members can be added
- Document uploads work

---

## ❌ Troubleshooting

### "Blank page on frontend"
- Hard refresh: Ctrl+F5
- Check browser console (F12 > Console)
- Check that backend is running

### "Cannot connect to backend"
- Verify backend showing: "Backend running on port 5000"
- Frontend .env has correct VITE_BACKEND_URL

### "Email not sending"
- Check Gmail app password is correct (no spaces)
- Verify 2FA is enabled on Gmail
- Check backend console for errors

### "Database connection fails"
- Verify SUPABASE_URL is correct
- Verify SUPABASE_SERVICE_KEY is correct
- Verify SQL schema was run successfully

---

## 📱 Access Points

**Development:**
- Frontend: http://localhost:4173
- Backend API: http://localhost:5000/api
- Supabase: https://supabase.com

**Folder Paths:**
- Frontend env: `frontend/.env`
- Backend env: `backend/.env`
- Database schema: `backend/db/schema.sql`

---

## 🎉 Ready to Deploy?

Once everything works locally:

### Frontend Deployment (Vercel)
1. Push to GitHub
2. Go to https://vercel.com
3. Import GitHub repo
4. Add same environment variables
5. Deploy

### Backend Deployment (Render)
1. Push to GitHub
2. Go to https://render.com
3. Create new service
4. Connect GitHub
5. Add environment variables
6. Deploy

---

**That's it! You now have a fully functional Government Scheme Automation Platform! 🚀**
