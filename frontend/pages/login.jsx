import { getSession, signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import '../src/styles/auth.css';

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    return (
      <div style={{ padding: 24 }}>
        <p>Signed in as {session.user?.email}</p>
        <button onClick={() => signOut({ callbackUrl: '/login' })}>Sign out</button>
      </div>
    );
  }

  const handleGuestLogin = () => {
    // Store guest user in localStorage
    const guestUser = { role: 'guest', name: 'Guest User' };
    localStorage.setItem('user', JSON.stringify(guestUser));
    // Redirect to dashboard
    router.push('/');
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <h1>UniVault Research</h1>
          <p>Sign in to your account</p>
        </div>

        <div className="auth-form">
          <button 
            type="button" 
            className="btn btn-primary btn-google" 
            onClick={() => signIn('google', { callbackUrl: '/' })}
          >
            <span className="btn-icon">🔐</span>
            Sign in with Google
          </button>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={handleGuestLogin}
          >
            <span className="btn-icon">👤</span>
            Continue as Guest
          </button>
        </div>

        <p className="auth-footer">
          Want to explore first?{' '}
          <a href="/">Back to home</a>
        </p>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return { props: {} };
}
