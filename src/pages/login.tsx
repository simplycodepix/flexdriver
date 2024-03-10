import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import type { AuthInput } from "~/server/schemas/auth";
import { getGuestOnlyServerSideProps } from "~/server/auth";

import { AppLayout } from "~/features/layout/AppLayout";

import { LoginForm } from "~/features/auth";

export default function Login() {
  const router = useRouter();
  const { data } = useSession();
  console.log(data);

  const handleSubmit = async (data: AuthInput) => {
    await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    })
      .catch((error) => {
        console.log(error);
      })
      .then((response) => {
        console.log(response);
        if (response?.ok) void router.push("/");
      });
  };

  return (
    <AppLayout pageTitle="Login" pageDescription="Login">
      <LoginForm onSubmit={handleSubmit} />
    </AppLayout>
  );
}

export const getServerSideProps = getGuestOnlyServerSideProps;
