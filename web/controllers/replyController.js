import model from "../models";

const request = model.reply_review;

export const createReviewReply = async (req, res) => {
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
};
