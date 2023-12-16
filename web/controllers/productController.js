import productCreatorService from '../services/productCreatorService';

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
