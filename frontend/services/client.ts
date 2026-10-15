'use client'
import {signOut} from "next-auth/react";
import { Task } from "@/types/Task";

export async function createUser(_nome: FormDataEntryValue | null, _email: FormDataEntryValue | null, senha: FormDataEntryValue | null){
  const response = await fetch('http://localhost:3000/api/users/', {
    method: "POST",
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({name: _nome, email: _email, password: senha})
  })
  let dados = await response.json();
  let status = response.status;
  return {status, dados};
}

export async function updateUser(_nome: FormDataEntryValue | null, _email: FormDataEntryValue | null, _password: FormDataEntryValue | null){
  const response = await fetch(`http://localhost:3000/api/users`, {
    method: 'PUT',
    credentials: "include",
    headers: {
      'Content-Type': 'application/json'    
    },
    body: JSON.stringify({"name": _nome, "email": _email, "password": _password})
  });

  let dados = await response.json();
  let status = response.status;
  return {status, dados};  
}

export async function login(_email: FormDataEntryValue | null, _password: FormDataEntryValue | null){
  const response = await fetch("http://localhost:3000/api/users/signin", {
    method: "POST",
    credentials: "include",
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email:_email, password: _password})
  })
  
  let dados = await response.json();
  let status = response.status;
  return {status, dados};
}


export async function signOutServer(){
  const response = await fetch("http://localhost:3000/api/users/logout", {
    method: "GET",
    credentials: "include",
    headers:{
      'Content-Type': 'application/json'    
    },
  })
  return response.json()
}

export async function deleteUser(){
  const response = await fetch(`http://localhost:3000/api/users/`, { 
    cache: 'no-cache',
    credentials: "include",
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'      
    },
  });
  signOut();
  await signOutServer();  
  let dados = await response.json();
  let status = response.status;
  return {status, dados};
}



