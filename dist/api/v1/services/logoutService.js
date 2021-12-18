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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = __importDefault(require("../db/models/Token"));
//Logs out current user and deletes their session
const logoutService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accessToken, refreshToken } = req.body;
    const storedRefreshToken = yield Token_1.default.findOne({ token: refreshToken });
    if (!storedRefreshToken) {
        return res.status(400).json({
            message: "Logout failed. Please provide a valid refresh token",
            success: false,
        });
    }
    yield Token_1.default.findOneAndDelete({ token: accessToken });
    yield Token_1.default.findOneAndDelete({ token: refreshToken });
    //Revoke access token cookie
    res.cookie("accessToken", "", {
        httpOnly: true,
        maxAge: 0,
    });
    //Revoke refresh token cookie
    res.cookie("refreshToken", "", {
        httpOnly: true,
        maxAge: 0,
    });
    return res.status(200).json({ message: "Logged out", success: true });
});
exports.default = logoutService;
