import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// CREATE - Create new users - CONSUMED
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
// READ - Get a user info by clerkid
export const getUserById = query({
  args: { userId: v.string() },
  handler: async ({ db }, { userId }) => {
    const user = await db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), userId))
      .first();
    return user;
  },
});

// READ - Get a user info by clerkid
export const getUserByConvexId = query({
  args: { userId: v.id("users") },
  handler: async ({ db }, { userId }) => {
    const user = await db.get(userId)
    return user;
  },
});

export const getAllUsers = query({
  handler: async ({db}) => {
    const posts = await db
      .query("users")
      .collect();
    return posts;
  },
});
