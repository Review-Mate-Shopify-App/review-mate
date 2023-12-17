import model from "../models";
import sendEmail from "../services/mail_service";
import { getHtmlStringForReviewMail } from "../services/mjml_templates";

const request = model.review_request;

export const createReviewRequest = async (req, res) => {
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
}

export const addRating = async (req, res) => {
  try {
    const review = await request.update(
      {
        isReviewed: true,
        ratingStar: req.body.ratingStar,
        ratingMessage: req.body.ratingMessage,
      },
      {
        returning: true,
        where: {
          id: req.body.id,
          storeId: req.body.storeId,
          name: req.body.name,
          email: req.body.email,
          productId: req.body.productId,
        },
      }
    );
    console.log("Review added to the database:", review);

    return res.status(201).send(review);
  } catch (error) {
    console.error("Error adding review to the database:", error);

    res.status(500).send("Internal Server Error");
  }
}

export const productOverallRating = async (req, res) => {
  try {
    const productId = req.params.productId;

    const result = await request.findOne({
      attributes: [
        [model.sequelize.fn('AVG', model.sequelize.col('rating_star')), 'averageRating'],
        [model.sequelize.fn('COUNT', model.sequelize.col('rating_star')), 'totalReviews'],
      ],
      where: {
        productId: productId,
        isReviewed: true,
      },
      raw: true,
    });

    const { averageRating, totalReviews } = result;

    console.log(`Overall rating for product ${productId}: ${averageRating} (based on ${totalReviews} reviews)`);

    return res.status(200).json({
      productId: productId,
      averageRating: averageRating || 0,
      totalReviews: totalReviews || 0,
    });
  } catch (error) {
    console.error("Error calculating overall rating:", error);

    res.status(500).send("Internal Server Error");
  }
}

export const productRatingDistribution = async (req, res) => {
  try {
    const productId = req.params.productId;

    const starRatingDistribution = await request.findAll({
      attributes: [
        'rating_star',
        [model.sequelize.fn('COUNT', model.sequelize.col('rating_star')), 'count'],
      ],
      where: {
        product_id: productId,
        is_reviewed: true,
      },
      group: ['rating_star'],
      raw: true,
    });

    const unreviewedCount = await request.count({
      where: {
        product_id: productId,
        is_reviewed: false,
      },
    });

    const distributionArray = Array.from({ length: 6 }, (_, index) => {
      if (index === 0) {
        return unreviewedCount;
      } else {
        const rating = index.toString();
        const match = starRatingDistribution.find(entry => entry.rating_star == rating);
        return match ? parseInt(match.count, 10) : 0;
      }
    });

    console.log(`Star Rating Distribution for product ${productId}:`, distributionArray);

    return res.status(200).json(distributionArray);
  } catch (error) {
    console.error("Error getting star rating distribution:", error);

    res.status(500).send("Internal Server Error");
  }
}