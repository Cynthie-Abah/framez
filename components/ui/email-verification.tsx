import { Colors } from "@/constants/theme";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from "react-native";
import Logo from "./logo";

interface EmailVerificationProps {
  code: string;
  setCode: (code: string) => void;
  onVerifyPress: () => void;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({ code, setCode, onVerifyPress }) => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  return (
     <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={[styles.container, { backgroundColor: theme.background }]}
        >
          <View style={styles.inner}>
            <View style={{ marginBottom: 50 }}>
              <Logo />
            </View>
    
            <Text
              style={{
                color: theme.text,
                fontSize: 20,
                fontWeight: "600",
                marginBottom: 8,
                textAlign: "center",
              }}
            >
              Verify your email
            </Text>
    
            <Text
              style={{
                color: theme.placeholder,
                fontSize: 14,
                textAlign: "center",
                marginBottom: 30,
                lineHeight: 20,
              }}
            >
              We’ve sent a 6-digit verification code to your email. 
              Please enter it below to complete your sign-up.
            </Text>
              <View style={[styles.inputContainer, { borderColor: theme.border }]}>
            <TextInput
              value={code}
              onChangeText={(text) => setCode(text)}
              placeholder="Enter your verification code"
              placeholderTextColor={theme.placeholder}
              keyboardType="number-pad"
              maxLength={6}
              style={[
                styles.inputCode,
                { borderColor: theme.border, color: theme.text },
              ]}
            />
            </View>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "rgb(42, 98, 216)" }]}
              onPress={onVerifyPress}
            >
              <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>
    
            {/* <View style={{ flexDirection: "row", marginTop: 20 }}>
              <Text style={{ color: theme.text }}>Didn’t receive a code?</Text>
              <TouchableOpacity onPress={}>
                <Text style={styles.signupLink}> Resend</Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </KeyboardAvoidingView>
  )
}

export default EmailVerification

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
  },
  inputCode: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
  },
  inner: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    paddingHorizontal: 24,
  },
  inputContainer: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  button: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  signupLink: {
    color: "rgb(42, 98, 216)",
    fontWeight: "600",
  },
});
