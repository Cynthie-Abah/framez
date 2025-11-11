import Menu from '@/components/ui/Menu';
import PostCard from '@/components/ui/post-card';
import { Colors, defaultAvatar } from '@/constants/theme';
import { usePosts } from '@/hooks/use-posts';
import useAuthStore from '@/store';
import { Post } from '@/type';
import { useIsFocused } from '@react-navigation/native';
import { Image } from 'expo-image';
import { useNavigation } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
    ActivityIndicator,
    FlatList,
    ScrollView,
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
    const navigation = useNavigation();
     const isFocused = useIsFocused();
     const scrollRef = useRef<ScrollView>(null);

       useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress' as any, (e: any) => {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
      console.log("Tab re-tapped → scrolled to top");
    });

    return unsubscribe;
  }, [navigation, isFocused]);



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
                    defaultAvatar }}
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

