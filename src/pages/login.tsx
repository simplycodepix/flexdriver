import { AppLayout } from "~/features/layout/AppLayout";

import { LoginForm } from "~/features/auth";

import { api } from "~/utils/api";

export default function Login() {
  return (
    <AppLayout pageTitle="Login" pageDescription="Login">
      <LoginForm />
    </AppLayout>
  );
}
