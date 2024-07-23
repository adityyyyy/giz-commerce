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
exports.searchProduct = exports.getProductById = exports.listProduct = exports.deleteProduct = exports.updateProduct = exports.createProduct = void 0;
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
    yield __1.prismaClient.product.delete({
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
    const count = yield __1.prismaClient.product.count();
    let skip = 0;
    if (req.query.skip) {
        skip = +req.query.skip;
    }
    const products = yield __1.prismaClient.product.findMany({
        skip: skip,
        take: 5,
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
const searchProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    let skip = 0;
    if (req.query.skip) {
        skip = +req.query.skip;
    }
    const products = yield __1.prismaClient.product.findMany({
        where: {
            name: {
                search: (_a = req.query.q) === null || _a === void 0 ? void 0 : _a.toString(),
            },
            description: {
                search: (_b = req.query.q) === null || _b === void 0 ? void 0 : _b.toString(),
            },
            tags: {
                search: (_c = req.query.q) === null || _c === void 0 ? void 0 : _c.toString(),
            },
        },
        skip: skip,
        take: 5,
    });
    res.json(products);
});
exports.searchProduct = searchProduct;
