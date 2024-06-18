import * as Location from "expo-location";
import { LOCATION_TASK_NAME } from "./BackGroundTask";
import SubscribeManager from "./SubscribeManager";
// context foreground or background
import { backgroundLayer, stopWatchModeLayer } from "../cop/LayerDefinition";
class Geolocation {
  constructor(stateSetter) {
    this.initialPosition = null;
    this.handleSetCurrentLocation = stateSetter;
    this.appState = "active";
  }
  async startObserving() {
    await this.startLocationUpdates();
  }
  async getLocationPermission() {
    console.log("getting location permission");
    const { status } = await Location.requestForegroundPermissionsAsync();
    this.status = status;
    if (this.status !== "granted") {
      alert("Permission to access location was denied");
    }
  }
  async startLocationUpdates() {
    if (this.status !== "granted") {
      await this.getLocationPermission();
    }
    if (this.status === "granted") {
      const locationSubscribe = Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 1000 },
        (position) => {
          const { latitude, longitude } = position.coords;
          if (!this.initialPosition) {
            this.initialPosition = { latitude, longitude };
          }
          try {
            this.handleSetCurrentLocation({ latitude, longitude });
          } catch (e) {
            console.log(e);
          }
        }
      );
      SubscribeManager.subscribeApi("location", locationSubscribe);
    }
    return () => locationSubscribe();
  }
}

backgroundLayer.refineClass(Geolocation, {
  async startLocationUpdates() {
    if (this.status !== "granted") {
      await this.getLocationPermission();
    }
    if (this.status === "granted") {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000,
        distanceInterval: 0,
        foregroundService: {
          notificationTitle: "Background location",
          notificationBody: "Enable background location in settings",
          notificationColor: "#FF0000",
        },
      });
    }
  },
});

stopWatchModeLayer.refineClass(Geolocation, {
  async startObserving() {
    return;
  },
});
export default Geolocation;
