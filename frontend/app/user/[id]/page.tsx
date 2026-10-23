import React from 'react'
import { exibirUsuarios } from '@/services/server';
import { findTasksUserServer } from '@/services/server';
import { Task } from "@/types/Task"

type PageProps = {
    params: Promise<{id: string;}>;  
};

export default async function page({params}: PageProps) {
    const {id} = await params;
    const json = await exibirUsuarios(Number(id));
    const tasks = await findTasksUserServer(Number(id));
    
    if((json.status != 200)){                             
      alert(`status: ${json.status} ${json.dados.mensagem}`);            
    }
    return (        
        <div className="bg-gray-100 min-h-screen">
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center justify-center">
                  <h1 className="text-2xl font-semibold mb-4">Usuario {json.dados.name} </h1>
                  <div className="mt-4">          
                      <p className="text-base text-gray-600">Nome de Usuario: <span className="text-base text-gray-600 font-semibold">{json.dados.name}</span></p>
                      <p className="text-base text-gray-600">Email: <span className="text-base text-gray-600 font-semibold">{json.dados.email}</span></p>
                      <p className="text-base text-gray-600">Data de criação: <span className="text-base text-gray-600 font-semibold">{json.dados.createdAt}</span></p>
                      <p className="text-base text-gray-600">Ultima atualização: <span className="text-base text-gray-600 font-semibold">{json.dados.updatedAt}</span></p>    
                  </div>                        
          </div>
          <div className="flex flex-col gap-2 bg-gray-200 m-2 rounded">
                <p className="text-2xl p-2 font-bold rounded bg-blue-400 text-white">Tárefas</p>
                <ul className="flex flex-col gap-2">
                  {tasks.length === 0 && <p className="bg-blue-100 m-1 p-1">Nenhuma tárefa</p>}
                  {tasks.map((task, index) => (                    
                    <li key = {index}> {index} | {task.titulo} | {task.status} | {task.createdAt} | {task.updatedAt}</li>
                  ))}
                </ul>
          </div>
        </div>
      )

}
