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
//New user account registration
const registrationService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    //Validate credentials and send back response message
    const validationResults = (0, express_validator_1.validationResult)(req);
    if (validationResults.length) {
        const errors = validationResults.errors.map((result) => ({
            message: result.msg,
            success: false,
        }));
        return res.status(401).json(errors);
    }
    //Query the database for user and send back response message
    const user = yield models_1.User.findOne({ email });
    if (user) {
        return res
            .status(400)
            .json({ message: "User already exists", success: false });
    }
    //has user password
    const hashedPassword = yield (0, helpers_1.hashValue)(password);
    //create User and save to the database
    const newUser = new models_1.User({
        email,
        password: hashedPassword,
    });
    yield newUser.save();
    const verificationToken = new models_1.OTP({
        token: (0, helpers_1.generateOTP)(),
    });
    yield verificationToken.save();
    return res.status(201).json({
        success: true,
        user: {
            email: newUser._doc.email,
            createdAt: newUser._doc.created_at,
        },
    });
});
exports.default = registrationService;
