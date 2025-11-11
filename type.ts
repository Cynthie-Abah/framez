import { Id } from "./convex/_generated/dataModel";

export interface newUser {
    clerkId: string;
    username: string;
    email: string;
    avatar?: string;
    followers: {
        userId: Id<"users">;
        username: string;
        avatar: string;
    }[];
    following: {
        userId: Id<"users">;
        username: string;
        avatar: string;
    }[];
}

export interface clerkUser {
    id: string;
    username: string;
    email: string;
    avatar?: string;
}

export interface Like {
  userId: string;
  timeStamp: number;
}

export interface Comment {
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  timestamp: number;
}

export interface Post {
  _id: string;
  authorId: string;
  authorName: string;
  userName: string;
  userAvatar: string;
  image: string[];
  text: string;
  likes: Like[];
  comments: Comment[];
}