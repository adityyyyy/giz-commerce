import { NextFunction, Request, Response } from "express";
import { ErrorCode, HttpException } from "./exceptions/root";
import { InternalException } from "./exceptions/internalException";
import { UnproccessibleEntity } from "./exceptions/validation";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { NotFoundException } from "./exceptions/not-found";

export const errorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error: any) {
      let exception: HttpException;
      if (error instanceof HttpException) {
        exception = error;
      } else if (error instanceof z.ZodError) {
        exception = new UnproccessibleEntity(
          "Unproccessible Entity",
          ErrorCode.UNPROCESSIBLE_ENTITY,
          error,
        );
      } else {
        exception = new InternalException(
          "Something went wrong",
          ErrorCode.INTERNAL_SERVER_ERROR,
          error,
        );
      }

      next(exception);
    }
  };
};
