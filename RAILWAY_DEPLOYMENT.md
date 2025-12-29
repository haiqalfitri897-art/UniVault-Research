# Railway Deployment Guide - UniVault Research Backend

This guide provides step-by-step instructions to deploy the UniVault Research backend to Railway.

## 🚀 What is Railway?

Railway is a modern cloud platform that makes deploying applications simple. It:
- Reads your code directly from GitHub
- Automatically builds Docker containers
- Deploys with one click
- Provides monitoring and logs
- Scales automatically
- Has a generous free tier

## 📋 Prerequisites

1. **GitHub Account** - Your code must be on GitHub
2. **Railway Account** - Free at https://railway.app
3. **Backend Code** - Already configured and ready in `/backend`

## 🎯 Step-by-Step Deployment

### Step 1: Create Railway Account

1. Go to https://railway.app
2. Click "Start a New Project"
3. Click "Create a new project"
4. Choose "GitHub" (if not automatic)
5. Authorize Railway to access your GitHub account

### Step 2: Connect Your Repository

1. Railway will show your GitHub repositories
2. Find and select `UniVault-Research`
3. Click "Deploy Now"

Railway will automatically:
- Detect the Docker configuration
- Read `backend/Dockerfile`
- Start building the container

### Step 3: Configure Environment Variables

After the initial build, configure the environment:

1. **In Railway Dashboard:**
   - Go to your project
   - Click the "backend" service
   - Click "Variables" tab
   - Click "Add Variable" for each:

**Required Variables:**

```
NODE_ENV              production
JWT_SECRET            [See "Generate JWT_SECRET" section below]
FRONTEND_URL          [Will update later - initially leave empty or use placeholder]
PORT                  5000
```

**Optional Variables (add for enhanced features):**
```
LOG_LEVEL            debug
DATABASE_URL         [Add later if using database]
```

#### Generate JWT_SECRET

This must be a strong random string. Open a terminal and run:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and paste it as `JWT_SECRET` in Railway.

Example output (use something like this):
```
a7f8c2e9d3b1f4a6c8e2d9a1f3b5c7e9a1f3d5c7a9b1e3d5f7a9c1e3f5a7b9
```

### Step 4: Verify Port Configuration

Railway should automatically:
- Read PORT from environment (5000)
- Expose port 5000
- Create public URL

Check under "Variables" that PORT=5000 is set.

### Step 5: Monitor Deployment

1. **Watch Build Progress:**
   - Click "Deployments" tab
   - See real-time build logs
   - Wait for "Build Successful"

2. **Check Service Health:**
   - Click "Logs" tab
   - Look for: `🚀 Server is running on http://localhost:5000`
   - No errors should appear

3. **Get Your Public URL:**
   - In the Railway dashboard
   - Look for "Public URL" or "Domain"
   - Copy your URL (looks like: `https://univault-backend-production-xxxx.railway.app`)

**Save this URL - you'll need it!**

### Step 6: Test Your Deployment

Test the backend is working:

```bash
# Replace with your actual URL
curl https://your-railway-url/api/health

# You should see:
# {"status":"ok","message":"Server is running"}
```

### Step 7: Configure Auto-Deployments (Optional but Recommended)

Railway automatically deploys when you push to GitHub:

1. **Default Behavior:**
   - Every push to `main` branch auto-deploys
   - Takes 2-3 minutes to build and deploy
   - No configuration needed!

2. **View Deployments:**
   - Click "Deployments" tab
   - Each push shows a new deployment
   - Current deployment marked as "Active"

## 🔧 Configuration Details

### Backend Start Command

Railway automatically uses the Dockerfile, which runs:
```bash
npm start
```

This executes from `backend/package.json`:
```json
"scripts": {
  "start": "node src/server.js"
}
```

**No custom start command needed!**

### Environment Variables Reference

| Variable | Purpose | Example |
|----------|---------|---------|
| `NODE_ENV` | Production mode | `production` |
| `JWT_SECRET` | Token signing key | 64-char random string |
| `PORT` | Server port | `5000` |
| `FRONTEND_URL` | CORS whitelist | `https://your-frontend.vercel.app` |

### Port Configuration

- **Railway Port:** 5000 (internal)
- **Public Port:** Automatically handled by Railway
- **Public URL:** Automatically generated

You access the service via Railway's public URL, not port 5000.

## 🧪 Testing Your Backend

Once deployed:

### Test 1: Health Check
```bash
curl https://your-railway-url/api/health
```

Expected response:
```json
{"status":"ok","message":"Server is running"}
```

### Test 2: Registration Endpoint
```bash
curl -X POST https://your-railway-url/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "TestPassword123!"
  }'
```

Expected response:
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "1234567890",
    "email": "test@example.com",
    "name": "Test User"
  }
}
```

### Test 3: Login Endpoint
```bash
curl -X POST https://your-railway-url/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123!"
  }'
```

### Test 4: Protected Endpoint (Dashboard)
```bash
# Get a token from login first, then:
curl -X GET https://your-railway-url/api/dashboard \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 📊 Monitor Your Deployment

### View Logs

1. **In Railway Dashboard:**
   - Click "Logs" tab
   - Real-time logs appear
   - Filter by date/time

2. **Common Log Messages:**
   ```
   🚀 Server is running on http://localhost:5000   [Good - started]
   Error: JWT_SECRET not found                      [Bad - missing var]
   EADDRINUSE: address already in use               [Bad - port conflict]
   ```

### Performance Metrics

1. **Deployments Tab:**
   - Build time
   - Deployment status
   - Resource usage

2. **Settings Tab:**
   - Current environment
   - Variables
   - Restart service

