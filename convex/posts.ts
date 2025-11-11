import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// upload a post - create
export const uploadPost = mutation({
  args: {
        authorId: v.id("users"),
        authorName: v.string(),
        userName: v.string(),        
        userAvatar: v.string(),  
        image: v.array(v.string()),
        text: v.string(),
    },
  handler: async ({ db }, args) => {
    const postData = {
      ...args,
      likes: [],
      comments: [],
    };
    const productId = await db.insert("posts", postData);
    return { success: true, message: "Your post has been uploaded successfully", id: productId };
  },
});

// fetch all posts - read
export const getAllPosts = query({
  handler: async ({db}) => {
    const posts = await db
      .query("posts")
      .collect();
    return posts;
  },
});

// like a post/comment on a  post - update

// delete a post - delete

// follow/unfollow a user - update

// fetch user profile data - read

// fetch all post by a specific user - read

// edit user profile - update