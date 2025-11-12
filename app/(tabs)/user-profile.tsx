import Profile from '@/components/ui/profile';
import { useFetchUserByEmail } from '@/hooks/use-fetch-userbyemail';
import { ActivityIndicator, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const UserProfile = () => {
  const {user, isLoading} = useFetchUserByEmail()

  if (isLoading) return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator />
    </SafeAreaView>
  );

  if (!user) return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>User not found</Text>
    </SafeAreaView>
  );
  return (
    <Profile userId={user?._id.toString()} type="user" />
  );
};

export default UserProfile;
