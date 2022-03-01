"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { timestamp, combine, colorize, errors, printf, prettyPrint, json } = winston_1.format;
const buildDevLogger = () => {
    const logFormat = printf(({ level, message, timestamp, stack }) => {
        return `${timestamp} [${level}]: ${stack} ${message}`;
    });
    return (0, winston_1.createLogger)({
        format: combine(colorize(), timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), errors({ stack: true }), logFormat, json({
            space: 2,
        })
        // prettyPrint()
        ),
        transports: [new winston_1.transports.Console()],
    });
};
exports.default = buildDevLogger;
