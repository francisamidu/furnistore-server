import { NextFunction, Request, Response } from "express";
import Resource from "../interfaces/Resource";
import Role from "../interfaces/Role";

const authorizeRole = (roles: Array<Role>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.body.role;
    if (roles.includes(userRole)) {
      next();
    } else {
      return res.status(401).json({
        message: "You don't have permission to access this resource",
        success: false,
      });
    }
  };
};

const authorizeResource = (resources: Array<Resource>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const resource = req.body.resource;
    if (resources.includes(resource)) {
      next();
    } else {
      return res.status(401).json({
        message: "You don't have permission to access this resource",
        success: false,
      });
    }
  };
};

export { authorizeResource, authorizeRole };
