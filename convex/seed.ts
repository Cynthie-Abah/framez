// import { Id } from "./_generated/dataModel";
// import { mutation } from "./_generated/server";

// // Seed function to populate the posts table
// export const seedPosts = mutation({
//   args: {},
//   handler: async (ctx) => {
//     // Get all users (optional, you can still use them for username/avatar)
//     const users = await ctx.db.query("users").collect();

//     if (users.length === 0) {
//       throw new Error("No users found. Seed users first before seeding posts.");
//     }

//     // Only use these two author IDs
//     const authorIds: Id<"users">[] = [
//         "j975t68ecn60zds1t15zveemsh7v6vsz" as Id<"users">,
//     "j97667hg38dqmcna2fyn8ngkf97v6sft" as Id<"users">
// ];

//     // Sample post texts
//     const sampleTexts = [
//       "Excited to share my latest project!",
//       "Another beautiful day to build something amazing 🌞",
//       "Coffee + Code = ❤️",
//       "Here’s a glimpse of my recent work.",
//       "Life as a developer is all about learning and growing.",
//     ];

//     // Sample images
//     const sampleImages = [
//       [
//   "https://images.unsplash.com/photo-1611601147557-cdc89476ec4a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGluayUyMGFlc3RoZXRpY3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
//   "https://plus.unsplash.com/premium_photo-1673488825874-36f1403311ba?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGluayUyMGFlc3RoZXRpY3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
// ],
//       ["https://picsum.photos/1080/1030?random=1"],
//       ["https://picsum.photos/1080/1030?random=2"],
//       [
//         "https://picsum.photos/1080/1380?random=2",
//         "https://picsum.photos/200/300?random=2",
//         ],
//       [
//         "https://picsum.photos/1080/1380?random=6",
//         "https://picsum.photos/1080/1380?random=7",
//         "https://picsum.photos/1080/1380?random=1",
//         "https://picsum.photos/1080/1380?random=9",
//         ],
//     ];

//     for (let i = 0; i < 5; i++) {
//       // Choose an author ID from the two options
//       const authorId = authorIds[i % authorIds.length];

//       // Optionally get user info from the users table (for avatar/username)
//       const user = users.find(u => u._id === authorId);

//       await ctx.db.insert("posts", {
//         authorId: authorId,
//         email: user?.email || "",
//         userName: user?.username || `user_${Math.floor(Math.random() * 1000)}`,
//         userAvatar: user?.avatar || `https://i.pravatar.cc/150?img=${i}`,
//         image: sampleImages[i % sampleImages.length],
//         text: sampleTexts[i % sampleTexts.length],
//         likes: [
//           {
//             userId: authorId,
//             timeStamp: Date.now(),
//           },
//         ],
//         comments: [
//           {
//             userId: authorId,
//             userName: user?.username || `user_${Math.floor(Math.random() * 1000)}`,
//             userAvatar: user?.avatar || `https://i.pravatar.cc/150?img=${i + 1}`,
//             text: "This is awesome 🔥",
//             timestamp: Date.now(),
//           },
//         ],
//       });
//     }

//     return { message: "Posts seeded successfully ✅" };
//   },
// });
