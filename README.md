# ShahY Store — متجر شاهي

> متجر إلكتروني فاخر للإكسسوارات النسائية المستوردة — شنط، محافظ، وشوزات

**Live URL:** [shah-y-store.vercel.app](https://shah-y-store.vercel.app)  
**Admin Panel:** [shah-y-store.vercel.app/admin/dashboard](https://shah-y-store.vercel.app/admin/dashboard)  
**User Guide:** [shah-y-store.vercel.app/guide](https://shah-y-store.vercel.app/guide)

---

## Overview / نبذة

ShahY Store is a luxury Egyptian e-commerce store for imported women's accessories (bags, wallets, shoes). It combines an elegant visual identity (Gold × Burgundy × Black) with a smooth shopping experience powered by WhatsApp for order fulfilment.

- **Store Owner:** شاهندة سليمان — [@shah.ystore](https://www.instagram.com/shah.ystore/) — +201015835455
- **Design & Development:** أحمد درهوس — [@darhous](https://www.instagram.com/darhous/) — +201030002331

---

## Stack

| Technology | Role |
|-----------|------|
| **Next.js 16** | App Router — Server + Client Components |
| **TypeScript** | Fully type-safe codebase |
| **Drizzle ORM** | Type-safe database queries |
| **Supabase PostgreSQL** | Database (with RLS enabled) |
| **Better Auth** | Authentication & session management |
| **Vercel** | Hosting & automatic deployments |
| **Tailwind CSS** | Admin panel styling |
| **next/og** | Dynamic OG images (Edge Runtime) |
| **PWA** | manifest.json + Service Worker |

---

## Features

### Store Front (Phase 1–3 Complete)

- **Luxury homepage** — 4.5s animated loader, dynamic rotating hero words, gold/burgundy background lines
- **Trust strip** — 4 cards: fast shipping, cash on delivery, returns, curated quality
- **Categories strip** — interactive pills for quick category navigation
- **Flash Deals** — dynamic countdown timer, discount badges, enable/disable from settings
- **Product grid** — independent filter by category, quality tier, price; automatic discount badges
- **Wishlist heart** on every product card with heart animation
- **Instant search** — debounced, with results + thumbnails, recent searches, trending searches
- **Cart drawer** — auto-opens on add, shows products + quantity editor
- **Customer reviews** — featured ratings on homepage
- **Product page** — image gallery with arrows + indicators, keyboard navigation, share button, trust cards
- **Cart page** — localStorage, quantity editing, sticky mobile confirm bar
- **Wishlist page** — local storage, counter in header
- **Recently viewed** — last 8 products, horizontal strip below product page
- **Sale page `/sale`** — automatic, sorted by discount percentage
- **Order tracking `/track`** — 4 visual stages, search by order number
- **FAQ `/faq`** — 8 common questions with luxury design + WhatsApp link
- **User Guide `/guide`** — 15 detailed sections with screen mockups, PDF-printable

### Customer Account

| Page | Path | Description |
|------|------|-------------|
| Sign In | `/signin` | Unified login — auto-redirects admins to dashboard, customers to account |
| Sign Up | `/signup` | Registration with Better Auth |
| Account | `/account` | Profile, order history |

### Admin Panel (`/admin/*`)

| Page | Path | Description |
|------|------|-------------|
| Dashboard | `/admin/dashboard` | Revenue, orders, products stats |
| Products | `/admin/products` | Add / edit / delete / upload images |
| Product Variants | (within products) | Sizes, colors, stock, independent pricing |
| Orders | `/admin/orders` | View and update status |
| Customers & Members | `/admin/customers` | ALL auth users with role management (promote/demote admin) |
| Admins | `/admin/admins` | Admin list |
| Banners | `/admin/banners` | Upload, activate, sort, delete |
| Categories | `/admin/categories` | Category management |
| Discounts | `/admin/discounts` | Discount codes |
| Shipping | `/admin/shipping` | Shipping zones |
| Reviews | `/admin/reviews` | Moderate customer reviews |
| Settings | `/admin/settings` | Store name, WhatsApp, social links, hero words, announcement bar, flash deals |

> **Admin Login:** Go to `/signin` and log in with your admin credentials — you will be automatically redirected to the dashboard.

---

## Authentication Architecture

- **Better Auth** manages all users (stored in `user` table)
- Admins are tracked in a separate `admins` table (linked by `auth_user_id`)
- `/api/check-admin` — public endpoint to check if logged-in user is an admin
- `/api/admin/users` — lists all registered users with admin status
- `/api/admin/users/[id]/role` — PATCH to promote/demote users to/from admin

---

## Environment Variables

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database (Supabase)
DATABASE_URL=postgresql://...

# Better Auth
BETTER_AUTH_SECRET=your_secret_here
BETTER_AUTH_URL=http://localhost:3000
```

> **Important:** Never commit secrets to Git. Use `.env.local` locally and Vercel Environment Variables in production.

---

## Quick Start

```bash
# Install dependencies
npm install

# Create env file
cp .env.example .env.local
# (fill in env vars — see above)

# Push schema to database
npm run db:push

# Run locally
npm run dev
```

---

## Project Structure

```
src/
  app/
    (store pages)         ← Public: / , /products, /sale, /track, /wishlist, /faq, /guide, /signin, /signup, /account
    admin/                ← Admin panel pages (protected)
    api/
      check-admin/        ← POST: check if current user is admin
      admin/users/        ← GET: all users; PATCH [id]/role: promote/demote
      admin/...           ← Other admin API routes
  components/
    store/                ← StoreHeader, StoreFooter, HeroSection, ProductGrid...
    admin/                ← Admin forms, tables, dashboards
  lib/
    auth/                 ← Better Auth config + middleware
    db/drizzle/           ← Schema + connection
  utils/
    auth.ts               ← Better Auth server instance
  public/
    manifest.json         ← PWA manifest
    sw.js                 ← Service Worker
```

---

## Key Commands

```bash
npm run dev          # Local development
npm run build        # Production build
npm run typecheck    # TypeScript check
npm run lint         # Lint
npm run db:push      # Sync schema to database
npm run db:studio    # Database GUI
```

---

## Visual Identity

| Element | Value |
|---------|-------|
| Gold (primary) | `#C9A84C` |
| Burgundy | `#7B1C2E` |
| Dark background | `#0A0806` |
| Ivory | `#F5EFE0` |
| Light gold | `#F0D882` |
| Fonts | Tajawal · Playfair Display · Cinzel · Cormorant Garamond |

---

## Security Notes

- Supabase accessed via API only — no direct client SDK
- Secrets in `.env.local` only — never committed
- WhatsApp via free wa.me deep links — no WhatsApp Business API
- Better Auth with admin role protection on all `/admin/*` routes
- RLS enabled on all Supabase tables

---

## Stability Notes

- **Loading screen:** 4.5s with CSS fallback that hides it after 7s even if JS fails
- **React Hydration:** `suppressHydrationWarning` on `<html>` prevents error #418 from browser extensions
- **ChunkLoadError:** `error.tsx` auto-reloads on stale cache
- **WhatsApp number:** `+201015835455` — fetched dynamically from `/api/store-config`
- **Admin entry:** `/signin` — logs in and auto-redirects to dashboard if admin

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| v1.5.0 | 2026-06-29 | Unified signin (admin + customer auto-redirect), role management UI, remove padlock from header |
| v1.4.0 | 2026-06-28 | Fix Hydration, /admin redirect, guide PDF, download buttons |
| v1.3.0 | 2026-06-28 | Phase 3: reviews, search hints, FAQ, mobile cart, footer |
| v1.2.0 | 2026-06-28 | Phase 2: cart drawer, trust section, categories strip, wishlist heart |
| v1.1.0 | 2026-06-28 | Phase 1: quality badges, lazy loading, hero CTA |
| v1.0.0 | 2026-06-27 | Initial launch: full store + admin panel + Better Auth |

---

*© 2026 ShahY Store — Designed & Developed by [Ahmed Darhous](https://www.instagram.com/darhous/)*
