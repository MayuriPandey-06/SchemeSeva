# 📝 Quick Credentials Checklist

## What You Need to Collect

### From Supabase Dashboard (Settings > API)

- [ ] **SUPABASE_URL**
  - Location: Settings > API > Project URL
  - Example: `https://abcxyz123456.supabase.co`
  - Paste in: `frontend/.env` line 1 AND `backend/.env` line 1

- [ ] **SUPABASE_ANON_KEY** (Public Key)
  - Location: Settings > API > Project API keys > anon public
  - Example: `eyJhbGciOiJIUzI1NiIsInR5cCI...` (long string)
  - Paste in: `frontend/.env` line 2

- [ ] **SUPABASE_SERVICE_KEY** (Secret Key)
  - Location: Settings > API > Project API keys > service_role (marked "secret")
  - Example: `eyJhbGciOiJIUzI1NiIsInR5cCI...` (long string)
  - Paste in: `backend/.env` line 2

### From Gmail Account (myaccount.google.com)

- [ ] **Gmail Address**
  - Your email: `name@gmail.com`
  - Paste in: `backend/.env` line 6 (SMTP_USER)
  - Paste in: `backend/.env` line 8 (SMTP_FROM)

- [ ] **Gmail App Password**
  - Location: Security > App passwords (after enabling 2FA)
  - Example: `qwer tyui asdf ghjk` (16 characters with spaces)
  - Paste in: `backend/.env` line 7 (SMTP_PASS)

---

## File Updates Required

### 1️⃣ frontend/.env

```
VITE_SUPABASE_URL=<PASTE_YOUR_SUPABASE_URL>
VITE_SUPABASE_ANON_KEY=<PASTE_YOUR_ANON_KEY>
VITE_BACKEND_URL=http://localhost:5000/api
```

### 2️⃣ backend/.env

```
SUPABASE_URL=<PASTE_YOUR_SUPABASE_URL>
SUPABASE_SERVICE_KEY=<PASTE_YOUR_SERVICE_KEY>
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=<PASTE_YOUR_GMAIL_ADDRESS>
SMTP_PASS=<PASTE_YOUR_GMAIL_APP_PASSWORD>
SMTP_FROM=<PASTE_YOUR_GMAIL_ADDRESS>
FRONTEND_URL=http://localhost:4173
PORT=5000
```

### 3️⃣ Run SQL in Supabase

Copy entire file: `backend/db/schema.sql`
Paste in: Supabase > SQL Editor > New Query
Click: Run

---

## Servers Running

✅ Backend: `http://localhost:5000/api`
✅ Frontend: `http://localhost:4173`

---

## Once Credentials Are Added

1. Save `.env` files
2. Restart backend (Ctrl+C then `npm start`)
3. Refresh frontend (Ctrl+F5)
4. Go to http://localhost:4173
5. Click "Create account"
6. Test signup and login

Done! 🎉
