import { Request, Response } from "express";
import { prismaClient } from "..";
import { CartItem, Order } from "@prisma/client";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";

export const createOrder = async (req: Request, res: Response) => {
  return await prismaClient.$transaction(async (tx) => {
    const cartItems = await tx.cartItem.findMany({
      where: {
        userId: req.user?.id,
      },
      include: {
        product: true,
      },
    });

    if (cartItems.length === 0) {
      return res.json({ message: "cart is empty" });
    }

    const amount: number = cartItems.reduce((prev, current) => {
      return prev + current.quantity * current.product.price;
    }, 0);

    const address = await tx.address.findFirst({
      where: {
        id: req.user?.shippingAddress!,
      },
    });

    const order = await tx.order.create({
      data: {
        userId: req.user?.id!,
        netAmount: amount,
        address: address?.formattedAddress!,
        products: {
          create: cartItems.map((items) => {
            return {
              productId: items.productId,
              quantity: items.quantity,
            };
          }),
        },
      },
    });

    const orderEvent = await tx.orderStatus.create({
      data: {
        orderId: order.id,
      },
    });

    await tx.cartItem.deleteMany({
      where: {
        userId: req.user?.id,
      },
    });

    return res.json(order);
  });
};

export const getAllOrders = async (req: Request, res: Response) => {
  const orders = await prismaClient.order.findMany({
    where: {
      userId: req.user?.id,
    },
  });

  res.json(orders);
};

export const cancelOrder = async (req: Request, res: Response) => {
  return await prismaClient.$transaction(async (tx) => {
    const updatedOrder: Order = await tx.order.update({
      where: {
        id: +req.params.id,
        userId: req.user?.id,
      },
      data: {
        status: "CANCELLED",
      },
    });

    const orderEvent = await tx.orderStatus.create({
      data: {
        orderId: updatedOrder.id,
        status: "CANCELLED",
      },
    });

    return res.json(updatedOrder);
  });
};

export const getOrderById = async (req: Request, res: Response) => {
  const order = await prismaClient.order.findFirst({
    where: {
      id: +req.params.id,
      userId: req.user?.id,
    },
    include: {
      products: true,
      events: true,
    },
  });

  if (!order) {
    throw new NotFoundException("Order not found", ErrorCode.ORDER_NOT_FOUND);
  }

  res.json(order);
};
