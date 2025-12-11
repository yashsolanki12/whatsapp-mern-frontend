import "@shopify/shopify-app-react-router/adapters/node";
import {
  ApiVersion,
  AppDistribution,
  shopifyApp,
} from "@shopify/shopify-app-react-router/server";
// import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
// import prisma from "./db.server";
import { MongoDBSessionStorage } from "@shopify/shopify-app-session-storage-mongodb";

const shopify = shopifyApp({
  apiKey: import.meta.env.VITE_SHOPIFY_API_KEY,
  apiSecretKey: import.meta.env.VITE_SHOPIFY_API_SECRET || "",
  apiVersion: ApiVersion.October25,
  scopes: import.meta.env.VITE_SCOPES?.split(","),
  appUrl: import.meta.env.VITE_SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  // sessionStorage: new PrismaSessionStorage(prisma),

  distribution: AppDistribution.AppStore,
  ...(import.meta.env.VITE_SHOP_CUSTOM_DOMAIN
    ? { customShopDomains: [import.meta.env.VITE_SHOP_CUSTOM_DOMAIN] }
    : {}),
  sessionStorage: new MongoDBSessionStorage(
    import.meta.env.VITE_MONGODB_URL,
    import.meta.env.VITE_DB_NAME, // Add your MongoDB database name here
  ),
});

export default shopify;
export const apiVersion = ApiVersion.October25;
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
export const authenticate = shopify.authenticate;
export const unauthenticated = shopify.unauthenticated;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
export const sessionStorage = shopify.sessionStorage;
