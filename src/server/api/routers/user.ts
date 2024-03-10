import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { updateProfileInfoSchema } from "~/server/schemas/user";

export const userRouter = createTRPCRouter({
  updateProfileInfo: protectedProcedure
    .input(updateProfileInfoSchema)
    .mutation(async ({ input, ctx }) => {
      //
    }),
  getMe: protectedProcedure.query(async ({ input, ctx }) => {
    const { user } = ctx.session;

    return await ctx.db.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }),
  getStationFilters: protectedProcedure.query(async ({ ctx }) => {
    const { user } = ctx.session;

    return await ctx.db.stationFilter.findMany({
      where: { userId: user.id },
    });
  }),
});
