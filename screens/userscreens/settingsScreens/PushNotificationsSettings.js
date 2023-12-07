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
import React, { useContext, useEffect, useState } from "react";
import Constants from "expo-constants";
import axios from "axios";

import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import RNPickerSelect from "react-native-picker-select";
import { TranslationContext } from "../../../translator";
import { useAppContext } from "../../../contexts/AppContext";

export default function PushNotificationsSettingsScreen({}) {
  const {
    translations: { NotificationsSettingsjs: translated },
  } = useContext(TranslationContext);
  const {
    withWorkoutNotification,
    handleSetWithWorkoutNotification,
    workoutNotificationTime,
    handleSetWorkoutNotificationTime,
    handleSetWorkoutNotricationTime,
  } = useAppContext();
  const navigation = useNavigation();
  const handleCancel = () => {
    navigation.goBack();
  };
  const workOutRemindersDateItems = [
    { label: "Tommorrow at", value: "Tommorrow 1pm" },
    { label: " In 2 days at", value: "2days 1pm" },
    { label: "In 3 days at", value: "3days 1pm" },
    { label: "In 4 days at", value: "4days 1pm" },
    { label: "In 5 days at", value: "5days 1pm" },
  ];
  const workOutRemindersTimeItems = [
    { label: "6 am", value: "6 am" },
    { label: "9 am", value: "9 am" },
    { label: "12 pm", value: "12pm" },
    { label: "2pm", value: "2pm" },
    { label: "5pm", value: "5pm" },
    { label: "8pm", value: "8pm" },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.cancelContainer}>
          <TouchableOpacity onPress={() => handleCancel()}>
            <FontAwesomeIcon name="chevron-left" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.titleText}>{translated.title}</Text>
        <View></View>
      </View>
      <ScrollView style={{ marginTop: 30 }}>
        <View style={styles.detailItem}>
          <View>
            <Text style={styles.detailItemText}>
              {translated.workoutReminders}
            </Text>
            <Text style={styles.detailItemSubText}>
              {translated.workoutRemindersDescription}
            </Text>
          </View>
          <Switch
            value={withWorkoutNotification}
            onValueChange={handleSetWithWorkoutNotification}
            trackColor={{ false: "#767577", true: "#20B2AA" }}
            thumbColor={withWorkoutNotification ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
          />
        </View>
        {withWorkoutNotification && (
          <View>
            <RNPickerSelect
              items={workOutRemindersDateItems}
              onValueChange={(value) => {
                handleSetWorkoutNotificationTime(value);
              }}
              value={workoutNotificationTime}
              placeholder={{}}
            >
              <View style={styles.detailItem}>
                <View>
                  <Text style={styles.detailItemText}>{translated.when}</Text>
                </View>
                <Text>{workoutNotificationTime}</Text>
              </View>
            </RNPickerSelect>
          </View>
        )}
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
  titleText: {
    fontSize: 18,
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
  subContainer: {
    height: 35,
    justifyContent: "center",
  },
  activityText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "black",
    marginLeft: 10,
  },
  detailItemText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  detailItemSubText: {
    fontSize: 12,
    color: "gray",
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
  optionItem1: {},
  optionItem2: {
    flexDirection: "row",
  },
  detailItemText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  optionText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000033",
  },
  optionTitleText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },
});
