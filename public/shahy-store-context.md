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
| Auth | **Better Auth** | Admin sessions only |
| Deployment | **Vercel** | Auto-deploy from main branch |
| Image Storage | **Supabase Storage** | Bucket: `product-images` |
| Admin UI | **Tailwind CSS** | Standard utility classes |
| Storefront UI | **Inline styles** | No CSS framework — design system enforced via inline style objects |
| Fonts | Google Fonts | Tajawal, Cinzel, Playfair Display, Cormorant Garamond |

---

## 4. Architecture Overview

```
User Browser
    │
    ▼
Next.js App on Vercel
    │
    ├── /app/(store)/*       → Public storefront pages
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
| `is_featured` | boolean | If true + compare_at_price > price → appears in Flash Deals |
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

### `orders` table
| Column | Type | Notes |
|---|---|---|
| `id` | uuid (PK) | |
| `order_number` | text (unique) | Format: SHY-0001, SHY-0002, ... |
| `customer_id` | uuid (FK, nullable) | → customers.id (optional, orders can be anonymous) |
| `customer_name` | text | Full name |
| `phone` | text | Egyptian phone number |
| `governorate` | text | Egyptian governorate (محافظة) |
| `address` | text | Delivery address |
| `subtotal` | numeric | Before shipping + discounts |
| `shipping_cost` | numeric | Shipping zone price |
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

### `categories` table
| Column | Type | Notes |
|---|---|---|
| `id` | uuid (PK) | |
| `name_ar` | text | Arabic display name |
| `slug` | text (unique) | English slug |
| `sort_order` | integer | Display order in strips and filters |

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
| `name_ar` | text | Zone name in Arabic |
| `price` | numeric | Shipping cost in EGP |
| `days_min` | integer | Min delivery days |
| `days_max` | integer | Max delivery days |

**Current zones:**
- القاهرة الكبرى والجيزة — 35 EGP, 2–3 days
- الإسكندرية والمحافظات الكبرى — 45 EGP, 3–4 days
- باقي المحافظات والصعيد — 55 EGP, 4–6 days

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
| Key | Current Value | Description |
|---|---|---|
| `store_name_ar` | شاهي ستور | Store name displayed in UI |
| `whatsapp_number` | +201015835455 | Store owner's WhatsApp — used in ALL wa.me links |
| `hero_words` | شعوراً, هويتك, أناقة, ثقة, جمال, تألقي | Rotating words in homepage hero animation |
| `announcement_text` | 🚚 شحن مجاني على الطلبات فوق 500 ج | Top announcement bar text |
| `announcement_active` | true | Show/hide announcement bar |
| `flash_deals_active` | true | Show/hide flash deals section |
| `flash_deals_ends_at` | 2026-07-28T20:01 | Flash deals countdown end time |
| `flash_deals_title_ar` | عروض الفلاش 🔥 | Flash section heading |

### `customers` table
Anonymous customers created when they place an order. Contains: name, phone, governorate, address.

### `admins` table
Managed by **Better Auth**. Admin credentials stored securely. Each admin has: id, name, email, hashed password, created_at.

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
| `/api/orders` | POST | Create a new order (from cart checkout) |
| `/api/orders/track?phone={}&num={}` | GET | Track order by phone + order number |
| `/api/reviews` | GET | Approved reviews only |
| `/api/reviews` | POST | Submit a new review (goes to moderation queue) |
| `/api/discounts/validate?code={}&total={}` | GET | Validate coupon code and return discount amount |

### Protected Admin APIs (require Better Auth session)

| Endpoint | Methods | Description |
|---|---|---|
| `/api/admin/products` | GET, POST | List all products / create product |
| `/api/admin/products/[id]` | GET, PUT, DELETE | Product CRUD |
| `/api/admin/products/[id]/images` | GET, POST, DELETE | Manage product images |
| `/api/admin/products/[id]/variants` | GET, POST | Manage variants |
| `/api/admin/products/[id]/variants/[vid]` | PUT, DELETE | Update/delete variant |
| `/api/admin/orders/[id]` | GET, PUT | Order detail + status update |
| `/api/admin/settings` | GET, PUT | Read/write store settings |
| `/api/admin/reviews` | GET | All reviews including unapproved |
| `/api/admin/reviews/[id]` | PUT | Approve or reject review |
| `/api/admin/discounts` | GET, POST | List / create discount codes |
| `/api/admin/discounts/[id]` | PUT, DELETE | Update / delete discount |
| `/api/admin/shipping` | GET, POST | List / create shipping zones |
| `/api/admin/shipping/[id]` | PUT, DELETE | Update / delete zone |
| `/api/admin/banners` | GET, POST | List / upload banners |
| `/api/admin/banners/[id]` | PUT, DELETE | Update / delete banner |
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
| Wishlist | `/wishlist` | Saved products (localStorage) |
| Track Order | `/track` | Form: phone + order number → shows status |
| FAQ | `/faq` | Accordion questions and answers |
| About | `/about` | Brand story |
| Returns | `/returns` | Return/exchange policy |
| Privacy | `/privacy` | Privacy policy |

### Key Storefront Components
- `StoreNav` — top navigation bar, search, cart icon, wishlist icon (admin link hidden)
- `StoreFooter` — footer with links, social icons, designer credit, hidden admin padlock icon
- `CartDrawer` — slide-out cart panel from the right
- `FloatingWA` — floating WhatsApp button (bottom-right), fetches number from `/api/store-config`
- `AnnouncementBar` — top colored strip for announcements
- `HomeReviews` — reviews carousel (only shows approved reviews)
- `CategoriesStrip` — horizontal scrollable category pills
- `FlashDeals` — flash deals section with countdown timer

---

## 8. Admin Panel Pages

| Page | URL | Function |
|---|---|---|
| Login | `/admin/login` | Better Auth login form |
| Dashboard | `/admin/dashboard` | Stats, revenue chart, recent orders |
| Products | `/admin/products` | Full product CRUD with image upload |
| Orders | `/admin/orders` | Order list with filters + status management |
| Reviews | `/admin/reviews` | Approve/reject customer reviews |
| Categories | `/admin/categories` | Manage store categories |
| Shipping | `/admin/shipping` | Shipping zones and prices |
| Discounts | `/admin/discounts` | Coupon code management |
| Banners | `/admin/banners` | Homepage banner carousel management |
| Admins | `/admin/admins` | Admin user management |
| Settings | `/admin/settings` | Store-wide settings (WhatsApp, announcement, flash, hero words) |
| Guide | `/admin/guide` | This interactive admin guide |
| Guide PDF | `/admin/guide/print` | Printable PDF version of the guide |

**Admin access from storefront**: There is a hidden padlock icon (🔒) in the footer with opacity 6%. It becomes slightly visible on hover. Click it to go to `/admin/login`. This is intentionally invisible to regular customers.

---

## 9. Business Rules

### Ordering Process
1. Customer adds items to cart (stored in localStorage)
2. Customer applies coupon code if available (validated via `/api/discounts/validate`)
3. Customer fills out: name, phone, governorate, address
4. Customer chooses shipping zone (price added automatically)
5. Clicking "اطلب عبر واتساب" opens a pre-filled WhatsApp message to the store owner
6. The order is simultaneously saved to the database with status `pending`
7. Store owner confirms order manually by phone/WhatsApp and updates status in admin panel

### Payment
- **No online payment gateway**
- Accepted: Cash on Delivery (COD) or Instapay transfer
- Payment happens physically at delivery or via Instapay before shipping

### WhatsApp Number Rules
- **Store owner (orders)**: +201015835455 — used in all customer-facing WhatsApp links
- **Developer (technical)**: +201030002331 — shown in footer "designed by" section and admin guide support CTA
- If the store owner's number changes: update in `/admin/settings` AND update `NEXT_PUBLIC_WHATSAPP_NUMBER` in Vercel environment variables + redeploy

### Reviews
- All reviews require admin approval before appearing on the site
- Approved reviews appear in the homepage carousel, sorted by rating (highest first)

### Flash Deals
- Only products with `is_featured = true` AND `compare_at_price > price` appear in flash deals
- The countdown timer runs based on `flash_deals_ends_at` setting
- When timer reaches zero, the flash deals section automatically hides

### Coupons
- Discount is applied client-side at cart calculation
- The order saved in DB reflects the final discounted total
- The WhatsApp message shows the discounted amount

### Categories
- Categories with products cannot be deleted (foreign key RESTRICT)
- Move products to another category first, then delete

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
معلّق (pending):    Orange  #e65100
مؤكد (confirmed):   Blue    #1565c0
شُحن (shipped):     Purple  #6a1b9a
سُلّم (delivered):  Green   #27ae60
ملغي (cancelled):  Red     #c62828
```

