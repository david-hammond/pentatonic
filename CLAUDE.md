# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Pentatonic is a mobile-first Progressive Web App (PWA) for songwriters. The core feature is an Object Writing Exercise with timer and random prompts. The app is designed for users who write in physical notebooks—it's a quick reference tool, not a digital writing environment.

## Tech Stack

- React + Vite
- vite-plugin-pwa for offline support and installability
- Deployed to GitHub Pages (static hosting only)
- Anthropic API (Claude Haiku) for build-time prompt generation

## Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production (outputs to docs/)
npm run preview      # Preview production build locally
npm run generate     # Generate prompts (requires ANTHROPIC_API_KEY env var)
npm run deploy       # Build and deploy to GitHub Pages
```

## Architecture

### Tool-Based Component Structure

Each feature is a self-contained "tool" in `src/components/tools/`:

```
src/components/tools/
├── ObjectWriting/
│   ├── ObjectWriting.jsx     # UI component
│   ├── ObjectWriting.css     # Scoped styles
│   └── (uses useObjectWriting hook)
├── RhymeFinder/              # Future
├── ChordReference/           # Future
└── ...
```

**Pattern**: Separate UI (JSX) from logic (custom hook in `src/hooks/`) for each tool.

### Key Directories

- `src/hooks/` - Custom React hooks (useObjectWriting.js)
- `src/utils/` - Utility functions (audio.js for Web Audio API chime)
- `public/data/` - Static data files (prompts.json)
- `public/icons/` - PWA icons (SVG sources and PNG outputs)
- `scripts/` - Build-time scripts (generatePrompts.js, generateIcons.js)
- `docs/` - Build output for GitHub Pages

### Navigation

Simple state-based routing in App.jsx. Each tool renders full-screen when active. Future tools can be added to the TOOLS array and rendered conditionally.

## Design Constraints

- **Mobile-first**: 320px minimum width, thumb-friendly buttons (min 44px height)
- **Offline-capable**: All assets cached via service worker
- **High contrast**: Designed for outdoor use
- **Fast load**: Target under 1 second
- **Typography**: Prompts at 2.5rem, timer at 4rem

## PWA Configuration

- Service worker via vite-plugin-pwa with offline-first caching
- Build output to `docs/` folder (GitHub Pages requirement)
- Base path `/pentatonic/` configured in vite.config.js
- Icons: 192x192px and 512x512px PNG required for installation

## Adding New Tools

1. Create folder in `src/components/tools/NewTool/`
2. Add component (NewTool.jsx) and styles (NewTool.css)
3. Create custom hook in `src/hooks/useNewTool.js` for business logic
4. Add entry to TOOLS array in App.jsx
5. Add conditional render in App.jsx return statement
