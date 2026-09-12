# SmartCraft Furnishing Solutions

A working prototype furniture storefront (beds, almirahs, dressing tables) built in React + Vite,
with category browsing, search, filtering, product detail pages, and a working cart → checkout flow.

## Run it locally

You need [Node.js](https://nodejs.org) 18+ installed.

```bash
cd smartcraft
npm install
npm run dev
```

This opens the site at `http://localhost:5173`. Edit any file and it hot-reloads instantly.

## Build for production / hosting

```bash
npm run build
```

This produces a static `dist/` folder. Deploy it for free on any of these:

- **Vercel**: `npx vercel` in the project folder (or connect the GitHub repo in the Vercel dashboard, it auto-detects Vite).
- **Netlify**: drag-and-drop the `dist/` folder at app.netlify.com/drop, or connect the repo (build command `npm run build`, publish directory `dist`).
- **GitHub Pages**: push `dist/` to a `gh-pages` branch, or use the `gh-pages` npm package.

No backend or database is required for this prototype — it's a fully static site.

## What's in here

```
src/
  data/products.js       — the entire catalog (name, price, stock, specs). Edit this to add/change products.
  components/FurnitureIcon.jsx — hand-drawn SVG icons per category, no external images needed
  CartContext.jsx         — cart state (add/remove/qty), persisted to localStorage
  App.jsx                 — every page: Home, Catalog, Product detail, Cart drawer, Checkout, Confirmation
  index.css                — the whole design system (colors, type, layout)
```

There's no router library — navigation is a simple `route` state object in `App.jsx` (`{ page, ...params }`).
That's a deliberate simplification for a prototype; see "what to extend" below.

## What I'd extend first

1. **Real backend + database.** Right now `products.js` is a hardcoded array and checkout is
   simulated with a `setTimeout`. Swap in a proper store (Postgres/Supabase/Firebase) with an API layer,
   so stock levels and orders are real and persist server-side, not just in the browser's localStorage.
2. **Real payments.** The checkout form is wired to look and feel complete but doesn't move money.
   Add Razorpay or Stripe Checkout at the "Place order" button in `App.jsx`'s `Checkout` component.
3. **Real product photography.** The SVG icons are a deliberate placeholder so the prototype never
   depends on external image hosting. Replace `FurnitureIcon` usage with an `<img>` pointing at real
   product photos (and add a simple image gallery/zoom on the product detail page).
4. **Proper routing + shareable URLs.** Add `react-router-dom` so `/product/bed-oakridge-queen` is a
   real URL you can share or bookmark, rather than in-memory state that resets on refresh.
5. **Accounts & order history.** Let users log in (email/OTP or Google) and see past orders — needed
   before this could be a real store like Sleepwell or Amazon.
6. **Reviews from real customers** instead of the static rating/review-count numbers in the catalog.
