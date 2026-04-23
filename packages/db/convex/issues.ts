import { mutation, query } from "./_generated/server";
import {
  createIssueArgs,
  getIssueArgs,
  updateIssueStatusArgs,
} from "./validators";

export const list = query(async (ctx) => {
  return await ctx.db.query("issues").order("desc").collect();
});

export const get = query({
  args: getIssueArgs,
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: createIssueArgs,
  handler: async (ctx, args) => {
    return await ctx.db.insert("issues", {
      ...args,
      status: "open",
      createdAt: Date.now(),
    });
  },
});

export const updateStatus = mutation({
  args: updateIssueStatusArgs,
  handler: async (ctx, args) => {
    const { id, status } = args;
    await ctx.db.patch(id, { status });
  },
});
