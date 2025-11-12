import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

export const useSinglePost = (postId?: Id<"posts">) => {
  if(!postId) return
  const post = useQuery(api.posts.getPostbyId, {postId});

  const isLoading = post === undefined;

  return { post, isLoading };
};
