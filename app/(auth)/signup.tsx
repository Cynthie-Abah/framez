import EmailVerification from '@/components/ui/email-verification'
import Input from '@/components/ui/input'
import Logo from '@/components/ui/logo'
import { Colors } from '@/constants/theme'
import useAuthStore from '@/store'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { useState } from 'react'
import { Controller, useForm } from "react-hook-form"
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View
} from 'react-native'
import Toast from 'react-native-toast-message'

type SignUpForm = {
  emailAddress: string
  password: string
  confirmPassword: string
  username: string
}

export default function SignUpScreen() {
  const router = useRouter()
  const { isLoaded, signUp, setActive } = useSignUp()
  const { control, watch, handleSubmit, formState: { errors, isSubmitting }} = useForm<SignUpForm>();
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const {setClerkEmail} = useAuthStore();

  const emailAddress = watch('emailAddress')

  const onSignUpPress = async (data: SignUpForm) => {
    if (!isLoaded) return
    const { emailAddress, password, username } = data
    try {
      await signUp.create({
        emailAddress,
        password,
        username
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setPendingVerification(true)
    } catch (err: any) {
        if (err instanceof Error) {
        Toast.show({
        type: 'error',
        text1: 'Error Signing up',
        text2: err.message
        });  
        }
      console.error(err);
    }
  }

  const onVerifyPress = async () => {
     if (!isLoaded) return;
  try {
    const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });

    if (signUpAttempt.status === "complete" && signUpAttempt.createdSessionId ) {
      await setActive({ session: signUpAttempt.createdSessionId });
      router.replace('/(tabs)/feed')
        setClerkEmail(emailAddress)   
    } else {
      console.error("Verification not complete:", JSON.stringify(signUpAttempt, null, 2));
    }
    } catch (err: any) {
        if (
            err.code === "api_response_error" || 
            err.status === 429) {
        Toast.show({
            type: 'error',
            text1: "Too Many Requests",
            text2: "Please wait a few minutes before trying again."
        });
  } else {
    console.error(err);
  }
        if (err instanceof Error) {
        Toast.show({
        type: 'error',
        text1: 'Error Signing up',
        text2: err.message
        });  
        }
      console.error(err)
    }
  }

  if (pendingVerification) {
    return (
       <EmailVerification
       code={code} 
       setCode={setCode} 
       onVerifyPress={onVerifyPress} />
    )
  }

    const password = watch("password", "");

  return (
    <KeyboardAvoidingView 
    behavior={Platform.OS === "ios" ? "padding" : 'height'}
    style={[styles.container, { backgroundColor: theme.background }]}>

      <View style={styles.inner}>

        <View style={{ marginBottom: 70 }}>
            <Logo />
        </View>

        <Controller
        control={control}
        name="username"
        rules={{ required: "Username is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
            <Input
            value={value} 
            setValue={onChange}
            placeholder='Enter your username'
            />
        )}
        />
         {errors.username?.message && (
          <Text style={styles.errorText}>{errors.username.message.toString()}</Text>
        )}

        <Controller
        control={control}
        name="emailAddress"
        rules={{
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email format",
            },
          }}
        render={({ field: { onChange, onBlur, value } }) => (
            <Input 
            value={value} 
            setValue={onChange}
            placeholder='Enter Email Address'
            />
        )}
        />
         {errors.emailAddress?.message && (
          <Text style={styles.errorText}>{errors.emailAddress.message.toString()}</Text>
        )}  

        {/* password */}
        <Controller
        control={control}
        name="password"
        rules={{
            required: "Password is required",
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
              message: "Must contain 8+ chars with letters & numbers",
            },
          }}
        render={({ field: { onChange, onBlur, value } }) => (
            <Input
            secureTextEntry
            value={value} 
            setValue={onChange}
            placeholder='Enter Password '
            />
        )}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}

        {/* confirm password */}
         <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: "Please confirm your password",
            validate: (value) => {
              return value === password || "Passwords do not match";
            }
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Confirm Password"
              secureTextEntry
              value={value}
              setValue={onChange}
            />
          )}
        />
        {errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
        )}

        <TouchableOpacity 
        style={[styles.button, { backgroundColor: 'rgb(42, 98, 216)' }]}
        disabled={isSubmitting}
        onPress={handleSubmit(onSignUpPress)}>
            {isSubmitting ? (
                <ActivityIndicator color="#fff" />
                ) : (
                <Text style={styles.buttonText}>Sign Up</Text>
                )}
        </TouchableOpacity>

        {/* <GoogleOneTap /> */}

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
  logo: {
    marginBottom: 70,
  },
    errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginBottom: 8,
    fontSize: 12,
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
