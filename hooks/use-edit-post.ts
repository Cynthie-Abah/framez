import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

export const useEditPost = () => {
  const editPostMutation = useMutation(api.posts.editPost);
  const router = useRouter();

  const editPost = async ({ postId, userId, image, text}: { 
    postId: Id<"posts">, 
    userId: Id<"users">, 
    image: string[],
    text: string}) => {

    const updatedPost = {
        id: postId,
        userId: userId,
        text,
        image,
    }
    try {
      const res = await editPostMutation(updatedPost);
      Toast.show({
              type: 'success',
              text1:'You have updated your post successfully'
          })
          router.push('/(tabs)/feed')
      return res;
    } catch (err: unknown) {
      if (err instanceof Error) {
          console.error("Error updating a your Post:", err);
          Toast.show({
              type: 'error',
              text1: "Error Performing Action",
              text2: err.message || "Something went wrong"
          })
          }
    }
  };

  return { editPost };
};