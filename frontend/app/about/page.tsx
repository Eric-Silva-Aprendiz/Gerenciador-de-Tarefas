import About from "@/components/About";
import type { Metadata } from "next";

export const metadata: Metadata = {
    robots: {
        follow: false,
        index: false,
      },
}


export default async function page() {    
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <About></About>
    </div>
  )
}
