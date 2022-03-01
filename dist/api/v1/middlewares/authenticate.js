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
const helpers_1 = require("../helpers");
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.header("x-auth-token");
    const refreshToken = req.header("x-refresh-token");
    if (!refreshToken && !accessToken) {
        return res
            .status(401)
            .json({ success: false, message: "Unauthorized access. Login first!!!" });
    }
    //For valid access token
    const { payload, expired } = yield (0, helpers_1.verifyJwt)(accessToken);
    if (payload) {
        req.user = payload;
        return next();
    }
    //Expired but valid access token
    const { payload: refresh } = expired && refreshToken ? yield (0, helpers_1.verifyJwt)(refreshToken) : { payload: null };
    if (!refresh) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized access. Login first!!!",
        });
    }
    return next();
});
exports.default = authenticate;
