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
//Creates a new password for a resetted account
const resetPasswordService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const newPassword = (0, helpers_1.hashValue)(password);
    user.password = newPassword;
    yield user.save();
    const { isAdmin, isVerified } = user;
    return res.json({
        message: "Password reset was successful",
        success: true,
        user: {
            _id: user._id,
        },
    });
});
exports.default = resetPasswordService;
