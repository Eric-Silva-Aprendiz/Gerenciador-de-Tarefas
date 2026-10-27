"use client";
import { signIn } from "next-auth/react";
import { login } from "@/services/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";


export default function Login() {
  const {atualizarUsuario} = useAuth();
  const router = useRouter()
  const [loadingMyApi, setLoadingMyApi] = useState(false);
  const [loadingGitHub, setLoadingGitHub] = useState(false);

  async function submit(provider: string , e?: React.SubmitEvent)  {    
    let json;
    if(provider == "myApi" && e){
      e.preventDefault()
      setLoadingMyApi(true);
      const formData = new FormData(e.target)
      const inputEmail = formData.get("email");
      const inputSenha = formData.get("password");
      
        json = await login(inputEmail, inputSenha);
        if((json.status == 200)){ 
            await atualizarUsuario()                                  
            router.replace("/"); 
            router.refresh();         
        } else{                      
            alert(`status: ${json.status} ${json.dados.mensagem}`);
            setLoadingMyApi(false);
        }     
          
    } else if(provider == "gitHub"){
      setLoadingGitHub(true);
      try {
        await signIn("github", {callbackUrl: "/api/auth/github/callback"});      
      } catch (error) {
        console.log(error);
        setLoadingGitHub(false);
      }
      
    }

  if(!json) {  
    router.refresh();
  }
}




  
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
            <div className = "flex flex-col items-center justify-center">
                <h1 className="text-2xl font-semibold mb-4">Entrar</h1>                
                <form onSubmit={(e) => submit("myApi", e)} className= "grid justify-items-center text-left">
                    <label className="font-semibold" htmlFor="email">Email:</label>
                    <input className="flex-1 border-2 border-blue-500 rounded p-1" id="email" name="email" type="email" placeholder="Email" /><br/>
                    <label className="font-semibold" htmlFor="password">Senha:</label>
                    <input className="flex-1 border-2 border-blue-500 rounded p-1" id="password" name="password" type="password" placeholder="Senha" /><br/>
                    <button className="bg-blue-500 rounded font-semibold text-white p-1 rounded-sm hover:bg-blue-800 mb-1" type="submit" disabled ={loadingMyApi}> {loadingMyApi ? (<div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>) : ("Login")} </button>
                </form> 
                <button  className= "bg-purple-500 text-white font-semibold rounded-sm p-1 hover:bg-purple-800" onClick={() => submit("gitHub", undefined)} disabled ={loadingGitHub}> {loadingGitHub ? (<div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>) : ("Entrar com GitHub")} </button>                
                <p className = "font-semibold">Criar <a className = "text-blue-800 underline decoration-blue-800" href="http://localhost:3001/cadastro">conta</a></p>                                                                                                     
            </div>
        </div>        
  )
}
