import UsersList from '@/components/UsersList';

type props = {
  searchParams: Promise <{page?: string}>;
}



export default async function page({searchParams}: props) {  
  const params = await searchParams;  
  const valorPagina = Number(params.page);
  
  return (
    <div className="bg-gray-100 min-h-screen">
        <UsersList page={valorPagina}></UsersList>
    </div>
  )
}
