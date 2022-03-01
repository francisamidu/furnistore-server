import { User } from "../interfaces";
import { Request } from "express";

import { Role } from "../db/models";

const isAuthorized = (userRoles: any, allowedRoles: any) => {
  let isAuth: any[] = [];
  isAuth = allowedRoles
    .map((role: any) => userRoles.map((r: any) => r.code == role.code))
    .flat(Infinity)
    .some((value: boolean) => !!value);
  return isAuth;
};

type RequestType = {
  user: User;
};

const verifyRoles =
  (fun: (context: any, req: Request & RequestType) => any) =>
  async (context: any, req: Request & RequestType) => {
    const storedRoles = await Role.find({});
    const roles = req?.user?.roles;
    // console.log(context);
    // if (!roles) {
    //   throw new Error("Not authorized to perform this action");
    // }
    // const isUserAuthorized = isAuthorized(roles, storedRoles);
    // if (!isUserAuthorized) {
    //   throw new Error("Not authorized to perform this action");
    // }
    return fun(context, req);
  };

export default verifyRoles;
