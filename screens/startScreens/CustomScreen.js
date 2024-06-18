import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Animated,
  Modal,
  Dimensions,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState, useContext } from "react";
import { Picker as SelectPicker } from "@react-native-picker/picker";
import Constants from "expo-constants";
import axios from "axios";
// icons lib
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
// components
import {
  RepeatOption,
  WarmUpOption,
  CoolDownOption,
} from "../../components/start/workoutComponents/workoutOptions";
// functions
import {
  formatWorkoutDetails,
  formatWorkoutDetailsToObj,
} from "../../functions/DateHelpers";
import AsyncStorageManager from "../../functions/AsyncStorageManager";
// translation lib
import { TranslationContext } from "../../translator";
// contexts
import { useWorkoutContext } from "../../contexts/WorkoutContext";
export default function CustomScreen({}) {
  const {
    translations: { CustomScreenjs: translated },
  } = useContext(TranslationContext);
  const { workouts, handleSetWorkouts } = useWorkoutContext();
  const navigation = useNavigation();
  const as = new AsyncStorageManager();

  const handleCancel = () => {
    navigation.goBack();
  };
  const handleSave = () => {
    const newWorkoutPreset = {
      id: Date.now().toString(),
      Activitytype: "Custom",
      Featuring: "Custom",
      Goalexplain: "Custom",
      Repeat: repeatTimes,
      "Warm up": withWarmUp,
      "Cool Down": withCoolDown,
      name: workoutName,
      workoutDetails: workoutDetails,
    };
    // check if all properties are filled
    const areAllPropertiesFilled = Object.values(newWorkoutPreset).every(
      (value) => {
        if (typeof value === "boolean") {
          return true;
        }
        return value !== null && value !== undefined && value !== "";
      }
    );
    if (areAllPropertiesFilled) {
      as.saveWorkOutPreset(newWorkoutPreset);
      const newWorkouts = { ...workouts };
      newWorkouts[newWorkoutPreset.id] = newWorkoutPreset;
      handleSetWorkouts(newWorkouts);
      navigation.goBack();
    } else {
      Alert.alert("Please fill all properties");
    }
  };

  const [workoutName, setWorkoutName] = useState("");
  const [repeatTimes, setRepeatTimes] = useState(0);
  const [withWarmUp, setWithWarmUp] = useState(false);
  const [withCoolDown, setWithCoolDown] = useState(false);
  const [workoutDetails, setWorkoutDetails] = useState([]);

  useEffect(() => {
    console.log(workoutDetails);
  }, [workoutDetails]);
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.cancelContainer}>
          <TouchableOpacity onPress={() => handleCancel()}>
            <Text style={styles.cancelText}>{translated.close}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{translated.custom}</Text>
        </View>
        <TouchableOpacity
          style={styles.saveContainer}
          onPress={() => handleSave()}
        >
          <Text style={styles.saveText}>{translated.save}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <WorkoutName
          translated={translated}
          workoutName={workoutName}
          setWorkoutName={setWorkoutName}
        />
        <WorkoutDetail
          translated={translated}
          disabled={true}
          workoutDetails={workoutDetails}
          setWorkoutDetails={setWorkoutDetails}
        />
        <WorkoutOption
          translated={translated}
          repeatTimes={repeatTimes}
          setRepeatTimes={setRepeatTimes}
          withWarmUp={withWarmUp}
          setWithWarmUp={setWithWarmUp}
          withCoolDown={withCoolDown}
          setWithCoolDown={setWithCoolDown}
        />
        <SavedWorkOut translated={translated} switchDisabled={true} />
      </ScrollView>
    </View>
  );
}

const WorkoutName = ({ translated, workoutName, setWorkoutName }) => {
  return (
    <View style={styles.workOutNameBox}>
      <View style={styles.headlineBackground}>
        <Text style={styles.headlineText}>{translated.enterName}</Text>
      </View>
      <View style={styles.workoutNameContent}>
        <TextInput
          style={styles.input}
          value={workoutName}
          onChangeText={(text) => {
            setWorkoutName(text);
          }}
          secureTextEntry={false}
        />
      </View>
    </View>
  );
};

