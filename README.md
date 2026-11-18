# LUXERA Fine Fragrance House — Frontend Boutique

A digital haute parfumerie storefront and administrative portal engineered for **LUXERA**, Sri Lanka's premier authentic luxury fragrance house. Built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS v4**, delivering fluid animations, mobile-first luxury responsiveness, and real-time boutique management.

---

## Visual Design & Brand Philosophy

LUXERA is crafted with an editorial dark luxury aesthetic:
- **Atmospheric Palette**: Deep obsidian (`#060609`), dark charcoal (`#0c0c11`), and warm regal gold accents (`#d4af37`, `#e2c785`).
- **Typography**: Editorial serif headings paired with clean, tracked monospace and sans-serif microcopy.
- **Micro-Interactions**: Smooth glassmorphism, GPU-accelerated video staging, ambient glow badges, and subtle border glints.

---

## Core Features

### 1. Haute Parfumerie Boutique Experience
- **Frameless 3D Hero Staging**: Seamless, borderless loop video showcase with hardware-accelerated GPU rendering (`transform-gpu`) and instant autoplay fallback handling.
- **Symmetrical 2x2 Trust Grid**: Mobile-optimized hallmarks featuring 100% Authenticity, Island-Wide Delivery, Cash on Delivery, and 14h+ Longevity / Beast Projection testing.
- **Interactive Scent Quiz**: Dynamic recommendation engine that matches user preferences with signature flacons based on occasion, weather, and olfactory family.
- **Curated Fragrance Collection**: Filter fragrances by scent profile (*Woody, Floral, Oriental, Fresh, Citrus*), search in real-time, and view straight LKR pricing.
- **Detailed Perfume Quick View**: Modal dossier displaying olfactory pyramid (Top, Heart, and Base notes), longevity ratings, sillage gauge, and customer reviews.
- **WhatsApp Concierge**: Direct, pre-filled WhatsApp customer care messaging optimized for Sri Lankan buyers.

### 2. Streamlined E-Commerce & Checkout Flow
- **Interactive Slide-Out Cart**: Real-time quantity adjustments, volume flacon indicators, and subtotal calculation.
- **One-Page Cash on Delivery Checkout**:
  - Sri Lankan district selector with auto-filled delivery timeline (1–3 business days).
  - Validation for phone numbers and delivery addresses.
  - Automatic order creation with status `Pending`.
  - Automated confirmation email dispatched to the user's registered inbox.
- **Authentication Guard**: Unauthenticated guests attempting to add items to their cart are redirected to Sign In / Sign Up, preserving cart intent upon login.

### 3. Integrated Admin Dashboard
- **Executive Overview**: Total revenue calculation in LKR, active pending orders counter, registered client tallies, and top-performing perfumes.
- **Product Management**: Add new fragrances with multi-note pyramid definitions, update pricing, adjust stock levels, or remove listings.
- **Cloud Media Uploads**: Direct image uploads to **Supabase Storage** with instant URL generation and cache busting.
- **Order Fulfillment Pipeline**: View full customer shipping manifests, inspect ordered bottles, and transition statuses (`Pending` ➔ `Processing` ➔ `Delivered` ➔ `Cancelled`).
- **User Directory**: View registered clients, modify user information and role assignments (`CLIENT` ➔ `ADMIN`), or remove accounts.

---

## Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Latest concurrent UI library |
| **Vite 8** | Next-generation ultra-fast frontend build tool and dev server |
| **TypeScript** | Strict type definitions across models, props, and API layers |
| **Tailwind CSS v4** | Modern utility-first CSS engine with `@tailwindcss/vite` |
| **Lucide React** | Consistent, lightweight luxury iconography |
| **Axios** | Promised-based HTTP client with authorization interceptors |
| **Supabase JS** | Cloud storage client for perfume flacon photography |
| **React Hot Toast** | Minimalist notification toasts for cart and admin actions |

---

## Directory Structure

