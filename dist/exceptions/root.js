"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = exports.HttpException = void 0;
class HttpException extends Error {
    constructor(message, errorCode, statusCode, error) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = error;
    }
}
exports.HttpException = HttpException;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["USER_NOT_FOUND"] = 1001] = "USER_NOT_FOUND";
    ErrorCode[ErrorCode["USER_ALREADY_EXISTS"] = 1002] = "USER_ALREADY_EXISTS";
    ErrorCode[ErrorCode["INCORRECT_PASSWORD"] = 1003] = "INCORRECT_PASSWORD";
    ErrorCode[ErrorCode["UNPROCESSIBLE_ENTITY"] = 2001] = "UNPROCESSIBLE_ENTITY";
    ErrorCode[ErrorCode["INTERNAL_SERVER_ERROR"] = 3001] = "INTERNAL_SERVER_ERROR";
    ErrorCode[ErrorCode["UNAUTHORIZED_ACCESS"] = 4001] = "UNAUTHORIZED_ACCESS";
    ErrorCode[ErrorCode["PRODUCT_NOT_FOUND"] = 5001] = "PRODUCT_NOT_FOUND";
    ErrorCode[ErrorCode["ADDRESS_NOT_FOUND"] = 1004] = "ADDRESS_NOT_FOUND";
    ErrorCode[ErrorCode["ORDER_NOT_FOUND"] = 5002] = "ORDER_NOT_FOUND";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
