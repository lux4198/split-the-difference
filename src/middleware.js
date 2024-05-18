"use server";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isOnIndex = nextUrl.pathname === "/";
  const isOnGroupNew = nextUrl.pathname.startsWith("/api/group/new");
  if (!isOnGroupNew && !isOnIndex && !isLoggedIn) {
    return Response.redirect(new URL("/", nextUrl));
  }
});

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)", "/api/:path*"],
};
