import { useColorScheme } from "@/hooks/use-color-scheme";
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { Pacifico_400Regular, useFonts } from "@expo-google-fonts/pacifico";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Authenticated, ConvexReactClient, Unauthenticated, useConvexAuth } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from "react-native";
import "react-native-reanimated";
import Toast from 'react-native-toast-message';
//  const messages = useQuery(api.messages.getForCurrentUser); //how to get stuff for user
const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});
const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

export default function RootLayout() {
  const colorScheme = useColorScheme();

  function RootNavigator() {
  const { isLoading, isAuthenticated } = useConvexAuth();

  if (isLoading) return <Redirect href="/" />;
  if (isAuthenticated) return <Redirect href="/(tabs)/feed" />;
  return <Redirect href="/(auth)/login" />;
}



  const [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  if (!fontsLoaded) return <ActivityIndicator />;

  return (
    <ClerkProvider publishableKey={clerkPublishableKey} tokenCache={tokenCache}>
    <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
      
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
            {/* Auth Screens */}
            <Unauthenticated>
              <Stack.Screen name="(auth)/login" />
              <Stack.Screen name="(auth)/signup" />
            </Unauthenticated>
            
            <Stack.Screen name="index" />
            {/* App Screens */}
            <Authenticated>
              <Stack.Screen name="(tabs)/_layout" />
              <Stack.Screen name="(tabs)/feed" />
              <Stack.Screen name="(tabs)/create-post" />
              <Stack.Screen name="other-users/[id]" />
              <Stack.Screen name="(tabs)/user-profile" />
            </Authenticated>
          </Stack>

          {/* Handle redirection */}
          <RootNavigator />

        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      </ThemeProvider>
      
    </ConvexProviderWithClerk>
    <Toast />
    </ClerkProvider>
  );
}
