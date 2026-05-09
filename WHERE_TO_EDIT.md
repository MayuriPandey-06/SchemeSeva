# 📝 WHERE TO EDIT - Visual Guide

## Your Project Folder Structure

```
C:\Users\Mayuri Pandey\OneDrive\Desktop\Project\
├── frontend/
│   └── .env          ← EDIT THIS FILE #1
│
├── backend/
│   └── .env          ← EDIT THIS FILE #2
│
├── START_HERE.md     ← READ THIS FIRST
└── other files...
```

---

## 🔴 FILE #1: frontend/.env

**Full Path:** 
```
C:\Users\Mayuri Pandey\OneDrive\Desktop\Project\frontend\.env
```

**Current Content:**
```
VITE_SUPABASE_URL=https://your-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...YOUR_ANON_KEY_HERE
VITE_BACKEND_URL=http://localhost:5000/api
```

**What to Replace:**

| Line | Old Value | New Value | Source |
|------|-----------|-----------|--------|
| 1 | `https://your-project-url.supabase.co` | Your Supabase **Project URL** | Supabase > Settings > API |
| 2 | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Your **anon public** key | Supabase > Settings > API > Project API keys |
| 3 | `http://localhost:5000/api` | KEEP AS IS | Don't change |

**Example After Replacement:**
```
VITE_SUPABASE_URL=https://abcdef123456.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZjEyMzQ1NiIsInJvbGUiOiJhbm9uIn0.ZZkT7W9ZZkT7W9ZZkT7W9
VITE_BACKEND_URL=http://localhost:5000/api
```

---

## 🔵 FILE #2: backend/.env

**Full Path:**
```
C:\Users\Mayuri Pandey\OneDrive\Desktop\Project\backend\.env
```

**Current Content:**
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

**What to Replace:**

| Line | Setting | Old Value | New Value | Source |
|------|---------|-----------|-----------|--------|
| 1 | SUPABASE_URL | `https://your-project-url.supabase.co` | Your **Project URL** | Supabase > Settings > API |
| 2 | SUPABASE_SERVICE_KEY | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Your **service_role** key | Supabase > Settings > API > Project API keys |
| 3 | SMTP_HOST | `smtp.gmail.com` | KEEP AS IS | For Gmail |
| 4 | SMTP_PORT | `587` | KEEP AS IS | Gmail port |
| 5 | SMTP_SECURE | `false` | KEEP AS IS | Gmail setting |
| 6 | SMTP_USER | `your-email@gmail.com` | Your **Gmail address** | e.g., myname@gmail.com |
| 7 | SMTP_PASS | `your-app-password-here` | Your **Gmail App Password** (16 chars) | Google > myaccount.google.com > Security > App passwords |
| 8 | SMTP_FROM | `notifications@yourdomain.com` | Same as **SMTP_USER** | Your Gmail address |
| 9 | FRONTEND_URL | `http://localhost:4173` | KEEP AS IS | Don't change |
| 10 | PORT | `5000` | KEEP AS IS | Don't change |

**Example After Replacement:**
```
SUPABASE_URL=https://abcdef123456.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZjEyMzQ1NiIsInJvbGUiOiJzZXJ2aWNlX3JvbGUifQ.ZZkT7W9
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=mayuri.sharma@gmail.com
SMTP_PASS=qwer tyui asdf ghjk
SMTP_FROM=mayuri.sharma@gmail.com
FRONTEND_URL=http://localhost:4173
PORT=5000
```

---

## 🛠️ How to Edit These Files

### Using VS Code (Recommended)

1. Open your **Project** folder in VS Code
2. In left sidebar, expand folders:
   - `frontend/` → double-click `.env`
   - Or `backend/` → double-click `.env`
3. Edit the values
4. Press: **Ctrl+S** to save

### Using Notepad

1. Open Windows **File Explorer**
2. Navigate to: `C:\Users\Mayuri Pandey\OneDrive\Desktop\Project\frontend\`
3. Right-click on `.env` file
4. Select: **Open with > Notepad**
5. Edit the values
6. Press: **Ctrl+S** to save
7. Repeat for `backend\.env`

### Using PowerShell

```powershell
# Open frontend .env in Notepad
notepad "C:\Users\Mayuri Pandey\OneDrive\Desktop\Project\frontend\.env"

# Or backend .env
notepad "C:\Users\Mayuri Pandey\OneDrive\Desktop\Project\backend\.env"
```

---

## ✅ Step-by-Step Checklist

- [ ] Create Supabase project at https://supabase.com
- [ ] Go to Supabase > Settings > API
- [ ] Copy Project URL
- [ ] Copy anon public key
- [ ] Copy service_role key
- [ ] Edit `frontend/.env` - paste URLs and anon key
- [ ] Edit `backend/.env` - paste URLs and service key
- [ ] (Optional) Setup Gmail and paste credentials in `backend/.env`
- [ ] Save both `.env` files
- [ ] In Supabase: Create SQL query with `backend/db/schema.sql`
- [ ] Run SQL query
- [ ] Stop backend (Ctrl+C in backend terminal)
- [ ] Start backend again: type `npm start`
- [ ] Refresh frontend: Ctrl+F5
- [ ] Go to http://localhost:4173
- [ ] Test signup and login

---

## 🔒 Important Security Notes

⚠️ **DO NOT:**
- Share your `.env` file with anyone
- Commit `.env` to GitHub (it's in .gitignore, so it won't be shared)
- Post your keys in Discord/Slack/Chat
- Use test values in production

✅ **DO:**
- Keep `.env` files private
- Use strong passwords for Supabase
- Use App passwords (not main Gmail password)
- Rotate keys if compromised

---

## 📍 Exact File Locations for Copy-Paste

### Frontend .env Full Path
```
C:\Users\Mayuri Pandey\OneDrive\Desktop\Project\frontend\.env
```

### Backend .env Full Path
```
C:\Users\Mayuri Pandey\OneDrive\Desktop\Project\backend\.env
```

### Database Schema Full Path
```
C:\Users\Mayuri Pandey\OneDrive\Desktop\Project\backend\db\schema.sql
```

---

That's all you need to know to edit the files! 🎯
