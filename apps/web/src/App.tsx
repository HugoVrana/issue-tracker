import { useQuery } from "convex/react"
import { Component, type ReactNode } from "react"
import { api } from "@workspace/db"
import { CommandBar } from "@workspace/ui/components/command-bar"
import { RiBarChartHorizontalLine } from "@remixicon/react"

class ConvexErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  state = { error: null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-svh items-start justify-center p-6">
          <div className="w-full max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <RiBarChartHorizontalLine className="size-5" />
              <span className="font-semibold text-sm">Issue Tracker</span>
            </div>
            <div className="border shadow-sm rounded-md p-4 text-sm text-muted-foreground">
              Could not load issues. Check your connection and{" "}
              <button
                className="underline"
                onClick={() => window.location.reload()}
              >
                try again
              </button>
              .
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

function IssueApp() {
  const issues = useQuery(api.issues.list);
  console.log("issues : " , issues);
  return (
    <div className="flex min-h-svh items-start justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="flex items-center gap-2 mb-4">
          <RiBarChartHorizontalLine className="size-5" />
          <span className="font-semibold text-sm">Issue Tracker</span>
        </div>
        <CommandBar issues={issues} />
        <a>hello</a>
      </div>
    </div>
  )
}

export function App() {
  return (
    <ConvexErrorBoundary>
      <IssueApp />
    </ConvexErrorBoundary>
  )
}
