#!/bin/bash

# UniVault Research - Deploy Helper Script
# This script provides commands for deploying to various platforms

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║       UniVault Research - Deployment Helper                    ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Function to display menu
show_menu() {
  echo "Select your deployment platform:"
  echo ""
  echo "1) Railway (Recommended) - Backend + Frontend on one platform"
  echo "2) Render + Vercel - Backend on Render, Frontend on Vercel"
  echo "3) Fly.io + Netlify - Backend on Fly.io, Frontend on Netlify"
  echo "4) Docker Local - Run with Docker Compose locally"
  echo "5) View Quick Deploy Guide"
  echo "6) View Full Deployment Guide"
  echo "7) Build Production"
  echo "8) Exit"
  echo ""
}

# Function for Railway
deploy_railway() {
  echo "🚀 Railway Deployment"
  echo "===================="
  echo ""
  echo "Prerequisites:"
  echo "  • GitHub account"
  echo "  • Railway account (free tier available)"
  echo "  • Vercel account for frontend"
  echo ""
  echo "Steps:"
  echo "1. Go to https://railway.app"
  echo "2. Click 'New Project' → 'Deploy from GitHub'"
  echo "3. Select UniVault-Research repo"
  echo "4. Set environment variables:"
  echo "   - NODE_ENV=production"
  echo "   - JWT_SECRET=[generate strong random string]"
  echo "   - FRONTEND_URL=[your Vercel URL]"
  echo ""
  echo "5. Deploy backend"
  echo "6. Go to https://vercel.com and import frontend"
  echo "7. Set VITE_API_URL to your Railway backend URL"
  echo "8. Update FRONTEND_URL in Railway with Vercel URL"
  echo ""
  echo "For detailed steps, see QUICK_DEPLOY.md"
}

# Function for Render
deploy_render() {
  echo "🚀 Render + Vercel Deployment"
  echo "=============================="
  echo ""
  echo "Render Backend Setup:"
  echo "1. Go to https://render.com"
  echo "2. Click 'New +' → 'Web Service'"
  echo "3. Connect GitHub repository"
  echo "4. Configure:"
  echo "   - Build Command: cd backend && npm install"
  echo "   - Start Command: cd backend && npm start"
  echo "5. Set environment variables"
  echo ""
  echo "Vercel Frontend Setup:"
  echo "1. Go to https://vercel.com"
  echo "2. Import UniVault-Research"
  echo "3. Root Directory: frontend"
  echo "4. Set VITE_API_URL environment variable"
  echo ""
  echo "For detailed steps, see DEPLOYMENT.md"
}

# Function for Fly.io
deploy_flyio() {
  echo "🚀 Fly.io + Netlify Deployment"
  echo "==============================="
  echo ""
  echo "Prerequisites:"
  echo "  • flyctl CLI installed (brew install flyctl)"
  echo "  • Fly.io account"
  echo ""
  echo "Deploy Backend:"
  echo "  cd backend"
  echo "  flyctl auth login"
  echo "  flyctl launch"
  echo "  flyctl secrets set NODE_ENV=production"
  echo "  flyctl secrets set JWT_SECRET=<your-secret>"
  echo "  flyctl deploy"
  echo ""
  echo "Deploy Frontend on Netlify:"
  echo "  1. Go to https://netlify.com"
  echo "  2. Import repo"
  echo "  3. Root Directory: frontend"
  echo "  4. Build: npm run build"
  echo "  5. Set VITE_API_URL environment variable"
  echo ""
  echo "For detailed steps, see DEPLOYMENT.md"
}

# Function for Docker
docker_local() {
  echo "🐳 Docker Local Deployment"
  echo "========================="
  echo ""
  echo "Start both services with Docker Compose:"
  echo ""
  echo "  docker-compose up -d"
  echo ""
  echo "This will:"
  echo "  • Build and start backend (port 5000)"
  echo "  • Build and start frontend (port 3000)"
  echo ""
  echo "Access:"
  echo "  • Frontend: http://localhost:3000"
  echo "  • Backend API: http://localhost:5000/api"
  echo ""
  echo "Stop services:"
  echo "  docker-compose down"
  echo ""
  echo "View logs:"
  echo "  docker-compose logs -f"
}

# Main script
while true; do
  show_menu
  read -p "Choose an option (1-8): " choice
  
  case $choice in
    1)
      deploy_railway
      ;;
    2)
      deploy_render
      ;;
    3)
      deploy_flyio
      ;;
    4)
      docker_local
      ;;
    5)
      echo "Opening QUICK_DEPLOY.md..."
      cat QUICK_DEPLOY.md | less
      ;;
    6)
      echo "Opening DEPLOYMENT.md..."
      cat DEPLOYMENT.md | less
      ;;
    7)
      echo "Building for production..."
      chmod +x build-production.sh
      ./build-production.sh
      ;;
    8)
      echo "Goodbye!"
      exit 0
      ;;
    *)
      echo "Invalid option. Please try again."
      ;;
  esac
  
  echo ""
  read -p "Press Enter to continue..."
done
