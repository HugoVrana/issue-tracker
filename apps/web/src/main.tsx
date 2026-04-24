import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ConvexProvider } from "convex/react"
import { convexClient } from "@workspace/db"

import "@workspace/ui/globals.css"
import { App } from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConvexProvider client={convexClient}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ConvexProvider>
  </StrictMode>
)
