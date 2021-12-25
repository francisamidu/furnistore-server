"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRole = exports.authorizeResource = void 0;
const authorizeRole = (roles) => {
    return (req, res, next) => {
        const userRole = req.body.role;
        if (roles.includes(userRole)) {
            next();
        }
        else {
            return res.status(401).json({
                message: "You don't have permission to access this resource",
                success: false,
            });
        }
    };
};
exports.authorizeRole = authorizeRole;
const authorizeResource = (resources) => {
    return (req, res, next) => {
        const resource = req.body.resource;
        if (resources.includes(resource)) {
            next();
        }
        else {
            return res.status(401).json({
                message: "You don't have permission to access this resource",
                success: false,
            });
        }
    };
};
exports.authorizeResource = authorizeResource;
