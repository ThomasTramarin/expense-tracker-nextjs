import { NextResponse } from "next/server";

export async function middleware(request) {
  const cookie = request.headers.get("cookie") || "";

  const res = await fetch("http://localhost:3000/api/auth/is-authenticated", {
    headers: {
      cookie: cookie,
    },
  });

  const data = await res.json();
  const isAuthenticated = data.authenticated;

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/overview", "/transactions", "/incomes", "/api/get-incomes", "/api/get-expenses", "/api/transactions"],
};