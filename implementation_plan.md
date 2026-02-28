# GamerForge Transformation Plan: Phase 2 - Functional Platform & Lifestyle Brand

## Vision
Bridge the gap between "buying a product" and "visiting a destination" using a "Split-Funnel" design.

## Roadmap

### Phase 1: The Core Architecture (Refinement)
- [x] **Landing Page (Gateway)**: `Home.tsx` (Exists, needs "Featured Loadout")
- [x] **The Play Zone (Service Hub)**: `Arcade.tsx` (Exists, needs Booking System & Add-ons)
- [x] **The Armory (E-commerce Hub)**: `Shop.tsx` (Exists, needs "Tested in Theatre" badge)
- [ ] **The HQ (Brand/Personal)**: Create `src/pages/TheHQ.tsx` (Founder's Story, Location, Stream)

### Phase 2: Detailed Page Blueprints Implementation

#### 1. The Landing Page (`Home.tsx`)
- [ ] **Featured Loadout**: Add a section showcasing "Product of the Week" used by a pro.
- [ ] **Visual Polish**: Ensure "Cyberpunk/Neon" aesthetic (Deep Blacks, Electric Blue, Acid Green).

#### 2. The Booking System (`Arcade.tsx`)
- [ ] **Station Selection**: Visual list/map of rigs (PC Rig, PS5 Booth, VR Room).
- [ ] **Time-Slot Picker**: UI component for selecting time slots.
- [ ] **Add-ons**: Toggle for "Pre-order Snacks/Drinks".

#### 3. The E-commerce Section (`Shop.tsx`)
- [ ] **"Tested in Theatre" Badge**: Add visual tag to `ProductCard`.
- [ ] **Fulfillment Options**: Add "Ship to Home" vs "Pick up & Play" toggle in Cart.

#### 4. The HQ (`TheHQ.tsx`)
- [ ] **Founder's Story**: "The Owner's Log" blog section.
- [ ] **Live Stream**: Twitch/YouTube embed placeholder.
- [ ] **Location/Contact**: Map and address details.

### Phase 3: Technical & Design
- [ ] **Glitch Effects**: Add CSS for hover states.
- [ ] **Navigation**: Update Header to include "The HQ".

## Execution Order
1.  Create `TheHQ.tsx`.
2.  Update `Header.tsx` and `App.tsx` routing.
3.  Enhance `Arcade.tsx` with Booking UI.
4.  Enhance `Shop.tsx` / `ProductCard.tsx` with Badges.
5.  Enhance `Home.tsx` with "Featured Loadout".
