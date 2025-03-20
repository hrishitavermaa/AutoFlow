import CredentialsProvider from "next-auth/providers/credentials";
import client from "@/config/db";
import bcrypt from "bcrypt";
import { Session, User } from "next-auth";
import { CustomError } from "./error";
import { JWT } from "next-auth/jwt";

export const AUTH_OPTIONS = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
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
        if (!credentials) {
          return null;
        }
        const email = credentials.email;
        const password = credentials.password;
        const user = await client.user.findUnique({ where: { email: email } });
        if (!user) {
          throw new CustomError("User not found");
        }
        const match = bcrypt.compareSync(password, user.password);
        if (!match) {
          throw new CustomError("Incorrect password");
        }
        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    session: ({ session, token }: { session: Session; token: JWT }) => {
      if (session && session.user && token.sub) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};
