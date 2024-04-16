const { getToken } = require("next-auth/jwt");
const { NextResponse } = require("next/server");

export async function middleware(req){
    const token = await getToken({req})
    const isAuthenticated = !!token
    const isProfilePage = req.nextUrl.pathname.startsWith("/profil")
    const isEkskulSayaPage = req.nextUrl.pathname.startsWith("/ekskul-saya")

    if(isProfilePage && !isAuthenticated){
        return NextResponse.redirect(new URL("/api/auth/signin", req.url))
    }else if(isEkskulSayaPage && !isAuthenticated){
        return NextResponse.redirect(new URL("/api/auth/signin", req.url))
    }

    
}