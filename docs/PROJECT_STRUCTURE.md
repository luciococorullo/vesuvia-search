# Project Structure

This document provides a detailed overview of the VesuviaSearch project structure, explaining the purpose and organization of each directory and key files.

## Overview

VesuviaSearch follows Next.js 15 App Router conventions with a well-organized, scalable architecture that separates concerns and promotes maintainability.

```text
vesuvia-search/
├── 📁 src/                      # Source code directory
│   ├── 📁 app/                  # Next.js App Router (pages and API routes)
│   ├── 📁 components/           # Reusable UI components  
│   ├── 📁 contexts/             # React contexts for global state
│   ├── 📁 hooks/                # Custom React hooks
│   └── 📁 lib/                  # Utility functions and configurations
├── 📁 prisma/                   # Database schema and migrations
├── 📁 data/                     # Static data files (CSV)
├── 📁 scripts/                  # Build and utility scripts
├── 📁 docs/                     # Documentation files
├── 📁 public/                   # Static assets (images, icons, etc.)
└── 📄 Configuration files       # Package.json, TypeScript, etc.
```

## Detailed Structure

### `/src` - Source Code

The main source code directory following Next.js 15 App Router patterns.

#### `/src/app` - App Router Directory

```text
src/app/
├── 📄 layout.tsx               # Root layout component
├── 📄 page.tsx                 # Homepage component  
├── 📄 globals.css              # Global CSS styles
├── 📄 favicon.ico              # Favicon
├── 📄 sitemap.ts               # Dynamic sitemap generation
├── 📁 api/                     # API routes
│   ├── 📁 departures/          # Departure search endpoint
│   ├── 📁 search/              # Train search endpoint  
│   ├── 📁 stations/            # Station management endpoint
│   └── 📁 trains/              # Train management endpoint
└── 📁 components/              # Page-specific components
    ├── 📄 DateTimePicker.tsx   # Date/time selection component
    ├── 📄 FindTrains.tsx       # Main search interface
    ├── 📄 Navbar.tsx           # Navigation header
    ├── 📄 StationAutocomplete.tsx # Station search input
    └── 📄 TrainResults.tsx     # Search results display
```

**Key Files:**
- `layout.tsx` - Root layout with providers, metadata, and global styles
- `page.tsx` - Homepage with search interface
- `api/*/route.ts` - RESTful API endpoints for data operations

#### `/src/components` - Reusable Components

```text
src/components/
├── 📄 Footer.tsx               # App footer component
├── 📄 LanguageSelector.tsx     # Language switching component
└── 📁 ui/                      # Base UI components (shadcn/ui)
    ├── 📄 button.tsx           # Button component
    ├── 📄 calendar.tsx         # Calendar picker
    ├── 📄 input.tsx            # Input field
    ├── 📄 label.tsx            # Form label
    ├── 📄 navigation-menu.tsx  # Navigation menu
    ├── 📄 popover.tsx          # Popover component
    └── 📄 tabs.tsx             # Tab navigation
```

**Purpose:**
- Shared UI components used across multiple pages
- `ui/` contains base components following shadcn/ui patterns
- Promotes consistency and reusability

#### `/src/contexts` - React Contexts

```text
src/contexts/
├── 📄 LanguageContext.tsx      # Internationalization context
└── 📄 QueryProvider.tsx        # TanStack Query provider
```

**Purpose:**
- Global state management using React Context
- Language context for i18n functionality
- Query provider for server state management

#### `/src/hooks` - Custom React Hooks

```text
src/hooks/
└── 📄 useTrains.ts             # Train data management hooks
```

**Purpose:**
- Reusable business logic and API integration
- TanStack Query hooks for data fetching
- Type-safe API interfaces

#### `/src/lib` - Utilities and Configuration

```text
src/lib/
├── 📄 i18n.ts                  # Internationalization configuration
├── 📄 prisma.ts                # Prisma client configuration
├── 📄 structured-data.ts       # SEO structured data
├── 📄 types.ts                 # TypeScript type definitions
└── 📄 utils.ts                 # Utility functions
```

**Purpose:**
- Shared utilities and configurations
- Type definitions with Zod schemas
- Database client setup
- SEO and internationalization helpers

### `/prisma` - Database Layer

```text
prisma/
├── 📄 schema.prisma            # Database schema definition
├── 📄 schema.prod.prisma       # Production schema variant
├── 📄 seed.ts                  # Database seeding script
└── 📁 prisma/                  # Generated files and database
    └── 📄 dev.db               # SQLite database (development)
```

**Purpose:**
- Database schema definition using Prisma
- Development and production configurations
- Data seeding for initial setup

### `/data` - Static Data Files

```text
data/
├── 📄 orari_napoli_sorrento.csv    # Naples to Sorrento schedules
└── 📄 orari_sorrento_napoli.csv    # Sorrento to Naples schedules
```

**Purpose:**
- Static train schedule data
- Source files for database seeding
- CSV format for easy editing and import

### `/scripts` - Build and Utility Scripts

```text
scripts/
├── 📄 all_trains.ts            # Train data processing
├── 📄 clear-db.ts              # Database cleanup
├── 📄 load-complete-data.js    # Data loading script
├── 📄 load-complete-data.ts    # TypeScript data loader
└── 📄 vercel-build.sh          # Vercel deployment script
```

