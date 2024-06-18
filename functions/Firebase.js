import {
  addDoc,
  collection,
  onSnapshot,
  where,
  orderBy,
  limit,
  query,
  Timestamp,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { getDownloadURL, ref, getDoc, uploadBytes } from "firebase/storage";
import { FIRESTORE_DB, FIREBASE_STORAGE, STORAGE_REF } from "../firebase";
import { getDateRange, getDurationLabel } from "./DateHelpers";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { init } from "contextjs";

class Firebase {
  constructor(user) {
    this.user = user;
    this.db = FIRESTORE_DB;
    this.storage = FIREBASE_STORAGE;
    this.storageRef = STORAGE_REF;
  }
  setUser(user) {
    this.user = user;
  }
  getActivities(setActivites) {
    const activitieRef = query(
      collection(this.db, "stride-tracker_DB"),
      where("user", "==", this.user),
      limit(10)
    );
    const subscriber = onSnapshot(activitieRef, {
      next: (snapshot) => {
        const activities = [];
        snapshot.docs.forEach((doc) => {
          activities.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setActivites(activities);
      },
    });
    return () => subscriber();
  }
  getAllActivitesData(initializeActivitesContext) {
    console.log("getAllActivitesData");
    console.log(this.user);
    const q = query(
      collection(this.db, "stride-tracker_DB"),
      where("user", "==", this.user)
    );
    const firstDataReceived = new Promise((resolve, reject) => {
      const unsubscribed = onSnapshot(q, (snapshot) => {
        console.log("get All ActivitesData onSnapshot");
        let weeklyData = [];
        let monthlyData = [];
        let yearlyData = [];
        let allActivitedData = [];
        let weeklyTotal = {
          activitiesCount: 0,
          totalDistance: 0,
          averagePace: 0,
        };
        let monthlyTotal = {
          activitiesCount: 0,
          totalDistance: 0,
          averagePace: 0,
        };
        let yearlyTotal = {
          activitiesCount: 0,
          totalDistance: 0,
          averagePace: 0,
        };
        let allActivitedTotal = {
          activitiesCount: 0,
          totalDistance: 0,
          averagePace: 0,
        };
        const accumulateData = (dataArray, totalObject, data) => {
          dataArray.push(data);
          totalObject.activitiesCount++;
          if (data.totalDistance) {
            totalObject.totalDistance += data.totalDistance;
          }
          if (data.averagePace) {
            totalObject.averagePace += data.averagePace;
          }
        };
        snapshot.docs.forEach((doc) => {
          // console.log("data loop");
          const data = doc.data();
          const durationLabel = getDurationLabel(data.datetime);
          if (durationLabel) {
            if (durationLabel === "weekly") {
              accumulateData(weeklyData, weeklyTotal, data);
              accumulateData(monthlyData, monthlyTotal, data);
              accumulateData(yearlyData, yearlyTotal, data);
            } else if (durationLabel === "monthly") {
              accumulateData(monthlyData, monthlyTotal, data);
              accumulateData(yearlyData, yearlyTotal, data);
            } else if (durationLabel === "yearly") {
              accumulateData(yearlyData, yearlyTotal, data);
            }
          }
          accumulateData(allActivitedData, allActivitedTotal, data);
        });
        const result = {
          weeklyData,
          monthlyData,
          yearlyData,
          allActivitedData,
          weeklyTotal,
          monthlyTotal,
          yearlyTotal,
          allActivitedTotal,
        };
        initializeActivitesContext(result);
        console.log("resolve");
        resolve(unsubscribed);
      });
    });
    return firstDataReceived;
  }

  getUserInfo(initializeUserInfoContext) {
    console.log("getUserInfo");
    console.log(this.user);
    const userRef = query(
      collection(this.db, "user_info"),
      where("user", "==", this.user)
    );
    const firstDataReceived = new Promise((resolve, reject) => {
      const unsubscribed = onSnapshot(userRef, {
        next: (snapshot) => {
          console.log("getUserInfo onSnapshot");
          const userInfos = [];
          snapshot.forEach((doc) => {
            console.log(doc.data());
            userInfos.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          initializeUserInfoContext(userInfos);
          console.log("resolve firebase");
          resolve(unsubscribed);
        },
      });
    });
    return firstDataReceived;
  }
  async addUserInfo(user) {
    const stRef = ref(this.storageRef, "images/" + "r1280x720l.jpeg");
    const url = await getDownloadURL(stRef);
    await addDoc(collection(this.db, "user_info"), {
      user: user,
      firstName: "Ayre",
      lastName: "Nile",
      birthday: "1999/01/01",
      gender: "woman",
      language: "jp",
      weight: 60,
      height: 170,
      firstDayOfWeek: "sunday",
      profileImage: url,
    })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }
  async uploadImage(blob) {
    const imageRef = ref(this.storageRef, "images/" + blob._data.name);
    // console.log(`imageRef: ${imageRef}`);
    await uploadBytes(imageRef, blob, {
      contentType: blob._data.type || "image/jpeg",
    });
    const url = await getDownloadURL(imageRef);
    return url;
  }
  async updateUserProfileImage(url) {
    // console.log(`url: ${url}`);
    const documentId = await this.getDocumentidByUser(this.user);
    const userRef = doc(this.db, "user_info", documentId);
    // console.log(`userRef: ${userRef}`);
    await updateDoc(userRef, {
      profileImage: url,
    });
  }
  async updateUserInfo() {
    const documentId = await this.getDocumentidByUser(this.user);
    const userRef = doc(this.db, "user_info", documentId);
    await updateDoc(userRef, {
      height: Math.random(),
    });
    console.log("updateUserInfo");
  }

  async getDocumentidByUser(user) {
    const userRef = query(
      collection(this.db, "user_info"),
      where("user", "==", user)
    );
    const snapshot = await getDocs(userRef);
    let id = "";
    snapshot.forEach((doc) => {
      id = doc.id;
    });
    return id;
  }
  getWorkoutPrestes(handleSetWorkouts) {
    const workOutPresetRef = query(collection(this.db, "workouts"));
    const subscriber = onSnapshot(workOutPresetRef, {
      next: (snapshot) => {
        const workOutPresets = [];
        snapshot.docs.forEach((doc) => {
          workOutPresets.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        handleSetWorkouts(workOutPresets);
      },
    });
    return () => subscriber();
  }
}

export default Firebase;
