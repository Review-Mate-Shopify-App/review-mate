import express from "express";
import model from "../models";
import sendEmail from "../services/mail_service";
import { getHtmlStringForReviewMail } from "../services/mjml_templates";

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

    //sending request review email to the customer 
    const htmlContent = getHtmlStringForReviewMail({
      receiverName: review.name,
      reviewPageUrl: 'google.com', //TODO: removed this with review page url;
    });

    await sendEmail({
      receiverEmail: review.email,
      subject: "Review your recent order at My Store",
      htmlBody: htmlContent,
    })

    console.log("Review Request added to the database:", review.toJSON());

    return res.status(201).send(review);

  } catch (error) {

    console.error("Error adding review to the database:", error);

    res.status(500).send("Internal Server Error");
  }
});

export default router;
