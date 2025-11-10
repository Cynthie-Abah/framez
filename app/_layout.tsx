import { useColorScheme } from "@/hooks/use-color-scheme";
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { Pacifico_400Regular, useFonts } from "@expo-google-fonts/pacifico";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from "react-native";
import "react-native-reanimated";

// ✅ Convex client setup
const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});
const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || "";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  function RootNavigator() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return <Redirect href="/" />;

  if (isSignedIn) return <Redirect href="/(tabs)/feed" />;
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
            <Stack.Screen name="(auth)/login" />
            <Stack.Screen name="(auth)/signup" />
            {/* Protected Screens */}
            <Stack.Screen name="index" />
          </Stack>

          {/* Handle redirection */}
          <RootNavigator />

        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      </ThemeProvider>
      
    </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
