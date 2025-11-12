import Input from '@/components/ui/input';
import Logo from '@/components/ui/logo';
import { Colors } from '@/constants/theme';
import useAuthStore from '@/store';
import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View
} from "react-native";
import Toast from 'react-native-toast-message';

type LoginForm = {
  emailAddress: string
  password: string
}

const LoginScreen = () => {
  const router = useRouter()
  const { signIn, setActive, isLoaded } = useSignIn();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const {setClerkEmail} = useAuthStore();

  const {control, handleSubmit, formState: {errors, isSubmitting}} = useForm<LoginForm>();

  const handleLogin = async ({emailAddress, password}: LoginForm) => {
    if (!isLoaded) return;
    try {
      const signInAttempt = await signIn.create({ identifier: emailAddress, password });
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId }); 
        router.replace('/(tabs)/feed')
        setClerkEmail(emailAddress)    
            return;
      } else {
       
            Toast.show({
            type: 'error',
            text1: 'Unknown error occurred during sign-in',
            });  
                
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: unknown) {
      console.error(JSON.stringify(err, null, 2));
      if (err instanceof Error) {
        
    Toast.show({
        type: 'error',
        text1: 'Error occurred during sign-in',
        text2: err.message ?? 'Unknown error occurred during sign-in'
       } );
      console.log(err instanceof Error ? err.message : 'Unknown error occurred during sign-in');
      }
      
    }
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === "ios" ? "padding" : 'height'}
    >
      {/* <TouchableOpacity onPress={()=> router.back()}><ChevronLeft strokeWidth={4} color={theme.text} size={26} /></TouchableOpacity> */}
      <View style={styles.inner}>
        {/* Logo */}
        <View style={{ marginBottom: 70 }}>
            <Logo />
        </View>

        {/* email */}
         <Controller
        control={control}
        name="emailAddress"
        rules={{ required: "Email is required" }}
        render={({ field: { onChange, value } }) => (
        <Input 
          value={value} 
          setValue={onChange}
          placeholder="Email" 
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
        rules={{ required: "Password is required" }}
        render={({ field: { onChange, value } }) => (
        <Input 
          value={value} 
          setValue={onChange}
          placeholder="Enter Password"
        />
         )}
        />
        {errors.password?.message && (
        <Text style={styles.errorText}>{errors.password.message.toString()}</Text>
        )}

        {/* Login Button */}
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: 'rgb(42, 98, 216)' }]} 
          onPress={handleSubmit(handleLogin)} 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Log In</Text>
          )}
        </TouchableOpacity>

        {/* Signup Link */}
        <View style={styles.signupContainer}>
          <Text style={{ color: theme.text }}>Don't have an account? </Text>
          <Link href="/(auth)/signup">
            <Text style={styles.signupLink}>Sign up</Text>
          </Link>
        </View>

      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
   errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginBottom: 8,
    fontSize: 12,
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
