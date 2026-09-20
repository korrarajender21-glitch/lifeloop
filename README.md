# LifeLoop — Your Life, In Receipts

LifeLoop is a frontend-only React + Vite experience for turning fictional digital-life receipts into an interactive story: raw data -> insights -> connections -> story.

## Features

- Overview with data-derived archive metrics and recent moments
- Searchable, filterable, sortable receipt explorer with category, date, and location filters
- Accessible receipt detail modal with metadata and related moments
- Chronological Timeline grouped by month
- Evidence-based connection discovery
- Descriptive story chapters
- Lightweight category, location, tag, and purchase insights
- Local Surprise Me action that opens a real receipt from the archive
- Responsive desktop, tablet, and mobile layout
- Calm editorial page, card, timeline, connection, chapter, and modal animations with reduced-motion support
- Local category artwork for the hero, receipt cards, and story chapters

## Local setup

```bash
npm install
npm run dev
```

Create a production build with `npm run build`.

## Dataset instructions

The current `src/data/lifeloop_receipts.json` is a small, clearly labeled development dataset because the organizer file was not available when this project was created. Replace its contents with a copy of the organizer dataset without changing the original source file elsewhere.

`src/utils/dataAdapter.js` normalizes common shapes: a top-level array, `{ "receipts": [] }`, or `{ "data": [] }`. It maps common equivalents for id, category, title, date, location, description, and tags while retaining the raw record in `source`. Verify the organizer schema and extend the adapter if its field names differ.

The current development file contains 9 dated records. It is not presented as real personal data and should be replaced with the organizer dataset when that file is provided.

## Matching and story logic

Connections are shown only when records share a location, share one or more tags, use the same category, or occur within three days. Each connection displays the matching rule. Chapters are descriptive groups built from the same evidence: shared location, the `creative` tag, or Home records after 6 PM. These rules describe the records and do not make psychological claims.

## Technology

React, Vite, JavaScript/JSX, CSS, local JSON, Lucide React icons, and Framer Motion. There is no backend, database, authentication, or server-side API.

## Images and motion

Category artwork lives in `public/images/` and is mapped by `src/utils/imageMap.js`. These SVG illustrations are decorative category artwork, not claimed user photographs. Receipt cards and chapters use the category mapping, include descriptive alt text, lazy loading where appropriate, and fall back to `archive.svg` if an asset fails.

Framer Motion powers page transitions, the hero entrance, staggered statistic and receipt cards, timeline reveals, connection nodes, chapter cards, button feedback, and modal enter/exit states. `MotionConfig` and the CSS reduced-motion rule respect `prefers-reduced-motion`.

## Accessibility and responsive notes

The app uses semantic buttons and labels, visible focus-ready controls, keyboard-compatible navigation, modal semantics, readable contrast, touch-sized controls, and responsive layouts without horizontal overflow.

Receipt modals close with Escape or the close button and lock background scrolling while open. Motion uses transform and opacity and is reduced through `prefers-reduced-motion`.

## Deployment

Run `npm run build`, then deploy the generated `dist` folder to any static host such as GitHub Pages, Netlify, or Vercel static hosting.

## Known limitations

The included dataset is development data, not the organizer's final file. The visual connection map is a lightweight CSS relationship view rather than a large graph library. Purchase totals appear only when records contain numeric `metadata.amount` values.

## Verification

The current build has been checked with `npm install`, `npm run build`, and browser interaction checks covering navigation, search, combined date/location filters, Timeline rendering, receipt details, related moments, Surprise Me, Escape-to-close, local image loading, animated modal transforms, and mobile navigation.
