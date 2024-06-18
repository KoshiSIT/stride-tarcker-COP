import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import Constants from "expo-constants";
// icons lib
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import FeatherIcon from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import RNPickerSelect from "react-native-picker-select";
export const MemoModal = ({
  isModalVisible,
  setModalVisible,
  memo,
  setMemo,
  translated,
}) => {
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleCancel = () => {
    setModalVisible(false);
    setMemo("");
  };
  console.log(isModalVisible);
  return (
    <Modal
      isVisible={isModalVisible}
      style={styles.memoPopContainer}
      backdropOpacity={1}
    >
      <View style={styles.memoTitleContainer}>
        <TouchableOpacity onPress={handleCancel}>
          <Text style={styles.subText}>{translated.cancel}</Text>
        </TouchableOpacity>
        <Text style={styles.modalTitle}>{translated.notes}</Text>
        <TouchableOpacity onPress={toggleModal}>
          <Text style={styles.subText}>{translated.add}</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.modalInput}
        value={memo}
        onChangeText={(text) => {
          setMemo(text);
        }}
        multiline={true}
        numberOflines={10}
        secureTextEntry={false}
      />
    </Modal>
  );
};
export const Time = ({ time, translated }) => {
  return (
    <View style={styles.resultReviewItem1}>
      <Text style={styles.activityText}>time</Text>
      <Text style={styles.activityText}>{time}</Text>
    </View>
  );
};
export const Notes = ({ toggleModal, memoHeight, memo, translated }) => {
  return (
    <TouchableOpacity
      style={[styles.memoContainer, { height: memoHeight(memo) }]}
      onPress={toggleModal}
    >
      <View style={styles.resultReviewItem1}>
        <MaterialCommunityIcons
          name="clipboard-text-outline"
          size={30}
          color="black"
        />
        <View style={{ alignItems: "start" }}>
          <Text style={styles.activityText}>{translated.notes}</Text>
          <Text style={{ color: "gray", marginLeft: 8 }}>
            {memo.length === 0 ? translated.withoutNotes : memo}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export const Name = ({
  activityName,
  handleActivityName,
  translated,
  textInputRef,
}) => {
  return (
    <TouchableOpacity
      style={styles.activityContainer}
      onPress={() => handleActivityName()}
    >
      <Text style={styles.activityText}>{translated.Name}</Text>
      <TextInput
        style={styles.input}
        value={activityName}
        onChangeText={(text) => {
          setActivityName(text);
        }}
        secureTextEntry={false}
        ref={textInputRef}
      />
    </TouchableOpacity>
  );
};
export const Bpm = ({ translated, bpm, setBpm }) => {
  return (
    <View style={styles.aveHeartRateContainer}>
      <View style={styles.resultReviewItem1}>
        <FontAwesomeIcon name="heartbeat" size={30} color="black" />
        <Text style={styles.activityText}>{translated.AvgHeartRate}</Text>
      </View>
      <View style={styles.resultReviewItem2}>
        <TextInput
          placeholder="0"
          style={styles.subText}
          value={bpm}
          onChangeText={(text) => {
            setBpm(text);
          }}
          keyboardType="numeric"
        />
        <Text style={styles.subText}> bpm</Text>
      </View>
    </View>
  );
};
export const Shoes = ({ translated }) => {
  return (
    <View style={styles.shoeTrackerContainer}>
      <View style={styles.resultReviewItem1}>
        <MaterialCommunityIcons name="shoe-sneaker" size={30} color="black" />
        <Text style={styles.activityText}>shoes tracker</Text>
      </View>
    </View>
  );
};
export const Execise = ({ translated }) => {
  return (
    <View style={styles.workTogetherContainer}>
      <View style={styles.resultReviewItem1}>
        <MaterialCommunityIcons
          name="account-group-outline"
          size={30}
          color="black"
        />
        <Text style={styles.activityText}>{translated.Iexercisedwith}</Text>
      </View>
      <View style={styles.resultReviewItem2}>
        <AntDesignIcon name="right" size={20} color="lightgray" />
      </View>
    </View>
  );
};
export const Distance = ({}) => {
  return <View></View>;
};
export const Calorie = ({}) => {
  return <View></View>;
};
export const Activity = ({}) => {
  return <View></View>;
};
export const DateTime = ({}) => {
  return <View></View>;
};
export const MoreDetails = ({}) => {
  return <View></View>;
};
export const Maps = ({ mapItems, mapSelected, setMapSelected, translated }) => {
  return (
    <View>
      <RNPickerSelect
        items={mapItems}
        onValueChange={(value) => {
          setMapSelected(value);
        }}
        value={mapSelected}
        placeholder={{}}
      >
        <View style={styles.mapContainer}>
          <View style={styles.resultReviewItem1}>
            <AntDesignIcon name="unlock" size={30} color="black" />
            <Text style={styles.activityText}>{translated.Maps}</Text>
          </View>
          <View style={styles.resultReviewItem2}>
            <Text style={styles.subText}>{mapSelected}</Text>
          </View>
        </View>
      </RNPickerSelect>
    </View>
  );
};

const styles = StyleSheet.create({
  memoPopContainer: {
    margin: 0,
    backgroundColor: "white",
    justifyContent: "flex-start",
    paddingTop: Constants.statusBarHeight,
  },
  memoTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginRight: 25,
  },
  subText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000033",
  },
  modalInput: {
    fontSize: 16,
  },
  memoContainer: {
    borderWidth: 1,
    borderColor: "#F5F5F5",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    height: 60,
  },
  activityText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "black",
    marginLeft: 10,
  },
  resultReviewItem1: {
    flexDirection: "row",
    alignItems: "center",
  },
  resultReviewItem2: {
    flexDirection: "row",
    alignItems: "center",
  },
  mapContainer: {
    height: 60,
    borderWidth: 1,
    borderColor: "#F5F5F5",
    justifyContent: "space-between",
    flexDirection: "row",
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
});
