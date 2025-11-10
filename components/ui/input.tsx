import { Colors } from "@/constants/theme";
import React from "react";
import { StyleSheet, TextInput, TextInputProps, useColorScheme } from "react-native";

interface InputProps extends TextInputProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ value, setValue, placeholder = "", ...props }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <TextInput
      style={[styles.input, { backgroundColor: theme.background, color: theme.text, borderColor: theme.border }]}
      placeholder={placeholder}
      placeholderTextColor={theme.icon}
      value={value}
      onChangeText={setValue}
      {...props} 
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 14,
    fontSize: 16,
    marginBottom: 20,
  },
});

export default Input;
