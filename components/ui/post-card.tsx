import { Colors } from '@/constants/theme';
import { Image } from 'expo-image';
import { Ellipsis, Heart, MessageCircle } from 'lucide-react-native';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View
} from 'react-native';
// create a typescript interface for the post props
export default function PostCard({item}: any) {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  return (
     <View style={[styles.postContainer]}>
    
          {/* Post header */}
          <View style={styles.postHeaderContainer}>
    
            <TouchableOpacity style={styles.postHeader}>
    
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
    
                <View style={{gap: 4}}>
                    <Text style={[styles.username, { color: theme.text }]}>{item.username}</Text>
                    <Text style={[styles.username, { color: theme.placeholder }]}>cynthia@gmail.com</Text>
                </View>
            </TouchableOpacity>
    
            <View>
                <Ellipsis size={20} color={'white'} />
            </View>
    
          </View>
    
          {/* Post image */}
            <Image 
            source={{ uri: item.image }} 
            style={styles.postImage}
            contentFit="cover"
            cachePolicy="memory-disk"
            priority="high"
            transition={300}
                />
    
          {/* Post actions */}
          <View style={styles.postActions}>
            {/* likes */}
            <TouchableOpacity style={{ marginRight: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Heart color={theme.text} size={27} strokeWidth={2.5}/> 
                <Text style={{ color: theme.text }}>{item.likes}</Text></View>
            </TouchableOpacity>
            
                {/* comments */}
            <TouchableOpacity style={{ marginRight: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <MessageCircle color={theme.text} size={27} strokeWidth={2.5}/> 
                <Text style={{ color: theme.text }}>{item.likes}</Text></View>
            </TouchableOpacity>
          </View>
    
          {/* Post caption */}
          <Text style={[styles.caption, { color: theme.text }]}>{item.caption}</Text>
    
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
        overflow: 'hidden',
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
        width: '100%',
        height: 400,
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