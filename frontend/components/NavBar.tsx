"use client"
import {signOut, useSession} from "next-auth/react";
import { signOutServer } from "@/services/client";
import Link from "next/link";

async function Sair(){
    signOut()
    signOutServer()
}

function AuthButton() {    
    const {data: session } = useSession();        
        return (
            <div>
                {
                    session
                        ? <>
                            <span><Link href='/about'>{session?.user?.name} </Link></span>
                            <button onClick={() => Sair()} className="bg-blue-500 rounded font-semibold p-2 hover: bg-blue-800">Sign Out</button> 
                        </> : <>
                            <Link href='/signin' className="bg-blue-500 rounded font-semibold p-2 hover:bg-blue-800 mb-1"> Sign In </Link>
                        </>
                    }      
            </div>
        )    
}

export default function NavBar(tokenTipo: any){       
    if(tokenTipo.tokenTipo == 2){
        return(
            <nav className="flex justify-between bg-slate-800 text-white p-5 items-center">
                <div className="flex gap-2 items-center">
                    <Link href='/' className="text-2xl font-semibold">Gerenciador de Tarefas</Link>
                    <Link href='/sobre' className="bg-blue-500 rounded font-semibold p-2 hover:bg-blue-800">Sobre</Link>
                    <Link href= '/users' className="bg-blue-500 rounded font-semibold p-2 hover:bg-blue-800">Usuários</Link>
                </div>
                <div className="flex gap-2 items-center">
                    <AuthButton />
                </div>
            </nav>
        );
    }
    return(
        <nav className="flex justify-between bg-slate-800 text-white p-5 items-center">
            <div className="flex gap-2 items-center">
                <Link href='/' className="text-2xl font-semibold">Gerenciador de Tarefas</Link>
                <Link href='/sobre' className="bg-blue-500 rounded font-semibold p-2 hover:bg-blue-800">Sobre</Link>
            </div>
            <div className="flex gap-2 items-center">
                <AuthButton />
            </div>
        </nav>
    );
}