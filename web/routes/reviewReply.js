import express from "express";
import model from "../models";


const router = express.Router();

const request = model.review_reply;

router.post("/", async (req, res) => {
    try {
      const review = await request.create({
        reviewId: req.body.reviewId,
        reply: req.body.reply,
      });
  
      console.log("Review Request added to the database:", review.toJSON());
  
      return res.status(201).send(review);
    } catch (error) {
      console.error("Error adding review to the database:", error);
  
      res.status(500).send("Internal Server Error");
    }
  });

export default router;
