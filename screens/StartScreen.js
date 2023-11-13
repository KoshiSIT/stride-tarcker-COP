import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import Constants from "expo-constants";
import axios from "axios";

import * as Location from "expo-location";
import { Page1, Page2, Page3, Page4 } from "../components/start/RunSettings2";
import Map from "../components/Map";
import StopWatch from "../components/StopWatch";
import { useNavigation } from "@react-navigation/native";

import { useStartScreenContext } from "../contexts/StartScreenContext";
import { useAppContext } from "../contexts/AppContext";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FeatherIcon from "react-native-vector-icons/Feather";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

import { useContext } from "react";
import TranslationContext from "../translator/TranslationContext";

export default function StartScreen2({}) {
  const {
    translations: { StartScreenjs: translated },
  } = useContext(TranslationContext);
  const navigation = useNavigation();
  const { currentLocation, handleSetCurrentLocation } = useAppContext();
  const [showPopup, setShowPopup] = useState(false);
  const [activePageIndex, setActivePageIndex] = useState(0);
  const fadeAnim = useRef(
    new Animated.Value(Dimensions.get("window").height)
  ).current;
  const {
    stopWatchMode,
    handleStopWatchMode,
    selectedActivity,
    handleSelectActivity,
    withAudioGuide,
    handleWithAudioGuide,
    volume,
    handleVolumeChange,
  } = useStartScreenContext();
  const mapRef = useRef(null);

  class Start {
    main() {
      return this.render();
    }
    async getLocationPermisson() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        this.startLocationUpdates();
      }
    }
    async startLocationUpdates() {
      Location.watchPositionAsync(
        { accracy: Location.Accuracy.High, timeInterval: 1000 },
        (position) => {
          const { latitude, longitude } = position.coords;
          handleSetCurrentLocation({ latitude, longitude });
        }
      );
    }
    handleOpenPopup(index) {
      setActivePageIndex(index);
      setShowPopup(true);
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
    handleClosePopup() {
      setShowPopup(false);
      Animated.timing(fadeAnim, {
        toValue: Dimensions.get("window").height,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setShowPopup(false);
      });
    }
    handleStartRunOpen() {
      navigation.navigate("StartRun");
    }
    renderMap() {
      return <Map currentLocation={currentLocation}></Map>;
    }
    renderStopWatch() {
      return (
        <View style={styles.mainContainer}>
          <View style={{ top: "30%" }}>
            <StopWatch time={(time = 0)} />
          </View>
        </View>
      );
    }
    render() {
      return (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Settings");
              }}
              style={{ marginLeft: 15 }}
            >
              <FeatherIcon name="settings" size={30} color="black" />
            </TouchableOpacity>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>RunKeeper</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("StartRun");
              }}
              style={{ marginRight: 15 }}
            >
              <FeatherIcon name="plus" size={30} color="black" />
            </TouchableOpacity>
          </View>
          {showPopup && <View style={styles.overlay} />}
          {stopWatchMode
            ? this.renderStopWatch()
            : currentLocation && this.renderMap()}
          <View style={styles.buttonContainer}>
            <View style={styles.activityButton}>
              <TouchableOpacity
                onPress={() => this.handleOpenPopup(0)}
                style={styles.button}
              >
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons
                    name="shoe-sneaker"
                    size={30}
                    color="#000033"
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.buttonText}>{translated.activity}</Text>
                  <Text style={styles.buttonSubText}>{selectedActivity}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.workoutButton}>
              <TouchableOpacity
                onPress={() => this.handleOpenPopup(1)}
                style={styles.button}
              >
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons
                    name="clipboard-text-outline"
                    size={30}
                    color="#000033"
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.buttonText}>{translated.workout}</Text>
                  <Text style={styles.buttonSubText}>
                    {translated.points.replace("{count}", 15)}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.musicButton}>
              <TouchableOpacity
                onPress={() => this.handleOpenPopup(2)}
                style={styles.button}
              >
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons
                    name="music"
                    size={30}
                    color="#000033"
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.buttonText}>{translated.music}</Text>
                  <Text style={styles.buttonSubText}>{translated.without}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.soundguideButton}>
              <TouchableOpacity
                onPress={() => this.handleOpenPopup(3)}
                style={styles.button}
              >
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons
                    name="volume-high"
                    size={30}
                    color="#000033"
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.buttonText}>{translated.musicGuide}</Text>
                  <Text style={styles.buttonSubText}>
                    {withAudioGuide ? translated.with : translated.without}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => this.handleStartRunOpen()}
            style={styles.startButton}
          >
            <Text style={styles.startButtonText}>{translated.start}</Text>
          </TouchableOpacity>
          {showPopup && (
            <Animated.View
              style={[
                styles.popupScreen,
                { transform: [{ translateY: fadeAnim }] },
              ]}
            >
              <View style={styles.popupContainer}>
                <ScrollView
                  style={{ flex: 1 }}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  decelerationRate="fast"
                  snapToInterval={Dimensions.get("window").width * 0.9}
                  contentOffset={{
                    x: activePageIndex * Dimensions.get("window").width * 0.9,
                    y: 0,
                  }}
                  onMomentumScrollEnd={(event) => {
                    const contentOffsetX = event.nativeEvent.contentOffset.x;
                    const index = Math.round(
                      contentOffsetX / Dimensions.get("window").width
                    );
                    setActivePageIndex(index);
                  }}
                  scrollEventThrottle={200}
                >
                  <Page1
                    handleClosePopup={this.handleClosePopup}
                    stopWatchMode={stopWatchMode}
                    handleStopWatchMode={handleStopWatchMode}
                    selectedActivity={selectedActivity}
                    handleSelectActivity={handleSelectActivity}
                  />
                  <Page2 handleClosePopup={this.handleClosePopup} />
                  <Page3 handleClosePopup={this.handleClosePopup} />
                  <Page4
                    handleClosePopup={this.handleClosePopup}
                    withAudioGuide={withAudioGuide}
                    handleWithAudioGuide={handleWithAudioGuide}
                    volume={volume}
                    handleVolumeChange={handleVolumeChange}
                  />
                </ScrollView>
              </View>

              <View style={styles.dotContainer}>
                <View
                  style={[
                    styles.dot,
                    activePageIndex === 0 && styles.activeDot,
                  ]}
                />
                <View
                  style={[
                    styles.dot,
                    activePageIndex === 1 && styles.activeDot,
                  ]}
                />
                <View
                  style={[
                    styles.dot,
                    activePageIndex === 2 && styles.activeDot,
                  ]}
                />
                <View
                  style={[
                    styles.dot,
                    activePageIndex === 3 && styles.activeDot,
                  ]}
                />
              </View>
            </Animated.View>
          )}
        </View>
      );
    }
  }
  const st = new Start();
  useEffect(() => {
    st.getLocationPermisson();
  }, []);

  return st.main();
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 1,
  },
  mainContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
    top: "10%",
  },
  titleContainer: {
    height: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Constants.statusBarHeight,
  },
  buttonContainer: {
    position: "absolute",
    backgroundColor: "lightblue",
    alignItems: "center",
    bottom: "12%",
    top: "68%",
    right: "5%",
    left: "5%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  activityButton: {
    width: "50%",
    height: "50%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: "gray",
  },
  workoutButton: {
    width: "50%",
    height: "50%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
    borderColor: "gray",
  },
  musicButton: {
    width: "50%",
    height: "50%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: "gray",
  },
  soundguideButton: {
    width: "50%",
    height: "50%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderColor: "gray",
  },
  button: {
    flexDirection: "row",
  },
  iconContainer: {
    width: "20%",
  },
  textContainer: {
    width: "70%",
  },
  buttonText: {
    fontSize: 12,
    color: "#888888",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonSubText: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  startButton: {
    position: "absolute",
    backgroundColor: "#3366CC",
    width: "90%",
    height: "9%",
    top: "89%",
    bottom: "10%",
    left: "5%",
    right: "95%",
    borderRadius: 20,
    justifyContent: "center",
  },
  currentLocationButton: {
    position: "absolute",
    top: "60%",
    left: "80%",
    backgroundColor: "white",
    borderRadius: 30,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  startButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  popupScreen: {
    flex: 1,
    position: "absolute",
    bottom: "0%",
    left: "0%",
    right: "0%",
    top: "0%",
    zIndex: 2,
  },
  popupContainer: {
    flex: 1,
    position: "absolute",
    bottom: "5%",
    left: "5%",
    right: "5%",
    top: "5%",
    backgroundColor: "white",
    borderRadius: 30,
    overflow: "hidden",
  },
  dotContainer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    alignSelf: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "gray",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "white",
  },
});
