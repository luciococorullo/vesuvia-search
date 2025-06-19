# Deployment Guide

## Database Setup Overview

### Local Development
- **Database**: SQLite (`prisma/dev.db`)
- **Schema**: `prisma/schema.prisma` (SQLite configuration)
- **Environment**: `.env.local`

### Production (Vercel)
- **Database**: PostgreSQL (Vercel Postgres)
- **Schema**: `prisma/schema.prod.prisma` (PostgreSQL configuration)
- **Environment**: Vercel Environment Variables

## For Production Deployment (Vercel)

### Step 1: Set up Vercel Postgres Database
1. Go to your Vercel project dashboard
2. Navigate to the "Storage" tab
3. Create a new Postgres database
4. Copy the `DATABASE_DATABASE_URL` and `DIRECT_URL` connection strings

### Step 2: Configure Environment Variables in Vercel
1. In your Vercel project settings, go to "Environment Variables"
2. Add these variables:
   - `DATABASE_DATABASE_URL`: Your Postgres connection string (with pool)
   - `DIRECT_URL`: Your Postgres direct connection string (without pool)
3. Make sure they're enabled for Production environment

### Step 3: Deploy
The deployment is now automated:
- Vercel will use the `scripts/vercel-build.sh` script
- Automatically switches to PostgreSQL schema in production
- Sets up the database tables
- Seeds with complete train and station data
- Builds the Next.js application

### Environment Variables Summary
| Environment | DATABASE_DATABASE_URL | Schema File |
|-------------|--------------|-------------|
| Local | `file:./prisma/dev.db` | `schema.prisma` (SQLite) |
| Production | `postgres://...` | `schema.prod.prisma` (PostgreSQL) |

### Manual Database Operations (if needed)
```bash
# For local development
npm run db:clear          # Clear all data
npm run db:seed   # Load fresh data

# For production (manual)
npx prisma generate        # Generate client
npx prisma db push         # Create tables
npm run db:seed   # Load data
```

### Troubleshooting
- If deployment fails, check Vercel function logs
- Ensure `DATABASE_DATABASE_URL` and `DIRECT_URL` are properly set
- Verify CSV files are included in the deployment
