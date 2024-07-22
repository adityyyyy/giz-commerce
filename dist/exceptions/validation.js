"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnproccessibleEntity = void 0;
const root_1 = require("./root");
class UnproccessibleEntity extends root_1.HttpException {
    constructor(message, errorCode, errors) {
        super(message, errorCode, 422, errors);
    }
}
exports.UnproccessibleEntity = UnproccessibleEntity;
