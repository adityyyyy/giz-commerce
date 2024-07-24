import { z } from "zod";

export const CartAddItem = z.object({
  productId: z.number(),
  quantity: z.number().min(1),
});

export const CartChangeQuantity = z.number().min(1);
