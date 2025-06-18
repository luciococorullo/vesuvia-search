#!/bin/bash

# Check if this is production (Vercel) or development
if [ "$VERCEL_ENV" = "production" ] || [ "$NODE_ENV" = "production" ]; then
    echo "🚀 Production build detected"
    
    # Generate Prisma client
    npx prisma generate
    
    # Run migrations (this will create tables if they don't exist)
    npx prisma db push --force-reset
    
    # Seed the database
    npm run db:seed
    
    # Build the application
    npm run build
else
    echo "🛠️ Development build"
    npx prisma generate
    npm run build
fi
