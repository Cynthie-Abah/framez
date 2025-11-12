import { uploadToCloudinary } from "@/utils/helper";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert } from 'react-native';

const usePickImages = () => {
    const [images, setImages] = useState<string[]>([]);
    const [isPicking, setIsPicking] = useState(false);

    const pickImages = async () => {
        Alert.alert(
            "Add Photo",
            "Choose an option",
            [
            {
                text: "Take Photo",
                onPress: async () => {
                    setIsPicking(true)
                const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
                if (cameraPermission.status !== "granted") {
                    alert("Camera permission is required!");
                    return;
                }
        
                const result = await ImagePicker.launchCameraAsync({
                    quality: 0.8,
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                });
        
                if (!result.canceled) {
                    const uri = result.assets[0].uri;
                    const imageUrl = await uploadToCloudinary(uri);
                    setImages((prev) => [...prev, imageUrl]);
                    setIsPicking(false)
                    return images
                }
                },
            },
            {
                text: "Choose from Gallery",
                onPress: async () => {
                setIsPicking(true)
                const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (galleryPermission.status !== "granted") {
                    alert("Media library permission is required!");
                    return;
                }
        
                const result = await ImagePicker.launchImageLibraryAsync({
                    allowsMultipleSelection: true,
                    quality: 0.8,
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                });
        
                if (!result.canceled) {
                    const uris = result.assets.map((a) => a.uri );
                    for (const uri of uris) {
                    const imageUrl = await uploadToCloudinary(uri);
                    setImages((prev) => [...prev, imageUrl]);
                    setIsPicking(false)
                    
                    }
                }
                },
            },
            { text: "Cancel", style: "cancel" },
            ],
            { cancelable: true }
        );
    };

  return {pickImages, images, setImages, isPicking}
}

export default usePickImages