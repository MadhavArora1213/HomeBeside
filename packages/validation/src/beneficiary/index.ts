import { z } from "zod";

export const createBeneficiarySchema = z.object({
  fullName: z.string().min(2).max(200),
  dateOfBirth: z.iso.date(),
  relationship: z.string().min(1).max(80),
  careNeeds: z.array(z.string().min(1).max(300)).max(50).default([]),
  medicalNotes: z.string().max(4000).optional(),
});

export type CreateBeneficiaryInput = z.infer<typeof createBeneficiarySchema>;
