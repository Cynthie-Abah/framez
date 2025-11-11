import Profile from '@/components/ui/profile';
import useAuthStore from '@/store';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const OtherProfile = () => {
  const { id } = useLocalSearchParams();
  const {user} = useAuthStore();

  if (!id || Array.isArray(id)) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <Profile userId={id.toString()} type={user?._id === id ? "user" : "others"} />
  );
};

export default OtherProfile;
