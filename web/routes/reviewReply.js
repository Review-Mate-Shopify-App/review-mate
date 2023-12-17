import express from "express";

import { createReviewReply } from "../controllers/replyController";

const router = express.Router();

router.post("/create", createReviewReply);

export default router;
