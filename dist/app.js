"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Required libraries
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = require("mongoose");
const path_1 = require("path");
const express_session_1 = __importDefault(require("express-session"));
//Middlewares
const middlewares_1 = require("./api/v1/middlewares");
//Routes
const routes_1 = require("./api/v1/routes");
// import api from "./api/v1/routes/api";
//Port config
const PORT = process.env.PORT || 5000;
//Env config
require("dotenv").config();
//Init server app
const app = (0, express_1.default)();
//cors middleware config
app.use((0, cors_1.default)({
    credentials: true,
    origin: "http://localhost:3000",
}));
//Session
const sess = {
    resave: false,
    saveUninitialized: true,
    secret: process.env.SECRET || "thisissonotrecommended",
    cookie: { secure: false, maxAge: 60000 },
};
if (app.get("env") === "production") {
    app.set("trust proxy", 1); // trust first proxy
    sess.cookie.secure = true; // serve secure cookies
}
app.use((0, express_session_1.default)(sess));
//JSON,cookie,Form parsing and public path middlewares
app.use("/public", (0, express_1.static)((0, path_1.join)(__dirname, "..", "public")));
app.use((0, express_1.json)());
app.use((0, express_1.urlencoded)({ extended: false }));
//API routes
app.use("/auth", routes_1.auth);
app.use("/api", routes_1.api);
app.use("/graphql", [(0, middlewares_1.use)(middlewares_1.graphql)]);
app.use(middlewares_1.errorHandler);
(0, mongoose_1.connect)(`mongodb://localhost:27017/${process.env.DB_NAME}`)
    .then(() => {
    app.listen(PORT, () => console.log(`Server app runnning on port: %d`, PORT));
})
    .catch((error) => console.log(`Failed to establish a database connection: ${error.message}`));
