import { defineSchema, defineTable } from "convex/server";
import { zodToConvexFields } from "convex-helpers/server/zod";
import { IssueSchema } from "@workspace/models/issue/issue";

export default defineSchema({
  issues: defineTable(
    zodToConvexFields(IssueSchema.omit({ id: true }).shape)
  ),
});
