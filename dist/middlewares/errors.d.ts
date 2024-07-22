import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/root";
export declare const errorMiddleware: (error: HttpException, req: Request, res: Response, next: NextFunction) => void;
