import express from "express";

import { logoutService } from "../services/index";

const router = express.Router();
router.post("/", logoutService);

export default router;
