import React, { useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// contexts providers
import { StartScreenProvider } from "./contexts/StartScreenContext";
import { ActivityProvider } from "./contexts/ActivityContext";
import { AppProvider, useAppContext } from "./contexts/AppContext";
import { WorkoutProvider } from "./contexts/WorkoutContext";
//
import { useState, useEffect } from "react";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import EntypoIcon from "react-native-vector-icons/Entypo";
import UserScreen from "./screens/UserScreen";
//user screens
import AppSettingsScreen from "./screens/userscreens/AppSettingsScreen";
import ProfileSettingScreen from "./screens/userscreens/settingsScreens/ProfileSettingScreen";
import LanguageSelectScreen from "./screens/userscreens/settingsScreens/LanguageSelectScreen";
import TrainingScreen from "./screens/TrainingScreen";
import StartScreenMain from "./screens/StartScreen";
import SettingsScreen from "./screens/startScreens/SettingsScreen";
import PushNotificationsSettingsScreen from "./screens/userscreens/settingsScreens/PushNotificationsSettings";
// setting screens
import TypeSettingScreen from "./screens/startScreens/settingsScreens/TypeSettingScreen";
import RouteSettingScreen from "./screens/startScreens/settingsScreens/RouteSettingScreen";
import TrackingSettingScreen from "./screens/startScreens/settingsScreens/GPSSetting";
import PocketTrackingSettingScreen from "./screens/startScreens/settingsScreens/PocketTrackSetting";
import AudioGuideSettingScreen from "./screens/startScreens/settingsScreens/AuidioGuideSetting";
import AnnoucementFrequencySettingScreen from "./screens/startScreens/settingsScreens/AnnoucementFrequencySetting";
// intervalSettings screens
import IntervalTimeSettingScreen from "./screens/startScreens/settingsScreens/intervalSettingScreens/IntervalTimeSettingScreen";
import IntervalDistanceSettingScreen from "./screens/startScreens/settingsScreens/intervalSettingScreens/IntervalDistanceSettingScreen";
// workOut screens
import CustomScreen from "./screens/startScreens/CustomScreen";
import IntervalScreen from "./screens/startScreens/workOutScreens/IntervalScreen";
// start screens
import StartRunScreen from "./screens/startScreens/StartRunScreen";
import ResultScreenUpdate from "./screens/startScreens/ResultScreenUpdate";
import RusultReviewScreen from "./screens/startScreens/ResultReviewScreen";
import ManualEntryScreen from "./screens/startScreens/ManualEntryScreen";
import ManualEntrySaveScreen from "./screens/startScreens/workOutScreens/ManualEntrySaveScreen";
// app screens
import CommunityScreen from "./screens/CommunityScreen";
import ExplorerScreen from "./screens/ExplorerScreen";
// auth screens
import LoginScreen from "./screens/authscreens/LoginScreen";
// components
import Loading from "./components/Loading";
// functions
import NotificationHelper from "./functions/NotificationHelper";
import SubscribeManager from "./functions/SubscribeManager";
import Firebase from "./functions/Firebase";
// translation lib
import { TranslationProvider, TranslationContext } from "./translator";
import { useContext } from "react";
// app API
import { AppState } from "react-native";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_APP } from "./firebase";
// expo notification
import * as Notifications from "expo-notifications";
// netInfo
import NetInfo from "@react-native-community/netinfo";
// /** @jsxImportSource "../../../node_modules/react */
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function MainContent() {
  const auth = getAuth(FIREBASE_APP);
  const {
    handleSetAppState,
    user,
    handleSetUser,
    initializeUserInfoContext,
    initializeActivitesContext,
    handleSetExpoPushToken,
    handleSetNotification,
    withWorkoutNotification,
    handleSetWithWorkoutNotification,
    workoutNotificationTime,
    handleSetWorkoutNotificationTime,
    workoutNotificationId,
    handleSetWorkoutNotificationId,
    networkState,
    handleSetNetworkState,
  } = useAppContext();

  const [loading, setLoading] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const {
    translations: { Appjs: translated },
  } = useContext(TranslationContext);

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(true);
        handleSetUser(user.uid);
      } else {
        handleSetUser(null);
      }
    });
    // notification subscription
    NotificationHelper.registerForPushNotificationsAsync().then((token) =>
      handleSetExpoPushToken(token)
    );
    NotificationHelper.setForegroundNotificationHandling();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        handleSetNotification(notification);
      });
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    // netInfo subscription
    const netInfoUnsubscribed = NetInfo.addEventListener((state) => {
      handleSetNetworkState(state.isConnected);
    });

    return () => {
      unsubscribed();
      netInfoUnsubscribed();
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  useEffect(() => {
    if (user) {
      const fb = new Firebase(user);
      (async () => {
        fb.setUser(user);
        const userUnsubscribed = await fb.getUserInfo(
          initializeUserInfoContext
        );
        const activityUnsubscribed = await fb.getAllActivitesData(
          initializeActivitesContext
        );

        SubscribeManager.subscribeFirebase("user", userUnsubscribed);
        SubscribeManager.subscribeFirebase("activity", activityUnsubscribed);

        console.log("user info");
        setLoading(false);
      })();
      const handleAppStateChange = (nextAppState) => {
        console.log("AppState changed to", nextAppState);
        if (nextAppState === "background") {
          handleSetAppState(nextAppState);
          console.log("Unsubscribing from task manager");
          SubscribeManager.broadcastFirebase();
        }
        if (nextAppState === "active") {
          handleSetAppState(nextAppState);
          console.log("Subscribing to task manager");
          (async () => {
            fb.setUser(user);
            const userUnsubscribed = await fb.getUserInfo(
              initializeUserInfoContext
            );
            const activityUnsubscribed = await fb.getAllActivitesData(
              initializeActivitesContext
            );
            SubscribeManager.subscribeFirebase("user", userUnsubscribed);
            SubscribeManager.subscribeFirebase(
              "activity",
              activityUnsubscribed
            );
          })();
        }
      };

      const appStateSubscription = AppState.addEventListener(
        "change",
        handleAppStateChange
      );
      SubscribeManager.subscribeState("appstate", appStateSubscription);
      return () => {
        SubscribeManager.broadcastFirebase();
        SubscribeManager.broadcastState();
      };
    }
  }, [user]);

  useEffect(() => {
    try {
      (async () => {
        await Notifications.cancelScheduledNotificationAsync(
          workoutNotificationId
        );
      })();
    } catch (error) {
      console.log(error);
    }
    // if notification is on and schedule time is set
    if (withWorkoutNotification) {
      (async () => {
        const notificationId =
          await NotificationHelper.scheduleWorkoutNotification(
            workoutNotificationTime
          );
        handleSetWorkoutNotificationId(notificationId);
      })();
    }
  }, [workoutNotificationTime]);

  useEffect(() => {
    // if withWorkoutNotification is on and notification is not scheduled
    if (withWorkoutNotification) {
      (async () => {
        if (workoutNotificationId === null) {
          const notificationId =
            await NotificationHelper.scheduleWorkoutNotification(
              workoutNotificationTime
            );
          handleSetWorkoutNotificationId(notificationId);
        }
      })();
    } else {
      (async () => {
        await Notifications.cancelScheduledNotificationAsync(
          workoutNotificationId
        );
      })();
    }
  }, [withWorkoutNotification]);

  useEffect(() => {
    console.log("networkState :" + networkState);
  }, [networkState]);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <NavigationContainer>
        {!user ? (
          <AuthStack />
        ) : (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarStyle: {
                height: 70,
              },
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === translated.user) {
                  return (
                    <FontAwesome5Icon
                      name="smile-wink"
                      size={size}
                      color={color}
                    />
                  );
                } else if (route.name === translated.training) {
                  return (
                    <FontAwesomeIcon
                      name="calendar-check-o"
                      size={size}
                      color={color}
                    />
                  );
                } else if (route.name === translated.start) {
                  return (
                    <EntypoIcon name="location-pin" size={size} color={color} />
                  );
                } else if (route.name === translated.community) {
                  return (
                    <FontAwesomeIcon name="group" size={size} color={color} />
                  );
                } else if (route.name === translated.explorer) {
                  return (
                    <FontAwesome5Icon
                      name="mountain"
                      size={size}
                      color={color}
                    />
                  );
                }
              },
            })}
          >
            <Tab.Screen
              name={translated.user}
              component={UserStack}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name={translated.training}
              component={TrainingStack}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name={translated.start}
              component={StartStack}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name={translated.community}
              component={CommunityStack}
              options={{ headerShown: false }}
            />
            <Tab.Screen name={translated.explorer} component={ExplorerStack} />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    );
  }
}

const UserStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="User"
        component={UserScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AppSettings"
        component={AppSettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileSetting"
        component={ProfileSettingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LanguageSelect"
        component={LanguageSelectScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PushNotificationsSettings"
        component={PushNotificationsSettingsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const TrainingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Training"
        component={TrainingScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const StartStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalSlideFromBottomIOS,
        presentation: "modal",
      }}
    >
      <Stack.Screen
        name="Start"
        component={StartScreenMain}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TypeSetting"
        component={TypeSettingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RouteSetting"
        component={RouteSettingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TrackingSetting"
        component={TrackingSettingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PocketTrackingSetting"
        component={PocketTrackingSettingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AudioGuideSetting"
        component={AudioGuideSettingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AnnoucementFrequencySetting"
        component={AnnoucementFrequencySettingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="IntervalTimeSetting"
        component={IntervalTimeSettingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="IntervalDistanceSetting"
        component={IntervalDistanceSettingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StartRun"
        component={StartRunScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResultUpdate"
        component={ResultScreenUpdate}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResultReview"
        component={RusultReviewScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Custom"
        component={CustomScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Interval"
        component={IntervalScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ManualEntry"
        component={ManualEntryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ManualEntrySave"
        component={ManualEntrySaveScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const CommunityStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Community"
        component={CommunityScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResultReview"
        component={RusultReviewScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResultUpdate"
        component={ResultScreenUpdate}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const ExplorerStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Explorer"
        component={ExplorerScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default function App() {
  return (
    <AppProvider>
      <TranslationProvider>
        <StartScreenProvider>
          <ActivityProvider>
            <WorkoutProvider>
              <MainContent />
            </WorkoutProvider>
          </ActivityProvider>
        </StartScreenProvider>
      </TranslationProvider>
    </AppProvider>
  );
}
