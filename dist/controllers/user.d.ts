import { Request, Response } from "express";
export declare const getAllAddresses: (req: Request, res: Response) => Promise<void>;
export declare const addAddress: (req: Request, res: Response) => Promise<void>;
export declare const deleteAddress: (req: Request, res: Response) => Promise<void>;
export declare const updateAddress: (req: Request, res: Response) => Promise<void>;
