// import { YOUR_CLOUD_NAME, YOUR_UNSIGNED_PRESET } from 'react-native-dotenv';
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

export async function uploadToCloudinary(imageUri: string) {
  // these are exposed... remember them 
  const cloudName ="dfuebxv0b";
  const uploadPreset = "framez";

  const formData = new FormData();
  formData.append('file', {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'upload.jpg',
  } as any);
  formData.append('upload_preset', uploadPreset);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  return data.secure_url; 
}

