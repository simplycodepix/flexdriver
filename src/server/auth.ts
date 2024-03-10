import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSideProps, type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  type User,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { env } from "~/env.mjs";
import { db } from "~/server/db";
import { authSchema } from "~/server/schemas/auth";

import { comparePassword, hashPassword } from "./utils/auth";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & User;
  }

  interface User {
    id: string;
    email: string;
    name: string | null;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, token }) => {
      console.log("SESSION callback", session, token);
      if (token.user) {
        session.user = token.user as User;
      }
      return session;
    },
    jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      console.log(token, "token");
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      id: "credentials",
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
          return Promise.reject(new Error("No credentials"));
        }

        try {
          const { email, password } = authSchema.parse(credentials);

          const user = await db.user.findUnique({
            where: {
              email,
            },
          });

          if (!user) {
            const result = await db.user.create({
              data: {
                email,
                password: await hashPassword(password),
              },
              select: {
                id: true,
                email: true,
                name: true,
              },
            });

            return result;
          }

          const isPasswordCorrect = await comparePassword(
            password,
            user.password,
          );

          if (!isPasswordCorrect) {
            return Promise.reject(new Error("Invalid password"));
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.log(error);
          return Promise.reject(new Error("Invalid credentials"));
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", // for credentials
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};

export const getProtectedServerSideProps: GetServerSideProps = async ({
  req,
  res,
}) => {
  const session = await getServerAuthSession({ req, res });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export const getGuestOnlyServerSideProps: GetServerSideProps = async ({
  req,
  res,
}) => {
  const session = await getServerAuthSession({ req, res });
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
