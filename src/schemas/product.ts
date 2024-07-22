import { z } from "zod";

export const ProductCreateSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  price: z.number(),
  tags: z.string().array().optional(),
});

export const ProductUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  tags: z.string().array().optional(),
});
