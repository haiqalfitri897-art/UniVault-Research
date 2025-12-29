#!/bin/bash

# UniVault Research - Project Setup Script
# This script sets up both frontend and backend for development

set -e

echo "🚀 UniVault Research - Full Stack Setup"
echo "========================================"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Backend Setup
echo -e "\n${BLUE}Setting up Backend...${NC}"
cd backend

if [ ! -d "node_modules" ]; then
  echo "Installing backend dependencies..."
  npm install
else
  echo "Backend dependencies already installed"
fi

if [ ! -f ".env" ]; then
  echo "Creating .env file from template..."
  cp .env.example .env
  echo "Created .env file. Update with your settings if needed."
fi

cd ..

# Frontend Setup
echo -e "\n${BLUE}Setting up Frontend...${NC}"
cd frontend

if [ ! -d "node_modules" ]; then
  echo "Installing frontend dependencies..."
  npm install
else
  echo "Frontend dependencies already installed"
fi

if [ ! -f ".env" ]; then
  echo "Creating .env file from template..."
  cp .env.example .env
  echo "Created .env file. Update with your settings if needed."
fi

cd ..

echo -e "\n${GREEN}✅ Setup Complete!${NC}"
echo ""
echo "To start development:"
echo ""
echo "Terminal 1 - Backend:"
echo "  cd backend && npm run dev"
echo ""
echo "Terminal 2 - Frontend:"
echo "  cd frontend && npm run dev"
echo ""
echo "Frontend will be available at: http://localhost:3000"
echo "Backend will be available at: http://localhost:5000"
echo ""
echo "📖 For more details, see DEVELOPMENT.md"
