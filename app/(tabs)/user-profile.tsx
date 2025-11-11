import Profile from '@/components/ui/profile';
import React from 'react';

const dummyPosts = [
  { id: '1', image: 'https://picsum.photos/200/200?1' },
  { id: '2', image: 'https://picsum.photos/200/200?2' },
  { id: '3', image: 'https://picsum.photos/200/200?3' },
  { id: '4', image: 'https://picsum.photos/200/200?4' },
  { id: '5', image: 'https://picsum.photos/200/200?5' },
  { id: '6', image: 'https://picsum.photos/200/200?6' },
];

const UserProfile = () => {

  return (
    <Profile type="user" />
  );
};

export default UserProfile;
