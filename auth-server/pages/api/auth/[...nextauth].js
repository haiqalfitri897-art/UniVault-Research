import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  // Use JWT sessions for easier token forwarding if needed
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    // Ensure redirect honors callbackUrl passed from the Vite app
    async redirect({ url, baseUrl }) {
      if (!url) return baseUrl;
      // Allow relative callback (to this auth server)
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allow absolute callback back to the Vite app (app must pass full URL)
      return url;
    },
  },
};

export default NextAuth(authOptions);
