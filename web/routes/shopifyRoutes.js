import express from "express";

import { installApp } from "../controllers/shopifyController";

const router = express.Router();

router.get("/install", installApp);

export default router;
