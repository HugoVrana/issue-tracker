import { useQuery } from "convex/react"
import { api } from "@workspace/db"
import { CommandBar } from "@workspace/ui/components/command-bar"

export function App() {
  const issues = useQuery(api.issues.list)

  return (
    <div className="flex min-h-svh items-start justify-center p-6">
      <div className="w-full max-w-2xl">
        <CommandBar issues={issues} />
      </div>
    </div>
  )
}
