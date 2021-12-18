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
const OTP_1 = __importDefault(require("../db/models/OTP"));
const User_1 = __importDefault(require("../db/models/User"));
//Auth Utilities
const generateOTP_1 = __importDefault(require("../helpers/generateOTP"));
const hashValue_1 = __importDefault(require("../helpers/hashValue"));
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
    const user = yield User_1.default.findOne({ email });
    if (user) {
        return res
            .status(400)
            .json({ message: "User already exists", success: false });
    }
    //has user password
    const hashedPassword = yield (0, hashValue_1.default)(password);
    //create User and save to the database
    const newUser = new User_1.default({
        email,
        password: hashedPassword,
    });
    yield newUser.save();
    const verificationToken = new OTP_1.default({
        token: (0, generateOTP_1.default)(),
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
