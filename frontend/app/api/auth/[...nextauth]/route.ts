import NextAuth from "next-auth/next";
import { Metadata } from "next";
import GitHubProvider from "next-auth/providers/github"
import { JWT } from "next-auth/jwt";
import { Account ,Session } from "next-auth"; 

export const metadata: Metadata = {
    robots: {
        follow: false,
        index: false,
      },
}

export const authOptions ={
    providers:[
        GitHubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }: {token: JWT, user: any, account: Account | null}) {
            if (account?.provider === "github") {
                token.githubAccessToken = account.access_token;
                token.providerAccountId = account.providerAccountId;
            }

                if (user) {
                    token.id = user.id;
                }

                return token;
        },

    },
};       

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST};