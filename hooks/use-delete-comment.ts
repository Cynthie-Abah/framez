import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import Toast from "react-native-toast-message";

export const useDeleteComment = () => {
  const deleteMutation = useMutation(api.posts.deleteComment);

  const deleteComment = async ({ postId, userId, timestamp}: { 
    postId: Id<"posts">, 
    userId: Id<"users">,
    timestamp: number,
    }) => {

    const postInfo = {
        postId,
        userId,
        timestamp
    }
    try {
      const res = await deleteMutation(postInfo);
      if (res.success) {
        Toast.show({
                type: 'success',
                text1: 'Successfully Deleted the Comment!',
            })
      } else {
        Toast.show({
                type: 'error',
                text1: 'Error Deleting Comment',
                text2: res.message
            })
      }
      
      return res;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error("Failed to delete Comment:", err);
            Toast.show({
                type: 'error',
                text1: 'Error Deleting Comment',
                text2: err.message
            })
      return { success: false, message: "Failed to delete Comment" }; 
        }
     
    }
  };

  return { deleteComment };
};