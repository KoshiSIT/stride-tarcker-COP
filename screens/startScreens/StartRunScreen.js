import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaViecationlogw,
  TouchableOpacity,
  Animated,
  ScrollView,
  Dimensions,
  Touchable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../../contexts/AppContext";
import { useActivityContext } from "../../contexts/ActivityContext";
//  translation lib
import { useStartScreenContext } from "../../contexts/StartScreenContext";
import TranslationContext from "../../translator/TranslationContext";
import React, { useEffect, useState, useRef, useContext } from "react";
import Constants from "expo-constants";
import * as Speech from "expo-speech";
import * as Location from "expo-location";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
// components lib
import StopWatch from "../../components/StopWatch";
import Map from "../../components/Map";
import * as Run from "../../functions/Run";

export default function StartRunScreen({}) {
  const [withPause, setWithPause] = useState(true);
  const navigation = useNavigation();
  const { stopWatchMode, handleStopWatchMode, withAudioGuide, volume } =
    useStartScreenContext();
  const {
    time,
    handleSetTime,
    pace,
    handleSetPace,
    handleSetTotalDistance,
    locationLog,
    handleSetLocationLog,
    handleSetCalorie,
    resetAllState,
  } = useActivityContext();
  const { currentLocation, handleSetCurrentLocation, weight, language } =
    useAppContext();
  const [initialPosition, setInitialPosition] = useState(null);
  const [currentPace, setCurrentPace] = useState(0);
  const [movingdistance, setMovingDistance] = useState(0);
  const [buttonContainerFlex, setButtonContainerFlex] = useState(2);
  const animatedButtonContainerFlex = new Animated.Value(buttonContainerFlex);
  const scrollViewRef = useRef(null);
  const {
    translations: { StartRunScreenjs: translated },
  } = useContext(TranslationContext);

  class StartRun {
    constructor() {
      this.name = "StartRun";
    }
    main() {
      return this.render();
    }
    render() {
      return (
        <View style={styles.container}>
          <ScrollView
            style={{ flex: 1 }}
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            contentOffset={{ x: Dimensions.get("window").width, y: 0 }}
          >
            <View style={styles.mapContainer}>
              <Map
                parentName={this.name}
                scrollViewRef={scrollViewRef}
                currentLocation={currentLocation}
                handleSetCurrentLocation={handleSetCurrentLocation}
                initialPosition={initialPosition}
                setInitialPosition={setInitialPosition}
                locationLog={locationLog}
                handleSetLocationLog={handleSetLocationLog}
              />
            </View>
            {this.renderMain()}
            <View style={styles.runLogContainer}>
              <View style={styles.top3Container}>
                <View style={styles.leftContainer}>
                  <Text
                    style={{
                      fontSize: 40,
                      fontWeight: "bold",
                      color: "#000033",
                    }}
                  >
                    {this.formatTime(time)}
                  </Text>
                  <Text style={{ fontSize: 15 }}>{translated.Time}</Text>
                </View>
                <View style={styles.rightContainer}>
                  <Text
                    style={{
                      fontSize: 40,
                      fontWeight: "bold",
                      color: "#000033",
                    }}
                  >
                    {pace.toFixed(2)}
                  </Text>
                  <Text style={{ fontSize: 10 }}>{translated.AVGPace}</Text>
                </View>
              </View>
              <View style={styles.activityContainer}>
                <View style={styles.activityContainerItem1}>
                  <Text style={styles.activityText}>
                    {translated.Currentkm.replace(
                      "{count}",
                      this.formatTime(time)
                    )}
                  </Text>
                </View>
                <View style={styles.activityContainerItem2}>
                  <Text style={styles.activityText}>
                    {translated.kmPace.replace(
                      "{count}",
                      currentPace.toFixed(2)
                    )}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }
    renderMain() {
      return (
        <View>
          {stopWatchMode ? (
            <View style={styles.timerContainer}>
              <View style={styles.timerTextContainer}>
                <Text style={styles.timerText}>{this.formatTime(time)}</Text>
              </View>
              <StopWatch time={time} />
              <Animated.View
                style={[
                  styles.buttonContainer,
                  { flex: animatedButtonContainerFlex },
                ]}
              >
                {withPause ? (
                  this.renderStopBUtton()
                ) : (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <View style={{ margin: 10 }}>
                      {this.renderReStartButton()}
                    </View>
                    <View style={{ margin: 10 }}>
                      {this.renderExitButton()}
                    </View>
                  </View>
                )}
              </Animated.View>
            </View>
          ) : (
            <View style={styles.timerContainer}>
              <View style={styles.topContainer}>
                <Text style={styles.timerText}>{this.formatTime(time)}</Text>
                <Text style={{ fontSize: 15 }}>{translated.Time}</Text>
              </View>
              <View style={styles.centerContainer}>
                <Text
                  style={{ fontSize: 70, fontWeight: "bold", color: "#000033" }}
                >
                  {movingdistance.toFixed(2)}
                </Text>
                <Text style={{ fontSize: 20 }}>{translated.Kilometer}</Text>
              </View>
              <View style={styles.bottomContainer}>
                <View style={styles.leftContainer}>
                  <Text
                    style={{
                      fontSize: 40,
                      fontWeight: "bold",
                      color: "#000033",
                    }}
                  >
                    {currentPace.toFixed(2)}
                  </Text>
                  <Text style={{ fontSize: 10 }}>{translated.CurrentPace}</Text>
                </View>
                <View style={styles.rightContainer}>
                  <Text
                    style={{
                      fontSize: 40,
                      fontWeight: "bold",
                      color: "#000033",
                    }}
                  >
                    {pace.toFixed(2)}
                  </Text>
                  <Text style={{ fontSize: 10 }}>{translated.AVGPace}</Text>
                </View>
              </View>
              <Animated.View
                style={[
                  styles.buttonContainer,
                  { flex: animatedButtonContainerFlex },
                ]}
              >
                {withPause ? (
                  this.renderStopBUtton()
                ) : (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <View style={{ margin: 10 }}>
                      {this.renderReStartButton()}
                    </View>
                    <View style={{ margin: 10 }}>
                      {this.renderExitButton()}
                    </View>
                  </View>
                )}
              </Animated.View>
            </View>
          )}
        </View>
      );
    }
    renderStopBUtton() {
      return (
        <TouchableOpacity onPress={() => this.handleStartStop()}>
          <FontAwesome5Icon name="pause-circle" size={80} color="#3366CC" />
        </TouchableOpacity>
      );
    }
    renderReStartButton() {
      return (
        <TouchableOpacity onPress={() => this.handleStartStop()}>
          <FontAwesome5Icon name="play-circle" size={80} color="#30F9B2" />
        </TouchableOpacity>
      );
    }
    renderExitButton() {
      return (
        <TouchableOpacity onPress={() => this.handleResultOpen()}>
          <FontAwesome5Icon name="stop-circle" size={80} color="#FF3300" />
        </TouchableOpacity>
      );
    }
    formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
      )}`;
    }
    handleStartStop() {
      setWithPause((withPause) => !withPause);
      setButtonContainerFlex((prevFlex) => (prevFlex === 2 ? 3 : 2));
    }
    handleResultOpen() {
      handleSetCalorie(Run.getCalorie(weight, movingdistance, pace));
      handleSetTotalDistance(movingdistance);
      navigation.navigate("Result");
      console.log(volume);
      if (withAudioGuide) {
        speakText("アクティビティを終了します。", language, volume);
      }
    }
    async getLocationPermission() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        this.startLocationUpdates();
      }
    }
    async startLocationUpdates() {
      Location.watchPositionAsync(
        Location.watchPositionAsync(
          { accuracy: Location.Accuracy.High, timeInterval: 1000 },
          (position) => {
            const { latitude, longitude } = position.coords;
            if (!initialPosition) {
              setInitialPosition({ latitude, longitude });
            }
            handleSetCurrentLocation({ latitude, longitude });
          }
        )
      );
    }
    speakText = (text, language, volume) => {
      const languageCode = {
        日本語: "ja",
        English: "en",
      };
      Speech.speak(text, {
        language: languageCode[language],
        volume: volume / 100,
      });
    };
  }
  const sr = new StartRun();
  useEffect(() => {
    sr.getLocationPermission();
    console.log(
      "initialPositionnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn"
    );
    console.log(currentLocation);
    console.log("currentLocationEnd");
    resetAllState();
    console.log(locationLog);
    handleSetLocationLog((locationLog) => [...locationLog, currentLocation]);
    console.log(volume);
    if (withAudioGuide) {
      sr.speakText("アクティビティを開始します。", language, volume);
    }
  }, []);

  useEffect(() => {
    let timerInterval = null;
    if (withPause) {
      timerInterval = setInterval(() => {
        handleSetTime((time) => time + 1);
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }

    return () => clearInterval(timerInterval);
  }, [withPause]);
  useEffect(() => {
    const toValue = buttonContainerFlex === 2 ? 3 : 2;
    Animated.timing(animatedButtonContainerFlex, {
      toValue: toValue,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [buttonContainerFlex]);
  useEffect(() => {
    if (time !== 0 && time % 180 === 0) {
      handleSetLocationLog((locationLog) => {
        // 新しいlocationLogの値を計算
        let newLocationLog = [];
        if (movingdistance !== 0) {
          newLocationLog = [...locationLog, currentLocation];
        } else {
          newLocationLog = [
            ...locationLog,
            {
              latitude: currentLocation.latitude + 0.0005,
              longitude: currentLocation.longitude + 0.0005,
            },
          ];
        }
        // 新しいlocationLogの値を使って他の計算を行う
        //console.log(newLocationLog);
        /*
            for (let i=0; i<newLocationLog.length; i++){
                console.log(`latitude:${newLocationLog[i].latitude}`);
                console.log(`longitude:${newLocationLog[i].longitude}`);
            }
            */
        const distanceIn3min = Run.getDistanceBetweenPoints(
          currentLocation.latitude,
          currentLocation.longitude,
          newLocationLog[newLocationLog.length - 1].latitude,
          newLocationLog[newLocationLog.length - 1].longitude
        );
        setMovingDistance((movingdistance) => movingdistance + distanceIn3min);
        setCurrentPace(Run.getPace(distanceIn3min, 180));

        return newLocationLog;
      });
    }
  }, [time]);
  return sr.main();
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: Constants.statusBarHeight,
  },
  mapContainer: {
    width: Dimensions.get("window").width,
    height: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "gray",
  },
  timerContainer: {
    width: Dimensions.get("window").width,
    height: "100%",
    flex: 1,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "gray",
  },
  timerTextContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  runLogContainer: {
    width: Dimensions.get("window").width,
    height: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "gray",
  },
  topContainer: {
    flex: 2,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
  top3Container: {
    flex: 2,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "gray",
    flexDirection: "row",
  },
  activityContainer: {
    flex: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "gray",
  },
  centerContainer: {
    flex: 3,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    flex: 2,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "gray",
    flexDirection: "row",
  },
  buttonContainer: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
  leftContainer: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
  rightContainer: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#3366CC",
  },
  titleText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },
  saveText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#3366CC",
  },
  timerText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#000033",
  },
  activityText: {
    fontSize: 20,
    color: "#000033",
  },
  activityContainerItem1: {
    width: "100%",
    height: "10%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  activityContainerItem2: {
    width: "100%",
    height: "10%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D7EEFF",
  },
});
