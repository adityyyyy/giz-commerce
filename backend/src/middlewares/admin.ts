import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorizedException";
import { ErrorCode } from "../exceptions/root";
import { JWT_SECRET } from "../secrets";
import * as jwt from "jsonwebtoken";
import { prismaClient } from "..";

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user;

  if (user?.role == "ADMIN") {
    next();
  } else {
    next(
      new UnauthorizedException(
        "Unauthorized Access",
        ErrorCode.UNAUTHORIZED_ACCESS,
      ),
    );
  }
};
