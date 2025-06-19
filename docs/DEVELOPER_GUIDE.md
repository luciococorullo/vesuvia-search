# Developer Quick Start Guide

Welcome to VesuviaSearch! This guide will get you up and running quickly as a developer.

## Prerequisites

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **VS Code** (recommended) - [Download here](https://code.visualstudio.com/)

## Quick Setup (5 minutes)

1. **Clone and install**
   ```bash
   git clone https://github.com/yourusername/vesuvia-search.git
   cd vesuvia-search
   npm install
   ```

2. **Set up environment**
   ```bash
   cp .env.example .env.local
   ```

3. **Initialize database**
   ```bash
   npm run db:setup
   ```

4. **Start development**
   ```bash
   npm run dev
   ```

5. **Open browser**
   Visit [http://localhost:3000](http://localhost:3000)

## Essential Commands

```bash
# Development
npm run dev              # Start dev server with Turbopack
npm run build           # Build for production
npm run start           # Start production server

# Database
npm run db:setup        # Initial setup (push schema + seed)
npm run db:reset        # Reset and reseed database
npm run db:seed         # Seed with data
npm run db:generate     # Generate Prisma client

# Code Quality
npm run lint            # Check code quality
npm run lint:fix        # Fix linting issues
npm run type-check      # TypeScript type checking
npm run format          # Format code with Prettier

# Utilities
npm run clean           # Clean build artifacts
```

## Project Structure (Quick Overview)

```
src/
├── app/                # Pages and API routes (Next.js App Router)
├── components/         # Reusable UI components
├── contexts/          # React contexts (Language, Query)
├── hooks/             # Custom React hooks
└── lib/               # Utilities, types, and configurations

prisma/                # Database schema and seeds
docs/                  # Documentation
data/                  # CSV data files
```

## Key Technologies

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety throughout
- **Prisma** - Database ORM and type-safe queries
- **TanStack Query** - Server state management
- **Tailwind CSS** - Utility-first CSS framework
- **Zod** - Runtime type validation
- **Radix UI** - Accessible component primitives

## Development Workflow

### 1. Making Changes

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes, then check quality
npm run type-check
npm run lint
npm run format

# Commit changes
git add .
git commit -m "feat: add your feature description"
git push origin feature/your-feature-name
```

### 2. Adding New API Routes

Create in `src/app/api/your-route/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Your logic here
    const data = await prisma.yourModel.findMany();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
```

### 3. Adding New Components

Create in `src/components/YourComponent.tsx`:

```typescript
/**
 * YourComponent - Brief description
 */
interface YourComponentProps {
  title: string;
  onAction?: () => void;
}

export function YourComponent({ title, onAction }: YourComponentProps) {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      {onAction && (
        <button onClick={onAction} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
          Action
        </button>
      )}
    </div>
  );
}
```

### 4. Database Changes

```bash
# 1. Update prisma/schema.prisma
# 2. Push changes to development database
npm run db:push

# 3. For production, create migration
npx prisma migrate dev --name your-change-description

# 4. Update seed data if needed
npm run db:seed
```

### 5. Adding Translations

Update `src/lib/i18n.ts`:

```typescript
export const translations = {
  it: {
    yourKey: 'Testo italiano',
    // ... existing translations
  },
  en: {
    yourKey: 'English text',
    // ... existing translations
  },
  // ... other languages
};
```

Use in components:

```typescript
import { useLanguage } from '@/contexts/LanguageContext';

export function YourComponent() {
  const { t } = useLanguage();
  
  return <p>{t('yourKey')}</p>;
}
```

## API Quick Reference

### Endpoints

- `GET /api/stations` - All stations
- `GET /api/search?from=X&to=Y` - Search trains
- `GET /api/departures?from=X` - Station departures
- `GET /api/trains` - All trains

### Example Usage

```typescript
// Search trains
const response = await fetch('/api/search?from=napoli&to=sorrento&time=14:30');
const data = await response.json();

// Get departures
const departures = await fetch('/api/departures?from=napoli');
const departureData = await departures.json();
```

## Database Schema (Quick Reference)

```typescript
// Station
{
  id: number;
  name: string;    // "Napoli Centrale"
  code: string;    // "NAP"
}

// Train
{
  id: number;
  trainNumber: string | null;        // "CE001"
  direction: "NAPOLI" | "SORRENTO";
  departureTime: string;             // "14:30"
  operatingDays: string;             // "DAILY", "WEEKDAYS_ONLY", etc.
  isCampaniaExpress: boolean;
  category: string;                  // "REGIONALE", "CAMPANIA_EXPRESS"
  startStationId: number;
  endStationId: number;
}

// TrainStop
{
  id: number;
  trainId: number;
  stationId: number;
  arrivalTime: string | null;       // "14:35"
  departureTime: string | null;     // "14:37"
  stopOrder: number;                // 1, 2, 3...
}
```

## Common Tasks

### Add New Station

```typescript
// Via API
const newStation = await fetch('/api/stations', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'New Station',
    code: 'NEW'
  })
});

