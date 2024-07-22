"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = void 0;
const unauthorizedException_1 = require("../exceptions/unauthorizedException");
const root_1 = require("../exceptions/root");
const adminMiddleware = (req, res, next) => {
    const user = req.user;
    if ((user === null || user === void 0 ? void 0 : user.role) == "ADMIN") {
        next();
    }
    else {
        next(new unauthorizedException_1.UnauthorizedException("Unauthorized Access", root_1.ErrorCode.UNAUTHORIZED_ACCESS));
    }
};
exports.adminMiddleware = adminMiddleware;
