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
import NotificationHelper from "../functions/NotificationHelper";
import { layer, proceed, withLayers } from "contextjs";
// import { withLayersZone } from "../context-zone/contextZone.js";
import ContextTouch from "../components/copComponents/ContextTouch.js";
import {
  getCurrentLayerStack,
  getCurrentFrame,
} from "../context-zone/utils.js";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry.js";
// import "zone.js/dist/zone-node.js";
class testEvent {
  constructor() {
    this.str = "testEvent";
  }
  printTest() {
    console.log(this.str);
  }
}
const testEventLayer = layer("testEventLayer");
const testEventLayer2 = layer("testEventLayer2");
testEventLayer.refineClass(testEvent, {
  printTest() {
    console.log("refinedddddddddddd");
  },
});
export default function ExplorerScreen({ navigation }) {
  const {
    user,
    expoPushToken,
    notification,
    handleSetExpoPushToken,
    handleSetNotification,
  } = useAppContext();
  const handlePress = async () => {
    await NotificationHelper.schedulePushNotification();
    withLayersZone(testEventLayer, () => {
      const t = new testEvent();
      t.printTest();
    });
  };
  const t = new testEvent();
  let aa;
  withLayers([testEventLayer, testEventLayer2], () => {
    // const layers = getCurrentLayerStack();
    // console.log("layers: ", layers);
    aa = getCurrentFrame();
  });
  withLayers(aa, () => {
    // console.log(aa);
    // console.log([testEventLayer, testEventLayer2]);
    // console.log("aaaaaaaaaaaaaaa");
    t.printTest();
  });

  return withLayers([testEventLayer], () => {
    const layers = getCurrentFrame();
    console.log("bbbbbbbbbb");
    return (
      <View style={styles.container}>
        <Text>Debug test Screen</Text>
        <Text>push通知トークン:{expoPushToken}</Text>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text>
            Title: {notification && notification.request.content.title}
          </Text>
          <Text>Body: {notification && notification.request.content.body}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            handlePress();
          }}
        >
          <Text>push通知トークン取得</Text>
        </TouchableOpacity>
        <ContextTouch
          style={{ width: 100, height: 100, backgroundColor: "red" }}
          onPress={() => {
            t.printTest();
          }}
          context={layers}
        ></ContextTouch>
        {console.log(getCurrentFrame())}
        {console.log("aaaaaaaaaaaaaaa")}
      </View>
    );
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
