import { getCustomSession } from "@/services/server";
import { findTasksServer } from "@/services/server";
import Link from "next/link";


export default async function Main() { 
  
  const session = await getCustomSession();   

  if(session.auth) {
    const data = await findTasksServer();
        
    return (
      <main className='flex flex-col justify-stretch gap-2 p-2'>
        <h1 className='p-10 text-2xl bg-slate-300'>
          Gerenciador de tarefas com Next.js e NextAuth
        </h1>        
        <div className='mx-auto rounded shadow-lg p-10 text-xl bg-yellow-100'>
            <p className='mb-5'>Olá, {session?.user?.name}</p>
            <p>Resumo das tarefas</p>
            <p>Quantidade de tarefas: {data.length}</p>
            <p>Quantidade de tarefas pendentes: {data.filter(task => task.status === 'pendente').length}</p>
            <p>Quantidade de tarefas em andamento: {data.filter(task => task.status === 'andamento').length}</p>
            <p className='mb-5'>Quantidade de tarefas concluídas: {data.filter(task => task.status === 'concluida').length}</p>
            <Link href='/tasks' className='bg-blue-500 p-2 text-white rounded'>
              Gerenciar Tarefas
            </Link>
        </div>
      </main>
    )
    }  

  return (
    <main className='flex flex-col justify-stretch gap-2 p-2'>
      <h1 className='p-10 text-2xl bg-slate-300'>
          Gerenciador de tarefas com Next.js e NextAuth
      </h1>
    </main>
  )
}
