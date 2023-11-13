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
  Touchable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState, useRef } from "react";

import MapView, { Marker } from "react-native-maps";
import { Svg, Circle } from "react-native-svg";
import * as Location from "expo-location";
import { useAppContext } from "../../contexts/AppContext";
import { useActivityContext } from "../../contexts/ActivityContext";
import Map from "../../components/Map";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import FonttistoIcon from "react-native-vector-icons/Fontisto";
import FoundationIcon from "react-native-vector-icons/Foundation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FeatherIcon from "react-native-vector-icons/Feather";
import Constants from "expo-constants";
import AntDesignIcon from "react-native-vector-icons/AntDesign";

import * as ImagePicker from "expo-image-picker";
import { init } from "contextjs";
import { FIRESTORE_DB } from "../../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  where,
  query,
  doc,
} from "firebase/firestore";

export default function ResultReviewScreen({ route }) {
  const documentId = route.params.documentId;
  const [activity, setActivity] = useState({});
  const [resultItem, setResultItem] = useState({});
  const name = "ResultReview";
  const navigation = useNavigation();
  const { currentLocation, handleSetCurrentLocation } = useAppContext();
  const { time, pace, locationLog, calorie } = useActivityContext();
  class ResultReview {
    main() {
      return this.render();
    }
    async handleImagePicker() {
      await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissonResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        madiaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
      });

      if (!pickerResult.canceled) {
        setSelectedImage({ localUri: pickerResult.uri });
      }
    }
  }
}
