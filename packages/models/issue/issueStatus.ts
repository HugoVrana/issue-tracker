import { z } from "zod";

export const IssueStatusSchema
    = z.enum(["open", "in_progress", "closed"]);

export type IssueStatus = z.infer<typeof IssueStatusSchema>;