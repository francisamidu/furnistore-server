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
exports.updateUser = exports.getUserStats = exports.getUsers = exports.getUser = exports.deleteUser = exports.createUser = void 0;
const models_1 = require("../../db/models");
const helpers_1 = require("../../helpers");
//Creates an individual user
const createUser = ({ user: { avatar, email, name, password, gender } }, _) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield (0, helpers_1.hashValue)(password);
    const user = new models_1.User({
        avatar,
        email,
        name,
        gender,
        password: hashedPassword,
    });
    yield user.save();
    return Object.assign(Object.assign({}, user._doc), { _id: user._id.toString() });
});
exports.createUser = createUser;
// Gets user statistics
const getUserStats = (context, _) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    const result = yield models_1.User.aggregate([
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
    const users = result.map((user) => (Object.assign({ _id: user._id.toString() }, user._doc)));
    return users;
});
exports.getUserStats = getUserStats;
// Gets a single User
const getUser = ({ userId }, _) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield models_1.User.findById(userId);
    return Object.assign({ _id: result._id }, result._doc);
});
exports.getUser = getUser;
// Gets all users
const getUsers = (context, _) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield models_1.User.find({ isDeleted: false });
    const users = result.map((user) => (Object.assign({ _id: user._id.toString() }, user._doc)));
    return users;
});
exports.getUsers = getUsers;
// Deletes a single user
const deleteUser = ({ userId }, _) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findById(userId);
    user.isDeleted = true;
    yield user.save();
    return Object.assign(Object.assign({}, user._doc), { _id: user._id.toString() });
});
exports.deleteUser = deleteUser;
// Updates a single user
const updateUser = ({ userId, user: { avatar, email, name, password, gender } }, _) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findById(userId);
    user.avatar = avatar;
    user.email = email;
    user.name = name;
    user.password = password;
    user.gender = gender;
    yield user.save();
    return Object.assign(Object.assign({}, user._doc), { _id: user._id.toString() });
});
exports.updateUser = updateUser;
