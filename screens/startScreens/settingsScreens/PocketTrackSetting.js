import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useStartScreenContext } from "../../../contexts/StartScreenContext";
import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
// import RNPickerSelect from 'react-native-picker-select';
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
export default function PocketTrackingSettingScreen({}) {
  const navigation = useNavigation();
  const { withPocketTrack, handleWithPocketTrack } = useStartScreenContext();
  const { height, handleHeight } = useStartScreenContext();
  const handleCancel = () => {
    navigation.goBack();
  };
  const handleSelect = (text) => {
    navigation.navigate("Settings");
    handleRoute(text);
  };
  const heightItems = [];
  for (let i = 90; i <= 250; i++) {
    heightItems.push({ label: `${i}cm`, value: i });
  }
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.cancelContainer}>
          <TouchableOpacity onPress={() => handleCancel()}>
            <FontAwesomeIcon name="chevron-left" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={{ marginTop: 30 }}>
        <View style={styles.detailItem}>
          <Text style={styles.detailItemText}>ポケットトラック</Text>
          <Switch
            value={withPocketTrack}
            onValueChange={handleWithPocketTrack}
            trackColor={{ false: "#767577", true: "#20B2AA" }}
            thumbColor={withPocketTrack ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
          />
        </View>
        <RNPickerSelect
          items={heightItems}
          onValueChange={(value) => handleHeight(value)}
          value={height}
          placeholder={{}}
        >
          <View style={styles.detailItem}>
            <Text style={styles.detailItemText}>身長</Text>
            <Text style={styles.detailItemText}>{height}cm</Text>
          </View>
        </RNPickerSelect>
        <TouchableOpacity style={styles.detailItem}>
          <Text style={styles.detailItemText}>FAQ</Text>
          <AntDesignIcon name="right" size={20} color="lightgray" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F8FF",
    marginTop: Constants.statusBarHeight,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    backgroundColor: "white",
  },
  detailItem: {
    height: 60,
    borderWidth: 1,
    borderColor: "lightgray",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
  },
  detailItemText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  cancelContainer: {},
  titleContainer: {
    right: "100%",
  },
  selectItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  selectSubContainer: {
    flexDirection: "row",
    justifyContent: "cneter",
    alignItems: "center",
  },
  activityText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "black",
    marginLeft: 10,
  },
});
