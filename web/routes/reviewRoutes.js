import express from "express";
import {
  addRating,
  createReviewRequest,
  getAllReviewsRequest,
  getAllReviews,
  getAllCustomers,
  reviewRequestAnalytics,
  productReviewAnalytics,
  overallRating,
  productRatingDistribution,
} from "../controllers/reviewController";

const router = express.Router();

router.get("/create", createReviewRequest);

router.get("/addRating", addRating);

router.get("/getAllReviewsRequest", getAllReviewsRequest);

router.get("/getAllReviews", getAllReviews);

router.get("/productReviewAnalytics", productReviewAnalytics);

router.get("/reviewRequestAnalytics", reviewRequestAnalytics);

router.get("/getAllCustomers", getAllCustomers);

router.get("/overallRating", overallRating);

router.get("/starRatingDistribution/:productId", productRatingDistribution);

export default router;
