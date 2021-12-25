"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOTPController = exports.sendOTPController = exports.resetPasswordController = exports.registrationController = exports.logoutController = exports.loginController = exports.imageUploadController = void 0;
const imageUploadController_1 = __importDefault(require("../controllers/imageUploadController"));
exports.imageUploadController = imageUploadController_1.default;
const loginController_1 = __importDefault(require("../controllers/loginController"));
exports.loginController = loginController_1.default;
const logoutController_1 = __importDefault(require("../controllers/logoutController"));
exports.logoutController = logoutController_1.default;
const registrationController_1 = __importDefault(require("../controllers/registrationController"));
exports.registrationController = registrationController_1.default;
const resetPasswordController_1 = __importDefault(require("../controllers/resetPasswordController"));
exports.resetPasswordController = resetPasswordController_1.default;
const sendOTPController_1 = __importDefault(require("../controllers/sendOTPController"));
exports.sendOTPController = sendOTPController_1.default;
const validateOTPController_1 = __importDefault(require("../controllers/validateOTPController"));
exports.validateOTPController = validateOTPController_1.default;
