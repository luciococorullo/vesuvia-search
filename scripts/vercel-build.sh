#!/bin/bash

# Check if this is production (Vercel) or development
if [ "$VERCEL_ENV" = "production" ] || [ "$NODE_ENV" = "production" ]; then
    echo "🚀 Production build detected"
    
    # Use PostgreSQL schema for production
    cp prisma/schema.prod.prisma prisma/schema.prisma
    
    # Generate Prisma client for PostgreSQL
    npx prisma generate
    
    # Run migrations (this will create tables if they don't exist)
    npx prisma db push --force-reset
    
    # Load complete data from CSV files
    npm run db:load-complete
    
    # Build the application
    npm run build
else
    echo "🛠️ Development build"
    # Use SQLite schema for development (default)
    npx prisma generate
    npm run build
fi
