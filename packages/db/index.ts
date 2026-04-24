export { api, internal } from "./convex/_generated/api";

import { ConvexReactClient } from "convex/react";
export const convexClient = new ConvexReactClient(
  "https://shiny-grouse-827.convex.cloud"
);
