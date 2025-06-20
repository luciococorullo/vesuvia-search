#!/bin/bash

# Enhanced Vercel Build Script for VesuviaSearch
# Version: 2.0.0
# Updated: June 2025

set -euo pipefail  # Exit on error, undefined variables, pipe failures

# Lock file to prevent multiple simultaneous executions
LOCK_FILE="/tmp/vesuvia-build.lock"
BUILD_LOG="/tmp/vesuvia-build.log"

# Function to log messages with timestamp
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$BUILD_LOG"
}

# Function to log errors
log_error() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ❌ ERROR: $1" | tee -a "$BUILD_LOG" >&2
}

# Function to clean up lock file and logs on exit
cleanup() {
    local exit_code=$?
    rm -f "$LOCK_FILE"
    if [ $exit_code -ne 0 ]; then
        log_error "Build failed with exit code $exit_code"
        log "Build logs available at: $BUILD_LOG"
    else
        log "✅ Build completed successfully"
        # Clean up old log on success
        rm -f "$BUILD_LOG"
    fi
    exit $exit_code
}

# Set trap to clean up on exit
trap cleanup EXIT

# Initialize build log
log "🚀 Starting VesuviaSearch build process..."
log "Build ID: $$"
log "Node version: $(node --version)"
log "NPM version: $(npm --version)"

# Check if already running
if [ -f "$LOCK_FILE" ]; then
    log "⚠️  Build already in progress, waiting..."
    # Wait up to 8 minutes for other build to complete
    for i in {1..480}; do
        if [ ! -f "$LOCK_FILE" ]; then
            break
        fi
        if [ $((i % 60)) -eq 0 ]; then
            log "Still waiting... ($((i/60)) minutes elapsed)"
        fi
        sleep 1
    done
    
    if [ -f "$LOCK_FILE" ]; then
        log_error "Timeout waiting for previous build (8 minutes), removing stale lock"
        rm -f "$LOCK_FILE"
    fi
fi

# Create lock file with additional metadata
{
    echo "$$"
    echo "$(date)"
    echo "${VERCEL_ENV:-development}"
    echo "${VERCEL_GIT_COMMIT_SHA:-unknown}"
} > "$LOCK_FILE"

# Detect environment with enhanced logic
is_production=false
if [ "$VERCEL_ENV" = "production" ] || [ "$NODE_ENV" = "production" ] || [ "$VERCEL" = "1" ]; then
    is_production=true
fi

if [ "$is_production" = true ]; then
    log "🚀 Production build detected"
    log "🌍 Environment details:"
    log "   VERCEL_ENV: ${VERCEL_ENV:-unset}"
    log "   NODE_ENV: ${NODE_ENV:-unset}"
    log "   VERCEL: ${VERCEL:-unset}"
    log "   VERCEL_GIT_COMMIT_SHA: ${VERCEL_GIT_COMMIT_SHA:-unset}"
    log "   VERCEL_GIT_COMMIT_REF: ${VERCEL_GIT_COMMIT_REF:-unset}"
    
    # Note: Database operations removed as DB is no longer used
    
    # Build the application with enhanced error handling
    log "🏗️  Building Next.js application for production..."
    if ! npm run build; then
        log_error "Next.js build failed"
        exit 1
    fi
    log "✅ Production build completed successfully"
else
    log "🛠️ Development build detected"
    log "🌍 Environment: ${NODE_ENV:-development}"
fi

# Build the Next.js application
log "🏗️  Building Next.js application..."
if ! npm run build; then
    log_error "Next.js build failed"
    exit 1
fi
log "✅ Build completed successfully"
