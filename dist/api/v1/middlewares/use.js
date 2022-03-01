"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const use = (fun) => (req, res, next) => {
    // logger.log({
    //   level: "info",
    //   message: JSON.stringify(req.session),
    // });
    return Promise.resolve(fun(req, res, next)).catch(next);
};
exports.default = use;
