import express from 'express';
import ShopifyService from './ShopifyService';

const router = express.Router();

// Example route to get products
router.get('/products', async (req, res) => {
  try {
    // Get the Shopify session from the request
    const session = res.locals.shopify.session;

    // Fetch products using the ShopifyService
    const products = await ShopifyService.getProducts(session);

    // Respond with the fetched products
    res.status(200).json(products);
  } catch (error) {
    console.error('Error handling /products route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get("/products/count", async (_req, res) => {
  const countData = await ShopifyService.shopifyAppInstance.api.rest.Product.count({
    session: res.locals.shopify.session,
  });
  res.status(200).send(countData);
});

// Add more routes for other API endpoints as needed

export default router;
