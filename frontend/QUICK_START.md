# ⚡ Quick Start Guide

Get the Knowledge Bonsai frontend running in 3 steps!

## 🚀 3-Step Setup

### 1️⃣ Install

```bash
npm install
```

### 2️⃣ Configure

Create `.env` file (already done, but verify the API URL):

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_NAME=Knowledge Bonsai
```

### 3️⃣ Run

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) 🎉

---

## 📦 What's Included?

✅ **Pages Ready:**
- 🏠 Home Dashboard (`/`)
- 🌳 Knowledge Graph (`/graph`)
- 📦 Nodes List (`/nodes`)
- 👥 Users Management (`/users`)

✅ **Features:**
- React 19 + TypeScript
- Tailwind CSS v4
- React Router v6
- ReactFlow for graphs
- Axios for API calls
- Responsive layout with sidebar & header

✅ **API Service:**
- Pre-configured Axios client
- User service with full CRUD
- Error handling built-in

---

## 🎯 Common Commands

```bash
# Development
npm run dev          # Start dev server (hot reload)

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

---

## 🗂️ Project Structure

```
src/
├── layout/      → Header, Sidebar, MainLayout
├── page/        → HomePage, GraphPage, NodesPage, UsersPage
├── routes/      → React Router config
├── service/     → API client & services
├── App.tsx      → Router setup
└── main.tsx     → Entry point
```

---

## 🔧 Quick Tips

### Adding a New Page?

1. Create `src/page/MyPage.tsx`
2. Export from `src/page/index.ts`
3. Add route in `src/routes/index.tsx`
4. Add link in `src/layout/Sidebar.tsx`

### Making API Calls?

```typescript
import { userService } from '../service';

const users = await userService.getAllUsers();
```

### Styling Components?

Use Tailwind classes:

```tsx
<button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
  Click Me
</button>
```

---

## 🆘 Troubleshooting

**Port already in use?**
```bash
# Kill process on port 5173 (Windows PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess | Stop-Process
```

**Backend not connecting?**
- Check `.env` has correct `VITE_API_BASE_URL`
- Ensure backend is running on port 3000
- Verify CORS is enabled on backend

**Styles not working?**
- Restart dev server: `Ctrl+C` then `npm run dev`
- Check `@import "tailwindcss";` is in `src/index.css`

---

## 📚 Full Documentation

- **README.md** - Complete project overview
- **SETUP.md** - Detailed setup & architecture guide

---

**Ready to build? Let's go! 🚀**

