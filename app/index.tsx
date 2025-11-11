import Logo from "@/components/ui/logo";
import { Colors } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, useColorScheme, View } from "react-native";

const Index = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>

        <Logo />

        <Text style={[styles.title, { color: theme.text, fontFamily: 'Pacifico_400Regular' }]}>Framez</Text>

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
