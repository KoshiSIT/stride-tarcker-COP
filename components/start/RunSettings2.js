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
  Switch,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState, useRef, useContext } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Slider from "@react-native-community/slider";
import { BeginnerWorkOut, Distance } from "./WorkOut";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import TranslationContext from "../../translator/TranslationContext";

const Page1 = ({
  handleClosePopup,
  handleStopWatchMode,
  handleSelectActivity,
  stopWatchMode,
  selectedActivity,
}) => {
  const {
    translations: { RunSettingsjs: translated },
  } = useContext(TranslationContext);

  const allowedKeys = [
    "running",
    "cycling",
    "walking",
    "mountainBiking",
    "biking",
    "downhillSkiing",
    "snowboarding",
    "swimming",
    "wheelchair",
    "rowing",
  ];

  const activities = allowedKeys
    .filter((key) => translated[key])
    .map((key) => {
      const activityValue = translated[key];
      return { label: activityValue, value: activityValue };
    });

  return (
    <View style={styles.pageContainer}>
      <View>
        <View style={styles.pageTitleContainer}>
          <MaterialCommunityIcons
            name="shoe-sneaker"
            size={50}
            color="#000033"
          />
          <Text style={styles.pageTitle}>{translated.activity}</Text>
        </View>
        {stopWatchMode ? (
          <ScrollView style={styles.scrollContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.pageDescription}>{translated.stopWatch}</Text>
              <Switch
                value={stopWatchMode}
                onValueChange={handleStopWatchMode}
                trackColor={{ false: "#767577", true: "#20B2AA" }}
                thumbColor={stopWatchMode ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
              />
            </View>
            {activities.map((activity) => (
              <TouchableOpacity
                style={styles.choiceContainerOn}
                key={activity.value}
                onPress={() => handleSelectActivity(activity.value)}
              >
                <View style={styles.rowContainer}>
                  <Text style={styles.pageDescription}>{activity.label}</Text>
                  {selectedActivity === activity.value && (
                    <Icon name="check" size={30} color="#20B2AA" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <ScrollView style={styles.scrollContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.pageDescription}>{translated.stopWatch}</Text>
              <Switch
                value={stopWatchMode}
                onValueChange={handleStopWatchMode}
                trackColor={{ false: "#767577", true: "#20B2AA" }}
                thumbColor={stopWatchMode ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
              />
            </View>
            {activities.map((activity) => (
              <TouchableOpacity
                style={styles.choiceContainerOff}
                kwy={activity.value}
                onPress={() => handleSelectActivity(activity.value)}
              >
                <View style={styles.rowContainer}>
                  <Text style={styles.pageDescription}>{activity.label}</Text>
                  {selectedActivity === activity.value && (
                    <Icon name="check" size={30} color="#20B2AA" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        <TouchableOpacity onPress={handleClosePopup} style={styles.okButton}>
          <Text style={styles.okText}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Page2 = ({ handleClosePopup }) => {
  const [withWorkOut, setWithWorkOut] = useState(false);
  const [showModal, setShowModal] = useState("");
  const [distance, setDistance] = useState(50);
  const fadeAnim = useRef(
    new Animated.Value(Dimensions.get("window").width)
  ).current;
  const navigation = useNavigation();
  const handleWithWorkOut = () => {
    setWithWorkOut(true);
  };

  const handleModaleOpen = (pagename) => {
    setShowModal(pagename);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleModaleClose = () => {
    Animated.timing(fadeAnim, {
      toValue: Dimensions.get("window").width,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setShowModal("");
    });
  };

  const handleCustomOpen = () => {
    navigation.navigate("Custom");
  };

  const {
    translations: { RunSettingsjs: translated },
  } = useContext(TranslationContext);

  return (
    <View style={styles.pageContainer}>
      {showModal === translated.beginnerWorkout ? (
        <BeginnerWorkOut
          handleModaleClose={handleModaleClose}
          fadeAnim={fadeAnim}
        />
      ) : showModal === translated.distance ? (
        <Distance
          handleModaleClose={handleModaleClose}
          fadeAnim={fadeAnim}
          distance={distance}
          setDistance={setDistance}
        />
      ) : (
        <Animated.View>
          <View style={styles.pageTitleContainer}>
            <MaterialCommunityIcons
              name="clipboard-text-outline"
              size={50}
              color="#000033"
            />
            <Text style={styles.pageTitle}>{translated.workout}</Text>
          </View>
          <ScrollView style={styles.scrollContainer}>
            <TouchableOpacity
              style={styles.workOutContainer}
              onPress={() => handleWithWorkOut()}
            >
              <View style={styles.rowContainer}>
                <Text style={styles.pageDescription}>{translated.none}</Text>
                {withWorkOut == true && (
                  <Icon name="check" size={30} color="#20B2AA" />
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.workOutContainer}>
              <View style={styles.rowContainer}>
                <Text style={styles.pageDescription}>
                  {translated.startTrainingPlan}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.workOutContainer}
              onPress={() => handleModaleOpen("初心者向けワークアウト")}
            >
              <View style={styles.rowContainer}>
                <Text style={styles.pageDescription}>
                  {translated.beginnerWorkout}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.workOutContainer}>
              <View style={styles.rowContainer}>
                <Text style={styles.pageDescription}>
                  {translated.winTheLongRun}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.workOutContainer}
              onPress={() => handleCustomOpen()}
            >
              <View style={styles.rowContainer}>
                <Text style={styles.pageDescription}>{translated.custom}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.workOutContainer}
              onPress={() => handleModaleOpen(translated.distance)}
            >
              <View style={styles.rowContainer}>
                <Text style={styles.pageDescription}>
                  {translated.distance}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.workOutContainer}>
              <View style={styles.rowContainer}>
                <Text style={styles.pageDescription}>{translated.time}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.workOutContainer}>
              <View style={styles.rowContainer}>
                <Text style={styles.pageDescription}>{translated.pace}</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
          <TouchableOpacity onPress={handleClosePopup} style={styles.okButton}>
            <Text style={styles.okText}>OK</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};
const Page3 = ({ handleClosePopup }) => {
  const [withMusic, setWithMusic] = useState(false);

  const {
    translations: { RunSettingsjs: translated },
  } = useContext(TranslationContext);

  const handleWithMusic = () => {
    setWithMusic(true);
  };
  return (
    <View style={styles.pageContainer}>
      <View>
        <View style={styles.pageTitleContainer}>
          <MaterialCommunityIcons name="music" size={50} color="#000033" />
          <Text style={styles.pageTitle}>{translated.music}</Text>
        </View>
        <ScrollView style={styles.scrollContainer}>
          <TouchableOpacity style={styles.workOutContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.pageDescription}>{translated.spotify}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.workOutContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.pageDescription}>
                {translated.musicLibraryApp}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.workOutContainer}
            onPress={() => handleWithMusic()}
            activeOpacity={withMusic ? 1 : 0.2}
          >
            <View style={styles.rowContainer}>
              <Text style={styles.pageDescription}>{translated.none}</Text>
              {withMusic == true && (
                <Icon name="check" size={30} color="#20B2AA" />
              )}
            </View>
          </TouchableOpacity>
        </ScrollView>
        <TouchableOpacity onPress={handleClosePopup} style={styles.okButton}>
          <Text style={styles.okText}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const Page4 = ({
  handleClosePopup,
  handleWithAudioGuide,
  handleVolumeChange,
  withAudioGuide,
  volume,
}) => {
  const {
    translations: { RunSettingsjs: translated },
  } = useContext(TranslationContext);

  return (
    <View style={styles.pageContainer}>
      <View>
        <View style={styles.pageTitleContainer}>
          <MaterialCommunityIcons
            name="volume-high"
            size={50}
            color="#000033"
          />
          <Text style={styles.pageTitle}>{translated.audioGuide}</Text>
        </View>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.pageDescription}>{translated.enable}</Text>
            <Switch
              value={withAudioGuide}
              onValueChange={handleWithAudioGuide}
              trackColor={{ false: "#767577", true: "#20B2AA" }}
              thumbColor={withAudioGuide ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
            />
          </View>
          <TouchableOpacity
            style={styles.workOutContainer}
            disabled={!withAudioGuide}
          >
            <View style={styles.rowContainer}>
              <Text
                style={[
                  styles.pageDescription,
                  !withAudioGuide && styles.disabledPageDescription,
                ]}
              >
                {translated.voice}
              </Text>
            </View>
            <Text
              style={[
                styles.subText,
                !withAudioGuide && styles.disabledSubText,
              ]}
            >
              {translated.defaultVoice}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.workOutContainer}
            disabled={!withAudioGuide}
          >
            <View style={styles.rowContainer}>
              <Text
                style={[
                  styles.pageDescription,
                  !withAudioGuide && styles.disabledPageDescription,
                ]}
              >
                {translated.announcementFrequency}
              </Text>
            </View>
            <Text
              style={[
                styles.subText,
                !withAudioGuide && styles.disabledSubText,
              ]}
            >
              {translated.fiveMinutes}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.workOutContainer}
            disabled={!withAudioGuide}
          >
            <View style={styles.rowContainer}>
              <Text
                style={[
                  styles.pageDescription,
                  !withAudioGuide && styles.disabledPageDescription,
                ]}
              >
                {translated.selectInfoToAnnounce}
              </Text>
            </View>
            <Text
              style={[
                styles.subText,
                !withAudioGuide && styles.disabledSubText,
              ]}
            >
              {translated.timeDistanceAvgPace}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.workOutContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.pageDescription}>{translated.volume}</Text>
              <Text style={styles.pageDescription}>{Math.trunc(volume)}%</Text>
            </View>
            <Slider
              style={{ width: "80%" }}
              minimumValue={0}
              maximumValue={100}
              value={volume}
              onValueChange={handleVolumeChange}
            />
          </TouchableOpacity>
        </ScrollView>
        <TouchableOpacity onPress={handleClosePopup} style={styles.okButton}>
          <Text style={styles.okText}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export { Page1, Page2, Page3, Page4 };

const styles = StyleSheet.create({
  pageContainer: {
    width: Dimensions.get("window").width * 0.9,
    height: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "gray",
  },
  pageTitleContainer: {
    top: 0,
    width: "100%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
  },
  scrollContainer: {
    width: "100%",
    height: "66%",
  },
  choiceContainerOn: {
    borderWidth: 1,
    borderColor: "gray",
    height: 70,
  },
  choiceContainerOff: {
    borderWidth: 1,
    borderColor: "gray",
    height: 80,
  },
  pageTitle: {
    fontSize: 20,
    color: "black",
    marginTop: 10,
  },
  pageDescription: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  disabledPageDescription: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#DDDDDD",
  },
  okButton: {
    bottom: "-2.5%",
    width: "100%",
    height: "10%",
    backgroundColor: "#3366CC",
    justifyContent: "center",
    alignItems: "center",
  },
  okText: {
    fontSize: 20,
    color: "white",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  workOutContainer: {
    width: "100%",
    height: 85,
    borderWidth: 1,
    borderColor: "gray",
  },
  subText: {
    fontSize: 14,
    color: "gray",
  },
  disabledSubText: {
    fontSize: 14,
    color: "#DDDDDD",
  },
});
