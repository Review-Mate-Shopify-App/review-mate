import express from "express";

import productRouter from './productRoutes';

const router = express.Router();

router.use("/product", productRouter);

export default router;