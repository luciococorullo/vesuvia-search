# Deployment Guide

## For Development
The SQLite database (`prisma/dev.db`) is used for local development.

## For Production Deployment (Vercel)

### Step 1: Set up Vercel Postgres Database
1. Go to your Vercel project dashboard
2. Navigate to the "Storage" tab
3. Create a new Postgres database
4. Copy the `DATABASE_URL` connection string

### Step 2: Configure Environment Variables
1. In your Vercel project settings, go to "Environment Variables"
2. Add `DATABASE_URL` with your Postgres connection string
3. Make sure it's enabled for Production, Preview, and Development environments

### Step 3: Deploy
The deployment is now automated with the updated build process:
- Vercel will use the `vercel-build` script
- This will automatically set up the PostgreSQL database
- The database will be seeded with initial data

### Environment Variables
- `DATABASE_URL`: Your database connection string
  - Local: `file:./dev.db` (SQLite)
  - Production: `postgres://...` (PostgreSQL from Vercel)

### Manual Database Setup (if needed)
```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed the database
npm run db:seed
```
