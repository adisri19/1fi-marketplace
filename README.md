# 1Fi Marketplace

> A mobile-first, mutual fund-backed EMI marketplace built with 1Fi's design language, product architecture, and production engineering standards.

## 🔗 Quick Links
- **Frontend Live Demo**: [1fi-marketplace-frontend.vercel.app](https://1fi-marketplace-frontend.vercel.app)
- **Live Shop Page**: [1fi-marketplace-frontend.vercel.app/shop](https://1fi-marketplace-frontend.vercel.app/shop)
- **Backend API**: [onefi-marketplace-backend.onrender.com](https://onefi-marketplace-backend.onrender.com)
- **GitHub Repo**: [github.com/adisri19/1fi-marketplace](https://github.com/adisri19/1fi-marketplace)

---

## ⚡ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS v3, TanStack Query v5, Zustand, Lucide Icons |
| **Backend** | Node.js, Express.js, Prisma ORM, PostgreSQL |
| **External APIs** | OpenStreetMap Overpass API (Nearby Stores real-time geolocation) |

---

## 🎯 Architecture & Product Highlights

| Pillar | Implementation Highlights |
|---|---|
| **1. Product Experience** | Modeled around 1Fi's Shop experience, mutual fund-backed credit model, pill switcher, and bottom navigation. |
| **2. UI/UX Consistency** | Brand violet `#5B21B6`, DM Sans font, 20px card radius, 12px buttons, skeleton loaders matching content shapes. |
| **3. Engineering Quality** | Layered backend (`Route → Controller → Service → Repository → Prisma`) & feature-based frontend. Centralized API client, zero DB queries outside repositories, standardized error handling. |
| **4. End-to-End Flow** | Complete flow: browse → filter → select variant → choose EMI plan → proceed (with reactive toast & plan confirmation). |
| **5. Dynamic Data** | PostgreSQL database with 50 smartphones across 12 brands. Dynamic pagination (`?limit&offset`). Zero hardcoded frontend data. |
| **6. Attention to Detail** | Skeletons on loading, dedicated 404 state, brand-colored image fallbacks (`onError`), geolocation permission states, collapsible specs. |

---

## 🚀 Key Features & Product Depth

| Feature | Details |
|---|---|
| **Top Brands** | Interactive brand grid with search and live product filtering across 12 brands |
| **Nearby Stores** | Real browser Geolocation + OpenStreetMap Overpass API integration for offline partner stores |
| **Catalog Scale** | 50 real smartphones across 12 brands with full specs, color/storage variants, and EMI plans |
| **Complete App Shell** | End-to-end navigation: Home, Shop, EMI Dues, Limit, Profile |
| **Interactive Onboarding** | Interactive onboarding explaining 1Fi's mutual fund credit limit concept |
| **Infinite Scroll** | High-performance infinite scroll via TanStack Query `useInfiniteQuery` + `IntersectionObserver` |

---

## 📡 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/products` | Paginated product list (`?limit=12&offset=0&brand=...`) |
| `GET` | `/api/products/:slug` | Product details with variants, images, and EMI plans |
| `GET` | `/api/brands` | All brands with product counts |
| `GET` | `/api/brands/:id/products` | Products filtered by brand ID |

---

## 🛠️ Local Setup

### 1. Clone & Install
```bash
git clone https://github.com/adisri19/1fi-marketplace.git
cd 1fi-marketplace
```

### 2. Backend
```bash
cd backend
npm install
cp .env.example .env        # Set your PostgreSQL DATABASE_URL
npx prisma migrate dev
node prisma/seed.js         # Seeds 50 products across 12 brands
npm run dev                 # Runs on http://localhost:5001
```

### 3. Frontend
```bash
cd ../frontend
npm install
cp .env.example .env        # Set VITE_API_URL=http://localhost:5001
npm run dev                 # Runs on http://localhost:5173
```
