import { verifyJwt } from './libs/verifyJwt';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/api/login') || request.nextUrl.pathname.startsWith('/api/register') ) {
        const isAuthenticated = await verifyJwt();
        if (isAuthenticated) {
            return NextResponse.json({ message: "You are already authenticated" }, { status: 203 });
        } else {
            return NextResponse.next();
        }
    }

    if (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register') ) {
        const isAuthenticated = await verifyJwt();
        if (isAuthenticated) {
            return NextResponse.redirect(new URL('/', request.url))
        } else {
            return NextResponse.next();
        }
    }

}
 
