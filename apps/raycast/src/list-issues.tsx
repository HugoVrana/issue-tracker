import {
  Action,
  ActionPanel,
  Color,
  Icon,
  List,
  showToast,
  Toast,
} from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";
import { api } from "@workspace/db";
import type { IssueStatus } from "@workspace/models/issue/issueStatus";
import { client } from "./convex-client";
import { CreateIssueForm } from "./create-issue";

const STATUS: Record<IssueStatus, { label: string; icon: Icon; color: Color }> = {
  open: { label: "Open", icon: Icon.Circle, color: Color.Blue },
  in_progress: { label: "In Progress", icon: Icon.Clock, color: Color.Yellow },
  closed: { label: "Closed", icon: Icon.CheckCircle, color: Color.Green },
};

const ALL_STATUSES = Object.keys(STATUS) as IssueStatus[];

export default function ListIssues() {
  const { data: issues, isLoading, revalidate } = useCachedPromise(() =>
    client.query(api.issues.list)
  );

  async function handleUpdateStatus(id: string, status: IssueStatus) {
    const toast = await showToast({ style: Toast.Style.Animated, title: "Updating status…" });
    try {
      await client.mutation(api.issues.updateStatus, { id: id as never, status });
      toast.style = Toast.Style.Success;
      toast.title = "Status updated";
      revalidate();
    } catch {
      toast.style = Toast.Style.Failure;
      toast.title = "Failed to update status";
    }
  }

  async function handleDelete(id: string) {
    const toast = await showToast({ style: Toast.Style.Animated, title: "Deleting issue…" });
    try {
      await client.mutation(api.issues.remove, { id: id as never });
      toast.style = Toast.Style.Success;
      toast.title = "Issue deleted";
      revalidate();
    } catch {
      toast.style = Toast.Style.Failure;
      toast.title = "Failed to delete issue";
    }
  }

  return (
    <List isLoading={isLoading}>
      {issues?.map((issue) => {
        const { label, icon, color } = STATUS[issue.status];
        return (
          <List.Item
            key={issue._id}
            icon={{ source: icon, tintColor: color }}
            title={issue.title}
            subtitle={issue.description}
            accessories={[{ tag: { value: label, color } }]}
            actions={
              <ActionPanel>
                <ActionPanel.Section title="Status">
                  {ALL_STATUSES.filter((s) => s !== issue.status).map((s) => (
                    <Action
                      key={s}
                      title={`Mark as ${STATUS[s].label}`}
                      icon={{ source: STATUS[s].icon, tintColor: STATUS[s].color }}
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
