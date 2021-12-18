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
const express_validator_1 = require("express-validator");
//Database models
const User_1 = __importDefault(require("../db/models/User"));
const Token_1 = __importDefault(require("../db/models/Token"));
//Auth Utilities
const comparePassword_1 = __importDefault(require("../helpers/comparePassword"));
const decryptPassword_1 = __importDefault(require("../helpers/decryptPassword"));
const signJwt_1 = __importDefault(require("../helpers/signJwt"));
//Logs in user and creates a new session
const loginService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    //Check for empty credentials and send back response message
    const validationResults = (0, express_validator_1.validationResult)(req);
    if (validationResults.length) {
        return res.status(403).json({
            message: "Please provide valid login credentials",
            success: false,
        });
    }
    //Query the database for user and send back response message
    const user = yield User_1.default.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "No user found", success: false });
    }
    const { isAdmin, isVerified } = user;
    if (!isVerified) {
        return res
            .status(401)
            .json({ message: "Account verification required", success: false });
    }
    //Compare password and send back response message
    const decryptedPassword = (0, decryptPassword_1.default)(user.password);
    const isPasswordMatching = (0, comparePassword_1.default)(password, decryptedPassword);
    if (!isPasswordMatching) {
        return res
            .status(403)
            .json({ message: "Passwords do not match", success: false });
    }
    //Sign JWT
    const accessToken = yield (0, signJwt_1.default)({
        _id: user._id,
        isAdmin,
    });
    const refreshToken = yield (0, signJwt_1.default)({
        id: Date.now(),
    }, 3.154e10);
    //Save token to the database
    const savedToken = new Token_1.default({
        accessToken,
        refreshToken,
    });
    yield savedToken.save();
    //Set access token cookie
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 36000000, // 1hr expiry
    });
    //Set refresh token cookie
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 86400000, // 1 day expiry
    });
    return res.json({
        message: "Login successful",
        success: true,
        user: {
            _id: user._id,
            isAdmin,
            isVerified,
        },
    });
});
exports.default = loginService;
