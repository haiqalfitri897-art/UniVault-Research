import { useNavigate } from '@solidjs/router';
import { useAuth } from '../hooks/useAuth';
import '../styles/auth.css';

export default function Login() {
  const navigate = useNavigate();
  const { loginAsGuest } = useAuth();
  const authBase = import.meta.env.VITE_AUTH_BASE_URL || 'http://localhost:3001';
  const callback = import.meta.env.VITE_APP_URL || (typeof window !== 'undefined' && window.location.origin) || 'http://localhost:5173';

  const googleSignIn = () => {
    const url = `${authBase.replace(/\/$/, '')}/api/auth/signin/google?callbackUrl=${encodeURIComponent(
      callback
    )}`;
    window.location.href = url;
  };

  const handleGuestLogin = () => {
    loginAsGuest();
    navigate('/dashboard', { replace: true });
  };

  return (
    <div class="auth-container">
      <div class="auth-box">
        <div class="auth-header">
          <h1>UniVault Research</h1>
          <p>Sign in to your account</p>
        </div>

        <div class="auth-form">
          <button type="button" class="btn btn-primary btn-google" onClick={googleSignIn}>
            <span class="btn-icon">🔐</span>
            Sign in with Google
          </button>

          <div class="auth-divider">
            <span>or</span>
          </div>

          <button type="button" class="btn btn-secondary" onClick={handleGuestLogin}>
            <span class="btn-icon">👤</span>
            Continue as Guest
          </button>
        </div>

        <p class="auth-footer">
          Want to explore first?{' '}
          <a href="/">Back to home</a>
        </p>
      </div>
    </div>
  );
}
