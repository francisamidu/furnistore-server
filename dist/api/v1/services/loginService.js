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
const express_validator_1 = require("express-validator");
//Database models
const models_1 = require("../db/models");
//Auth Utilities
const helpers_1 = require("../helpers");
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
    const user = yield models_1.User.findOne({ email });
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
    const decryptedPassword = (0, helpers_1.decryptPassword)(user.password);
    const isPasswordMatching = (0, helpers_1.comparePassword)(password, decryptedPassword);
    if (!isPasswordMatching) {
        return res
            .status(403)
            .json({ message: "Passwords do not match", success: false });
    }
    //Sign JWT
    req.session.user = {
        _id: user._id,
        isAdmin,
    };
    const accessToken = yield (0, helpers_1.signJwt)({
        _id: user._id,
        isAdmin,
    });
    const refreshToken = yield (0, helpers_1.signJwt)({
        id: Date.now(),
    }, 3.154e10);
    //Save token to the database
    const savedToken = new models_1.Token({
        accessToken,
        refreshToken,
    });
    yield savedToken.save();
    return res.json({
        message: "Login successful",
        success: true,
        user: {
            _id: user._id,
            isAdmin,
            isVerified,
            accessToken,
            refreshToken,
        },
    });
});
exports.default = loginService;
