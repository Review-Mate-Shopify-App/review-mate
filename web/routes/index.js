import express from "express";
import ReviewRequestRepository from "../repositories/reviewRequestRepository.js";

const router = express.Router();
router.get("/products", async (req, res) => {
  try {
    // Get the Shopify session from the request
    const session = res.locals.shopify.session;

    // Fetch products using the ShopifyService
    const products = await ShopifyService.getProducts(session);

    // Respond with the fetched products
    res.status(200).json(products);
  } catch (error) {
    console.error("Error handling /products route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/products/count", async (_req, res) => {
  const countData =
    await ShopifyService.shopifyAppInstance.api.rest.Product.count({
      session: res.locals.shopify.session,
    });
  res.status(200).send(countData);
});

router.post("/reviewRequest", async (_req, res) => {
  try {
    // Assuming you have a Sequelize model named Review
    const review = await new ReviewRequestRepository().create({
      id: _req.body.id,
      storeId: _req.body.storeId,
      name: _req.body.name,
      email: _req.body.email,
      productId: _req.body.productId,
      isReviewed: _req.body.isReviewed === "true", // Convert string to boolean
    });

    console.log("Review added to the database:", review.toJSON());
    res.status(201).send("Review added to the database successfully");
  } catch (error) {
    console.error("Error adding review to the database:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
