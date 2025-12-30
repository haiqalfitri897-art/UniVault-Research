import { getSession, signIn, signOut, useSession } from 'next-auth/react';

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div style={{ padding: 24 }}>
        <p>Signed in as {session.user?.email}</p>
        <button onClick={() => signOut({ callbackUrl: '/login' })}>Sign out</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Sign in</h1>
      <button onClick={() => signIn('google', { callbackUrl: '/' })}>Sign in with Google</button>
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
