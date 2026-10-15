import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProvider from "../components/SessionProvider";
import { getCustomSession } from "@/services/server"
import NavBar from "../components/NavBar";
import { TokemExiste } from "@/services/server"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gerenciador de tarefas",
  description: "gerenciador de tarefas com Next.js e NextAuth",
  robots: {
    follow: true,
    index: true,
  },
  keywords: ['next.js', 'nextauth', 'typescript', 'tailwindcss', "gerenciador de tarefas"]
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  let session;
  let token = await TokemExiste();
  if(token){
    session = await getCustomSession();
  } 
  
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SessionProvider session={session}>
          <NavBar/>
          {children}
        </SessionProvider>
        </body>
    </html>
  );
}
