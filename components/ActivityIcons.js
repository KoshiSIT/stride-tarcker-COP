import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FoundationIcon from "react-native-vector-icons/Foundation";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import EntypoIcon from "react-native-vector-icons/Entypo";
const ActivityIcons = ({ activity, size }) => {
  if (activity === "Running") {
    return (
      <View style={styles.container}>
        <FontAwesome5Icon name="running" size={size} color="#000033" />
      </View>
    );
  } else if (activity === "Cycling") {
    return (
      <View style={styles.container}>
        <Ionicons name="bicycle" size={size} color="#000033" />
      </View>
    );
  } else if (activity === "Mountain Biking") {
    return (
      <View style={styles.container}>
        <MaterialCommunityIcons name="bicycle" size={size} color="#000033" />
      </View>
    );
  } else if (activity === "Walking") {
    return (
      <View style={styles.container}>
        <MaterialCommunityIcons name="walk" size={size} color="#000033" />
      </View>
    );
  } else if (activity === "Hiking") {
    return (
      <View style={styles.container}>
        <MaterialCommunityIcons name="hiking" size={size} color="#000033" />
      </View>
    );
  } else if (activity === "Downhill Skiing") {
    return (
      <View style={styles.container}>
        <MaterialCommunityIcons name="ski" size={size} color="#000033" />
      </View>
    );
  } else if (activity === "Swimming") {
    return (
      <View style={styles.container}>
        <FontAwesome5Icon name="swimmer" size={size} color="#000033" />
      </View>
    );
  } else if (activity === "Snowboarding") {
    return (
      <View style={styles.container}>
        <MaterialCommunityIcons name="snowboard" size={size} color="#000033" />
      </View>
    );
  } else if (activity === "Wheelchair") {
    return (
      <View style={styles.container}>
        <FoundationIcon name="wheelchair" size={size} color="#000033" />
      </View>
    );
  } else if (activity === "Rowing") {
    return (
      <View style={styles.container}>
        <MaterialIcons name="rowing" size={size} color="#000033" />
      </View>
    );
  } else if (activity === "Other") {
    return (
      <View style={styles.container}>
        <EntypoIcon name="dots-three-horizontal" size={size} color="#000033" />
      </View>
    );
  }
};

export default ActivityIcons;
