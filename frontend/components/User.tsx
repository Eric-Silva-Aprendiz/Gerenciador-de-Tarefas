"use client"
import { useRouter } from "next/navigation";
import { updateUser } from '@/services/client';
import { useState } from "react";

export default function User() {
    const router = useRouter();
    const [Loading, setLoading] = useState(false);
    async function submit(e: React.SubmitEvent) {
        setLoading(true);
        e.preventDefault();
            
        const formData = new FormData(e.target);
        const inputNome = formData.get("nome");
        const inputEmail = formData.get("email");
        const inputPassword = formData.get("password");
    
    
        const json = await updateUser(inputNome, inputEmail, inputPassword);
        if((json.status == 201)){                        
            router.push("/about");
        } else{                      
            alert(`status: ${json.status} ${json.dados.mensagem}`);
            setLoading(false);
        }        
                
    }
    
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
        <div className = "flex flex-col items-center justify-center">                              
                <form onSubmit={submit} className= "grid justify-items-center text-left">
                    <label className="font-semibold" htmlFor="nome">Nome:</label>
                    <input className="flex-1 border-2 border-blue-500 rounded p-1" id="nome" name="nome" type="nome" placeholder="nome" /><br/>
                    <label className="font-semibold" htmlFor="email">Email:</label>
                    <input className="flex-1 border-2 border-blue-500 rounded p-1" id="email" name="email" type="email" placeholder="Email" /><br/>
                    <label className="font-semibold" htmlFor="password">Senha:</label>
                    <input className="flex-1 border-2 border-blue-500 rounded p-1" id="password" name="password" type="password" placeholder="Senha" /><br/>
                    <button className="bg-blue-500 rounded font-semibold text-white p-1 rounded-sm hover:bg-blue-800 mb-1" type="submit" disabled ={Loading}>{Loading ? ( <div className="w-3 h-3 border-4 border-white border-t-transparent rounded-full animate-spin"></div> ) : ( "Atualizar" )}</button>
                </form>         
        </div>
    </div>
  )
}
