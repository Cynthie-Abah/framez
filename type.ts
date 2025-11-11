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