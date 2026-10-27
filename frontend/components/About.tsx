"use client"
import Link from "next/link";
import { deleteUser } from "@/services/client";
import {useSession} from "next-auth/react";
import { useAuth } from "@/context/AuthContext";


export default function About() {

    const {data: session } = useSession();
    const {usuario, carregando} = useAuth();  

    async function deletar(){
        const json = await deleteUser();              

        if(json.status != 200){                                              
            alert(`status: ${json.status} ${json.dados.mensagem}`);            
        } 
    }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold mb-4">Usuario {usuario?.name} </h1>
        <div className="mt-4">          
            <p className="text-base text-gray-600">Nome de Usuario: {usuario?.name}</p>
            <p className="text-base text-gray-600">Email: {usuario?.email}</p>            
        </div>      
        <Link className = "text-base p-1 mt-3 text-gray-600 border-2 border-gray-600 rounded font-semibold rounded-sm hover:bg-gray-600 hover:text-white" href="meu_perfil">Editar</Link>        
        <button onClick={deletar} className = "text-base p-1 mt-3 text-red-600 border-2 border-red-500 rounded font-semibold rounded-sm hover:bg-red-600 hover:text-white">Deletar</button>
      </div>
  )
}

