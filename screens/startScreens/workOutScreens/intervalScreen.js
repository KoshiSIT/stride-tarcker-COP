import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState, useContext } from "react";
import Constants from "expo-constants";
import axios from "axios";
// functions
import {
  formatMinutes,
  formatWorkoutDetails,
} from "../../../functions/DateHelpers";
import AsyncStorageManager from "../../../functions/AsyncStorageManager";
// components
import {
  RepeatOption,
  WarmUpOption,
  CoolDownOption,
} from "../../../components/start/workoutComponents/workoutOptions";

// translation lib
import { TranslationContext } from "../../../translator";
import { useWorkoutContext } from "../../../contexts/WorkoutContext";
// icons lib
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Octicons from "react-native-vector-icons/Octicons";
export default function IntervalScreen({ route }) {
  // Object {
  //     "Activitytype": "Running",
  //     "Cool Down": true,
  //     "Featuring": "David",
  //     "Goalexplain": "Imporove your mental wellbeing",
  //     "Repeat": 7,
  //     "Warm up": true,
  //     "explain": "hoge",
  //     "id": "REdZIrcqYBgtM1UXRLID",
  //     "label": "ALL LEVELS",
  //     "name": "Run/Walk/Run",
  //     "workoutDetails": Object {
  //       "Fast pace": 2,
  // },
  const workoutPresetID = route.params.workoutPresetID;
  const as = new AsyncStorageManager();
  console.log(workoutPresetID);
  const {
    translations: { IntervalScreenjs: translated },
  } = useContext(TranslationContext);
  const navigation = useNavigation();
  const {
    workouts,
    handleSetWorkoutDetails,
    handleSetWithRepeat,
    handleSetWithWarmUp,
    handleSetWithCoolDown,
    handleSetRepeatTimes,
    handleDeleteWorkout,
  } = useWorkoutContext();

  const workoutPreset = workouts[workoutPresetID];
  const [repeatTimes, setRepeatTimes] = useState(0);
  const [withWarmUp, setWithWarmUp] = useState(false);
  const [withCoolDown, setWithCoolDown] = useState(false);
  console.log(workouts);
  console.log(workoutPreset);
  const handleCancel = () => {
    navigation.goBack();
    navigation.navigate("Start");
  };
  const handleSlectWorkOut = () => {
    const setCurrentWorkout = () => {
      handleSetWorkoutDetails(workoutPreset.workoutDetails);
      handleSetWithRepeat(workoutPreset["Repeat"] > 1);
      handleSetRepeatTimes(workoutPreset["Repeat"]);
      handleSetWithWarmUp(workoutPreset["Warm up"]);
      handleSetWithCoolDown(workoutPreset["Cool Down"]);
    };
    setCurrentWorkout();
    navigation.navigate("Start");
  };
  const handleDeleteThisWorkout = () => {
    (async () => {
      await as.deleteWorkoutPreset(workoutPresetID);
      await handleDeleteWorkout(workoutPresetID);
      // navigation.goBack();
      navigation.navigate("Start");
    })();
  };
  const handleWithWarmUp = () => {
    setWithWarmUp(!withWarmUp);
  };
  const handleWithCoolDown = () => {
    setWithCoolDown(!withCoolDown);
  };
  useEffect(() => {
    if (workoutPreset) {
      setWithWarmUp(workoutPreset["Warm up"]);
      setWithCoolDown(workoutPreset["Cool Down"]);
      setRepeatTimes(workoutPreset["Repeat"]);
    }
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.cancelContainer}>
          <TouchableOpacity onPress={() => handleCancel()}>
            <Text style={styles.cancelText}>{translated.cancel}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{translated.intervalRunning}</Text>
        </View>
        <View style={styles.saveContainer}>
          <TouchableOpacity>
            <Octicons name="pencil" size={25} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 20, marginRight: 5 }}
            onPress={() => handleDeleteThisWorkout()}
          >
            <FontAwesomeIcon name="trash" size={25} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View style={styles.workOutContainer}>
          <Text style={styles.workOutName}>{workoutPreset.name}</Text>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => handleSlectWorkOut()}
          >
            <Text style={styles.saveButtonText}>
              {translated.selectThisWorkout}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.subContainer}>
            <Text>{translated.workoutDetails}</Text>
          </View>
          {workoutPreset.workoutDetails.map((workoutDetail, key) => (
            <View style={styles.detailContent} key={key}>
              <View style={styles.detailItem}>
                <Text style={styles.detailItemText}>
                  {console.log(workoutDetail)}
                  {formatWorkoutDetails(workoutDetail)}
                </Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.optionContainer}>
          <View style={styles.subContainer}>
            <Text>{translated.workoutOptions}</Text>
          </View>
          <View style={styles.optionContent}>
            <TouchableOpacity style={styles.optionItem}>
              <Text style={styles.optionItemText}>{translated.repeats}</Text>
              <Text
                style={{ fontSize: 17, fontWeight: "bold", color: "#000033" }}
              >
                {translated.repeatsTimes.replace("{count}", repeatTimes)}
              </Text>
            </TouchableOpacity>
            <WarmUpOption
              withWarmUp={withWarmUp}
              handleWithWarmUp={handleWithWarmUp}
              switchDisabled={true}
              translated={translated}
            />
            <CoolDownOption
              withCoolDown={withCoolDown}
              handleWithCoolDown={handleWithCoolDown}
              switchDisabled={true}
              translated={translated}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F8FF",
    marginTop: Constants.statusBarHeight,
  },
  topContainer: {
    height: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  cancelContainer: {},
  titleContainer: {},
  saveContainer: {
    flexDirection: "row",
  },
  workOutContainer: {
    height: 100,
    backgroundColor: "#F0F8FF",
    justifyContent: "center",
    alignItems: "center",
  },
  detailContainer: {},
  optionContainer: {
    height: 225,
  },
  subContainer: {
    height: 20,
  },
  detailContent: {
    backgroundColor: "white",
  },
  optionContent: {
    backgroundColor: "white",
  },
  detailItem: {
    height: 50,
    borderWidth: 1,
    borderColor: "lightgray",
    flexDirection: "row",
    alignItems: "center",
  },
  optionItem: {
    height: 50,
    borderWidth: 1,
    borderColor: "lightgray",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  cancelText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000033",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  optionItemText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },
  workOutName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  detailItemText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  saveButton: {
    backgroundColor: "#3366CC",
    height: 40,
    width: 350,
    borderRadius: 20,
    justifyContent: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
