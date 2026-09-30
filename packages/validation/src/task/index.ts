import { z } from "zod";

export const taskStatusSchema = z.enum([
  "REQUESTED",
  "OFFERED",
  "ACCEPTED",
  "EN_ROUTE",
  "ARRIVED",
  "IN_PROGRESS",
  "COMPLETED",
  "DECLINED",
  "EXPIRED",
  "REASSIGNING",
  "NO_SHOW",
  "PARTIAL",
  "FAILED",
  "CANCELLED",
  "DISPUTED",
]);

export const offerTaskSchema = z.object({
  taskId: z.string().min(1),
  proposedRateMinor: z.int().positive(),
  message: z.string().max(2000).optional(),
  availableFrom: z.iso.datetime(),
});

export type OfferTaskInput = z.infer<typeof offerTaskSchema>;
