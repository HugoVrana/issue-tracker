import { Action, ActionPanel, Form, showToast, Toast, useNavigation } from "@raycast/api";
import { useForm } from "@raycast/utils";
import { api } from "@workspace/db";
import { client } from "./convex-client";

interface Values {
  title: string;
  description: string;
}

interface Props {
  onCreated?: () => void;
}

export function CreateIssueForm({ onCreated }: Props) {
  const { pop } = useNavigation();

  const { handleSubmit, itemProps } = useForm<Values>({
    async onSubmit(values) {
      const toast = await showToast({ style: Toast.Style.Animated, title: "Creating issue…" });
      try {
        await client.mutation(api.issues.create, {
          title: values.title,
          description: values.description || undefined,
        });
        toast.style = Toast.Style.Success;
        toast.title = "Issue created";
        onCreated?.();
        pop();
      } catch {
        toast.style = Toast.Style.Failure;
        toast.title = "Failed to create issue";
      }
    },
    validation: {
      title: (v) => (!v ? "Title is required" : undefined),
    },
  });

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Create Issue" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField title="Title" placeholder="Issue title" {...itemProps.title} />
      <Form.TextArea title="Description" placeholder="Optional description" {...itemProps.description} />
    </Form>
  );
}

export default function CreateIssue() {
  return <CreateIssueForm />;
}