// Or via Prisma directly
const station = await prisma.station.create({
  data: {
    name: 'New Station',
    code: 'NEW'
  }
});
```

### Query Trains

```typescript
// All trains to Sorrento
const trains = await prisma.train.findMany({
  where: {
    direction: 'SORRENTO'
  },
  include: {
    startStation: true,
    endStation: true,
    stops: {
      include: {
        station: true
      },
      orderBy: {
        stopOrder: 'asc'
      }
    }
  }
});
```

### Debug Database

```bash
# Open Prisma Studio (database GUI)
npx prisma studio

# Check database
npm run db:generate
npx prisma db pull  # Pull schema from database
npx prisma db push  # Push schema to database
```

## Environment Variables

### Development (.env.local)

```env
DATABASE_DATABASE_URL="file:./dev.db"
NODE_ENV="development"
```

### Production

```env
DATABASE_DATABASE_URL="postgresql://user:pass@host:port/db"
VERCEL_ANALYTICS_ID="your-analytics-id"
NODE_ENV="production"
```

## Troubleshooting

### Common Issues

1. **Port 3000 in use**
   ```bash
   # Kill process on port 3000
   npx kill-port 3000
   # Or use different port
   npm run dev -- -p 3001
   ```

2. **Database issues**
   ```bash
   # Reset database
   npm run db:reset
   
   # Regenerate client
   npm run db:generate
   ```

3. **Type errors**
   ```bash
   # Check types
   npm run type-check
   
   # Regenerate Prisma types
   npm run db:generate
   ```

4. **Build errors**
   ```bash
   # Clean and rebuild
   npm run clean
   npm install
   npm run build
   ```

### Getting Help

1. Check existing [GitHub Issues](https://github.com/yourusername/vesuvia-search/issues)
2. Read the full documentation in `/docs/`
3. Use TypeScript IntelliSense in VS Code
4. Check browser dev tools for runtime errors

## VS Code Setup (Recommended)

### Extensions

- **TypeScript** - Built-in
- **Prisma** - Syntax highlighting for schema files
- **Tailwind CSS IntelliSense** - CSS class autocomplete
- **ES7+ React/Redux/React-Native snippets** - React shortcuts
- **Auto Rename Tag** - HTML/JSX tag renaming
- **Prettier** - Code formatting
- **ESLint** - Code linting

### Settings (.vscode/settings.json)

```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```

## Next Steps

1. **Read the full documentation** in `/docs/`
2. **Explore the codebase** starting with `src/app/page.tsx`
3. **Make your first change** - try adding a new translation
4. **Check out the database** with `npx prisma studio`
5. **Review the API** at [http://localhost:3000/api/stations](http://localhost:3000/api/stations)

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TanStack Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Radix UI](https://www.radix-ui.com/primitives)

Happy coding! 🚂
