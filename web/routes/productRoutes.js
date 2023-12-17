import express from "express";
import { productCount } from "../controllers/productController";

const router = express.Router();

router.get('/count', productCount);

module.exports = router;