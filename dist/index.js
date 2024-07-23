"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = void 0;
const express_1 = __importDefault(require("express"));
const secrets_1 = require("./secrets");
const routes_1 = __importDefault(require("./routes"));
const client_1 = require("@prisma/client");
const errors_1 = require("./middlewares/errors");
const logger_1 = require("./middlewares/logger");
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("Server OK.");
});
app.use(express_1.default.json());
app.use(logger_1.logger);
app.use("/api", routes_1.default);
exports.prismaClient = new client_1.PrismaClient({
    log: ["error"],
}).$extends({
    result: {
        address: {
            formattedAddress: {
                needs: {
                    lineOne: true,
                    lineTwo: true,
                    city: true,
                    country: true,
                    pincode: true,
                },
                compute(addr) {
                    return `${addr.lineOne}, ${addr.lineTwo}, ${addr.city}, ${addr.country} - ${addr.pincode}`;
                },
            },
        },
    },
});
app.use(errors_1.errorMiddleware);
app.listen(secrets_1.PORT, () => {
    console.log("Server started on: 3000");
});
