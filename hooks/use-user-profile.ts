import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

export const useUserProfile = (userId: Id<'users'>) => {
    const user = useQuery(api.users.getUserByConvexId, {userId})
    const posts = useQuery(api.posts.getAllPostsbyUser, {userId})

    const isLoading = user === undefined || posts === undefined;
  const error =
    user === null ? "Failed to fetch user" :
    posts === null ? "Failed to fetch posts" :
    null;

    const userProfile = {
        ...user,
        posts: posts
    }

  return { userProfile, isLoading, error };
};
