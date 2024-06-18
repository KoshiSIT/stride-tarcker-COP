import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  Animated,
  Switch,
} from "react-native";
import { Picker as SelectPicker } from "@react-native-picker/picker";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState, useContext } from "react";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
windowWidth = Dimensions.get("window").width;
windowHeight = Dimensions.get("window").height;
export function RepeatOption({
  repeatTimes,
  setRepeatTimes,
  translated,
  disabled,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const handleToggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.optionItemEnabled}>
      <TouchableOpacity
        style={styles.optionItem}
        onPress={disabled ? () => {} : () => handleToggleModal()}
      >
        <Text style={styles.optionItemText}>{translated.repeats}</Text>
        <Text style={{ fontSize: 17, fontWeight: "bold", color: "#000033" }}>
          {translated.repeatsTimes.replace("{count}", repeatTimes)}
        </Text>
      </TouchableOpacity>
      <RepeatsModal
        modalVisible={modalVisible}
        handleToggleModal={handleToggleModal}
        setRepeatTimes={setRepeatTimes}
        repeatTimes={repeatTimes}
      />
    </View>
  );
}
export function WarmUpOption({
  withWarmUp,
  handleWithWarmUp,
  switchDisabled,
  translated,
}) {
  return (
    <View
      style={
        switchDisabled ? styles.optionItemDisabled : styles.optionItemEnabled
      }
    >
      <Text style={styles.optionItemText}>{translated.warmUp}</Text>
      <Switch
        value={withWarmUp}
        onValueChange={handleWithWarmUp}
        trackColor={{ false: "#767577", true: "#20B2AA" }}
        thumbColor={withWarmUp ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        disabled={switchDisabled}
      />
    </View>
  );
}
export function CoolDownOption({
  withCoolDown,
  handleWithCoolDown,
  switchDisabled,
  translated,
}) {
  return (
    <View
      style={
        switchDisabled ? styles.optionItemDisabled : styles.optionItemEnabled
      }
    >
      <Text style={styles.optionItemText}>{translated.coolDown}</Text>
      <Switch
        value={withCoolDown}
        onValueChange={handleWithCoolDown}
        trackColor={{ false: "#767577", true: "#20B2AA" }}
        thumbColor={withCoolDown ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        disabled={switchDisabled}
      />
    </View>
  );
}
function RepeatsModal({
  modalVisible,
  handleToggleModal,
  setRepeatTimes,
  repeatTimes,
}) {
  const [modalAnimation] = useState(new Animated.Value(windowWidth));
  const [modalValue, setModalValue] = useState(0);
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

  const modalStyle = {
    transform: [{ translateX: modalAnimation }],
  };
  const goBack = () => {
    console.log("go back");
    handleToggleModal();
    setRepeatTimes(modalValue);
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
          <Text style={styles.modalText}>
            Select the number of times you would like this Training Workout to
            repeat
          </Text>
        </View>
        <View style={styles.pickerContainer}>
          <SelectPicker
            selectedValue={modalValue}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => setModalValue(itemValue)}
          >
            {Array.from(Array(100).keys()).map((item) => (
              <SelectPicker.Item key={item} label={item} value={item} />
            ))}
          </SelectPicker>
        </View>
      </Animated.View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  optionItemDisabled: {
    height: 50,
    borderWidth: 1,
    borderColor: "lightgray",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    opacity: 0.5,
  },
  optionItemEnabled: {
    height: 50,
    borderWidth: 1,
    borderColor: "lightgray",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  optionItemText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },
  optionItem: {
    height: "100%",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
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
    color: "black",
    marginHorizontal: "7%",
  },
  pickerContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
