# Deployment Guide

This guide covers deployment options for VesuviaSearch, from development to production environments.

## Table of Contents

- [Quick Deployment (Vercel)](#quick-deployment-vercel)
- [Manual Deployment](#manual-deployment)
- [Environment Setup](#environment-setup)
- [Database Configuration](#database-configuration)
- [Performance Optimization](#performance-optimization)
- [Monitoring and Maintenance](#monitoring-and-maintenance)

## Quick Deployment (Vercel)

Vercel is the recommended deployment platform for VesuviaSearch, offering seamless integration with Next.js.

### Prerequisites

- GitHub account
- Vercel account (free tier available)
- PostgreSQL database (for production)

### Steps

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "Import Project"
   - Select your VesuviaSearch repository

3. **Configure Environment Variables**
   
   In Vercel dashboard, add these environment variables:

   ```env
   # Database (use PostgreSQL for production)
   DATABASE_DATABASE_URL="postgresql://username:password@hostname:port/database"
   
   # Optional: Analytics
   VERCEL_ANALYTICS_ID="your-analytics-id"
   ```

4. **Deploy**
   - Vercel will automatically detect Next.js and deploy
   - Your app will be available at `https://your-project.vercel.app`

### Automatic Deployments

Vercel automatically deploys when you push to the main branch. For staging environments, create a separate branch:

```bash
git checkout -b staging
git push origin staging
```

## Manual Deployment

For custom hosting environments or VPS deployment.

### Build Process

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Set Environment Variables**

   Create `.env.production`:

   ```env
   NODE_ENV=production
   DATABASE_DATABASE_URL="your-production-database-url"
   ```

3. **Build Application**

   ```bash
   npm run build
   ```

4. **Start Production Server**

   ```bash
   npm run start
   ```

### Using PM2 (Process Manager)

For production servers, use PM2 to manage the Node.js process:

1. **Install PM2**

   ```bash
   npm install -g pm2
   ```

2. **Create PM2 Configuration**

   Create `ecosystem.config.js`:

   ```javascript
   module.exports = {
     apps: [{
       name: 'vesuvia-search',
       script: 'npm',
       args: 'start',
       env: {
         NODE_ENV: 'development'
       },
       env_production: {
         NODE_ENV: 'production',
         PORT: 3000
       }
     }]
   };
   ```

3. **Start with PM2**

   ```bash
   pm2 start ecosystem.config.js --env production
   pm2 save
   pm2 startup
   ```

### Docker Deployment

1. **Create Dockerfile**

   ```dockerfile
   FROM node:18-alpine AS deps
   RUN apk add --no-cache libc6-compat
   WORKDIR /app
   COPY package.json package-lock.json ./
   RUN npm ci --only=production

   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   RUN npm run build

   FROM node:18-alpine AS runner
   WORKDIR /app
   ENV NODE_ENV production
   
   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs

   COPY --from=builder /app/public ./public
   COPY --from=builder /app/.next/standalone ./
   COPY --from=builder /app/.next/static ./.next/static

   USER nextjs
   EXPOSE 3000
   ENV PORT 3000

   CMD ["node", "server.js"]
   ```

2. **Build and Run**

   ```bash
   docker build -t vesuvia-search .
   docker run -p 3000:3000 -e DATABASE_DATABASE_URL="your-db-url" vesuvia-search
   ```

## Environment Setup

### Development

```env
NODE_ENV=development
DATABASE_DATABASE_URL="file:./dev.db"
```

### Production

```env
NODE_ENV=production
DATABASE_DATABASE_URL="postgresql://user:password@host:port/database"
VERCEL_ANALYTICS_ID="optional-analytics-id"
```

### Environment Variable Validation

Ensure all required environment variables are set:

```bash
# Check if database URL is set
echo $DATABASE_DATABASE_URL

# Test database connection
npm run db:generate
```

## Database Configuration

### SQLite (Development)

SQLite is used for local development and automatically creates the database file.

```bash
npm run db:setup
```

### PostgreSQL (Production)

For production, use PostgreSQL for better performance and reliability.

1. **Create Database**

   ```sql
   CREATE DATABASE vesuvia_search;
   CREATE USER vesuvia_user WITH PASSWORD 'secure_password';
   GRANT ALL PRIVILEGES ON DATABASE vesuvia_search TO vesuvia_user;
   ```

2. **Update Schema**

   Update `prisma/schema.prisma` for production:

   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_DATABASE_URL")
   }
   ```

3. **Run Migrations**

   ```bash
   npm run db:migrate
   npm run db:seed
   ```

### Database Providers

**Recommended PostgreSQL providers:**

- **Vercel Postgres** - Integrated with Vercel deployments
- **Supabase** - Open source alternative with good free tier
- **PlanetScale** - Serverless MySQL (requires schema changes)
- **Railway** - Simple PostgreSQL hosting
- **DigitalOcean** - Managed databases

## Performance Optimization

### Next.js Configuration

Update `next.config.ts` for production:

```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
  compress: true,
  generateStaticParams: true,
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  // Enable standalone output for Docker
  output: 'standalone',
};

export default nextConfig;
```

### Database Optimization

1. **Connection Pooling**

   ```typescript
   // lib/prisma.ts
   import { PrismaClient } from '@prisma/client';

   const globalForPrisma = globalThis as unknown as {
     prisma: PrismaClient | undefined;
   };

   export const prisma = globalForPrisma.prisma ?? 
     new PrismaClient({
       connectionLimit: 10,
     });

   if (process.env.NODE_ENV !== 'production') {
     globalForPrisma.prisma = prisma;
   }
   ```

2. **Indexing**

   Add database indexes for better query performance:

   ```sql
   CREATE INDEX idx_stations_code ON stations(code);
   CREATE INDEX idx_stations_name ON stations(name);
   CREATE INDEX idx_trains_direction ON trains(direction);
   CREATE INDEX idx_trains_departure_time ON trains(departure_time);
   CREATE INDEX idx_train_stops_train_id ON train_stops(train_id);
   CREATE INDEX idx_train_stops_station_id ON train_stops(station_id);
   ```

### Caching Strategy

1. **API Route Caching**

   ```typescript
   // app/api/stations/route.ts
   export async function GET() {
     const stations = await prisma.station.findMany();
     
     return Response.json(stations, {
       headers: {
         'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
       }
     });
   }
   ```

2. **Client-side Caching**

   TanStack Query is already configured for client-side caching.

## Monitoring and Maintenance

### Health Checks

Create a health check endpoint:

```typescript
// app/api/health/route.ts
export async function GET() {
  try {
    await prisma.station.count();
    
    return Response.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected'
    });
  } catch (error) {
    return Response.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      error: error.message
    }, { status: 503 });
  }
}
```

### Logging

Use structured logging for production:

```typescript
// lib/logger.ts
export const log = {
  info: (message: string, meta?: object) => {
    console.log(JSON.stringify({ level: 'info', message, ...meta }));
  },
  error: (message: string, error?: Error, meta?: object) => {
    console.error(JSON.stringify({ 
      level: 'error', 
      message, 
      error: error?.message,
      stack: error?.stack,
      ...meta 
    }));
  }
};
```

### Analytics

Enable Vercel Analytics:

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Backup Strategy

1. **Database Backups**

   ```bash
   # PostgreSQL backup
   pg_dump $DATABASE_DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql
   ```

2. **Automated Backups**

   Set up automated backups with your hosting provider or use cron jobs.

### Security Considerations

1. **Environment Variables**
   - Never commit `.env` files
   - Use secure passwords
   - Rotate credentials regularly

2. **Database Security**
   - Use connection SSL in production
   - Limit database user permissions
   - Enable audit logging

3. **Application Security**
   - Keep dependencies updated
   - Use HTTPS in production
   - Implement rate limiting if needed

## Troubleshooting

### Common Issues

1. **Database Connection Errors**

   ```bash
   # Test database connectivity
   npm run db:generate
   
   # Check environment variables
   echo $DATABASE_DATABASE_URL
   ```

2. **Build Failures**

   ```bash
   # Clear cache and rebuild
   npm run clean
   npm install
   npm run build
   ```

3. **Memory Issues**

   ```bash
   # Increase Node.js memory limit
   NODE_OPTIONS="--max-old-space-size=4096" npm run build
   ```

### Logs and Debugging

- **Vercel**: Check function logs in the Vercel dashboard
- **Manual**: Use `pm2 logs` or check server logs
- **Docker**: Use `docker logs container_name`

## Support

For deployment issues:

1. Check the [GitHub Issues](https://github.com/yourusername/vesuvia-search/issues)
2. Review the [API Documentation](docs/API.md)
3. Contact the development team

---

## Quick Reference

### Essential Commands

```bash
# Development
npm run dev

# Production build
npm run build
npm run start

# Database setup
npm run db:setup

# Type checking
npm run type-check

# Linting
npm run lint
```

### Environment Variables

- `DATABASE_DATABASE_URL` - Database connection string (required)
- `VERCEL_ANALYTICS_ID` - Analytics tracking ID (optional)
- `NODE_ENV` - Environment mode (development/production)

### Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Database seeded with initial data
- [ ] Health check endpoint working
- [ ] HTTPS enabled
- [ ] Analytics tracking setup
- [ ] Backup strategy in place
- [ ] Monitoring configured
