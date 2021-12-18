"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { generate } = require("otp-generator");
exports.default = () => {
    const token = generate(5, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
    });
    return token;
};
