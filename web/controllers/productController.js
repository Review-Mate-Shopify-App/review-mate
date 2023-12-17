import productCreatorService from '../services/productCreatorService';
import shopifyService from '../services/shopifyService';

export const createProduct = async (req, res) => {
  let status = 200;
  let error = null;

  try {
    await productCreatorService(res.locals.shopify.session);
  } catch (e) {
    console.log(`Failed to process products/create: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
};

export const productCount = async (req, res) => {
  const countData = await shopifyService.shopifyAppInstance.api.rest.Product.count({
    session: res.locals.shopify.session,
  });

  return res.status(200).send(countData);
}

export const getProducts = async (req, res) => {
  try {
    const products = await shopifyService.shopifyAppInstance.api.rest.Product.list({
      session,
    });

    return res.status(200).send(products);
  } catch (error) {
    console.error("Error fetching products from Shopify:", error);
    throw error;
  }
}
