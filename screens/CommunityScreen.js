import { StyleSheet, Text, View ,Image, FlatList, SafeAreaView, ScrollView, TouchableOpacity, Dimensions} from 'react-native';
import React,{useEffect, useState} from 'react';
import Constants from 'expo-constants';
import axios from 'axios';
import MapView,{ Marker }  from 'react-native-maps';
import { Svg, Circle, Polyline} from 'react-native-svg';
import * as Location from 'expo-location';
import { useAppContext } from '../contexts/AppContext';
import { FIRESTORE_DB, FIREBASE_STORAGE, STORAGE_REF } from '../firebase';
import {addDoc, collection, onSnapshot, where, query} from 'firebase/firestore';
import {getDownloadURL, ref} from 'firebase/storage';

import * as Date from '../functions/Date';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';


export default function CommunityScreen({navigation}){
    const [selectedTab, setSelectedTab] = useState('feed');
    const [activities, setActivities] = useState([]);
    const { currentLocation, handleSetCurrentLocation, user} = useAppContext();
    const [pictureIndex, setPictureIndex] = useState(0);
    useEffect(() => {
        const activitiesRef = query(
            collection(FIRESTORE_DB, 'stride-tracker_DB'),
            where('user', '==', user),
        );
        const subscriber = onSnapshot(activitiesRef,{
            next: (snapshot) => {
                const activities = [];
                snapshot.docs.forEach((doc) => {
                    console.log(doc.data());
                    activities.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
                setActivities(activities);
            }
        })
        getLocationPermission();
        return () => subscriber();
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
            handleSetCurrentLocation({ latitude, longitude } );
            }
        );
    };

    const handleTabChange = (tabName) => {
        setSelectedTab(tabName);
    };

    const addActivity = async() => {
        const doc = addDoc(collection(FIRESTORE_DB, 'activities'), {title: 'test', done: false});
        console.log(doc);
    }

    return(
        <View style={styles.container}>
            <View style={styles.tabContainer}>
                <TouchableOpacity 
                    style={[styles.tabButton, selectedTab === 'feed' && styles.selectedTabButton]}
                    onPress={() => handleTabChange('feed')}
                    >
                    <Text style={styles.tabText}>フィード</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.tabButton, selectedTab === 'group' && styles.selectedTabButton]}
                    onPress={() => handleTabChange('group')}
                >
                    <Text style={styles.tabText}>グループ</Text>
                </TouchableOpacity>
            </View>
            { selectedTab === 'feed' && 
            <ScrollView style={{backgroundColor : '#F0F8FF', paddingTop : 20}} nestedScrollEnabled={true}>
                { activities.length > 0 && (
                    <FlatList
                        data={activities}
                        renderItem={({item}) => (
                            <View>
                                <View style={styles.userContainer}>
                                    <View style={styles.item1}>
                                        <FontAwesome5Icon name='grin-wink' size={25} color = 'black'/>
                                    </View>
                                    <View style={styles.item2}>
                                        <Text>{item.activityName}</Text>
                                        <View>
                                            <Text>{Date.formatDate(item.datetime)}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.dateTimeContainer}>
                                    <Text style={{fontWeight : 'bold', fontSize : 14}}>{Date.formatDateToJapaneseDayAndTime(item.datetime)}</Text>
                                </View>
                                <View style={styles.timeContainer}>
                                    <Text style={{fontSize : 20, fontWeight: 'bold',}}>{item.time}</Text>
                                    <Text style={{fontSize : 8}}>タイム</Text>
                                </View>
                                <View style={styles.imageContainer}>
                                <ScrollView 
                                    horizontal
                                    pagingEnabled
                                    style={styles.pictureScroll}
                                    scrollEnabled={item.image !== ''}
                                    onMomentumScrollEnd={(event) => {
                                        const contentOffsetx = event.nativeEvent.contentOffset.x;
                                        const index = Math.floor(contentOffsetx*2 / Dimensions.get('window').width);
                                        setPictureIndex(index);
                                    }}
                                >
                                    {currentLocation && (
                                    <MapView
                                        scrollEnabled={false} 
                                        zoomEnabled={false}
                                        style={styles.map}
                                        region={{
                                            latitude: currentLocation.latitude,
                                            longitude: currentLocation.longitude,
                                            latitudeDelta: 0.01,
                                            longitudeDelta: 0.01,
                                        }}
                                        >
                                        {item.locationLog.map((location,index) => (
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
                                            coordinates={item.locationLog}
                                            strokeWidth={2}
                                            strokeColor="lightgray"
                                        />
                                    </MapView>
                                )}
                                {item.image !== '' &&(
                                    <View style={styles.pictureItem}>
                                        <Image
                                            source={{uri : item.image}}
                                            style = {{width : '100%', height : '100%'}}
                                        />
                                    </View>
                                )}
                                </ScrollView>
                                </View>
                                {item.image !== '' ? (
                                    <View style ={styles.dotContainer}>
                                        <View style={[styles.dot, pictureIndex === 0 && styles.activeDot]}></View>
                                        <View style={[styles.dot, pictureIndex === 1 && styles.activeDot]}></View>
                                    </View>
                                ):(<View></View>)}
                                <View style={styles.bottomContainer}>
                                    <TouchableOpacity>
                                        <View style={styles.button}>
                                            <FontAwesomeIcon name='heart-o' size={25} color = 'black'/>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <View style={styles.button}>
                                            <AntDesign name='message1' size={25} color = 'black'/>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item) => item.id}
                                    />
                                )}
                            </ScrollView>
                    }
            { selectedTab === 'group' &&
            <ScrollView>
                <View style={styles.feedContainer}>
                    <Text>グループ名</Text>
                </View>
            </ScrollView>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
    },
    tabContainer:{
        height: 50,
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    tabButton:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedTabButton:{
        borderBottomWidth: 4,
        borderColor: '#000055',
    },
    tabText:{
        fontSize: 15,
        fontWeight: 'bold',
    },
    feedContainer:{
    },
    userContainer:{
        backgroundColor: 'white',
        height : 45,
        flexDirection : 'row',
        alignItems : 'center',
    },
    dateTimeContainer:{
        backgroundColor: 'white',
        height : 20,
    },
    timeContainer:{
        backgroundColor: 'white',
        height : 30,
        justifyContent : 'center',
    },
    imageContainer:{
        height: 300,
        borderWidth: 1,
        borderColor: '#F5F5F5',
        backgroundColor: 'white',
    },
    image:{
    },
    bottomContainer:{
        flexDirection : 'row',
        backgroundColor: 'white',
        height : 30,
    },
    button:{
        marginLeft : 10,
        marginRight : 10,
    },
    item2:{
        marginLeft : 10,
    },
    map: {
        height: '100%',
        width: Dimensions.get('window').width,
    },
    pictureItem : {
        height : '100%',
        width : Dimensions.get('window').width,
    },
    pictureScroll : {
        height : '100%',
    },
    map : {
        height : '100%',
        width: Dimensions.get('window').width,
    },
    dot : {
        height : 8,
        width : 8,
        borderRadius : 4,
        backgroundColor : 'lightgray',
        marginHorizontal : 4,
    },
    activeDot : {
        backgroundColor : 'gray',
    },
    dotContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        top: '85%', 
        left: '40%',
        width: 50,
        height: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        position: 'absolute',
    },

});