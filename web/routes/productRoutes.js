import express from "express";
import { getProducts, productCount } from "../controllers/productController";

const router = express.Router();

router.get('/count', productCount);
router.get('/', getProducts);

module.exports = router;