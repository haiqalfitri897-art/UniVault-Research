# API Documentation

Complete API reference for UniVault Research backend.

## Base URL
- Development: `http://localhost:5000/api`
- Production: Update according to your deployment

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication Endpoints

#### Register User
Create a new user account.

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1234567890",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

**Error Responses:**
- `400 Bad Request` - Missing required fields
- `409 Conflict` - User already exists

---

#### Login
Authenticate with email and password.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1234567890",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

**Error Responses:**
- `400 Bad Request` - Missing credentials
- `401 Unauthorized` - Invalid credentials

---

#### Get Profile
Retrieve current user profile.

**Endpoint:** `GET /auth/profile`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "user": {
    "id": "1234567890",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

**Error Responses:**
- `401 Unauthorized` - No token provided or invalid token
- `404 Not Found` - User not found

---

### Dashboard Endpoints

#### Get Dashboard Data
Retrieve complete dashboard data including stats, projects, and activity.

**Endpoint:** `GET /dashboard`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "stats": {
      "totalProjects": 12,
      "activeResearch": 5,
      "publications": 3,
      "collaborators": 8
    },
    "projects": [
      {
        "id": 1,
        "name": "Project Alpha",
        "status": "active",
        "progress": 75
      },
      {
        "id": 2,
        "name": "Project Beta",
        "status": "active",
        "progress": 50
      }
    ],
    "recentActivity": [
      {
        "id": 1,
        "type": "upload",
        "title": "New paper uploaded",
        "date": "2024-01-15T10:30:00Z"
      }
    ]
  }
}
```

**Error Responses:**
- `401 Unauthorized` - No token provided or invalid token
- `500 Internal Server Error` - Server error

---

#### Get Stats
Retrieve only dashboard statistics.

**Endpoint:** `GET /dashboard/stats`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "totalProjects": 12,
    "activeResearch": 5,
    "publications": 3,
    "collaborators": 8
  }
}
```

**Error Responses:**
- `401 Unauthorized` - No token provided or invalid token

---

#### Get Activity
Retrieve recent activity feed.

**Endpoint:** `GET /dashboard/activity`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "type": "upload",
      "title": "New paper uploaded",
      "date": "2024-01-15T10:30:00Z"
    },
    {
      "id": 2,
      "type": "collaboration",
      "title": "Invited to project X",
      "date": "2024-01-14T14:20:00Z"
    }
  ]
}
```

**Error Responses:**
- `401 Unauthorized` - No token provided or invalid token

---

### Health Check

#### Server Health
Check if the API server is running.

**Endpoint:** `GET /health`

**Response (200 OK):**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

---

## Error Handling

All error responses follow this format:

```json
{
  "error": "Error message describing what went wrong"
}
```

### Common HTTP Status Codes

| Status | Meaning |
|--------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input or missing fields |
| 401 | Unauthorized - Missing or invalid token |
| 409 | Conflict - Resource already exists |
| 500 | Internal Server Error - Server-side error |

---

## Authentication Flow

1. **Register** - Create new account via `/auth/register`
   - Receive JWT token
   - Token stored in localStorage

2. **Login** - Authenticate via `/auth/login`
   - Receive JWT token
   - Token stored in localStorage

3. **Access Protected Resources**
   - Include token in Authorization header
   - `Authorization: Bearer <token>`

4. **Token Expiry**
   - Default: 7 days
   - After expiry: Login again to get new token

---

## Request/Response Examples

### Example: Complete Registration Flow

```bash
# 1. Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "password": "MySecurePass123!"
  }'

# Response
# {
#   "message": "User registered successfully",
#   "token": "eyJhbGciOiJIUzI1NiIs...",
#   "user": {
#     "id": "1642345678901",
#     "email": "jane@example.com",
#     "name": "Jane Smith"
#   }
# }

# 2. Get Profile with token
TOKEN="eyJhbGciOiJIUzI1NiIs..."
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer $TOKEN"

# 3. Get Dashboard
curl -X GET http://localhost:5000/api/dashboard \
  -H "Authorization: Bearer $TOKEN"
```

---

## Rate Limiting

Currently, no rate limiting is implemented. For production, consider implementing:
- Request throttling per IP
- User-based rate limiting
- Token bucket algorithm

---

## Security Notes

1. **HTTPS**: Always use HTTPS in production
2. **Token Storage**: Currently localStorage (consider httpOnly cookies)
3. **CORS**: Configured for frontend origin only
4. **Password**: Hashed with bcryptjs (10 salt rounds)
5. **JWT Expiry**: Set to 7 days (configurable via JWT_EXPIRE)

---

## Future Enhancements

- [ ] Refresh token implementation
- [ ] Rate limiting
- [ ] OAuth2/Google authentication
- [ ] API versioning (v1, v2, etc.)
- [ ] Pagination for list endpoints
- [ ] Advanced filtering and sorting
- [ ] Webhook support
- [ ] API key authentication
