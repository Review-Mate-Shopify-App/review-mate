// @ts-check
import express from "express";
import serveStatic from "serve-static";
import { join } from "path";
import { readFileSync } from "fs";
import apiRouter from "./routes/index";
import shopifyRouter from "./routes/shopifyRoutes.js";

import ShopifyService from "./services/shopifyService.js";
import PrivacyWebhookHandlers from "./privacy.js";

const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || "3000",
  10
);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

// Set up Shopify authentication and webhook handling
app.get(
  ShopifyService.shopifyAppInstance.config.auth.path,
  ShopifyService.shopifyAppInstance.auth.begin()
);
app.get(
  ShopifyService.shopifyAppInstance.config.auth.callbackPath,
  ShopifyService.shopifyAppInstance.auth.callback(),
  ShopifyService.shopifyAppInstance.redirectToShopifyOrAppRoot()
);
app.post(
  ShopifyService.shopifyAppInstance.config.webhooks.path,
  ShopifyService.shopifyAppInstance.processWebhooks({
    webhookHandlers: PrivacyWebhookHandlers,
  })
);

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

app.use(
  "/api/*",
  ShopifyService.shopifyAppInstance.validateAuthenticatedSession()
);

app.use(express.json());

app.use("/api", apiRouter);

app.use("/shopify", shopifyRouter)

app.use(ShopifyService.shopifyAppInstance.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use(
  "/*",
  // ShopifyService.shopifyAppInstance.ensureInstalledOnShop(),
  async (_req, res, _next) => {
    return res
      .status(200)
      .set("Content-Type", "text/html")
      .send(readFileSync(join(STATIC_PATH, "index.html")));
  }
);

app.listen(PORT);
