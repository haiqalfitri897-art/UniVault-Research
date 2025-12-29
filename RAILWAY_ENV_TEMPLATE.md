# Railway Environment Variables Template
# Copy these to Railway Dashboard -> Variables section

# Application Environment
NODE_ENV=production

# Server Configuration
PORT=5000

# JWT Configuration
# Generate a secure secret with:
# node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=your_generated_secret_here_min_32_chars

# Frontend Configuration
# Set after deploying frontend
FRONTEND_URL=https://your-frontend-domain.vercel.app

# Optional: Database (when integrating)
# DATABASE_URL=your_mongodb_or_postgresql_url

# Optional: Email Service (for future notifications)
# SMTP_USER=your_email
# SMTP_PASSWORD=your_password
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587

# Optional: API Keys (for future features)
# API_KEY=your_api_key
# API_SECRET=your_api_secret
