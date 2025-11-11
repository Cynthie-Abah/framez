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
export interface user {
    _id: string;
    username: string;
    email: string;
    clerkId: string,
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

export interface Like {
  userId: Id<'users'>;
  timeStamp: number;
}

export interface Comment {
  userId: Id<'users'>;
  userName: string;
  userAvatar: string;
  text: string;
  timestamp: number;
}

export interface Post {
  _id: Id<"posts">;
  authorId: string;
  email: string
  userName: string;
  userAvatar: string;
  image: string[];
  text: string;
  likes: Like[];
  comments: Comment[];
  _creationTime: number
}