# Deployment Guide - UniVault Research

This guide provides step-by-step instructions to deploy the UniVault Research application to production.

## 🚀 Deployment Options

We'll cover deployments using **free/affordable** tiers:
- **Backend:** Railway, Render, or Fly.io
- **Frontend:** Vercel, Netlify, or GitHub Pages

## 📋 Prerequisites

- Git repository (already set up)
- GitHub account
- Cloud platform accounts (Railway/Render/Vercel/Netlify)

---

## Option 1: Deploy with Railway + Vercel (Recommended)

### Backend Deployment on Railway

Railway offers a simple, Docker-based deployment with automatic builds.

#### Step 1: Prepare Backend for Production

1. Update `backend/.env.example`:
```bash
PORT=5000
NODE_ENV=production
JWT_SECRET=generate_a_strong_random_string_here
JWT_EXPIRE=7d
FRONTEND_URL=https://your-frontend-url.vercel.app
```

2. The Dockerfile is already configured in `backend/Dockerfile`

#### Step 2: Deploy to Railway

1. Go to https://railway.app
2. Click "Start a New Project"
3. Select "Deploy from GitHub"
4. Connect your GitHub account and select the `UniVault-Research` repo
5. Railway will auto-detect the Dockerfile

**Environment Variables on Railway:**
- Go to project settings
- Add environment variables:
  - `NODE_ENV=production`
  - `JWT_SECRET=your_strong_random_secret`
  - `FRONTEND_URL=https://your-vercel-app.vercel.app`

6. Railway will automatically build and deploy
7. Get your backend URL from the Railway dashboard (e.g., `https://unicorn-production-xxxx.railway.app`)

### Frontend Deployment on Vercel

Vercel is optimized for Vite/React apps and has automatic deployments from GitHub.

#### Step 1: Prepare Frontend for Production

1. Update `frontend/.env.production`:
```bash
VITE_API_URL=https://your-railway-backend.railway.app/api
```

2. The `vite.config.js` is already configured

#### Step 2: Deploy to Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Import the `UniVault-Research` repository
4. **Framework:** Select "Vite"
5. **Root Directory:** Select `frontend`
6. **Build Command:** `npm run build`
7. **Output Directory:** `dist`

**Environment Variables:**
- `VITE_API_URL=https://your-railway-backend.railway.app/api`

8. Click "Deploy"
9. Vercel will automatically deploy and give you a public URL

#### Step 3: Update Backend FRONTEND_URL

After getting your Vercel URL:
1. Go back to Railway project
2. Update `FRONTEND_URL` environment variable to your Vercel URL
3. Railway will auto-redeploy

---

## Option 2: Deploy with Render + Vercel

### Backend Deployment on Render

Render is another great option with good free tier.

#### Step 1: Deploy to Render

1. Go to https://render.com
2. Click "New +"
3. Select "Web Service"
4. Connect your GitHub repository
5. Select `UniVault-Research`
6. **Name:** `univault-backend`
7. **Environment:** `Node`
8. **Build Command:** `cd backend && npm install`
9. **Start Command:** `cd backend && npm start`
10. **Plan:** Free tier available
11. Add environment variables:
    - `NODE_ENV=production`
    - `JWT_SECRET=your_random_secret`
    - `FRONTEND_URL=https://your-vercel-app.vercel.app`

12. Deploy! You'll get a URL like `https://univault-backend.onrender.com`

### Frontend Deployment on Vercel

Same as Option 1 above.

---

## Option 3: Deploy with Fly.io + Netlify

### Backend Deployment on Fly.io

Fly.io offers auto-scaling and global deployment.

#### Step 1: Install Fly CLI

```bash
# On macOS
brew install flyctl

# On Linux/Windows, see https://fly.io/docs/getting-started/installing-flyctl/
```

#### Step 2: Deploy Backend

```bash
cd backend

# Login to Fly.io
flyctl auth login

# Create new Fly app
flyctl launch

# Follow the prompts:
# - Choose an app name (e.g., univault-backend)
# - Choose region
# - Don't add Postgres/Redis for now

# Set environment variables
flyctl secrets set NODE_ENV=production
flyctl secrets set JWT_SECRET=your_random_secret
flyctl secrets set FRONTEND_URL=https://your-netlify-app.netlify.app

# Deploy
flyctl deploy
```

