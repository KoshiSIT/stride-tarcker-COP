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
import React, { useEffect, useState, useRef, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../../contexts/AppContext";
import { useActivityContext } from "../../contexts/ActivityContext";
import { useWorkoutContext } from "../../contexts/WorkoutContext";
//  translation lib
import { useStartScreenContext } from "../../contexts/StartScreenContext";
import TranslationContext from "../../translator/TranslationContext";
import Constants from "expo-constants";
//icons lib
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
// components lib
import StopWatch from "../../components/StopWatch";
import Map from "../../components/Map";
// functions
import Run from "../../functions/Run";
import Geolocation from "../../functions/Geolocation";
import ExpoSpeech from "../../functions/ExpoSpeech";
// cop
import {
  backgroundLayer,
  stopWatchModeLayer,
  pauseLayer,
} from "../../cop/LayerDefinition.js";
// import { withLayersZone } from "../../context-zone/contextZone.js";
import { withLayers } from "contextjs";
import { withLayersZone } from "../../context-zone/contextZone.js";
/** @jsxImportSource "../../../node_modules/react */
export default function StartRunScreen({}) {
  const [withPause, setWithPause] = useState(true);
  const navigation = useNavigation();
  const {
    stopWatchMode,
    selectedActivity,
    handleStopWatchMode,
    withAudioGuide,
    volume,
  } = useStartScreenContext();
  const {
    withWorkout,
    workoutDetails,
    withRepeat,
    repeatTimes,
    withWarmUp,
    withCoolDown,
  } = useWorkoutContext();
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
  const {
    appState,
    currentLocation,
    handleSetCurrentLocation,
    weight,
    language,
  } = useAppContext();
  const [initialPosition, setInitialPosition] = useState(null);
  const [currentPace, setCurrentPace] = useState(0);
  const [movingdistance, setMovingDistance] = useState(0);
  const [buttonContainerFlex, setButtonContainerFlex] = useState(2);
  const animatedButtonContainerFlex = new Animated.Value(buttonContainerFlex);
  const scrollViewRef = useRef(null);
  const {
    translations: { StartRunScreenjs: translated },
  } = useContext(TranslationContext);
  const gl = new Geolocation(handleSetCurrentLocation);
  const sp = new ExpoSpeech(language, 0.5);
  console.log(selectedActivity);

  class StartRun {
    constructor() {
      this.name = "StartRun";
    }
    main() {
      console.log("rendering");
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
            {this.renderMap()}
            {this.renderMain()}
            {this.renderWorkout()}
          </ScrollView>
        </View>
      );
    }
    renderMain() {
      return (
        <View>
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
            {this.renderButtom(withPause)}
          </View>
        </View>
      );
    }
    renderButtom(withPause) {
      console.log(withPause);
      return (
        <Animated.View
          style={[
            styles.buttonContainer,
            { flex: animatedButtonContainerFlex },
          ]}
        >
          {this.renderStopButton()}
        </Animated.View>
      );
    }
    renderMap() {
      return (
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
      );
    }
    renderWorkout() {
      return (
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
                {translated.Currentkm.replace("{count}", this.formatTime(time))}
              </Text>
            </View>
            {this.renderWorkoutDetail()}
          </View>
        </View>
      );
    }
    renderWorkoutDetail() {
      return (
        <ScrollView>
          {withWorkout ? (
            <View>
              {withWarmUp && (
                <View style={styles.workoutDetailItem}>
                  <View style={styles.workoutDetailItem1}>
                    <Text style={styles.activityText}>5:00</Text>
                    <Text style={styles.activityText}>{translated.warmUp}</Text>
                  </View>
                  <View></View>
                </View>
              )}
              {workoutDetails.map((item, index) =>
                Array.from({ length: repeatTimes }, () => item).map((item) =>
                  this.renderWorkoutDetailItem(item)
                )
              )}
              {withCoolDown && (
                <View style={styles.workoutDetailItem}>
                  <View style={styles.workoutDetailItem1}>
                    <Text style={styles.activityText}>5:00</Text>
                    <Text style={styles.activityText}>
                      {translated.coolDown}
                    </Text>
                  </View>
                  <View></View>
                </View>
              )}
            </View>
          ) : (
            <View>
              <View style={styles.workoutDetailItem}>
                <Text style={styles.activityText}>
                  {translated.kmPace.replace("{count}", pace.toFixed(2))}
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
      );
    }
    renderWorkoutDetailItem(item) {
      const isCurrent = false;
      const itemArr = item.split("_");
      const pace = itemArr[0];
      const item1 = itemArr[1];
      const item2 = itemArr[2];
      return (
        <View style={styles.workoutDetailItem}>
          <View style={styles.workoutDetailItem1}>
            <Text style={styles.activityText}>
              {item1 === "Time" ? `${item2}` : `${item2} ${itemArr[3]}`}
            </Text>
            <Text style={styles.activityText}>{pace}Pace</Text>
          </View>
        </View>
      );
    }
    renderStopButton() {
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
      navigation.navigate("ResultUpdate");
    }
    handleInterval(timerInterval) {
      // clearInterval(timerInterval);
      // withAudioGuide && sp.activityPause();
      timerInterval = setInterval(() => {
        handleSetTime((time) => time + 1);
      }, 1000);
      withAudioGuide && sp.activityStart();
      return timerInterval;
    }
    interval3min() {
      let distanceIn3min = 0;
      sp.speakText("3 minutes passed");
      console.log("interval3min");
      handleSetLocationLog((locationLog) => {
        // add new location to locationLog
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
        distanceIn3min = Run.getDistanceBetweenPoints(
          currentLocation.latitude,
          currentLocation.longitude,
          newLocationLog[newLocationLog.length - 1].latitude,
          newLocationLog[newLocationLog.length - 1].longitude
        );
        return newLocationLog;
      });
      setMovingDistance((movingdistance) => movingdistance + distanceIn3min);
      setCurrentPace(Run.getPace(distanceIn3min, 180));
    }
  }
  const sr = new StartRun();

  stopWatchModeLayer.refineClass(StartRun, {
    renderMain() {
      return (
        <View>
          <View style={styles.timerContainer}>
            <View style={styles.timerTextContainer}>
              <Text style={styles.timerText}>{this.formatTime(time)}</Text>
            </View>
            <StopWatch time={time} />
            {this.renderButtom()}
          </View>
        </View>
      );
    },
    renderMap() {
      return null;
    },
    interval3min() {
      sp.speakText("3 minutes passed");
    },
  });
  pauseLayer.refineClass(StartRun, {
    renderButtom(withPause) {
      console.log(withPause);
      return (
        <Animated.View
          style={[
            styles.buttonContainer,
            { flex: animatedButtonContainerFlex },
          ]}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View style={{ margin: 10 }}>{this.renderReStartButton()}</View>
            <View style={{ margin: 10 }}>{this.renderExitButton()}</View>
          </View>
        </Animated.View>
      );
    },
    handleInterval(timerInterval) {
      clearInterval(timerInterval);
      withAudioGuide && sp.activityPause();
      // timeInterval = setInterval(() => {
      //   handleSetTime((time) => time + 1);
      // }, 1000);
      // withAudioGuide && sp.activityStart();
      // return timeInterval;
    },
  });

  useEffect(() => {
    resetAllState();
    if (stopWatchMode) {
      withLayers([stopWatchModeLayer], () => {
        gl.startObserving();
      });
    }
    // console.log(currentLocation);
    // console.log(locationLog);
    handleSetLocationLog((locationLog) => [...locationLog, currentLocation]);
    // console.log(volume);
  }, []);

  useEffect(() => {
    if (appState === "background" && stopWatchMode) {
      withLayersZone([backgroundLayer, stopWatchModeLayer], () => {
        gc.startObserving();
      });
    } else if (appState === "background" && !stopWatchMode) {
      withLayersZone([backgroundLayer], () => {
        gc.startObserving();
      });
    }
  }, [appState]);

  useEffect(() => {
    let timerInterval = null;
    if (withPause) {
      // if use withLayersZone, it will not work
      withLayers([pauseLayer], () => {
        timerInterval = sr.handleInterval(timerInterval);
      });
    } else {
      console.log(timerInterval);
      timerInterval = sr.handleInterval(timerInterval);
      // clearInterval(timerInterval);
      // withAudioGuide && sp.activityPause();
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
    if (stopWatchMode && time !== 0 && time % 180 === 0) {
      withLayers([stopWatchModeLayer], () => {
        sr.interval3min();
      });
    } else if (!stopWatchMode && time !== 0 && time % 180 === 0) {
      sr.interval3min();
    }
  }, [time]);
  console.log(" withPause" + withPause);
  if (stopWatchMode && withPause) {
    console.log("stopWatchMode && withPause");
    console.log("pattern 1");
    return withLayersZone([stopWatchModeLayer, pauseLayer], () => {
      return sr.main();
    });
  } else if (stopWatchMode && !withPause) {
    console.log("pattern2");
    return withLayersZone([stopWatchModeLayer], () => {
      return sr.main();
    });
  } else if (!stopWatchMode && withPause) {
    return withLayersZone([pauseLayer], () => {
      console.log("pattern3");
      return sr.main();
    });
  } else {
    console.log("pattern4");
    return sr.main();
  }
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
  workoutDetailItem1: {
    alignItems: "center",
  },
  workoutDetailItem: {
    justifyContent: "space-between",
    width: "100%",
    height: 60,
    alignItems: "center",
  },
});
