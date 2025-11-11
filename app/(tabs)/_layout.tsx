import { api } from '@/convex/_generated/api';
import useAuthStore from '@/store';
import { useUser } from '@clerk/clerk-expo';
import { useMutation } from 'convex/react';
import { Tabs } from 'expo-router';
import { Home, Plus, User } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { HapticTab } from '../../components/haptic-tab';
import { Colors } from '../../constants/theme';

export default function TabLayout() {
    const {createUserOnServer} = useAuthStore();
    const {user, isSignedIn} = useUser();
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light; 
  const createUser = useMutation(api.users.createUser);

  useEffect(() => {
  if (!user && !isSignedIn ) return;

  createUserOnServer({
    id: user.id,
    email: user.emailAddresses[0].emailAddress,
    avatar: '',
    username: user.username || '',
  },
    async (payload) => {
    await createUser({
    clerkId: payload.clerkId,
    email: user.emailAddresses[0].emailAddress,
    avatar: '',
    username: payload.username || '',
    followers: [],
    following: [],
  }); 
  });
}, [user]);

  return (
    <Tabs
  screenOptions={{
    tabBarActiveTintColor: theme.tint,
    tabBarInactiveTintColor: theme.icon,
    headerShown: false,
    tabBarButton: HapticTab,
    tabBarShowLabel: false,
    tabBarStyle: [
      {
        paddingTop: 10, 
        height: 80,
        backgroundColor: theme.feedBackground,
        borderTopWidth: 1,
        borderTopColor: theme.border,
      },
    ],
  }}
>
      <Tabs.Screen
        name="feed"
        options={{
          title: 'feed',
          tabBarIcon: ({ color, focused }) => <Home strokeWidth={3} size={28} color={color} />,
        }}
//         listeners={({ navigation, route }) => ({
//     tabPress: (e) => {
//       const state = navigation.getState();
//       const isFocused = state.routes[state.index].key === route.key;

//       if (isFocused) {
//         const scrollToTop = navigation.getParam('scrollToTop'); 
//       if (scrollToTop) {
//         scrollToTop();
//       }
//       }
//     },
//   })}
      />

      <Tabs.Screen
        name="create-post"
        options={{
          title: 'create-post',
          tabBarIcon: ({ color }) => <Plus strokeWidth={3} size={28} color={color} />,
        }}
      />

      <Tabs.Screen
        name="user-profile"
        options={{
          title: 'user-profile',
          tabBarIcon: ({ color }) => <User strokeWidth={3} size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
