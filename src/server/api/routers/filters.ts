import { z } from "zod";
import { TRPCError } from "@trpc/server";

import {
  createStationFilterSchema,
  updateStationFilterSchema,
} from "~/server/schemas/filters";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const filtersRouter = createTRPCRouter({
  getStationFilter: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const { user } = ctx.session;

      const filter = await ctx.db.stationFilter.findUnique({
        where: { id },
      });

      if (!filter) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Filter with id ${id} not found`,
        });
      }

      if (filter.userId !== user.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: `You are not authorized to view this filter`,
        });
      }

      return filter;
    }),
  createStationFilter: protectedProcedure
    .input(createStationFilterSchema)
    .mutation(async ({ input, ctx }) => {
      const { user } = ctx.session;

      const stationFilter = await ctx.db.stationFilter.create({
        data: { ...input, name: input.name ?? "", userId: user.id },
      });

      return stationFilter;
    }),
  updateStationFilter: protectedProcedure
    .input(updateStationFilterSchema)
    .mutation(async ({ input, ctx }) => {
      const { user } = ctx.session;
      const { id, ...rest } = input;

      const filter = await ctx.db.stationFilter.findUnique({
        where: { id },
      });

      if (!filter) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Filter with id ${id} not found`,
        });
      }

      if (filter.userId !== user.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: `You are not authorized to update this filter`,
        });
      }

      const updatedFilter = await ctx.db.stationFilter.update({
        where: { id },
        data: rest,
      });

      return updatedFilter;
    }),
  deleteStationFilter: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { user } = ctx.session;
      const { id } = input;

      const filter = await ctx.db.stationFilter.findUnique({
        where: { id },
      });

      if (!filter) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Filter with id ${id} not found`,
        });
      }

      if (filter.userId !== user.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: `You are not authorized to delete this filter`,
        });
      }

      return await ctx.db.stationFilter.delete({
        where: { id },
      });
    }),
});
