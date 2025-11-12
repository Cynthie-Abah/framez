import { Colors, defaultAvatar } from '@/constants/theme';
import { Id } from '@/convex/_generated/dataModel';
import { useEditProfile } from '@/hooks/use-edit-profile';
import useAuthStore from '@/store';
import { uploadToCloudinary } from '@/utils/helper';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const EditProfile = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const router = useRouter();
  const { user } = useAuthStore();
  const { editUserProfile, isLoading } = useEditProfile();

  const [username, setUsername] = useState(user?.username || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');

  const pickImage = async () => {
    Alert.alert(
      "Add Photo",
      "Choose an option",
      [
        {
          text: "Take Photo",
          onPress: async () => {
            const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
            if (cameraPermission.status !== "granted") {
              alert("Camera permission is required!");
              return;
            }
  
            const result = await ImagePicker.launchCameraAsync({
              quality: 0.8,
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
            });
  
            if (!result.canceled) {
                const imageUrl = await uploadToCloudinary(result.assets[0].uri);
                setAvatar(imageUrl)
            }
          },
        },
        {
          text: "Choose from Gallery",
          onPress: async () => {
            const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (galleryPermission.status !== "granted") {
              alert("Media library permission is required!");
              return;
            }
  
            const result = await ImagePicker.launchImageLibraryAsync({
              allowsMultipleSelection: true,
              quality: 0.8,
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
            });
  
            if (!result.canceled) {
            const imageUrl = await uploadToCloudinary(result.assets[0].uri);
                setAvatar(imageUrl)
            }
          },
        },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  const handleSave = async () => {
    if (!username.trim()) return alert('Username cannot be empty');
    await editUserProfile({
      userId: user?._id as Id<"users"> || '' as Id<"users">,
      username,
      bio,
      avatar,
    });
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.feedBackground }]}>
    <ScrollView>
        {/* BACK BUTTON */}
        <TouchableOpacity onPress={()=> router.back()}><ChevronLeft strokeWidth={4} color={theme.text} size={26} /></TouchableOpacity>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Edit Profile</Text>
      </View>

      {/* Avatar */}
      <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
        <Image
          source={{ uri: avatar || defaultAvatar }}
          style={styles.avatar}
        />
        <Text style={[styles.changePhoto, { color: theme.tint }]}>
          Change Photo
        </Text>
      </TouchableOpacity>

      {/* Username */}
      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: theme.text }]}>Username</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Enter username"
          placeholderTextColor={theme.placeholder}
          style={[styles.input, { color: theme.text, borderColor: theme.border }]}
        />
      </View>

      {/* Bio */}
      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: theme.text }]}>Bio</Text>
        <TextInput
          value={bio}
          onChangeText={setBio}
          placeholder="Write a short bio"
          placeholderTextColor={theme.placeholder}
          multiline
          style={[styles.input, styles.textArea, { color: theme.text, borderColor: theme.border }]}
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity
        style={[styles.saveButton, { backgroundColor: theme.tint }]}
        onPress={handleSave}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>Save Changes</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 25,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  changePhoto: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
  },
  inputContainer: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
  textArea: {
    height: 90,
    textAlignVertical: 'top',
  },
  saveButton: {
    marginTop: 25,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
