#!/bin/bash

# Lock file to prevent multiple simultaneous executions
LOCK_FILE="/tmp/vesuvia-build.lock"

# Function to clean up lock file on exit
cleanup() {
    rm -f "$LOCK_FILE"
}

# Set trap to clean up on exit
trap cleanup EXIT

# Check if already running
if [ -f "$LOCK_FILE" ]; then
    echo "⚠️  Build already in progress, waiting..."
    # Wait up to 5 minutes for other build to complete
    for i in {1..300}; do
        if [ ! -f "$LOCK_FILE" ]; then
            break
        fi
        sleep 1
    done
    
    if [ -f "$LOCK_FILE" ]; then
        echo "❌ Timeout waiting for previous build, removing stale lock"
        rm -f "$LOCK_FILE"
    fi
fi

# Create lock file
echo $$ > "$LOCK_FILE"

# Check if this is production (Vercel) or development
if [ "$VERCEL_ENV" = "production" ] || [ "$NODE_ENV" = "production" ]; then
    echo "🚀 Production build detected - Build ID: $$"
    echo "🌍 Environment: VERCEL_ENV=$VERCEL_ENV, NODE_ENV=$NODE_ENV"
    
    # Use PostgreSQL schema for production
    cp prisma/schema.prod.prisma prisma/schema.prisma
    
    # Generate Prisma client for PostgreSQL
    npx prisma generate
    
    # Run migrations (this will create tables if they don't exist)
    npx prisma db push
    
    # Check if data already exists
    echo "🔍 Checking if database already has data..."
    STATION_COUNT=$(npx prisma db execute --stdin <<< "SELECT COUNT(*) as count FROM Station;" 2>/dev/null | tail -1 | grep -o '[0-9]*' || echo "0")
    
    if [ "$STATION_COUNT" -gt "0" ]; then
        echo "📊 Database already has $STATION_COUNT stations, skipping data load"
    else
        echo "📊 Database is empty, loading complete data from CSV files..."
        # Load complete data from CSV files
        npm run db:load-complete
    fi
    
    # Build the application
    npx next build
else
    echo "🛠️ Development build"
    # Use SQLite schema for development (default)
    npx prisma generate
    npx next build
fi
