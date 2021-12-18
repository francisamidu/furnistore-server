"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrationService = exports.logoutService = exports.loginService = void 0;
const loginService_1 = __importDefault(require("./loginService"));
exports.loginService = loginService_1.default;
const logoutService_1 = __importDefault(require("./logoutService"));
exports.logoutService = logoutService_1.default;
const registrationService_1 = __importDefault(require("./registrationService"));
exports.registrationService = registrationService_1.default;
