import Logo from "@/components/ui/logo";
import { Colors } from "@/constants/theme";
import useAuthStore from "@/store";
import { useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";

const Index = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
    const {clearUser, user} = useAuthStore();
    console.log(user);
    
    const { signOut } = useClerk()
    const router = useRouter()

    const handleSignOut = async () => {
    try {
      await signOut()
      clearUser()
      router.replace('/')
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }


    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>

        <Logo />
        <TouchableOpacity onPress={handleSignOut}>
        <Text style={[styles.title, { color: theme.text, fontFamily: 'Pacifico_400Regular' }]}>Framez</Text>
        </TouchableOpacity>


        </View>
    );
    };

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 60,
    textAlign: "center",
  },
});
