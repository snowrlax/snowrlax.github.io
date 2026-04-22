# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website (pranavv.me) built with Next.js 14 as a static site generator, deployed to GitHub Pages.

## Commands

```bash
npm run dev      # Development server on localhost:3000
npm run build    # Static export to /out directory
npm run lint     # ESLint with Next.js core-web-vitals
```

## Architecture

**Static Export:** All pages pre-rendered at build time (`output: "export"` in next.config.mjs). No server-side rendering.

**App Router Structure:**
- `/app` - Next.js pages and layouts
- `/app/blog/[slug]` - Dynamic blog post routes

**Component Organization:**
- `/components/home` - Homepage sections (profileHeading, about, animeBackground)
- `/components/cards` - Card variants (card1=small, card2=medium, card3=with images)
- `/components/layout` - Navbar and footer
- `/components/shared` - Reusable components
- `/components/ui` - shadcn/ui primitives

**Data & Content:**
- `/data/data.ts` - Structured arrays for Experience, Projects, Recognition
- `/content/blog/*.mdx` - Blog posts with gray-matter frontmatter
- `/hooks/useBlogPosts.ts` - File-based blog system

**Path Aliases (tsconfig):**
- `@/types`, `@/hooks`, `@/content`, `@/*`

## Performance Patterns

- Lazy imports for non-critical components (MediumCard, CardWithImage)
- Dynamic imports with `ssr: false` for client-only code (GoogleAnalytics, DeferredScripts)
- Package import optimization configured for: framer-motion, react-icons, lucide-react, react-markdown, react-syntax-highlighter

## Styling

Tailwind CSS with custom theme:
- Colors: `offwhite` (#fffbf5), `lightbrown` (#e0c8af)
- Dark mode via CSS class
- Custom utilities: `bg-grid`, `bg-grid-small`, `bg-dot`
- shadcn/ui components with CSS variables

## Deployment

GitHub Actions (`.github/workflows/nextjs.yml`) auto-deploys to GitHub Pages on push to `main`. Build output goes to `/out` directory.
