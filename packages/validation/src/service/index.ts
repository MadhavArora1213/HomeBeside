import { z } from "zod";

export const serviceCategorySchema = z.enum([
  "ELDERLY_CARE",
  "CHILD_CARE",
  "MEDICAL_SUPPORT",
  "HOUSEHOLD_SUPPORT",
  "COMPANIONSHIP",
  "TRANSPORT",
  "OTHER",
]);

export const createServiceSchema = z.object({
  name: z.string().min(2).max(200),
  category: serviceCategorySchema,
  description: z.string().min(10).max(4000),
  hourlyRateMinor: z.int().positive(),
  currency: z.string().length(3),
  durationMinutes: z.int().min(30).max(1440),
});

export type CreateServiceInput = z.infer<typeof createServiceSchema>;
