import { z } from "zod";
export declare const SignUpSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
}, {
    name: string;
    email: string;
    password: string;
}>;
export declare const LogInSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const AddressCreateSchema: z.ZodObject<{
    lineOne: z.ZodString;
    lineTwo: z.ZodNullable<z.ZodString>;
    pincode: z.ZodString;
    country: z.ZodString;
    city: z.ZodString;
}, "strip", z.ZodTypeAny, {
    lineOne: string;
    lineTwo: string | null;
    pincode: string;
    country: string;
    city: string;
}, {
    lineOne: string;
    lineTwo: string | null;
    pincode: string;
    country: string;
    city: string;
}>;
export declare const AddressUpdateSchema: z.ZodObject<{
    lineOne: z.ZodOptional<z.ZodString>;
    lineTwo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    pincode: z.ZodOptional<z.ZodString>;
    country: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    lineOne?: string | undefined;
    lineTwo?: string | null | undefined;
    pincode?: string | undefined;
    country?: string | undefined;
    city?: string | undefined;
}, {
    lineOne?: string | undefined;
    lineTwo?: string | null | undefined;
    pincode?: string | undefined;
    country?: string | undefined;
    city?: string | undefined;
}>;
