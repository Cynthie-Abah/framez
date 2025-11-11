import Profile from '@/components/ui/profile';
import useAuthStore from '@/store';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const UserProfile = () => {
  const {user} = useAuthStore();

  if (!user) return <SafeAreaView> <ActivityIndicator /> </SafeAreaView>
  return (
    <Profile userId={user?._id.toString()} type="user" />
  );
};

export default UserProfile;
