"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.listProduct = exports.deleteProduct = exports.updateProduct = exports.createProduct = void 0;
const __1 = require("..");
const not_found_1 = require("../exceptions/not-found");
const root_1 = require("../exceptions/root");
const product_1 = require("../schemas/product");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    product_1.ProductCreateSchema.parse(req.body);
    const product = yield __1.prismaClient.product.create({
        data: Object.assign(Object.assign({}, req.body), { tags: req.body.tags.join(",") }),
    });
    res.json(product);
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    product_1.ProductUpdateSchema.parse(req.body);
    const product = req.body;
    if (product.tags) {
        product.tags = product.tags.join(",");
    }
    const updatedProduct = yield __1.prismaClient.product.update({
        where: {
            id: +req.params.id,
        },
        data: product,
    });
    res.json(updatedProduct);
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productToDelete = yield __1.prismaClient.product.delete({
        where: {
            id: +req.params.id,
        },
    });
    res.json({
        message: "Success",
    });
});
exports.deleteProduct = deleteProduct;
const listProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const count = __1.prismaClient.product.count();
    let skip = 0;
    if (req.query.skip) {
        skip = +req.query.skip;
    }
    const products = yield __1.prismaClient.product.findMany({
        skip: skip,
        take: 10,
    });
    if (!products) {
        throw new not_found_1.NotFoundException("No More Products to show", root_1.ErrorCode.PRODUCT_NOT_FOUND);
    }
    res.json({ count: count, data: products });
});
exports.listProduct = listProduct;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield __1.prismaClient.product.findFirst({
        where: {
            id: +req.params.id,
        },
    });
    if (!product) {
        throw new not_found_1.NotFoundException("Product not found", root_1.ErrorCode.PRODUCT_NOT_FOUND);
    }
    res.json(product);
});
exports.getProductById = getProductById;
