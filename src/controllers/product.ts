import { Request, Response } from "express";
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { ProductCreateSchema, ProductUpdateSchema } from "../schemas/product";
import { InternalException } from "../exceptions/internalException";

export const createProduct = async (req: Request, res: Response) => {
  ProductCreateSchema.parse(req.body);

  const product = await prismaClient.product.create({
    data: {
      ...req.body,
      tags: req.body.tags.join(","),
    },
  });

  res.json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  ProductUpdateSchema.parse(req.body);

  const product = req.body;

  if (product.tags) {
    product.tags = product.tags.join(",");
  }

  const updatedProduct = await prismaClient.product.update({
    where: {
      id: +req.params.id,
    },
    data: product,
  });

  res.json(updatedProduct);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const productToDelete = await prismaClient.product.delete({
    where: {
      id: +req.params.id,
    },
  });

  res.json({
    message: "Success",
  });
};

export const listProduct = async (req: Request, res: Response) => {
  const count = prismaClient.product.count();
  let skip: number = 0;

  if (req.query.skip) {
    skip = +req.query.skip;
  }

  const products = await prismaClient.product.findMany({
    skip: skip,
    take: 10,
  });

  if (!products) {
    throw new NotFoundException(
      "No More Products to show",
      ErrorCode.PRODUCT_NOT_FOUND,
    );
  }

  res.json({ count: count, data: products });
};

export const getProductById = async (req: Request, res: Response) => {
  const product = await prismaClient.product.findFirst({
    where: {
      id: +req.params.id,
    },
  });

  if (!product) {
    throw new NotFoundException(
      "Product not found",
      ErrorCode.PRODUCT_NOT_FOUND,
    );
  }

  res.json(product);
};
