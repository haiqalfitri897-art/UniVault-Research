#!/bin/bash

# UniVault Research - Production Build Script
# This script prepares the application for production deployment

set -e

echo "🚀 Building UniVault Research for Production"
echo "==========================================="

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Frontend Build
echo -e "\n${BLUE}Building Frontend...${NC}"
cd frontend

if [ ! -d "node_modules" ]; then
  echo "Installing frontend dependencies..."
  npm install
fi

echo "Building production bundle..."
npm run build

if [ -d "dist" ]; then
  echo -e "${GREEN}✅ Frontend built successfully${NC}"
  echo "Output directory: frontend/dist"
else
  echo -e "${YELLOW}⚠️  Frontend build may have failed${NC}"
  exit 1
fi

cd ..

# Backend Check
echo -e "\n${BLUE}Checking Backend...${NC}"
cd backend

if [ ! -d "node_modules" ]; then
  echo "Installing backend dependencies..."
  npm install
fi

# Check for production env file
if [ ! -f ".env.production" ]; then
  echo -e "${YELLOW}⚠️  .env.production not found${NC}"
  echo "Copy from .env.example and update with your settings:"
  echo "  cp .env.production .env.production"
  echo "  nano .env.production"
fi

echo -e "${GREEN}✅ Backend dependencies ready${NC}"

cd ..

echo -e "\n${GREEN}✅ Production build complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Update .env.production files with your production URLs"
echo "2. Choose a deployment platform (Railway, Render, Fly.io, etc.)"
echo "3. Follow DEPLOYMENT.md for your chosen platform"
echo ""
echo "Frontend output: frontend/dist/"
echo "Backend ready to deploy from: backend/"
