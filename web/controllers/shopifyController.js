import model from "../models";

const storeModel = model.store;

export async function installApp(req, res) {
  console.log('aaaayayyayayayay');
  try {
    const apiKey = process.env.SHOPIFY_API_KEY;
    const scopes =
      "read_products,read_orders, read_analytics, read_orders, read_product_feeds, read_product_listings, read_products";

    const shop = req.query.shop;

    if (!shop) {
      res.send("Shop parameter is missing");
      return;
    }

    const storeDetails = await storeModel.findOne({
      where: {
        storeName: shop,
        isAppInstall: true
      }
    });

    if (!storeDetails) {
      await storeModel.create({
        storeName: shop,
        email: "amitgodara1008@gmail.com"
      })
    }

    if (storeDetails && storeDetails.isAppInstall) {
      return res.send("App already installed");
    }

    const redirectUri = `https://7331-2405-201-5011-217a-48d1-12a4-d20d-bb7a.ngrok-free.app/review-requests/outh/callback`;
    const authUrl = `https://${shop}.myshopify.com/admin/oauth/authorize?client_id=${apiKey}&scope=${scopes}&redirect_uri=${redirectUri}`;

    res.status(200).send(authUrl);
  } catch (error) {
    logger.error(error);
  }
}