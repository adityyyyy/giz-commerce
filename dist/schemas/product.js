"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductUpdateSchema = exports.ProductCreateSchema = void 0;
const zod_1 = require("zod");
exports.ProductCreateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    description: zod_1.z.string(),
    price: zod_1.z.number(),
    tags: zod_1.z.string().array().optional(),
    stock: zod_1.z.number(),
});
exports.ProductUpdateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    description: zod_1.z.string().optional(),
    price: zod_1.z.number().optional(),
    tags: zod_1.z.string().array().optional(),
    stock: zod_1.z.number().optional(),
});
