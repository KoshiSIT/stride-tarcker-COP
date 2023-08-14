import { StyleSheet, Text, View ,Image, FlatList,SafeAreaView, Dimensions, TouchableOpacity, ScrollView, Animated } from 'react-native';
import React,{useEffect, useState, useRef} from 'react';
import Constants from 'expo-constants';
import axios from 'axios';

import MapView,{ Marker }  from 'react-native-maps';
import { Svg, Circle} from 'react-native-svg';
import * as Location from 'expo-location';
import { Page1, Page2, Page3, Page4 } from '../components/start/RunSettings';
import { useNavigation } from '@react-navigation/native';

import { useStartScreenContext } from '../contexts/StartScreenContext';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function StartScreenMain({}){
    // map state
    const [currentLocation, setCurrentLocation] = useState(null);
    const {
      // page 1
      stopWatchMode, handleStopWatchMode,
      selectedActivity, handleSelectActivity,
      // page 2
      withAudioGuide, handleWithAudioGuide,
      volume, handleVolumeChange
    } = useStartScreenContext();

    useEffect(() => {
      getLocationPermission();
    }, []);

    const getLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        startLocationUpdates();
      }
    };
  
    const startLocationUpdates = async () => {
      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 1000 },
        position => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
        }
      );
    };
    const [showPopup, setShowPopup] = useState(false);
    const [activePageIndex, setActivePageIndex] = useState(0);
  
    const fadeAnim = useRef(new Animated.Value(Dimensions.get('window').height)).current;
    const navigation = useNavigation();
  
    const handleStartRunOpen = () => {
      navigation.navigate('StartRun');
    };
  
    const handleOpenPopup = (index) => {
      setActivePageIndex(index)
      setShowPopup(true);
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    };
  
    const handleClosePopup = () => {
      Animated.timing(fadeAnim, {
        toValue: Dimensions.get('window').height,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {setShowPopup(false)});
    };
    
  
        return (
            <View style={styles.container}>
              <View style={styles.titleContainer}>
                <TouchableOpacity onPress={()=>{navigation.navigate('Settings');}} style={{marginLeft : 15}}>
                  <FeatherIcon name="settings" size={30} color= "black" />
                </TouchableOpacity>
                <Text style={{fontWeight : 'bold', fontSize : 16}}>RunKeeper</Text>
                <TouchableOpacity onPress={()=>{navigation.navigate('StartRun');}} style={{marginRight : 15}}>
                  <FeatherIcon name="plus" size={30} color= "black" />
                </TouchableOpacity>
              </View>
              {showPopup && <View style={styles.overlay} /> }
                      {currentLocation && (
                <MapView
                    style={styles.map}
                    region={{
                        latitude: currentLocation.latitude,
                        longitude: currentLocation.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                    >
                  <Marker
                      coordinate={{
                          latitude : currentLocation.latitude,
                          longitude : currentLocation.longitude,
                      }}
                      anchor={{ x: 0.5, y: 0.5 }}
                  >
                      <View>
                          <Svg width={24} height={24} viewBox="0 0 24 24">
                              <Circle cx={12} cy={12} r={10} stroke="white" strokeWidth={2} fill="#3366CC" />
                          </Svg>
                      </View>
                  </Marker>
                </MapView>
                )}
                <View style = {styles.buttonContainer}>
                      <View style={styles.activityButton}>
                        <TouchableOpacity onPress={()=>handleOpenPopup(0) } style={styles.button}>
                          <View style={styles.iconContainer}>
                            <MaterialCommunityIcons name="shoe-sneaker" size={30} color= "#000033" />
                          </View>
                          <View style={styles.textContainer}>
                            <Text style={styles.buttonText }>アクティビティ</Text>
                            <Text style={styles.buttonSubText}>{selectedActivity}</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={ styles.workoutButton }>
                          <TouchableOpacity onPress={()=>handleOpenPopup(1)} style={styles.button}>
                            <View style={styles.iconContainer}>
                              <MaterialCommunityIcons name="clipboard-text-outline" size={30} color= "#000033" />
                            </View>
                            <View style={styles.textContainer}>
                              <Text style={styles.buttonText }>ワークアウト</Text>
                              <Text style={styles.buttonSubText}>20分</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.musicButton}>
                          <TouchableOpacity onPress={()=>handleOpenPopup(2)} style={styles.button}>
                            <View style={styles.iconContainer}>
                              <MaterialCommunityIcons name="music" size={30} color= "#000033" />
                            </View>
                            <View style={styles.textContainer}>
                              <Text style={styles.buttonText }>音楽</Text>
                              <Text style={styles.buttonSubText}>なし</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                        <View style={ styles.soundguideButton }>
                          <TouchableOpacity onPress={()=>handleOpenPopup(3)} style={styles.button}>
                            <View style={styles.iconContainer}>
                              <MaterialCommunityIcons name="volume-high" size={30} color= "#000033" />
                            </View>
                            <View style={styles.textContainer}>
                              <Text style={styles.buttonText }>音楽ガイド</Text>
                              <Text style={styles.buttonSubText}>{withAudioGuide ? 'あり' : 'なし'}</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                </View>
                <View style = { styles.startButton }>
                  <TouchableOpacity onPress={()=>handleStartRunOpen()}>
                    <Text style = { styles.startButtonText }>スタート</Text>
                  </TouchableOpacity>
                </View>
          
                {showPopup && (
                    <Animated.View style={[styles.popupScreen, { transform: [{ translateY: fadeAnim }] }]}>
                      <View style={styles.popupContainer}>
                        <ScrollView
                          style={{ flex: 1 }}
                          horizontal
                          pagingEnabled
                          showsHorizontalScrollIndicator={false}
                          decelerationRate="fast"
                          snapToInterval={Dimensions.get('window').width*0.9}
                          contentOffset={{ x: activePageIndex * Dimensions.get('window').width * 0.9, y: 0 }}
                          onMomentumScrollEnd={(event) => {
                            const contentOffsetX = event.nativeEvent.contentOffset.x;
                            const index = Math.round(contentOffsetX / Dimensions.get('window').width);
                            setActivePageIndex(index);
                          }}
                          scrollEventThrottle={200}
                        >
                          <Page1  handleClosePopup = { handleClosePopup }/>
                          <Page2  handleClosePopup = { handleClosePopup }/>
                          <Page3  handleClosePopup = { handleClosePopup }/>
                          <Page4  handleClosePopup = { handleClosePopup }/>
          
                        </ScrollView>
                      </View>
                      
                      <View style={styles.dotContainer}>
                        <View style={[styles.dot, activePageIndex === 0 && styles.activeDot]} />
                        <View style={[styles.dot, activePageIndex === 1 && styles.activeDot]} />
                        <View style={[styles.dot, activePageIndex === 2 && styles.activeDot]} />
                        <View style={[styles.dot, activePageIndex === 3 && styles.activeDot]} />
                      </View>
          
                    </Animated.View>
                  )}
            </View>
        );  
};
    

const styles = StyleSheet.create({
    container:{
      ...StyleSheet.absoluteFillObject,
        flex:1,
    },
    map: {
      height: '100%',
      width: '100%',
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.3)',
      zIndex: 1,
    },
    titleContainer:{
      height : 40,
      width : '100%',
      flexDirection : 'row',
      justifyContent : 'space-between',
      alignItems : 'center',
      marginTop : Constants.statusBarHeight,
    },
    buttonContainer:{
      position: 'absolute',
      backgroundColor: 'lightblue',
      alignItems: 'center',
      bottom: '12%',
      top: '68%',
      right: '5%',
      left: '5%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      borderRadius: 10,
      overflow: 'hidden',
    },
    activityButton:{
      width: '50%',
      height: '50%',
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 0.5,
      borderRightWidth: 0.5,
      borderColor: 'gray',
    },
    workoutButton:{
      width: '50%',
      height: '50%',
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 0.5,
      borderLeftWidth: 0.5,
      borderColor: 'gray',
    },
    musicButton:{
      width: '50%',
      height: '50%',
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      borderTopWidth: 0.5,
      borderRightWidth: 0.5,
      borderColor: 'gray',
    },
    soundguideButton:{
      width: '50%',
      height: '50%',
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      borderTopWidth: 0.5,
      borderLeftWidth: 0.5,
      borderColor: 'gray',
    },
    button:{
      flexDirection: 'row',
    },
    iconContainer:{
      width: '20%',
    },
    textContainer:{
      width: '70%',
    },
    buttonText: {
      fontSize : 12, 
      color : '#888888',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    buttonSubText: {
      fontSize : 16,
      color : 'black',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    startButton:{
      position: 'absolute',
      backgroundColor: '#3366CC',
      width: '90%',
      height: '9%',
      top: '89%',
      bottom: '10%',
      left: '5%',
      right: '95%', 
      borderRadius: 20,
      justifyContent: 'center',
    },
    startButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    popupScreen: {
      flex: 1,
      position: 'absolute',
      bottom: '0%',
      left: '0%',
      right: '0%',
      top: '0%',
      zIndex: 2,
    },
    popupContainer: {
      flex: 1,
      position: 'absolute',
      bottom: '5%',
      left: '5%',
      right: '5%',
      top: '5%',
      backgroundColor: 'white',
      borderRadius: 30,
      overflow: 'hidden',
    },
    dotContainer: {
      position: 'absolute',
      bottom: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 10,
      alignSelf: 'center',
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: 'gray',
      marginHorizontal: 4,
    },
    activeDot: {
      backgroundColor: 'white',
    },
});