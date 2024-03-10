import { ScheduleDays } from "@prisma/client";
import { z } from "zod";

export const createStationFilterSchema = z.object({
  active: z.boolean().optional(),
  name: z.string().optional(),
  minPricePerBlock: z.number().optional(),
  minHours: z.number().optional(),
  maxHours: z.number().optional(),
  timeNeededToArrive: z.number().optional(),
  hourlyRate: z.number().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  daysOfWeek: z
    .array(z.nativeEnum(ScheduleDays))
    .refine(
      (items) => {
        return new Set(items).size === items.length;
      },
      {
        message: "Days of week must be unique",
      },
    )
    .optional(),
});

export type CreateStationFilterInput = z.infer<
  typeof createStationFilterSchema
>;

export const updateStationFilterSchema = createStationFilterSchema
  .extend({
    id: z.string().cuid(),
  })
  .superRefine((data) => {
    const { active, name } = data;

    if (!active) return data;

    return data;
  });

export type UpdateStationFilterInput = z.infer<
  typeof updateStationFilterSchema
>;
