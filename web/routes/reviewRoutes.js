import express from "express";
import { addRating, createReviewRequest, productOverallRating, productRatingDistribution } from "../controllers/reviewController";

const router = express.Router();


router.post('/create', createReviewRequest);

router.post('/addRating', addRating);

router.get('/overallRating/:productId', productOverallRating);

router.get('/starRatingDistribution/:productId', productRatingDistribution);

export default router;
