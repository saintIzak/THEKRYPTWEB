# THE KRYPT - Project Blueprint (Current State)

## 1. Project Overview
**THE KRYPT** (also referred to as GamerForge) is a premium, gamified e-commerce and arcade booking platform. It features a high-intensity "Tactical HUD" aesthetic, designed to immerse users in an elite gaming environment.

*   **Primary Goal**: Provide a seamless experience for booking gaming sessions and purchasing elite gaming gear.
*   **Aesthetic**: Tactical, Military-grade HUD, Dark Mode, High-contrast Red accents, Glitch effects, and Framer Motion animations.

---

## 2. Technology Stack
*   **Frontend**: React 18 (TypeScript), Vite
*   **Styling**: Tailwind CSS 4.0 (Mobile-first, Responsive)
*   **Animations**: Framer Motion (Page transitions, HUD effects, Micro-interactions)
*   **Icons**: Lucide React
*   **Backend/Auth**: Supabase (PostgreSQL, Auth, Storage)
*   **Payments**: M-Pesa Integration (Custom service)
*   **Notifications**: Sonner (Toast notifications)

---

## 3. Core Pages & Functionality

### A. Home (`/`)
*   **Hero Section**: Dynamic carousel with tactical overlays and "Acquire Gear" CTAs.
*   **Available Games**: Featured game cards with hover effects.
*   **Game Video Showcase**: Interactive section with background video switching and pop-up gameplay previews.
*   **Pro Arsenal**: Direct links to "The Vault" with tactical item identifiers.

### B. The Arena (Arcade - `/arcade`)
*   **Hero Grid**: Full-screen tactical video grid showcasing gaming stations (PS5, Xbox, VR, Sim).
*   **Mission Progress**: Sticky navigation bar tracking the booking steps (Station -> Time -> Supplies -> Deploy).
*   **Booking System**:
    *   Station selection with real-time status (Available/Occupied).
    *   Time slot selection.
    *   Tactical supplies (Add-ons like Energy Drinks/Snacks).
    *   M-Pesa payment modal integration.

### C. The Vault (Shop - `/shop`)
*   **Product Catalog**: Grid-based display of gaming gear.
*   **Category Filtering**: Sticky filter bar for quick navigation (Consoles, VR, Audio, etc.).
*   **Search**: Integrated search in the header for "The Vault".
*   **Product Modals**: Detailed views with specs and "Add to Loadout" functionality.

### D. Command Rank (Leaderboard - `/leaderboard`)
*   **Rankings**: Top tactical operators displayed with XP scores and star ratings.
*   **User Table**: Detailed list of rankings with sector information.

### E. Quest Log (Loyalty - `/quest-log`)
*   **Operator Progression**: XP-based leveling system (Recruit -> Elite -> Legendary).
*   **Daily Objectives**: Active quests that users can complete for XP rewards.
*   **Stats HUD**: Visual representation of current level and XP progress.

### F. The HQ (`/hq`)
*   **Commander's Log**: Blog/News section for community updates and hardware unboxings.
*   **Live Feed**: Placeholder for Twitch/Streaming integration.
*   **Comms Center**: Contact information and social media links.

---

## 4. Key Components & UI System

### Layout Components
*   **Header**: Sticky navigation with Auth status, Cart count, and "The Vault" search.
*   **Footer**: Tactical HUD footer with newsletter signup and system status indicators.
*   **PageTransition**: Smooth motion-based transitions between all routes.

### Specialized UI
*   **GamifiedSection**: Wrapper component providing HUD brackets, scanline effects, and entry animations.
*   **Cart**: Slide-out "Vault" sheet for managing selected gear and initializing checkout.
*   **MpesaPaymentModal**: Custom payment flow for Kenyan Shillings (KSh) transactions.
*   **MapPicker**: Google Maps integration for selecting deployment (delivery) locations.

---

## 5. Design Tokens
*   **Colors**:
    *   `Background`: `#000000` (Black) / `Zinc-950`
    *   `Accent`: `#DC2626` (Red-600)
    *   `Secondary`: `Zinc-800/900`
*   **Typography**:
    *   Headings: `font-black italic uppercase tracking-tighter`
    *   Sub-labels: `text-[8px] font-bold tracking-[0.3em] uppercase`
*   **Shapes**: Heavy use of `clip-path` for angled corners and "hexagonal" tactical containers.

---

## 6. Current Status
*   **Responsiveness**: Fully optimized for mobile-first (Edge-to-Edge fit).
*   **Performance**: Lazy loading implemented for all main pages.
*   **Backend**: Supabase connection established for Auth and data fetching.
*   **UI/UX**: Premium tactical aesthetic applied consistently across all components.
