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
import React, { useEffect, useState, useRef, useContext } from "react";

import { useAppContext } from "../../contexts/AppContext";
import { useActivityContext } from "../../contexts/ActivityContext";
import TranslationContext from "../../translator/TranslationContext";
import Map from "../../components/Map";
// icons lib
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import FonttistoIcon from "react-native-vector-icons/Fontisto";
import FoundationIcon from "react-native-vector-icons/Foundation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FeatherIcon from "react-native-vector-icons/Feather";
import Constants from "expo-constants";
import AntDesignIcon from "react-native-vector-icons/AntDesign";

import * as Date from "../../functions/Date";
import * as ImagePicker from "expo-image-picker";
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
  const [selectedImage, setSelectedImage] = useState(null);
  const [resultItem, setResultItem] = useState([]);
  const name = "ResultReview";
  const navigation = useNavigation();
  const { currentLocation, handleSetCurrentLocation } = useAppContext();
  const [pictureIndex, setPictureIndex] = useState(0);
  const {
    translations: { ResultReviewScreenjs: translated },
  } = useContext(TranslationContext);
  const handleSetReultItem = (item) => {
    console.log(item);
    setResultItem(item);
  };
  const handleImagePick = async () => {
    const permissonResult =
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
  };
  useEffect(() => {
    let documentId = null;
    try {
      documentId = route.params.documentId;
    } catch (e) {
      console.log(e);
    }
    if (documentId) {
      console.log("docmuentId: " + documentId);
      const activitiesRef = doc(FIRESTORE_DB, "stride-tracker_DB", documentId);

      const subscriber = onSnapshot(activitiesRef, {
        next: (snapshot) => {
          const data = snapshot.data();
          if (snapshot.exists()) {
            console.log("Document dataaaaaaaaaaaaaaa:", data);
            handleSetReultItem(data);
          } else {
            console.log("No such document!");
          }
        },
      });
      return () => subscriber();
    }
  }, []);
  console.log(resultItem.locationLog);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Community");
          }}
        >
          <FontAwesomeIcon name="chevron-left" size={30} color="black" />
        </TouchableOpacity>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          {translated.summary}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("StartRun");
          }}
        >
          <FeatherIcon name="share" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.mainContainer}>
        <View style={styles.activityContainer}>
          <View style={styles.resultItem1}>
            <FontAwesome5Icon name="walking" size={30} color="black" />
            <Text style={styles.activityText}>
              {Date.formatDate(resultItem.datetime)}
            </Text>
          </View>
        </View>
        <View style={styles.pictureContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            style={styles.pictureScroll}
            scrollEnabled={selectedImage !== null}
            onMomentumScrollEnd={(event) => {
              const contentOffsetx = event.nativeEvent.contentOffset.x;
              const index = Math.floor(
                (contentOffsetx * 2) / Dimensions.get("window").width
              );
              setPictureIndex(index);
            }}
          >
            {resultItem && (
              <Map parentName={name} locationLog={resultItem.locationLog} />
            )}
            {selectedImage !== null && (
              <View style={styles.pictureItem}>
                <Image
                  source={{ uri: selectedImage.localUri }}
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
            )}
          </ScrollView>
          <View style={styles.pictureContainerBottom}>
            <View></View>
            {selectedImage !== null ? (
              <View style={styles.dotContainer}>
                <View
                  style={[styles.dot, pictureIndex === 0 && styles.activeDot]}
                ></View>
                <View
                  style={[styles.dot, pictureIndex === 1 && styles.activeDot]}
                ></View>
              </View>
            ) : (
              <View></View>
            )}
            <View style={styles.Circle}>
              <TouchableOpacity onPress={() => handleImagePick()}>
                <MaterialCommunityIcons
                  name="camera-outline"
                  size={30}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.dataContainer}>
          <View style={styles.dataSubItem}>
            <Text style={{ fontSize: 20 }}>
              {Date.formatNumber(resultItem.time)}
            </Text>
            <Text>{translated.time}</Text>
          </View>
          <View style={styles.dataSubItem}>
            <Text style={{ fontSize: 20 }}>{resultItem.calorie}</Text>
            <Text>{translated.calories}</Text>
          </View>
        </View>
        <View style={styles.splitContainer}>
          <View style={styles.resultItem1}>
            <FonttistoIcon name="clock" size={30} color="black" />
            <Text style={styles.activityText}>{translated.splits}</Text>
          </View>
          <View style={styles.resultItem2}>
            <AntDesignIcon name="right" size={20} color="gray" />
          </View>
        </View>
        <View style={styles.analysisContainer}>
          <View style={styles.resultItem1}>
            <FoundationIcon name="graph-trend" size={30} color="black" />
            <Text style={styles.activityText}>{translated.charts}</Text>
          </View>
          <View style={styles.resultItem2}>
            <AntDesignIcon name="right" size={20} color="gray" />
          </View>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.activityText}>{translated.moreDetails}</Text>
        </View>
        <View style={styles.memoContainer}>
          <View style={styles.resultItem1}>
            <MaterialCommunityIcons
              name="clipboard-text-outline"
              size={30}
              color="black"
            />
            <Text style={styles.activityText}>{translated.notes}</Text>
          </View>
        </View>
        <View style={styles.weatherContainer}>
          <View style={styles.resultItem1}>
            <FeatherIcon name="sun" size={30} color="black" />
            <Text style={styles.activityText}>
              {translated.HowWasTheWeather}
            </Text>
          </View>
          <View style={styles.resultItem2}>
            <AntDesignIcon name="right" size={20} color="gray" />
          </View>
        </View>
        <View style={styles.shoeTrackerContainer}>
          <View style={styles.resultItem1}>
            <MaterialCommunityIcons
              name="shoe-sneaker"
              size={30}
              color="black"
            />
            <Text style={styles.activityText}>shoes tracker</Text>
          </View>
          <View style={styles.resultItem2}>
            <AntDesignIcon name="right" size={20} color="gray" />
          </View>
        </View>
        <View style={styles.workTogetherContainer}>
          <View style={styles.resultItem1}>
            <MaterialCommunityIcons
              name="account-group-outline"
              size={30}
              color="black"
            />
            <Text style={styles.activityText}>{translated.Iexercisedwith}</Text>
          </View>
          <View style={styles.resultItem2}>
            <AntDesignIcon name="right" size={20} color="gray" />
          </View>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            navigation.navigate("ResultUpdate", {
              documentId: route.params.documentId,
            });
          }}
        >
          <Text style={styles.editButtonText}>{translated.edit}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
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
  resultItem1: {
    flexDirection: "row",
    alignItems: "center",
  },
  resultItem2: {},
  titleContainer: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 10,
  },
  dataContainer: {
    height: 60,
    borderWidth: 1,
    borderColor: "#F5F5F5",
    flexDirection: "row",
    alignItems: "center",
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
    justifyContent: "center",
  },
  pictureContainer: {
    height: 300,
    borderWidth: 1,
    borderColor: "#F5F5F5",
  },
  pictureContainerBottom: {
    position: "absolute",
    top: 250,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  splitContainer: {
    height: 60,
    borderWidth: 1,
    borderColor: "#F5F5F5",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  analysisContainer: {
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
  memoContainer: {
    height: 60,
    borderWidth: 1,
    borderColor: "#F5F5F5",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  weatherContainer: {
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
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  workTogetherContainer: {
    height: 60,
    borderWidth: 1,
    borderColor: "#F5F5F5",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 20,
    width: 50,
    height: 15,
    backgroundColor: "white",
    borderRadius: 10,
  },
  activityText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "black",
    marginLeft: 10,
  },
  editButton: {
    height: 50,
    borderRadius: 20,
    justifyContent: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#3366CC",
  },
  editButtonText: {
    color: "#3366CC",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  map: {
    height: "100%",
    width: Dimensions.get("window").width,
  },
  pictureItem: {
    height: "100%",
    width: Dimensions.get("window").width,
  },
  pictureScroll: {
    height: "100%",
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "lightgray",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "gray",
  },
  Circle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
