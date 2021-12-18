"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const use = (fun) => (req, res, next) => {
    return Promise.resolve(fun(req, res, next)).catch(next);
};
exports.default = use;
