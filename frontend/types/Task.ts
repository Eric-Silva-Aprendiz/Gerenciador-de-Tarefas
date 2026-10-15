export interface Task{
    id: number;
    userId: number;
    titulo: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface User{
    nome: string;
    email: string;
    password: string;
}

