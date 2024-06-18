import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  Swaitch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";

import React, { useEffect, useState, useRef, useContext } from "react";
// contexts
import { useAppContext } from "../../../contexts/AppContext";
import { TranslationContext } from "../../../translator";
//components

import PhotoPicker from "../../../components/start/PhotoPicker";
import {
  MemoModal,
  Time,
  Name,
  Distance,
  Calorie,
  Activity,
  Date,
  Notes,
  MoreDetails,
} from "../../../components/start/Result";
//functions
import Firebase from "../../../functions/Firebase";
// icons lib
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import FeatherIcon from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Constants from "expo-constants";
import RNPickerSelect from "react-native-picker-select";

export default function ManualEntrySaveScreen({ route }) {
  let documentExist = false;
  try {
    if (route.params.documentId) {
      documentExist = true;
    }
  } catch (error) {}

  const navigation = useNavigation();
  const {
    translations: { ResultScreenjs: translated },
  } = useContext(TranslationContext);
  const { user } = useAppContext();
  const fp = new Firebase(user);
  const [activity, setActivity] = useState("");
  const [time, setTime] = useState(0);
  const [pace, setPace] = useState(0);
  const [locationLog, setLocationLog] = useState([]);
  const [calorie, setCalorie] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0);
  const [mapSelected, setMapSelected] = useState(translated.withMapValue);
  const [activityName, setActivityName] = useState("running");
  const [isDummy, setIsDummy] = useState(false);
  const [bpm, setBpm] = useState(0);
  const [memo, setMemo] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [imageBlob, setImageBlob] = useState(null);

  const nameTextInputRef = useRef(null);
  const timeRef = useRef(null);
  const distanceRef = useRef(null);
  const paceRef = useRef(null);

  const mapItems = [
    { label: translated.withMapValue, value: translated.withMapValue },
    { label: translated.withoutMaplabel, value: translated.withoutMaplabel },
  ];
  class Result {
    constructor() {
      this.name = "Result";
    }
    main() {
      return this.render();
    }
    render() {
      return (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <View></View>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>{activity}</Text>
            <TouchableOpacity onPress={() => this.notSave()}>
              <FontAwesomeIcon name="trash" size={30} color="black" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.mainContainer}>
            <Name
              activityName={activityName}
              setActivityName={setActivityName}
              translated={translated}
              textInputRef={nameTextInputRef}
            />
            <Time />
            <Distance />
            <Calorie />
            <PhotoPicker />
            <Notes
              toggleModal={this.toggleModal}
              memoHeight={this.memoHeight}
              memo={memo}
              translated={translated}
            />
            <Activity />
            <Date />
            <MoreDetails />
          </ScrollView>
          <MemoModal />
        </View>
      );
    }
  }
  const rs = new Result();
  useEffect(() => {
    try {
      setActivity(route.params.activity);
    } catch (error) {}
  }, []);
  return rs.render();
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
  activityContainer: {
    height: 60,
    borderWidth: 1,
    borderColor: "#F5F5F5",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  pictureContainer: {
    height: 60,
    borderWidth: 1,
    borderColor: "#F5F5F5",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  memoContainer: {
    borderWidth: 1,
    borderColor: "#F5F5F5",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    height: 60,
  },
  detailContainer: {
    height: 60,
    borderWidth: 1,
    borderColor: "#F5F5F5",
    justifyContent: "center",
  },
  mapContainer: {
    height: 60,
    borderWidth: 1,
    borderColor: "#F5F5F5",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  workOutRemindContainer: {
    height: 60,
    borderWidth: 1,
    borderColor: "#F5F5F5",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  aveHeartRateContainer: {
    height: 60,
    borderWidth: 1,
    borderColor: "#F5F5F5",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  shoeTrackerContainer: {
    height: 60,
    borderWidth: 1,
    borderColor: "#F5F5F5",
    justifyContent: "center",
  },
  workTogetherContainer: {
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
