import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
export default defineSchema({
    users: defineTable({
        name: v.string(),
        email: v.string(),
        avatar: v.optional(v.string()),
    }),
    posts: defineTable({
        authorId: v.string(),
        authorName: v.string(),
        userName: v.string(),        
        userAvatar: v.string(),  
        image: v.array(v.string()),
        text: v.string(),
        likes: v.array(v.object({
            userId: v.string(),
            timeStamp: v.number()
        })),
        comments: v.array(v.object({
            userId: v.string(),
            userName: v.string(),
            userAvatar: v.string(),
            text: v.string(),
            timestamp: v.number(),
        })),
    }),
});
