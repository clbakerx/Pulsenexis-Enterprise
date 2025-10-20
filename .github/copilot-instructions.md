# PulseNexis Enterprise Development Guide

## Project Architecture

This is a monorepo containing multiple Next.js applications:

- `/pulsenexis` - Main music catalog app with streaming player
- `/pulsenexis-web` - Marketing website
- Root project serves as template/base configuration

### Key Technologies

- Next.js 15.5.6 with App Router pattern
- React 19.1.0
- TypeScript with strict mode enabled
- TailwindCSS for styling
- Turbopack for development and builds

## Critical Patterns

### Routing & Navigation

- App router pattern in use - pages live in `app/` directories
- Main app root (`/pulsenexis/`) redirects to `/catalog` by default
- Each route is a React Server Component by default unless marked with `'use client'`

### Audio Player Implementation

See `/pulsenexis/app/catalog/page.tsx` for the music player implementation:

- Uses React hooks pattern for audio state management (`useAudioController`)
- Handles concurrent playback (auto-pauses other tracks)
- URL generation handles spaces/special characters in filenames
- Preload="none" for performance on large catalogs

### Data Management

- Track catalog stored in `/public/catalog/songs.json`
- Graceful fallback to minimal catalog if fetch fails
- CDN base URL configuration in JSON (`baseURL` field)
- All tracks require: title, artist, streamPath

### Styling Conventions

- TailwindCSS with custom theme configuration
- CSS variables for dark/light theme in `globals.css`
- Consistent component patterns:
  - Rounded corners: rounded-2xl
  - Shadows: shadow-lg with hover:shadow-xl
  - Interactive states: hover:opacity-90 active:scale-[0.98]
  
## Development Workflow

### Getting Started

```bash
# Install dependencies in relevant project directory
npm install

# Start development server with Turbopack
npm run dev 
```

Access running app at http://localhost:3000

### Key Commands

```bash
# Development with Turbopack
npm run dev 

# Production build
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint
```

### Common Tasks

1. Adding New Tracks:
   - Update `/pulsenexis/public/catalog/songs.json`
   - Follow existing track object structure
   - Ensure streamPath matches CDN filename exactly

2. Styling Changes:
   - Global styles in `app/globals.css`
   - Theme variables in :root selector
   - Use Tailwind classes for components

3. Route Changes:
   - Add new page.tsx in `app/` directory
   - Update layout.tsx if needed for new sections

## Testing & Debugging

- Music Player:
  - Test with varying track lengths
  - Verify pause/play state management
  - Check audio preloading behavior
  - Validate URL encoding for special characters

## Integration Points

1. CDN Integration:
   - File hosting at `filedn.com`
   - Update baseURL in songs.json if CDN changes

2. User Platform:
   - Join button links to `https://app.pulsenexis.com`
   - Download links direct to CDN files

## Performance Considerations

1. Audio Loading:
   - `preload="none"` prevents eager loading
   - Audio elements created on-demand
   - URL encoding handles special characters

2. State Management:
   - Single audio controller manages all players
   - Automatic cleanup of previous tracks