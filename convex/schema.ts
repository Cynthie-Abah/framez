import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
export default defineSchema({
    users: defineTable({
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
    }),
    posts: defineTable({
        authorId: v.id("users"),
        email: v.string(),
        userName: v.string(),        
        userAvatar: v.string(),  
        image: v.array(v.string()),
        text: v.string(),
        likes: v.array(v.object({
            userId: v.id("users"),
            timeStamp: v.number()
        })),
        comments: v.array(v.object({
            userId: v.id("users"),
            userName: v.string(),
            userAvatar: v.string(),
            text: v.string(),
            timestamp: v.number(),
        })),
    }),
});
