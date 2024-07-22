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
exports.updateAddress = exports.deleteAddress = exports.addAddress = exports.getAllAddresses = void 0;
const __1 = require("..");
const not_found_1 = require("../exceptions/not-found");
const root_1 = require("../exceptions/root");
const user_1 = require("../schemas/user");
const getAllAddresses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const addresses = yield __1.prismaClient.address.findMany({
        where: {
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
        },
    });
    if (!addresses) {
        throw new not_found_1.NotFoundException("No address found", root_1.ErrorCode.ADDRESS_NOT_FOUND);
    }
    res.json(addresses);
});
exports.getAllAddresses = getAllAddresses;
const addAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    user_1.AddressCreateSchema.parse(req.body);
    const createdAddress = yield __1.prismaClient.address.create({
        data: Object.assign(Object.assign({}, req.body), { userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id }),
    });
    res.json(createdAddress);
});
exports.addAddress = addAddress;
const deleteAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield __1.prismaClient.address.delete({
        where: {
            id: +req.params.id,
        },
    });
    res.json({ message: "Success" });
});
exports.deleteAddress = deleteAddress;
const updateAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    user_1.AddressUpdateSchema.parse(req.body);
    const updatedAddress = yield __1.prismaClient.address.update({
        where: {
            id: +req.params.id,
        },
        data: Object.assign({}, req.body),
    });
    res.json(updatedAddress);
});
exports.updateAddress = updateAddress;
