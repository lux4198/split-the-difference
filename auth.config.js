import { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnGroup = nextUrl.pathname.startsWith("/group");
      if (isOnGroup) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/group", nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
};
