# Framez - Mobile Social Application

## Description

**Framez** is a mobile social application built with React Native that allows users to share posts and interact with other users. Each user has a profile to view their posts and activity. This project demonstrates authentication, real-time data handling, and a clean, responsive UI.

The app was developed as part of an intern task to showcase proficiency in mobile development, authentication integration, state management, and UI structure.

---

## Core Objectives

- Implement user authentication (sign-up, login, logout) using **Clerk**.
- Allow users to create posts.
- Display a feed of posts from all users.
- Display the current user’s profile with their posts.

---

## Key Features

### Authentication

- Secure login, registration, and logout flow.
- Persistent user sessions (remain logged in after reopening the app).
- Validation using React Hook Form for user inputs.

### Posts

- Create and upload posts containing text and/or images.
- Display posts in a chronological or most-recent-first feed.
- Each post shows:
  - Author’s name
  - Timestamp
  - Profile picture (if available)

- Users can:
  - Comment on posts
  - Delete comments
  - Edit or delete their own posts
  - View all posts in a “postcard” style gallery by clicking on any post image.

### User Profile

- Displays logged-in user information (name, email, avatar).
- Shows all posts created by the current user.
- Edit profile functionality including avatar and username.

### Social Interaction

- Users can follow other users.
- Scroll indicator for images in posts.
- Delete picked pictures from posts.
- Post count indicator for user posts.

### Technical Details

- Framework: React Native (Expo)
- Backend: Clerk + Convex for authentication and database
- State Management: Zustand for user session and state
- UI inspired by Instagram for clean, intuitive navigation
- Form validation implemented with React Hook Form
- Real-time database updates with Convex

---

## Technical Requirements

- **Framework:** React Native (Expo)
- **Backend:** Clerk & Convex
- **Database:** Convex real-time storage
- **State Management:** Zustand
- **Deployment:** Tested with Expo Go; planned hosting on [Appetize.io](http://appetize.io)

---

## Acceptance Criteria Achieved

- User registration, login, and logout.
- Auth session persists on app restart.
- Users can create, edit, and delete posts.
- Posts display correctly in the feed.
- Users’ profile shows their posts.
- Smooth navigation and responsive layout.
- User interactions: comment, delete comment, follow, edit profile.
- Post gallery view and image scroll indicator.
- Form validations applied to all user inputs.

---

## Todo / Future Improvements

- Messaging between users
- Notifications for new posts
- Convex image saving issues to fix
