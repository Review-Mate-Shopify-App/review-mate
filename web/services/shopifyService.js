import { LATEST_API_VERSION } from "@shopify/shopify-api";
import { shopifyApp } from "@shopify/shopify-app-express";
import { SQLiteSessionStorage } from "@shopify/shopify-app-session-storage-sqlite";
import { restResources } from "@shopify/shopify-api/rest/admin/2023-04";

const DB_PATH = `${process.cwd()}/database.sqlite`;

class ShopifyService {
  constructor() {
    this.shopifyAppInstance = shopifyApp({
      api: {
        apiVersion: LATEST_API_VERSION,
        restResources,
        billing: undefined, // or replace with billingConfig above to enable example billing
      },
      auth: {
        path: "/api/auth",
        callbackPath: "/api/auth/callback",
      },
      webhooks: {
        path: "/api/webhooks",
      },
      // This should be replaced with your preferred storage strategy
      sessionStorage: new SQLiteSessionStorage(DB_PATH),
    });
  }

  // Function to fetch products from the Shopify store
  async getProducts(session) {
    console.log('Aaayaaa');
    try {
      // Example: Fetching products using the Shopify REST API
      const products = await this.shopifyAppInstance.api.rest.Product.list({
        session,
        // Add any other parameters or filters as needed
      });

      return products;
    } catch (error) {
      console.error("Error fetching products from Shopify:", error);
      throw error;
    }
  }

  // Add more functions for other Shopify API calls as needed
}

export default new ShopifyService();
