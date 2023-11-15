import { AppLayout } from "~/features/layout/AppLayout";

import { LoginForm } from "~/features/auth";

export default function Login() {
  return (
    <AppLayout pageTitle="Login" pageDescription="Login">
      <LoginForm />
    </AppLayout>
  );
}
