import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { useAppContext } from "../contexts/AppContext";
import {
  registerForPushNotificationsAsync,
  schedulePushNotification,
} from "../functions/NotificationHelper";

export default function ExplorerScreen({ navigation }) {
  const {
    user,
    expoPushToken,
    notification,
    handleSetExpoPushToken,
    handleSetNotification,
  } = useAppContext();
  const handlePress = async () => {
    await schedulePushNotification();
  };
  return (
    <View style={styles.container}>
      <Text>Debug test Screen</Text>
      <Text>push通知トークン:{expoPushToken}</Text>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text>Title: {notification && notification.request.content.title}</Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          handlePress();
        }}
      >
        <Text>push通知トークン取得</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
