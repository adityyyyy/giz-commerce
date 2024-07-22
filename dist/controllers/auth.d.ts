import { Request, Response } from "express";
export declare const signup: (req: Request, res: Response) => Promise<void>;
export declare const login: (req: Request, res: Response) => Promise<void>;
export declare const me: (req: Request, res: Response) => void;
export declare const logout: (req: Request, res: Response) => void;
