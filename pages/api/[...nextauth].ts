import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import prismadb from "@/lib/prismadb";
import {compare} from 'bcrypt'
export default NextAuth({
  providers: [
    Credentials({
      id: "credentials",
      name: "Creadentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email ans password required");
        }
        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user || !user.hasedPassword) {
          throw new Error("Email does not exits");
        }
        const isCorrectPassword = await compare(
          credentials.password,
          user.hasedPassword
        );
        if(!isCorrectPassword){
            throw new Error('Incorrect password');

        }
        return user;
      },
    }),
  ],
  pages : {
    signIn:'/auth',
  },
  debug: process.env.NODE_ENV === 'development' ,
  session : {
        strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret:process.env.NEXTAUTH_SECRET,
});