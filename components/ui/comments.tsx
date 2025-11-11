import { Colors, defaultAvatar } from '@/constants/theme';
import useAuthStore from '@/store';
import { Comment } from '@/type';
import { Image } from 'expo-image';
import React from 'react';
import { Text, TextInput, useColorScheme, View } from 'react-native';

const Comments = ({comments}: {comments: Comment[]}) => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const {user} = useAuthStore();

    // REMEMBER TO COME BACK AND ADD COMMENT FUNCTIONALITY!!
    
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
            marginBottom: 12,
            gap: 8,
          }}
        >
          {/* Avatar */}
          <Image
            source={{ uri: comment.userAvatar }}
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
              {new Date(comment.timestamp).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })} 
              {/* · Reply */}
            </Text>
          </View>
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
        style={{
          flex: 1,
          color: theme.text,
          fontSize: 14,
        }}
      />
      <Text style={{ color: theme.tint, fontWeight: '600', fontSize: 15 }}>Post</Text>
    </View>
  </View>
  )
}

export default Comments