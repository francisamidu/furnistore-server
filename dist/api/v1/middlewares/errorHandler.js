"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
function default_1(error, req, res, next) {
    logger_1.default.log({
        level: "error",
        message: error.message,
    });
    res.status(500).send({ message: "Something went wrong. Sorry" });
}
exports.default = default_1;
