Auth server for UniVault

This lightweight Next.js app runs NextAuth and is intended to be used alongside the existing Vite frontend.

Local dev
1. Copy `.env.local.example` to `.env.local` and set `GOOGLE_ID` and `GOOGLE_SECRET`.
2. Start the server:

```bash
cd auth-server
npm install
npm run dev
```

Integration (Vite frontend)
- To start a Google sign-in flow from the Vite app, redirect the browser to:

```
http://localhost:3001/api/auth/signin/google?callbackUrl=http://localhost:5173/
```

- After successful sign-in the auth server will redirect to the `callbackUrl` provided.

Notes on session sharing
- Cookies set by the auth server are scoped to its origin (`localhost:3001`). For production, host the auth server and the app under the same parent domain (for example `auth.example.com` and `app.example.com`) and configure cookie domains accordingly, or use token exchange endpoints to transfer credentials securely.
