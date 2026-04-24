import { useState } from "react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "./command"

type IssueStatus = "open" | "in_progress" | "closed"

type IssueRow = {
  _id: string
  title: string
  status: IssueStatus
}

const STATUS_LABEL: Record<IssueStatus, string> = {
  open: "Open",
  in_progress: "In Progress",
  closed: "Closed",
}

export function CommandBar({ issues }: { issues: IssueRow[] | undefined }) {
  const [query, setQuery] = useState("")

  const isCommandMode = query.startsWith("/")

  return (
    <Command className="border shadow-sm" shouldFilter={!isCommandMode}>
      <CommandInput
        value={query}
        onValueChange={setQuery}
        placeholder="Search issues, or type / for commands..."
      />
      <CommandList>
        <CommandEmpty>
          {isCommandMode ? "Unknown command." : "No issues found."}
        </CommandEmpty>

        {!isCommandMode && (
          <CommandGroup heading="Issues">
            {issues?.map((issue) => (
              <CommandItem key={issue._id} value={issue.title}>
                <span className="flex-1 truncate">{issue.title}</span>
                <CommandShortcut>{STATUS_LABEL[issue.status]}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {isCommandMode && (
          <CommandGroup heading="Commands">
            <CommandItem value="/close" onSelect={() => setQuery("")}>
              Close issue
              <CommandShortcut>/close</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  )
}
