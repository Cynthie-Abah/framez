import { Colors, defaultAvatar } from '@/constants/theme';
import { Id } from '@/convex/_generated/dataModel';
import { useToggleFollow } from '@/hooks/use-follow';
import { useUserProfile } from '@/hooks/use-user-profile';
import useAuthStore from '@/store';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = ({type, userId}: {type: 'user' | 'others', userId: string}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const {userProfile, error, isLoading} = useUserProfile(userId as Id<"users">)
  const router = useRouter();
  const { toggleFollow, isLoading: isFollowing} = useToggleFollow();
  const {user} = useAuthStore();
  
  const handleFollow =()=> {
      const details = {
          userId: userId as Id<"users">, 
          username: userProfile.username || '',
          avatar: userProfile.avatar || ''
      }
      toggleFollow(details)
    }

    const alreadyFollowing = !!userProfile.followers?.some(
  f => f.userId.toString() === user?._id.toString()
);
    

if(isLoading) return <SafeAreaView style={[styles.container, { backgroundColor: theme.feedBackground }]}><ActivityIndicator /></SafeAreaView>
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.feedBackground }]}>
        {/* page header */}
        <View style={styles.pageHeader}>
          {/* set the back button */}
            <TouchableOpacity onPress={()=> router.back()}><ChevronLeft strokeWidth={4} color={theme.text} size={26} /></TouchableOpacity>
            <Text style={{
                color: theme.text, 
                fontWeight: 800, 
                fontSize: 20, 
                fontFamily: 'Pacifico_400Regular'
                }}>{userProfile.email}</Text>
            <Text style={{
                color: theme.text, 
                fontWeight: 800, 
                fontSize: 20, 
                fontFamily: 'Pacifico_400Regular'
                }}> </Text>
        </View>
      {/* Profile header */}
      <View style={styles.header}>
        <Image
          source={{ uri: userProfile.avatar || defaultAvatar }}
          style={styles.avatar}
        />
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={[styles.statNumber, { color: theme.text }]}>{userProfile.posts?.length}</Text>
            <Text style={[styles.statLabel, { color: theme.placeholder }]}>Posts</Text>
          </View>
          <View style={styles.stat}>
            <Text style={[styles.statNumber, { color: theme.text }]}>{userProfile.followers?.length}</Text>
            <Text style={[styles.statLabel, { color: theme.placeholder }]}>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={[styles.statNumber, { color: theme.text }]}>{userProfile.following?.length}</Text>
            <Text style={[styles.statLabel, { color: theme.placeholder }]}>Following</Text>
          </View>
        </View>
      </View>

      {/* Username and bio */}
      <View style={styles.userInfo}>
        <Text style={[styles.username, { color: theme.text }]}>{userProfile.username}</Text>
        <Text style={[styles.bio, { color: theme.text }]}>{userProfile.bio || 'Edit your bio to match your...'}</Text>
      </View>

        {
            type === 'user' ? (
        // Edit Profile redirects to settings - remeber to add that functionality 
        <View style={styles.actionButtons}>
            <TouchableOpacity onPress={()=> router.push('/edit-profile')} style={[styles.button, { backgroundColor: theme.ashButton}]}>
            <Text style={[styles.buttonText, {color: theme.text}]}>Edit Profile</Text>
            </TouchableOpacity>
        </View>
            )
            : (
        // Follow and Message buttons
      <View style={styles.actionButtons}>

        <TouchableOpacity disabled={isFollowing} onPress={handleFollow} style={[styles.button, { backgroundColor: theme.tint }]}>
          {
            isFollowing ? 
            <ActivityIndicator /> :
            <Text style={styles.buttonText}>{alreadyFollowing ? "Unfollow" : 'Follow'}</Text>
          }
          
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: theme.tabIconDefault }]}>
          <Text style={styles.buttonText}>Message</Text>
        </TouchableOpacity>
      </View>
            )
        }
      

      {/* User posts */}
      <FlatList
        data={userProfile.posts}
        keyExtractor={(item) => item._id}
        numColumns={3}
        columnWrapperStyle={{ 
          justifyContent: userProfile.posts && userProfile.posts?.length >= 3 ? 
          'space-between' : 'flex-start' , 
          marginVertical: 1}}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.postImageContainer} onPress={()=> router.push(`/user-posts?postId=${item._id}`)}>
          <Image
            source={{ uri: item.image[0] }}
            style={styles.postImage}
            contentFit="cover"
            cachePolicy="memory-disk"
            priority="high"
          />
          </TouchableOpacity>
        )}
        contentContainerStyle={{ marginTop: 10 }}
      />
    </SafeAreaView>
  );
};

export default Profile;

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 15,
    },
    pageHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 10,
            paddingHorizontal: 15,
            marginBottom: 16,
            borderBottomColor: Colors.dark.border,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        paddingHorizontal: 15,
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
    },
    stats: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
        marginLeft: 16,
    },
    stat: {
        alignItems: 'center',
    },
    statNumber: {
        fontWeight: '700',
        fontSize: 16,
    },
    statLabel: {
        fontSize: 12,
        marginTop: 2,
    },
    userInfo: {
        marginBottom: 12,
        paddingHorizontal: 15,
    },
    username: {
        fontWeight: '700',
        fontSize: 18,
    },
    bio: {
        fontSize: 14,
        marginTop: 4,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
        paddingHorizontal: 15,
        gap: 10,
    },
    button: {
        flex: 1,
        paddingVertical: 8,
        borderRadius: 6,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },
    postImage: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 1,
    },
    postImageContainer: {
        width: '33%',
        aspectRatio: 1,
        borderRadius: 1,
    },
    });
