import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;

  // ALLOWING
  // 1. A request to next-auth session & provider fetching
  // 2. Or token exists already in session
  if (pathname.includes("/api/auth") || token) {
    if (token && pathname == "/login") {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    } else {
      return NextResponse.next();
    }
  }

  // Redirecting if token not exists and
  // requesting to a protected route
  if (!token && pathname !== "/login") {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}

export const config = {
  // unstable_includeFiles: [
  //   "node_modules/next/dist/compiled/@edge-runtime/primitives/**/*.+(js|json)",
  // ],
  matcher: "/",
};
