import { verifyJwtJose } from './libs/joseVerifyJwt';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const routes = (url : string) => request.nextUrl.pathname.startsWith(url);

    // If user is Authenticated and wants to login again (Route Handler).
    if (routes('/api/login') || routes('/api/register') ) {
        const isAuthenticated = await verifyJwtJose();
        if (isAuthenticated) {
            return NextResponse.json({ message: "You are already authenticated" }, { status: 203 });
        } else {
            return NextResponse.next();
        }
    }

    // If user is not Authenticated and wants to create or edit a blog (Route Handler)
    if (routes('/api/blog')) {
        const isAuthenticated = await verifyJwtJose();
        if (isAuthenticated) {
            return NextResponse.next();
        } else {
            return NextResponse.json({ message: "You are not authenticated (middleware)" }, { status: 401 });
        }
    }

    // If user is Authenticated and wants to login again (Page).
    if (routes('/login') || routes('/register') ) {
        const isAuthenticated = await verifyJwtJose();
        if (isAuthenticated) {
            return NextResponse.redirect(new URL('/', request.url))
        } else {
            return NextResponse.next();
        }
    } 

    if (routes("/blog/view")) {
        return NextResponse.next();
    }

    // If user is authenticated they can proceed to this pages otherwise send them to the login page
    if (routes("/blog") || routes('/user')) {
        const isAuthenticated = await verifyJwtJose();
        if (isAuthenticated) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

}
 
