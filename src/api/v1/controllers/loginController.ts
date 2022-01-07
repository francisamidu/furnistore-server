import express from "express";
import { check } from "express-validator";
import { Role } from "../db/models";

import { loginService } from "../services/index";

const router = express.Router();

const getRole = async () => {
  try {
    const role = await Role.findOne({ name: "user" });
    return role;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const userRole = getRole();
console.log(userRole);

router.post(
  "/",
  [check("username").isEmpty(), check("password").isEmpty()],
  loginService
);

export default router;
