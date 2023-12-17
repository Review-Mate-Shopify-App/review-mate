import express from "express";
import model from "../models";

const router = express.Router();

const request = model.review_request;

router.post("/", async (req, res) => {
  try {    
    const review = await request.create({
      storeId: req.body.storeId,
      name: req.body.name,
      email: req.body.email,
      productId: req.body.productId,
      isReviewed: false,
    });

    console.log("Review Request added to the database:", review.toJSON());

    return res.status(201).send(review);

  } catch (error) {

    console.error("Error adding review to the database:", error);

    res.status(500).send("Internal Server Error");
  }
});

export default router;
