import Menu from '@/components/ui/Menu';
import PostCard from '@/components/ui/post-card';
import { Colors } from '@/constants/theme';
import { usePosts } from '@/hooks/use-posts';
import useAuthStore from '@/store';
import { Post } from '@/type';
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

    const Feed = () => {
    const colorScheme = useColorScheme();
    const {user, isAuthenticated} = useAuthStore();
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

    const renderPost = ({ item }: {item: Post}) => (
    <PostCard item={item} />
    );

    const {posts, error, isLoading} = usePosts();

     if ((!user && !isAuthenticated ) || isLoading) {
        return <SafeAreaView style={{ flex: 1, backgroundColor: theme.feedBackground }}><ActivityIndicator /></SafeAreaView>
     }
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

