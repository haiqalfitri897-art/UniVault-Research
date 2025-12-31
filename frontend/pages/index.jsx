import { getSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

export default function Home({ session }) {
  return (
    <div style={{ padding: 24 }}>
      <h1>Welcome to UniVault</h1>
      <p>Signed in as {session.user?.email}</p>
      <button onClick={() => signOut({ callbackUrl: '/login' })}>Sign out</button>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
