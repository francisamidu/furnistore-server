const router = require("express").Router();

import use from "../middlewares/use";

// Register routes
router.use("/login", use(require("../controllers/loginController")));
router.use("/logout", use(require("../controllers/logoutController")));
router.use(
  "/register",
  use(require("../../controllers/registerationController"))
);

export default router;
