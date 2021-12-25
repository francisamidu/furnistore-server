"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(error, req, res, next) {
    console.log(error);
    // logger.log({
    //   level: "error",
    //   message: error.message,
    // });
    res.status(500).send({ message: "Something went wrong. Sorry" });
}
exports.default = default_1;
