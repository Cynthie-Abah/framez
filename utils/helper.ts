// export function formatTimeAgo(timestamp: number) {
//   const now = new Date();
//   const postDate = new Date(timestamp);
//   const diff = now.getTime() - postDate.getTime();

//   const seconds = Math.floor(diff / 1000);
//   const minutes = Math.floor(seconds / 60);
//   const hours = Math.floor(minutes / 60);
//   const days = Math.floor(hours / 24);

//   if (days >= 1) {
//     return postDate.toLocaleDateString(undefined, {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     });
//   } else if (hours >= 1) {
//     return `${hours} hour${hours > 1 ? 's' : ''} ago`;
//   } else if (minutes >= 1) {
//     return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
//   } else {
//     return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
//   }
// }

export function formatTimeAgo(timestamp: number) {
  const now = new Date();
  const postDate = new Date(timestamp < 1e12 ? timestamp * 1000 : timestamp);
  const diff = now.getTime() - postDate.getTime();

  if (diff < 0) return "Just now";

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days >= 1) {
    return postDate.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } else if (hours >= 1) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes >= 1) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  }
}
