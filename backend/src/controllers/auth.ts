import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { UnproccessibleEntity } from "../exceptions/validation";
import { LogInSchema, SignUpSchema } from "../schemas/user";
import { NotFoundException } from "../exceptions/not-found";
import { User } from "@prisma/client";

export const signup = async (req: Request, res: Response) => {
  SignUpSchema.parse(req.body);

  const { email, password, name } = req.body;

  let user: User | null = await prismaClient.user.findFirst({
    where: { email },
  });

  if (user) {
    throw new BadRequestException(
      "User already exists!",
      ErrorCode.USER_ALREADY_EXISTS,
    );
  }

  user = await prismaClient.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10),
    },
  });

  res.json(user);
};

export const login = async (req: Request, res: Response) => {
  LogInSchema.parse(req.body);

  const { email, password } = req.body;

  let user: User | null = await prismaClient.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    throw new NotFoundException(
      "User does not exist!",
      ErrorCode.USER_NOT_FOUND,
    );
  }

  if (!compareSync(password, user?.password)) {
    throw new BadRequestException(
      "Wrong password!",
      ErrorCode.INCORRECT_PASSWORD,
    );
  }

  const token: string = jwt.sign(
    {
      userId: user?.id,
      email: user?.email,
    },
    JWT_SECRET,
  );

  res.json({ token: token });
};

export const me = (req: Request, res: Response) => {
  res.json(req.user);
};

export const logout = (req: Request, res: Response) => {
  res.json("logut");
};
