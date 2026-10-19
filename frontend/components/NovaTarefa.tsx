'use client'
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { createTask } from "@/services/client"

async function submit(router: AppRouterInstance) {
  const input = document.querySelector('input');
  if(!input?.value || input?.value == '') return;
  
  
  const json = await createTask(input.value);
  if((json.status == 201)){                                 
    input!.value = '';
    router.refresh();
  }else{                      
    alert(`status: ${json.status} ${json.dados.mensagem}`);
    router.refresh();
  }
} 

export default function NovaTarefa() {
  const router = useRouter();
  return (
    <div className="mx-auto w-2/4 my-3 p-5 flex flex-row gap-2 rounded bg-yellow-100 shadow-xl">
      <input className="flex-1 border-2 border-blue-500 rounded p-2" type="text" placeholder="Nova tarefa" />
      <button className="bg-blue-500 rounded p-2 text-white rounded font-semibold rounded-sm hover:bg-blue-800" onClick={() => submit(router)}>Adicionar</button>
    </div>
  )
}