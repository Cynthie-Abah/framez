import Menu from '@/components/ui/Menu';
import PostCard from '@/components/ui/post-card';
import { Colors } from '@/constants/theme';
import useAuthStore from '@/store';
import { Image } from 'expo-image';
import React from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    useColorScheme,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const dummyPosts = [
  {
    id: '1',
    username: 'johndoe',
    avatar: 'https://i.pravatar.cc/150?img=1',
    image: 'https://picsum.photos/id/237/1080/1360',
    caption: 'Enjoying this beautiful view! 😍',
    likes: 120,
  },
  {
    id: '2',
    username: 'janedoe',
    avatar: 'https://i.pravatar.cc/150?img=2',
    image: 'https://picsum.photos/1080/1360',
    caption: 'Cute kittens make everything better 🐱',
    likes: 200,
  },
   {
    id: '3',
    username: 'johndoe',
    avatar: 'https://i.pravatar.cc/150?img=1',
    image: 'https://picsum.photos/id/297/1080/1360',
    caption: 'Enjoying this beautiful view! 😍',
    likes: 120,
  },
  {
    id: '4',
    username: 'janedoe',
    avatar: 'https://i.pravatar.cc/150?img=2',
    image: 'https://picsum.photos/1080/1360',
    caption: 'Cute kittens make everything better 🐱',
    likes: 200,
  },
];
    const Feed = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
    // use interface for post item
    const renderPost = ({ item }: any) => (
    <PostCard item={item} />
    );

     const {user, isAuthenticated} = useAuthStore();

     if (!user && !isAuthenticated) {
        return <SafeAreaView style={{ flex: 1, backgroundColor: theme.feedBackground }}><ActivityIndicator /></SafeAreaView>
     }
    console.log(user, 'user data');
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.feedBackground }}>
            <FlatList
        data={dummyPosts}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
            <View style={[styles.headerContainer]}>
            <Image
                source={{ uri: 
                    user?.avatar ? 
                    user?.avatar : 
                    'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png' }}
                style={styles.avatar}
            />
            
            <Text style={{color: theme.text, fontWeight: 800, fontSize: 30, fontFamily: 'Pacifico_400Regular'}}> Framez</Text>

            <Menu />
            
            </View>
        }
        renderItem={renderPost}
        contentContainerStyle={{ paddingVertical: 16 }}
        showsVerticalScrollIndicator={false}
        />

        </SafeAreaView>
        
    );
};

export default Feed;

    const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        paddingTop: 0,
        marginBottom: 16,
        borderBottomColor: Colors.dark.border,
        borderBottomWidth: .5,
    },
    input: {
        flex: 1,
        fontSize: 16,
        marginLeft: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    });

