export default function Home() {
  return (
    <div style={{ padding: 24 }}>
      <h1>UniVault Auth Server</h1>
      <p>This server handles authentication (NextAuth). Use it with your Vite app.</p>
      <p>Sign-in URL example: <code>/api/auth/signin/google?callbackUrl=http://localhost:5173/</code></p>
    </div>
  );
}
