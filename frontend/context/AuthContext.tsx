"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode
} from "react";

type Usuario = {
    name?: string;
    email?: string;
};

type AuthContexType = {
    usuario: Usuario | null;
    carregando: boolean;
    atualizarUsuario: () => Promise<void>;
    limparUsuario: () => void;
};

const AuthContext = createContext<AuthContexType | undefined>(undefined);

export function AuthProvider({children}: {children: ReactNode}) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [carregando, setCarregando] = useState(true);

    async function atualizarUsuario(){
        try {
            const response = await fetch("http://localhost:3000/api/users/session", {
                method: "GET",
                credentials: "include",
            });

            if(!response.ok){
                setUsuario(null);
                return;
            }

            const dados = await response.json();

            setUsuario(dados.user ?? dados.usuario ?? dados);
        } catch(error){
            console.error("Erro ao buscar usuario:", error);
            setUsuario(null);
        } finally{
            setCarregando(false);
        }
    }

    function limparUsuario(){
        setUsuario(null);
    }

    useEffect(() =>{
        void atualizarUsuario();
    }, []);

    return(
        <AuthContext.Provider value={{usuario, carregando, atualizarUsuario, limparUsuario}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error("useAuth deve ser usado dentro de authProvider");
    }

    return context;
}