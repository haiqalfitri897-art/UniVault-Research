# Deployment Checklist

Use this checklist before deploying to production.

## 📋 Pre-Deployment

- [ ] All tests passing (`npm test`)
- [ ] No console errors or warnings
- [ ] No sensitive data in code
- [ ] Environment variables configured
- [ ] Database backup setup (if applicable)
- [ ] Error logging configured

## 🔐 Security

- [ ] JWT_SECRET is strong (32+ chars, random)
- [ ] HTTPS enabled (all platforms do this automatically)
- [ ] CORS configured correctly
- [ ] Database password is strong
- [ ] API rate limiting configured (future)
- [ ] No hardcoded credentials in code
- [ ] Environment variables in platform, not git

## 🗄️ Database (if using)

- [ ] Database created on production
- [ ] Connection string verified
- [ ] Backups enabled
- [ ] Restore process tested
- [ ] Schema migrations run

## 📊 Monitoring & Logging

- [ ] Error tracking enabled (Sentry, DataDog, etc.)
- [ ] Performance monitoring setup
- [ ] Log aggregation configured
- [ ] Alerting configured
- [ ] Uptime monitoring enabled

## 🌐 Domain & DNS

- [ ] Domain purchased
- [ ] DNS records configured
- [ ] SSL certificate active
- [ ] Email configured (if needed)
- [ ] SSL certificate auto-renewal enabled

## 🚀 Deployment Verification

### Backend Checks
```bash
# Health check
curl https://your-backend.app/api/health

# Login endpoint test
curl -X POST https://your-backend.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

### Frontend Checks
- [ ] App loads at public URL
- [ ] Navigation works
- [ ] Registration page accessible
- [ ] Login page accessible
- [ ] Can submit form
- [ ] API calls work
- [ ] No console errors
- [ ] Responsive on mobile

## 📱 Cross-Browser Testing

- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers

## ✅ Post-Deployment

- [ ] Monitor error logs
- [ ] Check performance metrics
- [ ] Verify backups are running
- [ ] Test user authentication flow
- [ ] Test all API endpoints
- [ ] Verify email notifications (if enabled)
- [ ] Monitor database performance

## 🔄 Continuous Deployment

- [ ] GitHub Actions CI passing
- [ ] Automatic deployments configured
- [ ] Staging environment setup
- [ ] Production environment stable

## 📞 Support & Maintenance

- [ ] Support contact information documented
- [ ] Documentation updated
- [ ] Troubleshooting guide created
- [ ] Rollback plan documented

---

## Deployment Tracking

| Date | Environment | Status | Notes |
|------|-------------|--------|-------|
| YYYY-MM-DD | Staging | ✅ Deployed | Initial deployment |
| YYYY-MM-DD | Production | ✅ Deployed | Production release |

---

## Rollback Procedure

If something goes wrong:

1. **Identify the issue** in logs
2. **Stop the deployment** in platform dashboard
3. **Revert to last working version**:
   - Git: `git revert <commit_hash>`
   - Platform: Roll back deployment from history
4. **Redeploy** previous version
5. **Debug** the issue locally
6. **Test** fix thoroughly
7. **Redeploy** with fix

---

## Quick Commands

### View Logs
```bash
# Railway
railway logs

# Render
# Use web dashboard

# Fly.io
flyctl logs

# Vercel
vercel logs

# Netlify
netlify logs:functions
```

### Database Backups
```bash
# MongoDB Atlas - automatic backups in dashboard
# PostgreSQL - use backup tools

# Manual backup example (PostgreSQL):
pg_dump -U username -d database_name > backup.sql
```

### Monitor Performance
```bash
# Test API response time
time curl https://your-backend.app/api/health

# Check frontend build size
ls -lh frontend/dist/
```

---

## Support Links

- [Railway Documentation](https://railway.app/docs)
- [Render Documentation](https://render.com/docs)
- [Fly.io Documentation](https://fly.io/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)

---

Print this and keep it handy during deployment!
