import type { z } from "zod";

import { type AuthInput, authSchema } from "~/server/schemas/auth";

import { Form, FormControl, FormInput } from "~/features/ui/form";
import { Button } from "~/features/ui";

export function LoginForm(props: {
  onSubmit: (data: AuthInput) => void | Promise<void>;
}) {
  return (
    <div className="w-full max-w-md ">
      <Form<AuthInput> schema={authSchema} onSubmit={props.onSubmit}>
        {({}) => (
          <div className="flex w-full flex-col gap-4">
            <FormControl fullWidth label="Flex Email">
              <FormInput name="email" placeholder="Enter your email" />
            </FormControl>
            <FormControl fullWidth label="Flex Password">
              <FormInput
                name="password"
                placeholder="Enter your password"
                type="password"
              />
            </FormControl>

            <Button type="submit">Submit</Button>
          </div>
        )}
      </Form>
    </div>
  );
}
