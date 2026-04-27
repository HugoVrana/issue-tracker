import {
  Action,
  ActionPanel,
  Detail,
  environment,
  Icon,
  List,
  showToast,
  Toast,
} from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";
import { api, type Doc, type Id } from "@workspace/db";
import type { IssueStatus } from "@workspace/models/issue/issueStatus";
import { client } from "./convex-client";
import { CreateIssueForm } from "./create-issue";

const ALL_STATUSES : IssueStatus[] = ["open", "in_progress", "closed"];

export default function ListIssues(){
  const { data: issues, isLoading, error, revalidate } = useCachedPromise(
    () => client.query(api.issues.list, {}) as Promise<Doc<"issues">[]>
  );

  async function handleUpdateStatus(id: Id<"issues">, status: IssueStatus) {
    const toast = await showToast({ style: Toast.Style.Animated, title: "Updating status…" });
    try {
      await client.mutation(api.issues.updateStatus, { id, status });
      toast.style = Toast.Style.Success;
      toast.title = "Status updated";
      revalidate();
    } catch {
      toast.style = Toast.Style.Failure;
      toast.title = "Failed to update status";
    }
  }

  async function handleDelete(id: Id<"issues">) {
    const toast = await showToast({ style: Toast.Style.Animated, title: "Deleting issue…" });
    try {
      await client.mutation(api.issues.remove, { id });
      toast.style = Toast.Style.Success;
      toast.title = "Issue deleted";
      revalidate();
    } catch {
      toast.style = Toast.Style.Failure;
      toast.title = "Failed to delete issue";
    }
  }

  if (error) {
    return <Detail markdown={`**Error loading issues**\n\n\`\`\`\n${error.message}\n\`\`\``} />;
  }

  return (
    <List isLoading={isLoading} navigationTitle={environment.isDevelopment ? "Issues (Dev)" : "Issues"}>
      {issues?.map((issue) => {
        return (
          <List.Item
            key={issue._id}
            icon={Icon.Circle}
            title={issue.title}
            subtitle={issue.description}
            accessories={[{ tag: issue.status }]}
            actions={
              <ActionPanel>
                <ActionPanel.Section title="Status">
                  {ALL_STATUSES.filter((s) => s !== issue.status).map((s) => (
                    <Action
                      key={s}
                      title={`Mark as ${s}`}
                      onAction={() => handleUpdateStatus(issue._id, s)}
                    />
                  ))}
                </ActionPanel.Section>
                <ActionPanel.Section>
                  <Action.Push
                    title="Create Issue"
                    icon={Icon.Plus}
                    shortcut={{ modifiers: ["cmd"], key: "n" }}
                    target={<CreateIssueForm onCreated={revalidate} />}
                  />
                  <Action
                    title="Delete Issue"
                    icon={Icon.Trash}
                    style={Action.Style.Destructive}
                    shortcut={{ modifiers: ["ctrl"], key: "x" }}
                    onAction={() => handleDelete(issue._id)}
                  />
                </ActionPanel.Section>
              </ActionPanel>
            }
          />
        );
      })}
    </List>
  );
}
