import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import Toast from "react-native-toast-message";

export const useDeletePost = () => {
  const deleteMutation = useMutation(api.posts.deletePost);

  const deletePost = async ({ postId, userId}: { 
    postId: Id<"posts">, 
    userId: Id<"users">,
    }) => {

    const postInfo = {
        postId,
        userId,
    }
    try {
      const res = await deleteMutation(postInfo);
      if (res.success) {
        Toast.show({
                type: 'success',
                text1: 'Successfully Deleted the Post!',
            })
      } else {
        Toast.show({
                type: 'error',
                text1: 'Error Deleting Post',
                text2: res.message
            })
      }
      
      return res;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error("Failed to delete post:", err);
            Toast.show({
                type: 'error',
                text1: 'Error Deleting Post',
                text2: err.message
            })
      return { success: false, message: "Failed to delete post" }; 
        }
     
    }
  };

  return { deletePost };
};