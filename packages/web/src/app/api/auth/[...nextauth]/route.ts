import { encode, decode } from "next-auth/jwt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import api from "@/services/api";
import { cookies } from "next/headers";

export const authOptions = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Your email",
        },
        password: {
          label: "Senha",
          type: "text",
          placeholder: "Your password",
        },
      },
      authorize: async (credentials) => {
        return api
          .post("/users/login", credentials)
          .then((user) => {
            console.log(user.data);
            cookies().set("session.id", user.data.id);
            return {
              id: user.data.id,
              name: user.data.name,
              email: user.data.email,
            };
          })
          .catch((e) => {
            console.log("error: " + Object.values(e.response.data));
            return null;
          });
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Se o usuário tiver sido autenticado, adicione o id no token
      if (user) {
        token.id = user.id; // Adiciona o id ao token
      }
      return token;
    },
    async session({ session, token }) {
      // Acessa o token e adiciona o id na sessão
      if (token) {
        session.user.id = token.id; // Adiciona o id à sessão
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 360 * 24 * 60 * 60, // 1 day
  },
  pages: {
    signIn: "/signin", // Defina a página de login se necessário
    newUser: "/",
  },
});

export { authOptions as GET, authOptions as POST };
