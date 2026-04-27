import { mutation, query } from "./_generated/server";
import {
  createIssueArgs,
  getIssueArgs,
  removeIssueArgs,
  updateIssueStatusArgs,
} from "./validators";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("issues").order("desc").collect();
  },
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

export const remove = mutation({
  args: removeIssueArgs,
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
