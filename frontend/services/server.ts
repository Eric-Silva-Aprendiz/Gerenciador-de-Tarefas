import { Task } from "@/types/Task";
import { cookies } from "next/headers";

export async function getTokem(){ 
  const cookiesStore = await cookies();
  let tokem = await cookiesStore.get("access-token")?.value;
  let adminTokem = await cookiesStore.get("admin-access-token")?.value;
  return {"tokem": tokem, "admin": adminTokem}
}

export async function TokemExiste(){ 
  const cookiesStore = await cookies();
  if(await cookiesStore.get("admin-access-token")?.value){
    return 2;
  }else if(await cookiesStore.get("access-token")?.value) {
    return 1;
  } 
}

export async function getCustomSession() {
  const {tokem} = await getTokem();
  const response = await fetch("http://localhost:3000/api/users/session", {
    method: "GET",
    headers:{
        'Content-Type': 'application/json',      
        'cookie': `access-token=${tokem}`
    },
  });

  return response.json();
} 

export async function listarUsuarios(){
  const {tokem, admin} = await getTokem();
  const response = await fetch(`http://localhost:3000/api/users`, {
    method: "GET",
    headers:{
        'Content-Type': 'application/json',              
        'cookie': `admin-access-token=${admin}`
    },
  });

  let dados = await response.json();
  let status = response.status;
  return {status, dados};
}

export async function exibirUsuarios(id: number){
  const {tokem, admin} = await getTokem();

  const response = await fetch(`http://localhost:3000/api/users/${id}`, {
    method: "GET",
    headers:{
        'Content-Type': 'application/json',      
        'cookie': `admin-access-token=${admin}`
    },
  });

  let dados = await response.json();
  let status = response.status;
  return {status, dados};
}

export async function findTasksServer(){
  const {tokem} = await getTokem();
  
  const response = await fetch(`http://localhost:3000/api/users/tasks`, { 
    cache: 'no-cache',
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'cookie': `access-token=${tokem}` 
    },
  });
  const data: Task[] = await response.json();

  return data
}

export async function findTasksUserServer(id: number){
  const {tokem, admin} = await getTokem();
  const response = await fetch(`http://localhost:3000/api/users/tasks/user/${id}`, { 
    cache: 'no-cache',
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'cookie': `admin-access-token=${admin}`
    },
  });
  const data: Task[] = await response.json();

  return data
}

