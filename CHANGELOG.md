# Changelog

All notable changes to VesuviaSearch will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2026-10-12

Complete revamp: the app is now driven entirely by live EAV data.

### Added

- Stations, lines and boards fetched live from EAV (161 stations), cached 24 h with a last-good fallback
- Live departures and arrivals boards for Circumvesuviana, Cumana and Circumflegrea (Moova and PIS backends)
- Cross-network trips through interchange nodes (for example Garibaldi to Montesanto)
- Step-by-step stops with times for trains leaving soon
- Colloquial, abbreviation-aware station search with aliases and typo tolerance
- Favourites and recent searches
- New API routes: `/api/stations`, `/api/destinations`, `/api/journeys`, `/api/board`, `/api/train-stops`
- Vitest suite with real EAV fixtures (75 tests)
- Documentation: API, EAV notes, architecture, design explorations

### Changed

- "Linea x Golfo" visual redesign and new app icon
- Journey times computed from run offsets, fixing the 17:05 vs 17:08 mismatch
- Rewritten service worker with versioned caches and network-first pages
- Upgraded to Next.js 16, Vitest 5, plain ESLint flat config; `npm audit` reports 0 vulnerabilities

### Removed

- Prisma, SQLite, seed data and the hand-maintained station list
- Legacy routes (`/api/search`, `/api/departures`, `/api/trains`, `/api/eav-*`) and old scripts
- Outdated documentation

### Fixed

- Departures board (the previous endpoint returned 404)
- Wrong departure times caused by 1900-dated segment values

## [Unreleased]

Nothing yet.

## [2.0.0] - 2025-06-23

### Added

- Support for the entire EAV railway network in Campania
- Real-time train information and departure displays
- Integration with official EAV API for live data
- Train delay and cancellation notifications
- Enhanced PWA capabilities with improved offline support
- Detailed intermediate stops information
- Comprehensive code documentation and comments
- Contributing guidelines and development setup

### Changed

- Complete user interface redesign with glass morphism effects
- Enhanced mobile experience with touch-optimized controls
- Improved performance with optimized data fetching strategies
- Better TypeScript type definitions with JSDoc comments
- Updated README with detailed setup instructions
- Improved project structure documentation

### Fixed

- Station matching algorithm for better search results
- Time zone handling for consistent schedule display
- Various accessibility issues for screen readers

## [1.0.0] - 2025-06-19

### Added
- Initial release of VesuviaSearch
- Train schedule search for Circumvesuviana Naples-Sorrento line
- Multilingual support (Italian, English, Spanish, Portuguese, French, German)
- Responsive web design for mobile and desktop
- Station autocomplete
- Date and time selection for departures
- Real-time train schedule information
- Next.js with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- TanStack Query for data fetching

### Features
- **Search Functionality**
  - Point-to-point train search
  - Departure-only search from specific stations
  - Time-based filtering
    - Station name and code matching

- **User Interface**
  - Modern, responsive design
  - Multilingual interface with browser detection
  - Interactive date/time picker
  - Station autocomplete with suggestions
  - Detailed train results with intermediate stops
  - Loading states and error handling

- **Technical Features**
  - Zod schema validation
  - Server-side API routes
  - Client-side state management
  - Optimized performance with React Query

### Supported Languages
- 🇮🇹 Italian (primary)
- 🇬🇧 English (default fallback)
- 🇪🇸 Spanish
- 🇵🇹 Portuguese
- 🇫🇷 French
- 🇩🇪 German

---
