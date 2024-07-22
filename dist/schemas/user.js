"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressUpdateSchema = exports.AddressCreateSchema = exports.LogInSchema = exports.SignUpSchema = void 0;
const zod_1 = require("zod");
exports.SignUpSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
exports.LogInSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
exports.AddressCreateSchema = zod_1.z.object({
    lineOne: zod_1.z.string().trim().min(1),
    lineTwo: zod_1.z.string().nullable(),
    pincode: zod_1.z.string().length(6),
    country: zod_1.z.string().min(1),
    city: zod_1.z.string().min(1),
});
exports.AddressUpdateSchema = zod_1.z.object({
    lineOne: zod_1.z.string().trim().min(1).optional(),
    lineTwo: zod_1.z.string().nullable().optional(),
    pincode: zod_1.z.string().length(6).optional(),
    country: zod_1.z.string().min(1).optional(),
    city: zod_1.z.string().min(1).optional(),
});
