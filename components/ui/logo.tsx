import { LinearGradient } from 'expo-linear-gradient'
import { Images } from 'lucide-react-native'
import React from 'react'
import { StyleSheet, View } from 'react-native'

function Logo() {
  return (
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
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 16,
    overflow: "hidden",
  },
  button: {
    padding: 18,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Logo