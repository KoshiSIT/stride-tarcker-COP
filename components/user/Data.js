import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";

import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import MateralIcons from "react-native-vector-icons/MaterialIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { useContext, useState } from "react";
import { TranslationContext } from "../../translator";

const Data = ({ weeklyData, monthlyData, yearlyData }) => {
  const {
    translations: { Datajs: translated },
  } = useContext(TranslationContext);
  const [selectedTab, setSelectedTab] = useState("weekly");
  const [activePageIndex, setActivePageIndex] = useState(0);
  const handleTabChange = (tab) => {
    console.log(tab);
    setSelectedTab(tab);
  };

  return (
    <View style={styles.box}>
      <View style={styles.headlineBackground}>
        <Text style={styles.headlineText}>{translated.data}</Text>
        <Text style={styles.leftHeadlineText}>{translated.totalToDate}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === "weekly" && styles.selectedTabButton,
            ]}
            onPress={() => handleTabChange("weekly")}
          >
            <Text style={styles.tabText}>weekly</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === "monthly" && styles.selectedTabButton,
            ]}
            onPress={() => handleTabChange("monthly")}
          >
            <Text style={styles.tabText}>monthly</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === "yearly" && styles.selectedTabButton,
            ]}
            onPress={() => handleTabChange("yearly")}
          >
            <Text style={styles.tabText}>yearly</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mainContainer}>
          {selectedTab === "weekly" && (
            <TermActivities
              activePageIndex={activePageIndex}
              setActivePageIndex={setActivePageIndex}
              selectedTab={selectedTab}
              data={weeklyData}
            />
          )}
          {selectedTab === "monthly" && (
            <TermActivities
              activePageIndex={activePageIndex}
              setActivePageIndex={setActivePageIndex}
              selectedTab={selectedTab}
              data={monthlyData}
            />
          )}
          {selectedTab === "yearly" && (
            <TermActivities
              activePageIndex={activePageIndex}
              setActivePageIndex={setActivePageIndex}
              selectedTab={selectedTab}
              data={yearlyData}
            />
          )}
        </View>
        <View style={styles.dotsContainer}>
          <View
            style={[styles.dot, activePageIndex === 0 && styles.activeDot]}
          />
          <View
            style={[styles.dot, activePageIndex === 1 && styles.activeDot]}
          />
        </View>
      </View>
    </View>
  );
};
const TermActivities = ({
  activePageIndex,
  setActivePageIndex,
  selectedTab,
  data,
}) => {
  console.log(data);
  let topItemText = {};
  let caloriesBurnedData = {
    thisTerm: 0,
    lastTerm: 0,
  };
  let elevationClimbData = {
    thisTerm: 0,
    lastTerm: 0,
  };
  let timeSpentData = {
    thisTerm: 0,
    lastTerm: 0,
  };
  if (selectedTab === "weekly") {
    topItemText = {
      thisTerm: "This Week",
      lastTerm: "Last Week",
    };
  } else if (selectedTab === "monthly") {
    topItemText = {
      thisTerm: "This Month",
      lastTerm: "Last Month",
    };
  } else if (selectedTab === "yearly") {
    topItemText = {
      thisTerm: "This Year",
      lastTerm: "Last Year",
    };
  }

  return (
    <View style={styles.activitesContainer}>
      <View style={styles.topContainer}>
        <View style={styles.topItem1}>
          <Text style={styles.topItem1Text}>All Activites</Text>
          <TouchableOpacity style={{ marginLeft: 5 }}>
            <FontAwesome5Icon name="align-justify" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.topItem2}>
          <Text style={styles.topItemText}>{topItemText.thisTerm}</Text>
        </View>
        <View style={styles.topItem3}>
          <Text style={styles.topItemText}>{topItemText.lastTerm}</Text>
        </View>
      </View>
      <ScrollView
        style={{ height: "50%" }}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={Dimensions.get("window").width * 1}
        contentOffset={{
          x: activePageIndex * Dimensions.get("window").width * 1,
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
        <View style={styles.mainItemContainer}>
          <View style={styles.mainItem1}>
            <View style={styles.columItem}>
              <FontAwesome5Icon
                name="route"
                size={20}
                color="black"
                style={styles.icon}
              />
              <Text style={styles.nameText}>Distance</Text>
            </View>
            <View style={styles.columItem}>
              <MateralIcons
                name="av-timer"
                size={20}
                color="black"
                style={styles.icon}
              />
              <Text style={styles.nameText}>AVG Pace</Text>
            </View>
            <View style={styles.columItem}>
              <Entypo
                name="time-slot"
                size={20}
                color="black"
                style={styles.icon}
              />
              <Text style={styles.nameText}>Activities</Text>
            </View>
          </View>
          <View style={styles.mainItem2}>
            <View style={styles.dataItem}>
              <Text style={styles.nameText}>{data.totalDistance}</Text>
            </View>
            <View style={styles.dataItem}>
              <Text style={styles.nameText}>{data.averagePace}</Text>
            </View>
            <View style={styles.dataItem}>
              <Text style={styles.nameText}>{data.activitiesCount}</Text>
            </View>
          </View>
          <View style={styles.mainItem3}>
            <View style={styles.dataItem}>
              <Text style={styles.nameText}>{data.totalDistance}</Text>
            </View>
            <View style={styles.dataItem}>
              <Text style={styles.nameText}>{data.averagePace}</Text>
            </View>
            <View style={styles.dataItem}>
              <Text style={styles.nameText}>{data.activitiesCount}</Text>
            </View>
          </View>
        </View>
        <View style={styles.mainItemContainer}>
          <View style={styles.mainItem1}>
            <View style={styles.columItem}>
              <SimpleLineIcons
                name="fire"
                size={20}
                color="black"
                style={styles.icon}
              />
              <Text style={styles.nameText}>Calories Burned</Text>
            </View>
            <View style={styles.columItem}>
              <FontAwesome5Icon
                name="mountain"
                size={20}
                color="black"
                style={styles.icon}
              />
              <Text style={styles.nameText}>Elevation Climb</Text>
            </View>
            <View style={styles.columItem}>
              <FontAwesome5Icon
                name="running"
                size={20}
                color="black"
                style={styles.icon}
              />
              <Text style={styles.nameText}>Time Spent</Text>
            </View>
          </View>
          <View style={styles.mainItem2}>
            <View style={styles.dataItem}>
              <Text style={styles.nameText}>TBD</Text>
            </View>
            <View style={styles.dataItem}>
              <Text style={styles.nameText}>TBD</Text>
            </View>
            <View style={styles.dataItem}>
              <Text style={styles.nameText}>TBD</Text>
            </View>
          </View>
          <View style={styles.mainItem3}>
            <View style={styles.dataItem}>
              <Text style={styles.nameText}>TBD</Text>
            </View>
            <View style={styles.dataItem}>
              <Text style={styles.nameText}>TBD</Text>
            </View>
            <View style={styles.dataItem}>
              <Text style={styles.nameText}>TBD</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Data;

const styles = StyleSheet.create({
  box: {
    height: 300,
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
    marginLeft: 5,
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
  },
  leftHeadlineText: {
    marginRight: 5,
  },
  content: {
    flex: 1,
    backgroundColor: "white",
  },
  mainContainer: {
    flex: 4,
    width: Dimensions.get("window").width,
    backgroundColor: "lightgray",
    borderColor: "#000055",
  },
  contentText: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
  },
  tabContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    flexDirection: "row",
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedTabButton: {
    borderBottomWidth: 4,
    borderColor: "#000055",
  },
  tabText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  dotsContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
  activitesContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  topContainer: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "row",
  },
  topItem1: {
    width: "50%",
    backgroundColor: "white",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "#f5f5f5",
    borderWidth: 2,
  },
  topItem2: {
    width: "25%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#f5f5f5",
    borderWidth: 2,
  },
  topItem3: {
    width: "25%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#f5f5f5",
    borderWidth: 2,
  },
  topItem1Text: {
    fontSize: 13,
    fontWeight: "bold",
    marginLeft: 10,
  },
  topItemText: {
    fontSize: 13,
    fontWeight: "bold",
  },
  mainItemContainer: {
    flex: 4,
    width: Dimensions.get("window").width,
    backgroundColor: "white",
    flexDirection: "row",
  },
  mainItem1: {
    width: "50%",
    backgroundColor: "white",
    justifyContent: "center",
    borderColor: "#f5f5f5",
    borderWidth: 2,
  },
  mainItem2: {
    width: "25%",
    backgroundColor: "white",
    justifyContent: "center",
    borderColor: "#f5f5f5",
    borderWidth: 2,
  },
  mainItem3: {
    width: "25%",
    backgroundColor: "white",
    justifyContent: "center",
    borderColor: "#f5f5f5",
    borderWidth: 2,
  },
  columItem: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    borderColor: "#f5f5f5",
    borderWidth: 2,
    flexDirection: "row",
  },
  nameText: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 10,
  },
  icon: {
    marginLeft: 10,
  },
  dataItem: {
    flex: 1,
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#f5f5f5",
    borderWidth: 2,
    flexDirection: "row",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "gray",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#000055",
  },
});
