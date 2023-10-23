import Head from "next/head";

import { LoginForm } from "~/features/auth";

import { api } from "~/utils/api";

export default function Login() {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-900">
        <LoginForm />
      </main>
    </>
  );
}
