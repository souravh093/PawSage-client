import { currentUser } from "@/services/AuthService";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

type Role = keyof typeof RoleBasedRoutes;

const AuthRoutes = ["/login", "/register"];

const RoleBasedRoutes = {
  user: [/^\/$/, /^\/profile/, /^\/client/],
  admin: [/^\/$/, /^\/admin/, /^\/profile/],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user = await currentUser();

  // If the user is not authenticated
  if (!user) {
    // Allow access to login and register pages
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      // Redirect to login page with redirect URL
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
  }

  // If the user is authenticated, check their role and allowed routes
  if (user?.role && RoleBasedRoutes[user?.role as Role]) {
    const routes = RoleBasedRoutes[user?.role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  // Default redirect to root page if no match
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/",
    // "/:page*",
    "/profile",
    "/profile/:page*",
    "/admin/:page*",
    "/admin",
    "/login",
    "/register",
  ],
};