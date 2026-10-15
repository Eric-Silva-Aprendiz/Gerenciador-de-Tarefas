import Cadastro from "@/components/Cadastro";
import type { Metadata } from "next";

export const metadata: Metadata = {
    robots: {
        follow: false,
        index: false,
      },
}

export default function page() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <Cadastro/>        
    </div>
  )
}
