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
const models_1 = require("../db/models");
//Logs out current user and deletes their session
const logoutService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accessToken, refreshToken } = req.body;
    const storedRefreshToken = yield models_1.Token.findOne({ token: refreshToken });
    if (!storedRefreshToken) {
        return res.status(400).json({
            message: "Logout failed. Please provide a valid refresh token",
            success: false,
        });
    }
    yield models_1.Token.findOneAndDelete({ token: accessToken });
    yield models_1.Token.findOneAndDelete({ token: refreshToken });
    return res.status(200).json({ message: "Logged out", success: true });
});
exports.default = logoutService;
