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
exports.getUserById = exports.getAllUsers = exports.updateAddress = exports.deleteAddress = exports.addAddress = exports.getAllAddresses = exports.updateUser = void 0;
const __1 = require("..");
const not_found_1 = require("../exceptions/not-found");
const root_1 = require("../exceptions/root");
const user_1 = require("../schemas/user");
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const validateData = user_1.UserUpdateSchema.parse(req.body);
    if (validateData.billingAddress) {
        const billingAddress = yield __1.prismaClient.address.findFirst({
            where: {
                id: validateData.billingAddress,
                userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
            },
        });
        if (!billingAddress) {
            throw new not_found_1.NotFoundException("Address not found", root_1.ErrorCode.ADDRESS_NOT_FOUND);
        }
    }
    if (validateData.shippingAddress) {
        const shippingAddress = yield __1.prismaClient.address.findFirst({
            where: {
                id: validateData.shippingAddress,
                userId: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id,
            },
        });
        if (!shippingAddress) {
            throw new not_found_1.NotFoundException("Address not found", root_1.ErrorCode.ADDRESS_NOT_FOUND);
        }
    }
    const updatedUser = yield __1.prismaClient.user.update({
        where: {
            id: (_c = req.user) === null || _c === void 0 ? void 0 : _c.id,
        },
        data: validateData,
    });
    res.json(updatedUser);
});
exports.updateUser = updateUser;
const getAllAddresses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const addresses = yield __1.prismaClient.address.findMany({
        where: {
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
        },
    });
    if (addresses.length === 0) {
        throw new not_found_1.NotFoundException("No address found", root_1.ErrorCode.ADDRESS_NOT_FOUND);
    }
    res.json(addresses);
});
exports.getAllAddresses = getAllAddresses;
const addAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const validatedData = user_1.AddressCreateSchema.parse(req.body);
    const createdAddress = yield __1.prismaClient.address.create({
        data: Object.assign(Object.assign({}, req.body), { userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id }),
    });
    res.json(createdAddress);
});
exports.addAddress = addAddress;
const deleteAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    yield __1.prismaClient.address.delete({
        where: { id: +req.params.id, userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id },
    });
    res.json({ message: "Success" });
});
exports.deleteAddress = deleteAddress;
const updateAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const validatedData = user_1.AddressUpdateSchema.parse(req.body);
    const updatedAddress = yield __1.prismaClient.address.update({
        where: {
            id: +req.params.id,
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
        },
        data: validatedData,
    });
    if (!updatedAddress) {
        throw new not_found_1.NotFoundException("Address not found", root_1.ErrorCode.ADDRESS_NOT_FOUND);
    }
    res.json(updatedAddress);
});
exports.updateAddress = updateAddress;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let skip = 0;
    if (req.query.skip) {
        skip = +req.query.skip;
    }
    const users = yield __1.prismaClient.user.findMany({
        skip: skip,
        take: 10,
        select: {
            name: true,
            role: true,
        },
    });
    res.json(users);
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield __1.prismaClient.user.findFirst({
        where: {
            id: +req.params.id,
        },
        select: {
            name: true,
            role: true,
        },
    });
    if (!user) {
        throw new not_found_1.NotFoundException("User not found", root_1.ErrorCode.USER_NOT_FOUND);
    }
    res.json(user);
});
exports.getUserById = getUserById;