```
luxera-perfume-store/
├── src/
│   ├── assets/                      # High-resolution artwork & stage video
│   │   ├── luxera-luxury-auth-bg.jpg
│   │   ├── luxera.png
│   │   └── perfume_hero_stage_1x1.mp4
│   ├── context/
│   │   ├── authContext.tsx          # User session, JWT storage & roles
│   │   └── cartContext.tsx          # Cart state, item storage & drawer visibility
│   ├── pages/
│   │   ├── admin/                   # Full administrative dashboard suite
│   │   │   ├── AddProductModal.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── AdminHeader.tsx
│   │   │   ├── AdminSiderbar.tsx
│   │   │   ├── BestSellingPerfumes.tsx
│   │   │   ├── ClientTable.tsx
│   │   │   ├── EditUserModal.tsx
│   │   │   ├── OrderDetailModal.tsx
│   │   │   ├── OrderTable.tsx
│   │   │   ├── OverviewTab.tsx
│   │   │   ├── ProductTable.tsx
│   │   │   └── RegisterUserModal.tsx
│   │   ├── auth/                    # Client login, registration & profile
│   │   │   ├── AuthHeader.tsx
│   │   │   ├── AuthPage.tsx
│   │   │   ├── SignInForm.tsx
│   │   │   ├── SignUpForm.tsx
│   │   │   └── UserProfileCard.tsx
│   │   ├── cart/                    # Cart drawer & checkout flow
│   │   │   ├── CartHeader.tsx
│   │   │   ├── CartItemList.tsx
│   │   │   ├── CartPage.tsx
│   │   │   ├── CheckoutModal.tsx
│   │   │   ├── OrderSuccess.tsx
│   │   │   └── OrderSummary.tsx
│   │   └── landing/                 # Public boutique storefront
│   │       ├── CollectionSection.tsx
│   │       ├── ContactSection.tsx
│   │       ├── Footer.tsx
│   │       ├── HeroSection.tsx
│   │       ├── LandingPage.tsx
│   │       ├── Navbar.tsx
│   │       ├── NotesShowcase.tsx
│   │       ├── PhilosophySection.tsx
│   │       ├── ProductCard.tsx
│   │       ├── QuickViewModal.tsx
│   │       ├── ReviewsSection.tsx
│   │       ├── ScentQuizModal.tsx
│   │       ├── SearchModal.tsx
│   │       └── WhyUsSection.tsx
│   ├── service/                     # API communication clients
│   │   ├── api.ts                   # Base Axios instance with auth headers
│   │   ├── auth.ts                  # Auth API calls
│   │   ├── order.ts                 # Order API calls
│   │   ├── product.ts               # Product catalog API calls
│   │   ├── review.ts                # Review API calls
│   │   └── supabase.ts              # Supabase storage configuration
│   ├── utils/
│   │   └── mediaUpload.ts           # Storage bucket upload helper
│   ├── App.tsx                      # Root application layout & routing
│   └── main.tsx                     # React DOM entry point
├── public/                          # Static public assets
├── index.html                       # HTML template with luxury metadata
├── package.json                     # Frontend dependencies & scripts
├── tsconfig.json                    # TypeScript configuration
└── vite.config.ts                   # Vite bundler configuration
```

---

## Getting Started

### Prerequisites

- **Node.js** (v20+ recommended)
- **npm** (v10+)
- **Running Backend API** (default: `http://localhost:5000`)
- **Supabase Account** (for product image bucket storage)

---

### Installation

1. **Navigate to the frontend directory**:
   ```bash
   cd "RAD final frontend/luxera-perfume-store"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

---

### Environment Configuration

Create a `.env` file in the root of `luxera-perfume-store`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
VITE_SUPABASE_KEY=your-supabase-anon-public-key
```

---

### Running the Frontend

#### Development Mode:
```bash
npm run dev
```
The boutique will be accessible at `http://localhost:3000`.

#### Production Build & Verification:
```bash
npm run build
npm run preview
```

#### Code Quality & Type Check:
```bash
npx tsc --noEmit
npm run lint
```

---

## Key User Roles & Navigation

- **Guest**: Can browse catalog, search, take the Scent Quiz, read olfactory pyramids, and inspect reviews. Adding to cart prompts authentication.
- **Client**: Can add fragrances to cart, place cash-on-delivery orders, receive email confirmations, and track order history.
- **Admin**: Has access to the discreet floating **Admin Panel** toggle button to manage inventory, update order statuses, and oversee users.

---

## License

Crafted for **LUXERA Fine Fragrance House**. All rights reserved.
