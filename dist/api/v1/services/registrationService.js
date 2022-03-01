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
    const { email, password, page } = req.body;
    //Validate credentials and send back response message
    //Check for empty credentials and send back response message
    const validationResults = (0, express_validator_1.validationResult)(req).formatWith(helpers_1.serializeValidationResults);
    const results = validationResults.array();
    if (results.length) {
        return res.status(406).json(results);
    }
    //Query the database for user and send back response message
    const user = yield models_1.User.findOne({ email });
    //Find all users and check if there's already an admin
    const adminUser = yield models_1.User.findOne({}).$where((res) => res.roles.some((role) => role.name === "admin"));
    if (user) {
        return res
            .status(400)
            .json({ message: "User already exists", success: false });
    }
    //has user password
    const hashedPassword = yield (0, helpers_1.hashValue)(password);
    //Find the base role
    //Assign user based on page and existing admin
    const role = !adminUser
        ? yield models_1.Role.findOne({
            name: "admin",
        })
        : page == "dashboard"
            ? yield models_1.Role.findOne({
                name: "staff",
            })
            : yield models_1.Role.findOne({
                name: "user",
            });
    if (!role) {
        return res.status(500).json({ message: "Signup failed", success: false });
    }
    //create User and save to the database
    const newUser = new models_1.User({
        email,
        password: hashedPassword,
        roles: [role],
    });
    yield newUser.save();
    // const verificationToken = new OTP({
    //   token: generateOTP(),
    // });
    // await verificationToken.save();
    return res.status(201).json({
        success: true,
        user: {
            email: newUser._doc.email,
            createdAt: newUser._doc.created_at,
            roles: [role._doc.code],
        },
    });
});
exports.default = registrationService;
