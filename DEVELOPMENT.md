# Full Stack Development Setup

This document provides instructions for setting up the UniVault Research development environment.

## Quick Start with npm

### Terminal 1 - Backend
```bash
cd backend
npm install
npm run dev
```

### Terminal 2 - Frontend
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Test Credentials
Since we use in-memory storage in development, you can register a new account or use these to test:

**After registration:**
- Navigate to `/register` to create a new account
- Use any email and password combination
- After registration, you'll be automatically logged in

## Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
JWT_SECRET=dev_secret_key_change_in_production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## Development Tips

1. **Backend**: The backend uses in-memory user storage. Data will reset on server restart.
2. **Frontend**: Token is stored in localStorage. Clear it from DevTools Storage tab to logout.
3. **API**: Test endpoints using Postman, Insomnia, or curl
4. **Styling**: CSS variables are defined in `src/styles/index.css` - modify them for theme changes

## Project Architecture

### Frontend (SolidJS)
- **Components**: Reusable UI components (StatCard, ActivityFeed, ProjectList, Navigation)
- **Pages**: Full page components (Login, Register, Dashboard)
- **Hooks**: Custom state management (useAuth, useAPI)
- **Styles**: Modular CSS files with CSS variables

### Backend (Express.js)
- **Controllers**: Business logic for authentication and dashboard
- **Routes**: API endpoint definitions
- **Middleware**: JWT verification and error handling
- **In-Memory Storage**: User data stored in Maps (replace with database for production)

## Common Commands

### Backend
```bash
cd backend
npm install              # Install dependencies
npm run dev             # Start with auto-reload
npm start               # Start production server
```

### Frontend
```bash
cd frontend
npm install              # Install dependencies
npm run dev             # Start dev server
npm run build           # Build for production
npm run preview         # Preview production build
```

## API Testing

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Dashboard (requires token)
```bash
curl -X GET http://localhost:5000/api/dashboard \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Troubleshooting

### Port Already in Use
- Backend: Change `PORT` in `.env` or kill process on port 5000
- Frontend: Change port in `frontend/vite.config.js` or kill process on port 3000

### Module Not Found
- Run `npm install` in both backend and frontend directories
- Delete `node_modules` and run `npm install` again

### CORS Errors
- Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL
- For development, it should be `http://localhost:3000`

### Token Expired
- Token expires in 7 days by default (set in backend `.env` as `JWT_EXPIRE`)
- Clear localStorage and login again to get a new token

## Database Integration (Future)

To add a real database:
1. Install database driver (mongoose for MongoDB, prisma for SQL)
2. Replace in-memory Maps in controllers with database queries
3. Update `.env` with database connection string
4. Create migration files if using SQL database

## Next Steps

1. Implement real database integration
2. Add email verification
3. Add password reset functionality
4. Implement project CRUD operations
5. Add real-time collaboration features
6. Set up CI/CD pipeline
7. Deploy to cloud platform (Vercel, Heroku, AWS, etc.)
