import express from "express";

import productRouter from "./productRoutes";

import reviewRouter from './reviewRequest';

const router = express.Router();

router.use("/products", productRouter);

router.use("/review", reviewRouter);

export default router;
