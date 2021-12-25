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
exports.updateOrder = exports.getOrdersByUser = exports.getOrderByUser = exports.getOrderStats = exports.getOrders = exports.getOrder = exports.deleteOrder = exports.createOrder = void 0;
const Order_1 = __importDefault(require("../../db/models/Order"));
// Gets single order
const getOrder = ({ orderId }, req) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Order_1.default.findById(orderId);
    return Object.assign({ _id: result._id }, result._doc);
});
exports.getOrder = getOrder;
// Gets all orders
const getOrders = (context, req) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Order_1.default.find({});
    const orders = result.map((order) => (Object.assign({ _id: order._id.toString() }, order._doc)));
    return orders;
});
exports.getOrders = getOrders;
// Gets single order by user
const getOrderByUser = ({ userId }, req) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Order_1.default.findOne({ userId });
    return Object.assign({ _id: result._id }, result._doc);
});
exports.getOrderByUser = getOrderByUser;
// Gets order by user
const getOrdersByUser = ({ userId }, req) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Order_1.default.find({ userId });
    const orders = result.map((order) => (Object.assign({ _id: order._id.toString() }, order._doc)));
    return orders;
});
exports.getOrdersByUser = getOrdersByUser;
// Gets order statistics
const getOrderStats = (context, req) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    const result = yield Order_1.default.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: lastYear,
                },
            },
        },
        {
            $project: {
                month: {
                    $month: "createdAt",
                },
            },
        },
        {
            $group: {
                _id: "$month",
                total: {
                    sum: 1,
                },
            },
        },
    ]);
    const orders = result.map((order) => (Object.assign({ _id: order._id.toString() }, order._doc)));
    return orders;
});
exports.getOrderStats = getOrderStats;
// Creates a single order
const createOrder = ({ userId, product, amount, address }, req) => __awaiter(void 0, void 0, void 0, function* () {
    const newOrder = new Order_1.default({
        amount,
        address,
        product,
        userId,
    });
    yield newOrder.save();
    return Object.assign(Object.assign({}, newOrder), { _id: newOrder._id.toString() });
});
exports.createOrder = createOrder;
// Deletes a single order
const deleteOrder = ({ orderId }, req) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield Order_1.default.findById(orderId);
    order.isDeleted = true;
    yield order.save();
    return Object.assign(Object.assign({}, order), { _id: order._id.toString() });
});
exports.deleteOrder = deleteOrder;
// Updates a single order
const updateOrder = ({ orderId, orderInput: { userId, products, amount, address } }, req) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield Order_1.default.findById(orderId);
    order.userId = userId;
    order.products = products;
    order.amount = amount;
    order.address = address;
    yield order.save();
    return Object.assign(Object.assign({}, order), { _id: order._id.toString() });
});
exports.updateOrder = updateOrder;
