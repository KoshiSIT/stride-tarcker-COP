import React from "react";
import { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../firebase";
//cop lib
import { layer } from "contextjs";
// define layer
export const stopWatchModeLayer = layer("stopWatchModeLayer");
export const backgroundLayer = layer("backgroudLayer");
export const indoorLayer = layer("indoorLayer");
export const PauseLayer = layer("PauseLayer");
export const manualEntry = layer("manualEntry");
export const update = layer("update");
export const afterActivity = layer("afterActivity");

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  // map current location state
  const [appState, setAppState] = useState("active");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isAccountPublic, setIsAccountPublic] = useState(false);
  const [language, setLanguage] = useState("日本語");
  // notification settings state
  const [withFovriteNotification, setWithFovriteNotification] = useState(false);
  const [withCommnetNotification, setWithCommnetNotification] = useState(false);
  const [withWorkoutNotification, setWithWorkoutNotification] = useState(false);
  const [workoutNotificationTime, setWorkoutNotificationTime] = useState("");
  const [workoutNotificationId, setWorkoutNotificationId] = useState("");
  const [withRunningGroupNotification, setWithRunningGroupNotification] =
    useState(false);
  const [withRaceNotification, setWithRaceNotification] = useState(false);
  const [
    withFollowerActivityNotification,
    setWithFollowerActivityNotification,
  ] = useState(false);

  const [withShoesNotification, setWithShoesNotification] = useState(false);
  const [withCharrengeNotification, setWithCharrengeNotification] =
    useState(false);
  const [withMotivationNotification, setWithMotivationNotification] =
    useState(false);
  // user profile state
  const [user, setUser] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(60);
  const [firstDayOfWeek, setFirstDayOfWeek] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);
  const [allActivitedData, setAllActivitedData] = useState([]);
  const [weeklyTotal, setWeeklyTotal] = useState(null);
  const [monthlyTotal, setMonthlyTotal] = useState(null);
  const [yearlyTotal, setYearlyTotal] = useState(null);
  const [allActivitedTotal, setAllActivitedTotal] = useState(null);
  // api state
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  // network state
  const [networkState, setNetworkState] = useState(false);

  const handleSetAppState = (appState) => {
    setAppState(appState);
  };
  const handleSetCurrentLocation = (location) => {
    setCurrentLocation(location);
  };
  const handleSetUser = (user) => {
    setUser(user);
  };
  const handleSetFirstName = (firstName) => {
    setFirstName(firstName);
  };
  const handleSetLastName = (lastName) => {
    setLastName(lastName);
  };
  const handleSetBirthday = (birthday) => {
    setBirthday(birthday);
  };
  const handleSetHeight = (height) => {
    setHeight(height);
  };
  const handleSetWeight = (weight) => {
    setWeight(weight);
  };
  const handleSetGender = (gender) => {
    setGender(gender);
  };
  const handleSetFirstDayOfWeek = (firstDayOfWeek) => {
    setFirstDayOfWeek(firstDayOfWeek);
  };
  const handleSetProfileImage = (profileImage) => {
    setProfileImage(profileImage);
  };
  const handleSetWeeklyData = (weeklyData) => {
    setWeeklyData(weeklyData);
  };
  const handleSetMonthlyData = (monthlyData) => {
    setMonthlyData(monthlyData);
  };
  const handleSetYearlyData = (yearlyData) => {
    setYearlyData(yearlyData);
  };
  const handleSetAllActivitedData = (allActivitedData) => {
    setAllActivitedData(allActivitedData);
  };
  const handleSetWeeklyTotal = (weeklyTotal) => {
    console.log(weeklyTotal);
    setWeeklyTotal(weeklyTotal);
  };
  const handleSetMonthlyTotal = (monthlyTotal) => {
    console.log(monthlyTotal);
    setMonthlyTotal(monthlyTotal);
  };
  const handleSetYearlyTotal = (yearlyTotal) => {
    console.log(yearlyTotal);
    setYearlyTotal(yearlyTotal);
  };
  const handleSetAllActivitedTotal = (allActivitedTotal) => {
    console.log(allActivitedTotal);
    setAllActivitedTotal(allActivitedTotal);
  };
  const handleSetExpoPushToken = (expoPushToken) => {
    setExpoPushToken(expoPushToken);
  };
  const handleSetNotification = (notification) => {
    setNotification(notification);
  };
  const handleSetWithWorkoutNotification = () => {
    setWithWorkoutNotification(!withWorkoutNotification);
  };
  const handleSetWorkoutNotificationTime = (time) => {
    console.log(time);
    setWorkoutNotificationTime(time);
  };
  const handleSetWorkoutNotificationId = (id) => {
    console.log(id);
    setWorkoutNotificationId(id);
  };
  const handleSetNetworkState = (networkState) => {
    setNetworkState(networkState);
  };

  const initializeUserInfoContext = (userinfos) => {
    console.log("initializeUserInfoContext");
    userinfos.forEach((userinfo) => {
      handleSetFirstName(userinfo.firstName);
      handleSetLastName(userinfo.lastName);
      handleSetBirthday(userinfo.birthday);
      handleSetHeight(userinfo.height);
      handleSetWeight(userinfo.weight);
      handleSetFirstDayOfWeek(userinfo.firstDayOfWeek);
      handleSetProfileImage(userinfo.profileImage);
      handleSetGender(userinfo.user);
    });
  };
  const initializeActivitesContext = (data) => {
    console.log("initializeActivitesContext");
    handleSetWeeklyData(data.weeklyData);
    handleSetMonthlyData(data.monthlyData);
    handleSetYearlyData(data.yearlyData);
    handleSetAllActivitedData(data.allActivitedData);
    handleSetWeeklyTotal(data.weeklyTotal);
    handleSetMonthlyTotal(data.monthlyTotal);
    handleSetYearlyTotal(data.yearlyTotal);
    handleSetAllActivitedTotal(data.allActivitedTotal);
  };
  const value = {
    appState,
    handleSetAppState,
    language,
    setLanguage,
    currentLocation,
    handleSetCurrentLocation,
    weight,
    handleSetWeight,
    user,
    handleSetUser,
    initializeUserInfoContext,
    firstName,
    handleSetFirstName,
    lastName,
    handleSetLastName,
    birthday,
    handleSetBirthday,
    height,
    handleSetHeight,
    firstDayOfWeek,
    handleSetFirstDayOfWeek,
    profileImage,
    handleSetProfileImage,
    weeklyData,
    handleSetWeeklyData,
    monthlyData,
    handleSetMonthlyData,
    yearlyData,
    handleSetYearlyData,
    weeklyTotal,
    handleSetWeeklyTotal,
    monthlyTotal,
    handleSetMonthlyTotal,
    yearlyTotal,
    handleSetYearlyTotal,
    allActivitedTotal,
    handleSetAllActivitedTotal,
    gender,
    handleSetGender,
    allActivitedData,
    handleSetAllActivitedData,
    initializeActivitesContext,
    expoPushToken,
    handleSetExpoPushToken,
    notification,
    handleSetNotification,
    withWorkoutNotification,
    handleSetWithWorkoutNotification,
    workoutNotificationTime,
    handleSetWorkoutNotificationTime,
    workoutNotificationId,
    handleSetWorkoutNotificationId,
    networkState,
    handleSetNetworkState,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
