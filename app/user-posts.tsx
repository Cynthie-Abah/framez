import PostCard from "@/components/ui/post-card";
import { Colors } from "@/constants/theme";
import { Id } from "@/convex/_generated/dataModel";
import { useSinglePost } from "@/hooks/use-single-post";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PostDetail() {
  const { postId } = useLocalSearchParams();
  if(!postId) return
  const results = useSinglePost(postId as Id<"posts">);
  const post = results?.post
  const isLoading = results?.isLoading
  const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const router = useRouter();

  if (isLoading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  if (!post) return <Text>Post not found</Text>;

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
            <TouchableOpacity style={{paddingVertical: 20}} onPress={()=> router.back()}><ChevronLeft strokeWidth={4} color={theme.text} size={26} /></TouchableOpacity>

            <PostCard item={post} />

        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1,},
  postImage: { width: "100%", height: 400 },
  captionContainer: { padding: 16 },
  username: { fontWeight: "bold", marginBottom: 4 },
});
