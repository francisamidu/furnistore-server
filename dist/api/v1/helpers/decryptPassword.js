"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_js_1 = require("crypto-js");
exports.default = (password) => {
    const hashedPassword = crypto_js_1.AES.decrypt(password, process.env.SECRET || "thisisnotideal");
    const decryptedPassword = hashedPassword.toString(crypto_js_1.enc.Utf8);
    return decryptedPassword;
};
