"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { timestamp, combine, colorize, errors, json } = winston_1.format;
const buildProdLogger = () => {
    return (0, winston_1.createLogger)({
        format: combine(colorize(), timestamp(), errors({ stack: true }), json()),
        defaultMeta: {
            service: "user-service",
        },
        transports: [new winston_1.transports.Console()],
    });
};
exports.default = buildProdLogger;
