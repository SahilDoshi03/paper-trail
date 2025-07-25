import { auth } from "@/auth"
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  console.log("Into middleware")
  const session = await auth()

  const isAuthenticated = !!session?.user

  if (!isAuthenticated) {
    const loginUrl = new URL('/auth/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next()
}

export const config ={
  matcher:[
    '/',
    '/:id'
  ]
}
