import { StyleSheet, Text, View ,Image, FlatList, SafeAreaView, TouchableOpacity , Animated, ScrollView, Dimensions, Touchable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../../contexts/AppContext';
import { useActivityContext } from '../../contexts/ActivityContext';
import { useStartScreenContext } from '../../contexts/StartScreenContext';
import React,{useEffect, useState, useRef} from 'react';
import Constants from 'expo-constants';
import * as Speech from 'expo-speech';
import * as Location from 'expo-location';
import MapView, { Marker, Polyline } from 'react-native-maps';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Svg, Circle} from 'react-native-svg';
import * as Run from '../../functions/Run';
export default function StartRunScreencreen({}){
    const [withPause, setWithPause] = useState(false);
    const {
        withAudioGuide,
        volume,
        slectedActivity,
        typeOfAudioGuide,
        // add other state
    } = useStartScreenContext();
    const {
        time, handleSetTime,
        pace, handleSetPace,
        locationLog, handleSetLocationLog,
        handleSetCalorie,
    } = useActivityContext();
    
    const { 
        currentLocation, handleSetCurrentLocation,
        weight,
        language,
    } = useAppContext();

    const [initialPosition, setInitialPosition] = useState(null);
    const [currentPace, setCurrentPace] = useState(0);
    const [movingdistance, setMovingDistance] = useState(0);
    const [buttonContainerFlex,setButtonContainerFlex] = useState(2);
    const animatedButtonContainerFlex = new Animated.Value(buttonContainerFlex);
    const scrollViewRef = useRef(null);

    
    useEffect(() => {
        getLocationPermission();
        handleSetLocationLog((locationLog) => [...locationLog, currentLocation]);
        console.log(volume)
        if(withAudioGuide){
            speakText('アクティビティを開始します。', language, volume);
        }
    }, []);
    
    useEffect(() => {
        let timerInterval = null;
        if(withPause){
            timerInterval = setInterval(() => {
                handleSetTime((time) => time + 1);
            }, 1000);
        }else {
            clearInterval(timerInterval);
        }
        
        return () => clearInterval(timerInterval);
    }, [withPause]);
    
    useEffect(() => {
        if(initialPosition && currentLocation){
            distance = Run.getDistanceBetweenPoints(initialPosition.latitude, initialPosition.longitude, currentLocation.latitude, currentLocation.longitude);
            setMovingDistance(distance);
            //console.log(`initialPosition: ${initialPosition.latitude}, ${initialPosition.longitude}`);
            //console.log(`currentLocation: ${currentLocation.latitude}, ${currentLocation.longitude}`);
            //console.log(Run.getPace(distance, time));
            handleSetPace(Run.getPace(distance, time));
        }
    }, [currentLocation]);
    
    useEffect(() => {
        const toValue = buttonContainerFlex === 2 ? 3 : 2;
        Animated.timing(animatedButtonContainerFlex, {
            toValue: toValue,
            duration: 500,
          useNativeDriver: false,
        }).start();
    }, [buttonContainerFlex]);
    
    useEffect(() => {
        if(time !== 0 && time % 180 === 0){
            handleSetLocationLog((locationLog) => {
                // 新しいlocationLogの値を計算
                let newLocationLog = [];
                if (movingdistance !== 0){
                    newLocationLog = [...locationLog, currentLocation];
                }else{
                    newLocationLog = [...locationLog, {latitude : currentLocation.latitude+0.0005, longitude : currentLocation.longitude+0.0005}];
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
                   newLocationLog[newLocationLog.length-1].latitude, 
                   newLocationLog[newLocationLog.length-1].longitude
                   );
                   setCurrentPace(Run.getPace(distanceIn3min, 180));
                   
                   return newLocationLog;
                });
            }
        }, [time]);

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
                if(!initialPosition){
                    setInitialPosition({ latitude, longitude });
                }
                handleSetCurrentLocation({ latitude, longitude });
            }
            );
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };
    const navigation = useNavigation();

    const handleStartstop = () => {
        setWithPause((withPause) => !withPause);
        setButtonContainerFlex((prevFlex) => (prevFlex === 2 ? 3 : 2));    
    };
    const speakText = (text, language, volume) => {
        const languageCode ={
            '日本語' : 'ja',
            'English' : 'en',
        };
        Speech.speak(text,{
            language : languageCode[language],
            volume : volume/100,
        });
    };
    const handleResultOpen = () => {
        handleSetCalorie(Run.getCalorie(weight, movingdistance, pace));
        navigation.navigate('Result');
        console.log(volume);
        if (withAudioGuide){
            speakText('アクティビティを終了します。', language, volume);
        }
    };
    
    return(
        <View style={styles.container}>
            <ScrollView
                style={{flex : 1}}
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                decelerationRate="fast"
                contentOffset={{ x:Dimensions.get('window').width, y:0 }}
                >
                <Map 
                    scrollViewRef={scrollViewRef} 
                    currentLocation={currentLocation}  
                    handleSetCurrentLocation={handleSetCurrentLocation}
                    initialPosition={initialPosition}
                    setInitialPosition={setInitialPosition}
                    locationLog={locationLog}
                    handleSetLocationLog={handleSetLocationLog}
                />
                <View style={styles.timerContainer}>
                    <View style={styles.topContainer}>
                        <Text style={styles.timerText}>{formatTime(time)}</Text>
                        <Text style={{fontSize : 15}}>タイム</Text>
                    </View>
                    <View style={styles.centerContainer}>
                        <Text style={{fontSize : 70, fontWeight : 'bold', color : '#000033'}}>{movingdistance.toFixed(2)}</Text>
                        <Text style={{fontSize : 20}}>キロメートル</Text>
                    </View>
                    <View style={styles.bottomContainer}>
                        <View style={styles.leftContainer}>
                            <Text style={{fontSize : 40, fontWeight: 'bold', color : '#000033'}}>{currentPace.toFixed(2)}</Text>
                            <Text style={{fontSize : 10}}>ペース</Text>
                        </View>
                        <View style={styles.rightContainer}>
                            <Text style={{fontSize : 40, fontWeight: 'bold', color : '#000033'}}>{pace.toFixed(2)}</Text>
                            <Text style={{fontSize : 10}}>平均ペース</Text>
                        </View>
                    </View>
                    <Animated.View style={[styles.buttonContainer,{flex : animatedButtonContainerFlex}]}>
                        {withPause ? (
                        <TouchableOpacity onPress={() => handleStartstop()}>
                            <FontAwesome5Icon name="pause-circle" size={80} color="#3366CC" />
                        </TouchableOpacity>
                        ) : (
                        <View style = {{justifyContent : 'center', alignItems : 'center', flexDirection: 'row',}}>
                            <View style = {{margin : 10}}>
                                <TouchableOpacity onPress={() => handleStartstop()}>
                                    <FontAwesome5Icon name="play-circle" size={80} color= "#30F9B2" />
                                </TouchableOpacity>
                            </View>
                            <View style = {{margin : 10}}>
                                <TouchableOpacity onPress={()=>handleResultOpen()}>
                                    <FontAwesome5Icon name="stop-circle" size={80} color = "#FF3300" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        )}
                    </Animated.View>
                </View>
                <View style={styles.runLogContainer}>
                    <View style={styles.top3Container}>
                        <View style={styles.leftContainer}>
                            <Text style={{fontSize : 40, fontWeight: 'bold', color : '#000033'}}>{formatTime(time)}</Text>
                            <Text style={{fontSize : 15}}>タイム</Text>
                        </View>
                        <View style={styles.rightContainer}>
                            <Text style={{fontSize : 40, fontWeight: 'bold', color : '#000033'}}>{pace.toFixed(2)}</Text>
                            <Text style={{fontSize : 10}}>平均ペース</Text>
                        </View>
                    </View>
                    <View style={styles.activityContainer}>
                        <View style={styles.activityContainerItem1}>
                            <Text style={styles.activityText}>現在　00.km　　　　　　　　　　{formatTime(time)}</Text>
                        </View>
                        <View style ={styles.activityContainerItem2}>
                            <Text style={styles.activityText}>1km　                      {currentPace.toFixed(2)} 分/km</Text>
                        </View>
                    </View>
                </View>
                
            </ScrollView>
        </View>
    );
};

