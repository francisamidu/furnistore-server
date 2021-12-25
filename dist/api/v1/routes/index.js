"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = exports.auth = void 0;
const auth_1 = __importDefault(require("./auth"));
exports.auth = auth_1.default;
const api_1 = __importDefault(require("./api"));
exports.api = api_1.default;