---

## 11. Key File Structure

```
src/
├── app/
│   ├── (store)/              ← Storefront route group
│   │   ├── page.tsx          ← Home page (/)
│   │   ├── products/
│   │   │   └── [slug]/page.tsx  ← Product detail
│   │   ├── sale/page.tsx
│   │   ├── cart/page.tsx
│   │   ├── wishlist/page.tsx
│   │   ├── track/page.tsx
│   │   ├── faq/page.tsx
│   │   ├── about/page.tsx
│   │   ├── returns/page.tsx
│   │   └── privacy/page.tsx
│   │
│   ├── admin/                ← Admin panel
│   │   ├── layout.tsx        ← Sidebar nav (excludes /admin/login and /admin/guide/print)
│   │   ├── login/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── products/page.tsx
│   │   ├── orders/page.tsx
│   │   ├── reviews/page.tsx
│   │   ├── categories/page.tsx
│   │   ├── shipping/page.tsx
│   │   ├── discounts/page.tsx
│   │   ├── banners/page.tsx
│   │   ├── admins/page.tsx
│   │   ├── settings/page.tsx
│   │   ├── guide/page.tsx         ← Interactive admin guide
│   │   └── guide/print/page.tsx   ← Printable PDF guide
│   │
│   └── api/                  ← API routes (all server-side)
│       ├── admin/            ← Protected admin APIs
│       └── ...               ← Public APIs
│
├── components/
│   ├── store/                ← Storefront components
│   │   ├── StoreNav.tsx
│   │   ├── StoreFooter.tsx   ← "use client" — has hidden admin padlock
│   │   ├── CartDrawer.tsx
│   │   ├── FloatingWA.tsx
│   │   ├── AnnouncementBar.tsx
│   │   └── ...
│   └── admin/                ← Admin components
│       ├── RevenueChart.tsx
│       └── ...
│
└── lib/
    ├── db/
    │   ├── drizzle/
    │   │   ├── connection.ts    ← Drizzle DB instance
    │   │   └── schema/          ← All table definitions
    │   │       ├── products.ts
    │   │       ├── orders.ts
    │   │       ├── categories.ts
    │   │       ├── reviews.ts
    │   │       ├── discounts.ts
    │   │       ├── shipping.ts
    │   │       ├── banners.ts
    │   │       ├── settings.ts
    │   │       └── admins.ts
    │   └── supabase/           ← Supabase client (images only)
    └── auth/                   ← Better Auth configuration
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
NEXT_PUBLIC_SITE_URL=https://shah-y-store.vercel.app
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

### Run a flash sale
1. `/admin/settings` → enable "عروض الفلاش" + set "تاريخ انتهاء الفلاش"
2. `/admin/products` → for each flash product: enable "مميّز" + ensure compare_at_price > price
3. Flash section appears automatically on homepage with countdown

### Create a coupon code
1. `/admin/discounts` → "+ كود جديد"
2. Code name (UPPERCASE), type (percent/fixed), value, minimum order
3. Save → share code with customers via WhatsApp/Instagram

### Change store WhatsApp number
1. `/admin/settings` → update "رقم واتساب الطلبات"
2. ALSO update `NEXT_PUBLIC_WHATSAPP_NUMBER` in Vercel Environment Variables
3. Redeploy (Vercel dashboard → Deployments → Redeploy)
4. Inform developer to verify the change

### Add a new admin user
1. `/admin/admins` → "+ أدمن جديد"
2. Enter: name, email, password
3. They can log in immediately at `/admin/login`

---

## 14. Known Limitations

| Limitation | Workaround |
|---|---|
| No online payment | COD or Instapay transfer manually confirmed |
| No customer accounts | Orders are anonymous; tracking by phone + order number |
| No automated notifications | Store owner gets WhatsApp message; manual follow-up |
| No stock reservation | Stock can theoretically go negative if not monitored |
| WhatsApp checkout is client-side | If customer closes WA without sending, order still saved in DB as pending |
| No multi-language | Arabic only (English for labels/UI only) |

---

## 15. Suggested Future Improvements

- Instapay webhook for automatic payment confirmation
- SMS/WhatsApp notifications to customers on status changes
- Customer accounts with order history
- Google Analytics 4 integration
- Automated low-stock alerts
- Bulk product import via CSV
- Order export to Excel
- Instagram product feed sync

---

## 16. Contact & Support

| Role | Name | Contact |
|---|---|---|
| Store Owner | (متجر شاهي) | WhatsApp: +201015835455 |
| Developer | Ahmed Darhous (درهوس) | WhatsApp: +201030002331 |
| Developer Instagram | @darhous | instagram.com/darhous |
| Developer LinkedIn | Ahmed Darhous | linkedin.com/in/darhous |

---

*Document version: 1.0 — Generated June 2026*
*Project: ShahY Store v1.0 | Framework: Next.js 16 | Database: Supabase PostgreSQL*
