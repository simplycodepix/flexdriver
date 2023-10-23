import type { z } from "zod";

import { authSchema } from "~/shared/schemas/auth";

import { Form, FormControl, FormInput } from "~/features/ui/form";
import { Button } from "~/features/ui";

export function ProfileForm(props: {
  //
}) {
  return (
    <div className="w-full max-w-md">
      <Form<z.infer<typeof authSchema>> schema={authSchema}>
        {({}) => (
          <div className="flex w-full flex-col gap-5">
            <FormControl fullWidth label="SMS Notification:">
              <FormInput name="phone_number" placeholder="Phone number" />
            </FormControl>
            <FormControl
              fullWidth
              label="Email Notification:"
              helperText="You will recieve notification on this address"
            >
              <FormInput
                name="notification_email"
                placeholder="Enter your email"
              />
            </FormControl>

            <Button type="submit">Save</Button>
          </div>
        )}
      </Form>
    </div>
  );
}
