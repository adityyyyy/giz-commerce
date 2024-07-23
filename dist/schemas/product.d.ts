import { z } from "zod";
export declare const ProductCreateSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    price: z.ZodNumber;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    stock: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name: string;
    description: string;
    price: number;
    stock: number;
    tags?: string[] | undefined;
}, {
    name: string;
    description: string;
    price: number;
    stock: number;
    tags?: string[] | undefined;
}>;
export declare const ProductUpdateSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodNumber>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    stock: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    description?: string | undefined;
    price?: number | undefined;
    tags?: string[] | undefined;
    stock?: number | undefined;
}, {
    name?: string | undefined;
    description?: string | undefined;
    price?: number | undefined;
    tags?: string[] | undefined;
    stock?: number | undefined;
}>;
