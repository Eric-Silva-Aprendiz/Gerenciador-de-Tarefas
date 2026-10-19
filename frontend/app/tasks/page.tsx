import NovaTarefa from "@/components/NovaTarefa";
import { findTasksServer } from "@/services/server";
import TaskList from "@/components/TaskList";
import type { Metadata } from "next";

export const metadata: Metadata = {
    robots: {
        follow: false,
        index: false,
      },
}

export default async function Tasks(){   
    const tasks = await findTasksServer();    
    return(
        <main className="bg-gray-100 min-h-screen ">
            <h1 className="p-10 text-2xl bg-slate-300">
                Gerenciador de Tarefas com next.js e NextAuth
            </h1>
            <NovaTarefa />
            <TaskList title="Pendente(s)" taskList={tasks.filter(task => task.status == 'pendente')} />
            <TaskList title="Em andamento" taskList={tasks.filter(task => task.status == 'andamento')} />
            <TaskList title="Concluída(s)" taskList={tasks.filter(task => task.status == 'concluida')} />
        </main>
    )
} 