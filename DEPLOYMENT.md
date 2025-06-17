# Deployment Guide

## For Development
The SQLite database (`prisma/dev.db`) is included in the repository for easy development setup.

## For Production Deployment

### Option 1: Using External Database (Recommended)
1. Set up a PostgreSQL database (e.g., on Vercel, Railway, Supabase)
2. Set the `DATABASE_URL` environment variable to your production database
3. Update `prisma/schema.prisma` to use `postgresql` provider:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
4. Run migrations and seed:
   ```bash
   npm run db:setup
   ```

### Option 2: Keep SQLite for Simple Deployments
If deploying to a platform that supports file storage:
1. Uncomment the database ignore lines in `.gitignore`
2. The `prisma/seed.js` will populate the database on first run
3. Add to your deployment script:
   ```bash
   npm run db:setup
   ```

### Environment Variables
- `DATABASE_URL`: Your database connection string
- For local development, use `.env.local` (already ignored by git)

### Deployment Commands
```bash
# Install dependencies and generate Prisma client
npm install

# Set up database (push schema + seed data)
npm run db:setup

# Build the application
npm run build

# Start production server
npm start
```
