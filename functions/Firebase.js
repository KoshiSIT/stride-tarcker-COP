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
} from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { FIRESTORE_DB, FIREBASE_STORAGE, STORAGE_REF } from "../firebase";
import { getDateRange } from "./Date";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
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
    console.log("called");
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
  async getDateRangeData(type) {
    return new Promise((resolve, reject) => {
      console.log("getDateRangeData");
      const { start, end } = getDateRange(type);
      const startTimestamp = Timestamp.fromMillis(start.getTime());
      const endTimestamp = Timestamp.fromMillis(end.getTime());
      console.log(startTimestamp, endTimestamp);
      const q = query(
        collection(this.db, "stride-tracker_DB"),
        where("user", "==", this.user),
        where("datetime", ">=", startTimestamp),
        where("datetime", "<=", endTimestamp)
      );

      onSnapshot(
        q,
        (snapshot) => {
          let totalDistance = 0;
          let totalPace = 0;
          let activitiesCount = 0;
          snapshot.docs.forEach((doc) => {
            const data = doc.data();
            // console.log(data);
            if (data.distance) {
              totalDistance += data.distance;
            }
            totalPace += data.pace;
            activitiesCount++;
          });
          const averagePace =
            activitiesCount > 0 ? totalPace / activitiesCount : 0;
          const result = {
            activitiesCount,
            totalDistance,
            averagePace,
          };
          resolve(result);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  async getActivitiesCount() {
    return new Promise((resolve, reject) => {
      const userCollectionRef = query(
        collection(this.db, "stride-tracker_DB"),
        where("user", "==", this.user)
      );
      getDocs(userCollectionRef).then((snapshot) => {
        console.log(snapshot.size);
        resolve(snapshot.size);
      }, reject);
    });
  }
  async getUserInfo(userCredential) {
    return new Promise((resolve, reject) => {
      const userRef = query(
        collection(this.db, "user_info"),
        where("user", "==", userCredential.user.uid)
      );
      const subscriber = onSnapshot(userRef, {
        next: (snapshot) => {
          const userInfos = [];
          snapshot.forEach((doc) => {
            console.log(doc.data());
            userInfos.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          resolve(userInfos);
        },
        error: (error) => {
          reject(error);
        },
      });
      return subscriber;
    });
  }
}
export default Firebase;
