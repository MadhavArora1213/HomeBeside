import { z } from "zod";

export const bookingStatusSchema = z.enum([
  "PENDING_PAYMENT",
  "CONFIRMED",
  "SEARCHING_HELPER",
  "HELPER_ASSIGNED",
  "HELPER_ACCEPTED",
  "EN_ROUTE",
  "ARRIVED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
  "EXPIRED",
  "NO_SHOW",
  "REASSIGNING",
  "DISPUTED",
  "INCIDENT_REVIEW",
]);

export const createBookingSchema = z
  .object({
    serviceId: z.string().min(1),
    beneficiaryId: z.string().min(1),
    startsAt: z.iso.datetime(),
    endsAt: z.iso.datetime(),
    addressLine1: z.string().min(1).max(200),
    notes: z.string().max(4000).optional(),
  })
  .refine((value) => value.endsAt > value.startsAt, {
    message: "endsAt must be after startsAt",
    path: ["endsAt"],
  });

export type CreateBookingInput = z.infer<typeof createBookingSchema>;
