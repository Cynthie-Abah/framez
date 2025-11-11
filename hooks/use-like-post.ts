import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";

export const useToggleLike = () => {
  const toggleLikeMutation = useMutation(api.posts.updateLikes);

  const toggleLike = async (postId: Id<"posts">, userId: Id<"users">) => {
    try {
      const res = await toggleLikeMutation({id: postId, userId
      });
      return res;
    } catch (err) {
      console.error("Failed to toggle like:", err);
      return { success: false, message: "Failed to toggle like" };
    }
  };

  return { toggleLike };
};
