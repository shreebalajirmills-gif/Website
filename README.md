# Shree Balaji Rolling Mills

Single-root Next.js app for the Shree Balaji Rolling Mills website.

## Structure

```text
.
├── public/          Static assets and PDF spec sheets
├── src/             Active Next.js app, components, data, and utilities
├── files/           Project briefs, PDFs, and reference docs
├── legacy/vite/     Archived Vite-era app kept for reference
├── AGENTS.md        Next.js agent notes
└── CLAUDE.md        Pointer to the agent notes
```

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
npm start
```

## What Lives Here

- Buyer-segmented hero experience
- Product hub for structural steel and TMT bars
- Growth timeline and investor narrative
- Context-aware inquiry flow
- Trust, contact, and footer sections

## Legacy

The older Vite implementation, Storybook setup, and related source files were moved to `legacy/vite/` so the active app now lives in one canonical root structure.
