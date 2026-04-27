import { ConvexClient } from "convex/browser";
import WebSocket from "ws";

// Raycast runs in Node.js which has no global WebSocket — polyfill for Convex
if (!globalThis.WebSocket) {
  // @ts-ignore
  globalThis.WebSocket = WebSocket;
}

const url = "https://shiny-grouse-827.convex.cloud";

export const client = new ConvexClient(url);
