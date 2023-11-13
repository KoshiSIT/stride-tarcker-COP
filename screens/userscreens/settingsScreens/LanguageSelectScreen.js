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
import { useStartScreenContext } from "../../../contexts/StartScreenContext";
import React, { useContext, useEffect, useState } from "react";
import Constants from "expo-constants";
import axios from "axios";

import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import { TranslationContext } from "../../../translator";
export default function LanguageSelectScreen({}) {
  const {
    translations: { LanguageSelectScreen: translated },
    setLanguage,
  } = useContext(TranslationContext);

  const navigation = useNavigation();
  const handleCancel = () => {
    navigation.goBack();
  };
  handleSetLanguage = (language) => {
    setLanguage(language);
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.cancelContainer}>
          <TouchableOpacity onPress={() => handleCancel()}>
            <FontAwesomeIcon name="chevron-left" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.titleText}>{translated.language}</Text>
        <View></View>
      </View>
      <ScrollView style={{ marginTop: 30 }}>
        <TouchableOpacity
          style={styles.selectItemContainer}
          onPress={() => handleSetLanguage("en")}
        >
          <View style={styles.selectSubContainer}>
            <Text style={styles.detailItemText}>English(US)</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.selectItemContainer}
          onPress={() => handleSetLanguage("ja")}
        >
          <View style={styles.selectSubContainer}>
            <Text style={styles.detailItemText}>日本語</Text>
          </View>
        </TouchableOpacity>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    backgroundColor: "white",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  cancelContainer: {},
  titleContainer: {
    right: "100%",
  },
  selectItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  selectSubContainer: {
    flexDirection: "row",
    justifyContent: "cneter",
    alignItems: "center",
  },
  subContainer: {
    height: 35,
    justifyContent: "center",
  },
  activityText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "black",
    marginLeft: 10,
  },
  detailItemText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  detailItem: {
    height: 60,
    borderWidth: 1,
    borderColor: "lightgray",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
  },
  optionItem1: {},
  optionItem2: {
    flexDirection: "row",
  },
  detailItemText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  optionText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000033",
  },
  optionTitleText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },
});
