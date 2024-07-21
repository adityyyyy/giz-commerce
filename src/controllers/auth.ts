import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { UnproccessibleEntity } from "../exceptions/validation";
import { LogInSchema, SignUpSchema } from "../schemas/users";
import { UserNotFoundException } from "../exceptions/not-found";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  SignUpSchema.parse(req.body);

  const { email, password, name } = req.body;

  let user = await prismaClient.user.findFirst({
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

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const parsedData = LogInSchema.parse(req.body);

  const { email, password } = req.body;

  let user = await prismaClient.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    throw new UserNotFoundException(
      "User does not exist!",
      ErrorCode.USER_NOT_FOUND,
    );
  }

  if (user && !compareSync(password, user?.password)) {
    throw new BadRequestException(
      "Wrong password!",
      ErrorCode.INCORRECT_PASSWORD,
    );
  }

  const token = jwt.sign(
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
