import { z } from "zod";

export const ProductCreateSchema = z.object({
  name: z.string().min(1),
  image: z.string(),
  description: z.string(),
  price: z.number(),
  brand: z.string().min(1),
  tags: z.string().array().optional(),
  stock: z.number(),
});

export const ProductUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  image: z.string().optional(),
  description: z.string().optional(),
  brand: z.string().optional(),
  price: z.number().optional(),
  tags: z.string().array().optional(),
  stock: z.number().optional(),
});
