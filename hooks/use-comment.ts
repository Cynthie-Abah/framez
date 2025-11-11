import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";

export const useComment = () => {
  const makeCommentMutation = useMutation(api.posts.updateComments);

  const commentOnPost = async ({ postId, userId, userName, userAvatar, text}: { 
    postId: Id<"posts">, 
    userId: Id<"users">, 
    userName: string, 
    userAvatar: string, 
    text: string}) => {

    const newComment = {
        id: postId,
        userId: userId,
        userName,
        userAvatar,
        text,
        timestamp: Date.now(),
    }
    try {
      const res = await makeCommentMutation(newComment);
      return res;
    } catch (err) {
      console.error("Failed to toggle like:", err);
      return { success: false, message: "Failed to toggle like" };
    }
  };

  return { commentOnPost };
};

// React Native compatibility problems