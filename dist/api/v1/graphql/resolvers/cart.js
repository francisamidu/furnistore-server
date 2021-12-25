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
exports.updateCart = exports.getCarts = exports.getCart = exports.deleteCart = exports.createCart = void 0;
const Cart_1 = __importDefault(require("../../db/models/Cart"));
// Gets all carts
const getCarts = (context, req) => __awaiter(void 0, void 0, void 0, function* () {
    const carts = yield Cart_1.default.find({ isDeleted: false });
    return carts;
});
exports.getCarts = getCarts;
// Gets a single cart
const getCart = ({ cartId }, req) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield Cart_1.default.findById(cartId);
    return Object.assign({ _id: cart._id.toString() }, cart);
});
exports.getCart = getCart;
// Create a single cart
const createCart = ({ cart: { userId, products } }, req) => __awaiter(void 0, void 0, void 0, function* () {
    const newCart = new Cart_1.default({
        userId,
        products,
    });
    yield newCart.save();
    return Object.assign(Object.assign({}, newCart._doc), { _id: newCart._id.toString() });
});
exports.createCart = createCart;
// Deletes a single cart
const deleteCart = ({ cartId }, req) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield Cart_1.default.findById(cartId);
    cart.isDeleted = true;
    yield cart.save();
    return {
        _id: cart._id.toString(),
    };
});
exports.deleteCart = deleteCart;
// Updates a single cart
const updateCart = ({ cartId, userId, products }, req) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield Cart_1.default.findById(cartId);
    cart.products = products;
    yield cart.save();
    return Object.assign(Object.assign({}, cart), { _id: cart._id.toString() });
});
exports.updateCart = updateCart;
