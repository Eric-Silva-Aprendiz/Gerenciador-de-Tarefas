import { listarUsuarios } from '@/services/server';

type user ={
    id: number,
    name: string,
    email: string,
    createdAt: string,
    updatedAt: string
    
}

export default async function UsersList() {
    let json = await listarUsuarios();

    if((json.status != 200)){                       
      alert(`status: ${json.status} ${json.dados.mensagem}`);      
    }
    return (
        <div className="flex flex-col gap-2 bg-slate-800 pb-2 m-2 rounded">
              <p className="text-2xl p-2 font-bold rounded bg-blue-500 text-white">Usuários</p>
              <ul className="flex flex-col gap-2">
                {json.dados.length === 0 && <li className="bg-blue-100 m-1 p-1">Nenhum Usuário</li>}
                {json.dados.map((user: user, index: number) => (<li className='bg-gray-200 rounded font-bold hover:bg-gray-600 ml-2 mr-2 pl-2 pr-2' ><a href = {`user/${user.id}`}>| {index} | {user.name} | {user.createdAt} |</a></li>))}
              </ul>
        </div>
      )
    
  
}