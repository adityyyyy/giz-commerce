import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorizedException";
import { ErrorCode } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prismaClient } from "..";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token: string | undefined = req.headers.authorization;

  if (!token) {
    next(
      new UnauthorizedException(
        "Unauthorized Access",
        ErrorCode.UNAUTHORIZED_ACCESS,
      ),
    );
  }

  try {
    const payload: any = jwt.verify(token!, JWT_SECRET);

    const user = await prismaClient.user.findFirst({
      where: {
        id: payload.userId,
      },
    });

    if (!user) {
      next(
        new UnauthorizedException(
          "Unauthorized Access",
          ErrorCode.UNAUTHORIZED_ACCESS,
        ),
      );
    }

    req.user = user!;
    next();
  } catch (err: any) {
    next(
      new UnauthorizedException(
        "Unauthorized Access",
        ErrorCode.UNAUTHORIZED_ACCESS,
      ),
    );
  }
};
