import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  ScrollView,
  Dimensions,
  TextInput,
  Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";

import React, { useEffect, useState, useRef, useContext } from "react";
// contexts
import { useAppContext } from "../../contexts/AppContext";
import { useActivityContext } from "../../contexts/ActivityContext";
import { useStartScreenContext } from "../../contexts/StartScreenContext";
import TranslationContext from "../../translator/TranslationContext";
// components
import PhotoPicker from "../../components/start/PhotoPicker";
import {
  MemoModal,
  Notes,
  Maps,
  Name,
  Distance,
  Calorie,
  Activity,
  DateTime,
  MoreDetails,
  Bpm,
  Shoes,
} from "../../components/start/Result";
// functions
import * as DateHelpers from "../../functions/DateHelpers";
import Firebase from "../../functions/Firebase";
// icons lib
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
// cop
import {
  manualEntryLayer,
  stopWatchModeLayer,
  reviewActivityLayer,
  newActivityLayer,
} from "../../cop/LayerDefinition";
// import { withLayersZone } from "../../context-zone/contextZone";
import { withLayers } from "contextjs";

import Constants from "expo-constants";

import { FIRESTORE_DB, STORAGE_REF } from "../../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { Stop } from "react-native-svg";

export default function ResultScreenUpdate({ route }) {
  // const parentName = route.params.parentName;
  let documentExist = false;
  const navigation = useNavigation();
  const {
    translations: { ResultScreenjs: translated },
  } = useContext(TranslationContext);
  const { user } = useAppContext();
  const fb = new Firebase(user);
  let manualEntry = "";
  const [mode, setMode] = useState(""); // GPSMode, stopWatchMode, manualEntry
  const { stopWatchMode, selectedActivity } = useStartScreenContext();
  const { time, pace, locationLog, calorie, totalDistance } =
    useActivityContext();
  const [timeLocal, setTime] = useState(0);
  const [paceLocal, setPace] = useState(0);
  const [locationLogLocal, setLocationLog] = useState([]);
  const [totalDistanceLocal, setTotalDistance] = useState(0);
  const [calorieLocal, setCalorie] = useState(0);
  const [mapSelected, setMapSelected] = useState(translated.withMapValue);
  const [activityName, setActivityName] = useState("running");
  const [isDammy, setIsDammy] = useState(false);
  const [bpm, setBpm] = useState("");
  const [memo, setMemo] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [imageBlob, setImageBlob] = useState(null);
  const textInputRef = useRef(null);

  try {
    if (route.params.documentId) {
      documentExist = true;
    }
  } catch (error) {}
  try {
    if (route.params.activity) {
      manualEntry = route.params.activity;
    }
  } catch (error) {}

  const setScreenStates = (data) => {
    setMode(data.mode);
    setTime(data.time);
    setPace(data.pace);
    setLocationLog(data.locationLog);
    setCalorie(data.calorie);
    setActivityName(data.activityName);
    setMapSelected(data.map);
    setMemo(data.memo);
    setBpm(data.bpm);
  };
  const mapItems = [
    { label: translated.withMaplabel, value: translated.withMapValue },
    { label: translated.withoutMaplabel, value: translated.withoutMapValue },
  ];
  class Result {
    constructor() {
      this.name = "Result";
    }
    main() {
      // if (mode === "manualEntry") {
      //   return withLayers(manualEntryLayer, () => {
      //     return this.render();
      //   });
      // } else if (mode === "stopWatchMode") {
      //   return withLayers(stopWatchModeLayer, () => {
      //     return this.render();
      //   });
      // } else {
      //   return this.render();
      // }
      return this.render();
    }
    renderData() {
      return (
        <View style={styles.dataContainer}>
          <View style={styles.dataSubItem}>
            <Text style={{ fontSize: 20 }}>{timeLocal.toFixed(2)}</Text>
            <Text>{translated.time}</Text>
          </View>
          <View style={styles.dataSubItem}>
            <Text style={{ fontSize: 20 }}>{calorie}</Text>
            <Text>{translated.calories}</Text>
          </View>
        </View>
      );
    }
    renderMain() {
      return (
        <ScrollView style={styles.mainContainer}>
          <View>
            {this.renderData()}
            <Name
              activityName={activityName}
              handleActivityName={this.handleActivityName}
              translated={translated}
              textInputRef={textInputRef}
            />
            <PhotoPicker setImageBlob={setImageBlob} />
            <Notes
              toggleModal={this.toggleModal}
              memoHeight={this.memoHeight}
              memo={memo}
              translated={translated}
            />
            <View style={styles.detailContainer}>
              <Text style={styles.activityText}>{translated.MoreDetails}</Text>
            </View>
            <Maps
              mapItems={mapItems}
              mapSelected={mapSelected}
              setMapSelected={setMapSelected}
              translated={translated}
            />
            <View style={styles.workOutRemindContainer}>
              <View style={styles.resultReviewItem1}>
                <IoniconsIcon name="alarm-outline" size={30} color="black" />
                <Text style={styles.activityText}>
                  {translated.WorkoutReminders}
                </Text>
              </View>
              <View style={styles.resultReviewItem2}>
                <Switch
                  value={isDammy}
                  onValueChange={this.handleDammy}
                  trackColor={{ false: "#767577", true: "#20B2AA" }}
                  thumbColor={isDammy ? "#f4f3f4" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                />
              </View>
            </View>
            {isDammy && (
              <TouchableOpacity style={styles.workOutRemindContainer}>
                <View style={styles.resultReviewItem1}>
                  <IoniconsIcon name="alarm-outline" size={30} color="black" />
                  <Text style={styles.activityText}>
                    {translated.WorkoutReminders}
                  </Text>
                </View>
                <View style={styles.resultReviewItem2}>
                  <Text style={styles.subText}>明日:午前6時</Text>
                </View>
              </TouchableOpacity>
            )}
            <Bpm bpm={bpm} setBpm={setBpm} translated={translated} />
            <Shoes translated={translated} />
          </View>
        </ScrollView>
      );
    }
    renderDeleteButton() {
      if (mode === "manualEntry") {
        return <View></View>;
      } else {
        return (
          <TouchableOpacity onPress={() => this.notSave()}>
            <FontAwesomeIcon name="trash" size={30} color="black" />
          </TouchableOpacity>
        );
      }
    }
    renderSaveButton() {
      return (
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => this.saveResult()}
        >
          <Text style={styles.saveButtonText}>{translated.save}</Text>
        </TouchableOpacity>
      );
    }
    renderBackButton() {
      return <View></View>;
    }
    render() {
      return (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            {this.renderBackButton()}
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {translated.resultAndSave}
            </Text>
            {this.renderDeleteButton()}
          </View>
          {this.renderMain()}
          {this.renderSaveButton()}
          <MemoModal
            isModalVisible={isModalVisible}
            setModalVisible={setModalVisible}
            memo={memo}
            setMemo={setMemo}
            translated={translated}
          />
        </View>
      );
    }
    async fetchActivity() {
      setScreenStates({
        mode: stopWatchMode ? "stopWatchMode" : "GPSMode",
        time: time,
        pace: pace,
        locationLog: locationLog,
        calorie: calorie,
        totalDistance: totalDistance,
        activityName: selectedActivity,
        map: translated.withMapValue,
        memo: "",
        bpm: "",
      });
    }
    toggleModal() {
      setModalVisible(!isModalVisible);
    }
    handleActivityName() {
      textInputRef.current.focus();
    }
    handleDammy() {
      setIsDammy(!isDammy);
    }
    handleSetResultItem = (item) => {
      console.log(item);
    };
    memoHeight() {
      const lineHeigh = 40;
      if (memo.length !== 0) {
        const lines = Math.ceil(memo.length / 20);
        return lineHeigh + 10 * lines;
      } else {
        return 60;
      }
    }
    notSave() {
      navigation.goBack();
    }
    handleCancel() {
      navigation.goBack();
    }
    saveResult() {
      console.log("addData");
      this.addData();
    }
    addData() {
      const datetime = new Date();
      const uploadData = {
        user: user,
        activity: selectedActivity,
        mode: mode,
        activityName: activityName,
        distance: totalDistanceLocal,
        locationLog: mode === "GPSMode" ? locationLogLocal : [],
        time: timeLocal,
        pace: mode === "GPSMode" ? paceLocal : 0,
        calorie: calorieLocal,
        bpm: bpm,
        memo: memo,
        map: mapSelected,
        datetime: datetime,
      };
      if (imageBlob !== null) {
        fb.uploadImage(imageBlob).then((url) => {
          addDoc(collection(FIRESTORE_DB, "stride-tracker_DB"), {
            ...uploadData,
            image: url,
          })
            .then((docRef) => {
              console.log("Document written with ID: ", docRef.id);
              navigation.navigate("ResultReview", { documentId: docRef.id });
            })
            .catch((error) => {
              console.log(error);
            });
        });
      } else {
        addDoc(collection(FIRESTORE_DB, "stride-tracker_DB"), {
          ...uploadData,
          image: "",
        })
          .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            navigation.navigate("ResultReview", { documentId: docRef.id });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    updateData() {
      const datetime = new Date();
      const docRef = doc(
        FIRESTORE_DB,
        "stride-tracker_DB",
        route.params.documentId
      );
      const updateData = {
        user: user,
        activityName: activityName,
        locationLog: locationLogLocal,
        time: timeLocal,
        pace: paceLocal,
        calorie: calorieLocal,
        bpm: bpm,
        memo: memo,
        map: mapSelected,
        datetime: datetime,
        image: "",
      };

      const updateDocument = (data) => {
        updateDoc(docRef, data)
          .then(() => {
            console.log("Document successfully updated!");
            navigation.navigate("ResultReview", { documentId: docRef.id });
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
          });
      };
      if (imageBlob !== null) {
        fb.uploadImage(imageBlob).then((url) => {
          updateData.image = url;
          console.log(url);
          updateDocument(updateData);
        });
      } else {
        updateData.image = "";
        updateDocument(updateData);
      }
    }
  }

  const result = new Result();
  manualEntryLayer.refineClass(Result, {
    renderMain() {
      return (
        <View>
          <Name
            activityName={activityName}
            handleActivityName={this.handleActivityName}
            translated={translated}
            textInputRef={textInputRef}
          />
          <Distance />
          <Calorie />
          <PhotoPicker setImageBlob={setImageBlob} />
          <Notes
            toggleModal={this.toggleModal}
            memoHeight={this.memoHeight}
            memo={memo}
            translated={translated}
          />
          <Activity />
          <DateTime />
          <MoreDetails />
        </View>
      );
    },
    renderDeleteButton() {
      return <View></View>;
    },
    renderBackButton() {
      return (
        <TouchableOpacity onPress={() => this.handleCancel()}>
          <FontAwesomeIcon name="chevron-left" size={20} color="black" />
        </TouchableOpacity>
      );
    },
  });
  stopWatchModeLayer.refineClass(Result, {
    renderMain() {
      return (
        <View>
          <Name
            activityName={activityName}
            handleActivityName={this.handleActivityName}
            translated={translated}
            textInputRef={textInputRef}
          />
          <Distance />
          <PhotoPicker setImageBlob={setImageBlob} />
          <Notes
            toggleModal={this.toggleModal}
            memoHeight={this.memoHeight}
            memo={memo}
            translated={translated}
          />
          <View style={styles.detailContainer}>
            <Text style={styles.activityText}>{translated.MoreDetails}</Text>
          </View>
          <Maps
            mapItems={mapItems}
            mapSelected={mapSelected}
            setMapSelected={setMapSelected}
            translated={translated}
          />
          <View style={styles.workOutRemindContainer}>
            <View style={styles.resultReviewItem1}>
              <IoniconsIcon name="alarm-outline" size={30} color="black" />
              <Text style={styles.activityText}>
                {translated.WorkoutReminders}
              </Text>
            </View>
            <View style={styles.resultReviewItem2}>
              <Switch
                value={isDammy}
                onValueChange={this.handleDammy}
                trackColor={{ false: "#767577", true: "#20B2AA" }}
                thumbColor={isDammy ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
              />
            </View>
          </View>
          {isDammy && (
            <TouchableOpacity style={styles.workOutRemindContainer}>
              <View style={styles.resultReviewItem1}>
                <IoniconsIcon name="alarm-outline" size={30} color="black" />
                <Text style={styles.activityText}>
                  {translated.WorkoutReminders}
                </Text>
              </View>
              <View style={styles.resultReviewItem2}>
                <Text style={styles.subText}>明日:午前6時</Text>
              </View>
            </TouchableOpacity>
          )}
          <Bpm bpm={bpm} setBpm={setBpm} translated={translated} />
          <Shoes translated={translated} />
        </View>
      );
    },
  });
  reviewActivityLayer.refineClass(Result, {
    renderBackButton() {
      return (
        <TouchableOpacity onPress={() => this.handleCancel()}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {translated.cancel}
          </Text>
        </TouchableOpacity>
      );
    },
    async fetchActivity() {
      try {
        const documentId = route.params.documentId;
        const docRef = doc(FIRESTORE_DB, "stride-tracker_DB", documentId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists) {
          const data = docSnap.data();
          setScreenStates(data);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error);
      }
    },
    saveResult() {
      console.log("updateData");
      this.updateData();
    },
  });
  useEffect(() => {
    if (manualEntry === "") {
      if (documentExist) {
        withLayers(reviewActivityLayer, () => {
          result.fetchActivity();
        });
      } else {
        result.fetchActivity();
      }
    } else {
      setMode("manualEntry");
      setActivityName(manualEntry);
    }
  }, []);

  useEffect(() => {
    console.log("mode:" + mode);
  }, [mode]);

  if (documentExist && mode === "GPSMode") {
    return withLayers([reviewActivityLayer], () => {
      return result.main();
    });
  } else if (documentExist && mode === "stopWatchMode") {
    return withLayers([reviewActivityLayer, stopWatchModeLayer], () => {
      return result.main();
    });
  } else if (documentExist && mode === "manualEntry") {
    return withLayers([reviewActivityLayer, manualEntryLayer], () => {
      return result.main();
    });
  } else if (!documentExist && mode === "stopWatchMode") {
    return withLayers([stopWatchModeLayer], () => {
      return result.main();
    });
  } else if (!documentExist && mode === "manualEntry") {
    return withLayers([manualEntryLayer], () => {
      return result.main();
    });
  } else {
    return result.main();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  mainContainer: {
    flex: 1,
  },
  titleContainer: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 10,
  },
  resultReviewItem1: {
    flexDirection: "row",
    alignItems: "center",
  },
  resultReviewItem2: {
    flexDirection: "row",
    alignItems: "center",
  },
  dataContainer: {
    height: 60,
    borderWidth: 1,
    borderColor: "#F5F5F5",
    flexDirection: "row",
  },
  dataSubItem: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  pictureContainer: {
    height: 60,
    borderWidth: 1,
    borderColor: "#F5F5F5",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  detailContainer: {
    height: 60,
    borderWidth: 1,
    borderColor: "#F5F5F5",
    justifyContent: "center",
  },
  workOutRemindContainer: {
    height: 60,
    borderWidth: 1,
    borderColor: "#F5F5F5",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  activityText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "black",
    marginLeft: 10,
  },
  input: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  subText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000033",
  },
  saveButton: {
    backgroundColor: "#3366CC",
    width: "90%",
    height: "9%",
    bottom: "0%",
    left: "5%",
    right: "95%",
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