const WorkoutDetail = ({ translated, workoutDetails, setWorkoutDetails }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [detailContext, setDetailContext] = useState("");
  const [detailIndex, setDetailIndex] = useState(null);
  const handleToggleModal = (item, index) => {
    try {
      setDetailContext(item);
    } catch (error) {
      setDetailContext("");
    }
    if (index === undefined) {
      setDetailIndex(null);
    } else {
      setDetailIndex(index);
    }
    setModalVisible(!modalVisible);
  };
  const handleDelete = (index) => {
    const newWorkoutDetails = [...workoutDetails];
    newWorkoutDetails.splice(index, 1);
    setWorkoutDetails(newWorkoutDetails);
  };

  const DetailItem = ({ item, index }) => {
    const [slideAnim] = useState(new Animated.Value(0));
    const [isSlideout, setIsSlideout] = useState(false);
    const handleSlide = () => {
      width = Math.floor(Dimensions.get("window").width * 0.17);
      console.log(width);
      const slideValue = isSlideout ? 0 : width;
      Animated.timing(slideAnim, {
        toValue: slideValue,
        duration: 300,
        useNativeDriver: false,
      }).start();
      setIsSlideout(!isSlideout);
    };
    return (
      <Animated.View style={[styles.detailItem, { right: slideAnim }]}>
        <TouchableOpacity style={{ width: "20" }} onPress={() => handleSlide()}>
          <FontAwesome5Icon
            name="minus-circle"
            size={22}
            color="red"
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: "80%" }}
          onPress={
            isSlideout
              ? () => handleSlide()
              : () => {
                  handleToggleModal(item, index);
                }
          }
        >
          <Text style={styles.detailItemText}>
            {formatWorkoutDetails(item)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteBotton}
          onPress={() => handleDelete(index)}
        >
          <Text style={styles.deleteText}>delete</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };
  return (
    <View style={styles.workOutItemBox}>
      <View style={styles.headlineBackground}>
        <Text style={styles.headlineText}>{translated.workoutDetails}</Text>
      </View>
      <View>
        {workoutDetails.map((item, index) => (
          <DetailItem item={item} index={index} key={index} />
        ))}
        <TouchableOpacity
          style={styles.detailItem}
          onPress={() => handleToggleModal()}
        >
          <FontAwesome5Icon
            name="plus-circle"
            size={22}
            color="green"
            style={{ marginLeft: 10 }}
          />
          <Text style={styles.detailItemText}>{translated.addNewOption}</Text>
        </TouchableOpacity>
      </View>
      <DetailItemModal
        modalVisible={modalVisible}
        handleToggleModal={handleToggleModal}
        setWorkoutDetails={setWorkoutDetails}
        workoutDetails={workoutDetails}
        detailContext={detailContext}
        detailIndex={detailIndex}
      />
    </View>
  );
};

const WorkoutOption = ({
  translated,
  repeatTimes,
  setRepeatTimes,
  withWarmUp,
  setWithWarmUp,
  withCoolDown,
  setWithCoolDown,
}) => {
  return (
    <View style={styles.workOutItemBox}>
      <View style={styles.headlineBackground}>
        <Text style={styles.headlineText}>{translated.workoutOptions}</Text>
      </View>
      <View style={styles.optionContent}>
        <RepeatOption
          translated={translated}
          disabled={false}
          repeatTimes={repeatTimes}
          setRepeatTimes={setRepeatTimes}
        />
        <WarmUpOption
          translated={translated}
          switchDisabled={false}
          withWarmUp={withWarmUp}
          handleWithWarmUp={setWithWarmUp}
        />
        <CoolDownOption
          translated={translated}
          switchDisabled={false}
          withCoolDown={withCoolDown}
          handleWithCoolDown={setWithCoolDown}
        />
      </View>
    </View>
  );
};

