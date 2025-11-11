import { Colors } from "@/constants/theme";
import { useClerk } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { MenuIcon } from "lucide-react-native";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import Modal from "react-native-modal";

const Menu = () => {
    const [visible, setVisible] = useState(false);
    const toggleMenu = () => setVisible(!visible);
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

    const { signOut } = useClerk()
    const router = useRouter()

    const handleSignOut = async () => {
    try {
      await signOut()
      setVisible(false)
      router.replace('/')
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }


  return (
    <View>
      {/* Menu button */}
      <TouchableOpacity onPress={toggleMenu} style={[styles.menuButton, {backgroundColor: theme.background}]}>
            <MenuIcon color={theme.text} strokeWidth={3} />
      </TouchableOpacity>

      {/* Modal menu */}
      <Modal
        isVisible={visible}
        onBackdropPress={toggleMenu}
        backdropOpacity={0.1}
        style={styles.modal}
      >
        <View style={[styles.menuContainer, {backgroundColor: theme.background}]}>
          <TouchableOpacity style={styles.menuItem} onPress={()=>{ router.push('/(tabs)/user-profile'); setVisible(false)}}>
            <Text style={[styles.menuText, {color: theme.text}]}>Profile</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.menuItem} >
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.menuItem} onPress={handleSignOut}>
            <Text style={[styles.menuText, { color: "red" }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    padding: 10,
    borderRadius: 25,
    alignSelf: "flex-end",
  },
  menuButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modal: {
    justifyContent: "flex-start",
    margin: 0,
    marginTop: 120, 
    alignSelf: "flex-end",
    marginRight: 16,
  },
  menuContainer: {
    borderRadius: 8,
    paddingVertical: 10,
    width: 150,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuText: {
    fontSize: 16,
  },
});

export default Menu;
