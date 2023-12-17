import express from "express";
import {
  addRating,
  createReviewRequest,
  getAllReviews,
  reviewsReceivedCount,
  reviewsSentCount,
  overallRating,
  productRatingDistribution,
} from "../controllers/reviewController";

const router = express.Router();

router.post("/create", createReviewRequest);

router.post("/addRating", addRating);

router.get("/getAllReviews", getAllReviews);

router.get("/reviewsReceivedCount", reviewsReceivedCount);

router.get("/reviewsSentCount", reviewsSentCount);

router.get("/overallRating", overallRating);

router.get("/starRatingDistribution/:productId", productRatingDistribution);

export default router;
