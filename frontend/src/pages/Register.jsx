import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { useAuth } from '../hooks/useAuth';
import { useAPI } from '../hooks/useAPI';
import '../styles/auth.css';

export default function Register() {
  const [name, setName] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [confirmPassword, setConfirmPassword] = createSignal('');
  const [error, setError] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { post } = useAPI();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password() !== confirmPassword()) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await post('/auth/register', {
        name: name(),
        email: email(),
        password: password(),
      });

      login(response.token, response.user);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="auth-container">
      <div class="auth-box">
        <div class="auth-header">
          <h1>UniVault Research</h1>
          <p>Create your account</p>
        </div>

        <form onSubmit={handleSubmit} class="auth-form">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input
              id="name"
              type="text"
              value={name()}
              onInput={(e) => setName(e.currentTarget.value)}
              placeholder="John Doe"
              required
            />
          </div>

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

          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword()}
              onInput={(e) => setConfirmPassword(e.currentTarget.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error() && <div class="error-message">{error()}</div>}

          <button type="submit" class="btn btn-primary" disabled={loading()}>
            {loading() ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p class="auth-footer">
          Already have an account?{' '}
          <a href="/login">Sign in</a>
        </p>
      </div>
    </div>
  );
}
