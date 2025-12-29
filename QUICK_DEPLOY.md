# Quick Deployment Guide - Railway

Railway is the fastest way to deploy both frontend and backend. Follow this step-by-step guide.

## 🚀 Quick Deployment in 10 Minutes

### Prerequisites
- GitHub account
- Railway account (free tier available)
- Vercel account (free tier available)

---

## Step 1: Deploy Backend to Railway

### 1.1 Create Railway Account
1. Go to https://railway.app
2. Click "Start a New Project"
3. Sign up with GitHub

### 1.2 Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub"
3. Select your `UniVault-Research` repository
4. Authorize Railway to access your repo

### 1.3 Configure Backend Service
1. Railway auto-detects the Dockerfile in `backend/`
2. Set environment variables:

**Click "Add Variable" and add these:**
```
NODE_ENV              production
JWT_SECRET            [generate below]
FRONTEND_URL          [you'll update this later]
```

**Generate JWT_SECRET:**
Open terminal and run:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Copy the output and paste into JWT_SECRET field.

### 1.4 Deploy
1. Railway automatically builds and deploys
2. Wait for deployment to complete
3. Get your backend URL:
   - Click your service
   - Copy the URL (looks like: `https://univault-backend-production-xxxx.railway.app`)

**Save this URL - you'll need it next!**

---

## Step 2: Deploy Frontend to Vercel

### 2.1 Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub

### 2.2 Create New Project
1. Click "Add New..." → "Project"
2. Select `UniVault-Research` repository
3. Click "Import"

### 2.3 Configure Frontend
1. **Project Name:** `univault-research-frontend` (or your choice)
2. **Framework Preset:** Select "Vite"
3. **Root Directory:** Select `frontend`
4. **Build Command:** `npm run build` (should be auto-detected)
5. **Output Directory:** `dist` (should be auto-detected)

### 2.4 Add Environment Variables
Click "Environment Variables" and add:
```
VITE_API_URL    https://your-railway-backend-url/api
```
(Replace with your actual Railway backend URL from Step 1.4)

### 2.5 Deploy
1. Click "Deploy"
2. Vercel builds and deploys automatically
3. Wait for deployment to complete
4. Get your frontend URL:
   - Click "Visit" to see your live app
   - Your URL will be shown (looks like: `https://univault-research-frontend.vercel.app`)

**Save this URL - you'll use it next!**

---

## Step 3: Update Backend FRONTEND_URL

Now that you have your Vercel frontend URL, update your Railway backend:

### 3.1 Update Environment Variable
1. Go back to Railway dashboard
2. Click on your backend service
3. Go to "Variables" tab
4. Click "FRONTEND_URL"
5. Update the value to your Vercel URL
6. Save

**Railway automatically redeploys when you change variables!**

---

## Step 4: Test Your Deployment

### 4.1 Test Backend
Open a terminal and run:
```bash
# Replace with your actual URL
curl https://your-railway-backend-url/api/health

# You should see:
# {"status":"ok","message":"Server is running"}
```

### 4.2 Test Frontend
1. Open your Vercel URL in browser
2. You should see the UniVault Research login page
3. Click "Create one" to register
4. Create a test account:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `TestPassword123!`
5. Click "Create Account"
6. You should be logged in and see the dashboard!

### 4.3 Test API Call
1. On dashboard, verify data loads (stats, projects, activity)
2. Click Logout
3. Login again with same credentials

**If everything works, you're deployed! 🎉**

---

## Step 5: (Optional) Add Custom Domain

### 5.1 Domain Setup in Railway
1. Go to Railway backend service
2. Click "Settings"
3. Look for "Domains" section
4. Add your custom domain (e.g., `api.yourdomain.com`)
5. Follow DNS setup instructions

### 5.2 Domain Setup in Vercel
1. Go to Vercel project settings
2. Click "Domains"
3. Add your custom domain (e.g., `yourdomain.com`)
4. Follow DNS setup instructions

---

## 📊 What You Now Have

| Service | URL | Status |
|---------|-----|--------|
| Backend | https://railway-url.railway.app/api | 🟢 Live |
| Frontend | https://vercel-url.vercel.app | 🟢 Live |
| Database | In-memory (development) | ⚠️ Resets on deploy |

---

## 🚀 Next Steps (Optional but Recommended)

### 1. Add Real Database
Currently using in-memory storage (resets on redeploy). Add a real database:

**MongoDB Atlas (Free):**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string
5. Add `DATABASE_URL` to Railway variables
6. Use code from `backend/DATABASE_EXAMPLES.js`

**PostgreSQL on Railway:**
1. In Railway project, click "New" → "Database"
2. Select "PostgreSQL"
3. Railway auto-creates it and adds `DATABASE_URL`

### 2. Set Up Error Tracking
Add error tracking to catch issues:
- Sentry: https://sentry.io (has free tier)
- LogRocket: https://logrocket.com

### 3. Enable Automatic Backups
For production databases, enable backups in the database settings.

### 4. Monitor Performance
- Railway: Dashboard shows logs, metrics
- Vercel: Analytics tab shows performance

---

## 🔧 Troubleshooting

### App won't start
1. Check Railway logs:
   - Click service → "Deployments" → "View Logs"
   - Look for error messages
2. Common issues:
   - JWT_SECRET missing → Add environment variable
   - NODE_ENV not set → Add `NODE_ENV=production`
   - Port issue → Backend uses PORT 5000

### CORS Errors
1. Check backend logs for CORS errors
2. Verify FRONTEND_URL is set correctly
3. Should match your Vercel URL exactly

### Can't login
1. Check browser console for errors (F12)
2. Check backend logs for API errors
3. Verify VITE_API_URL is correct in Vercel
4. Test API manually: `curl https://your-api.railway.app/api/auth/login`

### Pages show blank
1. Check Vercel build logs
2. Verify frontend built successfully
3. Check `frontend/dist/` exists
4. Clear browser cache (Ctrl+Shift+Delete)

---

## 📝 Deployment URLs Reference

Save these URLs for future reference:

```
Backend API:  https://your-railway-url/api
Frontend:     https://your-vercel-url
Verify API:   https://your-railway-url/api/health

Environment Variables Set:
Backend:  NODE_ENV=production, JWT_SECRET=***, FRONTEND_URL=***
Frontend: VITE_API_URL=https://your-railway-url/api
```

---

## 🔐 Security Notes

1. **JWT_SECRET** - Strong random string, never expose
2. **CORS** - Only allows requests from your frontend URL
3. **HTTPS** - Enabled automatically on both platforms
4. **Database** - Currently in-memory, add real DB for production

---

## 💰 Cost

| Service | Free Tier | Cost if Needed |
|---------|-----------|----------------|
| Railway Backend | 5GB bandwidth | $5/month |
| Vercel Frontend | Unlimited | Free for most use cases |
| **Total** | **Mostly Free** | **~$5/month** |

---

## 📞 Support

- Railway Support: https://railway.app/support
- Vercel Support: https://vercel.com/support
- Check platform dashboards for logs and metrics

---

## Next Time You Deploy

If you make changes and want to redeploy:

1. **Push to GitHub** - Just push your changes to main branch
2. **Both platforms auto-deploy** - Railway and Vercel watch your repo
3. **No manual steps needed** - Everything redeployes automatically!

This is CI/CD in action! 🚀

---

**Congratulations! Your app is live on the internet!** 🎉
