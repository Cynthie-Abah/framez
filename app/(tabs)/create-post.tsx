import { Colors } from '@/constants/theme';
import { Camera } from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CreatePost = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const [postText, setPostText] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.feedBackground }]}>
      {/* Image preview */}
      <TouchableOpacity style={[styles.imagePlaceholder, { borderColor: theme.icon }]}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Camera color={theme.icon} size={50} />
        )}
      </TouchableOpacity>

      {/* Post input */}
      <TextInput
        style={[styles.input, { color: theme.text, borderColor: theme.icon }]}
        placeholder="Write a caption..."
        placeholderTextColor={theme.placeholder}
        value={postText}
        onChangeText={setPostText}
        multiline
      />

      {/* Share button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.tint }]}
        onPress={() => console.log('Post shared!')}
      >
        <Text style={[styles.buttonText]}>Share</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    borderWidth: 2,
    borderRadius: 12,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  input: {
    width: '100%',
    minHeight: 80,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});


// import { Alert, Pressable, Text, View } from "react-native";

// import { useImageUploader } from "../../utils/uploadthing";

// export function MultiUploader() {
//   const { openImagePicker, isUploading } = useImageUploader("imageUploader", {
//     /**
//      * Any props here are forwarded to the underlying `useUploadThing` hook.
//      * Refer to the React API reference for more info.
//      */
//     onClientUploadComplete: () => Alert.alert("Upload Completed"),
//     onUploadError: (error: any) => Alert.alert("Upload Error", error.message),
//   });

//   return (
//     <View>
//       <Pressable
//         onPress={() => {
//           openImagePicker({
//             oninput, // Matches the input schema from the FileRouter endpoint
//             source: "library", // or "camera"
//             onInsufficientPermissions: () => {
//               Alert.alert(
//                 "No Permissions",
//                 "You need to grant permission to your Photos to use this",
//                 [
//                   { text: "Dismiss" },
//                   { text: "Open Settings", onPress: openSettings },
//                 ],
//               );
//             },
//           });
//         }}
//       >
//         <Text>Select Image</Text>
//       </Pressable>
//     </View>
//   );
// }
