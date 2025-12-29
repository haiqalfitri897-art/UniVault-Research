# Railway Deployment - Complete Checklist

## ✅ Configuration Fixed

Your project has been updated to work correctly with Railway:

### Files Created/Modified
- ✅ **`/Dockerfile`** - New root-level Dockerfile (references backend subdirectory)
- ✅ **`/railway.json`** - New root configuration for Railway
- ✅ **`/.dockerignore`** - Updated to optimize build
- ✅ **`/RAILWAY_FIX.md`** - Detailed explanation of changes
- ✅ **`/test-railway-config.sh`** - Local testing script

### Why This Fixes Your Issue

**Before:** Railway couldn't find the backend directory because:
- `/backend/Dockerfile` had relative paths that didn't work from root
- No `/railway.json` to tell Railway where to find the Dockerfile

**After:** Railway can now build successfully because:
- `/Dockerfile` at root with proper path references (`backend/package*.json`, `backend/src`)
- `/railway.json` tells Railway to use root Dockerfile
- Correct working directory and build steps

## 📋 Pre-Deployment Checklist

### Local Verification (Optional)
```bash
# Test the configuration locally
./test-railway-config.sh
```

This will:
- Build the Docker image locally
- Start the container
- Test the health endpoint
- Verify everything works before Railway build

### Code Preparation
```bash
cd /workspaces/UniVault-Research

# Stage all changes
git add .

# Commit with a clear message
git commit -m "Fix Railway deployment - use root Dockerfile with proper paths"

# Push to GitHub
git push origin main
```

## 🚀 Deployment Steps

### Step 1: Redeploy on Railway
1. Go to **https://railway.app**
2. Open your project
3. Click **Deployments**
4. Click **Redeploy Latest Commit** 
   - OR wait for auto-deploy (if enabled)

### Step 2: Monitor Build Progress
In the Deployments tab, you should see:
```
Building... ⏳
  → Dockerfile found ✓
  → Starting build from root ✓
  → COPY backend/package*.json ✓
  → npm install --production ✓
  → COPY backend/src ./src ✓
  → EXPOSE 5000 ✓
  → npm start ✓
Active ✅
```

### Step 3: Check Logs
Click **Logs** to see:
```
🚀 Server is running on http://localhost:5000
✅ Backend is production-ready!
```

If you see errors, check the full log message in Railway dashboard.

### Step 4: Get Your Public URL
The URL format will be:
```
https://[service-name]-[random]-production.up.railway.app
```

You'll see it in:
- **Settings** tab → Public URL section
- **Logs** output
- **Deployments** tab

## 🧪 Test Your Deployment

Once Railway shows "Active", test the endpoints:

### Health Check
```bash
RAILWAY_URL="https://your-railway-url"

# Should return 200 and {"status":"ok",...}
curl $RAILWAY_URL/api/health
```

### Register User
```bash
curl -X POST $RAILWAY_URL/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "TestPass123"
  }'
```

Expected response:
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Login
```bash
curl -X POST $RAILWAY_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123"
  }'
```

### Get Profile (Protected)
```bash
# Use the token from login response
TOKEN="your_token_here"

curl -X GET $RAILWAY_URL/api/auth/profile \
  -H "Authorization: Bearer $TOKEN"
```

## ⚙️ Environment Variables

Make sure these are still set in Railway:

| Name | Value | Status |
|------|-------|--------|
| `NODE_ENV` | `production` | ✅ Set |
| `PORT` | `5000` | ✅ Set |
| `JWT_SECRET` | 32+ character random string | ✅ Set |
| `FRONTEND_URL` | Your frontend URL | Update after frontend deploy |

### If You Need to Change Variables
1. Go to Railway dashboard
2. Click project
3. Go to **Variables** tab
4. Edit and save
5. Service auto-restarts with new variables

## 🔗 Connect Frontend

Once backend is working:

1. Get your Railway public URL
2. Deploy frontend to Vercel/Netlify
3. Update frontend `.env`:
   ```
   VITE_API_URL=https://your-railway-url/api
   ```
4. Redeploy frontend
5. Update Railway backend `FRONTEND_URL`:
   ```
   FRONTEND_URL=https://your-frontend-url
   ```
6. Restart backend service

## ❌ Troubleshooting

### Build Fails
**Error:** "No Dockerfile found" or "Invalid context"
- Solution: Verify `/Dockerfile` exists at project root
- Check: `ls -la /path/to/repo/Dockerfile`

**Error:** "COPY backend/package.json failed"
- Solution: Verify backend/package.json exists
- Check: `ls -la backend/package.json`

### Application Won't Start
**Error:** "Cannot find module 'express'"
- Solution: Dependencies not installed
- Check: Logs show `npm install` completed successfully

**Error:** "JWT_SECRET is not defined"
- Solution: Environment variable not set
- Fix: Add JWT_SECRET to Railway Variables tab

### Port Issues
**Error:** "Port already in use"
- Solution: Change PORT to 5001 in Railway Variables
- Note: Server listens on any port via PORT env var

### CORS Errors in Frontend
**Error:** "CORS policy: blocked by cors"
- Solution: Update FRONTEND_URL in Railway
- Must match exactly: `https://subdomain.domain.com`
- Include protocol (https://) and domain

## 📊 Expected File Structure

After these changes, your project should have:

```
/workspaces/UniVault-Research/
├── Dockerfile              ← NEW: Root-level build file
├── railway.json            ← NEW: Railway configuration
├── backend/
│   ├── Dockerfile          ← Keep for reference
│   ├── package.json        ← No changes
│   ├── src/
│   │   ├── server.js       ← No changes
│   │   ├── controllers/
│   │   ├── middleware/
│   │   └── routes/
│   └── ...
├── frontend/
│   ├── ...
│   └── ...
├── RAILWAY_FIX.md          ← NEW: Detailed explanation
├── test-railway-config.sh  ← NEW: Local test script
└── ...
```

## 🎯 Success Indicators

You'll know deployment succeeded when:

✅ Deployments tab shows "Active"
✅ Logs show "Server is running on http://localhost:5000"
✅ Health endpoint returns `{"status":"ok"}`
✅ Can register and login successfully
✅ Protected routes require valid JWT token
✅ Public URL is stable (doesn't change on restart)

## 📞 Getting Help

If deployment still fails:

1. **Check Build Logs** - Most detailed error info
   - Railway Deployments → click deployment → Logs
   
2. **Verify Configuration**
   - Dockerfile exists: `/Dockerfile`
   - railway.json exists: `/railway.json`
   - Backend exists: `/backend/package.json`, `/backend/src/server.js`

3. **Test Locally**
   ```bash
   ./test-railway-config.sh
   ```

4. **Review Documentation**
   - [RAILWAY_FIX.md](RAILWAY_FIX.md) - Why changes were made
   - [API.md](API.md) - API endpoints
   - [DEVELOPMENT.md](DEVELOPMENT.md) - Development setup

## ✨ Next Steps

1. ✅ Commit changes: `git add . && git commit -m "Fix Railway config"`
2. ✅ Push to GitHub: `git push origin main`
3. ✅ Redeploy on Railway (auto-deploy should trigger)
4. ✅ Monitor Deployments tab
5. ✅ Test endpoints once Active
6. ✅ Get public URL
7. ✅ Deploy frontend
8. ✅ Connect frontend to backend URL
9. ✅ Test full-stack integration

---

**Status:** ✅ All configuration complete - ready to deploy!

**Last Updated:** December 29, 2025
**Configuration Version:** 1.0
