# Changelog

All notable changes to VesuviaSearch will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Further performance optimizations
- Additional language support

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
- Station autocomplete with code and name matching
- Campania Express filtering
- Date and time selection for departures
- Real-time train schedule information
- SQLite database with Prisma ORM
- Next.js 15 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- TanStack Query for data fetching
- Vercel deployment configuration

### Features
- **Search Functionality**
  - Point-to-point train search
  - Departure-only search from specific stations
  - Time-based filtering
  - Campania Express filter option
  - Station name and code matching

- **User Interface**
  - Modern, responsive design
  - Multilingual interface with browser detection
  - Interactive date/time picker
  - Station autocomplete with suggestions
  - Detailed train results with intermediate stops
  - Loading states and error handling

- **Technical Features**
  - SQLite database for development
  - PostgreSQL support for production
  - Prisma ORM with type-safe database queries
  - Zod schema validation
  - Server-side API routes
  - Client-side state management
  - Optimized performance with React Query

### Database Schema
- **Stations**: Railway stations with unique codes
- **Trains**: Scheduled trains with routes and timing
- **TrainStops**: Intermediate stops with arrival/departure times

### API Endpoints
- `GET /api/stations` - Retrieve all stations
- `GET /api/search` - Search trains between stations
- `GET /api/departures` - Get departures from a station
- `GET /api/trains` - Get all trains

### Supported Languages
- 🇮🇹 Italian (primary)
- 🇬🇧 English (default fallback)
- 🇪🇸 Spanish
- 🇵🇹 Portuguese
- 🇫🇷 French
- 🇩🇪 German

---

## Development Notes

### Version 1.0.0 Release Notes
This initial release provides a complete train schedule search solution for the Circumvesuviana railway network. The application focuses on usability, performance, and multilingual accessibility.

### Key Technical Decisions
- **Next.js 15**: Chosen for its App Router, server components, and excellent TypeScript support
- **SQLite + Prisma**: Provides type-safe database operations with easy development setup
- **TanStack Query**: Enables efficient server state management and caching
- **Tailwind CSS**: Allows rapid UI development with consistent design system
- **Zod**: Ensures runtime type safety for API requests and responses

### Future Considerations
- Real-time train tracking integration
- Push notifications for delays
- Journey planning with connections
- Mobile app development
- Integration with payment systems
- Accessibility improvements (WCAG compliance)
- Performance monitoring and analytics
