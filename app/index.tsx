import { Colors } from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { Images } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, useColorScheme, View } from "react-native";

const Index = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>

        <View style={styles.buttonContainer}>
            <LinearGradient
            colors={["#f58529", "#dd2a7b", "#8134af"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
            >
            <Images color="#fff" size={60} />
            </LinearGradient>
        </View>

        <Text style={[styles.title, { color: theme.text }]}>Welcome to Framez</Text>

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
  buttonContainer: {
    borderRadius: 16,
    overflow: "hidden", // ensures gradient respects border radius
  },
  button: {
    padding: 18,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
