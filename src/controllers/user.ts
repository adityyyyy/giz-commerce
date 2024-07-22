import { Request, Response } from "express";
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { AddressCreateSchema, AddressUpdateSchema } from "../schemas/user";

export const getAllAddresses = async (req: Request, res: Response) => {
  const addresses = await prismaClient.address.findMany({
    where: {
      userId: req.user?.id,
    },
  });

  if (!addresses) {
    throw new NotFoundException(
      "No address found",
      ErrorCode.ADDRESS_NOT_FOUND,
    );
  }

  res.json(addresses);
};

export const addAddress = async (req: Request, res: Response) => {
  AddressCreateSchema.parse(req.body);

  const createdAddress = await prismaClient.address.create({
    data: {
      ...req.body,
      userId: req.user?.id,
    },
  });

  res.json(createdAddress);
};

export const deleteAddress = async (req: Request, res: Response) => {
  await prismaClient.address.delete({
    where: {
      id: +req.params.id,
    },
  });

  res.json({ message: "Success" });
};

export const updateAddress = async (req: Request, res: Response) => {
  AddressUpdateSchema.parse(req.body);

  const updatedAddress = await prismaClient.address.update({
    where: {
      id: +req.params.id,
    },
    data: {
      ...req.body,
    },
  });

  res.json(updatedAddress);
};
