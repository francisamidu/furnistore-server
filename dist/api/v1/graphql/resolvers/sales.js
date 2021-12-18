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
exports.getSales = void 0;
const Order_1 = __importDefault(require("../../db/models/Order"));
const getSales = (context, req) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));
    const result = yield Order_1.default.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: previousMonth,
                },
            },
        },
        {
            $project: {
                month: {
                    $month: "createdAt",
                },
                sales: "$amount",
            },
        },
        {
            $group: {
                _id: "$month",
                total: {
                    $sum: "$sales",
                },
            },
        },
    ]);
    const sales = result.map((res) => (Object.assign({ _id: res._id.toString() }, res._doc)));
    return sales;
});
exports.getSales = getSales;
