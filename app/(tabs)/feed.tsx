import Menu from '@/components/ui/Menu';
import PostCard from '@/components/ui/post-card';
import { Colors, defaultAvatar } from '@/constants/theme';
import { useFetchUserByEmail } from '@/hooks/use-fetch-userbyemail';
import { usePosts } from '@/hooks/use-posts';
import { Post } from '@/type';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

    const Feed = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
     const {user} = useFetchUserByEmail()
     const router = useRouter();
 
    const renderPost = ({ item }: {item: Post}) => (
    <PostCard item={item} />
    );

    const {posts, error} = usePosts();

     if (error) {
        return <SafeAreaView style={{ 
            flex: 1, 
            backgroundColor: theme.feedBackground, 
            justifyContent: 'center', 
            alignItems: 'center' }}>Error loading products.</SafeAreaView>
     }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.feedBackground }}>
            <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={
            <View style={[styles.headerContainer]}>
                <TouchableOpacity onPress={()=> router.push('/(tabs)/user-profile')}>
                    <Image
                source={{ uri: 
                    user?.avatar ? 
                    user?.avatar : 
                    defaultAvatar }}
                style={styles.avatar}
            />
                </TouchableOpacity>
            
            
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

