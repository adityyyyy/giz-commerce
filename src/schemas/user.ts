import { z } from "zod";

export const SignUpSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

export const LogInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const AddressCreateSchema = z.object({
  lineOne: z.string().trim().min(1),
  lineTwo: z.string().nullable(),
  pincode: z.string().length(6),
  country: z.string().min(1),
  city: z.string().min(1),
});

export const AddressUpdateSchema = z.object({
  lineOne: z.string().trim().min(1).optional(),
  lineTwo: z.string().nullable().optional(),
  pincode: z.string().length(6).optional(),
  country: z.string().min(1).optional(),
  city: z.string().min(1).optional(),
});
