import model from "../models";
import sendEmail from "../services/mail_service";
import { getHtmlStringForReviewMail } from "../services/mjml_templates";
import shopifyService from "../services/shopifyService";

const request = model.review_request;

export const createReviewRequest = async (req, res) => {
  const { name, email, productId, productName } = req.query;
  try {
    const storeId = res.locals.shopify.session.shop;

    const productData =
      await shopifyService.shopifyAppInstance.api.rest.Product.find({
        session: res.locals.shopify.session,
        productId,
      });

    const imageSrc = productData.images[0].src;

    const review = await request.create({
      storeId,
      name,
      email,
      productId,
      isReviewed: false,
    });

    //sending request review email to the customer
    let productImageUrl = imageSrc;
    let requestId = review.id;

    let reviewPageUrl = `<webUrl>?product_name=${productName}&product_image_url=${productImageUrl}&request_id=${requestId}`;

    const htmlContent = getHtmlStringForReviewMail({
      receiverName: review.name,
      reviewPageUrl: reviewPageUrl, //TODO: removed this with review page url;
      productImageUrl: productImageUrl,
    });

    await sendEmail({
      receiverEmail: review.email,
      subject: "Review your recent order at My Store",
      htmlBody: htmlContent,
    });

    console.log("Review Request added to the database:", review.toJSON());

    return res.status(201).send(review);
  } catch (error) {
    console.error("Error adding review to the database:", error);

    res.status(500).send("Internal Server Error");
  }
};

export const addRating = async (req, res) => {
  try {
    const review = await request.update(
      {
        isReviewed: true,
        ratingStar: req.query.ratingStar,
        ratingMessage: req.query.ratingMessage,
      },
      {
        returning: true,
        where: {
          id: req.query.id,
        },
      }
    );
    console.log("Review added to the database:", review);

    return res.status(201).send(review);
  } catch (error) {
    console.error("Error adding review to the database:", error);

    res.status(500).send("Internal Server Error");
  }
};

export const getAllReviewsRequest = async (req, res) => {
  try {
    const allRecords = await request.findAll();

    console.log("All records:", allRecords);

    return res.status(200).json(allRecords);
  } catch (error) {
    console.error("Error retrieving all records:", error);

    res.status(500).send("Internal Server Error");
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const allRecords = await request.findAll({ where: { isReviewed: true } });

    console.log("All records:", allRecords);

    return res.status(200).json(allRecords);
  } catch (error) {
    console.error("Error retrieving all records:", error);

    res.status(500).send("Internal Server Error");
  }
};

export const reviewRequestAnalytics = async (req, res) => {
  try {
    const reviewsReceived = await request.count({
      where: { isReviewed: true },
    });

    const reviewsRequestSent = await request.count();

    return res.status(200).json({ reviewsReceived, reviewsRequestSent });
  } catch (error) {
    console.error("Error retrieving record count:", error);

    res.status(500).send("Internal Server Error");
  }
};

export const overallRating = async (req, res) => {
  try {
    const result = await request.findOne({
      attributes: [
        [
          model.sequelize.fn("AVG", model.sequelize.col("rating_star")),
          "averageRating",
        ],
        [
          model.sequelize.fn("COUNT", model.sequelize.col("rating_star")),
          "totalReviews",
        ],
      ],
      where: {
        isReviewed: true,
      },
      raw: true,
    });

    const { averageRating, totalReviews } = result;

    const response = {
      overallRating: averageRating || 0,
      totalReviews: totalReviews || 0,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error calculating overall rating:", error);

    res.status(500).send("Internal Server Error");
  }
};

export const allProductsRating = async (req, res) => {};

export const productRatingDistribution = async (req, res) => {
  try {
    const productId = req.params.productId;

    const starRatingDistribution = await request.findAll({
      attributes: [
        "rating_star",
        [
          model.sequelize.fn("COUNT", model.sequelize.col("rating_star")),
          "count",
        ],
      ],
      where: {
        product_id: productId,
        is_reviewed: true,
      },
      group: ["rating_star"],
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
        const match = starRatingDistribution.find(
          (entry) => entry.rating_star == rating
        );
        return match ? parseInt(match.count, 10) : 0;
      }
    });

    console.log(
      `Star Rating Distribution for product ${productId}:`,
      distributionArray
    );

    return res.status(200).json(distributionArray);
  } catch (error) {
    console.error("Error getting star rating distribution:", error);

    res.status(500).send("Internal Server Error");
  }
};
