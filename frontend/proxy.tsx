import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";
import { getServerSession } from "next-auth";
import { getCustomSession } from "./services/server";

export async function proxy(request: NextRequest){

    const session = await getCustomSession();
    /*const response = NextResponse.next()
    response.cookies.set('nextjs', "true");
    console.log(response.cookies.getAll());*/

    //if(request.nextUrl.pathname.startsWith("about")){
    //}
    if(!session){
        return NextResponse.redirect(new URL('/api/auth/signin', request.url));
    }
}
//"/tasks/:path*"
export const config = {
    matcher: [ 
        //"/api/users/tasks/:path*",
        //"/api/users/:path*/tasks"
     ],
}