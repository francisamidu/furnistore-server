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
const User_1 = __importDefault(require("./models/User"));
const mongoose_1 = require("mongoose");
// Creates a test and admin account for testing purposes
const seed = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isTestAccountAlreadyCreated = yield User_1.default.findOne({
            email: "test@test.com",
        });
        const isAdminAccountAlreadyCreated = yield User_1.default.findOne({
            username: "admin@test.com",
        });
        if (!isTestAccountAlreadyCreated) {
            const newUser = new User_1.default({
                username: "test",
                email: "test@test.com",
                password: "(Testaccount1)",
            });
            yield newUser.save();
            console.log(`seeded test user account`);
            (0, mongoose_1.disconnect)();
        }
        else {
            console.log("User account already exists");
            (0, mongoose_1.disconnect)();
        }
        if (!isAdminAccountAlreadyCreated) {
            const newUser = new User_1.default({
                username: "admin",
                email: "admin@test.com",
                password: "(Adminaccount1)",
            });
            yield newUser.save();
            console.log(`seeded test user account`);
            (0, mongoose_1.disconnect)();
        }
        else {
            console.log("User account already exists");
            (0, mongoose_1.disconnect)();
        }
    }
    catch (error) {
        console.log(`Seed failed:${error}`);
        (0, mongoose_1.disconnect)();
    }
});
function runSeed() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("seeding...");
        try {
            yield seed();
        }
        catch (err) {
            console.error(err);
            process.exitCode = 1;
        }
    });
}
//Database connection
(0, mongoose_1.connect)("mongodb://localhost:27017/furnistore", {
    autoIndex: true,
})
    .then(() => {
    runSeed();
})
    .catch((error) => console.log(error));
