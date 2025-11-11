import { Colors } from '@/constants/theme';
import { Post } from '@/type';
import { Image } from 'expo-image';
import { Ellipsis, Heart, MessageCircle } from 'lucide-react-native';
import React from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function PostCard({item}: {item: Post}) {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  return (
     <View style={[styles.postContainer]}>
    
          {/* Post header */}
          <View style={styles.postHeaderContainer}>
    
            <TouchableOpacity style={styles.postHeader}>
    
                <Image source={{ uri: item.userAvatar }} style={styles.avatar} />
    
                <View style={{gap: 4}}>
                    <Text style={[styles.username, { color: theme.text }]}>{item.userName}</Text>
                    <Text style={[styles.username, { color: theme.placeholder }]}>cynthia@gmail.com</Text>
                </View>
            </TouchableOpacity>
    
            <View>
                <Ellipsis size={20} color={'white'} />
            </View>
    
          </View>
    
          {/* Post image */}
            <ScrollView 
            horizontal={true} 
            showsHorizontalScrollIndicator
            pagingEnabled
            style={{ height: 400 }}
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
    
          {/* Post actions */}
          <View style={styles.postActions}>
            {/* likes */}
            <TouchableOpacity style={{ marginRight: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Heart color={theme.text} size={27} strokeWidth={2.5}/> 
                <Text style={{ color: theme.text }}>{item.likes.length}</Text></View>
            </TouchableOpacity>
            
                {/* comments */}
            <TouchableOpacity style={{ marginRight: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <MessageCircle color={theme.text} size={27} strokeWidth={2.5}/> 
                <Text style={{ color: theme.text }}>{item.comments.length}</Text></View>
            </TouchableOpacity>
          </View>
    
          {/* Post caption */}
          <Text style={[styles.caption, { color: theme.text }]}>{item.text}</Text>
    
          {/* Post time */}
          <Text style={[styles.caption, { color: theme.placeholder }]}>11 hours ago</Text>
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
    });