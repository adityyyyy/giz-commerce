import { Request, Response } from "express";
import { prismaClient } from "..";
import {
  OrderStatusSchema,
  OrderUserRequestSchema,
  UserRoleChangeSchema,
} from "../schemas/admin";
import { Order, OrderStatus, User } from "@prisma/client";

export const changeUserRole = async (req: Request, res: Response) => {
  const validatedData = UserRoleChangeSchema.parse(req.body);

  const updatedUser: User = await prismaClient.user.update({
    where: {
      id: +req.params.id,
    },
    data: validatedData,
  });

  res.json(updatedUser);
};

export const listAllOrders = async (req: Request, res: Response) => {
  let skip: number = 0;
  let where = {};

  if (req.query.status) {
    const validatedData = OrderStatusSchema.parse(req.query.status);
    where = { status: validatedData };
  }

  if (req.query.userId) {
    const validatedData = OrderUserRequestSchema.parse(+req.query.userId);
    where = {
      ...where,
      userId: validatedData,
    };
  }

  if (req.query.skip) {
    skip = +req.query.skip;
  }

  const orders: Order[] = await prismaClient.order.findMany({
    where: where,
    skip: skip,
    take: 10,
  });

  res.json(orders);
};

export const changeOrderStatus = async (req: Request, res: Response) => {
  const validatedData = OrderStatusSchema.parse(req.body.status);

  return await prismaClient.$transaction(async (tx) => {
    const updatedOrder: Order = await tx.order.update({
      where: {
        id: +req.params.id,
      },
      data: {
        status: validatedData,
      },
    });

    const orderEvent: OrderStatus = await tx.orderStatus.create({
      data: {
        orderId: updatedOrder.id,
        status: validatedData,
      },
    });

    return res.json(updatedOrder);
  });
};
