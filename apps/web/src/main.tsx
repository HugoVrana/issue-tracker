import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ConvexProvider } from "convex/react"
import { ConvexReactClient } from "@workspace/db"

import "@workspace/ui/globals.css"
import { App } from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"

const convexUrl = import.meta.env.VITE_CONVEX_SITE_URL;
const convexClient = convexUrl ? new ConvexReactClient(convexUrl) : null

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      {convexClient ? (
        <ConvexProvider client={convexClient}>
          <App />
        </ConvexProvider>
      ) : (
        <App />
      )}
    </ThemeProvider>
  </StrictMode>
)
