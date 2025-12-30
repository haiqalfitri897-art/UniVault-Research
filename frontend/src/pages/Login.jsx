import '../styles/auth.css';

export default function Login() {
  const authBase = import.meta.env.VITE_AUTH_BASE_URL || 'http://localhost:3001';
  const callback = import.meta.env.VITE_APP_URL || (typeof window !== 'undefined' && window.location.origin) || 'http://localhost:5173';

  const googleSignIn = () => {
    const url = `${authBase.replace(/\/$/, '')}/api/auth/signin/google?callbackUrl=${encodeURIComponent(
      callback
    )}`;
    window.location.href = url;
  };

  return (
    <div class="auth-container">
      <div class="auth-box">
        <div class="auth-header">
          <h1>UniVault Research</h1>
          <p>Sign in with Google</p>
        </div>

        <div class="auth-form">
          <button type="button" class="btn btn-primary" onClick={googleSignIn}>
            Sign in with Google
          </button>
        </div>

        <div class="auth-divider">
          <span>or</span>
        </div>

        <a class="btn btn-secondary" href="/">Continue as Guest</a>

        <p class="auth-footer">
          Don't have an account? <a href="/register">Create one</a>
        </p>
      </div>
    </div>
  );
}
