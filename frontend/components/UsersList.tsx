import Link from 'next/link';
import { listarUsuarios } from '@/services/server';


type user ={
    id: number,
    name: string,
    email: string,
    createdAt: string,
    updatedAt: string
    
}

type props = {
  page: number;
}

export default async function UsersList({page}: props) {    
    let json = await listarUsuarios(page);       

    if((json.status != 200)){                       
      alert(`status: ${json.status} ${json.dados.mensagem}`);      
    }
    return (
      <main>
        <div className="flex flex-col gap-2 bg-slate-800 pb-2 m-2 rounded">
              <p className="text-2xl p-2 font-bold rounded bg-blue-500 text-white">Usuários</p>
              <ul className="flex flex-col gap-2">
                {json.dados.usuarios.length === 0 && <li key = "1" className="bg-blue-100 m-1 p-1">Nenhum Usuário</li>}
                {json.dados.usuarios.map((user: user, index: number) => (<li key = {index} className='bg-gray-200 rounded font-bold hover:bg-gray-600 ml-2 mr-2 pl-2 pr-2' ><a href = {`user/${user.id}`}>| {user.name} | {user.createdAt} |</a></li>))}
              </ul>
        </div>
        <div>          
          <p className='text-white m-2' >{page > 1 && <Link className="bg-blue-500 rounded font-semibold mr-1 p-2 hover:bg-blue-800" href={`?page=${page - 1}`}> Anterior </Link>} <span className='bg-gray-500 rounded font-bold p-2'>{page} | {json.dados.quantidadePaginas}</span> {page < json.dados.quantidadePaginas && <Link className="bg-blue-500 rounded font-semibold p-2 hover:bg-blue-800" href={`?page=${page + 1}`}> Próxima </Link>}</p>          
        </div>
      </main>
      )
}