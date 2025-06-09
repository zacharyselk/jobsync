import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Create the auth middleware
const authMiddleware = NextAuth(authConfig).auth;

// Export the middleware function
export async function middleware(request: NextRequest) {
  // Handle auth
  const authResponse = await authMiddleware(request);
  if (authResponse) return authResponse;

  // Add security headers
  const response = NextResponse.next();
  
  // Trust the proxy
  response.headers.set('X-Forwarded-Proto', 'https');
  response.headers.set('X-Forwarded-Host', 'hello.com');
  
  return response;
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: [
    // "/((?!api|_next/static|_next/image|.*\\.png$).*)",
    "/dashboard",
    "/dashboard/:path*",
  ],
};
