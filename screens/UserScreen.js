import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../contexts/AppContext";
// user components
import Data from "../components/user/Data";
import Achivements from "../components/user/Achievements";
import Activity from "../components/user/Activity";
import ShoeTracker from "../components/user/ShoeTracker";
import Goal from "../components/user/Goal";
import Insite from "../components/user/Insite";
import WeeklyWorkout from "../components/user/WeeklyWorkout";
// components
import ProfilePicker from "../components/start/ProfilePicker";
// functions
import DateHelpers from "../functions/DateHelpers";
import Firebase from "../functions/Firebase";
// icons lib
import FeatherIcon from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
// translation lib
import { TranslationContext } from "../translator";

export default function UserScreen({}) {
  const {
    firstName,
    profileImage,
    lastName,
    height,
    weeklyData,
    monthlyData,
    yearlyData,
    allActivitesData,
    weeklyTotal,
    monthlyTotal,
    yearlyTotal,
    allActivitedTotal,
    initializeActivitesContext,
    user,
  } = useAppContext();
  const navigation = useNavigation();
  const {
    translations: { UserScreenjs: translated },
  } = useContext(TranslationContext);
  const fb = new Firebase(user);
  useEffect(() => {}, []);

  const goAppSettings = () => {
    navigation.navigate("AppSettings");
  };
  const testFunc = () => {
    fb.updateUserInfo();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={30} color="black" />
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => testFunc()}>
            <AntDesign name="adduser" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => goAppSettings()}>
            <FeatherIcon name="settings" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View style={styles.userContainer}>
          <View style={styles.nameContainer}>
            <TouchableOpacity style={styles.circle}>
              <ProfilePicker profileImage={profileImage} user={user} />
            </TouchableOpacity>
            <Text style={styles.name}>{firstName + lastName}</Text>
            <Text> {height} </Text>
          </View>
          <View style={styles.followContainer}>
            <View style={styles.followItem1}>
              <Text style={styles.followText}>1 km</Text>
              <Text style={styles.followText2}>{translated.total}</Text>
            </View>
            <View style={styles.followItem2}>
              <Text style={styles.followText}>0</Text>
              <Text style={styles.followText2}>{translated.followers}</Text>
            </View>
            <View style={styles.followItem3}>
              <Text style={styles.followText}>0</Text>
              <Text style={styles.followText2}>{translated.following}</Text>
            </View>
          </View>
          <View style={styles.subscribeContainer}></View>
        </View>
        <Data
          weeklyData={weeklyTotal}
          monthlyData={monthlyTotal}
          yearlyData={yearlyTotal}
        />
        <Achivements />
        <Activity totalActivitiesCount={allActivitedTotal.activitiesCount} />
        <ShoeTracker />
        <Goal />
        <Insite totalActivitiesCount={allActivitedTotal.activitiesCount} />
        <WeeklyWorkout weeklyData={weeklyTotal} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 0,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 50,
    marginHorizontal: 10,
  },
  subscribeContainer: {
    height: 40,
  },
  userContainer: {
    height: 180,
    marginHorizontal: 5,
  },
  nameContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 20,
  },
  circle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  followContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  followItem1: {
    borderWidth: 1,
    flex: 1,
    height: "100%",
  },
  followItem2: {
    borderWidth: 1,
    flex: 1,
    height: "100%",
  },
  followItem3: {
    borderWidth: 1,
    flex: 1,
    height: "100%",
  },
  followText: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 5,
  },
  followText2: {
    fontSize: 13,
    marginLeft: 5,
  },
  iconStyle: {
    marginTop: 20,
  },
});
