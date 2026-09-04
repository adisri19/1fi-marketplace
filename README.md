# 1Fi Marketplace — Web Version of Shop Tab

A full-stack web application replicating the web version of **1Fi's Shop tab** ("1Fi Marketplace"). The platform empowers users to purchase premium smartphones on affordable EMI tenures backed by mutual fund investments, merging Snapmint's product functionality with 1Fi's deep violet visual language.

---

## 🌟 Features

- **Mutual-Fund-Backed EMIs**: 0% interest and low-cost EMI plans without credit checks, backed by user mutual fund holdings.
- **1Fi Visual Identity**: Deep violet accents (`#4B1FD6`), faint violet background (`#F5F3FF`), custom typography (`DM Sans`), rounded cards (`16px`), and pill badges.
- **Interactive Shop Tab**: Pill tab switcher ("Top Brands", "Nearby Stores", "1Fi Marketplace") with hero banner and smartphone card grid.
- **Product Details & EMI Calculator**:
  - Image gallery with interactive thumbnails and rating badge.
  - Interactive variant selector: color swatches and storage pills.
  - Snapmint-style "Pay only ₹X now" benefit callout.
  - Radio-card style EMI tenure selection (3 to 60 months) with 0% EMI badges, cashback tags, and recommended plan badges.
  - Sticky bottom proceed bar on mobile, full-width button on desktop.
  - Interactive toast confirmation upon tenure selection.
- **Resilient UX**: Shape-matched skeletons for loading states and inline error states with retry buttons.

---

## 🏗️ Architecture

The backend follows a strict layered architecture:
```
Request → Route → Controller → Service → Repository → Prisma → PostgreSQL DB
```
- **Routes (`*.routes.js`)**: Pure Express route bindings. Zero logic.
- **Controllers (`*.controller.js`)**: Parse HTTP requests, delegate to services, format responses. Zero database code.
- **Services (`*.service.js`)**: Business validation and error handling using custom `AppError`.
- **Repositories (`*.repository.js`)**: Exclusive location for Prisma queries.
- **Global Error Handling**: Centralized error middleware with standardized JSON outputs.

The frontend follows container & pure component separation:
- **State Management**: TanStack Query v5 for server cache and Zustand for client-side variant and EMI tenure selection.
- **API Layer**: Centralized Axios client (`src/services/api.js`).

---

## 🗄️ Database Schema

```prisma
model Product {
  id        String    @id @default(cuid())
  name      String                          // "Apple iPhone 17 Pro"
  slug      String    @unique               // "iphone-17-pro"
  brand     String                          // "Apple"
  category  String    @default("smartphone")
  badge     String?                         // "NEW" or "HOT"
  variants  Variant[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  @@index([slug])
}

model Variant {
  id        String    @id @default(cuid())
  productId String
  product   Product   @relation(fields: [productId], references: [id], onDelete: Cascade)
  label     String                          // "256GB – Natural Titanium"
  storage   String?                         // "256GB"
  color     String?                         // "Natural Titanium"
  colorHex  String?                         // "#E8D5B7"
  mrp       Int                             // original price in INR
  price     Int                             // discounted price in INR
  imageUrl  String                          // main image
  images    String[]                        // gallery images array
  soldCount Int       @default(0)           // social proof count
  emiPlans  EMIPlan[]

  @@index([productId])
}

model EMIPlan {
  id            String  @id @default(cuid())
  variantId     String
  variant       Variant @relation(fields: [variantId], references: [id], onDelete: Cascade)
  tenureMonths  Int                         // 3, 6, 9, 12, 24, 36, 48, 60
  monthlyAmount Int                         // in INR
  interestRate  Float                       // 0.0 or 10.5
  cashback      Int?                        // e.g. 7500
  isPopular     Boolean @default(false)     // "RECOMMENDED" badge

  @@unique([variantId, tenureMonths])
  @@index([variantId])
}
```

---

## 📡 API Reference

### 1. Health Check
`GET /health`
```json
{
  "status": "ok",
  "ts": 1725418000000
}
```

### 2. Get All Products
`GET /api/products`
```json
{
  "status": "success",
  "results": 3,
  "data": [
    {
      "id": "cm...1",
      "name": "Apple iPhone 17 Pro",
      "slug": "iphone-17-pro",
      "brand": "Apple",
      "badge": "NEW",
      "variants": [
        {
          "id": "cm...v1",
          "label": "256GB – Natural Titanium",
          "price": 127400,
          "mrp": 134900,
          "imageUrl": "https://placehold.co/600x600/f5f5f5/333?text=iPhone+17+Pro+Silver",
          "colorHex": "#E8D5B7",
          "color": "Natural Titanium",
          "storage": "256GB",
          "soldCount": 70
        }
      ]
    }
  ]
}
```

### 3. Get Product by Slug
`GET /api/products/:slug`
```json
{
  "status": "success",
  "data": {
    "id": "cm...1",
    "name": "Apple iPhone 17 Pro",
    "slug": "iphone-17-pro",
    "brand": "Apple",
    "badge": "NEW",
    "variants": [
      {
        "id": "cm...v1",
        "label": "256GB – Natural Titanium",
        "storage": "256GB",
        "color": "Natural Titanium",
        "colorHex": "#E8D5B7",
        "mrp": 134900,
        "price": 127400,
        "imageUrl": "https://...",
        "images": ["https://..."],
        "soldCount": 70,
        "emiPlans": [
          {
            "id": "cm...e1",
            "tenureMonths": 12,
            "monthlyAmount": 11242,
            "interestRate": 0,
            "cashback": 7500,
            "isPopular": true
          }
        ]
      }
    ]
  }
}
```

---

## 💻 Local Setup

### Prerequisites
- Node.js (v18+)
- PostgreSQL installed and running on port 5432

### 1. Clone and Setup Backend
```bash
cd backend
npm install
cp .env.example .env

# Configure your DATABASE_URL in .env, e.g.:
# DATABASE_URL="postgresql://localhost:5432/1fi_marketplace"

# Run migrations and seed data
npx prisma migrate dev --name init
node prisma/seed.js

# Start backend server
npm run dev # runs on http://localhost:5000
```

### 2. Setup Frontend
```bash
# In a new terminal
cd frontend
npm install
cp .env.example .env
# VITE_API_URL=http://localhost:5000

# Start Vite dev server
npm run dev # runs on http://localhost:5173
```

---

## 🚀 Deployment Guide

### Backend on Render
1. Create a **New Web Service** connected to your repository.
2. Set **Root Directory** to `backend`.
3. Set **Build Command**:
   ```bash
   npm install && npx prisma generate && npx prisma migrate deploy
   ```
4. Set **Start Command**:
   ```bash
   node src/server.js
   ```
5. Add Environment Variables:
   - `DATABASE_URL`: PostgreSQL connection string (from Render PostgreSQL add-on or Supabase/Neon)
   - `NODE_ENV`: `production`
   - `FRONTEND_URL`: `https://your-frontend.vercel.app`
6. Run database seed from Render Shell:
   ```bash
   node prisma/seed.js
   ```

### Frontend on Vercel
1. Create a **New Project** and import the repository.
2. Set **Root Directory** to `frontend`.
3. Set **Framework Preset** to `Vite`.
4. Add Environment Variable:
   - `VITE_API_URL`: `https://your-backend.onrender.com`
5. Deploy.
