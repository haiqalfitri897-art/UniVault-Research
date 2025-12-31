import { createSignal, onMount } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import '../styles/auth.css';

export default function AuthCallback() {
  const [status, setStatus] = createSignal('Checking authentication...');
  const [user, setUser] = createSignal(null);
  const navigate = useNavigate();

  onMount(async () => {
    const authBase = import.meta.env.VITE_AUTH_BASE_URL || 'http://localhost:3001';
    try {
      const res = await fetch(`${authBase.replace(/\/$/, '')}/api/auth/session`, {
        method: 'GET',
        credentials: 'include',
        headers: { Accept: 'application/json' },
      });

      if (!res.ok) {
        setStatus('Not authenticated');
        return;
      }

      const data = await res.json();
      if (data?.user) {
        setUser(data.user);
        setStatus('Authenticated');
        // Redirect to main app after brief pause
        setTimeout(() => navigate('/', { replace: true }), 1200);
      } else {
        setStatus('Not authenticated');
      }
    } catch (err) {
      setStatus('Error checking session');
      console.error(err);
    }
  });

  return (
    <div class="auth-container">
      <div class="auth-box">
        <div class="auth-header">
          <h1>Auth status</h1>
        </div>

        <div class="auth-form">
          <p>{status()}</p>
          {user() && (
            <div class="user-info">
              <p>Welcome, {user().name || user().email}</p>
            </div>
          )}
        </div>

        <div class="auth-divider">
          <span>or</span>
        </div>

        <a class="btn btn-secondary" href="/login">
          Back to Login
        </a>
      </div>
    </div>
  );
}
