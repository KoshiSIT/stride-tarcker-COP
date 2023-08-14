import { StyleSheet, Text, View ,Image, FlatList, SafeAreaView, TouchableOpacity , Animated, ScrollView, Dimensions, Touchable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React,{useEffect, useState, useRef} from 'react';
import Constants from 'expo-constants';
import axios from 'axios';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Svg, Circle} from 'react-native-svg';
export default function StartRunScreencreen({}){
    const[time, setTime] = useState(0);
    const[isRunning, setIsRunning] = useState(false);
    const [buttonContainerFlex,setButtonContainerFlex] = useState(2);
    const animatedButtonContainerFlex = new Animated.Value(buttonContainerFlex);
    const scrollViewRef = useRef(null);

    useEffect(() => {
        let timerInterval = null;
        if(isRunning){
            timerInterval = setInterval(() => {
                setTime((time) => time + 1);
            }, 1000);
        }else {
            clearInterval(timerInterval);
        }

        return () => clearInterval(timerInterval);
    }, [isRunning]);

    useEffect(() => {
        const toValue = buttonContainerFlex === 2 ? 3 : 2;
        Animated.timing(animatedButtonContainerFlex, {
          toValue: toValue,
          duration: 500,
          useNativeDriver: false,
        }).start();
      }, [buttonContainerFlex]);
    
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };
    const navigation = useNavigation();

    const handleStartstop = () => {
        setIsRunning((isRunning) => !isRunning);
        setButtonContainerFlex((prevFlex) => (prevFlex === 2 ? 3 : 2));    
    };

    const handleResultOpen = () => {
        navigation.navigate('Result');
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
                <Map scrollViewRef={scrollViewRef}/>
                <View style={styles.timerContainer}>
                    <View style={styles.topContainer}>
                        <Text style={styles.timerText}>{formatTime(time)}</Text>
                        <Text style={{fontSize : 15}}>タイム</Text>
                    </View>
                    <View style={styles.centerContainer}>
                        <Text style={{fontSize : 70, fontWeight : 'bold', color : '#000033'}}>0.00</Text>
                        <Text style={{fontSize : 20}}>キロメートル</Text>
                    </View>
                    <View style={styles.bottomContainer}>
                        <View style={styles.leftContainer}>
                            <Text style={{fontSize : 40, fontWeight: 'bold', color : '#000033'}}>0.00</Text>
                            <Text style={{fontSize : 10}}>ペース</Text>
                        </View>
                        <View style={styles.rightContainer}>
                            <Text style={{fontSize : 40, fontWeight: 'bold', color : '#000033'}}>0.00</Text>
                            <Text style={{fontSize : 10}}>平均ペース</Text>
                        </View>
                    </View>
                    <Animated.View style={[styles.buttonContainer,{flex : animatedButtonContainerFlex}]}>
                        {isRunning ? (
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
                            <Text style={{fontSize : 40, fontWeight: 'bold', color : '#000033'}}>0.00</Text>
                            <Text style={{fontSize : 10}}>平均ペース</Text>
                        </View>
                    </View>
                    <View style={styles.activityContainer}>
                        <View style={styles.activityContainerItem1}>
                            <Text style={styles.activityText}>現在　00.km　　　　　　　　　　00.00</Text>
                        </View>
                        <View style ={styles.activityContainerItem2}>
                            <Text style={styles.activityText}>1km　                      00.00 分/km</Text>
                        </View>
                    </View>
                </View>
                
            </ScrollView>
        </View>
    );
};

export const Map = ({scrollViewRef}) =>{
    const [currentLocation, setCurrentLocation] = useState(null);
    
    useEffect(() => {
        getLocationPermission();
    }, []);

    const getLocationPermission = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          startLocationUpdates();
        }
    };

    const backToTimer = () => {
        scrollViewRef.current.scrollTo({ x: Dimensions.get('window').width, y: 0, animated: true });
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

    return(
        <View style={styles.mapContainer}>
            {currentLocation && (
                <MapView
                    style={styles.map}
                    region={{
                        latitude : currentLocation.latitude,
                        longitude : currentLocation.longitude,
                        latitudeDelta : 0.002,
                        longitudeDelta : 0.002,
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
            <TouchableOpacity onPress={backToTimer}>
            <View style={styles.backContainer}>
                <FontAwesomeIcon name= "chevron-left" size={30} color="white" />
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

});