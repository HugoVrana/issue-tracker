import { useQuery } from "convex/react"
import { api } from "@workspace/db"
import { CommandBar } from "@workspace/ui/components/command-bar"
import { RiBarChartHorizontalLine } from "@remixicon/react"

export function App() {
  const issues = useQuery(api.issues.list)

  return (
    <div className="flex min-h-svh items-start justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="flex items-center gap-2 mb-4">
          <RiBarChartHorizontalLine className="size-5" />
          <span className="font-semibold text-sm">Issue Tracker</span>
        </div>
        <CommandBar issues={issues} />
      </div>
    </div>
  )
}
