"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GitHubCallback() {
  const router = useRouter();

  useEffect(() => {
    async function authenticateBackend() {
      const response = await fetch("/api/auth/github", {
        method: "POST",
        credentials: "include"
      });

      if (!response.ok) {
        console.error("Erro ao autenticar no backend");
        return;
      }

      await response.json();

      router.replace("/");
      router.refresh();      
    }

    authenticateBackend();
  }, [router]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-blue-500 text-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-semibold">Finalizando login <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div></h1> 
      </div>      
    </div>
  )
}
