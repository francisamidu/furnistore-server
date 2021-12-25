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
const models_1 = require("../db/models");
//Validates OTP for password reset verification
const validateOTPService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { otp } = req.body;
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
    const savedOTP = yield models_1.OTP.findOne({ token: otp });
    if (!savedOTP) {
        return res.status(404).json({ message: "OTP is invalid", success: false });
    }
    //Delete otp after validation
    yield models_1.OTP.findOneAndDelete({ token: otp });
    return res
        .status(200)
        .json({ message: "OTP has been validated", sucess: true });
});
exports.default = validateOTPService;
