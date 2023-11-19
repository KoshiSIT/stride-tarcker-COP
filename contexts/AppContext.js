import { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../firebase";
const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  // map current location state
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isAccountPublic, setIsAccountPublic] = useState(false);
  const [language, setLanguage] = useState("日本語");
  // notification settings state
  const [withFovriteNotification, setWithFovriteNotification] = useState(false);
  const [withCommnetNotification, setWithCommnetNotification] = useState(false);
  const [withWorkoutNotification, setWithWorkoutNotification] = useState(false);
  const [withRunningGroupNotification, setWithRunningGroupNotification] =
    useState(false);
  const [withRaceNotification, setWithRaceNotification] = useState(false);
  const [
    withFollowerActivityNotification,
    setWithFollowerActivityNotification,
  ] = useState(false);
  const [
    withFollowerActivityNotificationF,
    setWithFollowerActivityNotificationF,
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
  const [totalActivitiesCount, setTotalActivitiesCount] = useState(0);
  const handleSetCurrentLocation = (location) => {
    setCurrentLocation(location);
  };
  const handleSetUser = (user) => {
    setUser(user);
    console.log("sign in");
    console.log(`user_id : ${user}`);
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
  const handleSetTotalActivitiesCount = (totalActivitiesCount) => {
    setTotalActivitiesCount(totalActivitiesCount);
  };

  const initailizeUserInfoContext = (userinfos) => {
    console.log("call");
    console.log(userinfos.length);
    userinfos.forEach((userinfo) => {
      handleSetUser(userinfo.user);
      handleSetFirstName(userinfo.firstName);
      handleSetLastName(userinfo.lastName);
      handleSetBirthday(userinfo.birthday);
      handleSetHeight(userinfo.height);
      handleSetWeight(userinfo.weight);
      handleSetFirstDayOfWeek(userinfo.firstDayOfWeek);
      handleSetProfileImage(userinfo.profileImage);
      console.log("initailize user info context");
    });
  };
  const value = {
    language,
    setLanguage,
    currentLocation,
    handleSetCurrentLocation,
    weight,
    handleSetWeight,
    user,
    handleSetUser,
    initailizeUserInfoContext,
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
    totalActivitiesCount,
    handleSetTotalActivitiesCount,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
