import { z } from "zod";

import { e164PhoneSchema } from "../auth/index.js";

export const addressSchema = z.object({
  line1: z.string().min(1).max(200),
  line2: z.string().max(200).optional(),
  city: z.string().min(1).max(120),
  region: z.string().min(1).max(120),
  postalCode: z.string().min(1).max(20),
  country: z.string().length(2),
});

export const createFamilySchema = z.object({
  name: z.string().min(2).max(200),
  phone: e164PhoneSchema,
  address: addressSchema,
});

export type CreateFamilyInput = z.infer<typeof createFamilySchema>;
