import express from "express";

import productRouter from "./productRoutes";

import reviewRouter from './reviewRequest';

import replyRouter from './reviewReply';

const router = express.Router();

router.use("/products", productRouter);

router.use("/review", reviewRouter);

router.use("/reviewReply", replyRouter);

export default router;
