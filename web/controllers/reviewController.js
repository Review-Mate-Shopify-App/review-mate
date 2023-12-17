import model from "../models";
import sendEmail from "../services/mail_service";
import { getHtmlStringForReviewMail } from "../services/mjml_templates";
import shopifyService from "../services/shopifyService";

const request = model.review_request;

export const createReviewRequest = async (req, res) => {
  const { name, email, productId, productName } = req.query;
  console.log("####", req.query);
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
      productName,
      isReviewed: false,
    });

    //sending request review email to the customer
    let productImageUrl = imageSrc;
    let requestId = review.id;
    let redirectUri =
      "https://2c0b-2401-4900-1c54-4d84-dde2-a72-3f7-926.ngrok-free.app/review-requests/update";
    let webUrl = "http://localhost:3000/feedback";

    let reviewPageUrl = `${webUrl}?product_name=${productName}&product_image_url=${productImageUrl}&request_id=${requestId}&redirect_uri=${redirectUri}`;

    const htmlContent = getHtmlStringForReviewMail({
      receiverName: review.name,
      reviewPageUrl: reviewPageUrl, //TODO: removed this with review page url;
      productImageUrl: productImageUrl,
      productName: productName,
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

export const createReviewReply = async (req, res) => {
  const { reviewId } = req.query;
  try {
    const review = await request.update(
      {
        ratingMessageReply: req.query.ratingMessageReply,
      },
      { where: { id: reviewId } }
    );

    console.log("Reply message added:", review);

    return res.status(201).json(review);
  } catch (error) {
    console.error("Error adding reply to the database:", error);

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
    const publishedCount = await request.count({
      where: { isPublished: true },
    });
    const pendingCount = await request.count({
      where: { isPublished: false },
    });

    const result = {
      records: allRecords,
      publishedCount,
      pendingCount,
    };

    console.log("All records:", result);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error retrieving all records:", error);

    res.status(500).send("Internal Server Error");
  }
};

export const productReviewAnalytics = async (req, res) => {
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

    console.log("#### result", result);

    const { averageRating, totalReviews } = result;

    //
    const starRatingDistribution = await request.findAll({
      attributes: [
        "rating_star",
        [
          model.sequelize.fn("COUNT", model.sequelize.col("rating_star")),
          "count",
        ],
      ],
      where: {
        is_reviewed: true,
      },
      group: ["rating_star"],
      raw: true,
    });

    const unreviewedCount = await request.count({
      where: {
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

    const response = {
      overallRating: averageRating || 0,
      totalReviews: totalReviews || 0,
      distributionArray,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error calculating overall rating:", error);

    res.status(500).send("Internal Server Error");
  }
};

export const reviewRequestAnalytics = async (req, res) => {
  try {
    const reviewsReceived = await request.count({
      where: { isReviewed: true },
    });

    const reviewsRequestSent = await request.count({
      where: { isReviewed: false },
    });

    console.log({ reviewsReceived, reviewsRequestSent });

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

export const getAllCustomers = async (req, res) => {
  try {
    const uniqueCustomers = await request.findAll({
      attributes: ["name", "email"],
    });

    console.log("Unique customers:", uniqueCustomers);

    return res.status(200).json(uniqueCustomers);
  } catch (error) {
    console.error("Error retrieving unique customers:", error);

    res.status(500).send("Internal Server Error");
  }
};

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

export const publishReview = async (req, res) => {
  const { reviewId } = req.query;
  try {
    const review = await request.update(
      {
        isPublished: true,
      },
      {
        where: {
          id: reviewId,
        },
      }
    );

    console.log("Published Review", review);

    return res.status(200).json(review);
  } catch (error) {
    console.error("Error Publishing review", error);

    res.status(500).send("Internal Server Error");
  }
};
