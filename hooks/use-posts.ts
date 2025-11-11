// import { api } from "@/convex/_generated/api";
// import { usePostStore } from "@/store";
// import { useQuery } from "convex/react";
// import { useEffect } from "react";

// export const usePosts = () => {
//   const { setPosts } = usePostStore();
//   const posts = useQuery(api.posts.getAllPosts)?.reverse();
//   const isLoading = posts === undefined;
//   const error = posts === null ? 'Failed to fetch posts' : null;

//     useEffect(() => {
//     if (posts && Array.isArray(posts)) {
//       setPosts(posts);
//     }
//   }, [posts, setPosts]);

//   return { posts, isLoading, error };
// };

import { api } from "@/convex/_generated/api";
import { usePostStore } from "@/store";
import { Post } from "@/type";
import { useQuery } from "convex/react";
import { useEffect, useState } from "react";

export const usePosts = () => {
  const { setPosts } = usePostStore();
  const rawPosts = useQuery(api.posts.getAllPosts) || [];
  const users = useQuery(api.users.getAllUsers) || []; // fetch all users
  const [posts, setLocalPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (rawPosts.length && users.length) {
      // Map posts to include full user info
      const postsWithUser = rawPosts.map(post => {
        const user = users.find(u => u._id === post.authorId);
        return {
          ...post,
          userName: user?.username || "Anonymous",
          userAvatar: user?.avatar || "",
          email: user?.email || ''
        };
      }).reverse();
      setPosts(postsWithUser);
      setLocalPosts(postsWithUser);
    }
  }, [rawPosts, users, setPosts]);

  const isLoading = rawPosts === undefined || users === undefined;
  const error = rawPosts === null || users === null ? "Failed to fetch posts" : null;

  return { posts, isLoading, error };
};
