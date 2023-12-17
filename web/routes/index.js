import express from "express";

import productRouter from "./productRoutes";

const router = express.Router();

router.use("/products", productRouter);

export default router;
