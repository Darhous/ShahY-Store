# ShahY Store — Complete Project Context for AI Agents

> **Purpose**: This document gives any AI agent a full picture of the ShahY Store project from scratch — architecture, database, APIs, business rules, and admin tasks. The store owner can share this file at the start of any AI conversation for instant context.

---

## 1. Project Identity

| Field | Value |
|---|---|
| Project Name | ShahY Store (شاهي ستور) |
| GitHub Repo | https://github.com/Darhous/ShahY-Store |
| Live URL | https://shah-y-store.vercel.app |
| Admin Panel | https://shah-y-store.vercel.app/admin/login |
| Admin Guide | https://shah-y-store.vercel.app/admin/guide |
| Store Owner WhatsApp | +201015835455 |
| Developer (Ahmed Darhous) WhatsApp | +201030002331 |
| Developer Instagram | @darhous |
| Language | Arabic (RTL), Egyptian dialect |
| Currency | Egyptian Pound (ج / EGP) |
| Target Market | Egyptian women, luxury imported accessories |

---

## 2. What the Store Sells

Imported women's luxury accessories from international brands. Categories include:
- **شنط** (Handbags) — slug: `handbags`
- **محافظ** (Wallets) — slug: `wallets`
- **كلتشات** (Clutches) — slug: `clutches`
- **أحذية حريمي** (Women's Shoes) — slug: `shoes`

### Quality Tiers (عيار الجودة)

| DB Value | Arabic Label | Description |
|---|---|---|
| `hi_copy` | بريميوم | High-quality copy — most common tier |
| `mirror` | ميرور | Mirror quality |
| `original` | أصلي | Original/authentic piece |

---

## 3. Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Framework | **Next.js 16** (App Router) | Server + client components |
| Database | **PostgreSQL** via Supabase | Connection pooler port 6543 |
| ORM | **Drizzle ORM** | Schema in `src/lib/db/drizzle/schema/` |
| Auth | **Better Auth** | Admin sessions AND customer accounts (emailAndPassword + admin plugin) |
| Deployment | **Vercel** | Auto-deploy from main branch |
| Image Storage | **Supabase Storage** | Bucket: `product-images` |
| Admin UI | **Tailwind CSS** | Standard utility classes |
| Storefront UI | **Inline styles** | No CSS framework — design system enforced via inline style objects |
| Fonts | Google Fonts | Tajawal, Cinzel, Playfair Display, Cormorant Garamond |

### Auth Architecture
- **Admin auth**: Same Better Auth instance. Admins checked against `admins` table.
- **Customer auth**: Better Auth `emailAndPassword` — customers sign up at `/signup`, sign in at `/signin`.
- **Auth client**: `src/lib/auth/client.ts` exports `signIn`, `signUp`, `signOut`, `useSession`.
- **Auth server**: `src/utils/auth.ts` — `auth.api.getSession({ headers })` used in API routes.
- **Admin middleware**: `src/lib/auth/middleware.ts` → `getSessionFromRequest(req)` used in all admin APIs.

---

## 4. Architecture Overview

```
User Browser
    │
    ▼
Next.js App on Vercel
    │
    ├── /app/(store)/*       → Public storefront pages
    ├── /app/signin|signup   → Customer auth pages
    ├── /app/account/*       → Customer account area (session-gated)
    ├── /app/admin/*         → Protected admin panel (Better Auth)
    └── /app/api/*           → API routes (server-side only)
                │
                ▼
         Drizzle ORM (server-side only)
                │
                ▼
         Supabase PostgreSQL
                │
                └── Supabase Storage (images)
```

### Critical Security Rule
Supabase is **NEVER** accessed directly from the client. All database operations go through Next.js API routes. `DATABASE_URL` and all secrets are server-side only, never exposed to the browser.

---

## 5. Database Schema

### `products` table
| Column | Type | Notes |
|---|---|---|
| `id` | uuid (PK) | Auto-generated |
| `name_ar` | text | Arabic product name (e.g. "شنطة جوتشي ميني") |
| `slug` | text (unique) | URL-friendly identifier |
| `description_ar` | text | Arabic product description |
| `category_id` | uuid (FK) | → categories.id (RESTRICT on delete) |
| `quality_tier` | enum | `hi_copy` / `mirror` / `original` |
| `price` | numeric | Actual sale price in EGP |
| `compare_at_price` | numeric (nullable) | Original/old price — shows as struck-through |
| `is_featured` | boolean | If true + compare_at_price > price + status=active → appears in Flash Deals |
| `status` | enum | `active` (visible) / `draft` (hidden) / `archived` (out of stock) |
| `created_at` | timestamp | |
| `updated_at` | timestamp | |

### `product_variants` table
| Column | Type | Notes |
|---|---|---|
| `id` | uuid (PK) | |
| `product_id` | uuid (FK) | → products.id (CASCADE delete) |
| `color_ar` | text | Arabic color name (optional) |
| `size` | text | Size label like "S", "M", "38" (optional) |
| `sku` | text | Stock keeping unit (optional) |
| `stock` | integer | Inventory count, min 0 |
| `price_override` | numeric (nullable) | Overrides product price if set |

### `product_images` table
| Column | Type | Notes |
|---|---|---|
| `id` | uuid (PK) | |
| `product_id` | uuid (FK) | → products.id (CASCADE delete) |
| `variant_id` | uuid (FK, nullable) | → product_variants.id |
| `url` | text | Full Supabase Storage URL |
| `alt_ar` | text | Arabic alt text |
| `sort_order` | integer | 0 = main/primary image shown in card |

### `categories` table
| Column | Type | Notes |
|---|---|---|
| `id` | uuid (PK) | |
| `name_ar` | text | Arabic display name |
| `slug` | text (unique) | English slug |
| `sort_order` | integer | Display order in strips and filters |
| `is_active` | boolean | If false, hidden from storefront |
| `created_at` | timestamp | |
| `updated_at` | timestamp | |

### `customers` table
| Column | Type | Notes |
|---|---|---|
| `id` | uuid (PK) | |
| `auth_user_id` | text (unique, nullable) | Links to Better Auth user ID — set when customer has an account |
| `name` | text | Full name |
| `phone` | text | Egyptian phone number — used to match orders |
| `email` | text (nullable) | Customer email |
| `created_at` | timestamp | |
| `updated_at` | timestamp | |

**Order matching**: `/api/account/orders` looks up `customers` by `auth_user_id`, then fetches `orders` where `orders.phone = customer.phone`.

### `orders` table
| Column | Type | Notes |
|---|---|---|
| `id` | uuid (PK) | |
| `order_number` | text (unique) | Format: SHY-0001, SHY-0002, ... |
| `customer_id` | uuid (FK, nullable) | → customers.id (set null on delete) — optional, orders can be anonymous |
| `customer_name` | text | Full name |
| `phone` | text | Egyptian phone number |
| `governorate` | text | Egyptian governorate (محافظة) |
| `address` | text | Delivery address |
| `subtotal` | numeric | Before shipping + discounts |
| `shipping_cost` | numeric | From `shipping_zones.cost` at checkout time |
| `total` | numeric | Final total (subtotal + shipping - discount) |
| `method` | enum | `whatsapp` / `cod` |
| `status` | enum | `pending` / `confirmed` / `shipped` / `delivered` / `cancelled` |
| `discount_code` | text (nullable) | Applied coupon code |
| `notes` | text | Admin/customer notes |

**Status flow**: `pending` → `confirmed` → `shipped` → `delivered`
**Revenue** = only `delivered` orders count toward sales total.
**Orders cannot be deleted** — only status changes, for full audit trail.

### `order_items` table
| Column | Type | Notes |
|---|---|---|
| `order_id` | uuid (FK) | → orders.id (CASCADE) |
| `product_id` | uuid (FK) | → products.id (RESTRICT) |
| `variant_id` | uuid (FK, nullable) | → product_variants.id |
| `product_name` | text | Snapshot of product name at order time |
| `quality_tier` | text | Snapshot of quality tier |
| `qty` | integer | Quantity ordered |
| `unit_price` | numeric | Price at time of order |

### `reviews` table
| Column | Type | Notes |
|---|---|---|
| `id` | uuid (PK) | |
| `product_id` | uuid (FK, nullable) | → products.id |
| `reviewer_name` | text | |
| `rating` | integer | 1–5 stars |
| `body` | text | Review content |
| `is_approved` | boolean | Must be approved before showing on site |
| `created_at` | timestamp | |

### `discount_codes` table
| Column | Type | Notes |
|---|---|---|
| `code` | text (PK) | Uppercase, e.g. "SHAHY10" |
| `type` | enum | `percent` (%) or `fixed` (EGP amount) |
| `value` | numeric | e.g. 10 for 10% or 50 for 50 EGP |
| `min_order` | numeric | Minimum cart total to apply, default 0 |
| `max_uses` | integer (nullable) | null = unlimited uses |
| `used_count` | integer | Auto-incremented on use |
| `expires_at` | timestamp (nullable) | null = never expires |
| `is_active` | boolean | Can pause without deleting |

**Active codes as of June 2026:**
- `SHAHY10` — 10% off, min order 200 EGP
- `WELCOME50` — 50 EGP fixed off, min order 500 EGP

### `shipping_zones` table
| Column | Type | Notes |
|---|---|---|
| `id` | uuid (PK) | |
| `governorate_ar` | text | Governorate name in Arabic |
| `cost` | numeric | Shipping cost in EGP |
| `is_active` | boolean | If false, hidden from checkout dropdown |

**Important**: Checkout (`/checkout/page.tsx`) fetches live shipping zones from `/api/shipping` — NOT hardcoded. Admin changes in `/admin/shipping` immediately affect checkout prices.

### `banners` table
| Column | Type | Notes |
|---|---|---|
| `id` | uuid (PK) | |
| `image_url` | text | Supabase Storage URL |
| `title_ar` | text (nullable) | Optional banner title |
| `link` | text (nullable) | Optional click-through href |
| `sort_order` | integer | |
| `is_active` | boolean | |

### `settings` table (key-value store)
| Key | Description |
|---|---|
| `store_name_ar` | Store name displayed in UI |
| `whatsapp_number` | Store owner's WhatsApp — used in ALL wa.me links |
| `hero_words` | Rotating words in homepage hero animation (comma-separated) |
| `announcement_text` | Top announcement bar text |
| `announcement_active` | Show/hide announcement bar (`"true"` / `"false"`) |
| `flash_deals_active` | Show/hide flash deals section (`"true"` / `"false"`) |
| `flash_deals_ends_at` | Flash deals countdown end time (ISO datetime string) |
| `flash_deals_title_ar` | Flash section heading |

### `admins` table
Managed by Better Auth. Admin credentials stored securely. Each admin has: id, name, email, hashed password, role, created_at.

---

## 6. API Endpoints

### Public APIs (no authentication required)

| Endpoint | Method | Description |
|---|---|---|
| `/api/products` | GET | All active products with images and variants |
| `/api/products/[slug]` | GET | Single product detail by slug |
| `/api/search?q={query}` | GET | Full-text search across product names |
| `/api/store-config` | GET | Public config: whatsapp_number, announcement, flash deals settings |
| `/api/announcement` | GET | Current announcement bar text + active state |
| `/api/shipping` | GET | Active shipping zones with `{ id, governorate_ar, cost }` — used by checkout |
| `/api/orders` | POST | Create a new order (from cart checkout) |
| `/api/orders/track?phone={}&num={}` | GET | Track order by phone + order number |
| `/api/reviews` | GET | Approved reviews only |
| `/api/reviews` | POST | Submit a new review (goes to moderation queue) |
| `/api/discounts/validate?code={}&total={}` | GET | Validate coupon code and return discount amount |

### Customer Account APIs (require Better Auth customer session)

| Endpoint | Method | Description |
|---|---|---|
| `/api/account/orders?limit=N` | GET | Get orders for logged-in customer (matched by customer.phone) |

### Protected Admin APIs (require Better Auth admin session)

| Endpoint | Methods | Description |
|---|---|---|
| `/api/admin/products` | GET, POST | List all products / create product |
| `/api/admin/products/[id]` | PATCH, DELETE | Update (name, price, compare_at_price, is_featured, status, etc.) / delete |
| `/api/admin/products/[id]/images` | GET, POST, DELETE | Manage product images |
| `/api/admin/products/[id]/variants` | GET, POST | Manage variants |
| `/api/admin/products/[id]/variants/[vid]` | PUT, DELETE | Update/delete variant |
| `/api/admin/categories` | GET, POST | List / create categories |
| `/api/admin/categories/[id]` | PATCH, DELETE | Update / delete (DELETE blocked if category has products) |
| `/api/admin/orders/[id]` | GET, PUT | Order detail + status update |
| `/api/admin/settings` | GET, POST | Read all settings / upsert settings (body: `{ settings: [{ key, value }] }`) |
| `/api/admin/reviews` | GET | All reviews including unapproved |
| `/api/admin/reviews/[id]` | PUT | Approve or reject review |
| `/api/admin/discounts` | GET, POST | List / create discount codes |
| `/api/admin/discounts/[id]` | PUT, DELETE | Update / delete discount |
| `/api/admin/shipping` | GET, POST | List / create shipping zones |
| `/api/admin/shipping/[id]` | PUT, DELETE | Update / delete zone |
| `/api/admin/banners` | GET, POST | List / upload banners |
| `/api/admin/banners/[id]` | PUT, DELETE | Update / delete banner |
| `/api/admin/customers` | GET | All registered customers with order counts |
| `/api/admin/upload` | POST | Upload image to Supabase Storage, returns URL |
| `/api/admin/admins` | GET, POST | List admins / create admin |
| `/api/admin/admins/[id]` | DELETE | Remove admin |

---

## 7. Storefront Pages

| Page | URL | Key Components |
|---|---|---|
| Home | `/` | Hero animation, announcement bar, categories strip, products grid, flash deals + countdown, trust section, reviews carousel, FAQ CTA, footer |
| Product Detail | `/products/[slug]` | Image gallery, variant selector, add-to-cart, sticky checkout bar, quality badge |
| Sale | `/sale` | Discounted/featured products only |
| Cart | `/cart` | Cart items, coupon code input, shipping selector, WhatsApp checkout button |
| Checkout | `/checkout` | Full COD checkout form — shipping zones loaded live from DB |
| Order Confirmed | `/order-confirmed?order=SHY-XXXX` | Order success page |
| Wishlist | `/wishlist` | Saved products (localStorage) |
| Track Order | `/track` | Form: phone + order number → shows status |
| Sign In | `/signin` | Customer login (Better Auth emailAndPassword) |
| Sign Up | `/signup` | Customer registration |
| Account Hub | `/account` | Redirects to `/account/profile` |
| Account Profile | `/account/profile` | Session-gated: profile info, sidebar nav, recent 3 orders |
| Account Orders | `/account/orders` | Session-gated: full order history (matched by phone) |
| FAQ | `/faq` | Accordion questions and answers |
| About | `/about` | Brand story |
| Returns | `/returns` | Return/exchange policy |
| Privacy | `/privacy` | Privacy policy |

### Key Storefront Components
- `StoreHeader` — top navigation: logo, nav links, search, wishlist icon, **account icon** (→ `/account`), cart icon, hidden admin padlock icon (opacity 5%)
- `StoreFooter` — footer with links, social icons, designer credit
- `CartDrawer` — slide-out cart panel from the right
- `FloatingWA` — floating WhatsApp button (bottom-right), fetches number from `/api/store-config`
- `AnnouncementBar` — top colored strip for announcements
- `HomeReviews` — reviews carousel (only shows approved reviews)
- `CategoriesStrip` — horizontal scrollable category pills
- `FlashDeals` — flash deals section with countdown timer
- `SearchOverlay` — full-screen search modal

---

## 8. Admin Panel Pages

| Page | URL | Function |
|---|---|---|
| Login | `/admin/login` | Better Auth login form |
| Dashboard | `/admin/dashboard` | Stats (orders, pending, products, revenue, customers), revenue chart 30d, recent orders, top-5 selling products |
| Products | `/admin/products` | Full product CRUD with image upload |
| Orders | `/admin/orders` | Order list with filters + status management |
| Reviews | `/admin/reviews` | Approve/reject customer reviews |
| **Categories** | `/admin/categories` | **Full CRUD**: add modal, inline edit (name/slug/sort), status toggle (نشط/مخفي), delete with product-count guard |
| Shipping | `/admin/shipping` | Shipping zones and prices — changes immediately reflected in checkout |
| Discounts | `/admin/discounts` | Coupon code management |
| Banners | `/admin/banners` | Homepage banner carousel management |
| **Flash Deals** ⚡ | `/admin/flash-deals` | Dedicated flash deals management: toggle is_featured per product, set compare_at_price inline, manage flash settings (active/title/end date) |
| **Customers** 🧑‍💼 | `/admin/customers` | All registered customers with order count per phone |
| Admins | `/admin/admins` | Admin user management |
| Settings | `/admin/settings` | Store-wide settings (WhatsApp, announcement, flash, hero words) |
| Guide | `/admin/guide` | Interactive admin guide |
| Guide PDF | `/admin/guide/print` | Printable PDF (12 sections + ads guide) |
| **Handover** | `/admin/guide/handover` | **Ownership transfer PDF** for site owner |
| Orders CSV | `/api/admin/orders/export` | Downloads all orders as CSV (admin-gated) |

**Admin access from storefront**: The `⚙ الأدمن` button appears in the header nav ONLY when the logged-in user is in the `admins` table (checked via `/api/check-admin`). It is session-aware and invisible to non-admins.

---

## 9. Business Rules

### Ordering Process
1. Customer adds items to cart (stored in localStorage/context)
2. Customer applies coupon code if available (validated via `/api/discounts/validate`)
3. Customer fills out: name, phone, governorate, address (checkout page)
4. Shipping fee is **live from DB** via `/api/shipping` — admin changes take effect immediately
5. Customer clicks "تأكيد الطلب" — order saved to DB with status `pending`, cart cleared, redirect to `/order-confirmed`
6. Store owner sees order in `/admin/orders` and updates status manually

### Payment
- **No online payment gateway**
- Accepted: Cash on Delivery (COD)
- Payment happens physically at delivery

### WhatsApp Number Rules
- **Store owner (orders)**: +201015835455 — used in all customer-facing WhatsApp links
- **Developer (technical)**: +201030002331 — shown in footer "designed by" section and admin guide support CTA
- If the store owner's number changes: update in `/admin/settings` AND update `NEXT_PUBLIC_WHATSAPP_NUMBER` in Vercel environment variables + redeploy

### Reviews
- All reviews require admin approval before appearing on the site
- Approved reviews appear in the homepage carousel, sorted by rating (highest first)

### Flash Deals Logic
- Only products with **all three**: `status = 'active'` AND `is_featured = true` AND `compare_at_price > price` appear in Flash Deals section
- Managed from `/admin/flash-deals` — toggle is_featured, set compare_at_price inline
- Flash section settings (on/off, title, end date) editable in `/admin/flash-deals` settings panel OR `/admin/settings`
- The countdown timer runs based on `flash_deals_ends_at` setting

### Customer Accounts & Dashboard
- Customers register at `/signup`, sign in at `/signin` (unified — also redirects admins to `/admin/dashboard`)
- **World-class account dashboard** at `/account/profile`: 5 tabs — نظرة عامة / طلباتي / الكوبونات / الإشعارات / بياناتي
- Orders tab shows 4-step timeline tracker (pending → confirmed → shipped → delivered)
- Coupons tab shows valid/used/expired codes with copy-to-clipboard
- Notifications tab shows new products added in the last 30 days
- **Profile editing**: "بياناتي" tab has a full edit form — name, phone, Instagram/Facebook/TikTok URLs
- **Avatar upload**: Click the avatar in the hero card → file input → `POST /api/account/avatar` → Supabase Storage bucket `avatars` → public URL stored in `customers.avatar_url`
- **Checkout pre-fill**: if logged in, name and phone auto-filled from session + customer record
- **Order linking**: checkout sends `customer_id` so orders are linked to customer UUID (not just phone match)
- Account linked to orders: `GET /api/account/me` returns full customer record (incl. social links); `PATCH /api/account/me` updates name/phone/social URLs
- Customer accounts are separate from admin accounts

### AI Image Prompt
- Available at `/ai-image-prompt.md` (public file, downloadable)
- A world-class prompt for transforming any product photo into a luxury ad image using ChatGPT-4o, Gemini, Claude, or Midjourney
- Includes: full prompt, short prompt, video prompt, usage tips, recommended free tools
- Accessible from the admin guide download bar

### Coupons
- Discount is applied client-side at cart calculation
- The order saved in DB reflects the final discounted total

### Categories
- Categories with products **cannot be deleted** (foreign key RESTRICT — returns error with product count)
- Move products to another category first, then delete
- `is_active = false` hides category from storefront without deleting

---

## 10. Design System

### Colors
```
Gold (Primary):        #C9A84C  — buttons, borders, accents, active states
Gold Light:            #F0D882  — gradient end point
Burgundy (Accent):     #7B1C2E  — sale tags, secondary CTAs
Background:            #0A0806  — near-black page background
Surface:               #111009  — card/component background
Text Primary:          #F5EFE0  — ivory white for main text
Text Muted:            rgba(245,239,224,0.4) — subdued labels
Green (WhatsApp):      #25D366  — WhatsApp buttons
```

### Typography (Google Fonts)
```
Tajawal           — Arabic body text (weights: 300, 400, 700, 900)
Cinzel            — Section labels, brand name, credits (400, 700)
Playfair Display  — Large decorative headings (700)
Cormorant Garamond — Elegant quotes, subtitles (400, 500)
```

### Quality Badge Colors
```
بريميوم (hi_copy):  Gold    #C9A84C
ميرور (mirror):     Purple  #9b59b6
أصلي (original):    Blue    #3498db
```

### Order Status Badge Colors
```
معلّق (pending):    Orange  #e65100 / yellow-400
مؤكد (confirmed):   Blue    #1565c0 / blue-400
شُحن (shipped):     Purple  #6a1b9a / purple-400
سُلّم (delivered):  Green   #27ae60 / green-400
ملغي (cancelled):  Red     #c62828 / red-400
```

---

## 11. Key File Structure

```
src/
├── app/
│   ├── page.tsx              ← Home page (/)
│   ├── products/[slug]/page.tsx
│   ├── sale/page.tsx
│   ├── cart/page.tsx
│   ├── checkout/page.tsx     ← "use client" — fetches zones from /api/shipping
│   ├── wishlist/page.tsx
│   ├── track/page.tsx
│   ├── signin/page.tsx       ← Customer login (Better Auth)
│   ├── signup/page.tsx       ← Customer registration
│   ├── account/
│   │   ├── page.tsx          ← Redirect → /account/profile
│   │   ├── profile/page.tsx  ← Session-gated: profile + recent orders
│   │   └── orders/page.tsx   ← Session-gated: full order history
│   │
│   ├── admin/
│   │   ├── layout.tsx        ← Sidebar nav (13 links)
│   │   ├── login/page.tsx
│   │   ├── dashboard/page.tsx  ← 5 stat cards + chart + top products
│   │   ├── products/page.tsx
│   │   ├── orders/page.tsx
│   │   ├── reviews/page.tsx
│   │   ├── categories/page.tsx ← Full CRUD (add/edit/delete/toggle)
│   │   ├── shipping/page.tsx
│   │   ├── discounts/page.tsx
│   │   ├── banners/page.tsx
│   │   ├── flash-deals/page.tsx ← New: flash management UI
│   │   ├── customers/page.tsx   ← New: registered customers table
│   │   ├── admins/page.tsx
│   │   ├── settings/page.tsx
│   │   ├── guide/page.tsx
│   │   └── guide/print/page.tsx
│   │
│   └── api/
│       ├── shipping/route.ts         ← Public GET active zones
│       ├── products/route.ts
│       ├── products/[slug]/route.ts
│       ├── orders/route.ts
│       ├── orders/track/route.ts
│       ├── reviews/route.ts
│       ├── search/route.ts
│       ├── discounts/validate/route.ts
│       ├── store-config/route.ts
│       ├── announcement/route.ts
│       ├── account/
│       │   ├── orders/route.ts       ← Customer orders (session-gated)
│       │   ├── me/route.ts           ← Customer profile (id, name, phone)
│       │   ├── notifications/route.ts ← New products last 30 days
│       │   └── coupons/route.ts      ← All coupons + user usage status
│       └── admin/
│           ├── products/route.ts
│           ├── products/[id]/route.ts
│           ├── products/[id]/images/route.ts
│           ├── products/[id]/variants/route.ts
│           ├── categories/route.ts         ← New: GET + POST
│           ├── categories/[id]/route.ts    ← New: PATCH + DELETE
│           ├── orders/[id]/route.ts
│           ├── settings/route.ts           ← GET + POST
│           ├── reviews/route.ts
│           ├── reviews/[id]/route.ts
│           ├── discounts/route.ts
│           ├── discounts/[id]/route.ts
│           ├── shipping/route.ts
│           ├── shipping/[id]/route.ts
│           ├── banners/route.ts
│           ├── banners/[id]/route.ts
│           ├── customers/route.ts          ← New: GET customers list
│           ├── upload/route.ts
│           ├── admins/route.ts
│           ├── admins/[id]/route.ts
│           └── orders/export/route.ts  ← CSV download (admin-gated)
│
├── components/
│   ├── store/
│   │   ├── StoreHeader.tsx      ← Account icon added to desktop + mobile nav
│   │   ├── StoreFooter.tsx
│   │   ├── CartDrawer.tsx
│   │   ├── FloatingWA.tsx
│   │   ├── SearchOverlay.tsx
│   │   └── ...
│   └── admin/
│       ├── RevenueChart.tsx
│       ├── SettingsForm.tsx
│       ├── ExportCSVButton.tsx  ← "تصدير CSV" button in admin orders
│       └── ...
│
├── contexts/
│   └── CartContext.tsx
│
├── lib/
│   ├── db/drizzle/
│   │   ├── connection.ts
│   │   └── schema/
│   │       ├── index.ts
│   │       ├── products.ts
│   │       ├── orders.ts
│   │       ├── categories.ts
│   │       ├── customers.ts
│   │       ├── reviews.ts
│   │       ├── discounts.ts
│   │       ├── shipping.ts
│   │       ├── banners.ts
│   │       ├── settings.ts
│   │       ├── admins.ts
│   │       └── relations.ts
│   └── auth/
│       ├── client.ts     ← signIn, signUp, signOut, useSession
│       └── middleware.ts ← getSessionFromRequest(req)
│
├── utils/
│   └── auth.ts           ← Better Auth config (emailAndPassword + admin plugin)
│
└── proxy.ts              ← Next.js middleware (admin route protection)
```

---

## 12. Environment Variables

These must be set in Vercel project settings (NOT committed to git):

```
DATABASE_URL=postgresql://...supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://...supabase.com:5432/postgres
NEXT_PUBLIC_SUPABASE_URL=https://[project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
BETTER_AUTH_SECRET=[random 32+ char string]
NEXT_PUBLIC_WHATSAPP_NUMBER=+201015835455
NEXT_PUBLIC_APP_URL=https://shah-y-store.vercel.app
# Optional — add to enable Google Analytics:
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
# Required for avatar upload via Supabase Storage:
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

---

## 13. Common Admin Tasks (How-To)

### Add a new product
1. `/admin/products` → click "+ منتج جديد"
2. Fill: Arabic name, category, price, compare_at_price (optional), quality tier, description
3. Upload images (drag-and-drop; first uploaded = main image shown in product card)
4. Add variants (size/color + stock per variant) if applicable
5. Check "مميّز" if you want it in Flash Deals section
6. Set status to "نشط" → Save

### Update an existing product
1. `/admin/products` → click ✏️ on the product row
2. Edit any fields → Save
3. Changes are live immediately on the storefront

### Manage an order
1. `/admin/orders` → click the order row
2. View full details: customer info, items, shipping, coupon
3. Update status using the dropdown: pending → confirmed → shipped → delivered
4. Add notes if needed → Save

### Approve customer reviews
1. `/admin/reviews` — unapproved reviews have yellow badge "بانتظار الموافقة"
2. Click "✓ موافقة" to approve (appears on homepage)
3. Click "✕ رفض" to reject and remove

### Manage categories (Full CRUD)
1. `/admin/categories` — see all categories in a table
2. **Add**: click "+ قسم جديد" → fill name (slug auto-generated) → Confirm
3. **Edit**: click "تعديل" on any row → edit name/slug/sort_order inline → Save
4. **Toggle status**: click the نشط/مخفي badge to instantly show/hide on storefront
5. **Delete**: click "حذف" — blocked if category has products (shows product count in error)

### Manage Flash Deals
1. `/admin/flash-deals` → see all active products
2. **Toggle product in flash**: click the toggle switch in the "مميّز (فلاش)" column
3. **Set original price**: click the compare_at_price value (or —) and type the original price → Enter
4. **Flash settings**: fill in the settings panel at the top (title, end date, active toggle) → "حفظ الإعدادات"
5. Filter: switch between "الفلاش فقط" and "كل المنتجات النشطة" views

### Run a flash sale (quick steps)
1. `/admin/flash-deals` → enable "تفعيل القسم على الموقع" + set end date → Save
2. Toggle is_featured ON for each flash product
3. Set compare_at_price > price for each product
4. Flash section appears automatically on homepage with countdown

### Create a coupon code
1. `/admin/discounts` → "+ كود جديد"
2. Code name (UPPERCASE), type (percent/fixed), value, minimum order
3. Save → share code with customers via WhatsApp/Instagram

### Update shipping prices
1. `/admin/shipping` → click ✏️ on any zone
2. Change the price → Save
3. Checkout page fetches live from DB — customers see the new price immediately

### Change store WhatsApp number
1. `/admin/settings` → update "رقم واتساب الطلبات"
2. ALSO update `NEXT_PUBLIC_WHATSAPP_NUMBER` in Vercel Environment Variables
3. Redeploy (Vercel dashboard → Deployments → Redeploy)

### Add a new admin user
1. `/admin/admins` → "+ أدمن جديد"
2. Enter: name, email, password
3. They can log in immediately at `/admin/login`

### View registered customers
1. `/admin/customers` — table showing all registered customers
2. Shows: name, phone, email, order count, join date
3. Order count = count of orders in DB matching customer's phone number

---

## 14. Known Limitations

| Limitation | Status | Workaround |
|---|---|---|
| No online payment | Active | COD — physical payment at delivery |
| No automated notifications | Active | Store owner gets WhatsApp message; manual follow-up |
| No stock reservation | Active | Stock can go negative if not monitored |
| WhatsApp checkout fallback | Active | If customer closes WA without sending, order still saved in DB as pending |
| No multi-language | Active | Arabic only |
| Orders not auto-linked to accounts | Active | Orders matched by phone — customer must use same phone as registered |
| No email verification / password reset | Active | Needs SMTP config (`SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` in env) |
| Checkout not pre-filled from account | Active | Could be added: read session → prefill name/phone from customer record |

---

## 15. Development Roadmap — What's Left

### ✅ Completed (Phases 1–4)
- Full storefront (home, product detail, cart, checkout, wishlist, track, sale, FAQ)
- Admin panel: products, orders (+ CSV export), reviews, categories (CRUD), shipping, discounts, banners, settings, admins, guide (13 sections)
- Flash Deals dedicated admin page
- Customers admin table
- Customer accounts: `/signin`, `/signup`, `/account/profile` (world-class 5-tab dashboard), `/account/orders`
- **Profile editing**: name, phone, social links (Instagram/Facebook/TikTok)
- **Avatar upload**: Supabase Storage `avatars` bucket via `POST /api/account/avatar`
- Checkout pre-fill from session + customer record
- Order-to-account auto-link (`customer_id` in orders)
- GA4 wired (needs `NEXT_PUBLIC_GA_ID` env var)
- SEO: JSON-LD structured data, robots meta, expanded keywords
- Admin guide: 13 sections incl. ads guide + AI image prompt section
- AI image prompt file at `/ai-image-prompt.md`
- Handover document at `/admin/guide/handover`
- Realistic product reviews seeded (30 reviews across 10 products)
- Shipping live from DB (not hardcoded); sitemap cleaned

### 🔄 Pending (user actions, no code needed)
- **GA4**: Add `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX` to Vercel env vars
- **Meta Pixel**: Add via Facebook Events Manager for ad conversion tracking
- **Avatar storage bucket**: Create `avatars` bucket in Supabase Storage (public read) + add `SUPABASE_SERVICE_ROLE_KEY` to Vercel env
- **Email/SMS notifications**: Requires SMTP setup (optional)
- **Online payment**: Paymob or Fawry (requires merchant account)
- **Transfer ownership**: Vercel + Supabase + GitHub → client account

### ⚠️ Manual steps not yet done (user hasn't done these)
- No SMTP configured → password reset not working
- No registered customers yet (feature is ready, awaiting real users)
- No products marked as flash deals yet (admin needs to set is_featured + compare_at_price)

---

## 16. Contact & Support

| Role | Name | Contact |
|---|---|---|
| Store Owner | (متجر شاهي) | WhatsApp: +201015835455 |
| Developer | Ahmed Darhous (درهوس) | WhatsApp: +201030002331 |
| Developer Instagram | @darhous | instagram.com/darhous |
| Developer LinkedIn | Ahmed Darhous | linkedin.com/in/darhous |

---

*Document version: 2.0 — Updated June 2026*
*ShahY Store v1.5.2 | Framework: Next.js 16 | Database: Supabase PostgreSQL*
*Commits: a30469e (v1.5.1) → a71f23b (Phase 1-3) → ae9d04c (bug fixes)*
