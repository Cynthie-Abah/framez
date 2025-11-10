import Input from '@/components/ui/input'
import { Colors } from '@/constants/theme'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Images } from 'lucide-react-native'
import { useState } from 'react'
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View
} from 'react-native'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')
  const colorScheme = useColorScheme();
  const [loading, setLoading]  = useState();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true)
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
    return (
      <>
        <Text>Verify your email</Text>
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <TouchableOpacity onPress={onVerifyPress}>
          <Text>Verify</Text>
        </TouchableOpacity>
      </>
    )
  }

  return (
    <KeyboardAvoidingView 
    behavior={Platform.OS === "ios" ? "padding" : undefined}
    style={[styles.container, { backgroundColor: theme.background }]}>

      <View style={styles.inner}>

        <Images color='#e1306c' size={60} style={styles.logo}/>

         <Input 
        value={emailAddress} 
        setValue={setEmailAddress}
        placeholder='Enter Email Address'
        />

        <Input 
        value={password} 
        setValue={setPassword}
        placeholder='Enter Password'
        />
        {/* confirm password */}
        <Input 
        value={password} 
        setValue={setPassword}
        placeholder='Confirm Password'
        />

        <TouchableOpacity 
        style={[styles.button, { backgroundColor: 'rgb(42, 98, 216)' }]}
        onPress={onSignUpPress}>
            {loading ? (
                <ActivityIndicator color="#fff" />
                ) : (
                <Text style={styles.buttonText}>Sign Up</Text>
                )}
        </TouchableOpacity>

        {/* Signup Link */}
        <View style={styles.signupContainer}>
            <Text style={{ color: theme.text }}>Already have an account?</Text>
            <Link href="/(auth)/login">
            <Text style={styles.signupLink}> Sign in</Text>
            </Link>
        </View>

      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    paddingHorizontal: 24,
  },
  logo: {
    marginBottom: 70,
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
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signupLink: {
    color: "rgb(42, 98, 216)",
    fontWeight: "600",
  },
});
