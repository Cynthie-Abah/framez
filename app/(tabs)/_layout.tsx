import useAuthStore from '@/store';
import { Tabs } from 'expo-router';
import { Home, Plus, User } from 'lucide-react-native';
import React from 'react';
import { ActivityIndicator, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HapticTab } from '../../components/haptic-tab';
import { Colors } from '../../constants/theme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light; 
  const { isAuthenticated} = useAuthStore();

  if (!isAuthenticated)  {return <SafeAreaView style={{ flex: 1, backgroundColor: theme.feedBackground }}><ActivityIndicator /></SafeAreaView>}

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
        }}/>

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
