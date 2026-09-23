# Royan Store

**Royan** (رویان) is a Persian RTL e-commerce front-end for bedding and sleep products — duvet covers, sheets, pillows, mattresses, and blankets — from Iranian and foreign brands. Royan is the only seller and supplier.

It delivers a Digikala-inspired shopping experience with a white canvas and pastel blue accents, mock catalog data (no backend), and a modular architecture that is easy to extend toward a real API.

> **Tagline:** خواب آرام، از رویان — *Restful sleep, from Royan.*

---

## Features

| Area | What you get |
|------|----------------|
| **Home** | Hero slider, category grid, amazing offers with live countdown, best-sellers & new arrivals |
| **PLP** | URL-synced filters (category, brand, price, color, size, rating, stock, deals), sort, active chips, mobile filter drawer, **grid / list** product views |
| **Search** | Instant suggestions, recent searches, popular queries, “view all” → PLP |
| **PDP** | Gallery, buy box, sticky mobile CTA, specs, rich description, reviews, Q&A, related products |
| **Cart & wishlist** | Zustand + `localStorage` persistence |
| **Content pages** | About, contact (form + toast), FAQ accordion, shipping, terms, privacy |
| **UX** | RTL layout, Vazirmatn, Sonner toasts, bottom nav (mobile), category dropdown (desktop) |

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| UI | [React 19](https://react.dev) |
| Language | TypeScript |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| State | [Zustand](https://zustand-demo.pmnd.rs) (+ persist) |
| Carousels | [Swiper](https://swiperjs.com) |
| Toasts | [Sonner](https://sonner.emilkowal.ski) |
| Icons | [Lucide React](https://lucide.dev) |
| Font | Vazirmatn (Google Fonts) |

**No backend** — catalog and content live in local modules under `data/` and `lib/`.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  app/                    Routes (RSC pages + metadata)      │
├─────────────────────────────────────────────────────────────┤
│  components/             Feature UI (home, plp, pdp, …)     │
│    ui/                   Shared primitives (Button, Price…) │
│    layout/               Header, nav, footer, bottom bar    │
├─────────────────────────────────────────────────────────────┤
│  lib/                    Domain logic (filters, search, PDP)│
│  stores/                 Client state (cart, wishlist, UI)  │
│  data/                   Mock catalog + static content      │
│  types/                  Shared TypeScript models           │
└─────────────────────────────────────────────────────────────┘
```

### Design principles

1. **Route → composition** — Pages in `app/` stay thin; they load data and render feature views.
2. **Catalog repository** — `lib/catalog.ts` is the single access point for products, categories, facets, and PDP enrichment. Swap this for an API client later without rewriting UI.
3. **URL as PLP state** — Filters and sort are encoded in the query string (`lib/plp/filters.ts`), so links are shareable and back/forward work.
4. **Client islands** — Interactive pieces (`"use client"`) are isolated: cart, filters, search, menus, timers. Server Components remain the default where possible.
5. **Hydration-safe stores** — Persist stores use `useHasMounted` so SSR markup matches the first client paint (wishlist hearts, cart badges).

### Data flow (PLP)

```
URL searchParams
      │
      ▼
parsePlpSearchParams()  ──►  PlpFilters
      │
      ▼
applyPlpFilters(products, filters)
      │
      ▼
ProductsListing  ──►  FilterSidebar / chips / ProductGrid
      │
      └── commit() ──►  router.push(?query)  (scroll preserved)
```

### Cart & wishlist

- `stores/cart-store.ts` — line items (product, color, size, qty)
- `stores/wishlist-store.ts` — product IDs  
Both use Zustand `persist` → `localStorage` (`royan-cart` / `royan-wishlist`).

---

## Project structure

```text
royan-store/
├── app/                      # App Router pages
│   ├── page.tsx              # Home
│   ├── products/             # PLP + PDP [slug]
│   ├── cart/ wishlist/ categories/
│   ├── about/ contact/ faq/ shipping/ terms/ privacy/
│   ├── layout.tsx            # Shell: header, main, footer, toaster
│   └── globals.css           # Design tokens + brand theme
├── components/
│   ├── brand/                # Logo, home link
│   ├── content/              # Shared content page chrome, FAQ, contact form
│   ├── home/ plp/ pdp/       # Feature modules
│   ├── layout/ search/ cart/ product/
│   └── ui/                   # Design system primitives
├── data/
│   ├── products.ts           # Mock catalog
│   └── site-content.ts       # FAQ, terms, contact copy
├── lib/
│   ├── catalog.ts            # Repository facade
│   ├── plp/filters.ts        # Filter parse / apply / facets
│   ├── pdp/enrich.ts         # Reviews, Q&A, seller mock data
│   ├── search/suggest.ts
│   ├── hooks/
│   └── utils/
├── stores/                   # Zustand stores
├── types/                    # Product, filters, reviews, …
└── public/brand/             # Logo & favicon assets
```

---

## Routes

| Path | Description |
|------|-------------|
| `/` | Home |
| `/products` | Product listing (filters via query) |
| `/products/[slug]` | Product detail |
| `/categories` | Category index |
| `/cart` | Shopping cart |
| `/wishlist` | Wishlist |
| `/about` `/contact` `/faq` | Brand & support |
| `/shipping` `/terms` `/privacy` | Policies |

**Useful PLP query examples**

```text
/products?category=duvet-cover
/products?amazing=1
/products?search=ملحفه&sort=cheapest
/products?brand=متین&inStock=1
```

---

## Getting started

### Prerequisites

- Node.js 20+ (recommended)
- npm (or pnpm / yarn / bun)

### Install & run

```bash
git clone https://github.com/30YA/falomo-store.git
cd falomo-store
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Serve production build |
| `npm run lint` | ESLint |

---

## Brand & UI

| Token | Role |
|-------|------|
| `--background` `#e8f4fa` | Soft pastel page canvas |
| `--color-brand` `#2a74a8` | Sky blue for buttons and links |
| `--color-brand-soft` `#eaf6fc` | Pastel blue highlights |
| `--color-pastel` `#d7eefb` | Soft blue washes |
| `--color-pastel-deep` `#b7dff3` | Logo tile |
| `--color-ink` / `--color-ink-muted` | Text hierarchy |
| `--header-offset` | Sticky offset (measured from header) |
| `--bottom-nav-height` | Mobile bottom bar spacing |

- Direction: **`dir="rtl"`** / `lang="fa"`
- Assets: `app/icon.svg`, `app/apple-icon.tsx`, `public/brand/mark.svg`

---

## Extending the project

### Point catalog at a real API

Replace implementations inside `lib/catalog.ts` (and optionally `lib/pdp/enrich.ts`) while keeping return types from `types/`. UI and stores can stay unchanged.

### Add a filter

1. Extend `PlpFilters` + parse/serialize in `lib/plp/filters.ts`
2. Expose UI in `components/plp/filter-sidebar.tsx` (and mobile drawer)
3. Facets already flow from `catalogRepository.getFacets()`

### Add a page

1. Create `app/<route>/page.tsx` with metadata  
2. Reuse `ContentPage` for static/info pages  
3. Link from `footer` / `desktop-nav` / `mobile-menu`

---

## Notes for contributors

- Prefer **Server Components**; add `"use client"` only when you need state, effects, or browser APIs.
- Keep Persian copy consistent with existing tone (clear, retail, respectful).
- Avoid hydration mismatches: don’t render persisted store values until after mount (`useHasMounted`).
- This repo may include Next.js agent guidance in `AGENTS.md` — follow local docs under `node_modules/next/dist/docs/` when APIs differ from older Next versions.

---

## License

Private / educational project — update this section if you publish under an open-source license.

---

<p align="center">
  <strong>Royan</strong> · Bedding commerce, built with Next.js
  <br />
  <sub>Made for learning, designed for extension</sub>
</p>
