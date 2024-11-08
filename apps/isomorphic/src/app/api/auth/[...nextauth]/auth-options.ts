import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { env } from '@/env.mjs';
import isEqual from 'lodash/isEqual';
import { pagesOptions } from './pages-options';
import GitHubProvider from 'next-auth/providers/github';
import GitlabProvider from 'next-auth/providers/gitlab';

export const authOptions: NextAuthOptions = {
  debug: true,
  pages: {
    ...pagesOptions,
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   console.log(
    //     'signin server-side',
    //     user,
    //     account,
    //     profile,
    //     email,
    //     credentials
    //   );
    //   if (typeof window !== 'undefined') {
    //     console.log(
    //       'signin client-side',
    //       user,
    //       account,
    //       profile,
    //       email,
    //       credentials
    //     );
    //   }
    //   const getData = await axios.get(
    //     `https://667bcbca3c30891b865a02a5.mockapi.io/api/v1/getUser`
    //   );
    //   console.log('getData', getData);
    //   return true;
    // },
    async jwt({ token, user, account, profile, isNewUser }) {
      user && (token.user = user);
      return token;
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),

    async redirect({ url, baseUrl }) {
      // Redirect to desired URL after authentication for all providers
      return '/';
    },
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {},
      async authorize(credentials: any) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid
        const user = {
          email: 'admin@admin.com',
          password: 'admin',
        };

        if (
          isEqual(user, {
            email: credentials?.email,
            password: credentials?.password,
          })
        ) {
          return user as any;
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID || '',
      clientSecret: env.GOOGLE_CLIENT_SECRET || '',
      allowDangerousEmailAccountLinking: true,
    }),
    GitHubProvider({
      clientId: env.GITHUB_ID || '',
      clientSecret: env.GITHUB_SECRET || '',
      allowDangerousEmailAccountLinking: true,
    }),
    GitlabProvider({
      clientId: process.env.GITLAB_CLIENT_ID || '',
      clientSecret: process.env.GITLAB_CLIENT_SECRET || '',
    }),
  ],
};
