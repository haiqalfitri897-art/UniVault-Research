# Railway Deployment - Root Configuration

## Fixed Configuration

This project is now properly configured for Railway deployment from the root directory.

### What Changed

1. **Root Dockerfile** (`/Dockerfile`)
   - Properly references `/backend/package*.json`
   - Properly references `/backend/src`
   - Uses multi-stage build with production dependencies only
   - Includes health check endpoint

2. **Root railway.json** (`/railway.json`)
   - Configures Railway to use the root Dockerfile
   - Sets correct start command: `npm start`
   - Includes restart policies and health checks

3. **.dockerignore** (Updated)
   - Excludes frontend directory (not needed for backend build)
   - Excludes development files
   - Reduces image size and build time

### Why This Works

- Railway now correctly finds the Dockerfile at project root
- The Dockerfile properly references backend files from subdirectory
- Start command runs from correct working directory (`/app`)
- Health checks ensure service stays responsive

## Deployment Steps

### 1. Commit Changes
```bash
git add .
git commit -m "Fix Railway deployment configuration"
git push origin main
```

### 2. Redeploy on Railway
```
1. Go to railway.app dashboard
2. Navigate to your project
3. Click "Deployments" tab
4. Click "Redeploy Latest Commit" (or let auto-deploy trigger)
```

### 3. Monitor Build
Watch the build logs:
- Should see `COPY backend/package*.json`
- Should see `npm install --production`
- Should see `COPY backend/src ./src`
- Should see `CMD ["npm", "start"]`

### 4. Verify Success
Once deployed, test endpoints:

```bash
# Health check
curl https://your-railway-url.railway.app/api/health

# Register
curl -X POST https://your-railway-url.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Password123"
  }'

# Login
curl -X POST https://your-railway-url.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123"
  }'
```

## Environment Variables

Make sure these are set in Railway Variables:

| Variable | Value |
|----------|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `JWT_SECRET` | [32+ char random string] |
| `FRONTEND_URL` | [Your frontend URL] |

To generate JWT_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Expected Logs

You should see in Railway logs:
```
Step 1/9 : FROM node:18-alpine
Step 2/9 : WORKDIR /app
Step 3/9 : COPY backend/package*.json ./
Step 4/9 : RUN npm install --production
Step 5/9 : COPY backend/src ./src
...
🚀 Server is running on http://localhost:5000
✅ Backend is production-ready!
```

## Troubleshooting

### Build Still Fails
- Clear Railway cache: Deployments → Settings → Rebuild
- Check build logs for specific errors
- Ensure all dependencies are in `/backend/package.json`

### Application Won't Start
- Verify `JWT_SECRET` is set
- Check `NODE_ENV=production` is set
- Look at logs for error messages

### Port Issues
- `PORT` should be set to `5000` in variables
- Server listens on `0.0.0.0:5000` by default

### CORS Errors
- Ensure `FRONTEND_URL` matches your frontend domain exactly
- Backend has CORS configured for this URL
- Restart service after changing FRONTEND_URL

## Files Modified

- ✅ `/Dockerfile` - Created for root-level build
- ✅ `/railway.json` - Updated for correct configuration
- ✅ `/.dockerignore` - Optimized for production build
- ℹ️ `/backend/Dockerfile` - Keep for reference, not used by Railway
- ℹ️ `/backend/package.json` - No changes needed
- ℹ️ `/backend/src/server.js` - No changes needed

## Next Steps

1. Commit and push changes
2. Redeploy on Railway
3. Test health endpoint
4. Get public URL from Railway dashboard
5. Deploy frontend and connect to this backend URL
6. Test full-stack integration

---

If deployment still fails after these changes, check:
1. Build logs in Railway Deployments tab
2. Environment variables are correctly set
3. GitHub repository is properly connected
4. No special characters in JWT_SECRET
