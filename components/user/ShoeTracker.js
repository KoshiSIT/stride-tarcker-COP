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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useContext } from "react";
import { TranslationContext } from "../../translator";
const ShoeTracker = () => {
  const {
    translations: { ShoeTrackerjs: translated },
  } = useContext(TranslationContext);

  return (
    <View style={styles.box}>
      <View style={styles.headlineBackground}>
        <Text style={styles.headlineText}>{translated.shoeTracker}</Text>
      </View>
      <TouchableOpacity style={styles.content}>
        <MaterialCommunityIcons name="shoe-sneaker" size={30} color="black" />
        <View
          style={{
            justifyContent: "center",
            alignItems: "left",
            marginLeft: 10,
          }}
        >
          <Text style={styles.contentText}>{translated.pleaseUseTracker}</Text>
          <Text style={{ fontSize: 15, color: "#888888" }}>
            {translated.startShoeTracker}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ShoeTracker;

const styles = StyleSheet.create({
  box: {
    height: 90,
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderWidth: 0,
  },
  headlineBackground: {
    height: 25,
    width: "100%",
    backgroundColor: "lightgray",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  headlineText: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
    marginLeft: 5,
  },
  content: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
  },
  contentText: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
  },
});
