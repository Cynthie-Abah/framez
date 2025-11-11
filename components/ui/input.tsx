import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { FC, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, useColorScheme, View } from "react-native";

interface InputProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  secureTextEntry?: boolean;
}

const Input: FC<InputProps> = ({
  value,
  setValue,
  placeholder = "",
  secureTextEntry = false,
  ...props
}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={[styles.inputContainer, { borderColor: theme.border }]}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.background,
            color: theme.text,
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={theme.icon}
        value={value}
        // onBlur={onBlu}
        onChangeText={setValue}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        {...props}
      />

      {secureTextEntry && (
        <TouchableOpacity
          onPress={() => setIsPasswordVisible((prev) => !prev)}
          style={styles.iconContainer}
        >
          <Ionicons
            name={isPasswordVisible ? "eye-off" : "eye"}
            size={20}
            color={theme.icon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
  },
  iconContainer: {
    paddingLeft: 8,
  },
});

export default Input;
