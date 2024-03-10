import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const notificationsRouter = createTRPCRouter({
  getNotifications: protectedProcedure.query(async ({ input, ctx }) => {
    //
  }),
});
