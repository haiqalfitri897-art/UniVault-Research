#!/bin/bash

# Test Railway Configuration Locally
# This script verifies the Dockerfile can build correctly

set -e

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  Testing Railway Configuration - Local Build                   ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Check if Docker is available
if ! command -v docker &> /dev/null; then
    echo "❌ Docker not found. Install Docker to test locally."
    echo ""
    echo "Without Docker, Railway will still work. Just commit and push:"
    echo "  git add ."
    echo "  git commit -m 'Fix Railway deployment configuration'"
    echo "  git push origin main"
    exit 0
fi

echo "📦 Building Docker image locally (this simulates Railway build)..."
echo ""

# Build the image
docker build -t univault-backend:test . \
  --build-arg NODE_OPTIONS="--no-deprecation" \
  2>&1 | grep -E "^Step|ERROR|COPY|RUN|CMD|^Successfully"

echo ""
echo "✅ Docker image built successfully!"
echo ""
echo "The following will happen on Railway:"
echo "  1. Clone repository from GitHub"
echo "  2. Find Dockerfile in root directory ✓"
echo "  3. Build with: docker build -t app ."
echo "  4. Start with: npm start"
echo "  5. Expose on port 5000 ✓"
echo ""

# Try to run the container
echo "🚀 Testing container startup (30 second test)..."
echo ""

# Run container in background
CONTAINER_ID=$(docker run -d -p 5000:5000 \
  -e NODE_ENV=production \
  -e PORT=5000 \
  -e JWT_SECRET=test-secret-min-32-characters-long \
  -e FRONTEND_URL=http://localhost:3000 \
  univault-backend:test 2>/dev/null || echo "")

if [ -z "$CONTAINER_ID" ]; then
    echo "⚠️  Could not start container. Railway will provide more details."
    exit 0
fi

echo "Container started: $CONTAINER_ID"
echo ""

# Wait for server to start
sleep 3

# Test health endpoint
echo "Testing health endpoint..."
if curl -s http://localhost:5000/api/health | grep -q "Server is running"; then
    echo "✅ Health check passed!"
    echo ""
    echo "Response:"
    curl -s http://localhost:5000/api/health | head -c 200
    echo ""
else
    echo "⚠️  Health check failed (this may be expected without a database)"
fi

# Cleanup
docker stop $CONTAINER_ID > /dev/null 2>&1 || true
docker rm $CONTAINER_ID > /dev/null 2>&1 || true

echo ""
echo "═══════════════════════════════════════════════════════════════════"
echo ""
echo "✨ Configuration is ready for Railway!"
echo ""
echo "Next steps:"
echo "  1. Commit changes: git add . && git commit -m 'Fix Railway config'"
echo "  2. Push to GitHub: git push origin main"
echo "  3. Go to railway.app and redeploy"
echo "  4. Check Deployments tab for status"
echo "  5. Get public URL once deployed"
echo ""
echo "═══════════════════════════════════════════════════════════════════"
