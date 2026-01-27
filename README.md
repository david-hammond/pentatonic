# Songwriter's Toolkit

A mobile-first Progressive Web App for songwriters. Currently features an Object Writing exercise with timer and evocative prompts.

## Features

- **Object Writing Exercise**: 10-minute timed writing sessions with random evocative prompts
- **Offline Support**: Works without internet after first visit
- **Installable**: Add to home screen on mobile devices
- **Dark Mode**: Automatically matches system preference
- **Mobile-First**: Designed for thumb-friendly use on phones

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Generating New Prompts

The app includes 200 pre-generated writing prompts. To generate new prompts using Claude:

```bash
ANTHROPIC_API_KEY=your-api-key npm run generate
```

## Deployment

The app is configured for GitHub Pages deployment:

```bash
npm run deploy
```

This builds to the `docs/` folder and commits/pushes to GitHub.

After deploying, enable GitHub Pages in repository settings:
1. Go to Settings > Pages
2. Set Source to "Deploy from a branch"
3. Select `main` branch and `/docs` folder
4. Save

Your app will be available at `https://[username].github.io/pentatonic/`

## Installing on Mobile

1. Visit the deployed URL on your phone
2. Tap the browser menu (three dots)
3. Select "Add to Home Screen" or "Install App"
4. Open the installed app - it will run full-screen without browser UI

## Tech Stack

- React + Vite
- vite-plugin-pwa for offline support
- Web Audio API for timer sounds
- CSS custom properties for theming

## Project Structure

```
src/
├── components/tools/     # Tool components (ObjectWriting, etc.)
├── hooks/               # Custom React hooks
├── utils/               # Utility functions (audio, etc.)
├── App.jsx              # Main app with navigation
└── main.jsx             # Entry point
public/
├── data/                # Generated prompts
└── icons/               # PWA icons
scripts/
├── generatePrompts.js   # LLM prompt generation
└── generateIcons.js     # Icon generation
```

## Future Features

- Rhyme Finder
- Chord Reference
- OCR Scanner
- Voice Commands
