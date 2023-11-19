import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useAppContext } from "../../contexts/AppContext";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebase";
import Loading from "../../components/Loading";
import { FIRESTORE_DB, STORAGE_REF } from "../../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  where,
  query,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Firebase from "../../functions/Firebase";
export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const {
    initailizeUserInfoContext,
    handleSetWeeklyData,
    handleSetMonthlyData,
    handleSetYearlyData,
    handleSetTotalActivitiesCount,
  } = useAppContext();
  const fb = new Firebase();
  const signIn = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userInfos = await fb.getUserInfo(userCredential);
      await initailizeUserInfoContext(userInfos);
      fb.setUser(userCredential.user.uid);
      const weeklyData = await fb.getDateRangeData("week");
      handleSetWeeklyData(weeklyData);
      const monthlyData = await fb.getDateRangeData("month");
      handleSetMonthlyData(monthlyData);
      const yearlyData = await fb.getDateRangeData("year");
      handleSetYearlyData(yearlyData);
      const totalActivitiesCount = await fb.getActivitiesCount();
      handleSetTotalActivitiesCount(totalActivitiesCount);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const signUp = async () => {
    setLoading(true);
    const storageRef = ref(STORAGE_REF, "images/" + "r1280x720l.jpeg");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const url = await getDownloadURL(storageRef);
      await addDoc(collection(FIRESTORE_DB, "user_info"), {
        user: userCredential.user.uid,
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
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  //   const getUserInfo = async (userCredential) => {
  //     return new Promise((resolve, reject) => {
  //       const userRef = query(
  //         collection(FIRESTORE_DB, "user_info"),
  //         where("user", "==", userCredential.user.uid)
  //       );
  //       const subscrier = onSnapshot(userRef, {
  //         next: (snapshot) => {
  //           const userInfos = [];
  //           snapshot.forEach((doc) => {
  //             console.log(doc.data());
  //             userInfos.push({
  //               id: doc.id,
  //               ...doc.data(),
  //             });
  //           });
  //           resolve(userInfos);
  //         },
  //         error: (error) => {
  //           reject(error);
  //         },
  //       });
  //       return subscrier;
  //     });
  //   };

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require("../../assets/Stridetracker.png")}
          resizeMode="contain"
          style={{
            width: 400,
            height: 200,
          }}
        />
      </View>
      <View style={styles.authInputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        ></TextInput>
      </View>

      {loading ? (
        <Loading />
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={signIn}
            style={styles.loginWighGoogleButton}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={signUp}
            style={styles.loginWighGoogleButton}
          >
            <Text style={styles.loginButtonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  authInputContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    padding: 10,
  },
  loginWighGoogleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
  },
  buttonContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
  },
  loginButtonText: {
    fontSize: 16,
    color: "gray",
    fontWeight: "bold",
    marginLeft: 10,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
