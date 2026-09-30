import { z } from "zod";

export const emailSchema = z.email().max(320);

export const passwordSchema = z
  .string()
  .min(12, "Password must be at least 12 characters")
  .max(128);

export const e164PhoneSchema = z
  .string()
  .regex(/^\+[1-9]\d{6,14}$/, "Phone number must be in E.164 format");

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  phone: e164PhoneSchema,
  fullName: z.string().min(2).max(200),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
