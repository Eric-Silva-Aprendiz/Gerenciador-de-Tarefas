'use client'
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { Task } from "@/types/Task";
import { deleteTasks, updateTasks } from "@/services/client";

type TaskProps = {
  task: Task
}

async function updateTask(router: AppRouterInstance, task: Task, status: string) {
  task.status = status;
  const json = await updateTasks(task, task.id);
  if((json.status == 200)){                                 
    router.refresh();
  }else{                      
    alert(`status: ${json.status} ${json.dados.mensagem}`);
  }
}

async function deleteTask(router: AppRouterInstance, taskId: number) {
  const json = await deleteTasks(taskId);
  if((json.status == 200)){                                   
    router.refresh();
  }else{                      
    alert(`status: ${json.status} ${json.dados.mensagem}`);
  }
}

export default function TaskComponent({task}: TaskProps) {
  const router = useRouter();
  const taskUI = {
    pendente: {
      botao: "bg-blue-500 font-bold text-white rounded p-2 rounded font-semibold rounded-sm hover:bg-blue-800",
      titulo: "bg-blue-100 m-1 p-1 w-full",
      novoStatus: "andamento",
      textoBotao: "Iniciar",
    },
    andamento: {
      botao: "bg-green-500 font-bold text-white rounded p-2 rounded font-semibold rounded-sm hover:bg-green-800",
      titulo: "bg-green-100 m-1 p-1 w-full",
      novoStatus: "concluida",
      textoBotao: "Concluir",
    },
    concluida: {
      botao: null,
      titulo: "bg-red-100 m-1 p-1 line-through w-full",
      novoStatus: null,
      textoBotao: null,
    },
  };

  const ui = taskUI[task.status as keyof typeof taskUI];
  return (    
    <div className="flex flex-row gap-2 justify-between mx-1">
      <p className={ui.titulo}>{task.titulo}</p>
      { ui.botao && 
        <>          
          <button className={ui.botao} onClick={() => updateTask(router, task, ui.novoStatus)}>
            {ui.textoBotao}
          </button>
          
        </>}
      <button className="bg-red-500 font-bold text-white rounded p-2 rounded font-semibold rounded-sm  hover:bg-red-800" onClick={() => deleteTask(router, task.id)}>
        Deletar
      </button>
    </div>
  )
}
