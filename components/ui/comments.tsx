import { Colors, defaultAvatar } from '@/constants/theme';
import { Id } from '@/convex/_generated/dataModel';
import { useComment } from '@/hooks/use-comment';
import { useDeleteComment } from '@/hooks/use-delete-comment';
import { useFetchUserByEmail } from '@/hooks/use-fetch-userbyemail';
import { Comment } from '@/type';
import { formatTimeAgo } from '@/utils/helper';
import { Image } from 'expo-image';
import { Trash } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';

const Comments = ({postId, comments, canDelete}: {comments: Comment[], postId: Id<"posts">, canDelete: boolean}) => {
  const [comment, setComment] = useState<string>('');
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const {user} = useFetchUserByEmail()
    const {commentOnPost} = useComment();
    const { deleteComment } = useDeleteComment();

    const handleDelete = ({userId, timestamp}: {userId: Id<"users">, timestamp: number}) => {
        Alert.alert(
        'Delete comment?',
        'This action cannot be undone.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Delete', style: 'destructive', onPress: () => deleteComment({postId, userId, timestamp }) },
        ]
      );
      }

    const handleComment = ()=> {
      if (!comment || !user) return

      const newComment = {
        postId, 
        userId: user?._id as Id<"users">, 
        userName: user?.username || '', 
        userAvatar: user?.avatar || '', 
        text: comment
      }
      commentOnPost(newComment)
      setComment('')
    }
    
  return (
    <View style={{ 
        padding: 10, 
        borderTopWidth: 0.5, 
        borderTopColor: theme.border }}>
    {/* Header */}
    <Text
      style={{
        color: theme.text,
        fontWeight: '600',
        fontSize: 16,
        marginBottom: 8,
      }}
    >
      Comments
    </Text>

    {/* Comment list */}
    {comments?.length > 0 ? (
      comments.map((comment, index) => (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginBottom: 15,
            gap: 8,
          }}
        >
          
          {/* Avatar */}
          <Image
            source={{ uri: comment.userAvatar || defaultAvatar }}
            style={{
              width: 35,
              height: 35,
              borderRadius: 35 / 2,
            }}
          />

          {/* Comment content */}
          <View style={{ flex: 1 }}>
            <Text style={{ color: theme.text }}>
              <Text style={{ fontWeight: '600' }}>{comment.userName} </Text>
              {comment.text}
            </Text>

            <Text
              style={{
                color: theme.icon,
                fontSize: 12,
                marginTop: 3,
              }}
            >
              {formatTimeAgo(comment.timestamp)} 
              {/* · Reply */}
            </Text>
          </View>

           {canDelete && (
            <TouchableOpacity onPress={()=> handleDelete({userId: comment.userId, timestamp: comment.timestamp})}>
              <Trash size={18} color={Colors.dark.gradientMiddle} />
            </TouchableOpacity>
          )}


        </View>
      ))
    ) : (
      <Text style={{ color: theme.icon, fontSize: 14 }}>No comments yet.</Text>
    )}

    {/* Add comment input */}
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        paddingTop: 8,
        borderTopWidth: 0.5,
        borderTopColor: theme.border,
      }}
    >
      <Image
        source={{ uri: user?.avatar || defaultAvatar }}
        style={{
          width: 30,
          height: 30,
          borderRadius: 15,
          marginRight: 8,
        }}
      />
      <TextInput
        placeholder="Add a comment..."
        placeholderTextColor={theme.icon}
        value={comment}
        onChangeText={setComment}
        style={{
          flex: 1,
          color: theme.text,
          fontSize: 14,
        }}
      />

      <TouchableOpacity onPress={handleComment}><Text style={{ color: theme.tint, fontWeight: '600', fontSize: 15 }}>Post</Text></TouchableOpacity>
    </View>
  </View>
  )
}

export default Comments