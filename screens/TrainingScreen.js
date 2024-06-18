import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import Constants from "expo-constants";
//functions
import Firebase from "../functions/Firebase";
import AsyncStorageManager from "../functions/AsyncStorageManager";
// translation lib
import { TranslationContext, TranslationProvider } from "../translator";
// contexts
import { useWorkoutContext } from "../contexts/WorkoutContext";
export default function TrainingScreen({ navigation }) {
  const {
    translations: { TrainningScreenjs: translated },
    language,
  } = useContext(TranslationContext);
  const { workouts, handleSetWorkouts } = useWorkoutContext();
  const [selectedTab, setSelectedTab] = useState("guidedWorkouts");
  const [workoutsLocal, setWorkoutsLocal] = useState([]);
  const fb = new Firebase();
  const as = new AsyncStorageManager();
  const handleSetWorkoutsLocal = (workouts) => {
    setWorkoutsLocal(workouts);
  };
  const handleTabChange = (tabName) => {
    setSelectedTab(tabName);
  };
  useEffect(() => {
    fb.getWorkoutPrestes(handleSetWorkoutsLocal);
  }, []);
  const handleDownload = async (workoutPreset) => {
    await as.saveWorkOutPreset(workoutPreset);
    const newWorkouts = { ...workouts };
    newWorkouts[workoutPreset.id] = workoutPreset;
    handleSetWorkouts(newWorkouts);
  };
  return (
    <TranslationProvider>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {translated.title}
          </Text>
        </View>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === "guidedWorkouts" && styles.selectedTabButton,
            ]}
            onPress={() => handleTabChange("guidedWorkouts")}
          >
            <Text style={styles.tabText}>{translated.guidedWorkouts}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === "traningPlans" && styles.selectedTabButton,
            ]}
            onPress={() => handleTabChange("traningPlans")}
          >
            <Text style={styles.tabText}>{translated.trainingPlans}</Text>
          </TouchableOpacity>
        </View>
        {selectedTab === "guidedWorkouts" && (
          <ScrollView
            style={{ backgroundColor: "#F0F8FF", paddingTop: 20 }}
            nestedScrollEnabled={true}
          >
            {workoutsLocal.map((workout) => (
              <View style={styles.workoutContainer} key={workout.id}>
                <Text>{workout.id}</Text>
                <Text style={styles.workoutName}>{workout.name}</Text>
                <TouchableOpacity onPress={() => handleDownload(workout)}>
                  <Text>Download</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}
        {selectedTab === "traningPlans" && (
          <ScrollView>
            <View style={styles.feedContainer}>
              <Text>{translated.groupName}</Text>
            </View>
          </ScrollView>
        )}
      </View>
    </TranslationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Constants.statusBarHeight,
  },
  titleContainer: {
    height: 50,
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  tabContainer: {
    height: 50,
    width: "100%",
    backgroundColor: "white",
    flexDirection: "row",
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedTabButton: {
    borderBottomWidth: 4,
    borderColor: "#000055",
  },
  tabText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  workoutContainer: {
    height: 70,
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  workoutName: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