Get your backend URL from the Fly.io dashboard.

### Frontend Deployment on Netlify

1. Go to https://netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. **Base directory:** `frontend`
5. **Build command:** `npm run build`
6. **Publish directory:** `dist`
7. Add environment variable: `VITE_API_URL=https://your-fly-backend.fly.dev/api`
8. Deploy!

---

## Production Environment Variables

### Backend Production (.env)

```bash
# Server
PORT=5000
NODE_ENV=production

# JWT
JWT_SECRET=use_a_strong_random_string_min_32_chars
JWT_EXPIRE=7d

# CORS
FRONTEND_URL=https://your-production-frontend.domain.com
```

**Generate JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Frontend Production (.env.production)

```bash
VITE_API_URL=https://your-production-backend.domain.com/api
```

---

## Database Integration for Production

Once deployed, you'll want to add a real database:

### MongoDB Atlas (Free tier available)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/dbname`
5. Add to backend environment variables:
```bash
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/dbname
```
6. Use the examples in `backend/DATABASE_EXAMPLES.js` to integrate

### PostgreSQL (Supabase or Railway)

Both platforms offer PostgreSQL:
- Railway: Auto-provisioned in project
- Supabase: Free PostgreSQL with REST API

---

## Health Checks & Monitoring

Test your deployment:

```bash
# Backend health check
curl https://your-backend-url/api/health

# Frontend test
curl https://your-frontend-url
```

### Monitor Your Apps

- **Railway:** Built-in monitoring dashboard
- **Render:** Built-in logs and metrics
- **Fly.io:** `flyctl status` and `flyctl logs`
- **Vercel:** Deployment analytics
- **Netlify:** Build and deploy logs

---

## Custom Domain Setup

### Connect Custom Domain to Vercel

1. Buy domain (Namecheap, GoDaddy, etc.)
2. Go to Vercel project settings
3. Add domain under "Domains"
4. Add CNAME/A records as shown
5. Wait for DNS propagation (5-48 hours)

### Connect Custom Domain to Railway

1. Go to Railway project settings
2. Add domain
3. Update DNS records at your registrar

### Connect Custom Domain to Fly.io

```bash
flyctl domains create yourdomain.com
# Then configure DNS records
```

---

## CI/CD Pipeline

All platforms support automatic deployments on push:

- **Push to main branch** → Automatically builds and deploys
- **Pull requests** → Preview deployments (Vercel/Netlify)

---

## Security Checklist

- [ ] Use strong JWT_SECRET (32+ characters)
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS (all platforms do this)
- [ ] Configure CORS properly
- [ ] Use environment variables (never commit secrets)
- [ ] Set up database backups
- [ ] Monitor logs for errors
- [ ] Use strong database passwords
- [ ] Enable rate limiting (future enhancement)

---

## Troubleshooting

### Backend won't start
```bash
# Check logs on your platform
# Verify NODE_ENV and JWT_SECRET are set
# Ensure PORT is correct
```

### CORS errors
- Check FRONTEND_URL in backend environment
- Verify it matches your actual frontend URL
- Update if you change domains

### Build failures
- Check build logs on the platform
- Ensure all dependencies are in package.json
- Verify Node version (18+ required)

### API connection fails
- Verify VITE_API_URL in frontend
- Check backend is actually running
- Test with `/api/health` endpoint

---

## Next Steps

1. Choose your deployment platforms
2. Follow the steps above for your chosen option
3. Update environment variables
4. Test the deployed app
5. Set up custom domain (optional)
6. Add database integration
7. Set up monitoring and alerts

---

## Cost Estimate (Free Tier)

| Service | Cost | Limits |
|---------|------|--------|
| Railway Backend | $5/month | 5GB bandwidth free |
| Render Backend | Free | Limited resources |
| Fly.io Backend | Free | 3 shared-cpu VMs |
| Vercel Frontend | Free | Limited bandwidth |
| Netlify Frontend | Free | Limited bandwidth |
| **Total** | **~$5/month** | **Good for MVP** |

---

## Support

- Railway docs: https://railway.app/docs
- Render docs: https://render.com/docs
- Fly.io docs: https://fly.io/docs
- Vercel docs: https://vercel.com/docs
- Netlify docs: https://docs.netlify.com