const SavedWorkOut = ({ translated }) => {
  return (
    <View style={styles.workOutItemBox}>
      <View style={styles.headlineBackground}>
        <Text style={styles.headlineText}>{translated.savedWorkouts}</Text>
      </View>
      <View style={styles.content}></View>
    </View>
  );
};
function DetailItemModal({
  modalVisible,
  handleToggleModal,
  setWorkoutDetails,
  workoutDetails,
  detailContext,
  detailIndex,
}) {
  const [modalAnimation] = useState(new Animated.Value(windowWidth));
  const [distance1, setDistance1] = useState(0);
  const [distance2, setDistance2] = useState(0);
  const [distanceUnit, setDistanceUnit] = useState("mi");
  const [minitues, setMinitues] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isTimeSelected, setIsTimeSelected] = useState(false);
  const [paceSelected, setPaceSelected] = useState("slow");

  useEffect(() => {
    if (modalVisible) {
      Animated.timing(modalAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(modalAnimation, {
        toValue: windowWidth,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible, modalAnimation]);

  useEffect(() => {
    if (detailContext) {
      const context = formatWorkoutDetailsToObj(detailContext);
      setDistance1(context.distance1);
      setDistance2(context.distance2);
      setDistanceUnit(context.distanceUnit);
      setMinitues(context.minutes);
      setSeconds(context.seconds);
      setIsTimeSelected(context.isTimeSelected);
      setPaceSelected(context.paceSelected);
    }
  }, [detailContext]);

  const modalStyle = {
    transform: [{ translateX: modalAnimation }],
  };
  const goBack = () => {
    let newDetailItem = "";
    const pace = paceSelected.charAt(0).toUpperCase() + paceSelected.slice(1);
    if (isTimeSelected) {
      newDetailItem = `${pace}_Time_${minitues}:${seconds}`;
    } else {
      newDetailItem = `${pace}_${distance1}.${distance2}_${distanceUnit}`;
    }
    if (detailIndex !== null) {
      const newWorkoutDetails = [...workoutDetails];
      newWorkoutDetails.splice(detailIndex, 1, newDetailItem);
      setWorkoutDetails(newWorkoutDetails);
    } else {
      setWorkoutDetails([...workoutDetails, newDetailItem]);
    }
    handleToggleModal();
  };
  const DistancePicker = () => {
    return (
      <View style={styles.pickerContainer}>
        <SelectPicker
          selectedValue={distance1}
          style={{ height: 50, width: 120 }}
          onValueChange={(itemValue, itemIndex) => setDistance1(itemValue)}
        >
          {Array.from(Array(100).keys()).map((item) => (
            <SelectPicker.Item key={item} label={item} value={item} />
          ))}
        </SelectPicker>
        <SelectPicker
          selectedValue={distance2}
          style={{ height: 50, width: 120 }}
          onValueChange={(itemValue, itemIndex) => setDistance2(itemValue)}
        >
          {Array.from({ length: 4 }, (_, index) => index * 0.25).map((item) => (
            <SelectPicker.Item
              key={item}
              label={item.toString()}
              value={item}
            />
          ))}
        </SelectPicker>
        <SelectPicker
          selectedValue={distanceUnit}
          style={{ height: 50, width: 120 }}
          onValueChange={(itemValue, itemIndex) => setDistanceUnit(itemValue)}
        >
          <SelectPicker.Item key="mi" label="mi" value="mi" />
          <SelectPicker.Item key="km" label="km" value="km" />
        </SelectPicker>
      </View>
    );
  };
  const TimePicker = () => {
    return (
      <View style={styles.pickerContainer}>
        <View style={styles.pickerBox}>
          <Text style={styles.slectName}>Minitues</Text>
          <SelectPicker
            selectedValue={minitues}
            style={{ height: 50, width: 120 }}
            onValueChange={(itemValue, itemIndex) => setMinitues(itemValue)}
          >
            {Array.from(Array(100).keys()).map((item) => (
              <SelectPicker.Item key={item} label={item} value={item} />
            ))}
          </SelectPicker>
        </View>
        <View style={styles.pickerBox}>
          <Text style={styles.slectName}>Seconds</Text>
          <SelectPicker
            selectedValue={seconds}
            style={{ height: 50, width: 120 }}
            onValueChange={(itemValue, itemIndex) => setSeconds(itemValue)}
          >
            {Array.from(Array(60).keys()).map((item) => (
              <SelectPicker.Item key={item} label={item} value={item} />
            ))}
          </SelectPicker>
        </View>
      </View>
    );
  };
  return (
    <Modal animationType="none" visible={modalVisible}>
      <Animated.View style={[styles.modalContainer, modalStyle]}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => goBack()}>
            <AntDesignIcon name="left" size={25} color="#3366CC" />
          </TouchableOpacity>
          <Text style={styles.modalHeaderText}>Repetitions</Text>
          <View></View>
        </View>
        <View style={styles.modalContent}>
          <View style={styles.selectContainer1}>
            <TouchableOpacity
              style={
                paceSelected === "slow"
                  ? styles.isSelectedBox
                  : styles.isntSelectedBox
              }
              onPress={() => setPaceSelected("slow")}
            >
              <Text
                style={
                  paceSelected === "slow"
                    ? styles.isSelectedText
                    : styles.isntSelectedText
                }
              >
                Slow
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                paceSelected === "steady"
                  ? styles.isSelectedBox
                  : styles.isntSelectedBox
              }
              onPress={() => setPaceSelected("steady")}
            >
              <Text
                style={
                  paceSelected === "steady"
                    ? styles.isSelectedText
                    : styles.isntSelectedText
                }
              >
                Steady
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                paceSelected === "fast"
                  ? styles.isSelectedBox
                  : styles.isntSelectedBox
              }
              onPress={() => setPaceSelected("fast")}
            >
              <Text
                style={
                  paceSelected === "fast"
                    ? styles.isSelectedText
                    : styles.isntSelectedText
                }
              >
                Fast
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.selectContainer2}>
            <TouchableOpacity
              style={
                isTimeSelected ? styles.isSelectedBox : styles.isntSelectedBox
              }
              onPress={() => setIsTimeSelected(true)}
            >
              <Text
                style={
                  isTimeSelected
                    ? styles.isSelectedText
                    : styles.isntSelectedText
                }
              >
                Time
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                isTimeSelected ? styles.isntSelectedBox : styles.isSelectedBox
              }
              onPress={() => setIsTimeSelected(false)}
            >
              <Text
                style={
                  isTimeSelected
                    ? styles.isntSelectedText
                    : styles.isSelectedText
                }
              >
                Distance
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {isTimeSelected ? <TimePicker /> : <DistancePicker />}
      </Animated.View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: Constants.statusBarHeight,
  },
  topContainer: {
    top: "0%",
    height: "7%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  cancelContainer: {
    left: "0%",
  },
  titleContainer: {
    position: "absolute",
    left: "42%",
    justifyContent: "flex-start",
  },
  saveContainer: {
    right: "-0%",
  },
  cancelText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3366CC",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  saveText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3366CC",
  },
  workOutNameBox: {
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderWidth: 0,
  },
  workOutItemBox: {
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderWidth: 0,
  },
  headlineBackground: {
    height: 40,
    width: "100%",
    backgroundColor: "#F0F8FF",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headlineText: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
  },
  content: {
    height: 60,
    backgroundColor: "white",
    marginTop: 10,
  },
  workoutNameContent: {
    height: 80,
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
  },
  optionContent: {
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
  },
  detailItem: {
    height: 50,
    borderColor: "white",
    flexDirection: "row",
    alignItems: "center",
  },
  detailItemText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
    marginLeft: 10,
  },
  input: {
    fontSize: 40,
  },
  modalContainer: {
    position: "absolute",
    marginTop: Constants.statusBarHeight,
    top: "0%",
    height: "100%",
    width: "100%",
    backgroundColor: "#F0F8FF",
  },
  modalHeader: {
    height: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginRight: "5%",
  },
  modalContent: {
    height: "50%",
    width: "100%",
    alignContent: "center",
    justifyContent: "center",
  },
  modalText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "black",
    marginHorizontal: "7%",
  },
  isSelectedText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#000033",
    marginHorizontal: "7%",
  },
  isntSelectedText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "gray",
    marginHorizontal: "7%",
  },
  pickerContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  selectContainer1: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  selectContainer2: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 100,
  },
  isSelectedBox: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
    width: "30%",
  },
  isntSelectedBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  pickerBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  slectName: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
    marginHorizontal: "7%",
  },
  deleteBotton: {
    position: "absolute",
    right: "-17%",
    width: "17%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
  deleteText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
});
