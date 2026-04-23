import { z } from "zod";
import { IssueStatusSchema } from "./issueStatus";

export const IssueSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  status: IssueStatusSchema,
  createdAt: z.number(),
});

export type Issue = z.infer<typeof IssueSchema>;
