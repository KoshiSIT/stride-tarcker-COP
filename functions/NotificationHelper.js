import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import * as Constants from "expo-constants";
// context appstate is foreground or background
class NotificationHelper {
  static setForegroundNotificationHandling() {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: false,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  }
  static formatNotificationTriggerTime = (time) => {
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
  static async schedulePushNotification(data) {
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

  static async scheduleWorkoutNotification(time) {
    const triggerTime = formatNotificationTriggerTime(time);
    console.log(triggerTime);
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: "Here is the notification body",
        data: { data: "goes here" },
      },
      // trigger: triggerTime,
      trigger: { seconds: 1 },
    });
    return notificationId;
  }
  static async registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        const { status: newStatus } =
          await Notifications.requestPermissionsAsync();
        if (newStatus !== "granted") {
          alert("Failed to get push token for push notification!");
          return;
        }
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }
    return token;
  }
}
export default NotificationHelper;
