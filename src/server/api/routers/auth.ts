import { authSchema } from "~/server/schemas/auth";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { comparePassword, hashPassword } from "~/server/utils/auth";

export const authRouter = createTRPCRouter({
  loginOrCreateUser: publicProcedure
    .input(authSchema)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;

      const user = await ctx.db.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return ctx.db.user.create({
          data: {
            email,
            password: await hashPassword(password),
          },
        });
      }

      const isPasswordCorrect = await comparePassword(password, user.password);

      if (!isPasswordCorrect) {
        throw new Error("Invalid password");
      }

      return user;
    }),
});
