# UniVault Research - Full Stack Web Application

A modern, full-stack web application for research collaboration using SolidJS frontend and Node.js/Express backend.

## 🚀 Features

- **Authentication**: Secure JWT-based authentication with registration and login
- **Dashboard**: Interactive dashboard with stats, projects, and activity feed
- **Modern UI**: Clean, responsive design with gradient effects and smooth transitions
- **RESTful API**: Well-structured backend API with proper error handling
- **Best Practices**: Proper project structure, separation of concerns, and scalable architecture

## 📋 Tech Stack

### Frontend
- **SolidJS** - Reactive JavaScript framework
- **Solid Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Vite** - Fast build tool and dev server
- **CSS3** - Modern styling with CSS variables

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-Origin Resource Sharing

## 📁 Project Structure

```
UniVault-Research/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Business logic
│   │   │   ├── authController.js
│   │   │   └── dashboardController.js
│   │   ├── middleware/      # Express middleware
│   │   │   ├── auth.js      # JWT verification
│   │   │   └── errorHandler.js
│   │   ├── routes/          # API routes
│   │   │   ├── auth.js      # Auth endpoints
│   │   │   └── dashboard.js # Dashboard endpoints
│   │   └── server.js        # Main server file
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── Navigation.jsx
│   │   │   ├── StatCard.jsx
│   │   │   ├── ActivityFeed.jsx
│   │   │   └── ProjectList.jsx
│   │   ├── pages/           # Page components
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── hooks/           # Custom hooks
│   │   │   ├── useAuth.js   # Authentication state
│   │   │   └── useAPI.js    # API client
│   │   ├── styles/          # CSS files
│   │   │   ├── index.css
│   │   │   ├── auth.css
│   │   │   ├── navigation.css
│   │   │   ├── dashboard.css
│   │   │   └── components.css
│   │   ├── App.jsx          # Root component
│   │   └── index.jsx        # Entry point
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from the example:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration (optional for development):
```
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

5. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from the example:
```bash
cp .env.example .env
```

4. Update `.env` with the API URL:
```
VITE_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 🔐 Authentication

### Register
Send a POST request to `/api/auth/register`:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure_password"
}
```

Response:
```json
{
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

### Login
Send a POST request to `/api/auth/login`:
```json
{
  "email": "john@example.com",
  "password": "secure_password"
}
```

### Get Profile
Send a GET request to `/api/auth/profile` with the JWT token in the `Authorization` header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

## 📊 Dashboard API

### Get Dashboard Data
`GET /api/dashboard`

Returns stats, projects, and recent activity.

### Get Stats
`GET /api/dashboard/stats`

Returns overview statistics.

### Get Activity
`GET /api/dashboard/activity`

Returns recent activity feed.

All dashboard endpoints require authentication.

## 🎨 UI Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern Colors**: Blue primary color with gradient effects
- **Smooth Transitions**: All interactive elements have smooth animations
- **Dark-friendly**: CSS variables allow easy theme switching
- **Accessible**: Proper semantic HTML and ARIA labels

## 🔄 API Integration

The frontend uses Axios for HTTP requests. The `useAPI` hook provides:
- Automatic token handling
- Error handling
- Base URL configuration

Example usage:
```javascript
const { post, get } = useAPI(token);
const data = await post('/auth/login', { email, password });
```

## 📦 Building for Production

### Frontend Build
```bash
cd frontend
npm run build
```

Output will be in the `dist/` directory.

### Backend Deployment
Set the following environment variables:
- `NODE_ENV=production`
- `JWT_SECRET` - Use a strong random string
- `FRONTEND_URL` - Your production frontend URL

## 🚀 Deployment

### Quick Deploy (Recommended)

Deploy to production in under 10 minutes using Railway + Vercel:

**See [QUICK_DEPLOY.md](./QUICK_DEPLOY.md)** for step-by-step instructions

This will get your app live with:
- Backend on Railway
- Frontend on Vercel
- Automatic deployments on every push

### Full Deployment Guide

For detailed deployment options (Render, Fly.io, Netlify, etc.):

**See [DEPLOYMENT.md](./DEPLOYMENT.md)**

### Production Build Script

```bash
chmod +x build-production.sh
./build-production.sh
```

This will:
- Install dependencies
- Build frontend for production
- Prepare backend for deployment
- Output production files

### Environment Variables for Production

See `.env.production` files in both `backend/` and `frontend/` directories:

**Backend** (`backend/.env.production`):
```
NODE_ENV=production
PORT=5000
JWT_SECRET=your_strong_random_secret_here
JWT_EXPIRE=7d
FRONTEND_URL=https://your-frontend-url.com
```

**Frontend** (`frontend/.env.production`):
```
VITE_API_URL=https://your-backend-url.com/api
```

### Pre-Deployment Checklist

Before going live, see [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

## 🛠️ Available Scripts

### Backend
- `npm start` - Start the production server
- `npm run dev` - Start with Nodemon (auto-reload)

### Frontend
- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📝 Best Practices Implemented

1. **Separation of Concerns**: Controllers, routes, and middleware are separated
2. **Error Handling**: Centralized error handling middleware
3. **Security**: JWT tokens, password hashing with bcryptjs
4. **Code Organization**: Logical folder structure and naming conventions
5. **Reactive Programming**: SolidJS signals for state management
6. **Component Reusability**: Modular components for maintainability
7. **Environment Configuration**: .env files for different configurations
8. **CORS**: Properly configured CORS for cross-origin requests
9. **API Structure**: RESTful API with consistent naming and structure

## 🔒 Security Considerations

- JWT tokens are stored in localStorage (consider httpOnly cookies for sensitive apps)
- Passwords are hashed with bcryptjs (10 salt rounds)
- CORS is configured to allow only the frontend origin
- Input validation on both frontend and backend
- Error messages don't expose sensitive information

## 🚀 Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Two-factor authentication
- [ ] Project collaboration features
- [ ] File upload system
- [ ] Real-time notifications
- [ ] Dark mode support
- [ ] Unit and integration tests
- [ ] Docker containerization

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please open an issue in the repository.
Repository for https://replit.com/@haiqalfitri897/UniVault-Research
