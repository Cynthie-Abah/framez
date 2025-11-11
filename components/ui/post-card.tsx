import { Colors, defaultAvatar } from '@/constants/theme';
import { Id } from '@/convex/_generated/dataModel';
import { useToggleLike } from '@/hooks/use-like-post';
import useAuthStore from '@/store';
import { Post } from '@/type';
import { formatTimeAgo } from '@/utils/helper';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Ellipsis, Heart, MessageCircle } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View
} from 'react-native';
import Comments from './comments';

const screenWidth = Dimensions.get('window').width;

export default function PostCard({item}: {item: Post}) {
    const [openComment, setOpenComment] = useState(false);
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const {toggleLike} = useToggleLike();
    const {user} = useAuthStore();
    const router = useRouter();

    const isLiked = item.likes.find((like)=> like.userId  === user?._id )

    const handleLikeToggle = ()=>{
        if (user) {
            toggleLike(item._id, user?._id as Id<"users">)
        }
        
    }

    const handlePress = ()=> {
    router.push(`/other-profile/${item.authorId}`);
  }

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const onScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
    setActiveIndex(index);
  };

  return (
     <View style={[styles.postContainer]}>
    
          {/* Post header */}
          <View style={styles.postHeaderContainer}>
    
            <TouchableOpacity onPress={handlePress} style={styles.postHeader}>
    
                <Image source={{ 
                    uri: item.userAvatar || defaultAvatar
                      }} style={styles.avatar} />
    
                <View style={{gap: 4}}>
                    <Text style={[styles.username, { color: theme.text }]}>{item.userName}</Text>
                    <Text style={[styles.username, { color: theme.placeholder }]}>{item.email}</Text>
                </View>
            </TouchableOpacity>
    
            <View>
                <Ellipsis size={20} color={'white'} />
            </View>
    
          </View>
    
          {/* Post image */}
            <ScrollView 
            horizontal={true} 
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            style={{ height: 400 }}
            onScroll={onScroll}
            contentContainerStyle={{ gap: 8 }}
            >
                {item.image.map((image, index)=> 
                <Image
                key={image + index} 
                source={{ uri: image }} 
                style={styles.postImage}
                contentFit="cover"
                cachePolicy="memory-disk"
                priority="high"
                transition={300}
                    />
                    )}
            </ScrollView>

              {/* Pagination Dots */}
      <View style={styles.paginationContainer}>
        {item.image.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              { backgroundColor: i === activeIndex ? theme.tint : theme.border },
            ]}
          />
        ))}
      </View>
    
          {/* Post actions */}
          <View style={styles.postActions}>
            {/* likes */}
            <TouchableOpacity onPress={handleLikeToggle} style={{ marginRight: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Heart color={theme.text} size={27} strokeWidth={isLiked ? 0 : 2.5} fill={isLiked && 'red'} /> 
                <Text style={{ color: theme.text }}>{item.likes.length}</Text></View>
            </TouchableOpacity>
            
                {/* comments */}
            <TouchableOpacity onPress={()=> setOpenComment(!openComment)} style={{ marginRight: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <MessageCircle color={theme.text} size={27} strokeWidth={2.5}/> 
                <Text style={{ color: theme.text }}>{item.comments.length}</Text></View>
            </TouchableOpacity>
          </View>
    
          {/* Post caption */}
          <Text style={[styles.caption, { color: theme.text }]}>{item.text}</Text>
    
          {/* Post time */}
          <Text style={[styles.caption, { color: theme.placeholder }]}>{formatTimeAgo(item._creationTime)}</Text>
          
         {openComment && (
            <Comments postId={item._id} comments={item.comments} />
)}
        </View>
  )
}


    const styles = StyleSheet.create({
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    postContainer: {
        marginBottom: 24,
        borderRadius: 10,
        flex: 1,
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    postHeaderContainer: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: 10,
    },
    username: {
        fontWeight: '600',
        marginLeft: 10,
        textTransform: 'capitalize',
    },
    postImage: {
        width: screenWidth,
        resizeMode: 'cover',
    },
    postActions: {
        flexDirection: 'row',
        padding: 10,
    },
    caption: {
        paddingBottom: 10,
        paddingHorizontal: 10,
    },
     paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
    });