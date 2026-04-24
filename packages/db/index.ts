export { api, internal } from "./convex/_generated/api";

import { ConvexReactClient } from "convex/react";
export const convexClient = new ConvexReactClient(
  "https://shiny-grouse-827.convex.cloud"
);

import { ConvexClient } from "convex/browser";
export const convexNodeClient = new ConvexClient(
  "https://shiny-grouse-827.convex.cloud"
);
