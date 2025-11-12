import { Colors } from "@/constants/theme";
import { Id } from "@/convex/_generated/dataModel";
import { useCreatePost } from "@/hooks/use-create-post";
import useAuthStore from "@/store";
import { uploadToCloudinary } from "@/utils/helper";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreatePost() {
  const { user } = useAuthStore();
  const [images, setImages] = useState<string[]>([]);
  const [caption, setCaption] = useState("");
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  const {handleCreatePost, isloading} = useCreatePost();

  const pickImages = async () => {
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
            const uri = result.assets[0].uri;
            const imageUrl = await uploadToCloudinary(uri);
              setImages((prev) => [...prev, imageUrl]);
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
            const uris = result.assets.map((a) => a.uri );
            for (const uri of uris) {
              const imageUrl = await uploadToCloudinary(uri);
              setImages((prev) => [...prev, imageUrl]);
            }
          }
        },
      },
      { text: "Cancel", style: "cancel" },
    ],
    { cancelable: true }
  );
};

  const handlePost = async () => {
    if (!caption && images.length === 0 && !user) return;

    const newPost = {
    authorId: user?._id as Id<"users"> || '' as Id<"users">,
    text: caption,
    image: images,
    email: user?.email || '',
    userName: user?.username || '',
    userAvatar: user?.avatar || '',
  };

  handleCreatePost(newPost);
  setImages([])
  setCaption('')
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.feedBackground }]}>
    <ScrollView
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text, fontFamily: 'Pacifico_400Regular'}]}>New Post</Text>
      </View>

      <View style={{ width: '100%', maxWidth: 400, alignItems: 'center' }}>
        <TouchableOpacity style={[styles.addImageBox, {borderColor: theme.ashButton}]} onPress={pickImages}>
          <Text style={{ color: theme.icon }}>
            {images.length > 0 ? "Add more photos" : "Select photos"}
          </Text>
        </TouchableOpacity>

        {images.length > 0 && (
          <ScrollView style={{marginBottom: 16}} horizontal showsHorizontalScrollIndicator={false}>
            {images.map((uri, i) => (
              <Image key={i} source={{ uri }} style={styles.imagePreview} />
            ))}
          </ScrollView>
        )}

        <TextInput
          placeholder="Write a caption..."
          placeholderTextColor={theme.ashButton}
          value={caption}
          onChangeText={setCaption}
          multiline
          style={[styles.captionInput, { color: theme.text, borderColor: theme.border, marginBottom: 30 }]}
        />

        <TouchableOpacity
            onPress={handlePost}
            disabled={isloading}
            style={[styles.postButton, { opacity: isloading ? 0.6 : 1 , width: '100%', marginHorizontal: 'auto'}]}
          >
            {isloading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={[styles.postText, {textAlign: 'center'}]}>Post</Text>
            )}
          </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "700",
  },
  postButton: {
    backgroundColor: "#0095f6",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },
  postText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
  },
  addImageBox: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 12,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    width: '100%'
  },
  imagePreview: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginRight: 10,
  },
  captionInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    minHeight: 120,
    width: '100%'
  },
});
