# Railway Deployment - Quick Setup (5 minutes)

## Step 1: Prepare Your Code
```bash
# Ensure everything is committed to GitHub
git add .
git commit -m "Deploy to Railway"
git push origin main
```

## Step 2: Create Railway Account
- Go to https://railway.app
- Click "Start a New Project"
- Select "Deploy from GitHub"
- Authorize Railway to access your repositories

## Step 3: Select Your Repository
- Search for "UniVault-Research"
- Click to select it
- Railway automatically detects the Dockerfile in `/backend`

## Step 4: Configure Environment Variables
In the Railway dashboard, click "Variables" and add these:

| Name | Value |
|------|-------|
| `NODE_ENV` | `production` |
| `JWT_SECRET` | [See below] |
| `FRONTEND_URL` | `https://your-frontend-url.vercel.app` |
| `PORT` | `5000` |

### Generate JWT_SECRET
Run this in your terminal and copy the output:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Step 5: Deploy
- Click "Deploy" button
- Wait for deployment to complete (1-2 minutes)
- Check "Deployments" tab for "Active" status

## Step 6: Get Your Public URL
- Go to "Settings"
- Find "Public URL" or look in Deployments
- Will look like: `https://univault-backend-production-xxxx.railway.app`

## Step 7: Test Your Backend
```bash
# Replace with your actual Railway URL
RAILWAY_URL="https://your-railway-url"

# Health check (should return 200)
curl $RAILWAY_URL/api/health

# Register user
curl -X POST $RAILWAY_URL/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Password123"
  }'

# Login
curl -X POST $RAILWAY_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123"
  }'
```

## Step 8: Update Frontend
1. Deploy frontend to Vercel or Netlify
2. Update VITE_API_URL to your Railway URL
3. Update FRONTEND_URL in Railway to your frontend URL
4. Redeploy backend from Railway dashboard

## Verify Success
You'll see these in logs:
```
🚀 Server is running on http://localhost:5000
✅ Backend is production-ready!
```

## Your Endpoints
Once deployed, access your API at:
- **Health:** `GET /api/health`
- **Register:** `POST /api/auth/register`
- **Login:** `POST /api/auth/login`
- **Profile:** `GET /api/auth/profile` (requires token)
- **Dashboard:** `GET /api/dashboard` (requires token)

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Build failed | Check "Deployments" logs, verify package.json |
| Port error | PORT is set to 5000 in variables |
| CORS error | Ensure FRONTEND_URL matches your frontend domain |
| JWT errors | Verify JWT_SECRET is set and not empty |
| Service won't start | Check NODE_ENV=production is set |

## Important Notes
- Railway automatically rebuilds when you push to GitHub
- Each deployment gets a new public URL initially (can set custom domain)
- Logs are visible in "Logs" tab of Railway dashboard
- Environment variables are secret (not visible in code)
- Service sleeps if no activity for 24+ hours (free tier), wakes on request

## Next Steps
1. ✅ Deploy backend to Railway (follow steps above)
2. 📦 Deploy frontend to Vercel
3. 🔗 Update FRONTEND_URL and test CORS
4. 🎯 Add custom domain (optional, in Railway Settings)
5. 📊 Monitor deployment and logs

---

**For detailed information, see:**
- [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md) - Comprehensive guide
- [API.md](API.md) - API endpoints reference
- [DEPLOYMENT.md](DEPLOYMENT.md) - All deployment platforms
