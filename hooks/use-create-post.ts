import { api } from "@/convex/_generated/api";
import { newPost } from "@/type";
import { useMutation } from "convex/react";
import { useRouter } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";

export const useCreatePost = ()=> {
    const mutate = useMutation(api.posts.uploadPost)
    const [isloading ,setIsLoading] = useState(false);
    const router = useRouter();

    const handleCreatePost = async (post: newPost) => {
        setIsLoading(true)
  try {

    const data = await mutate(post)
    console.log(data);
    Toast.show({
        type: 'success',
        text1:'Your just created a post successfully'
    })
    router.push('/(tabs)/feed')
  } catch (error: unknown) {
    if (error instanceof Error) {
    console.error("Error creating a new Post:", error);
    Toast.show({
        type: 'error',
        text1: "Error Performing Action",
        text2: error.message || "Something went wrong"
    })
    }
  } finally {
      setIsLoading(false);
    }

};

return {handleCreatePost, isloading}
}
