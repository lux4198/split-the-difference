import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { KyselyAdapter } from "@auth/kysely-adapter";
import { db } from "./db";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/",
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      return isLoggedIn;
    },
    async session({ token, session }) {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
  adapter: KyselyAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
