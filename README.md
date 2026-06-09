# mustakim-shikalgar.dev

Personal portfolio for Mustakim Shikalgar — MS Software Engineering @ ASU,
IEEE-published researcher, distributed-systems & applied-ML engineer.

A typography-driven site built around a faux-macOS-window motif: every
project and section lives inside a browser, terminal, or code-editor window,
with fluid-glass UI pills, per-project ambient hover glows, and live data
pulled from GitHub + LeetCode.

## Stack

- **Framework**: Next.js 14 (App Router, static export-friendly)
- **Language**: TypeScript 5, React 18
- **Styling**: Tailwind CSS 3 + custom CSS variables (warm-black palette)
- **Fonts**: Geist Sans / Geist Mono + Gloock (italic-serif accent)
- **Smooth scroll**: Lenis (auto-disabled under `prefers-reduced-motion`)
- **Live data**: GitHub + LeetCode via cached API routes (`/api/*`)
- **Analytics**: Vercel Analytics
- **Deployment**: Vercel

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Structure

```
src/
  app/                 routes — home, /info, /projects/[slug], /api/*
  components/
    windows/           BrowserWindow · TerminalWindow · CodeEditorWindow
    typography/        HeroHeading · SectionLabel · GradientDivider
    project/           ProjectShowcase, case studies, mockups, registry
  lib/                 data, projects, live-data fetchers
```

Projects are defined in `src/lib/data.ts`; each featured project registers a
custom mockup + case-study body in `src/components/project/registry.tsx`.

## Assets

- Resume: `public/resume.pdf`
- Project screenshots: `public/projects/<slug>/`

## Deployment

Connect the repo to Vercel — it auto-deploys on every push to `main`.
For higher GitHub API rate limits, set a `GITHUB_TOKEN` environment variable
in the Vercel project settings (optional; the live data falls back gracefully
without it).
