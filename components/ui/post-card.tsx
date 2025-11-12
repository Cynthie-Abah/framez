import { Colors, defaultAvatar } from '@/constants/theme';
import { Id } from '@/convex/_generated/dataModel';
import { useDeletePost } from '@/hooks/use-delete-post';
import { useToggleLike } from '@/hooks/use-like-post';
import useAuthStore from '@/store';
import { Post } from '@/type';
import { formatTimeAgo } from '@/utils/helper';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Ellipsis, Heart, MessageCircle } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View
} from 'react-native';
import Animated from 'react-native-reanimated';
import Comments from './comments';
import DeleteModal from './delete-modal';

const screenWidth = Dimensions.get('window').width;

export default function PostCard({item}: {item: Post}) {
    const [openComment, setOpenComment] = useState(false);
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const {toggleLike} = useToggleLike();
    const {user} = useAuthStore();
    const router = useRouter();
   const [openDeleteModal, setOpenDeleteModal] = useState(false);
   const {deletePost} = useDeletePost();

    const isLiked = item.likes.find((like)=> like.userId  === user?._id )
    const canDelete = item.authorId === user?._id

    const handleLikeToggle = ()=>{
        if (user) {
            toggleLike(item._id, user?._id as Id<"users">)
        }
        
    }

    const handlePress = ()=> {
    router.push(`/other-profile/${item.authorId}`);

  }

  const handleDelete = () => {
    const details = { 
      postId: item._id, 
      userId: user?._id as Id<"users">
     }
    deletePost(details)
    setOpenPostMenu(false)
  }

  const routeToEdit = ()=> {
    router.push(`/(tabs)/create-post?postId=${item._id}`)
    setOpenPostMenu(false)
  }

  const [activeIndex, setActiveIndex] = useState(0);
  // const scrollRef = useRef<ScrollView>(null);
  const [openPostMenu, setOpenPostMenu] = useState(false);

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
                    <Text style={[styles.username, { color: theme.placeholder, textTransform: 'lowercase' }]}>{item.email}</Text>
                </View>
            </TouchableOpacity>

        <TouchableOpacity onPress={()=> setOpenPostMenu(!openPostMenu)}>
          <Ellipsis size={25} color={theme.text}/>
        </TouchableOpacity>

        {/** Dropdown */}
        {openPostMenu && (
          <Animated.View style={[styles.dropdown,{backgroundColor: theme.background} ]}>
          {canDelete &&
            <>
            {/* EDIT POST */}
            <TouchableOpacity onPress={routeToEdit} style={styles.item} >
              <Text style={{color: theme.text, fontWeight: '600'}}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item}>
              <Text onPress={()=> setOpenDeleteModal(true)} style={{color: theme.text, fontWeight: '600'}}>Delete</Text>
            </TouchableOpacity>
            </>
            }
            <TouchableOpacity style={styles.item} >
              <Text style={{color: theme.text, fontWeight: '600'}}>Share</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
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
            <Comments 
            canDelete={canDelete} 
            postId={item._id} 
            comments={item.comments.reverse()} />
        )}
        <DeleteModal 
        openDeleteModal={openDeleteModal} 
        setOpenDeleteModal={setOpenDeleteModal}
        onDelete={handleDelete}
        />
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
        position: 'relative',
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
    width: 6,
    height: 6,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    right: 10,
    borderRadius: 8,
    padding: 8,
    elevation: 5,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    zIndex: 10,
  },
  item: { padding: 12 },
    });