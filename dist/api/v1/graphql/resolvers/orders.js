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
exports.updateOrder = exports.getOrdersByUser = exports.getOrderByUser = exports.getOrderStats = exports.getOrders = exports.getOrder = exports.deleteOrder = exports.createOrder = void 0;
const models_1 = require("../../db/models");
// Gets single order
const getOrder = ({ orderId }, _) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield models_1.Order.findById(orderId);
    return Object.assign({ _id: result._id }, result._doc);
});
exports.getOrder = getOrder;
// Gets all orders
const getOrders = (context, _) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield models_1.Order.find({});
    const orders = result.map((order) => (Object.assign({ _id: order._id.toString() }, order._doc)));
    return orders;
});
exports.getOrders = getOrders;
// Gets single order by user
const getOrderByUser = ({ userId }, _) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield models_1.Order.findOne({ userId });
    return Object.assign({ _id: result._id }, result._doc);
});
exports.getOrderByUser = getOrderByUser;
// Gets order by user
const getOrdersByUser = ({ userId }, _) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield models_1.Order.find({ userId });
    const orders = result.map((order) => (Object.assign({ _id: order._id.toString() }, order._doc)));
    return orders;
});
exports.getOrdersByUser = getOrdersByUser;
// Gets order statistics
const getOrderStats = (context, _) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    const result = yield models_1.Order.aggregate([
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
const createOrder = ({ userId, product, amount, address }, _) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findById(userId);
    const storedAddress = yield models_1.Address.findById(address);
    if (!storedAddress) {
        throw new Error("Address doesnt exist");
    }
    if (!user) {
        throw new Error("User doesnt exist");
    }
    const newOrder = new models_1.Order({
        amount,
        address: storedAddress,
        product,
        userId: user,
    });
    yield newOrder.save();
    return Object.assign(Object.assign({}, newOrder._doc), { _id: newOrder._id.toString() });
});
exports.createOrder = createOrder;
// Deletes a single order
const deleteOrder = ({ orderId }, _) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield models_1.Order.findById(orderId);
    order.isDeleted = true;
    yield order.save();
    return Object.assign(Object.assign({}, order._doc), { _id: order._id.toString() });
});
exports.deleteOrder = deleteOrder;
// Updates a single order
const updateOrder = ({ orderId, orderInput: { userId, products, amount, address } }, _) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield models_1.Order.findById(orderId);
    order.userId = userId;
    order.products = products;
    order.amount = amount;
    order.address = address;
    yield order.save();
    return Object.assign(Object.assign({}, order._doc), { _id: order._id.toString() });
});
exports.updateOrder = updateOrder;
