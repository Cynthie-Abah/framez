import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createUser = mutation({
  args: {
        clerkId: v.string(),
        username: v.string(),
        email: v.string(),
        avatar: v.optional(v.string()),
        followers: v.array(v.object({
            userId: v.id("users"),
            username: v.string(),
            avatar: v.string(),
        })),
        following: v.array(v.object({
            userId: v.id("users"),
            username: v.string(),
            avatar: v.string(),
        })),
    },

  handler: async ({ db }, args) => {
// check if user exists
    const existing = await db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

      if (existing) {
        return existing;
      } else {
    // create a new user
    const newUser = {
      ...args,
        followers: [],
        following: [],
    }; 

    const cart = await db.insert("users", newUser);
    return { success: true, id: cart, message: "Cart created successfully" };
      }

  },
});