import { v } from "convex/values";
import { ObjectType } from "convex/values";
import { zodToConvex } from "convex-helpers/server/zod";
import { IssueStatusSchema } from "@workspace/models/issue/issueStatus";

export const createIssueArgs = {
  title: v.string(),
  description: v.optional(v.string()),
};

export const updateIssueStatusArgs = {
  id: v.id("issues"),
  status: zodToConvex(IssueStatusSchema),
};

export const getIssueArgs = {
  id: v.id("issues"),
};

export type CreateIssueDto = ObjectType<typeof createIssueArgs>;
export type UpdateIssueStatusDto = ObjectType<typeof updateIssueStatusArgs>;
export type GetIssueDto = ObjectType<typeof getIssueArgs>;
