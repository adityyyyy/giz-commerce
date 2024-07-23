import { Request, Response } from "express";
import { CartAddItem, CartChangeQuantity } from "../schemas/cart";
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { BadRequestException } from "../exceptions/bad-request";
import { CartItem } from "@prisma/client";

export const addCartItem = async (req: Request, res: Response) => {
  const validatedData = CartAddItem.parse(req.body);

  const existingCartItem = await prismaClient.cartItem.findFirst({
    where: {
      productId: validatedData.productId,
      userId: req.user?.id,
    },
  });

  const productStock: { stock: number } | null =
    await prismaClient.product.findFirst({
      where: {
        id: validatedData.productId,
      },
      select: {
        stock: true,
      },
    });

  if (!productStock) {
    throw new NotFoundException(
      "Produt out of stock",
      ErrorCode.PRODUCT_NOT_FOUND,
    );
  } else {
    let quantity = validatedData.quantity;

    if (existingCartItem) {
      quantity += existingCartItem.quantity;
    }

    if (productStock.stock < quantity) {
      throw new BadRequestException(
        "Not enough stocks available",
        ErrorCode.PRODUCT_NOT_FOUND,
      );
    }
  }

  let cartItem: CartItem;

  if (existingCartItem) {
    const updatedCartItem = await prismaClient.cartItem.update({
      where: {
        id: existingCartItem.id,
      },
      data: {
        quantity: existingCartItem.quantity + validatedData.quantity,
      },
    });

    cartItem = updatedCartItem;
  } else {
    const createdCartItem: CartItem = await prismaClient.cartItem.create({
      data: {
        productId: validatedData.productId,
        quantity: validatedData.quantity,
        userId: req.user?.id!,
      },
    });

    cartItem = createdCartItem;
  }

  res.json(cartItem);
};

export const deleteCartItem = async (req: Request, res: Response) => {
  await prismaClient.cartItem.delete({
    where: {
      id: +req.params.id,
      userId: req.user?.id,
    },
  });

  res.json({ message: "Success" });
};

export const getAllCartItems = async (req: Request, res: Response) => {
  const cartItems = await prismaClient.cartItem.findMany({
    where: {
      userId: req.user?.id,
    },
    include: {
      product: true,
    },
  });

  res.json(cartItems);
};

export const changeCartItemQuantity = async (req: Request, res: Response) => {
  if (req.query.quantity) {
    const validatedData = CartChangeQuantity.parse(+req.query.quantity);

    const productStock: { stock: number } | null =
      await prismaClient.product.findFirst({
        where: {
          id: +req.params.id,
        },
        select: {
          stock: true,
        },
      });

    if (!productStock) {
      throw new NotFoundException(
        "Produt out of stock",
        ErrorCode.PRODUCT_NOT_FOUND,
      );
    } else if (productStock.stock < validatedData) {
      throw new BadRequestException(
        "Not enough stocks available",
        ErrorCode.PRODUCT_NOT_FOUND,
      );
    }

    const updatedCartItem: CartItem = await prismaClient.cartItem.update({
      where: {
        id: +req.params.id,
        userId: req.user?.id,
      },
      data: {
        quantity: validatedData,
      },
    });

    res.json(updatedCartItem);
  } else {
    throw new BadRequestException(
      "Quantity not provided",
      ErrorCode.UNPROCESSIBLE_ENTITY,
    );
  }
};
