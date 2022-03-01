import express from "express";

import { genTokenService } from "../services/index";

const router = express.Router();
router.post("/", genTokenService);

export default router;
