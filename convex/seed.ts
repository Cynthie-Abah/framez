// import { mutation } from "./_generated/server";

// // Seed function to populate the posts table
// export const seedPosts = mutation({
//   args: {},
//   handler: async (ctx) => {
//     // Get all users (you can seed users first if needed)
//     const users = await ctx.db.query("users").collect();

//     if (users.length === 0) {
//       throw new Error("No users found. Seed users first before seeding posts.");
//     }

//     // Helper function to get a random user
//     const getRandomUser = () => users[Math.floor(Math.random() * users.length)];

//     // Create some fake posts
//     const sampleTexts = [
//       "Excited to share my latest project!",
//       "Another beautiful day to build something amazing 🌞",
//       "Coffee + Code = ❤️",
//       "Here’s a glimpse of my recent work.",
//       "Life as a developer is all about learning and growing.",
//     ];

//     const sampleImages = [
//       ["https://source.unsplash.com/random/800x600?tech"],
//       ["https://source.unsplash.com/random/800x600?fashion"],
//       ["https://source.unsplash.com/random/800x600?coding"],
//       ["https://source.unsplash.com/random/800x600?laptop"],
//       ["https://source.unsplash.com/random/800x600?design"],
//     ];

//     for (let i = 0; i < 5; i++) {
//       const user = getRandomUser();
//       const randomText = sampleTexts[i % sampleTexts.length];
//       const randomImages = sampleImages[i % sampleImages.length];

//       await ctx.db.insert("posts", {
//         authorId: user._id,
//         authorName: user.username || "Anonymous",
//         userName: user.username || "user_" + Math.floor(Math.random() * 1000),
//         userAvatar: user.avatar || "https://i.pravatar.cc/150?img=" + i,
//         image: randomImages,
//         text: randomText,
//         likes: [
//           {
//             userId: user._id,
//             timeStamp: Date.now(),
//           },
//         ],
//         comments: [
//           {
//             userId: user._id,
//             userName: user.username || "user_" + Math.floor(Math.random() * 1000),
//             userAvatar: user.avatar || "https://i.pravatar.cc/150?img=" + (i + 1),
//             text: "This is awesome 🔥",
//             timestamp: Date.now(),
//           },
//         ],
//       });
//     }

//     return { message: "Posts seeded successfully ✅" };
//   },
// });
