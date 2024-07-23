import { Request, Response } from "express";
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import {
  AddressCreateSchema,
  AddressUpdateSchema,
  UserUpdateSchema,
} from "../schemas/user";
import { Address, User } from "@prisma/client";

export const updateUser = async (req: Request, res: Response) => {
  const validateData = UserUpdateSchema.parse(req.body);

  if (validateData.billingAddress) {
    const billingAddress: Address | null = await prismaClient.address.findFirst(
      {
        where: {
          id: validateData.billingAddress,
          userId: req.user?.id,
        },
      },
    );

    if (!billingAddress) {
      throw new NotFoundException(
        "Address not found",
        ErrorCode.ADDRESS_NOT_FOUND,
      );
    }
  }

  if (validateData.shippingAddress) {
    const shippingAddress: Address | null =
      await prismaClient.address.findFirst({
        where: {
          id: validateData.shippingAddress,
          userId: req.user?.id,
        },
      });

    if (!shippingAddress) {
      throw new NotFoundException(
        "Address not found",
        ErrorCode.ADDRESS_NOT_FOUND,
      );
    }
  }

  const updatedUser: User = await prismaClient.user.update({
    where: {
      id: req.user?.id,
    },
    data: validateData,
  });

  res.json(updatedUser);
};

export const getAllAddresses = async (req: Request, res: Response) => {
  const addresses: Address[] = await prismaClient.address.findMany({
    where: {
      userId: req.user?.id,
    },
  });

  if (addresses.length === 0) {
    throw new NotFoundException(
      "No address found",
      ErrorCode.ADDRESS_NOT_FOUND,
    );
  }

  res.json(addresses);
};

export const addAddress = async (req: Request, res: Response) => {
  const validatedData = AddressCreateSchema.parse(req.body);

  const createdAddress: Address = await prismaClient.address.create({
    data: {
      ...req.body,
      userId: req.user?.id,
    },
  });

  res.json(createdAddress);
};

export const deleteAddress = async (req: Request, res: Response) => {
  await prismaClient.address.delete({
    where: { id: +req.params.id, userId: req.user?.id },
  });

  res.json({ message: "Success" });
};

export const updateAddress = async (req: Request, res: Response) => {
  const validatedData = AddressUpdateSchema.parse(req.body);

  const updatedAddress: Address = await prismaClient.address.update({
    where: {
      id: +req.params.id,
      userId: req.user?.id,
    },
    data: validatedData,
  });

  if (!updatedAddress) {
    throw new NotFoundException(
      "Address not found",
      ErrorCode.ADDRESS_NOT_FOUND,
    );
  }

  res.json(updatedAddress);
};

export const getAllUsers = async (req: Request, res: Response) => {
  let skip: number = 0;

  if (req.query.skip) {
    skip = +req.query.skip;
  }

  const users = await prismaClient.user.findMany({
    skip: skip,
    take: 10,
    select: {
      name: true,
      role: true,
    },
  });

  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await prismaClient.user.findFirst({
    where: {
      id: +req.params.id,
    },
    select: {
      name: true,
      role: true,
    },
  });

  if (!user) {
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  }

  res.json(user);
};
