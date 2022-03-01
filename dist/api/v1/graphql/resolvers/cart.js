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
exports.updateCart = exports.getCarts = exports.getCart = exports.deleteCart = exports.createCart = void 0;
const models_1 = require("../../db/models");
// Gets all carts
const getCarts = (context, _) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield models_1.Cart.find({ isDeleted: false });
    const carts = result.map((res) => (Object.assign(Object.assign({}, res._doc), { _id: res._id })));
    return carts;
});
exports.getCarts = getCarts;
// Gets a single cart
const getCart = ({ cartId }, _) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield models_1.Cart.findById(cartId);
    return Object.assign({ _id: cart._id.toString() }, cart._doc);
});
exports.getCart = getCart;
// Create a single cart
const createCart = ({ cart: { userId, products } }, _) => __awaiter(void 0, void 0, void 0, function* () {
    const newCart = new models_1.Cart({
        userId,
        products,
    });
    yield newCart.save();
    return Object.assign(Object.assign({}, newCart._doc), { _id: newCart._id.toString() });
});
exports.createCart = createCart;
// Deletes a single cart
const deleteCart = ({ cartId }, _) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield models_1.Cart.findById(cartId);
    cart.isDeleted = true;
    yield cart.save();
    return {
        _id: cart._id.toString(),
    };
});
exports.deleteCart = deleteCart;
// Updates a single cart
const updateCart = ({ cartId, userId, products }, _) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield models_1.Cart.findById(cartId);
    cart.products = products;
    yield cart.save();
    return Object.assign(Object.assign({}, cart._doc), { _id: cart._id.toString() });
});
exports.updateCart = updateCart;
