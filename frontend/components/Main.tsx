import { getCustomSession } from "@/services/server"
import { findTasksServer } from "@/services/server";
import Link from "next/link";


export default async function Main() {  
  
  return (
    <main className='flex flex-col justify-stretch gap-2 p-2'>
      <h1 className='p-10 text-2xl bg-slate-300'>
          Gerenciador de tarefas com Next.js e NextAuth
      </h1>
    </main>
  )
}