export const Map = ({scrollViewRef, currentLocation,  initialPosition,  locationLog}) =>{
    const mapRef = useRef(null);


    const backToTimer = () => {
        scrollViewRef.current.scrollTo({ x: Dimensions.get('window').width, y: 0, animated: true });
    };


    const goToCurrentLocation = () => {
        if (mapRef.current && mapRef.current) {
            mapRef.current.animateToRegion({
                latitude : currentLocation.latitude,
                longitude : currentLocation.longitude,
                latitudeDelta : 0.002,
                longitudeDelta : 0.002,
            });
        }
    };

    return(
        <View style={styles.mapContainer}>
            {currentLocation && (
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    region={{
                        latitude : currentLocation.latitude,
                        longitude : currentLocation.longitude,
                        latitudeDelta : 0.002,
                        longitudeDelta : 0.002,
                    }}
                >
                {locationLog.map((location,index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude : location.latitude,
                            longitude : location.longitude,
                        }}
                        anchor={{ x: 0.5, y: 0.5 }}
                    >
                    <View>
                        <Svg width={24} height={24} viewBox="0 0 24 24">
                            { index === 0 ? (
                            <Circle cx={12} cy={12} r={10} stroke="white" strokeWidth={2} fill="#3366CC" />
                            ) : (
                            <Circle cx={12} cy={12} r={10} stroke="white" strokeWidth={2} fill="green" />
                            )}
                        </Svg>
                    </View>
                    </Marker>
                ))}
                <Polyline
                    coordinates={locationLog}
                    strokeWidth={2}
                    strokeColor="lightgray"
                />
                </MapView>
            )}
            <TouchableOpacity onPress={backToTimer}>
            <View style={styles.backContainer}>
                <FontAwesomeIcon name= "chevron-left" size={30} color="white" />
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToCurrentLocation}>
                <View style={styles.currentLocationButton}>
                    <FontAwesomeIcon name="location-arrow" size={30} color="gray" />
                </View>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    container:{
        flex:1,
        backgroundColor:'#fff',
        marginTop: Constants.statusBarHeight,
    },
    mapContainer:{
        width : Dimensions.get('window').width,
        height : '100%',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gray',
    },
    timerContainer:{
        width : Dimensions.get('window').width,
        height : '100%',
        flex:1,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gray',
    },
    runLogContainer:{
        width : Dimensions.get('window').width,
        height : '100%',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gray',
    },
    topContainer:{
        flex:2,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gray',
        justifyContent : 'center',
        alignItems : 'center',
    },
    top3Container:{
        flex:2,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gray',
        flexDirection: 'row',
    },
    activityContainer:{
        flex:10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gray',
    },
    centerContainer:{
        flex:3,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gray',
        justifyContent : 'center',
        alignItems : 'center',
    },
    bottomContainer:{
        flex:2,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gray',
        flexDirection: 'row',
    },
    buttonContainer:{
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gray',
        justifyContent : 'center',
        alignItems : 'center',
    },
    leftContainer:{
        flex:1,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gray',
        justifyContent : 'center',
        alignItems : 'center',
    },
    rightContainer:{
        flex:1,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gray',
        justifyContent : 'center',
        alignItems : 'center',
    },
    cancelText:{
        fontSize: 15,
        fontWeight: 'bold',
        color: '#3366CC',
    },
    titleText:{
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
    },
    saveText:{
        fontSize: 15,
        fontWeight: 'bold',
        color: '#3366CC',
    },
    timerText:{
        fontSize: 50,
        fontWeight: 'bold',
        color: 	'#000033',
    },
    activityText:{
        fontSize: 20,
        color: 	'#000033',
    },
    activityContainerItem1:{
        width : '100%',
        height : '10%',
        backgroundColor: 'white',
        justifyContent : 'center',
        alignItems : 'center',
    },
    activityContainerItem2:{
        width : '100%',
        height : '10%',
        backgroundColor: 'white',
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor: '#D7EEFF',
    },
    backContainer:{
        position : 'absolute',
        top : 500,
        right : '0%',
        height : 60,
        width : 70,
        backgroundColor: '#3366CC',
        borderRadius: 5,
        justifyContent : 'center',
        alignItems : 'center',
    },
    currentLocationButton:{
        position : 'absolute',
        top : 20,
        left : '80%',
        backgroundColor: 'white',
        borderRadius: 30,
        height : 40,
        width : 40,
        justifyContent : 'center',
        alignItems : 'center',
    },

});