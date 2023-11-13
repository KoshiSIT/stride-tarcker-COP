import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Svg, Circle } from "react-native-svg";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { layer, proceed, withLayers } from "contextjs";
import EntypoIcons from "react-native-vector-icons/Entypo";
const Map = ({
  parentName,
  currentLocation,
  scrollViewRef,
  initialPosition,
  locationLog,
}) => {
  const mapRef = React.useRef(null);
  console.log(parentName);
  if (locationLog !== undefined) {
    console.log(locationLog);
    if (locationLog.length === 0) {
      locationLog.push({ longitude: 0, latitude: 0 });
    }
  } else {
    locationLog = [{ longitude: 0, latitude: 0 }];
  }

  class Map {
    main() {
      return this.render();
    }
    render() {
      if (parentName === "ResultReview") {
        return (
          <MapView
            scrollEnabled={false}
            zoomEnabled={false}
            style={styles.map2}
            region={{
              latitude: locationLog[0].latitude,
              longitude: locationLog[0].longitude,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
            }}
          >
            {this.renderMarker()}
          </MapView>
        );
      } else {
        return (
          <MapView
            style={styles.map}
            ref={mapRef}
            region={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            {this.renderMarker()}
            {this.renderCurrentLocationButton()}
            {this.renderBackToTimer()}
          </MapView>
        );
      }
    }
    renderMarker() {
      if (parentName === "ResultReview") {
        return (
          <View>
            {locationLog.map((location, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                anchor={{ x: 0.5, y: 0.5 }}
              >
                <View>
                  {index !== 0 ? (
                    <EntypoIcons
                      name="location-pin"
                      size={30}
                      color="#3366CC"
                    />
                  ) : (
                    <EntypoIcons name="location-pin" size={30} color="green" />
                  )}
                </View>
              </Marker>
            ))}
            <Polyline
              coordinates={locationLog}
              strokeWidth={2}
              strokeColor="lightgray"
            />
          </View>
        );
      } else {
        return (
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <View>
              <Svg width={24} height={24} viewBox="0 0 24 24">
                <Circle
                  cx={12}
                  cy={12}
                  r={10}
                  stroke="white"
                  strokeWidth={2}
                  fill="#3366CC"
                />
              </Svg>
            </View>
          </Marker>
        );
      }
    }
    renderCurrentLocationButton() {
      if (parentName === "StartRun") {
        return (
          <TouchableOpacity
            onPress={this.goToCurrentLocation}
            style={{
              position: "absolute",
              top: "5%",
              left: "80%",
              backgroundColor: "white",
              borderRadius: 30,
              height: 40,
              width: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View>
              <FontAwesomeIcon name="location-arrow" size={30} color="gray" />
            </View>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity
            onPress={this.goToCurrentLocation}
            style={{
              position: "absolute",
              top: "55%",
              left: "80%",
              backgroundColor: "white",
              borderRadius: 30,
              height: 40,
              width: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View>
              <FontAwesomeIcon name="location-arrow" size={30} color="gray" />
            </View>
          </TouchableOpacity>
        );
      }
    }
    renderBackToTimer() {
      if (parentName === "StartRun") {
        return (
          <TouchableOpacity onPress={this.backToTimer}>
            <View style={styles.backContainer}>
              <FontAwesomeIcon name="chevron-left" size={30} color="white" />
            </View>
          </TouchableOpacity>
        );
      } else {
        return <View></View>;
      }
    }
    backToTimer() {
      console.log("backToTimer");
      scrollViewRef.current.scrollTo({
        x: Dimensions.get("window").width,
        y: 0,
        animated: true,
      });
    }
    goToCurrentLocation() {
      if (mapRef.current && mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        });
      }
    }
  }
  const map = new Map();
  return map.main();
};

export default Map;
const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  map2: {
    height: "100%",
    width: Dimensions.get("window").width,
  },
  backContainer: {
    position: "absolute",
    top: 500,
    right: "0%",
    height: 60,
    width: 70,
    backgroundColor: "#3366CC",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
