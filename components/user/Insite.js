import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import { useContext } from "react";
import { TranslationContext } from "../../translator";
const Insite = ({ totalActivitiesCount }) => {
  const {
    translations: { Insitejs: translated },
  } = useContext(TranslationContext);

  return (
    <View style={styles.box}>
      <View style={styles.headlineBackground}>
        <Text style={styles.headlineText}>{translated.insights}</Text>
        <Text style={styles.leftHeadlineText}>
          {translated.totalKilometers.replace("{count}", 1)}
        </Text>
      </View>
      <TouchableOpacity style={styles.content}>
        <Fontisto name="bar-chart" size={20} color="gray" />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 10,
          }}
        >
          <Text style={styles.contentText}>{translated.viewPastData}</Text>
          <Text style={{ fontSize: 15, color: "#888888" }}>
            {translated.analyzeActivity.replace(
              "{count}",
              totalActivitiesCount
            )}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Insite;

const styles = StyleSheet.create({
  box: {
    height: 90,
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderWidth: 0,
  },
  headlineBackground: {
    height: 30,
    width: "100%",
    backgroundColor: "lightgray",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  headlineText: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
    marginLeft: 5,
  },
  leftHeadlineText: {
    marginRight: 5,
  },
  content: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  contentText: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
  },
});
