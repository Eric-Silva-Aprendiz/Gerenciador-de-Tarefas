import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";
import { getCustomSession } from "./services/server";
import { TokemExiste } from "./services/server";

export async function proxy(request: NextRequest){
    const tokens = await TokemExiste()
    const path = request.nextUrl.pathname;
    const session = await getCustomSession();
    /*const response = NextResponse.next()
    response.cookies.set('nextjs', "true");
    console.log(response.cookies.getAll());*/

    //if(request.nextUrl.pathname.startsWith("about")){
    //}

    if(path.startsWith('/api/users/addUser') || path.startsWith('/api/users/signin') || path.startsWith('/api/users/git/user/addUser') || path.startsWith('/api/users/session') ){
        return NextResponse.next();
    }

    if(!session.auth){
        return NextResponse.redirect(new URL('/signin', request.url));
    } else if((path.startsWith('/users') || path.startsWith('/user') || path.startsWith('/api/users/') || path.startsWith('/api/users/tasks/user/:id') || path.startsWith('/api/users/:id')) && (request.method === "GET") && (tokens != 2)){        
        return NextResponse.redirect(new URL('/', request.url))        
    } else{
        return NextResponse.next();
    }
    

}
//"/tasks/:path*"
export const config = {
    matcher: [
        "/about/:path*",  
        "/meu_perfil",
        "/tasks",
        "/user/:path*",  
        "/users",
        "/api/users/:path*",        
        "/api/users/tasks/:path*"   
     ],
}