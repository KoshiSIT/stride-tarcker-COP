import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import * as Constants from "expo-constants";
const formatNotificationTriggerTime = (time) => {
  // time = "Tommorrow 1pm"
  console.log(time);
  const timeArray = time.split(" ");
  const day = timeArray[0];
  const hour = timeArray[1].split("")[0];
  const ampm = timeArray[1].split("")[1];
  if (ampm === "pm" && hour !== 12) {
    hour = hour + 12;
  }
  const triggerTime = new Date();
  if (day === "Tommorrow") {
    triggerTime.setDate(triggerTime.getDate() + 1);
  } else if (day === "2days") {
    triggerTime.setDate(triggerTime.getDate() + 2);
  } else if (day === "3days") {
    triggerTime.setDate(triggerTime.getDate() + 3);
  } else if (day === "4days") {
    triggerTime.setDate(triggerTime.getDate() + 4);
  } else if (day === "5days") {
    triggerTime.setDate(triggerTime.getDate() + 5);
  }
  triggerTime.setHours(hour, 0, 0, 0);
  return triggerTime;
};
export async function schedulePushNotification(data) {
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });
  return notificationId;
}
export async function scheduleWorkoutNotification(time) {
  console.log("aaaaaaaaaaaaaaaaaaaaaaa");
  const triggerTime = formatNotificationTriggerTime(time);
  console.log(triggerTime);
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here" },
    },
    // trigger: triggerTime,
    trigger: { seconds: 10 },
  });
  return notificationId;
}
export async function registerForPushNotificationsAsync() {
  let token;
  // if (Platform.Os === "android") {
  //   await Notifications.setNotificationChannelAsync("default", {
  //     name: "default",
  //     importance: Notifications.AndroidImportance.MAX,
  //     vibrationPattern: [0, 250, 250, 250],
  //     lightColor: "#FF231F7C",
  //   });
  // }
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      alert("Failed to get push token for push notification!");
      return;
    }
    console.log(Constants.id);
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: "9b5a9a4d-d718-47ea-8cd3-5a0c727c2c95",
      })
    ).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }
  return token;
}
