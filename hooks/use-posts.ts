import { api } from "@/convex/_generated/api";
import { usePostStore } from "@/store";
import { useQuery } from "convex/react";
import { useEffect } from "react";

export const usePosts = () => {
  const { setPosts } = usePostStore();
  const posts = useQuery(api.posts.getAllPosts);
  const isLoading = posts === undefined;
  const error = posts === null ? 'Failed to fetch posts' : null;

    useEffect(() => {
    if (posts && Array.isArray(posts)) {
      setPosts(posts);
    }
  }, [posts, setPosts]);

  return { posts, isLoading, error };
};