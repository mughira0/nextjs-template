import { COOKIES_KEYS } from "@/data/constants";
import { NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES = ["/", "/profile", "/user", "/chart", "/example"];
const AUTH_ROUTES = ["/login", "/register"];

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some((route) =>
    route === "/"
      ? pathname === "/"
      : pathname === route || pathname.startsWith(`${route}/`),
  );
}

function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIES_KEYS.Token)?.value;
  console.log("Token", token);

  if (isProtectedRoute(pathname) && !token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute(pathname) && token) {
    console.log("Auth route with token", pathname);
    const redirectTo = "/";
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }
  const res = NextResponse.next();
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
