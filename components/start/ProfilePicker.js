import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

import Firebase from "../../functions/Firebase";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// translation lib

const ProfilePicker = ({ profileImage, user }) => {
  const [image, setImage] = useState(profileImage);
  // console.log(`profileImage: ${profileImage}`);
  const [imageBlob, setImageBlob] = useState(null);
  const fb = new Firebase(user);
  const handleImagePick = async () => {
    const permissonResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissonResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!pickerResult.canceled) {
      const localUri = await fetch(pickerResult.uri);
      const localBlob = await localUri.blob();
      setImageBlob(localBlob);
    }
  };
  useEffect(() => {}, []);
  useEffect(() => {
    if (imageBlob) {
      fb.uploadImage(imageBlob).then((url) => {
        fb.updateUserProfileImage(url);
        setImage(url);
      });
    }
  }, [imageBlob]);
  return (
    <View>
      <TouchableOpacity onPress={handleImagePick} style={styles.imageContainer}>
        <View style={styles.imageItem}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: 50, height: 50, borderRadius: 25 }}
            />
          ) : (
            <MaterialCommunityIcons
              name="camera-outline"
              size={30}
              color="black"
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default ProfilePicker;

const styles = StyleSheet.create({
  imageContainer: {
    height: 60,
    borderWidth: 1,
    borderColor: "#F5F5F5",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  imageItem: {
    flexDirection: "row",
    alignItems: "center",
  },
});
