import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useState } from "react";

export const useEditProfile = () => {
  const editMutations = useMutation(api.users.updateUserProfile);
  const [isLoading, setIsLoading] = useState(false);

  const editUserProfile = async ({ userId, username, avatar, bio}: { 
    userId: Id<"users">,
    avatar: string,
    username: string,
    bio: string}) => {
    setIsLoading(true)
    const updatedProfile = {userId, username, avatar, bio}
    try {
      const res = await editMutations(updatedProfile);
      return res;
    } catch (err) {
      console.error("Failed to toggle like:", err);
      return { success: false, message: "Failed to toggle like" };
    } finally {
        setIsLoading(false)
    }
  };

  return { editUserProfile, isLoading };
};