**Purpose:**
- Database management and seeding
- Data processing and transformation
- Build and deployment automation

### `/docs` - Documentation

```text
docs/
├── 📄 API.md                   # API reference documentation
└── 📄 DEPLOYMENT.md            # Deployment guide
```

**Purpose:**
- Comprehensive API documentation
- Deployment instructions and best practices
- Developer guides and references

### `/public` - Static Assets

```text
public/
├── 📄 browserconfig.xml        # Browser configuration
├── 📄 file.svg                 # File icon
├── 📄 globe.svg                # Globe icon
├── 📄 next.svg                 # Next.js logo
├── 📄 robots.txt               # Search engine directives
├── 📄 site.webmanifest         # Web app manifest
├── 📄 vercel.svg               # Vercel logo
└── 📄 window.svg               # Window icon
```

**Purpose:**
- Static assets served directly by the web server
- Icons, images, and SEO-related files
- Web app manifest for PWA capabilities

## Configuration Files

### Root Level Files

```text
├── 📄 .env.example             # Environment variables template
├── 📄 .gitignore               # Git ignore patterns
├── 📄 CHANGELOG.md             # Version history
├── 📄 CONTRIBUTING.md          # Contributing guidelines
├── 📄 LICENSE                  # MIT license
├── 📄 README.md                # Project overview and setup
├── 📄 components.json          # shadcn/ui configuration
├── 📄 eslint.config.mjs        # ESLint configuration
├── 📄 next-env.d.ts            # Next.js TypeScript declarations
├── 📄 next.config.ts           # Next.js configuration
├── 📄 package.json             # Dependencies and scripts
├── 📄 postcss.config.mjs       # PostCSS configuration
├── 📄 tsconfig.json            # TypeScript configuration
├── 📄 tsconfig.seed.json       # TypeScript config for seeding
├── 📄 tsconfig.tsbuildinfo     # TypeScript build cache
└── 📄 vercel.json              # Vercel deployment configuration
```

## Architecture Patterns

### 1. Feature-Based Organization

Components and logic are organized by feature rather than by type:
- Train search functionality in `FindTrains.tsx`
- Station selection in `StationAutocomplete.tsx`
- Results display in `TrainResults.tsx`

### 2. Separation of Concerns

- **API Layer**: `/src/app/api` - Server-side logic and database operations
- **UI Layer**: `/src/components` - Presentation components
- **Business Logic**: `/src/hooks` - Data management and API calls
- **Utilities**: `/src/lib` - Shared functions and configurations

### 3. Type Safety

- TypeScript throughout the codebase
- Zod schemas for runtime validation
- Prisma for type-safe database operations

### 4. State Management

- React Query for server state
- React Context for global client state
- Local state for component-specific data

## File Naming Conventions

### Components
- **PascalCase** for component files: `FindTrains.tsx`
- **camelCase** for utility functions: `utils.ts`
- **kebab-case** for CSS and configuration: `globals.css`

### Directories
- **lowercase** for feature directories: `api/`, `components/`
- **PascalCase** for component directories when needed

### API Routes
- **lowercase** for route directories: `api/search/`
- `route.ts` for route handlers (Next.js convention)

## Import Strategy

### Import Order
1. React and Next.js imports
2. Third-party libraries
3. Internal components and utilities
4. Types and interfaces
5. Relative imports

### Example
```typescript
import React from 'react';
import { NextRequest, NextResponse } from 'next/server';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';
import type { Station } from '@/lib/types';
import './styles.css';
```

## Development Workflow

### 1. Local Development
```bash
npm run dev          # Start development server
npm run db:setup     # Initialize database
npm run type-check   # Verify TypeScript
npm run lint         # Check code quality
```

### 2. Adding Features
1. Create components in appropriate directories
2. Add types to `/src/lib/types.ts`
3. Create API routes if needed
4. Add translations to `/src/lib/i18n.ts`
5. Update documentation

### 3. Database Changes
1. Update `/prisma/schema.prisma`
2. Run `npm run db:push` for development
3. Create migrations for production
4. Update seed data if necessary

## Best Practices

### 1. Component Structure
- Keep components focused and single-responsibility
- Use TypeScript interfaces for props
- Include JSDoc comments for complex components

### 2. API Design
- Follow RESTful conventions
- Use Zod for request validation
- Include proper error handling
- Add rate limiting for production

### 3. Database Management
- Use Prisma migrations for schema changes
- Keep seed data up to date
- Use transactions for related operations
- Add database indexes for performance

### 4. Testing Strategy
- Unit tests for utility functions
- Integration tests for API routes
- E2E tests for critical user flows
- Type checking as part of CI/CD

## Performance Considerations

### 1. Code Splitting
- Automatic with Next.js App Router
- Dynamic imports for heavy components
- Route-based code splitting

### 2. Database Optimization
- Proper indexing on frequently queried fields
- Connection pooling for production
- Query optimization with Prisma

### 3. Caching Strategy
- Static generation for stable content
- API route caching for frequently accessed data
- Client-side caching with React Query

### 4. Bundle Optimization
- Tree shaking for unused code
- Image optimization with Next.js
- Font optimization with next/font

This structure provides a solid foundation for a scalable, maintainable train schedule application while following modern React and Next.js best practices.
