import { v } from "convex/values";
import { Like } from './../type';
import { Id } from './_generated/dataModel';
import { mutation, query } from "./_generated/server";

// upload a post - create
export const uploadPost = mutation({
  args: {
        authorId: v.id("users"),
        email: v.string(),
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

// fetch all posts - read - CONSUMED
export const getAllPosts = query({
  handler: async ({db}) => {
    const posts = await db
      .query("posts")
      .collect();
    return posts;
  },
});

// fetch all posts by a user - read - CONSUMED
export const getAllPostsbyUser = query({
  args: { userId: v.id("users") },
  handler: async ({ db }, { userId }) => {
    const posts = await db
      .query("posts")
      .filter((q) => q.eq(q.field("authorId"), userId))
      .collect();
    return posts;
  },
});

// like a post/comment on a  post - update
export const updateLikes = mutation({
  args: {
    id: v.id("posts"),
    userId: v.id("users")
  },
  handler: async ({ db }, { id, userId }: {id: Id<'posts'>, userId: Id<"users">}) => {
    const post = await db.get(id);

    if (!post) return { success: false, message: "Post not found" };

    const existingLikes: Like[] = post.likes ?? [];
    const alreadyLiked = existingLikes.find(like => like.userId === userId);

    let updatedLikes: Like[];
    if (alreadyLiked) {
      updatedLikes = existingLikes.filter(like => like.userId !== userId);
    } else {
      const newLike: Like = { userId: userId as Id<'users'>, timeStamp: Date.now() };
      updatedLikes = [...existingLikes, newLike];
    }

    await db.patch(id, { likes: updatedLikes });
    return { success: true, message: `you liked a post` };
  },
});
// comment on a post
export const updateComments = mutation({
  args: {
    id: v.id("posts"),
    userId: v.id("users"),
    userName: v.string(),
    userAvatar: v.string(),
    text: v.string(),
    timestamp: v.number(),
  },

  handler: async (
    { db },
    { id, userId, userName, userAvatar, text, timestamp }: {
      id: Id<'posts'>,
      userId: Id<'users'>,
      userName: string,
      userAvatar: string,
      text: string,
      timestamp: number,
    }
  ) => {
    const post = await db.get(id);

    if (!post) return { success: false, message: "Post not found" };

    const existingComments = post.comments ?? [];
    const newComment = {
      userId,
      userName,
      text,
      timestamp,
      userAvatar
    };
    const updatedComments = [...existingComments, newComment];

    await db.patch(id, { comments: updatedComments });
    return { success: true, message: "Comment added successfully" };
  },
});

// delete a post - delete

// follow/unfollow a user - update

// fetch user profile data - read

// fetch all post by a specific user - read

// edit user profile - update