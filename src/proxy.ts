import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

const protectedRoutes = ["/dashboard"]
const publicRoutes = ["/signup", "/signin"]

export default async function proxy(req: NextRequest) {
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = protectedRoutes.includes(path)

    const cookieStore = await cookies()
    const sessionId = cookieStore.get("sessionId")?.value

    if(isProtectedRoute && !sessionId) {
        return NextResponse.redirect(new URL('/singin', req.url))
    } else if(isPublicRoute && sessionId && !req.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}