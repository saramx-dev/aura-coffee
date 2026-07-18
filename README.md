# Aura Coffee — Waitlist Landing Page

A single-page, conversion-focused landing page built for Aura Coffee, a seasonal small-batch Colombian blend. The page captures waitlist signups for a limited seasonal release and pipes subscribers directly into a Klaviyo email flow.

**Live demo:**

---

## Overview

This project was built end-to-end using a content-first, design-system-driven workflow — from goal definition and copywriting, through wireframing and Figma design tokens, to a semantic, accessible, performance-optimized production build.

**Primary goal:** Convert visitors into waitlist subscribers for early access to a limited seasonal coffee release.

---

## Features

- 🎯 Single, focused conversion path — one clear CTA, no competing actions
- 📧 Email capture form with real-time client-side validation
- 🔗 Live integration with Klaviyo (subscription API, list-based flow)
- ✨ Scroll-reveal animations via `IntersectionObserver`, with full `prefers-reduced-motion` support
- 📌 Sticky navigation header
- 🖼️ Fully optimized images — AVIF/WebP with JPG fallback, all under 100KB
- ♿ Accessible by design — semantic HTML, ARIA labeling, visible focus states, WCAG 2.2 AA color contrast
- 📱 Responsive across mobile and desktop breakpoints
- ⚡ Zero layout shift (CLS: 0) — explicit image dimensions throughout

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | Semantic HTML5 |
| Styling | Tailwind CSS v4 (CSS-native `@theme` tokens) |
| Interactivity | Vanilla JavaScript (ES6+) |
| Email Marketing | Klaviyo (Subscriptions API) |
| Design | Figma (design tokens, component states) |
| Image Optimization | Squoosh (AVIF / WebP / JPG) |

---

## Design System

Built on a two-layer token architecture — primitive values (raw colors, spacing, type sizes) referenced by semantic tokens (purpose-based names like `color-brand-cta`, `spacing-section-py`). This keeps the codebase consistent and makes global design changes a one-line update.

- **Typography:** Fraunces (display/headings) + DM Sans (body/UI)
- **Color system:** 60/30/10 rule — neutral foundation, structural brand color, accent CTA color
- **Spacing:** 8pt grid system throughout
- **Breakpoint:** Single `lg:` (1024px) snap point — mobile-first

---

## Project Structure

```
├── index.html          # Main page markup
├── src/input.css           # Tailwind source — design tokens + component styles
├── form.js             # Email capture: validation, Klaviyo API integration
├── animations.js        # Scroll-reveal IntersectionObserver logic
├── images/             # Optimized AVIF / WebP / JPG assets
└── README.md
```

---

## Key Implementation Details

**Form handling** — Centralized UI state engine (`updateUIState`) drives all form feedback (error, success, clear states). Submission uses `Promise.all` with an artificial delay floor for consistent perceived performance, regardless of network speed.

**Animations** — A single `IntersectionObserver` watches all `[data-animate]` elements. On intersection, JavaScript adds an `.is-visible` class; CSS transitions handle the actual motion. JavaScript never touches animation properties directly — it only toggles state. Elements are unobserved after animating in to avoid unnecessary work.

**Accessibility** — Skip-navigation link, `aria-labelledby` on every section, `aria-describedby` and `role="alert"` on form errors, visible focus-ring states on all interactive elements, and full motion-preference support.

---

## Local Setup

```bash
# Clone the repository
git clone _add-repo-link-here_

# Install Tailwind CLI (if not already installed)
npm install tailwindcss @tailwindcss/cli

# Build CSS
npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch

#Import Tailwind in your CSS 'src/input.css' file
@import "tailwindcss"
```

Open `index.html` in your browser or serve it with any static file server.

---

## Roadmap

- [ ] Klaviyo email flow — Welcome, Waitlist Confirmation, New Member, Release Announcement
- [ ] Responsive `srcset` sizing (currently single-size, format-optimized only)

---

## Author

**Sara Mohamed**
- GitHub: []
- Twitter: [@saramx_dev](https://x.com/saramx_dev)  
- LinkedIn: [Sara Mohamed](https://www.linkedin.com/in/saramx-dev/)
---

## License

This project is available for personal and portfolio use. Contact the author for commercial licensing inquiries.
