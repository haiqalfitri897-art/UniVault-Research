import { createSignal } from 'solid-js';
import { useNavigate } from 'solid-router';
import { useAuth } from '../hooks/useAuth';
import { useAPI } from '../hooks/useAPI';
import '../styles/auth.css';

export default function Login() {
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [error, setError] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { post } = useAPI();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await post('/auth/login', {
        email: email(),
        password: password(),
      });

      login(response.token, response.user);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="auth-container">
      <div class="auth-box">
        <div class="auth-header">
          <h1>UniVault Research</h1>
          <p>Welcome back</p>
        </div>

        <form onSubmit={handleSubmit} class="auth-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              id="email"
              type="email"
              value={email()}
              onInput={(e) => setEmail(e.currentTarget.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              id="password"
              type="password"
              value={password()}
              onInput={(e) => setPassword(e.currentTarget.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error() && <div class="error-message">{error()}</div>}

          <button type="submit" class="btn btn-primary" disabled={loading()}>
            {loading() ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p class="auth-footer">
          Don't have an account?{' '}
          <a href="/register">Create one</a>
        </p>
      </div>
    </div>
  );
}
