

import { NextRequest, NextResponse } from "next/server"
import { get_server_session } from "./action/get-session-server"
import { jwtDecode} from "jwt-decode"; 

export async function middleware(request : NextRequest, response : NextResponse){

    let cookkies = request.cookies.get("token-fide")

    let cookkies_next = request.cookies.get("next-auth.session-token")
    



    const decoded = jwtDecode(cookkies?.value);


    if(!cookkies_next){
        return NextResponse.redirect(new URL('/signin', request.url))
    }
    
    
    if(!cookkies){
        return NextResponse.redirect(new URL('/signin', request.url))
    }

    
    if (request.nextUrl.pathname.startsWith('/dashboard') && decoded.role == 0) {
        
        return NextResponse.rewrite(new URL('/cliente-acesso/', request.url))
      }

    
}

export const config = {
    matcher: [

        "/dashboard/:path*",
        "/cliente-acesso/:path*"
    ]
}