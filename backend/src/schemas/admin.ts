import { z } from "zod";
import { OrderStatusEvent, Role } from "@prisma/client";

export const UserRoleChangeSchema = z.object({
  role: z.nativeEnum(Role),
});

export const OrderStatusSchema = z.nativeEnum(OrderStatusEvent);

export const OrderUserRequestSchema = z.number().min(1);
