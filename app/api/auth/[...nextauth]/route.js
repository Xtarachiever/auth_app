import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@/database/conn";
import Users from "@/model/Schema";
import { compare } from "bcryptjs";

const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_SECRET
        }),
        GithubProvider({
            clientId:process.env.GITHUB_ID,
            clientSecret:process.env.GITHUB_SECRET
        }),
        CredentialsProvider({
            name:"Credentials",
            async authorize(credentials,req){
                connectToDB().catch(error=>{error:"Connection Failed...!"})
                // checking for existing users
                const result = await Users.findOne({email:credentials.email})
                if(!result){
                    throw new Error("No user found with this email, please sign up")
                }
                // compare
                const checkPassword = await compare(credentials.password,result.password);
                // incorrect password
                if(!checkPassword || result.email !== credentials.email){
                    throw new Error("Username or Password doesn't match")
                }
                return result;
            }
        })
    ]
})

export { handler as GET, handler as POST};
