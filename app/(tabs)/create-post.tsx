import { Colors } from "@/constants/theme";
import { Id } from "@/convex/_generated/dataModel";
import { useCreatePost } from "@/hooks/use-create-post";
import { useEditPost } from "@/hooks/use-edit-post";
import { useFetchUserByEmail } from "@/hooks/use-fetch-userbyemail";
import usePickImages from "@/hooks/use-pick-image";
import { useSinglePost } from "@/hooks/use-single-post";
import { useLocalSearchParams } from "expo-router";
import { X } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
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

// REMEMBER TO EDIT THIS PAGE TO ACCOMMODATE EDITING OF A POST
export default function CreatePost() {
  const { postId } = useLocalSearchParams();

  const result = postId ? useSinglePost(typeof postId === 'string' ? postId as Id<"posts"> : '' as Id<"posts">) : null;
  const isLoading = result?.isLoading
  const post = result?.post
  const {user} = useFetchUserByEmail();
  const {handleCreatePost, isloading} = useCreatePost();
  const {editPost} = useEditPost()
  const {pickImages, isPicking, images, setImages} = usePickImages();
  const [caption, setCaption] = useState<string>('');

  const removePickedImage = (index: number) => {
  const filteredImages = images.filter((_, i) => i !== index);
  setImages(filteredImages);
};

  useEffect(()=>{
    setImages(post?.image || images)
    setCaption(post?.text || caption)
  },[post, postId])
  
  const {
    control, 
    handleSubmit, 
    reset, 
    formState: {
      errors, 
      isSubmitting}} = useForm({
        defaultValues: {
          images: post?.image || [], 
          caption: post?.text || caption}});

// color scheme
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  const handlePost = async ({caption}: {caption: string}) => {
    if ( images.length === 0 && !user) return;

    if (!postId) {
      // CREATE NEW POST
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
  reset()
    } else {
      // EDIT POST
      const updatedPost = {
        postId: postId as Id<"posts">, 
        userId: user?._id as Id<"users"> || '' as Id<"users">, 
        image: images, 
        text: caption
      }
      
      editPost(updatedPost)
    }
  };

  if ( isLoading) {return <SafeAreaView style={{ flex: 1, backgroundColor: theme.feedBackground }}><ActivityIndicator /></SafeAreaView>}

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.feedBackground }]}>
    <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text, fontFamily: 'Pacifico_400Regular'}]}>New Post</Text>
      </View>

      <View style={{ width: '100%', maxWidth: 400, alignItems: 'center' }}>

        {/* image controller */}
        <Controller
        control={control}
        name="images"
        rules={{ 
          validate: () => {
              return images.length > 0  || "Please add at least one image.";
            } }}
          render={() =>{ 
            return (
          <TouchableOpacity 
          style={[styles.addImageBox, {borderColor: theme.ashButton}]} 
          onPress={pickImages}>
            <Text style={{ color: theme.icon }}>
              {isPicking ? <ActivityIndicator /> : (images.length > 0 ? "Add more photos" : "Select photos")}
            </Text>
          </TouchableOpacity>
          )}}
          />
            {errors.images?.message && (
            <Text style={styles.errorText}>{errors.images.message.toString()}</Text>
            )}

        {/* add an x button for deleting picked images */}
        {images.length > 0 && (
          <ScrollView style={{marginBottom: 16}} horizontal showsHorizontalScrollIndicator={false}>
            {images.map((uri, i) => (
              <View key={i} style={{position: 'relative'}}>
              <Image  source={{ uri }} style={styles.imagePreview} />
              <TouchableOpacity style={styles.removeImageButton} onPress={() => removePickedImage(i)}>
                  <X size={20} color={'white'} />
              </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}

        {/* caption */}
        <Controller
        control={control}
        name="caption"
        rules={{
            required: "Caption is required",
            pattern: {
              value: /^.{1,300}$/,
              message: "Your caption is too long (max 300 characters).",
            },
          }}
        render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          placeholder="Write a caption..."
          placeholderTextColor={theme.ashButton}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          multiline
          style={[styles.captionInput, { color: theme.text, borderColor: theme.border, marginBottom: 30 }]}
        />
        )}
        />
        {errors.caption && (
          <Text style={styles.errorText}>{errors.caption.message}</Text>
        )}

        <TouchableOpacity
            onPress={handleSubmit(handlePost)}
            disabled={isloading || isSubmitting}
            style={[styles.postButton, { opacity: isloading || isSubmitting ? 0.6 : 1 , width: '100%', marginHorizontal: 'auto'}]}
          >
            {isloading || isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={[styles.postText, {textAlign: 'center'}]}>{postId ? 'Edit Post' : 'Post'}</Text>
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
   errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginBottom: 8,
    fontSize: 12,
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
  removeImageButton: {
  justifyContent: 'center', 
  alignItems: 'center', 
  width: 25, 
  height: 25, 
  backgroundColor: 'red', 
  borderRadius: '50%', 
  position: 'absolute', 
  right: 1, 
  boxShadow: '3, 7, 7, #000'
  }
});