## 🔐 Security Configuration

### CORS Configuration (Already Set)

The backend includes CORS configured for:
- Your frontend URL (set in `FRONTEND_URL` variable)
- Development: `http://localhost:3000`

### Authentication (Already Set)

- JWT tokens expire in 7 days
- Passwords hashed with bcryptjs
- Protected endpoints require token

### Environment Variables Security

**Important:**
- Never commit secrets to Git
- Always set variables in Railway dashboard
- Use strong JWT_SECRET (32+ characters)
- Rotate secrets periodically

## 📱 Custom Domain (Optional)

### Add Custom Domain

1. **Purchase Domain:**
   - Use Namecheap, GoDaddy, or other registrar
   - Example: `api.yourdomain.com`

2. **In Railway Dashboard:**
   - Go to service settings
   - Find "Domains" section
   - Add custom domain
   - Railway provides DNS instructions

3. **Configure DNS:**
   - Update registrar's DNS settings
   - Point to Railway's nameservers
   - Wait for propagation (5-48 hours)

4. **Result:**
   - Access at: `https://api.yourdomain.com`
   - HTTPS automatic (Railway handles certs)

## 🔄 Continuous Deployment

### Auto-Deployment on Push

Every time you push to GitHub `main` branch:

1. **Railway detects push**
2. **Pulls latest code**
3. **Rebuilds Docker image**
4. **Tests build**
5. **Deploys new version**
6. **Restarts service**

**Time:** Usually 3-5 minutes

### Rollback if Needed

If deployment fails:

1. **In Deployments tab:**
   - Click previous deployment
   - Click "Redeploy"
   - Or manually rollback

2. **Check logs:**
   - Find error in build logs
   - Fix code locally
   - Push fix to GitHub
   - Auto-redeploy

## 🆘 Troubleshooting

### "Build Failed" Error

**Check:**
1. Build logs for specific error
2. Node version compatibility (18+)
3. `package.json` syntax
4. Missing dependencies

**Fix:**
1. Check logs in Railway
2. Fix issue locally
3. Commit and push
4. Railway auto-rebuilds

### "Server won't start" Error

**Check logs for:**
```
Error: JWT_SECRET is not defined
Error: listen EADDRINUSE: address already in use :::5000
Error: Cannot find module
```

**Solutions:**
1. **Missing JWT_SECRET:**
   - Go to Variables in Railway
   - Add JWT_SECRET variable
   - Service auto-restarts

2. **Port in use:**
   - Railway handles this automatically
   - Check PORT variable is 5000

3. **Missing dependency:**
   - Run `npm install` locally
   - Commit `package-lock.json`
   - Push to trigger rebuild

### "Can't connect from frontend" Error

**Check:**
1. FRONTEND_URL is set correctly in Railway
2. FRONTEND_URL matches your actual frontend URL
3. Backend public URL is correct
4. No typos in API endpoint

**Solution:**
1. Verify Railway public URL (copy from dashboard)
2. Update FRONTEND_URL if changed
3. Verify frontend VITE_API_URL points to Railway URL

### "CORS Error" in Browser

**Error in console:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Fix:**
1. Backend has CORS middleware (already configured)
2. Ensure FRONTEND_URL in Railway matches frontend domain
3. Frontend VITE_API_URL must match Railway public URL
4. Restart both services after variable changes

## 📈 Scaling & Performance

### Free Tier Limits

- **Memory:** Shared resources
- **Bandwidth:** 5GB/month included
- **Deployments:** Unlimited
- **Services:** 2 free services per project

### If You Need More

Railway paid plans start at $5/month and include:
- Dedicated resources
- More bandwidth
- Better performance
- Priority support

## 💾 Database Setup (Future)

When ready to add persistence:

### MongoDB Atlas (Free)

1. Sign up at https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Add `DATABASE_URL` to Railway variables
5. Update backend code to use MongoDB

### PostgreSQL on Railway

1. In Railway project: "Add Service"
2. Select "PostgreSQL"
3. Railway auto-creates database
4. Adds `DATABASE_URL` variable automatically
5. Update backend code to use PostgreSQL

## 📝 Environment Variables Checklist

Before deploying to production:

- [ ] `NODE_ENV=production`
- [ ] `JWT_SECRET=` (32+ character random string)
- [ ] `FRONTEND_URL=` (your frontend URL)
- [ ] `PORT=5000`
- [ ] No hardcoded secrets in code
- [ ] All variables set in Railway dashboard
- [ ] Not committed to Git

## 🎯 Deployment Verification Checklist

After deployment:

- [ ] Railway shows "Active" deployment
- [ ] No errors in build logs
- [ ] No errors in runtime logs
- [ ] Health check works (`/api/health`)
- [ ] Registration endpoint works
- [ ] Login endpoint works
- [ ] Protected endpoints require token
- [ ] CORS errors don't occur
- [ ] Public URL is accessible

## 📞 Support

- **Railway Docs:** https://railway.app/docs
- **Railway Support:** https://railway.app/support
- **GitHub Issues:** Add to your repo
- **Discord Community:** Railway Discord

## 🚀 Next Steps

1. ✅ Deploy backend to Railway (this guide)
2. ⬜ Deploy frontend to Vercel
3. ⬜ Update FRONTEND_URL in Railway
4. ⬜ Test full integration
5. ⬜ Add database (MongoDB/PostgreSQL)
6. ⬜ Add custom domain (optional)
7. ⬜ Monitor production

---

**Your backend will be live and accessible worldwide in just a few minutes!**

For a quick overview, see QUICK_DEPLOY.md
For full deployment options, see DEPLOYMENT.md
