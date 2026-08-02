# Luxora — Production-Ready Luxury E-Commerce Platform

**Luxora** is an ultra-premium e-commerce platform built with a dark-first luxury aesthetic inspired by Apple, Bang & Olufsen, Aesop, Tesla, and Nothing.

The platform consists of a **React 19 + TanStack Start & Router** frontend (`premier-commerce-hub`) and a **Laravel REST API + Sanctum** backend (`backend`).

---

## Technical Stack Architecture

### Frontend (`premier-commerce-hub`)
- **Core Library**: React 19, TypeScript
- **Routing & Framework**: TanStack Start, TanStack Router (File-based routing)
- **Styling & UI**: Tailwind CSS v4, Radix UI Primitives, shadcn/ui
- **State & Data Fetching**: TanStack React Query, React Context API
- **Animation System**: Framer Motion (Variants, Layout Animations, AnimatePresence)
- **Icons & Notifications**: Lucide React, Sonner
- **Charts & Data Visualization**: Recharts

### Backend (`backend`)
- **Framework**: Laravel Latest (PHP 8.2+)
- **Authentication**: Laravel Sanctum (Token & Stateful Session Auth)
- **Database & ORM**: MySQL, Eloquent ORM
- **API Architecture**: Versioned REST API (`/api/v1/*`)
- **Transactions & Concurrency**: Atomic Database Transactions (`DB::transaction`), Stock Decrementing

---

## Key Features

### 🛍️ Public Shopping Experience
- **Interactive Sticky Header**: Glassmorphism backdrop blur with responsive mega-menu and instant search trigger.
- **Apple Spotlight Live Search**: Keyboard navigation (`↑`, `↓`, `Enter`), query text highlighting, and recent search history.
- **Global Keyboard Shortcuts (`Shift+Alt+Z`)**: Quick hotkeys for search (`Alt+/`), cart (`Shift+Alt+C`), home (`Shift+Alt+H`), orders (`Shift+Alt+O`).
- **Padded Product Image Framing**: Product card images sit in an inset rounded container—images never touch card borders.
- **Quick View Modal**: Dialog modal with thumbnail gallery switcher, color picker, and 1-click express checkout trigger.
- **Slide-Over Drawers**: Cart drawer & saved wishlist drawer accessible from any page with free shipping progress metering.

### 📱 Product Details & Catalog
- **Hover Image Magnifier**: Hover lens zoom for examining high-resolution product photos.
- **Frequently Bought Together**: Bundle recommendation widget with 1-click bundle add-to-cart & 10% discount calculation.
- **Sticky Purchase Bar**: Floating purchase bar on scroll past fold.
- **Smart Catalog Filtering**: Filter by category, brand, price slider, in-stock toggle, and instant multi-attribute sorting.

### 🔒 User & Admin Portals
- **Customer Account Management**: Personal info settings, saved address book, security password updates, notification switches.
- **Order History & Live Tracking**: Orders timeline tracker and receipt view.
- **Admin Management Console**: Interactive Recharts graphs for monthly revenue trajectory, category sales distribution, bulk product selection, CSV export, and live activity audit feed.

---

## Getting Started & Installation Guide

### Prerequisites
- Node.js 18.x or 20.x
- PHP 8.2 or higher
- Composer
- MySQL Database

---

### 1. Backend Setup (`backend/`)

```bash
# Navigate to the backend directory
cd d:\Projects\Luxara\backend

# Install PHP dependencies
composer install

# Create environment configuration file
cp .env.example .env

# Generate Laravel application key
php artisan key:generate

# Configure your MySQL credentials in .env:
# DB_DATABASE=luxora_db
# DB_USERNAME=root
# DB_PASSWORD=your_password

# Run database migrations and seed the catalog
php artisan migrate --seed

# Start the Laravel REST API server
php artisan serve --port=8000
```

The Laravel REST API will be running at `http://localhost:8000/api/v1`.

---

### 2. Frontend Setup (`premier-commerce-hub/`)

```bash
# Navigate to the frontend directory
cd d:\Projects\Luxara\premier-commerce-hub

# Install Node dependencies
npm install

# Start the Vite development server
npm run dev
```

The frontend will be available at `http://localhost:5173`.

---

## Environment Variables Reference

### Frontend (`premier-commerce-hub/.env`)
```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

### Backend (`backend/.env`)
```env
APP_NAME=Luxora
APP_ENV=local
APP_KEY=base64:YourAppKeyHere
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=luxora_db
DB_USERNAME=root
DB_PASSWORD=

SANCTUM_STATEFUL_DOMAINS="localhost:3000,localhost:5173,127.0.0.1:5173"
FRONTEND_URL="http://localhost:5173"
```

---

## REST API Endpoint Reference

| HTTP Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/v1/auth/register` | Register new customer account | No |
| `POST` | `/api/v1/auth/login` | Login & issue Sanctum Bearer token | No |
| `GET` | `/api/v1/products` | Paginated catalog listing with search/filter/sort | No |
| `GET` | `/api/v1/products/{slug}` | Product detail by slug or ID | No |
| `GET` | `/api/v1/categories` | Categories list | No |
| `GET` | `/api/v1/brands` | Authorized brand partners | No |
| `GET` | `/api/v1/cart` | Get authenticated user cart items | Yes (Sanctum) |
| `POST` | `/api/v1/cart/items` | Add product to cart | Yes (Sanctum) |
| `POST` | `/api/v1/orders` | Place order & decrement inventory | Yes (Sanctum) |
| `GET` | `/api/v1/orders` | Customer order history | Yes (Sanctum) |
| `GET` | `/api/v1/admin/analytics` | Admin revenue stats & charts data | Yes (Admin) |

---

## Production Build & Deployment

```bash
# Build the production bundle
npm run build

# Preview the production build locally
npm run preview
```

The production output is generated in `.output/` using Nitro server bundle ready for deployment.

---

## License

All rights reserved © Luxora Inc.
