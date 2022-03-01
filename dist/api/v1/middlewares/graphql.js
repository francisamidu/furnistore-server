"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_graphql_1 = require("express-graphql");
const schema_1 = __importDefault(require("../graphql/schema"));
const index_1 = __importDefault(require("../graphql/resolvers/index"));
const extensions = ({ operationName }) => {
    return {
        operationName,
    };
};
exports.default = (0, express_graphql_1.graphqlHTTP)(() => {
    return {
        schema: schema_1.default,
        rootValue: index_1.default,
        graphiql: true,
        pretty: true,
        customFormatErrorFn: (error) => {
            return {
                message: error.message,
            };
        },
        extensions,
    };
});
